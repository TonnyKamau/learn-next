import { dbConnect } from "@/dbconfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { genSalt, hash } from "bcryptjs";

dbConnect();

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  try {
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" , status: 404 });
    }
    //hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(newPassword, salt);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error: unknown) {
    console.error("Password reset error:", error);
    return NextResponse.json({ message: "Password reset failed", status: 500 });
  }
}

