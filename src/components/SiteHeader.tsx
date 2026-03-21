import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"

const sections = [
  { id: "profile", label: "Profile" },
  { id: "publications", label: "Publications" },
  { id: "blog", label: "Blog" },
]

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("profile")
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })
  const linksRef = useRef<Record<string, HTMLAnchorElement | null>>({})
  const linksWrapRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeLink = linksRef.current[activeSection]

      if (!activeLink) {
        return
      }

      setIndicatorStyle({
        left: activeLink.offsetLeft + 18,
        width: Math.max(activeLink.offsetWidth - 36, 24),
        opacity: 1,
      })
    }

    updateIndicator()

    const resizeObserver = new ResizeObserver(updateIndicator)
    const linksWrap = linksWrapRef.current

    if (linksWrap) {
      resizeObserver.observe(linksWrap)
    }

    for (const link of Object.values(linksRef.current)) {
      if (link) {
        resizeObserver.observe(link)
      }
    }

    window.addEventListener("resize", updateIndicator)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateIndicator)
    }
  }, [activeSection])

  useEffect(() => {
    const observedSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    )

    if (observedSections.length === 0) {
      return
    }

    const visibleSections = new Set<string>()
    const activeZoneOffset = 136

    const pickActiveSection = () => {
      const candidates = observedSections
        .filter((section) => visibleSections.has(section.id))
        .map((section) => ({
          id: section.id,
          score: Math.abs(section.getBoundingClientRect().top - activeZoneOffset),
        }))
        .sort((left, right) => left.score - right.score)

      if (candidates[0]) {
        setActiveSection(candidates[0].id)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = (entry.target as HTMLElement).id

          if (entry.isIntersecting) {
            visibleSections.add(sectionId)
          } else {
            visibleSections.delete(sectionId)
          }
        }

        pickActiveSection()
      },
      {
        rootMargin: "-112px 0px -58% 0px",
        threshold: [0, 0.15, 0.35, 0.6],
      }
    )

    for (const section of observedSections) {
      observer.observe(section)
    }

    const handleHashChange = () => {
      const nextId = window.location.hash.replace("#", "")
      if (nextId) {
        setActiveSection(nextId)
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    setActiveSection("profile")

    return () => {
      observer.disconnect()
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-5">
      <nav
        aria-label="Section navigation"
        className="flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--sn-surface-bright)_72%,transparent)] px-3 py-2.5 shadow-[0px_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:gap-4 sm:px-5 sm:py-3"
      >
        <span className="hidden whitespace-nowrap pr-2 font-heading text-sm font-semibold tracking-[0.28em] text-[var(--sn-primary)] sm:inline">
          RYOTA MURAI
        </span>

        <div
          ref={linksWrapRef}
          className="relative flex items-center gap-1.5 pb-1 sm:gap-2"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 z-10 h-0.5 rounded-full bg-[color-mix(in_srgb,var(--sn-secondary)_88%,transparent)] transition-[left,width,opacity] duration-250 ease-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
          {sections.map((section) => {
            const isActive = activeSection === section.id

            return (
              <Button
                key={section.id}
                asChild
                variant="ghost"
                className="section-link relative z-20 h-9 rounded-full border border-transparent px-4 font-heading text-sm font-medium tracking-[0.08em] text-[var(--sn-on-surface-variant)] transition-all duration-200 hover:bg-[color-mix(in_srgb,var(--sn-surface-container-highest)_74%,transparent)] hover:text-[var(--sn-on-surface)] focus-visible:ring-[color-mix(in_srgb,var(--sn-secondary)_35%,transparent)] sm:h-10 sm:px-5"
              >
                <a
                  href={`#${section.id}`}
                  ref={(node) => {
                    linksRef.current[section.id] = node
                  }}
                  data-section-link={section.id}
                  data-active={isActive ? "true" : "false"}
                  aria-current={isActive ? "page" : "false"}
                  onClick={() => {
                    setActiveSection(section.id)
                  }}
                >
                  {section.label}
                </a>
              </Button>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
