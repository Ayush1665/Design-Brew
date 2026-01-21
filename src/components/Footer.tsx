import { Instagram, Mail, Linkedin, ArrowUpRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/design_brew_co/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/gunpreet-kaur-7944b7194/", label: "LinkedIn" },
    { icon: MessageCircle, href: "https://wa.me/918427395293?text=Hello%20Design%20Brew%21%20%21%20%21", label: "WhatsApp" },
    {
      icon: Mail,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=info.designbrew@gmail.com&su=${encodeURIComponent(
        "Request regarding your service"
      )}&body=${encodeURIComponent("Hi, Design Brew")}`,
      label: "Email"
    }
  ];

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Content Management", href: "#contact" },
        { name: "SEO Optimization", href: "#contact" },
        { name: "Meta Ads", href: "#contact" },
        { name: "Web Development", href: "#contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Our Process", href: "#process" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#" },
        // Updated href to #about as a fallback
        { name: "FAQ", href: "#about" }, 
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ];

  // Helper function to handle specific scroll logic
  const handleLinkClick = (e, linkName, href) => {
    if (linkName === "FAQ") {
      e.preventDefault();
      // Target the #about section
      const section = document.querySelector("#about");
      
      if (section) {
        // block: "end" aligns the bottom of the element with the bottom of the viewport
        section.scrollIntoView({ behavior: "smooth", block: "end" });
      } else {
        // Fallback if ID doesn't exist on page
        window.location.href = href;
      }
    }
  };

  return (
    <footer className="bg-charcoal pt-24 pb-8 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />

      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 text-center md:text-left">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl font-semibold text-primary-foreground tracking-tight">
                Design Brew
              </span>
            </div>
            <p className="text-primary-foreground/60 leading-relaxed mb-8 max-w-sm text-lg text-center md:text-left">
              One Stop Solution for all your Infinite Ideas. We craft exceptional
              digital experiences that inspire and convert.
            </p>
            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  className="w-12 h-12 bg-primary-foreground/10 rounded-xl flex items-center justify-center hover:bg-primary-foreground hover:text-charcoal transition-all duration-300 group"
                >
                  <social.icon className="text-primary-foreground group-hover:text-charcoal transition-colors" size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-display text-primary-foreground font-semibold mb-6 text-lg">
                {column.title}
              </h4>
              <ul className="space-y-4 flex flex-col items-center md:items-start">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      // Added onClick handler here
                      onClick={(e) => handleLinkClick(e, link.name, link.href)}
                      className="text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center gap-1 group cursor-pointer"
                    >
                      {link.name}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/40 text-xs sm:text-sm">
              © 2026 Design Brew. All rights reserved. Crafted with ♥
            </p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors text-sm">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;