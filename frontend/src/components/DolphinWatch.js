import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🐬', t: 'Şişe burunlu', d: 'Tursiops truncatus: en tanınan. Akdeniz ve Karadeniz. Tekne yaklaşır.' },
      { icon: '🌊', t: 'Çizgili yunus', d: 'Stenella coeruleoalba: Akdeniz derin açık sular. Hızlı, akrobatik.' },
      { icon: '🐟', t: 'Murmur', d: 'Phocoena phocoena: Karadeniz\'de. Küçük, çekingen. Tekne kaçar.' },
      { icon: '🐋', t: 'Kâtil balina', d: 'Grampus griseus: büyük. Ege derin kanallarında nadir gözlem.' },
    ],
  },
  watch: {
    title: 'Gözlem',
    items: [
      { icon: '⛵', t: 'Tekne etik', d: 'Hız düşür, motor kapat yak. 50m mesafe koru. Yunus gelirse şans.' },
      { icon: '📅', t: 'En iyi sezon', d: 'Haziran-Eylül: Akdeniz seyahati. Karadeniz: yıl boyu mümkün.' },
      { icon: '🔭', t: 'Gözlem noktası', d: 'Foça, Datça, Bodrum: dalyan kanalları. Sabah erken saatler.' },
      { icon: '📷', t: 'Fotoğraf', d: 'Süreksel fin fotoğrafla: bireysel tanımlama. Araştırmacılara gönder.' },
    ],
  },
};

export default function DolphinWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#010c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐬 Yunus Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · gözlem · etik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0369a1' : '#021828', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#021828', borderRadius: 14, padding: 14, border: '1px solid #0369a133' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #032438' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>{item.t}</div>
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
