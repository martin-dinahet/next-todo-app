"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const register = async (_prevState: unknown, formData: FormData) => {
  const result = registerSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) return { errors: result.error.flatten().fieldErrors };
  const existingUser = await prisma.user.findUnique({
    where: { email: result.data.email },
  });
  if (existingUser) return { errors: { email: ["Email already in use"] } };
  const newUser = await prisma.user.create({ data: result.data });
  await createSession(newUser.id);
  redirect("/dashboard");
};
