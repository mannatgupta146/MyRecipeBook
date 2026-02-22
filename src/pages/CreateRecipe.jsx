import { nanoid } from "nanoid"
import React, { use, useContext } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { recipe } from "../context/RecipeContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const CreateRecipe = () => {

  const {data, setData} = useContext(recipe)
  const navigate = useNavigate();
    
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      ingredients: [{ value: "" }],
      category: "", // Initialize category
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  })

  const formData = watch()
  const imageUrl = formData.image

  // Updated progress fields to include Chef and Category
  const progressFields = [
    formData.title,
    formData.chef,
    formData.category,
    formData.image,
    formData.description,
    formData.instructions,
    formData.ingredients?.some((i) => i.value.trim()),
  ]

  const progress =
    (progressFields.filter(Boolean).length / progressFields.length) * 100

  const inputStyle = (error) =>
    `w-full border ${error ? "border-red-300" : "border-gray-200"}
     rounded-xl px-4 py-3 text-sm outline-none
     transition duration-200 bg-white
     focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
     hover:border-gray-300`

const onSubmit = async (formData) => {
  await new Promise(r => setTimeout(r, 1000));

  const newRecipe = {
    ...formData,
    id: nanoid(),
    ingredients: formData.ingredients
      .map(i => i.value.trim())
      .filter(Boolean),
  };

  setData(prev => [...prev, newRecipe]);

  toast.success("New recipe create successfully!");
  navigate("/recipes");

  reset();
};

  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
    "Beverage",
  ]

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create Recipe
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Capture your flavors for the world to see.
          </p>
        </div>

        {/* PROGRESS */}
        <div className="w-full md:w-64 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between text-xs font-bold text-emerald-700 mb-1.5 uppercase tracking-wider">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <form
        className="grid lg:grid-cols-12 gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* LEFT COLUMN */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-28 space-y-4">
            <div className="aspect-square rounded-4xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="preview"
                  className="w-full h-full object-cover animate-in fade-in duration-500"
                />
              ) : (
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-gray-300">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.587-1.587a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-widest">
                    Image Preview
                  </span>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm space-y-4">
              <input
                placeholder="Image URL (Unsplash works best)"
                {...register("image", { required: true })}
                className={inputStyle(errors.image)}
              />
              <input
                placeholder="Recipe Title"
                {...register("title", { required: true })}
                className={`${inputStyle(errors.title)} font-bold text-base`}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          {/* CHEF & CATEGORY GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Chef Name
              </label>
              <input
                placeholder="Your Name"
                {...register("chef", { required: true })}
                className={inputStyle(errors.chef)}
              />
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Category
              </label>
              <select
                {...register("category", { required: true })}
                className={`${inputStyle(errors.category)} appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
              Description
            </label>
            <textarea
              placeholder="What makes this dish special?"
              {...register("description", { required: true })}
              className={`${inputStyle(errors.description)} h-28 resize-none`}
            />
          </section>

          {/* INGREDIENTS */}
          <section className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <label className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                Ingredients
              </label>
              <button
                type="button"
                onClick={() => append({ value: "" })}
                className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold hover:bg-emerald-600 transition shadow-sm"
              >
                + ADD ITEM
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2 group">
                  <input
                    {...register(`ingredients.${index}.value`, {
                      required: true,
                    })}
                    placeholder={`Item #${index + 1}`}
                    className={`${inputStyle()} py-2!`}
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-gray-300 hover:text-rose-500 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M6 18L18 6M6 6l12 12"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* INSTRUCTIONS */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
              Instructions
            </label>
            <textarea
              placeholder="1. Preheat oven... &#10;2. Mix ingredients..."
              {...register("instructions", { required: true })}
              className={`${inputStyle(errors.instructions)} h-40 font-mono text-xs leading-relaxed`}
            />
          </section>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-16 bg-gray-900 text-white rounded-2xl font-bold text-lg
                       hover:bg-emerald-600 transition duration-300 transform
                       active:scale-[0.98] disabled:bg-gray-300 shadow-xl shadow-gray-200 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Publish Recipe"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateRecipe
