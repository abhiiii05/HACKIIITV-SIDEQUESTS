"use server"

import { db } from "@/db"
import { judge, points } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { auth } from "@/functions/auth"
import { Payload } from "@/types/Payload"

interface SubmitPointsParams {
    teamId: string
    sidequestId: string
    points: number
}

export async function submitPoints({ teamId, sidequestId, points: pointsValue }: SubmitPointsParams) {
    try {
        const payload = await auth() as Payload
        if (!payload || !payload.id) {
            return { success: false, error: "Not authenticated" }
        }

        const adminId = payload.id // Access id directly from payload

        // Check if admin is assigned to this sidequest
        const judgeEntry = await db.query.judge.findFirst({
            where: and(
                eq(judge.adminId, adminId),
                eq(judge.sidequestId, sidequestId)
            )
        })

        if (!judgeEntry) {
            return { 
                success: false, 
                error: "You are not assigned to judge this sidequest" 
            }
        }
console.log(teamId, sidequestId, pointsValue)
        // Add points to the points table
        const result = await db.insert(points).values({
            judgeId: judgeEntry.id,
            teamId: teamId,
            points: pointsValue,
        })

        return { success: true, data: result }

    } catch (error) {
        console.error("Error submitting points:", error)
        return { success: false, error: "Failed to submit points" }
    }
}