import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🌙', t: 'Gece Avı Avantajı', d: 'Birçok balık türü gece aktif; azalmış ışık balığın kıyıya yaklaşmasını sağlar.' },
      { icon: '🔦', t: 'Işıklı Olta', d: 'Kimyasal ışık çubuğu olta ucuna; suda görünürlük ve ibre hareketi izleme.' },
      { icon: '🎣', t: 'Hedef Türler', d: 'Levrek, karagöz ve yılan balığı gece aktif; kıyı kayalıkları üretken nokta.' },
      { icon: '🌊', t: 'Lokasyon', d: 'Köprüler, iskele ayakları ve ışıklı sahil yakınları; ışık plankton çeker.' },
      { icon: '🧲', t: 'Yem Seçimi', d: 'Canlı yem gece avında etkili; yapay kalamar ve fosforlu lure de kullanılır.' },
    ],
  },
  safety: {
    title: 'Güvenlik',
    items: [
      { icon: '💡', t: 'Baş Feneri', d: 'El serbest aydınlatma; kırmızı ışık gece görüşünü bozmadan seçilmeli.' },
      { icon: '🦺', t: 'Can Yeleği', d: 'Karanlıkta yanlış adım riski artmış; kayalıklarda can yeleği giyiniz.' },
      { icon: '📱', t: 'İletişim', d: 'Tam şarjlı telefon; acil durumda yeri bildirmeye yetecek pil zorunlu.' },
      { icon: '🌡️', t: 'Nem ve Soğuk', d: 'Sahil geceleri ıslak soğuk; ekstra kat kıyafet ve yedek çorap götürün.' },
      { icon: '👥', t: 'Arkadaşla Git', d: 'Gece tek başına kıyı avı riskli; en az iki kişi güvenliği artırır.' },
    ],
  },
};

export default function NightFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];
  const accent = '#1e3a5f';
  const bg = '#000410';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dbeafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌙 Gece Balıkçılığı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001228', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#001830', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
