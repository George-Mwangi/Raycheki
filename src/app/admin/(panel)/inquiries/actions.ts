"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

const VALID = ["NEW","IN_PROGRESS","QUOTED","WON","LOST"] as const;
type Status = typeof VALID[number];

export async function updateInquiryStatus(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const id     = String(formData.get("id"));
  const status = String(formData.get("status")) as Status;
  if (!VALID.includes(status)) return;
  await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
  revalidatePath("/admin/inquiries");
}
