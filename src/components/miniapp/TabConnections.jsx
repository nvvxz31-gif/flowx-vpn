import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, Zap, Globe, ChevronRight, Gift, Activity, HelpCircle, MessageCircle, ChevronDown } from 'lucide-react';
import ServerGlobe from './ServerGlobe';

const faq = [
  { q: 'Как подключиться к VPN?', a: 'Скачайте приложение Streisand или Hiddify для вашего устройства, скопируйте конфиг в разделе «Подключения» и вставьте его в приложение.' },
  { q: 'Почему VPN медленно работает?', a: 'Попробуйте сменить сервер. Серверы с нагрузкой ниже 50% обычно обеспечивают лучшую скорость.' },
  { q: 'Что делать, если бот заблокирован?', a: 'Зайдите на my.flowx.com через браузер. Там доступны все функции без Telegram.' },
  { q: 'Логируете ли вы трафик?', a: 'Нет. Мы не сохраняем логи трафика, DNS-запросов или IP-адресов. Политика строгого no-log.' },
];

const platforms = [
  { name: 'iOS', icon: '🍎', app: 'Streisand' },
  { name: 'Android', icon: '🤖', app: 'Hiddify' },
  { name: 'Windows', icon: '🪟', app: 'Nekoray' },
  { name: 'macOS', icon: '🖥️', app: 'Streisand' },
];

const springConfig = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };

const servers = [
  { city: 'Москва', country: 'Россия', flag: '🇷🇺', ping: 12, load: 28 },
  { city: 'Амстердам', country: 'Нидерланды', flag: '🇳🇱', ping: 45, load: 42 },
  { city: 'Франкфурт', country: 'Германия', flag: '🇩🇪', ping: 52, load: 35 },
  { city: 'Стокгольм', country: 'Швеция', flag: '🇸🇪', ping: 67, load: 18 },
  { city: 'Нью-Йорк', country: 'США', flag: '🇺🇸', ping: 120, load: 55 },
];

