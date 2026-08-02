import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  protect: {
    title: 'Korunma',
    items: [
      { icon: '🧴', t: 'Repellent', d: 'DEET %30-50 veya Picardin %20. Guneste uzun sure etkili.' },
      { icon: '👕', t: 'Giysi', d: 'Acik renk, uzun kollu, ince dokuma. Siyah sivrisineği çeker.' },
      { icon: '🕐', t: 'Saat', d: 'En aktif: seker ve gunde - ilk ve son 2 saat. Dis mekan aktiviteyi planla.' },
      { icon: '💨', t: 'Ruzgar', d: 'Vantilatör veya dogal ruzgar. Sivrisinek guclü akımda ucamaz.' },
    ],
  },
  risk: {
    title: 'Hastalik & Risk',
    items: [
      { icon: '⚠️', t: 'Batı Nil', d: 'Turkiyede gorulen virusu. Ates, bas agrisi. Buyuk cogunluk hafif atlatır.' },
      { icon: '🦟', t: 'Asya kaplan sivrisinegi', d: 'Aedes albopictus: gun boyunca ısırır. Hem kentlerde hem ormanda.' },
      { icon: '🩹', t: 'Isırık sonrası', d: 'Kaşıma: kaşıma sekonder enfeksiyona yol acar. Sogukluk ve hidrokortizol.' },
      { icon: '🏥', t: 'Tibbi tavsiye', d: 'Yurt disı ve tropik bolge: seyahat oncesi doktora danış.' },
    ],
  },
};

export default function MosquitoSafety() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('protect');
  const data = TABS[tab];

  return (
    <div style={{ background: '#04080a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦟 Sivrisinek Güvenliği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Korunma · hastalık riski · önlemler</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#081210', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#081210', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #102018' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{item.t}</div>
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
