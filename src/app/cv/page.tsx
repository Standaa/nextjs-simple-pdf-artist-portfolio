"use client";

import dynamic from "next/dynamic";

const CvClient = dynamic(() => import("./CvClient"), {
  ssr: false,
});

export default function Cv() {
  return <CvClient />;
}
