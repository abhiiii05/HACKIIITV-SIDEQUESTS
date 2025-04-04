"use server"

import { db } from "@/db";
import { teams } from "@/db/schema";

export async function getTeams() {
  try {
    const allTeams = await db.select({
      id: teams.id,
      name: teams.name,
      unstopId: teams.unstopId,
    }).from(teams);

    return { success: true, data: allTeams };
  } catch (error) {
    console.error("Error fetching teams:", error);
    return { success: false, error };
  }
}