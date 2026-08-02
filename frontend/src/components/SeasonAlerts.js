import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// All dates are for 2025-2026 seasons (MAK typical)
const SEASONS = [
  {
    id: 1, name: 'Keklik (Kınalı)', icon: '🐦', category: 'Av',
    accent: '#f59e0b',
    open: '2025-09-01', close: '2025-12-31',
    region: 'Tüm Türkiye', quota: 'Günlük 10 adet',
    permit: 'Standart avcılık belgesi', method: 'Tüfek, av köpeği ile',
    note: 'MAK kararına göre bazı illerde erken kapanma olabilir.',
  },
  {
    id: 2, name: 'Tavşan', icon: '🐇', category: 'Av',
    accent: '#d97706',
    open: '2025-10-01', close: '2026-01-31',
    region: 'Tüm Türkiye', quota: 'Günlük 5 adet',
    permit: 'Standart avcılık belgesi', method: 'Tüfek, ferret veya av köpeği',
    note: 'Nesil baskısı nedeniyle bazı illerde kısıtlı olabilir.',
  },
  {
    id: 3, name: 'Yabani Domuz', icon: '🐗', category: 'Av',
    accent: '#374151',
    open: '2025-01-01', close: '2025-12-31',
    region: 'Tüm Türkiye', quota: 'Kota yok',
    permit: 'Standart avcılık belgesi', method: 'Her yöntemle (gece dahil)',
    note: 'Yıl boyunca açık. Tarım zararı nedeniyle teşvik edilmektedir.',
  },
  {
    id: 4, name: 'Bıldırcın', icon: '🐦', category: 'Av',
    accent: '#84cc16',
    open: '2025-08-15', close: '2025-10-31',
    region: 'Tüm Türkiye', quota: 'Günlük 20 adet',
    permit: 'Standart avcılık belgesi', method: 'Tüfek, av köpeği ile',
    note: 'Göç dönemi dolayısıyla kısa sezon.',
  },
  {
    id: 5, name: 'Keklik (Kaya)', icon: '🦅', category: 'Av',
    accent: '#ef4444',
    open: '2025-09-15', close: '2025-11-30',
    region: 'Doğu ve Güneydoğu', quota: 'Günlük 4 adet',
    permit: 'Özel bölge izni + standart belge', method: 'Tüfek',
    note: 'Habitat kısıtlamaları nedeniyle sınırlı av sahası.',
  },
  {
    id: 6, name: 'Levrek (Deniz)', icon: '🐟', category: 'Balık',
    accent: '#06b6d4',
    open: '2025-01-01', close: '2025-12-31',
    region: 'Ege & Akdeniz', quota: 'Günlük 5 adet / min. 25cm',
    permit: 'Sportif balıkçılık kartı', method: 'Olta, jigging',
    note: 'Nisan-Haziran üreme dönemi: av yasaklı.',
  },
  {
    id: 7, name: 'Palamut', icon: '🐟', category: 'Balık',
    accent: '#22c55e',
    open: '2025-09-01', close: '2025-12-15',
    region: 'Karadeniz, Boğaz', quota: 'Kota yok (min. 30cm)',
    permit: 'Yok (sportif)', method: 'Olta, trolling, el oltası',
    note: 'Sonbahar göç sezonu. Boğaz geçişi Eylül-Kasım yoğun.',
  },
  {
    id: 8, name: 'Alabalık', icon: '🐡', category: 'Balık',
    accent: '#38bdf8',
    open: '2025-04-01', close: '2025-10-31',
    region: 'Dağ nehirleri', quota: 'Günlük 5 adet / min. 22cm',
    permit: 'İl bazlı sportif balıkçı kartı', method: 'Fly fishing, olta',
    note: 'Kış döneminde nehirlerde üreme koruma kapsamında.',
  },
  {
    id: 9, name: 'Çipura', icon: '🐟', category: 'Balık',
    accent: '#f59e0b',
    open: '2025-01-01', close: '2025-12-31',
    region: 'Ege & Akdeniz', quota: 'Günlük 5 adet / min. 20cm',
    permit: 'Sportif balıkçılık kartı', method: 'Olta, jigging',
    note: 'Ekim-Aralık üreme dönemi kapsamlı sezon kısıtlaması.',
  },
  {
    id: 10, name: 'Kalkan', icon: '🐠', category: 'Balık',
    accent: '#a855f7',
    open: '2025-06-15', close: '2025-12-31',
    region: 'Karadeniz', quota: 'Günlük 2 adet / min. 45cm',
    permit: 'Sportif balıkçılık kartı', method: 'Uzatma, olta',
    note: 'Koruma altında. Minimum boy titizlikle uygulanmalı.',
  },
];

