"use server"

import { db } from "@/db"
import { sidequest } from "@/db/schema"

export async function getSidequests() {
  try {
    const allSidequests = await db.select({
      id: sidequest.id,
      name: sidequest.name,
    }).from(sidequest)

    return { success: true, data: allSidequests }
  } catch (error) {
    console.error("Error fetching sidequests:", error)
    return { success: false, error }
  }
}