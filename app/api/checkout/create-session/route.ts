import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get or create user
    let user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      const body = await request.json();
      const { email } = body;
      
      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }

      user = await User.create({
        clerkId: userId,
        email,
        hasPaid: false,
      });
    }

    // Check if user already paid
    if (user.hasPaid) {
      return NextResponse.json(
        { error: "User has already paid" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Email Signature Generator - Lifetime Access",
              description: "One-time payment for lifetime access to create professional email signatures",
            },
            unit_amount: 500, // $5.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/generator?success=true`,
      cancel_url: `${request.headers.get("origin")}/generator?canceled=true`,
      metadata: {
        userId: user._id.toString(),
        clerkId: userId,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
