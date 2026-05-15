import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Hash, Calendar, Bell, Globe, Shield, ExternalLink } from 'lucide-react';

const springConfig = { type: 'spring', stiffness: 300, damping: 30 };

function Toggle({ enabled, onChange }) {
  return (
    <motion.button
      onClick={() => onChange(!enabled)}
      className="relative w-12 h-6 rounded-full flex-shrink-0"
      style={{ background: enabled ? 'linear-gradient(135deg, #0A84FF, #5E5CE6)' : 'rgba(255,255,255,0.1)' }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-0.5 bottom-0.5 aspect-square rounded-full bg-white shadow-sm"
        animate={{ left: enabled ? 'calc(100% - 22px)' : '2px' }}
        transition={springConfig}
      />
    </motion.button>
  );
}

export default function TabProfile() {
  const [notifications, setNotifications] = useState({
    traffic: true,
    expiry: true,
    inactivity: false,
  });

  return (
    <div className="px-4 pt-16 pb-4">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6 tracking-tight"
        style={{ color: '#F5F5F7', letterSpacing: '-0.02em' }}
      >
        Профиль
      </motion.h1>

      {/* User info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="glass-card p-5 rounded-3xl mb-4"
      >
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
            style={{ background: 'linear-gradient(135deg, rgba(10,132,255,0.3), rgba(94,92,230,0.3))', border: '1px solid rgba(10,132,255,0.3)' }}
          >
            🦊
          </div>
          <div>
            <div className="text-lg font-bold" style={{ color: '#F5F5F7' }}>@username</div>
            <div
              className="text-xs px-2 py-0.5 rounded-full inline-block mt-1"
              style={{ background: 'rgba(10,132,255,0.15)', color: '#0A84FF' }}
            >
              Триал · 5 дней
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { IconComp: Hash, label: 'ID пользователя', value: '1 284 930' },
            { IconComp: User, label: 'Telegram', value: '@username' },
            { IconComp: Mail, label: 'Email', value: 'user@example.com', editable: true },
            { IconComp: Calendar, label: 'Зарегистрирован', value: '14 мая 2026' },
          ].map(({ IconComp, label, value, editable }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-3">
                <IconComp size={14} color="#98989D" />
                <span className="text-sm" style={{ color: '#98989D' }}>{label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: '#F5F5F7' }}>{value}</span>
                {editable && (
                  <span className="text-xs" style={{ color: '#0A84FF' }}>Изменить</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Subscription */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
        className="glass-card p-5 rounded-3xl mb-4"
      >
        <h3 className="text-sm font-semibold mb-4" style={{ color: '#F5F5F7' }}>Подписка</h3>
        <div className="flex items-center justify-between py-2 border-b mb-3" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <span className="text-sm" style={{ color: '#98989D' }}>Тариф</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#0A84FF' }} />
            <span className="text-sm font-medium" style={{ color: '#F5F5F7' }}>Пробный период</span>
          </div>
        </div>
        <div className="flex items-center justify-between py-2" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <span className="text-sm" style={{ color: '#98989D' }}>Истекает</span>
          <span className="text-sm font-medium font-mono" style={{ color: '#F5F5F7' }}>19 мая 2026</span>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.15 }}
        className="glass-card p-5 rounded-3xl mb-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Bell size={14} color="#98989D" />
          <h3 className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>Уведомления</h3>
        </div>
        {[
          { key: 'traffic', label: 'Конец трафика', desc: 'Когда закончится лимит' },
          { key: 'expiry', label: 'Истечение подписки', desc: 'За 3 дня до конца' },
          { key: 'inactivity', label: 'Неактивность', desc: 'Если не подключён 24ч' },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div>
              <div className="text-sm" style={{ color: '#F5F5F7' }}>{label}</div>
              <div className="text-xs" style={{ color: '#98989D' }}>{desc}</div>
            </div>
            <Toggle enabled={notifications[key]} onChange={v => setNotifications(n => ({ ...n, [key]: v }))} />
          </div>
        ))}
      </motion.div>

      {/* Web cabinet button */}
      <motion.a
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        href="https://my.flowx.com"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between p-4 rounded-2xl"
        style={{ background: 'rgba(28,28,30,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-3">
          <Globe size={16} color="#0A84FF" />
          <span className="text-sm font-medium" style={{ color: '#F5F5F7' }}>Открыть веб-кабинет</span>
        </div>
        <ExternalLink size={14} color="#98989D" />
      </motion.a>
    </div>
  );
}