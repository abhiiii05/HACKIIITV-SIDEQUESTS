import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, Flag, Clock } from "lucide-react"

export function StatsCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-[#1e2d4a] bg-[#111a2e]/70 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(135,206,250,0.1)]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total Teams</CardTitle>
                    <Users className="h-4 w-4 text-[#87CEFA]" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-[#87CEFA]">15</div>
                    <p className="text-xs text-gray-400">+2 from last event</p>
                </CardContent>
            </Card>

            <Card className="border-[#1e2d4a] bg-[#111a2e]/70 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(135,206,250,0.1)]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Active Quests</CardTitle>
                    <Flag className="h-4 w-4 text-[#87CEFA]" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-[#87CEFA]">5</div>
                    <p className="text-xs text-gray-400">All quests in progress</p>
                </CardContent>
            </Card>

            <Card className="border-[#1e2d4a] bg-[#111a2e]/70 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(135,206,250,0.1)]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Highest Score</CardTitle>
                    <Award className="h-4 w-4 text-[#87CEFA]" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-[#87CEFA]">450</div>
                    <p className="text-xs text-gray-400">Flying Dutchman</p>
                </CardContent>
            </Card>

            <Card className="border-[#1e2d4a] bg-[#111a2e]/70 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(135,206,250,0.1)]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Time Remaining</CardTitle>
                    <Clock className="h-4 w-4 text-[#87CEFA]" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-[#87CEFA]">2d 4h</div>
                    <p className="text-xs text-gray-400">Until event ends</p>
                </CardContent>
            </Card>
        </div>
    )
}

