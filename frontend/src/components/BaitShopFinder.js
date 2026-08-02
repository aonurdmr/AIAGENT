import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SHOPS = [
  {
    id: 1, name: 'Balıkçı Ahmet Usta', city: 'İstanbul', district: 'Kumkapı', icon: '🏪',
    rating: 4.8, reviews: 127,
    address: 'Kumkapı Balık Hali Yanı, Fatih/İstanbul',
    phone: '+90 212 517 0001', hours: '05:00–18:00 (Her gün)',
    specialties: ['Deniz yemi', 'Canlı yem', 'Olta takımı'],
    priceRange: '₺₺',
    note: 'Boğaz balıkçılığı için her türlü malzeme. Canlı hamsi ve kalamar stoku.',
    lat: 41.005, lng: 28.948,
  },
  {
    id: 2, name: 'Ege Tackle Shop', city: 'İzmir', district: 'Karşıyaka', icon: '🎣',
    rating: 4.6, reviews: 89,
    address: 'Karşıyaka Sahil Cad. 42, İzmir',
    phone: '+90 232 331 0002', hours: '07:00–20:00 (Pzt-Cmt)',
    specialties: ['Fly fishing', 'Jigging', 'Sahte yem'],
    priceRange: '₺₺₺',
    note: 'Ege\'nin en iyi fly fishing uzmanı. Özel sipariş fırçalı olta yapımı.',
    lat: 38.457, lng: 27.115,
  },
  {
    id: 3, name: 'Karadeniz Yem Evi', city: 'Trabzon', district: 'Meydan', icon: '🏠',
    rating: 4.7, reviews: 64,
    address: 'Trabzon Balıkçı Barınağı Girişi',
    phone: '+90 462 321 0003', hours: '04:30–17:00 (Her gün)',
    specialties: ['Hamsi yemi', 'Palamut jigging', 'El oltası'],
    priceRange: '₺',
    note: 'Karadeniz mevsim yemleri için en güvenilir adres. Sabah erken açık.',
    lat: 41.003, lng: 39.724,
  },
  {
    id: 4, name: 'Akdeniz Sport Fishing', city: 'Antalya', district: 'Liman', icon: '⚓',
    rating: 4.9, reviews: 203,
    address: 'Antalya Setur Marina Yanı',
    phone: '+90 242 248 0004', hours: '06:00–21:00 (Her gün)',
    specialties: ['Troling', 'Derin su jigging', 'Gece balıkçılığı'],
    priceRange: '₺₺₺',
    note: 'Tekne kiralama ve rehber hizmetiyle birlikte eksiksiz paket sunuyor.',
    lat: 36.875, lng: 30.701,
  },
  {
    id: 5, name: 'Göl Balıkçısı', city: 'Ankara', district: 'Gölbaşı', icon: '🐡',
    rating: 4.5, reviews: 56,
    address: 'Mogan Gölü Kıyısı, Gölbaşı/Ankara',
    phone: '+90 312 484 0005', hours: '06:00–19:00 (Her gün)',
    specialties: ['Sazan yemi', 'Boilies', 'Tatlı su takımı'],
    priceRange: '₺₺',
    note: 'Sazan ve turna için bölgenin en geniş yem yelpazesi.',
    lat: 39.781, lng: 32.753,
  },
  {
    id: 6, name: 'Marmara Balık Malzemeleri', city: 'Bursa', district: 'Osmangazi', icon: '🛒',
    rating: 4.4, reviews: 78,
    address: 'Osmangazi Çarşısı 115, Bursa',
    phone: '+90 224 271 0006', hours: '08:00–19:00 (Pzt-Cmt)',
    specialties: ['Toplu satış', 'Olta ipi', 'İğne takımı'],
    priceRange: '₺',
    note: 'Toptan ve perakende. Kulüplere özel indirim uygulanır.',
    lat: 40.184, lng: 29.061,
  },
  {
    id: 7, name: 'Nehir Balıkçı Dükkânı', city: 'Rize', district: 'Merkez', icon: '🏞️',
    rating: 4.8, reviews: 41,
    address: 'Fındıklı Deresisi Yanı, Rize',
    phone: '+90 464 213 0007', hours: '05:00–16:00 (Her gün)',
    specialties: ['Alabalık yemi', 'Fly takımı', 'Suni sinek'],
    priceRange: '₺₺',
    note: 'Dağ nehirleri için uzmanlaşmış. El yapımı sinekçi olta takımı stokta.',
    lat: 41.023, lng: 40.521,
  },
  {
    id: 8, name: 'Bodrum Fishing Center', city: 'Muğla', district: 'Bodrum', icon: '⛵',
    rating: 4.7, reviews: 112,
    address: 'Bodrum Marina Karşısı',
    phone: '+90 252 316 0008', hours: '07:00–22:00 (Nisan–Ekim)',
    specialties: ['Ege türleri', 'Sahte yem', 'Sualtı ekipmanı'],
    priceRange: '₺₺₺',
    note: 'Yaz sezonu için eksiksiz Ege balıkçılık malzemeleri ve tekne aksesuar.',
    lat: 37.035, lng: 27.430,
  },
];

