"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop sidebar nav */}
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

      {/* Mobile hamburger button */}
      <button
        className="fixed top-6 left-6 z-50 lg:hidden glass p-2 rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm"
        onClick={() => setMobileMenuOpen((v) => !v)}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile full-screen menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`text-2xl font-semibold transition-colors duration-200 px-8 py-3 rounded-lg ${
                activeSection === item.href.slice(1)
                  ? "text-accent bg-accent/10"
                  : "text-foreground hover:text-accent"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
