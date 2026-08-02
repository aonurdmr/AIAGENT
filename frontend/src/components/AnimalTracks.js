import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// SVG paw/track shapes
function BearPaw({ color }) {
  return (
    <svg viewBox="0 0 60 70" width={60} height={70}>
      {/* palm */}
      <ellipse cx={30} cy={48} rx={18} ry={16} fill={color} opacity={0.8} />
      {/* toes */}
      {[14, 22, 30, 38, 46].map((cx, i) => (
        <ellipse key={i} cx={cx} cy={26 - (i === 2 ? 4 : 0)} rx={5} ry={6} fill={color} opacity={0.85} />
      ))}
    </svg>
  );
}

function DeerHoof({ color }) {
  return (
    <svg viewBox="0 0 60 70" width={60} height={70}>
      <ellipse cx={22} cy={40} rx={9} ry={18} fill={color} opacity={0.85} />
      <ellipse cx={38} cy={40} rx={9} ry={18} fill={color} opacity={0.85} />
    </svg>
  );
}

function WolfPaw({ color }) {
  return (
    <svg viewBox="0 0 60 70" width={60} height={70}>
      <ellipse cx={30} cy={46} rx={14} ry={13} fill={color} opacity={0.8} />
      {[18, 26, 34, 42].map((cx, i) => (
        <ellipse key={i} cx={cx} cy={26 - (i === 1 || i === 2 ? 4 : 0)} rx={5.5} ry={6} fill={color} opacity={0.85} />
      ))}
    </svg>
  );
}

function BirdTrack({ color }) {
  return (
    <svg viewBox="0 0 60 70" width={60} height={70}>
      {/* 3 forward toes */}
      <line x1={30} y1={50} x2={14} y2={22} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <line x1={30} y1={50} x2={30} y2={18} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <line x1={30} y1={50} x2={46} y2={22} stroke={color} strokeWidth={3} strokeLinecap="round" />
      {/* back toe */}
      <line x1={30} y1={50} x2={30} y2={62} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={30} cy={50} r={4} fill={color} />
    </svg>
  );
}

function RabbitTrack({ color }) {
  return (
    <svg viewBox="0 0 60 70" width={60} height={70}>
      {/* 2 large hind + 2 small front */}
      <ellipse cx={18} cy={28} rx={6} ry={14} fill={color} opacity={0.85} />
      <ellipse cx={42} cy={28} rx={6} ry={14} fill={color} opacity={0.85} />
      <ellipse cx={22} cy={52} rx={5} ry={8} fill={color} opacity={0.7} />
      <ellipse cx={38} cy={52} rx={5} ry={8} fill={color} opacity={0.7} />
    </svg>
  );
}

