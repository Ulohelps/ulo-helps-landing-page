"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface VerificationResultProps {
  result: any;
  onReset: () => void;
}

export function VerificationResult({
  result,
  onReset,
}: VerificationResultProps) {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Verification Successful
        </h2>
        <p className="text-gray-600 mt-2">
          Your document has been successfully verified
        </p>
      </div>

      <div className="border rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm">
            <span className="text-gray-500">Full Name:</span>
            <p className="font-medium text-gray-800">
              {result.fullName || "N/A"}
            </p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Document Type:</span>
            <p className="font-medium text-gray-800">
              {result.documentType || "Nigerian ID"}
            </p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Document Number:</span>
            <p className="font-medium text-gray-800">
              {result.documentNumber || "N/A"}
            </p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Date of Birth:</span>
            <p className="font-medium text-gray-800">
              {formatDate(result.dateOfBirth)}
            </p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Gender:</span>
            <p className="font-medium text-gray-800">
              {result.gender || "N/A"}
            </p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Expiry Date:</span>
            <p className="font-medium text-gray-800">
              {formatDate(result.dateOfExpiry)}
            </p>
          </div>
        </div>
      </div>

      {result.fullDocumentFrontImage && (
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Document Image
          </h3>
          <div className="relative h-48 w-full bg-gray-100 rounded overflow-hidden">
            <Image
              src={result.fullDocumentFrontImage || "/placeholder.svg"}
              alt="Document Front"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-3">
        <Button
          onClick={() => setShowDetails(!showDetails)}
          variant="outline"
          className="w-full"
        >
          {showDetails ? "Hide Technical Details" : "Show Technical Details"}
        </Button>

        {showDetails && (
          <div className="border rounded-lg p-4 bg-gray-50 max-h-60 overflow-auto">
            <pre className="text-xs text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <Button
          onClick={onReset}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Verify Another Document
        </Button>
      </div>
    </div>
  );
}
