import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Kuru sinek', d: 'Dry fly: su yuzeyinde. Alabalik yukari gelir. Doğal surukleme kritik.' },
      { icon: '🌊', t: 'Islak sinek', d: 'Wet fly: dip veya orta su. Nymph taklidi. Aşağı ve karşıya atış.' },
      { icon: '🪱', t: 'Nymph', d: 'Gozle gorulmez sinek larvasi: kanca + yuk. Indicator ile surukleme.' },
      { icon: '🎪', t: 'Kamis kontrolu', d: 'Esnek kamis: kamis ucuyla sinek suruklenir, gerginlik hissi sart.' },
    ],
  },
  flies: {
    title: 'Sinekler',
    items: [
      { icon: '🦟', t: 'Elk Hair Caddis', d: 'Evrensel kuru sinek: geyik kilı kanat. Neredeyse her nehirde calisir.' },
      { icon: '🐝', t: 'Hare Ear Nymph', d: 'Tavsan kulagi nymph: kirli tuy. Alabalik ve salmonid icin temel.' },
      { icon: '🎯', t: 'Woolly Bugger', d: 'Akıllı streamer: buyuk balik. Gece ve bulasik suda cok etkili.' },
      { icon: '🌿', t: 'Adams', d: 'Klasik kuru sinek: gri beden, koyu kanat. Sabah hatalanmasinda ideal.' },
    ],
  },
};

export default function FlyfishingGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Fly Fishing Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · sinekler · alabalik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0ea5e9' : '#04101a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04101a', borderRadius: 14, padding: 14, border: '1px solid #0ea5e933' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081a28' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
