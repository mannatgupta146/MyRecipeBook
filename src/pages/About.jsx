import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-10">
        
        {/* HERO SECTION */}
        <motion.div {...fadeInUp} className="border-b border-slate-200 pb-12 mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6">
            Everything starts <br />
            with a <span className="text-emerald-500 italic">single ingredient.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
            We built RecipeBook to solve a simple problem: digital kitchen clutter. 
            No ads, no life stories—just your culinary world, organized.
          </p>
        </motion.div>

        {/* STORY SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div {...fadeInUp} className="p-8 bg-white border border-slate-200 rounded-4xl shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-4">The Problem</h2>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">Tired of the noise?</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Traditional recipe sites prioritize SEO and ads over the cooking experience.
              We removed the clutter to focus on utility, speed, and clarity.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="p-8 bg-slate-800 text-white rounded-4xl shadow-xl"
          >
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300 mb-4">The Vision</h2>
            <h3 className="text-2xl font-bold mb-3">Your Digital Vault.</h3>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              RecipeBook is your high-performance culinary database — a fast,
              private place to store family secrets and discover iconic dishes.
            </p>
          </motion.div>
        </div>

        {/* WORKFLOW */}
        <motion.div {...fadeInUp} className="mb-24">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 text-center mb-12">
            The Workflow
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <ProcessStep step="01" title="Capture" desc="Find a recipe online or draft your own signature dish." />
            <ProcessStep step="02" title="Refine" desc="Adjust portions, tweak ingredients, and add personal notes." />
            <ProcessStep step="03" title="Archive" desc="Save it locally. Instanly searchable and accessible offline." />
          </div>
        </motion.div>

        {/* FEATURES */}
        <div className="space-y-4 mb-24">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 text-center mb-8">
            System Capabilities
          </h2>

          <FeatureRow num="01" title="Discovery" desc="Explore curated recipes across global cuisines." icon="🌍" />
          <FeatureRow num="02" title="Creation" desc="Professional editor designed for chefs." icon="👨‍🍳" />
          <FeatureRow num="03" title="Persistence" desc="Saved locally for lightning-fast access." icon="💾" />
        </div>

        {/* PRINCIPLES */}
        <motion.div {...fadeInUp} className="bg-emerald-100 rounded-[3rem] p-10 md:p-16 mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-8">Our Kitchen Principles</h2>

            <div className="grid sm:grid-cols-2 gap-10 text-left">
              <Principle title="Simplicity First">
                If it doesn’t help you cook better, it doesn’t belong in the interface.
              </Principle>

              <Principle title="Data Privacy">
                Your recipes stay on your device using local storage.
              </Principle>

              <Principle title="Focus & Flow">
                No long blog stories — just ingredients and steps.
              </Principle>

              <Principle title="Universal Access">
                Built to support measurements and ingredients worldwide.
              </Principle>
            </div>
          </div>
        </motion.div>

        {/* FOOTER */}
        <motion.footer {...fadeInUp} className="pt-10 border-t border-slate-200 flex flex-col items-center text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
            Developed By
          </p>

          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
              MG
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">Mannat Gupta</h4>
              <p className="text-xs text-slate-500 font-medium tracking-tight">
                Lead Developer & Curator
              </p>
            </div>
          </div>
        </motion.footer>

      </div>
    </div>
  );
};

const ProcessStep = ({ step, title, desc }) => (
  <div className="text-center space-y-4">
    <div className="text-4xl font-black text-emerald-200">{step}</div>
    <h3 className="font-bold text-xl text-slate-800 tracking-tight">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const FeatureRow = ({ num, title, desc, icon }) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="group flex items-center gap-6 p-6 bg-white border border-slate-200 rounded-4xl hover:border-emerald-200 hover:shadow-md transition-all"
  >
    <div className="hidden sm:block text-xl font-black text-slate-200 group-hover:text-emerald-200">
      {num}
    </div>
    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-emerald-100">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-slate-900 tracking-tight">{title}</h4>
      <p className="text-slate-500 text-xs md:text-sm font-medium leading-tight">
        {desc}
      </p>
    </div>
  </motion.div>
);

const Principle = ({ title, children }) => (
  <div>
    <h4 className="font-bold text-emerald-900 mb-2">{title}</h4>
    <p className="text-emerald-800/80 text-sm leading-relaxed">{children}</p>
  </div>
);

export default About;