export default function TabConnections() {
  const [status, setStatus] = useState('trial');
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showServerList, setShowServerList] = useState(false);
  const usedGb = 12.4;
  const totalGb = 50;
  const usedPercent = (usedGb / totalGb) * 100;
  const trialDays = 5;

  return (
    <div className="px-4 pt-16 pb-4">
      {/* Trial timer */}
      {status === 'trial' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center justify-center gap-2"
        >
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-xs font-medium"
            style={{ color: '#0A84FF' }}
          >
            ⏱
          </motion.span>
          <span className="text-sm" style={{ color: '#98989D' }}>
            Триал: осталось{' '}
            <span className="font-mono font-bold" style={{ color: '#F5F5F7' }}>{trialDays}</span>
            {' '}дней
          </span>
        </motion.div>
      )}

      {/* Status card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="glass-card p-6 rounded-3xl mb-4 noise-texture"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-medium mb-1" style={{ color: '#98989D' }}>Текущий тариф</div>
            <div className="text-xl font-bold" style={{ color: '#F5F5F7' }}>
              {status === 'trial' ? 'Пробный период' : 'FlowX Pro'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{
                background: status === 'active' ? '#30D158' : status === 'trial' ? '#0A84FF' : '#98989D',
              }}
              animate={{ opacity: status !== 'inactive' ? [0.6, 1, 0.6] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium" style={{
              color: status === 'active' ? '#30D158' : status === 'trial' ? '#0A84FF' : '#98989D'
            }}>
              {status === 'active' ? 'Активен' : status === 'trial' ? 'Триал' : 'Неактивен'}
            </span>
          </div>
        </div>

        {/* Traffic bubble */}
        <div className="flex items-center gap-6 mb-5">
          <div className="relative w-20 h-20">
            <svg className="absolute inset-0" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
              <motion.circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke="url(#trafficGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - usedPercent / 100) }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '40px 40px' }}
              />
              <defs>
                <linearGradient id="trafficGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0A84FF" />
                  <stop offset="100%" stopColor="#5E5CE6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold font-mono" style={{ color: '#F5F5F7' }}>{Math.round(usedPercent)}%</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-xs mb-1" style={{ color: '#98989D' }}>Использовано трафика</div>
            <div className="text-lg font-bold font-mono" style={{ color: '#F5F5F7' }}>
              {usedGb} <span style={{ color: '#98989D', fontWeight: 400 }}>/ {totalGb} ГБ</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0A84FF, #5E5CE6)' }}
                initial={{ width: 0 }}
                animate={{ width: `${usedPercent}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Subscription days bar */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: '#98989D' }}>До конца подписки</span>
            <span className="font-medium" style={{ color: '#F5F5F7' }}>21 день</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #0A84FF, #5E5CE6)' }}
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.2 }}
        className="grid grid-cols-2 gap-3"
      >
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center gap-2 p-4 rounded-2xl"
          style={{ background: 'rgba(10,132,255,0.12)', border: '1px solid rgba(10,132,255,0.3)' }}
        >
          <Activity size={16} color="#0A84FF" />
          <span className="text-sm font-medium" style={{ color: '#0A84FF' }}>Тест скорости</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowGiftModal(true)}
          className="flex items-center justify-center gap-2 p-4 rounded-2xl"
          style={{ background: 'rgba(94,92,230,0.12)', border: '1px solid rgba(94,92,230,0.3)' }}
        >
          <Gift size={16} color="#5E5CE6" />
          <span className="text-sm font-medium" style={{ color: '#5E5CE6' }}>Пригласить друга</span>
        </motion.button>
      </motion.div>

      {/* Connect button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.3 }}
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)',
            boxShadow: '0 4px 20px rgba(10,132,255,0.35)',
          }}
        >
          <Zap size={18} />
          Подключить VPN
        </motion.button>
      </motion.div>

      {/* Help section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.35 }}
        className="mt-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle size={14} color="#98989D" />
          <span className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>Помощь</span>
        </div>

        {/* Platforms */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {platforms.map((p) => (
            <button
              key={p.name}
              className="glass-card p-3 rounded-2xl text-center"
            >
              <div className="text-xl mb-1">{p.icon}</div>
              <div className="text-xs font-medium" style={{ color: '#F5F5F7' }}>{p.name}</div>
              <div className="text-xs" style={{ color: '#98989D', fontSize: '9px' }}>{p.app}</div>
            </button>
          ))}
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-2 mb-3">
          {faq.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(28,28,30,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-3.5 text-left"
              >
                <span className="text-sm font-medium pr-3" style={{ color: '#F5F5F7' }}>{item.q}</span>
                <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={springConfig} className="flex-shrink-0">
                  <ChevronDown size={15} color="#98989D" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={springConfig}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-sm leading-relaxed" style={{ color: '#98989D' }}>{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Support */}
        <a
          href="https://t.me/flowxvpn_support"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 p-4 rounded-2xl font-semibold"
          style={{ background: 'rgba(10,132,255,0.1)', border: '1px solid rgba(10,132,255,0.25)', color: '#0A84FF' }}
        >
          <MessageCircle size={15} />
          Написать в поддержку
        </a>
      </motion.div>

      {/* Gift modal */}
      <AnimatePresence>
        {showGiftModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
              onClick={() => setShowGiftModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={springConfig}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-50 p-6 rounded-3xl"
              style={{ background: 'rgba(28,28,30,0.98)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🎁</div>
                <h3 className="text-lg font-bold" style={{ color: '#F5F5F7' }}>Подарить другу 3 дня</h3>
              </div>
              <div
                className="p-3 rounded-xl font-mono text-sm mb-4 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.2)' }}
              >
                https://t.me/flowxvpn_bot?start=gift_abc123
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
              >
                Поделиться ссылкой
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}