import React from "react";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="relative min-h-screen bg-white text-gray-800 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-50 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-green-50 blur-[100px]" />
      </div>

      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-32 pb-20">
        <MainRoutes />
      </main>

      <div className="fixed bottom-0 left-0 w-full h-12 bg-linear-to-t from-white to-transparent pointer-events-none z-40" />
    </div>
  );
};

export default App;