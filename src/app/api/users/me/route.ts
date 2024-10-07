import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { dbConnect } from "@/dbconfig/dbConfig";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }
    return NextResponse.json({ message: "User found", data: user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred", status: 500 });
  }
}
