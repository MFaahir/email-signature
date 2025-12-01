import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import TrackingCampaign from "@/models/TrackingCampaign";
import { generateUniqueId } from "@/lib/tracking/pixel-generator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET - List all tracking campaigns for the current user
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const campaigns = await TrackingCampaign.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}

// POST - Create a new tracking campaign
export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Campaign name is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Generate unique ID for this campaign
    const uniqueId = generateUniqueId();

    const campaign = await TrackingCampaign.create({
      userId,
      name,
      description: description || "",
      uniqueId,
    });

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}
