import { createContext, useState, useEffect } from "react";

export const recipe = createContext(null);

const RecipeContext = ({ children }) => {

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // save recipes
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(data));
  }, [data]);

  // save favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <recipe.Provider value={{ data, setData, favorites, setFavorites }}>
      {children}
    </recipe.Provider>
  );
};

export default RecipeContext;