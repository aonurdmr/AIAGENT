import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  catch: {
    title: 'Yakalama',
    items: [
      { icon: '🦞', t: 'Istakoz habitati', d: 'Kayalik ve taslik deniz dibi: istakoz gunduz saklanir, gece ava cikar.' },
      { icon: '🌙', t: 'Gece dalisi', d: 'Dalgic ile gece: fener tutarak kayalik kenarlarini tara. Duzensiz yuzey.' },
      { icon: '🪤', t: 'Tuzak', d: 'Izinsiz tuzak kurma yasak. Yasal boyut kontrolu: minimum 9 cm karapaks.' },
      { icon: '📏', t: 'Boyut kurali', d: 'Tutulabilir boyut: ulkeden ulkeye degisir. Kucukse geri birak, buyusun.' },
    ],
  },
  cook: {
    title: 'Pisirme',
    items: [
      { icon: '🔥', t: 'Haslamak', d: 'Canli istakoz: 10-12 dk kaynar tuzlu su. Et tam pisince opak olur.' },
      { icon: '🧈', t: 'Izgara', d: 'Ikiye bol, zeytinyagi ve sarimsak: 4 dk her yuz. Citir ve lezzetli.' },
      { icon: '🍋', t: 'Servis', d: 'Limon ve tereyagi: klasik sunum. Balık bicagı ile et ayirma kolaylasir.' },
      { icon: '🌿', t: 'Ot sosu', d: 'Dereotu + maydanoz + limon + zeytinyagi: fresk sos istakoza ideal.' },
    ],
  },
};

export default function LobsterGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('catch');
  const data = TABS[tab];

  return (
    <div style={{ background: '#0e0200', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦞 Istakoz Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yakalama · yasal · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#dc2626' : '#180400', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#180400', borderRadius: 14, padding: 14, border: '1px solid #dc262633' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #240600' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f87171' }}>{item.t}</div>
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
