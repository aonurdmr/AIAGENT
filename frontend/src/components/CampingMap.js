import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CAMPS = [
  {
    id: 1, name: 'Ölüdeniz Kamp', region: 'Ege', icon: '🏖️', accent: '#06b6d4',
    type: 'Sahil', lat: 36.55, lng: 29.12,
    elevation: '5m', capacity: '120 kişi', fee: 'Ücretli (₺150/gece)',
    facilities: ['Duş', 'WC', 'Elektrik', 'Market', 'Wi-Fi'],
    activities: ['Yüzme', 'Yamaç paraşütü', 'Kayak'],
    season: 'Nisan–Ekim', rating: 4.8,
    desc: 'Turkuaz lagünle ünlü Ölüdeniz\'de doğrudan sahil kampı. Yamaç paraşütü için dünya merkezi.',
  },
  {
    id: 2, name: 'Kaçkar Yüksek Kamp', region: 'Karadeniz', icon: '🏔️', accent: '#22c55e',
    type: 'Dağ', lat: 40.85, lng: 41.10,
    elevation: '2800m', capacity: '30 kişi', fee: 'Ücretsiz',
    facilities: ['Kaynak suyu', 'Dağ evi yakın'],
    activities: ['Trekking', 'Tırmanış', 'Fotoğrafçılık'],
    season: 'Haziran–Eylül', rating: 4.9,
    desc: 'Kaçkar Dağları\'nın zirvesine yakın yüksek plato. Görünüm muhteşem, ulaşım zorlu.',
  },
  {
    id: 3, name: 'Sapanca Göl Kampı', region: 'Marmara', icon: '🏞️', accent: '#3b82f6',
    type: 'Göl', lat: 40.68, lng: 30.28,
    elevation: '32m', capacity: '80 kişi', fee: 'Ücretli (₺100/gece)',
    facilities: ['Duş', 'WC', 'Barbekü', 'Otopark'],
    activities: ['Balıkçılık', 'Kano', 'Yürüyüş'],
    season: 'Mart–Kasım', rating: 4.5,
    desc: 'İstanbul\'a 1,5 saatlik mesafede gölkenarı huzurlu kamp alanı.',
  },
  {
    id: 4, name: 'Göreme Vadisi Kamp', region: 'İç Anadolu', icon: '🗿', accent: '#f59e0b',
    type: 'Vadi', lat: 38.64, lng: 34.83,
    elevation: '1100m', capacity: '60 kişi', fee: 'Ücretli (₺120/gece)',
    facilities: ['Duş', 'WC', 'Elektrik', 'Peri bacaları manzarası'],
    activities: ['Balon turu', 'Yürüyüş', 'Bisiklet', 'ATV'],
    season: 'Yıl boyu', rating: 4.7,
    desc: 'Kapadokya\'nın ikonik peri bacaları arasında eşsiz kamp deneyimi.',
  },
  {
    id: 5, name: 'Uzungöl Orman Kampı', region: 'Karadeniz', icon: '🌿', accent: '#84cc16',
    type: 'Orman', lat: 40.62, lng: 40.28,
    elevation: '1100m', capacity: '50 kişi', fee: 'Ücretli (₺80/gece)',
    facilities: ['WC', 'Su', 'Mangal'],
    activities: ['Balıkçılık', 'Doğa yürüyüşü', 'Fotoğrafçılık'],
    season: 'Mayıs–Ekim', rating: 4.6,
    desc: 'Karadeniz ormanları içinde huzurlu bir gölde kamp. Sisli sabahlar büyüleyici.',
  },
  {
    id: 6, name: 'Adrasan Koyu Kamp', region: 'Akdeniz', icon: '🌊', accent: '#06b6d4',
    type: 'Koyu', lat: 36.36, lng: 30.41,
    elevation: '3m', capacity: '100 kişi', fee: 'Ücretli (₺130/gece)',
    facilities: ['Duş', 'WC', 'Restoran', 'Tekne kiralama'],
    activities: ['Yüzme', 'Dalış', 'Mavi Yolculuk', 'Kayık'],
    season: 'Nisan–Ekim', rating: 4.8,
    desc: 'Likya yolu üzerinde sakin bir koyu. Kalabalıktan uzak otantik deniz kampı.',
  },
  {
    id: 7, name: 'Nemrut Dağı Kamp', region: 'Doğu Anadolu', icon: '🌄', accent: '#ef4444',
    type: 'Dağ', lat: 37.98, lng: 38.74,
    elevation: '2150m', capacity: '40 kişi', fee: 'Ücretli (₺90/gece)',
    facilities: ['Yurt', 'WC', 'Kamp ateşi alanı'],
    activities: ['Gündoğumu izleme', 'Fotoğrafçılık', 'Tarih turu'],
    season: 'Mayıs–Eylül', rating: 4.7,
    desc: 'Dev heykellerle ünlü Nemrut\'a yakın, gündoğumu için eşsiz yüksek kamp.',
  },
  {
    id: 8, name: 'Köyceğiz Göl Kampı', region: 'Ege', icon: '🦢', accent: '#a855f7',
    type: 'Göl', lat: 36.97, lng: 28.68,
    elevation: '5m', capacity: '70 kişi', fee: 'Ücretli (₺110/gece)',
    facilities: ['Duş', 'WC', 'Tekne', 'Doğal çamur banyosu'],
    activities: ['Kano', 'Tekne', 'Çamur banyosu', 'Balıkçılık'],
    season: 'Mart–Kasım', rating: 4.6,
    desc: 'Doğal çamur banyosuyla ünlü Köyceğiz Gölü kenarında benzersiz doğa deneyimi.',
  },
];

