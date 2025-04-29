import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let observer = null;

    if (ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        try {
          observer.disconnect(); // ✅ Safest: Disconnect the whole observer
        } catch (error) {
          console.warn("⚡ IntersectionObserver disconnect skipped:", error.message);
        }
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
