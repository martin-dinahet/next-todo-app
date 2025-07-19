"use server";

import { getUserId } from "../auth/user";
import { prisma } from "../prisma";

export const getTodos = async () => {
  const userId = await getUserId();
  if (!userId) throw new Error("User is not logged in.");
  const todos = await prisma.todo.findMany({ where: { userId } });
  return todos;
};
