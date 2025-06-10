"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  Camera,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useCaregiverStore } from "@/lib/stores/caregiver-store";

// Define the YouverifySDK type
declare global {
  interface Window {
    YouverifySDK?: any;
  }
}

type VerificationStatus =
  | "idle"
  | "loading"
  | "initializing"
  | "capturing"
  | "success"
  | "error";

interface VerificationResult {
  documentNumber?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  dateOfBirth?: string;
  dateOfExpiry?: string;
  gender?: string;
  documentType?: string;
  issuingCountry?: string;
}

export function DocumentVerification() {
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const { toast } = useToast();
  const [showCameraHelp, setShowCameraHelp] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const youverifyModuleRef = useRef<any>(null);
  const {verifyCaregiversCapturedDocument} = useCaregiverStore();

  // Load the Youverify SDK script
  useEffect(() => {
    if (typeof window !== "undefined" && !window.YouverifySDK) {
      setStatus("loading");
      const script = document.createElement("script");
      script.src = "https://unpkg.com/youverify-web-sdk@2.1.4/dist/index.js";
      script.async = true;
      script.onload = () => {
        setSdkLoaded(true);
        setStatus("idle");
      };
      script.onerror = () => {
        setStatus("error");
        setError("Failed to load verification SDK. Please try again later.");
      };
      document.body.appendChild(script);
    } else if (window.YouverifySDK) {
      setSdkLoaded(true);
    }

    return () => {
      // Clean up if component unmounts
      if (typeof window !== "undefined" && window.YouverifySDK) {
        // Any cleanup needed
      }
    };
  }, []);

  const startVerification = async () => {
    if (!sdkLoaded || !window.YouverifySDK) {
      toast({
        title: "SDK not loaded",
        description:
          "Please wait for the verification system to load or refresh the page.",
        variant: "destructive",
      });
      return;
    }

    try {
      setStatus("initializing");
      setError(null);
      setCameraError(null);

      // Initialize the document capture module
      const documentCaptureModule = new window.YouverifySDK.documentCapture({
        publicMerchantKey:
          process.env.NEXT_PUBLIC_YOUVERIFY_MERCHANT_KEY || "test_public_key",
        sandboxEnvironment: process.env.NODE_ENV !== "production", // Use sandbox in development
        personalInformation: {
          firstName: "", // Can be pre-filled if you have user data
        },
        appearance: {
          greeting:
            "We need to capture your document for verification. It will only take a moment.",
          actionText: "Capture Document",
          buttonBackgroundColor: "#2563EB", // Blue-600
          buttonTextColor: "#ffffff",
          primaryColor: "#2563EB",
        },
        countries: [
          {
            countryCode: "NG",
            idTypes: ["passport", "Driving License", "NIN", "Residence Permit"],
          },
        ],
        onSuccess: async (data: any) => {
          console.log("Verification successful:", data);
          await verifyCaregiversCapturedDocument({
            documentNumber: data.documentNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            fullName: data.fullName,
            dateOfBirth: data.dateOfBirth,
            dateOfExpiry: data.dateOfExpiry,
            gender: data.gender,
            documentType: data.documentType,
            issuingCountry: data.issuingCountry,
          });
          setStatus("success");
          toast({
            title: "Verification Successful",
            description: "Your document has been successfully verified.",
          });
        },
        onFailure: (error: any) => {
          console.error("Verification failed:", error);

          // Check if the error is related to camera access
          if (
            error.message?.toLowerCase().includes("camera") ||
            error.message?.toLowerCase().includes("permission") ||
            error.message?.toLowerCase().includes("device") ||
            error.message?.toLowerCase().includes("media")
          ) {
            setCameraError(
              error.message ||
                "Camera access failed. Please check your camera permissions."
            );
            setShowCameraHelp(true);
          }

          setStatus("error");
          setError(
            error.message || "Document verification failed. Please try again."
          );
          toast({
            title: "Verification Failed",
            description:
              error.message ||
              "Document verification failed. Please try again.",
            variant: "destructive",
          });
        },
        onClose: () => {
          console.log("Modal closed");
          if (status !== "success" && status !== "error") {
            setStatus("idle");
            toast({
              title: "Verification Cancelled",
              description:
                "You closed the verification window. You can try again when ready.",
            });
          }
        },
      });

      // Store the module reference for potential debugging
      youverifyModuleRef.current = documentCaptureModule;

      // Initialize the module
      documentCaptureModule.initialize();

      // Test camera access before starting the document capture
      try {
        await navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            // Camera access successful, release the stream
            stream.getTracks().forEach((track) => track.stop());

            // Start the document capture process
            setStatus("capturing");
            documentCaptureModule.start();
          })
          .catch((err) => {
            console.error("Camera access error:", err);
            setCameraError(
              `Camera access denied: ${
                err.message || "Please enable camera permissions"
              }`
            );
            setShowCameraHelp(true);
            setStatus("error");
            throw new Error(
              "Camera access denied. Please check your browser permissions."
            );
          });
      } catch (cameraErr: any) {
        console.error("Camera test failed:", cameraErr);
        setCameraError(cameraErr.message || "Camera access failed");
        setShowCameraHelp(true);
        setStatus("error");
        throw cameraErr;
      }
    } catch (err: any) {
      console.error("Error initializing verification:", err);
      setStatus("error");
      setError(
        err.message || "Failed to initialize verification. Please try again."
      );
      toast({
        title: "Initialization Error",
        description:
          err.message || "Failed to initialize verification. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetVerification = () => {
    setStatus("idle");
    setError(null);
    setResult(null);
  };

  const checkCameraPermissions = async () => {
    try {
      const result = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });
      return result.state;
    } catch (error) {
      console.error("Permission API not supported:", error);
      return "unknown";
    }
  };

  const testCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Camera works! Clean up by stopping all tracks
      stream.getTracks().forEach((track) => track.stop());
      toast({
        title: "Camera Access Successful",
        description:
          "Your camera is working properly. You can now proceed with verification.",
      });
      setCameraError(null);
      return true;
    } catch (err: any) {
      console.error("Camera test failed:", err);
      setCameraError(`Camera test failed: ${err.message}`);
      toast({
        title: "Camera Access Failed",
        description:
          err.message ||
          "Could not access your camera. Please check your permissions.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <div className="space-y-6">
      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Verification Failed</AlertTitle>
          <AlertDescription>
            {error || "An unknown error occurred. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {status === "success" && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">
            Verification Successful
          </AlertTitle>
          <AlertDescription className="text-green-700">
            Your document has been successfully verified.
          </AlertDescription>
        </Alert>
      )}

      {status === "success" && result && (
        <Card className="p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-3">
            Verification Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {result.fullName && (
              <div>
                <span className="text-gray-500">Full Name:</span>{" "}
                <span className="font-medium">{result.fullName}</span>
              </div>
            )}
            {result.documentNumber && (
              <div>
                <span className="text-gray-500">Document Number:</span>{" "}
                <span className="font-medium">{result.documentNumber}</span>
              </div>
            )}
            {result.documentType && (
              <div>
                <span className="text-gray-500">Document Type:</span>{" "}
                <span className="font-medium">{result.documentType}</span>
              </div>
            )}
            {result.dateOfBirth && (
              <div>
                <span className="text-gray-500">Date of Birth:</span>{" "}
                <span className="font-medium">{result.dateOfBirth}</span>
              </div>
            )}
            {result.dateOfExpiry && (
              <div>
                <span className="text-gray-500">Expiry Date:</span>{" "}
                <span className="font-medium">{result.dateOfExpiry}</span>
              </div>
            )}
            {result.gender && (
              <div>
                <span className="text-gray-500">Gender:</span>{" "}
                <span className="font-medium">{result.gender}</span>
              </div>
            )}
            {result.issuingCountry && (
              <div>
                <span className="text-gray-500">Issuing Country:</span>{" "}
                <span className="font-medium">{result.issuingCountry}</span>
              </div>
            )}
          </div>
        </Card>
      )}

      <div className="flex flex-col items-center justify-center py-6">
        {status === "loading" || status === "initializing" ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">
              {status === "loading"
                ? "Loading verification system..."
                : "Initializing verification..."}
            </p>
          </div>
        ) : status === "capturing" ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Camera className="h-8 w-8 text-blue-600" />
            <p className="text-gray-600">Document capture in progress...</p>
          </div>
        ) : status === "success" ? (
          <Button
            onClick={resetVerification}
            variant="outline"
            className="mt-4"
          >
            Verify Another Document
          </Button>
        ) : (
          <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ready to verify your document?
              </h3>
              <p className="text-gray-600 mb-4">
                Click the button below to start the verification process. You'll
                need to allow camera access to capture your document.
              </p>
            </div>

            <Button
              onClick={startVerification}
              disabled={!sdkLoaded}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start Document Verification
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={showCameraHelp} onOpenChange={setShowCameraHelp}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Camera Access Required</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <p>
                  The document verification process requires access to your
                  camera, but we couldn't access it.
                  {cameraError && (
                    <span className="block mt-2 text-red-500 font-medium">
                      {cameraError}
                    </span>
                  )}
                </p>

                <div className="bg-amber-50 p-4 rounded-md">
                  <h4 className="font-medium text-amber-800 mb-2">
                    Troubleshooting Steps:
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-amber-700">
                    <li>Make sure your camera is connected and working</li>
                    <li>
                      Check that no other application is using your camera
                    </li>
                    <li>
                      Ensure your browser has permission to access your camera:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>
                          Look for the camera icon in your browser's address bar
                        </li>
                        <li>
                          Check your browser's site settings for this website
                        </li>
                        <li>On Windows, check Privacy Settings &gt; Camera</li>
                        <li>
                          On Mac, check System Preferences &gt; Security &amp;
                          Privacy &gt; Camera
                        </li>
                      </ul>
                    </li>
                    <li>
                      Try using a different browser (Chrome or Firefox
                      recommended)
                    </li>
                    <li>Try restarting your browser or computer</li>
                  </ol>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={async () => {
                      const result = await testCameraAccess();
                      if (result) {
                        setShowCameraHelp(false);
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Test Camera Access
                  </Button>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowCameraHelp(false);
                setStatus("idle");
                resetVerification();
              }}
            >
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
