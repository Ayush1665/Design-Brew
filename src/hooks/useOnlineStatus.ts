import { useState, useEffect } from "react";

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [wasOffline, setWasOffline] = useState<boolean>(false);

  const checkConnection = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      // Use a lightweight endpoint
      await fetch("https://www.gstatic.com/generate_204", { 
        method: "HEAD", 
        mode: 'no-cors',
        signal: controller.signal 
      });
      
      clearTimeout(timeoutId);
      setIsOnline(true);
    } catch {
      setIsOnline(false);
      setWasOffline(true);
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      checkConnection();
    };
    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("focus", checkConnection);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("focus", checkConnection);
    };
  }, []);

  return { isOnline, wasOffline, checkConnection };
};