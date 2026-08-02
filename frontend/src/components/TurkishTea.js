import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  plants: {
    title: 'Bitkiler',
    items: [
      { icon: '🍵', t: 'Çay Bitkisi', d: 'Camellia sinensis; Rize bölgesinde yetiştirilen Türk çayı dünya çayı üretiminde önemli.' },
      { icon: '🌿', t: 'Kekik Çayı', d: 'Thymus vulgaris ve T. serpyllum; göğüs rahatsızlıklarına karşı geleneksel kullanım.' },
      { icon: '🌸', t: 'Ihlamur', d: 'Tilia tomentosa; sarı çiçekler Haziran-Temmuz; sakinleştirici ve bağışıklık güçlendirici.' },
      { icon: '🌹', t: 'Kuşburnu', d: 'Rosa canina; C vitamini açısından çok zengin; kurusu ile kış çayı hazırlanır.' },
      { icon: '💜', t: 'Adaçayı', d: 'Salvia officinalis; boğaz ağrısı, hormonal denge ve bellek için geleneksel kullanım.' },
    ],
  },
  prepare: {
    title: 'Hazırlık',
    items: [
      { icon: '🫖', t: 'Demleme Süresi', d: 'Yeşil çay 2-3 dakika, siyah çay 3-5 dakika, bitki çayları 5-7 dakika.' },
      { icon: '🌡️', t: 'Su Sıcaklığı', d: 'Yeşil çay 70-80C; siyah çay 90-95C; bitki çayları kaynar su ile demlenebilir.' },
      { icon: '🌿', t: 'Kurutulmuş vs Taze', d: 'Taze bitkilerde 3 kat daha fazla malzeme gerekir; kurusu daha yoğun aromayı taşır.' },
      { icon: '🍯', t: 'Tatlılandırma', d: 'Çiçek balı veya taş şeker geleneksel tercih; rafine şeker aromayı bastırır.' },
      { icon: '🫙', t: 'Saklama', d: 'Kurutulmuş bitkiler hava geçirmez koyu cam kapta ışıktan uzak saklanmalı.' },
    ],
  },
};

export default function TurkishTea() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('plants');
  const data = TABS[tab];
  const accent = '#be123c';
  const bg = '#0a0006';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ffe4e6', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🍵 Doğal Çaylar</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0010', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#f43f5e',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180010', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fda4af', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
