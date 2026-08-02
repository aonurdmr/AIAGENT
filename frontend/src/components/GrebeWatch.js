import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanıma',
    items: [
      { icon: '🐦', t: 'Batağan', d: 'Podiceps cristatus ve P. nigricollis; sulak alanlarda yüzen dalgıç kuşlar.' },
      { icon: '💎', t: 'Üreme Tüyü', d: 'Baharda uzun baş tüyü ve yanak süsü; tüy balesi muhteşem görsellik.' },
      { icon: '🤿', t: 'Dalış', d: '30-40 saniye dalış; kanatları yanında tutarak yüzerek avlanma tekniği.' },
      { icon: '🌊', t: 'Habitat', d: 'Sazlıklı göller ve yavaş akan nehirler; Burdur, Beyşehir ve Tuz Gölü.' },
      { icon: '🧪', t: 'Tüy Bakımı', d: 'Yılın büyük bölümü tüyleri bakım; yağlı tüyler soğuk suya karşı yalıtım.' },
    ],
  },
  behaviour: {
    title: 'Davranış',
    items: [
      { icon: '💃', t: 'Dans Ritüeli', d: 'Kur dansı birbirine koşma, kafaları sallama ve suya dalma; eşsiz gösteri.' },
      { icon: '🥚', t: 'Üreme', d: 'Yüzen yuva inşaatı; 3-5 yumurta; her iki ebeveyn kuluçka sırasını paylaşır.' },
      { icon: '🐟', t: 'Beslenme', d: 'Balık ve büyük böcek; yiyecekleri tamamen yutar; balık başı önce iner.' },
      { icon: '🌿', t: 'Tüy Yeme', d: 'Kendi tüylerini yer; balık kılçıklarını sindirime kadar tutmak için sindirim yardımı.' },
      { icon: '🔭', t: 'Gözlem Noktası', d: 'Burdur Gölü kıyısı, Yarışlı ve Eğirdir Gölü; sabah erken dal-çık gözlemi.' },
    ],
  },
};

export default function GrebeWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#0891b2';
  const bg = '#000c14';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#cffafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐦 Batağan Gözlemi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001828', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#22d3ee',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001e30', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#67e8f9', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
