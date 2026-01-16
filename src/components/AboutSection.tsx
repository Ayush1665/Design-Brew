"use client";

import { Handshake } from "lucide-react";
import { motion } from "framer-motion";
import gunpreetImage from "@/assets/gunpreet.jpg";

const AboutSection = () => {
  const values = [
    "Thoughtful Design Approach",
    "User-Centered Solutions",
    "Strategic Brand Thinking",
    "Collaborative Partnership",
  ];

  const brands = [
    "Chic Bytes",
    "Pardeco",
    "Physiosafe Rehabilitation",
    "English Browne",
  ];

  return (
    <section id="about" className="py-28 md:py-36 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-64 h-64 bg-charcoal/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-charcoal/60 mb-4 px-4 py-2 bg-charcoal/5 rounded-full">
              About Us
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal leading-tight mb-8">
              We Believe in the
              <br />
              <span className="text-charcoal/50">Power of Design</span>
            </h2>

            <p className="text-lg text-warm-gray leading-relaxed mb-6">
              At Design Brew, we're more than just designers — we're storytellers,
              problem-solvers, and strategic partners.
            </p>

            <p className="text-warm-gray leading-relaxed mb-10">
              Great design should be purposeful, beautiful, and effective. We blend
              creativity with strategy to deliver real results.
            </p>

            {/* Values */}
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((value) => (
                <div key={value} className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-charcoal rounded-lg flex items-center justify-center shadow-md">
                    <Handshake className="text-primary-foreground" size={14} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-charcoal">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/5] bg-secondary rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="Team"
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              className="absolute -bottom-8 -left-4 sm:-left-8 bg-charcoal text-primary-foreground p-8 rounded-3xl shadow-2xl max-w-[300px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="font-display text-lg mb-4">
                "Design is not just what it looks like. Design is how it works."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-primary-foreground/20">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary-foreground/30">
                  <img src={gunpreetImage} alt="Gunpreet Kaur" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Gunpreet Kaur</p>
                  <p className="text-xs text-primary-foreground/60">Founder</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trusted by clients - Text Only Infinite Scroll */}
        <div className="mt-28">
          <h3 className="text-center text-sm uppercase tracking-widest text-charcoal/60 mb-10">
            Trusted by our clients
          </h3>

          <div className="relative overflow-hidden py-4">
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent" />
            </div>

            <motion.div
              className="flex items-center whitespace-nowrap"
              animate={{
                x: ["0%", "-100%"]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            >
              {/* Create long repeating text pattern */}
              {Array.from({ length: 10 }).map((_, blockIndex) => (
                <div key={blockIndex} className="flex items-center mr-24">
                  {brands.map((brand, i) => (
                    <div key={`${blockIndex}-${i}`} className="flex-shrink-0 mx-12">
                      <span className="text-2xl md:text-3xl font-medium text-charcoal/60 hover:text-charcoal transition-colors duration-300">
                        {brand}
                      </span>
                      {i < brands.length - 1 && (
                        <span className="mx-12 text-charcoal/20">•</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;