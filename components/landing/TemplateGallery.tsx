"use client";

import { SignaturePreview } from "@/components/signature/SignaturePreview";
import { SignatureData } from "@/lib/types";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const dummyData: SignatureData = {
  name: "Sarah Johnson",
  title: "Product Designer",
  company: "Creative Studio",
  email: "sarah@example.com",
  phone: "+1 (555) 123-4567",
  website: "www.creativestudio.com",
  linkedin: "linkedin.com/in/sarah",
  twitter: "twitter.com/sarah",
  github: "",
  logo: "",
  accentColor: "#2563eb",
};

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

export function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(templates.map((t) => t.category)))];

  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter((t) => t.category === activeCategory);

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white" id="templates">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stunning Templates for Every Style
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our professionally designed collection. Fully customizable to match your brand.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 h-[280px] flex items-center justify-center overflow-hidden bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="transform scale-[0.55] origin-center w-[600px] flex justify-center pointer-events-none select-none">
                    <SignaturePreview data={dummyData} template={template.id} />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-xs text-gray-500">{template.category}</p>
                </div>
                <Link href={`/generator?template=${template.id}`}>
                  <Button size="sm" variant="outline" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Use This
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/generator">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full">
              View All Templates <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
