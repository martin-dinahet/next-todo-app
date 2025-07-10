"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";

export const logout = async () => {
  await deleteSession();
  redirect("/");
};
