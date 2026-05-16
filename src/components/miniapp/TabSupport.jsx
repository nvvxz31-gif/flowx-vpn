import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronRight, ChevronLeft, Send, X, Plus, Ticket } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const springConfig = { type: 'spring', stiffness: 300, damping: 30 };

const FLOWS = {
  server: {
    label: 'Проблема с сервером',
    icon: '🖥️',
    steps: [
      {
        key: 'issue',
        question: 'Какая проблема с сервером?',
        options: ['Не подключается', 'Медленная скорость', 'Постоянно отрывается', 'Другое'],
      },
      {
        key: 'server',
        question: 'Выберите сервер',
        options: ['Нидерланды', 'Германия', 'Швеция', 'США', 'Другой'],
      },
      {
        key: 'device',
        question: 'Ваше устройство',
        options: ['iPhone / iPad', 'Android', 'Windows', 'macOS'],
      },
      {
        key: 'app',
        question: 'Приложение VPN',
        options: ['Happ', 'V2Ray', 'Incy', 'Другое'],
      },
    ],
  },
  connection: {
    label: 'VPN не работает',
    icon: '🔌',
    steps: [
      {
        key: 'issue',
        question: 'В чём проблема?',
        options: ['Не запускается вообще', 'Подключается но не работает', 'Периодически отключается', 'Сайты не открываются'],
      },
      {
        key: 'app',
        question: 'Какое приложение используете?',
        options: ['Happ', 'V2Ray', 'Incy', 'Другое'],
      },
      {
        key: 'tried',
        question: 'Что уже пробовали?',
        options: ['Перезапустил приложение', 'Переустановил приложение', 'Попробовал другой сервер', 'Ничего не пробовал'],
      },
    ],
  },
  payment: {
    label: 'Проблема с оплатой',
    icon: '💳',
    steps: [
      {
        key: 'issue',
        question: 'Проблема с оплатой',
        options: ['Деньги списались, баланс не пополнился', 'Ошибка при оплате', 'Хочу вернуть деньги', 'Другое'],
      },
      {
        key: 'method',
        question: 'Способ оплаты',
        options: ['СБП', 'Карта РФ', 'Крипта', 'CryptoBot', 'Telegram Stars'],
      },
    ],
  },
  account: {
    label: 'Вопрос по аккаунту',
    icon: '👤',
    steps: [
      {
        key: 'issue',
        question: 'Вопрос по аккаунту',
        options: ['Не могу войти', 'Потерял доступ', 'Нужно изменить email', 'Хочу удалить аккаунт'],
      },
    ],
  },
  other: {
    label: 'Другой вопрос',
    icon: '💬',
    steps: [],
  },
};

function TicketChat({ ticket, onBack, onSend }) {
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticket?.messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    await onSend(ticket.id, text.trim());
    setText('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack}>
          <ChevronLeft size={20} color="#0A84FF" />
        </button>
        <div className="flex-1">
          <div className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>#{ticket.id?.slice(-6)} {ticket.subject}</div>
          <div className="text-xs" style={{ color: statusColor(ticket.status) }}>{statusLabel(ticket.status)}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4" style={{ maxHeight: '50vh' }}>
        {(ticket.messages || []).map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm"
              style={{
                background: msg.sender === 'user'
                  ? 'linear-gradient(135deg, #0A84FF, #5E5CE6)'
                  : 'rgba(44,44,46,0.8)',
                color: '#F5F5F7',
              }}
            >
              {msg.text}
              <div className="text-xs mt-1 opacity-60">{new Date(msg.timestamp).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
        <div className="flex gap-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Написать сообщение..."
            className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
            style={{ background: 'rgba(44,44,46,0.8)', color: '#F5F5F7', border: '1px solid rgba(255,255,255,0.08)' }}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
          >
            <Send size={16} color="white" />
          </motion.button>
        </div>
      )}
    </div>
  );
}

function statusLabel(s) {
  return { open: 'Открыт', in_progress: 'В работе', resolved: 'Решён', closed: 'Закрыт' }[s] || s;
}
function statusColor(s) {
  return { open: '#0A84FF', in_progress: '#FF9F0A', resolved: '#30D158', closed: '#98989D' }[s] || '#98989D';
}
function categoryLabel(c) {
  return { server: '🖥️ Сервер', connection: '🔌 Подключение', payment: '💳 Оплата', account: '👤 Аккаунт', other: '💬 Другое' }[c] || c;
}

