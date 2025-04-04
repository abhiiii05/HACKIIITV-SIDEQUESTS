// app/actions/get-team-points.ts
import { db } from "@/db"
import { points, judge, sidequest } from "@/db/schema"
import { eq } from "drizzle-orm"
import { type InferSelectModel } from "drizzle-orm"

export interface TeamPoint {
    teamId: string
    sidequestName: string
    points: number
}

export async function getTeamPoints(teamId: string) {
    try {
        const results = await db
            .select({
                teamId: points.teamId,
                sidequestName: sidequest.name,
                points: points.points
            })
            .from(points)
            .where(eq(points.teamId, teamId))
            .leftJoin(judge, eq(points.judgeId, judge.id))
            .leftJoin(sidequest, eq(judge.sidequestId, sidequest.id))

        const formattedResults = results.map(result => ({
            teamId: result.teamId,
            sidequestName: result.sidequestName || "Unknown Sidequest",
            points: Number(result.points)
        }))

        return {
            success: true,
            data: formattedResults
        }
    } catch (error) {
        console.error("Error fetching team points:", error)
        return {
            success: false,
            error: "Failed to fetch team points"
        }
    }
}