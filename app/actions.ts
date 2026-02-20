"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Service Actions
export async function getServices() {
  return await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createService(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string;

  await prisma.service.create({
    data: { title, description, icon },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteService(id: number) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// Project Actions
export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string; // Ideally file upload, but URL string for now
  
  await prisma.project.create({
    data: { title, category, image },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(id: number) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// Pricing Actions
export async function getPricingConfigs() {
  return await prisma.pricingConfig.findMany({
    orderBy: { key: "asc" },
  });
}

export async function upsertPricingConfig(formData: FormData) {
  const key = formData.get("key") as string;
  const label = formData.get("label") as string;
  const value = parseFloat(formData.get("value") as string);
  const currency = formData.get("currency") as string || "USD";

  await prisma.pricingConfig.upsert({
    where: { key },
    update: { label, value, currency },
    create: { key, label, value, currency },
  });
  revalidatePath("/admin");
}

export async function deletePricingConfig(id: number) {
  await prisma.pricingConfig.delete({ where: { id } });
  revalidatePath("/admin");
}
