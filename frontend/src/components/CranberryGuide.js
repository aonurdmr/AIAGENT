import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Bulma',
    items: [
      { icon: '🍒', t: 'Yabani Vişne', d: 'Prunus cerasus ve P. avium yabani formlari; orman kenari ve daglarda.' },
      { icon: '📅', t: 'Hasat Donemi', d: 'Haziran-Temmuz; meyve koyulasinca ve tam olgunlasinca toplanmali.' },
      { icon: '🌳', t: 'Agac Tanima', d: 'Parlak koyu yesil yapraklar; ilkbahar beyaz cicekler; gövde kiremit rengi.' },
      { icon: '🧺', t: 'Toplama', d: 'Elle tek tek veya sepete silkeleme; bozuk ve bocelenmis meyveleri alin.' },
      { icon: '🌍', t: 'Lokasyon', d: 'Karadeniz dag etekleri; Giresun, Trabzon, Artvin visen parcelleri genis.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍯', t: 'Vişne Reçeli', d: 'Saplı yabani vişne reçeli; çekirdeği çıkarmak yorucu ama lezzet değer.' },
      { icon: '🧃', t: 'Meyve Suyu', d: 'Antioksidan bakımından zengin koyu kırmızı vişne suyu; günlük sağlık içeceği.' },
      { icon: '🍷', t: 'Vişne Likörü', d: 'Vişneli ev yapımı likör; şeker ve alkol ile hazırlanan geleneksel içecek.' },
      { icon: '🍨', t: 'Dondurma', d: 'Taze vişne ve yoğurtla ev yapımı dondurma; Karadeniz yaz geleneği.' },
      { icon: '💊', t: 'Sağlık', d: 'Antosiyanin iltihap önleyici; uyku kalitesini artırır; melatonin içerir.' },
    ],
  },
};

export default function CranberryGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#be123c';
  const bg = '#0a0006';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fce7f3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🍒 Yabani Vişne</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1a0010', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fb7185',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#160010', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
