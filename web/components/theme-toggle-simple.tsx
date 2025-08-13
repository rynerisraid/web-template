"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Laptop } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export function ThemeToggleSimple() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 确保组件在客户端正确挂载后再渲染
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10 md:w-10 md:h-10 bg-muted animate-pulse rounded-md" />
    )
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getThemeIcon = () => {
    if (theme === "light") {
      return <Sun className="h-5 w-5" />
    } else if (theme === "dark") {
      return <Moon className="h-5 w-5" />
    } else {
      return <Laptop className="h-5 w-5" />
    }
  }

  const getThemeLabel = () => {
    if (theme === "light") {
      return "Light"
    } else if (theme === "dark") {
      return "Dark"
    } else {
      return "System"
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Current theme: ${getThemeLabel()}. Click to switch theme.`}
      className={cn("relative w-10 h-10", theme && "bg-muted")}
    >
      {getThemeIcon()}
      <span className="sr-only">Switch to next theme (current: {getThemeLabel()})</span>
    </Button>
  )
}