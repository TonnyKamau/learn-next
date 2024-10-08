import { dbConnect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;
    const userExists = await User.findOne({ email });
    const userExistsByUsername = await User.findOne({ username });
    if (userExists) {
      return NextResponse.json({ message: "Email already exists", status: 400 });
    }
    else if (userExistsByUsername) {
      return NextResponse.json({ message: "Username already exists", status: 400 });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });
    return NextResponse.json({
      message: "User created successfully",
      status: 201,
      success: true,
      user: newUser,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
    // Handle cases where the caught value is not an Error object
    return NextResponse.json({ message: "An unknown error occurred", status: 500 });
  }
}
