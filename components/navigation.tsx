"use client"

import { useEffect, useState } from "react"
import { Menu, Moon, Sun, X } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"

const navItems = [
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
]

// Tracks which section sits in the middle band of the viewport
function useActiveSection() {
  const [active, setActive] = useState("")
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    for (const id of ["top", ...navItems.map((i) => i.id), "contact"]) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])
  return active
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const active = useActiveSection()
  const reduce = useReducedMotion()

  // Theme is only known on the client; avoid rendering the wrong icon during SSR
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === "dark"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const themeToggle = (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-primary"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-5">
      <div className="mx-auto flex max-w-[84rem] items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Signature, top left; it writes itself in on load and gains a glass backing once the page scrolls */}
        <a
          href="#top"
          aria-label="Ritvik Reddy Gangula, back to top"
          className={`justify-self-start rounded-full border px-5 pb-1 pt-2.5 text-foreground transition-[background-color,border-color,box-shadow] duration-300 ${
            scrolled ? "glass-clear" : "border-transparent"
          }`}
        >
          <motion.span
            aria-hidden="true"
            className="block font-signature text-[2.6rem] leading-none md:text-[2.9rem]"
            initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
            animate={{ clipPath: "inset(-20% -10% -20% 0)" }}
            transition={reduce ? { duration: 0 } : { duration: 1.4, delay: 0.2, ease: [0.45, 0.05, 0.25, 1] }}
          >
            Ritvik
          </motion.span>
        </a>

        {/* Desktop: one glass pill holds the links, theme toggle and Contact */}
        <nav aria-label="Primary" className="glass-clear hidden items-center gap-1 rounded-full p-1.5 md:flex">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-lens"
                      className="absolute inset-0 rounded-full bg-foreground/[0.07]"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                      aria-hidden="true"
                    />
                  )}
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`label relative block rounded-full px-4 py-2.5 transition-colors ${
                      isActive ? "text-foreground" : "text-foreground/70 hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              )
            })}
          </ul>
          <span className="mx-1 h-5 w-px bg-foreground/15" aria-hidden="true" />
          {themeToggle}
          <a href="#contact" className="btn btn-solid h-9">
            Contact
          </a>
        </nav>

        {/* Mobile: theme toggle and menu in a small pill */}
        <div className="glass-clear flex items-center gap-0.5 rounded-full p-1 md:hidden">
          {themeToggle}
          <button
            className="grid h-9 w-9 place-items-center rounded-full text-foreground/80"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul id="mobile-menu" className="glass mt-3 rounded-3xl p-2 md:hidden">
          {[...navItems, { name: "Contact", id: "contact" }].map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className={`label block rounded-2xl px-4 py-3.5 ${
                  active === item.id ? "bg-foreground/[0.07] text-foreground" : "text-foreground/80"
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
