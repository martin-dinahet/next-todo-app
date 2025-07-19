"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth/user";

const addTodoSchema = z.object({
  title: z.string(),
});

export const addTodo = async (_prevState: unknown, formData: FormData) => {
  const result = addTodoSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) return { errors: result.error.flatten().fieldErrors };
  const userId = await getUserId();
  if (!userId) return { errors: { user: ["User is not logged in"] } };
  await prisma.todo.create({ data: { userId, title: result.data.title } });
};
