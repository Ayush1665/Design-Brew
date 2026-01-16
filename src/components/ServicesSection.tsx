import {
  FileText,
  BarChart3,
  Video,
  Facebook,
  Search,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: FileText,
    title: "Content Management",
    description:
      "Planning, creating, and managing high-quality content that builds trust and keeps your audience engaged.",
  },
  {
    icon: BarChart3,
    title: "Google Ads",
    description:
      "Data-driven Google Ads campaigns designed to boost visibility, traffic, and conversions.",
  },
  {
    icon: Video,
    title: "Pre-Production",
    description:
      "From concept to planning — we prepare scripts, storyboards, and strategies for smooth execution.",
  },
  {
    icon: Facebook,
    title: "Meta Ads",
    description:
      "High-performing ad creatives and targeting strategies for Facebook and Instagram growth.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Improving search rankings with smart keywords, technical SEO, and content optimization.",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Modern, fast, and responsive websites built to convert visitors into customers.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-28 md:py-36 bg-charcoal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-charcoal/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-charcoal/5 rounded-full blur-3xl" />
      
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
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-tight mb-6">
            Services Tailored to
            <br />
            <span className="text-primary-foreground/50">Elevate Your Brand</span>
          </h2>
          <p className="text-lg text-primary-foreground/70 leading-relaxed max-w-xl">
            We offer comprehensive design solutions that help businesses stand out 
            in today's competitive landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative p-8 lg:p-10 bg-primary-foreground/5 rounded-3xl border border-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-500 hover:shadow-2xl hover:shadow-charcoal/5 hover:-translate-y-1"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-charcoal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 bg-charcoal rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-charcoal/20">
                  <service.icon className="text-primary-foreground" size={35} />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Hover indicator */}
                <div className="flex items-center gap-2 text-primary-foreground">
                  <span className="text-sm font-semibold tracking-wide opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 cursor-pointer">
                    Learn more
                  </span>
                  <span className="text-xl opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 cursor-pointer">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
