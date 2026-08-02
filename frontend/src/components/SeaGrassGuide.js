import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '🌊', t: 'Posidonia', d: 'Posidonia oceanica; Akdeniz deniz çayırı; yüzyıllık koloniler oluşturur.' },
      { icon: '🐟', t: 'Balık Yuvası', d: 'Deniz çayırları, levrek, karagöz ve dil balığı larvaları için kritik habitat.' },
      { icon: '🌡️', t: 'İklim Etkisi', d: 'Hektar başına karasal ormandan 35 kat fazla karbon depolama kapasitesi.' },
      { icon: '📉', t: 'Tehdit', d: 'Deniz tarama, kirlilik ve deniz kestanesi patlaması deniz çayırını tahrip eder.' },
      { icon: '🔬', t: 'Araştırma', d: 'ODTU ve IU deniz biyologları Ege kıyılarında haritalama çalışmaları yürütüyor.' },
    ],
  },
  diving: {
    title: 'Dalış',
    items: [
      { icon: '🤿', t: 'Çayır Dalışı', d: 'Posidonia çayırlıkları 3-40 m derinlikte; görsel şölen ve zengin biyoçeşitlilik.' },
      { icon: '📸', t: 'Sualtı Fotoğraf', d: 'Geniş açı lens çayır ekosistemini kadraja sığdırır; mavi saatlerde çekim.' },
      { icon: '🐠', t: 'Gözlemlenen Türler', d: 'Ahtapot, deniziğnesi, akrep balığı ve denizatı çayırda kendine yer bulur.' },
      { icon: '⚠️', t: 'Koruma Kuralı', d: 'Çayıra basma veya dokunma; demir atmayın; gözlemleyin ve bırakın.' },
      { icon: '🌍', t: 'Mavi Bayrak', d: 'Mavi bayraklı plajlar yakınındaki koruma bölgelerinde çayır alanları korunur.' },
    ],
  },
};

export default function SeaGrassGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('ecology');
  const data = TABS[tab];
  const accent = '#059669';
  const bg = '#000c06';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#d1fae5', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌊 Deniz Çayırları</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001810', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#34d399',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001c0e', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#6ee7b7', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