const TYPES = ['Tümü', 'Sahil', 'Dağ', 'Göl', 'Orman', 'Vadi', 'Koyu'];

function Stars({ rating }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#fbbf24' : '#374151', fontSize: 12 }}>★</span>
      ))}
      <span style={{ fontSize: 11, color: '#6b7280', marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

function CampCard({ camp, onClick }) {
  return (
    <div onClick={() => onClick(camp)} style={{ background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${camp.accent}44`, cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ fontSize: 36, lineHeight: 1 }}>{camp.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{camp.name}</div>
            <Stars rating={camp.rating} />
          </div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2, marginBottom: 6 }}>
            📍 {camp.region} · {camp.type} · {camp.elevation}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, background: camp.accent + '22', color: camp.accent, border: `1px solid ${camp.accent}44`, borderRadius: 8, padding: '2px 8px' }}>{camp.season}</span>
            <span style={{ fontSize: 10, background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '2px 8px' }}>{camp.fee.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampDetail({ camp, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 52 }}>{camp.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{camp.name}</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2, marginBottom: 4 }}>{camp.region} · {camp.type}</div>
            <Stars rating={camp.rating} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'Yükseklik', value: camp.elevation, icon: '⛰️' },
            { label: 'Kapasite', value: camp.capacity, icon: '👥' },
            { label: 'Ücret', value: camp.fee, icon: '💰' },
            { label: 'Sezon', value: camp.season, icon: '📅' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb', marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>📋 AÇIKLAMA</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{camp.desc}</div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🏗️ TESİSLER</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {camp.facilities.map(f => (
              <span key={f} style={{ background: camp.accent + '22', color: camp.accent, border: `1px solid ${camp.accent}44`, borderRadius: 8, padding: '4px 10px', fontSize: 12 }}>{f}</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🎯 AKTİVİTELER</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {camp.activities.map(a => (
              <span key={a} style={{ background: '#374151', color: '#d1d5db', borderRadius: 8, padding: '4px 10px', fontSize: 12 }}>{a}</span>
            ))}
          </div>
        </div>

        <a
          href={`https://www.google.com/maps?q=${camp.lat},${camp.lng}`}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textAlign: 'center', background: '#3b82f6', color: '#fff', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
        >
          🗺️ Google Maps\'te Aç
        </a>
      </div>
    </div>
  );
}

export default function CampingMap() {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState('Tümü');
  const [selected, setSelected] = useState(null);

  const filtered = CAMPS.filter(c => typeFilter === 'Tümü' || c.type === typeFilter);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏕️ Kamp Noktaları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>8 kamp yeri · Türkiye\'nin en güzel noktaları</div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {TYPES.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} style={{
            background: typeFilter === t ? '#22c55e' : '#1f2937',
            color: typeFilter === t ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: typeFilter === t ? '#22c55e' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} kamp alanı</div>
        {filtered.map(c => <CampCard key={c.id} camp={c} onClick={setSelected} />)}
      </div>

      {selected && <CampDetail camp={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
