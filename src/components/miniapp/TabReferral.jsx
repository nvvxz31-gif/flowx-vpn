import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const springConfig = { type: 'spring', stiffness: 300, damping: 30 };

const chartData = [
  { day: 'Пн', revenue: 450 },
  { day: 'Вт', revenue: 720 },
  { day: 'Ср', revenue: 380 },
  { day: 'Чт', revenue: 920 },
  { day: 'Пт', revenue: 650 },
  { day: 'Сб', revenue: 1100 },
  { day: 'Вс', revenue: 840 },
];

const stats = [
  { label: 'Переходы', value: '248', icon: TrendingUp, color: '#0A84FF' },
  { label: 'Рефералы', value: '31', icon: Users, color: '#5E5CE6' },
  { label: 'Доход', value: '₽ 4 650', icon: DollarSign, color: '#30D158' },
];

export default function TabReferral() {
  const [copied, setCopied] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const refLink = 'https://t.me/flowxvpn_bot?start=ref_u7x9k';

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 pt-16 pb-4">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-1 tracking-tight"
        style={{ color: '#F5F5F7', letterSpacing: '-0.02em' }}
      >
        Партнёрская программа
      </motion.h1>
      <p className="text-sm mb-6" style={{ color: '#98989D' }}>Зарабатывай с FlowX VPN</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springConfig, delay: i * 0.07 }}
            className="glass-card p-3 rounded-2xl"
          >
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center mb-2"
              style={{ background: `${stat.color}20` }}
            >
              <stat.icon size={14} color={stat.color} />
            </div>
            <div className="text-base font-bold font-mono" style={{ color: '#F5F5F7' }}>{stat.value}</div>
            <div className="text-xs" style={{ color: '#98989D' }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4 rounded-3xl mb-5"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>Доход по дням</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(10,132,255,0.15)', color: '#0A84FF' }}>Эта неделя</span>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="refGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0A84FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fill: '#98989D', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'rgba(28,28,30,0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#F5F5F7', fontSize: 12 }}
              cursor={false}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#0A84FF"
              strokeWidth={2}
              fill="url(#refGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Referral link */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4 rounded-2xl mb-4"
      >
        <div className="text-xs mb-2 font-medium" style={{ color: '#98989D' }}>Ваша реферальная ссылка</div>
        <div className="flex items-center gap-2">
          <div
            className="flex-1 px-3 py-2 rounded-xl text-xs font-mono truncate"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#0A84FF', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {refLink}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className="p-2.5 rounded-xl flex-shrink-0"
            style={{ background: copied ? 'rgba(48,209,88,0.2)' : 'rgba(10,132,255,0.2)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {copied ? <Check size={14} color="#30D158" /> : <Copy size={14} color="#0A84FF" />}
          </motion.button>
        </div>
      </motion.div>

      {/* Withdraw button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowWithdrawModal(true)}
        className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
        style={{ background: 'rgba(48,209,88,0.12)', border: '1px solid rgba(48,209,88,0.3)', color: '#30D158' }}
      >
        <DollarSign size={16} />
        Заявка на вывод ₽ 4 650
        <ArrowUpRight size={14} />
      </motion.button>

      {/* Withdraw modal */}
      {showWithdrawModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
            onClick={() => setShowWithdrawModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfig}
            className="fixed bottom-0 left-0 right-0 z-50 p-6 rounded-t-3xl"
            style={{ background: 'rgba(28,28,30,0.98)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: '#F5F5F7' }}>Вывод средств</h3>
            <div className="flex gap-3 mb-4">
              {['CryptoBot', 'USDT TRC20'].map(method => (
                <button
                  key={method}
                  className="flex-1 py-3 rounded-2xl text-sm font-medium"
                  style={{ background: 'rgba(255,255,255,0.07)', color: '#F5F5F7', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {method}
                </button>
              ))}
            </div>
            <input
              placeholder="Введите адрес кошелька"
              className="w-full px-4 py-3 rounded-2xl text-sm mb-4 outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#F5F5F7' }}
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-2xl font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
            >
              Отправить заявку
            </motion.button>
          </motion.div>
        </>
      )}
    </div>
  );
}