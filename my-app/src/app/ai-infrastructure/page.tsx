'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Building2, 
  Globe, 
  Cpu, 
  Database, 
  Cloud, 
  Shield, 
  Zap, 
  Network,
  X,
  ChevronDown,
  AlertCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

import BinDocNavBar from '../../components/NavBar';
import BeleLogo from '../../components/BeleLogo';
import SectionTitle from '../../components/SectionTitle';
import ShinyText from '../../components/ShinyText';

export default function AIInfrastructure() {
  const [, setActiveSection] = useState('ai-overview');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Mobile detection with breakpoint synchronization
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSectionChange = (url: string) => {
    const sectionId = url.startsWith('#') ? url.slice(1) : url;
    setActiveSection(sectionId);
    
    // If it's a main page section, navigate to the main page
    if (['executive-summary', 'introduction', 'b2c-model', 'b2b-model', 'financial-overview', 'conclusion'].includes(sectionId)) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = isMobile ? 90 : 120;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll observer to update active section
  useEffect(() => {
    const sections = [
      'ai-overview',
      'system-architecture',
      'dashboard-gallery',
      'faq'
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const dashboardImages = [
    '/dashboards/environment_impact_dashboard.png',
    '/dashboards/map_route_dashboard.png',
    '/dashboards/municipality_dashboard.png',
    '/dashboards/ocr_vision_dashboard.png',
    '/dashboards/pickup_resources_dashboard.png',
    '/dashboards/waste_analytics_dashboard.png'
  ];

  const systemLayers = [
    {
      icon: Users,
      label: "📱 Citizens",
      title: "Resident Layer",
      description: "Every household interacts with a user-friendly mobile app and sensor-equipped bins. These devices detect overflow, classify waste types, and automatically signal when pickups are needed."
    },
    {
      icon: TrendingUp,
      label: "🚚 Gig Model", 
      title: "Driver Layer",
      description: "Freelance drivers dispatched on-demand via AI-powered routing algorithms. GPS, load sensors, and dashcam object recognition verify pickups and optimize delivery efficiency."
    },
    {
      icon: Building2,
      label: "🏛️ Governance",
      title: "Municipality Layer", 
      description: "Centralized dashboard offering complete visibility into waste flows: source, type, volume, and behavioral patterns. Governments finally get actionable, real-time intelligence."
    },
    {
      icon: BarChart3,
      label: "📊 Intelligence",
      title: "Data Layer",
      description: "Every action—pickup times, weights, user feedback—is converted into structured, timestamped, geo-tagged data. This becomes a valuable product for research and licensing."
    },
    {
      icon: Cpu,
      label: "🤖 Engine",
      title: "AI Coordination",
      description: "An orchestration layer connects everything. From prioritizing pickups based on traffic and urgency, to training computer vision models to recognize contamination."
    },
    {
      icon: Globe,
      label: "🌍 Impact",
      title: "Impact Layer",
      description: "Beyond the tech, the system drives real-world transformation: cleaner streets, transparent governance, job creation, and deep behavioral insights."
    }
  ];

  const faqData = [
    {
      question: "How does your AI differentiate from existing waste management solutions?",
      answer: "Unlike traditional collection companies, we're building an asset-light, AI-powered platform that organizes Lebanon's existing informal waste ecosystem. Our dual-track approach (B2C + B2B) creates a synergistic flywheel effect where each model strengthens the other, creating a defensible moat against competitors."
    },
    {
      question: "What's your go-to-market strategy given Lebanon's complex political landscape?",
      answer: "We're starting with municipalities that have the most acute waste crises and financial pressure. Our B2B platform offers immediate ROI through fuel savings (up to 40%), making it politically attractive. The B2C app then follows, creating a grassroots network that generates data to improve the B2B platform."
    },
    {
      question: "How do you plan to scale beyond Lebanon?",
      answer: "Our technology stack is designed for regional expansion. We're building modular components that can adapt to different regulatory environments. The data layer becomes increasingly valuable as we expand, creating network effects. We're targeting Jordan, Egypt, and other MENA countries with similar waste management challenges."
    },
    {
      question: "What's your competitive moat against global players like Compology or Junker?",
      answer: "Our deep understanding of Lebanon's informal waste economy is our primary advantage. Global players don't understand the local context - the kabaris, muallims, and complex social networks. We're not replacing this system; we're digitizing and optimizing it. Plus, our dual-track model creates unique synergies that single-purpose solutions can't match."
    },
    {
      question: "How do you address the chicken-and-egg problem in your marketplace?",
      answer: "We're solving this through strategic partnerships. Municipalities sponsor the B2C app for residents, creating initial demand. We partner with existing informal collectors, giving them better tools and routes. The B2B platform provides immediate value, funding the B2C expansion. It's a carefully orchestrated ecosystem launch."
    },
    {
      question: "What's your revenue model and path to profitability?",
      answer: "B2B: Tiered SaaS subscriptions ($5K-50K/month) plus gain-share models where we take 30-50% of documented savings. B2C: 15-20% commission on valuable materials, $1-2 convenience fees, SME subscriptions. Data licensing becomes a third revenue stream. We project profitability by Year 3 with $5.8M revenue."
    },
    {
      question: "How do you handle regulatory compliance and government relations?",
      answer: "We're positioning ourselves as a compliance partner, not a competitor. Our platform helps municipalities meet Law 80/2018 requirements for waste tracking and reporting. We provide transparency that builds public trust. By working with existing systems rather than against them, we minimize regulatory friction."
    },
    {
      question: "What's your team's background and why are you uniquely positioned?",
      answer: "Our founding team combines deep local market knowledge with international tech experience. We understand both the informal waste economy and enterprise software. We've built relationships with key stakeholders and have technical expertise in AI, IoT, and logistics optimization. This combination is rare in the Lebanese startup ecosystem."
    }
  ];

  return (
    <div className="min-h-screen animated-bg">
      <BinDocNavBar onNavigate={handleSectionChange} />
      
      {/* Simple break/space */}
      <div className="h-32"></div>
      
      {/* Hero Section */}
      <motion.section
        id="ai-overview"
        {...fadeInUp}
        className="section-wrapper space-y-6"
      >
        <div className="relative glass p-4 sm:p-6 lg:p-8 overflow-hidden group mx-4 sm:mx-6 lg:mx-8">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/3 via-transparent to-green-400/3 group-hover:from-yellow-400/5 group-hover:to-green-400/5 transition-all duration-700"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl group-hover:bg-yellow-400/10 transition-all duration-1000"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-400/5 rounded-full blur-3xl group-hover:bg-green-400/10 transition-all duration-1000"></div>
          
          <div className="relative">
            <motion.h1 
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 lg:mb-16"
            >
              <ShinyText text="AI-Powered Infrastructure: A Dynamic System, Not Just an App" />
            </motion.h1>

            <div className="space-y-6 sm:space-y-8 text-gray-300 leading-relaxed">
              <p className="text-lg sm:text-xl leading-relaxed">
                What we're building isn't just a trash collection app—it's a fully integrated, AI-powered infrastructure that dynamically connects citizens, drivers, and municipalities in real time. It's designed not just to clean up Lebanon's streets, but to generate entirely new data flows, optimize urban logistics, and unlock monetizable insights across the entire waste lifecycle.
              </p>
              
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 p-6 sm:p-8 rounded-lg border border-yellow-400/30">
                <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                  BinDoc.AI is not an app. It's the <strong className="text-yellow-400">operating system</strong> for a cleaner, smarter Lebanon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* System Architecture */}
      <motion.section
        id="system-architecture"
        {...fadeInUp}
        className="section-wrapper space-y-8"
      >
        <div className="glass p-8">
          <SectionTitle text="The AI Stack: A Living Ecosystem" level="h2" className="mb-8" />
          
          <div className="mb-8">
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Our solution introduces a feedback-driven, data-optimized, AI-managed model that treats waste as a system—not a symptom. It's scalable, transparent, and designed to evolve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemLayers.map((layer, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-black/40 to-black/20 p-8 rounded-xl border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 group cursor-pointer min-h-[320px] flex flex-col justify-center"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6 justify-center">
                  <layer.icon className="w-10 h-10 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                  <span className="text-2xl font-bold text-yellow-400">{layer.label}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4 text-center group-hover:text-yellow-300 transition-colors">
                  {layer.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed text-center group-hover:text-gray-200 transition-colors px-4">
                  {layer.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Dashboard Gallery */}
      <motion.section
        id="dashboard-gallery"
        {...fadeInUp}
        className="section-wrapper space-y-8"
      >
        <div className="glass p-8">
          <SectionTitle text="Dashboard Intelligence: Real-Time Control Centers" level="h2" className="mb-8" />
          
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Our platform provides comprehensive dashboards for every stakeholder in the waste ecosystem. From real-time route optimization to predictive analytics, these interfaces transform raw data into actionable intelligence.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {dashboardImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Dashboard ${index + 1}`}
                  className="w-full h-48 object-cover transition-all duration-300 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">Click to view</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        {...fadeInUp}
        className="section-wrapper space-y-8 mb-20"
      >
        <div className="glass p-8">
          <SectionTitle text="Frequently Asked Questions" level="h2" className="mb-8" />
          
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-yellow-400/20 rounded-xl overflow-hidden bg-gradient-to-r from-yellow-400/5 to-transparent hover:from-yellow-400/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-yellow-400/5 transition-all duration-300 group"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-white font-medium text-lg group-hover:text-yellow-400 transition-colors duration-300">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                    <ChevronDown 
                      className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300"
                    />
                  </motion.div>
                </button>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-6 pb-6"
                  >
                    <div className="border-t border-yellow-400/20 pt-4">
                      <p className="text-gray-300 leading-relaxed text-lg">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-8">
        <div className="w-full px-4">
          <div className="glass p-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <BeleLogo size="sm" animated={false} />
                <div className="text-sm text-gray-400">
                  <p>© 2025 BinDoc.AI - All rights reserved</p>
                  <p>AI-Powered Infrastructure Platform</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400">
                  This is a <strong className="text-yellow-400">confidential technical overview</strong> for investor review only. 
                  Specifications and data are preliminary.
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-500 text-center">
                Sources: Technical specifications, system architecture, internal analytics. 
                All projections are estimates based on current development milestones and should not be considered final specifications.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Dashboard"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

