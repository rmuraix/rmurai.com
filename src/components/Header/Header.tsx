import type React from "react";
import { useScroll } from "../../hooks/useScroll";

interface ReactHeaderProps {
  children: React.ReactNode;
}

const ReactHeader: React.FC<ReactHeaderProps> = ({ children }) => {
  const isScrolled = useScroll();

  return (
    <header
      className={`
        w-full transition-all duration-300 ease-in-out
        ${isScrolled ? "fixed top-0 left-0 bg-opacity-100 backdrop-blur backdrop-filter" : ""}
      `}
    >
      <div
        className={`
            relative h-20 flex items-center container mx-auto
            ${isScrolled ? "px-8 lg:px-28" : "px-4"}
            `}
      >
        <a href="/" className="flex items-center">
          {/* Logo */}
          <div
            className={`
              transition-all duration-300 ease-in-out
              ${isScrolled ? "w-[25px] h-[25px]" : "w-[72px] h-[72px]"}
            `}
          >
            {children}
          </div>
          <h1
            className={`
              ${isScrolled ? "visible mx-2" : "invisible mx-4 text-4xl font-extrabold"}
              sm:visible
            `}
          >
            Ryota Murai
          </h1>
        </a>

        <nav className="ml-auto">{/* WIP*/}</nav>
      </div>
    </header>
  );
};

export default ReactHeader;
