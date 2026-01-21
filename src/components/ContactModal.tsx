import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "New Project Strategy Call",
    message: ""
  });

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenContactModal");
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenContactModal", "true");
      }, 1300); 
      return () => clearTimeout(timer);
    }
  }, []);

  // FIXED: Removed ': React.FormEvent' for .jsx compatibility
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://design-server-7bap.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent! Check your email.");
        setIsOpen(false);
        setFormData({ name: "", email: "", subject: "New Project Strategy Call", message: "" });
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* IMPROVED: Added max-h and overflow for small screens + responsive padding */}
      <DialogContent className="w-[95vw] sm:max-w-[450px] max-h-[90vh] overflow-y-auto bg-background border-none shadow-2xl p-6 sm:p-8 [&>button]:hidden
    sm:[&>button]:block">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
            Book Our Free Consultation
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4 sm:mt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium opacity-80">Full Name</label>
            <Input 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe" 
              className="h-11 sm:h-12 bg-secondary/50 border-none" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium opacity-80">Email Address</label>
            <Input 
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="john@company.com" 
              className="h-11 sm:h-12 bg-secondary/50 border-none" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium opacity-80">How can we help?</label>
            <Textarea 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell us a bit about your goals..." 
              className="resize-none bg-secondary/50 border-none min-h-[80px] sm:min-h-[100px]" 
            />
          </div>

          <Button 
            disabled={isSubmitting}
            className="w-full h-12 sm:h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg rounded-xl transition-transform active:scale-[0.98] mt-2 sm:mt-4"
          >
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
            ) : (
              "Book a Free Strategy Call"
            )}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ContactModal;