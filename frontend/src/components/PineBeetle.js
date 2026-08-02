import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanıma',
    items: [
      { icon: '🐛', t: 'Kabuk Böceği', d: 'Ips ve Dendroctonus cinsleri; çam kabuğu altında karakteristik galeriler açar.' },
      { icon: '🌲', t: 'Zarar Belirtisi', d: 'Sarı-kahverengiye dönen ibre, reçine sızıntısı ve gövdede delik delikleri.' },
      { icon: '🔴', t: 'Kuruma Süreci', d: 'Ağaç enfeksiyondan 2-4 hafta sonra kızarmaya, 6-8 haftada kurumaya başlar.' },
      { icon: '📅', t: 'Uçuş Dönemi', d: 'Mayıs-Haziran ve Ağustos-Eylül olmak üzere yılda 2 uçuş dönemi yaşanır.' },
      { icon: '🏔️', t: 'Risk Bölgeleri', d: 'Kurak stres altındaki kızılçam ve karaçam ormanları en yüksek risk grubunda.' },
    ],
  },
  control: {
    title: 'Kontrol',
    items: [
      { icon: '🪤', t: 'Feromon Tuzak', d: 'Böcek uçuş döneminde kurulan feromon tuzaklar populasyon takibini sağlar.' },
      { icon: '🌿', t: 'Sağlıklı Orman', d: 'Karışık meşçere ve uygun sıklık saldırı riskini önemli ölçüde azaltır.' },
      { icon: '🔥', t: 'Zamanında Kesim', d: 'Enfekteli ağaçlar uçuş öncesi kesilip uzaklaştırılmalı; yerinde bırakmayın.' },
      { icon: '💧', t: 'Su Stresi', d: 'Kuraklık döneminde yeterli toprak nemi böcek direncini artırır.' },
      { icon: '📞', t: 'İhbar Hattı', d: 'OGM Orman Muhafaza ve Yangın Dairesi; tespitte hemen bildirim yapın.' },
    ],
  },
};

export default function PineBeetle() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#78350f';
  const bg = '#0a0300';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌲 Çam Böceği</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#180800', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fbbf24',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#140600', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fcd34d', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
