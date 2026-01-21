"use client";

import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, RefreshCw, CheckCircle2, X, Globe } from "lucide-react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import {ContactModal} from "./components/ContactModal";
import { useOnlineStatus } from "./hooks/useOnlineStatus";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      networkMode: "offlineFirst",
    },
  },
});

const App = () => {
  const { isOnline, wasOffline, checkConnection } = useOnlineStatus();
  const [showOnlineToast, setShowOnlineToast] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Show "Back Online" toast only if they were previously offline
  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowOnlineToast(true);
      const timer = setTimeout(() => setShowOnlineToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  const handleManualRetry = async () => {
    setIsChecking(true);
    await checkConnection();
    setTimeout(() => setIsChecking(false), 6000);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ContactModal/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        {/* Offline Overlay - Premium Glassmorphism */}
        <AnimatePresence>
          {!isOnline && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/40 backdrop-blur-md px-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-[2rem] shadow-2xl p-8 w-full max-w-sm text-center border border-white/20"
              >
                <div className="w-16 h-16 bg-charcoal/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <WifiOff className="h-8 w-8 text-charcoal/40" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">
                  Connection Lost
                </h2>
                <p className="text-warm-gray text-sm mb-8 leading-relaxed">
                  We can't reach the servers. Please check your internet connection to continue brewing.
                </p>
                <button
                  onClick={handleManualRetry}
                  disabled={isChecking}
                  className="w-full py-4 bg-charcoal text-white rounded-xl font-semibold hover:bg-charcoal/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
                  {isChecking ? "Checking..." : "Try Again"}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Online Toast - Sleek & Subtle */}
        <AnimatePresence>
          {showOnlineToast && (
            <motion.div
              initial={{ y: -100, x: "-50%", opacity: 0 }}
              animate={{ y: 20, x: "-50%", opacity: 1 }}
              exit={{ y: -100, x: "-50%", opacity: 0 }}
              className="fixed top-0 left-1/2 z-[110] w-[calc(100%-2rem)] max-w-xs"
            >
              <div className="bg-charcoal text-white rounded-2xl shadow-2xl p-4 flex items-center gap-4 border border-white/10">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">You're back!</p>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">Connection Restored</p>
                </div>
                <button
                  onClick={() => setShowOnlineToast(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-white/40" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;