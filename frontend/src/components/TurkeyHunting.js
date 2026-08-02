import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const REGIONS = [
  {
    id: 'karadeniz', name: 'Karadeniz', icon: '🌲', accent: '#22c55e',
    species: ['Dağ Horozu', 'Çulluk', 'Yaban Kazı'],
    season: 'Eylül–Şubat (türe göre)',
    terrain: 'Sık çam ve kayın ormanları, alp çayırları',
    tip: 'Çulluk avı için sabah sis öncesi karanlıkta çıkış. Kayın altı en iyi nokta.',
  },
  {
    id: 'dogu', name: 'Doğu Anadolu', icon: '🏔️', accent: '#3b82f6',
    species: ['Keklik', 'Yaban Domuzu', 'Çöl Tavşanı'],
    season: 'Ekim–Ocak',
    terrain: 'Açık step, volkanik yayla, kayalık dağ sırtları',
    tip: 'Keklik tepelere tırmanır — sabah güneşi gelen yamacı seç.',
  },
  {
    id: 'ic', name: 'İç Anadolu', icon: '🌾', accent: '#f59e0b',
    species: ['Keklik', 'Bıldırcın', 'Su Kuşları'],
    season: 'Ağustos–Ocak',
    terrain: 'Tarım arazisi, sulak alan çevresi, step bozkır',
    tip: 'Bıldırcın hasatsonrası buğday tarlalarında yoğun. Köpek ile ava çık.',
  },
  {
    id: 'ege', name: 'Ege & Akdeniz', icon: '🌿', accent: '#10b981',
    species: ['Keklik', 'Tilki (kürk)', 'Çakal'],
    season: 'Ekim–Şubat',
    terrain: 'Maki, zeytinlik, alçak dağ yamaçları',
    tip: 'Keklik kayalıklara kaçar — sürü bulunduktan sonra kovmak yerine sakin yaklaş.',
  },
  {
    id: 'trakya', name: 'Trakya', icon: '🌾', accent: '#a78bfa',
    species: ['Tavşan', 'Bıldırcın', 'Tilki'],
    season: 'Eylül–Ocak',
    terrain: 'Tarım arazisi, orman kenarı, dere yataklarının kenarı',
    tip: 'Tavşan avi için gün doğumunda tarlalar. İz takipçi köpekler önerilir.',
  },
];

const SPECIES_INFO = [
  {
    name: 'Keklik', icon: '🐦', season: 'Ekim 1 – Ocak 31',
    bag: 'Günlük 3 adet · Sezon 30 adet',
    habitat: 'Kayalık yamaçlar, maki, step',
    method: 'Patikçi köpek, stalk, tünek avı',
    tips: 'Keklikler stres altında yere çöker. Yavaş yaklaşım ve pit-stop tekniği.',
  },
  {
    name: 'Bıldırcın', icon: '🐤', season: 'Ağustos 15 – Ekim 15',
    bag: 'Günlük 10 adet (sezon kotası yok)',
    habitat: 'Tarım arazisi, buğday ve mısır tarlası',
    method: 'Patikçi köpek (İspanyol pointer idealdir)',
    tips: 'Göç eden bıldırcın sabah erken konar. Birleşik tarla kenarlarını tara.',
  },
  {
    name: 'Yaban Kazı', icon: '🦢', season: 'Ekim 1 – Şubat 28',
    bag: 'Günlük 5 adet',
    habitat: 'Sulak alanlar, nehir deltası, büyük göl kıyıları',
    method: 'Tuzak kurulmaz, vurma avı — dişi kazı yavrusundan ayırt et',
    tips: 'Şafak öncesi sulak alana gir, aldatıcı (decoy) kur ve çağrı kullan.',
  },
  {
    name: 'Çulluk', icon: '🦅', season: 'Eylül 1 – Kasım 30',
    bag: 'Günlük 5 adet',
    habitat: 'Sık ormanlık, ıslak humus zeminli orman içi',
    method: 'Şafak ve gün batımı driven avı, köpek ile',
    tips: 'Çulluğun "roding" sinyalini bekle — çiftleşme dönemi doğrusal uçuş yapar.',
  },
];

const DOGS = [
  { name: 'İspanyol Pointer', use: 'Bıldırcın, keklik', icon: '🐕', note: 'Alçak bitki örtüsünde üstün' },
  { name: 'English Springer', use: 'Çulluk, su kuşu', icon: '🐕', note: 'Suda da çalışır' },
  { name: 'Labrador', use: 'Su kuşu, kaz', icon: '🐕', note: 'Soğuk suya dayanıklı' },
  { name: 'Beagle', use: 'Tavşan', icon: '🐕', note: 'İz kovalamasında çok iyi' },
];

export default function TurkeyHunting() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('regions');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏹 Tüy Av Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Keklik · bıldırcın · su kuşu · Türkiye bölgeleri</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[['regions', '🗺️ Bölgeler'], ['species', '🐦 Türler'], ['dogs', '🐕 Köpekler']].map(([id, lbl]) => (
          <button key={id} onClick={() => { setTab(id); setSel(null); }} style={{
            flex: 1, background: tab === id ? '#84cc16' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#84cc16' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'regions' && REGIONS.map(r => {
          const open = sel === r.id;
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{r.species.join(' · ')}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8, marginBottom: 4 }}>📅 {r.season}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>⛰️ {r.terrain}</div>
                  <div style={{ background: r.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: r.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{r.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'species' && SPECIES_INFO.map(s => {
          const open = sel === s.name;
          return (
            <div key={s.name} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.name)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: '1px solid #374151', cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>📅 {s.season}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: '1px solid #374151', borderTop: 'none' }}>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4 }}>🏅 {s.bag}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>🌿 {s.habitat}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>🎯 {s.method}</div>
                    <div style={{ background: '#84cc1615', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10, color: '#84cc16', fontWeight: 600, marginBottom: 3 }}>💡 TAKTİK</div>
                      <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{s.tips}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'dogs' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>Doğru köpek seçimi av başarısını 3-4 kat artırabilir. Eğitimli bir av köpeği yıllarca ortaklık eder.</div>
            </div>
            {DOGS.map(d => (
              <div key={d.name} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 28 }}>{d.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: '#22c55e', marginBottom: 2 }}>🎯 {d.use}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{d.note}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
