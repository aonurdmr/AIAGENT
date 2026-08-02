import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const STYLES = [
  { id: 'realistic',  icon: '📷', label: 'Gerçekçi' },
  { id: 'artistic',   icon: '🎨', label: 'Sanatsal' },
  { id: 'watercolor', icon: '💧', label: 'Suluboya' },
  { id: 'sketch',     icon: '✏️', label: 'Eskiz' },
];

const PROMPTS = [
  'Sapanca gölünde sabah sisi, su yüzeyinde yansımalar',
  'Kaçkar dağlarında kartal uçuşu, mavi gökyüzü',
  'Ormanda kamp ateşi, yıldızlı gece gökyüzü',
  'Turkuaz dağ gölünde alabalık avı, yeşil çam ormanı',
  'Bataklıkta flamingo kolonisi, altın saat ışığı',
];

export default function ImageGen() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle]   = useState('realistic');
  const [loading, setLoading] = useState(false);
  const [image, setImage]   = useState(null);
  const [error, setError]   = useState('');
  const [usedPrompt, setUsedPrompt] = useState('');

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setImage(null); setError(''); setUsedPrompt(prompt);
    try {
      const { data } = await axios.post(`${API}/generate-image`, { prompt, style });
      if (data.success && data.image_b64) {
        setImage(data.image_b64);
      } else {
        setError(data.error || 'Görsel oluşturulamadı.');
      }
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!image) return;
    const a = document.createElement('a');
    a.href = `data:image/png;base64,${image}`;
    a.download = `dogaai-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>🎨 Görsel Oluşturucu</h1>
        <p>AI ile doğa görselleri üret</p>
      </div>

      <div style={{ padding: '14px 16px' }}>

        {/* Style selector */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 700, letterSpacing: '.08em', marginBottom: 8 }}>
            STİL SEÇ
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
            {STYLES.map(s => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                style={{
                  padding: '8px 4px', borderRadius: 10, cursor: 'pointer', textAlign: 'center',
                  border: style === s.id ? '1px solid #22c55e44' : '1px solid #22c55e18',
                  background: style === s.id ? '#22c55e14' : '#0d1f0d',
                  transition: 'all .2s',
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 2 }}>{s.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: style === s.id ? '#86efac' : '#4a7a4a' }}>
                  {s.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt suggestions */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 700, letterSpacing: '.08em', marginBottom: 8 }}>
            HAZIR İFİRLER
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 4 }}>
            {PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => setPrompt(p)}
                style={{
                  flexShrink: 0, fontSize: 11, padding: '5px 10px', borderRadius: 20, cursor: 'pointer',
                  background: prompt === p ? '#22c55e14' : '#0d1f0d',
                  border: prompt === p ? '1px solid #22c55e44' : '1px solid #22c55e18',
                  color: prompt === p ? '#86efac' : '#4a7a4a',
                  whiteSpace: 'nowrap', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis',
                }}
              >{p}</button>
            ))}
          </div>
        </div>

        {/* Prompt textarea */}
        <div style={{ marginBottom: 12 }}>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Oluşturmak istediğiniz sahneyi Türkçe veya İngilizce açıklayın..."
            rows={3}
            style={{
              width: '100%', padding: 12,
              background: '#0d1f0d', border: '1px solid #22c55e22',
              borderRadius: 12, color: '#f0faf0', fontSize: 13,
              outline: 'none', resize: 'none', lineHeight: 1.6,
            }}
          />
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          disabled={!prompt.trim() || loading}
          style={{
            width: '100%', padding: '13px',
            background: loading ? '#22c55e44' : 'linear-gradient(135deg, #22c55e, #16a34a)',
            border: 'none', borderRadius: 12, cursor: loading ? 'default' : 'pointer',
            color: '#fff', fontSize: 14, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            opacity: (!prompt.trim() || loading) ? .6 : 1, transition: 'opacity .2s',
          }}
        >
          {loading ? (
            <>
              <span style={{ animation: 'spin 1.2s linear infinite', display: 'inline-block' }}>⟳</span>
              Oluşturuluyor (~30 sn)...
            </>
          ) : '🎨 Görsel Oluştur'}
        </button>

        {error && (
          <div style={{
            marginTop: 12, padding: 12, borderRadius: 12,
            background: '#ef444414', border: '1px solid #ef444430', color: '#f87171', fontSize: 13,
          }}>{error}</div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div style={{
            marginTop: 16, borderRadius: 16, overflow: 'hidden',
            background: '#0d1f0d', border: '1px solid #22c55e18',
            height: 280, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 36 }}>🖼️</div>
            <div style={{ fontSize: 13, color: '#4a7a4a' }}>AI görseli oluşturuyor...</div>
            <div style={{
              width: 200, height: 4, background: '#22c55e18', borderRadius: 4, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: '40%', background: '#22c55e',
                borderRadius: 4, animation: 'slide 1.5s ease-in-out infinite',
              }} />
            </div>
          </div>
        )}

        {/* Generated image */}
        {image && !loading && (
          <div style={{ marginTop: 16, animation: 'fadeIn .4s ease both' }}>
            <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 700, letterSpacing: '.08em', marginBottom: 10 }}>
              OLUŞTURULAN GÖRSEL
            </div>

            <div style={{
              background: '#0d1f0d', border: '1px solid #22c55e22',
              borderRadius: 16, overflow: 'hidden',
            }}>
              <img
                src={`data:image/png;base64,${image}`}
                alt="AI generated"
                style={{ width: '100%', display: 'block' }}
              />

              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 12, color: '#4a7a4a', marginBottom: 8, lineHeight: 1.5 }}>
                  🎨 <em>{usedPrompt}</em>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={download}
                    style={{
                      flex: 1, padding: '8px', borderRadius: 10, cursor: 'pointer',
                      background: '#22c55e14', border: '1px solid #22c55e30',
                      color: '#86efac', fontSize: 12, fontWeight: 600,
                    }}
                  >⬇️ İndir</button>
                  <button
                    onClick={() => { setImage(null); setPrompt(''); }}
                    style={{
                      flex: 1, padding: '8px', borderRadius: 10, cursor: 'pointer',
                      background: '#ef444414', border: '1px solid #ef444430',
                      color: '#f87171', fontSize: 12, fontWeight: 600,
                    }}
                  >🗑️ Sil</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
