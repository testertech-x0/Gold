/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, Mail, MapPin, ChevronLeft, ChevronRight, 
  Map as MapIcon, Shield, Star, CheckCircle, ArrowRight,
  TrendingUp, Home as HomeIcon, Zap, Loader2, Building, TreePalm,
  Facebook, Twitter, Handshake, MessageCircle, LayoutGrid,Waves,Lightbulb,
} from 'lucide-react';


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
    primary: "#0F1E3D",
    secondary: "#C9A227"
  }
};

const SLIDES: Slide[] = [
  {
    headline: "Chennai's Premier Real Estate Development Partner",
    subtext: "Trusted Property Solutions with Transparency and Excellence",
    cta: "Get Free Consultation",
    bg: "linear-gradient(rgba(15, 30, 61, 0.82), rgba(7, 14, 28, 0.92)), url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200')"
  },
  {
    headline: "Own the Land. Build the Dream.",
    subtext: "Premium plots designed for the better home",
    cta: "Get Free Consultation",
    bg: "linear-gradient(rgba(15, 30, 61, 0.82), rgba(7, 14, 28, 0.92)), url('https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200')"
  },
  {
    headline: "Secure High ROI Land Investments",
    subtext: "Premium Plotted Communities in Tamil Nadu's Rapidly Developing Corridors",
    cta: "Get Free Consultation",
    bg: "linear-gradient(rgba(15, 30, 61, 0.82), rgba(7, 14, 28, 0.92)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200')"
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
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Services", id: "services" },
    { label: "Contact Us", id: "contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0F1E3D]/95 backdrop-blur-md shadow-xl py-4 border-b border-secondary/10' : 'bg-transparent py-7'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex flex-col cursor-pointer group" 
          onClick={() => setPage('home')}
        >
          <span className="text-2xl lg:text-3xl font-bold tracking-wider text-secondary transition-transform duration-300 group-hover:scale-105" style={{ fontFamily: "'Playfair Display', serif" }}>GOLD FIELD</span>
          <span className="text-[11px] lg:text-xs tracking-[0.3em] text-gradient-gold uppercase font-semibold">Developers</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setPage(link.id)}
                className={`text-xs lg:text-sm font-bold tracking-[0.15em] relative group transition-colors uppercase ${currentPage === link.id ? 'text-secondary font-black' : 'text-gray-200 hover:text-white'}`}
              >
                {link.label}
                <span className={`absolute -bottom-1.5 left-0 w-full h-[2px] bg-secondary transition-transform duration-300 ${currentPage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
            ))}
          </div>
          <button 
            onClick={() => setPage('contact')}
            className="gold-gradient text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest hover:brightness-110 hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] transition-all transform active:scale-95"
          >
            ENQUIRE NOW
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-secondary hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-[#0F1E3D] border-b border-secondary/20 shadow-2xl absolute top-full left-0 w-full"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { setPage(link.id); setIsMenuOpen(false); }}
                  className={`text-left text-xl font-bold tracking-wider ${currentPage === link.id ? 'text-secondary' : 'text-gray-200'}`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setPage('contact');
                }}
                className="text-left text-xl font-bold text-secondary flex items-center gap-2 hover:translate-x-2 transition-transform"
              >
                ENQUIRE NOW <ArrowRight size={20} />
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

// --- Pages ---// --- Reusable Quick Enquiry Form with Premium Validation ---
const QuickEnquiryForm = ({ lightBg = false }: { lightBg?: boolean }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) newErrors.phone = 'Please enter a valid 10-digit phone number';

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className={`p-8 md:p-10 rounded-3xl transition-all shadow-2xl relative border ${lightBg ? 'bg-white border-gray-200/60' : 'bg-[#0F1E3D]/80 backdrop-blur-md border-secondary/20'}`}>
      {isSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-6"
        >
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center text-white mx-auto shadow-lg shadow-secondary/20">
            <CheckCircle size={32} />
          </div>
          <div className="space-y-2">
            <h3 className={`text-2xl font-serif font-bold ${lightBg ? 'text-primary' : 'text-white'}`}>Enquiry Submitted!</h3>
            <p className={`text-sm max-w-xs mx-auto ${lightBg ? 'text-gray-600' : 'text-gray-300'}`}>
              Thank you for choosing Gold Field Developers. Our expert consultants will contact you within the next 24 hours.
            </p>
          </div>
          <button 
            onClick={() => setIsSuccess(false)}
            className="text-xs font-bold uppercase tracking-widest text-secondary hover:underline"
          >
            Send Another Inquiry
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className={`text-2xl font-serif font-bold ${lightBg ? 'text-primary' : 'text-white'} mb-1`}>Quick Enquiry</h3>
            <p className="text-xs text-gray-400 mb-6">Experience our premium services & consultations.</p>
          </div>
          
          <div className="space-y-1">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-4 rounded-xl text-sm outline-none transition-all ${
                lightBg 
                  ? 'bg-gray-50 text-primary border border-gray-200 focus:border-secondary' 
                  : 'bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:border-secondary/50 focus:bg-white/15'
              }`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1 pl-1">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <input 
              type="tel" 
              placeholder="Phone Number (e.g., 9876543210)" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full p-4 rounded-xl text-sm outline-none transition-all ${
                lightBg 
                  ? 'bg-gray-50 text-primary border border-gray-200 focus:border-secondary' 
                  : 'bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:border-secondary/50 focus:bg-white/15'
              }`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1 pl-1">{errors.phone}</p>}
          </div>

          <div className="space-y-1">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full p-4 rounded-xl text-sm outline-none transition-all ${
                lightBg 
                  ? 'bg-gray-50 text-primary border border-gray-200 focus:border-secondary' 
                  : 'bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:border-secondary/50 focus:bg-white/15'
              }`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1 pl-1">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <textarea 
              placeholder="Your Message / Requirement" 
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full p-4 rounded-xl text-sm outline-none h-24 resize-none transition-all ${
                lightBg 
                  ? 'bg-gray-50 text-primary border border-gray-200 focus:border-secondary' 
                  : 'bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:border-secondary/50 focus:bg-white/15'
              }`}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1 pl-1">{errors.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full gold-gradient text-white font-bold py-4 rounded-xl tracking-widest text-xs uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                SUBMITTING...
              </>
            ) : (
              "SEND MESSAGE"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

const Home = ({ setPage }: { setPage: (p: PageId) => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // --- Testimonial Single Feedback Slider State ---
  const testimonials = [
    { name: "Deepeka", text: "Working with Gold Field Developers has been an absolute pleasure. Every step was handled with deep professionalism and clear transparency.", label: "A seamless home-buying experience" },
    { name: "Adhira", text: "As seasoned investors, finding a developer we can trust is critical. Gold Field has exceeded our expectations in every single project.", label: "A trusted partner in real estate" },
    { name: "Riya", text: "We were impressed by the build quality, fast project timelines, and pristine layout design. Their attention to detail is remarkable.", label: "Beyond our expectations" }
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Hero Section - Split Layout with Integrated Quick Enquiry Form */}
      <section className="relative min-h-screen lg:h-[95vh] w-full overflow-hidden flex items-center shadow-2xl pt-28 pb-16 lg:py-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: SLIDES[currentSlide].bg.match(/url\('(.*?)'\)/)?.[0] || 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
             {/* Gradient overlay overlaying the background image */}
             <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3D]/95 via-[#0F1E3D]/85 to-[#070e1c]/90" />
             <div className="absolute inset-0 dot-pattern opacity-10" />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-[2px] bg-secondary" />
              <span className="text-secondary text-sm font-extrabold tracking-[0.25em] uppercase">Chennai's Premier Choice</span>
            </motion.div>

            <motion.h1 
              key={`h1-${currentSlide}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white leading-[1.15]"
            >
              {SLIDES[currentSlide].headline}
            </motion.h1>

            <motion.p 
                key={`p-${currentSlide}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg md:text-xl text-gray-300 font-light max-w-xl leading-relaxed"
            >
              {SLIDES[currentSlide].subtext}
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-5 pt-4"
            >
              <button 
                onClick={() => setPage('contact')}
                className="gold-gradient text-white px-10 py-4 text-xs font-bold tracking-widest rounded-sm shadow-xl active:scale-95 transition-all hover:brightness-110 uppercase"
              >
                {SLIDES[currentSlide].cta}
              </button>
              <button 
                onClick={() => setPage('about')}
                className="border border-white/30 bg-white/5 backdrop-blur-sm text-white px-10 py-4 text-xs font-bold tracking-widest rounded-sm hover:bg-white hover:text-primary transition-all uppercase"
              >
                OUR STORY
              </button>
            </motion.div>
          </div>

          {/* Quick Enquiry Form right inside the Hero region on home page */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <QuickEnquiryForm />
            </motion.div>
          </div>
        </div>

        {/* slider dots */}
        <div className="absolute bottom-6 left-12 flex space-x-3 z-20 hidden lg:flex">
          {SLIDES.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={`w-12 h-1.5 transition-all rounded-full ${currentSlide === i ? 'bg-secondary' : 'bg-white/40'}`} 
            />
          ))}
        </div>
      </section>

      {/* Trust Band / Featured Bar with 20% larger typography and premium spacing */}
      <section className="bg-gray-100 py-16 border-b border-gray-200/50">
        <div className="container mx-auto px-6 flex flex-col gap-10 lg:flex-row lg:justify-between lg:items-center lg:gap-16">
           <div className="flex flex-col gap-3 shrink-0">
              <h3 className="text-primary text-3xl font-bold font-serif tracking-tight">Featured Listings</h3>
              <div className="w-16 h-1.5 gold-gradient rounded-full"></div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full">
              <div className="flex flex-col gap-1">
                <span className="text-xs lg:text-sm text-secondary font-black tracking-[0.2em] uppercase">Location</span>
                <span className="text-lg lg:text-xl font-bold text-primary">Gandhi Nagar, Adyar</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs lg:text-sm text-secondary font-black tracking-[0.2em] uppercase">Sizes</span>
                <span className="text-lg lg:text-xl font-bold text-primary">8,377 - 20,975 Sq.Ft</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs lg:text-sm text-secondary font-black tracking-[0.2em] uppercase">Category</span>
                <span className="text-lg lg:text-xl font-bold text-primary">Residential & Commercial</span>
              </div>
           </div>

           <div className="flex items-center gap-5 border-t pt-10 border-gray-300 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16 w-full lg:w-auto">
              <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center text-white text-xl shrink-0 shadow-xl">
                <Phone size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-extrabold uppercase tracking-widest">Call Specialist</span>
                <a href="tel:+91XXXXXXXXXX" className="text-xl lg:text-2xl font-black text-primary hover:text-secondary transition-colors">+91 XXXXX XXXXX</a>
              </div>
           </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary leading-tight">Every Great Dream Begins with the Right Plot of Land</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
              A home isn't built with bricks alone it begins with a piece of land where dreams take root. Whether you imagine a home filled with laughter, a thriving business, or an investment for your family's future, the right plot is where it all starts. 
              </p>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
              At Goldfield Real Estate, we're here to help you find more than just land. We help you discover a place where memories will be made, milestones will be celebrated, and futures will be built.
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
              With carefully selected DTCP approved residential and commercial plots across Tamil Nadu, we make your journey to land ownership simple, transparent, and rewarding.
            </p>
            <p className="text-2xl font-serif font-black text-secondary italic tracking-wide">"The perfect plot isn't just land it's where your future begins."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Welcome to Goldfield Real Estate Section */}
      <section className="py-28 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Welcome to Goldfield Real Estate</h2>
            <p className="text-xl text-gray-700 leading-relaxed font-bold italic border-l-4 border-secondary pl-6">
              Every dream begins with a piece of land. Find the plot where your future takes shape.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Goldfield Real Estate, we believe buying a plot is more than an investment, it's the first step toward building the life you've always imagined. Whether it's a home where your family grows, a business that thrives, or a legacy for the next generation, every journey starts with the right piece of land.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're committed to making that journey simple, transparent, and rewarding. With carefully selected DTCP-approved residential and commercial plots in Tamil Nadu's fastest growing locations, we help you invest with confidence and peace of mind.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
            From first time buyers to seasoned investors, we're here to guide you every step of the way, helping you find not just a plot, but a place where your dreams can truly take root.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <img src="https://i.ibb.co/JRpnxSq9/unnamed.png"
           alt="Goldfield Real Estate" className="w-full h-auto hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Featured Services (replaces Featured Properties with 6-card grid) */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <SectionHeading title="Featured Services" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our premium offerings crafted to deliver long-term investment value & trust.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Residential Plot Development", 
                desc: "Premium, carefully curated DTCP-approved layouts designed with rich infrastructure in prime Tamil Nadu appreciation corridors.", 
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600",
                type: "PREMIUM"
              },
              { 
                title: "Commercial Space Planning", 
                desc: "Strategically positioned plots designed specifically for highly active commercial layouts, corporate hubs, and retail projects.", 
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600",
                type: "STRATEGIC"
              },
              { 
                title: "Land Acquisition Services", 
                desc: "Complete, thorough end-to-end support in sourcing, legally vetting, and acquiring premium raw land parcels with clear titles.", 
                image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600",
                type: "LUXURY"
              },
              { 
                title: "Property Consultation", 
                desc: "Get personalized, deeply researched investment advice from real estate professionals tailored to your portfolio growth targets.", 
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600",
                type: "EXPERT"
              },
              { 
                title: "Legal Documentation Support", 
                desc: "Absolute compliance assurance through thorough parent deed tracking, DTCP approval validation, and smooth registrar handling.", 
                image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600",
                type: "SECURE"
              },
              { 
                title: "Project Development", 
                desc: "Turning raw parcels into luxury ready-to-build gated communities with internal asphalt roads, drainage systems, and green areas.", 
                image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600",
                type: "ELITE"
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl flex flex-col justify-end"
                onClick={() => setPage('services')}
              >
                <div 
                  className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700 bg-cover bg-center bg-gray-200" 
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                {/* Visual shade gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E3D] via-[#0F1E3D]/40 to-transparent transition-opacity group-hover:from-[#0F1E3D]/95" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <span className="bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-3 tracking-widest">{service.type}</span>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-secondary transition-colors">{service.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">{service.desc}</p>
                  <div className="flex items-center text-secondary gap-2 font-bold tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    LEARN MORE <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section with Premium Dark styling & High Contrast readable content */}
      <section className="py-28 bg-[#0F1E3D] text-white relative border-y border-secondary/20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#C9A227_0%,_transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading title="Investment Opportunities" light />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              { icon: <TrendingUp size={36} />, title: "Emerging Growth Corridors", desc: "Positioned Where Growth Never Stops.Invest in carefully selected locations benefiting from rapid infrastructure development, economic expansion, and rising land values." },
              { icon: <TrendingUp size={36} />, title: "Long-Term Value Creation", desc: "An Investment That Appreciates with Time.Own premium plotted developments designed to generate sustainable capital growth and long-term financial security." },
              { icon: <TreePalm size={36} />, title: "Future-Ready Communities", desc: "Crafted for Tomorrow's Lifestyle.Master-planned layouts with world-class infrastructure, green landscapes, and thoughtfully designed spaces that elevate everyday living." },
              { icon: <Building size={36} />, title: "Secure Investment", desc: "Trust Built on Transparency.Legally approved developments with verified titles, complete documentation, and a streamlined ownership process for absolute peace of mind." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start p-8 rounded-2xl border border-secondary/20 hover:border-secondary/50 transition-all bg-[#070e1c]/80 hover:bg-[#070e1c]/95 shadow-lg group"
              >
                <div className="text-secondary shrink-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-white tracking-wide group-hover:text-secondary transition-colors">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-base">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Dynamic, One feedback at a time */}
      <section className="py-28 bg-gray-50 border-b border-gray-200/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <SectionHeading title="WHAT OUR CLIENTS THINK" />
          </div>
          
          <div className="relative bg-white p-12 md:p-16 rounded-3xl shadow-xl border border-gray-100 min-h-[350px] flex flex-col justify-between">
            <div className="text-secondary/10 absolute top-8 right-12 text-[120px] font-serif leading-none select-none">“</div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 relative z-10"
              >
                <div className="flex gap-1 text-secondary">
                  {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="#C9A227" className="text-secondary" />)}
                </div>
                <p className="text-xl md:text-2xl text-gray-700 font-light italic leading-relaxed">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-serif font-black text-primary text-2xl">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-secondary text-sm font-extrabold uppercase tracking-widest mt-1">{testimonials[activeTestimonial].label}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100 relative z-10">
              {/* Slider Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-10 h-1.5 rounded-full transition-all duration-300 ${activeTestimonial === i ? 'bg-secondary' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
              
              {/* Chevrons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev - prev + testimonials.length - 1 + activeTestimonial) % testimonials.length)}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-20 bg-white">
    {/* Hero */}
    <section className="py-28 bg-[#0F1E3D] text-white relative overflow-hidden">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0F1E3D] via-[#0F1E3D] to-black opacity-85" />
       <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-serif font-black mb-6 text-white tracking-tight"
        >
          About GoldField Real Estate
        </motion.h1>
        <p className="text-secondary text-base md:text-lg tracking-[0.3em] uppercase font-bold mt-4 border-t border-secondary/30 pt-6 inline-block">Where Every Plot is a Promise of Growth.</p>
       </div>
    </section>

    {/* Intro paragraph content structured in a single clean layout block as requested */}
    <section className="py-28 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <SectionHeading title="Crafting Your Future with Trust & Expertise" />
        </div>
        <div className="space-y-8 text-lg text-gray-700 leading-relaxed font-light">
          <p className="text-2xl text-primary font-serif font-semibold italic border-l-4 border-secondary pl-6 mb-10 text-left">
            Welcome to GoldField Real Estate, where we transform carefully selected land into premium plotted developments designed for secure investments and future ready living.
          </p>
          <p>
            At GoldField Real Estate, we specialize in developing DTCP approved residential and commercial plotted layouts with a strong focus on quality infrastructure and long term value. Every plotted development is meticulously planned to offer excellent connectivity, modern infrastructure, and strong long term investment potential.
          </p>
          <p>
            Our developments feature wide blacktop roads, well planned layouts, modern street lighting, efficient drainage systems, clearly demarcated plots, and ready for registration developments. Every detail is thoughtfully executed to ensure buyers receive a plot that is ready for immediate ownership and future construction.
          </p>
          <p>
            With transparent documentation, legally compliant approvals, and a commitment to timely delivery, we provide a hassle-free buying experience for homeowners and investors alike. Whether you're purchasing your first residential plot or expanding your investment portfolio, we ensure every development meets the highest standards of planning and quality.
          </p>
          <p className="text-xl font-medium font-serif text-primary">
            At GoldField Real Estate, we don't just sell plots, we create well developed communities and investment opportunities that stand the test of time.
          </p>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-28 bg-gray-50 border-y border-gray-100">
       <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 bg-white rounded-3xl shadow-xl border border-gray-200/50 flex flex-col justify-between"
          >
             <div>
               <h3 className="text-3xl font-serif font-black text-primary mb-6 border-b border-gray-100 pb-4">Our Mission</h3>
               <p className="text-secondary italic mb-6 font-bold text-lg leading-relaxed">"To deliver exceptional real estate solutions through integrity, market knowledge, innovation, and customer commitment."</p>
               <p className="text-gray-600 leading-relaxed text-base">Our mission is to provide our customers with trustworthy guidance, legally verified properties, and personalized service that simplifies the real estate journey while maximizing value and satisfaction.</p>
             </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 bg-white rounded-3xl shadow-xl border border-gray-200/50 flex flex-col justify-between"
          >
             <div>
               <h3 className="text-3xl font-serif font-black text-primary mb-6 border-b border-gray-100 pb-4">Our Vision</h3>
               <p className="text-secondary italic mb-6 font-bold text-lg leading-relaxed">"To redefine luxury living by setting new standards in elegance, innovation, and customer satisfaction."</p>
               <p className="text-gray-600 leading-relaxed text-base">Our vision is to become one of Tamil Nadu's most respected and trusted real estate companies, recognized for creating sustainable developments, exceptional customer experiences, and lasting value.</p>
             </div>
          </motion.div>
       </div>
    </section>

    {/* Relocated "Why Choose Gold Field Developers" from Home page as requested */}
    <section className="py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <SectionHeading title="Why Choose Gold Field Developers?" />
          <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
            Our core values of transparency, trust, and quality are evident in every project we undertake. 
            With a team of experienced architects, engineers, and real estate experts, we ensure that every property meets high standards of design and functionality.
          </p>
          <ul className="space-y-5 mb-10">
            {['Transparent Legal Documentation', 'RERA Approved Projects', 'High Growth Prime Locations', 'Comprehensive After-Sales Support'].map((list, i) => (
              <li key={i} className="flex items-center gap-4 text-primary font-bold text-base">
                <CheckCircle size={22} className="text-secondary shrink-0" /> {list}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-1/2 relative">
           <div className="w-full aspect-video rounded-3xl shadow-2xl overflow-hidden bg-cover bg-center border-4 border-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200')" }}>
              <div className="absolute inset-0 flex items-center justify-center text-secondary/30 font-serif italic text-4xl opacity-55 bg-black/40">
                Luxury Living Defined
              </div>
           </div>
           <div className="absolute -bottom-8 -left-8 gold-gradient p-8 rounded-2xl shadow-xl hidden md:block border-2 border-white">
              <div className="text-white font-serif font-black text-5xl mb-1">10+</div>
              <div className="text-white/90 font-extrabold tracking-widest text-xs uppercase">Years of Excellence</div>
           </div>
        </div>
      </div>
    </section>

    {/* DTCP Banner */}
    <section className="py-24 bg-[#0F1E3D] text-white text-center border-y border-secondary/20">
      <div className="container mx-auto px-6 max-w-4xl space-y-6">
        <h2 className="text-3xl md:text-4xl font-serif font-black text-secondary leading-tight">DTCP-Approved Plots. Secure Investments. Lasting Value.</h2>
        <p className="text-lg leading-relaxed text-gray-200">At GoldField Real Estate, we specialize in offering DTCP-approved residential and commercial properties that provide both legal security and strong investment potential.
          Strategically located in emerging growth corridors, our plotted developments are positioned to benefit from expanding infrastructure, increasing demand, and long-term capital appreciation.
        </p>
        
        {/* <p className="text-lg leading-relaxed text-gray-200">Strategically located in emerging growth corridors, our plotted developments are positioned to benefit from expanding infrastructure, increasing demand, and long-term capital appreciation.</p> */}
      </div>
    </section>

    {/* Gallery Grid - Modern Villas, Commercial Developments, Construction Progress, Happy Clients */}
    {/* Gallery Grid - Our Plotted Developments */}
<section className="py-28 bg-gray-50">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16 space-y-3">
      <SectionHeading title="Our Plotted Developments" />
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Well-planned layouts, quality infrastructure, and clear legal titles –
        everything you need for a secure and valuable investment.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          title: "Well Planned Layout",
          desc: "Thoughtfully designed plots with proper dimensions and efficient space utilization.",
          icon: <LayoutGrid size={40} className="text-[#D4A017]" />,
          url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200",
        },
        {
          title: "Well Lighting",
          desc: "Bright and reliable street lighting ensuring safety, visibility, and a premium living experience.",
          icon: <Lightbulb size={40} className="text-[#D4A017]" />,
          url: "https://images.pexels.com/photos/1755683/pexels-photo-1755683.jpeg?auto=compress&cs=tinysrgb&w=1200",
        },
        {
          title: "Efficient Drainage System",
          desc: "Properly engineered drainage ensuring a clean, safe, and hassle-free environment.",
          icon: <Waves size={40} className="text-[#D4A017]" />,
          url: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1200",
        },
        {
          title: "Plot Ready for Delivery",
          desc: "Clear titles, complete infrastructure, and immediate possession for peace of mind.",
          icon: <Handshake size={40} className="text-[#D4A017]" />,
          url: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1200",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.35 }}
          className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl border border-gray-200 bg-white cursor-pointer"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url('${item.url}')`,
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08172F] via-[#08172F]/70 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-7 z-10">

            <div className="flex items-start gap-4">

              <div className="shrink-0">
                {item.icon}
              </div>

              <div>
                <h4 className="text-[22px] font-serif font-bold text-white leading-tight">
                  {item.title}
                </h4>

                <p className="text-gray-200 text-[14px] leading-5 mt-1">
                  {item.desc}
                </p>
              </div>

            </div>

          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

    {/* Why Our Customers Trust Us */}
    <section className="py-28 bg-white border-t border-gray-100">
  <div className="container mx-auto px-6">

    <div className="text-center mb-20">
      <h2 className="text-4xl lg:text-5xl font-serif font-black text-primary mb-4">
        Why Our Customers Trust Us
      </h2>

      <p className="text-gray-500 text-lg max-w-3xl mx-auto">
        Built on transparency, quality, and long-term value, every development
        is designed to provide confidence, security, and exceptional investment
        opportunities.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

      {[
        {
          title: "Professionally Verified Plots",
          desc: "Every plot undergoes thorough legal and location verification to ensure a secure investment."
        },
        {
          title: "DTCP Approved Layouts",
          desc: "Invest with confidence in layouts that comply with statutory planning regulations."
        },
        {
          title: "Transparent Documentation",
          desc: "Clear titles, verified ownership, and a seamless documentation process with complete transparency."
        },
        {
          title: "Personalized Investment Guidance",
          desc: "Expert consultation to help you choose the right plot based on your goals and budget."
        },
        {
          title: "Strategic Growth Locations",
          desc: "Plots located in emerging corridors with strong infrastructure development and appreciation potential."
        },
        {
          title: "Ready-to-Build Infrastructure",
          desc: "Well-developed layouts featuring wide blacktop roads, street lighting, drainage systems, and clearly demarcated plots."
        },
        {
          title: "Commitment to Quality & Trust",
          desc: "We uphold the highest standards of integrity, timely delivery, and customer satisfaction in every plotted development."
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className={`group ${
            i === 6 ? "xl:col-start-2" : ""
          }`}
        >
          <div className="h-full bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors">

              <CheckCircle
                size={30}
                className="text-secondary group-hover:text-white transition-colors"
              />

            </div>

            <h3 className="text-2xl font-serif font-bold text-primary mb-4 leading-tight">
              {item.title}
            </h3>

            <p className="text-gray-600 leading-7">
              {item.desc}
            </p>

          </div>
        </motion.div>
      ))}

    </div>

  </div>
</section>
  </div>
);

const ServicesPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'Residential Development', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) newErrors.phone = 'Please enter a valid 10-digit phone number';
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: 'Residential Development', message: '' });
    }, 1500);
  };

 const serviceSections = [
  {
    title: "Plot Development",
    desc: "We develop well-planned DTCP-approved plot layouts with wide roads, proper drainage, street lighting, and essential infrastructure—delivering plots that are ready for your future construction.",
    img: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },

  {
    title: "DTCP - Approved Layouts",
    desc: "All our plotted layouts are DTCP approved and comply with statutory regulations, ensuring a secure investment with clear titles, legal compliance, and hassle-free ownership.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Plot Consultation",
    desc: "Get personalized guidance to choose the right plot based on your budget, requirement, and investment goals. Our experts help you make informed decisions with complete clarity.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Infrastructure - Ready Plots",
    desc: "Our layouts come with high-quality infrastructure including blacktop roads, street lighting, proper drainage systems, water lines, and clear plot demarcation—ready for immediate construction and long-term value.",
    img: "https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },

  {
    title: "Transparent Documentation",
    desc: "We ensure complete transparency in all legal documentation. From title verification to registration, every step is clear, secure, and hassle-free for your peace of mind.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "After-Sales Support",
    desc: "Our commitment continues even after your purchase. We provide end-to-end support for any assistance you need—ensuring a smooth and satisfying experience, always.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
  },
];

  const developmentSteps = [
  {
    title: "Site Assessment & Feasibility Study",
    desc: "Detailed evaluations are conducted to assess location advantages, accessibility, topography, environmental conditions, and development potential.",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Surveying & Land Analysis",
    desc: "Professional surveys establish accurate boundaries, dimensions, and site characteristics, providing the foundation for precise planning and execution.",
    img: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Soil Testing & Engineering Evaluation",
    desc: "Comprehensive soil investigations help determine land suitability and support future infrastructure and construction planning.",
    img: "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Layout Design & Infrastructure Planning",
    desc: "Our planning and engineering teams develop efficient layouts incorporating roads, drainage systems, utility provisions, and open spaces while maximizing land value.",
    img: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Regulatory Compliance & Approvals",
    desc: "Every project undergoes rigorous review and approval processes to ensure compliance with applicable planning and development regulations.",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Infrastructure Execution",
    desc: "Once approved, development activities commence, including road formation, drainage installation, street lighting provisions, utility planning, and plot demarcation.",
    img: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Final Plot Handover",
    desc: "The result is a professionally developed, infrastructure-ready plotted community designed to provide long term value for homeowners and investors alike.",
    img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

  return (
    <div className="pt-20">
      <section className="py-24 bg-[#0F1E3D] text-white relative">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0F1E3D] via-[#0F1E3D] to-black opacity-85" />
         <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl lg:text-7xl font-serif font-black mb-6 text-white tracking-tight">OUR SERVICES</h1>
            <p className="text-secondary text-base md:text-lg tracking-[0.3em] uppercase font-bold mt-4 border-t border-secondary/30 pt-6 inline-block">Developing Land. Creating Value. Building Communities.</p>
         </div>
      </section>

      <section className="py-32 bg-white">
  <div className="container mx-auto px-6">
    <div className="max-w-6xl mx-auto">

      <p className="text-[22px] lg:text-[24px] leading-[2.0] text-gray-700 font-light text-justify font-serif">
        At <span className="font-semibold text-primary">Goldfield Real Estate</span>, we believe that every great development begins with vision, planning, and execution. We specialize in transforming raw land into premium plotted developments that are designed for growth, accessibility, and long-term value.

        <span className="inline-block h-4"></span>

        Our expertise extends beyond plot sales. We undertake the complete development process, from land identification and site preparation to infrastructure creation and final plot delivery, ensuring every project meets the highest standards of quality and reliability.

        <span className="inline-block h-4"></span>

        By combining strategic locations, professional planning, and modern infrastructure, we create developments that offer exceptional investment potential and a strong foundation for future construction.
      </p>

    </div>
  </div>
</section>

      {/* Services Grid matching JSON 5 sections */}
      <section className="py-28 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <SectionHeading title="Comprehensive Development & Consulting Solutions" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {serviceSections.map((item, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -8 }}
                 className="bg-white rounded-3xl overflow-hidden border border-gray-200/60 shadow-xl flex flex-col justify-between"
               >
                  <div>
                    <div className="h-56 w-full relative overflow-hidden bg-gray-150">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white text-xs font-serif font-bold px-4 py-2 rounded-full border border-secondary/30">
                        {`0${i + 1}`}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-serif font-black text-primary mb-4 leading-tight">{item.title}</h3>
                      <p className="text-gray-600 text-md leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                  <div className="px-8 pb-8">
                    <div className="w-10 h-[2px] bg-secondary" />
                  </div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process with associated pictures */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <SectionHeading title="Our Development Process" subtitle="From Raw Land to Premium Plotted Development" />
          </div>
          <div className="max-w-7xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
    {developmentSteps.map((item, i) => (
      <div
        key={i}
        className={`group ${
          i === developmentSteps.length - 1
            ? "xl:col-start-2"
            : ""
        }`}
      >
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full">

          {/* Image */}
          <div className="relative overflow-hidden h-60">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            {/* Step Number */}
            <div className="absolute top-5 left-5 w-14 h-14 rounded-full bg-secondary text-primary font-black text-xl flex items-center justify-center shadow-xl border-2 border-white">
              {i + 1}
            </div>
          </div>

          {/* Content */}
          <div className="p-7">
            <h3 className="text-2xl font-serif font-black text-primary mb-4 group-hover:text-secondary transition-colors">
              {item.title}
            </h3>

            <p className="text-gray-600 leading-7 text-sm">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>
      </section>

      {/* Feature Highlights section replacing "Why gold field" as requested */}
      <section className="py-28 bg-[#0F1E3D] text-white border-t border-secondary/20">
         <div className="container mx-auto px-6">
           <div className="text-center mb-20">
             <SectionHeading title="Feature Highlights" light />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Project to Plotted Development", desc: "From land acquisition and planning to infrastructure development and customer support, we manage every stage of the project under one trusted brand." },
                { title: "Infrastructure-Ready Layouts", desc: "Our developments feature concrete road networks, storm drainage, street lighting, and demarcated boundaries, ensuring immediate building readiness." },
                { title: "Strategic High-Growth Corridors", desc: "We focus exclusively on locations with active infrastructure developments, high capital appreciation rates, and premium accessibility." },
                { title: "Uncompromising Legal Clarity", desc: "Every project features transparent, pre-verified documentation, parent deeds, and clear approvals, guaranteeing a lifetime of legal security." },
                { title: "Sustainable Community Engineering", desc: "We construct with layouts planned for modern utility grids, dedicated circulation systems, and beautiful communal green parks." },
                { title: "Commitment to Long-Term Value", desc: "At Goldfield Real Estate, we build landmarks. Every road we lay, drainage system we construct, and plot we design is engineered to appreciate for decades." }
              ].map((reason, i) => (
                 <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-3xl shadow-xl hover:bg-white/10 transition-colors">
                   <h3 className="text-xl font-serif font-bold text-secondary mb-4 leading-snug">{reason.title}</h3>
                   <p className="text-gray-300 text-sm leading-relaxed font-light">{reason.desc}</p>
                 </div>
              ))}
              <div className="md:col-span-3 text-center pt-12">
                  <p className="text-secondary text-2xl font-serif font-bold italic">Goldfield Real Estate</p>
                  <p className="text-white/80 font-bold uppercase tracking-widest text-xs mt-3">Where Vision Meets Value. Where Land Becomes Opportunity.</p>
              </div>
           </div>
         </div>
      </section>

      {/* Stateful Free Quote form with robust validation */}
      <section className="py-28 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-4xl font-serif font-black text-primary leading-tight">Get a Free Consultation & Quote</h2>
            <p className="text-gray-600 text-base font-light">Tell us about your spatial interests and we will return with a comprehensive proposal.</p>
          </div>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-gray-50 border border-gray-200 p-12 rounded-3xl space-y-6"
            >
              <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center text-white mx-auto shadow-lg">
                <CheckCircle size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-primary">Quote Request Submitted!</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                  We have received your parameters. One of our lead consulting partners will reach out to you within 24 hours with custom options and estimations.
                </p>
              </div>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-sm font-serif font-extrabold text-secondary hover:underline"
              >
                Request Another Service Quote
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200/80 p-10 md:p-12 rounded-3xl shadow-2xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-secondary transition-all outline-none text-sm text-primary font-medium" 
                    placeholder="E.g., John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary">Phone Number <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-secondary transition-all outline-none text-sm text-primary font-medium" 
                    placeholder="10-digit number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-secondary transition-all outline-none text-sm text-primary font-medium" 
                  placeholder="name@domain.com"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary">Service of Interest</label>
                <select 
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-secondary transition-all outline-none text-sm text-primary font-medium"
                >
                  <option value="Residential Development">Residential Development</option>
                  <option value="Commercial Development">Commercial Development</option>
                  <option value="Property Consulting">Property Consulting</option>
                  <option value="Legal Assistance">Legal Assistance</option>
                  <option value="Project Management">Project Management</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary">Describe Your Requirements</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl h-32 focus:border-secondary transition-all outline-none text-sm text-primary font-medium"
                  placeholder="Plot sizes, preferred localities, budget constraints..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full gold-gradient text-white font-extrabold py-5 rounded-xl hover:shadow-xl transition-all tracking-widest text-xs uppercase active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing Consultation Request...
                  </>
                ) : 'REQUEST FREE CONSULTATION'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) newErrors.phone = 'Please enter a valid 10-digit phone number';
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  return (
    <div className="pt-20 bg-gray-50">
      <section className="py-24 bg-[#0F1E3D] text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-[#0F1E3D] via-[#0F1E3D]/95 to-[#C9A227]/20" />
         <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-black mb-6 text-white tracking-tight"
          >
            Get in Touch
          </motion.h1>
          <p className="text-secondary text-base md:text-lg tracking-[0.3em] uppercase font-bold">Let's Build Your Future Together</p>
         </div>
      </section>

      <section className="py-28">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="p-10 bg-white rounded-3xl shadow-xl border border-gray-200/50 space-y-8">
                  <h3 className="text-3xl font-serif font-black text-primary border-b border-gray-100 pb-4">Corporate Office</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <MapPin className="text-secondary shrink-0 mt-1" size={24} />
                      <div>
                        <p className="font-serif font-extrabold text-primary text-lg">Office Address</p>
                        <p className="text-gray-600 text-sm leading-relaxed mt-1">{BRAND.address}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="text-secondary shrink-0 mt-1" size={24} />
                      <div>
                        <p className="font-serif font-extrabold text-primary text-lg">Direct Hotlines</p>
                        <p className="text-gray-600 text-sm mt-1">{BRAND.phones.join(' / ')}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Mail className="text-secondary shrink-0 mt-1" size={24} />
                      <div>
                        <p className="font-serif font-extrabold text-primary text-lg">Electronic Enquiries</p>
                        <p className="text-gray-600 text-sm mt-1">{BRAND.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Zap className="text-secondary shrink-0 mt-1" size={24} />
                      <div>
                        <p className="font-serif font-extrabold text-primary text-lg">Business Hours</p>
                        <p className="text-gray-600 text-sm mt-1">Mon–Sat: 9:00 AM – 6:00 PM (Closed on Sundays)</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Shield className="text-secondary shrink-0 mt-1" size={24} />
                      <div>
                        <p className="font-serif font-extrabold text-primary text-lg">GST Registration</p>
                        <p className="text-gray-600 text-sm mt-1">GSTIN: 33ABDFG1343C1Z4 (Professionally Incorporated)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Embedded Map */}
                <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9181156557613!2d78.71077757579124!3d10.817551058434778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf567b57262ff%3A0xc47e30d7bfa5db2b!2sAirport%20Trichy!5e0!3m2!1sen!2sin!4v1716752000000!5m2!1sen!2sin"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Stateful Send Enquiry form with complete validation */}
              <div className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl border border-gray-200/50">
                  <h3 className="text-3xl font-serif font-black text-primary mb-2 leading-tight">Send Us an Enquiry</h3>
                  <p className="text-gray-500 mb-8 text-sm font-light">Have an investment query or land parameter ready? Write to our development counselors below.</p>
                  
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center text-white mx-auto shadow-lg">
                        <CheckCircle size={32} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-2xl font-serif font-bold text-primary">Enquiry Submitted!</h4>
                        <p className="text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
                          Your records were updated in our systems. An executive counselor has been designated and will contact you directly.
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsSuccess(false)}
                        className="text-xs font-bold uppercase tracking-widest text-secondary hover:underline"
                      >
                        Submit Another Enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary">Your Name <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-secondary transition-all outline-none text-sm text-primary font-medium" 
                          required 
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary">Phone Number <span className="text-red-500">*</span></label>
                        <input 
                          type="tel" 
                          placeholder="Phone Number" 
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-secondary transition-all outline-none text-sm text-primary font-medium" 
                          required 
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="Your Email" 
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-secondary transition-all outline-none text-sm text-primary font-medium" 
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary">Message</label>
                        <textarea 
                          placeholder="Tell us about your spatial, residential or investment interest..." 
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl h-36 focus:border-secondary transition-all outline-none text-sm text-primary font-medium"
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full gold-gradient text-white font-extrabold py-5 rounded-xl hover:shadow-xl transition-all tracking-widest text-xs uppercase active:scale-98 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending Message...
                          </>
                        ) : 'SEND ENQUIRY'}
                      </button>
                    </form>
                  )}
              </div>
           </div>
           
           <div className="text-center pt-24 mt-16 border-t border-gray-200 text-primary">
              <h4 className="text-3xl font-serif font-black text-primary">Goldfield Real Estate</h4>
              <p className="text-secondary font-bold uppercase tracking-widest text-xs mt-3">Where Trust Meets Opportunity.</p>
           </div>
        </div>
      </section>
    </div>
  );
};

