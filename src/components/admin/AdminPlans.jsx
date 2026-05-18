import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Check, Save } from 'lucide-react';

const initialPlans = [
  { id: 1, name: 'Пробный', price_rub: 0, traffic: 50, days: 7, isTrial: true, durations: null },
  {
    id: 2, name: 'Basic', price_rub: 99, traffic: 300, days: 30, isTrial: false,
    durations: [
      { months: 1, price: 99, discount: null },
      { months: 3, price: 249, discount: 15 },
      { months: 6, price: 449, discount: 25 },
      { months: 12, price: 899, discount: 35 },
    ],
  },
];

const initialPromoCodes = [
  { code: 'FLOW20', discount: '20%', expires: '31.12.2026', uses: '48 / 100' },
  { code: 'SUMMER25', discount: '25%', expires: '31.08.2026', uses: '12 / 50' },
  { code: 'WELCOME', discount: '₽50', expires: 'Бессрочно', uses: '∞' },
];

export default function AdminPlans() {
  const [plans, setPlans] = useState(initialPlans);
  const [promoCodes, setPromoCodes] = useState(initialPromoCodes);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: '', price_rub: '', traffic: '', days: 30 });
  const [newPromo, setNewPromo] = useState({ code: '', discount: '', expires: '' });

  const handleSaveEdit = () => {
    setPlans(prev => prev.map(p => p.id === editingPlan.id ? editingPlan : p));
    setEditingPlan(null);
  };

  const handleDelete = (id) => {
    setPlans(prev => prev.filter(p => p.id !== id));
  };

  const handleCreate = () => {
    if (!newPlan.name || !newPlan.price_rub) return;
    setPlans(prev => [...prev, { id: Date.now(), ...newPlan, price_rub: Number(newPlan.price_rub), traffic: Number(newPlan.traffic), isTrial: false, durations: null }]);
    setNewPlan({ name: '', price_rub: '', traffic: '', days: 30 });
    setShowCreateModal(false);
  };

  const handleCreatePromo = () => {
    if (!newPromo.code || !newPromo.discount) return;
    setPromoCodes(prev => [...prev, { ...newPromo, expires: newPromo.expires || 'Бессрочно', uses: '0 / ∞' }]);
    setNewPromo({ code: '', discount: '', expires: '' });
    setShowPromoModal(false);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-start justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#F5F5F7', letterSpacing: '-0.02em' }}>Тарифы</h1>
          <p className="text-sm" style={{ color: '#98989D' }}>Управление планами подписки</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl text-sm font-medium text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Создать тариф</span>
          <span className="sm:hidden">Создать</span>
        </button>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        {plans.map((plan, i) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="glass-card p-5 rounded-2xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold" style={{ color: '#F5F5F7' }}>{plan.name}</span>
                  {plan.isTrial && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(10,132,255,0.15)', color: '#0A84FF' }}>Триал</span>}
                </div>
                <div className="text-xs" style={{ color: '#98989D' }}>{plan.traffic === 0 ? '∞ ГБ' : `${plan.traffic} ГБ`} · {plan.days} дней</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold font-mono" style={{ color: plan.isTrial ? '#30D158' : '#F5F5F7' }}>
                  {plan.isTrial ? 'Free' : `от ₽${plan.price_rub}`}
                </div>
              </div>
            </div>

            {/* Duration pricing if any */}
            {plan.durations && (
              <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                {plan.durations.map(d => (
                  <div key={d.months} className="flex-shrink-0 text-center px-3 py-1.5 rounded-xl text-xs" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', color: '#98989D' }}>
                    <div className="font-semibold" style={{ color: '#F5F5F7' }}>₽{d.price}</div>
                    <div>{d.months} мес{d.discount ? ` -${d.discount}%` : ''}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => setEditingPlan({ ...plan })}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(10,132,255,0.1)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.2)' }}>
                <Edit2 size={13} /> Редактировать
              </button>
              {!plan.isTrial && (
                <button onClick={() => handleDelete(plan.id)}
                  className="p-2.5 rounded-xl"
                  style={{ background: 'rgba(255,69,58,0.1)', color: '#FF453A', border: '1px solid rgba(255,69,58,0.2)' }}>
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingPlan && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setEditingPlan(null)} />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} className="fixed bottom-0 left-0 right-0 z-50 p-6 rounded-t-3xl md:left-1/2 md:bottom-auto md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl md:w-96"
              style={{ background: 'rgba(18,18,20,0.99)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg" style={{ color: '#F5F5F7' }}>Редактировать тариф</h3>
                <button onClick={() => setEditingPlan(null)}><X size={18} color="#98989D" /></button>
              </div>
              <div className="space-y-3 mb-5">
                {[['Название', 'name', 'text'], ['Трафик (ГБ)', 'traffic', 'number'], ['Дней', 'days', 'number'], ...(!editingPlan.isTrial ? [['Цена (₽)', 'price_rub', 'number']] : [])].map(([label, key, type]) => (
                  <div key={key}>
                    <div className="text-xs mb-1.5" style={{ color: '#98989D' }}>{label}</div>
                    <input type={type} value={editingPlan[key] ?? ''} onChange={e => setEditingPlan(prev => ({ ...prev, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F5F7' }} />
                  </div>
                ))}
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleSaveEdit} className="w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}>
                <Save size={15} /> Сохранить
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowCreateModal(false)} />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} className="fixed bottom-0 left-0 right-0 z-50 p-6 rounded-t-3xl md:left-1/2 md:bottom-auto md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl md:w-96"
              style={{ background: 'rgba(18,18,20,0.99)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg" style={{ color: '#F5F5F7' }}>Новый тариф</h3>
                <button onClick={() => setShowCreateModal(false)}><X size={18} color="#98989D" /></button>
              </div>
              <div className="space-y-3 mb-5">
                {[['Название', 'name', 'text'], ['Цена (₽)', 'price_rub', 'number'], ['Трафик (ГБ)', 'traffic', 'number'], ['Дней', 'days', 'number']].map(([label, key, type]) => (
                  <div key={key}>
                    <div className="text-xs mb-1.5" style={{ color: '#98989D' }}>{label}</div>
                    <input type={type} value={newPlan[key]} onChange={e => setNewPlan(prev => ({ ...prev, [key]: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F5F7' }} placeholder={label} />
                  </div>
                ))}
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleCreate} className="w-full py-3.5 rounded-2xl font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}>
                Создать тариф
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

        {/* Promo table desktop */}
        <div className="glass-card rounded-2xl overflow-hidden hidden sm:block">
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
        {/* Promo cards mobile */}
        <div className="flex flex-col gap-3 sm:hidden">
          {promoCodes.map((promo, i) => (
            <div key={i} className="glass-card p-4 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-sm font-mono font-bold" style={{ color: '#0A84FF' }}>{promo.code}</div>
                <div className="text-xs mt-0.5" style={{ color: '#98989D' }}>{promo.expires} · {promo.uses}</div>
              </div>
              <span className="text-base font-bold" style={{ color: '#30D158' }}>{promo.discount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Create Modal */}
      <AnimatePresence>
        {showPromoModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowPromoModal(false)} />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} className="fixed bottom-0 left-0 right-0 z-50 p-6 rounded-t-3xl md:left-1/2 md:bottom-auto md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl md:w-96"
              style={{ background: 'rgba(18,18,20,0.99)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg" style={{ color: '#F5F5F7' }}>Новый промокод</h3>
                <button onClick={() => setShowPromoModal(false)}><X size={18} color="#98989D" /></button>
              </div>
              <div className="space-y-3 mb-5">
                {[['Код промокода', 'code', 'text', 'PROMO2026'], ['Скидка (%, или ₽N)', 'discount', 'text', '20% или ₽100'], ['Истекает (дд.мм.гггг)', 'expires', 'text', 'Бессрочно']].map(([label, key, type, placeholder]) => (
                  <div key={key}>
                    <div className="text-xs mb-1.5" style={{ color: '#98989D' }}>{label}</div>
                    <input type={type} value={newPromo[key]} onChange={e => setNewPromo(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F5F7' }} />
                  </div>
                ))}
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleCreatePromo} className="w-full py-3.5 rounded-2xl font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #30D158, #0A84FF)' }}>
                Создать промокод
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}