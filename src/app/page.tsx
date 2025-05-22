"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Roboto } from "next/font/google";

// Load Roboto font with different weights
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-roboto",
});

const CircleMenu = () => {
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Menu items with their hrefs
  const menuItems = [
    { name: "Contact", href: "contact" },
    { name: "Portfolio", href: "portfolio" },
    {
      name: "Instagram",
      href: "https://www.instagram.com/i.perrault",
      external: true,
    },
    { name: "CV", href: "cv" },
    { name: "No Rain, No Flowers Catalogue", href: "catalog" },
  ];

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial size
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Calculate responsive radius based on screen size
  const getResponsiveRadius = () => {
    const baseRadius = 300;

    if (windowSize.width < 640) {
      // Mobile
      return Math.min(140, windowSize.width / 4);
    } else if (windowSize.width < 1024) {
      // Tablet
      return Math.min(220, windowSize.width / 4);
    } else {
      // Desktop
      return baseRadius;
    }
  };

  // Calculate responsive image size based on screen size
  const getResponsiveImageSize = () => {
    if (windowSize.width < 640) {
      // Mobile
      return 240;
    } else if (windowSize.width < 1024) {
      // Tablet
      return 360;
    } else {
      // Desktop
      return 480;
    }
  };

  // Calculate positions in a circle
  const calculatePosition = (index: number, total: number) => {
    const radius = getResponsiveRadius();
    const angle = (index / total) * 2 * Math.PI; // angle in radians
    const x = radius * Math.cos(angle - Math.PI / 2); // offset angle to start from top
    const y = radius * Math.sin(angle - Math.PI / 2);

    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  };

  // Get class for menu item text
  const getMenuItemClass = () => {
    const baseClass = `text-black hover:text-blue-500 hover:shadow-text font-light transition-all duration-300 text-center ${roboto.className}`;

    if (windowSize.width < 640) {
      // Mobile
      return `${baseClass} text-xl sm:text-2xl`;
    } else if (windowSize.width < 1024) {
      // Tablet
      return `${baseClass} text-2xl sm:text-3xl`;
    } else {
      // Desktop
      return `${baseClass} text-4xl`;
    }
  };

  // Format menu item name if needed
  const formatMenuItemName = (name: string) => {
    // If it's the long catalogue text and not on mobile, add line breaks
    if (name === "No Rain, No Flowers Catalogue" && windowSize.width >= 640) {
      return (
        <>
          <span className="block">No Rain,</span>
          <span className="block">No Flowers</span>
          <span className="block">Catalogue</span>
        </>
      );
    }
    return name;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering during SSR to prevent hydration mismatch
  }

  const imageSize = getResponsiveImageSize();
  const menuItemClass = getMenuItemClass();
  const isMobile = windowSize.width < 640;

  return (
    <div className="relative grid place-items-center w-full h-full">
      {/* Flower image with conditional positioning */}
      <div
        className={`bg-contain bg-center bg-no-repeat opacity-90`}
        style={{
          width: imageSize,
          height: imageSize,
          position: "absolute",
          top: isMobile ? "20%" : "50%",
          left: "50%",
          transform: isMobile ? "translateX(-50%)" : "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/flower_home.png"
          alt="Flower"
          width={imageSize}
          height={imageSize}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Menu items absolutely positioned */}
      <div className="absolute grid place-items-center w-full h-full">
        {isMobile ? (
          // Mobile vertical menu positioned below the flower
          <div
            className="flex flex-col space-y-4 text-center"
            style={{
              marginTop: isMobile ? `calc(${imageSize}px + 10vh)` : "260px",
            }}
          >
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.external ? (
                  <a
                    href={item.href}
                    className={menuItemClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <a href={item.href} className={menuItemClass}>
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Circle menu for larger screens
          menuItems.map((item, index) => (
            <div
              key={item.name}
              className="absolute transition-all duration-500 ease-in-out"
              style={calculatePosition(index, menuItems.length)}
            >
              <div className="flex justify-center items-center w-48">
                {item.external ? (
                  <a
                    href={item.href}
                    className={menuItemClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formatMenuItemName(item.name)}
                  </a>
                ) : (
                  <a href={item.href} className={menuItemClass}>
                    {formatMenuItemName(item.name)}
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`h-screen grid place-items-center relative overflow-hidden ${roboto.variable}`}
      style={{
        background:
          "radial-gradient(circle, #ffffff 0%, #f0f8ff 50%, #b9e3ff 100%)",
      }}
    >
      {/* Responsive title positioning */}
      <div className="absolute top-8 left-8 z-10">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl text-black font-light ${roboto.className}`}
        >
          Iseult Perrault
        </h1>
      </div>

      <style jsx global>{`
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        /* Prevent overscroll on mobile devices */
        html,
        body {
          overscroll-behavior: none;
          overflow: hidden;
          height: 100%;
          width: 100%;
        }
      `}</style>

      {mounted && <CircleMenu />}
    </div>
  );
}
