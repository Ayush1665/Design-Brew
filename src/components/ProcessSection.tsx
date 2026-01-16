import { motion } from "framer-motion";
import { Brain, Lightbulb, Target } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Strategy Before Design",
    description:
      "Every project starts with clarity. We understand your brand, audience, and goals before shaping any visual direction.",
    icon: <Brain size={36} />,
  },
  {
    number: "02",
    title: "Thought Before Execution",
    description:
      "Ideas are carefully evaluated and refined. We think deeply before acting to ensure every move has intent.",
    icon: <Lightbulb size={36} />,
  },
  {
    number: "03",
    title: "Purpose Before Performance",
    description:
      "Beyond metrics and trends, we focus on meaningful outcomes that create long-term value for your brand.",
    icon: <Target size={36} />,
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-28 md:py-36 bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20 md:mb-28"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-foreground/60 mb-4 px-4 py-2 bg-primary-foreground/10 rounded-full">
            Our Philosophy
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-tight mb-6">
            The Core Pillars
            <br />
            <span className="text-primary-foreground/50">That Define Design Brew</span>
          </h2>
          <p className="text-lg text-primary-foreground/70 leading-relaxed max-w-xl">
            These principles guide how we think, work, and deliver—across every project and platform.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number} 
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px z-0">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary-foreground/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              )}

              {/* Card */}
              <div className="relative bg-primary-foreground/5 backdrop-blur-sm rounded-3xl p-8 border border-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-500 hover:bg-primary-foreground/10 group-hover:-translate-y-2">
                {/* Icon */}
                <div className="text-primary-foreground mb-6">{step.icon}</div>
                
                {/* Step Number */}
                <div className="absolute top-8 right-8 font-display text-5xl font-bold text-primary-foreground/20 group-hover:text-primary-foreground/30 transition-colors">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-primary-foreground/60 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
