import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Recipes from '../pages/Recipes'
import CreateRecipe from '../pages/CreateRecipe'
import RecipeDetails from '../components/RecipeDetails'
import EditRecipe from '../pages/EditRecipe'
import Favourites from '../pages/Favourites'
import NotFound from '../pages/NotFound'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/create-recipe' element={<CreateRecipe />} />
        <Route path='/recipe/details/:id' element={<RecipeDetails/>} />
        <Route path="/edit/:id" element={<EditRecipe />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default MainRoutes
