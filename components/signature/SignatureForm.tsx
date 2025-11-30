"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SignatureData } from "@/lib/types";
import { ChangeEvent, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

export function SignatureForm({ data, onChange }: SignatureFormProps) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectError, setDetectError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          ...data,
          logo: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoFill = async () => {
    if (!data.website) {
      setDetectError("Please enter a website URL first");
      return;
    }

    setIsDetecting(true);
    setDetectError(null);

    try {
      const response = await fetch('/api/brand-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: data.website }),
      });

      if (!response.ok) {
        throw new Error('Failed to detect brand information');
      }

      const brandInfo = await response.json();

      // Update form with detected information
      onChange({
        ...data,
        company: brandInfo.companyName || data.company,
        logo: brandInfo.logo || brandInfo.favicon || data.logo,
        accentColor: brandInfo.brandColors?.[0] || data.accentColor,
        linkedin: brandInfo.socialLinks?.linkedin || data.linkedin,
        twitter: brandInfo.socialLinks?.twitter || data.twitter,
        github: brandInfo.socialLinks?.github || data.github,
      });
    } catch (error) {
      console.error('Error detecting brand:', error);
      setDetectError('Failed to detect brand information. Please try again.');
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Enter Your Details</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAutoFill}
          disabled={isDetecting || !data.website}
          className="gap-2"
        >
          {isDetecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Detecting...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Auto-fill from website
            </>
          )}
        </Button>
      </div>

      {detectError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
          {detectError}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Jane Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Software Engineer"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={data.company}
            onChange={handleChange}
            placeholder="Acme Corp"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="jane@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website URL</Label>
          <Input
            id="website"
            name="website"
            type="url"
            value={data.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Social Media</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            name="linkedin"
            value={data.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
          />
          <Input
            name="twitter"
            value={data.twitter}
            onChange={handleChange}
            placeholder="Twitter URL"
          />
          <Input
            name="github"
            value={data.github}
            onChange={handleChange}
            placeholder="GitHub URL"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="logo">Logo (Optional)</Label>
          <Input
            id="logo"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accentColor">Accent Color</Label>
          <div className="flex items-center gap-2">
            <Input
              id="accentColor"
              name="accentColor"
              type="color"
              value={data.accentColor}
              onChange={handleChange}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              name="accentColor"
              value={data.accentColor}
              onChange={handleChange}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
