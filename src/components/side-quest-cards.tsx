import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, Skull, Map, Anchor, Gem } from "lucide-react"

const sideQuests = [
    {
        id: 1,
        name: "Treasure Hunt",
        description: "Find the hidden treasures across the island",
        icon: Skull,
        teams: 12,
        color: "from-[#3b82f6] to-[#1e40af]",
        progress: 85,
    },
    {
        id: 2,
        name: "Code Breaker",
        description: "Decrypt the ancient pirate codes",
        icon: Map,
        teams: 10,
        color: "from-[#06b6d4] to-[#0284c7]",
        progress: 72,
    },
    {
        id: 3,
        name: "Ship Battle",
        description: "Navigate through stormy waters",
        icon: Anchor,
        teams: 8,
        color: "from-[#2dd4bf] to-[#0891b2]",
        progress: 65,
    },
    {
        id: 4,
        name: "Island Conquest",
        description: "Capture and hold strategic locations",
        icon: Compass,
        teams: 15,
        color: "from-[#4ade80] to-[#0d9488]",
        progress: 90,
    },
    {
        id: 5,
        name: "Gem Collector",
        description: "Collect rare gems from the caves",
        icon: Gem,
        teams: 9,
        color: "from-[#38bdf8] to-[#1d4ed8]",
        progress: 78,
    },
]

export function SideQuestCards() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {sideQuests.map((quest) => (
                <Card
                    key={quest.id}
                    className="group overflow-hidden border-[#1e2d4a] bg-[#111a2e]/70 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(135,206,250,0.15)]"
                >
                    <CardHeader className="pb-2">
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0a1121]/70 border border-[#1e2d4a] shadow-lg backdrop-blur-sm">
                            <quest.icon className="h-6 w-6 text-[#87CEFA]" />
                        </div>
                        <CardTitle className="text-lg text-white">{quest.name}</CardTitle>
                        <CardDescription className="text-gray-400">{quest.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-gray-400">{quest.teams} Teams Participated</span>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#0a1121]/70 backdrop-blur-sm">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${quest.color} animate-pulse`}
                                    style={{
                                        width: `${quest.progress}%`,
                                        animationDuration: "3s",
                                    }}
                                ></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

