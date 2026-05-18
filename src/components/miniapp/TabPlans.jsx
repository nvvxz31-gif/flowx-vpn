import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

const PAYMENT_METHODS = [
  { id: 'sbp', label: 'СБП', icon: 'https://media.base44.com/images/public/6a088498feb97a4eaded517d/a31556e00_profit1.webp' },
  { id: 'card', label: 'Карта РФ', icon: 'https://media.base44.com/images/public/6a088498feb97a4eaded517d/db345e8fb_i.webp' },
  { id: 'crypto', label: 'Крипта', icon: 'https://media.base44.com/images/public/6a088498feb97a4eaded517d/be135aa88_generated_image.png' },
  { id: 'cryptobot', label: 'CryptoBot', icon: 'https://media.base44.com/images/public/6a088498feb97a4eaded517d/1eeef1c58_5278656051538499167.jpg' },
  { id: 'stars', label: 'Telegram Stars', icon: 'https://media.base44.com/images/public/6a088498feb97a4eaded517d/8177385e9_img_2337.jpg' },
];

const springConfig = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };

// ✅ SECURITY NOTE (для разработчика при подключении кассы):
// Эти цены — только для отображения в UI.
// При создании платёжного заказа (invoice/order) цена ДОЛЖНА браться из бэкенда
// по ключу { plan: 'basic', months: N }, а не передаваться с клиента.
// Клиент передаёт только: { plan_id, months } → бэкенд возвращает сумму к оплате.
const durations = [
  { months: 1, label: '1 месяц', price: 99, discount: null },
  { months: 3, label: '3 месяца', price: 249, discount: 15 },
  { months: 6, label: '6 месяцев', price: 449, discount: 25 },
  { months: 12, label: '12 месяцев', price: 899, discount: 35 },
];

