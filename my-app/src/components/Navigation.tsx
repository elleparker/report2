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
    id: 'introduction',
    title: 'Investment Opportunity',
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 'b2c-model',
    title: 'B2C Consumer Model',
    icon: <Users className="w-4 h-4" />,
    children: [
      { id: 'b2c-competitive', title: 'Competitive Arena', icon: <Target className="w-4 h-4" /> },
      { id: 'b2c-proposition', title: 'Value Proposition', icon: <TrendingUp className="w-4 h-4" /> },
      { id: 'b2c-monetization', title: 'Monetization Strategy', icon: <DollarSign className="w-4 h-4" /> },
      { id: 'b2c-partnerships', title: 'Strategic Partnerships', icon: <Globe className="w-4 h-4" /> },
    ],
  },
  {
    id: 'b2b-model',
    title: 'B2B Enterprise Model',
    icon: <BarChart3 className="w-4 h-4" />,
    children: [
      { id: 'b2b-competitive', title: 'Competitive Analysis', icon: <Target className="w-4 h-4" /> },
      { id: 'b2b-proposition', title: 'Value Proposition', icon: <TrendingUp className="w-4 h-4" /> },
      { id: 'b2b-monetization', title: 'Revenue Models', icon: <DollarSign className="w-4 h-4" /> },
      { id: 'b2b-partnerships', title: 'Partnership Strategy', icon: <Globe className="w-4 h-4" /> },
    ],
  },
  {
    id: 'financial-overview',
    title: 'Financial Projections',
    icon: <DollarSign className="w-4 h-4" />,
  },
  {
    id: 'conclusion',
    title: 'Investment Thesis',
    icon: <Target className="w-4 h-4" />,
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
        className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all duration-300 group ${
          activeSection === item.id
            ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 text-yellow-400'
            : 'hover:bg-white/5 hover:border-white/10 border border-transparent text-gray-300'
        } ${level > 0 ? 'ml-3 text-sm' : ''}`}
      >
                  <div className="flex items-center gap-2">
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
      {/* Sticky Glass Navigation Island */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-nav shadow-2xl scale-95' 
            : 'glass-nav shadow-xl'
        }`}
      >
        <div className="flex items-center gap-4 p-4">
          {/* Logo Section */}
          <div className="flex items-center gap-3 pr-4 border-r border-yellow-400/30">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center">
              <span className="text-black font-bold text-sm">Z</span>
            </div>
            <span className="hidden md:block text-sm font-semibold gradient-text">Zbeleh.ai</span>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map(item => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleItemClick(item.id, !!item.children)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 text-yellow-400 shadow-lg'
                      : 'hover:bg-white/10 text-gray-300 hover:text-yellow-400'
                  }`}
                >
                  <div className="w-4 h-4">{item.icon}</div>
                  <span className="text-sm font-medium whitespace-nowrap">{item.title}</span>
                  {item.children && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                      expandedItems.includes(item.id) ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {/* Dropdown for items with children */}
                <AnimatePresence>
                  {item.children && expandedItems.includes(item.id) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 glass-nav rounded-lg p-2 min-w-48 shadow-xl border border-yellow-400/20"
                    >
                      {item.children.map(child => (
                        <button
                          key={child.id}
                          onClick={() => handleItemClick(child.id, false)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                            activeSection === child.id
                              ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 text-yellow-400'
                              : 'hover:bg-white/10 text-gray-300 hover:text-yellow-400'
                          }`}
                        >
                          <div className="w-3 h-3">{child.icon}</div>
                          <span className="text-sm">{child.title}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Dropdown */}
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
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute top-20 left-4 right-4 glass-nav rounded-lg p-4 max-h-[70vh] overflow-y-auto"
            >
              <div className="space-y-2">
                {navigationItems.map(item => (
                  <NavItem key={item.id} item={item} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 