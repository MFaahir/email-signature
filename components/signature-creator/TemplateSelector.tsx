"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const templates = [
  { id: "simple", name: "Simple", category: "Classic" },
  { id: "minimal", name: "Minimal", category: "Classic" },
  { id: "colorful", name: "Colorful", category: "Classic" },
  { id: "corporate", name: "Corporate", category: "Professional" },
  { id: "elegant", name: "Elegant", category: "Professional" },
  { id: "bold", name: "Bold", category: "Modern" },
  { id: "creative", name: "Creative", category: "Modern" },
  { id: "modern-gradient", name: "Modern Gradient", category: "Modern" },
  { id: "rounded-icons", name: "Rounded Icons", category: "Friendly" },
  { id: "photo-left", name: "Photo Left", category: "Photo" },
  { id: "photo-top", name: "Photo Top", category: "Photo" },
  { id: "no-photo", name: "No Photo", category: "Minimal" },
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}

export function TemplateSelector({ selectedTemplate, onSelect, onNext }: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
        <p className="text-gray-500">Select a design to start with. You can change this later.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <motion.button
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onSelect(template.id);
              // Small delay to show selection before moving next
              setTimeout(onNext, 500);
            }}
            className={`relative p-4 rounded-xl border-2 text-left transition-all ${
              selectedTemplate === template.id
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-blue-200 hover:shadow-sm"
            }`}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-xs">
              Preview
            </div>
            <div className="font-semibold text-gray-900">{template.name}</div>
            <div className="text-xs text-gray-500">{template.category}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
