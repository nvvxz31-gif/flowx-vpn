import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, X, Shield, RefreshCw, Calendar } from 'lucide-react';

const springConfig = { type: 'spring', stiffness: 300, damping: 30 };

const users = [
  { id: 1284930, username: '@alex_moscow', email: 'alex@mail.ru', plan: 'Pro', status: 'active', registered: '12.01.2026', traffic: '34.2 / 150 ГБ' },
  { id: 9182736, username: '@maria_k', email: 'maria@gmail.com', plan: 'Триал', status: 'trial', registered: '14.05.2026', traffic: '2.1 / 15 ГБ' },
  { id: 3847291, username: '@dmitry_pro', email: null, plan: 'Unlimited', status: 'active', registered: '03.02.2026', traffic: '89.7 / ∞' },
  { id: 7261839, username: '@anna_spb', email: 'anna@yandex.ru', plan: 'Basic', status: 'expired', registered: '22.03.2026', traffic: '50 / 50 ГБ' },
  { id: 5539201, username: '@ivan_ban', email: null, plan: 'Pro', status: 'banned', registered: '01.01.2026', traffic: '0 / 150 ГБ' },
  { id: 8837461, username: '@kate_vpn', email: 'kate@mail.ru', plan: 'Pro', status: 'active', registered: '28.04.2026', traffic: '12.8 / 150 ГБ' },
];

const statusConfig = {
  active: { label: 'Активен', color: '#30D158', bg: 'rgba(48,209,88,0.12)' },
  trial: { label: 'Триал', color: '#0A84FF', bg: 'rgba(10,132,255,0.12)' },
  expired: { label: 'Истёк', color: '#98989D', bg: 'rgba(152,152,157,0.12)' },
  banned: { label: 'Заблокирован', color: '#FF453A', bg: 'rgba(255,69,58,0.12)' },
};

const filters = ['Все', 'Активные', 'Триал', 'Просроченные', 'Заблокированные'];
const filterMap = { 'Все': null, 'Активные': 'active', 'Триал': 'trial', 'Просроченные': 'expired', 'Заблокированные': 'banned' };

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Все');
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = users.filter(u => {
    const statusMatch = !filterMap[activeFilter] || u.status === filterMap[activeFilter];
    const searchMatch = !search ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      String(u.id).includes(search) ||
      (u.email && u.email.toLowerCase().includes(search.toLowerCase()));
    return statusMatch && searchMatch;
  });

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: '#F5F5F7', letterSpacing: '-0.02em' }}>Пользователи</h1>
          <p className="text-sm" style={{ color: '#98989D' }}>Управление аккаунтами и подписками</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
          style={{ background: 'rgba(10,132,255,0.12)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.2)' }}
        >
          <Download size={14} />
          Выгрузить
        </button>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" color="#98989D" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по ID, username, email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: 'rgba(28,28,30,0.7)', border: '1px solid rgba(255,255,255,0.07)', color: '#F5F5F7' }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={{
                background: activeFilter === f ? 'rgba(10,132,255,0.2)' : 'rgba(255,255,255,0.06)',
                color: activeFilter === f ? '#0A84FF' : '#98989D',
                border: activeFilter === f ? '1px solid rgba(10,132,255,0.3)' : '1px solid transparent',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="grid grid-cols-6 gap-4 px-5 py-3 text-xs font-medium" style={{ color: '#98989D', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span>ID</span>
          <span>Пользователь</span>
          <span>Тариф</span>
          <span>Статус</span>
          <span>Регистрация</span>
          <span>Трафик</span>
        </div>
        {filtered.map((user, i) => {
          const sc = statusConfig[user.status];
          return (
            <motion.button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="w-full grid grid-cols-6 gap-4 px-5 py-4 text-left border-b"
              style={{ borderColor: 'rgba(255,255,255,0.04)' }}
            >
              <span className="text-xs font-mono" style={{ color: '#98989D' }}>{user.id}</span>
              <div>
                <div className="text-sm font-medium" style={{ color: '#F5F5F7' }}>{user.username}</div>
                {user.email && <div className="text-xs" style={{ color: '#98989D' }}>{user.email}</div>}
              </div>
              <span className="text-sm" style={{ color: '#F5F5F7' }}>{user.plan}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full self-center w-fit"
                style={{ background: sc.bg, color: sc.color }}
              >
                {sc.label}
              </span>
              <span className="text-sm" style={{ color: '#98989D' }}>{user.registered}</span>
              <span className="text-xs font-mono" style={{ color: '#98989D' }}>{user.traffic}</span>
            </motion.button>
          );
        })}
      </div>

      {/* User detail panel */}
      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setSelectedUser(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={springConfig}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 p-6 overflow-y-auto"
              style={{ background: 'rgba(18,18,20,0.99)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold" style={{ color: '#F5F5F7' }}>Детали пользователя</h3>
                <button onClick={() => setSelectedUser(null)}>
                  <X size={18} color="#98989D" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  ['ID', selectedUser.id],
                  ['Telegram', selectedUser.username],
                  ['Email', selectedUser.email || 'Не указан'],
                  ['Тариф', selectedUser.plan],
                  ['Статус', statusConfig[selectedUser.status]?.label],
                  ['Трафик', selectedUser.traffic],
                  ['Регистрация', selectedUser.registered],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <span className="text-sm" style={{ color: '#98989D' }}>{k}</span>
                    <span className="text-sm font-medium" style={{ color: '#F5F5F7' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {[
                  { icon: RefreshCw, label: 'Сбросить трафик', color: '#0A84FF' },
                  { icon: Calendar, label: 'Продлить подписку', color: '#30D158' },
                  { icon: Shield, label: 'Заблокировать', color: '#FF453A' },
                ].map(({ icon: Icon, label, color }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium"
                    style={{ background: `${color}14`, color, border: `1px solid ${color}30` }}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}