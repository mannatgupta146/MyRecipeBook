import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { recipe } from "../context/RecipeContext"
import { useForm, useFieldArray } from "react-hook-form"
import { toast } from "react-toastify"

const EditRecipe = () => {
  const [customCategory, setCustomCategory] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const { id } = useParams()
  const navigate = useNavigate()
  const { data, setData } = useContext(recipe)

  const recipeItem = data.find((r) => r.id === id)

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      chef: "",
      category: "",
      image: "",
      description: "",
      ingredients: [{ value: "" }],
      instructions: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  })

  useEffect(() => {
    if (recipeItem) {
      reset({
        ...recipeItem,
        ingredients: recipeItem.ingredients.map((i) => ({ value: i })),
      })

      if (categories.includes(recipeItem.category)) {
        setSelectedCategory(recipeItem.category)
      } else {
        setSelectedCategory("Other")
        setCustomCategory(recipeItem.category)
      }
    }
  }, [recipeItem, reset])

  const onSubmit = (formData) => {
    const finalCategory =
      selectedCategory === "Other" ? customCategory : selectedCategory

    const updatedRecipe = {
      ...formData,
      id,
      category: finalCategory,
      ingredients: formData.ingredients
        .map((i) => i.value.trim())
        .filter(Boolean),
    }

    const updatedData = data.map((r) => (r.id === id ? updatedRecipe : r))

    setData(updatedData)
    toast.success("Recipe updated successfully ✅")
    navigate(`/recipe/details/${id}`)
  }

  if (!recipeItem) return null

  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
    "Beverage",
  ]

  const inputStyle =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition " +
    "focus:bg-white focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400"

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4">
      {/* HEADER */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Edit Your Recipe</h2>
        <p className="text-gray-500 mt-1">
          Refine the flavors and make it even better.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6"
      >
        {/* IMAGE */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Image URL
          </label>
          <input
            placeholder="Paste image link"
            {...register("image", { required: true })}
            className={`${inputStyle} mt-2`}
          />
        </div>

        {/* TITLE */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Recipe Title
          </label>
          <input
            {...register("title", { required: true })}
            className={`${inputStyle} mt-2 font-semibold`}
          />
        </div>

        {/* CHEF & CATEGORY */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Chef
            </label>
            <input
              {...register("chef", { required: true })}
              className={`${inputStyle} mt-2`}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Category
            </label>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`${inputStyle} mt-2 cursor-pointer`}
            >
              <option value="">Select</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
              <option value="Other">Other</option>
            </select>

            {selectedCategory === "Other" && (
              <input
                type="text"
                placeholder="Enter custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className={`${inputStyle} mt-2`}
              />
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            className={`${inputStyle} mt-2 h-24 resize-none`}
          />
        </div>

        {/* INGREDIENTS */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Ingredients
            </label>
            <button
              type="button"
              onClick={() => append({ value: "" })}
              className="text-xs font-semibold text-emerald-600 hover:underline"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 group">
                <input
                  {...register(`ingredients.${index}.value`, {
                    required: true,
                  })}
                  className={inputStyle}
                  placeholder={`Ingredient ${index + 1}`}
                />

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-300 hover:text-red-500 transition"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* INSTRUCTIONS */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Instructions
          </label>
          <textarea
            {...register("instructions", { required: true })}
            placeholder="Write one step per line..."
            className={`${inputStyle} mt-2 h-32`}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 border border-gray-200 rounded-xl py-3 font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 bg-emerald-600 text-white rounded-xl py-3 font-semibold
                       hover:bg-emerald-700 transition shadow-md shadow-emerald-200"
          >
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditRecipe
