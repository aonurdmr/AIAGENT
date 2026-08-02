import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🥿', t: 'Kartopunesi baglama', d: 'Karto botu: ayaga giyip bant kilit. Gevs olursa kaymaz.' },
      { icon: '🦶', t: 'Yuruyus adimi', d: 'Kisa adim, diz yukari kaldır. Normal yuruyus gibi, biraz genis.' },
      { icon: '⛰️', t: 'Yamac', d: 'Yokuş cıkarken: yuku one egil. Yamac dik ise zikzak ciz.' },
      { icon: '🔙', t: 'Geri donme', d: 'Kartopu ile geri adim: 180° donus icin koto kald, donus sagla.' },
    ],
  },
  gear: {
    title: 'Ekipman',
    items: [
      { icon: '❄️', t: 'Kartopunesi boyutu', d: 'Agirliga gore: 70kg altı 25x58cm. Daha agır = daha buyuk yuzey.' },
      { icon: '🧥', t: 'Kiyafet', d: 'Kar: termik ic + su gecirmez dis. Elbiseler donuk kalmali.' },
      { icon: '🔦', t: 'Kisa gun', d: 'Kisın gun kisa: kafa lambasi sart. Kisa gun erken karanlik gelir.' },
      { icon: '🧊', t: 'Kartopunu', d: 'Ciddi irtifada: buz balta ile kombinasyon; egim arttikca daha fazla.' },
    ],
  },
};

export default function SnowShoeHiking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#04060e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>❄️ Kar Ayakkabısı Yürüyüşü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · ekipman · kış keşfi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#1d4ed8' : '#080e1c', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#080e1c', borderRadius: 14, padding: 14, border: '1px solid #1d4ed833' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #101a2c' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>{item.t}</div>
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
