import { createContext } from "react"
import { useState } from "react"
import { dummyRecipes } from "../data/dummyRecipe"

export const recipe = createContext(null)

const RecipeContext = ({children}) => {
  const [data, setData] = useState(dummyRecipes);

  return (
    <recipe.Provider value={{ data, setData }}>
        {children}
    </recipe.Provider>
  )
}

export default RecipeContext