function Stars({ rating, reviews }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ color: '#fbbf24', fontSize: 13 }}>{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</span>
      <span style={{ fontSize: 12, color: '#6b7280' }}>{rating} ({reviews})</span>
    </div>
  );
}

function ShopCard({ shop, onClick }) {
  return (
    <div onClick={() => onClick(shop)} style={{ background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10, border: '1px solid #374151', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ fontSize: 32, lineHeight: 1, marginTop: 2 }}>{shop.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{shop.name}</div>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>{shop.priceRange}</span>
          </div>
          <Stars rating={shop.rating} reviews={shop.reviews} />
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>📍 {shop.district}, {shop.city}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
            {shop.specialties.slice(0, 2).map(s => (
              <span key={s} style={{ fontSize: 10, background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '2px 8px' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopDetail({ shop, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 48 }}>{shop.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{shop.name}</div>
            <Stars rating={shop.rating} reviews={shop.reviews} />
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>📍 {shop.address}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'Çalışma Saatleri', value: shop.hours, icon: '🕐' },
            { label: 'Fiyat Aralığı', value: shop.priceRange, icon: '💰' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb', marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🎣 UZMANLIK ALANLARI</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {shop.specialties.map(s => (
              <span key={s} style={{ background: '#374151', color: '#d1d5db', borderRadius: 8, padding: '5px 12px', fontSize: 12 }}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>📋 NOT</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{shop.note}</div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <a href={`tel:${shop.phone}`} style={{ flex: 1, display: 'block', textAlign: 'center', background: '#22c55e', color: '#fff', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            📞 Ara
          </a>
          <a href={`https://www.google.com/maps?q=${shop.lat},${shop.lng}`} target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, display: 'block', textAlign: 'center', background: '#3b82f6', color: '#fff', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            🗺️ Yol Tarifi
          </a>
        </div>
      </div>
    </div>
  );
}

const CITIES_FILTER = ['Tümü', 'İstanbul', 'İzmir', 'Antalya', 'Trabzon', 'Diğer'];

export default function BaitShopFinder() {
  const navigate = useNavigate();
  const [city, setCity] = useState('Tümü');
  const [selected, setSelected] = useState(null);

  const filtered = SHOPS.filter(s => {
    if (city === 'Tümü') return true;
    if (city === 'Diğer') return !['İstanbul', 'İzmir', 'Antalya', 'Trabzon'].includes(s.city);
    return s.city === city;
  });

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏪 Yem Dükkanı Bul</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>8 dükkan · Türkiye\'nin önde gelen balıkçı malzemeleri</div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {CITIES_FILTER.map(c => (
          <button key={c} onClick={() => setCity(c)} style={{
            background: city === c ? '#3b82f6' : '#1f2937',
            color: city === c ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: city === c ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{c}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} dükkan</div>
        {filtered.map(s => <ShopCard key={s.id} shop={s} onClick={setSelected} />)}
      </div>

      {selected && <ShopDetail shop={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
