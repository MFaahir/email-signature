import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Payment from "@/models/Payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    await connectDB();

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const { clerkId } = session.metadata || {};

        if (session.mode === "subscription") {
          // Subscription checkout
          if (!clerkId) {
            console.error("No clerkId in session metadata");
            break;
          }

          const subscriptionId = session.subscription as string;
          await User.updateOne(
            { clerkId: clerkId },
            { 
              stripeSubscriptionId: subscriptionId,
              stripeCustomerId: session.customer as string,
              plan: "premium",
              subscriptionStatus: "active"
            }
          );
          console.log(`User ${clerkId} upgraded to premium via subscription`);
        } else {
          // One-time payment (legacy support)
          if (!clerkId) break;
          
          await User.updateOne(
            { clerkId: clerkId },
            { hasPaid: true }
          );
          
          await Payment.create({
            userId: clerkId, // Storing clerkId as userId in Payment model for consistency
            stripePaymentId: session.payment_intent as string,
            amount: session.amount_total || 499,
            status: "completed",
          });
          console.log(`User ${clerkId} paid one-time fee`);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const status = subscription.status;
        const customerId = subscription.customer as string;

        // Map Stripe status to our status
        const isActive = status === "active" || status === "trialing";
        const plan = isActive ? "premium" : "free";

        await User.updateOne(
          { stripeCustomerId: customerId },
          { 
            subscriptionStatus: status,
            plan: plan,
            stripeSubscriptionId: subscription.id
          }
        );
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await User.updateOne(
          { stripeCustomerId: customerId },
          { 
            subscriptionStatus: "canceled",
            plan: "free",
            stripeSubscriptionId: null
          }
        );
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
