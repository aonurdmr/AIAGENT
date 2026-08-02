import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  {
    id: 'owl', name: 'Baykuşlar', icon: '🦉', accent: '#a78bfa',
    birds: [
      { n: 'Puhu (Büyük Kulak)', s: 'Türkiye en büyük baykuşu — kulak tutamları belirgin. Derin ses: "ho-ho-ho-hoooo"' },
      { n: 'Peçeli Baykuş', s: 'Kalp şeklinde yüz, soluk renk. "Tssssss" ses, ahır ve kilisede yuva' },
      { n: 'Kukumav (Kaya)', s: 'Küçük, "kuvvvv" sesi. Kaya ve bina duvarında. Şehirde de yaşar' },
      { n: 'Alçak Baykuş', s: 'Orman ve fundalık. Sarı göz. Yumuşak "hooo-hooo"' },
      { n: 'İshak Kuşu', s: 'Küçük, çizgili. "Tüi-ii" ince ses. Orman içi, gizli' },
    ],
    obs: 'Gün batımından 1 saat sonra başlar. Puhuya ses yaparak cevap alabilirsin.',
  },
  {
    id: 'nightjar', name: 'Çobanaldatan', icon: '🌙', accent: '#f97316',
    birds: [
      { n: 'Çobanaldatan', s: 'Sürekli "rrrrrrr" motorlu ses. Ağaç dalında yatar, kamuflaj mükemmel' },
      { n: 'Avrupa Çobanaldatanı', s: 'Kanat vuruşunda beyaz leke. Alacakaranlıkta böcek avlar' },
    ],
    obs: 'Mayıs-Eylül arası. Alacakaranlıkta fundalık ve orman kenarında sesini çıkar.',
  },
  {
    id: 'heron', name: 'Gece Balıkçıl', icon: '🦤', accent: '#06b6d4',
    birds: [
      { n: 'Gece Balıkçılı', s: 'Kısa boyun, siyah sırt, gri-beyaz alt. "Kwak" sesi. Gece su kenarında avlanır' },
      { n: 'Alaca Balıkçıl', s: 'Alacalı çizgili, küçük. Saz içinde gizli, gece aktif' },
    ],
    obs: 'Su kenarı, bataklık. Gün batımından sonra besleme turununa çıkar.',
  },
  {
    id: 'migration', name: 'Gece Göçmen Kuşlar', icon: '⭐', accent: '#22c55e',
    birds: [
      { n: 'Gece Göçü', s: 'Çoğu küçük ötücü gece uçar — yıldızlarla yön tayin eder' },
      { n: 'Flamingo', s: 'Gece boyunca düz uçuş — yüksek irtifada "hünk-hünk" sesi' },
      { n: 'Turna (Kara)', s: 'Gece göçünde "kru-kru" derin ses — görünmez ama duyulur' },
    ],
    obs: 'Eylül-Kasım göç sezonu. Sakin gecelerde yukarı bak — ötüşü duyarsın.',
  },
];

export default function NightBirds() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#04040e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦉 Gece Kuşları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Baykuş · çobanaldatan · gece balıkçıl · gece göçü</div>
      </div>

      <div style={{ background: '#080812', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #a78bfa33' }}>
        <div style={{ fontSize: 11, color: '#a78bfa', fontWeight: 700 }}>🌙 GÖZLEM İPUCU</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Gece kuşu gözlemi için: tam karanlık + sessizlik. Işık veya sesi ile cevap aldığında hemen sus, yaklaşmasına izin ver.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SPECIES.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#080812', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.birds.length} tür</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#080812', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.birds.map((b, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #10101c' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{b.n}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{b.s}</div>
                    </div>
                  ))}
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 10 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>🔭 {s.obs}</div>
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
