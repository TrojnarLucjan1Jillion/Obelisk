/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, ReactNode, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Menu, X, ArrowRight, ShieldCheck, Zap, Layers, 
  MapPin, TreePine, Building2, 
  Wind, Droplets, Ruler, CheckCircle2,
  Instagram, Linkedin, Pin
} from 'lucide-react';

// --- Components ---

const SectionEyebrow = ({ children, color = "text-amber", bordered = false }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={`inline-block mb-8 ${bordered ? 'py-1 px-3 border border-amber/40' : ''}`}
  >
    <span className={`${color} uppercase tracking-[0.25em] text-[10px] md:text-xs font-bold`}>
      {children}
    </span>
  </motion.div>
);

const Reveal = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Sections ---

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: "The Capsule", href: "#capsule" },
    { name: "Modules", href: "#modules" },
    { name: "Configurator", href: "#configurator" },
    { name: "Pricing", href: "#pricing" },
    { name: "For Builders", href: "#builders" },
    { name: "Story", href: "#story" }
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6 flex items-center justify-between ${
          scrolled ? 'bg-cream/95 backdrop-blur-md border-b border-charcoal/5 py-4' : 'bg-transparent'
        } ${scrolled ? 'text-charcoal' : 'text-cream'}`}
      >
        <a href="#" className="font-serif text-xl md:text-2xl tracking-[0.1em] font-light uppercase">Obelisk</a>
        
        <div className="hidden lg:flex items-center space-x-10 text-[13px] uppercase tracking-wider font-medium">
          {links.map(link => (
            <a key={link.name} href={link.href} className="hover:text-amber transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <a href="#waitlist" className={`hidden md:block px-6 py-2.5 text-xs uppercase font-semibold tracking-widest transition-all ${
            scrolled ? 'bg-timber text-cream hover:bg-charcoal' : 'bg-cream text-timber hover:bg-surface'
          }`}>
            Reserve yours
          </a>
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-cream z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-serif text-2xl tracking-widest font-light uppercase">Obelisk</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col space-y-8 text-3xl font-serif">
              {links.map((link, i) => (
                <motion.a 
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <a 
                href="#waitlist" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full bg-timber text-cream text-center py-5 font-bold uppercase tracking-widest text-sm"
              >
                Reserve yours
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section className="relative h-screen min-h-[700px] flex flex-col justify-center overflow-hidden bg-timber">
      <motion.div style={{ y }} className="absolute inset-0 z-0 scale-110">
        <img 
          src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=2400&q=80" 
          alt="Modern Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-timber/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-timber via-transparent to-transparent opacity-90" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-24">
        <div className="max-w-5xl">
          <SectionEyebrow color="text-amber/90" bordered>Permanence, Made Portable</SectionEyebrow>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-cream text-6xl md:text-[110px] leading-[0.95] font-serif font-light tracking-tight-serif"
          >
            A home you can <br className="hidden lg:block" /> take <span className="italic font-light">with</span> you.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-surface/70 text-lg md:text-xl mt-12 max-w-lg font-sans leading-relaxed font-light"
          >
            Twenty square metres. Five stackable modules. Assembled in two days on any terrain. A vertical sanctuary for the flexible life.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-16 flex flex-col sm:flex-row gap-6"
          >
            <a href="#configurator" className="inline-flex items-center justify-center px-12 py-5 bg-cream text-timber text-[11px] font-bold uppercase tracking-widest hover:bg-surface transition-all">
              Configure yours
            </a>
            <a href="#story" className="inline-flex items-center justify-center px-12 py-5 border border-cream/20 text-cream text-[11px] font-bold uppercase tracking-widest hover:bg-cream hover:text-timber transition-all">
              View Story
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 w-full z-10 px-6 md:px-12">
        <div className="container mx-auto flex flex-wrap lg:flex-nowrap items-center gap-x-12 gap-y-6 text-[10px] md:text-xs font-semibold text-cream/50 uppercase tracking-[0.2em]">
          <span className="flex items-center">20 m² total</span>
          <div className="hidden lg:block w-px h-4 bg-cream/20" />
          <span className="flex items-center">2-day assembly</span>
          <div className="hidden lg:block w-px h-4 bg-cream/20" />
          <span className="flex items-center">5 stackable modules</span>
          <div className="hidden lg:block w-px h-4 bg-cream/20" />
          <span className="flex items-center">From €22,000</span>
        </div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  return (
    <section id="capsule" className="py-24 md:py-40 container mx-auto px-6 md:px-12 bg-cream">
      <SectionEyebrow bordered>Why this exists</SectionEyebrow>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40">
        <Reveal>
          <h2 className="text-5xl md:text-[72px] font-serif font-light leading-[1] tracking-tight-serif text-timber mb-12">
            Renting forever was <br className="hidden md:block" /> never the plan.
          </h2>
          <div className="max-w-xl text-muted text-lg leading-relaxed space-y-8">
            <p className="border-l-2 border-timber/10 pl-8">
              The housing market forces a choice between two extremes. You can remain transient, pouring income into overpriced rentals you can never alter. Or you can commit to a thirty-year mortgage, tethering yourself to a single city for decades. 
            </p>
            <p className="pl-8">
              Remote work decoupled our careers from geography, but architecture failed to keep pace. Obelisk is the physical counterpart to a flexible life. Ownership without geography. Permanence without anchor.
            </p>
          </div>
        </Reveal>

        <div className="space-y-16 lg:pt-4">
          <Reveal delay={0.1}>
            <div className="group">
              <div className="text-6xl md:text-7xl font-serif text-timber mb-2 font-light">48%</div>
              <div className="text-charcoal text-sm font-medium uppercase tracking-widest">EU house prices since 2010.</div>
              <div className="text-muted text-[10px] uppercase tracking-[0.2em] mt-3 opacity-50">Source: Eurostat (2024)</div>
            </div>
          </Reveal>
          <div className="w-full h-px bg-charcoal/10" />
          <Reveal delay={0.2}>
            <div className="group">
              <div className="text-6xl md:text-7xl font-serif text-timber mb-2 font-light">41.7M</div>
              <div className="text-charcoal text-sm font-medium uppercase tracking-widest">Europeans now work remotely.</div>
              <div className="text-muted text-[10px] uppercase tracking-[0.2em] mt-3 opacity-50">Source: Eurofound (2022)</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const ObeliskSVG = () => (
  <svg width="320" height="480" viewBox="0 0 320 480" fill="none" className="mx-auto">
    <path d="M100 450l120 0M110 450v20M210 450v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <path d="M80 440h160v10H80v-10z" stroke="currentColor" strokeWidth="1.5" />
    {/* Base Mod */}
    <path d="M90 440h140L220 340H100L90 440z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M145 440v-60h30v60" stroke="currentColor" strokeWidth="1.5" />
    {/* Stack */}
    <path d="M100 340h120l-10-80H110l-10 80z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M110 260h100l-10-80H120l-10 80z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M120 180h80l-10-80H130l-10 80z" stroke="currentColor" strokeWidth="1.5" />
    {/* Apex */}
    <path d="M130 100h60L180 50h-40L130 100z" stroke="currentColor" strokeWidth="1.5" />
    {/* Details */}
    {[...Array(6)].map((_, i) => (
      <path key={i} d={`M${115 + i*15} 330l10-60`} stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    ))}
  </svg>
);

const ObeliskSection = () => {
  return (
    <section className="relative py-24 md:py-48 bg-timber text-cream text-center px-6 overflow-hidden">
      {/* Background Vertical Text Motif */}
      <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 -rotate-90 hidden xl:block">
        <span className="text-[140px] font-serif font-light text-cream opacity-5 tracking-[0.2em] whitespace-nowrap">
          VERTICALITY
        </span>
      </div>
      
      <div className="relative z-10">
        <Reveal>
          <SectionEyebrow color="text-amber" bordered>The Obelisk</SectionEyebrow>
          <h2 className="text-6xl md:text-[100px] font-serif italic font-light tracking-tight-serif mb-24 leading-none">
            Permanence, made portable.
          </h2>
        </Reveal>
        
        <Reveal delay={0.2} className="mb-32">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-amber/5 blur-3xl rounded-full scale-150" />
            <ObeliskSVG />
          </div>
        </Reveal>

        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-16 text-left border-t border-cream/10 pt-16">
          <Reveal delay={0.3}>
            <Ruler className="w-5 h-5 text-amber mb-6" />
            <h4 className="font-serif text-2xl mb-4 font-light">Wide Base</h4>
            <p className="text-cream/60 text-sm leading-relaxed font-light">Structural stability is achieved through a widened footprint, allowing for vertical density on any terrain.</p>
          </Reveal>
          <Reveal delay={0.4}>
            <Wind className="w-5 h-5 text-amber mb-6" />
            <h4 className="font-serif text-2xl mb-4 font-light">Wind Shedding</h4>
            <p className="text-cream/60 text-sm leading-relaxed font-light">The tapered silhouette drastically reduces wind load, negating the need for deep concrete foundations.</p>
          </Reveal>
          <Reveal delay={0.5}>
            <Layers className="w-5 h-5 text-amber mb-6" />
            <h4 className="font-serif text-2xl mb-4 font-light">Zero Footprint</h4>
            <p className="text-cream/60 text-sm leading-relaxed font-light">Lifted entirely on screw piles. Upon removal, the land returns to its natural state within days.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const ModulesSection = () => {
  const [activeModule, setActiveModule] = useState<number>(0);
  const containerRef = useRef(null);

  const modules = [
    { 
      id: 5, 
      name: "Rooftop Deck", 
      desc: "Optional outdoor platform at the apex. Engineered for safety and panoramic views.",
      icon: <Wind className="w-4 h-4 mr-2" />,
      detail: "Weather-treated ash decking"
    },
    { 
      id: 4, 
      name: "Sleeping Loft", 
      desc: "A sanctuary under the tapered roof. Features a king-size bed and an operable skylight.",
      icon: <Zap className="w-4 h-4 mr-2" />,
      detail: "Automated passive ventilation"
    },
    { 
      id: 3, 
      name: "Kitchen & Living", 
      desc: "Flexible living space with integrated galley kitchen and fold-out work surface.",
      icon: <Layers className="w-4 h-4 mr-2" />,
      detail: "Induction cooking suite"
    },
    { 
      id: 2, 
      name: "Bathroom", 
      desc: "Fully waterproofed wet room with microcement finish and high-pressure shower.",
      icon: <Droplets className="w-4 h-4 mr-2" />,
      detail: "Factory-plumbed unit"
    },
    { 
      id: 1, 
      name: "Entrance & Tech", 
      desc: "The utility core. Houses power, water filtration, storage, and the main entry.",
      icon: <ShieldCheck className="w-4 h-4 mr-2" />,
      detail: "Smart manifold hub"
    }
  ];

  return (
    <section id="modules" className="py-24 md:py-48 container mx-auto px-6 md:px-12 bg-cream">
      <SectionEyebrow bordered>Anatomy</SectionEyebrow>
      <h2 className="text-5xl md:text-[80px] font-serif font-light tracking-tight-serif text-charcoal mb-24 leading-none">
        Five modules. <br /> One vertical home.
      </h2>

      <div ref={containerRef} className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start">
        
        {/* Left: Sticky Visualization */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-32 order-2 lg:order-1">
          <div className="aspect-[3/4] bg-surface border border-charcoal/5 rounded-2xl flex items-center justify-center p-12">
            <svg width="200" height="360" viewBox="0 0 200 360" fill="none">
              {modules.map((m, i) => {
                const isActive = activeModule === m.id;
                const baseWidth = 140;
                const taperScale = 1 - (5 - m.id) * 0.1;
                const width = baseWidth * taperScale;
                const height = 60;
                const yPos = (5 - m.id) * 65 + 30;

                return (
                  <motion.path 
                    key={m.id}
                    layout
                    initial={false}
                    animate={{ 
                      opacity: isActive ? 1 : 0.15,
                      stroke: isActive ? "#2D1F12" : "#6B6760",
                      fill: isActive ? "#8B6F4E1A" : "transparent"
                    }}
                    d={`M${100 - width/2} ${yPos + height} h${width} l-${width*0.05} -${height} h-${width*0.9} z`}
                    strokeWidth="1.5"
                    className="transition-colors duration-500"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right: Scrollable descriptions */}
        <div className="w-full lg:w-7/12 space-y-24 pb-32 order-1 lg:order-2">
          {modules.map(m => (
            <ModuleItem 
              key={m.id} 
              module={m} 
              onVisible={() => setActiveModule(m.id)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ModuleItem = ({ module, onVisible }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.8 });

  useEffect(() => {
    if (isInView) onVisible();
  }, [isInView, onVisible]);

  return (
    <div ref={ref} className={`transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-30'}`}>
      <span className="block text-amber font-semibold text-[10px] uppercase tracking-widest mb-4">Level {module.id}</span>
      <h3 className="text-3xl font-serif text-charcoal mb-4">{module.name}</h3>
      <p className="text-muted leading-relaxed mb-6 max-w-lg">{module.desc}</p>
      <div className="flex items-center text-charcoal text-sm font-semibold">
        {module.icon}
        {module.detail}
      </div>
    </div>
  );
};

