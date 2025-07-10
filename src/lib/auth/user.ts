"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export const getUserId = async () => {
  const session = (await cookies()).get("session");
  if (!session?.value) return null;
  const payload = await decrypt(session.value);
  const user = await prisma.user.findUnique({
    where: { id: payload?.userId as string },
  });
  return user?.id;
};
