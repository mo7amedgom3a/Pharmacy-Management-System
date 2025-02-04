import { useState, useEffect } from "react"

interface AuthResponse {
  token: string
}

export function useAuth() {
  const [authToken, setAuthToken] = useState<string | null>(null)

  useEffect(() => {
    // Check if there's a token in localStorage when the component mounts
    const token = localStorage.getItem("authToken")
    if (token) {
      setAuthToken(token)
    }
  }, [])

  const login = async (email: string, password: string): Promise<string | null> => {
    try {
      // Replace this with your actual API call
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data: AuthResponse = await response.json()
      setAuthToken(data.token)
      return data.token
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

