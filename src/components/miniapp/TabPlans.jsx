import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Star, Zap, ChevronRight } from 'lucide-react';

const springConfig = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };

const plans = [
  {
    id: 'trial',
    name: 'Пробный',
    price: 0,
    duration: '7 дней',
    traffic: '15 ГБ',
    isTrial: true,
    features: ['Все серверы', 'VLESS+Reality', 'Бесплатно'],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 149,
    duration: '30 дней',
    traffic: '50 ГБ',
    features: ['Все серверы', 'VLESS+Reality', '1 устройство'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    duration: '30 дней',
    traffic: '150 ГБ',
    popular: true,
    features: ['Все серверы', 'VLESS+Reality', '3 устройства', 'Приоритетный сервер'],
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: 499,
    duration: '30 дней',
    traffic: '∞',
    features: ['Все серверы', 'VLESS+Reality', '5 устройств', 'Приоритетный сервер', 'Личный сервер'],
  },
];

export default function TabPlans() {
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const applyPromo = () => {
    if (promo.toUpperCase() === 'FLOW20') {
      setDiscount(0.2);
      setPromoApplied(true);
    }
  };

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

      {plans.map((plan, i) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: i * 0.07 }}
          className="mb-3 relative"
        >
          {plan.popular && (
            <div
              className="absolute -top-2.5 left-4 z-10 px-3 py-0.5 rounded-full text-xs font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
            >
              Популярный
            </div>
          )}

          <motion.div
            whileTap={{ scale: 0.98 }}
            className="p-4 rounded-3xl"
            style={{
              background: plan.isTrial ? 'rgba(10,132,255,0.08)' : 'rgba(28,28,30,0.6)',
              border: plan.isTrial
                ? '1px solid rgba(10,132,255,0.35)'
                : plan.popular
                  ? '1px solid rgba(94,92,230,0.35)'
                  : '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-base font-bold" style={{ color: '#F5F5F7' }}>{plan.name}</span>
                  {plan.isTrial && (
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'rgba(10,132,255,0.2)', color: '#0A84FF' }}
                    >
                      7 дней бесплатно
                    </motion.span>
                  )}
                </div>
                <div className="text-xs" style={{ color: '#98989D' }}>
                  {plan.traffic} · {plan.duration}
                </div>
              </div>

              <div className="text-right">
                {plan.isTrial ? (
                  <span className="text-xl font-bold" style={{ color: '#30D158' }}>Бесплатно</span>
                ) : (
                  <>
                    {promoApplied && discount > 0 && (
                      <div className="text-sm line-through" style={{ color: '#98989D' }}>₽ {plan.price}</div>
                    )}
                    <div className="text-xl font-bold" style={{ color: '#F5F5F7' }}>
                      ₽ {promoApplied ? Math.round(plan.price * (1 - discount)) : plan.price}
                    </div>
                    <div className="text-xs" style={{ color: '#98989D' }}>/ мес</div>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {plan.features.map((f, j) => (
                <span
                  key={j}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#98989D' }}
                >
                  {f}
                </span>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl font-semibold text-sm"
              style={{
                background: plan.isTrial || plan.popular ? 'linear-gradient(135deg, #0A84FF, #5E5CE6)' : 'rgba(255,255,255,0.08)',
                color: plan.isTrial || plan.popular ? 'white' : '#F5F5F7',
                boxShadow: plan.isTrial || plan.popular ? '0 4px 15px rgba(10,132,255,0.3)' : 'none',
              }}
            >
              {plan.isTrial ? 'Начать бесплатно' : 'Выбрать тариф'}
            </motion.button>
          </motion.div>

          {plan.isTrial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-xs text-center"
              style={{ color: '#98989D' }}
            >
              Продли триал на 3 дня за каждого приглашённого друга
              {' '}
              <button className="underline" style={{ color: '#0A84FF' }}>Пригласить</button>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Promo code */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 p-4 rounded-2xl"
        style={{ background: 'rgba(28,28,30,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Tag size={14} color="#98989D" />
          <span className="text-sm font-medium" style={{ color: '#F5F5F7' }}>Промокод</span>
        </div>
        <div className="flex gap-2">
          <input
            value={promo}
            onChange={e => setPromo(e.target.value.toUpperCase())}
            placeholder="ВВЕДИТЕ ПРОМОКОД"
            className="flex-1 px-3 py-2.5 rounded-xl text-sm font-mono outline-none"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: promoApplied ? '1px solid rgba(48,209,88,0.5)' : '1px solid rgba(255,255,255,0.08)',
              color: '#F5F5F7',
            }}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={applyPromo}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(10,132,255,0.2)', color: '#0A84FF' }}
          >
            {promoApplied ? '✓' : 'Применить'}
          </motion.button>
        </div>
        {promoApplied && (
          <p className="text-xs mt-2" style={{ color: '#30D158' }}>Скидка 20% применена!</p>
        )}
      </motion.div>
    </div>
  );
}