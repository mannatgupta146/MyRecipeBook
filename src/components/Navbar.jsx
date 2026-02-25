import React from "react"
import { NavLink } from "react-router-dom"

export default function Navbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Recipes", path: "/recipes" },
    { name: "Create", path: "/create-recipe" },
    { name: "Favourites", path: "/favourites" }
  ]

  return (
    <nav className="fixed top-4 inset-x-0 flex justify-center z-50 px-2">
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full
                   bg-white/70 backdrop-blur-md border border-white/20
                   shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
                   overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              relative px-3 py-2 shrink-0
              transition-all duration-300 active:scale-95
              ${isActive ? "scale-105" : "hover:scale-105"}
            `}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`relative z-10 text-xs md:text-sm font-semibold transition-colors
                  ${
                    isActive
                      ? "text-emerald-700"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
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