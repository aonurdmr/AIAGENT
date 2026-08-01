import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'zones', name: 'Nehir Bölgeleri', icon: '🏞️', accent: '#06b6d4',
    items: [
      { t: 'Kaynak (üst bölüm)', d: 'Soğuk, oksijeni yüksek, dar. Alabalık ve çipura habitatı.' },
      { t: 'Orta nehir', d: 'Geniş, derin havuzlar, akıntı-durgun dönüşümü. Çeşitli tür.' },
      { t: 'Alt nehir (ağız)', d: 'Geniş, yavaş, çamur dip. Sazan ve yayın balığı. Göç köprüsü.' },
      { t: 'Güçlü akıntı', d: 'Oksijenli, soğuk. Böcek larvası bol — alabalık beslenme.' },
      { t: 'Durgun havuz', d: 'Büyük balık dinlenme noktası. Çarpaçıl ve sazan.' },
    ],
  },
  {
    id: 'life', name: 'Nehir Canlıları', icon: '🐟', accent: '#22c55e',
    items: [
      { t: 'Alabalık', d: 'Üst nehir. Soğuk ve oksijen. Böcek avlama. Kanca tuzağı.' },
      { t: 'Sazan', d: 'Orta-alt. Çamur dip. Bitki kökü eşeleme. Yaz yemlenme.' },
      { t: 'Turna', d: 'Bitki kenarı pusu. Her nehir bölümünde. Yırtıcı balık.' },
      { t: 'Yayın', d: 'Dip, gece aktif. Alt nehir ve derin havuz. Büyük canlı yem.' },
      { t: 'Kurbaga ve su samuru', d: 'Gösterge tür — temiz su kanıtı. Gözlem değeri yüksek.' },
    ],
  },
  {
    id: 'health', name: 'Nehir Sağlığı', icon: '🌿', accent: '#a78bfa',
    items: [
      { t: 'Macroinvertebrates', d: 'Zıpzıp, sümüklü böcek larva: temiz suyun biyolojik göstergesi.' },
      { t: 'Su kalitesi', d: 'Berraklık, koku, yüzey köpüğü — kirlilik sinyali.' },
      { t: 'Yabancı tür', d: 'Yayın balığı ve çeşitli dışarıdan türler doğal dengeyi bozar.' },
      { t: 'Kıyı bitkileri', d: 'Söğüt ve alder bant: banka stabilitesi ve gölge — alabalık için şart.' },
    ],
  },
];

export default function RiverEcology() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏞️ Nehir Ekolojisi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Nehir bölgeleri · canlılar · sağlık göstergeleri</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#040e18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#040e18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #08141e' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{item.t}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
