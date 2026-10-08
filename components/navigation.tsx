"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"

const leftItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
]
const rightItems = [
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
]
const socials = [
  { label: "GitHub", href: "https://github.com/ritvikreddygangula", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/gritvik", icon: Linkedin },
  { label: "Email", href: "mailto:ritvikreddygangula@gmail.com", icon: Mail },
]

const linkClass = "label text-foreground/80 hover:text-primary transition-colors"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // Theme is only known on the client; avoid rendering the wrong icon during SSR
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === "dark"

  const themeToggle = (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center text-foreground/70 hover:text-primary transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )

  return (
    <header className="relative z-20 px-5 pt-5 md:px-8 md:pt-6">
      <nav className="hidden md:grid max-w-6xl mx-auto grid-cols-[1fr_auto_1fr] items-start">
        <div className="flex items-center gap-10 pt-3">
          {leftItems.map((item) => (
            <a key={item.name} href={item.href} className={linkClass}>
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <a href="#top" className="display text-center text-[1.65rem] leading-[0.85] uppercase text-foreground">
            Ritvik
            <br />
            Gangula
          </a>
          <div className="mt-2 flex items-center gap-2.5">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-10 pt-1.5">
          {rightItems.map((item) => (
            <a key={item.name} href={item.href} className={linkClass}>
              {item.name}
            </a>
          ))}
          <div className="flex items-center gap-3">
            <a href="#contact" className="btn btn-solid h-8">
              Contact
            </a>
            {themeToggle}
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <nav className="flex md:hidden items-center justify-between">
        <a href="#top" className="display text-2xl leading-[0.85] uppercase text-foreground">
          Ritvik
          <br />
          Gangula
        </a>
        <div className="flex items-center gap-1">
          {themeToggle}
          <button
            className="grid h-9 w-9 place-items-center text-foreground/80"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col">
          {[...leftItems, ...rightItems, { name: "Contact", href: "#contact" }].map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="rule-dotted py-3 label text-foreground hover:text-primary"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
