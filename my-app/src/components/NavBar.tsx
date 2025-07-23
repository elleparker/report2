"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon, FileText, Users, Target, BarChart3, TrendingUp, Building2, Handshake, Coins, Calculator, Lightbulb, Award, Crosshair, Globe } from "lucide-react"

interface SubItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  subItems?: SubItem[]
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  onNavigate?: (url: string) => void
}

export function NavBar({ items, className, onNavigate }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

 
  
  useEffect(() => {
    const handleResize = () => {
      // Mobile detection for any future use
      window.innerWidth < 768
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNavClick = (itemName: string, hasSubItems: boolean, url?: string) => {
    setActiveTab(itemName)
    
    if (hasSubItems) {
      // Toggle submenu for items with subitems
      setOpenSubmenu(openSubmenu === itemName ? null : itemName)
    } else {
      // Close any open submenus and navigate
      setOpenSubmenu(null)
      if (url && onNavigate) {
        onNavigate(url)
      }
    }
  }

  const handleSubItemClick = (url: string) => {
    setOpenSubmenu(null)
    if (onNavigate) {
      onNavigate(url)
    }
  }

  return (
    <div
      className={`fixed top-2 sm:top-6 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 sm:w-auto ${className || ''}`}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-4 bg-gradient-to-r from-black/20 via-black/10 to-black/20 border border-yellow-400/20 backdrop-blur-xl py-2 sm:py-3 px-3 sm:px-8 rounded-full shadow-2xl ring-1 ring-white/10">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name
          const hasSubItems = !!(item.subItems && item.subItems.length > 0)
          const isSubmenuOpen = openSubmenu === item.name



          return (
            <div key={item.name} className="relative flex-shrink-0">
              <button
                onClick={() => handleNavClick(item.name, hasSubItems, item.url)}
                                  className="relative cursor-pointer px-2.5 sm:px-6 py-2 sm:py-3 rounded-full transition-colors text-gray-300 hover:text-yellow-400 flex-shrink-0"
              >
                                            <div className="flex items-center gap-1 sm:gap-3">
                              <Icon size={12} strokeWidth={2.5} className="text-yellow-400 sm:w-[22px] sm:h-[22px] flex-shrink-0" />
                              <span className="text-xs sm:text-base font-medium text-white whitespace-nowrap">{item.name}</span>
                            </div>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    {/* Enhanced yellow glow effect */}
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-pulse" />
                    <div className="absolute inset-1 bg-yellow-300/30 rounded-full blur-sm" />
                    <div className="absolute inset-2 bg-yellow-200/40 rounded-full blur-md" />
                    
                    {/* Top lamp light */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-2 bg-yellow-400 rounded-t-full shadow-lg">
                      <div className="absolute w-16 h-8 bg-yellow-400/40 rounded-full blur-lg -top-3 -left-3" />
                      <div className="absolute w-12 h-6 bg-yellow-300/50 rounded-full blur-md -top-2 -left-1" />
                      <div className="absolute w-8 h-4 bg-yellow-200/60 rounded-full blur-sm -top-1 left-1" />
                      
                      {/* Additional inner glow */}
                      <div className="absolute inset-0 bg-yellow-300 rounded-t-full opacity-80" />
                      <div className="absolute w-6 h-1 bg-yellow-100 rounded-full top-0.5 left-1/2 -translate-x-1/2" />
                    </div>
                  </motion.div>
                )}
              </button>
              

              
              {/* Submenu */}
              <AnimatePresence>
                {hasSubItems && isSubmenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-xl border border-yellow-400 rounded-lg shadow-2xl py-3 min-w-52 ring-1 ring-white/10"
                    style={{ zIndex: 99999 }}
                  >
                  {item.subItems?.map((subItem, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubItemClick(subItem.url)}
                      className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3 text-xs sm:text-sm hover:bg-yellow-400/20 hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-200 text-gray-300 hover:text-yellow-400 group rounded-md"
                      style={{ color: 'white' }}
                    >
                      <subItem.icon size={14} className="text-yellow-400/70 group-hover:text-yellow-400 transition-colors flex-shrink-0 sm:w-[16px] sm:h-[16px]" />
                      <span className="group-hover:text-yellow-400 transition-all text-left">{subItem.name}</span>
                    </button>
                  ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Helper function for utility classes (removed as not needed)

export default function ZbelehNavBar({ onNavigate }: { onNavigate?: (url: string) => void }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navItems: NavItem[] = [
    { 
      name: isMobile ? 'Intro' : 'Investment Opportunity', 
      url: '#introduction', 
      icon: FileText
    },
    { 
      name: 'B2C', 
      url: '#b2c-model', 
      icon: Users,
      subItems: [
        { name: 'Competitive Arena', url: '#b2c-competitive', icon: Target },
        { name: 'Value Proposition', url: '#b2c-proposition', icon: Lightbulb },
        { name: 'Monetization', url: '#b2c-monetization', icon: Coins },
        { name: 'Partnerships', url: '#b2c-partnerships', icon: Handshake }
      ]
    },
    { 
      name: 'B2B', 
      url: '#b2b-model', 
      icon: Building2,
      subItems: [
        { name: 'Competitive Analysis', url: '#b2b-competitive', icon: Crosshair },
        { name: 'Value Proposition', url: '#b2b-proposition', icon: TrendingUp },
        { name: 'Revenue Models', url: '#b2b-monetization', icon: Calculator },
        { name: 'Partnership Strategy', url: '#b2b-partnerships', icon: Globe }
      ]
    },
    { 
      name: isMobile ? 'Finance' : 'Financial Overview', 
      url: '#financial-overview', 
      icon: BarChart3
    },
    { 
      name: isMobile ? 'Thesis' : 'Investment Thesis', 
      url: '#conclusion', 
      icon: Award
    },
    { 
      name: isMobile ? 'Names' : 'Namestorming', 
      url: '#namestorming', 
      icon: Lightbulb
    }
  ]

  return <NavBar items={navItems} onNavigate={onNavigate} />
} 