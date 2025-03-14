"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { AlertCircle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const token = await login(email, password)
            if (token) {
                localStorage.setItem("authToken", token)
                router.push("/dashboard")
            } else {
                setError("Invalid email or password")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16  rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl font-bold"><img src="https://github.com/mo7amedgom3a/Pharmacy-Management-System/blob/main/Frontend/my-app/app/public/pharmacy-symbol.png?raw=true"></img></span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">Mekkawy Pharma</CardTitle>
                    <CardDescription className="text-center">Enter your credentials to access the system</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email">Email</label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="admin@pharmacy.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password">Password</label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {error && (
                            <div className="flex items-center space-x-2 text-red-600 mt-4">
                                <AlertCircle size={16} />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}
                        <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Log in"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-center w-full text-gray-600">Forgot your password? Contact system administrator</p>
                </CardFooter>
            </Card>
        </div>
    )
}
