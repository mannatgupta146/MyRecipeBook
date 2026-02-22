import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import RecipeContext from "./context/RecipeContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecipeContext>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
    </RecipeContext>
  </StrictMode>,
)
