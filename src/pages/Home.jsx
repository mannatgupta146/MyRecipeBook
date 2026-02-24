import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fafafa]">

      {/* SAFE BACKGROUND BLOBS */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-30 left-1/2 -translate-x-1/2 w-225 h-105 bg-emerald-50 blur-[120px] rounded-full" />
        <div className="absolute top-[25%] right-0 w-[320px] h-80 bg-teal-50 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8 pb-24 text-center">

        {/* HERO */}
        <motion.div variants={stagger} initial="hidden" animate="visible">

          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-emerald-700 uppercase bg-emerald-100 border border-emerald-200 rounded-full"
          >
            Your Digital Cookbook
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1]"
          >
            Cook. Create.
            <br />
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent italic">
              Share Your Story.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-slate-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Discover recipes from around the world, organize your favorites,
            and build a personal collection that grows with every meal you create.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/recipes")}
              className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg hover:bg-emerald-700"
            >
              Explore Recipes
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/create-recipe")}
              className="px-10 py-4 bg-white border border-slate-200 text-slate-800 rounded-2xl font-bold hover:border-emerald-500 hover:text-emerald-600"
            >
              Create Recipe
            </motion.button>
          </motion.div>
        </motion.div>

        {/* FEATURES */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-28 text-left"
        >
          <FeatureCard emoji="🌍" title="Smart Discovery" text="Explore global dishes and discover new favorites instantly." />
          <FeatureCard emoji="📖" title="Recipe Vault" text="Store family recipes and build your personal cookbook." />
          <FeatureCard emoji="⚡" title="Cook Confidently" text="Follow simple steps and cook stress-free every time." />
        </motion.div>

        {/* CUISINE STRIP */}
        <div className="mt-28 py-8 border-y border-slate-100 bg-white/60 backdrop-blur-sm overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap text-slate-300 text-xl font-bold uppercase"
          >
            {[1, 2].map(i => (
              <React.Fragment key={i}>
                <span>🍝 Italian</span>
                <span>🌮 Mexican</span>
                <span>🍣 Japanese</span>
                <span>🥘 Indian</span>
                <span>🥗 Mediterranean</span>
                <span>🍜 Thai</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* QUOTE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-28 py-16 px-8 bg-slate-900 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full" />

          <p className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto relative z-10">
            “Great food brings people together. Every recipe you create becomes part of your story.”
          </p>

          <button
            onClick={() => navigate("/about")}
            className="mt-8 text-emerald-400 font-bold hover:underline"
          >
            OUR STORY →
          </button>
        </motion.div>

        {/* FINAL CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <h2 className="text-4xl font-black text-slate-900">
            Ready to start cooking?
          </h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/create-recipe")}
            className="mt-10 px-12 py-5 bg-emerald-600 text-white rounded-3xl font-black shadow-lg hover:bg-emerald-700"
          >
            Create Your First Recipe
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

const FeatureCard = ({ emoji, title, text }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
    whileHover={{ y: -6 }}
    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition"
  >
    <div className="text-3xl mb-4">{emoji}</div>
    <h3 className="font-bold text-lg text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
  </motion.div>
);

export default Home;