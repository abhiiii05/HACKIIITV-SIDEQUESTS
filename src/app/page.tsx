import { Anchor } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { Particles } from "@/components/particles"

export default function Home() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#0a1121]">
            <div className="absolute inset-0">
                <Particles />
            </div>
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />

            <div className="container relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#111a2e]/70 border border-[#1e2d4a] backdrop-blur-md">
                            <Anchor className="h-10 w-10 text-[#87CEFA]" />
                        </div>
                        <h1 className="mt-6 text-3xl font-bold text-[#87CEFA]">Side Quest Manager</h1>
                        <p className="mt-2 text-gray-400">Sign in to access the organizer dashboard</p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
