import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const uri = process.env.MONGODB_URI;
    const clerkKey = process.env.CLERK_SECRET_KEY;
    
    console.log("Testing DB Connection...");
    
    if (!uri) {
      return NextResponse.json({ error: "MONGODB_URI is missing" }, { status: 500 });
    }

    if (!clerkKey) {
      return NextResponse.json({ error: "CLERK_SECRET_KEY is missing" }, { status: 500 });
    }

    await connectDB();
    
    const state = mongoose.connection.readyState;
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    
    return NextResponse.json({ 
      status: "success", 
      message: "Database connection successful",
      dbState: states[state],
      envCheck: {
        mongo: "Present",
        clerk: "Present"
      }
    });
  } catch (error: any) {
    console.error("DB Test Error:", error);
    return NextResponse.json({ 
      error: "Database connection failed", 
      details: error.message 
    }, { status: 500 });
  }
}
