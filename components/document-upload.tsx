"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCaregiverStore } from "@/lib/stores/caregiver-store";
import { Upload, FileText, Trash2, Download, X } from "lucide-react";

interface DocumentUploadProps {
  documentType: string;
  title: string;
  description: string;
  required?: boolean;
}

export function DocumentUpload({
  documentType,
  title,
  description,
  required = false,
}: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState<any>(null);

  const { toast } = useToast();
  const { uploadDocument, deleteDocument } = useCaregiverStore();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Validate file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Only PDF, JPG, and PNG files are allowed",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const result = await uploadDocument(file, documentType);
      setUploadedDocument(result.document);
      setFile(null);
      setUploadProgress(100);

      toast({
        title: "Upload successful",
        description: "Your document has been uploaded successfully",
      });

      // Reset file input
      const fileInput = document.getElementById(
        `file-${documentType}`
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async () => {
    if (!uploadedDocument) return;

    try {
      await deleteDocument(uploadedDocument.id);
      setUploadedDocument(null);

      toast({
        title: "Document deleted",
        description: "Your document has been removed",
      });
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete document",
        variant: "destructive",
      });
    }
  };

  const removeSelectedFile = () => {
    setFile(null);
    const fileInput = document.getElementById(
      `file-${documentType}`
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="border rounded-[10-px] p-4 space-y-4">
      <div>
        <h3 className="font-medium text-gray-900">
          {title} {required && <span className="text-red-500">*</span>}
        </h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {!uploadedDocument ? (
        <div>
          {!file ? (
            <div>
              <Input
                id={`file-${documentType}`}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label
                htmlFor={`file-${documentType}`}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, PNG (MAX. 5MB)
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeSelectedFile}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full ulo-button-primary"
              >
                {isUploading
                  ? `Uploading... ${uploadProgress}%`
                  : "Upload Document"}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">
                  {uploadedDocument.originalName}
                </p>
                <p className="text-xs text-green-600">
                  Uploaded successfully •{" "}
                  {uploadedDocument.verified
                    ? "Verified"
                    : "Pending verification"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href={uploadedDocument.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                <Download className="w-4 h-4" />
              </a>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
