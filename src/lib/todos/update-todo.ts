"use server";

import { z } from "zod";
import { getUserId } from "../auth/user";
import { prisma } from "../prisma";

const updateTodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});

export const updateTodo = async (_prevState: unknown, formData: FormData) => {
  const result = updateTodoSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) return { errors: result.error.flatten().fieldErrors };
  const userId = await getUserId();
  if (!userId) return { errors: { user: ["User is not logged in"] } };
  await prisma.todo.update({
    where: { id: result.data.id },
    data: result.data,
  });
};
