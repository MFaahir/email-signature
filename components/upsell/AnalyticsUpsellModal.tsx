"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart3, Check, MousePointer2, Globe, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";

interface AnalyticsUpsellModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AnalyticsUpsellModal({ open, onOpenChange }: AnalyticsUpsellModalProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push("/pricing");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Track Your Signature Performance
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Unlock powerful analytics to see how your email signature is performing.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">1,245</div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Email Opens
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-blue-600">12.5%</div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Click Rate
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { icon: MousePointer2, text: "Track link clicks & engagement" },
              { icon: Globe, text: "See where your recipients are located" },
              { icon: Smartphone, text: "Know which devices they use" },
              { icon: Check, text: "Unlimited signatures included" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-blue-600" />
                </div>
                {feature.text}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button onClick={handleUpgrade} className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base">
            Enable Analytics - $4.99/mo
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full">
            Maybe later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
