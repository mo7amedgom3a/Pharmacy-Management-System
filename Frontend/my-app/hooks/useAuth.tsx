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

      let data = await response.text()
      data = data.replace(/"/g, '') // Remove double quotes from the token
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

export function getAuthToken (): string {
  const token = localStorage.getItem("authToken")
  if (!token) {
    throw new Error("No auth token found")
  }
  return token
}
// function return payload of the token
export function getTokenPayload (authToken: string): any {
  const [, payload] = authToken.split(".")
  return JSON.parse(atob(payload))
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