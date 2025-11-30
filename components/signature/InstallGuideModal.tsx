"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { emailClientGuides, type EmailClient } from "@/lib/email-client-guides";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: EmailClient | null;
}

export function InstallGuideModal({ isOpen, onClose, client }: InstallGuideModalProps) {
  if (!client) return null;

  const guide = emailClientGuides[client];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <span>{guide.icon}</span>
            <span>Install in {guide.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {guide.steps.map((step, index) => (
            <div
              key={index}
              className={`flex gap-4 ${
                step.isWarning ? "bg-amber-50 border border-amber-200 p-4 rounded-lg" : ""
              }`}
            >
              <div className="flex-shrink-0">
                {step.isWarning ? (
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {index + 1}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900">Pro Tip</p>
              <p className="text-sm text-green-700">
                Make sure to copy your signature HTML before starting. You can always come back to
                this guide!
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
