import React, { useContext } from "react";
import { recipe } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const Favourites = () => {
  const { data, favorites } = useContext(recipe);

  const favRecipes = data.filter((r) => favorites.includes(r.id));

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Your Favorite Recipes ❤️
        </h1>
        <p className="text-gray-500 mt-2">
          Meals you love and want to cook again.
        </p>
      </div>

      {/* EMPTY */}
      {favRecipes.length === 0 ? (
        <div className="text-center mt-16 text-gray-400">
          No favorites yet.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {favRecipes.map((item) => (
            <RecipeCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;