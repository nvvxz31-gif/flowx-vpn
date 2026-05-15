import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Tag, X } from 'lucide-react';

const plans = [
  { id: 1, name: 'Пробный', price_rub: 0, price_stars: 0, traffic: 15, days: 7, isTrial: true },
  { id: 2, name: 'Basic', price_rub: 149, price_stars: 149, traffic: 50, days: 30, isTrial: false },
  { id: 3, name: 'Pro', price_rub: 299, price_stars: 299, traffic: 150, days: 30, isTrial: false },
  { id: 4, name: 'Unlimited', price_rub: 499, price_stars: 499, traffic: 0, days: 30, isTrial: false },
];

const promoCodes = [
  { code: 'FLOW20', discount: '20%', expires: '31.12.2026', uses: '48 / 100' },
  { code: 'SUMMER25', discount: '25%', expires: '31.08.2026', uses: '12 / 50' },
  { code: 'WELCOME', discount: '₽50', expires: 'Бессрочно', uses: '∞' },
];

export default function AdminPlans() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: '#F5F5F7', letterSpacing: '-0.02em' }}>Тарифы</h1>
          <p className="text-sm" style={{ color: '#98989D' }}>Управление планами подписки</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
        >
          <Plus size={14} />
          Создать тариф
        </button>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-card p-5 rounded-2xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold" style={{ color: '#F5F5F7' }}>{plan.name}</span>
                  {plan.isTrial && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(10,132,255,0.15)', color: '#0A84FF' }}>
                      Триал
                    </span>
                  )}
                </div>
                <div className="text-xs" style={{ color: '#98989D' }}>
                  {plan.traffic === 0 ? '∞ ГБ' : `${plan.traffic} ГБ`} · {plan.days} дней
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold font-mono" style={{ color: plan.isTrial ? '#30D158' : '#F5F5F7' }}>
                  {plan.isTrial ? 'Free' : `₽${plan.price_rub}`}
                </div>
                {!plan.isTrial && (
                  <div className="text-xs" style={{ color: '#98989D' }}>⭐ {plan.price_stars} звёзд</div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(10,132,255,0.1)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.2)' }}
              >
                <Edit2 size={13} />
                Редактировать
              </button>
              {!plan.isTrial && (
                <button
                  className="p-2.5 rounded-xl"
                  style={{ background: 'rgba(255,69,58,0.1)', color: '#FF453A', border: '1px solid rgba(255,69,58,0.2)' }}
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Promo codes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold" style={{ color: '#F5F5F7' }}>Промокоды</h3>
          <button
            onClick={() => setShowPromoModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium"
            style={{ background: 'rgba(48,209,88,0.1)', color: '#30D158', border: '1px solid rgba(48,209,88,0.2)' }}
          >
            <Plus size={13} />
            Создать промокод
          </button>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-5 py-3 text-xs font-medium" style={{ color: '#98989D', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span>Код</span>
            <span>Скидка</span>
            <span>Истекает</span>
            <span>Использований</span>
          </div>
          {promoCodes.map((promo, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 px-5 py-4 border-b items-center" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              <span className="text-sm font-mono font-bold" style={{ color: '#0A84FF' }}>{promo.code}</span>
              <span className="text-sm font-semibold" style={{ color: '#30D158' }}>{promo.discount}</span>
              <span className="text-sm" style={{ color: '#98989D' }}>{promo.expires}</span>
              <span className="text-sm" style={{ color: '#98989D' }}>{promo.uses}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}