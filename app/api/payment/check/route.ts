import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Payment from "@/models/Payment";

// GET: Check if user has paid
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({
        hasPaid: false,
        message: "User not found",
      });
    }

    // Check for completed payment
    const completedPayment = await Payment.findOne({
      clerkId: userId,
      status: "completed",
    });

    return NextResponse.json({
      hasPaid: user.hasPaid || !!completedPayment,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error checking payment status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
