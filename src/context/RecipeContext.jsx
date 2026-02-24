import { createContext, useState, useEffect } from "react";

export const recipe = createContext(null);

const RecipeContext = ({ children }) => {
  // ✅ Load from localStorage OR fallback to dummy data
  const [data, setData] = useState(() => {
  const saved = localStorage.getItem("recipes");
  return saved ? JSON.parse(saved) : [];
});

  // ✅ Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(data));
  }, [data]);

  return (
    <recipe.Provider value={{ data, setData }}>
      {children}
    </recipe.Provider>
  );
};

export default RecipeContext;