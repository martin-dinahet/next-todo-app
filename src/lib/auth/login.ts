"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const login = async (_prevState: unknown, formData: FormData) => {
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) return { errors: result.error.flatten().fieldErrors };
  const existingUser = await prisma.user.findUnique({
    where: { email: result.data.email },
  });
  if (!existingUser || existingUser.password !== result.data.password) {
    return { errors: { email: ["Invalid email or password"] } };
  }
  await createSession(existingUser.id);
  redirect("/dashboard");
};
