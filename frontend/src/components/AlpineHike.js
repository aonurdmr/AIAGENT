import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  route: {
    title: 'Rotalar',
    items: [
      { icon: '🏔️', t: 'Kaçkar Dağları', d: 'Karadeniz bölgesinin zirvesi; Deniz Gölü ve Avusor platosu klasik güzergah.' },
      { icon: '⛰️', t: 'Ağrı Dağı', d: '5137 metre zirve, teknik tırmanış için izin ve rehber zorunludur.' },
      { icon: '🌊', t: 'Toros Yüksek Yaylası', d: 'Bolkar ve Aladağlar alpın çayırları ve yaban hayatıyla öne çıkar.' },
      { icon: '🗺️', t: 'Harita ve GPS', d: 'Türkiye 1:25000 ölçek haritaları askeri birimlerde, dijitali OpenTopoMap.' },
      { icon: '🧭', t: 'Güzergah Planlama', d: 'Wikiloc ve AllTrails platformunda Türkiye izleri bulunabilir.' },
    ],
  },
  safety: {
    title: 'Güvenlik',
    items: [
      { icon: '🌨️', t: 'Hava Durumu', d: 'Alpin bölgede hava saatler içinde değişir; her zaman plan B hazır olsun.' },
      { icon: '🎒', t: 'Temel Ekipman', d: 'Su geçirmez ceket, katmanlı giysi, enerji yiyeceği, ilk yardım kiti zorunlu.' },
      { icon: '📡', t: 'İletişim', d: 'Sat telefon veya PLB cihazı yüksek irtihalı bölgeler için hayat kurtarır.' },
      { icon: '👥', t: 'Grup Kuralı', d: 'Asla yalnız çıkmayın; en az 3 kişilik grup ve bir deneyimli rehber önerilir.' },
      { icon: '🏥', t: 'Yükseklik Hastalığı', d: '2500 metre üzeri yavaş çıkın; baş ağrısı, bulantı belirtisi varsa inin.' },
    ],
  },
};

export default function AlpineHike() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('route');
  const data = TABS[tab];
  const accent = '#1d4ed8';
  const bg = '#000410';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dbeafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🏔️ Alpin Yürüyüş</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#000c24', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#60a5fa',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001028', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#93c5fd', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
