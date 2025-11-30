"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface AutoFillStepProps {
  onAutoFill: (url: string) => Promise<void>;
  onSkip: () => void;
}

export function AutoFillStep({ onAutoFill, onSkip }: AutoFillStepProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      await onAutoFill(url);
    } catch (err) {
      setError("Failed to fetch brand details. Please try again or skip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      <div>
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Auto-fill Details</h2>
        <p className="text-gray-500">
          Enter your website URL and we'll magically extract your logo, colors, and social links.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12 text-lg text-center"
            disabled={loading}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-lg"
          disabled={!url || loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Detecting Brand...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Auto-fill Details
            </>
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-50 px-2 text-gray-500">Or</span>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={onSkip}
        className="text-gray-500 hover:text-gray-900"
        disabled={loading}
      >
        Skip and add manually
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
