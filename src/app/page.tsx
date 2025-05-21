"use client";

import { useEffect, useState } from "react";

const CircleMenu = () => {
  const [mounted, setMounted] = useState(false);

  // Menu items with their hrefs
  const menuItems = [
    { name: "CV", href: "cv" },
    { name: "Portfolio", href: "portfolio" },
    {
      name: "Instagram",
      href: "https://www.instagram.com/i.perrault",
      external: true,
    },
    { name: "Contact", href: "contact" },
    { name: "Catalogue", href: "catalogue" },
  ];

  // Calculate positions in a circle
  const calculatePosition = (index: number, total: number) => {
    const radius = 250; // increased radius for the circle
    const angle = (index / total) * 2 * Math.PI; // angle in radians
    const x = radius * Math.cos(angle - Math.PI / 2); // offset angle to start from top
    const y = radius * Math.sin(angle - Math.PI / 2);

    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering during SSR to prevent hydration mismatch
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute">
        {menuItems.map((item, index) => (
          <div
            key={item.name}
            className="absolute transition-all duration-500 ease-in-out"
            style={calculatePosition(index, menuItems.length)}
          >
            {item.external ? (
              <a
                href={item.href}
                className="text-black hover:text-gray-600 text-4xl font-bold whitespace-nowrap"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </a>
            ) : (
              <a
                href={item.href}
                className="text-black hover:text-gray-600 text-4xl font-bold whitespace-nowrap"
              >
                {item.name}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div
      className="bg-fixed bg-center bg-cover h-screen flex items-center justify-center relative"
      style={{ backgroundImage: "url('/landing_page.png')" }}
    >
      <div className="absolute top-8 left-8">
        <h1 className="text-5xl text-black">Iseult Perrault</h1>
      </div>

      <CircleMenu />
    </div>
  );
}
