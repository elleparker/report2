'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Globe, Target, BarChart3, FileText, AlertCircle } from 'lucide-react';

import Navigation from '../components/Navigation';
import BeleLogo from '../components/BeleLogo';
import { 
  WasteVolumeChart, 
  CompetitorAnalysisChart, 
  WasteCompositionChart, 
  RevenueProjectionChart,
  MetricCard 
} from '../components/Charts';

export default function Home() {
  const [activeSection, setActiveSection] = useState('introduction');

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 100; // Account for sticky nav height
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
      'conclusion'
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
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      {/* Header */}
      <header className="relative pt-24 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-7xl mx-auto"
        >
          <div className="glass p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <BeleLogo size="xl" />
                <p className="text-gray-400 mt-4 text-lg">Strategic Investment Report: Waste Management Solutions for Lebanon</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Report Date</p>
                <p className="text-white font-medium">December 2024</p>
                <div className="mt-2 px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-medium">
                  CONFIDENTIAL - FIRST DRAFT
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-16">
        <div className="w-full max-w-7xl mx-auto space-y-16">
          
          {/* Executive Summary */}
          <motion.section
            id="executive-summary"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h1 className="mb-6">AI Market Intelligence Report</h1>
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  The artificial intelligence market continues to experience unprecedented growth, 
                  with Bele.ai positioned as a key player in the emerging market intelligence sector.
                </p>
                
                <div className="data-highlight">
                  <h3 className="text-yellow-400 mb-3">Key Findings</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Market size projected to reach <strong className="text-white">$185.7B by 2025</strong></li>
                    <li>• Bele.ai holds <strong className="text-white">35% market share</strong> in specialized AI analytics</li>
                    <li>• Expected <strong className="text-white">124% YoY growth</strong> in revenue by Q4 2025</li>
                    <li>• Target demographic engagement increased by <strong className="text-white">67%</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Market Size"
                value="$145.3B"
                change="+29%"
                trend="up"
                icon={<TrendingUp className="w-6 h-6" />}
              />
              <MetricCard
                title="Active Users"
                value="2.4M"
                change="+45%"
                trend="up"
                icon={<Users className="w-6 h-6" />}
              />
              <MetricCard
                title="Revenue"
                value="$89.6M"
                change="+67%"
                trend="up"
                icon={<DollarSign className="w-6 h-6" />}
              />
              <MetricCard
                title="Global Reach"
                value="127"
                change="+23%"
                trend="up"
                icon={<Globe className="w-6 h-6" />}
              />
            </div>
          </motion.section>

          {/* Market Analysis */}
          <motion.section
            id="market-analysis"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-yellow-400" />
                Market Analysis Overview
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Our comprehensive analysis reveals significant growth opportunities in the AI market intelligence sector, 
                with Bele.ai strategically positioned to capture substantial market share through innovative solutions 
                and strategic partnerships.
              </p>
            </div>

            <WasteVolumeChart />
          </motion.section>

          {/* Market Size & Growth */}
          <motion.section
            id="market-size"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">Market Size & Growth Trajectory</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Growth Drivers</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Increased enterprise adoption of AI-driven analytics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Growing demand for real-time market intelligence</span>
          </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Expansion into emerging markets and verticals</span>
          </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Market Segments</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Enterprise Solutions</span>
                      <span className="text-white font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">SMB Analytics</span>
                      <span className="text-white font-medium">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">API & Integration</span>
                      <span className="text-white font-medium">25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Competitive Landscape */}
          <motion.section
            id="competitive-landscape"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-yellow-400" />
                Competitive Landscape
              </h3>
              <div className="data-highlight">
                <p className="text-gray-300 leading-relaxed">
                  Bele.ai maintains a strong competitive position with <strong className="text-white">35% market share</strong>, 
                  significantly ahead of competitors through superior AI algorithms and comprehensive market coverage.
                </p>
              </div>
            </div>
            
            <CompetitorAnalysisChart />
          </motion.section>

          {/* Market Trends */}
          <motion.section
            id="market-trends"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">Market Trends & Opportunities</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">AI Integration</h4>
                  <p className="text-gray-300">Growing adoption of AI-powered analytics across enterprise workflows</p>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">Real-time Insights</h4>
                  <p className="text-gray-300">Increasing demand for instant market intelligence and decision support</p>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">Predictive Analytics</h4>
                  <p className="text-gray-300">Rising need for forecasting and trend prediction capabilities</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Target Audience */}
          <motion.section
            id="target-audience"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-yellow-400" />
                Target Audience Analysis
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our primary target demographic consists of enterprise decision-makers, 
                data analysts, and strategic planners across various industries seeking 
                advanced market intelligence solutions.
              </p>
            </div>

            <WasteCompositionChart />
          </motion.section>

          {/* Demographics */}
          <motion.section
            id="demographics"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">Demographics Deep Dive</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Geographic Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">North America</span>
                      <span className="text-white font-medium">42%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Europe</span>
                      <span className="text-white font-medium">31%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Asia-Pacific</span>
                      <span className="text-white font-medium">27%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Industry Sectors</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Technology</span>
                      <span className="text-white font-medium">38%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Finance</span>
                      <span className="text-white font-medium">29%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Healthcare</span>
                      <span className="text-white font-medium">21%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Other</span>
                      <span className="text-white font-medium">12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* User Personas */}
          <motion.section
            id="user-personas"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">User Personas</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">Executive Decision Maker</h4>
                  <p className="text-gray-300 text-sm mb-3">C-level executives seeking strategic insights for business decisions</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Ages 40-55</li>
                    <li>• Annual revenue responsibility: $50M+</li>
                    <li>• Values: Speed, accuracy, ROI</li>
                  </ul>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">Data Analyst</h4>
                  <p className="text-gray-300 text-sm mb-3">Technical professionals requiring detailed analytics and reporting</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Ages 25-40</li>
                    <li>• Technical background</li>
                    <li>• Values: Depth, customization, APIs</li>
                  </ul>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">Strategic Planner</h4>
                  <p className="text-gray-300 text-sm mb-3">Business strategists focused on market opportunities and growth</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Ages 30-45</li>
                    <li>• Cross-functional roles</li>
                    <li>• Values: Trends, forecasting, insights</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Behavior Analysis */}
          <motion.section
            id="behavior-analysis"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">User Behavior Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-3">Usage Patterns</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300">• <strong className="text-white">Daily active users:</strong> 67% of subscriber base</p>
                    <p className="text-gray-300">• <strong className="text-white">Peak usage:</strong> 9-11 AM and 2-4 PM</p>
                    <p className="text-gray-300">• <strong className="text-white">Session duration:</strong> Average 23 minutes</p>
                    <p className="text-gray-300">• <strong className="text-white">Feature adoption:</strong> 89% use core analytics</p>
                  </div>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-3">Engagement Metrics</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300">• <strong className="text-white">User retention (30-day):</strong> 84%</p>
                    <p className="text-gray-300">• <strong className="text-white">Feature discovery rate:</strong> 76%</p>
                    <p className="text-gray-300">• <strong className="text-white">Support ticket volume:</strong> 2.3% of users/month</p>
                    <p className="text-gray-300">• <strong className="text-white">NPS Score:</strong> 67 (Industry: 42)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Financial Projections */}
          <motion.section
            id="financial-projections"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-yellow-400" />
                Financial Projections
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">2024 Revenue</h4>
                  <p className="text-3xl font-bold text-white">$89.6M</p>
                  <p className="text-green-400 text-sm">+67% YoY</p>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">2025 Projection</h4>
                  <p className="text-3xl font-bold text-white">$124.8M</p>
                  <p className="text-green-400 text-sm">+39% Growth</p>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">5-Year CAGR</h4>
                  <p className="text-3xl font-bold text-white">47%</p>
                  <p className="text-blue-400 text-sm">Industry: 23%</p>
                </div>
              </div>
            </div>

            <RevenueProjectionChart />
          </motion.section>

          {/* Revenue Model */}
          <motion.section
            id="revenue-model"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">Revenue Model Breakdown</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">Subscription Revenue</h4>
                  <p className="text-3xl font-bold text-white mb-2">$67.2M</p>
                  <p className="text-green-400 text-sm">75% of total revenue</p>
                  <p className="text-gray-300 text-sm mt-2">Monthly and annual subscriptions</p>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">Enterprise Licenses</h4>
                  <p className="text-3xl font-bold text-white mb-2">$18.7M</p>
                  <p className="text-blue-400 text-sm">21% of total revenue</p>
                  <p className="text-gray-300 text-sm mt-2">Custom enterprise solutions</p>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-2">API & Integration</h4>
                  <p className="text-3xl font-bold text-white mb-2">$3.7M</p>
                  <p className="text-purple-400 text-sm">4% of total revenue</p>
                  <p className="text-gray-300 text-sm mt-2">Developer tools and APIs</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Cost Analysis */}
          <motion.section
            id="cost-analysis"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">Cost Structure Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Operating Expenses</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">R&D</span>
                      <span className="text-white font-medium">$24.8M (38%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Sales & Marketing</span>
                      <span className="text-white font-medium">$19.2M (29%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Infrastructure</span>
                      <span className="text-white font-medium">$12.1M (18%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Operations</span>
                      <span className="text-white font-medium">$10.3M (15%)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Cost Optimization</h4>
                  <div className="space-y-3">
                    <div className="data-highlight">
                      <p className="text-gray-300">• Automated infrastructure scaling: <strong className="text-white">-23% costs</strong></p>
                      <p className="text-gray-300">• AI-driven support: <strong className="text-white">-31% ticket volume</strong></p>
                      <p className="text-gray-300">• Predictive maintenance: <strong className="text-white">-18% downtime</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ROI Projections */}
          <motion.section
            id="roi-projections"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">ROI Projections & Investment Returns</h3>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="data-highlight text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">Customer LTV</h4>
                  <p className="text-2xl font-bold text-white">$47,200</p>
                  <p className="text-green-400 text-sm">+23% vs industry</p>
                </div>
                <div className="data-highlight text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">CAC Payback</h4>
                  <p className="text-2xl font-bold text-white">8.2 months</p>
                  <p className="text-green-400 text-sm">Industry: 14 months</p>
                </div>
                <div className="data-highlight text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">Gross Margin</h4>
                  <p className="text-2xl font-bold text-white">78%</p>
                  <p className="text-blue-400 text-sm">Best in class</p>
                </div>
                <div className="data-highlight text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">IRR (5-year)</h4>
                  <p className="text-2xl font-bold text-white">67%</p>
                  <p className="text-green-400 text-sm">Target: 25%</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Global Expansion */}
          <motion.section
            id="global-expansion"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8 text-yellow-400" />
                Global Expansion Strategy
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Priority Markets</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 glass">
                      <span className="text-white font-medium">North America</span>
                      <span className="text-yellow-400">$45M TAM</span>
                    </div>
                    <div className="flex justify-between items-center p-4 glass">
                      <span className="text-white font-medium">Europe</span>
                      <span className="text-yellow-400">$32M TAM</span>
                    </div>
                    <div className="flex justify-between items-center p-4 glass">
                      <span className="text-white font-medium">Asia-Pacific</span>
                      <span className="text-yellow-400">$28M TAM</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Expansion Timeline</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 glass">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="text-white font-medium">Q1 2025: European Launch</p>
                        <p className="text-gray-400 text-sm">Germany, UK, France</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 glass">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div>
                        <p className="text-white font-medium">Q3 2025: APAC Expansion</p>
                        <p className="text-gray-400 text-sm">Singapore, Japan, Australia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Market Entry */}
          <motion.section
            id="market-entry"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">Market Entry Strategy</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Go-to-Market Approach</h4>
                  <div className="space-y-4">
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Phase 1: Partnership Strategy</h5>
                      <p className="text-gray-300 text-sm">Establish local partnerships with consulting firms and system integrators</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Phase 2: Direct Sales</h5>
                      <p className="text-gray-300 text-sm">Build dedicated sales teams in key metropolitan areas</p>
                    </div>
                    <div className="data-highlight">
                      <h5 className="text-white font-medium mb-2">Phase 3: Market Leadership</h5>
                      <p className="text-gray-300 text-sm">Establish regional offices and capture majority market share</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-yellow-400 text-lg font-semibold mb-4">Investment Requirements</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">European Expansion</span>
                      <span className="text-white font-medium">$12.5M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">APAC Launch</span>
                      <span className="text-white font-medium">$8.7M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Localization</span>
                      <span className="text-white font-medium">$3.2M</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-yellow-400/20 pt-2">
                      <span className="text-yellow-400 font-medium">Total Investment</span>
                      <span className="text-yellow-400 font-bold">$24.4M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Regional Analysis */}
          <motion.section
            id="regional-analysis"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="glass p-8">
              <h3 className="mb-6">Regional Market Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-3">Europe</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300">• <strong className="text-white">TAM:</strong> $32M</p>
                    <p className="text-gray-300">• <strong className="text-white">GDPR Compliance:</strong> Built-in</p>
                    <p className="text-gray-300">• <strong className="text-white">Competition:</strong> Moderate</p>
                    <p className="text-gray-300">• <strong className="text-white">Timeline:</strong> Q1 2025</p>
                    <p className="text-green-400 text-sm mt-2">High regulatory alignment</p>
                  </div>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-3">Asia-Pacific</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300">• <strong className="text-white">TAM:</strong> $28M</p>
                    <p className="text-gray-300">• <strong className="text-white">Growth Rate:</strong> 89% YoY</p>
                    <p className="text-gray-300">• <strong className="text-white">Competition:</strong> Low</p>
                    <p className="text-gray-300">• <strong className="text-white">Timeline:</strong> Q3 2025</p>
                    <p className="text-blue-400 text-sm mt-2">Fastest growing region</p>
                  </div>
                </div>
                <div className="data-highlight">
                  <h4 className="text-yellow-400 font-semibold mb-3">Latin America</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300">• <strong className="text-white">TAM:</strong> $14M</p>
                    <p className="text-gray-300">• <strong className="text-white">Digital Adoption:</strong> Rising</p>
                    <p className="text-gray-300">• <strong className="text-white">Competition:</strong> Minimal</p>
                    <p className="text-gray-300">• <strong className="text-white">Timeline:</strong> 2026</p>
                    <p className="text-purple-400 text-sm mt-2">Emerging opportunity</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-8">
        <div className="w-full max-w-7xl mx-auto">
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
