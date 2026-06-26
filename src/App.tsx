/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Phone, Mail, MapPin, ChevronLeft, ChevronRight,
  Map as MapIcon, Shield, Star, CheckCircle, ArrowRight,
  TrendingUp, Home as HomeIcon, Zap, Loader2, Building, TreePalm,
  Facebook, Twitter, Handshake
} from 'lucide-react';

import img1 from '../src/assets/img1.png';
import img2 from '../src/assets/img2.png';
import img3 from '../src/assets/img3.png';
import img4 from '../src/assets/img4.png';
import img5 from '../src/assets/img5.jpeg';
import img6 from '../src/assets/img6.png';
import img7 from '../src/assets/img7.png';
import img8 from '../src/assets/img8.png';
import img9 from '../src/assets/img9.png';
import img10 from '../src/assets/img10.png';

// --- Types ---
type PageId = 'home' | 'about' | 'services' | 'contact';

interface Slide {
  headline: string;
  subtext: string;
  cta: string;
  bg: string;
}

// --- Constants ---
const BRAND = {
  name: "Gold Field Developers",
  tagline: "We Bring Value to Your Lifestyle",
  phones: ["+91 XXXXX XXXXX"],
  email: "info@goldfieldrealestate.com",
  address: "No. 89, Abdul Kalam Street Anbil Nagar, Airport Tiruchirappalli, Tamil Nadu – 620007",
  colors: {
    primary: "#1e2939",
    secondary: "#b09340"
  }
};

