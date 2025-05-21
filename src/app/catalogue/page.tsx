"use client";

import { useEffect } from "react";

export default function Catalogue() {
  const catalogueUrl = process.env.NEXT_PUBLIC_CATALOGUE_URL ?? "";

  useEffect(() => {
    // Redirect to the mock URL
    console.log("catalogueUrl", catalogueUrl);
    window.location.href = catalogueUrl;
  }, []);

  // This return statement will briefly show before the redirect happens
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">
          Redirecting to Catalogue...
        </h1>
        <p className="mb-8">
          You will be redirected to the catalogue in a moment.
        </p>
        <a
          href={catalogueUrl}
          className="text-black hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here if you are not redirected automatically
        </a>
      </div>
    </div>
  );
}
