'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup, Variants } from 'framer-motion';
import { ArrowRight, Play, Pause, ArrowLeft, ArrowUpRight, Download, SkipForward, SkipBack, X, Check } from 'lucide-react';

// --- BRAND DATA ---
const DJ_DATA = {
  name: "BRUNCHBOY",
  tagline: "I PLAY THE GOOD STUFF.",
  about: "Keeping it locked into groove and control, building energy with intention and reading the room with absolute precision. Whether leaning into deep club rhythms or turning up the floor with global heat, every selection is deliberate and well-placed. Defined by sharp taste and real musical awareness, sets move naturally and land exactly where they need to.",
  genres: ["House", "Soulful House", "Jazz House","Tech House", "Hard House", "Disco", "UKG", "R&B", "Hip-Hop", "Brazilian Funk"],
  venues: ["Kampai, Makati", "Nokal, Makati", "Solaire Skybar, QC", "Oniba Bar, QC", "Post Ceremony, QC", "Palma Roof Bar, Manila", "Bugsys, Makati", "Salty Coconut, Makati", "E285, QC", "Rosie's, Makati", "Lan Kwai, QC", "Roponggi, QC", "Forbestown Park, BGC", "Open Space, Makati", "Estancia, Pasig", "Corner House, San Juan", "Project Vino, Rockwell", "Elsewhere, Manila", "Z Hostel, Makati", "Polilya, Makati"],
  notableGigs: [
    "/photos/gig-poster-3.jpg",
    "/photos/gig-poster-4.jpg",
    "/photos/gig-poster-1.jpg",
    "/photos/gig-poster-2.jpg",
  ],
  photos: [
    "/photos/brunchboy-9.jpg",
    "/photos/brunchboy-10.jpg",
    "/photos/brunchboy-11.jpg",
    "/photos/brunchboy-1.jpg",
    "/photos/brunchboy-2.jpg",
    "/photos/brunchboy-3.jpg",
    "/photos/brunchboy-4.jpg",
    "/photos/brunchboy-5.jpg",
    "/photos/brunchboy-6.jpg",
    "/photos/brunchboy-7.jpeg",
    "/photos/brunchboy-8.jpg"
  ],
  mixes: [
    { id: 1, title: "UKG WARMUP!", type: "UK GARAGE, HOUSE", date: "FEB 9", duration: "48:52", cover: "/photos/ukg-mix.gif", audioSrc: "https://aqhavvixrywiuzjraxfy.supabase.co/storage/v1/object/public/mixes/ukg-mix.mp3" },
    { id: 2, title: "MARCH HOUSE FINDS", type: "ELECTRO FUNK, HOUSE", date: "MAR 12", duration: "27:48", cover: "/photos/electro-funky-house.gif", audioSrc: "https://aqhavvixrywiuzjraxfy.supabase.co/storage/v1/object/public/mixes/electro-funky-house.mp3" },
    { id: 3, title: "POCKET GROOVES", type: "JAZZ & SOULFUL HOUSE", date: "MAR 14", duration: "50:29", cover: "/photos/jazzy-soulful.gif", audioSrc: "https://aqhavvixrywiuzjraxfy.supabase.co/storage/v1/object/public/mixes/jazzy-soulful.mp3" },
    { id: 4, title: "R&B @ MoMa", type: "R&B, EDITS", date: "MAR 14", duration: "23:54", cover: "/photos/moma-rnb.gif", audioSrc: "https://aqhavvixrywiuzjraxfy.supabase.co/storage/v1/object/public/mixes/moma-rnb.mp3" },
  ],
  videoMixes: [
    { id: 'v1', title: "LET THEM COOK: B2B WITH LIMMY", url: "https://www.youtube.com/embed/Gicls7ocdrc?si=EES7r1N0bGoNO6QB" },
    { id: 'v2', title: "TLI 007", url: "https://www.youtube.com/embed/Rk7XAkx9dWU?si=u2Y_pgbvHoua7P4B" }
  ],
  playlists: [
    { id: 'p1', title: "BASEMENT GROOVES", type: "Deep & Dubby", url: "https://open.spotify.com/embed/playlist/4KM1376v9QAISMrGm5hWax?utm_source=generator" },
    { id: 'p2', title: "EARLY INFLUENCE", type: "Groovy & Soulful", url: "https://open.spotify.com/embed/playlist/3ri9kAoJT1njK4Er2ihoQV?utm_source=generator" },
  ],
  devProjects: [
    {
      name: "afterfiveph",
      url: "https://afterfiveph.vercel.app",
      description: "A one-stop hub for discovering gigs, parties, and nightlife events around the city. Bringing together event posters from different venues and collectives so it’s easier to see what’s happening in the local scene.",
      stack: ["Next.js", "Node.js", "Tailwind CSS", "Supabase", "Vercel"],
      image: "/photos/dev-1.jpg"
    }
  ],
  contact: { email: "aaronalagban.work@gmail.com", ig: "aaronalagbann" }
};

const NAV_ITEMS = ['about', 'mixes', 'gigs', 'photos', 'contact', 'dev'];

// --- GRAPHICS ---
const ConcentricSquares = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {[0, 10, 20, 30, 40].map(i => <rect key={i} x={i} y={i} width={100 - i * 2} height={100 - i * 2} fill="none" stroke="currentColor" strokeWidth="3" />)}
  </svg>
);

const BrutalistStar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path fill="currentColor" d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
  </svg>
);

const SharpStarburst = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path fill="currentColor" d="M50 0 L56 35 L90 15 L65 44 L100 50 L65 56 L90 85 L56 65 L50 100 L44 65 L10 85 L35 56 L0 50 L35 44 L10 15 L44 35 Z" />
  </svg>
);

