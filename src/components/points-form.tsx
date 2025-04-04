"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Award, Search } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample data
const sideQuests = [
    { id: 1, name: "Treasure Hunt" },
    { id: 2, name: "Code Breaker" },
    { id: 3, name: "Ship Battle" },
    { id: 4, name: "Island Conquest" },
    { id: 5, name: "Gem Collector" },
]

const teams = [
    { id: 1, name: "Black Pearl" },
    { id: 2, name: "Flying Dutchman" },
    { id: 3, name: "Queen Anne's Revenge" },
    { id: 4, name: "Jolly Roger" },
    { id: 5, name: "Sea Serpent" },
    { id: 6, name: "Royal Fortune" },
    { id: 7, name: "Adventure Galley" },
]

export function PointsForm() {
    const router = useRouter()
    const [selectedQuest, setSelectedQuest] = useState<{ id: number; name: string } | null>(null)
    const [selectedTeam, setSelectedTeam] = useState<{ id: number; name: string } | null>(null)
    const [points, setPoints] = useState("")
    const [questOpen, setQuestOpen] = useState(false)
    const [teamOpen, setTeamOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedQuest || !selectedTeam || !points) {
            return
        }

        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            router.push("/dashboard")
        }, 1000)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                                        {sideQuests.map((quest) => (
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
                                        ))}
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
                                        {teams.map((team) => (
                                            <CommandItem
                                                key={team.id}
                                                value={team.name}
                                                onSelect={() => {
                                                    setSelectedTeam(team)
                                                    setTeamOpen(false)
                                                }}
                                                className="text-white hover:bg-[#1a2540]/70"
                                            >
                                                {team.name}
                                            </CommandItem>
                                        ))}
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
                    <Input
                        id="points"
                        type="number"
                        min="0"
                        max="100"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        placeholder="Enter points (0-100)"
                        className="border-[#1e2d4a] bg-[#0a1121]/70 text-white placeholder:text-gray-500 backdrop-blur-sm"
                        required
                    />
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

