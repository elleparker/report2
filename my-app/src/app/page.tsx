'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Target, BarChart3, AlertCircle, Lightbulb, HelpCircle } from 'lucide-react';

import BinDocNavBar from '../components/NavBar';
import BeleLogo from '../components/BeleLogo';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import { 
  WasteVolumeChart, 
  CompetitorAnalysisChart, 
  WasteCompositionChart, 
  RevenueProjectionChart,
  AnimatedMetricCard 
} from '../components/Charts';
import { Cover } from '../components/ui/cover';
import FAQAccordion from '../components/FAQAccordion';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

export default function Home() {
  const [, setActiveSection] = useState('executive-summary');
  const [isMobile, setIsMobile] = useState(false);

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
    // Handle both URL format (#section) and direct section ID
    const sectionId = url.startsWith('#') ? url.slice(1) : url;
    
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Responsive navigation height with proper breakpoints
      // Mobile (≤640px): 90px, Desktop (>640px): 120px
      // Alternative: derive from CSS variables for better maintainability
      const navHeight = isMobile ? 90 : 120;
      
      // Optional CSS variable approach:
      // const navHeight = isMobile 
      //   ? parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height-mobile')) || 90
      //   : parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height-desktop')) || 120;
      
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
      'executive-summary',
      'introduction',
      'b2c-model',
      'b2c-competitive',
      'b2c-proposition',
      'b2c-monetization',
      'b2c-partnerships',
      'b2b-model',
      'b2b-competitive',
      'b2b-proposition',
      'b2b-monetization',
      'b2b-partnerships',
      'financial-overview',
      'conclusion',
      'faq',
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

  return (
    <div className="min-h-screen animated-bg">
      <BinDocNavBar onNavigate={handleSectionChange} />
      
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="px-4 pb-10">
        <div className="w-full">
        
        {/* Executive Summary */}
        <motion.section
          id="executive-summary"
          {...fadeInUp}
          className="section-wrapper space-y-6"
        >
          <div className="relative glass p-8 overflow-hidden group">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/3 via-transparent to-green-400/3 group-hover:from-yellow-400/5 group-hover:to-green-400/5 transition-all duration-700"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl group-hover:bg-yellow-400/10 transition-all duration-1000"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-400/5 rounded-full blur-3xl group-hover:bg-green-400/10 transition-all duration-1000"></div>
            
            <div className="relative">
            <motion.h1 
              initial={{ opacity: 10, y: 80 }}
              animate={{ opacity: 10, y: 10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 gradient-text"
            >
              BinDoc.AI: <Cover particleColor="#FACC15">Executive Summary</Cover>
            </motion.h1>

             <div className="space-y-16 sm:space-y-20 text-gray-300 leading-relaxed">
               <div>
                 <SectionTitle text="The Problem:" level="h3" className="mb-8" />
                 <p className="text-lg leading-relaxed">
                   Lebanon faces a chronic and costly waste management crisis, with over <strong className="text-white">80%</strong> of its <strong className="text-white">2 million+</strong> annual tons of waste being mismanaged at an exorbitant cost. Decades of political paralysis and failed top-down initiatives have created a vacuum, leaving waste management to a fragmented and inefficient system of municipalities and informal networks. This national failure presents a significant, untapped economic opportunity for a pragmatic, technology-driven solution.
                 </p>
               </div>

               <div>
                 <SectionTitle text="Our Solution:" level="h3" className="mb-8" />
                 <p className="text-lg leading-relaxed mb-12">
                   BinDoc.AI is not another collection company. It is an asset-light, AI-powered technology platform designed to organize, optimize, and monetize Lebanon's existing waste ecosystem. We employ a synergistic dual-track strategy to attack the problem from both the bottom-up and the top-down:
                 </p>
                 
                 <div className="grid md:grid-cols-2 gap-8 mb-8">
                   <motion.div 
                     whileHover={{ scale: 1.02, y: -5 }}
                     transition={{ duration: 0.3 }}
                     className="bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-lg border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 group cursor-pointer"
                   >
                     <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                       <Users className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                       1. B2C Consumer Model:
                     </h4>
                     <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors mb-3">
                       A mobile app that acts as the "Uber for waste," connecting households and SMEs with a network of formalized informal collectors. Using AI-powered image recognition, the app helps users sort, value, and schedule pickups for their recyclables, making the process simple, transparent, and rewarding. This empowers citizens and provides collectors with optimized routes and increased income.
                     </p>
                     <div className="text-xs text-yellow-400/70 font-medium">💡 Consumer-Focused • AI-Powered • Scalable</div>
                   </motion.div>
                   
                   <motion.div 
                     whileHover={{ scale: 1.02, y: -5 }}
                     transition={{ duration: 0.3 }}
                     className="bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-lg border border-green-400/30 hover:border-green-400/50 transition-all duration-300 group cursor-pointer"
                   >
                     <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                       <BarChart3 className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors" />
                       2. B2B Enterprise Model:
                     </h4>
                     <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors mb-3">
                       An IoT and AI platform for municipalities and large enterprises that provides a clear and rapid return on investment. By deploying smart sensors in dumpsters, our AI analyzes fill-levels and calculates hyper-efficient collection routes, demonstrably cutting fleet fuel and operational costs by up to <strong className="text-white">40%</strong>. The platform provides a "Mayor's Dashboard" for data-driven governance and public transparency.
                     </p>
                     <div className="text-xs text-green-400/70 font-medium">🏢 Enterprise-Grade • IoT Integration • Cost Reduction</div>
                   </motion.div>
                 </div>
               </div>

               <div>
                 <SectionTitle text="The Flywheel Effect:" level="h3" className="mb-8" />
                 <p className="text-lg leading-relaxed">
                   The B2C and B2B models are not separate; they are interlocking gears that create a powerful, defensible ecosystem. The B2B platform gives municipalities the financial savings to sponsor the B2C app for their residents. The B2C app, in turn, improves sorting-at-source and generates valuable data that makes the B2B platform smarter. This synergy creates a virtuous cycle and a significant moat against competitors.
                 </p>
               </div>

               <div>
                 <SectionTitle text="Market & Vision:" level="h3" className="mb-8" />
                 <p className="text-lg leading-relaxed">
                   BinDoc.AI is positioned to capture a significant share of Lebanon's multi-million dollar waste management market. Our competitive advantage lies in our practical AI that delivers tangible value, our deep understanding of the local context, and our strategy for building trust through radical transparency (e.g., our "Trace Your Trash" feature).
                 </p>
               </div>

               <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 p-8 rounded-lg border border-yellow-400/30">
                 <p className="text-xl font-medium text-white leading-relaxed">
                   An investment in BinDoc.AI is an investment in a <strong className="text-yellow-400">scalable, profitable, and deeply impactful</strong> venture. We are building the foundational, intelligent infrastructure for Lebanon's entire circular economy, with a clear vision for regional expansion.
                 </p>
               </div>
             </div>
            </div>
          </div>
        </motion.section>

          {/* Introduction: Investment Opportunity */}
          
          <motion.section
            id="introduction"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <h1 className="mb-8 sm:mb-12">BinDoc.AI Strategic Investment <Cover particleColor="#FACC15">Report</Cover></h1>
              <SectionTitle text="A Pragmatic, Technology-Driven Solution for Lebanon's Waste Crisis" level="h2" className="mb-8 sm:mb-12" />
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed mb-12">
                  Lebanon&apos;s waste management sector is not merely a public service issue; it is a profound economic, environmental, and public health catastrophe. 
                  The country generates over <strong className="text-white">2 million tons</strong> of solid waste annually, with over <strong className="text-white">80%</strong> being mismanaged through open dumping and burning, 
                  at an exorbitant cost of approximately <strong className="text-white">$154.50 per ton</strong>—significantly higher than regional peers.
                </p>
                
                <div className="data-highlight">
                  <SectionTitle text="Core Investment Thesis" level="h3" className="mb-3" />
                  <p className="text-gray-300 leading-relaxed mb-4">
                    This systemic collapse creates a significant and untapped economic opportunity. The fragmentation and decentralization of Lebanon&apos;s waste sector 
                    makes it uniquely suited for a flexible, technology-enabled solution like BinDoc.AI.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong className="text-white">Dual-track strategy</strong>: B2C Consumer Model + B2B Enterprise Model</li>
                    <li>• <strong className="text-white">Market gap</strong>: No technology platform organizing the informal waste economy</li>
                    <li>• <strong className="text-white">Financial opportunity</strong>: Transform cost centers into profit centers</li>
                    <li>• <strong className="text-white">Social impact</strong>: Empower informal workers and create dignified employment</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Market Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatedMetricCard
                title="Annual Waste Generated"
                value="2M tons"
                change="Growing"
                trend="up"
                icon={<BarChart3 className="w-6 h-6" />}
              />
              <AnimatedMetricCard
                title="Mismanaged Waste"
                value="80%"
                change="Crisis"
                trend="down"
                icon={<AlertCircle className="w-6 h-6" />}
              />
              <AnimatedMetricCard
                title="Cost Per Ton"
                value="$154.50"
                change="High"
                trend="down"
                icon={<DollarSign className="w-6 h-6" />}
              />
              <AnimatedMetricCard
                title="Potential Revenue"
                value="$1.5M+"
                change="Annually"
                trend="up"
                icon={<TrendingUp className="w-6 h-6" />}
              />
            </div>
          </motion.section>

          {/* B2C Consumer Model Overview */}
          <motion.section
            id="b2c-model"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex-shrink-0">
                  <Users className="w-8 h-8 text-yellow-400" />
                </span>
                <Cover particleColor="#FACC15">Part I: The BinDoc.AI B2C Consumer Model</Cover>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Organizing chaos and creating value through a grassroots network that tackles the problem from the bottom up, 
                empowering citizens and the informal sector with AI-powered logistics and marketplace solutions.
              </p>
              
              <WasteVolumeChart />
            </div>
          </motion.section>

          {/* B2C Competitive Arena */}
          <motion.section
            id="b2c-competitive"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <SectionTitle 
                text="B2C Competitive Arena: Mapping a Fragmented Ecosystem" 
                level="h3" 
                icon={<Target className="w-6 h-6 text-yellow-400" />}
                className="mb-6"
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Direct Digital Competitors</h4>
                  <div className="space-y-4">
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Live Love Recycle (LLR)</h5>
                      <p className="text-gray-300 text-sm mb-2">NGO-driven, on-demand collection service serving 25,000+ subscribers</p>
                      <p className="text-red-400 text-sm"><strong>Weakness:</strong> Unsustainable funding model dependent on grants</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Nadeera</h5>
                      <p className="text-gray-300 text-sm mb-2">AI-powered mobile app for identifying recyclables</p>
                      <p className="text-red-400 text-sm"><strong>Weakness:</strong> No collection logistics - just identification</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Informal & Indirect Competitors</h4>
                  <div className="space-y-4">
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Informal Sector (Kabaris & Muallims)</h5>
                      <p className="text-gray-300 text-sm mb-2">Street-level waste pickers and scrapyard masters</p>
                      <p className="text-green-400 text-sm"><strong>Opportunity:</strong> Empower, don't replace - potential supply chain partners</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">P2P Marketplaces (OLX, Facebook)</h5>
                      <p className="text-gray-300 text-sm mb-2">Default solution for bulky waste disposal</p>
                      <p className="text-red-400 text-sm"><strong>Weakness:</strong> Inefficient, no trust mechanisms, opaque pricing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <CompetitorAnalysisChart />
          </motion.section>

          {/* B2C Value Proposition */}
          <motion.section
            id="b2c-proposition"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <SectionTitle text="Fortifying the B2C Proposition: Blueprint for Adoption and Loyalty" level="h3" className="mb-6" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">SWOT Analysis</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h5 className="text-green-400 font-medium mb-2">Strengths</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Asset-light, highly scalable model</li>
                        <li>• Addresses daily citizen frustration</li>
                        <li>• Positive social impact potential</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <h5 className="text-red-400 font-medium mb-2">Challenges</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Marketplace chicken-and-egg problem</li>
                        <li>• Requires smartphone penetration</li>
                        <li>• Potential resistance from middlemen</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">AI Differentiator</h4>
                  <div className="space-y-4">
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Dynamic Valuation</h5>
                      <p className="text-gray-300 text-sm">AI identifies material grades (PET Grade A vs HDPE Grade B) and provides real-time market pricing</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Predictive Hotspot Mapping</h5>
                      <p className="text-gray-300 text-sm">Algorithm analyzes patterns to predict waste accumulation and optimize collection routes</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">"Trace Your Trash" Feature</h5>
                      <p className="text-gray-300 text-sm">Users can track their recyclables from pickup to final destination, building unprecedented trust</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* B2C Monetization */}
          <motion.section
            id="b2c-monetization"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <SectionTitle text="B2C Monetization: Diverse and Resilient Revenue Streams" level="h3" className="mb-6" />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">Commission Model</h4>
                  <p className="text-3xl font-bold text-white mb-2">15-20%</p>
                  <p className="text-gray-300 text-sm">Commission on valuable materials (aluminum, copper, e-waste)</p>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">Convenience Fee</h4>
                  <p className="text-3xl font-bold text-white mb-2">$1-2</p>
                  <p className="text-gray-300 text-sm">Fixed fee for low-value materials (glass, mixed paper)</p>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">SME Subscriptions</h4>
                  <p className="text-3xl font-bold text-white mb-2">$30/mo</p>
                  <p className="text-gray-300 text-sm">Monthly subscriptions for small businesses</p>
                </div>
              </div>

              <RevenueProjectionChart />
            </div>
          </motion.section>

          {/* B2C Partnerships */}
          <motion.section
            id="b2c-partnerships"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <SectionTitle text="The B2C Partnership Nexus: Beyond the Obvious" level="h3" className="mb-6" />
              
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                initial={{y: 40, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                viewport={{once: true}}
                transition={{duration: 0.6}}
              >
                <motion.div
                  initial={{y: 40, opacity: 0}}
                  whileInView={{y: 0, opacity: 1}}
                  viewport={{once: true}}
                  transition={{duration: 0.6, delay: 0.1}}
                >
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Strategic Partnerships</h4>
                  <div className="space-y-4">
                    <motion.div 
                      className="data-highlight"
                      initial={{y: 40, opacity: 0}}
                      whileInView={{y: 0, opacity: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.2}}
                    >
                      <h5 className="text-white font-medium mb-2">Retail & FMCG Sector</h5>
                      <p className="text-gray-300 text-sm">Partner with Spinneys, Carrefour for take-back programs. Users scan barcodes for subsidized pickups.</p>
                    </motion.div>
                    <motion.div 
                      className="data-highlight"
                      initial={{y: 40, opacity: 0}}
                      whileInView={{y: 0, opacity: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.3}}
                    >
                      <h5 className="text-white font-medium mb-2">Real Estate & Property</h5>
                      <p className="text-gray-300 text-sm">Building-wide subscriptions as premium amenity. "BinDoc.AI Certified Green Building" marketing.</p>
                    </motion.div>
                    <motion.div 
                      className="data-highlight"
                      initial={{y: 40, opacity: 0}}
                      whileInView={{y: 0, opacity: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.4}}
                    >
                      <h5 className="text-white font-medium mb-2">Telecom Operators</h5>
                      <p className="text-gray-300 text-sm">Alfa, Touch loyalty point integration. Redeem points for pickup credits.</p>
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{y: 40, opacity: 0}}
                  whileInView={{y: 0, opacity: 1}}
                  viewport={{once: true}}
                  transition={{duration: 0.6, delay: 0.2}}
                >
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Academic Partnerships</h4>
                  <div className="space-y-4">
                    <motion.div 
                      className="data-highlight"
                      initial={{y: 40, opacity: 0}}
                      whileInView={{y: 0, opacity: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.5}}
                    >
                      <h5 className="text-white font-medium mb-2">Universities (AUB, LAU, USJ)</h5>
                      <p className="text-gray-300 text-sm">Provide datasets for research, host hackathons, recruit talent pipeline.</p>
                    </motion.div>
                    <motion.div 
                      className="data-highlight"
                      initial={{y: 40, opacity: 0}}
                      whileInView={{y: 0, opacity: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.6}}
                    >
                      <h5 className="text-white font-medium mb-2">NGO Collaboration</h5>
                      <p className="text-gray-300 text-sm">Partner with Arcenciel for verified material streams, Recycle Lebanon for awareness campaigns.</p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
    </motion.section>


    {/* B2B Enterprise Model Overview */}
          <motion.section
            id="b2b-model"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex-shrink-0">
                  <BarChart3 className="w-8 h-8 text-yellow-400" />
                </span>
                <Cover particleColor="#FACC15">Part II: The BinDoc.AI B2B Enterprise Model</Cover>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                The irrefutable case for efficiency and control. A paradigm shift from brute-force operations to data-driven intelligence 
                for municipalities and large enterprises struggling with escalating waste management costs.
              </p>
            </div>
          </motion.section>

          {/* B2B Competitive Analysis */}
          <motion.section
            id="b2b-competitive"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <SectionTitle text="B2B Competitive Arena: Challenging Incumbents and Foreign Giants" level="h3" className="mb-6" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Incumbent Contractors</h4>
                  <div className="space-y-4">
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Ramco</h5>
                      <p className="text-gray-300 text-sm mb-2">Current contractor for Beirut and Metn & Keserwan</p>
                      <p className="text-red-400 text-sm"><strong>Weakness:</strong> Traditional, operational-only model. No data intelligence.</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Sukleen/Averda Legacy</h5>
                      <p className="text-gray-300 text-sm mb-2">Two-decade tenure with public distrust</p>
                      <p className="text-red-400 text-sm"><strong>Issues:</strong> Monopoly accusations, inflated costs ($140/ton), opacity</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Global Benchmarks</h4>
                  <div className="space-y-4">
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Compology (US)</h5>
                      <p className="text-gray-300 text-sm mb-2">AI-powered bin monitoring and route optimization</p>
                      <p className="text-green-400 text-sm"><strong>Results:</strong> 40% cost reduction, 80% contamination decrease</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Junker (Italy)</h5>
                      <p className="text-gray-300 text-sm mb-2">Municipality-subscription model for citizen engagement</p>
                      <p className="text-green-400 text-sm"><strong>Validation:</strong> Municipalities pay for digital citizen tools</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* B2B Value Proposition */}
          <motion.section
            id="b2b-proposition"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">Fortifying the B2B Proposition: Political and Financial Survival</h3>
              
              <div className="data-highlight mb-8">
                <h4 className="text-yellow-400 font-semibold mb-3">The Core Pitch</h4>
                <p className="text-xl text-white font-bold mb-2">
                  "Our platform can reduce your fleet's fuel consumption by up to 40%, with a payback period of less than 12 months."
                </p>
                <p className="text-gray-300">
                  Lebanese municipalities face extreme financial pressure. Fuel costs are their largest, most volatile expense. 
                  This positions BinDoc.AI as a self-funding investment in fiscal survival.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AnimatedMetricCard
                  title="Cost Reduction"
                  value="40%"
                  change="Savings"
                  trend="up"
                  icon={<TrendingUp className="w-6 h-6" />}
                />
                <AnimatedMetricCard
                  title="Payback Period"
                  value="12 months"
                  change="Investment"
                  trend="down"
                  icon={<DollarSign className="w-6 h-6" />}
                />
                <AnimatedMetricCard
                  title="Data Compliance"
                  value="Law 80/2018"
                  change="Compliance"
                  trend="up"
                  icon={<Target className="w-6 h-6" />}
                />
              </div>
            </div>
          </motion.section>

          {/* B2B Monetization */}
          <motion.section
            id="b2b-monetization"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">B2B Monetization: Scalable, Long-Term Contracts</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-3">Tier 1: Basic Monitoring</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Real-time fill-level data</li>
                    <li>• Basic overflow alerts</li>
                    <li>• Entry-level pricing</li>
                  </ul>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-3">Tier 2: Professional Optimization</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• AI route optimization</li>
                    <li>• Analytics dashboard</li>
                    <li>• Historical data access</li>
                  </ul>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-3">Tier 3: Enterprise Intelligence</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• AI contamination detection</li>
                    <li>• Predictive analytics</li>
                    <li>• API integration</li>
                    <li>• Public-facing dashboard</li>
                  </ul>
                </div>
              </div>

              <div className="data-highlight">
                <h4 className="text-yellow-400 font-semibold mb-4">Innovative Models</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-medium mb-2">Gain-Share Model</h5>
                    <p className="text-gray-300 text-sm">Lower fixed fee + 30-50% of documented savings. Aligns incentives perfectly.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Recyclables Revenue Share</h5>
                    <p className="text-gray-300 text-sm">Percentage of additional revenue from improved sorting quality.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* B2B Partnerships */}
          <motion.section
            id="b2b-partnerships"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >

          {/* AI Technology */}
          <motion.section
            id="ai-technology"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8 border border-yellow-400">
              <SectionTitle text="AI Technology" level="h2" className="mb-6" />
              <div className="space-y-6">
                <ScrollStackItem itemClassName="glass p-4 rounded-lg border border-yellow-400">
                  <h4 className="text-xl font-bold mb-2 text-white">Sensor Layer</h4>
                  <p className="text-gray-300">Smart IoT sensors deployed in dumpsters monitor fill levels, temperature, and contamination in real-time.</p>
                </ScrollStackItem>
                
                <ScrollStackItem itemClassName="glass p-4 rounded-lg border border-yellow-400">
                  <h4 className="text-xl font-bold mb-2 text-white">Edge AI</h4>
                  <p className="text-gray-300">Local processing units analyze waste composition and optimize collection routes without relying on cloud connectivity.</p>
                </ScrollStackItem>
                
                <ScrollStackItem itemClassName="glass p-4 rounded-lg border border-yellow-400">
                  <h4 className="text-xl font-bold mb-2 text-white">Cloud Optimizer</h4>
                  <p className="text-gray-300">Central intelligence platform that aggregates data from all sensors to provide city-wide optimization insights.</p>
                </ScrollStackItem>
                
                <ScrollStackItem itemClassName="glass p-4 rounded-lg border border-yellow-400">
                  <h4 className="text-xl font-bold mb-2 text-white">Marketplace API</h4>
                  <p className="text-gray-300">Connects formal and informal waste collectors with real-time demand data and pricing intelligence.</p>
                </ScrollStackItem>
                
                <ScrollStackItem itemClassName="glass p-4 rounded-lg border border-yellow-400">
                  <h4 className="text-xl font-bold mb-2 text-white">Transparency Ledger</h4>
                  <p className="text-gray-300">Blockchain-based tracking system that enables citizens to trace their waste from collection to final processing.</p>
                </ScrollStackItem>
                
                <ScrollStackItem itemClassName="glass p-4 rounded-lg border border-yellow-400">
                  <h4 className="text-xl font-bold mb-2 text-white">Data Science Portal</h4>
                  <p className="text-gray-300">Advanced analytics dashboard for municipalities to make data-driven decisions and demonstrate compliance.</p>
                </ScrollStackItem>
              </div>
            </div>
          </motion.section>
            <div className="glass p-8">
              <h3 className="mb-6">B2B Partnership Nexus: Ecosystem of Credibility</h3>
              
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                initial={{y: 40, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                viewport={{once: true}}
                transition={{duration: 0.6}}
              >
                <motion.div
                  initial={{y: 40, opacity: 0}}
                  whileInView={{y: 0, opacity: 1}}
                  viewport={{once: true}}
                  transition={{duration: 0.6, delay: 0.1}}
                >
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">International Development</h4>
                  <div className="space-y-4">
                    <motion.div 
                      className="data-highlight"
                      initial={{y: 40, opacity: 0}}
                      whileInView={{y: 0, opacity: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.2}}
                    >
                      <h5 className="text-white font-medium mb-2">World Bank, UNDP, USAID</h5>
                      <p className="text-gray-300 text-sm">Position as "Monitoring, Evaluation & Learning" partner for accountability and impact measurement.</p>
                    </motion.div>
                    <motion.div 
                      className="data-highlight"
                      initial={{y: 40, opacity: 0}}
                      whileInView={{y: 0, opacity: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.3}}
                    >
                      <h5 className="text-white font-medium mb-2">USAID DAWERR Program</h5>
                      <p className="text-gray-300 text-sm">Embed platform as mandatory MEL component for grant requirements.</p>
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{y: 40, opacity: 0}}
                  whileInView={{y: 0, opacity: 1}}
                  viewport={{once: true}}
                  transition={{duration: 0.6, delay: 0.2}}
                >
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Financial & Insurance</h4>
                  <div className="space-y-4">
                    <motion.div 
                      className="data-highlight"
                      initial={{y: 40, opacity: 0}}
                      whileInView={{y: 0, opacity: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.4}}
                    >
                      <h5 className="text-white font-medium mb-2">Lebanese Banks</h5>
                      <p className="text-gray-300 text-sm">Green financing packages where loan repayments come from operational savings.</p>
                    </motion.div>
                    <motion.div 
                      className="data-highlight"
                      initial={{y: 40, opacity: 0}}
                      whileInView={{y: 0, opacity: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.5}}
                    >
                      <h5 className="text-white font-medium mb-2">Insurance Companies</h5>
                      <p className="text-gray-300 text-sm">"Certified Green Risk" program with lower premiums for platform users.</p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Financial Overview */}
          <motion.section
            id="financial-overview"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-yellow-400" />
                Financial Overview: Investment Requirements & Returns
              </h2>
              
              <WasteCompositionChart />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <AnimatedMetricCard
                  title="Year 1 Target"
                  value="$136K"
                  change="Pilot"
                  trend="up"
                  icon={<BarChart3 className="w-6 h-6" />}
                />
                <AnimatedMetricCard
                  title="Year 2 Scale"
                  value="$1.9M"
                  change="Expansion"
                  trend="up"
                  icon={<TrendingUp className="w-6 h-6" />}
                />
                <AnimatedMetricCard
                  title="Year 3 Growth"
                  value="$5.8M"
                  change="Growth"
                  trend="up"
                  icon={<TrendingUp className="w-6 h-6" />}
                />
              </div>
            </div>
          </motion.section>

          {/* Conclusion */}
          <motion.section
            id="conclusion"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <Target className="w-8 h-8 text-yellow-400" />
                The Winning Formula: Synthesized Dual-Track Vision
              </h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  The key element that elevates BinDoc.AI from a mere product to a defensible ecosystem is the profound synergy between the B2C and B2B models. 
                  This is not two separate businesses operating in parallel; it is one integrated, intelligent ecosystem designed to attack Lebanon's waste crisis from both top-down and bottom-up.
                </p>
                
                <div className="data-highlight mb-8">
                  <h3 className="text-yellow-400 mb-4">The Flywheel Effect</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm">1</div>
                      <p className="text-gray-300">B2B Enterprise Platform provides municipalities operational efficiency and cost control</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm">2</div>
                      <p className="text-gray-300">This enables them to sponsor/subsidize the B2C Consumer App for residents</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm">3</div>
                      <p className="text-gray-300">B2C data feeds back into B2B dashboard for targeted awareness campaigns</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm">4</div>
                      <p className="text-gray-300">B2C marketplace empowers informal collectors, creating efficient offtake channels</p>
                    </div>
                  </div>
                </div>

                <div className="data-highlight">
                  <h3 className="text-yellow-400 mb-4">Final Investment Thesis</h3>
                  <p className="text-gray-300 leading-relaxed">
                    An investment in BinDoc.AI is not a speculative bet on a single product. It is an investment in a scalable, profitable, 
                    and deeply impactful solution to one of Lebanon's most persistent and visible crises. It is an opportunity to build 
                    the foundational infrastructure for the country's emerging circular economy.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            id="faq"
            {...fadeInUp}
            className="section-wrapper space-y-8"
          >
            <div className="glass p-8">
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="flex-shrink-0">
                  <HelpCircle className="w-8 h-8 text-yellow-400" />
                </span>
                <Cover particleColor="#FACC15">Investor FAQ</Cover>
              </motion.h2>
              <motion.p 
                className="text-gray-300 text-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Common questions from investors about BinDoc.AI's business model, market opportunity, and growth strategy.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <FAQAccordion />
              </motion.div>
            </div>
          </motion.section>


        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-8">
        <div className="w-full px-4">
          <div className="glass p-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <BeleLogo size="sm" animated={false} />
                <div className="text-sm text-gray-400">
                  <p>© 2025 BinDoc.AI - All rights reserved</p>
                  <p>Market Intelligence Platform</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400">
                  This is a <strong className="text-yellow-400">confidential first draft</strong> for pitching team review only. 
                  Brand name and data are preliminary.
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-500 text-center">
                Sources: Industry reports, market research firms, internal analytics. 
                All projections are estimates based on current market trends and should not be considered financial advice.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
