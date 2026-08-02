import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanıma',
    items: [
      { icon: '🦢', t: 'Kaşıkçı', d: 'Platalea leucorodia; beyaz tüy ve ucu yassı kasik bicimli gaga ile taninir.' },
      { icon: '🥄', t: 'Gaga Ozelligi', d: 'Ucu genislemis kasik biçimli siyah gaga; sularda sallayarak avlama yontemi.' },
      { icon: '🌊', t: 'Habitat', d: 'Siglik deltalar, lagünler ve tuzlu bataklıklar; Gediz ve Kızılırmak deltası.' },
      { icon: '📅', t: 'Donem', d: 'Nisan-Eylul kuzey Turkiye de ureme donemi; Akdeniz de kislik bireyleri.' },
      { icon: '🔭', t: 'Gozlem Ipucu', d: 'Sabah kıyı sığlığında beslenirken kafayı sağa-sola sallama; karakteristik.' },
    ],
  },
  conservation: {
    title: 'Koruma',
    items: [
      { icon: '⚠️', t: 'Durum', d: 'Avrupa nüfusu yaklaşık 25.000; delta habitatı bozulması tehdit unsuru.' },
      { icon: '🌿', t: 'Delta Koruma', d: 'Gediz deltası Ramsar alanı statüsünde; tarım ve tuzla örtüşme baskısı.' },
      { icon: '🚣', t: 'Tekne Saygısı', d: 'Beslenen kaşıkçılara 50 metreden yaklaşmayın; ürkerek beslenmeyi bırakırlar.' },
      { icon: '📡', t: 'Halkalama', d: 'Renk halkalı bireyler Hollanda üremesinden gelen bireyleri izlememizi sağlar.' },
      { icon: '🤝', t: 'Gönüllü', d: 'Doğa Derneği delta sayım çalışmaları; fotoğraf ve gözlem kaydı paylaşın.' },
    ],
  },
};

export default function SpoonbillWatch() {
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
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦢 Kaşıkçı Kuşu</span>
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
