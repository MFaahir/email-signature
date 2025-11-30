"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Copy, Loader2, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { AnalyticsUpsellModal } from "@/components/upsell/AnalyticsUpsellModal";

interface Signature {
  _id: string;
  name: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
}

export function SignatureList() {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [limit, setLimit] = useState(3);
  const [plan, setPlan] = useState("free");
  const router = useRouter();

  useEffect(() => {
    fetchSignatures();
  }, []);

  const fetchSignatures = async () => {
    try {
      const response = await fetch("/api/signatures");
      const data = await response.json();
      if (data.signatures) {
        setSignatures(data.signatures);
        setLimit(data.limit);
        setPlan(data.plan);
      }
    } catch (error) {
      console.error("Error fetching signatures:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`/api/signatures/${deleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSignatures(signatures.filter((s) => s._id !== deleteId));
        setDeleteId(null);
      }
    } catch (error) {
      console.error("Error deleting signature:", error);
    }
  };

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleCreateNew = (e: React.MouseEvent) => {
    if (plan === "free" && signatures.length >= limit) {
      e.preventDefault();
      setShowUpgradeModal(true);
    }
  };

  const handleDuplicate = async (signature: Signature) => {
    // Check limit first
    if (plan === "free" && signatures.length >= limit) {
      setShowUpgradeModal(true);
      return;
    }

    try {
      // Fetch full signature data first
      const res = await fetch(`/api/signatures/${signature._id}`);
      const data = await res.json();
      
      if (!data.signature) return;

      const newSignature = {
        name: `${data.signature.name} (Copy)`,
        templateId: data.signature.templateId,
        signatureData: data.signature.signatureData,
        trackingEnabled: false, // Reset tracking for copy
      };

      const createRes = await fetch("/api/signatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSignature),
      });

      if (createRes.ok) {
        fetchSignatures();
      }
    } catch (error) {
      console.error("Error duplicating signature:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnalyticsUpsellModal open={showUpgradeModal} onOpenChange={setShowUpgradeModal} />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Signatures</h2>
          <p className="text-gray-500">
            {signatures.length} / {plan === "free" ? limit : "∞"} signatures used
          </p>
        </div>
        <Button asChild onClick={handleCreateNew}>
          <Link href="/generator">
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </Link>
        </Button>
      </div>

      {signatures.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No signatures yet</h3>
          <p className="text-gray-500 mb-6">Create your first professional email signature today.</p>
          <Button asChild>
            <Link href="/generator">Create Signature</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatures.map((signature) => (
            <div
              key={signature._id}
              className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 truncate pr-4">
                  {signature.name}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/generator?id=${signature._id}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicate(signature)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => setDeleteId(signature._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-4">
                  Template: <span className="capitalize">{signature.templateId.replace("-", " ")}</span>
                </div>
                <div className="text-xs text-gray-400">
                  Last updated: {new Date(signature.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t flex gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/generator?id=${signature._id}`}>
                    Edit Signature
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your signature.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
