import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  types: {
    title: 'Yakıt Türleri',
    items: [
      { icon: '🟢', t: 'Butan/propan karisimlari', d: 'En yaygin: ISO butane-propane. Sogukta propan oran arttır.' },
      { icon: '🔵', t: 'Alkol yakiti', d: 'Metanol veya etanol. Dusuk sicaklik: verimli. Yavaş pisirir.' },
      { icon: '🟡', t: 'Beyaz benzin', d: 'MSR ve Primus ocak uyumlu. Yuksek irtifa ve soguk icin ideal.' },
      { icon: '🟠', t: 'Katı yakıt tableti', d: 'Hexamine: hafif, acil kullanim. Duman cikarir, temiz degil.' },
    ],
  },
  safety: {
    title: 'Güvenlik',
    items: [
      { icon: '💨', t: 'Havalandırma', d: 'Cadir icinde ocak yakmak karbon monoksit zehirlenmesi. Dişi kapi ac.' },
      { icon: '🔥', t: 'Patlama riski', d: 'Kartuş dolu fırlatma ya da delinmeye izin verme.' },
      { icon: '🌡️', t: 'Soguk depolama', d: 'Sıfır altında butana karıştırılmış kartuş: beklentinin altı performans.' },
      { icon: '⛽', t: 'Kartuş tuketime', d: 'Bir kartusu birak. Dogaya bos kartusu terk etme, geri don.' },
    ],
  },
};

export default function CampingGas() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⛽ Kamp Yakıt Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yakıt türleri · güvenlik · seçim</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#0e0a00', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0e0a00', borderRadius: 14, padding: 14, border: '1px solid #f9731633' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #181200' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fb923c' }}>{item.t}</div>
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
