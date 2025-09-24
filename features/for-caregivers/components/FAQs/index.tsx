import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FAQs() {
  const qas = [
    {
      q: "How do I find someone to help me on ULO?",
      a: "Just go to the ULO website and open an account. Once you're done, tell us the kind of help you need like cleaner, nanny or cook and we’ll show you trusted people that match.",
    },
    {
      q: "What kind of workers can I get on ULO?",
      a: "You can get cleaners, nannies, cooks, and other home helpers that fit your needs.",
    },
    {
      q: "Do I need to pay to use ULO?",
      a: "You can sign up and browse for free. Some services may require payment.",
    },
    {
      q: "How do I know the workers are safe and real?",
      a: "All workers are verified and reviewed to ensure trust and safety.",
    },
    {
      q: "Can I talk to the person before I hire them?",
      a: "Yes, ULO allows you to communicate before making a final decision.",
    },
    {
      q: "How do I pay for the service?",
      a: "Payments are made securely through our platform.",
    },
    {
      q: "What if I don’t like the person I hired?",
      a: "You can request a replacement or leave a review. We want you satisfied.",
    },
    {
      q: "Is my information safe on ULO?",
      a: "Yes, we use encryption and privacy measures to protect your data.",
    },
  ];

  return (
    <section className="py-20 " id="faqs">
      <div className="max-w-[1136px] px-4 mx-auto space-y-10">
        <h2 className="text-[32px] font-bold text-center">
          Frequently asked questions
        </h2>

        <Tabs defaultValue="caregivers" className="w-full">
          <TabsList className="flex justify-center mx-auto w-[320px] px-4">
            <TabsTrigger
              value="careseekers"
              className="text-[#06212C] p-3 sm:p-6 text-sm sm:text-base font-semibold border-b border-primary flex-1 min-w-[140px] data-[state=active]:rounded-t-[12px] data-[state=active]:bg-[#FA6D4D4D] data-[state=active]:border-b-[3px] rounded-none text-center"
            >
              For careseekers
            </TabsTrigger>
            <TabsTrigger
              value="caregivers"
              className="text-[#06212C] p-3 sm:p-6 text-sm sm:text-base font-semibold border-b border-primary flex-1 min-w-[140px] data-[state=active]:rounded-t-[12px] data-[state=active]:bg-[#FA6D4D4D] data-[state=active]:border-b-[3px] rounded-none text-center"
            >
              For caregivers
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="caregivers"
            className="mt-16  max-w-[792px] mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-5">
              {qas.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border-none bg-[#D4E8DB] p-5 rounded-[12px]"
                >
                  <AccordionTrigger className="text-base text-[#0A3749] font-bold">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-[#335867] font-normal">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="" className="mt-8">
            <Accordion type="single" collapsible className="space-y-5">
              <AccordionItem
                value="caregiver-faq-1"
                className="border-none bg-[#D4E8DB] p-5 rounded-[12px]"
              >
                <AccordionTrigger className="text-base text-[#0A3749] font-bold">
                  How do I get hired on ULO?
                </AccordionTrigger>
                <AccordionContent className="text-base text-[#335867] font-normal">
                  Sign up as a caregiver, fill in your profile and list your
                  services. Once approved, clients will find and contact you.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
