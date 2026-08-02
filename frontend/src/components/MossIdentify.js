import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  types: {
    title: 'Türler',
    items: [
      { icon: '🌿', t: 'Tür çeşitliliği', d: 'Türkiye\'de 600+ yosun türü. Nemli orman, kaya yüzeyi, dere kenarı.' },
      { icon: '💧', t: 'Sphagnum', d: 'Bataklık yosunu: su emer. Nemli ormanda nem göstergesi. Tıp tarihinde kullanıldı.' },
      { icon: '🌲', t: 'Hypnum', d: 'Halı yosunu: kaya ve kütük üzeri. Kuzey yüzü, nemli habitatlar.' },
      { icon: '🏔️', t: 'Polytrichum', d: 'Karaçam yosunu: büyük, dik yaprak. Çam ormanı altı. Kuzey tarafı.' },
    ],
  },
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '🧭', t: 'Yön tayini', d: 'Yosun ağırlıklı kuzey yüzde büyür. Ama emin olmak için birden fazla ağacı kontrol et.' },
      { icon: '💧', t: 'Nem ölçer', d: 'Yosunun yoğunluğu: nem durumunu gösterir. Kılavuz türler: bölge nemi.' },
      { icon: '♻️', t: 'Ekosistem rolü', d: 'Su tutma, ısı tampon, küçük canlı evi. Ormanda kritik fonksiyon.' },
      { icon: '⚠️', t: 'Koruma', d: 'Koparma: yosun yeniden gelişemez. Fotoğrafla. Gözle yetinilmeli.' },
    ],
  },
};

export default function MossIdentify() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yosun Tanımlama</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · ekoloji · kılavuz</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#166534' : '#030e06', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#030e06', borderRadius: 14, padding: 14, border: '1px solid #16653433' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #06180a' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
