// // components/IdVerification.tsx
// "use client";

// import React, { useState, useRef, useCallback } from "react";
// import {
//   Camera,
//   Upload,
//   CheckCircle,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";
// import { useCaregiverStore } from "@/lib/stores/caregiver-store";

// interface VerificationStep {
//   title: string;
//   description: string;
//   completed: boolean;
// }

// interface IdVerificationProps {
//   onComplete: () => void;
// }

// export default function IdVerification({ onComplete }: IdVerificationProps) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [documentType, setDocumentType] = useState<
//     "NIN" | "PASSPORT" | "DRIVERS_LICENSE"
//   >("NIN");
//   const [documentImage, setDocumentImage] = useState<string | null>(null);
//   const [selfieImage, setSelfieImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [verificationResult, setVerificationResult] = useState<any>(null);

//   const documentInputRef = useRef<HTMLInputElement>(null);
//   const selfieInputRef = useRef<HTMLInputElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isCameraActive, setIsCameraActive] = useState(false);

//   const steps: VerificationStep[] = [
//     {
//       title: "Upload ID Document",
//       description: "Take a clear photo of your ID document",
//       completed: !!documentImage,
//     },
//     {
//       title: "Take Selfie",
//       description: "Take a selfie for identity verification",
//       completed: !!selfieImage,
//     },
//     {
//       title: "Verification",
//       description: "We'll verify your identity",
//       completed: !!verificationResult?.success,
//     },
//   ];

//   const { verifyCaregivers } = useCaregiverStore();

