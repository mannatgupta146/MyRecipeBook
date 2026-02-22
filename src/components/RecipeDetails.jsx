import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipe } from "../context/RecipeContext";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useContext(recipe);
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const recipeItem = data.find((r) => r.id === id);

  const toggleIngredient = (index) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleShare = async () => {
    const shareData = {
      title: recipeItem.title,
      text: `You have to try this: ${recipeItem.title}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  if (!recipeItem)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-5xl mb-4">🥣</div>
        <p className="text-lg font-semibold text-gray-400">
          Recipe has vanished...
        </p>
        <button
          onClick={() => navigate("/recipes")}
          className="mt-4 text-emerald-600 font-bold hover:underline"
        >
          Go back home
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 text-sm font-semibold text-gray-600 shadow-sm hover:shadow-md hover:text-emerald-600 transition active:scale-95"
        >
          ← Back
        </button>

        <div className="flex items-center gap-3">
          {copied && (
            <span className="text-[10px] font-bold uppercase text-emerald-600 tracking-widest">
              Copied!
            </span>
          )}
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition shadow-sm active:rotate-12"
          >
            🔗
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">

        {/* LEFT */}
        <div className="lg:sticky lg:top-24 space-y-6">

          <div className="relative group rounded-3xl overflow-hidden shadow-xl border border-white">
            <img
              src={recipeItem.image}
              alt={recipeItem.title}
              className="w-full h-105 object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent" />
            <span className="absolute top-5 left-5 bg-white/95 text-emerald-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-xl shadow">
              {recipeItem.category}
            </span>
          </div>

          <div className="space-y-3 px-1">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              {recipeItem.title}
            </h1>

            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Chef <span className="text-gray-900">{recipeItem.chef}</span>
            </p>

            <p className="text-gray-500 italic leading-relaxed">
              "{recipeItem.description}"
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">

          {/* INGREDIENTS */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Ingredients
            </h2>

            <div className="space-y-3">
              {recipeItem.ingredients.map((ing, i) => (
                <div
                  key={i}
                  onClick={() => toggleIngredient(i)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition
                  ${
                    checkedItems[i]
                      ? "bg-emerald-50 border-emerald-100 opacity-60"
                      : "bg-gray-50 border-transparent hover:border-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition
                    ${
                      checkedItems[i]
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "bg-white border-gray-200 text-transparent"
                    }`}
                  >
                    ✓
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      checkedItems[i]
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {ing}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* INSTRUCTIONS */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">
              Preparation
            </h2>

            <div className="space-y-6">
              {(Array.isArray(recipeItem.instructions)
                ? recipeItem.instructions
                : recipeItem.instructions.split("\n")
              )
                .filter((s) => s.trim())
                .map((step, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-gray-50 text-gray-400 font-bold flex items-center justify-center text-sm transition group-hover:bg-emerald-500 group-hover:text-white">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          <div className="pt-10 text-center">
            <div className="inline-block p-3 rounded-full bg-emerald-50 text-emerald-600">
              👨‍🍳
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300 mt-3">
              Enjoy your creation
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecipeDetails;