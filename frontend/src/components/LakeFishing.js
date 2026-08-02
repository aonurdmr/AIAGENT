import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LAKES = [
  {
    id: 'van', name: 'Van Gölü', region: 'Van', icon: '🏔️', accent: '#06b6d4',
    area: '3.755 km²  (Türkiye\'nin en büyük gölü)',
    depth: 'Maks. 451 m',
    species: 'Van balığı (inci kefali), sırtlan balığı',
    technique: 'Ağ (yerel) · olta — kıyı atışı',
    season: 'Mayıs–Ekim (kışın çok soğuk)',
    access: 'Van şehri merkezi kıyısı · tekne zorunlu derin alanlarda',
    tip: 'Van balığı (İnci kefali) Türkiye\'ye özgü endemik. Göl sodaik — tuzlu ve alkalin, diğer balıklar yaşayamaz.',
    record: 'İnci kefali: 1.2 kg belgelenmiş',
  },
  {
    id: 'egirdir', name: 'Eğirdir Gölü', region: 'Isparta', icon: '💧', accent: '#22c55e',
    area: '482 km²',
    depth: 'Maks. 12 m (sığ göl)',
    species: 'Sazan, levrek, yayın, turna',
    technique: 'Float olta, bottom fishing, jig',
    season: 'Nisan–Kasım (sazancı: yaz)',
    access: 'Eğirdir ilçesi · tekne kiralama mevcut',
    tip: 'Türkiye\'nin en büyük tatlısu gölleri arasında. Sazan ve yayın balıkçılığı için ideale yakın derin bölgeler.',
    record: 'Yayın balığı 40+ kg olayları rapor edilmiş',
  },
  {
    id: 'beysehir', name: 'Beyşehir Gölü', region: 'Konya', icon: '🌿', accent: '#84cc16',
    area: '650 km²',
    depth: 'Maks. 10 m',
    species: 'Sazan, kadife balığı, turna, levrek',
    technique: 'Bottom fishing, feeder, float',
    season: 'Nisan–Ekim',
    access: 'Beyşehir ilçesi · kuzey kıyısı ulaşılabilir',
    tip: 'Sazlık kenarı levrek ve turna için çok verimli. Su bitkileri yoğun — yüzer plastik yem tercih et.',
    record: 'Sazan 15+ kg',
  },
  {
    id: 'mogan', name: 'Mogan Gölü', region: 'Ankara', icon: '🏙️', accent: '#a78bfa',
    area: '5.6 km²',
    depth: 'Maks. 3 m',
    species: 'Sazan, turna, kadife balığı',
    technique: 'Float olta, feeder, kıyı atışı',
    season: 'Nisan–Kasım',
    access: 'Ankara\'ya 20 km · araçla kolay',
    tip: 'Ankaralı balıkçıların ev sahası. Kuş gözlemi + balıkçılık kombinasyonu için ideal.',
    record: 'Turna 6+ kg',
  },
  {
    id: 'abant', name: 'Abant Gölü', region: 'Bolu', icon: '🌲', accent: '#10b981',
    area: '1.3 km²',
    depth: 'Maks. 8 m',
    species: 'Gökkuşağı alabalığı (stoklu), sazan',
    technique: 'Sinek balıkçılığı, spinner, yapay',
    season: 'Mayıs–Ekim',
    access: 'Bolu\'ya 33 km · Milli Park giriş ücreti',
    tip: 'Milli Park içinde — ruhsat şart. Alabalık doğal ve stoklu. Yüksek balıkçılık baskısı — sezon başında erken git.',
    record: 'Gökkuşağı alabalığı: 2.5 kg',
  },
];

const TECHNIQUES = [
  { name: 'Bottom Fishing (Dipten)', desc: 'Ağırlık + yem + kısa lider · sazan ve yayın için en etkili · 3-8 m derinlik', fish: ['Sazan', 'Yayın', 'Kefal'] },
  { name: 'Float Fishing (Şamandıra)', desc: 'Yüzer şamandıra ile derin su kontrolü · turna ve levrek için · 1-4 m', fish: ['Turna', 'Levrek', 'Kadife'] },
  { name: 'Feeder Fishing', desc: 'Yem kafesi + kısa lider · göl sazan yarışması tekniği · oturarak bekle', fish: ['Sazan', 'İnci kefali'] },
  { name: 'Jig & Spinner', desc: 'Aktif avlanma · levrek ve turna için jigging veya spinner atma', fish: ['Levrek', 'Turna'] },
];

export default function LakeFishing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('lakes');

  return (
    <div style={{ background: '#030d14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏞️ Göl Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 göl · tür, teknik & rekor bilgisi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['lakes','Göller'],['techniques','Teknikler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#071a22', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'lakes' && LAKES.map(l => {
          const open = sel === l.id;
          return (
            <div key={l.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : l.id)} style={{
                background: '#071a22', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${l.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{l.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{l.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>📍 {l.region} · {l.area}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#071a22', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${l.accent}33`, borderTop: 'none' }}>
                  {[['💧 Derinlik', l.depth], ['🐟 Türler', l.species], ['🎣 Teknik', l.technique], ['📅 Sezon', l.season], ['🚗 Erişim', l.access], ['🏅 Rekor', l.record]].map(([lb, v]) => (
                    <div key={lb} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: l.accent, fontWeight: 600 }}>{lb}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: l.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: l.accent, fontWeight: 600, marginBottom: 3 }}>💡 PRO İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{l.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'techniques' && (
          <div style={{ background: '#071a22', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🎣 Göl Balıkçılık Teknikleri</div>
            {TECHNIQUES.map((t, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < TECHNIQUES.length-1 ? '1px solid #0f2535' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#06b6d4', marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5, marginBottom: 6 }}>{t.desc}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {t.fish.map(f => <span key={f} style={{ background: '#06b6d422', color: '#06b6d4', borderRadius: 20, padding: '2px 8px', fontSize: 10 }}>{f}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
