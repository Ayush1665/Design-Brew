"use client";

import { useState } from "react";
import {
  FileText,
  BarChart3,
  Video,
  Facebook,
  Search,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Service Interface ---
interface Service {
  icon: any;
  title: string;
  description: string;
  backContent: string;
}

const services: Service[] = [
  {
    icon: FileText,
    title: "Content Management",
    description:
      "Planning, creating, and managing high-quality content that builds trust and keeps your audience engaged.",
    backContent:
      "End-to-end content strategy including planning, creation, scheduling, analytics, and optimization to keep your brand consistent and impactful across all platforms.",
  },
  {
    icon: BarChart3,
    title: "Google Ads",
    description:
      "Data-driven Google Ads campaigns designed to boost visibility, traffic, and conversions.",
    backContent:
      "Keyword research, ad copy creation, A/B testing, budget optimization, and performance tracking to maximize ROI and reduce wasted spend.",
  },
  {
    icon: Video,
    title: "Pre-Production",
    description:
      "From concept to planning — we prepare scripts, storyboards, and strategies for smooth execution.",
    backContent:
      "Concept development, scriptwriting, storyboarding, shot lists, and production planning to ensure efficient shoots and high-quality output.",
  },
  {
    icon: Facebook,
    title: "Meta Ads",
    description:
      "High-performing ad creatives and targeting strategies for Facebook and Instagram growth.",
    backContent:
      "Audience research, creative testing, retargeting funnels, and campaign scaling to drive leads, sales, and brand awareness on Meta platforms.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Improving search rankings with smart keywords, technical SEO, and content optimization.",
    backContent:
      "On-page SEO, technical audits, keyword strategy, content optimization, and performance tracking to increase organic visibility and traffic.",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Modern, fast, and responsive websites built to convert visitors into customers.",
    backContent:
      "Custom UI/UX design, responsive development, performance optimization, and SEO-ready websites built for scalability and conversions.",
  },
];

// --- Individual Card Component ---
const ServiceCard = ({ service }: { service: Service }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div
      className="relative h-[350px] perspective cursor-pointer"
      onClick={() => {
        if (!isAnimating) setIsFlipped(!isFlipped);
      }}
    >
      <motion.div
        className="relative w-full h-full transform-style-preserve-3d"
        initial={false}
        animate={{
          // 180 + (360 * 2) = 900 degrees (2.5 spins)
          rotateY: isFlipped ? 900 : 0,
          // Scale pulses up to 1.2 then back to 1
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {/* --- Front Side --- */}
        <div className="absolute inset-0 backface-hidden p-8 lg:p-10 bg-primary-foreground/5 rounded-3xl border border-primary-foreground/10 flex flex-col justify-between group overflow-hidden">
          {/* Content Wrapper: Fades out during spin */}
          <div
            className="flex flex-col justify-between h-full transition-opacity duration-200"
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            <div>
              <div
                className="w-16 h-16 bg-charcoal rounded-2xl flex items-center justify-center mb-8 border border-primary-foreground/20
                transform transition-transform duration-300 group-hover:rotate-12"
              >
                <service.icon className="text-primary-foreground" size={35} />
              </div>

              <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-sm font-semibold tracking-wide">
                Learn more
              </span>
              <span className="text-xl">→</span>
            </div>
          </div>
        </div>

        {/* --- Back Side --- */}
        <div
          className="absolute inset-0 backface-hidden p-8 lg:p-10 bg-gradient-to-br from-charcoal to-charcoal/90 rounded-3xl border border-primary-foreground/20 flex flex-col justify-between overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Content Wrapper: Fades out during spin */}
          <div
            className="flex flex-col justify-between h-full transition-opacity duration-200"
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            <div>
              <div className="w-16 h-16 bg-primary-foreground/10 rounded-2xl flex items-center justify-center mb-8 border border-primary-foreground/20">
                <service.icon className="text-primary-foreground" size={35} />
              </div>

              <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed mb-6">
                {service.backContent}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Section ---
const ServicesSection = () => {
  return (
    <section
      id="services"
      className="py-28 md:py-36 bg-charcoal relative overflow-hidden"
    >
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-charcoal/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-charcoal/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-foreground/60 mb-4 px-4 py-2 bg-primary-foreground/10 rounded-full">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-tight mb-6">
            Services Tailored to
            <br />
            <span className="text-primary-foreground/50">
              Elevate Your Brand
            </span>
          </h2>
          <p className="text-lg text-primary-foreground/70 leading-relaxed max-w-xl">
            We offer comprehensive design solutions that help businesses stand
            out in today's competitive landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;