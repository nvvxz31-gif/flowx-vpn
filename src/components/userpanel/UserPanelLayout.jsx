import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CreditCard, Users, User, HelpCircle, LogOut, LayoutDashboard, QrCode, History } from 'lucide-react';
import UserDashboard from './UserDashboard';
import UserSubscription from './UserSubscription';

const springConfig = { type: 'spring', stiffness: 300, damping: 30 };

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Обзор' },
  { id: 'subscription', icon: CreditCard, label: 'Подписка' },
  { id: 'connect', icon: QrCode, label: 'Подключение' },
  { id: 'history', icon: History, label: 'Платежи' },
  { id: 'referral', icon: Users, label: 'Партнёры' },
  { id: 'profile', icon: User, label: 'Профиль' },
];

export default function UserPanelLayout() {
  const [active, setActive] = useState('dashboard');

  const content = {
    dashboard: <UserDashboard />,
    subscription: <UserSubscription />,
    connect: <div className="p-8"><h1 className="text-2xl font-bold" style={{ color: '#F5F5F7' }}>Подключение</h1><p className="text-sm mt-2" style={{ color: '#98989D' }}>QR-код и конфиг-файлы для вашего устройства.</p></div>,
    history: <div className="p-8"><h1 className="text-2xl font-bold" style={{ color: '#F5F5F7' }}>История платежей</h1><p className="text-sm mt-2" style={{ color: '#98989D' }}>Записи всех транзакций и чеки.</p></div>,
    referral: <div className="p-8"><h1 className="text-2xl font-bold" style={{ color: '#F5F5F7' }}>Партнёры</h1><p className="text-sm mt-2" style={{ color: '#98989D' }}>Реферальная программа и ваши доходы.</p></div>,
    profile: <div className="p-8"><h1 className="text-2xl font-bold" style={{ color: '#F5F5F7' }}>Профиль</h1><p className="text-sm mt-2" style={{ color: '#98989D' }}>Настройки аккаунта.</p></div>,
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0D0D0F' }}>
      {/* Sidebar */}
      <div
        className="w-56 h-screen flex flex-col py-6 flex-shrink-0"
        style={{ background: 'rgba(18,18,20,0.95)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Logo */}
        <div className="px-5 mb-8">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
            >
              <Zap size={16} color="white" />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: '#F5F5F7' }}>FlowX VPN</div>
              <div className="text-xs" style={{ color: '#98989D' }}>my.flowx.com</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActive(item.id)}
                whileTap={{ scale: 0.97 }}
                className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
              >
                {isActive && (
                  <motion.div
                    layoutId="user-nav"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'linear-gradient(135deg, rgba(10,132,255,0.2), rgba(94,92,230,0.15))' }}
                    transition={springConfig}
                  />
                )}
                <Icon size={16} style={{ color: isActive ? '#0A84FF' : '#98989D', position: 'relative', zIndex: 1 }} />
                <span className="text-sm font-medium relative z-10" style={{ color: isActive ? '#F5F5F7' : '#98989D' }}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </nav>

        <div className="px-3">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ color: '#98989D' }}>
            <LogOut size={16} />
            <span className="text-sm">Выйти</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={springConfig}
          >
            {content[active]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}