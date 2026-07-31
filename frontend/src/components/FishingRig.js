import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RIGS = [
  {
    id: 'carolina', name: 'Carolina Rig', icon: '🪝', accent: '#22c55e',
    use: 'Dip avı · sazan, levrek, yayın',
    parts: ['Kurşun (7-28 g)', 'Boncuk (stopper)', 'Fırdöndü', 'Lider misina (0.25-0.35mm · 30-60cm)', 'Tek iğne'],
    setup: 'Kurşunu ana misinanın üzerine geçir → boncuk koy → fırdöndüye bağla → lider ile iğne bağla. Kurşun dipte süzülür, yem natural hareket eder.',
    depth: '1-10 m · dip',
    best: 'Düz dip, kum veya çamur zemin',
    tip: 'Lider 50-60 cm uzunluğu natural yem hareketini maksimize eder.',
  },
  {
    id: 'texas', name: 'Texas Rig', icon: '🪝', accent: '#f59e0b',
    use: 'Bitkili alan · levrek ve turna için ideal',
    parts: ['Konik kurşun (3-14 g)', 'Worm hook (offset tek iğne)', 'Yumuşak plastik yem (worm veya craw)'],
    setup: 'Konik kurşunu misinanın üzerine diren şekilde tak → yemi iğneye weedless (dikensiz) geçir. Çekilişte yem kopuk gibi görünür.',
    depth: '0.5-4 m · bitkili zemin',
    best: 'Sazlık, nilüfer alanı, batmış ağaç',
    tip: 'Texas rig bitkiye takılmaz — sazlık levreği için en etkili kurulum.',
  },
  {
    id: 'drop_shot', name: 'Drop Shot Rig', icon: '🪝', accent: '#3b82f6',
    use: 'Dikey avlanma · levrek ve sazan',
    parts: ['Drop shot iğnesi', 'Yumuşak plastik yem (küçük)', 'Drop shot kurşunu (tag end)'],
    setup: 'Drop shot iğnesine ters palomar bağla → misina ucuna ağırlık bağla. Yem zeminden 15-40 cm yukarıda durur.',
    depth: '2-15 m · derin su',
    best: 'Derin göl ve baraj dibinde levrek',
    tip: 'Yemi zemine çarptırma — minimal titreşim ile bekle. Levrek yavaş yeme saldırır.',
  },
  {
    id: 'float_rig', name: 'Şamandıra Kurulumu', icon: '🔴', accent: '#ef4444',
    use: 'Yüzey ve orta su · her tür',
    parts: ['Şamandıra (boyuta uygun)', 'Şamandıra stoperi', 'Fırdöndü', 'Lider', 'İğne (tek veya çift)'],
    setup: 'Stopper → şamandıra → boncuk → fırdöndü → lider → iğne sırasıyla geçir. Şamandıra balık derinliğine göre ayarlan.',
    depth: '0.5-4 m (şamandıra ayarına göre)',
    best: 'Kanallarda akıntı, sazlık kenarı',
    tip: 'Şamandıra hafif eğiliyorsa yem yerleşiyor; tam batıyorsa çek!',
  },
  {
    id: 'feeder', name: 'Feeder Rig', icon: '⚙️', accent: '#a78bfa',
    use: 'Sazan yarışması tekniği · kesin sonuç',
    parts: ['Feeder kafesi (metodlu veya açık)', 'Feeder lider (0.25-0.30mm)', 'Çengel iğne (size 10-16)', 'Yem (groundbait)'],
    setup: 'Kafesi groundbait ile doldur → feeder lider (30-40 cm) ile iğneye bağla. Kafes dibe çökelince yem açılır, lider balığı çeker.',
    depth: '2-6 m · dip',
    best: 'Sakin su, düz dip · yarışma tarzı',
    tip: 'Aynı noktaya sürekli atış yaparak yem cebi (baiting spot) oluştur. 20-30 atış sonra balık toplanır.',
  },
];

const LEADERS = [
  { material: 'Monofilament', uses: 'Tüm teknikler · esneme avantajı', strengths: 'Esnek, ucuz', weakness: 'UV ile zayıflar' },
  { material: 'Fluorocarbon', uses: 'Şeffaf su · görünmez lider', strengths: 'Suda görünmez, sert', weakness: 'Daha pahalı' },
  { material: 'Braid (örgü)', uses: 'Hassas his gerekince ana hat', strengths: 'Güç, his', weakness: 'Görünür' },
  { material: 'Wire (çelik)', uses: 'Turna için (diş kesimine karşı)', strengths: 'Kesilmez', weakness: 'Sert, esneme yok' },
];

export default function FishingRig() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('rigs');

  return (
    <div style={{ background: '#050f0a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⚙️ Olta Kurulumları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 kurulum · adım adım montaj & kullanım</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['rigs','Kurulumlar'],['leaders','Misina']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0a180f', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'rigs' && RIGS.map(r => {
          const open = sel === r.id;
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#0a180f', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 28 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>{r.use}</div>
                    </div>
                  </div>
                  <span style={{ background: r.accent + '22', color: r.accent, borderRadius: 20, padding: '2px 8px', fontSize: 10 }}>{r.depth}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a180f', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  <div style={{ background: '#1a2820', borderRadius: 8, padding: '8px 10px', margin: '8px 0' }}>
                    <div style={{ fontSize: 10, color: r.accent, fontWeight: 600, marginBottom: 4 }}>🔧 PARÇALAR</div>
                    {r.parts.map((p, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}><span style={{ color: r.accent }}>·</span> {p}</div>)}
                  </div>
                  <div style={{ background: '#1a2820', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 600, marginBottom: 4 }}>⚙️ MONTAJ</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{r.setup}</div>
                  </div>
                  {[['🎯 En İyi', r.best]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: r.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: r.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: r.accent, fontWeight: 600, marginBottom: 3 }}>💡 PRO</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{r.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'leaders' && (
          <div style={{ background: '#0a180f', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🧵 Lider Misina Seçimi</div>
            {LEADERS.map((l, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < LEADERS.length-1 ? '1px solid #1a2820' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', marginBottom: 4 }}>{l.material}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>{l.uses}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ background: '#22c55e22', color: '#22c55e', borderRadius: 6, padding: '2px 6px', fontSize: 10 }}>✅ {l.strengths}</span>
                  <span style={{ background: '#ef444422', color: '#ef4444', borderRadius: 6, padding: '2px 6px', fontSize: 10 }}>⚠️ {l.weakness}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
