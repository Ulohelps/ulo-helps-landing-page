import React from "react";

const TermsAndConditions = () => {
  return (
    <div>
      <section className="bg-[#E9F6FC] py-24 md:py-32">
        <h2 className="text-[40px] text-[#344054] text-center font-bold">
          Terms of Use
        </h2>
        <p className="text-lg text-[#344054] text-center font-normal mt-3">
          Date created: 16/04/2025
        </p>
      </section>
      <section className="bg-white text-[#1E1E1E] px-6 md:px-20 lg:px-[152px] py-12 md:py-24">
        <div className="max-w-[792px] mx-auto space-y-8">
          <p className="text-base text-[#0A3749] font-normal">
            Welcome to ULO. We’ve created this simplified Terms of Use document
            to guide how you use our platform. By signing up or using ULO, you
            agree to follow these terms.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                1. Who Can Use ULO
              </h2>

              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-normal text-base">
                <li>You must be at least 18 years old</li>
                <li>
                  You must provide accurate information and keep your profile
                  updated
                </li>
                <li>You must treat other users with respect and honesty</li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                2. Your Responsibilities
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-normal text-base">
                <li>
                  As a Caregiver, you agree to only participate in jobs you are
                  qualified for
                </li>
                <li>
                  As a Care seeker, you agree to pay fairly and treat caregivers
                  with dignity.
                </li>
                <li>
                  You will not use ULO to harass, scam, or exploit anyone.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                3. Profile Visibility
              </h2>

              <p className="mt-2 text-base text-[#0A3749] font-normal">
                When you create a profile, certain information (like your name,
                photo, skills, and location) will be visible to other users so
                they can connect with you. Private conversations and contact
                information will stay confidential, but may be reviewed by ULO
                <strong>if a report </strong>is submitted or there's a safety
                concern.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                4. Payments and Services
              </h2>
              <p className="mt-2 text-base text-[#0A3749] font-normal">
                ULO is not your employer. We only provide a platform to connect
                caregivers and careseekers. Any payment agreement is between the
                two parties.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                5. Account Suspension or Removal
              </h2>
              <p className="mt-2 text-base text-[#344054] font-normal">
                ULO reserves the right to suspend or remove any user account if:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-normal text-base">
                <li>False information is provided.</li>
                <li>Harassment, abuse, or illegal activity is reported.</li>
                <li>Platform rules are violated repeatedly.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                6. Limitation of Liability
              </h2>
              <p className="mt-2 text-base text-[#344054] font-normal">
                While we work hard to vet users and provide a safe platform, ULO
                is not responsible for:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-normal text-base">
                <li>Misconduct of individual</li>
                <li>users Disputes over payment or service quality</li>
                <li>Any harm caused by off-platform interactions</li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749] ">
                7. Changes to These Terms
              </h2>
              <p className="mt-2 text-base text-[#344054] font-normal">
                We may update these terms to reflect changes in law or our
                services. We'll notify users by email or platform notice if
                major updates are made.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
