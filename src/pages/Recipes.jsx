import React, { useContext } from "react";
import { recipe } from "../context/RecipeContext";

const Recipes = () => {
  const { data } = useContext(recipe);

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-16">
        <p className="text-gray-400 text-lg font-medium">
          No recipes yet 🍽️
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Start by creating your first delicious recipe.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
        >
          {/* IMAGE */}
          <div className="h-48 bg-gray-100 overflow-hidden">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300 text-sm">
                No Image
              </div>
            )}
          </div>

          <div className="p-5 space-y-3">
            {/* TITLE */}
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              {item.title}
            </h2>

            {/* CHEF */}
            <p className="text-sm text-gray-500">
              by <span className="font-medium text-gray-700">{item.chef}</span>
            </p>

            {/* CATEGORY */}
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
              {item.category}
            </span>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm line-clamp-2">
              {item.description}
            </p>

            {/* INGREDIENTS */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Ingredients
              </h3>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-0.5">
                {item.ingredients.slice(0, 4).map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipes;