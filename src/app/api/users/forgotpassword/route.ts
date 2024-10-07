import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    } else if (user) {  
      await sendEmail({ email, emailType: "RESET", userId: user._id });
      return NextResponse.json({
        status: 200,
      message: "Email sent successfully",
        success: true,
      });
          }
  } catch (error: unknown) {
    if (error instanceof Error) {
        return NextResponse.json({ message: error.message, status: 500 });
    }
    // If it's not an Error object, return a generic error message
    return NextResponse.json({ message: "An unexpected error occurred", status: 500 });
  }
}