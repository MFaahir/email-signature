"use client";

import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Copy, Download } from "lucide-react";
import { RefObject, useState } from "react";

interface ActionButtonsProps {
  previewRef: RefObject<HTMLDivElement | null>;
}

export function ActionButtons({ previewRef }: ActionButtonsProps) {
  const [copying, setCopying] = useState(false);

  const handleCopyHtml = () => {
    if (previewRef.current) {
      setCopying(true);
      const html = previewRef.current.innerHTML;
      navigator.clipboard.writeText(html).then(() => {
        setTimeout(() => setCopying(false), 2000);
      });
    }
  };

  const handleDownloadPdf = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("signature.pdf");
    }
  };

  return (
    <div className="flex gap-4 mt-4">
      <Button onClick={handleCopyHtml} variant="outline" className="flex-1">
        <Copy className="w-4 h-4 mr-2" />
        {copying ? "Copied!" : "Copy HTML"}
      </Button>
      <Button onClick={handleDownloadPdf} className="flex-1">
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </Button>
    </div>
  );
}
