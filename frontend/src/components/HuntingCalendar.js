import React, { useState } from 'react';

const TR_MONTHS = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];

const GAME = [
  {
    id: 'tav',
    name: 'Keklik (Tav)',
    icon: '🐦',
    color: '#f59e0b',
    category: 'Kır Avı',
    seasons: [
      { start: 9, end: 12, label: 'Ana Sezon', color: '#22c55e' },
    ],
    regions: 'Tüm Türkiye',
    minAge: 18,
    license: 'Avlak ruhsatı gerekli',
    notes: 'Keklik Türkiye\'nin en yaygın kır avı kuşu. Sezon bölgeye göre değişebilir.',
    tips: ['Sabah erken ve akşam üstü en aktif zaman', 'Belgelenmiş ve ruhsatlı avlak alanları kullanın', 'Üretme sezonunda (Mart-Ağustos) kesinlikle yasak'],
  },
  {
    id: 'sülün',
    name: 'Sülün',
    icon: '🦜',
    color: '#84cc16',
    category: 'Kır Avı',
    seasons: [
      { start: 10, end: 12, label: 'Sezon', color: '#22c55e' },
    ],
    regions: 'Batı Türkiye, Ege, Trakya',
    minAge: 18,
    license: 'Avlak ruhsatı + özel izin',
    notes: 'Sülün koyunulan alanlarda avlanabilir. Doğada çok nadir.',
    tips: ['Sülün çiftliklerinden bırakılan örnek avlar yaygın', 'Av köpeği kullanımı başarıyı artırır'],
  },
  {
    id: 'tavşan',
    name: 'Yabani Tavşan',
    icon: '🐰',
    color: '#f97316',
    category: 'Memeli Av',
    seasons: [
      { start: 10, end: 1, label: 'Kış Sezonu', color: '#38bdf8' },
    ],
    regions: 'Tüm Türkiye',
    minAge: 18,
    license: 'Avlak ruhsatı',
    notes: 'Yabani tavşan Türkiye genelinde en çok avlanan memelilerden biridir.',
    tips: ['Kar üzerinde iz takip çok etkili', 'Tazı ve köpek ile av sonuç verir', 'Yüksek av baskısı olan bölgelerden kaçının'],
  },
  {
    id: 'domuz',
    name: 'Yaban Domuzu',
    icon: '🐗',
    color: '#94a3b8',
    category: 'Memeli Av',
    seasons: [
      { start: 7, end: 3, label: 'Uzun Sezon', color: '#22c55e' },
    ],
    regions: 'Tüm Türkiye (ormanlık alanlar)',
    minAge: 18,
    license: 'Özel ruhsat (zararlı tür)',
    notes: 'Yaban domuzu tarım arazilerine zarar verdiği için yıl boyunca avlanabilir. Bazı bölgelerde sınırsız kota.',
    tips: ['Gece avı çok yaygın', 'Termal dürbün kullanımı avantaj sağlar', 'Grup halinde avlanılması güvenlidir'],
  },
  {
    id: 'karaca',
    name: 'Karaca',
    icon: '🦌',
    color: '#c084fc',
    category: 'Büyük Av',
    seasons: [
      { start: 9, end: 11, label: 'Erkek Sezonu', color: '#f59e0b' },
    ],
    regions: 'İç Anadolu, Ege, Marmara ormanları',
    minAge: 18,
    license: 'Kotaya tabi özel ruhsat + ücret',
    notes: 'Karaca Türkiye\'de korunan türdür. Kota dahilinde özel alanlarda avlanabilir.',
    tips: ['Şafakta ve gün batımında en aktif', 'Çayır ve orman sınırını tercih eder', 'Sesli çağrı (rut sezonu Eylül) çok etkili'],
  },
  {
    id: 'çulluk',
    name: 'Çulluk',
    icon: '🐤',
    color: '#ec4899',
    category: 'Orman Avı',
    seasons: [
      { start: 10, end: 12, label: 'Güz Geçişi', color: '#f97316' },
      { start: 2, end: 3, label: 'İlkbahar Geçişi', color: '#22c55e' },
    ],
    regions: 'Tüm Türkiye (geçiş yolu)',
    minAge: 18,
    license: 'Avlak ruhsatı',
    notes: 'Göçmen kuş. Sonbahar ve ilkbahar geçişinde avlanılabilir. Zorlu kır avı.',
    tips: ['Ormanlık ve rutubetli alanları tercih eder', 'Köpek ile av vazgeçilmez', 'Akşam saatlerinde uçuş yoğunluğu artar'],
  },
  {
    id: 'ördek',
    name: 'Yabani Ördek',
    icon: '🦆',
    color: '#22c55e',
    category: 'Su Avı',
    seasons: [
      { start: 8, end: 1, label: 'Göç Sezonu', color: '#38bdf8' },
    ],
    regions: 'Kıyı gölleri, sulak alanlar',
    minAge: 18,
    license: 'Avlak ruhsatı + av bölgesi izni',
    notes: 'Sulak alanlarda avlanılır. Göç döneminde büyük sürüler oluşturur.',
    tips: ['Sabah sisi en iyi koşul', 'Ses kapanı (decoy) çekicilik sağlar', 'Doğal kamufaj kullanın'],
  },
  {
    id: 'bıldırcın',
    name: 'Bıldırcın',
    icon: '🐣',
    color: '#fbbf24',
    category: 'Kır Avı',
    seasons: [
      { start: 8, end: 9, label: 'Göç Sezonu', color: '#22c55e' },
    ],
    regions: 'Tüm Türkiye (güneyde daha yoğun)',
    minAge: 18,
    license: 'Avlak ruhsatı',
    notes: 'Yazın en popüler kır avı. Göç döneminde kıyılarda yoğun bulunur.',
    tips: ['Saatlerce eğilmeniz gerekebilir', 'Av köpeği ile birlikte avlanın', 'Anızlık tarlalar ideal'],
  },
];

