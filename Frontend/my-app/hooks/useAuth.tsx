import { useState, useEffect } from "react"
import './envConfig'
import { HOST, PORT } from "@/config"
export function useAuth() {
  const [authToken, setAuthToken] = useState<string | null>(null)
  

  useEffect(() => {
    // Check if there's a token in localStorage when the component mounts
    const token = localStorage.getItem("authToken")
    if (token) {
      setAuthToken(token)
    }
  }, [])

  const login = async (username: string, password: string): Promise<string | null> => {
    try {
      const response = await fetch(`http://${HOST}:${PORT}/auth/login`, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.text()
      setAuthToken(data)
      localStorage.setItem("authToken", data)
      return data
    } catch (error) {
      console.error("Login error:", error)
      return null
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    setAuthToken(null)
  }

  return { authToken, login, logout }
}

export function isAdmin (authToken: string | null): boolean {
  if (!authToken) {
    return false
  }
  // Decode the token and check if the user is an admin
  const [, payload] = authToken.split(".")
  const decodedPayload = JSON.parse(atob(payload))
  return decodedPayload.role === "admin"
}