const SLIDES: Slide[] = [
  {
    headline: "Welcome to Gold Field Developers",
    subtext: "Premier Real Estate Solutions in Chennai",
    cta: "EXPLORE NOW",
    bg: "linear-gradient(rgba(30, 41, 57, 0.85), rgba(15, 23, 42, 0.95)), radial-gradient(circle at center, #334155, #0f172a)"
  },
  {
    headline: "Build Your Dream Home",
    subtext: "DTCP & RERA Approved Projects",
    cta: "EXPLORE PROPERTIES",
    bg: "linear-gradient(rgba(30, 41, 57, 0.85), rgba(15, 23, 42, 0.95)), radial-gradient(circle at 70% 30%, #475569, #1e2939)"
  },
  {
    headline: "Invest in Your Future",
    subtext: "High ROI Projects in Prime Locations",
    cta: "VIEW OPPORTUNITIES",
    bg: "linear-gradient(rgba(30, 41, 57, 0.85), rgba(15, 23, 42, 0.95)), radial-gradient(circle at 30% 70%, #334155, #0f172a)"
  }
];

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: PageId, setPage: (p: PageId) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, id: PageId }[] = [
    { label: "HOME", id: "home" },
    { label: "ABOUT US", id: "about" },
    { label: "SERVICES", id: "services" },
    { label: "CONTACT US", id: "contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        <div
          className="flex flex-col cursor-pointer"
          onClick={() => setPage('home')}
        >
          <span className="text-[22px] font-bold tracking-tight text-secondary" style={{ fontFamily: "'Playfair Display', serif" }}>GOLD FIELD</span>
          <span className="text-[16px] tracking-[0.2em] text-gradient-gold uppercase font-semibold">Developers</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setPage(link.id)}
                className={`text-[14px] font-bold tracking-widest relative group transition-colors text-secondary`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-secondary transition-transform duration-300 ${currentPage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage('contact')}
            className="gold-gradient text-white px-6 py-2 rounded-full text-[13px] font-bold tracking-tight hover:brightness-110 transition-all shadow-lg"
          >
            ENQUIRE NOW
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden ${isScrolled ? 'text-primary' : 'text-secondary'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white overflow-hidden shadow-lg border-t"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { setPage(link.id); setIsMenuOpen(false); }}
                  className={`text-left text-lg font-bold text-secondary`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setPage('contact');
                }}
                className="text-left text-lg font-bold text-primary"
              >
                ENQUIRE NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, light }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-12 h-[1px] gold-gradient"></div>
      <span className="text-gradient-gold text-[10px] font-bold tracking-[0.3em] uppercase">Premium Standard</span>
    </div>
    <h2 className={`text-4xl lg:text-5xl font-serif font-bold mb-4 ${light ? 'text-white' : 'text-primary'}`}>
      {title}
    </h2>
    {subtitle && <p className={`text-lg max-w-2xl ${light ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>}
  </div>
);

// --- Pages ---

const Home = ({ setPage }: { setPage: (p: PageId) => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section - Geometric Layout */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full"
            style={{ background: SLIDES[currentSlide].bg }}
          >
            <div className="absolute inset-0 dot-pattern opacity-10" />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-6 relative z-10">
          <div className="lg:w-3/5 space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-secondary" />
              <span className="text-secondary text-xs font-bold tracking-extrawide uppercase">Chennai's Premier Choice</span>
            </motion.div>

            <motion.h1
              key={`h1-${currentSlide}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight"
            >
              {SLIDES[currentSlide].headline.split(' ').slice(0, -2).join(' ')} <br />
              <span className="text-gradient-gold">{SLIDES[currentSlide].headline.split(' ').slice(-2).join(' ')}</span>
            </motion.h1>

            <motion.p
              key={`p-${currentSlide}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-gray-300 font-light italic max-w-lg leading-relaxed"
            >
              {SLIDES[currentSlide].subtext}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-6 pt-6"
            >
              <button
                onClick={() => setPage('services')}
                className="gold-gradient text-white px-10 py-4 text-xs font-bold tracking-extrawide rounded-sm shadow-xl active:scale-95 transition-all hover:brightness-110"
              >
                {SLIDES[currentSlide].cta}
              </button>
              <button
                onClick={() => setPage('about')}
                className="border border-white/30 bg-white/5 backdrop-blur-sm text-white px-10 py-4 text-xs font-bold tracking-extrawide rounded-sm hover:bg-white hover:text-dark transition-all"
              >
                OUR STORY
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating Card Decoration */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute right-12 bottom-12 w-80 bg-white p-8 shadow-2xl border-t-4 border-secondary z-20 hidden lg:block"
        >
          <div className="text-primary font-bold text-2xl mb-1 text-gradient-gold w-fit">10+ Years</div>
          <div className="text-gray-500 text-xs tracking-widest uppercase mb-6">Industry Excellence</div>
          <div className="space-y-4">
            {['RERA Compliant', 'Transparent Pricing', 'Premier Locations'].map((check) => (
              <div key={check} className="flex items-center gap-3">
                <CheckCircle size={16} className="text-secondary" />
                <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">{check}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* slider dots */}
        <div className="absolute bottom-10 left-12 flex space-x-3 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-12 h-1 transition-all ${currentSlide === i ? 'bg-secondary' : 'bg-white opacity-30'}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Band / Featured Bar */}
      <section className="bg-accent py-4">
        <div className="container mx-auto px-6 flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-center lg:gap-8">
          <div className="flex flex-col gap-2 shrink-0">
            <h3 className="text-primary text-2xl font-bold font-serif">Featured Listings</h3>
            <div className="w-12 h-1 gold-gradient"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 w-full">
            <div className="flex flex-col">
              <span className="text-[14px] text-gradient-gold font-bold tracking-widest uppercase">Location</span>
              <span className="text-lg font-bold text-primary">Gandhi Nagar, Adyar</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] text-gradient-gold font-bold tracking-widest uppercase">Sizes</span>
              <span className="text-lg font-bold text-primary">8,377 - 20,975 Sq.Ft</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] text-gradient-gold font-bold tracking-widest uppercase">Category</span>
              <span className="text-lg font-bold text-primary">Residential & Commercial</span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t pt-8 border-gray-300 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16 w-full lg:w-auto">
            <div className="w-12 h-12 rounded-full luxury-gradient flex items-center justify-center text-white text-lg shrink-0 shadow-lg">
              <Phone size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Call Specialist</span>
              <span className="text-lg font-bold text-primary">+91 XXXXX XXXXX</span>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-8">Your Future Begins with the Right Property: Discover the Perfect Place to Build Your Future</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              At Goldfield Real Estate, we believe every property marks the beginning of a new chapter.
              Whether you're searching for the ideal location to build your dream home, expand your business, or secure a valuable investment, we're committed to helping you find opportunities that truly matter.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              With a focus on quality, transparency, and customer satisfaction, we offer carefully selected DTCP-approved residential and commercial properties in rapidly developing locations across Tamil Nadu. Every project is chosen with one goal in mind to provide our customers with confidence, value, and long term growth.
            </p>
            <p className="text-xl font-bold text-secondary italic">Your dream property is waiting. Let's find it together.</p>
          </motion.div>
        </div>
      </section>

      {/* Welcome to Goldfield Real Estate Section */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-primary">Welcome to Goldfield Real Estate</h2>
            <p className="text-lg text-gray-600 leading-relaxed font-bold italic">Real estate is more than a purchase, it's a decision that shapes your future.</p>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Goldfield Real Estate, we understand the importance of finding a property that aligns with your aspirations, lifestyle, and financial goals. That's why we provide trusted guidance and carefully verified property options that help our customers make informed decisions with complete peace of mind.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From first time buyers to seasoned investors, we are proud to serve individuals and families who seek quality properties, transparent transactions, and a partner they can trust throughout the journey.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800" alt="Goldfield Real Estate" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-primary mb-16 text-center">Why Choose Goldfield Real Estate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "DTCP-Approved Properties", desc: "Every project we offer is carefully verified to ensure legal compliance, security, and confidence for our customers." },
              { title: "Prime Locations", desc: "We focus on strategically developing locations that offer excellent connectivity, infrastructure growth, and strong future appreciation." },
              { title: "Customer First Approach", desc: "Your goals are at the heart of everything we do. We listen, understand, and provide solutions tailored to your needs." },
              { title: "Complete Property Assistance", desc: "From property selection and documentation support to registration guidance, we simplify every step of the process." },
              { title: "Long Term Investment Value", desc: "We help our customers identify opportunities that not only meet today's needs but also create lasting value for the future." },
            ].map((pillar, i) => (
              <div key={i} className="p-8 bg-light-gray rounded-xl border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-4">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 bg-primary text-white text-center border-y border-secondary/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-serif font-bold mb-8 text-secondary">Our Commitment</h2>
          <p className="text-lg leading-relaxed mb-8">
            At Goldfield Real Estate, we are committed to building relationships based on trust, integrity, and professionalism. Every interaction reflects our dedication to helping clients make confident real estate decisions that benefit them for years to come.
          </p>
          <p className="text-2xl font-bold font-serif italic">Building Trust. Creating Opportunities. Delivering Value.</p>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading title="Featured Properties" subtitle="Click any property for more details" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Residential Plots", type: "PREMIUM" },
              { label: "Commercial Spaces", type: "STRATEGIC" },
              { label: "Developed Communities", type: "LUXURY" }
            ].map((prop, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer relative rounded-xl overflow-hidden aspect-[4/5] shadow-lg"
                onClick={() => setPage('services')}
              >
                <div
                  className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700 bg-cover bg-center bg-gray-200"
                  style={{ backgroundImage: `url(${i === 0 ? img1 : i === 1 ? img2 : img3})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent p-8 flex flex-col justify-end">
                  <span className="bg-secondary text-dark text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-3">{prop.type}</span>
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">{prop.label}</h3>
                  <div className="flex items-center text-secondary gap-2 font-bold tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW DETAILS <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-24 luxury-gradient text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#b09340_0%,_transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading title="Investment Opportunities" light />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <TrendingUp size={32} />, title: "Why Invest with Us?", desc: "We offer not just properties, but long-term value align with your goals." },
              { icon: <TrendingUp size={32} />, title: "High ROI Projects", desc: "Our developments are located in high-growth areas, ensuring appreciation over time." },
              { icon: <TreePalm size={32} />, title: "Land Development", desc: "We work with landowners to transform raw land into valuable assets with full planning." },
              { icon: <Building size={32} />, title: "Expert Advisory", desc: "Our investment advisory team is here to guide you through every stage of your journey." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start p-8 rounded-xl border border-secondary/30 hover:border-secondary/60 transition-all bg-white/10 hover:bg-white/20"
              >
                <div className="text-secondary shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-200 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <SectionHeading title="Why Choose Gold Field Developers?" />
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our core values of transparency, trust, and quality are evident in every project we undertake.
              With a team of experienced architects, engineers, and real estate experts, we ensure that every property meets high standards of design and functionality.
            </p>
            <ul className="space-y-4 mb-10">
              {['Transparent Legal Documentation', 'RERA Approved Projects', 'High Growth Prime Locations', 'Comprehensive After-Sales Support'].map((list, i) => (
                <li key={i} className="flex items-center gap-3 text-primary font-bold">
                  <CheckCircle size={20} className="text-secondary" /> {list}
                </li>
              ))}
            </ul>
            <button onClick={() => setPage('about')} className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary transition-all tracking-widest text-sm">
              LEARN MORE ABOUT US
            </button>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="w-full aspect-video rounded-2xl shadow-2xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200')" }}>
              <div className="absolute inset-0 flex items-center justify-center text-secondary/20 font-serif italic text-4xl opacity-50 bg-black/30">
                Luxury Living Defined
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 gold-gradient p-8 rounded-lg shadow-xl hidden md:block">
              <div className="text-white font-serif font-bold text-5xl mb-1">10+</div>
              <div className="text-white/80 font-bold tracking-widest text-[10px] uppercase">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <SectionHeading title="WHAT OUR CLIENTS THINK" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Deepeka", text: "Working with Gold Field and Developers has been an absolute pleasure. Every step was handled with professionalism.", label: "A seamless home-buying experience" },
              { name: "Adhira", text: "As investors, finding a developer we can trust is critical. Gold Field has exceeded our expectations.", label: "A trusted partner in real estate" },
              { name: "Riya", text: "We were impressed by the quality and design of our new apartment. Their attention to detail is remarkable.", label: "Beyond our expectations" }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-xl shadow-sm relative"
              >
                <div className="text-secondary/20 absolute top-4 right-6 text-6xl font-serif italic">"</div>
                <div className="flex gap-1 text-secondary mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#b09340" />)}
                </div>
                <p className="text-gray-600 mb-8 italic leading-relaxed">"{review.text}"</p>
                <div className="border-t pt-6">
                  <h4 className="font-serif font-bold text-primary text-xl">{review.name}</h4>
                  <p className="text-secondary text-xs font-bold uppercase tracking-widest mt-1">{review.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-20 bg-gray-50">
    {/* Hero */}
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-primary to-black opacity-80" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 text-white tracking-tight"
        >
          About GoldField Real Estate
        </motion.h1>
        <p className="text-secondary text-lg md:text-xl tracking-[0.3em] uppercase font-bold mt-4 border-t border-secondary/30 pt-6 inline-block">Turning Property Dreams into Lasting Realities</p>
      </div>
    </section>

    {/* Intro */}
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
        <h2 className="text-3xl font-serif font-bold text-primary mb-8">Crafting Your Future With Trust & Expertise</h2>
        <p className="text-lg text-gray-700 leading-relaxed font-semibold italic border-l-4 border-secondary pl-6">
          Welcome to GoldField Real Estate, where trust, expertise, and customer satisfaction come together to create exceptional real estate experiences.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Founded with a vision to redefine the way people buy and invest in property, GoldField Real Estate has established itself as a trusted partner for individuals, families, and investors seeking reliable real estate opportunities. We understand that purchasing a property is one of life's most significant milestones, and we take great pride in helping our clients navigate that journey with confidence.
          {/* </p> */}
          {/* <p className="text-gray-600 leading-relaxed"> */}
          Our team combines market knowledge, industry expertise, and a customer-focused approach to provide personalized solutions that match each client's unique requirements. Whether you're looking for a residential plot to build your dream home, a commercial property to grow your business, or a strategic investment with strong appreciation potential, we are here to guide you every step of the way.
        </p>
      </div>
    </section>



    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold text-primary mb-16 text-center">Why Choose Goldfield Real Estate?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "DTCP-Approved Properties", desc: "Every project we offer is carefully verified to ensure legal compliance, security, and confidence for our customers." },
            { title: "Prime Locations", desc: "We focus on strategically developing locations that offer excellent connectivity, infrastructure growth, and strong future appreciation." },
            { title: "Customer First Approach", desc: "Your goals are at the heart of everything we do. We listen, understand, and provide solutions tailored to your needs." },
            { title: "Complete Property Assistance", desc: "From property selection and documentation support to registration guidance, we simplify every step of the process." },
            { title: "Long Term Investment Value", desc: "We help our customers identify opportunities that not only meet today's needs but also create lasting value for the future." },
          ].map((pillar, i) => (
            <div key={i} className="p-8 bg-light-gray rounded-xl border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-4">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ y: -10 }}
          className="p-10 bg-white rounded-3xl shadow-sm border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-primary mb-6 border-b border-gray-100 pb-4">Our Mission</h3>
          <p className="text-gray-700 italic mb-6 font-semibold">"To deliver exceptional real estate solutions through integrity, market knowledge, innovation, and customer commitment."</p>
          <p className="text-gray-600 leading-relaxed">Our mission is to provide our customers with trustworthy guidance, legally verified properties, and personalized service that simplifies the real estate journey while maximizing value and satisfaction.</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -10 }}
          className="p-10 bg-white rounded-3xl shadow-sm border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-primary mb-6 border-b border-gray-100 pb-4">Our Vision</h3>
          <p className="text-gray-700 italic mb-6 font-semibold">"To redefine luxury living by setting new standards in elegance, innovation, and customer satisfaction."</p>
          <p className="text-gray-600 leading-relaxed">Our vision is to become one of Tamil Nadu's most respected and trusted real estate companies, recognized for creating sustainable developments, exceptional customer experiences, and lasting value.</p>
        </motion.div>
      </div>
    </section>

    {/* DTCP Banner */}
    <section className="py-24 bg-primary text-white text-center border-y border-secondary/30">
      <div className="container mx-auto px-6 max-w-4xl space-y-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary">DTCP-Approved Properties - Safe Investments. Secure Futures.</h2>
        <p className="text-lg leading-relaxed text-gray-200">At GoldField Real Estate, we specialize in offering DTCP-approved residential and commercial properties that provide both legal security and strong investment potential.</p>
        <div className="h-px bg-secondary/50 w-24 mx-auto my-6" />
        <p className="text-gray-400 leading-relaxed">Our projects are located in carefully selected growth corridors where infrastructure development, accessibility, and future demand create opportunities for long-term appreciation.</p>
      </div>
    </section>

    {/* Why Trust Us */}
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-primary mb-16 text-center">Why Our Customers Trust Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Professionally Verified Properties",
            "DTCP-Approved Projects",
            "Transparent Documentation",
            "Personalized Consultation",
            "Strategic Investment Opportunities",
            "Customer-Centric Service",
            "Commitment to Quality and Integrity"
          ].map((point, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl bg-gray-50 shadow-inner"
            >
              <CheckCircle className="text-secondary shrink-0" size={24} />
              <span className="font-bold text-primary text-sm tracking-tight">{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ServicesPage = () => (
  <div className="pt-20">
    <section className="py-24 bg-primary text-white relative">
      <div className="img-placeholder-luxury absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6 text-white">OUR SERVICES</h1>
        <p className="text-gradient-gold text-xl tracking-widest uppercase font-bold">Developing Land. Creating Value. Building Communities.</p>
      </div>
    </section>

    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <p className="text-lg text-gray-600 leading-relaxed mb-6">At Goldfield Real Estate, we believe that every great development begins with vision, planning, and execution. We specialize in transforming raw land into premium plotted developments that are designed for growth, accessibility, and long-term value.</p>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">Our expertise extends beyond plot sales. We undertake the complete development process, from land identification and site preparation to infrastructure creation and final plot delivery ensuring every project meets the highest standards of quality and reliability.</p>
        <p className="text-lg text-gray-600 leading-relaxed">By combining strategic locations, professional planning, and modern infrastructure, we create developments that offer exceptional investment potential and a strong foundation for future construction.</p>
      </div>
    </section>

    <section className="py-24 bg-light-gray">
      <div className="container mx-auto px-6">
        <SectionHeading title="Comprehensive Plot Development Solutions" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Land Acquisition & Project Planning", desc: "Every successful development begins with selecting the right location. Our team carefully evaluates land based on connectivity, growth prospects, infrastructure potential, and future appreciation opportunities before initiating development." },
            { title: "Master Layout Planning", desc: "We design thoughtfully planned layouts that optimize land utilization while ensuring accessibility, functionality, and long term sustainability. Every layout is planned with future growth and customer convenience in mind." },
            { title: "Infrastructure Development", desc: "Our projects are developed with complete infrastructure provisions, transforming undeveloped land into organized and ready to build plots.", list: ["Internal road networks", "Stormwater drainage systems", "Street lighting facilities", "Utility corridors and service provisions", "Clearly demarcated plot boundaries", "Access and circulation planning"] },
            { title: "Road & Connectivity Development", desc: "Accessibility is one of the most important drivers of property value. We develop well-planned road networks within our layouts while ensuring convenient connectivity to major highways, transportation routes, educational institutions, healthcare facilities, and commercial centers." },
            { title: "Drainage & Site Engineering", desc: "Effective drainage is essential for maintaining the long-term usability and value of a development. Our engineering approach incorporates proper drainage planning and site grading to ensure efficient water management throughout the project." },
            { title: "Street Lighting & Essential Amenities", desc: "To create safer and more organized developments, we incorporate street lighting infrastructure and essential community provisions that enhance the overall appeal and functionality of the layout." },
            { title: "Ready to Build Plot Delivery", desc: "We don't simply divide land into plots. We develop, design, engineer, and prepare every project so customers receive plots that are development-ready and positioned for future growth." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white rounded-xl shadow-sm border-l-4 border-secondary">
              <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{item.desc}</p>
              {item.list && (
                <div className="mt-4">
                  <p className="font-bold text-primary mb-2 text-sm italic">Infrastructure development includes:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 list-disc pl-5">
                    {item.list.map((listItem, j) => <li key={j}>{listItem}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>



    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeading title="Our Development Process" subtitle="From Raw Land to Premium Plotted Development" />
        <div className="max-w-4xl mx-auto space-y-8 mt-12">
          {[
            {
              title: "Site Assessment & Feasibility Study",
              desc: "Detailed evaluations are conducted to assess location advantages, accessibility, topography, environmental conditions, and development potential.",
              image: img4
            },
            {
              title: "Surveying & Land Analysis",
              desc: "Professional surveys establish accurate boundaries, dimensions, and site characteristics, providing the foundation for precise planning and execution.",
              image: img5
            },
            {
              title: "Soil Testing & Engineering Evaluation",
              desc: "Comprehensive soil investigations help determine land suitability and support future infrastructure and construction planning.",
              image: img6
            },
            {
              title: "Layout Design & Infrastructure Planning",
              desc: "Our planning and engineering teams develop efficient layouts incorporating roads, drainage systems, utility provisions, and open spaces while maximizing land value.",
              image: img7
            },
            {
              title: "Regulatory Compliance & Approvals",
              desc: "Every project undergoes rigorous review and approval processes to ensure compliance with applicable planning and development regulations.",
              image: img8
            },
            {
              title: "Infrastructure Execution",
              desc: "Once approved, development activities commence, including road formation, drainage installation, street lighting provisions, utility planning, and plot demarcation.",
              image: img9
            },
            {
              title: "Final Plot Handover",
              desc: "The result is a professionally developed, infrastructure-ready plotted community designed to provide long term value for homeowners and investors alike.",
              image: img10
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 items-start group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-primary font-bold flex items-center justify-center shadow-lg border-2 border-white group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {i + 1}
              </div>
              <div className="bg-light-gray p-8 rounded-xl flex-grow shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                <div className="mt-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeading title="Why Choose Goldfield Real Estate?" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Premium Residential Layouts",
              desc: "Carefully planned residential communities designed to provide comfort, convenience, and long-term value for homeowners and investors."
            },
            {
              title: "Infrastructure-Ready Developments",
              desc: "All projects include well-laid roads, drainage systems, street lighting, water facilities, and essential infrastructure for immediate usability."
            },
            {
              title: "High-Growth Investment Locations",
              desc: "Strategically selected locations with strong connectivity, future development potential, and excellent appreciation opportunities."
            },
            {
              title: "Legal Clarity & Transparency",
              desc: "Every project is backed by clear documentation, regulatory compliance, and a transparent purchasing process for complete peace of mind."
            },
            {
              title: "Trusted Quality Standards",
              desc: "We maintain high standards in planning, execution, and infrastructure development to ensure lasting value in every project."
            },
            {
              title: "Building Communities for the Future",
              desc: "Goldfield Real Estate goes beyond selling plots. We create sustainable developments that support future growth, enhance lifestyles, and deliver long-term investment confidence."
            }
          ].map((reason, i) => (
            <div key={i} className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-primary mb-4">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.desc}</p>
            </div>
          ))}
          <div className="md:col-span-3 text-center pt-12">
            <p className="text-primary text-2xl font-serif font-bold italic">Goldfield Real Estate</p>
            <p className="text-secondary font-bold uppercase tracking-widest text-sm mt-3">Where Vision Meets Value. Where Land Becomes Opportunity.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-2xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">Get a Free Quote</h2>
          <p className="text-gray-600">Tell us about your project and we'll get back to you shortly.</p>
        </div>
        <form className="glass-card p-10 rounded-2xl shadow-xl space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary">First Name</label>
              <input type="text" className="w-full bg-light-gray border-none p-3 rounded-lg focus:ring-2 focus:ring-secondary transition-all outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary">Last Name</label>
              <input type="text" className="w-full bg-light-gray border-none p-3 rounded-lg focus:ring-2 focus:ring-secondary transition-all outline-none" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-primary">Email Address</label>
            <input type="email" className="w-full bg-light-gray border-none p-3 rounded-lg focus:ring-2 focus:ring-secondary transition-all outline-none" required />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-primary">Service Interested In</label>
            <select className="w-full bg-light-gray border-none p-3 rounded-lg focus:ring-2 focus:ring-secondary transition-all outline-none">
              <option>Land Acquisition</option>
              <option>Layout Planning</option>
              <option>Infrastructure Development</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-primary">Message</label>
            <textarea className="w-full bg-light-gray border-none p-3 rounded-lg h-32 focus:ring-2 focus:ring-secondary transition-all outline-none"></textarea>
          </div>
          <button className="w-full gold-gradient text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all tracking-widest active:scale-95">
            SEND ENQUIRY
          </button>
        </form>
      </div>
    </section>
  </div>
);


const ContactPage = () => (
  <div className="pt-20 bg-gray-50">
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary/20" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 text-white"
        >
          Get in Touch
        </motion.h1>
        <p className="text-secondary text-lg md:text-xl tracking-[0.2em] uppercase font-bold">Let's Build Your Future Together</p>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h3 className="text-2xl font-bold text-primary border-b border-gray-100 pb-4">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <MapPin className="text-secondary shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-primary">Office Address</p>
                    <p className="text-gray-600 text-sm leading-relaxed">No. 89, Abdul Kalam Street, Anbil Nagar, Airport, Tiruchirappalli, Tamil Nadu – 620007</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-secondary shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-primary">Mobile</p>
                    <p className="text-gray-600 text-sm">+91 XXXXX XXXXX</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-secondary shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-primary">Email</p>
                    <p className="text-gray-600 text-sm">info@goldfieldrealestate.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Zap className="text-secondary shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-primary">Business Hours</p>
                    <p className="text-gray-600 text-sm">Mon–Sat: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Shield className="text-secondary shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-primary">GST Information</p>
                    <p className="text-gray-600 text-sm">GSTIN: 33ABDFG1343C1Z4</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7513814881075!2d80.22237937582236!3d12.92383271597151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d8b8e0e6c6b%3A0x6d9de42b9c7cf8d7!2sShollinganallur%2C+Chennai%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1716752000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-primary mb-2">Send Us an Enquiry</h3>
            <p className="text-gray-500 mb-8 text-sm">Have a question? Complete the form below, and our consultants will contact you shortly.</p>
            <form className="space-y-5">
              <input type="text" placeholder="Your Name" className="w-full bg-gray-50 border-none p-4 rounded-lg focus:ring-2 focus:ring-secondary transition-all outline-none" required />
              <input type="email" placeholder="Your Email" className="w-full bg-gray-50 border-none p-4 rounded-lg focus:ring-2 focus:ring-secondary transition-all outline-none" required />
              <textarea placeholder="Message" className="w-full bg-gray-50 border-none p-4 rounded-lg h-32 focus:ring-2 focus:ring-secondary transition-all outline-none"></textarea>
              <button className="w-full gold-gradient text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all tracking-widest text-sm active:scale-95">
                SEND ENQUIRY
              </button>
            </form>
          </div>
        </div>

        <div className="text-center pt-24 mt-12 border-t border-gray-200 text-primary">
          <h4 className="text-2xl font-bold">Goldfield Real Estate</h4>
          <p className="text-secondary font-bold uppercase tracking-widest text-xs mt-2">Where Trust Meets Opportunity.</p>
        </div>
      </div>
    </section>
  </div>
);

const Footnotes = ({ currentPage }: { currentPage: PageId }) => (
  <section id="contact" className={`py-24 bg-primary text-white ${currentPage === 'contact' ? 'hidden' : ''}`}>
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-8 gold-underline">CONTACT US</h3>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-secondary shrink-0" />
              <p className="text-gray-300 leading-relaxed">{BRAND.address}</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-secondary shrink-0" />
              <p className="text-gray-300">{BRAND.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-secondary shrink-0" />
              <p className="text-gray-300">{BRAND.phones.join(' / ')}</p>
            </div>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-secondary hover:text-white transition-all"><Facebook size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-secondary hover:text-white transition-all"><Twitter size={20} /></a>
            </div>
          </div>
        </div>

        {/* <div>
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7513814881075!2d80.22237937582236!3d12.92383271597151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d8b8e0e6c6b%3A0x6d9de42b9c7cf8d7!2sShollinganallur%2C+Chennai%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1716752000000!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[300px] rounded-xl"
             ></iframe>
          </div> */}

        {/* <div className="bg-white/5 p-8 rounded-xl border border-white/10">
            <h4 className="text-xl font-bold mb-6 text-white">Quick Enquiry</h4>
            <div className="space-y-4 text-primary">
              <input type="text" placeholder="Your Name" className="w-full p-4 rounded-lg bg-white outline-none" />
              <input type="email" placeholder="Your Email" className="w-full p-4 rounded-lg bg-white outline-none" />
              <textarea placeholder="Message" className="w-full p-4 rounded-lg bg-white h-24 outline-none"></textarea>
              <button className="w-full gold-gradient text-white font-bold py-4 rounded-lg tracking-widest text-xs uppercase hover:brightness-110 transition-all shadow-md">
                SEND MESSAGE
              </button>
            </div>
          </div> */}
      </div>
    </div>
  </section>
);
const Footer = () => (
  <footer className="bg-dark py-12 border-t border-white/5">
    <div className="container mx-auto px-6 h-full flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-gray-400 uppercase">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>GOLD FIELD</span>
          <span className="text-[8px] text-gradient-gold font-semibold uppercase">Developers</span>
        </div>
        <div className="hidden md:block w-[1px] h-4 bg-gray-700"></div>
        <span>© 2025 Gold Field Developers</span>
        <div className="hidden md:block w-[1px] h-4 bg-gray-700"></div>
        <span>Chennai, India</span>
      </div>

      <div className="flex gap-8 items-center mt-6 md:mt-0">
        <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
        <div className="flex gap-4 ml-4">
          <a href="#" className="text-white hover:text-secondary">FB</a>
          <a href="#" className="text-white hover:text-secondary">TW</a>
          <a href="#" className="text-white hover:text-secondary">IN</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'home': return <Home setPage={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage />;
      case 'contact': return <ContactPage />;
      default: return <Home setPage={setCurrentPage} />;
    }
  }, [currentPage]);

  return (
    <div className="relative">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footnotes currentPage={currentPage} />
      <Footer />
    </div>
  );
}
