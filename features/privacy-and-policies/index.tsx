import React from "react";

const PrivacyPolicy = () => {
  return (
    <div>
      <section className="bg-[#E9F6FC] py-24 md:py-32">
        <h2 className="text-[40px] text-[#344054] text-center font-bold">
          Privacy policy
        </h2>
        <p className="text-lg text-[#344054] text-center font-normal mt-3">
          Date created: 16/04/2025
        </p>
      </section>
      <section className="bg-white text-[#1E1E1E] px-6 md:px-20 lg:px-[152px] py-12 md:py-24">
        <div className="max-w-[792px] mx-auto space-y-8">
          <p className="text-base text-[#0A3749] font-normal">
            Here at ULO, your trust and privacy is important to us. That is why
            we have put together this simplified Privacy Policy document that
            explains how we collect, use, and protect your information when you
            use our platform.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                1. What Information We Collect
              </h2>
              <p className="text-[#344054] font-normal text-base mt-2">
                When you sign up or create a profile, we may collect:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-normal text-base">
                <li>Your name, contact details, and location</li>
                <li>
                  Your profile details such as services offered or needed,
                  experience, and availability
                </li>
                <li>
                  Verification documents like ID and background check reports
                  for caregiver
                </li>
                <li>Messages and communication with other users</li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                2. How Your Information is Used
              </h2>
              <p className="text-base text-[#0A3749] font-normal">
                We use your information to:
              </p>

              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-normal text-base">
                <li>
                  Help match you with the right users (caregivers or care
                  seekers)
                </li>
                <li>Show relevant profiles and service needs to others</li>
                <li>Improve our platform and provide support</li>
                <li>Keep the community safe through identity verification</li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                3. Who Can See Your Information
              </h2>

              <p className="mt-2 text-base text-[#0A3749] font-normal">
                Your profile (including services, availability, and basic
                contact info) may be visible to other registered users. This
                helps care seekers and caregivers connect easily. <br />
                Private information such as personal messages or identity
                documents
                <strong> WILL NOT </strong> be shared publicly, but can be
                accessed by our support team if a{" "}
                <strong>report or dispute</strong> is made for safety or
                investigation purposes.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                4. How we keep your data safe
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-normal text-base">
                <li>Conversations are encrypted on the platform</li>
                <li>We do not sell your data to third parties</li>
                <li>
                  We use secure technologies to store and process your data
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                5. When We May Share Your Data
              </h2>
              <p className="mt-2 text-base text-[#344054] font-normal">
                We may share data with law enforcement or authorities{" "}
                <strong>only when legally required</strong> or in case of
                user-reported issues involving safety or misconduct.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                6. Your rights
              </h2>
              <p className="mt-2 text-base text-[#344054] font-normal">
                You can:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-normal text-base">
                <li>Access or update your personal information</li>
                <li>Request to deactivate or delete your account</li>
                <li>
                  Contact us with any questions or privacy concerns at (Add
                  contact information)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
