"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getTeamScores } from "@/actions/get-team-scores"

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

export function RankingTable() {
  const [scores, setScores] = useState<TeamScore[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchScores() {
      try {
        const result = await getTeamScores()
        if (result.success && result.data) {
          setScores(result.data)
        } else {
          setError("Failed to fetch scores")
        }
      } catch (err) {
        setError("An error occurred while fetching scores")
      } finally {
        setLoading(false)
      }
    }

    fetchScores()
  }, [])

  if (loading) {
    return <div className="text-center text-[#87CEFA]">Loading rankings...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-[#87CEFA]">Rank</TableHead>
          <TableHead className="text-[#87CEFA]">Team</TableHead>
          <TableHead className="text-[#87CEFA]">Registration ID</TableHead>
          <TableHead className="text-[#87CEFA]">Total Score</TableHead>
          <TableHead className="text-[#87CEFA]">Quest Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores.map((team, index) => (
          <TableRow key={team.teamId}>
            <TableCell className="text-white">{index + 1}</TableCell>
            <TableCell className="text-white">{team.teamName}</TableCell>
            <TableCell className="text-white">{team.unstopId}</TableCell>
            <TableCell className="text-white">{team.totalScore.toFixed(2)}</TableCell>
            <TableCell className="text-white">
              <div className="text-sm">
                {Object.values(team.questScores).map(quest => (
                  <div key={quest.questName} className="mb-1">
                    {quest.questName}: {quest.averageScore.toFixed(2)} 
                    <span className="text-gray-400 text-xs ml-2">
                      ({quest.attempts} attempts)
                    </span>
                  </div>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

