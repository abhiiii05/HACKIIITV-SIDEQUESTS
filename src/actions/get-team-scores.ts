"use server"

import { db } from "@/db"
import { teams } from "@/db/schema"

interface TeamScore {
  teamId: string
  teamName: string
  unstopId: string
  questScores: {
    [questId: string]: {
      questName: string
      averageScore: number
      attempts: number
    }
  }
  totalScore: number
}

export async function getTeamScores() {
  try {
    // Get all teams
    const allTeams = await db.select().from(teams)
    
    // Get all points with their associated judges and sidequests
    const allPoints = await db.query.points.findMany({
      with: {
        judge: {
          with: {
            sidequest: true
          }
        },
        team: true
      }
    })

    // Process scores for each team
    const teamScores: TeamScore[] = allTeams.map(team => {
      const teamPoints = allPoints.filter(p => p.teamId === team.id)
      const questScores: TeamScore["questScores"] = {}
      
      // Group points by sidequest and calculate averages
      teamPoints.forEach(point => {
        const questId = point.judge.sidequestId
        const questName = point.judge.sidequest.name
        
        if (!questScores[questId]) {
          questScores[questId] = {
            questName,
            averageScore: 0,
            attempts: 0
          }
        }
        
        const currentScore = questScores[questId]
        currentScore.attempts += 1
        currentScore.averageScore = (
          (currentScore.averageScore * (currentScore.attempts - 1) + point.points) / 
          currentScore.attempts
        )
      })

      // Calculate total score as sum of all average quest scores
      const totalScore = Object.values(questScores).reduce(
        (sum, quest) => sum + quest.averageScore, 
        0
      )

      return {
        teamId: team.id,
        teamName: team.name || "",
        unstopId: team.unstopId,
        questScores,
        totalScore
      }
    })

    // Sort teams by total score in descending order
    teamScores.sort((a, b) => b.totalScore - a.totalScore)

    return { success: true, data: teamScores }
  } catch (error) {
    console.error("Error fetching team scores:", error)
    return { success: false, error: "Failed to fetch team scores" }
  }
}