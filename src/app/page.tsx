"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
    const radius = 300; // increased radius to add more padding around the image
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
    <div className="relative grid place-items-center w-full h-full">
      {/* Flower image in a centered grid cell */}
      <div className="w-[480px] h-[480px] bg-contain bg-center bg-no-repeat opacity-90">
        <Image
          src="/flower_home.png"
          alt="Flower"
          width={480}
          height={480}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Menu items absolutely positioned relative to the center */}
      <div className="absolute grid place-items-center w-full h-full">
        {menuItems.map((item, index) => (
          <div
            key={item.name}
            className="absolute transition-all duration-500 ease-in-out"
            style={calculatePosition(index, menuItems.length)}
          >
            <div className="flex justify-center items-center w-48">
              {item.external ? (
                <a
                  href={item.href}
                  className="text-black hover:text-blue-500 hover:shadow-text text-4xl font-bold whitespace-nowrap transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              ) : (
                <a
                  href={item.href}
                  className="text-black hover:text-blue-500 hover:shadow-text text-4xl font-bold whitespace-nowrap transition-all duration-300 text-center"
                >
                  {item.name}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div
      className="h-screen grid place-items-center relative"
      style={{
        background:
          "radial-gradient(circle, #ffffff 0%, #f0f8ff 50%, #b9e3ff 100%)",
      }}
    >
      <div className="absolute top-8 left-8">
        <h1 className="text-5xl text-black">Iseult Perrault</h1>
      </div>

      <style jsx global>{`
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      <CircleMenu />
    </div>
  );
}
