"use client";

import { SignatureData } from "@/lib/types";
import { SimpleTemplate } from "./templates/SimpleTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ColorfulTemplate } from "./templates/ColorfulTemplate";
import { forwardRef } from "react";

interface SignaturePreviewProps {
  data: SignatureData;
  template: string;
}

export const SignaturePreview = forwardRef<HTMLDivElement, SignaturePreviewProps>(
  ({ data, template }, ref) => {
    return (
      <div
        ref={ref}
        className="p-8 bg-white border rounded-lg shadow-sm overflow-auto"
        style={{ minHeight: "300px" }}
      >
        {template === "simple" && <SimpleTemplate data={data} />}
        {template === "minimal" && <MinimalTemplate data={data} />}
        {template === "colorful" && <ColorfulTemplate data={data} />}
      </div>
    );
  }
);

SignaturePreview.displayName = "SignaturePreview";
