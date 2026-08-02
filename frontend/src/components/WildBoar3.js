import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  hunting: {
    title: 'Avcilik',
    items: [
      { icon: '🐗', t: 'Av Sezonu', d: 'Turkiye\'de yaban domuzu av sezonu bolgede degisir; izin saglanmali.' },
      { icon: '🔫', t: 'Silah Secimi', d: 'Buyuk kalibre rifle veya buck gulle yetkilendirilmis olup surt atisi tehlikelidir.' },
      { icon: '🌙', t: 'Gece Avi', d: 'Termal veya IR optikli silahla gece avi modern yabani domuz avciliginin etkin yontemi.' },
      { icon: '🐕', t: 'Av Kopegi', d: 'Dingo ve Vizsla gibi kopekler kokuyla tarama ve takip icin idealdir.' },
      { icon: '🌿', t: 'Besleme Noktasi', d: 'Yem istasyonu kurularak belirli noktalarda bekleme avinin daha etkilidir.' },
    ],
  },
  cook: {
    title: 'Pisirme',
    items: [
      { icon: '🔥', t: 'Yaban Domuzu Rosto', d: 'Tane karabiber, biberiye ve sarimsak ile 160C firinda 4-5 saat yavas pisirim.' },
      { icon: '🍲', t: 'Kaynar Güvec', d: 'Domates, sogan ve barbunya ile guveçte pisirim lezzetli ve ekonomiktir.' },
      { icon: '🥩', t: 'Sosis Yapimi', d: 'Yagan et kiyilanip baharatlanarak sosis kalibina doldurulur; olgunlastirmak gerekir.' },
      { icon: '🧂', t: 'Tuzlama', d: 'Buyuk eti bir hafta kuru tuzlama yontemi sogutmak icin hem korur hem lezzetlendirir.' },
      { icon: '❄️', t: 'Dondurma', d: 'Butununu parcalayip portion porsiyonlara bolup vakum ambalajinda dondurabilirsiniz.' },
    ],
  },
};

export default function WildBoar3() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('hunting');
  const data = TABS[tab];
  const accent = '#7f1d1d';
  const bg = '#0c0000';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fee2e2', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐗 Yaban Domuzu Avı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0000', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#ef4444',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180000', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