function daysUntil(dateStr) {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function seasonStatus(open, close) {
  const now = new Date();
  const o = new Date(open);
  const c = new Date(close);
  if (now >= o && now <= c) return 'open';
  if (now < o) return 'upcoming';
  return 'closed';
}

function StatusChip({ status, open, close }) {
  if (status === 'open') return <span style={{ background: '#14532d', color: '#86efac', border: '1px solid #22c55e44', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700 }}>🟢 AÇIK</span>;
  if (status === 'upcoming') {
    const d = daysUntil(open);
    return <span style={{ background: '#1e3a5f', color: '#93c5fd', border: '1px solid #3b82f644', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700 }}>{d > 0 ? `⏳ ${d} GÜN` : '🔜 YAKINDA'}</span>;
  }
  return <span style={{ background: '#1f2937', color: '#6b7280', border: '1px solid #374151', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700 }}>❌ KAPALI</span>;
}

function SeasonCard({ s }) {
  const [open2, setOpen2] = useState(false);
  const status = seasonStatus(s.open, s.close);

  return (
    <div style={{ background: '#1f2937', borderRadius: 14, marginBottom: 10, border: `1px solid ${s.accent}33`, overflow: 'hidden' }}>
      <button onClick={() => setOpen2(!open2)} style={{ width: '100%', background: 'none', border: 'none', padding: '14px 16px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28 }}>{s.icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{s.name}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.open} → {s.close}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <StatusChip status={status} open={s.open} close={s.close} />
          <span style={{ fontSize: 14, color: '#6b7280' }}>{open2 ? '▲' : '▼'}</span>
        </div>
      </button>

      {open2 && (
        <div style={{ padding: '0 16px 14px', borderTop: '1px solid #374151' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 12, marginBottom: 12 }}>
            {[
              { label: 'Bölge', value: s.region, icon: '🗺️' },
              { label: 'Kota', value: s.quota, icon: '📊' },
              { label: 'İzin', value: s.permit, icon: '📋' },
              { label: 'Yöntem', value: s.method, icon: '🎯' },
            ].map(item => (
              <div key={item.label} style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ fontSize: 10, color: '#6b7280' }}>{item.icon} {item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#f9fafb', marginTop: 1 }}>{item.value}</div>
              </div>
            ))}
          </div>
          {s.note && (
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '10px 12px', border: '1px solid #3b82f644' }}>
              <div style={{ fontSize: 10, color: '#93c5fd', fontWeight: 600, marginBottom: 2 }}>ℹ️ NOT</div>
              <div style={{ fontSize: 12, color: '#bfdbfe', lineHeight: 1.6 }}>{s.note}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SeasonAlerts() {
  const navigate = useNavigate();
  const [cat, setCat] = useState('Tümü');
  const [statusFilter, setStatusFilter] = useState('Tümü');

  const filtered = useMemo(() => SEASONS.filter(s => {
    const matchCat = cat === 'Tümü' || s.category === cat;
    const status = seasonStatus(s.open, s.close);
    const matchStatus = statusFilter === 'Tümü' || (statusFilter === 'Açık' && status === 'open') || (statusFilter === 'Yakında' && status === 'upcoming');
    return matchCat && matchStatus;
  }), [cat, statusFilter]);

  const openCount = SEASONS.filter(s => seasonStatus(s.open, s.close) === 'open').length;
  const upcomingCount = SEASONS.filter(s => seasonStatus(s.open, s.close) === 'upcoming').length;

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📅 Sezon Uyarıları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>10 tür · av ve balık sezonu takibi</div>
      </div>

      {/* Summary */}
      <div style={{ margin: '0 16px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ background: '#14532d', borderRadius: 12, padding: '12px 14px', border: '1px solid #22c55e44', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#86efac' }}>{openCount}</div>
          <div style={{ fontSize: 11, color: '#86efac' }}>Açık Sezon</div>
        </div>
        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '12px 14px', border: '1px solid #3b82f644', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#93c5fd' }}>{upcomingCount}</div>
          <div style={{ fontSize: 11, color: '#93c5fd' }}>Yaklaşan Sezon</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '0 16px 8px', display: 'flex', gap: 8 }}>
        {['Tümü', 'Av', 'Balık'].map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            background: cat === c ? '#3b82f6' : '#1f2937', color: cat === c ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: cat === c ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{c}</button>
        ))}
      </div>
      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        {['Tümü', 'Açık', 'Yakında'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{
            background: statusFilter === s ? '#374151' : '#1f2937', color: statusFilter === s ? '#f9fafb' : '#6b7280',
            border: '1px solid #374151', borderRadius: 20, padding: '5px 14px', fontSize: 12, cursor: 'pointer',
          }}>{s}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {filtered.map(s => <SeasonCard key={s.id} s={s} />)}
      </div>
    </div>
  );
}