function PaymentModal({ plan, price, onClose }) {
  const { theme } = useApp();
  const isLight = theme === 'light';
  const [selectedMethod, setSelectedMethod] = useState('sbp');

  const primaryText = isLight ? '#1C1C1E' : '#F5F5F7';
  const secondaryText = isLight ? '#636366' : '#98989D';
  const modalBg = isLight ? 'rgba(242,242,247,0.99)' : 'rgba(22,22,24,0.99)';
  const modalBorder = isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)';
  const methodInactiveBg = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(44,44,46,0.5)';
  const methodInactiveBorder = isLight ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.07)';

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(16px)' }}
        onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-6 rounded-t-3xl overflow-y-auto"
        style={{ background: modalBg, border: modalBorder, maxHeight: '90vh' }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold" style={{ color: primaryText }}>Оплата тарифа</h3>
            <p className="text-sm" style={{ color: secondaryText }}>{plan} · <span style={{ color: '#0A84FF', fontWeight: 600 }}>₽ {price}</span></p>
          </div>
          <button onClick={onClose}><X size={20} color={secondaryText} /></button>
        </div>
        <p className="text-xs font-semibold mb-3" style={{ color: secondaryText }}>Способ оплаты</p>
        <div className="space-y-2 mb-5">
          {PAYMENT_METHODS.map(m => (
            <motion.button key={m.id} whileTap={{ scale: 0.97 }} onClick={() => setSelectedMethod(m.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left"
              style={{
                background: selectedMethod === m.id ? 'rgba(10,132,255,0.12)' : methodInactiveBg,
                border: selectedMethod === m.id ? '1px solid rgba(10,132,255,0.4)' : methodInactiveBorder,
              }}
            >
              <img src={m.icon} alt={m.label} className="w-8 h-8 rounded-xl object-cover flex-shrink-0" />
              <span className="text-sm font-medium" style={{ color: selectedMethod === m.id ? primaryText : secondaryText }}>{m.label}</span>
              {selectedMethod === m.id && (
                <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.97 }} className="w-full py-4 rounded-2xl font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)', boxShadow: '0 4px 20px rgba(10,132,255,0.4)' }}>
          Оплатить ₽ {price}
        </motion.button>
      </motion.div>
    </>
  );
}

export default function TabPlans() {
  const { theme } = useApp();
  const isLight = theme === 'light';
  const [selectedMonths, setSelectedMonths] = useState(1);
  const [paymentModal, setPaymentModal] = useState(null);

  const selected = durations.find(d => d.months === selectedMonths);

  const primaryText = isLight ? '#1C1C1E' : '#F5F5F7';
  const secondaryText = isLight ? '#636366' : '#98989D';
  const cardBg = isLight ? 'rgba(255,255,255,0.9)' : 'rgba(28,28,30,0.6)';
  const cardBorder = isLight ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.07)';
  const tagBg = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
  const durationBg = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
  const durationBorder = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';

  return (
    <div className="px-4 pt-16 pb-4">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-1 tracking-tight" style={{ color: primaryText, letterSpacing: '-0.02em' }}>
        Тарифы
      </motion.h1>
      <p className="text-sm mb-6" style={{ color: secondaryText }}>Выберите подходящий план</p>

      {/* Trial card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={springConfig} className="mb-3">
        <div className="p-4 rounded-3xl" style={{ background: isLight ? 'rgba(10,132,255,0.06)' : 'rgba(10,132,255,0.08)', border: '1px solid rgba(10,132,255,0.35)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-bold" style={{ color: primaryText }}>Пробный</span>
            <div className="px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5"
              style={{ background: 'linear-gradient(135deg, rgba(48,209,88,0.18), rgba(48,209,88,0.08))', border: '1px solid rgba(48,209,88,0.35)', color: '#30D158' }}>
              <span style={{ fontSize: '13px' }}>✦</span> <span style={{ fontSize: '16px', fontWeight: 800 }}>0</span> ₽
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: tagBg, color: primaryText }}>
              <span style={{ color: '#0A84FF' }}>⚡</span> 50 ГБ
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: tagBg, color: primaryText }}>
              <span style={{ color: '#5E5CE6' }}>∞</span> Устройств
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: tagBg, color: secondaryText }}>7 дней</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {['🇳🇱 Нидерланды', '🇩🇪 Германия', '🇫🇮 Финляндия', '+ и другие серверы', '🇷🇺✅ Белые списки'].map((f, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full" style={{ background: tagBg, color: secondaryText }}>{f}</span>
            ))}
          </div>
          <motion.button whileTap={{ scale: 0.97 }} className="w-full py-3 rounded-xl font-semibold text-sm text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)', boxShadow: '0 4px 15px rgba(10,132,255,0.3)' }}>
            <span className="relative z-10">Попробовать бесплатно</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Basic plan */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springConfig, delay: 0.1 }} className="mb-3">
        <div className="p-4 rounded-3xl" style={{ background: cardBg, border: cardBorder, backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-bold" style={{ color: primaryText }}>Basic</span>
            <div className="text-right">
              <span className="text-xl font-bold" style={{ color: primaryText }}>₽ {selected.price}</span>
              <div className="text-xs" style={{ color: secondaryText }}>/ {selected.months} мес</div>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: 'rgba(10,132,255,0.12)', color: primaryText, border: '1px solid rgba(10,132,255,0.2)' }}>
              <span style={{ color: '#0A84FF' }}>⚡</span> 300 ГБ
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: 'rgba(94,92,230,0.12)', color: primaryText, border: '1px solid rgba(94,92,230,0.2)' }}>
              <span style={{ color: '#5E5CE6' }}>∞</span> Устройств
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {['🇳🇱 Нидерланды', '🇩🇪 Германия', '🇫🇮 Финляндия', '+ и другие серверы', '🇷🇺✅ Белые списки'].map((f, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full" style={{ background: tagBg, color: secondaryText }}>{f}</span>
            ))}
          </div>
          {/* Duration selector */}
          <div className="flex gap-2 mb-4" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', paddingBottom: '12px', paddingTop: '10px' }}>
            {durations.map((d) => (
              <motion.button key={d.months} whileTap={{ scale: 0.95 }} onClick={() => setSelectedMonths(d.months)}
                className="flex-shrink-0 flex flex-col items-center rounded-2xl relative"
                style={{
                  background: selectedMonths === d.months ? 'rgba(10,132,255,0.18)' : durationBg,
                  border: selectedMonths === d.months ? '1px solid rgba(10,132,255,0.45)' : `1px solid ${durationBorder}`,
                  minWidth: '76px', padding: '10px 12px', marginTop: '6px',
                }}
              >
                {d.discount && (
                  <div className="absolute flex items-center justify-center rounded-full font-bold"
                    style={{ top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)', color: 'white', fontSize: '9px', padding: '2px 6px', whiteSpace: 'nowrap', borderRadius: '100px' }}>
                    -{d.discount}%
                  </div>
                )}
                <span className="text-xs font-semibold" style={{ color: selectedMonths === d.months ? '#0A84FF' : secondaryText }}>{d.label}</span>
                <span className="text-sm font-bold mt-0.5" style={{ color: selectedMonths === d.months ? primaryText : secondaryText }}>₽{d.price}</span>
              </motion.button>
            ))}
          </div>
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => setPaymentModal({ plan: `Basic · ${selected.months} мес`, price: selected.price })}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}>
            Выбрать тариф
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {paymentModal && <PaymentModal plan={paymentModal.plan} price={paymentModal.price} onClose={() => setPaymentModal(null)} />}
      </AnimatePresence>
    </div>
  );
}