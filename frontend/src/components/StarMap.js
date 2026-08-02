import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const CONSTELLATIONS = [
  {
    id: 1, name: 'Büyük Ayı', en: 'Ursa Major', icon: '🐻', season: 'Yıl boyu (kuzey)',
    accent: '#60a5fa',
    desc: 'Dört yıldızlı kase + üç saplı bir tava. Sapın ilk iki yıldızını uzatırsanız Kutup Yıldızı\'na ulaşırsınız.',
    nav: 'Kuzey bulma: Merak ve Dubhe\'yi 5 kat uzat → Kutup Yıldızı',
    stars: [
      { x: 80, y: 90 }, { x: 100, y: 75 }, { x: 130, y: 72 }, { x: 140, y: 88 },
      { x: 120, y: 105 }, { x: 95, y: 108 }, { x: 110, y: 125 }, { x: 125, y: 145 },
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[5,6],[6,7]],
  },
  {
    id: 2, name: 'Orion', en: 'Orion', icon: '⚔️', season: 'Kış (Aralık–Mart)',
    accent: '#818cf8',
    desc: 'Üç sıralı yıldızdan oluşan kemer (Üç Saçlar) en belirgin işaret. Betelgeuse (kırmızı) ve Rigel (mavi) parlak köşe yıldızları.',
    nav: 'Güney bulma: Kemeri uzat → solda Aldebaran (Boğa), sağda Sirius (köpek)',
    stars: [
      { x: 90, y: 60 }, { x: 150, y: 65 },
      { x: 100, y: 100 }, { x: 120, y: 102 }, { x: 140, y: 100 },
      { x: 95, y: 135 }, { x: 145, y: 130 },
    ],
    lines: [[0,2],[1,3],[2,3],[3,4],[4,1],[2,5],[4,6]],
  },
  {
    id: 3, name: 'Kasiyopeia', en: 'Cassiopeia', icon: '👑', season: 'Yıl boyu (kuzey)',
    accent: '#f472b6',
    desc: '"W" veya "M" harfi şeklinde 5 parlak yıldız. Büyük Ayı\'ya karşı, Kutup Yıldızı etrafında döner.',
    nav: 'Kuzey bulma: W şeklinin orta ucundan Kutup Yıldızı\'na uzat',
    stars: [
      { x: 60, y: 100 }, { x: 85, y: 75 }, { x: 110, y: 95 }, { x: 135, y: 72 }, { x: 160, y: 92 },
    ],
    lines: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    id: 4, name: 'Güney Haçı', en: 'Crux', icon: '✝️', season: 'İlkbahar-Yaz (güney)',
    accent: '#34d399',
    desc: 'Dört parlak yıldız küçük haç şekli. Türkiye\'nin güney kıyılarından alçaktan görülebilir.',
    nav: 'Güney bulma: Uzun kolu 4,5 kat uzat → Güney kutbu',
    stars: [
      { x: 110, y: 70 }, { x: 110, y: 130 }, { x: 75, y: 100 }, { x: 145, y: 100 }, { x: 130, y: 85 },
    ],
    lines: [[0,1],[2,3],[0,4]],
  },
  {
    id: 5, name: 'Akrep', en: 'Scorpius', icon: '🦂', season: 'Yaz (Haziran–Ağustos)',
    accent: '#f59e0b',
    desc: 'Antares (kırmızı dev) kalp yıldızı. Uzun kıvrımlı kuyruğuyla yazın güney ufkunda belirgin.',
    nav: 'Güneydoğu yönünü işaretler; balıkçılık için yaz gecelerinde harika referans',
    stars: [
      { x: 100, y: 70 }, { x: 115, y: 85 }, { x: 105, y: 100 },
      { x: 95, y: 115 }, { x: 100, y: 130 }, { x: 110, y: 140 }, { x: 125, y: 148 }, { x: 140, y: 142 },
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]],
  },
  {
    id: 6, name: 'Büyükköpek', en: 'Canis Major', icon: '🐕', season: 'Kış-İlkbahar',
    accent: '#38bdf8',
    desc: 'Sirius — gökyüzünün en parlak yıldızı — bu takımyıldızındadır. Orion\'un solunda ve aşağısında.',
    nav: 'Kışın Güneydoğu: Sirius parlak ve mavimsi rengiyle tanınır',
    stars: [
      { x: 110, y: 80 }, { x: 90, y: 100 }, { x: 100, y: 115 }, { x: 125, y: 110 }, { x: 135, y: 125 },
    ],
    lines: [[0,1],[1,2],[2,3],[3,0],[3,4]],
  },
];

const PLANETS_INFO = [
  { name: 'Venüs', en: 'Venus', color: '#fde68a', desc: 'Şafak veya alacakaranlıkta görünür. Gökyüzündeki en parlak "yıldız".' },
  { name: 'Jüpiter', en: 'Jupiter', color: '#fed7aa', desc: 'Çok parlak, hafif sarımsı. Gece boyu görünebilir.' },
  { name: 'Mars', en: 'Mars', color: '#fca5a5', desc: 'Kırmızımsı rengiyle kolayca tanınır.' },
  { name: 'Satürn', en: 'Saturn', color: '#fde68a', desc: 'Sarımsı, sabit parlaklık. Teleskopla halkaları görünür.' },
];

