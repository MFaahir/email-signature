import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import AnalyticsEvent from "@/models/AnalyticsEvent";
import Signature from "@/models/Signature";
import mongoose from "mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get user's signatures to filter events
    // We need to find the signatures first because AnalyticsEvent stores signatureId as string, not ObjectId ref usually
    // But wait, our AnalyticsEvent model has signatureId as String.
    
    // Actually, we can just query by userId since we added it to the AnalyticsEvent model!
    // Let's verify the model... yes, userId is in AnalyticsEvent.

    // Aggregate stats
    const stats = await AnalyticsEvent.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: null,
          totalViews: { 
            $sum: { $cond: [{ $eq: ["$eventType", "open"] }, 1, 0] } 
          },
          totalClicks: { 
            $sum: { $cond: [{ $eq: ["$eventType", "click"] }, 1, 0] } 
          }
        }
      }
    ]);

    const totalViews = stats[0]?.totalViews || 0;
    const totalClicks = stats[0]?.totalClicks || 0;
    const ctr = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await AnalyticsEvent.aggregate([
      { 
        $match: { 
          userId: userId,
          createdAt: { $gte: thirtyDaysAgo }
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          views: { 
            $sum: { $cond: [{ $eq: ["$eventType", "open"] }, 1, 0] } 
          },
          clicks: { 
            $sum: { $cond: [{ $eq: ["$eventType", "click"] }, 1, 0] } 
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format recent activity
    const formattedActivity = recentActivity.map(item => ({
      date: item._id,
      views: item.views,
      clicks: item.clicks
    }));

    return NextResponse.json({
      totalViews,
      totalClicks,
      ctr,
      recentActivity: formattedActivity
    });

  } catch (error) {
    console.error("Error fetching analytics summary:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
