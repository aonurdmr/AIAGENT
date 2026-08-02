import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '🐗', t: 'Yaşam alanı', d: 'Meşe ormanı kenarı, çalılık ve tarla sınırı. Gündüz sık çalılıkta gizlenir.' },
      { icon: '🌰', t: 'Beslenme', d: 'Meşe palamudu, yumru, solucan, böcek. Kaza sonucu tarla zararı.' },
      { icon: '🐖', t: 'Sosyal yapı', d: 'Dişiler ve yavrular sürü. Erkek yalnız veya küçük grup. Hiyerarşik.' },
      { icon: '📅', t: 'Üreme', d: 'Kış üremesi: Kasım-Ocak. İlkbaharda yavru. Çizgili yavru: koruma altı.' },
    ],
  },
  sign: {
    title: 'İzler',
    items: [
      { icon: '💧', t: 'Çamur banyosu', d: 'Su birikintisi kenarı: çamur yuvası. Parazit uzaklaştırma ve termoregülasyon.' },
      { icon: '🪵', t: 'Kazı', d: 'Kazılmış toprak alanı: mısır ve yumru arama izi. Taze ise aktif bölge.' },
      { icon: '🌲', t: 'Sürme', d: 'Alçak ağaç kabuğu sürme: sarı reçine, kıl. Sınır ve kaşınma.' },
      { icon: '🐾', t: 'İz', d: 'İki toynak yuvarlak: 5-8 cm. Çamurda net. Pençe izi yoktur.' },
    ],
  },
};

export default function WildBoarBehavior() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('ecology');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐗 Domuz Ekolojisi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekoloji · davranış · izler</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#7c2d12' : '#0e0c00', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0e0c00', borderRadius: 14, padding: 14, border: '1px solid #7c2d1233' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #181200' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fdba74' }}>{item.t}</div>
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
