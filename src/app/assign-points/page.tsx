import { PointsForm } from "@/components/points-form"
import { Particles } from "@/components/particles"

export default function AssignPoints() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#0a1121]">
            <div className="absolute inset-0">
                <Particles />
            </div>
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />

            <div className="container relative z-10 mx-auto px-4 py-8">
                <div className="mx-auto max-w-3xl">
                    <h1 className="mb-8 text-center text-3xl font-bold text-[#87CEFA]">Assign Points</h1>
                    <div className="rounded-lg border border-[#1e2d4a] bg-[#111a2e]/70 p-6 shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-blur-md">
                        <PointsForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

