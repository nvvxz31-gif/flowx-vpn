import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CreditCard, Users, User } from 'lucide-react';
import TabConnections from './TabConnections';
import TabPlans from './TabPlans';
import TabReferral from './TabReferral';
import TabProfile from './TabProfile';
import BalanceCapsule from './BalanceCapsule';

const tabs = [
  { id: 'plans', icon: CreditCard, label: 'Тарифы' },
  { id: 'referral', icon: Users, label: 'Партнёры' },
  { id: 'connections', icon: Zap, label: 'VPN', center: true },
  { id: 'profile', icon: User, label: 'Профиль' },
];

const springConfig = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };

export default function MainApp() {
  const [activeTab, setActiveTab] = useState('connections');

  const tabComponents = {
    connections: <TabConnections />,
    plans: <TabPlans />,
    referral: <TabReferral />,
    profile: <TabProfile />,
  };

  return (
    <div className="fixed inset-0 overflow-hidden flex flex-col" style={{ background: '#0D0D0F' }}>
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/3 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(10,132,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(94,92,230,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
      </div>

      {/* Balance capsule */}
      <div className="absolute top-safe-top top-4 right-4 z-50" style={{ top: 'max(16px, env(safe-area-inset-top, 16px))' }}>
        <BalanceCapsule />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={springConfig}
          >
            {tabComponents[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div
        className="fixed left-4 right-4 z-40"
        style={{ bottom: 'max(16px, env(safe-area-inset-bottom, 16px))' }}
      >
        <div
          className="flex items-center justify-around px-2 py-2 rounded-4xl"
          style={{
            background: 'rgba(28,28,30,0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isVPN = tab.center;

            if (isVPN) {
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex flex-col items-center justify-center -mt-5"
                  whileTap={{ scale: 0.9 }}
                  transition={springConfig}
                >
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)',
                      boxShadow: isActive
                        ? '0 0 0 4px rgba(10,132,255,0.25), 0 6px 24px rgba(10,132,255,0.45)'
                        : '0 4px 16px rgba(10,132,255,0.35)',
                    }}
                    animate={{ scale: isActive ? 1.07 : 1 }}
                    transition={springConfig}
                  >
                    <Icon size={24} color="white" />
                  </motion.div>
                  <span
                    className="text-xs font-semibold mt-1"
                    style={{ color: isActive ? '#0A84FF' : '#98989D', fontSize: '9px' }}
                  >
                    {tab.label}
                  </span>
                </motion.button>
              );
            }

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex flex-col items-center gap-1 px-3 py-1 rounded-3xl min-w-0"
                whileTap={{ scale: 0.9 }}
                transition={springConfig}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(10,132,255,0.2), rgba(94,92,230,0.2))',
                      border: '1px solid rgba(10,132,255,0.25)',
                    }}
                    transition={springConfig}
                  />
                )}
                <div className="relative">
                  <Icon size={18} style={{ color: isActive ? '#0A84FF' : '#98989D' }} />
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: isActive ? '#F5F5F7' : '#98989D', fontSize: '9px' }}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}