import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Signature from "@/models/Signature";

// GET - Get a specific signature
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { id } = await params;

    const signature = await Signature.findOne({
      _id: id,
      userId: user._id,
    });

    if (!signature) {
      return NextResponse.json({ error: "Signature not found" }, { status: 404 });
    }

    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Error fetching signature:", error);
    return NextResponse.json(
      { error: "Failed to fetch signature" },
      { status: 500 }
    );
  }
}

// PUT - Update a signature
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, templateId, signatureData, trackingEnabled } = body;

    // Only premium users can enable tracking
    const canEnableTracking = user.plan === "premium" || user.plan === "lifetime";

    const signature = await Signature.findOneAndUpdate(
      { _id: id, userId: user._id },
      {
        ...(name && { name }),
        ...(templateId && { templateId }),
        ...(signatureData && { signatureData }),
        ...(trackingEnabled !== undefined && {
          trackingEnabled: canEnableTracking ? trackingEnabled : false,
        }),
      },
      { new: true }
    );

    if (!signature) {
      return NextResponse.json({ error: "Signature not found" }, { status: 404 });
    }

    return NextResponse.json({
      signature,
      message: "Signature updated successfully",
    });
  } catch (error) {
    console.error("Error updating signature:", error);
    return NextResponse.json(
      { error: "Failed to update signature" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a signature
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { id } = await params;

    const signature = await Signature.findOneAndDelete({
      _id: id,
      userId: user._id,
    });

    if (!signature) {
      return NextResponse.json({ error: "Signature not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Signature deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting signature:", error);
    return NextResponse.json(
      { error: "Failed to delete signature" },
      { status: 500 }
    );
  }
}
