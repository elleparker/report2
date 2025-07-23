'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Target, BarChart3, AlertCircle, Lightbulb } from 'lucide-react';

import ZbelehNavBar from '../components/NavBar';
import BeleLogo from '../components/BeleLogo';
import { 
  WasteVolumeChart, 
  CompetitorAnalysisChart, 
  WasteCompositionChart, 
  RevenueProjectionChart,
  MetricCard 
} from '../components/Charts';

export default function Home() {
  const [_activeSection, setActiveSection] = useState('introduction');

  const handleSectionChange = (url: string) => {
    // Handle both URL format (#section) and direct section ID
    const sectionId = url.startsWith('#') ? url.slice(1) : url;
    
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    
    if (element) {
      const navHeight = 120; // Account for sticky nav height
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
      'namestorming'
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
      <ZbelehNavBar onNavigate={handleSectionChange} />
      
      {/* Header */}
      <header className="relative pt-20 sm:pt-28 pb-8 sm:pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="glass p-4 sm:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
              <div className="w-full lg:w-auto">
                <BeleLogo size="lg" />
                <h1 className="text-gray-400 mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed">Strategic Investment Report: Waste Management Solutions for Lebanon</h1>
              </div>
              <div className="w-full lg:w-auto lg:text-right">
                <p className="text-sm text-gray-400">Report Date</p>
                <p className="text-white font-medium text-lg sm:text-xl">December 2024</p>
                <div className="mt-2 px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-medium inline-block">
                  CONFIDENTIAL - FIRST DRAFT
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

              {/* Main Content */}
        <main className="px-4 pb-8 sm:pb-16">
          <div className="w-full space-y-8 sm:space-y-16">
          
          {/* Introduction: Investment Opportunity */}
          <motion.section
            id="introduction"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h1 className="mb-6">Zbeleh.ai Strategic Investment Report</h1>
              <h2 className="text-yellow-400 text-2xl mb-4">A Pragmatic, Technology-Driven Solution for Lebanon&apos;s Waste Crisis</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  Lebanon&apos;s waste management sector is not merely a public service issue; it is a profound economic, environmental, and public health catastrophe. 
                  The country generates over <strong className="text-white">2 million tons</strong> of solid waste annually, with over <strong className="text-white">80%</strong> being mismanaged through open dumping and burning, 
                  at an exorbitant cost of approximately <strong className="text-white">$154.50 per ton</strong>—significantly higher than regional peers.
                </p>
                
                <div className="data-highlight">
                  <h3 className="text-yellow-400 mb-3">Core Investment Thesis</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    This systemic collapse creates a significant and untapped economic opportunity. The fragmentation and decentralization of Lebanon&apos;s waste sector 
                    makes it uniquely suited for a flexible, technology-enabled solution like Zbeleh.ai.
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
              <MetricCard
                title="Annual Waste Generated"
                value="2M tons"
                change="Growing"
                trend="up"
                icon={<BarChart3 className="w-6 h-6" />}
              />
              <MetricCard
                title="Mismanaged Waste"
                value="80%"
                change="Crisis"
                trend="down"
                icon={<AlertCircle className="w-6 h-6" />}
              />
              <MetricCard
                title="Cost Per Ton"
                value="$154.50"
                change="High"
                trend="down"
                icon={<DollarSign className="w-6 h-6" />}
              />
              <MetricCard
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
            className="space-y-8"
          >
            <div className="glass p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-yellow-400" />
                Part I: The Zbeleh.ai B2C Consumer Model
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
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-yellow-400" />
                B2C Competitive Arena: Mapping a Fragmented Ecosystem
              </h3>
              
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
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">Fortifying the B2C Proposition: Blueprint for Adoption and Loyalty</h3>
              
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
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">B2C Monetization: Diverse and Resilient Revenue Streams</h3>
              
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
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">The B2C Partnership Nexus: Beyond the Obvious</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Strategic Partnerships</h4>
                  <div className="space-y-4">
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Retail & FMCG Sector</h5>
                      <p className="text-gray-300 text-sm">Partner with Spinneys, Carrefour for take-back programs. Users scan barcodes for subsidized pickups.</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Real Estate & Property</h5>
                      <p className="text-gray-300 text-sm">Building-wide subscriptions as premium amenity. "Zbeleh.ai Certified Green Building" marketing.</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Telecom Operators</h5>
                      <p className="text-gray-300 text-sm">Alfa, Touch loyalty point integration. Redeem points for pickup credits.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Academic Partnerships</h4>
                  <div className="space-y-4">
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Universities (AUB, LAU, USJ)</h5>
                      <p className="text-gray-300 text-sm">Provide datasets for research, host hackathons, recruit talent pipeline.</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">NGO Collaboration</h5>
                      <p className="text-gray-300 text-sm">Partner with Arcenciel for verified material streams, Recycle Lebanon for awareness campaigns.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* B2B Enterprise Model Overview */}
          <motion.section
            id="b2b-model"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-yellow-400" />
                Part II: The Zbeleh.ai B2B Enterprise Model
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
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">B2B Competitive Arena: Challenging Incumbents and Foreign Giants</h3>
              
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
            className="space-y-8"
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
                  This positions Zbeleh.ai as a self-funding investment in fiscal survival.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="data-highlight text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">Cost Reduction</h4>
                  <p className="text-3xl font-bold text-white">40%</p>
                  <p className="text-green-400 text-sm">Fuel & maintenance savings</p>
                </div>
                <div className="data-highlight text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">Payback Period</h4>
                  <p className="text-3xl font-bold text-white">12 months</p>
                  <p className="text-green-400 text-sm">Self-funding investment</p>
                </div>
                <div className="data-highlight text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">Data Compliance</h4>
                  <p className="text-3xl font-bold text-white">Law 80/2018</p>
                  <p className="text-blue-400 text-sm">Legal compliance built-in</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* B2B Monetization */}
          <motion.section
            id="b2b-monetization"
            {...fadeInUp}
            className="space-y-8"
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
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">B2B Partnership Nexus: Ecosystem of Credibility</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">International Development</h4>
                  <div className="space-y-4">
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">World Bank, UNDP, USAID</h5>
                      <p className="text-gray-300 text-sm">Position as "Monitoring, Evaluation & Learning" partner for accountability and impact measurement.</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">USAID DAWERR Program</h5>
                      <p className="text-gray-300 text-sm">Embed platform as mandatory MEL component for grant requirements.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Financial & Insurance</h4>
                  <div className="space-y-4">
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Lebanese Banks</h5>
                      <p className="text-gray-300 text-sm">Green financing packages where loan repayments come from operational savings.</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Insurance Companies</h5>
                      <p className="text-gray-300 text-sm">"Certified Green Risk" program with lower premiums for platform users.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Financial Overview */}
          <motion.section
            id="financial-overview"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-yellow-400" />
                Financial Overview: Investment Requirements & Returns
              </h2>
              
              <WasteCompositionChart />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="data-highlight text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">Year 1 Target</h4>
                  <p className="text-3xl font-bold text-white">$136K</p>
                  <p className="text-gray-300 text-sm">Pilot phase revenue</p>
                </div>
                <div className="data-highlight text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">Year 2 Scale</h4>
                  <p className="text-3xl font-bold text-white">$1.9M</p>
                  <p className="text-gray-300 text-sm">Beirut-wide expansion</p>
                </div>
                <div className="data-highlight text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">Year 3 Growth</h4>
                  <p className="text-3xl font-bold text-white">$5.8M</p>
                  <p className="text-gray-300 text-sm">Multi-city deployment</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Conclusion */}
          <motion.section
            id="conclusion"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <Target className="w-8 h-8 text-yellow-400" />
                The Winning Formula: Synthesized Dual-Track Vision
              </h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  The key element that elevates Zbeleh.ai from a mere product to a defensible ecosystem is the profound synergy between the B2C and B2B models. 
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
                    An investment in Zbeleh.ai is not a speculative bet on a single product. It is an investment in a scalable, profitable, 
                    and deeply impactful solution to one of Lebanon's most persistent and visible crises. It is an opportunity to build 
                    the foundational infrastructure for the country's emerging circular economy.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Namestorming Section */}
          <motion.section
            id="namestorming"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-yellow-400" />
                🧼 Namestorming – Finding the Perfect Brand for Our Clean Tech Revolution
              </h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  Before we commit to a final name for our city-cleaning AI overlord, let&apos;s embrace the chaos of creativity. Naming a product is like taking out the trash—you have to sift through a lot of garbage before you find gold. For now, we&apos;re using Zbeleh.ai as a placeholder, but the dumpster fire of ideas below is where we start shaping identity, satire, and smart waste management into one slick, sarcastic, and unforgettable brand.
                </p>
                
                <p className="text-gray-300 leading-relaxed mb-8">
                  Let&apos;s dig into a few standout contenders from our internal name dump—each with its own personality, attitude, and vibe. 😎
                </p>

                <div className="data-highlight mb-8">
                  <h3 className="text-yellow-400 mb-6">💡 Name Ideas for Our City-Saving CleanTech Monster:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">1. SukBot 🤖</h4>
                      <p className="text-gray-300 text-sm">The AI that does what Sukleen should&apos;ve done. A robotic tribute to failed promises.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">2. Trashformers ♻️</h4>
                      <p className="text-gray-300 text-sm">Robots in disguise, collecting your lies—and your garbage.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">3. NaddafNet 🧹</h4>
                      <p className="text-gray-300 text-sm">Like Skynet, but with more brooms and less genocide.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">4. SmartKleen 🧠</h4>
                      <p className="text-gray-300 text-sm">Because it sounds corporate enough to get EU funding and sarcastic enough to be Lebanese.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">5. ZbaleX 🛸</h4>
                      <p className="text-gray-300 text-sm">The sleek, elite, high-efficiency Zbeleh intelligence agency of the future.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">6. E-Zbeleh ⚡</h4>
                      <p className="text-gray-300 text-sm">It&apos;s fast. It&apos;s dirty. It&apos;s digitized trash collection for the swipe generation.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">7. YallaKleen 🚚</h4>
                      <p className="text-gray-300 text-sm">Motivational and exhausted, like every Lebanese mother: &quot;Yalla habibi, clean up already.&quot;</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">8. NadafeGPT 🧽</h4>
                      <p className="text-gray-300 text-sm">The generative pre-trained trash-cleaning language model you didn&apos;t know you needed.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">9. KBL-ZBL.ai 🗑️</h4>
                      <p className="text-gray-300 text-sm">Short for &quot;Keb el Zbele.&quot; The name screams API, the mission screams efficiency.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">10. NadafeBot 🧼</h4>
                      <p className="text-gray-300 text-sm">Always on, never judging. Okay, maybe judging a little.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">11. MrTrash.ai 🕶️</h4>
                      <p className="text-gray-300 text-sm">He&apos;s not your friend. He&apos;s your refuse executioner.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">12. TrashCollectors.ai 💾</h4>
                      <p className="text-gray-300 text-sm">Sounds like a SaaS platform. Functions like a mop army.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">13. NadafeLeb.ai 🏙️</h4>
                      <p className="text-gray-300 text-sm">For people who like their patriotism as tidy as their streets.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">14. CityClean.ai 🌇</h4>
                      <p className="text-gray-300 text-sm">A clean-cut, internationally-palatable name for urban sanitization—with fangs.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-bold mb-2">15. ByeByeZbeleh.ai 👋</h4>
                      <p className="text-gray-300 text-sm">Waves goodbye to waste, corruption, and maybe your neighbors&apos; bad habits too.</p>
                    </div>
                  </div>
                </div>

                <div className="data-highlight">
                  <p className="text-center text-gray-400 italic">
                    Each name represents a different personality for our AI waste management revolution. 
                    From sarcastic commentary on Lebanon&apos;s waste crisis to internationally viable tech branding, 
                    the perfect name will capture our mission: intelligent, efficient, and slightly rebellious urban cleaning.
                  </p>
                </div>
              </div>
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
                  <p>© 2024 Bele.ai - All rights reserved</p>
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
