import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const AGENT_ORDER = [
  'balikcilik','avcilik','kamp','botanik','yaban_hayati',
  'planlama','hava','arastirma','gorsel','cevre','guvenlik',
];

const AGENT_META = {
  balikcilik:   { name:'Balıkçılık Uzmanı', icon:'🎣', color:'#3b82f6', desc:'Teknikler, yemler, türler, spotlar' },
  avcilik:      { name:'Avcılık Uzmanı',     icon:'🏹', color:'#ef4444', desc:'Av teknikleri, ruhsatlar, güvenlik' },
  kamp:         { name:'Kamp Uzmanı',         icon:'⛺', color:'#8b5cf6', desc:'Ekipman, güzergah, teknikler' },
  botanik:      { name:'Botanik Uzmanı',       icon:'🌿', color:'#22c55e', desc:'Bitki tanımlama, tıbbi bitkiler' },
  yaban_hayati: { name:'Yaban Hayatı',         icon:'🦅', color:'#f59e0b', desc:'Hayvan davranışları, kuş gözlemi' },
  planlama:     { name:'Seyahat Planlamacı',   icon:'🗺️', color:'#06b6d4', desc:'Rota planlama, gün programları' },
  hava:         { name:'Hava Analisti',         icon:'🌡️', color:'#34d399', desc:'Hava yorumu, aktivite skoru' },
  arastirma:    { name:'Araştırma Uzmanı',      icon:'🔬', color:'#a855f7', desc:'Bilimsel araştırma, raporlar' },
  gorsel:       { name:'Görsel Analist',         icon:'📷', color:'#ec4899', desc:'Görsel tanımlama, fotoğraf analizi' },
  cevre:        { name:'Çevre Uzmanı',           icon:'🌍', color:'#10b981', desc:'Ekosistem, iklim, koruma' },
  guvenlik:     { name:'Güvenlik Uzmanı',        icon:'🛡️', color:'#f97316', desc:'İlk yardım, kriz yönetimi' },
};

function timeAgo(ts) {
  if (!ts) return '';
  const diff = (Date.now() - new Date(ts)) / 1000;
  if (diff < 60) return 'az önce';
  if (diff < 3600) return `${Math.floor(diff/60)}dk önce`;
  if (diff < 86400) return `${Math.floor(diff/3600)}sa önce`;
  return `${Math.floor(diff/86400)}g önce`;
}

function renderContent(text) {
  return text.split('**').map((p, i) =>
    i % 2 === 1 ? <strong key={i} style={{ color: '#86efac' }}>{p}</strong> : p
  );
}

