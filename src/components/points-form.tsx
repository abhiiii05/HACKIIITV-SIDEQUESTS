"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Award, Search } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getTeams } from "@/actions/get-teams"
import { getSidequests } from "@/actions/get-sidequests"
import { submitPoints } from "@/actions/submit-points"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Team {
    id: string
    name: string
    unstopId: string
}

interface Sidequest {
    id: string
    name: string
}

export function PointsForm() {
    const router = useRouter()
    const [selectedQuest, setSelectedQuest] = useState<Sidequest | null>(null)
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
    const [points, setPoints] = useState<string>("")
    const [questOpen, setQuestOpen] = useState(false)
    const [teamOpen, setTeamOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [teams, setTeams] = useState<Team[]>([])
    const [sidequests, setSidequests] = useState<Sidequest[]>([])
    const [loading, setLoading] = useState(true)
    const [questsLoading, setQuestsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const [teamsResult, questsResult] = await Promise.all([
                    getTeams(),
                    getSidequests()
                ])

                if (teamsResult.success && teamsResult.data) {
                    setTeams(teamsResult.data as Team[])
                }
                if (questsResult.success && questsResult.data) {
                    setSidequests(questsResult.data as Sidequest[])
                }
            } catch (err) {
                console.error("Failed to fetch data:", err)
            } finally {
                setLoading(false)
                setQuestsLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedQuest || !selectedTeam || !points) {
            setError("Please fill in all fields")
            return
        }

        setIsSubmitting(true)
        setError(null)
        setSuccess(null)

        try {
            const result = await submitPoints({
                teamId: selectedTeam.id,
                sidequestId: selectedQuest.id,
                points: parseInt(points),
            })

            if (result.success) {
                setSuccess(`Successfully assigned ${points} points to team ${selectedTeam.name}`)
                // Reset form
                setSelectedTeam(null)
                setSelectedQuest(null)
                setPoints("")
            } else {
                setError(result.error || "Failed to submit points")
            }
        } catch (error) {
            console.error("Error submitting points:", error)
            setError("An unexpected error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-md bg-red-500/10 p-4 text-sm text-red-500">
                    {error}
                </div>
            )}
            {success && (
                <div className="rounded-md bg-green-500/10 p-4 text-sm text-green-500">
                    {success}
                </div>
            )}

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="side-quest" className="text-[#87CEFA]">
                        Side Quest
                    </Label>
                    <Popover open={questOpen} onOpenChange={setQuestOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={questOpen}
                                className="w-full justify-between border-[#1e2d4a] bg-[#0a1121]/70 text-left text-white hover:bg-[#1a2540]/70 backdrop-blur-sm transition-all duration-300"
                            >
                                {selectedQuest ? selectedQuest.name : "Select side quest..."}
                                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 border-[#1e2d4a] bg-[#111a2e]/90 backdrop-blur-md">
                            <Command className="bg-transparent">
                                <CommandInput placeholder="Search side quest..." className="h-9 text-white" />
                                <CommandList>
                                    <CommandEmpty className="text-gray-400">No side quest found.</CommandEmpty>
                                    <CommandGroup>
                                        {questsLoading ? (
                                            <CommandItem className="text-gray-400">Loading sidequests...</CommandItem>
                                        ) : sidequests.length === 0 ? (
                                            <CommandItem className="text-gray-400">No sidequests found</CommandItem>
                                        ) : (
                                            sidequests.map((quest) => (
                                                <CommandItem
                                                    key={quest.id}
                                                    value={quest.name}
                                                    onSelect={() => {
                                                        setSelectedQuest(quest)
                                                        setQuestOpen(false)
                                                    }}
                                                    className="text-white hover:bg-[#1a2540]/70"
                                                >
                                                    {quest.name}
                                                </CommandItem>
                                            ))
                                        )}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="team" className="text-[#87CEFA]">
                        Team
                    </Label>
                    <Popover open={teamOpen} onOpenChange={setTeamOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={teamOpen}
                                className="w-full justify-between border-[#1e2d4a] bg-[#0a1121]/70 text-left text-white hover:bg-[#1a2540]/70 backdrop-blur-sm transition-all duration-300"
                            >
                                {selectedTeam ? selectedTeam.name : "Select team..."}
                                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 border-[#1e2d4a] bg-[#111a2e]/90 backdrop-blur-md">
                            <Command className="bg-transparent">
                                <CommandInput placeholder="Search team..." className="h-9 text-white" />
                                <CommandList>
                                    <CommandEmpty className="text-gray-400">No team found.</CommandEmpty>
                                    <CommandGroup>
                                        {loading ? (
                                            <CommandItem className="text-gray-400">Loading teams...</CommandItem>
                                        ) : teams.length === 0 ? (
                                            <CommandItem className="text-gray-400">No teams found</CommandItem>
                                        ) : (
                                            teams.map((team) => (
                                                <CommandItem
                                                    key={team.id}
                                                    value={team.name}
                                                    onSelect={() => {
                                                        setSelectedTeam(team)
                                                        setTeamOpen(false)
                                                    }}
                                                    className="text-white hover:bg-[#1a2540]/70"
                                                >
                                                    {team.name} ({team.unstopId})
                                                </CommandItem>
                                            ))
                                        )}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="points" className="text-[#87CEFA]">
                        Points
                    </Label>
                    <Select
                        value={points}
                        onValueChange={(value) => setPoints(value)}
                    >
                        <SelectTrigger 
                            className="w-full border-[#1e2d4a] bg-[#0a1121]/70 text-white hover:bg-[#1a2540]/70 backdrop-blur-sm transition-all duration-300"
                        >
                            <SelectValue placeholder="Select points..." />
                        </SelectTrigger>
                        <SelectContent className="border-[#1e2d4a] bg-[#111a2e]/90 backdrop-blur-md">
                            <SelectItem value="-1" className="text-white hover:bg-[#1a2540]/70">-1</SelectItem>
                            <SelectItem value="0" className="text-white hover:bg-[#1a2540]/70">0</SelectItem>
                            <SelectItem value="1" className="text-white hover:bg-[#1a2540]/70">1</SelectItem>
                            <SelectItem value="2" className="text-white hover:bg-[#1a2540]/70">2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center gap-2 border-[#1e2d4a] bg-[#0a1121]/70 text-[#87CEFA] hover:bg-[#1a2540]/70 hover:text-white backdrop-blur-sm transition-all duration-300"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Button>

                <Button
                    type="submit"
                    className="bg-[#1e3a6d]/80 text-white hover:bg-[#2a4980] backdrop-blur-sm transition-all duration-300 shadow-[0_0_15px_rgba(135,206,250,0.15)]"
                    disabled={!selectedQuest || !selectedTeam || !points || isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Submitting...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            Submit Points
                        </span>
                    )}
                </Button>
            </div>
        </form>
    )
}

