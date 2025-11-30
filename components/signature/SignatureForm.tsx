"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignatureData } from "@/lib/types";
import { ChangeEvent } from "react";

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

export function SignatureForm({ data, onChange }: SignatureFormProps) {
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

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
      
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
