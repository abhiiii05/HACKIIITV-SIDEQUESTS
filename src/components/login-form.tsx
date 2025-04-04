"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRound } from "lucide-react"
import { signIn } from "@/actions/signin"

export function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        const username = formData.get("username")?.toString()
        const password = formData.get("password")?.toString()

        if (!username || !password) {
            alert("Please enter username and password")
            setIsLoading(false)
            return
        }

        try {
            const response = await signIn(username, password)

            if (response.error) {
                alert(response.message)
            } else {
                router.push("/dashboard")
            }
        } catch (error) {
            alert("An error occurred during login")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="border-[#1e2d4a] bg-[#111a2e]/70 shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-xl text-white">Organizer Login</CardTitle>
                <CardDescription className="text-gray-400">Enter your credentials to access the dashboard</CardDescription>
            </CardHeader>
            <form action={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-[#87CEFA]">
                            Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            required
                            className="border-[#1e2d4a] bg-[#0a1121]/70 text-white placeholder:text-gray-500 backdrop-blur-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-[#87CEFA]">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            className="border-[#1e2d4a] bg-[#0a1121]/70 text-white placeholder:text-gray-500 backdrop-blur-sm"
                        />
                    </div>
                </CardContent>
                <CardFooter className="py-3">
                    <Button
                        type="submit"
                        className="w-full bg-[#1e3a6d]/80 text-white hover:bg-[#2a4980] backdrop-blur-sm transition-all duration-300 shadow-[0_0_15px_rgba(135,206,250,0.15)]"
                        disabled={isLoading}
                    >
                        {isLoading ? (
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
                Logging in...
              </span>
                        ) : (
                            <span className="flex items-center gap-2">
                <KeyRound className="h-4 w-4" />
                Login
              </span>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}