function StarCanvas({ constellation }) {
  const { stars, lines, accent } = constellation;
  const W = 220, H = 180;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: 160 }}>
      <rect width={W} height={H} rx={12} fill="#0f172a" />
      {/* Background stars */}
      {Array.from({ length: 30 }, (_, i) => {
        const bx = (i * 73 + 11) % W;
        const by = (i * 47 + 17) % H;
        return <circle key={i} cx={bx} cy={by} r={0.7} fill="#334155" />;
      })}
      {/* Constellation lines */}
      {lines.map(([a, b], i) => (
        <line key={i} x1={stars[a].x} y1={stars[a].y} x2={stars[b].x} y2={stars[b].y}
          stroke={accent} strokeWidth={1} strokeOpacity={0.5} strokeDasharray="3,3" />
      ))}
      {/* Stars */}
      {stars.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={4} fill={accent} opacity={0.25} />
          <circle cx={s.x} cy={s.y} r={2.5} fill={accent} />
        </g>
      ))}
    </svg>
  );
}

function ConstellationCard({ c, onClick }) {
  return (
    <div onClick={() => onClick(c)} style={{
      background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
      border: `1px solid ${c.accent}44`, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 24 }}>{c.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{c.name}</div>
          <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic' }}>{c.en}</div>
        </div>
        <span style={{ fontSize: 11, background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '3px 8px' }}>{c.season}</span>
      </div>
      <div style={{ background: '#0f172a', borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}>
        <StarCanvas constellation={c} />
      </div>
      <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{c.desc.slice(0, 80)}…</div>
    </div>
  );
}

function ConstellationDetail({ c, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 36 }}>{c.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{c.name}</div>
            <div style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic' }}>{c.en} · {c.season}</div>
          </div>
        </div>

        <div style={{ background: '#0f172a', borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
          <StarCanvas constellation={c} />
        </div>

        <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🔭 TANIM</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{c.desc}</div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '12px 14px', border: '1px solid #3b82f644' }}>
          <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>🧭 YÖNELME & NAVİGASYON</div>
          <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.7 }}>{c.nav}</div>
        </div>
      </div>
    </div>
  );
}

export default function StarMap() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('takimyildiz');

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⭐ Yıldız Haritası</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 takımyıldız · gece navigasyonu rehberi</div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        {[['takimyildiz', '✨ Takımyıldızlar'], ['gezegenler', '🪐 Gezegenler']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            background: tab === key ? '#3b82f6' : '#1f2937',
            color: tab === key ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === key ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'takimyildiz' ? (
        <div style={{ padding: '0 16px' }}>
          <div style={{ background: '#1e3a5f', borderRadius: 14, padding: '12px 16px', marginBottom: 14, border: '1px solid #3b82f644' }}>
            <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>💡 GECE BALIKÇILIĞI İPUCU</div>
            <div style={{ fontSize: 12, color: '#bfdbfe', lineHeight: 1.6 }}>
              Ay yokken yıldız haritasıyla yön bulabilirsiniz. Büyük Ayı ve Kasiyopeia her mevsim kuzey ufkunda görünür.
            </div>
          </div>
          {CONSTELLATIONS.map(c => <ConstellationCard key={c.id} c={c} onClick={setSelected} />)}
        </div>
      ) : (
        <div style={{ padding: '0 16px' }}>
          <div style={{ background: '#1f2937', borderRadius: 14, padding: '14px 16px', marginBottom: 14, border: '1px solid #374151' }}>
            <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7 }}>
              Gezegenler sabah veya akşam alacakaranlığında, bazen gece boyu görünebilir. Titremezler — yıldızlar titrer. Renklerine göre aşağıda tanıyabilirsiniz.
            </div>
          </div>
          {PLANETS_INFO.map(p => (
            <div key={p.name} style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 10, border: '1px solid #374151', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: p.color, marginTop: 2, flexShrink: 0, boxShadow: `0 0 8px ${p.color}` }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb', marginBottom: 2 }}>{p.name} <span style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>{p.en}</span></div>
                <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            </div>
          ))}

          <div style={{ background: '#1e3a5f', borderRadius: 14, padding: '14px 16px', border: '1px solid #3b82f644' }}>
            <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 6 }}>🌙 AY EVRELERİ & BALIKÇILIK</div>
            {[
              { phase: '🌑 Yeni Ay', tip: 'En karanlık geceler — yıldızlar en iyi görünür. Gece balıkçılığı için ideal.' },
              { phase: '🌓 İlk Dördün', tip: 'Artan ışık. Balıklar aktif, sahil balıkçılığı verimli.' },
              { phase: '🌕 Dolunay', tip: 'Çok aydınlık. Büyük türler için iyi ama gece avı zor.' },
              { phase: '🌗 Son Dördün', tip: 'Azalan ışık. Şafak saatlerinde en yüksek aktivite.' },
            ].map(({ phase, tip }) => (
              <div key={phase} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb', marginBottom: 2 }}>{phase}</div>
                <div style={{ fontSize: 12, color: '#bfdbfe', lineHeight: 1.5 }}>{tip}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selected && <ConstellationDetail c={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
