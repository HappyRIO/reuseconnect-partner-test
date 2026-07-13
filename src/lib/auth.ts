import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./config";
import { findUserById, toPublicUser } from "./db";
import type { PublicPartnerUser } from "./types";

export async function getCurrentUser(): Promise<PublicPartnerUser | null> {
  const jar = await cookies();
  const userId = jar.get(SESSION_COOKIE)?.value;
  if (!userId) return null;

  const user = findUserById(userId);
  return user ? toPublicUser(user) : null;
}
