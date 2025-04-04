import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SideQuestCards } from "@/components/side-quest-cards"
import { RankingTable } from "@/components/ranking-table"
import { StatsCards } from "@/components/stats-cards"
import { Particles } from "@/components/particles"
import { LogOut } from "lucide-react"

export default function Dashboard() {
  return (
      <div className="relative min-h-screen w-full overflow-hidden bg-[#0a1121]">
        <div className="absolute inset-0">
          <Particles />
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />

        <div className="container relative z-10 mx-auto px-4 py-8">
          <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-[#87CEFA] md:text-4xl">Organizer Dashboard</h1>
            <div className="flex gap-3">
              <Link href="/assign-points">
                <Button className="bg-[#1e3a6d]/80 text-white hover:bg-[#2a4980] backdrop-blur-sm transition-all duration-300 shadow-[0_0_15px_rgba(135,206,250,0.15)]">
                  Assign Points
                </Button>
              </Link>
              <Button
                  variant="outline"
                  className="border-[#1e3a6d]/50 bg-[#111a2e]/50 text-[#87CEFA] hover:bg-[#1e3a6d]/30 hover:text-white backdrop-blur-sm transition-all duration-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </header>
          <section className="mb-10 mt-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#87CEFA] uppercase tracking-wide">Side Quests!</h2>
            </div>
            <SideQuestCards />
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-[#87CEFA]">Team Rankings</h2>
            <div className="rounded-lg border border-[#1e2d4a] bg-[#111a2e]/70 p-1 shadow-[0_0_15px_rgba(0,0,0,0.1)] backdrop-blur-md">
              <RankingTable />
            </div>
          </section>
        </div>
      </div>
  )
}

