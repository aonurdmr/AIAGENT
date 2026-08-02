import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Toplama',
    items: [
      { icon: '🍓', t: 'Yabani ahududu', d: 'Rubus idaeus: kırmızı, tüylü dal. Orman kenarı, kayalık açıklık. Temmuz-Ağustos.' },
      { icon: '🫐', t: 'Yabani çilek', d: 'Fragaria vesca: küçük, yoğun tatlı. Güneşli çayır. Haziran-Temmuz.' },
      { icon: '⚫', t: 'Böğürtlen', d: 'Rubus fruticosus: kara meyve, dikenli. Çit ve yol kenarı. Temmuz-Eylül.' },
      { icon: '⚠️', t: 'Uyarı', d: 'Solanum (köpek üzümü): parlak siyah ZEHİRLİ. Üçlü yaprak böğürtlenden farklı.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🫙', t: 'Reçel', d: 'Ahududu + şeker eşit ağırlık: 20 dk kısık ateş. Vanilya çubuğu ekle.' },
      { icon: '🧁', t: 'Taze yeme', d: 'Hemen ye: meyve çabuk bozulur. Ormanda taze tat eşsizdir.' },
      { icon: '❄️', t: 'Dondurma', d: 'Tek kat dondur: yapışmaz. Torbaya aktar, 1 yıl saklanır. Smoothie için ideal.' },
      { icon: '🍵', t: 'Çay', d: 'Yapraklar da kullanılır: hafif aromalı çay. Kuru yaprak + sıcak su 5 dk.' },
    ],
  },
};

export default function WildRaspberry() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];

  return (
    <div style={{ background: '#08000a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍓 Yabani Meyveler</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Toplama · tanımlama · kullanım</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#9d174d' : '#140016', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#140016', borderRadius: 14, padding: 14, border: '1px solid #9d174d33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1e001e' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f9a8d4' }}>{item.t}</div>
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
