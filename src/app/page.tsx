"use client";

import {
  FC,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  ReactElement,
} from "react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfjs, Document, Page } from "react-pdf";
import useResizeObserver from "@react-hook/resize-observer";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const useWidth = (target: any) => {
  const [width, setWidth] = useState(null);

  useLayoutEffect(() => {
    setWidth(target.current.getBoundingClientRect().width);
  }, [target]);

  useResizeObserver(target, (entry: any) => {
    setWidth(entry.contentRect.width);
  });
  return width;
};

interface PortfolioPageProps {
  pageIndex: number;
  width: any;
}

const PortfolioPage: FC<PortfolioPageProps> = ({ pageIndex, width }) => {
  return (
    <Page
      key={`page_${pageIndex}`}
      pageNumber={pageIndex + 1}
      className="mb-8 p-11"
      width={width}
    />
  );
};

export default function Home() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [portfolioPages, setPortfolioPages] = useState<ReactElement[]>([]);

  const wrapperDiv = useRef(null);
  const width = useWidth(wrapperDiv);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (width && width > 0 && numPages > 0) {
      console.log("width", width);

      let pages: ReactElement[] = [];

      for (let i = 1; i <= numPages; i++) {
        setPortfolioPages([]);
        pages.push(<PortfolioPage pageIndex={i} width={width} />);
        setPortfolioPages(pages);
      }
    }
  }, [width, numPages]);

  return (
    <div className="wrapper" ref={wrapperDiv}>
      <Document
        file="portfolio2024.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        className="bg-white"
      >
        {portfolioPages}
      </Document>
    </div>
  );
}
