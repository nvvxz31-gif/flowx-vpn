import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const springConfig = { type: 'spring', stiffness: 300, damping: 30 };

const revenueData = [
  { date: '1 мая', revenue: 12400, users: 84 },
  { date: '3 мая', revenue: 18200, users: 102 },
  { date: '5 мая', revenue: 15600, users: 95 },
  { date: '7 мая', revenue: 22800, users: 134 },
  { date: '9 мая', revenue: 19400, users: 118 },
  { date: '11 мая', revenue: 28600, users: 167 },
  { date: '13 мая', revenue: 31200, users: 189 },
];

const metrics = [
  { label: 'Выручка (месяц)', value: '₽ 148 200', delta: '+23%', icon: DollarSign, color: '#30D158' },
  { label: 'Активных пользователей', value: '1 847', delta: '+12%', icon: Users, color: '#0A84FF' },
  { label: 'MRR', value: '₽ 89 400', delta: '+8%', icon: TrendingUp, color: '#5E5CE6' },
  { label: 'ARPU', value: '₽ 284', delta: '+3%', icon: Activity, color: '#FF9F0A' },
];

const topPlans = [
  { name: 'Pro', sales: 524, revenue: 56738 },
  { name: 'Basic', sales: 312, revenue: 23288 },
  { name: 'Unlimited', sales: 189, revenue: 47061 },
  { name: 'Триал', sales: 822, revenue: 0 },
];

const dataByPeriod = {
  'День': [
    { date: '08:00', revenue: 3200, users: 18 },
    { date: '10:00', revenue: 5600, users: 31 },
    { date: '12:00', revenue: 8900, users: 54 },
    { date: '14:00', revenue: 7400, users: 43 },
    { date: '16:00', revenue: 11200, users: 67 },
    { date: '18:00', revenue: 9800, users: 58 },
    { date: '20:00', revenue: 6400, users: 38 },
  ],
  'Неделя': revenueData,
  'Месяц': [
    { date: '1 апр', revenue: 42000, users: 210 },
    { date: '8 апр', revenue: 68000, users: 340 },
    { date: '15 апр', revenue: 54000, users: 270 },
    { date: '22 апр', revenue: 91000, users: 455 },
    { date: '29 апр', revenue: 78000, users: 390 },
    { date: '6 мая', revenue: 112000, users: 560 },
    { date: '13 мая', revenue: 124000, users: 620 },
  ],
};

export default function AdminDashboard() {
  const [activePeriod, setActivePeriod] = useState('Неделя');
  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#F5F5F7', letterSpacing: '-0.02em' }}>Дашборд</h1>
        <p className="text-sm" style={{ color: '#98989D' }}>Обзор ключевых метрик сервиса</p>
      </motion.div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springConfig, delay: i * 0.07 }}
            className="glass-card p-5 rounded-2xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${m.color}18` }}
              >
                <m.icon size={18} color={m.color} />
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(48,209,88,0.12)', color: '#30D158' }}
              >
                {m.delta}
              </span>
            </div>
            <div className="text-2xl font-bold font-mono mb-1" style={{ color: '#F5F5F7' }}>{m.value}</div>
            <div className="text-xs" style={{ color: '#98989D' }}>{m.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 rounded-2xl mb-6"
      >
        <div className="flex items-start justify-between mb-5 gap-2">
          <div>
            <h3 className="text-base font-semibold" style={{ color: '#F5F5F7' }}>Revenue River</h3>
            <p className="text-xs" style={{ color: '#98989D' }}>Выручка за последние 2 недели</p>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            {['День', 'Неделя', 'Месяц'].map((period) => (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                className="text-xs px-3 py-1 rounded-full transition-all"
                style={{
                  background: activePeriod === period ? 'rgba(10,132,255,0.2)' : 'rgba(255,255,255,0.06)',
                  color: activePeriod === period ? '#0A84FF' : '#98989D',
                }}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={dataByPeriod[activePeriod]}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#0A84FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: '#98989D', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: 'rgba(28,28,30,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#F5F5F7', fontSize: 12 }}
              formatter={v => [`₽ ${v.toLocaleString()}`, 'Выручка']}
              cursor={{ stroke: 'rgba(10,132,255,0.3)' }}
            />
            <Area type="monotone" dataKey="revenue" data={dataByPeriod[activePeriod]} stroke="#0A84FF" strokeWidth={2.5} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Top plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-base font-semibold mb-4" style={{ color: '#F5F5F7' }}>Топ тарифов</h3>
          <div className="space-y-3">
            {topPlans.map((plan, i) => (
              <div key={plan.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(10,132,255,0.12)', color: '#0A84FF' }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#F5F5F7' }}>{plan.name}</div>
                    <div className="text-xs" style={{ color: '#98989D' }}>{plan.sales} продаж</div>
                  </div>
                </div>
                <div className="text-sm font-mono font-bold" style={{ color: plan.revenue > 0 ? '#30D158' : '#98989D' }}>
                  {plan.revenue > 0 ? `₽ ${plan.revenue.toLocaleString()}` : 'Бесплатно'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* User chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-base font-semibold mb-4" style={{ color: '#F5F5F7' }}>Новые пользователи</h3>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={revenueData}>
              <XAxis dataKey="date" tick={{ fill: '#98989D', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'rgba(28,28,30,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#F5F5F7', fontSize: 12 }}
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              />
              <Bar dataKey="users" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5E5CE6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#5E5CE6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}