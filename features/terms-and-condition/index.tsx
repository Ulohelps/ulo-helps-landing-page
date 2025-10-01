import Link from "next/link";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div>
      <section className="bg-[#D4E8DB] py-24 md:py-32">
        <h2 className="text-[40px] text-[#344054] text-center font-bold">
          Terms of Use
        </h2>
        <p className="text-lg text-[#344054] text-center font-medium mt-3">
          Last updated: 16/04/2025
        </p>
      </section>
      <section className="bg-white text-[#1E1E1E] px-6 md:px-20 lg:px-[152px] py-12 md:py-24">
        <div className="max-w-[792px] mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-[#0A3749]">Terms of Use</h1>

          <p className="text-base text-[#0A3749] font-medium">
            These Terms of Use constitute a binding agreement made between you,
            ("you", "user") and Ulo Helps Limited, doing business as Ulo Helps
            ("Ulo", "Company", "we," "us," or "our") concerning your use of the
            Ulo Helps website located at{" "}
            <Link
              className="text-[#1da5db] underline"
              href="https://www.ulohelps.com/"
            >
              {" "}
              https://www.ulohelps.com/
            </Link>{" "}
            , website features and any other media form, mobile website or
            mobile application, related or associated with it (collectively, the
            "Site"). By using the Site, you acknowledge that you have read,
            understood and agreed to be bound by the Terms of Use. If you do not
            agree, you are prohibited from using the site, and you must
            discontinue use immediately.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                1. General Term
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                Ulo Helps is a trusted, transparent, and technology-driven
                listing marketplace focused on connecting individuals, families,
                and households across Nigeria particularly in Lagos State with
                reliable, background-verified domestic workers. These include
                but are not limited to nannies, drivers, housekeepers, cooks,
                and other household support professionals.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                To maintain the integrity of our community and ensure fair
                access to our services, each user is permitted to register and
                maintain only one (1) account on the Ulo Helps platform. This
                applies to both those seeking help (e.g., employers, families)
                and those offering services (e.g., domestic workers).
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                2. Eligibility and Risk
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                To prevent illegal use, given the site's business nature and
                jurisdiction, users of the Ulo Helps platform must acknowledge
                and agree to the following eligibility and usage conditions:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>
                  To access the website, you must create an account using
                  complete, truthful, and up-to-date personal information
                </li>
                <li>
                  You will also be required to supply a password, which you must
                  keep confidential always.
                </li>
                <li>You must be 18 years or older.</li>
                <li>
                  Access must not be through automated or non-human means (e.g.,
                  bots or scripts).
                </li>
                <li>
                  You agree to undergo necessary identity verification and data
                  security checks as may be required by Ulo Helps for the
                  purpose of maintaining platform integrity and user safety.
                </li>
                <li>
                  You further represent and warrant that you have not been
                  convicted of any criminal offence, nor are you currently the
                  subject of any investigation, prosecution, or legal
                  proceedings involving fraud, dishonesty, financial misconduct,
                  or any activity deemed unlawful under applicable laws and
                  regulations.
                </li>
              </ul>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                2.1. Assumption of Risk
              </h3>
              <p className="text-[#344054] font-medium text-base mt-2">
                While Ulo Helps implements verification and screening procedures
                for users and service providers on the platform, you acknowledge
                that engagement with third parties via the platform carries
                inherent risks. You agree to exercise personal judgment and due
                diligence in all interactions and transactions, and you assume
                full responsibility for any consequences that arise from your
                use of the platform.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                3. Verification (KYC Know Your Customer)
              </h2>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                3.1 Users Verification
              </h3>
              <p className="text-[#344054] font-medium text-base mt-2">
                To comply with applicable legal and regulatory requirements, all
                users are required to complete identity verification before
                their application can be processed and prior to full access to
                our platform. This process involves the submission of valid
                identification documents and is essential to ensuring the
                lawful, secure, and responsible use of our services. It also
                supports our commitment to preventing, detecting, and reporting
                fraudulent or illegal activity to the relevant authorities.
              </p>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                3.2 Domestic Workers Verification
              </h3>
              <p className="text-[#344054] font-medium text-base mt-2">
                Every domestic worker engaged through the platform is required to
                undergo a standard verification process and is deemed to have
                granted their consent for the verification process. Their
                collection, storage, and sharing (with trusted verification
                providers) in line with the company's Privacy Policy and data
                protection laws (NDPA 2023 in Nigeria).This due diligence is
                carried out through a trusted third-party provider and typically
                includes basic identity checks such as NIN.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                In addition to this, we have introduced an enhanced level of
                screening known as the Premium Verification Process.
              </p>

              <h4 className="font-semibold text-lg text-[#0A3749] mt-3">
                3.2.1 Caregivers Premium Verification
              </h4>
              <p className="text-[#344054] font-medium text-base mt-2">
                Unlike the standard checks, this process offers more
                comprehensive coverage and is available only upon the specific
                request of the User. The premium verification extends beyond
                identity validation to include:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>Residential address verification</li>
                <li>Guarantor verification</li>
                <li>Liveness verification</li>
                <li>Identification verification</li>
                <li>
                  Additional background checks designed to offer users an added
                  layer of information and confidence.
                </li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                Given the additional resources and effort required to conduct
                these enhanced checks, the Premium Verification Process attracts
                an extra cost payable by the User.
              </p>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                3.3 Required Information
              </h3>
              <p className="text-[#344054] font-medium text-base mt-2">
                During registration or the application process, you will be
                required to provide accurate, current, and complete personal
                information. This may include, but is not limited to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>
                  A valid government-issued photo identification document (e.g.,
                  passport, driver's license, or national ID card)
                </li>
                <li>
                  Proof of residential address (e.g., recent utility bill or
                  bank statement)
                </li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                We reserve the right to request additional documentation or
                conduct further verification checks, as necessary, to meet
                regulatory requirements and our internal compliance standards.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                The company shall not be liable for any false information
                provided by the user or domestic worker that may be misleading or
                incorrect.
              </p>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                3.3 Verification timeline and consequence
              </h3>
              <p className="text-[#344054] font-medium text-base mt-2">
                You are required to complete the verification process within
                seven (7) days of initiating your application. We may also carry
                out additional checks in accordance with regulatory
                requirements, Users personal request or our internal risk
                controls. Failure to complete verification within this period
                may result in:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>Delays in the processing of your application</li>
                <li>Temporary or permanent suspension of your account</li>
                <li>Restrictions on access to certain features or services</li>
                <li>Withholding of any pending payments or transactions</li>
              </ul>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                3.4 Ongoing Monitoring
              </h3>
              <p className="text-[#344054] font-medium text-base mt-2">
                We may conduct random or periodic checks on user and domestic workers
                activity to safeguard against fraud, misuse, or unauthorized
                transactions. If any suspicious or unlawful activity is
                identified, we reserve the right to take appropriate action,
                which may include:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>
                  Suspending or terminating your account without prior notice
                </li>
                <li>
                  Reporting the activity to relevant law enforcement or
                  regulatory authorities
                </li>
                <li>Pursuing legal or regulatory action as deemed necessary</li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                All use of the site, interfaces, and platform features is
                subject to applicable laws, regulations, and governmental
                requirements, and users are expected to act in full compliance
                at all times
              </p>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                3.5 Data Protection and Privacy
              </h3>
              <p className="text-[#344054] font-medium text-base mt-2">
                All personal information collected, including during the
                verification process, is stored securely and handled in full
                compliance with applicable data protection laws. We are
                committed to protecting your privacy and will not share your
                information with third parties, except in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>Where disclosure is legally required</li>
                <li>With your express consent</li>
                <li>
                  As necessary to comply with legal or regulatory obligations
                </li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                Your data is treated with the utmost care and confidentiality to
                ensure your privacy is preserved at all times. Furthermore we
                rely on the on your consent, legal obligation and legitimate
                interest as our lawful basis for processing your data under this
                section.
              </p>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                3.6 Updates to Verification Requirements
              </h3>
              <p className="text-[#344054] font-medium text-base mt-2">
                We may update our verification requirements periodically to
                reflect changes in applicable laws, regulations, or internal
                compliance policies. Your continued use of the platform
                constitutes acceptance of any such updates and confirms your
                ongoing obligation to comply with the updated requirements and
                these Terms of Use.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                4. Payment Terms and Platform Role
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                Ulo Helps is a listing and matching platform that connects
                individuals and families ("Care Seekers") with verified domestic
                service providers ("Caregivers"). The platform enables
                Caregivers to showcase their profiles and salary expectations,
                and allows Care Seekers to view, connect with, and engage these
                professionals directly.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                Ulo Helps operates strictly as an intermediary and is not a
                recruitment agency or employer. As such:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>
                  Ulo Helps does not participate in the negotiation, collection,
                  disbursement, or management of salaries, wages, or
                  compensation between Care Seekers and Caregivers
                </li>
                <li>
                  Ulo Helps does not receive any commission or percentage from
                  payments made to Caregivers by Care Seekers
                </li>
                <li>
                  All payments, salary agreements, and working terms are
                  independently arranged and finalized between the Caregiver and
                  the Care Seeker, without the involvement or control of Ulo
                  Helps
                </li>
                <li>
                  Caregivers set their own service rates or salary expectations,
                  and these are made visible to Care Seekers for transparency
                  and fair decision-making
                </li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                To access and use the platform, Care Seekers are required to pay
                a subscription or access fee. This fee is strictly for use of
                the platform's tools, access to verified profiles, and enhanced
                features not for the hiring or compensation of Caregivers.
                Subscription fees are non-refundable once access has been
                granted and are separate from any payments made to service
                providers.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                By using the platform, you acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>
                  Ulo Helps' role is limited to providing verified listings and
                  facilitating direct connections
                </li>
                <li>
                  Ulo Helps is not liable for payment disputes, service quality,
                  or any financial arrangement made outside the platform
                </li>
                <li>
                  It is your responsibility to ensure that any engagement
                  between you and another user complies with all applicable
                  laws, including employment, tax, and labor regulations
                </li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                If you have questions or concerns about our subscription model
                or payment policies, please contact us at{" "}
                <Link
                  href="mailto:contact@ulohelps.com"
                  className="text-[#1da5db] underline"
                >
                  {" "}
                  contact@ulohelps.com
                </Link>{" "}
                .
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                5. Intellectual Property
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                The Company or its licensors own all rights, titles, and
                intellectual property in the site, its interface features,
                content, and technology. Unless stated otherwise, all materials
                including software, text, images, videos, and designs belong
                exclusively to the Company and are protected by intellectual
                property laws in Nigeria. You do not own any part of the site or
                its content unless explicitly granted by the Company.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                All proprietary content uploaded by users may include a visible
                watermark of the Company's logo on the lower right corner of
                images or visual assets, serving as a notice of ownership and a
                deterrent to unauthorized use.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                Subject to eligibility, the Company grants you a personal,
                limited, revocable, non-exclusive, non-sublicensable, and
                non-transferable license to use, copy, and distribute the Site,
                interfaces, and features solely for access and interaction.
                Nothing on the site grants permission, implied or otherwise, to
                use any trademarks without written consent from the Company or
                the trademark owner.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                6. User Rights and Account
              </h2>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                6.1 Rights of a Careseeker
              </h3>

              <h4 className="font-semibold text-lg text-[#0A3749] mt-3">
                6.1.1 Matching Based on Careseeker Requirements
              </h4>
              <p className="text-[#344054] font-medium text-base mt-2">
                Upon subscribing to the platform and submitting the required
                Careseeker form, users are matched with Caregivers whose
                profiles best align with the specific needs, preferences, and
                criteria indicated such as skill set, availability, language,
                location, and expected salary range.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                The recommendation system is automated and human-reviewed to
                ensure relevance and compliance with Ulo Helps' quality
                standards.
              </p>

              <h4 className="font-semibold text-lg text-[#0A3749] mt-3">
                6.1.2 Right to Select and Negotiate
              </h4>
              <p className="text-[#344054] font-medium text-base mt-2">
                A Careseeker reserves the right to review recommended Caregiver
                profiles and select a single preferred candidate from the
                available matches. Once a selection is made:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>
                  The profile details of the chosen Caregiver are made visible
                  to the Careseeker
                </li>
                <li>
                  The Careseeker may initiate direct contact and negotiation
                  with the Caregiver regarding terms of engagement, working
                  conditions, and payment
                </li>
                <li>
                  Ulo Helps does not interfere with salary negotiations, and no
                  commission is taken from the Caregiver's earnings
                </li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                Only the selected candidate's details will remain accessible to
                the Careseeker after selection, in line with our data
                minimization policy and to protect the privacy of other
                candidates.
              </p>

              <h4 className="font-semibold text-lg text-[#0A3749] mt-3">
                6.1.3 Replacement Process and Support
              </h4>
              <p className="text-[#344054] font-medium text-base mt-2">
                If the Careseeker is dissatisfied with the selected Caregiver
                for reasons such as misrepresentation, incompatibility, or
                conduct issues, they may initiate a review process by contacting
                Ulo Helps Customer Support at{" "}
                <Link
                  href="mailto:contact@ulohelps.com"
                  className="text-[#1da5db] underline"
                >
                  {" "}
                  contact@ulohelps.com
                </Link>
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>
                  The Careseeker must submit a written report clearly stating
                  the issue
                </li>
                <li>
                  Ulo Helps will review the complaint and may contact both
                  parties for verification
                </li>
                <li>
                  If the complaint is deemed valid and aligns with platform
                  standards (e.g., within a reasonable period, not abusive or
                  discriminatory), the Careseeker will be given access to
                  another round of candidate profiles, limited by the terms and
                  level of their subscription
                </li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                Please note:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>
                  The number of caregiver replacement opportunities is limited
                  to a maximum of Two (2) times per subscription cycle
                </li>
                <li>
                  Abuse of the replacement policy (e.g., frequent or baseless
                  complaints) may lead to account review or suspension
                </li>
              </ul>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                6.2 Right of Caregiver
              </h3>

              <h4 className="font-semibold text-lg text-[#0A3749] mt-3">
                6.2.1 Caregiver Matching and Profile Sharing
              </h4>
              <p className="text-[#344054] font-medium text-base mt-2">
                When a Caregiver registers on the Ulo Helps platform, they are
                required to complete a detailed onboarding process, including
                identity verification and submission of relevant service
                preferences and work experience. Based on this information, the
                platform uses a matching system to recommend the Caregiver's
                profile to Careseekers whose submitted forms align with the
                Caregiver's skills, availability, and stated salary
                expectations.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                Caregivers are not randomly assigned to jobs. Their profile is
                shared only with relevant Careseekers who match their criteria,
                ensuring the opportunity is both suitable and safe.
              </p>

              <h4 className="font-semibold text-lg text-[#0A3749] mt-3">
                6.2.2 Right to Decline Offers
              </h4>
              <p className="text-[#344054] font-medium text-base mt-2">
                A Caregiver has the full right to decline any job offer or
                engagement made by a Careseeker, without fear of penalty or
                exclusion from the platform. Acceptance of a job is entirely
                voluntary and should be based on mutual agreement between both
                parties regarding work expectations, conditions, and
                compensation.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                Ulo Helps upholds a no-coercion policy, where Caregivers are
                never obligated to accept roles that do not align with their
                preferences or comfort.
              </p>

              <h4 className="font-semibold text-lg text-[#0A3749] mt-3">
                6.2.3 No Commission or Third-Party Charges
              </h4>
              <p className="text-[#344054] font-medium text-base mt-2">
                Ulo Helps is a subscription-based listing platform that charges
                only Careseekers a fee to access verified caregiver profiles.
                Caregivers are not required to pay any registration,
                subscription, or referral fees to Ulo Helps or to any third
                party for placement or profile visibility.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                Any request by individuals or agents for commissions, upfront
                payments, or subscription fees on behalf of Ulo Helps is
                strictly prohibited and should be reported immediately.
              </p>

              <h4 className="font-semibold text-lg text-[#0A3749] mt-3">
                6.2.4 Protection from Abuse or Exploitation
              </h4>
              <p className="text-[#344054] font-medium text-base mt-2">
                Ulo Helps is committed to the well-being of all Caregivers on
                the platform. If a Caregiver experiences any form of:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>Abuse, harassment, discrimination, or exploitation</li>
                <li>Unsafe or unacceptable working conditions</li>
                <li>
                  Any discomfort arising from the conduct of a Careseeker, or
                </li>
                <li>Propositioning for illegal activities</li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                They are strongly encouraged to file a report with our Support
                Team by emailing{" "}
                <Link
                  href="mailto:contact@ulohelps.com"
                  className="text-[#1da5db] underline"
                >
                  {" "}
                  contact@ulohelps.com
                </Link>
                . Each report is treated with urgency and confidentiality. Upon
                verification, appropriate steps will be taken, which may
                include:
              </p>
              <ol className="list-decimal list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>Immediate investigation</li>
                <li>
                  Suspension or removal of the offending Careseeker from the
                  platform
                </li>
                <li>Criminal complaint to relevant authorities</li>
                <li>Support or guidance for the Caregiver involved</li>
              </ol>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                6.3 Disclaimer
              </h3>
              <p className="text-[#344054] font-medium text-base mt-2">
                Ulo Helps makes every effort to ensure that Caregivers listed on
                the platform are background-verified and meet basic quality
                standards.
              </p>

              <h3 className="font-semibold text-xl text-[#0A3749] mt-4">
                6.4 Account Suspension and Profile Removal for Misconduct
              </h3>
              <p className="text-[#344054] font-medium text-base mt-2">
                To maintain a safe, respectful, and trustworthy environment for
                all users, Ulo Helps reserves the right to suspend or
                permanently remove the profile of any Caregiver or Careseeker
                found to be in violation of platform standards, applicable laws,
                or community expectations.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                This action may be taken in response to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>Verified reports of misconduct, harassment, or abuse</li>
                <li>Patterns of rude, aggressive, or inappropriate behavior</li>
                <li>
                  Dishonesty, misrepresentation, or false profile information
                </li>
                <li>
                  Non-compliance with Ulo Helps' Terms of Use, Privacy Policy,
                  or Code of Conduct
                </li>
                <li>
                  Unlawful activity or use of the platform for exploitative
                  purposes
                </li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                Upon receiving a report, Ulo Helps will conduct an internal
                review and may request further information from the affected
                parties. If the claim is substantiated, Ulo Helps reserves the
                right at its sole discretion to take any of the following
                actions without prior notice:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>Issue a warning</li>
                <li>Temporarily suspend the account</li>
                <li>Permanently remove the user's profile from the platform</li>
                <li>Block future access to Ulo Helps' services</li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                We prioritize the safety and dignity of all users and encourage
                anyone who encounters abuse or unprofessional behavior to report
                it promptly to{" "}
                <Link
                  href="mailto:contact@ulohelps.com"
                  className="text-[#1da5db] underline"
                >
                  {" "}
                  contact@ulohelps.com
                </Link>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                7. Third Party Information or Service
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                The site may include links to third-party websites or content
                ("Third-Party Services"), which we do not control, review, or
                monitor for accuracy, reliability, or privacy practices.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                If you access or use Third-Party Services, you do so at your own
                risk. These Terms of Use no longer apply once you leave our
                platform. We are not responsible for any issues, losses, or
                damages related to their use, nor for their content,
                availability, or privacy policies.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                Your use of Third-Party Services is solely between you and the
                provider. We are not liable for any costs, damages, or losses
                incurred. The Company does not endorse or take responsibility
                for any content, products, or services from external sites or
                resources.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                Before using Third-Party Services, review their terms and
                privacy policies. Their inclusion on our platform does not imply
                endorsement or recommendation.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                8. Prohibited Conduct
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                At Ulo, the safety, dignity, and well-being of both our users
                and domestic service providers is a top priority. As a platform
                built on trust, transparency, and compliance, we are committed
                to maintaining a safe environment for all interactions. We
                reserve the right, at our sole discretion, to determine whether
                any conduct violates our policies, and to take appropriate
                action to protect the integrity of our platform.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                By using Ulo Helps, you agree to access and interact with the
                platform including the website, mobile app, user profiles, chat
                features, and any related tools only in a lawful, respectful,
                and appropriate manner, and in line with these Terms of Use and
                all applicable laws and regulations (including labor, privacy,
                and data protection laws such as the NDPA).
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                You agree that you will not:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>Break any law, regulation, or these Terms of Use</li>
                <li>
                  Engage in fraud, impersonation, or misleading behavior of any
                  kind
                </li>
                <li>
                  Provide false, incomplete, or misleading information about
                  your identity, experience, or intent
                </li>
                <li>
                  Attempt to bypass verification or security features, including
                  by using VPNs or anonymization tools to mask location or
                  identity
                </li>
                <li>
                  Create more than one account or allow others to use your
                  account
                </li>
                <li>
                  Access, tamper with, or attempt to hack the platform, its
                  servers, or any system or data connected to Ulo Helps
                </li>
                <li>
                  Introduce or distribute viruses, malware, spyware, or harmful
                  code
                </li>
                <li>
                  Use scraping tools, bots, automated scripts, or similar
                  technologies to collect or copy data from the platform
                </li>
                <li>
                  Harass, threaten, exploit, or abuse any user or domestic
                  worker, whether through messages, reviews, or conduct in
                  person
                </li>
                <li>
                  Misuse the platform to arrange unlawful, exploitative, or
                  non-consensual services
                </li>
                <li>
                  Infringe on copyrights, trademarks, or other intellectual
                  property by copying, modifying, or distributing content
                  without permission
                </li>
                <li>
                  Make use of personal information including but not limited to
                  images, names and contact information of other users for any
                  purposes other than those within the scope of these Terms of
                  Use without their consent
                </li>
                <li>
                  Reverse engineer or attempt to access proprietary platform
                  code or structure without express authorization
                </li>
                <li>
                  Engage in conduct that could damage Ulo's reputation, brand,
                  or user trust
                </li>
                <li>
                  Post or share discriminatory, hateful, obscene, or offensive
                  content
                </li>
                <li>
                  Use the platform in any location where Ulo is not authorized
                  to operate or in violation of local laws or restrictions
                </li>
              </ul>
              <p className="text-[#344054] font-medium text-base mt-2">
                If you engage in any of the above prohibited behaviors or any
                conduct we reasonably believe undermines the safety, trust, or
                legal integrity of the Ulo platform we reserve the right to take
                any action we consider necessary, including:
              </p>
              <ol className="list-[lower-roman] list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>Suspending or permanently terminating your account</li>
                <li>Blocking your access to the site or app</li>
                <li>Reporting your conduct to law enforcement, or</li>
                <li>Pursuing legal action for damages or injunctive relief</li>
              </ol>
              <p className="text-[#344054] font-medium text-base mt-2">
                We may also cooperate with regulatory or law enforcement
                agencies to investigate and respond to serious or criminal
                misuse of the platform.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                By continuing to use Ulo Helps, you acknowledge and accept these
                terms, and you agree to use the platform responsibly, honestly,
                and in good faith.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                9. Additional Information
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                All demands, consents and notices to be given under the term
                shall be sent by email, the Company or an authorized third party
                may request additional information to verify that you are the
                Account Holder. Failure to provide adequate information within
                the specified timeframe may result in termination of your access
                to the Site, Interfaces, or Features, exclusion from rewards,
                incentives, or product launches and any other necessary action
                at the Company's discretion.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                10. Indemnification
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                You agree to indemnify us, our licensors, and each of their
                respective employees, officers, directors, and representatives
                (collectively, the "Company Parties") from any claims, damages,
                or losses suffered by you or your family that arise from:
              </p>
              <ol className="list-[lower-roman] list-inside mt-2 space-y-1 text-[#344054] font-medium text-base">
                <li>your use of the platform, interfaces, or features</li>
                <li>your breach of these Terms or violation of the law</li>
                <li>disputes between you and a third party</li>
                <li>
                  your alleged or actual infringement or misappropriation of any
                  third party's intellectual property or other rights
                </li>
                <li>your feedback or content shared on the platform</li>
              </ol>
              <p className="text-[#344054] font-medium text-base mt-2">
                This includes damages (monetary losses, fines, penalties, or
                other harm); reasonable attorney's fees that relate in any way
                to any demand, claim, regulatory action, proceeding or lawsuit,
                regardless of the cause or alleged cause, whether the
                allegations are groundless, fraudulent, false, or lack merit.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                We reserve the right, at your expense, to assume control of any
                defence, and you agree to cooperate. We will make reasonable
                efforts to notify you of any claims subject to this
                indemnification.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                11. Disclaimer of Warranty
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                The site and services are provided "as-is" and "as-available".
                You use them at your own risk. To the fullest extent allowed by
                law, we, (a) disclaim all warranties, whether express or
                implied, including warranties of merchantability, fitness for a
                particular purpose, and non-infringement. (b) make no guarantees
                about the accuracy, completeness, or reliability of the site's
                content or any linked websites.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                We are not responsible for (i) errors, mistakes, or inaccuracies
                in content; (ii) personal injury or property damage from using
                the site; (iii) unauthorized access to our servers or your
                personal/financial information stored there; (iv) interruptions
                or stoppages in site access or transmission; (v) bugs, viruses,
                or harmful software transmitted through the site by third
                parties; (vi) errors, omissions, or losses caused by using
                content on the site. We do not endorse or take responsibility
                for third-party products, services, or transactions. Use caution
                and good judgment when engaging with third-party providers.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                12. Limitations of Liability
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                To the fullest extent permitted by applicable law, including the
                Nigerian Data Protection Act (NDPA) and other relevant
                regulatory frameworks, Ulo and its affiliates, (directors,
                employees, and authorized agents) shall not be liable for any
                indirect, incidental, special, punitive, or consequential
                damages such as loss of income, emotional distress, reputational
                damage, data loss, or business disruption arising from your use
                of the platform. The Company is not responsible for: (i) Any
                delays or disruptions due to maintenance, technical issues, or
                account suspension. (ii) Any cost, inconvenience, or difficulty
                you may experience in sourcing alternative domestic services
                outside the platform. (iii) Any behavior, fraud, or poor
                performance by domestic workers or users, since Ulo Helps only
                connects people and does not employ or directly supervise
                service providers. (iv) Financial or personal decisions made by
                users based on the content of the platform (including profiles,
                reviews, or ratings) or communications exchanged through the
                service. (v) Any loss or misuse of your information caused by
                third parties, unless it was due to our own proven negligence.
                (vi) Any harm caused by hacking, phishing, or other cyber
                threats despite our best efforts to secure the platform.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                Notwithstanding any contrary provision, the total aggregate
                liability of Ulo Helps to you for any claims or causes of action
                arising under or in connection with the use of this platform or
                these Terms whether in contract, tort, negligence, or otherwise
                shall not exceed the total amount paid by you to Ulo Helps
                within the one (1) month immediately preceding the event giving
                rise to the claim, whichever is lesser.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                13. Account Deactivation and Deletion
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                If you no longer desire to use the services on our services, you
                may deactivate or delete your account by sending us an email at{" "}
                <Link
                  href="mailto:contact@ulohelps.com"
                  className="text-[#1da5db] underline"
                >
                  {" "}
                  contact@ulohelps.com
                </Link>
                . Deactivating your account puts your account on hold and is the
                same as telling you not to delete any information because you
                might want to reactivate your account at some point in the
                future. When you delete an account, you are requesting that your
                account and the information stored therein be permanently
                deleted from our database. You should only delete your account
                if you are sure you never want to reactivate it. Please note
                that certain data you have provided may continue to exist in
                aggregate form that cannot be used to identify you.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                14. Privacy & Cookie Policy
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                We care about data privacy and security. Please review our
                Privacy Policy: Link By using the Site, you agree to be bound by
                our Privacy Policy, which is incorporated into these Terms of
                Use.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                15. Termination
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                These Terms remain in effect as long as you use the Site. We
                may, at our sole discretion and without notice, deny access,
                suspend accounts, or remove content for any reason, including
                violations of these Terms or applicable laws.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                If your account is terminated or suspended, you may not create a
                new one under any name. We also reserve the right to pursue
                legal action, including civil, criminal, or injunctive remedies.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                16. Modification
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                Ulo reserves the right to make changes or modifications to these
                Terms of Use at any time and from time to time. We will inform
                you of any modification by updating the "Last updated" date of
                these Terms of Use, and you waive any right to receive specific
                notice of each such change. By your continued use of the Site
                after the date such revised Terms of Use are posted, you will be
                deemed to have accepted the changes. Please refrain from using
                the site if you do not wish to accept the new Terms.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                17. Governing Law
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                These Terms of Use and your use of the Site are governed by and
                construed in accordance with the laws of Nigeria applicable to
                agreements made and to be entirely performed within Nigeria
                without regard to its conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                18. Dispute Resolution
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                If there is a dispute related to these Terms or your use of our
                services, both parties agree to try to resolve it through
                negotiation. Either party can start negotiations by sending a
                written notice (the "Initial Notice") stating the issue and the
                desired resolution. The party receiving such notice shall have
                twenty days to respond, and within forty-five days after the
                Initial Notice was sent, the parties shall meet and confer in
                good faith to try and resolve the Claim. If the parties are
                unable to do so within ninety days of the Initial Notice, the
                parties may agree to mediate their dispute or either party may
                submit to arbitration according to these Terms.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                19. Entire Agreement
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                The Terms, including any policies that expressly incorporate the
                Terms by reference, constitute the entire understanding and
                agreement between you and us hereto and supersedes any prior
                agreements, contemporaneous representations, or communications
                (written or verbal) between you and us, regarding the subject
                matter. There are no guarantees, promises, or assurances beyond
                what is expressly stated in these Terms. No change, modification
                or amendment of this Agreement shall be valid unless the same is
                in writing and signed by all the parties hereto.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                20. Assignments
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                These Terms do not create any special relationship between you
                and us beyond what is stated here. We are not each other's
                agents, and you cannot claim to have any relationship with us
                other than as a user of our services.
              </p>
              <p className="text-[#344054] font-medium text-base mt-2">
                You cannot transfer your rights or responsibilities under these
                Terms, but the Company can transfer them without restriction.
                Any transfer that goes against this rule will be invalid.
                However, these Terms will still apply to both parties and their
                approved successors.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                21. Waiver
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                If we do not enforce any part of these Terms, it does not mean
                we waive our right to do so later. We can still enforce it in
                the future. Any waiver from us must be in writing to be valid.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                22. Severability
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                If any portion of the Terms are held to be invalid or
                unenforceable, the remaining portions of the Terms will remain
                in full force and effect. Any invalid or unenforceable portions
                will be interpreted to effectuate the intent of the original
                portion. If such construction is not possible, the invalid or
                unenforceable portion will be severed from the Terms, but the
                rest of the Terms will remain in full force and effect.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                23. Remedies
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                Any right or remedy of the Company set forth in these Terms is
                in addition to, and not in lieu of, any other right or remedy
                whether described in these Terms, under Applicable Law, at law,
                or in equity. The failure or delay of the Company in exercising
                or enforcing any right, power, or privilege under these Terms
                shall not operate as a waiver thereof.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl text-[#0A3749]">
                24. Contact Us
              </h2>
              <p className="text-[#344054] font-medium text-base mt-2">
                You may also contact us with questions, complaints, or claims
                concerning the Features at{" "}
                <Link
                  href="mailto:contact@ulohelps.com"
                  className="text-[#1da5db] underline"
                >
                  {" "}
                  contact@ulohelps.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
