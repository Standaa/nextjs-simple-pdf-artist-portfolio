"use client";

import { useState } from "react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfjs, Document, Page } from "react-pdf";
import { useWindowWidth, useWindowHeight } from "@wojtekmaj/react-hooks";
import { FixedSizeList as List } from "react-window";

import { LoadingPage } from "../../components/LoadingPage";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// 16:9 aspect ratio
const PDF_ASPECT_RATIO = 1.77;

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [numPages, setNumPages] = useState<number>(0);
  const windowWidth = useWindowWidth() || 0;
  const windowHeight = useWindowHeight() || 0;

  async function onLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const renderPage = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>
      <Page
        pageNumber={index + 1}
        className="mb-8 p-11"
        width={windowWidth - 100}
      />
    </div>
  );

  return (
    <div>
      <LoadingPage isLoading={isLoading} />
      <Document
        file="portfolio2024.pdf"
        onLoadSuccess={onLoadSuccess}
        error={"Error loading PDF"}
        noData={"No data available"}
        className="bg-white"
      >
        <List
          height={windowHeight}
          itemCount={numPages}
          itemSize={windowWidth / PDF_ASPECT_RATIO}
          width={windowWidth}
        >
          {renderPage}
        </List>
      </Document>
    </div>
  );
}
