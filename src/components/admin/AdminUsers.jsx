import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, X, Shield, ShieldOff, RefreshCw, Calendar, PlusCircle, Check } from 'lucide-react';

const springConfig = { type: 'spring', stiffness: 300, damping: 30 };

const initialUsers = [
  { id: 1284930, username: '@alex_moscow', email: 'alex@mail.ru', plan: 'Basic', status: 'active', registered: '12.01.2026', traffic: '34.2 / 300 ГБ', balance: 0 },
  { id: 9182736, username: '@maria_k', email: 'maria@gmail.com', plan: 'Триал', status: 'trial', registered: '14.05.2026', traffic: '2.1 / 50 ГБ', balance: 0 },
  { id: 3847291, username: '@dmitry_pro', email: null, plan: 'Basic', status: 'active', registered: '03.02.2026', traffic: '89.7 / 300 ГБ', balance: 249 },
  { id: 7261839, username: '@anna_spb', email: 'anna@yandex.ru', plan: 'Basic', status: 'expired', registered: '22.03.2026', traffic: '300 / 300 ГБ', balance: 0 },
  { id: 5539201, username: '@ivan_ban', email: null, plan: 'Basic', status: 'banned', registered: '01.01.2026', traffic: '0 / 300 ГБ', balance: 0 },
  { id: 8837461, username: '@kate_vpn', email: 'kate@mail.ru', plan: 'Basic', status: 'active', registered: '28.04.2026', traffic: '12.8 / 300 ГБ', balance: 99 },
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
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Все');
  const [selectedUser, setSelectedUser] = useState(null);
  const [balanceInput, setBalanceInput] = useState('');
  const [actionDone, setActionDone] = useState(null);

  const updateUser = (id, patch) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...patch } : u));
    setSelectedUser(prev => prev && prev.id === id ? { ...prev, ...patch } : prev);
  };

  const flashAction = (key) => {
    setActionDone(key);
    setTimeout(() => setActionDone(null), 2000);
  };

  const handleResetTraffic = () => {
    const parts = selectedUser.traffic.split(' / ');
    updateUser(selectedUser.id, { traffic: `0 / ${parts[1]}` });
    flashAction('reset');
  };

  const handleExtend = () => {
    updateUser(selectedUser.id, { status: 'active' });
    flashAction('extend');
  };

  const handleToggleBan = () => {
    const newStatus = selectedUser.status === 'banned' ? 'active' : 'banned';
    updateUser(selectedUser.id, { status: newStatus });
    flashAction('ban');
  };

  // ✅ SECURITY: лимит разового начисления — защита от случайных/намеренных аномалий
  const MAX_BALANCE_TOP_UP = 10000;

  const handleAddBalance = () => {
    const amount = parseInt(balanceInput);
    if (!amount || amount <= 0) return;
    if (amount > MAX_BALANCE_TOP_UP) {
      alert(`Максимальная сумма разового начисления: ₽${MAX_BALANCE_TOP_UP}`);
      return;
    }
    // TODO: при подключении БД — логировать в AuditLog: { action: 'balance_topup', userId, amount, adminId, timestamp }
    updateUser(selectedUser.id, { balance: (selectedUser.balance || 0) + amount });
    setBalanceInput('');
    flashAction('balance');
  };

  const filtered = users.filter(u => {
    const statusMatch = !filterMap[activeFilter] || u.status === filterMap[activeFilter];
    const searchMatch = !search ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      String(u.id).includes(search) ||
      (u.email && u.email.toLowerCase().includes(search.toLowerCase()));
    return statusMatch && searchMatch;
  });

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#F5F5F7', letterSpacing: '-0.02em' }}>Пользователи</h1>
          <p className="text-sm" style={{ color: '#98989D' }}>Управление аккаунтами и подписками</p>
        </div>
        <button
          className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl text-sm font-medium flex-shrink-0"
          style={{ background: 'rgba(10,132,255,0.12)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.2)' }}
        >
          <Download size={14} />
          <span className="hidden sm:inline">Выгрузить</span>
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

      {/* Table — desktop */}
      <div className="glass-card rounded-2xl overflow-hidden hidden md:block">
        <div className="grid grid-cols-6 gap-4 px-5 py-3 text-xs font-medium" style={{ color: '#98989D', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span>ID</span>
          <span>Пользователь</span>
          <span>Тариф</span>
          <span>Статус</span>
          <span>Регистрация</span>
          <span>Трафик</span>
        </div>
        {filtered.map((user) => {
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
              <span className="text-xs px-2 py-0.5 rounded-full self-center w-fit" style={{ background: sc.bg, color: sc.color }}>
                {sc.label}
              </span>
              <span className="text-sm" style={{ color: '#98989D' }}>{user.registered}</span>
              <span className="text-xs font-mono" style={{ color: '#98989D' }}>{user.traffic}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Cards — mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.map((user) => {
          const sc = statusConfig[user.status];
          return (
            <motion.button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="glass-card p-4 rounded-2xl text-left w-full"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>{user.username}</div>
                  {user.email && <div className="text-xs" style={{ color: '#98989D' }}>{user.email}</div>}
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: sc.bg, color: sc.color }}>
                  {sc.label}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-mono" style={{ color: '#98989D' }}>#{user.id}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F5F7' }}>{user.plan}</span>
                <span className="text-xs" style={{ color: '#98989D' }}>{user.registered}</span>
                <span className="text-xs font-mono" style={{ color: '#98989D' }}>{user.traffic}</span>
              </div>
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
                  ['Баланс', `₽ ${selectedUser.balance || 0}`],
                  ['Регистрация', selectedUser.registered],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <span className="text-sm" style={{ color: '#98989D' }}>{k}</span>
                    <span className="text-sm font-medium" style={{ color: k === 'Статус' ? statusConfig[selectedUser.status]?.color : '#F5F5F7' }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Add balance */}
              <div className="mb-3 p-3 rounded-xl" style={{ background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.15)' }}>
                <div className="text-xs font-semibold mb-2" style={{ color: '#30D158' }}>Начислить баланс</div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={balanceInput}
                    onChange={e => setBalanceInput(e.target.value)}
                    placeholder="₽ сумма"
                    className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F5F7' }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddBalance}
                    className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5"
                    style={{ background: actionDone === 'balance' ? 'rgba(48,209,88,0.25)' : 'rgba(48,209,88,0.15)', color: '#30D158', border: '1px solid rgba(48,209,88,0.3)' }}
                  >
                    {actionDone === 'balance' ? <Check size={13} /> : <PlusCircle size={13} />}
                    {actionDone === 'balance' ? 'OK' : 'Добавить'}
                  </motion.button>
                </div>
                <div className="flex gap-1.5 mt-2">
                  {[99, 249, 449, 899].map(amt => (
                    <button key={amt} onClick={() => setBalanceInput(String(amt))}
                      className="px-2 py-1 rounded-lg text-xs"
                      style={{ background: 'rgba(48,209,88,0.1)', color: '#30D158' }}>
                      +{amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleResetTraffic}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium"
                  style={{ background: actionDone === 'reset' ? 'rgba(10,132,255,0.2)' : 'rgba(10,132,255,0.1)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.25)' }}
                >
                  {actionDone === 'reset' ? <Check size={14} /> : <RefreshCw size={14} />}
                  {actionDone === 'reset' ? 'Трафик сброшен!' : 'Сбросить трафик'}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleExtend}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium"
                  style={{ background: actionDone === 'extend' ? 'rgba(48,209,88,0.2)' : 'rgba(48,209,88,0.1)', color: '#30D158', border: '1px solid rgba(48,209,88,0.25)' }}
                >
                  {actionDone === 'extend' ? <Check size={14} /> : <Calendar size={14} />}
                  {actionDone === 'extend' ? 'Подписка продлена!' : 'Продлить подписку'}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleToggleBan}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium"
                  style={{
                    background: selectedUser.status === 'banned' ? 'rgba(48,209,88,0.1)' : 'rgba(255,69,58,0.1)',
                    color: selectedUser.status === 'banned' ? '#30D158' : '#FF453A',
                    border: `1px solid ${selectedUser.status === 'banned' ? 'rgba(48,209,88,0.25)' : 'rgba(255,69,58,0.25)'}`,
                  }}
                >
                  {selectedUser.status === 'banned' ? <ShieldOff size={14} /> : <Shield size={14} />}
                  {selectedUser.status === 'banned' ? 'Разблокировать' : 'Заблокировать'}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}