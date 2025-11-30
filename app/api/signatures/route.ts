import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Signature from "@/models/Signature";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  console.log("POST /api/signatures called");
  try {
    const { userId } = await auth();
    console.log("Auth userId:", userId);

    if (!userId) {
      console.log("Unauthorized: No userId");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Connecting to DB...");
    await connectDB();
    console.log("DB Connected");

    // Get user
    let user = await User.findOne({ clerkId: userId });
    console.log("User found in DB:", user ? "Yes" : "No");
    
    // If user doesn't exist, create them (fallback for webhook issues)
    if (!user) {
      console.log("User not found, attempting to auto-create...");
      let email = "";
      let firstName = "";
      let lastName = "";

      try {
        // Try to fetch user details from Clerk
        const { clerkClient } = await import("@clerk/nextjs/server");
        const client = await clerkClient();
        const clerkUser = await client.users.getUser(userId);
        
        if (clerkUser) {
          console.log("Clerk user fetched via client:", clerkUser.id);
          email = clerkUser.emailAddresses[0]?.emailAddress || "";
          firstName = clerkUser.firstName || "";
          lastName = clerkUser.lastName || "";
        }
      } catch (clerkError) {
        console.error("Failed to fetch Clerk user details:", clerkError);
        // Continue with empty details - we'll update them later via webhook or next login
        console.log("Proceeding with placeholder user data");
        email = `user_${userId}@placeholder.com`; // Fallback email
      }

      // Define user data
      const userData = {
        clerkId: userId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        plan: "free",
        signatureLimit: 3,
      };

      try {
        user = await User.create(userData);
        console.log(`Auto-created user: ${userId}`);
      } catch (createError: any) {
        // Handle race condition: if duplicate key error (code 11000), try to find user again
        if (createError.code === 11000) {
          console.log("Duplicate key error (race condition), fetching user again...");
          user = await User.findOne({ clerkId: userId });
          if (!user) {
            throw new Error("User creation failed and user not found on retry");
          }
        } else {
          throw createError;
        }
      }
    }

    // Check signature limit for free users
    if (user.plan === "free") {
      const signatureCount = await Signature.countDocuments({ userId: user._id });
      console.log("Current signature count:", signatureCount);
      
      if (signatureCount >= user.signatureLimit) {
        console.log("Signature limit reached");
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
    console.log("Request body parsed. Name:", name, "Template:", templateId);

    // Validate required fields
    if (!name || !templateId || !signatureData) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields: name, templateId, signatureData" },
        { status: 400 }
      );
    }

    // Only premium users can enable tracking
    const canEnableTracking = user.plan === "premium" || user.plan === "lifetime";
    console.log("Can enable tracking:", canEnableTracking, "Requested:", trackingEnabled);
    
    // Create signature
    const signature = await Signature.create({
      userId: user._id,
      name,
      templateId,
      signatureData,
      trackingEnabled: canEnableTracking ? trackingEnabled : false,
    });

    console.log("Signature created successfully:", signature._id);

    return NextResponse.json({
      signature,
      message: "Signature created successfully",
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating signature:", error);
    // Log full error object if possible
    if (error instanceof Error) {
      console.error("Stack:", error.stack);
    }
    return NextResponse.json(
      { 
        error: "Failed to create signature", 
        details: error instanceof Error ? error.message : String(error),
        // If it's a Mongoose validation error, return the specific validation message
        validationErrors: (error as any).name === 'ValidationError' ? (error as any).errors : undefined
      },
      { status: 500 }
    );
  }
}
