import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  safety: {
    title: 'Güvenlik',
    items: [
      { icon: '💡', t: 'Işıklı yuzme', d: 'Su gecirmez LED lamba: hem gorus, hem baska yuzuculer ve tekne icin.' },
      { icon: '👥', t: 'Yalniz girilmez', d: 'Gece yuzme: min 2 kisi. Bir kişinin kıyıda saat tutması.' },
      { icon: '🌊', t: 'Dalga ve akıntı', d: 'Gece akıntı gorsel taraf iyice zordur. Aşina oldugun guvenli noktalar.' },
      { icon: '🦟', t: 'Denizanasi', d: 'Biyolüminesans sucuk: Noctiluca ile guzel ama deniz anası gecenin gizli riski.' },
    ],
  },
  magic: {
    title: 'Özel Deneyim',
    items: [
      { icon: '✨', t: 'Biyoluminasans', d: 'Yaz gecesi Akdeniz: Noctiluca scintillans. Her harekette ısık. Unuttulmaz.' },
      { icon: '🌕', t: 'Dolunay', d: 'Dolunay gecesi yuzme: gunes gibi aydınlatır, ısık ihtiyaci azalır.' },
      { icon: '🌊', t: 'Sıcak deniz', d: 'Agustos Akdeniz 28°C: termometre sızmamasak gece su girilir.' },
      { icon: '🦑', t: 'Gece canlilari', d: 'Kalamar ve yengec gece yuzey akar. Maske ile fener: akvaryum.' },
    ],
  },
};

export default function NightSwimming() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('safety');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02040e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌙 Gece Yüzme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Güvenlik · biyolüminesans · özel deneyim</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#818cf8' : '#080a1e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#080a1e', borderRadius: 14, padding: 14, border: '1px solid #818cf833' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #10142e' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc' }}>{item.t}</div>
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
