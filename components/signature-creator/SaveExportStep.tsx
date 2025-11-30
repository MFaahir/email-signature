"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignaturePreview } from "@/components/signature/SignaturePreview";
import { ActionButtons } from "@/components/signature/ActionButtons";
import { SignatureData } from "@/lib/types";
import { ArrowLeft, Check, Loader2, Save } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface SaveExportStepProps {
  data: SignatureData;
  template: string;
  onBack: () => void;
  onSaveSuccess?: () => void;
}

export function SaveExportStep({ data, template, onBack, onSaveSuccess }: SaveExportStepProps) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedSignatureId, setSavedSignatureId] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string>("free");
  const previewRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch user plan on mount
  useEffect(() => {
    fetch("/api/signatures/plan") // Assuming an endpoint to get user plan
      .then((res) => res.json())
      .then((data) => {
        if (data.plan) setUserPlan(data.plan);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    if (!name) return;

    setSaving(true);
    try {
      const response = await fetch("/api/signatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          templateId: template,
          signatureData: data,
          trackingEnabled: userPlan === "premium",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSaved(true);
        setSavedSignatureId(result.signature._id);
        if (onSaveSuccess) {
          onSaveSuccess();
        }
        // Refresh dashboard data if we navigate there later
        router.refresh();
      } else {
        const error = await response.json();
        if (error.limitReached) {
          alert(error.message); // TODO: Replace with upgrade modal
        } else {
          alert("Failed to save signature");
        }
      }
    } catch (error) {
      console.error("Error saving signature:", error);
      alert("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Save & Export</h2>
        <p className="text-gray-500">Name your signature and install it in your email client.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signatureName">Signature Name</Label>
              <div className="flex gap-2">
                <Input
                  id="signatureName"
                  placeholder="e.g. Work Signature"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={saved}
                />
                <Button
                  onClick={handleSave}
                  disabled={!name || saving || saved}
                  className={saved ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : saved ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {saved && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-600 font-medium"
                >
                  Signature saved successfully!
                </motion.p>
              )}
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-4">Export Options</h3>
              <ActionButtons 
                previewRef={previewRef} 
                signatureId={savedSignatureId || undefined}
                enableTracking={userPlan === "premium" && !!savedSignatureId}
              />
            </div>
          </div>

          <Button variant="outline" onClick={onBack} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Editing
          </Button>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm h-fit">
          <h3 className="text-lg font-semibold mb-3">Final Preview</h3>
          <SignaturePreview ref={previewRef} data={data} template={template} />
        </div>
      </div>
    </div>
  );
}
