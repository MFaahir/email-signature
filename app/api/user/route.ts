import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// GET: Fetch user data
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      clerkId: user.clerkId,
      email: user.email,
      hasPaid: user.hasPaid,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Create or update user
export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    let user = await User.findOne({ clerkId: userId });

    if (user) {
      // Update existing user
      user.email = email;
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        clerkId: userId,
        email,
        hasPaid: false,
      });
    }

    return NextResponse.json({
      clerkId: user.clerkId,
      email: user.email,
      hasPaid: user.hasPaid,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error creating/updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
