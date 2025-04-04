"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getTeamScores } from "@/actions/get-team-scores"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface QuestScore {
    questName: string
    averageScore: number
    attempts: number
}

interface TeamScoreDetail {
    teamName: string
    unstopId: string
    questScores: {
        [questId: string]: QuestScore
    }
    totalScore: number
}

interface TeamPoint {
    sidequestName: string
    points: number
    judgeName: string
}

export default function TeamScoreDetailPage() {
    const router = useRouter()
    const params = useParams<{ teamId: string }>()
    const [teamScore, setTeamScore] = useState<TeamScoreDetail | null>(null)
    const [pointsData, setPointsData] = useState<TeamPoint[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchTeamScore() {
            try {
                const result = await getTeamScores()
                if (result.success && result.data) {
                    const team = result.data.find(t => t.teamId === params.teamId)
                    if (team) {
                        setTeamScore({
                            teamName: team.teamName,
                            unstopId: team.unstopId,
                            questScores: team.questScores,
                            totalScore: team.totalScore
                        })
                    } else {
                        setError("Team not found")
                    }
                } else {
                    setError("Failed to fetch team scores")
                }
            } catch (err) {
                setError("An error occurred while fetching team scores")
            } finally {
                setLoading(false)
            }
        }

        fetchTeamScore()
    }, [params.teamId])

    const fetchPoints = async (teamId: string) => {
        try {
            const response = await fetch(`/api/team-points`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    teamId: teamId,
                })
            })
            if (!response.ok) throw new Error('Failed to fetch points')
            const data = await response.json()
            setPointsData(data)
        } catch (error) {
            console.error("Failed to fetch points:", error)
        }
    }

    useEffect(() => {
        if (params.teamId) {
            fetchPoints(params.teamId)
        }
    }, [params.teamId])

    // Group points by sidequest
    const pointsBySidequest = pointsData.reduce((acc, point) => {
        if (!acc[point.sidequestName]) {
            acc[point.sidequestName] = []
        }
        acc[point.sidequestName].push(point)
        return acc
    }, {} as Record<string, TeamPoint[]>)

    if (loading) {
        return <div className="text-center text-[#87CEFA]">Loading team details...</div>
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                {error}
                <Button onClick={() => router.back()} className="mt-4">
                    Go Back
                </Button>
            </div>
        )
    }

    if (!teamScore) {
        return (
            <div className="text-center text-red-500">
                Team data not available
                <Button onClick={() => router.back()} className="mt-4">
                    Go Back
                </Button>
            </div>
        )
    }

    const questScores = Object.values(teamScore.questScores)

    return (
        <div className="container mx-auto px-4 py-8">
            <Button onClick={() => router.back()} className="mb-6">
                Back to Rankings
            </Button>

            <h1 className="text-3xl font-bold text-[#87CEFA] mb-2">{teamScore.teamName}</h1>
            <p className="text-gray-400 mb-6">Registration ID: {teamScore.unstopId}</p>

            <div className="bg-gray-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-[#87CEFA] mb-4">Score Breakdown</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-white mb-3">Quests</h3>
                        <div className="space-y-4">
                            {questScores.map((quest, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white">{quest.questName}</span>
                                        <span className="text-[#87CEFA]">
                                            {quest.averageScore.toFixed(2)}
                                            <span className="text-gray-400 text-xs ml-2">
                                                ({quest.attempts} attempts)
                                            </span>
                                        </span>
                                    </div>
                                    {pointsBySidequest[quest.questName] && (
                                        <div className="mt-2 ml-4 pl-2 border-l-2 border-[#87CEFA]">
                                            <Accordion type="single" collapsible>
                                                <AccordionItem value="attempts">
                                                    <AccordionTrigger className="text-sm text-gray-300 py-1">
                                                        View detailed attempts
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="space-y-2 mt-2">
                                                            {pointsBySidequest[quest.questName].map((point, idx) => (
                                                                <div key={idx} className="flex justify-between items-center text-sm">
                                                                    <span className="text-gray-300">
                                                                        Attempt -> {point.judgeName}
                                                                    </span>
                                                                    <span className="text-[#87CEFA]">
                                                                        {point.points} pts
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-white mb-3">Total Score Calculation</h3>
                        <div className="space-y-3">
                            {questScores.map((quest, index) => (
                                <div key={index} className="text-sm text-gray-300">
                                    {quest.questName}: {quest.averageScore.toFixed(2)} points
                                </div>
                            ))}
                            <div className="border-t border-gray-600 my-2"></div>
                            <div className="flex justify-between items-center font-bold text-white">
                                <span>Total:</span>
                                <span>{teamScore.totalScore.toFixed(2)} points</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-2">
                                * Total is the sum of average scores from all quests
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}