const CATEGORIES = ['Tümü', 'Kır Avı', 'Memeli Av', 'Büyük Av', 'Orman Avı', 'Su Avı'];

function MonthBar({ seasons }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
      {TR_MONTHS.map((m, i) => {
        const mo = i + 1;
        const active = seasons.find(s => {
          if (s.end >= s.start) return mo >= s.start && mo <= s.end;
          return mo >= s.start || mo <= s.end;
        });
        return (
          <div key={m} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              height: 14, borderRadius: 3, marginBottom: 2,
              background: active ? active.color : 'var(--s3)',
            }} />
            <div style={{ fontSize: 7, color: 'var(--t-mute)' }}>{m.slice(0,3)}</div>
          </div>
        );
      })}
    </div>
  );
}

function GameCard({ game }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{
      background: 'var(--s2)', border: '1px solid var(--border)',
      borderRadius: 16, marginBottom: 8, overflow: 'hidden',
    }}>
      <button onClick={() => setExpanded(!expanded)} style={{
        width: '100%', padding: 14, textAlign: 'left', cursor: 'pointer',
        background: 'transparent', border: 'none', color: 'inherit',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: game.color + '20', border: `1px solid ${game.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}>{game.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>{game.name}</div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: game.color, background: game.color+'15', borderRadius: 6, padding: '2px 7px', fontWeight: 600 }}>
                {game.category}
              </span>
              {game.seasons.map(s => (
                <span key={s.label} style={{ fontSize: 10, color: s.color, fontWeight: 600 }}>· {s.label}</span>
              ))}
            </div>
          </div>
          <span style={{ fontSize: 14, color: 'var(--t-mute)', transition: 'transform .2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>▾</span>
        </div>
        <MonthBar seasons={game.seasons} />
      </button>

      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)', padding: 14 }}>
          <div style={{ fontSize: 12, color: 'var(--t-mid)', lineHeight: 1.6, marginBottom: 10 }}>{game.notes}</div>
          {[
            ['🗺️', 'Bölge', game.regions],
            ['🪪', 'Lisans', game.license],
            ['🎂', 'Min Yaş', `${game.minAge} yaş`],
          ].map(([ic, lab, val]) => (
            <div key={lab} style={{ display: 'flex', gap: 8, padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 11, color: 'var(--t-mute)', minWidth: 60 }}>{ic} {lab}</span>
              <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>{val}</span>
            </div>
          ))}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', marginBottom: 6 }}>💡 AV İPUÇLARI</div>
            {game.tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                <span style={{ color: game.color, fontSize: 11, flexShrink: 0 }}>•</span>
                <span style={{ fontSize: 11, color: 'var(--t-mid)', lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HuntingCalendar() {
  const [category, setCategory] = useState('Tümü');

  const nowMonth = new Date().getMonth() + 1;

  const filtered = GAME.filter(g => category === 'Tümü' || g.category === category);

  const activeNow = GAME.filter(g => g.seasons.some(s => {
    if (s.end >= s.start) return nowMonth >= s.start && nowMonth <= s.end;
    return nowMonth >= s.start || nowMonth <= s.end;
  }));

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #0d1500 0%, #1a2300 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🏹 Av Takvimi</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Türkiye av sezonu ve kuralları rehberi</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Active now banner */}
        {activeNow.length > 0 && (
          <div style={{
            background: '#22c55e10', border: '1px solid #22c55e30',
            borderRadius: 14, padding: '10px 14px', marginBottom: 14,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', marginBottom: 6 }}>
              ✅ {TR_MONTHS[nowMonth-1]} AYI AKTİF AVLAR
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {activeNow.map(g => (
                <span key={g.id} style={{
                  fontSize: 12, background: 'var(--s2)', borderRadius: 8, padding: '3px 9px',
                  border: `1px solid ${g.color}40`, color: g.color, fontWeight: 600,
                }}>{g.icon} {g.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* Legal notice */}
        <div style={{
          background: '#ef444408', border: '1px solid #ef444430',
          borderRadius: 12, padding: '10px 14px', marginBottom: 14,
          fontSize: 11, color: '#fca5a5', lineHeight: 1.5,
        }}>
          ⚠️ Av faaliyetleri Orman, Su İşleri ve Tarım Bakanlığı'nın güncel tebliğlerine tabidir. Bu bilgiler genel rehber niteliğindedir.
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 2, marginBottom: 14 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              flexShrink: 0, padding: '6px 12px', borderRadius: 16, cursor: 'pointer',
              background: category === c ? 'var(--a-glow)' : 'var(--s2)',
              border: category === c ? '1px solid var(--border-lg)' : '1px solid var(--border)',
              color: category === c ? 'var(--a-light)' : 'var(--t-mute)',
              fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
            }}>{c}</button>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          {[['#22c55e','Sezon (Ana)'], ['#38bdf8','Sezon (Geçiş)'], ['#f59e0b','Kısmi Sezon']].map(([c,l]) => (
            <div key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:'var(--t-mute)' }}>
              <div style={{ width:12, height:8, borderRadius:2, background:c }} />
              {l}
            </div>
          ))}
        </div>

        {/* Game cards */}
        {filtered.map(g => <GameCard key={g.id} game={g} />)}

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
