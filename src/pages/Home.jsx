import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">

      {/* HERO */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Discover, Create & Share
        <span className="block text-emerald-600">
          Amazing Recipes
        </span>
      </h1>

      <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
        Welcome to your personal recipe hub. Explore delicious meals,
        save your favorites, and share your own culinary creations
        with the world.
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/recipes")}
        className="mt-8 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold
                   hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
      >
        Explore Recipes →
      </button>

      {/* FEATURE CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mt-16 text-left">
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-lg mb-2">🍳 Discover</h3>
          <p className="text-gray-500 text-sm">
            Browse a wide variety of recipes from around the world.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-lg mb-2">📝 Create</h3>
          <p className="text-gray-500 text-sm">
            Add your own recipes and keep them saved forever.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-lg mb-2">❤️ Save</h3>
          <p className="text-gray-500 text-sm">
            Build your personal collection of favorite meals.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Home;