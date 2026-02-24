import React, { useContext, useEffect, useState, useRef } from "react"
import { recipe } from "../context/RecipeContext"
import RecipeCard from "../components/RecipeCard"
import api from "../utils/api"
const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY

const Recipes = () => {
  const { data, setData } = useContext(recipe)
  const [loading, setLoading] = useState(true)
  const loadedOnce = useRef(false)

  useEffect(() => {
    const loadRecipes = async () => {
      const apiLoaded = localStorage.getItem("apiLoaded")

      if (data.length > 0 || apiLoaded) {
        setLoading(false)
        return
      }

      try {
        const res = await api.get(`/recipes/random?number=12&apiKey=${API_KEY}`)

        const formatted = res.data.recipes.map((item) => ({
          id: item.id.toString(),
          title: item.title,
          chef: item.sourceName || "Community Chef",
          category: item.dishTypes?.[0] || "Recipe",
          image: item.image,
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

    const res = await api.get(`/recipes/random?number=12&apiKey=${API_KEY}`)

    const formatted = res.data.recipes.map((item) => ({
      id: item.id.toString(),
      title: item.title,
      chef: item.sourceName || "Community Chef",
      category: item.dishTypes?.[0] || "Recipe",
      image: item.image,
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
        {data.map((item) => (
          <RecipeCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Recipes
