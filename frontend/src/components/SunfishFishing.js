import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Jigging', d: 'Cipura jigging: 30-100g jig, derin noktalar. Hızlı kalkis-inis hareketi.' },
      { icon: '🐟', t: 'Canlı yem', d: 'Canlı hamsi: cipura icin en etkili. Kanca sırta degil arka yüzgece.' },
      { icon: '🦐', t: 'Karides', d: 'Taze veya canli karides: sığ kayalik ve pos alanlarında. Gece etkin.' },
      { icon: '🪁', t: 'Casting', d: 'Topwater lure ile koy girislerinde casting: levrek gibi cipura vurur.' },
    ],
  },
  spots: {
    title: 'Noktalar',
    items: [
      { icon: '🪨', t: 'Kayalik dip', d: 'Cipura kayalik: sarp dip, kayalik yamac. Denizde 15-40m aralik.' },
      { icon: '⚓', t: 'Akintı', d: 'Haliç ve bogaz akintisi: cipura enerji tasarrufu icin dip bekler.' },
      { icon: '🐚', t: 'Midye tarlasi', d: 'Midye kulturu: cipura midye yeder. Kafes yakinı kontrol et.' },
      { icon: '🌅', t: 'Sabah erken', d: 'Cipura: alacakaranlık sabahı kayalıkta aktif. Ilk 2 saat verimli.' },
    ],
  },
};

export default function SunfishFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020c12', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Çipura Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · noktalar · yem seçimi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0369a1' : '#04161e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04161e', borderRadius: 14, padding: 14, border: '1px solid #0369a133' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #08222c' : 'none' }}>
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
