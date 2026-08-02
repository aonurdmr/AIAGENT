import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const TOOLS = [
  { id: 'analyze',   icon: '🔬', label: 'Analiz',    desc: 'Duygu, anahtar kelime, kategori' },
  { id: 'summarize', icon: '📝', label: 'Özetle',    desc: '2-3 cümleye indir' },
  { id: 'improve',   icon: '✨', label: 'Geliştir',  desc: 'Yazım ve akıcılık iyileştir' },
];

const SENTIMENT_COLORS = { pozitif: '#22c55e', negatif: '#ef4444', nötr: '#f59e0b' };

const SAMPLE_TEXTS = [
  'Dün Sapanca Gölü\'nde harika bir balıkçılık deneyimi yaşadım. Sabah erkenden suya girdik ve 8 kilogramlık bir sazan yakaladık.',
  'Uludağ eteklerinde keklik avı sezonu açıldı. Ama bu yıl popülasyon azalmış gibi görünüyor, endişe verici.',
  'Abant\'ta kamp yaparken çadırım yağmurda ıslandı. Ekipman kalitesi önemliymiş!',
];

export default function NLPTools() {
  const [tool, setTool]         = useState('analyze');
  const [text, setText]         = useState('');
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState('');

  const run = async () => {
    if (!text.trim()) return;
    setLoading(true); setResult(null); setError('');
    try {
      const endpoint = tool === 'analyze'   ? '/nlp/analyze'
                     : tool === 'summarize' ? '/nlp/summarize'
                     :                        '/nlp/improve';
      const { data } = await axios.post(`${API}${endpoint}`, { text });
      if (data.success) setResult(data.data);
      else setError('İşlem başarısız.');
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const currentTool = TOOLS.find(t => t.id === tool);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>🧠 NLP Araçları</h1>
        <p>Metinleri analiz et, özetle ve geliştir</p>
      </div>

      <div style={{ padding: '14px 16px' }}>

        {/* Tool selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 }}>
          {TOOLS.map(t => (
            <button
              key={t.id}
              onClick={() => { setTool(t.id); setResult(null); setError(''); }}
              style={{
                padding: '10px 8px', borderRadius: 12, cursor: 'pointer',
                border: tool === t.id ? '1px solid #22c55e44' : '1px solid #22c55e18',
                background: tool === t.id ? '#22c55e14' : '#0d1f0d',
                textAlign: 'center', transition: 'all .2s',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{t.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: tool === t.id ? '#86efac' : '#a8d4a8' }}>{t.label}</div>
              <div style={{ fontSize: 10, color: '#4a7a4a', marginTop: 2 }}>{t.desc}</div>
            </button>
          ))}
        </div>

        {/* Text input */}
        <div style={{ marginBottom: 12 }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={`Metni buraya yapıştırın...\n\nÖrnek: "${SAMPLE_TEXTS[0].slice(0, 60)}..."`}
            rows={5}
            style={{
              width: '100%', padding: 12,
              background: '#0d1f0d', border: '1px solid #22c55e22',
              borderRadius: 12, color: '#f0faf0', fontSize: 13,
              outline: 'none', resize: 'vertical', lineHeight: 1.6,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {SAMPLE_TEXTS.slice(0, 2).map((s, i) => (
                <button
                  key={i}
                  onClick={() => setText(s)}
                  style={{
                    fontSize: 10, padding: '3px 8px', borderRadius: 8, cursor: 'pointer',
                    background: '#122212', border: '1px solid #22c55e18', color: '#4a7a4a',
                  }}
                >Örnek {i + 1}</button>
              ))}
            </div>
            <span style={{ fontSize: 11, color: '#4a7a4a' }}>{text.length} kar.</span>
          </div>
        </div>

        {/* Run button */}
        <button
          onClick={run}
          disabled={!text.trim() || loading}
          style={{
            width: '100%', padding: '12px',
            background: loading ? '#22c55e44' : 'linear-gradient(135deg, #22c55e, #16a34a)',
            border: 'none', borderRadius: 12, cursor: loading ? 'default' : 'pointer',
            color: '#fff', fontSize: 14, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'opacity .2s', opacity: (!text.trim() || loading) ? .6 : 1,
          }}
        >
          {loading ? (
            <>
              <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
              İşleniyor...
            </>
          ) : (
            <>{currentTool?.icon} {currentTool?.label} Çalıştır</>
          )}
        </button>

        {error && (
          <div style={{
            marginTop: 12, padding: 12, borderRadius: 12,
            background: '#ef444414', border: '1px solid #ef444430', color: '#f87171', fontSize: 13,
          }}>{error}</div>
        )}

        {/* Results */}
        {result && (
          <div style={{ marginTop: 16, animation: 'fadeIn .3s ease both' }}>
            <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 700, letterSpacing: '.08em', marginBottom: 10 }}>
              SONUÇLAR
            </div>

            {tool === 'analyze' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

                {/* Sentiment */}
                {result.sentiment && (
                  <div style={{
                    background: '#0d1f0d', border: '1px solid #22c55e18',
                    borderRadius: 14, padding: 14,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600 }}>Duygu Analizi</div>
                        <div style={{
                          fontSize: 20, fontWeight: 800,
                          color: SENTIMENT_COLORS[result.sentiment] || '#86efac',
                          marginTop: 2, textTransform: 'capitalize',
                        }}>
                          {result.sentiment}
                        </div>
                      </div>
                      {result.sentiment_score != null && (
                        <div style={{
                          width: 56, height: 56, borderRadius: '50%',
                          border: `3px solid ${SENTIMENT_COLORS[result.sentiment] || '#22c55e'}`,
                          background: (SENTIMENT_COLORS[result.sentiment] || '#22c55e') + '12',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{
                            fontSize: 16, fontWeight: 800,
                            color: SENTIMENT_COLORS[result.sentiment] || '#22c55e',
                          }}>
                            {Math.round(result.sentiment_score * 100)}
                          </span>
                          <span style={{ fontSize: 8, color: '#4a7a4a' }}>SKOR</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Keywords */}
                {result.keywords?.length > 0 && (
                  <div style={{
                    background: '#0d1f0d', border: '1px solid #22c55e18', borderRadius: 14, padding: 14,
                  }}>
                    <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600, marginBottom: 8 }}>🔑 Anahtar Kelimeler</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {result.keywords.map((k, i) => (
                        <span key={i} style={{
                          fontSize: 12, padding: '3px 10px', borderRadius: 20,
                          background: '#22c55e14', border: '1px solid #22c55e22', color: '#86efac',
                        }}>{k}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main topic + category */}
                {(result.main_topic || result.category) && (
                  <div style={{
                    background: '#0d1f0d', border: '1px solid #22c55e18', borderRadius: 14, padding: 14,
                  }}>
                    {result.main_topic && (
                      <div style={{ marginBottom: result.category ? 8 : 0 }}>
                        <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600 }}>📌 Ana Konu</div>
                        <div style={{ fontSize: 13, color: '#a8d4a8', marginTop: 4 }}>{result.main_topic}</div>
                      </div>
                    )}
                    {result.category && (
                      <div>
                        <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600 }}>🏷️ Kategori</div>
                        <span style={{
                          display: 'inline-block', marginTop: 4, fontSize: 12, padding: '2px 10px', borderRadius: 20,
                          background: '#3b82f614', border: '1px solid #3b82f630', color: '#60a5fa',
                        }}>{result.category}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {tool === 'summarize' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.summary && (
                  <div style={{
                    background: '#0d1f0d', border: '1px solid #22c55e18', borderRadius: 14, padding: 14,
                  }}>
                    <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600, marginBottom: 8 }}>📝 Özet</div>
                    <p style={{ fontSize: 13, color: '#a8d4a8', lineHeight: 1.7 }}>{result.summary}</p>
                  </div>
                )}
                {result.key_points?.length > 0 && (
                  <div style={{
                    background: '#0d1f0d', border: '1px solid #22c55e18', borderRadius: 14, padding: 14,
                  }}>
                    <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600, marginBottom: 8 }}>✅ Ana Noktalar</div>
                    {result.key_points.map((p, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                        <span style={{ color: '#22c55e', flexShrink: 0 }}>•</span>
                        <span style={{ fontSize: 13, color: '#a8d4a8', lineHeight: 1.5 }}>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tool === 'improve' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.improved_text && (
                  <div style={{
                    background: '#0d1f0d', border: '1px solid #22c55e18', borderRadius: 14, padding: 14,
                  }}>
                    <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600, marginBottom: 8 }}>✨ Geliştirilmiş Metin</div>
                    <p style={{ fontSize: 13, color: '#a8d4a8', lineHeight: 1.7 }}>{result.improved_text}</p>
                    <button
                      onClick={() => navigator.clipboard?.writeText(result.improved_text)}
                      style={{
                        marginTop: 10, padding: '6px 12px', borderRadius: 8, cursor: 'pointer',
                        background: '#22c55e14', border: '1px solid #22c55e22', color: '#86efac', fontSize: 11,
                      }}
                    >📋 Kopyala</button>
                  </div>
                )}
                {result.changes?.length > 0 && (
                  <div style={{
                    background: '#0d1f0d', border: '1px solid #22c55e18', borderRadius: 14, padding: 14,
                  }}>
                    <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600, marginBottom: 8 }}>🔧 Yapılan Değişiklikler</div>
                    {result.changes.map((c, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                        <span style={{ color: '#f59e0b', flexShrink: 0 }}>→</span>
                        <span style={{ fontSize: 12, color: '#a8d4a8' }}>{c}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
