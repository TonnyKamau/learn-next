import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: "Logout failed",
        success: false,
        error: error.message,
      });
    }
    return NextResponse.json({
      message: "Logout failed",
      success: false,
      error: "An unknown error occurred",
    });
  }
}
