import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const CONTEXTS = [
  { id: 'fishing',  icon: '🎣', label: 'Balıkçılık' },
  { id: 'hunting',  icon: '🏹', label: 'Avcılık' },
  { id: 'camping',  icon: '⛺', label: 'Kamp' },
  { id: 'wildlife', icon: '🦋', label: 'Doğa' },
  { id: 'genel',    icon: '🌍', label: 'Genel' },
];

const QUICK_PROMPTS = [
  { ctx: 'fishing', text: 'Sazan için en iyi yemler neler?' },
  { ctx: 'fishing', text: 'Balık tutmak için en iyi mevsim?' },
  { ctx: 'hunting', text: 'Keklik avı için ruhsat nasıl alınır?' },
  { ctx: 'camping', text: 'Kamp için temel ekipman listesi' },
  { ctx: 'wildlife', text: 'Kuş gözlemi için ipuçları' },
  { ctx: 'genel', text: 'Türkiye\'de amatör balıkçılık kuralları' },
];

const SESSION_ID = 'chat_' + Math.random().toString(36).slice(2);

export default function AIChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: '👋 Merhaba! Ben **DoğaAI Asistanı**. Balıkçılık, avcılık, kamp, doğa yürüyüşü ve outdoor ekipman konularında sana yardımcı olabilirim.\n\nNe öğrenmek istersin?',
    ts: Date.now(),
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState('genel');
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg, ts: Date.now() }]);
    setLoading(true);
    try {
      const history = messages.slice(-10).map(m => ({ role: m.role, content: m.content }));
      const { data } = await axios.post(`${API}/chat`, { message: msg, context, session_id: SESSION_ID, history });
      setMessages(prev => [...prev, { role: 'assistant', content: data.message, ts: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant', content: '⚠️ Bağlantı hatası. Lütfen tekrar deneyin.', ts: Date.now(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (text) => {
    return text.split('**').map((part, i) =>
      i % 2 === 1 ? <strong key={i} style={{ color: '#86efac' }}>{part}</strong> : part
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f1f0f', maxWidth: 430, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: '#0a1f0a', padding: '48px 16px 12px',
        borderBottom: '1px solid #22c55e22', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/')} style={{
            background: 'none', border: 'none', color: '#86efac', fontSize: 20, cursor: 'pointer',
          }}>‹</button>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>🤖</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>DoğaAI Asistanı</div>
            <div style={{ fontSize: 11, color: '#22c55e' }}>● Online · {CONTEXTS.find(c=>c.id===context)?.label} modu</div>
          </div>
        </div>

        {/* Context selector */}
        <div className="filter-tabs" style={{ marginTop: 10 }}>
          {CONTEXTS.map(c => (
            <button key={c.id} className={`filter-tab ${context === c.id ? 'active' : ''}`}
              onClick={() => setContext(c.id)} style={{ fontSize: 12 }}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
        {/* Quick prompts when only welcome message */}
        {messages.length === 1 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#4a6741', marginBottom: 8, textAlign: 'center' }}>Hızlı sorular:</div>
            {QUICK_PROMPTS.map((q, i) => (
              <button key={i} onClick={() => { setContext(q.ctx); send(q.text); }} style={{
                width: '100%', textAlign: 'left', background: '#1a2e1a',
                border: '1px solid #22c55e22', borderRadius: 10, padding: '10px 14px',
                color: '#86efac', fontSize: 13, cursor: 'pointer', marginBottom: 6,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>{CONTEXTS.find(c=>c.id===q.ctx)?.icon}</span> {q.text}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className="fade-in" style={{
            display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: 12,
          }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: 30, height: 30, borderRadius: 8, flexShrink: 0, marginRight: 8,
                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
              }}>🤖</div>
            )}
            <div style={{
              maxWidth: '80%', borderRadius: 16, padding: '10px 14px',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                : '#1a2e1a',
              border: msg.role === 'user' ? 'none' : '1px solid #22c55e22',
              fontSize: 13, lineHeight: 1.6, color: '#e2e8f0',
              borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
              borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 16,
            }}>
              {renderContent(msg.content)}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>🤖</div>
            <div style={{
              background: '#1a2e1a', border: '1px solid #22c55e22', borderRadius: 16,
              padding: '12px 16px', display: 'flex', gap: 6, alignItems: 'center',
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
                  animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px 24px', background: '#0a1f0a',
        borderTop: '1px solid #22c55e22', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            className="input-field"
            placeholder={`${CONTEXTS.find(c=>c.id===context)?.icon} Sorunuzu yazın…`}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            style={{ flex: 1 }}
          />
          <button className="btn-primary" style={{ width: 48, padding: 0, flexShrink: 0 }}
            onClick={() => send()} disabled={!input.trim() || loading}>
            <span style={{ fontSize: 18 }}>↑</span>
          </button>
        </div>
        <div style={{ fontSize: 11, color: '#4a6741', textAlign: 'center', marginTop: 6 }}>
          Powered by <span style={{ color: '#76b900' }}>NVIDIA NIM</span> · Llama 3.1 70B
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
