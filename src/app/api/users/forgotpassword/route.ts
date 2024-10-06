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
      return NextResponse.json({ error: "User not found", status: 404 });
    }
    await sendEmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}