'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Globe, Target, BarChart3, FileText, AlertCircle } from 'lucide-react';

import Navigation from '../components/Navigation';
import BeleLogo from '../components/BeleLogo';
import { 
  MarketGrowthChart, 
  CompetitorAnalysisChart, 
  DemographicsChart, 
  RevenueProjectionChart,
  MetricCard 
} from '../components/Charts';

export default function Home() {
  const [activeSection, setActiveSection] = useState('executive-summary');

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen animated-bg">
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      {/* Header */}
      <header className="relative pt-8 pb-16 px-4 lg:pl-80 xl:pl-72">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="glass p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <BeleLogo size="xl" />
                <p className="text-gray-400 mt-4 text-lg">Comprehensive Market Research Report</p>
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
      <main className="px-4 lg:pl-80 xl:pl-72 pb-16">
        <div className="w-full space-y-16">
          
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

            <MarketGrowthChart />
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

            <DemographicsChart />
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

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 lg:pl-80 xl:pl-72 py-8">
        <div className="w-full">
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
