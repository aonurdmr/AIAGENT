import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FISH = [
  {
    id: 'levrek', name: 'Levrek', scientific: 'Dicentrarchus labrax', icon: '🐟', accent: '#3b82f6',
    habitats: ['Kıyı kayalıkları', 'Haliç ağzı', 'Lagün ve deltalar'],
    season: 'Ekim–Nisan (kış zirve)', minSize: 25, maxWeight: 12,
    depth: '0–80 m · gece sığa çıkar',
    bait: ['Gümüş sahte yem (twitch)', 'Canlı sardalya/istavrit', 'Popper yüzey'],
    techniques: ['Lure casting gece', 'Popper sabah vakti', 'Dip rig haliçte'],
    taste: 'Beyaz et, az yağlı, ince lezzet. Izgara, buğulama veya fırın.',
    record: 'Türkiye rekoru: 8.9 kg (Çanakkale, 2019)',
    tip: 'Levrek ışığa gelir. Köprü ayakları, fener altı — gece atışları sabah yarısını döver.',
  },
  {
    id: 'cipura', name: 'Çipura', scientific: 'Sparus aurata', icon: '🐠', accent: '#f59e0b',
    habitats: ['Sığ kumlu-çakıllı dip', 'Deniz çayırları', 'Sığ kayalık'],
    season: 'Yıl boyu · ilkbahar ve sonbahar zirve', minSize: 20, maxWeight: 10,
    depth: '5–30 m',
    bait: ['Karides', 'Midye eti', 'Küçük sahte yem (jig)'],
    techniques: ['Dip rig kayalıkta', 'Float rig kumlu dip', 'Feeder rod'],
    taste: 'Beyaz et, orta yağlılık. Türkiye\'nin en çok tüketilen deniz balığı.',
    record: 'Türkiye rekoru: 6.7 kg (Bodrum, 2018)',
    tip: 'Çipura karidese çok bağlı. Küçük karides yumuşak plastiğiyle jig atışı etkili.',
  },
  {
    id: 'palamut', name: 'Palamut', scientific: 'Sarda sarda', icon: '🐡', accent: '#ef4444',
    habitats: ['Açık deniz göçmen', 'Yüzey tabakaları'],
    season: 'Eylül–Kasım (İstanbul Boğazı göçü)', minSize: 26, maxWeight: 6,
    depth: '0–50 m · aktif av zamanı su yüzeyi',
    bait: ['Sardalya', 'Uskumru şeridi', 'Parlak metal kaşık'],
    techniques: ['Trolling tekne', 'Yüzey lure casting', 'Sahte yem jigging'],
    taste: 'Koyu kırmızımsı et, güçlü lezzet, yağlı. Isgara veya tuz+zeytinyağıyla servis.',
    record: 'Türkiye rekoru: 5.2 kg (Karadeniz, 2021)',
    tip: 'Palamut sürüsü martıları takip ederek bulunur — denizde martı dönüşü varsa altında balık var.',
  },
  {
    id: 'kalkan', name: 'Kalkan', scientific: 'Scophthalmus maximus', icon: '🦈', accent: '#10b981',
    habitats: ['Kumlu-çamurlu dip', 'Sığ kıta sahanlığı'],
    season: 'Ekim–Mart', minSize: 45, maxWeight: 25,
    depth: '20–70 m · dip balığı',
    bait: ['Canlı küçük balık', 'Kalamar', 'Oktopus'],
    techniques: ['Dip rig ağır kurşun', 'Parakete teknesi', 'Uzun lider dip'],
    taste: 'Türkiye\'nin en değerli deniz balığı. Beyaz et, lezzetli, az kılçıklı.',
    record: 'Türkiye rekoru: 22.5 kg (Karadeniz, 2015)',
    tip: 'Kalkan sabahın ilk ışığında en aktif. Güneş yükselince derin suya çekiler.',
  },
  {
    id: 'kefal', name: 'Kefal', scientific: 'Mugil cephalus', icon: '🐟', accent: '#a78bfa',
    habitats: ['Haliç ve lagünler', 'Nehir ağızları', 'Sığ kıyı'],
    season: 'Yıl boyu · yaz-sonbahar en aktif', minSize: 20, maxWeight: 5,
    depth: '0–10 m · yüzey-orta su',
    bait: ['Ekmek hamuru', 'Yosun', 'Küçük sahte yem'],
    techniques: ['Float rig yüzey', 'Feeder manevra', 'Döner yem'],
    taste: 'Yağlı, güçlü lezzet. Tuzlanmış botargo olarak da değerlendirilir.',
    record: 'Türkiye rekoru: 4.8 kg',
    tip: 'Kefal kışın derin lagünlere toplanır. Soğuk günlerde büyük sürü olasılığı artar.',
  },
  {
    id: 'uskumru', name: 'Uskumru', scientific: 'Scomber colias', icon: '🐠', accent: '#22c55e',
    habitats: ['Açık deniz yüzeyi', 'Kıyı yakını göç'],
    season: 'Eylül–Kasım ve Mart–Nisan göç dönemi', minSize: 18, maxWeight: 1,
    depth: '0–30 m',
    bait: ['Parlak kaşık', 'Sabiki rig (çoklu iğne)', 'Sahte küçük balık'],
    techniques: ['Jigging hafif olta', 'Trolling yavaş', 'Sabiki rig'],
    taste: 'Yağlı, güçlü lezzet. Izgara, marine veya tütsülenmiş olarak tüketilir.',
    record: 'Türkiye rekoru: 900 g',
    tip: 'Sabiki rig (6-8 iğne) ile bir atışta 6-8 uskumru çıkarılabilir. Sürüdeyken hız kritik.',
  },
];

export default function SeaFishDB() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = FISH.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.habitats.some(h => h.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ background: '#0c1420', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Deniz Balıkları DB</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 tür · habitat, teknik & minimum boy</div>
      </div>

      <div style={{ padding: '0 16px 10px' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Balık veya habitat ara..."
          style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', borderRadius: 10, padding: '10px 14px', color: '#f9fafb', fontSize: 13, boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ padding: '0 16px' }}>
        {filtered.map(f => {
          const open = sel === f.id;
          return (
            <div key={f.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : f.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${f.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{f.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{f.name}</div>
                      <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{f.scientific}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: f.accent, fontWeight: 700 }}>Min {f.minSize} cm</div>
                    <div style={{ fontSize: 10, color: '#6b7280' }}>Max ~{f.maxWeight} kg</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${f.accent}33`, borderTop: 'none' }}>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>📅 {f.season}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>📏 {f.depth}</div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                      {f.habitats.map(h => <span key={h} style={{ background: f.accent + '22', color: f.accent, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{h}</span>)}
                    </div>
                    <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                      <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🪱 YEM</div>
                      {f.bait.map(b => <div key={b} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}><span style={{ color: f.accent }}>•</span> {b}</div>)}
                    </div>
                    <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                      <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🎣 TEKNİKLER</div>
                      {f.techniques.map(t => <div key={t} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}><span style={{ color: f.accent }}>•</span> {t}</div>)}
                    </div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>🍽️ {f.taste}</div>
                    <div style={{ fontSize: 11, color: '#fbbf24', marginBottom: 8 }}>🏆 {f.record}</div>
                    <div style={{ background: f.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10, color: f.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                      <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{f.tip}</div>
                    </div>
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
