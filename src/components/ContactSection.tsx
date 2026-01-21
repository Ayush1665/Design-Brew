"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [backendError, setBackendError] = useState(""); // new


  // Constants for limits
  const LIMITS = {
    subject: 10,
    message: 150
  };

  // Helper to count words accurately
  const getWordCount = (text: string) => {
    const trimmed = text.trim();
    return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  };

  // Memoized counts for performance
  const counts = useMemo(() => ({
    subject: getWordCount(formData.subject),
    message: getWordCount(formData.message)
  }), [formData.subject, formData.message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSending(true);

    try {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Server is taking too long. Please try again later.")), 10000)
      );

      const fetchPromise = fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const res = await Promise.race([fetchPromise, timeout]);
      const data = await (res as Response).json();

      if (data.success) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
        setBackendError(""); // clear previous backend errors
        setShowSuccessModal(true);
      }
    } catch (err: any) {
      setBackendError(err.message || "Something went wrong. Please try again."); // show in form
    } finally {
      setIsSending(false);
    }
  };


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (counts.subject > LIMITS.subject) {
      newErrors.subject = `Subject is too long`;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (counts.message > LIMITS.message) {
      newErrors.message = `Message is too long`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  const handlePhoneClick = () => {
    window.open("tel:+918427395293", "_self");
  };

  const handleEmailClick = () => {
    const subject = "Request regarding your service";
    const body = "Hi, Design Brew";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info.designbrew@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank"); // Opens Gmail in a new tab
  };


  const handleLocationClick = () => {
    // Opens Google Maps for Amritsar, Punjab
    window.open("https://www.google.com/maps/place/Amritsar,+Punjab", "_blank");
  };

  return (
    <>
      <section id="contact" className="py-28 md:py-36 bg-background relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-charcoal/10 to-transparent" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-charcoal/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-charcoal/60 mb-4 px-4 py-2 bg-charcoal/5 rounded-full">
                Get In Touch
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal leading-tight mb-6">
                Let's Create
                <br />
                <span className="text-charcoal/50">Something Great</span>
              </h2>
              <p className="text-lg text-warm-gray leading-relaxed mb-4">
                Ready to elevate your brand? We'd love to hear about your project
                and explore how we can help bring your vision to life.
              </p>
              <p className="text-lg text-warm-gray leading-relaxed mb-12">
                Feel free to connect with us for any of your needs regarding our services.  Just push a text to us and we will get back to you immediately.
              </p>


              {/* Contact Info */}
              <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } }
                }}
              >
                {[
                  {
                    icon: Mail,
                    label: "Email us at",
                    value: "info.designbrew@gmail.com",
                    onClick: handleEmailClick
                  },
                  {
                    icon: Phone,
                    label: "Call us at",
                    value: "+91 84273 95293",
                    onClick: handlePhoneClick
                  },
                  {
                    icon: MapPin,
                    label: "Visit us at",
                    value: "Amritsar, Punjab",
                    onClick: handleLocationClick
                  },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-5 group cursor-pointer"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    onClick={item.onClick}
                  >
                    <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-charcoal group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <item.icon className="text-charcoal group-hover:text-primary-foreground transition-colors" size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-warm-gray">{item.label}</p>
                      <p className="font-semibold text-charcoal text-lg relative inline-block group-hover:text-charcoal/80 transition-colors cursor-pointer">
                        {item.value}
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-charcoal group-hover:w-full transition-all duration-300 ease-out"></span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Form container */}
              <div className="bg-secondary p-8 md:p-12 rounded-3xl shadow-xl shadow-charcoal/5 relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-charcoal/10 rounded-full blur-2xl" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <Send className="text-charcoal" size={24} />
                    <h3 className="font-display text-2xl font-semibold text-charcoal">Send us a message</h3>
                  </div>

                  {backendError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center gap-2">
                      <span>⚠</span> {backendError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-charcoal">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-5 py-4 bg-background border rounded-2xl focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal/30 transition-all placeholder:text-muted-foreground ${errors.name ? "border-red-500" : "border-border"
                            }`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-charcoal">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-5 py-4 bg-background border rounded-2xl focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal/30 transition-all placeholder:text-muted-foreground ${errors.email ? "border-red-500" : "border-border"
                            }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* ... Name and Email grid stays the same ... */}

                    {/* Subject Field */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label htmlFor="subject" className="block text-sm font-semibold text-charcoal">
                          Subject *
                        </label>
                        {/* Word Counter for Subject */}

                      </div>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 bg-background border rounded-2xl focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal/30 transition-all placeholder:text-muted-foreground ${counts.subject > LIMITS.subject || errors.subject ? "border-red-500 ring-1 ring-red-500" : "border-border"
                          }`}
                        placeholder="Subject"
                      />
                      {(errors.subject || counts.subject > LIMITS.subject) && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subject ? errors.subject : "Subject is too long"}
                        </p>
                      )}

                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label htmlFor="message" className="block text-sm font-semibold text-charcoal">
                          Your Message *
                        </label>
                      </div>
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 bg-background border rounded-2xl focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal/30 transition-all resize-none placeholder:text-muted-foreground ${counts.message > LIMITS.message || errors.message ? "border-red-500 ring-1 ring-red-500" : "border-border"
                          }`}
                        placeholder="Write your message..."
                      />
                      {(errors.message || counts.message > LIMITS.message) && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message ? errors.message : "Message is too long"}
                        </p>
                      )}

                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      className="w-full group shadow-lg shadow-charcoal/10 hover:shadow-xl"
                      size="xl"
                      disabled={
                        isSending ||
                        counts.subject > LIMITS.subject ||
                        counts.message > LIMITS.message
                      }
                    >
                      {isSending ? (
                        <span className="flex items-center justify-center gap-2">
                          Sending...
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        </span>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-[90vw] sm:max-w-md bg-secondary border-0 rounded-3xl shadow-2xl mx-auto">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
            </div>
            <DialogTitle className="text-center text-2xl font-display font-semibold text-charcoal">
              Message Sent Successfully!
            </DialogTitle>
            <DialogDescription className="text-center text-warm-gray text-lg py-4">
              Thank you for reaching out! We've received your message and will get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-2">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="px-8 rounded-full bg-charcoal hover:bg-charcoal/90 text-white"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactSection;