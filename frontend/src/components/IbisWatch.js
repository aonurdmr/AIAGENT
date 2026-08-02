import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  biology: {
    title: 'Biyoloji',
    items: [
      { icon: '🦢', t: 'Kelaynak Türü', d: 'Geronticus eremita; Türkiye en son doğal Kelaynak topluluğuna ev sahipliği yapar.' },
      { icon: '🏘️', t: 'Biricik Koloni', d: 'Birecik (Şanlıurfa) kolonisi 1970lerden bu yana yarı-evcil koruma altındadır.' },
      { icon: '🐛', t: 'Beslenme', d: 'Böcekler, kertenkele ve küçük tarla faresi gibi küçük hayvanları gagasıyla arar.' },
      { icon: '🪺', t: 'Yuvalama', d: 'Uçurum ve yüksek kayalıklarda koloniler halinde yuvalar; Mart-Temmuz ürer.' },
      { icon: '🔴', t: 'Tehlike Durumu', d: 'IUCN Kırmızı Liste "Kritik Tehlike" kategorisinde; küresel nüfus 700 altında.' },
    ],
  },
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '📍', t: 'Birecik Koruma Evi', d: 'Birecik Kelaynak Kuş Evi ziyaretçilere açık; kuşlar Şubat-Temmuz döneminde burada.' },
      { icon: '📅', t: 'Göç Dönemi', d: 'Temmuz-Ağustos arası Kuzey Afrika kışlaklarına göç eder; sonbahar geri döner.' },
      { icon: '📸', t: 'Fotoğraf İzinleri', d: 'Koruma alanında çekim için önceden yetkili rehber ile randevu gereklidir.' },
      { icon: '🤝', t: 'Destek', d: 'Doğa Derneği ve BirdLife Türkiye koruma programlarına bağış ve gönüllülük.' },
      { icon: '📱', t: 'Raporlama', d: 'Görülen her Kelaynak gözlemi eBird ve Doğa Derneği platformuna rapor edilmeli.' },
    ],
  },
};

export default function IbisWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('biology');
  const data = TABS[tab];
  const accent = '#be185d';
  const bg = '#0a0006';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fce7f3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦢 Kelaynak Gözlemi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1e0010', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#ec4899',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180010', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#f9a8d4', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