// --- Minimal Contact Bar style right above footer as requested ---
const MinimalContactBar = () => {
  const whatsappUrl = `https://wa.me/919999999999?text=Hello%20GoldField%20Real%20Estate,%20I'm%20interested%20in%20your%20premium%20properties.`;
  const mapUrl = `https://maps.google.com/?q=No.+89,+Abdul+Kalam+Street,+Anbil+Nagar,+Airport,+Tiruchirappalli,+Tamil+Nadu+620007`;

  return (
    <section className="bg-[#0F1E3D] text-white py-12 border-b border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          
          {/* Quick Branding */}
          <div className="flex flex-col text-center lg:text-left">
            <span className="text-white font-serif font-black text-xl tracking-wide">GOLD FIELD</span>
            <span className="text-[10px] text-secondary font-extrabold uppercase tracking-widest">DEVELOPERS & LAND ADVISORS</span>
          </div>

          {/* Minimal Links: Phone, Email, WhatsApp, Social Media, Map Icon */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {/* Phone Element */}
            <a 
              href="tel:+919999999999" 
              className="flex items-center gap-2.5 text-gray-300 hover:text-secondary transition-colors text-sm font-bold tracking-tight"
              title="Call Us Directly"
            >
              <Phone size={18} className="text-secondary shrink-0" />
              <span>+91 99999 99999</span>
            </a>

            {/* Email Element */}
            <a 
              href={`mailto:${BRAND.email}`}
              className="flex items-center gap-2.5 text-gray-300 hover:text-secondary transition-colors text-sm font-bold tracking-tight"
              title="Send Us An Email"
            >
              <Mail size={18} className="text-secondary shrink-0" />
              <span>{BRAND.email}</span>
            </a>

            {/* WhatsApp Element */}
            <a 
              href={whatsappUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-gray-300 hover:text-secondary transition-colors text-sm font-bold tracking-tight"
              title="Chat on WhatsApp"
            >
              <MessageCircle size={18} className="text-secondary shrink-0" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Map Element with Address link */}
            <a 
              href={mapUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-gray-300 hover:text-secondary transition-colors text-sm font-bold tracking-tight"
              title="View on Google Maps"
            >
              <MapIcon size={18} className="text-secondary shrink-0" />
              <span>Locate Office</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all text-gray-300"
              title="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all text-gray-300"
              title="Twitter"
            >
              <Twitter size={16} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#070e1c] py-10">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[11px] tracking-widest text-gray-400 uppercase gap-6">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center text-center md:text-left">
        <div>
          <span className="text-white font-serif font-black text-sm tracking-widest">GOLD FIELD DEVELOPERS</span>
        </div>
        <div className="hidden md:block w-[1px] h-4 bg-gray-800"></div>
        <span>© {new Date().getFullYear()} Gold Field Developers. All Rights Reserved.</span>
        <div className="hidden md:block w-[1px] h-4 bg-gray-800"></div>
        <span>Trichy, Tamil Nadu</span>
      </div>
      
      <div className="flex gap-8 items-center">
        <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isStickyEnquiryOpen, setIsStickyEnquiryOpen] = useState(false);

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

  const whatsappUrl = `https://wa.me/919999999999?text=Hello%20GoldField%20Real%20Estate,%20I'm%20interested%20in%20your%20premium%20properties.`;

  return (
    <div className="relative text-[#1A1A1A] bg-white min-h-screen">
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

      <MinimalContactBar />
      <Footer />

      {/* --- FLOATING LEAD GENERATION WIDGETS --- */}

      {/* Floating WhatsApp Action Button */}
      <motion.a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba5a] transition-all group border-2 border-white cursor-pointer"
        title="Chat with our Land Consultant"
      >
        <MessageCircle size={28} className="text-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap text-sm font-bold pl-0 group-hover:pl-2">
          Chat With Us
        </span>
      </motion.a>

      {/* Sticky Enquiry Tab (floats on the middle-right screen edge, triggers sleek Quick Enquiry sliding modal!) */}
      <motion.button
        onClick={() => setIsStickyEnquiryOpen(true)}
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1.5, type: "spring" }}
        whileHover={{ x: -4 }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 gold-gradient text-white text-xs font-serif font-black tracking-widest uppercase py-4 px-2.5 rounded-l-2xl shadow-2xl flex flex-col items-center gap-2 border-l border-y border-white/20 select-none cursor-pointer writing-mode-vertical"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span>ENQUIRE NOW</span>
      </motion.button>

      {/* Sleek slide-over Quick Enquiry Sheet / Modal overlay */}
      <AnimatePresence>
        {isStickyEnquiryOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStickyEnquiryOpen(false)}
              className="absolute inset-0 bg-black"
            />
            {/* Drawer Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg h-full bg-[#0F1E3D] shadow-2xl z-10 flex flex-col overflow-y-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsStickyEnquiryOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12 my-auto">
                <div className="mb-8">
                  <span className="text-gradient-gold text-[10px] font-bold tracking-[0.3em] uppercase">Gold Field Premium Services</span>
                  <h3 className="text-3xl font-serif font-black text-white mt-2 leading-tight">Expert Consultation</h3>
                  <p className="text-gray-400 text-sm mt-2">Enter your requirements below and our designated advisors will call you directly.</p>
                </div>
                
                {/* Embedded quick form */}
                <QuickEnquiryForm />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