export default function TabSupport() {
  const [view, setView] = useState('main'); // main | new | chat | list
  const [flowKey, setFlowKey] = useState(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [customText, setCustomText] = useState('');
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const list = await base44.entities.SupportTicket.list('-created_date', 50);
      setTickets(list);
    } catch (e) {
      setTickets([]);
    }
  };

  const currentFlow = flowKey ? FLOWS[flowKey] : null;
  const currentStep = currentFlow ? currentFlow.steps[stepIdx] : null;

  const handleOption = (opt) => {
    if (!currentStep) return;
    const newAnswers = { ...answers, [currentStep.key]: opt };
    setAnswers(newAnswers);
    if (stepIdx + 1 < currentFlow.steps.length) {
      setStepIdx(stepIdx + 1);
    } else {
      setView('final');
    }
  };

  const handleCreateTicket = async () => {
    if (!customText.trim() && !flowKey) return;
    setLoading(true);
    try {
      const subject = customText.trim() || Object.values(answers)[0] || currentFlow?.label || 'Новый запрос';
      const firstMsg = {
        id: Date.now().toString(),
        sender: 'user',
        text: buildSummary(),
        timestamp: new Date().toISOString(),
      };
      const autoReply = {
        id: (Date.now() + 1).toString(),
        sender: 'admin',
        text: 'Спасибо! Ваш запрос принят. Мы ответим в течение нескольких минут.',
        timestamp: new Date().toISOString(),
      };
      const ticket = await base44.entities.SupportTicket.create({
        category: flowKey || 'other',
        subject,
        status: 'open',
        priority: 'medium',
        messages: [firstMsg, autoReply],
        flow_data: answers,
      });
      await loadTickets();
      setActiveTicket(ticket);
      setView('chat');
      setFlowKey(null);
      setStepIdx(0);
      setAnswers({});
      setCustomText('');
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const buildSummary = () => {
    if (!flowKey) return customText;
    const lines = [`Тема: ${currentFlow?.label}`];
    Object.entries(answers).forEach(([k, v]) => lines.push(`${k}: ${v}`));
    if (customText) lines.push(`Дополнительно: ${customText}`);
    return lines.join('\n');
  };

  const handleSendMessage = async (ticketId, text) => {
    const msg = { id: Date.now().toString(), sender: 'user', text, timestamp: new Date().toISOString() };
    const t = tickets.find(t => t.id === ticketId);
    if (!t) return;
    const updated = await base44.entities.SupportTicket.update(ticketId, {
      messages: [...(t.messages || []), msg],
    });
    setActiveTicket(updated);
    await loadTickets();
  };

  const openTicket = (t) => {
    setActiveTicket(t);
    setView('chat');
  };

  return (
    <div className="px-4 pt-16 pb-4">
      <AnimatePresence mode="wait">
        {/* MAIN */}
        {view === 'main' && (
          <motion.div key="main" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={springConfig}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold" style={{ color: '#F5F5F7' }}>Поддержка</h2>
                <p className="text-xs mt-0.5" style={{ color: '#98989D' }}>Мы ответим в течение нескольких минут</p>
              </div>
              {tickets.length > 0 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('list')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
                  style={{ background: 'rgba(10,132,255,0.15)', color: '#0A84FF' }}
                >
                  <Ticket size={12} />
                  Мои тикеты ({tickets.length})
                </motion.button>
              )}
            </div>

            <p className="text-sm font-semibold mb-3" style={{ color: '#98989D' }}>Выберите тему обращения</p>

            <div className="space-y-2 mb-4">
              {Object.entries(FLOWS).map(([key, flow]) => (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setFlowKey(key); setStepIdx(0); setAnswers({}); setView('flow'); }}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-left"
                  style={{ background: 'rgba(28,28,30,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{flow.icon}</span>
                    <span className="text-sm font-medium" style={{ color: '#F5F5F7' }}>{flow.label}</span>
                  </div>
                  <ChevronRight size={16} color="#98989D" />
                </motion.button>
              ))}
            </div>

            <div className="mt-2">
              <p className="text-xs mb-2" style={{ color: '#98989D' }}>Или напишите свой вопрос:</p>
              <textarea
                value={customText}
                onChange={e => setCustomText(e.target.value)}
                placeholder="Опишите вашу проблему..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl text-sm resize-none outline-none"
                style={{ background: 'rgba(44,44,46,0.8)', color: '#F5F5F7', border: '1px solid rgba(255,255,255,0.08)' }}
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { setFlowKey(null); setView('final'); }}
                disabled={!customText.trim()}
                className="w-full mt-2 py-3.5 rounded-2xl font-semibold text-white text-sm"
                style={{
                  background: customText.trim() ? 'linear-gradient(135deg, #0A84FF, #5E5CE6)' : 'rgba(44,44,46,0.8)',
                  color: customText.trim() ? 'white' : '#98989D',
                }}
              >
                Отправить вопрос
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* FLOW */}
        {view === 'flow' && currentFlow && (
          <motion.div key={`flow-${stepIdx}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={springConfig}>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => { if (stepIdx === 0) setView('main'); else setStepIdx(stepIdx - 1); }}>
                <ChevronLeft size={20} color="#0A84FF" />
              </button>
              <div>
                <div className="text-lg font-bold" style={{ color: '#F5F5F7' }}>{currentFlow.label}</div>
                {currentFlow.steps.length > 0 && (
                  <div className="text-xs" style={{ color: '#98989D' }}>Шаг {stepIdx + 1} из {currentFlow.steps.length}</div>
                )}
              </div>
            </div>

            {currentStep && (
              <>
                <p className="text-base font-semibold mb-4" style={{ color: '#F5F5F7' }}>{currentStep.question}</p>
                <div className="space-y-2">
                  {currentStep.options.map(opt => (
                    <motion.button
                      key={opt}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleOption(opt)}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-left"
                      style={{ background: 'rgba(28,28,30,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <span className="text-sm" style={{ color: '#F5F5F7' }}>{opt}</span>
                      <ChevronRight size={15} color="#98989D" />
                    </motion.button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* FINAL */}
        {view === 'final' && (
          <motion.div key="final" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={springConfig}>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => { if (flowKey && currentFlow?.steps.length) setView('flow'); else setView('main'); }}>
                <ChevronLeft size={20} color="#0A84FF" />
              </button>
              <div className="text-lg font-bold" style={{ color: '#F5F5F7' }}>Подтверждение</div>
            </div>

            <div className="p-4 rounded-2xl mb-4" style={{ background: 'rgba(28,28,30,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#98989D' }}>Тема: {currentFlow?.label || 'Свободный вопрос'}</p>
              {Object.entries(answers).map(([k, v]) => (
                <div key={k} className="text-sm py-1" style={{ color: '#F5F5F7' }}>• {v}</div>
              ))}
              {customText && <div className="text-sm py-1" style={{ color: '#F5F5F7' }}>• {customText}</div>}
            </div>

            <textarea
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              placeholder="Добавьте дополнительные детали (необязательно)..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl text-sm resize-none outline-none mb-3"
              style={{ background: 'rgba(44,44,46,0.8)', color: '#F5F5F7', border: '1px solid rgba(255,255,255,0.08)' }}
            />

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleCreateTicket}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)', boxShadow: '0 4px 20px rgba(10,132,255,0.35)' }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Send size={16} />Создать тикет</>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* LIST */}
        {view === 'list' && (
          <motion.div key="list" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={springConfig}>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setView('main')}>
                <ChevronLeft size={20} color="#0A84FF" />
              </button>
              <div className="text-lg font-bold" style={{ color: '#F5F5F7' }}>Мои обращения</div>
            </div>

            <div className="space-y-2 mb-4">
              {tickets.length === 0 && (
                <p className="text-center text-sm py-8" style={{ color: '#98989D' }}>Нет обращений</p>
              )}
              {tickets.map(t => (
                <motion.button
                  key={t.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => openTicket(t)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-left"
                  style={{ background: 'rgba(28,28,30,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono" style={{ color: '#98989D' }}>#{t.id?.slice(-6)}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${statusColor(t.status)}22`, color: statusColor(t.status) }}>{statusLabel(t.status)}</span>
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#F5F5F7' }}>{t.subject}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#98989D' }}>{categoryLabel(t.category)}</div>
                  </div>
                  <ChevronRight size={15} color="#98989D" />
                </motion.button>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setView('main')}
              className="w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2"
              style={{ background: 'rgba(10,132,255,0.15)', color: '#0A84FF' }}
            >
              <Plus size={16} />
              Новое обращение
            </motion.button>
          </motion.div>
        )}

        {/* CHAT */}
        {view === 'chat' && activeTicket && (
          <motion.div key="chat" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={springConfig}>
            <TicketChat
              ticket={activeTicket}
              onBack={() => setView('list')}
              onSend={handleSendMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}