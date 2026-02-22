import React from "react"
import { NavLink } from "react-router-dom"

export default function Navbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Recipes", path: "/recipes" },
    { name: "Create", path: "/create-recipe" },
  ]

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-full 
                      bg-white/70 backdrop-blur-md border border-white/20 
                      shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
      >
        {navItems.map((item) => (
          // Simplified snippet of your NavLink with improved CSS logic
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
    relative px-4 py-2 transition-all duration-300 ease-in-out active:scale-95
    ${isActive ? "scale-105" : "hover:scale-105"}
  `}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`relative z-10 text-sm font-semibold transition-colors duration-300
        ${isActive ? "text-emerald-700" : "text-gray-500 hover:text-gray-900"}`}
                >
                  {item.name}
                </span>

                {isActive && (
                  <div className="absolute inset-0 bg-emerald-100/60 rounded-full z-0 ring-1 ring-emerald-200/50 shadow-sm" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
