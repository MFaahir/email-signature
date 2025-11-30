export interface SignatureData {
  name: string;
  title: string;
  company: string;
  website: string;
  email: string;
  phone: string;
  linkedin: string;
  twitter: string;
  github: string;
  logo: string;
  accentColor: string;
  // Legacy fields for backward compatibility
  fullName?: string;
  jobTitle?: string;
  color?: string;
  socialLinks?: {
    linkedin: string;
    twitter: string;
    instagram: string;
  };
}

export const initialSignatureData: SignatureData = {
  name: "Jane Doe",
  title: "Software Engineer",
  company: "Acme Corp",
  website: "https://example.com",
  email: "jane@example.com",
  phone: "+1 (555) 123-4567",
  linkedin: "",
  twitter: "",
  github: "",
  logo: "",
  accentColor: "#2563eb", // blue-600
};