//   const convertToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const base64 = reader.result as string;
//         // Remove data:image/jpeg;base64, prefix
//         resolve(base64.split(",")[1]);
//       };
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleDocumentUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     try {
//       const base64 = await convertToBase64(file);
//       setDocumentImage(base64);
//       setError(null);
//     } catch (error) {
//       setError("Failed to process image");
//     }
//   };

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           width: 640,
//           height: 480,
//           facingMode: "user", // Front camera for selfie
//         },
//       });

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         setIsCameraActive(true);
//       }
//     } catch (error) {
//       setError("Camera access denied");
//     }
//   };

//   const capturePhoto = () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     context?.drawImage(video, 0, 0);

//     // Convert to base64
//     const base64 = canvas.toDataURL("image/jpeg", 0.8).split(",")[1];
//     setSelfieImage(base64);

//     // Stop camera
//     const stream = video.srcObject as MediaStream;
//     stream?.getTracks().forEach((track) => track.stop());
//     setIsCameraActive(false);
//   };

//   const handleSelfieUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     try {
//       const base64 = await convertToBase64(file);
//       setSelfieImage(base64);
//       setError(null);
//     } catch (error) {
//       setError("Failed to process image");
//     }
//   };

//   const performVerification = async () => {
//     if (!documentImage || !selfieImage) {
//       setError("Please complete both steps before verification");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {

//       console.log({
//         documentType,
//         documentImage,
//         selfieImage,
//       });
//       const result = await verifyCaregivers({
//         documentType,
//         documentImage,
//         selfieImage,
//       });

//       console.log(result);
//     } catch (error) {
//       setError("Network error. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (currentStep === 1 && documentImage) {
//       setCurrentStep(2);
//     } else if (currentStep === 2 && selfieImage) {
//       performVerification();
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select Document Type
//               </label>
//               <select
//                 value={documentType}
//                 onChange={(e) => setDocumentType(e.target.value as any)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="NIN">
//                   National Identification Number (NIN)
//                 </option>
//                 <option value="PASSPORT">International Passport</option>
//                 <option value="DRIVERS_LICENSE">Driver's License</option>
//               </select>
//             </div>

//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//               {documentImage ? (
//                 <div className="space-y-4">
//                   <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
//                   <p className="text-green-600 font-medium">
//                     Document uploaded successfully!
//                   </p>
//                   <button
//                     onClick={() => documentInputRef.current?.click()}
//                     className="text-blue-600 hover:text-blue-700"
//                   >
//                     Change document
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <Upload className="w-16 h-16 text-gray-400 mx-auto" />
//                   <div>
//                     <button
//                       onClick={() => documentInputRef.current?.click()}
//                       className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//                     >
//                       Upload Document Photo
//                     </button>
//                     <p className="text-sm text-gray-500 mt-2">
//                       Ensure your document is clear and all corners are visible
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <input
//                 ref={documentInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleDocumentUpload}
//                 className="hidden"
//               />
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Take a Selfie
//               </h3>
//               <p className="text-gray-600">
//                 Look directly at the camera and ensure your face is clearly
//                 visible
//               </p>
//             </div>

//             {selfieImage ? (
//               <div className="text-center space-y-4">
//                 <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
//                 <p className="text-green-600 font-medium">
//                   Selfie captured successfully!
//                 </p>
//                 <div className="flex gap-4 justify-center">
//                   <button
//                     onClick={startCamera}
//                     className="text-blue-600 hover:text-blue-700"
//                   >
//                     Retake with camera
//                   </button>
//                   <button
//                     onClick={() => selfieInputRef.current?.click()}
//                     className="text-blue-600 hover:text-blue-700"
//                   >
//                     Upload new photo
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {isCameraActive ? (
//                   <div className="text-center space-y-4">
//                     <video
//                       ref={videoRef}
//                       autoPlay
//                       muted
//                       className="w-full max-w-md mx-auto rounded-lg"
//                     />
//                     <button
//                       onClick={capturePhoto}
//                       className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
//                     >
//                       Capture Photo
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="text-center space-y-4">
//                     <Camera className="w-16 h-16 text-gray-400 mx-auto" />
//                     <div className="flex gap-4 justify-center">
//                       <button
//                         onClick={startCamera}
//                         className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//                       >
//                         Use Camera
//                       </button>
//                       <button
//                         onClick={() => selfieInputRef.current?.click()}
//                         className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
//                       >
//                         Upload Photo
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             <input
//               ref={selfieInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleSelfieUpload}
//               className="hidden"
//             />
//             <canvas ref={canvasRef} className="hidden" />
//           </div>
//         );

//       case 3:
//         return (
//           <div className="text-center space-y-6">
//             {verificationResult?.success ? (
//               <>
//                 <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
//                 <h3 className="text-2xl font-bold text-green-600">
//                   Verification Successful!
//                 </h3>
//                 <p className="text-gray-600">
//                   Your identity has been verified successfully. You can now
//                   proceed.
//                 </p>
//                 {verificationResult.data && (
//                   <div className="bg-green-50 p-4 rounded-lg text-left">
//                     <h4 className="font-medium text-green-800 mb-2">
//                       Verified Information:
//                     </h4>
//                     <p className="text-sm text-green-700">
//                       Name: {verificationResult.data.extractedInfo?.firstName}{" "}
//                       {verificationResult.data.extractedInfo?.lastName}
//                     </p>
//                     <p className="text-sm text-green-700">
//                       Document Verified:{" "}
//                       {verificationResult.data.documentVerified ? "Yes" : "No"}
//                     </p>
//                     <p className="text-sm text-green-700">
//                       Face Match:{" "}
//                       {verificationResult.data.faceMatch ? "Yes" : "No"}
//                     </p>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <>
//                 <Loader2 className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
//                 <h3 className="text-xl font-medium text-gray-900">
//                   Verifying Your Identity...
//                 </h3>
//                 <p className="text-gray-600">
//                   Please wait while we process your documents.
//                 </p>
//               </>
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       {/* Progress Steps */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           {steps.map((step, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
//                   step.completed
//                     ? "bg-green-500 text-white"
//                     : currentStep === index + 1
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-300 text-gray-600"
//                 }`}
//               >
//                 {step.completed ? (
//                   <CheckCircle className="w-5 h-5" />
//                 ) : (
//                   index + 1
//                 )}
//               </div>
//               <p className="text-xs text-gray-600 mt-2 text-center max-w-20">
//                 {step.title}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
//           <AlertCircle className="w-5 h-5 text-red-500" />
//           <span className="text-red-700">{error}</span>
//         </div>
//       )}

//       {/* Step Content */}
//       <div className="mb-8">{renderStepContent()}</div>

//       {/* Navigation Buttons */}
//       {currentStep < 3 && (
//         <div className="flex gap-4 justify-between">
//           <button
//             onClick={prevStep}
//             disabled={currentStep === 1}
//             className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>

//           <button
//             onClick={nextStep}
//             disabled={
//               isLoading ||
//               (currentStep === 1 && !documentImage) ||
//               (currentStep === 2 && !selfieImage)
//             }
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
//             {currentStep === 2 ? "Verify Identity" : "Next"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// components/IdVerification.tsx
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useCaregiverStore } from '@/lib/stores/caregiver-store';

interface VerificationStep {
  title: string;
  description: string;
  completed: boolean;
}

interface IdVerificationProps {
  caregiverId: string;
  onComplete: () => void;
  apiBaseUrl: string;
  authToken: string;
}

export default function IdVerification({ 
  caregiverId, 
  onComplete, 
  apiBaseUrl,
  authToken 
}: IdVerificationProps) {
  const { verifyCaregivers } = useCaregiverStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [documentType, setDocumentType] = useState<'NIN' | 'PASSPORT' | 'DRIVERS_LICENSE'>('NIN');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  
  const documentInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const steps: VerificationStep[] = [
    {
      title: 'Enter ID Details',
      description: 'Enter your ID number and details',
      completed: !!documentNumber && (documentType !== 'PASSPORT' || (firstName && lastName)),
    },
    {
      title: 'Take Selfie',
      description: 'Take a selfie for identity verification',
      completed: !!selfieImage,
    },
    {
      title: 'Verification',
      description: 'We\'ll verify your identity',
      completed: !!verificationResult?.success,
    },
  ];

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        // Remove data:image/jpeg;base64, prefix
        resolve(base64.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user' // Front camera for selfie
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      setError('Camera access denied');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context?.drawImage(video, 0, 0);

    // Convert to base64
    const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
    setSelfieImage(base64);

    // Stop camera
    const stream = video.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsCameraActive(false);
  };

  const handleSelfieUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await convertToBase64(file);
      setSelfieImage(base64);
      setError(null);
    } catch (error) {
      setError('Failed to process image');
    }
  };

  const performVerification = async () => {
    if (!documentNumber || !selfieImage) {
      setError('Please complete both steps before verification');
      return;
    }

    if (documentType === 'PASSPORT' && (!firstName || !lastName)) {
      setError('First name and last name are required for passport verification');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload: any = {
        documentType,
        documentNumber,
        selfieImage,
      };

      // Add names for passport verification
      if (documentType === 'PASSPORT') {
        payload.firstName = firstName;
        payload.lastName = lastName;
      }

      const response = await fetch(`${apiBaseUrl}/verification/${caregiverId}/complete-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await verifyCaregivers(payload)
      setVerificationResult(result);
      setCurrentStep(3);
      // Auto-complete after 2 seconds
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && documentNumber && (documentType !== 'PASSPORT' || (firstName && lastName))) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selfieImage) {
      performVerification();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Document Type
              </label>
              <select
                value={documentType}
                onChange={(e) => {
                  setDocumentType(e.target.value as any);
                  setDocumentNumber('');
                  setFirstName('');
                  setLastName('');
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="NIN">National Identification Number (NIN)</option>
                <option value="PASSPORT">International Passport</option>
                <option value="DRIVERS_LICENSE">Driver's License</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {documentType === 'NIN' && 'Enter your 11-digit NIN'}
                {documentType === 'PASSPORT' && 'Enter your Passport Number'}
                {documentType === 'DRIVERS_LICENSE' && 'Enter your Driver\'s License Number'}
              </label>
              <input
                type="text"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value.trim())}
                placeholder={
                  documentType === 'NIN' ? '12345678901' :
                  documentType === 'PASSPORT' ? 'A12345678' :
                  'LAG123456789'
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                maxLength={documentType === 'NIN' ? 11 : 20}
              />
              {documentType === 'NIN' && (
                <p className="text-sm text-gray-500 mt-1">
                  Your NIN is the 11-digit number on your National ID card
                </p>
              )}
            </div>

            {documentType === 'PASSPORT' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name (as on passport)
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name (as on passport)
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Important Notes:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Ensure your ID number is correct and active</li>
                <li>• Your information will be verified against government databases</li>
                <li>• For passport verification, names must match exactly</li>
                {documentType === 'NIN' && (
                  <li>• If you don't have your NIN, you can retrieve it via USSD (*346#) or the NIMC app</li>
                )}
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Take a Selfie</h3>
              <p className="text-gray-600">
                Look directly at the camera and ensure your face is clearly visible
              </p>
            </div>

            {selfieImage ? (
              <div className="text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <p className="text-green-600 font-medium">Selfie captured successfully!</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={startCamera}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Retake with camera
                  </button>
                  <button
                    onClick={() => selfieInputRef.current?.click()}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Upload new photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {isCameraActive ? (
                  <div className="text-center space-y-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full max-w-md mx-auto rounded-lg"
                    />
                    <button
                      onClick={capturePhoto}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
                    >
                      Capture Photo
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={startCamera}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                      >
                        Use Camera
                      </button>
                      <button
                        onClick={() => selfieInputRef.current?.click()}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                      >
                        Upload Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <input
              ref={selfieInputRef}
              type="file"
              accept="image/*"
              onChange={handleSelfieUpload}
              className="hidden"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            {verificationResult?.success ? (
              <>
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
                <h3 className="text-2xl font-bold text-green-600">Verification Successful!</h3>
                <p className="text-gray-600">
                  Your identity has been verified successfully. You can now proceed.
                </p>
                {verificationResult.data && (
                  <div className="bg-green-50 p-4 rounded-lg text-left">
                    <h4 className="font-medium text-green-800 mb-2">Verified Information:</h4>
                    <div className="space-y-1 text-sm text-green-700">
                      {verificationResult.data.extractedInfo?.firstName && (
                        <p>Name: {verificationResult.data.extractedInfo.firstName} {verificationResult.data.extractedInfo.lastName}</p>
                      )}
                      <p>Document Verified: {verificationResult.data.documentVerified ? 'Yes' : 'No'}</p>
                      {verificationResult.data.faceMatch !== undefined && (
                        <p>Face Match: {verificationResult.data.faceMatch ? 'Yes' : 'No'} 
                          {verificationResult.data.faceMatchConfidence && 
                            ` (${verificationResult.data.faceMatchConfidence}% confidence)`
                          }
                        </p>
                      )}
                      {verificationResult.data.extractedInfo?.dateOfBirth && (
                        <p>Date of Birth: {new Date(verificationResult.data.extractedInfo.dateOfBirth).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Loader2 className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
                <h3 className="text-xl font-medium text-gray-900">Verifying Your Identity...</h3>
                <p className="text-gray-600">Please wait while we process your documents.</p>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : currentStep === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.completed ? <CheckCircle className="w-5 h-5" /> : index + 1}
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center max-w-20">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Step Content */}
      <div className="mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      {currentStep < 3 && (
        <div className="flex gap-4 justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            onClick={nextStep}
            disabled={
              isLoading ||
              (currentStep === 1 && (!documentNumber || (documentType === 'PASSPORT' && (!firstName || !lastName)))) ||
              (currentStep === 2 && !selfieImage)
            }
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {currentStep === 2 ? 'Verify Identity' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}
