import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface DecodedToken {
  id: string;
  // Add other properties if needed
}

export const getDataFromToken = (request: NextRequest): string => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as DecodedToken;
    return decodedToken.id;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};
