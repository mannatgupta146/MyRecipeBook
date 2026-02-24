import React, { useContext, useEffect, useState, useRef } from "react"
import { recipe } from "../context/RecipeContext"
import RecipeCard from "../components/RecipeCard"
import api from "../utils/api"
const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY

const Recipes = () => {
  const { data, setData } = useContext(recipe)
  const [loading, setLoading] = useState(true)
  const loadedOnce = useRef(false)
  const [search, setSearch] = useState("")

  const filteredRecipes = [...data].filter((item) => {
    const text = search.toLowerCase()

    return (
      item.title.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text) ||
      item.chef.toLowerCase().includes(text) ||
      item.ingredients.join(" ").toLowerCase().includes(text)
    )
  })

  useEffect(() => {
    const loadRecipes = async () => {
      const apiLoaded = localStorage.getItem("apiLoaded")

      if (data.length > 0 || apiLoaded) {
        setLoading(false)
        return
      }

      try {
        const res = await api.get(`/recipes/random?number=15&apiKey=${API_KEY}`)

        const formatted = res.data.recipes.map((item) => ({
          id: item.id.toString(),
          title: item.title,
          chef: item.sourceName || "Community Chef",
          category: item.dishTypes?.[0] || "Recipe",
          image: item.image,
          isUserCreated: false,
          description:
            item.summary
              .replace(/<[^>]+>/g, "") // remove HTML
              .replace(/\s+/g, " ") // normalize spaces
              .trim()
              .match(/^.{1,140}(\.|!|\?)/)?.[0] ||
            item.summary.replace(/<[^>]+>/g, "").slice(0, 140) + "...",
          ingredients: item.extendedIngredients.map((ing) => ing.original),
          instructions: item.analyzedInstructions[0]?.steps.map(
            (s) => s.step,
          ) || ["Follow standard preparation steps"],
        }))

        setData(formatted)
        localStorage.setItem("apiLoaded", "true")
      } catch (err) {
        console.log(err)
      }

      setLoading(false)
    }

    loadRecipes()
  }, [])

  const restoreRecipes = async () => {
    setLoading(true)

    const res = await api.get(`/recipes/random?number=15&apiKey=${API_KEY}`)

    const formatted = res.data.recipes.map((item) => ({
      id: item.id.toString(),
      title: item.title,
      chef: item.sourceName || "Community Chef",
      category: item.dishTypes?.[0] || "Recipe",
      image: item.image,
      isUserCreated: false,
      description:
        item.summary
          .replace(/<[^>]+>/g, "") // remove HTML
          .replace(/\s+/g, " ") // normalize spaces
          .trim()
          .match(/^.{1,140}(\.|!|\?)/)?.[0] ||
        item.summary.replace(/<[^>]+>/g, "").slice(0, 140) + "...",
      ingredients: item.extendedIngredients.map((ing) => ing.original),
      instructions: item.analyzedInstructions[0]?.steps.map((s) => s.step) || [
        "Follow standard preparation steps",
      ],
    }))

    setData(formatted)
    setLoading(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* SEARCH BAR */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search recipes, categories, chefs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 pl-12 rounded-xl border border-gray-200
                 focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400
                 outline-none text-sm"
          />

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore Delicious Recipes
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Discover flavors shared by our community of food lovers.
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-400">Loading recipes...</p>
      )}

      {/* EMPTY */}
      {!loading && data.length === 0 && (
        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-400 text-lg font-medium">
            No recipes found 🍽️
          </p>
          <p className="text-gray-500 text-sm">
            Looks like everything was removed.
          </p>

          <button
            onClick={restoreRecipes}
            className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition shadow"
          >
            Restore Default Recipes
          </button>
        </div>
      )}

      {/* GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes
          .sort((a, b) => (b.isUserCreated ? 1 : 0) - (a.isUserCreated ? 1 : 0))
          .map((item) => (
            <RecipeCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  )
}

export default Recipes
