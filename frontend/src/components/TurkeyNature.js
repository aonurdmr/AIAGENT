import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const REGIONS = [
  {
    id: 'karadeniz', name: 'Karadeniz Bölgesi', icon: '🌲', accent: '#22c55e',
    climate: 'Ilıman ve yağışlı · yıllık 1200-2500 mm yağış',
    landscape: 'Yoğun orman, yaylaları, dik kıyı',
    flora: 'Kayın, ıhlamur, gürgen · endemik Kaçkar lalesi',
    fauna: 'Boz ayı, vaşak, su samuru, kaya kartalı',
    fish: 'Alabalık, kayabalığı, hamsi (kıyı)',
    hunting: 'Karaca, yaban domuzu · Artvin ormanları',
    best: 'Mayıs–Haziran (çiçek) · Eylül–Ekim (renk)',
    sites: 'Küre Dağları MP, Kaçkar Dağları MP, Sumela',
  },
  {
    id: 'akdeniz', name: 'Akdeniz Bölgesi', icon: '☀️', accent: '#f97316',
    climate: 'Sıcak yaz, ılık kış · yağış Kasım–Mart',
    landscape: 'Maki, sedir ormanı, kıyı falezleri',
    flora: 'Sedir, kızılçam, laurel, yabani lale',
    fauna: 'Akdeniz foku (nadir), caretta caretta, akbaba',
    fish: 'Levrek, çipura, sarıkanat, kırlangıç balığı',
    hunting: 'Keklik, bıldırcın, yaban domuzu',
    best: 'Mart–Mayıs ve Ekim–Kasım',
    sites: 'Köprülü Kanyon MP, Beydağları, Geyikbayırı',
  },
  {
    id: 'ege', name: 'Ege Bölgesi', icon: '🌊', accent: '#3b82f6',
    climate: 'Akdeniz iklimi · yazın kuru, kışın ılık',
    landscape: 'Maki, zeytinlik, koy, delta',
    flora: 'Zeytin, mandalina, lavanta, susam',
    fauna: 'Flamingo (Gediz), varana, kaplumbağa',
    fish: 'Levrek, çipura, ıstakoz, ahtapot',
    hunting: 'Bıldırcın, göçmen kuş, yaban domuzu',
    best: 'Nisan–Haziran, Eylül–Kasım',
    sites: 'Gediz Deltası, Büyük Menderes, Dilek MP',
  },
  {
    id: 'ic_anadolu', name: 'İç Anadolu', icon: '🏜️', accent: '#f59e0b',
    climate: 'Kıta iklimi · yaz sıcak, kış soğuk ve karlı',
    landscape: 'Step, peri bacaları, bozkır, peribacaları',
    flora: 'Yabani lale, step otu, geven, yabani buğday',
    fauna: 'Bozkır kartalı, toy kuşu, yaban eşeği, çakal',
    fish: 'Sazan, turna, yayın (Tuz Gölü hariç)',
    hunting: 'Tilki, keklik, yaban domuzu',
    best: 'Nisan–Mayıs (çiçek) · Temmuz–Ağustos (kuşlar)',
    sites: 'Kapadokya, Sultan Sazlığı, Tuz Gölü',
  },
  {
    id: 'dogu', name: 'Doğu Anadolu', icon: '⛰️', accent: '#ef4444',
    climate: 'Sert kıta · kış çok soğuk (-30°C), yaz ılık',
    landscape: 'Yüksek yayla, volkanik göller, dağ step',
    flora: 'Dağ bozkır bitkisi, endemik türler, kar nilüferi',
    fauna: 'Kel kartal, pelikan, flamingo, ayı, kurt',
    fish: 'Bıyıklı balık, siraz, sazan (büyük göllerde)',
    hunting: 'Kınalı keklik, kayalık alan kartalı av seyri',
    best: 'Mayıs–Eylül (kış çok sert)',
    sites: 'Van Gölü, Ağrı Dağı, Nemrut, Aras Havzası',
  },
];

const ENDEMIC = [
  { name: 'Anadolu Parsı', scientific: 'Panthera pardus tulliana', status: 'Muhtemelen yok olmuş', icon: '🐆' },
  { name: 'Kafkas Tur', scientific: 'Capra cylindricornis', status: 'Kuzeydoğu Türkiye', icon: '🐐' },
  { name: 'Anadolu Çakalı', scientific: 'Canis aureus moreoticus', status: 'Yaygın', icon: '🦊' },
  { name: 'Kaçkar Kelebeği', scientific: 'Parnassius nordmanni', status: 'Kaçkar endemik', icon: '🦋' },
  { name: 'Van Kedisi', scientific: 'Felis catus (Van tipi)', status: 'Van gölü çevresi', icon: '🐱' },
  { name: 'Kapadokya Alabalığı', scientific: 'Salmo platycephalus', status: 'Tofandalı Çayı endemik', icon: '🐟' },
];

export default function TurkeyNature() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('regions');

  return (
    <div style={{ background: '#0a0f0a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🗺️ Türkiye Doğa Atlası</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 bölge · flora, fauna & avcılık rehberi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['regions','Bölgeler'],['endemic','Endemikler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#101810', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'regions' && REGIONS.map(r => {
          const open = sel === r.id;
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#101810', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>En iyi: {r.best}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#101810', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  {[['🌦️ İklim', r.climate], ['🏔️ Arazi', r.landscape], ['🌿 Flora', r.flora], ['🦅 Fauna', r.fauna], ['🐟 Balıkçılık', r.fish], ['🏹 Av', r.hunting], ['🏛️ Önemli Alanlar', r.sites]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: r.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {tab === 'endemic' && (
          <div style={{ background: '#101810', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🧬 Türkiye Endemik & Özel Türler</div>
            {ENDEMIC.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottom: i < ENDEMIC.length-1 ? '1px solid #1a2c1a' : 'none' }}>
                <span style={{ fontSize: 26 }}>{e.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb' }}>{e.name}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic' }}>{e.scientific}</div>
                  <div style={{ fontSize: 11, color: '#22c55e', marginTop: 2 }}>{e.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
