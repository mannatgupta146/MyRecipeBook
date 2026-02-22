import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { recipe } from "../context/RecipeContext";
import { toast } from "react-toastify";

const RecipeCard = ({ item }) => {
  const navigate = useNavigate();
  const { data, setData } = useContext(recipe);

  const handleDelete = (e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Delete this recipe permanently?"
    );
    if (!confirmDelete) return;

    const updated = data.filter((r) => r.id !== item.id);
    setData(updated);

    toast.success("Recipe deleted 🗑");
  };

  return (
    <div
      onClick={() => navigate(`/recipe/details/${item.id}`)}
      className="group cursor-pointer bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden
                 hover:shadow-md hover:-translate-y-1 transition duration-300 relative"
    >
      {/* DELETE */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 z-10 bg-white/90 p-1.5 rounded-full shadow
                   text-gray-400 hover:text-red-500 hover:scale-110 transition"
      >
        🗑
      </button>

      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
        <span className="absolute top-3 left-3 bg-white/90 px-2 py-1 text-[10px] font-semibold rounded-full text-emerald-700 shadow-sm">
          {item.category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h2 className="font-semibold text-gray-900">{item.title}</h2>
        <p className="text-xs text-gray-500">
          by <span className="font-medium text-gray-700">{item.chef}</span>
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;