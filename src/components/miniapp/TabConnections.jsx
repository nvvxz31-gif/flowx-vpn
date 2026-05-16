import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, HelpCircle, ChevronDown, X } from 'lucide-react';
import ServerGlobe from './ServerGlobe';

const faq = [
  { q: 'Как подключиться к VPN?', a: 'Скачайте приложение Streisand или Hiddify для вашего устройства, скопируйте конфиг в разделе «Подключения» и вставьте его в приложение.' },
  { q: 'Почему VPN медленно работает?', a: 'Попробуйте сменить сервер. Серверы с нагрузкой ниже 50% обычно обеспечивают лучшую скорость.' },
  { q: 'Что делать, если бот заблокирован?', a: 'Зайдите на my.flowx.com через браузер. Там доступны все функции без Telegram.' },
  { q: 'Логируете ли вы трафик?', a: 'Нет. Мы не сохраняем логи трафика, DNS-запросов или IP-адресов. Политика строгого no-log.' },
];

const platforms = [
  { name: 'iOS', icon: '🍎', app: 'Happ' },
  { name: 'Android', icon: '🤖', app: 'V2Ray' },
  { name: 'Windows', icon: '🪟', app: 'Incy' },
  { name: 'macOS', icon: '🖥️', app: 'Happ' },
];

const appGuides = {
  Happ: {
    title: 'Happ',
    icon: 'https://media.base44.com/images/public/6a088498feb97a4eaded517d/47e2ae396_OIP.webp',
    steps: [
      'Скачайте Happ из App Store (iOS) или Google Play (Android)',
      'Откройте приложение и нажмите «+» в правом верхнем углу',
      'Выберите «Импорт из буфера обмена» или «Сканировать QR-код»',
      'Перейдите в раздел «Подключения» нашего сервиса и скопируйте конфиг',
      'Вернитесь в Happ — конфиг будет добавлен автоматически',
      'Нажмите на сервер и нажмите «Подключить»',
      '✅ Готово! VPN активен',
    ],
  },
  V2Ray: {
    title: 'V2Ray',
    icon: 'https://media.base44.com/images/public/6a088498feb97a4eaded517d/163bafa00_image.png',
    steps: [
      'Скачайте V2RayNG (Android) или V2Box (iOS) из магазина приложений',
      'Откройте приложение и нажмите «+»',
      'Выберите «Импорт config из буфера»',
      'Скопируйте конфигурационную ссылку из раздела «Подключения»',
      'Вставьте ссылку — сервер добавится в список',
      'Нажмите на сервер для выбора, затем нажмите кнопку запуска ▶',
      'Разрешите запрос VPN-соединения',
      '✅ V2Ray активен!',
    ],
  },
  Incy: {
    title: 'Incy',
    icon: 'https://media.base44.com/images/public/6a088498feb97a4eaded517d/3b7573844_image.png',
    steps: [
      'Скачайте Incy для вашей платформы (Windows/macOS/Linux)',
      'Установите приложение и запустите его',
      'Нажмите «Добавить сервер» или кнопку «+»',
      'Выберите «Вставить из буфера обмена»',
      'Скопируйте конфиг из раздела «Подключения» нашего сервиса',
      'Конфиг появится в списке серверов',
      'Выберите нужный сервер и нажмите «Подключить»',
      '✅ Incy готов к работе!',
    ],
  },
};

const springConfig = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };

const servers = [
  { city: 'Москва', country: 'Россия', flag: '🇷🇺', ping: 12, load: 28 },
  { city: 'Амстердам', country: 'Нидерланды', flag: '🇳🇱', ping: 45, load: 42 },
  { city: 'Франкфурт', country: 'Германия', flag: '🇩🇪', ping: 52, load: 35 },
  { city: 'Стокгольм', country: 'Швеция', flag: '🇸🇪', ping: 67, load: 18 },
  { city: 'Нью-Йорк', country: 'США', flag: '🇺🇸', ping: 120, load: 55 },
];

