import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FISH = [
  {
    id: 1, name: 'Levrek', icon: '🐟', water: 'Deniz',
    peak: [10, 11, 12, 1, 2, 3], good: [4, 9], off: [5, 6, 7, 8],
    regions: ['Ege Kıyıları', 'Marmara', 'Boğaz'],
    methods: ['Lüfer takımı', 'Jig', 'Sahte yem', 'Canlı yem'],
    tips: 'Gece avcılığı çok etkili. Işıklı yerlerde ve akıntı kanallarında arar.',
    minSize: 25, color: '#06b6d4',
  },
  {
    id: 2, name: 'Çipura', icon: '🐠', water: 'Deniz',
    peak: [9, 10, 11], good: [7, 8, 12], off: [1, 2, 3, 4, 5, 6],
    regions: ['Ege', 'Akdeniz', 'Datça', 'Bodrum'],
    methods: ['Karides', 'Kalamar şeridi', 'Jig', 'Trolling'],
    tips: 'Sürüler halinde dolaşır. Kaya altları ve Posidonia çayırlıkları ideal.',
    minSize: 20, color: '#f59e0b',
  },
  {
    id: 3, name: 'Lüfer', icon: '🐡', water: 'Deniz',
    peak: [9, 10, 11], good: [8, 12], off: [1, 2, 3, 4, 5, 6, 7],
    regions: ['İstanbul Boğazı', 'Marmara', 'Karadeniz'],
    methods: ['Paraketa', 'Maket balık', 'Fener balığı çekimleri'],
    tips: 'Göç döneminde (Ekim) Boğaz\'da yoğun geçiş olur. Balıkçı haberleri takip edin.',
    minSize: 20, color: '#3b82f6',
  },
  {
    id: 4, name: 'Alabalık', icon: '🐟', water: 'Tatlısu',
    peak: [3, 4, 10, 11], good: [2, 5, 9, 12], off: [6, 7, 8],
    regions: ['Doğu Karadeniz', 'Fırtına Deresi', 'Kuzey Anadolu dereleri'],
    methods: ['Sinek balıkçılığı (fly)', 'Solucan', 'Küçük spiner'],
    tips: 'Soğuk, oksijeni bol akarsularda yaşar. Sabah erken saatler en verimli.',
    minSize: 22, color: '#22c55e',
  },
  {
    id: 5, name: 'Sazan', icon: '🐟', water: 'Tatlısu',
    peak: [4, 5, 6, 9, 10], good: [3, 7, 8, 11], off: [12, 1, 2],
    regions: ['Sapanca Gölü', 'Manyas Gölü', 'Dicle', 'Fırat', 'Büyük Çekmece'],
    methods: ['Boilies', 'Mısır', 'Pasta balığı', 'Ağdalı yem'],
    tips: 'Uzun süreli oturma balığı. Sabah ve akşam sığ sularda beslenir.',
    minSize: 30, color: '#84cc16',
  },
  {
    id: 6, name: 'İstavrit', icon: '🐟', water: 'Deniz',
    peak: [6, 7, 8, 9], good: [5, 10], off: [11, 12, 1, 2, 3, 4],
    regions: ['Tüm Karadeniz kıyısı', 'Marmara'],
    methods: ['Olta takımı', 'Kalamar iğnesi', 'Sürü taktiği'],
    tips: 'Yaz aylarında büyük sürüler halinde kıyıya yaklaşır. Basit takımla kolayca tutulur.',
    minSize: 13, color: '#f97316',
  },
  {
    id: 7, name: 'Kefal', icon: '🐟', water: 'İki Su',
    peak: [3, 4, 11, 12], good: [2, 5, 10], off: [6, 7, 8, 9],
    regions: ['Tüm kıyılar', 'Haliç', 'Akarsu ağızları', 'Lagünler'],
    methods: ['Ekmek, pasta yem', 'Kanca sürüme', 'Olta'],
    tips: 'Kış aylarında en lezzetli. Tatlıdan tuzluya geçiş noktaları en verimli.',
    minSize: 20, color: '#a855f7',
  },
  {
    id: 8, name: 'Palamut', icon: '🐟', water: 'Deniz',
    peak: [9, 10], good: [8, 11], off: [12, 1, 2, 3, 4, 5, 6, 7],
    regions: ['İstanbul Boğazı', 'Marmara', 'Karadeniz'],
    methods: ['Taklit (imitasyon yem)', 'Trolling', 'Bonjuklu'],
    tips: 'Sonbahar göçü kısa sürer ama yoğun olur. Boğaz\'da Ekim başı kritik hafta.',
    minSize: 20, color: '#06b6d4',
  },
  {
    id: 9, name: 'Hamsi', icon: '🐟', water: 'Deniz',
    peak: [11, 12, 1], good: [10, 2], off: [3, 4, 5, 6, 7, 8, 9],
    regions: ['Karadeniz', 'Trabzon', 'Rize', 'Samsun'],
    methods: ['Fener balıkçılığı', 'Serpme ağ', 'Gırgır'],
    tips: 'Kış mevsiminin vazgeçilmez balığı. Karadeniz yaz sonunda göç eder.',
    minSize: 9, color: '#fbbf24',
  },
  {
    id: 10, name: 'Turna Balığı', icon: '🐟', water: 'Tatlısu',
    peak: [3, 4, 5, 10, 11], good: [2, 6, 9, 12], off: [7, 8],
    regions: ['Terkos Gölü', 'Meriç Havzası', 'Kuzey Anadolu gölleri'],
    methods: ['Büyük maket balık', 'Canlı yem', 'Jig'],
    tips: 'Yırtıcı balık. Sazlık ve su bitkisi kenarlarında pusu kurar.',
    minSize: 40, color: '#22c55e',
  },
  {
    id: 11, name: 'Barbunya', icon: '🐠', water: 'Deniz',
    peak: [6, 7, 8], good: [5, 9], off: [10, 11, 12, 1, 2, 3, 4],
    regions: ['Ege', 'Akdeniz', 'Antalya', 'İzmir'],
    methods: ['Yerde sürüme', 'Karides', 'Solucan'],
    tips: 'Kumlu ve çakıllı dipte beslenir. Yaz mevsiminde kıyıya yaklaşır.',
    minSize: 13, color: '#ef4444',
  },
  {
    id: 12, name: 'Kalkan', icon: '🐟', water: 'Deniz',
    peak: [4, 5, 6, 11, 12], good: [3, 7, 10], off: [8, 9, 1, 2],
    regions: ['Karadeniz', 'Marmara', 'Bozcaada', 'Gökçeada'],
    methods: ['Dipten uzun olta', 'Karides', 'Kalamar şeridi', 'Paraketa'],
    tips: 'Dipte yatar, maskelenmiş bekler. Kum ve çakıl tabanlarda.  Değerli balık, boy limiti kontrolü yapın.',
    minSize: 35, color: '#7c3aed',
  },
];

