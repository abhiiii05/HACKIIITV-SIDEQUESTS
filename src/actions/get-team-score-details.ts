// app/actions/get-team-score-details.ts
import { db } from "@/db"
import { teams, points, judge, sidequest } from "@/db/schema"
import { desc, eq } from "drizzle-orm"

export interface TeamScoreDetails {
    teamId: string
    teamName: string
    unstopId: string
    questScores: {
        [sidequestId: string]: {
            questName: string
            averageScore: number
            attempts: {
                id: string
                score: number
                judgeId: string
            }[]
        }
    }
    totalScore: number
}

export async function getTeamScoreDetails(teamId: string) {
    try {
        // 1. Fetch the team's basic info
        const teamData = await db
            .select({
                id: teams.id,
                name: teams.name,
                unstopId: teams.unstopId
            })
            .from(teams)
            .where(eq(teams.id, teamId))
            .execute()
            .then(res => res[0])

        if (!teamData) {
            return { success: false, error: "Team not found" }
        }

        // 2. Fetch all points for this team with sidequest details
        const pointsData = await db
            .select({
                pointId: points.id,
                score: points.points,
                judgeId: points.judgeId,
                sidequestId: sidequest.id,
                sidequestName: sidequest.name
            })
            .from(points)
            .where(eq(points.teamId, teamId))
            .leftJoin(judge, eq(points.judgeId, judge.id))
            .leftJoin(sidequest, eq(judge.sidequestId, sidequest.id))
            .execute()

        // 3. Process the data into the required structure
        const questScores: TeamScoreDetails["questScores"] = {}

        pointsData.forEach(point => {
            const sidequestId = point.sidequestId
            if (!sidequestId) return

            if (!questScores[sidequestId]) {
                questScores[sidequestId] = {
                    questName: point.sidequestName || "Unknown Sidequest",
                    averageScore: 0,
                    attempts: []
                }
            }

            questScores[sidequestId].attempts.push({
                id: point.pointId,
                score: Number(point.score),
                judgeId: point.judgeId
            })
        })

        // 4. Calculate averages and total score
        Object.keys(questScores).forEach(sidequestId => {
            const quest = questScores[sidequestId]
            const total = quest.attempts.reduce((sum, attempt) => sum + attempt.score, 0)
            quest.averageScore = total / quest.attempts.length
        })

        const totalScore = Object.values(questScores)
            .reduce((sum, quest) => sum + quest.averageScore, 0)

        // 5. Return the formatted data
        return {
            success: true,
            data: {
                teamId: teamData.id,
                teamName: teamData.name,
                unstopId: teamData.unstopId,
                questScores,
                totalScore
            } as TeamScoreDetails
        }

    } catch (error) {
        console.error("Error fetching team score details:", error)
        return { success: false, error: "Failed to fetch team score details" }
    }
}