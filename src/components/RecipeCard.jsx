import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipe/details/${item.id}`)}
      className="group cursor-pointer bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden
                 hover:shadow-md hover:-translate-y-1 transition duration-300"
    >
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <span className="absolute top-3 left-3 bg-white/90 px-2 py-1 text-[10px] font-semibold rounded-full text-emerald-700 shadow-sm">
          {item.category}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-base font-semibold text-gray-900">
          {item.title}
        </h2>

        <p className="text-xs text-gray-500">
          by <span className="font-medium text-gray-700">{item.chef}</span>
        </p>

        <p className="text-gray-600 text-sm line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;