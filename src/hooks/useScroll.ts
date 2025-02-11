import type { number } from "astro:schema";
import { useEffect, useState } from "react";

export function useScroll(): boolean {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const threshold: number = 50;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrolled;
}
