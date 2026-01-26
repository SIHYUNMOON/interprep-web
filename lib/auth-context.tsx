'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAdminLoggedIn: boolean
  setIsAdminLoggedIn: (value: boolean) => void
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuthStatus: () => Promise<void>
  isLoading: boolean
  getAuthToken: () => string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authToken, setAuthToken] = useState<string | null>(null)

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', { credentials: 'include' })
      if (response.ok) {
        const data = await response.json()
        setIsAdminLoggedIn(data.isAdmin === true)
      } else {
        setIsAdminLoggedIn(false)
      }
    } catch (error) {
      console.error('[v0] Auth check error:', error)
      setIsAdminLoggedIn(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      if (data.token) {
        setAuthToken(data.token)
        localStorage.setItem('admin_token', data.token)
        console.log('[v0] Auth token stored in localStorage')
      }

      setIsAdminLoggedIn(true)
    } catch (error) {
      console.error('[v0] Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setIsAdminLoggedIn(false)
      setAuthToken(null)
      localStorage.removeItem('admin_token')
    } catch (error) {
      console.error('[v0] Logout error:', error)
    }
  }

  const getAuthToken = () => {
    if (authToken) return authToken
    const stored = localStorage.getItem('admin_token')
    if (stored) {
      setAuthToken(stored)
      return stored
    }
    return null
  }

  // Load token from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('admin_token')
    if (stored) {
      setAuthToken(stored)
      setIsAdminLoggedIn(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn, login, logout, checkAuthStatus, isLoading, getAuthToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
