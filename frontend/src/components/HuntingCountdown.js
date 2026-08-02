import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const YEAR = new Date().getFullYear();

const SEASONS = [
  {
    id: 'keklik', name: 'Keklik', icon: '🐦', accent: '#f59e0b',
    openDate: new Date(`${YEAR}-09-01`),
    closeDate: new Date(`${YEAR}-11-30`),
    regions: 'Ege, Akdeniz, İç Anadolu',
    limit: 'Günlük 5 adet',
    license: 'Av ruhsatı + bölge izni',
    note: 'Sabah 6-9 ve akşamüstü en aktif dönem. Köpekli avlanma önerilir.',
    gear: 'Pompalı veya av tüfeği, av köpeği',
  },
  {
    id: 'tavsan', name: 'Tavşan', icon: '🐇', accent: '#a78bfa',
    openDate: new Date(`${YEAR}-09-01`),
    closeDate: new Date(`${YEAR+1}-01-31`),
    regions: 'Tüm Türkiye',
    limit: 'Günlük 3 adet',
    license: 'Av ruhsatı yeterli',
    note: 'Kar yağışından sonra iz takibi çok etkili. Tarlalar ve orman kenarları.',
    gear: 'Av tüfeği, tazı köpek',
  },
  {
    id: 'yaban_domuz', name: 'Yaban Domuzu', icon: '🐗', accent: '#ef4444',
    openDate: new Date(`${YEAR}-01-01`),
    closeDate: new Date(`${YEAR}-12-31`),
    regions: 'Tüm Türkiye (tüm yıl)',
    limit: 'Sınır yok (tarım zararlısı)',
    license: 'Özel domuz avı izni',
    note: 'Gece avı mümkün. Termal optik avantaj sağlar. Taşlık ormanlık alanlar.',
    gear: 'Büyük kalibre tüfek, dürbün, termal',
  },
  {
    id: 'geyik', name: 'Kızıl Geyik', icon: '🦌', accent: '#84cc16',
    openDate: new Date(`${YEAR}-10-01`),
    closeDate: new Date(`${YEAR}-11-30`),
    regions: 'Belirli orman işletmeleri (izinle)',
    limit: 'Tahsis usulüyle',
    license: 'OGM izin belgesi şart',
    note: 'Ökse ve erken sabah çağrısı etkili. Rut (çiftleşme) döneminde aktif.',
    gear: 'Büyük kalibre tüfek, dürbün, çağrı düdüğü',
  },
  {
    id: 'bozayı', name: 'Boz Ayı', icon: '🐻', accent: '#92400e',
    openDate: new Date(`${YEAR}-05-01`),
    closeDate: new Date(`${YEAR}-06-30`),
    regions: 'Kuzey Anadolu (sınırlı kota)',
    limit: 'OGM kota tahsisi',
    license: 'OGM + özel tahsis zorunlu',
    note: 'Çok sıkı kota kontrolü. Tüm avlanma OGM denetiminde yapılır.',
    gear: 'Büyük kalibre tüfek',
  },
  {
    id: 'culluk', name: 'Çulluk', icon: '🐤', accent: '#06b6d4',
    openDate: new Date(`${YEAR}-10-15`),
    closeDate: new Date(`${YEAR}-12-31`),
    regions: 'Kuzey-batı Türkiye, Ege',
    limit: 'Günlük 3 adet',
    license: 'Av ruhsatı + göçmen kuş izni',
    note: 'Göç döneminde orman kenarlarında. Sabah ve akşam aktif. Köpek şart.',
    gear: 'Çift namlulu av tüfeği, av köpeği',
  },
  {
    id: 'yaban_orduğu', name: 'Yaban Ördeği', icon: '🦆', accent: '#3b82f6',
    openDate: new Date(`${YEAR}-09-01`),
    closeDate: new Date(`${YEAR+1}-01-31`),
    regions: 'Göl ve sulak alanlar',
    limit: 'Günlük 5 adet',
    license: 'Av ruhsatı + sulak alan izni',
    note: 'Tan ağarması ve gün batımı en iyi dönem. Gizleme panosu kullanın.',
    gear: 'Av tüfeği, ördek yemi (decoy), çağrı düdüğü',
  },
];

function getStatus(open, close) {
  const now = Date.now();
  const o = open.getTime();
  const c = close.getTime();
  if (now < o) return 'upcoming';
  if (now > c) {
    // Check next year
    return 'closed';
  }
  return 'open';
}

function msToCountdown(ms) {
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

function CountdownBox({ label, val }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 26, fontWeight: 900, color: '#f9fafb', fontVariantNumeric: 'tabular-nums' }}>
        {String(val).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 9, color: '#6b7280', marginTop: 1 }}>{label}</div>
    </div>
  );
}

