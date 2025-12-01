import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Signature from "@/models/Signature";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();
    
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's signatures
    const signatures = await Signature.find({ userId: user._id }).select('name trackingEnabled createdAt');
    
    const isPremium = user.plan === "premium" || user.plan === "lifetime";
    
    return NextResponse.json({
      user: {
        clerkId: user.clerkId,
        email: user.email,
        plan: user.plan,
        isPremium,
        signatureLimit: user.signatureLimit,
        hasPaid: user.hasPaid,
        stripeSubscriptionId: user.stripeSubscriptionId,
        subscriptionStatus: user.subscriptionStatus
      },
      signatures: signatures.map(sig => ({
        name: sig.name,
        trackingEnabled: sig.trackingEnabled,
        createdAt: sig.createdAt
      })),
      trackingEligible: isPremium,
      message: isPremium 
        ? "✅ User is eligible for tracking" 
        : "❌ User needs to upgrade to premium for tracking"
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Failed to check user status",
      details: error.message 
    }, { status: 500 });
  }
}
