"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import video from "@/assets/vid.mp4";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleCanPlay = () => {
      console.log("Video loaded successfully from:", video);
      setVideoLoaded(true);
      videoEl.play().catch(e => {
        console.log("Autoplay failed, trying muted:", e);
        videoEl.muted = true;
        videoEl.play().catch(e2 => console.log("Muted play also failed:", e2));
      });
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e, "Video source:", video);
    };

    videoEl.addEventListener('canplay', handleCanPlay);
    videoEl.addEventListener('error', handleError);

    // Force video to load
    videoEl.load();

    return () => {
      videoEl.removeEventListener('canplay', handleCanPlay);
      videoEl.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading overlay */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-beige to-beige-dark/90 flex items-center justify-center">
            <div className="text-charcoal text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal mx-auto mb-4"></div>
              <p className="text-sm font-medium">Loading experience...</p>
            </div>
          </div>
        )}

        {/* Enhanced Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-beige/80 via-beige/60 to-beige/0" />
        
        
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-72 h-72 bg-charcoal/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-charcoal/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-charcoal/20 to-transparent" />
      

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold text-charcoal leading-[1.05] tracking-tight mb-8"
          >
            <span className="block">One Stop Solution</span>
            <span className="block text-charcoal/70 mt-2">for all your</span>
            <motion.span
              className="block mt-2 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-charcoal via-charcoal to-charcoal/80">
                Infinite Ideas
              </span>
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-charcoal/90 max-w-2xl mx-auto mb-12 leading-relaxed backdrop-blur-sm px-6 py-4 rounded-2xl"
          >
            We transform your vision into exceptional digital experiences.
            From brand identity to web design, we craft solutions that captivate and convert.
          </motion.p>

          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="flex flex-col sm:flex-row items-center justify-center gap-4"
>
  <a href="#contact">
    <Button
      variant="hero"
      size="xl"
      className="group shadow-xl shadow-charcoal/20 hover:shadow-2xl hover:shadow-charcoal/30 transition-all duration-300 backdrop-blur-sm"
    >
      Get Started
      <ArrowRight className="ml-2 transition-transform group-hover:translate-x-2" size={18} />
    </Button>
  </a>

  <a href="#contact">
    <Button
      variant="hero-outline"
      size="xl"
      className="group backdrop-blur-md border-white/30 hover:border-white/50"
    >
      See pricing
      <ArrowRight className="ml-2 transition-transform group-hover:translate-x-2" size={18} />
    </Button>
  </a>
</motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;