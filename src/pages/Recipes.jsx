import React, { useContext } from "react";
import { recipe } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const Recipes = () => {
  const { data } = useContext(recipe);

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* PAGE HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore Delicious Recipes
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Discover flavors shared by our community of food lovers.
        </p>
      </div>

      {/* EMPTY STATE */}
      {!data || data.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg font-medium">
            No recipes yet 🍽️
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Start by creating your first delicious recipe.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <RecipeCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;