const ConfiguratorTeaser = () => {
  return (
    <section id="configurator" className="relative py-24 md:py-48 bg-surface text-center overflow-hidden">
      {/* Background Motif */}
      <div className="absolute right-[2%] top-1/2 -translate-y-1/2 rotate-90 hidden xl:block">
        <span className="text-[120px] font-serif font-light text-timber opacity-[0.03] tracking-[0.3em] whitespace-nowrap">
          CONFIGURATOR
        </span>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <SectionEyebrow bordered>Build yours</SectionEyebrow>
        <h2 className="text-5xl md:text-[80px] font-serif font-light tracking-tight-serif text-charcoal mb-10 leading-[1]">
          Design your Obelisk <br className="hidden md:block" /> in the browser.
        </h2>
        <p className="text-muted text-lg mb-16 max-w-2xl mx-auto">
          Select your modules, refine the interior finish, and calculate your off-grid requirements. Preview your build in real-time.
        </p>

        <Reveal delay={0.2} className="relative bg-cream border border-charcoal/10 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row text-left">
          {/* Left panel */}
          <div className="md:w-80 bg-surface border-b md:border-b-0 md:border-r border-charcoal/10 p-8">
            <h4 className="font-serif text-lg mb-6">Configuration</h4>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-3">Modules</p>
                <div className="p-3 bg-cream border border-timber text-timber rounded text-xs font-semibold flex justify-between items-center">
                  <span>4 Modules (Standard)</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-3">Interior Finish</p>
                <div className="p-3 border border-charcoal/10 text-muted rounded text-xs flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-wood rounded-full mr-2" />
                    <span>Hokkaido Oak</span>
                  </div>
                  <ArrowRight className="w-3 h-3 opacity-30" />
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-3">Power Package</p>
                <div className="p-3 border border-charcoal/10 text-muted rounded text-xs flex items-center justify-between">
                  <span>Off-grid Solar Pack</span>
                  <div className="w-7 h-4 bg-charcoal/5 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex-grow p-12 bg-cream flex flex-col items-center justify-center min-h-[400px]">
             <div className="w-48 h-72 border-2 border-dashed border-charcoal/10 rounded-lg flex items-center justify-center relative">
                <ObeliskSVG />
                <div className="absolute inset-x-0 -bottom-16 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">Estimated Price</p>
                  <p className="font-serif text-2xl text-charcoal">€34,500</p>
                </div>
             </div>
          </div>
        </Reveal>

        <div className="mt-24">
          <a href="#waitlist" className="inline-flex items-center justify-center px-12 py-5 bg-timber text-cream text-[13px] font-bold uppercase tracking-widest hover:bg-charcoal transition-all">
            Open the configurator
          </a>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const tiers = [
    { 
      name: "Obelisk Core", 
      price: "€22,000—28,000", 
      modules: "3 Modules", 
      details: ["Entrance & Tech", "Bathroom Module", "Kitchen Studio"] 
    },
    { 
      name: "Obelisk Standard", 
      price: "€30,000—38,000", 
      modules: "4 Modules", 
      recommended: true,
      details: ["Entrance & Tech", "Bathroom Module", "Kitchen & Living", "Sleeping Loft"] 
    },
    { 
      name: "Obelisk Full", 
      price: "€38,000—47,000", 
      modules: "5 Modules", 
      details: ["All Standard Modules", "Rooftop Deck", "Custom Finishing"] 
    },
    { 
      name: "Obelisk Off-Grid", 
      price: "€43,000—52,000", 
      modules: "5 Modules + Tech", 
      details: ["All Full Modules", "1.6kW Solar Array", "5kWh Battery Pack", "Water Filtration"] 
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-48 container mx-auto px-6">
      <div className="text-center mb-24">
        <SectionEyebrow bordered>Pricing</SectionEyebrow>
        <h2 className="text-5xl md:text-[72px] font-serif font-light tracking-tight-serif text-charcoal">Choose your canvas.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.1}>
            <div className={`h-full p-8 rounded-2xl flex flex-col border ${
              tier.recommended ? 'border-amber bg-surface shadow-sm ring-1 ring-amber/20' : 'border-charcoal/10 bg-cream'
            }`}>
              {tier.recommended && <span className="text-[10px] uppercase tracking-widest font-bold text-amber mb-6">Recommended</span>}
              {!tier.recommended && <div className="h-6 mb-4" />}
              <h3 className="font-serif text-2xl text-timber mb-2">{tier.name}</h3>
              <p className="text-muted text-xs uppercase tracking-widest font-semibold mb-8">{tier.modules}</p>
              
              <div className="text-2xl font-serif text-charcoal mb-10">{tier.price}</div>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {tier.details.map(detail => (
                  <li key={detail} className="flex items-start text-xs text-muted">
                    <CheckCircle2 className="w-3.5 h-3.5 text-wood mr-2 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>

              <a href="#waitlist" className={`w-full py-4 text-center text-[11px] font-bold uppercase tracking-widest transition-all ${
                tier.recommended ? 'bg-timber text-cream hover:bg-charcoal' : 'border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-cream'
              }`}>
                Configure
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      
      <p className="text-center text-[11px] text-muted/60 mt-12 uppercase tracking-widest">
        Final price set by your local certified builder. All prices include EU VAT.
      </p>
    </section>
  );
};

const PlacementSection = () => {
  return (
    <section className="py-24 md:py-48 bg-cream container mx-auto px-6 border-t border-charcoal/5">
      <SectionEyebrow bordered>Belgium Ready</SectionEyebrow>
      <h2 className="text-5xl md:text-[72px] font-serif font-light tracking-tight-serif text-charcoal mb-24 max-w-2xl leading-[1]">
        Your Obelisk, your land, <br className="hidden md:block" /> your rules.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
        <Reveal>
          <TreePine className="w-8 h-8 text-timber mb-6" />
          <h4 className="font-serif text-2xl mb-4">Garden Placements</h4>
          <p className="text-muted text-sm leading-relaxed">
            In Flanders, the <em className="italic">zorgunit</em> framework permits placement without full architectural approval for units under 50 m². Ideal for elderly care or residential extensions.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <MapPin className="w-8 h-8 text-timber mb-6" />
          <h4 className="font-serif text-2xl mb-4">Wallonia Regional</h4>
          <p className="text-muted text-sm leading-relaxed">
            Wallonia’s <em class="italic">habitation légère</em> status formally recognizes modular dwellings. Obelisk is engineered to exceed all regional standards for permanent residence.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Building2 className="w-8 h-8 text-timber mb-6" />
          <h4 className="font-serif text-2xl mb-4">Leisure Units</h4>
          <p className="text-muted text-sm leading-relaxed">
            For glamping and high-end rentals, the 2-day assembly and minimal ground disruption make this a high-ROI asset for recreational operators across Western Europe.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

const StorySection = () => {
  return (
    <section id="story" className="py-24 md:py-48 bg-cream container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-baseline">
        <div className="lg:col-span-12">
          <SectionEyebrow bordered>Our Story</SectionEyebrow>
        </div>
        <div className="lg:col-span-7">
           <Reveal>
             <h2 className="text-5xl md:text-7xl font-serif italic font-light text-timber leading-tight">
               "What if a home could move with you, not against you?"
             </h2>
           </Reveal>
        </div>
        <div className="lg:col-span-5 space-y-6 text-muted leading-relaxed">
           <Reveal delay={0.1}>
             <p>
               The modular housing market is saturated with shipping containers and low-ceilinged boxes. We wanted verticality. By breaking the structure into five stackable tiers, we bypassed standard transport restrictions, allowing for a 6.5-metre interior ceiling height that feels fundamentally architectural.
             </p>
           </Reveal>
           <Reveal delay={0.2}>
             <p>
               The silhouette emerged from a structural necessity—tapering the form reduced wind load and lowered the center of gravity. Yet the result invoked something ancient. A monolithic, monumental form.
             </p>
           </Reveal>
        </div>
      </div>
    </section>
  );
};

const BuilderSection = () => {
  return (
    <section id="builders" className="bg-timber py-24 md:py-48 text-cream overflow-hidden relative">
      {/* Motif */}
      <div className="absolute right-[-10%] top-0 text-[200px] font-serif text-cream opacity-[0.02] rotate-12 pointer-events-none">
        BUILD
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionEyebrow color="text-amber" bordered>For Builder Partners</SectionEyebrow>
        <h2 className="text-5xl md:text-[80px] font-serif font-light tracking-tight-serif mb-24 max-w-4xl leading-[1]">
          Become a certified <br className="hidden md:block" /> Obelisk partner.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-cream/10 pt-16">
          <Reveal>
            <h4 className="font-serif text-2xl mb-4">The Licence</h4>
            <p className="text-cream/70 text-sm leading-relaxed">Access full structural CAD drawings, CNC cutting files for CLT, and territory rights. We route high-intent leads directly to your workshop.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h4 className="font-serif text-2xl mb-4">Pure Economics</h4>
            <p className="text-cream/70 text-sm leading-relaxed">Higher margins than residential timber-frame. Raise your average transaction value by €8,000 per build with our precision-engineered system.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h4 className="font-serif text-2xl mb-4">Simple Terms</h4>
            <p className="text-cream/70 text-sm leading-relaxed">A one-time setup fee of €3,500. No subscriptions. A flat royalty per unit completed. You build, you own the relationship.</p>
          </Reveal>
        </div>

        <div className="mt-20">
          <a href="#waitlist" className="inline-flex items-center justify-center px-10 py-4 bg-cream text-forest text-[13px] font-bold uppercase tracking-widest hover:bg-surface transition-colors">
            Apply for partnership
          </a>
        </div>
      </div>
    </section>
  );
};

const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-32 md:py-60 bg-cream text-center px-6 border-t border-charcoal/5">
      <div className="max-w-3xl mx-auto">
        <SectionEyebrow bordered>Reserve Yours</SectionEyebrow>
        <h2 className="text-6xl md:text-[96px] font-serif font-light tracking-tight-serif text-charcoal mb-10 leading-[0.95]">
          First units <br /> ship in 2026.
        </h2>
        <p className="text-muted text-lg mb-16 font-light max-w-xl mx-auto leading-[1.6]">
          Join the waitlist to receive early access to the browser configurator and localized pricing guides.
        </p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form 
              key="form"
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-0 border border-charcoal/20 p-2 focus-within:border-timber transition-colors"
            >
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-8 py-5 bg-transparent focus:outline-none text-charcoal font-medium"
              />
              <button type="submit" className="px-12 py-5 bg-timber text-cream font-bold uppercase tracking-widest text-[11px] hover:bg-charcoal transition-colors">
                Join waitlist
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-timber text-cream p-16"
            >
              <CheckCircle2 className="w-12 h-12 text-amber mx-auto mb-8" />
              <h3 className="text-3xl font-serif mb-3 font-light italic">You're on the list.</h3>
              <p className="text-cream/50 text-xs tracking-widest uppercase">We'll reach out once the configurator opens.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[10px] text-muted/50 uppercase tracking-[0.2em] mt-8">No spam. We email only when something matters.</p>
      </div>
    </section>
  );
};

const FAQ = () => {
  const items = [
    { q: "Is it legal where I live?", a: "Zoning varies by country. Obelisk is designed specifically to meet Belgian 'zorgunit' and 'habitation légère' standards, which are among the most progressive in Europe. We provide detailed regulatory guides for every placement." },
    { q: "How long does assembly take?", a: "Site preparation takes one morning. The 5 modules are stacked in under 6 hours. Final utility connections and sealing occur the following day. Total time: 2 days." },
    { q: "Can I really move it later?", a: "Yes. The modules are joined with reversible structural connectors. They can be unstacked, trucked to a new site, and re-assembled. The screw-pile foundation leaves no concrete in the ground." },
    { q: "What about winter insulation?", a: "Obelisk uses wood fibre insulation and 5-ply CLT walls. It achieves a thermal performance that exceeds EU passive house standards, suitable for sub-zero alpine climates." },
    { q: "Who builds it?", a: "Local certified timber manufacturers build the modules to our exact specifications. This reduces transport costs and supports local craftsman in your region." }
  ];

  return (
    <section className="py-24 md:py-48 bg-cream container mx-auto px-6 max-w-4xl">
      <SectionEyebrow bordered>Questions</SectionEyebrow>
      <h2 className="text-4xl md:text-5xl font-serif font-light text-charcoal mb-16">Common enquiries.</h2>
      <div className="divide-y divide-charcoal/10 border-t border-charcoal/10">
        {items.map(item => (
          <details key={item.q} className="group py-8 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-xl md:text-2xl text-timber marker:content-none list-none">
              {item.q}
              <motion.span className="text-wood font-light group-open:rotate-45 transition-transform duration-300 text-3xl">+</motion.span>
            </summary>
            <p className="mt-6 text-muted leading-relaxed text-sm max-w-2xl">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-timber text-cream pt-24 pb-12 px-6 md:px-12">
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 mb-20">
      <div className="lg:col-span-5">
        <a href="#" className="font-serif text-3xl tracking-widest uppercase mb-6 block">Obelisk</a>
        <p className="text-cream/50 text-sm max-w-xs leading-relaxed">
          Modular micro-homes for a move-capable life. Prefabricated timber capsules designed for flexibility and permanence.
        </p>
      </div>
      <div className="lg:col-span-2 flex flex-col space-y-4 text-xs font-semibold uppercase tracking-widest text-cream/70">
        <a href="#capsule" className="hover:text-amber transition-colors">Capsule</a>
        <a href="#modules" className="hover:text-amber transition-colors">Modules</a>
        <a href="#pricing" className="hover:text-amber transition-colors">Pricing</a>
        <a href="#builders" className="hover:text-amber transition-colors">Builders</a>
      </div>
      <div className="lg:col-span-2 flex flex-col space-y-4 text-xs font-semibold uppercase tracking-widest text-cream/70">
        <a href="#story" className="hover:text-amber transition-colors">Our Story</a>
        <a href="#" className="hover:text-amber transition-colors">Careers</a>
        <a href="#" className="hover:text-amber transition-colors">Contact</a>
      </div>
      <div className="lg:col-span-3">
        <div className="flex space-x-6 mb-8 text-cream/60">
          <Instagram className="w-5 h-5 hover:text-amber transition-colors cursor-pointer" />
          <Linkedin className="w-5 h-5 hover:text-amber transition-colors cursor-pointer" />
          <Pin className="w-5 h-5 hover:text-amber transition-colors cursor-pointer" />
        </div>
        <p className="text-sm font-serif">hello@obeliskcapsule.com</p>
      </div>
    </div>
    <div className="container mx-auto pt-12 border-t border-cream/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-cream/30">
      <div>&copy; 2026 Obelisk Capsule. Made in Europe.</div>
      <div className="flex space-x-8">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Imprint</a>
      </div>
      <div className="italic font-serif">A home is a kind of promise.</div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-cream scroll-smooth">
      <Nav />
      <Hero />
      <ProblemSection />
      <ObeliskSection />
      <ModulesSection />
      <ConfiguratorTeaser />
      <Pricing />
      <PlacementSection />
      <StorySection />
      <BuilderSection />
      <WaitlistSection />
      <FAQ />
      <Footer />
    </div>
  );
}