export default function TabConnections() {
  const [status, setStatus] = useState('trial');
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showServerList, setShowServerList] = useState(false);
  const [activeGuide, setActiveGuide] = useState(null);
  const usedGb = 12.4;
  const totalGb = 50;
  const usedPercent = (usedGb / totalGb) * 100;
  const trialDays = 5;

  return (
    <div className="px-4 pt-16 pb-4">
      {/* Trial timer */}
      {status === 'trial' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center justify-center gap-2"
        >
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-xs font-medium"
            style={{ color: '#0A84FF' }}
          >
            ⏱
          </motion.span>
          <span className="text-sm" style={{ color: '#98989D' }}>
            Триал: осталось{' '}
            <span className="font-mono font-bold" style={{ color: '#F5F5F7' }}>{trialDays}</span>
            {' '}дней
          </span>
        </motion.div>
      )}

      {/* Status card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="glass-card p-6 rounded-3xl mb-4 noise-texture"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-medium mb-1" style={{ color: '#98989D' }}>Текущий тариф</div>
            <div className="text-xl font-bold" style={{ color: '#F5F5F7' }}>
              {status === 'trial' ? 'Пробный период' : 'FlowX Pro'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{
                background: status === 'active' ? '#30D158' : status === 'trial' ? '#0A84FF' : '#98989D',
              }}
              animate={{ opacity: status !== 'inactive' ? [0.6, 1, 0.6] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium" style={{
              color: status === 'active' ? '#30D158' : status === 'trial' ? '#0A84FF' : '#98989D'
            }}>
              {status === 'active' ? 'Активен' : status === 'trial' ? 'Триал' : 'Неактивен'}
            </span>
          </div>
        </div>

        {/* Traffic bubble */}
        <div className="flex items-center gap-6 mb-5">
          <div className="relative w-20 h-20">
            <svg className="absolute inset-0" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
              <motion.circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke="url(#trafficGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - usedPercent / 100) }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '40px 40px' }}
              />
              <defs>
                <linearGradient id="trafficGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0A84FF" />
                  <stop offset="100%" stopColor="#5E5CE6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold font-mono" style={{ color: '#F5F5F7' }}>{Math.round(usedPercent)}%</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-xs mb-1" style={{ color: '#98989D' }}>Использовано трафика</div>
            <div className="text-lg font-bold font-mono" style={{ color: '#F5F5F7' }}>
              {usedGb} <span style={{ color: '#98989D', fontWeight: 400 }}>/ {totalGb} ГБ</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0A84FF, #5E5CE6)' }}
                initial={{ width: 0 }}
                animate={{ width: `${usedPercent}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Subscription days bar */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: '#98989D' }}>До конца подписки</span>
            <span className="font-medium" style={{ color: '#F5F5F7' }}>21 день</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #0A84FF, #5E5CE6)' }}
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
            />
          </div>
        </div>
      </motion.div>



      {/* Connect button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.3 }}
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)',
            boxShadow: '0 4px 20px rgba(10,132,255,0.35)',
          }}
        >
          <Zap size={18} />
          Подключить VPN
        </motion.button>
      </motion.div>

      {/* Help section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.35 }}
        className="mt-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle size={14} color="#98989D" />
          <span className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>Помощь</span>
        </div>

        {/* Platforms */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {platforms.map((p) => {
            const guide = appGuides[p.app];
            return (
              <button
                key={p.name}
                onClick={() => guide && setActiveGuide(guide)}
                className="glass-card p-3 rounded-2xl text-center"
              >
                <div className="text-xl mb-1">{p.icon}</div>
                <div className="text-xs font-medium" style={{ color: '#F5F5F7' }}>{p.name}</div>
                <div className="text-xs" style={{ color: '#0A84FF', fontSize: '9px' }}>{p.app} →</div>
              </button>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-2 mb-3">
          {faq.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(28,28,30,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-3.5 text-left"
              >
                <span className="text-sm font-medium pr-3" style={{ color: '#F5F5F7' }}>{item.q}</span>
                <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={springConfig} className="flex-shrink-0">
                  <ChevronDown size={15} color="#98989D" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={springConfig}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-sm leading-relaxed" style={{ color: '#98989D' }}>{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </motion.div>

      {/* App Guide Modal */}
      <AnimatePresence>
        {activeGuide && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
              onClick={() => setActiveGuide(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={springConfig}
              className="fixed bottom-0 left-0 right-0 z-50 p-6 rounded-t-3xl overflow-y-auto"
              style={{ background: 'rgba(22,22,24,0.99)', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '85vh' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <img src={activeGuide.icon} alt={activeGuide.title} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h3 className="text-lg font-bold" style={{ color: '#F5F5F7' }}>Настройка {activeGuide.title}</h3>
                  <p className="text-xs" style={{ color: '#98989D' }}>Пошаговая инструкция</p>
                </div>
                <button onClick={() => setActiveGuide(null)} className="ml-auto">
                  <X size={20} color="#98989D" />
                </button>
              </div>

              <div className="space-y-3">
                {activeGuide.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-3.5 rounded-2xl"
                    style={{ background: 'rgba(44,44,46,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                      style={{ background: step.startsWith('✅') ? 'rgba(48,209,88,0.2)' : 'rgba(10,132,255,0.2)', color: step.startsWith('✅') ? '#30D158' : '#0A84FF' }}
                    >
                      {step.startsWith('✅') ? '✓' : i + 1}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#F5F5F7' }}>{step}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveGuide(null)}
                className="w-full mt-5 py-4 rounded-2xl font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
              >
                Понятно, спасибо!
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Gift modal */}
      <AnimatePresence>
        {showGiftModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
              onClick={() => setShowGiftModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={springConfig}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-50 p-6 rounded-3xl"
              style={{ background: 'rgba(28,28,30,0.98)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🎁</div>
                <h3 className="text-lg font-bold" style={{ color: '#F5F5F7' }}>Подарить другу 3 дня</h3>
              </div>
              <div
                className="p-3 rounded-xl font-mono text-sm mb-4 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.2)' }}
              >
                https://t.me/flowxvpn_bot?start=gift_abc123
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
              >
                Поделиться ссылкой
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}