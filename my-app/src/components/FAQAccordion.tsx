'use client';

import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How does BinDoc.AI make money?",
    answer: "BinDoc.AI operates on a diversified revenue model with three main streams: (1) 15-20% commission on valuable materials like aluminum and copper through our B2C marketplace, (2) Fixed convenience fees of $1-2 for low-value materials, and (3) B2B SaaS subscriptions for municipalities and enterprises ranging from basic monitoring to enterprise intelligence packages. Additionally, we offer SME subscriptions at $30/month and innovative gain-share models where we take 30-50% of documented cost savings."
  },
  {
    question: "What is BinDoc.AI's competitive moat?",
    answer: "Our defensible advantage lies in the synergistic flywheel between our B2C and B2B models. The B2B platform gives municipalities cost savings to sponsor the B2C app for residents, while B2C data feeds back to make the B2B platform smarter. This creates network effects that are difficult to replicate. Combined with our AI-powered dynamic valuation, predictive hotspot mapping, and 'Trace Your Trash' transparency features, we've built a comprehensive ecosystem rather than just a single product."
  },
  {
    question: "Why is Lebanon the right market for this solution?",
    answer: "Lebanon's waste crisis presents a perfect storm of opportunity: over 80% of 2+ million tons of annual waste is mismanaged at $154.50/ton (higher than regional peers), the system is fragmented with no dominant technology player, and there's strong citizen frustration driving demand for solutions. The decentralized nature actually favors our flexible, technology-enabled approach over traditional infrastructure-heavy solutions."
  },
  {
    question: "How do you plan to scale beyond Lebanon?",
    answer: "Lebanon serves as our proof-of-concept for similar emerging markets facing waste management crises. Our asset-light, AI-powered platform can be rapidly deployed to other Middle Eastern and developing countries with similar challenges. The learnings from Lebanon's complex informal waste economy will give us significant advantages in other fragmented markets where traditional waste management has failed."
  },
  {
    question: "What's your customer acquisition strategy?",
    answer: "We're implementing a dual-track approach: For B2C, we're partnering with municipalities (who become sponsors), retail chains like Spinneys and Carrefour for take-back programs, and telecom operators for loyalty point integration. For B2B, we're targeting financially-pressured municipalities with our compelling ROI pitch of 40% cost reduction with 12-month payback, plus positioning ourselves as essential partners for international development funding compliance."
  },
  {
    question: "How do you handle the informal waste sector?",
    answer: "Rather than disrupting the informal sector, we empower it. Our platform connects households with formalized informal collectors (kabaris), providing them with optimized routes, fair pricing through AI valuation, and steady income streams. This approach transforms informal workers into valued partners rather than competitors, creating a more inclusive and sustainable ecosystem."
  },
  {
    question: "What's your total addressable market?",
    answer: "Lebanon's waste management market represents over $300M annually (2M tons × $154.50/ton). Our serviceable addressable market includes both the consumer recycling segment and municipal operational budgets. With proven success in Lebanon, we can expand to similar markets across the MENA region, representing a multi-billion dollar opportunity in waste management optimization."
  },
  {
    question: "How does your AI technology work?",
    answer: "Our AI stack operates on three levels: (1) Computer vision for real-time material identification and quality grading, (2) Predictive analytics for route optimization and demand forecasting, and (3) IoT integration with smart sensors for fill-level monitoring. The system learns continuously from user behavior and operational data to improve accuracy and efficiency over time."
  },
  {
    question: "What funding do you need and how will it be used?",
    answer: "We're seeking initial funding to complete our MVP development, deploy pilot programs with 2-3 municipalities, build our collector network, and validate our unit economics. The funds will be allocated primarily to technology development (40%), pilot operations (30%), team expansion (20%), and marketing/partnerships (10%). Our goal is to achieve profitability by Year 2 with clear path to regional expansion."
  },
  {
    question: "What are the biggest risks to the business?",
    answer: "Key risks include regulatory changes in waste management policies, competition from well-funded international players, and potential resistance from existing waste management contractors. We mitigate these through strong government partnerships, superior technology differentiation, and our strategy of empowering rather than replacing existing stakeholders. Our dual-revenue model also provides resilience against single-point failures."
  }
];

const FAQAccordion: React.FC<Partial<FAQAccordionProps>> = ({ 
  items = faqItems, 
  className = "" 
}) => {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <Accordion.Root
        type="multiple"
        className="space-y-4"
      >
        {items.map((item, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="group glass border border-yellow-400/20 rounded-lg overflow-hidden hover:border-yellow-400/40 transition-all duration-300"
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between p-6 text-left hover:bg-yellow-400/5 transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:ring-inset">
                <motion.h3 
                  className="text-lg font-semibold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent leading-tight"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.question}
                </motion.h3>
                <motion.div
                  className="flex-shrink-0 ml-4"
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown 
                    className="w-5 h-5 text-yellow-400 group-data-[state=open]:rotate-180 transition-transform duration-300 ease-in-out" 
                  />
                </motion.div>
              </Accordion.Trigger>
            </Accordion.Header>
            
            <AnimatePresence initial={false}>
              <Accordion.Content 
                className="overflow-hidden"
                forceMount
              >
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: "auto", 
                    opacity: 1,
                    transition: {
                      height: { duration: 0.4, ease: "easeOut" },
                      opacity: { duration: 0.3, delay: 0.1 }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3, ease: "easeIn" },
                      opacity: { duration: 0.2 }
                    }
                  }}
                  className="data-[state=closed]:hidden"
                >
                  <div className="p-6 pt-0">
                    <motion.div 
                      className="glass-inner p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/5"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ 
                        y: 0, 
                        opacity: 1,
                        transition: { delay: 0.2, duration: 0.3 }
                      }}
                      exit={{ y: -10, opacity: 0 }}
                    >
                      <p className="text-gray-300 leading-relaxed text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </Accordion.Content>
            </AnimatePresence>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default FAQAccordion;
