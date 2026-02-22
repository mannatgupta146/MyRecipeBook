import { createContext } from "react"
import { useState } from "react"

export const recipe = createContext(null)

const RecipeContext = ({children}) => {
  const [data, setData] = useState([])

  return (
    <recipe.Provider value={{ data, setData }}>
        {children}
    </recipe.Provider>
  )
}

export default RecipeContext