const TRACKS = [
  {
    id: 1, name: 'Ayı', en: 'Brown Bear', icon: '🐻', accent: '#b45309',
    size: '20-28 cm', gait: 'Plantigrad', habitat: ['Dağ ormanı', 'Yüksek yaylalar'],
    regions: ['Karadeniz', 'Doğu Anadolu'],
    desc: 'Beş tırnak izi, büyük topuk. Arka ayak izleri insan ayağına benzer.',
    diet: 'Her şey yiyen', activity: 'Gündüz/Alacak.',
    TrackSVG: BearPaw,
  },
  {
    id: 2, name: 'Kurt', en: 'Wolf', icon: '🐺', accent: '#6b7280',
    size: '9-10 cm', gait: 'Dijital', habitat: ['Bozkır', 'Orman', 'Dağlık arazi'],
    regions: ['Tüm Türkiye'],
    desc: '4 parmak izi. Köpek izine benzer ancak daha ovaldir, parmaklar daha yakın.',
    diet: 'Etçil', activity: 'Gece/Alacak.',
    TrackSVG: WolfPaw,
  },
  {
    id: 3, name: 'Geyik / Karaca', en: 'Deer / Roe', icon: '🦌', accent: '#92400e',
    size: '5-8 cm', gait: 'Ungulat', habitat: ['Orman', 'Yayla', 'Koruluk'],
    regions: ['Marmara', 'Karadeniz', 'Ege'],
    desc: 'İki yarım ay şeklinde tırnak izi. Yumuşak zeminde daha derin basan.'  ,
    diet: 'Otçul', activity: 'Şafak / Alacakaranlık',
    TrackSVG: DeerHoof,
  },
  {
    id: 4, name: 'Tavşan', en: 'Hare / Rabbit', icon: '🐇', accent: '#d97706',
    size: '4-12 cm', gait: 'Sıçrayış', habitat: ['Çalılık', 'Tarla', 'Orman kenarı'],
    regions: ['Tüm Türkiye'],
    desc: 'Büyük arka ayak önde, küçük ön ayak arkada — tipik "sıçrama" deseni.',
    diet: 'Otçul', activity: 'Alacak./Gece',
    TrackSVG: RabbitTrack,
  },
  {
    id: 5, name: 'Tilki', en: 'Red Fox', icon: '🦊', accent: '#ea580c',
    size: '4-5 cm', gait: 'Dijital', habitat: ['Orman', 'Tarla', 'Şehir çevresi'],
    regions: ['Tüm Türkiye'],
    desc: 'Küçük kedi benzeri ama parmaklar daha uzun. Çift çizgi yürüyüş deseni.',
    diet: 'Her şey yiyen', activity: 'Gece',
    TrackSVG: WolfPaw,
  },
  {
    id: 6, name: 'Kızıl Akbaba', en: 'Eagle / Vulture', icon: '🦅', accent: '#78350f',
    size: '12-18 cm', gait: 'Zygodactyl', habitat: ['Kayalık', 'Orman kenarı'],
    regions: ['Akdeniz', 'Ege', 'Doğu'],
    desc: '3 ileri, 1 geri parmak. Tırmık izleri belirgindir.',
    diet: 'Etçil', activity: 'Gündüz',
    TrackSVG: BirdTrack,
  },
  {
    id: 7, name: 'Domuz', en: 'Wild Boar', icon: '🐗', accent: '#374151',
    size: '6-8 cm', gait: 'Ungulat', habitat: ['Orman', 'Bataklık', 'Tarla kenarı'],
    regions: ['Tüm Türkiye'],
    desc: 'İki büyük ve iki küçük tırnak. Geyikten daha yuvarlak ve daha geniş.',
    diet: 'Her şey yiyen', activity: 'Gece/Alacak.',
    TrackSVG: DeerHoof,
  },
  {
    id: 8, name: 'Kedi (Vaşak)', en: 'Wildcat / Lynx', icon: '🐱', accent: '#a855f7',
    size: '6-10 cm', gait: 'Dijital', habitat: ['Orman', 'Dağlık'],
    regions: ['Doğu Anadolu', 'Karadeniz'],
    desc: '4 parmak, tırnak izi yok (geri çekilebilir). Yumuşak ve yuvarlak iz.',
    diet: 'Etçil', activity: 'Gece',
    TrackSVG: WolfPaw,
  },
];

function TrackCard({ t, onClick }) {
  const { TrackSVG } = t;
  return (
    <div onClick={() => onClick(t)} style={{
      background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
      border: `1px solid ${t.accent}44`, cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{ background: t.accent + '22', borderRadius: 12, padding: 6, border: `1px solid ${t.accent}44` }}>
        <TrackSVG color={t.accent} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>{t.icon}</span>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{t.name}</div>
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Boyut: {t.size} · {t.gait}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
          {t.habitat.map(h => (
            <span key={h} style={{ fontSize: 10, background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '2px 6px' }}>{h}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrackDetail({ t, onClose }) {
  const { TrackSVG } = t;
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ background: t.accent + '22', borderRadius: 12, padding: 8, border: `2px solid ${t.accent}44` }}>
            <TrackSVG color={t.accent} />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#f9fafb' }}>{t.icon} {t.name}</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>{t.en}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'İz Boyutu', value: t.size, icon: '📐' },
            { label: 'Yürüyüş Tipi', value: t.gait, icon: '🦶' },
            { label: 'Beslenme', value: t.diet, icon: '🍖' },
            { label: 'Aktivite', value: t.activity, icon: '🕐' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🗺️ BÖLGELER</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {t.regions.map(r => (
              <span key={r} style={{ background: t.accent + '22', color: t.accent, border: `1px solid ${t.accent}44`, borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600 }}>{r}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🔍 İZ TANIMI</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{t.desc}</div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '12px 14px', border: '1px solid #3b82f644' }}>
          <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>🏕️ HABİTAT</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {t.habitat.map(h => <span key={h} style={{ color: '#bfdbfe', fontSize: 13 }}>· {h}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnimalTracks() {
  const navigate  = useNavigate();
  const [search, setSearch]   = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return TRACKS.filter(t => !q || t.name.toLowerCase().includes(q) || t.en.toLowerCase().includes(q) || t.habitat.some(h => h.toLowerCase().includes(q)));
  }, [search]);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦶 Hayvan İzleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>8 tür · iz tanıma rehberi</div>
      </div>

      <div style={{ padding: '0 16px 14px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Hayvan veya habitat ara…"
          style={{ width: '100%', boxSizing: 'border-box', background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}
        />
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} hayvan türü</div>
        {filtered.map(t => <TrackCard key={t.id} t={t} onClick={setSelected} />)}
      </div>

      {selected && <TrackDetail t={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