const MotionGrid = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08] mix-blend-overlay overflow-hidden">
    <motion.div animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '40px 40px' }} />
  </div>
);

const AppBackgroundShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }} className="absolute -top-[10vw] -right-[10vw] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] text-[#CCFF00] opacity-[0.25] mix-blend-screen">
      <SharpStarburst className="w-full h-full" />
    </motion.div>
    <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 90, ease: "linear" }} className="absolute top-[30vh] -left-[20vw] w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] text-[#FF3300] opacity-[0.2] mix-blend-screen">
      <ConcentricSquares className="w-full h-full" />
    </motion.div>
    <motion.div animate={{ rotate: 180, scale: [1, 1.1, 1] }} transition={{ rotate: { repeat: Infinity, duration: 40, ease: "linear" }, scale: { repeat: Infinity, duration: 10, ease: "easeInOut" } }} className="absolute -bottom-[10vw] right-[10vw] w-[90vw] h-[90vw] md:w-[45vw] md:h-[45vw] text-white opacity-[0.15] mix-blend-screen">
      <BrutalistStar className="w-full h-full" />
    </motion.div>
  </div>
);

const FunkyVisualizer = ({ isPlaying }: { isPlaying: boolean }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-700 z-0 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
      <motion.div animate={{ scale: isPlaying ? [1, 1.2, 1] : 1, rotate: isPlaying ? [0, 180, 360] : 0 }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} className="absolute w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] border-[40px] md:border-[80px] border-[#CCFF00] rounded-full mix-blend-screen opacity-50" />
      <motion.div animate={{ scale: isPlaying ? [1, 1.4, 1] : 1, rotate: isPlaying ? [360, 180, 0] : 0 }} transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }} className="absolute w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] border-[20px] md:border-[40px] border-[#FF3300] rounded-full mix-blend-screen opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#0024E0_70%)] mix-blend-normal z-10" />
    </div>
  );
};

// --- LOADER GEOMETRIC FRAMES ---
const LoaderFrames = [
  <div key="frame0" className="w-full h-full grid grid-cols-4 grid-rows-4">
    {Array.from({length: 16}).map((_, i) => <div key={i} className={(i + Math.floor(i/4)) % 2 === 0 ? "bg-[#CCFF00]" : "bg-black"} />)}
  </div>,
  <div key="frame1" className="w-full h-full flex flex-col">
    {Array.from({length: 8}).map((_, i) => <div key={i} className={`flex-1 ${i % 2 === 0 ? "bg-[#0024E0]" : "bg-white"}`} />)}
  </div>,
  <div key="frame2" className="w-full h-full bg-[#FF3300] flex items-center justify-center overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-[150vmin] h-[150vmin] text-[#CCFF00]">
      {[10, 20, 30, 40, 50].map((r, i) => <circle key={i} cx="50" cy="50" r={50 - r} fill={i % 2 === 0 ? "currentColor" : "#FF3300"} />)}
    </svg>
  </div>,
  <div key="frame3" className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-[200vmin] h-[200vmin] text-[#FF3300] animate-spin-slow" style={{ animationDuration: '10s' }}>
      {[...Array(16)].map((_, i) => <polygon key={i} points="50,50 48,0 52,0" fill="currentColor" transform={`rotate(${i * 22.5} 50 50)`} />)}
    </svg>
  </div>,
  <div key="frame4" className="w-full h-full bg-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1/2 bg-[#0024E0] rounded-b-full scale-150 transform origin-top" />
  </div>,
  <div key="frame5" className="w-full h-full bg-[#CCFF00]" style={{ backgroundImage: 'radial-gradient(circle, black 30%, transparent 31%)', backgroundSize: '8vmin 8vmin' }} />,
  <div key="frame6" className="w-full h-full overflow-hidden relative bg-black">
    <div className="absolute inset-0 bg-[#FF3300] transform -skew-y-45 origin-bottom-left" />
  </div>,
  <div key="frame7" className="w-full h-full bg-white relative">
    <div className="absolute top-[10%] left-[20%] w-[40%] h-[30%] bg-[#0024E0]" />
    <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[40%] bg-[#CCFF00] rounded-full" />
    <div className="absolute top-[40%] right-[30%] w-[20%] h-[20%] bg-[#FF3300] rotate-45" />
    <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[15%] bg-black" />
  </div>
];

const SMOOTH_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
  }
};

