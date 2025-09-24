"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection(item.href)}
            className={`justify-start text-sm transition-all duration-200 ${
              activeSection === item.href.slice(1)
                ? "text-accent border-l-2 border-accent bg-accent/10"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </nav>
  )
}