// ── Agent List Panel ──────────────────────────────────────────────────────────
function AgentList({ selected, onSelect, sessions, onNewSession, onDeleteSession }) {
  return (
    <div style={{
      width: 280, flexShrink: 0, background: '#070f07',
      borderRight: '1px solid #22c55e18', overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid #22c55e18' }}>
        <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 700, letterSpacing: '.1em', marginBottom: 2 }}>
          AI AJAN MERKEZİ
        </div>
        <div style={{ fontSize: 13, color: '#86efac', fontWeight: 600 }}>11 Uzman Ajan</div>
      </div>

      {/* Agent types */}
      <div style={{ padding: '10px 8px', borderBottom: '1px solid #22c55e18' }}>
        <div style={{ fontSize: 10, color: '#4a7a4a', fontWeight: 700, letterSpacing: '.08em', padding: '0 8px 8px' }}>AJANLAR</div>
        {AGENT_ORDER.map(id => {
          const a = AGENT_META[id];
          const active = selected?.type === 'agent' && selected?.id === id;
          return (
            <button key={id} onClick={() => onSelect({ type: 'agent', id })} style={{
              width: '100%', textAlign: 'left', background: active ? `${a.color}14` : 'transparent',
              border: active ? `1px solid ${a.color}33` : '1px solid transparent',
              borderRadius: 10, padding: '8px 10px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2, transition: 'all .15s',
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{a.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: active ? a.color : '#a8d4a8',
                              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {a.name}
                </div>
                <div style={{ fontSize: 10, color: '#4a7a4a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {a.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Session history */}
      {sessions.length > 0 && (
        <div style={{ padding: '10px 8px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: 10, color: '#4a7a4a', fontWeight: 700, letterSpacing: '.08em', padding: '0 8px 8px' }}>
            GEÇMİŞ OTURUMLAR
          </div>
          {sessions.map(s => {
            const a = AGENT_META[s.agent_type] || AGENT_META.balikcilik;
            const active = selected?.type === 'session' && selected?.id === s.id;
            return (
              <div key={s.id} style={{ position: 'relative', marginBottom: 2 }}>
                <button onClick={() => onSelect({ type: 'session', id: s.id, agentType: s.agent_type })} style={{
                  width: '100%', textAlign: 'left',
                  background: active ? `${a.color}14` : 'transparent',
                  border: active ? `1px solid ${a.color}33` : '1px solid transparent',
                  borderRadius: 10, padding: '7px 28px 7px 10px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8, transition: 'all .15s',
                }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{a.icon}</span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 11, color: '#a8d4a8', whiteSpace: 'nowrap',
                                  overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                    <div style={{ fontSize: 10, color: '#4a7a4a' }}>{timeAgo(s.updated_at)}</div>
                  </div>
                </button>
                <button onClick={() => onDeleteSession(s.id)} style={{
                  position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#4a7a4a', cursor: 'pointer',
                  fontSize: 12, padding: 2, lineHeight: 1,
                }}>✕</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


// ── Chat Panel ────────────────────────────────────────────────────────────────
function ChatPanel({ agentId, sessionId, onSessionCreated }) {
  const { user } = useAuth();
  const agent = AGENT_META[agentId] || AGENT_META.balikcilik;
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [sid, setSid]           = useState(sessionId);
  const [imgFile, setImgFile]   = useState(null);
  const [imgB64, setImgB64]     = useState(null);
  const endRef = useRef();
  const fileRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    setSid(sessionId);
    if (sessionId) {
      axios.get(`${API}/sessions/${sessionId}/messages`).then(r => {
        setMessages(r.data.messages || []);
      }).catch(() => {});
    } else {
      setMessages([]);
    }
    setInput(''); setImgFile(null); setImgB64(null);
  }, [sessionId, agentId]);

  const handleImage = (file) => {
    if (!file) return;
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = e => setImgB64(e.target.result);
    reader.readAsDataURL(file);
  };

  const send = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput(''); setImgFile(null); setImgB64(null);

    let currentSid = sid;
    if (!currentSid) {
      try {
        const { data } = await axios.post(`${API}/sessions`, {
          name: `${agent.name} — ${new Date().toLocaleString('tr-TR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
          agent_type: agentId,
        });
        currentSid = data.id;
        setSid(currentSid);
        onSessionCreated?.(data);
      } catch { return; }
    }

    const userMsg = { id: Date.now(), role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const { data } = await axios.post(`${API}/sessions/${currentSid}/messages`, {
        content: msg, agent_type: agentId,
      });
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'assistant', content: data.message, ts: new Date().toISOString(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'assistant', content: '⚠️ Yanıt alınamadı. Tekrar deneyin.', ts: new Date().toISOString(),
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, sid, agentId, agent.name, onSessionCreated]);

  const QUICK = {
    balikcilik:   ['Sazan için en iyi yemler?', 'Sabah mı akşam mı daha verimli?', 'Kış aylarında balık tutulur mu?'],
    avcilik:      ['Keklik ruhsatı nasıl alınır?', 'Av sezonu ne zaman başlar?', 'Güvenli av pozisyonu nedir?'],
    kamp:         ['Kamp çantasına ne almalıyım?', 'Ateş yakmak için en iyi teknik?', 'Yağmurlu havada kamp ipuçları'],
    botanik:      ['Zehirli mantar nasıl anlaşılır?', 'Türkiye\'de yenilebilir bitkiler?', 'Tıbbi bitki kullanımı'],
    yaban_hayati: ['Ayı ile karşılaşırsam ne yapmalıyım?', 'Kuş gözlemi için en iyi saatler?', 'Yılan sokması'],
    planlama:     ['Kapadokya kamp turu planla', 'Toros dağları balık turu', 'Akdeniz kamp rotası öner'],
    hava:         ['Rüzgar balıkçılığı etkiler mi?', 'Ay fazının balığa etkisi?', 'Hava tahmini nasıl okunur?'],
    arastirma:    ['Türkiye\'de nesli tehlike altındaki türler?', 'Su kirliliğinin balıklara etkisi?', 'Biyoçeşitlilik araştırmaları'],
    gorsel:       ['Fotoğrafı analiz et', 'Doğa fotoğrafçılığı ipuçları?', 'En iyi macro lens önerileri?'],
    cevre:        ['Sürdürülebilir balıkçılık nedir?', 'Karbon ayak izi nasıl azaltılır?', 'Invasif türler nelerdir?'],
    guvenlik:     ['Yıldırım tehlikesi anında ne yapmalı?', 'Boğulma ilk yardımı nasıl yapılır?', 'Hipotermi belirtileri'],
  };

  const quickList = QUICK[agentId] || [];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: '#0a160a' }}>
      {/* Agent header */}
      <div style={{
        padding: '16px 20px', borderBottom: '1px solid #22c55e18',
        background: '#070f07', display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 13, flexShrink: 0,
          background: `${agent.color}20`, border: `1px solid ${agent.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
        }}>{agent.icon}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{agent.name}</div>
          <div style={{ fontSize: 11, color: agent.color }}>● Aktif · NVIDIA Llama 3.1 70B</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {messages.length === 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{
              background: `${agent.color}10`, border: `1px solid ${agent.color}25`,
              borderRadius: 14, padding: '16px 18px', marginBottom: 16,
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{agent.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 4 }}>{agent.name}</div>
              <div style={{ fontSize: 13, color: '#a8d4a8', lineHeight: 1.6 }}>{agent.desc} konularında sana yardımcı olabilirim.</div>
            </div>
            {quickList.length > 0 && (
              <>
                <div style={{ fontSize: 11, color: '#4a7a4a', marginBottom: 8, fontWeight: 600 }}>HIZLI SORULAR</div>
                {quickList.map((q, i) => (
                  <button key={i} onClick={() => send(q)} style={{
                    width: '100%', textAlign: 'left', background: '#111f11',
                    border: '1px solid #22c55e18', borderRadius: 10, padding: '9px 14px',
                    color: '#86efac', fontSize: 13, cursor: 'pointer', marginBottom: 6,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{ color: agent.color, fontSize: 14 }}>›</span> {q}
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={msg.id || i} className="fade-in" style={{
            display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: 14,
          }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0, marginRight: 10, marginTop: 2,
                background: `${agent.color}20`, border: `1px solid ${agent.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
              }}>{agent.icon}</div>
            )}
            <div style={{
              maxWidth: '78%', borderRadius: 16, padding: '10px 14px',
              background: msg.role === 'user'
                ? `linear-gradient(135deg, ${agent.color}, ${agent.color}bb)`
                : '#132013',
              border: msg.role === 'user' ? 'none' : '1px solid #22c55e18',
              fontSize: 13, lineHeight: 1.65, color: '#e2e8f0',
              borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
              borderBottomLeftRadius:  msg.role === 'assistant' ? 4 : 16,
              whiteSpace: 'pre-wrap',
            }}>
              {msg.role === 'assistant' ? renderContent(msg.content) : msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9, flexShrink: 0,
              background: `${agent.color}20`, border: `1px solid ${agent.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
            }}>{agent.icon}</div>
            <div style={{
              background: '#132013', border: '1px solid #22c55e18', borderRadius: 16,
              padding: '12px 16px', display: 'flex', gap: 6, alignItems: 'center',
            }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: agent.color,
                  animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Image preview */}
      {imgB64 && (
        <div style={{ padding: '0 20px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={imgB64} alt="ek" style={{ height: 60, borderRadius: 8, objectFit: 'cover' }}/>
          <button onClick={() => { setImgFile(null); setImgB64(null); }} style={{
            background: '#1a2e1a', border: '1px solid #22c55e22', borderRadius: '50%',
            width: 24, height: 24, color: '#86efac', cursor: 'pointer', fontSize: 12,
          }}>✕</button>
        </div>
      )}

      {/* Input */}
      <div style={{ padding: '12px 20px 20px', background: '#070f07', borderTop: '1px solid #22c55e18' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {agentId === 'gorsel' && (
            <>
              <button onClick={() => fileRef.current?.click()} style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: '#1a2e1a', border: '1px solid #22c55e22',
                color: '#86efac', fontSize: 18, cursor: 'pointer',
              }}>📎</button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => handleImage(e.target.files[0])}/>
            </>
          )}
          <input
            className="input-field"
            placeholder={`${agent.icon} ${agent.name}'na sor…`}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            style={{ flex: 1 }}
          />
          <button
            className="btn-primary"
            style={{ width: 44, height: 44, padding: 0, flexShrink: 0, background: `linear-gradient(135deg, ${agent.color}, ${agent.color}bb)` }}
            onClick={() => send()}
            disabled={!input.trim() || loading}
          >
            <span style={{ fontSize: 18 }}>↑</span>
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#3a5a3a', textAlign: 'center', marginTop: 6 }}>
          Powered by NVIDIA NIM · Llama 3.1 70B
        </div>
      </div>

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );
}


// ── Mobile Agent Picker ───────────────────────────────────────────────────────
function MobileAgentPicker({ onSelect }) {
  return (
    <div style={{ padding: 16, flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '48px 0 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🤖</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>AI Ajan Merkezi</div>
        <div style={{ fontSize: 13, color: '#4a7a4a' }}>Uzman ajan seç ve konuşmaya başla</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {AGENT_ORDER.map(id => {
          const a = AGENT_META[id];
          return (
            <button key={id} onClick={() => onSelect({ type: 'agent', id })} style={{
              background: `${a.color}10`, border: `1px solid ${a.color}25`,
              borderRadius: 14, padding: '14px 12px', cursor: 'pointer', textAlign: 'center',
              transition: 'all .15s',
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{a.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: a.color, marginBottom: 3 }}>{a.name}</div>
              <div style={{ fontSize: 10, color: '#4a7a4a', lineHeight: 1.4 }}>{a.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


// ── Main component ────────────────────────────────────────────────────────────
export default function AgentCenter() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [isMobile]  = useState(() => window.innerWidth <= 430);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    axios.get(`${API}/sessions`).then(r => setSessions(r.data)).catch(() => {});
  }, []);

  const handleSelect = (sel) => {
    setSelected(sel);
    setShowList(false);
  };

  const handleNewSession = (session) => {
    setSessions(prev => [session, ...prev]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/sessions/${id}`);
      setSessions(prev => prev.filter(s => s.id !== id));
      if (selected?.type === 'session' && selected?.id === id) setSelected(null);
    } catch {}
  };

  const currentAgentId  = selected?.type === 'agent' ? selected.id : selected?.agentType;
  const currentSessionId = selected?.type === 'session' ? selected.id : null;

  // Desktop layout
  if (!isMobile) {
    return (
      <div style={{ display: 'flex', height: '100vh', background: '#040d04', overflow: 'hidden' }}>
        <AgentList
          selected={selected}
          onSelect={handleSelect}
          sessions={sessions}
          onNewSession={handleNewSession}
          onDeleteSession={handleDelete}
        />
        {selected ? (
          <ChatPanel
            agentId={currentAgentId}
            sessionId={currentSessionId}
            onSessionCreated={handleNewSession}
          />
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 48 }}>🌿</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>DoğaAI Ajan Merkezi</div>
            <div style={{ fontSize: 14, color: '#4a7a4a' }}>Sol taraftan bir ajan seç</div>
          </div>
        )}
      </div>
    );
  }

  // Mobile layout
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#040d04' }}>
      {/* Mobile header */}
      <div style={{
        padding: '48px 16px 12px', background: '#070f07',
        borderBottom: '1px solid #22c55e18', display: 'flex', alignItems: 'center', gap: 12,
      }}>
        {selected ? (
          <button onClick={() => setSelected(null)} style={{
            background: 'none', border: 'none', color: '#86efac', fontSize: 20, cursor: 'pointer',
          }}>‹</button>
        ) : (
          <button onClick={() => navigate('/')} style={{
            background: 'none', border: 'none', color: '#86efac', fontSize: 20, cursor: 'pointer',
          }}>‹</button>
        )}
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>
            {selected ? AGENT_META[currentAgentId]?.name : 'AI Ajan Merkezi'}
          </div>
          <div style={{ fontSize: 11, color: '#22c55e' }}>
            {selected ? '● Aktif · NVIDIA NIM' : `${AGENT_ORDER.length} uzman ajan`}
          </div>
        </div>
      </div>

      {selected ? (
        <ChatPanel
          agentId={currentAgentId}
          sessionId={currentSessionId}
          onSessionCreated={handleNewSession}
        />
      ) : (
        <MobileAgentPicker onSelect={handleSelect}/>
      )}
    </div>
  );
}
