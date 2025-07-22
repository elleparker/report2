'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, TrendingUp, BarChart3, Users, DollarSign, Target, FileText, Globe } from 'lucide-react';

interface NavigationItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 'market-analysis',
    title: 'Market Analysis',
    icon: <TrendingUp className="w-4 h-4" />,
    children: [
      { id: 'market-size', title: 'Market Size & Growth', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'competitive-landscape', title: 'Competitive Landscape', icon: <Target className="w-4 h-4" /> },
      { id: 'market-trends', title: 'Market Trends', icon: <TrendingUp className="w-4 h-4" /> },
    ],
  },
  {
    id: 'target-audience',
    title: 'Target Audience',
    icon: <Users className="w-4 h-4" />,
    children: [
      { id: 'demographics', title: 'Demographics', icon: <Users className="w-4 h-4" /> },
      { id: 'user-personas', title: 'User Personas', icon: <Users className="w-4 h-4" /> },
      { id: 'behavior-analysis', title: 'Behavior Analysis', icon: <BarChart3 className="w-4 h-4" /> },
    ],
  },
  {
    id: 'financial-projections',
    title: 'Financial Projections',
    icon: <DollarSign className="w-4 h-4" />,
    children: [
      { id: 'revenue-model', title: 'Revenue Model', icon: <DollarSign className="w-4 h-4" /> },
      { id: 'cost-analysis', title: 'Cost Analysis', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'roi-projections', title: 'ROI Projections', icon: <TrendingUp className="w-4 h-4" /> },
    ],
  },
  {
    id: 'global-expansion',
    title: 'Global Expansion',
    icon: <Globe className="w-4 h-4" />,
    children: [
      { id: 'market-entry', title: 'Market Entry Strategy', icon: <Target className="w-4 h-4" /> },
      { id: 'regional-analysis', title: 'Regional Analysis', icon: <Globe className="w-4 h-4" /> },
    ],
  },
];

interface NavigationProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['market-analysis']);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (itemId: string, hasChildren: boolean) => {
    if (hasChildren) {
      toggleExpanded(itemId);
    } else {
      onSectionChange(itemId);
      setIsOpen(false);
    }
  };

  const NavItem = ({ item, level = 0 }: { item: NavigationItem; level?: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: level * 0.1 }}
      className="mb-1"
    >
      <button
        onClick={() => handleItemClick(item.id, !!item.children)}
        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 group ${
          activeSection === item.id
            ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 text-yellow-400'
            : 'hover:bg-white/5 hover:border-white/10 border border-transparent text-gray-300'
        } ${level > 0 ? 'ml-4 text-sm' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className={`transition-colors duration-300 ${
            activeSection === item.id ? 'text-yellow-400' : 'text-gray-400 group-hover:text-yellow-400'
          }`}>
            {item.icon}
          </div>
          <span className="font-medium">{item.title}</span>
        </div>
        {item.children && (
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-300 ${
              expandedItems.includes(item.id) ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>
      
      <AnimatePresence>
        {item.children && expandedItems.includes(item.id) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-1">
              {item.children.map(child => (
                <NavItem key={child.id} item={child} level={level + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden glass-nav p-3 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Navigation */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 top-0 h-full w-72 z-40 hidden lg:block ${
          isScrolled ? 'glass-nav' : 'glass-nav'
        } p-4 overflow-y-auto border-r border-yellow-400/20`}
      >
        <div className="mb-4">
          <h2 className="text-lg font-bold gradient-text mb-1">Bele.ai Market Research</h2>
          <p className="text-xs text-gray-400">Navigation Menu</p>
        </div>
        
        <nav className="space-y-1">
          {navigationItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </nav>
      </motion.aside>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 h-full w-80 glass-nav p-6 overflow-y-auto"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold gradient-text mb-2">Bele.ai Market Research</h2>
                <p className="text-sm text-gray-400">Navigation Menu</p>
              </div>
              
              <nav className="space-y-1">
                {navigationItems.map(item => (
                  <NavItem key={item.id} item={item} />
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 