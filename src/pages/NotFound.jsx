import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    // fixed inset-0 ensures it covers the entire screen, including where the navbar would be
    <div className="fixed inset-0 z-100 bg-slate-950 flex flex-col items-center justify-center text-center px-6">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <span className="text-emerald-500 font-mono tracking-[0.3em] uppercase text-sm mb-4 block">
          Error 404
        </span>
        
        <h1 className="text-[15vw] md:text-[8rem] font-black text-white leading-none tracking-tighter mb-8">
        No page Exists<span className="text-emerald-500">.</span>
        </h1>

        <p className="text-slate-400 max-w-md mx-auto mb-10 text-lg font-medium">
          Looks like you've wandered into an empty kitchen. This page doesn't exist.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-2xl shadow-white/5"
        >
          Take Me Home
        </motion.button>
      </motion.div>

      {/* Aesthetic Footer for the 404 */}
      <div className="absolute bottom-10 text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
        FlavorFlow System / Internal Error
      </div>
    </div>
  );
};

export default NotFound;