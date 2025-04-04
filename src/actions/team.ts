"use server"

import { db } from "@/db";
import { teams } from "@/db/schema";

interface Team {
  name: string;
  unstopId: number;
}

export async function createTeams(teamsData: Team[]) {
  try {
    const createdTeams = await db.insert(teams).values(
      teamsData.map(team => ({
        name: team.name,
        unstopId: team.unstopId,
      }))
    );
    
    return { success: true, data: createdTeams };
  } catch (error) {
    console.error("Error creating teams:", error);
    return { success: false, error };
  }
}