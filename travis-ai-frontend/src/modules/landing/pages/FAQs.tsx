import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/modern-ui/accordion";
import { faqs } from "../libs/faqs";
import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/motion";
const FAQs = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-4 min-h-screen"
    >
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUpVariants}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <AccordionItem
              value={`item-${index}`}
              className="overflow-hidden rounded-xl border border-m-accent shadow-sm transition-shadow hover:shadow-lg"
            >
              <AccordionTrigger className="px-6 py-4 text-left text-lg transition-all duration-200 cursor-pointer data-[state=open]:text-m-accent">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="overflow-hidden">
                <div className="px-6 pb-5 pt-3 leading-relaxed">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default FAQs;
