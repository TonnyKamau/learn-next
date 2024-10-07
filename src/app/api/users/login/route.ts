import { dbConnect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User does not exist",
        success: false,
        status: 400,
      });
    }
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid password", status: 400 });
    } else if (!user.isVerified) {
      return NextResponse.json({
        message: "Please verify your email before logging in",
        success: false,
        status: 403,
      });
    }
    // Create a token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({
        message: "Login successful",
        success: true,
        status: 200,
        user: user,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred", status: 500 });
  }
}
