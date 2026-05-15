import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Globe, Clock, Zap, Copy, QrCode } from 'lucide-react';

const springConfig = { type: 'spring', stiffness: 300, damping: 30 };

export default function UserDashboard() {
  const usedGb = 12.4;
  const totalGb = 150;
  const usedPercent = (usedGb / totalGb) * 100;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: '#F5F5F7', letterSpacing: '-0.02em' }}>Добро пожаловать</h1>
        <p className="text-sm" style={{ color: '#98989D' }}>Ваша подписка активна · FlowX Pro</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        {/* Status card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-3xl xl:col-span-2"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{ background: '#30D158' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold" style={{ color: '#30D158' }}>Подписка активна</span>
            </div>
            <span className="text-sm" style={{ color: '#98989D' }}>До 14 июня 2026</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { Ic: Globe, label: 'Тариф', value: 'FlowX Pro', color: '#0A84FF' },
              { Ic: Zap, label: 'Трафик', value: `${usedGb} / ${totalGb} ГБ`, color: '#5E5CE6' },
              { Ic: Clock, label: 'Осталось', value: '31 день', color: '#30D158' },
            ].map(({ Ic, label, value, color }) => (
              <div key={label} className="text-center">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{ background: `${color}18` }}
                >
                  <Ic size={18} color={color} />
                </div>
                <div className="text-xs mb-0.5" style={{ color: '#98989D' }}>{label}</div>
                <div className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Traffic bar */}
          <div className="mt-5">
            <div className="flex justify-between text-xs mb-1.5" style={{ color: '#98989D' }}>
              <span>Использовано трафика</span>
              <span>{Math.round(usedPercent)}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0A84FF, #5E5CE6)' }}
                initial={{ width: 0 }}
                animate={{ width: `${usedPercent}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Config card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 rounded-2xl"
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#F5F5F7' }}>Ваша конфигурация</h3>
          <div
            className="p-3 rounded-xl font-mono text-xs mb-3 truncate"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#0A84FF', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            vless://uuid@server.flowx.com:443?...
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium"
              style={{ background: 'rgba(10,132,255,0.12)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.2)' }}
            >
              <Copy size={12} />
              Скопировать
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium"
              style={{ background: 'rgba(94,92,230,0.12)', color: '#5E5CE6', border: '1px solid rgba(94,92,230,0.2)' }}
            >
              <QrCode size={12} />
              QR-код
            </button>
          </div>
        </motion.div>

        {/* Server info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-5 rounded-2xl"
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#F5F5F7' }}>Активный сервер</h3>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🇳🇱</span>
            <div>
              <div className="font-medium text-sm" style={{ color: '#F5F5F7' }}>Амстердам</div>
              <div className="text-xs" style={{ color: '#98989D' }}>Нидерланды · 45 мс</div>
            </div>
            <motion.div
              className="ml-auto w-2 h-2 rounded-full"
              style={{ background: '#30D158' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <button
            className="w-full py-2.5 rounded-xl text-xs font-medium"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#98989D' }}
          >
            Сменить сервер
          </button>
        </motion.div>
      </div>
    </div>
  );
}