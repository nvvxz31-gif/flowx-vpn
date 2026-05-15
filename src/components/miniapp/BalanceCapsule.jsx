import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

const springConfig = { type: 'spring', stiffness: 300, damping: 30 };

export default function BalanceCapsule() {
  const [open, setOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(500);
  const amounts = [200, 500, 1000, 2000];

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
        style={{
          background: 'rgba(28,28,30,0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <span className="text-xs font-semibold" style={{ color: '#F5F5F7' }}>₽ 1 250</span>
        <Plus size={10} color="#0A84FF" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={springConfig}
              className="fixed bottom-0 left-0 right-0 z-50 p-6 rounded-t-3xl"
              style={{
                background: 'rgba(28,28,30,0.98)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold" style={{ color: '#F5F5F7' }}>Пополнить баланс</h3>
                <button onClick={() => setOpen(false)}>
                  <X size={20} color="#98989D" />
                </button>
              </div>

              <p className="text-sm mb-4" style={{ color: '#98989D' }}>Текущий баланс: <span style={{ color: '#F5F5F7', fontWeight: 600 }}>₽ 1 250</span></p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {amounts.map(a => (
                  <motion.button
                    key={a}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedAmount(a)}
                    className="p-3 rounded-2xl font-semibold text-sm"
                    style={{
                      background: selectedAmount === a ? 'linear-gradient(135deg, #0A84FF, #5E5CE6)' : 'rgba(44,44,46,0.6)',
                      border: selectedAmount === a ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
                      color: selectedAmount === a ? 'white' : '#98989D',
                    }}
                  >
                    ₽ {a}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-2xl font-semibold text-white text-base"
                style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)', boxShadow: '0 4px 20px rgba(10,132,255,0.4)' }}
              >
                Пополнить на ₽ {selectedAmount}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}