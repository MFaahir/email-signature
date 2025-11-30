"use client";

import { SignatureData } from "@/lib/types";
import { SimpleTemplate } from "./templates/SimpleTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ColorfulTemplate } from "./templates/ColorfulTemplate";
import { CorporateTemplate } from "./templates/CorporateTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { RoundedIconsTemplate } from "./templates/RoundedIconsTemplate";
import { PhotoLeftTemplate } from "./templates/PhotoLeftTemplate";
import { PhotoTopTemplate } from "./templates/PhotoTopTemplate";
import { NoPhotoTemplate } from "./templates/NoPhotoTemplate";
import { ModernGradientTemplate } from "./templates/ModernGradientTemplate";
import { ElegantTemplate } from "./templates/ElegantTemplate";
import { BoldTemplate } from "./templates/BoldTemplate";
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
        {template === "corporate" && <CorporateTemplate data={data} />}
        {template === "creative" && <CreativeTemplate data={data} />}
        {template === "rounded-icons" && <RoundedIconsTemplate data={data} />}
        {template === "photo-left" && <PhotoLeftTemplate data={data} />}
        {template === "photo-top" && <PhotoTopTemplate data={data} />}
        {template === "no-photo" && <NoPhotoTemplate data={data} />}
        {template === "modern-gradient" && <ModernGradientTemplate data={data} />}
        {template === "elegant" && <ElegantTemplate data={data} />}
        {template === "bold" && <BoldTemplate data={data} />}
      </div>
    );
  }
);

SignaturePreview.displayName = "SignaturePreview";
