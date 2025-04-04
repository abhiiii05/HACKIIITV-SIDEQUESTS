import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Medal } from "lucide-react"

// Sample data for the table
const teams = [
    {
        id: 1,
        name: "Black Pearl",
        points: [85, 92, 78, 90, 88],
    },
    {
        id: 2,
        name: "Flying Dutchman",
        points: [92, 88, 95, 85, 90],
    },
    {
        id: 3,
        name: "Queen Anne's Revenge",
        points: [78, 85, 80, 92, 88],
    },
    {
        id: 4,
        name: "Jolly Roger",
        points: [90, 85, 88, 75, 82],
    },
    {
        id: 5,
        name: "Sea Serpent",
        points: [85, 80, 75, 88, 92],
    },
    {
        id: 6,
        name: "Royal Fortune",
        points: [75, 78, 82, 80, 85],
    },
    {
        id: 7,
        name: "Adventure Galley",
        points: [82, 85, 80, 78, 75],
    },
]

// Calculate total points and sort teams by total
const rankedTeams = teams
    .map((team) => ({
        ...team,
        total: team.points.reduce((sum, point) => sum + point, 0),
    }))
    .sort((a, b) => b.total - a.total)
    .map((team, index) => ({
        ...team,
        rank: index + 1,
    }))

export function RankingTable() {
    return (
        <div className="rounded-md">
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-[#1e2d4a] hover:bg-transparent">
                        <TableHead className="w-[80px] text-[#87CEFA]">Rank</TableHead>
                        <TableHead className="text-[#87CEFA]">Team Name</TableHead>
                        <TableHead className="text-right text-[#87CEFA]">Quest 1</TableHead>
                        <TableHead className="text-right text-[#87CEFA]">Quest 2</TableHead>
                        <TableHead className="text-right text-[#87CEFA]">Quest 3</TableHead>
                        <TableHead className="text-right text-[#87CEFA]">Quest 4</TableHead>
                        <TableHead className="text-right text-[#87CEFA]">Quest 5</TableHead>
                        <TableHead className="text-right text-[#87CEFA]">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rankedTeams.map((team) => (
                        <TableRow
                            key={team.id}
                            className="border-b border-[#1e2d4a] text-white hover:bg-[#1a2540]/50 transition-colors duration-200"
                        >
                            <TableCell className="font-medium">
                                {team.rank === 1 ? (
                                    <div className="flex items-center">
                                        <Trophy className="mr-1 h-4 w-4 text-yellow-400" />
                                        <span>{team.rank}</span>
                                    </div>
                                ) : team.rank === 2 ? (
                                    <div className="flex items-center">
                                        <Medal className="mr-1 h-4 w-4 text-gray-300" />
                                        <span>{team.rank}</span>
                                    </div>
                                ) : team.rank === 3 ? (
                                    <div className="flex items-center">
                                        <Medal className="mr-1 h-4 w-4 text-amber-600" />
                                        <span>{team.rank}</span>
                                    </div>
                                ) : (
                                    team.rank
                                )}
                            </TableCell>
                            <TableCell>{team.name}</TableCell>
                            {team.points.map((point, index) => (
                                <TableCell key={index} className="text-right text-[#87CEFA]">
                                    {point}
                                </TableCell>
                            ))}
                            <TableCell className="text-right font-bold text-[#87CEFA]">{team.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