// --- main shiiiiii ---
export default function DJPortfolio() {
  const [appState, setAppState] = useState('loading'); 
  const [activeView, setActiveView] = useState('about');
  
  const [mixTab, setMixTab] = useState('audio'); 
  const [gigTab, setGigTab] = useState('notable'); 
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentMix, setCurrentMix] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Updated Booking State
  const [booking, setBooking] = useState({ 
    instagram: '', 
    contactNumber: '', 
    venue: '', 
    date: '', 
    vibe: '' 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  const [loaderTick, setLoaderTick] = useState(0);
  
  const [isDesktop, setIsDesktop] = useState(true);
  const [expandedVideo, setExpandedVideo] = useState<any>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (appState === 'loading') {
      const interval = setInterval(() => setLoaderTick(prev => prev + 1), 150);
      const timer = setTimeout(() => { clearInterval(interval); setAppState('landing'); }, 2500);
      return () => { clearInterval(interval); clearTimeout(timer); };
    }
  }, [appState]);

  useEffect(() => {
    if (currentMix && isPlaying && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback error:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentMix]);

  const getVideoLayout = () => {
    if (appState === 'loading') return { opacity: 0, scale: 1.1 };
    if (appState === 'landing') return { top: '0%', left: '0%', width: '100%', height: '100%', opacity: 1, scale: 1 };
    
    if (appState === 'app' && activeView === 'about') {
      return isDesktop
        ? { top: '80px', left: '50%', width: '50%', height: 'calc(100vh - 80px)', opacity: 0.85, scale: 1 } 
        : { top: '80px', left: '0%', width: '100%', height: '40vh', opacity: 0.85, scale: 1 }; 
    }
    
    return { top: '80px', left: '0%', width: '100%', height: '100%', opacity: 0, scale: 1.05, pointerEvents: 'none' };
  };

  const togglePlay = (mix: any) => {
    if (currentMix?.id === mix.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        const playPromise = audioRef.current?.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
        }
      }
    } else {
      setCurrentMix(mix);
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    if (!currentMix) return;
    const currentIndex = DJ_DATA.mixes.findIndex(m => m.id === currentMix.id);
    const nextMix = DJ_DATA.mixes[(currentIndex + 1) % DJ_DATA.mixes.length];
    setCurrentMix(nextMix);
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (!currentMix) return;
    const currentIndex = DJ_DATA.mixes.findIndex(m => m.id === currentMix.id);
    const prevMix = DJ_DATA.mixes[(currentIndex - 1 + DJ_DATA.mixes.length) % DJ_DATA.mixes.length];
    setCurrentMix(prevMix);
    setIsPlaying(true);
  };

  const closePlayer = () => {
    if (audioRef.current) audioRef.current.pause();
    setCurrentMix(null);
    setIsPlaying(false);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * audioRef.current.duration;
  };

  // --- API BACKGROUND MAIL LOGIC ---
  const handleEmailBooking = async () => {
    // Prevent empty sends - Ensure we have at least a way to contact them back
    if (!booking.instagram && !booking.contactNumber) {
      alert("Please provide an Instagram handle or Contact Number so I can reach you!");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });

      if (!res.ok) throw new Error('Failed to send booking request');

      setSubmitStatus('success');
      // Clear the form
      setBooking({ instagram: '', contactNumber: '', venue: '', date: '', vibe: '' }); 

      setTimeout(() => setSubmitStatus('idle'), 3000);

    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to auto-format Instagram handle
  const handleIgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.trim();
    if (val && !val.startsWith('@')) {
      val = '@' + val;
    }
    setBooking(prev => ({ ...prev, instagram: val }));
  };

  return (
    <div className="fixed inset-0 bg-[#0024E0] text-white w-full h-[100dvh] overflow-hidden selection:bg-[#CCFF00] selection:text-black font-sans uppercase flex flex-col" style={{ letterSpacing: '-0.03em' }}>
      
      <audio 
         ref={audioRef} 
         src={currentMix?.audioSrc} 
         onTimeUpdate={() => {
            if (audioRef.current) {
               setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
            }
         }} 
         onEnded={() => playNext()} 
         onError={(e) => {
           console.error("Audio tag encountered an error loading the file:", e);
           setIsPlaying(false);
         }}
      />

      {/* GLOBAL BACKGROUND VIDEO */}
      <motion.div initial={false} animate={getVideoLayout() as any} transition={{ duration: 1.2, ease: SMOOTH_EASE }} className="absolute z-0 overflow-hidden bg-black flex flex-col justify-center">
       <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0024E0] mix-blend-color pointer-events-none z-20" />
      </motion.div>

      {/* GEOMETRIC FLASH LOADER */}
      <AnimatePresence>
        {appState === 'loading' && (
          <motion.div 
            key="loading" 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3, ease: SMOOTH_EASE }} 
            className="absolute inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Top Left Branding */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-[110] text-white">
              <span className="font-black tracking-tighter text-sm md:text-base leading-none drop-shadow-md">BRUNCHBOY</span>
            </div>
            {/* Flash Frames */}
            {LoaderFrames[loaderTick % LoaderFrames.length]}
          </motion.div>
        )}
      </AnimatePresence>

      <LayoutGroup>
        <main className="relative z-10 flex-1 flex flex-col w-full pointer-events-none overflow-hidden">
          
          {/* LANDING */}
          <AnimatePresence mode="wait">
            {appState === 'landing' && (
              <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8, ease: SMOOTH_EASE }} className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 pointer-events-auto z-10">
                <h1 className="text-[16vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-white mix-blend-difference mb-4 drop-shadow-lg text-center break-words">
                  BRUNCHBOY
                </h1>
                <p className="text-xl md:text-3xl lg:text-4xl font-black tracking-widest text-[#CCFF00] mix-blend-difference mb-12 text-center max-w-4xl break-words whitespace-normal">
                  {DJ_DATA.tagline}
                </p>
                <button onClick={() => { setAppState('app'); setActiveView('about'); }} className="bg-[#CCFF00] text-black px-8 py-4 md:py-6 text-xl md:text-3xl font-black hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[8px_8px_0_0_#000]">
                  ENTER SITE <ArrowRight size={28} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* APP VIEWS */}
          <AnimatePresence>
            {appState === 'app' && (
              <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col flex-1 h-full w-full pointer-events-auto relative">
                
                <header className="flex-shrink-0 flex items-center h-[80px] border-b-4 border-white bg-[#0024E0] relative z-20">
                  <button onClick={() => setAppState('landing')} className="h-full px-6 border-r-4 border-white hover:bg-[#FF3300] hover:text-white transition-colors flex items-center justify-center z-20">
                    <ArrowLeft size={32} strokeWidth={3} />
                  </button>
                  <div className="flex-1 h-full relative overflow-hidden">
                    <nav className="flex items-center overflow-x-auto hide-scrollbar h-full w-full">
                      {NAV_ITEMS.map((item) => (
                        <button key={item} onClick={() => setActiveView(item)} className={`px-6 md:px-10 h-full border-r-4 border-white text-xl md:text-3xl font-black tracking-tighter flex items-center transition-colors relative whitespace-nowrap ${activeView === item ? 'bg-[#CCFF00] text-black' : 'hover:bg-white hover:text-black'}`}>
                          {item}
                          {activeView === item && <motion.div layoutId="nav-dot" className="absolute bottom-2 right-2 w-3 h-3 bg-black rounded-full" />}
                        </button>
                      ))}
                      <div className="min-w-[40px] md:hidden h-full shrink-0" />
                    </nav>
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0024E0] to-transparent pointer-events-none md:hidden z-10" />
                  </div>
                </header>

                <div className="absolute left-0 right-0 bottom-0 transition-all duration-500 z-10 bg-transparent" style={{ top: '80px' }}>
                  <MotionGrid />
                  
                  <motion.div initial={false} animate={{ opacity: (activeView === 'about' || activeView === 'dev') ? 0 : 1 }} transition={{ duration: 0.5 }} className="absolute inset-0 pointer-events-none z-0">
                    <AppBackgroundShapes />
                  </motion.div>

                  <AnimatePresence mode="wait">
                    
                    {/* ABOUT VIEW */}
                    {activeView === 'about' && (
                      <motion.div key="about" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col md:flex-row overflow-hidden bg-[#0024E0]/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
                        <div className="w-full md:w-1/2 h-full p-6 md:p-10 lg:p-14 relative z-10 flex flex-col justify-center md:bg-[#0024E0]">
                          <div className="mb-8 mt-12 md:mt-0">
                            <div className="inline-block bg-[#CCFF00] text-black font-black px-2 py-1 mb-4 text-xs md:text-sm">ABOUT</div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] mb-4 uppercase break-words whitespace-normal">The Architect <br/> of the Room.</h2>
                            <p className="text-base sm:text-lg xl:text-xl font-medium leading-tight text-white/90 w-full max-w-2xl break-words whitespace-normal">{DJ_DATA.about}</p>
                          </div>
                          <div className="mt-4">
                            <div className="border-t-2 md:border-t-4 border-white pt-3 mb-3 flex justify-between items-end w-fit">
                              <h3 className="text-xl md:text-2xl font-black tracking-tighter pr-8">GENRES</h3>
                            </div>
                            <div className="flex flex-wrap gap-1.5 md:gap-2 max-w-2xl">
                              {DJ_DATA.genres.map(genre => <span key={genre} className="border border-white/30 md:border-2 px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm font-black tracking-tighter cursor-default bg-[#0024E0]/80">{genre}</span>)}
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:block w-1/2 h-full pointer-events-none border-l-4 border-white relative" />
                      </motion.div>
                    )}

                    {/* MIXES VIEW */}
                    {activeView === 'mixes' && (
                      <PageWrapper 
                        key="mixes" 
                        title="MIXES" 
                        subtitle={mixTab === 'playlists' ? 'CURATED PLAYLISTS' : mixTab === 'video' ? 'LIVE SETS' : 'AUDIO SELECTIONS, COVER ART BY JULIA SCHIMAUTZ'}
                        headerRight={
                          <div className="flex flex-wrap gap-2 md:gap-4 bg-black/60 backdrop-blur-md border-2 border-white p-2">
                            <button onClick={() => setMixTab('audio')} className={`font-black tracking-tighter text-sm md:text-xl px-3 md:px-4 py-1 transition-colors ${mixTab === 'audio' ? 'bg-[#CCFF00] text-black' : 'text-white hover:text-[#CCFF00]'}`}>AUDIO</button>
                            <button onClick={() => setMixTab('video')} className={`font-black tracking-tighter text-sm md:text-xl px-3 md:px-4 py-1 transition-colors ${mixTab === 'video' ? 'bg-[#FF3300] text-white' : 'text-white hover:text-[#FF3300]'}`}>VIDEO</button>
                            <button onClick={() => setMixTab('playlists')} className={`font-black tracking-tighter text-sm md:text-xl px-3 md:px-4 py-1 transition-colors ${mixTab === 'playlists' ? 'bg-white text-black' : 'text-white hover:text-[#CCFF00]'}`}>PLAYLISTS</button>
                          </div>
                        }
                      >
                        <FunkyVisualizer isPlaying={isPlaying && mixTab === 'audio'} />
                        
                        {/* Audio Tab */}
                        {mixTab === 'audio' && (
                          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 pb-24 relative z-20">
                            {DJ_DATA.mixes.map((mix) => {
                              const isActive = currentMix?.id === mix.id;
                              const isThisPlaying = isActive && isPlaying;
                              return (
                                <motion.div variants={itemVariant} key={mix.id} onClick={() => togglePlay(mix)} className="group cursor-pointer flex flex-col items-center w-full max-w-[320px] mx-auto">
                                  <div className={`relative w-full aspect-square mb-4 border-4 transition-all duration-300 ${isThisPlaying ? 'border-[#CCFF00] shadow-[0_0_30px_rgba(204,255,0,0.6)] scale-105' : isActive ? 'border-[#CCFF00]' : 'border-white hover:border-[#FF3300] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,51,0,0.6)]'}`}>
                                    <img src={mix.cover} className={`w-full h-full object-cover transition-all duration-500 ${isThisPlaying ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} alt="cover" />
                                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                      {isThisPlaying ? <Pause size={48} fill="white" /> : <Play size={48} fill="white" />}
                                    </div>
                                  </div>
                                  <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none text-center w-full break-words">{mix.title}</h1>
                                  <div className="flex flex-wrap justify-center items-center gap-2 mt-2 w-full">
                                    <span className="bg-[#CCFF00] text-black px-2 py-0.5 text-[10px] md:text-xs font-black shrink-0">{mix.type}</span>
                                    <span className="text-white text-[10px] md:text-xs font-bold shrink-0">{mix.duration}</span>
                                  </div>
                                </motion.div>
                              )
                            })}
                          </motion.div>
                        )}

                        {/* Video Tab */}
                        {mixTab === 'video' && (
                          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-24 relative z-20">
                            {DJ_DATA.videoMixes.map(video => {
                              const match = video.url.match(/embed\/([^?]+)/);
                              const ytThumb = match && match[1] ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : '';
                              return (
                                <motion.div 
                                  variants={itemVariant} 
                                  key={video.id} 
                                  onClick={() => setExpandedVideo(video)}
                                  className="w-full border-4 border-white bg-black group cursor-pointer hover:border-[#FF3300] transition-colors"
                                >
                                  <div className="relative w-full aspect-video border-b-4 border-white overflow-hidden">
                                     <img src={ytThumb} alt={video.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                     <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                        <div className="w-16 h-16 bg-[#FF3300] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                          <Play size={32} fill="white" className="ml-1" />
                                        </div>
                                     </div>
                                  </div>
                                  <div className="p-4 flex flex-col">
                                    <h3 className="text-2xl sm:text-3xl font-black tracking-tighter break-words whitespace-normal">{video.title}</h3>
                                    <span className="text-sm font-bold text-[#CCFF00] mt-1">WATCH LIVE SET</span>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}

                        {/* Playlists Tab */}
                        {mixTab === 'playlists' && (
                          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24 relative z-20">
                            {DJ_DATA.playlists.map(playlist => {
                              const directUrl = playlist.url.replace('/embed', '').replace('?utm_source=generator', '');
                              return (
                                <motion.div variants={itemVariant} key={playlist.id} className="border-4 border-white bg-black flex flex-col shadow-[8px_8px_0_0_rgba(255,255,255,0.2)] h-fit">
                                   <div className="p-4 pb-3">
                                      <a href={directUrl} target="_blank" rel="noreferrer" className="block w-fit hover:text-[#CCFF00] transition-colors">
                                        <h3 className="text-2xl md:text-3xl font-black tracking-tighter break-words whitespace-normal leading-none">{playlist.title}</h3>
                                      </a>
                                      <span className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">{playlist.type}</span>
                                   </div>
                                   <iframe style={{ borderRadius: "0px" }} src={playlist.url} width="100%" height="160" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="border-t-4 border-white"></iframe>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}
                      </PageWrapper>
                    )}

                    {/* GIGS VIEW */}
                    {activeView === 'gigs' && (
                      <PageWrapper 
                        key="gigs" 
                        title="GIGS"
                        subtitle={gigTab === 'notable' ? 'NOTABLE GIGS' : 'VENUES PLAYED'}
                        headerRight={
                          <div className="flex flex-wrap gap-2 md:gap-4 bg-black/60 backdrop-blur-md border-2 border-white p-2">
                            <button onClick={() => setGigTab('notable')} className={`font-black tracking-tighter text-sm md:text-xl px-3 md:px-4 py-1 transition-colors ${gigTab === 'notable' ? 'bg-[#CCFF00] text-black' : 'text-white hover:text-[#CCFF00]'}`}>NOTABLE</button>
                            <button onClick={() => setGigTab('venues')} className={`font-black tracking-tighter text-sm md:text-xl px-3 md:px-4 py-1 transition-colors ${gigTab === 'venues' ? 'bg-[#FF3300] text-white' : 'text-white hover:text-[#FF3300]'}`}>VENUES</button>
                          </div>
                        }
                      >
                        {/* Notable Gigs Tab */}
                        {gigTab === 'notable' && (
                          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-24">
                            {DJ_DATA.notableGigs.map((poster, i) => (
                              <motion.div variants={itemVariant} key={`poster-${i}`} className="border-4 border-white bg-black group relative overflow-hidden aspect-[4/5] hover:border-[#CCFF00] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all duration-300">
                                 <img src={poster} alt={`Notable Gig ${i+1}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}

                        {/* Venues Played Tab */}
                        {gigTab === 'venues' && (
                          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 pb-24 auto-rows-max">
                            {DJ_DATA.venues.map((venue, i) => {
                              const [name, location] = venue.split(', ');
                              return (
                                <motion.div variants={itemVariant} key={`venue-${i}`} className="flex flex-col items-start gap-1 bg-[#0024E0]/50 backdrop-blur-sm p-3 md:p-4 border-2 border-white/30 cursor-default h-full">
                                  <span className="text-lg md:text-xl font-black tracking-tighter text-white leading-none break-words whitespace-normal">{name}</span>
                                  <span className="text-[10px] md:text-xs font-bold text-[#CCFF00] uppercase tracking-widest mt-auto pt-1">{location}</span>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}
                      </PageWrapper>
                    )}

                    {/* PHOTOS VIEW */}
                    {activeView === 'photos' && (
                      <PageWrapper key="photos" title="PHOTOS">
                        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pb-24">
                          {DJ_DATA.photos.map((src, i) => (
                            <motion.div variants={itemVariant} key={i} className="relative group overflow-hidden border-4 border-white break-inside-avoid bg-black hover:shadow-[12px_12px_0_0_#CCFF00] transition-shadow">
                              <img src={src} alt={`Gallery ${i}`} className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a href={src} download={`BRUNCHBOY_00${i+1}.jpg`} target="_blank" rel="noreferrer" className="text-white hover:text-[#CCFF00] drop-shadow-md bg-black/40 backdrop-blur-sm p-2 rounded block">
                                  <Download size={24} strokeWidth={2.5} />
                                </a>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </PageWrapper>
                    )}

                    {/* CONTACT VIEW */}
                    {activeView === 'contact' && (
                      <PageWrapper key="contact" title="CONTACT" noScroll={false}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="border-4 border-black shadow-[8px_8px_0_0_#000] md:shadow-[12px_12px_0_0_#000] flex flex-col md:flex-row w-full max-w-5xl mx-auto mb-12 min-h-[400px]">
                          
                          {/* LEFT SIDE - Info Box */}
                          <div className="w-full md:w-5/12 border-b-4 md:border-b-0 md:border-r-4 border-black p-6 md:p-10 flex flex-col justify-between bg-black text-white shrink-0">
                            <div>
                              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] mb-4 break-words text-[#CCFF00]">BOOKING<br/>REQUEST</h2>
                              <p className="font-bold text-sm md:text-base uppercase max-w-[250px] text-white/80 leading-tight">Slide the details over and let's make it happen.</p>
                            </div>
                            <div className="mt-8 md:mt-0">
                              <span className="bg-[#CCFF00] text-black font-black text-xs md:text-sm px-3 py-1.5 uppercase tracking-widest inline-block">
                                REF: {Math.floor(Math.random()*89999+10000)}
                              </span>
                            </div>
                          </div>

                          {/* RIGHT SIDE - Form Box */}
                          <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col bg-[#CCFF00] text-black shrink-0">
                            <div className="flex flex-col gap-5 md:gap-6 flex-1 mb-8 md:mb-12">
                              
                              {/* ROW 1: WHO */}
                              <div className="flex flex-col sm:flex-row gap-5 md:gap-6 w-full">
                                {/* IG Input */}
                                <div className="flex flex-col gap-1 group w-full sm:w-1/2">
                                  <label className="text-sm font-black tracking-widest uppercase opacity-60">1. Your Instagram</label>
                                  <input 
                                    type="text" 
                                    value={booking.instagram} 
                                    onChange={handleIgChange} 
                                    className="bg-transparent border-b-4 border-black/20 outline-none w-full text-xl md:text-2xl font-black tracking-tighter text-[#0024E0] pb-1 focus:border-black placeholder:text-black/20 transition-colors rounded-none" 
                                    placeholder="@brunchboy" 
                                    disabled={isSubmitting} 
                                  />
                                </div>

                                {/* Contact Input */}
                                <div className="flex flex-col gap-1 group w-full sm:w-1/2">
                                  <label className="text-sm font-black tracking-widest uppercase opacity-60">2. Contact</label>
                                  <input 
                                    type="tel" 
                                    value={booking.contactNumber} 
                                    onChange={(e) => setBooking({...booking, contactNumber: e.target.value})} 
                                    className="bg-transparent border-b-4 border-black/20 outline-none w-full text-xl md:text-2xl font-black tracking-tighter text-[#0024E0] pb-1 focus:border-black placeholder:text-black/20 transition-colors rounded-none" 
                                    placeholder="0917..." 
                                    disabled={isSubmitting} 
                                  />
                                </div>
                              </div>

                              {/* ROW 2: WHERE & WHEN */}
                              <div className="flex flex-col sm:flex-row gap-5 md:gap-6 w-full">
                                {/* Venue Input */}
                                <div className="flex flex-col gap-1 group w-full sm:w-1/2">
                                  <label className="text-sm font-black tracking-widest uppercase opacity-60">3. Venue</label>
                                  <input 
                                    type="text" 
                                    value={booking.venue} 
                                    onChange={(e) => setBooking({...booking, venue: e.target.value})} 
                                    className="bg-transparent border-b-4 border-black/20 outline-none w-full text-xl md:text-2xl font-black tracking-tighter text-[#0024E0] pb-1 focus:border-black placeholder:text-black/20 transition-colors rounded-none" 
                                    placeholder="Where is it at?" 
                                    disabled={isSubmitting} 
                                  />
                                </div>
                                
                                {/* Date Input */}
                                <div className="flex flex-col gap-1 group w-full sm:w-1/2">
                                  <label className="text-sm font-black tracking-widest uppercase opacity-60">4. Date</label>
                                  <input 
                                    type="date" 
                                    value={booking.date} 
                                    onChange={(e) => setBooking({...booking, date: e.target.value})} 
                                    className={`bg-transparent border-b-4 border-black/20 outline-none w-full text-xl md:text-2xl font-black tracking-tighter text-[#FF3300] pb-1 focus:border-black transition-colors rounded-none ${!booking.date ? 'opacity-50' : 'opacity-100'}`} 
                                    disabled={isSubmitting}
                                  />
                                </div>
                              </div>
                              
                              {/* ROW 3: WHAT */}
                              <div className="flex flex-col gap-1 group w-full">
                                <label className="text-sm font-black tracking-widest uppercase opacity-60">5. Vibe</label>
                                <input 
                                  type="text" 
                                  value={booking.vibe} 
                                  onChange={(e) => setBooking({...booking, vibe: e.target.value})} 
                                  className="bg-transparent border-b-4 border-black/20 outline-none w-full text-xl md:text-2xl font-black tracking-tighter text-[#0024E0] pb-1 focus:border-black placeholder:text-black/20 transition-colors rounded-none" 
                                  placeholder="What's the energy?" 
                                  disabled={isSubmitting} 
                                />
                              </div>
                            </div>
                            
                            {/* Action Button */}
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0 w-full mt-auto">
                              <button 
                                onClick={handleEmailBooking} 
                                disabled={isSubmitting || submitStatus === 'success'}
                                className={`w-full border-4 border-black px-6 py-4 md:py-5 text-lg sm:text-xl md:text-2xl font-black transition-all flex justify-between items-center leading-none uppercase 
                                  ${submitStatus === 'success' ? 'bg-white text-black translate-y-0 shadow-none' : 
                                    submitStatus === 'error' ? 'bg-black text-[#FF3300]' : 
                                    'bg-[#FF3300] text-white hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:shadow-none'}`}
                              >
                                <span className="truncate pr-2">
                                  {isSubmitting ? 'SENDING...' : 
                                   submitStatus === 'success' ? 'REQUEST SENT!' : 
                                   submitStatus === 'error' ? 'ERROR - TRY AGAIN' : 
                                   'SEND REQUEST'}
                                </span>
                                {submitStatus === 'success' ? <Check size={28} className="shrink-0 text-green-500" /> : <ArrowUpRight size={28} className="shrink-0" />}
                              </button>
                            </div>
                          </div>
                          
                        </motion.div>
                      </PageWrapper>
                    )}

                    {/* DEV VIEW - BRAND GREEN/BLACK TECH DASHBOARD */}
                    {activeView === 'dev' && (
                      <motion.div 
                        key="dev" 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }} 
                        transition={{ duration: 0.4 }} 
                        className="absolute inset-0 z-30 flex flex-col overflow-hidden bg-black text-[#CCFF00] uppercase tracking-normal"
                      >
                        {/* Minimalist Top Bar */}
                        <div className="flex-shrink-0 bg-black border-b border-[#CCFF00]/30 px-4 md:px-6 h-[50px] md:h-[60px] flex items-center justify-between z-20">
                           <div className="flex items-center gap-2 md:gap-3">
                             <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                             <span className="font-mono text-[10px] md:text-xs text-[#CCFF00]/60 tracking-widest">System_Status: Online</span>
                           </div>
                           <span className="font-mono text-[10px] md:text-xs text-[#CCFF00]/60">v1.0.4</span>
                        </div>

                        <div className="flex-1 w-full overflow-y-auto p-4 sm:p-6 md:p-12 dev-scrollbar relative">
                          <div className="max-w-[1000px] mx-auto w-full pb-32">
                             
                             <div className="mb-8 md:mb-12">
                               <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-2 md:mb-4">DEVELOPMENT</h2>
                               <p className="font-mono text-xs md:text-sm text-[#CCFF00]/70 normal-case">Showcase of web applications, platforms, and digital experiences.</p>
                             </div>

                             {DJ_DATA.devProjects.map((proj, i) => (
                               <motion.div 
                                 variants={itemVariant} 
                                 initial="hidden" 
                                 animate="show"
                                 key={i} 
                                 className="group rounded-xl border border-[#CCFF00]/30 bg-black overflow-hidden hover:border-[#CCFF00] transition-all duration-300 shadow-[0_10px_30px_rgba(204,255,0,0.1)] hover:shadow-[0_10px_40px_rgba(204,255,0,0.2)] flex flex-col sm:flex-row"
                               >
                                 {/* Image Section */}
                                 <div className="w-full sm:w-2/5 sm:min-w-[250px] md:min-w-[300px] h-48 sm:h-auto relative overflow-hidden bg-black border-b sm:border-b-0 sm:border-r border-[#CCFF00]/30 p-6 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/10 to-transparent pointer-events-none" />
                                    <img src={proj.image} alt={proj.name} className="w-full h-full object-contain sm:object-cover scale-95 group-hover:scale-100 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                                 </div>
                                 
                                 {/* Content Section */}
                                 <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1 min-w-0 bg-[#0a0a00]">
                                   <div className="flex justify-between items-start mb-3 md:mb-4">
                                     <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#CCFF00] truncate pr-4">
                                       {proj.name}
                                     </h3>
                                     <a href={proj.url} target="_blank" rel="noreferrer" className="shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#CCFF00]/10 hover:bg-[#CCFF00] hover:text-black transition-colors border border-[#CCFF00]/30 group/link">
                                       <ArrowUpRight size={18} className="group-hover/link:scale-110 transition-transform md:w-5 md:h-5" />
                                     </a>
                                   </div>
                                   
                                   <p className="text-[#CCFF00]/80 mb-6 md:mb-8 text-sm md:text-base leading-relaxed font-medium normal-case break-words whitespace-normal">
                                     {proj.description}
                                   </p>

                                   <div className="mt-auto">
                                     <h4 className="font-mono text-[10px] md:text-xs text-[#CCFF00]/50 mb-2 md:mb-3 uppercase tracking-widest">Tech Stack</h4>
                                     <div className="flex flex-wrap gap-1.5 md:gap-2">
                                       {proj.stack.map((tech, idx) => (
                                         <span key={idx} className="px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-[#CCFF00]/5 border border-[#CCFF00]/20 text-[10px] md:text-xs font-mono text-[#CCFF00]/90 hover:bg-[#CCFF00]/20 hover:border-[#CCFF00]/50 transition-colors cursor-default normal-case">
                                           {tech}
                                         </span>
                                       ))}
                                     </div>
                                   </div>
                                 </div>
                               </motion.div>
                             ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </LayoutGroup>

      {/* FULL SCREEN EXPANDED VIDEO OVERLAY */}
      <AnimatePresence>
        {expandedVideo && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-12"
          >
            <div className="w-full max-w-[1200px] h-[80vh] flex flex-col">
              <div className="flex justify-between items-end mb-4 shrink-0 gap-4">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-white truncate">{expandedVideo.title}</h2>
                <button onClick={() => setExpandedVideo(null)} className="text-white hover:text-[#FF3300] transition-colors flex items-center gap-1 sm:gap-2 font-bold text-lg sm:text-xl shrink-0">
                  CLOSE <X className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />
                </button>
              </div>
              <div className="w-full flex-1 border-4 border-white bg-black shadow-[0_0_40px_rgba(204,255,0,0.2)] relative">
                 <iframe 
                    src={`${expandedVideo.url}&autoplay=1`} 
                    className="absolute inset-0 w-full h-full" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen" 
                    allowFullScreen 
                 />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPOTIFY STYLE MINI PLAYER */}
      <AnimatePresence>
        {currentMix && (
          <motion.div
            layout
            initial={{ y: 150, opacity: 0, x: "-50%" }}
            animate={{ 
              y: 0, 
              opacity: 1,
              bottom: appState === 'landing' ? 24 : 32,
              left: "50%",
              x: "-50%",
              width: appState === 'landing' ? 240 : "95%",
              maxWidth: appState === 'landing' ? 240 : 440,
            }}
            exit={{ y: 150, opacity: 0, x: "-50%" }}
            transition={{ duration: 0.5, ease: SMOOTH_EASE }}
            className="absolute z-[150] bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col pointer-events-auto"
          >
            <div className="flex items-center p-2 gap-3 w-full">
              {/* Left: Album Art */}
              <div className="w-10 h-10 rounded-sm shrink-0 overflow-hidden bg-black relative">
                 <img src={currentMix.cover} className={`w-full h-full object-cover ${isPlaying ? 'opacity-100' : 'opacity-70 grayscale'}`} alt="cover" />
                 {appState === 'landing' && isPlaying && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                     <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="w-4 h-4 rounded-full border-2 border-t-[#CCFF00] border-r-[#CCFF00] border-b-transparent border-l-transparent" />
                   </div>
                 )}
              </div>
              
              {/* Middle: Info */}
              <div className="flex flex-col flex-1 min-w-0">
                 <span className="text-sm font-bold text-white truncate leading-tight tracking-normal capitalize" style={{ fontFamily: 'system-ui, sans-serif' }}>{currentMix.title}</span>
                 <span className="text-xs text-white/60 truncate leading-tight tracking-normal capitalize" style={{ fontFamily: 'system-ui, sans-serif' }}>{appState === 'landing' ? 'Now Playing' : currentMix.type}</span>
              </div>

              {/* Right: Controls (Hidden on Landing) */}
              {appState !== 'landing' && (
                <div className="flex items-center gap-1 md:gap-2 pr-2 shrink-0">
                  <button onClick={playPrev} className="text-white hover:text-[#CCFF00] transition-colors p-1">
                     <SkipBack size={20} fill="currentColor" strokeWidth={0} />
                  </button>
                  <button onClick={() => togglePlay(currentMix)} className="text-white hover:scale-110 transition-transform p-1 mx-1">
                    {isPlaying ? <Pause size={28} fill="currentColor" strokeWidth={0} /> : <Play size={28} fill="currentColor" strokeWidth={0} />}
                  </button>
                  <button onClick={playNext} className="text-white hover:text-[#CCFF00] transition-colors p-1">
                     <SkipForward size={20} fill="currentColor" strokeWidth={0} />
                  </button>
                  
                  {/* Divider and Close Player X */}
                  <div className="w-px h-6 bg-white/20 mx-1 md:mx-2" />
                  <button onClick={closePlayer} className="text-white hover:text-[#FF3300] transition-colors p-1 group">
                     <X size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom: Progress Bar (Hidden on Landing) */}
            {appState !== 'landing' && (
               <div className="w-full h-1 bg-white/20 relative cursor-pointer group" onClick={handleSeek}>
                  <div className="absolute top-0 left-0 h-full bg-white group-hover:bg-[#1db954] transition-colors duration-200 pointer-events-none" style={{ width: `${progress}%` }} />
                  {/* Invisible expanded hit area for easier clicking */}
                  <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent" />
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 12px; border-left: 4px solid white; background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: white; border: 2px solid #0024E0; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CCFF00; }
        .dev-scrollbar::-webkit-scrollbar { width: 12px; border-left: 1px solid rgba(204,255,0,0.2); background: black; }
        .dev-scrollbar::-webkit-scrollbar-thumb { background: rgba(204,255,0,0.4); border: 1px solid black; }
        .dev-scrollbar::-webkit-scrollbar-thumb:hover { background: #CCFF00; }
        
        /* Ensures the calendar icon shows up nicely */
        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
          transition: 0.2s;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
      `}} />
    </div>
  );
}

// Fixed Sticky Header PageWrapper 
const PageWrapper = ({ children, title, subtitle = '', noScroll = false, headerRight = null }: any) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: SMOOTH_EASE }} className="absolute inset-0 z-10 bg-transparent flex flex-col overflow-hidden">
    <div className="flex-shrink-0 z-20 bg-[#0024E0] pt-6 md:pt-12 pb-4 px-6 md:px-12 border-b-4 border-white shadow-xl">
       <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex flex-col w-full min-w-0">
             <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-none text-white mix-blend-difference break-words whitespace-normal">{title}</h2>
             {subtitle && <span className="text-sm sm:text-lg md:text-2xl font-bold text-[#CCFF00] tracking-widest mt-2 block break-words">{subtitle}</span>}
          </div>
          {headerRight && <div className="flex-shrink-0 w-full md:w-auto overflow-x-auto hide-scrollbar pb-1 md:pb-0">{headerRight}</div>}
       </div>
    </div>
    <div className={`flex-1 w-full px-6 md:px-12 ${noScroll ? 'overflow-hidden' : 'overflow-y-auto custom-scrollbar'}`}>
      <div className={`max-w-[1400px] mx-auto w-full h-full pt-6 md:pt-12 ${noScroll ? 'pb-6 md:pb-12' : 'pb-40'}`}>
                 {children}
      </div>
    </div>
  </motion.div>
);