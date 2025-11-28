export interface SignatureData {
  fullName: string;
  jobTitle: string;
  company: string;
  website: string;
  email: string;
  phone: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  logo: string;
  color: string;
}

export const initialSignatureData: SignatureData = {
  fullName: "Jane Doe",
  jobTitle: "Software Engineer",
  company: "Acme Corp",
  website: "https://example.com",
  email: "jane@example.com",
  phone: "+1 (555) 123-4567",
  socialLinks: {
    linkedin: "",
    twitter: "",
    instagram: "",
  },
  logo: "",
  color: "#2563eb", // blue-600
};
