import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanıma',
    items: [
      { icon: '🍄', t: 'Güvenli Kurallar', d: 'Kesin tanımlamadan önce asla yemeyin; şüphede bırakın, atmayın.' },
      { icon: '🌿', t: 'Habitat İpuçları', d: 'Orman tipi (meşe/çam/kayın) ile mantar türü arasında güçlü korelasyon vardır.' },
      { icon: '👃', t: 'Koku Testi', d: 'Anız, un veya hoş koku genellikle yenilebilirliğe işaret eder; fenol acı tehlike.' },
      { icon: '📖', t: 'Alan Rehberi', d: 'Türkiye için Ömer Yıldız "Türkiye Mantarları" kitabı ve foto rehberleri şarttır.' },
      { icon: '🔬', t: 'Spor Baskısı', d: 'Şapkayı kağıda basarak alınan spor baskısı tür tespitinde kesin bilgi verir.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🧈', t: '70 tereyağlı kavurma', d: 'Taze mantarı tereyağında sarımsakla 5-7 dakika kavurun; tuz ekleyin.' },
      { icon: '🥘', t: 'Mantar Çorbası', d: 'Soğan, sarımsak, krema ve et suyuyla hazırlanan çorba klasik bir tariftir.' },
      { icon: '☀️', t: 'Kurutma', d: 'İnce dilimlenmiş mantarlar gölgede veya dehidratörde 6-8 saatte kurur.' },
      { icon: '🍝', t: 'Mantar Risotto', d: 'Porçini veya kültür mantarıyla yapılan İtalyan pilavı temel tarifte kullanılır.' },
      { icon: '🫙', t: 'Turşu', d: 'Sirkeli turşu korunan alanı olmayanlar için uzun süre saklanabilir.' },
    ],
  },
};

export default function WildMushroom() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#854d0e';
  const bg = '#080200';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef9c3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🍄 Yabani Mantar</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#180a00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#ca8a04',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#140800', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fde047', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
