import React from "react";

const RecipeCard = ({ item }) => {
  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                 hover:shadow-lg hover:-translate-y-1 transition duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300 text-sm">
            No Image
          </div>
        )}

        {/* CATEGORY BADGE */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-semibold rounded-full text-emerald-700 shadow">
          {item.category}
        </span>
      </div>

      <div className="p-5 space-y-3">
        {/* TITLE */}
        <h2 className="text-lg font-bold text-gray-900 leading-snug">
          {item.title}
        </h2>

        {/* CHEF */}
        <p className="text-xs text-gray-500">
          by <span className="font-medium text-gray-700">{item.chef}</span>
        </p>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* INGREDIENT CHIPS */}
        <div>
          <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Ingredients
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {item.ingredients.map((ing, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full
                           hover:bg-emerald-100 hover:text-emerald-700 transition"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* STEPS */}
        <div>
          <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-2 mb-1">
            Steps
          </h3>

          <ol className="text-sm text-gray-700 list-decimal list-inside space-y-0.5">
            {(Array.isArray(item.instructions)
              ? item.instructions
              : item.instructions?.split("\n")
            )
              ?.slice(0, 2)
              .map((step, i) => (
                <li key={i}>{step}</li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;