const MONTHS_TR = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
const WATER_TYPES = ['Tümü', 'Deniz', 'Tatlısu', 'İki Su'];

function MonthRow({ fish }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 12 }, (_, i) => {
        const m = i + 1;
        const isPeak = fish.peak.includes(m);
        const isGood = fish.good.includes(m);
        const bg = isPeak ? '#22c55e' : isGood ? '#f59e0b' : '#1f2937';
        const border = isPeak ? '#16a34a' : isGood ? '#d97706' : '#374151';
        return (
          <div key={i} style={{ flex: 1, height: 20, borderRadius: 3, background: bg, border: `1px solid ${border}` }} title={MONTHS_TR[i]} />
        );
      })}
    </div>
  );
}

function FishDetail({ fish, onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1f2937', borderRadius: '20px 20px 0 0', padding: '24px 20px 36px', width: '100%', maxHeight: '85vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 36 }}>{fish.icon}</span>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#f9fafb' }}>{fish.name}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <span style={{ background: fish.color + '33', color: fish.color, borderRadius: 8, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>{fish.water}</span>
              <span style={{ background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '2px 10px', fontSize: 11 }}>Min: {fish.minSize} cm</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>AYLIK AKTİVİTE</div>
          <MonthRow fish={fish} />
          <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
            {MONTHS_TR.map((m, i) => <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 8, color: '#6b7280' }}>{m}</div>)}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: '#22c55e' }} />
              <span style={{ fontSize: 11, color: '#9ca3af' }}>Pik sezon</span>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: '#f59e0b' }} />
              <span style={{ fontSize: 11, color: '#9ca3af' }}>İyi sezon</span>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: '#1f2937', border: '1px solid #374151' }} />
              <span style={{ fontSize: 11, color: '#9ca3af' }}>Kötü sezon</span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>EN İYİ BÖLGELER</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {fish.regions.map((r, i) => (
              <span key={i} style={{ background: '#064e3b', color: '#6ee7b7', borderRadius: 8, padding: '4px 12px', fontSize: 12 }}>📍 {r}</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>AVLAMA YÖNTEMLERİ</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {fish.methods.map((m, i) => (
              <span key={i} style={{ background: '#374151', color: '#d1d5db', borderRadius: 8, padding: '4px 12px', fontSize: 12 }}>🎣 {m}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#1c3461', border: '1px solid #3b82f6', borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 600, marginBottom: 6 }}>💡 UZMAN İPUCU</div>
          <p style={{ color: '#dbeafe', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{fish.tips}</p>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <div style={{ flex: 1, background: '#374151', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600 }}>PİK SEZON</div>
            <div style={{ fontSize: 13, color: '#22c55e', fontWeight: 700, marginTop: 4 }}>
              {fish.peak.map(m => MONTHS_TR[m - 1]).join(', ')}
            </div>
          </div>
          <div style={{ flex: 1, background: '#374151', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600 }}>MIN. BOY</div>
            <div style={{ fontSize: 20, color: '#f9fafb', fontWeight: 800, marginTop: 4 }}>{fish.minSize} <span style={{ fontSize: 12, color: '#9ca3af' }}>cm</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FishSeason() {
  const navigate = useNavigate();
  const [water, setWater]       = useState('Tümü');
  const [selected, setSelected] = useState(null);
  const currentMonth            = new Date().getMonth() + 1;

  const visible = water === 'Tümü' ? FISH : FISH.filter(f => f.water === water);

  const nowPeak = FISH.filter(f => f.peak.includes(currentMonth));
  const nowGood = FISH.filter(f => f.good.includes(currentMonth));

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 80 }}>
      <div style={{ padding: '20px 16px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧭 Balık Sezonu Pusulası</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>12 tür · aylık mevsim takvimi</div>
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24', marginBottom: 10 }}>
            📅 {MONTHS_TR[currentMonth - 1]} — Şu An Tutulan Balıklar
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {nowPeak.map(f => (
              <span key={f.id} style={{ background: '#064e3b', color: '#6ee7b7', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
                🟢 {f.name}
              </span>
            ))}
            {nowGood.map(f => (
              <span key={f.id} style={{ background: '#451a03', color: '#fcd34d', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
                🟡 {f.name}
              </span>
            ))}
            {nowPeak.length === 0 && nowGood.length === 0 && (
              <span style={{ color: '#6b7280', fontSize: 13 }}>Bu ay aktif sezon yok</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {WATER_TYPES.map(w => (
          <button key={w} onClick={() => setWater(w)} style={{
            background: water === w ? '#06b6d4' : '#1f2937',
            color: water === w ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: water === w ? '#06b6d4' : '#374151',
            borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>{w}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px 8px', display: 'flex', gap: 12 }}>
        {MONTHS_TR.map((m, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 8, color: i + 1 === currentMonth ? '#fbbf24' : '#6b7280', fontWeight: i + 1 === currentMonth ? 700 : 400 }}>{m}</div>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {visible.map(fish => (
          <div key={fish.id} onClick={() => setSelected(fish)} style={{
            background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
            border: '1px solid #374151', cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 24 }}>{fish.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{fish.name}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {fish.peak.includes(currentMonth) && (
                      <span style={{ background: '#064e3b', color: '#6ee7b7', borderRadius: 8, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>PİK</span>
                    )}
                    {fish.good.includes(currentMonth) && (
                      <span style={{ background: '#451a03', color: '#fcd34d', borderRadius: 8, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>İYİ</span>
                    )}
                    <span style={{ background: fish.color + '33', color: fish.color, borderRadius: 8, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{fish.water}</span>
                  </div>
                </div>
              </div>
            </div>
            <MonthRow fish={fish} />
          </div>
        ))}
      </div>

      {selected && <FishDetail fish={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
