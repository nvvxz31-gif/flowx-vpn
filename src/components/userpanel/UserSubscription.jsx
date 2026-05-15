import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Zap, ArrowUpRight } from 'lucide-react';

export default function UserSubscription() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: '#F5F5F7', letterSpacing: '-0.02em' }}>Подписка</h1>
        <p className="text-sm" style={{ color: '#98989D' }}>Управление планом и оплатой</p>
      </div>

      {/* Current plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-3xl mb-6"
        style={{ background: 'rgba(10,132,255,0.06)', border: '1px solid rgba(10,132,255,0.2)' }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs mb-1" style={{ color: '#98989D' }}>Текущий тариф</div>
            <div className="text-2xl font-bold" style={{ color: '#F5F5F7' }}>FlowX Pro</div>
          </div>
          <span
            className="text-xs px-3 py-1 rounded-full font-semibold"
            style={{ background: 'rgba(48,209,88,0.15)', color: '#30D158' }}
          >
            Активен
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Трафик', value: '150 ГБ / мес' },
            { label: 'Истекает', value: '14 июня 2026' },
            { label: 'Цена', value: '₽ 299 / мес' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-xs mb-1" style={{ color: '#98989D' }}>{label}</div>
              <div className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>{value}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-5">
          <button
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
          >
            Продлить подписку
          </button>
          <button
            className="flex-1 py-3 rounded-xl text-sm font-medium"
            style={{ background: 'rgba(255,255,255,0.07)', color: '#98989D' }}
          >
            Сменить тариф
          </button>
        </div>
      </motion.div>

      {/* Available plans */}
      <h3 className="text-sm font-semibold mb-4" style={{ color: '#F5F5F7' }}>Доступные тарифы</h3>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {[
          { name: 'Basic', price: 149, traffic: '50 ГБ', current: false },
          { name: 'Pro', price: 299, traffic: '150 ГБ', current: true },
          { name: 'Unlimited', price: 499, traffic: '∞', current: false },
        ].map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="p-4 rounded-2xl"
            style={{
              background: plan.current ? 'rgba(10,132,255,0.08)' : 'rgba(28,28,30,0.5)',
              border: plan.current ? '1px solid rgba(10,132,255,0.3)' : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="font-bold" style={{ color: '#F5F5F7' }}>{plan.name}</div>
              {plan.current && (
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(10,132,255,0.15)', color: '#0A84FF' }}>
                  Текущий
                </span>
              )}
            </div>
            <div className="text-xl font-bold font-mono mb-1" style={{ color: '#F5F5F7' }}>₽ {plan.price}</div>
            <div className="text-xs mb-4" style={{ color: '#98989D' }}>{plan.traffic} · 30 дней</div>
            {!plan.current && (
              <button
                className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                style={{ background: 'rgba(10,132,255,0.12)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.2)' }}
              >
                Перейти <ArrowUpRight size={12} />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}