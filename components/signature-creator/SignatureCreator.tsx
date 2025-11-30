"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TemplateSelector } from "./TemplateSelector";
import { AutoFillStep } from "./AutoFillStep";
import { PersonalDetailsStep } from "./PersonalDetailsStep";
import { SaveExportStep } from "./SaveExportStep";
import { AnalyticsUpsellModal } from "@/components/upsell/AnalyticsUpsellModal";
import { SignatureData, initialSignatureData } from "@/lib/types";

export function SignatureCreator() {
  const [step, setStep] = useState(1);
  const [template, setTemplate] = useState("simple");
  const [data, setData] = useState<SignatureData>(initialSignatureData);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("signatureData");
    const savedTemplate = localStorage.getItem("signatureTemplate");
    
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved signature data");
      }
    }
    
    if (savedTemplate) {
      setTemplate(savedTemplate);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("signatureData", JSON.stringify(data));
  }, [data]);

  // Save template to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("signatureTemplate", template);
  }, [template]);

  const [showUpsell, setShowUpsell] = useState(false);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSaveSuccess = () => {
    setShowUpsell(true);
  };

  const handleAutoFill = async (url: string) => {
    try {
      const response = await fetch("/api/brand-detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      
      const brandData = await response.json();
      
      setData((prev) => ({
        ...prev,
        website: url,
        company: brandData.companyName || prev.company,
        logo: brandData.logo || prev.logo,
        accentColor: brandData.colors?.[0] || prev.accentColor,
        linkedin: brandData.socialLinks?.linkedin || prev.linkedin,
        twitter: brandData.socialLinks?.twitter || prev.twitter,
        github: brandData.socialLinks?.github || prev.github,
      }));

      nextStep();
    } catch (error) {
      console.error("Auto-fill failed:", error);
      throw error;
    }
  };

  const steps = [
    { id: 1, component: TemplateSelector, props: { selectedTemplate: template, onSelect: setTemplate, onNext: nextStep } },
    { id: 2, component: AutoFillStep, props: { onAutoFill: handleAutoFill, onSkip: nextStep } },
    { id: 3, component: PersonalDetailsStep, props: { data, template, onChange: setData, onNext: nextStep, onBack: prevStep } },
    { id: 4, component: SaveExportStep, props: { data, template, onBack: prevStep, onSaveSuccess: handleSaveSuccess } },
  ];

  const CurrentStep = steps[step - 1].component;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <AnalyticsUpsellModal open={showUpsell} onOpenChange={setShowUpsell} />
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          <span>Template</span>
          <span>Auto-fill</span>
          <span>Details</span>
          <span>Save</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* @ts-ignore */}
          <CurrentStep {...steps[step - 1].props} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
