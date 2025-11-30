import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Signature from "@/models/Signature";

// GET - List all signatures for the current user
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get user to find their MongoDB ID
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all signatures for this user
    const signatures = await Signature.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      signatures,
      count: signatures.length,
      limit: user.signatureLimit,
      plan: user.plan,
    });
  } catch (error) {
    console.error("Error fetching signatures:", error);
    return NextResponse.json(
      { error: "Failed to fetch signatures" },
      { status: 500 }
    );
  }
}

// POST - Create a new signature
export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get user
    let user = await User.findOne({ clerkId: userId });
    
    // If user doesn't exist, create them (fallback for webhook issues)
    if (!user) {
      const { currentUser: getClerkUser } = await import("@clerk/nextjs/server");
      const clerkUser = await getClerkUser();
      
      if (clerkUser) {
        user = await User.create({
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          firstName: clerkUser.firstName || "",
          lastName: clerkUser.lastName || "",
          plan: "free",
          signatureLimit: 3,
        });
        console.log(`Auto-created user: ${userId}`);
      } else {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    }

    // Check signature limit for free users
    if (user.plan === "free") {
      const signatureCount = await Signature.countDocuments({ userId: user._id });
      if (signatureCount >= user.signatureLimit) {
        return NextResponse.json(
          {
            error: "Signature limit reached",
            message: `Free plan allows ${user.signatureLimit} signatures. Upgrade to premium for unlimited signatures.`,
            limitReached: true,
          },
          { status: 403 }
        );
      }
    }

    // Parse request body
    const body = await request.json();
    const { name, templateId, signatureData, trackingEnabled } = body;

    // Validate required fields
    if (!name || !templateId || !signatureData) {
      return NextResponse.json(
        { error: "Missing required fields: name, templateId, signatureData" },
        { status: 400 }
      );
    }

    // Only premium users can enable tracking
    const canEnableTracking = user.plan === "premium" || user.plan === "lifetime";
    
    // Create signature
    const signature = await Signature.create({
      userId: user._id,
      name,
      templateId,
      signatureData,
      trackingEnabled: canEnableTracking ? trackingEnabled : false,
    });

    return NextResponse.json({
      signature,
      message: "Signature created successfully",
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating signature:", error);
    return NextResponse.json(
      { error: "Failed to create signature" },
      { status: 500 }
    );
  }
}
