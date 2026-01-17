"use client";

import { Handshake, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence, useInView, LazyMotion, domAnimation } from "framer-motion";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import gunpreetImage from "@/assets/gunpreet.jpg";
import clientsImage from "@/assets/clients.png";

// Lazy load Framer Motion features
const MotionDiv = motion.div;
const MotionImg = motion.img;

// Separate Counter component
const Counter = ({ to, label, duration = 1500, isInView }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    let startTimestamp;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);
      const currentCount = Math.floor(percentage * to);

      setCount(currentCount);

      if (percentage < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setCount(to);
        setHasAnimated(true);
      }
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, to, duration, hasAnimated]);

  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-display font-semibold text-primary-foreground">
        {count}
        {to === 250 && "+"}
      </p>
      <p className="mt-2 text-sm font-medium tracking-wider uppercase text-primary-foreground/80">
        {label}
      </p>
    </div>
  );
};

const AboutSection = () => {
  const values = [
    "Thoughtful Design Approach",
    "User-Centered Solutions",
    "Strategic Brand Thinking",
    "Collaborative Partnership",
  ];

  const faqs = [
    {
      question: "How long does a project take?",
      answer: "Most projects take 2–4 weeks depending on scope. We'll provide a detailed timeline after our initial consultation.",
    },
    {
      question: "Do you offer custom designs?",
      answer: "Yes, every design is tailored to your brand. We don't use templates - everything is created from scratch to match your unique vision.",
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer ongoing support and revisions. We also provide training and documentation for your team.",
    },
    {
      question: "What's your design process?",
      answer: "Our process includes discovery, strategy, design, development, and launch phases with regular check-ins and feedback sessions.",
    },
    {
      question: "Do you work with startups?",
      answer: "Absolutely! We love working with startups and offer flexible packages to suit different budgets and timelines.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, {
    once: true,
    margin: "-100px",
    amount: 0.3 // Only trigger when 30% is visible
  });

  // Memoize counter values
  const counterConfigs = useMemo(() => [
    { to: 250, label: "Projects Completed", duration: 1400 },
    { to: 125, label: "Happy Clients", duration: 1350 },
    { to: 25, label: "Expert Team Members", duration: 1300 },
  ], []);

  const toggleFaq = useCallback((index) => {
    setOpenFaq(prev => prev === index ? null : index);
  }, []);

  // Optimize motion configurations with simpler animations
  const motionConfigs = useMemo(() => ({
    leftContent: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { duration: 0.5 }
    },
    rightVisual: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { duration: 0.5 }
    },
    floatingCard: {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.2 }
    },
    statsSection: {
      initial: { opacity: 0 },
      animate: { opacity: isStatsInView ? 1 : 0 },
      transition: { duration: 0.4 }
    },
    clientsImage: {
      initial: { opacity: 0 },
      animate: { opacity: isStatsInView ? 1 : 0 },
      transition: { duration: 0.4, delay: 0.1 }
    },
    faqSection: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { duration: 0.4 }
    }
  }), [isStatsInView]);

  return (
    <LazyMotion features={domAnimation}>
      <section id="about" className="py-20 md:py-28 bg-background relative overflow-hidden">
        {/* Simplified background decorations */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-64 h-64 bg-charcoal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 -right-32 w-64 h-64 bg-charcoal/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <MotionDiv
              {...motionConfigs.leftContent}
              viewport={{ once: true, margin: "-50px" }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-charcoal/60 mb-4 px-4 py-2 bg-charcoal/5 rounded-full">
                About Us
              </span>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight mb-6">
                We Believe in the
                <br />
                <span className="text-charcoal/50">Power of Design</span>
              </h2>

              <p className="text-base md:text-lg text-warm-gray leading-relaxed mb-6">
                At Design Brew, we're more than just designers — we're storytellers,
                problem-solvers, and strategic partners.
              </p>

              <p className="text-warm-gray leading-relaxed mb-8">
                Great design should be purposeful, beautiful, and effective. We blend
                creativity with strategy to deliver real results.
              </p>

              {/* Values */}
              <div className="grid sm:grid-cols-2 gap-3">
                {values.map((value) => (
                  <div key={value} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-charcoal rounded-md flex items-center justify-center shadow-sm">
                      <Handshake className="text-primary-foreground" size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-charcoal">{value}</span>
                  </div>
                ))}
              </div>
            </MotionDiv>

            {/* Right Visual - Optimized image loading */}
            <MotionDiv
              className="relative order-1 lg:order-1"
              {...motionConfigs.rightVisual}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="aspect-[4/5] bg-secondary rounded-2xl overflow-hidden shadow-xl relative w-[94%] sm:w-full mx-auto">
                {/* Optimized image with proper dimensions */}
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                  alt="Team"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  style={{
                    contentVisibility: 'auto',
                    willChange: 'transform'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <MotionDiv
                className="absolute -bottom-6 -left-2 sm:-left-8 bg-charcoal text-primary-foreground p-6 rounded-2xl shadow-xl max-w-[280px]"
                {...motionConfigs.floatingCard}
                viewport={{ once: true, margin: "-50px" }}
              >
                <p className="font-display text-base mb-3">
                  "Design is not just what it looks like. Design is how it works."
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-primary-foreground/20">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-foreground/30">
                    <img
                      src={gunpreetImage}
                      alt="Gunpreet Kaur"
                      loading="lazy"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Gunpreet Kaur</p>
                    <p className="text-xs text-primary-foreground/60">Founder</p>
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Stats Section */}

            <div ref={statsRef}>
              <MotionDiv
                className="bg-gradient-to-br from-charcoal to-charcoal/90 rounded-2xl p-4 lg:p-8 flex flex-col lg:flex-row items-center justify-between text-primary-foreground gap-5"
              >
                {/* Image */}
                <div className="relative order-2 lg:order-1">
                  <MotionImg
                    src={clientsImage}
                    alt="Clients"
                    loading="lazy"
                    width={256}
                    height={256}
                    className="w-48 lg:w-56 h-52 lg:h-80 object-cover rounded-xl shadow-xl"
                    {...motionConfigs.clientsImage}
                  />
                </div>

                {/* Numbers - Aligned to the right */}
                <div className="flex flex-col gap-3 w-full lg:w-auto order-2 lg:order-2 lg:text-right">
                  {counterConfigs.map((config, index) => (
                    <div key={index} className="pb-3 border-b border-primary-foreground/20">
                      <Counter
                        to={config.to}
                        label={config.label}
                        duration={config.duration}
                        isInView={isStatsInView}
                      />
                    </div>
                  ))}
                </div>
              </MotionDiv>
            </div>

            {/* FAQ Section */}
            <MotionDiv
              className="space-y-3"
              {...motionConfigs.faqSection}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h4 className="text-xl md:text-2xl font-display font-semibold text-charcoal mb-2">
                Frequently Asked Questions
              </h4>

              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-xs border border-charcoal/10 overflow-hidden hover:shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 text-left flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-charcoal/20"
                      aria-expanded={openFaq === index}
                    >
                      <span className="font-medium text-charcoal text-sm pr-4">
                        {faq.question}
                      </span>
                      <span className="text-charcoal/60 flex-shrink-0 ml-2">
                        {openFaq === index ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </span>
                    </button>

                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-4 pb-4 pt-1">
                            <p className="text-sm text-warm-gray leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </MotionDiv>

          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default AboutSection;