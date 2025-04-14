import { NextResponse } from "next/server";
import { Session } from "../models/Session";
import { User } from "../models/User";
import { responseError } from "./responseError";
import { extractToken } from "./token";

export async function checkSessionHelper(
  token: string | undefined
): Promise<NextResponse<{ error: string }> | string> {
  const extractedToken = extractToken(token as string);
  if (!token || !extractedToken) {
    return responseError(401, "Token não encontrado");
  }
  const userExists = await User.findById(extractedToken.userId);
  if (!userExists) {
    return responseError(401, "Usuário não encontrado");
  }
  const sessionExists = await Session.findOne({
    userId: userExists._id,
  });

  if (!sessionExists) {
    return responseError(401, "Sessão não encontrada");
  }

  return userExists._id.toString();
}