export default function HuntingCountdown() {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);
  const [sel, setSel] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const now = Date.now();

  const enriched = SEASONS.map(s => {
    const status = getStatus(s.openDate, s.closeDate);
    let targetMs, targetLabel;
    if (status === 'upcoming') {
      targetMs = s.openDate.getTime() - now;
      targetLabel = 'Sezon Açılışına';
    } else if (status === 'open') {
      targetMs = s.closeDate.getTime() - now;
      targetLabel = 'Sezon Kapanışına';
    } else {
      // Closed: show next year's open date
      const nextOpen = new Date(s.openDate);
      nextOpen.setFullYear(YEAR + 1);
      targetMs = nextOpen.getTime() - now;
      targetLabel = 'Sonraki Sezona';
    }
    return { ...s, status, targetMs, targetLabel };
  });

  const filtered = filter === 'all' ? enriched
    : filter === 'open' ? enriched.filter(s => s.status === 'open')
    : enriched.filter(s => s.status === 'upcoming');

  const openCount = enriched.filter(s => s.status === 'open').length;

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏹 Sezon Geri Sayımı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Av sezonu canlı geri sayım sayacı</div>
      </div>

      {/* Summary banner */}
      <div style={{ margin: '0 16px 12px', background: openCount > 0 ? '#052e16' : '#1f2937', borderRadius: 14, padding: 14, border: `1px solid ${openCount > 0 ? '#16a34a44' : '#374151'}`, display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ fontSize: 32 }}>{openCount > 0 ? '🟢' : '🔴'}</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: openCount > 0 ? '#22c55e' : '#9ca3af' }}>
            {openCount > 0 ? `${openCount} Sezon Açık` : 'Sezon Kapalı'}
          </div>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
            {openCount > 0
              ? `${enriched.filter(s => s.status === 'open').map(s => s.name).join(', ')}`
              : 'Tüm av sezonları kapalı'}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['all', 'Tümü'], ['open', '🟢 Açık'], ['upcoming', '⏳ Yaklaşan']].map(([id, lbl]) => (
          <button key={id} onClick={() => setFilter(id)} style={{
            flex: 1, background: filter === id ? '#3b82f6' : '#1f2937', color: filter === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: filter === id ? '#3b82f6' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {filtered.map(s => {
          const cd = msToCountdown(s.targetMs);
          const isOpen = s.status === 'open';
          const color = isOpen ? '#22c55e' : s.status === 'upcoming' ? s.accent : '#9ca3af';
          const bg = isOpen ? '#052e16' : '#1f2937';
          const borderColor = isOpen ? '#16a34a44' : s.accent + '33';

          return (
            <div key={s.id} onClick={() => setSel(sel?.id === s.id ? null : s)}
              style={{ background: bg, borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${borderColor}`, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginTop: 1 }}>{s.openDate.toLocaleDateString('tr-TR')} – {s.closeDate.toLocaleDateString('tr-TR')}</div>
                  </div>
                </div>
                <span style={{ background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>
                  {isOpen ? 'AÇIK' : s.status === 'upcoming' ? 'YAKINDA' : 'KAPALI'}
                </span>
              </div>

              <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 6 }}>{s.targetLabel.toUpperCase()}</div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', background: '#111827', borderRadius: 10, padding: '12px 8px' }}>
                <CountdownBox label="GÜN" val={cd.d} />
                <div style={{ color: '#374151', fontSize: 22, fontWeight: 900, alignSelf: 'center' }}>:</div>
                <CountdownBox label="SAAT" val={cd.h} />
                <div style={{ color: '#374151', fontSize: 22, fontWeight: 900, alignSelf: 'center' }}>:</div>
                <CountdownBox label="DAK" val={cd.m} />
                <div style={{ color: '#374151', fontSize: 22, fontWeight: 900, alignSelf: 'center' }}>:</div>
                <CountdownBox label="SAN" val={cd.s} />
              </div>

              {sel?.id === s.id && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #374151' }}>
                  {[
                    ['📍 Bölge', s.regions],
                    ['🎯 Günlük Limit', s.limit],
                    ['📄 Ruhsat', s.license],
                    ['🔫 Ekipman', s.gear],
                  ].map(([lbl, val]) => (
                    <div key={lbl} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: '#6b7280', flexShrink: 0, width: 80 }}>{lbl}</span>
                      <span style={{ fontSize: 11, color: '#d1d5db' }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, background: s.accent + '15', borderRadius: 10, padding: '10px 12px', border: `1px solid ${s.accent}33` }}>
                    <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{s.note}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
