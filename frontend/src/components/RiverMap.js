import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RIVERS = [
  {
    id: 'coruh', name: 'Çoruh Nehri', icon: '🏔️', accent: '#3b82f6',
    region: 'Doğu Karadeniz',
    length: '466 km',
    grade: 'WW IV-V',
    fish: 'Alabalık (yüksek yoğunluk) · solungaç balığı',
    flow: 'İlkbahar karıyla kabarır — Nisan-Haziran zirve',
    spots: ['Artvin-İspir arası — en vahşi beyaz su', 'Yusufeli kanyonu (baraj öncesi)', 'Berta köyü — alabalık zenginliği'],
    tip: 'Çoruh dünyanın en hızlı akan nehirlerinden — rafting için uluslararası ün.',
  },
  {
    id: 'firtina', name: 'Fırtına Deresi', icon: '🌧️', accent: '#22c55e',
    region: 'Rize, Karadeniz',
    length: '65 km',
    grade: 'WW III-IV',
    fish: 'Dere alabalığı (yoğun) · yayın (ağzı yakınında)',
    flow: 'Yıl boyu yüksek — Karadeniz yağış besleme',
    spots: ['Çat köprüsü — dere alabalığı cenneti', 'Zilkale altı — vahşi kanyon bölgesi', 'Palovit şelalesi geçidi'],
    tip: 'Fırtına vadisi biyoçeşitlilik açısından Türkiye\'nin en zengin vadilerinden.',
  },
  {
    id: 'sakarya', name: 'Sakarya Nehri', icon: '🌊', accent: '#f59e0b',
    region: 'İç Anadolu - Marmara',
    length: '824 km',
    grade: 'WW I-II',
    fish: 'Sazan (büyük boy) · levrek · yayın · kefal',
    flow: 'Yıl boyu — baraj düzenlemeli akış',
    spots: ['Adapazarı çevresi — sazan havası', 'Geyve boğazı — akıntı balıkçılığı', 'Nehir ağzı Karasu — kefal & levrek'],
    tip: 'Sakarya\'da sazan 15 kg üstü alınan veriler var — dip feeder kurulumu şart.',
  },
  {
    id: 'kizilirmak', name: 'Kızılırmak', icon: '🏜️', accent: '#ef4444',
    region: 'İç Anadolu',
    length: '1355 km — Türkiye\'nin en uzunu',
    grade: 'WW I-II',
    fish: 'Sazan · turna · yayın · kurbağa balığı',
    flow: 'Değişken — ilkbahar yüksek, yaz düşük',
    spots: ['Kırıkkale-Kaman arası — sazan ve turna', 'Bafra deltası — deniz girişi kefal&levrek', 'Samsun lagünleri — su kuşu & balıkçılık'],
    tip: 'Kızılırmak deltası flamingo, turna gözleminin yanı sıra büyük sazan avı için ideal.',
  },
  {
    id: 'seyhan', name: 'Seyhan & Ceyhan', icon: '☀️', accent: '#a78bfa',
    region: 'Akdeniz (Adana bölgesi)',
    length: 'Seyhan 560 km · Ceyhan 509 km',
    grade: 'WW I-II',
    fish: 'Yayın (rekor boy) · sazan · kefal · çipura (ağız)',
    flow: 'Yaz düşük · bahar kabarıklığı belirgin',
    spots: ['Seyhan Baraj Gölü — yayın rekorları', 'Ceyhan ağzı — deniz-tatlısu karışımı', 'Tarsus Çayı kolu — alabalık'],
    tip: 'Türkiye\'nin en büyük yayın balıkları Seyhan\'da yakalanıyor — 1.5m+ örnekler mevcut.',
  },
];

const READING = [
  { icon: '💧', sign: 'Beyaz köpük hattı', meaning: 'Akıntı sınırı — yem balığı bu çizgide birikir, predatörler bekler' },
  { icon: '🌀', sign: 'Dönen akıntı (eddy)', meaning: 'Burgaç bölgesi — balık enerjisini burada korur, mükemmel avlanma yeri' },
  { icon: '🪨', sign: 'Kaya altı gölgesi', meaning: 'Alabalık ve turna sığınağı — yem kaya önüne ver' },
  { icon: '🌿', sign: 'Su bitkisi toplulukları', meaning: 'Besin zengini alan — küçük balık gizlenir, büyük balık avlar' },
  { icon: '🌡️', sign: 'Soğuk su girişi', description: 'Kaynaktan soğuk su — alabalık tercih eder, yaz aylarında en aktif nokta' },
];

export default function RiverMap() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('rivers');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#030c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏞️ Türkiye Nehir Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 nehir · balıkçılık, rafting & sıcak noktalar</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['rivers','Nehirler'],['reading','Nehir Okuma']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#3b82f6' : '#061020', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'rivers' && RIVERS.map(r => {
          const open = sel === r.id;
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#061020', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{r.region} · {r.grade}</div>
                  </div>
                  <div style={{ fontSize: 10, color: r.accent, fontWeight: 700 }}>{r.length}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#061020', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 12, marginTop: 8, marginBottom: 4 }}><span style={{ color: '#06b6d4', fontWeight: 600 }}>🐟 Balık: </span><span style={{ color: '#d1d5db' }}>{r.fish}</span></div>
                  <div style={{ fontSize: 12, marginBottom: 8 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>💧 Akış: </span><span style={{ color: '#d1d5db' }}>{r.flow}</span></div>
                  <div style={{ fontSize: 11, color: r.accent, fontWeight: 700, marginBottom: 4 }}>📍 SICAK NOKTALAR</div>
                  {r.spots.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {s}</div>)}
                  <div style={{ background: r.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {r.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'reading' && (
          <div style={{ background: '#061020', borderRadius: 14, padding: 14, border: '1px solid #3b82f622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa', marginBottom: 10 }}>💧 Nehir Okuma Rehberi</div>
            {READING.map((r, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < READING.length-1 ? '1px solid #0d2030' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#93c5fd' }}>{r.sign}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2, lineHeight: 1.5 }}>{r.meaning || r.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
