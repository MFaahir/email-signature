"use client";

import { SignatureForm } from "@/components/signature/SignatureForm";
import { SignaturePreview } from "@/components/signature/SignaturePreview";
import { Button } from "@/components/ui/button";
import { SignatureData } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PersonalDetailsStepProps {
  data: SignatureData;
  template: string;
  onChange: (data: SignatureData) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PersonalDetailsStep({
  data,
  template,
  onChange,
  onNext,
  onBack,
}: PersonalDetailsStepProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Form */}
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
          <p className="text-gray-500">Fill in your information to customize your signature.</p>
        </div>

        <SignatureForm data={data} onChange={onChange} />

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={onNext}>
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Right Column: Preview */}
      <div className="hidden lg:block space-y-6 sticky top-8 h-fit">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Live Preview</h3>
          <SignaturePreview data={data} template={template} />
        </div>
      </div>
    </div>
  );
}
