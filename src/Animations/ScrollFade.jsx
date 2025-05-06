import React, { useState, useRef, useEffect } from "react";
import "../Styles/StylesAnimations.css";

const ScrollFade = ({ children, direction = "right", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Only once
        }
      },
      { threshold: 0.1 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const animationClass = isVisible ? `fade-in-${direction}` : "hidden-before-scroll";

  return (
    <div
      ref={ref}
      className={animationClass}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default ScrollFade;
