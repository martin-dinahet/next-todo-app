"use server";

import { z } from "zod";
import { getUserId } from "../auth/user";
import { prisma } from "../prisma";

const deleteTodoSchema = z.object({
  id: z.string(),
});

export const deleteTodo = async (_prevState: unknown, formData: FormData) => {
  const result = deleteTodoSchema.safeParse(Object.entries(formData));
  if (!result.success) return { errors: result.error.flatten().fieldErrors };
  const userId = await getUserId();
  if (!userId) return { errors: { user: ["User is not logged in"] } };
  await prisma.todo.delete({ where: { id: result.data.id } });
};
