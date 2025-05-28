"use client";

import { useEffect } from "react";

const catalogueUrl = process.env.NEXT_PUBLIC_CATALOGUE_URL ?? "";

export default function Catalog() {
  useEffect(() => {
    // Redirect to catalog automatically
    window.location.href = catalogueUrl;
  }, []);

  return <></>;
}
