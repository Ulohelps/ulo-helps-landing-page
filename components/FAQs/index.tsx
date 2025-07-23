import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
export function FAQs() {
  const qas = [
    {
      q: "How do I find someone to help me on ULO?",
      a: "Just go to the ULO website and open an account. Once you're done, tell us the kind of help you need like cleaner, nanny or cook and we’ll show you trusted people that match..",
    },
    {
      q: "What kind of workers can I get on ULO?",
      a: "Just go to the ULO website and open an account. Once you're done, tell us the kind of help you need like cleaner, nanny or cook and we’ll show you trusted people that match..",
    },
    {
      q: "Do I need to pay to use ULO?",
      a: "Just go to the ULO website and open an account. Once you're done, tell us the kind of help you need like cleaner, nanny or cook and we’ll show you trusted people that match..",
    },
    {
      q: "How do I know the workers are safe and real?",
      a: "Just go to the ULO website and open an account. Once you're done, tell us the kind of help you need like cleaner, nanny or cook and we’ll show you trusted people that match..",
    },
    {
      q: "Can I talk to the person before I hire them?",
      a: "We offer transparent hourly rates...",
    },
    {
      q: "How do I pay for the service?",
      a: "We offer transparent hourly rates...",
    },
    {
      q: "What if I don’t like the person I hired?",
      a: "We offer transparent hourly rates...",
    },
    {
      q: "Is my information safe on ULO?",
      a: "We offer transparent hourly rates...",
    },
  ];
  return (
    <section className="py-16 bg-[#f7fbfd]" id="faq">
      <div className="max-w-[1136px] mx-auto">
        <h2 className="text-[32px] font-bold text-center mb-6">
          Frequently Frequently asked questions
        </h2>
        <Tabs defaultValue="careseekers" className="w-full mt-6">
          {/* Absolute TabsList with relative parent */}

          <TabsList className="flex justify-center w-[348px] mx-auto">
            <TabsTrigger
              value="careseekers"
              className="text-[#06212C] p-6 text-base font-semibold border-b border-[#F6AA3D] w-full data-[state=active]:rounded-t-[12px] data-[state=active]:bg-[#FCE3BE] data-[state=active]:border-b-[3px] rounded-none"
            >
              For careseekers
            </TabsTrigger>
            <TabsTrigger
              value="caregivers"
              className="text-[#06212C] p-6 text-base font-semibold w-full data-[state=active]:rounded-t-[12px] data-[state=active]:bg-[#FCE3BE] data-[state=active]:border-[#F6AA3D] data-[state=active]:border-b-[3px] rounded-none"
            >
              For caregivers
            </TabsTrigger>
          </TabsList>

          {/* Active Tab Content */}
          <TabsContent value="careseekers" className="mt-8">
            {" "}
            <Accordion type="single" collapsible className="space-y-5">
              {qas.map((item, idx) => (
                <AccordionItem
                  value={`faq-${idx}`}
                  key={idx}
                  className="border-none bg-[#E9F6FC] p-5 rounded-[12px]"
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

          {/* Hired Tab Content */}
          <TabsContent value="caregivers"></TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
