import React, { useState } from 'react';
import { motion } from 'framer-motion';

const springConfig = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };

const durations = [
  { months: 1, label: '1 месяц', price: 99, discount: null },
  { months: 3, label: '3 месяца', price: 249, discount: 15 },
  { months: 6, label: '6 месяцев', price: 449, discount: 25 },
  { months: 12, label: '12 месяцев', price: 899, discount: 35 },
];

export default function TabPlans() {
  const [selectedMonths, setSelectedMonths] = useState(1);

  const selected = durations.find(d => d.months === selectedMonths);

  return (
    <div className="px-4 pt-16 pb-4">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-1 tracking-tight"
        style={{ color: '#F5F5F7', letterSpacing: '-0.02em' }}
      >
        Тарифы
      </motion.h1>
      <p className="text-sm mb-6" style={{ color: '#98989D' }}>Выберите подходящий план</p>

      {/* Trial card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="mb-3"
      >
        <div
          className="p-4 rounded-3xl"
          style={{
            background: 'rgba(10,132,255,0.08)',
            border: '1px solid rgba(10,132,255,0.35)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold" style={{ color: '#F5F5F7' }}>Пробный</span>
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(10,132,255,0.2)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.3)' }}
              >
                7 дней бесплатно
              </motion.span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg">🎁</span>
              <span className="text-lg font-bold" style={{ color: '#30D158' }}>Бесплатно</span>
            </div>
          </div>

          <div className="text-xs mb-3" style={{ color: '#98989D' }}>15 ГБ · 7 дней</div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {['🇳🇱 Нидерланды', '🇩🇪 Германия', '🇫🇮 Финляндия', '+ и другие серверы'].map((f, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#98989D' }}
              >
                {f}
              </span>
            ))}
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#98989D' }}
            >
              🇷🇺✅ Белые списки
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white"
            style={{
              background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)',
              boxShadow: '0 4px 15px rgba(10,132,255,0.3)',
            }}
          >
            Начать бесплатно
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-xs text-center"
          style={{ color: '#98989D' }}
        >
          Продли триал на 3 дня за каждого приглашённого друга{' '}
          <button className="underline" style={{ color: '#0A84FF' }}>Пригласить</button>
        </motion.div>
      </motion.div>

      {/* Basic plan with duration selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
        className="mb-3"
      >
        <div
          className="p-4 rounded-3xl"
          style={{
            background: 'rgba(28,28,30,0.6)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-base font-bold" style={{ color: '#F5F5F7' }}>Basic</span>
            <div className="text-right">
              <span className="text-xl font-bold" style={{ color: '#F5F5F7' }}>₽ {selected.price}</span>
              <div className="text-xs" style={{ color: '#98989D' }}>/ {selected.months} мес</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {['🇳🇱 Нидерланды', '🇩🇪 Германия', '🇫🇮 Финляндия', '+ и другие серверы'].map((f, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#98989D' }}
              >
                {f}
              </span>
            ))}
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#98989D' }}
            >
              🇷🇺✅ Белые списки
            </span>
          </div>

          {/* Duration scroll selector */}
          <div
            className="flex gap-2 mb-4"
            style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '12px', paddingTop: '10px' }}
          >
            {durations.map((d) => (
              <motion.button
                key={d.months}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMonths(d.months)}
                className="flex-shrink-0 flex flex-col items-center rounded-2xl relative"
                style={{
                  background: selectedMonths === d.months ? 'rgba(10,132,255,0.18)' : 'rgba(255,255,255,0.05)',
                  border: selectedMonths === d.months ? '1px solid rgba(10,132,255,0.45)' : '1px solid rgba(255,255,255,0.08)',
                  minWidth: '76px',
                  padding: '10px 12px',
                  marginTop: '6px',
                }}
              >
                {d.discount && (
                  <div
                    className="absolute flex items-center justify-center rounded-full font-bold"
                    style={{
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)',
                      color: 'white',
                      fontSize: '9px',
                      padding: '2px 6px',
                      whiteSpace: 'nowrap',
                      borderRadius: '100px',
                    }}
                  >
                    -{d.discount}%
                  </div>
                )}
                <span className="text-xs font-semibold" style={{ color: selectedMonths === d.months ? '#0A84FF' : '#98989D' }}>
                  {d.label}
                </span>
                <span className="text-sm font-bold mt-0.5" style={{ color: selectedMonths === d.months ? '#F5F5F7' : '#98989D' }}>
                  ₽{d.price}
                </span>
              </motion.button>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl font-semibold text-sm"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: '#F5F5F7',
            }}
          >
            Выбрать тариф
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}