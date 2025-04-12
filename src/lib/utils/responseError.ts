import { NextResponse } from "next/server";

export const responseError = (statusCode: number, message?: string) => {
  return NextResponse.json(
    {
      error: message || "An error occurred",
    },
    {
      status: statusCode,
    }
  );
};
