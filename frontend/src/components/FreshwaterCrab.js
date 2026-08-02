import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  habitat: {
    title: 'Habitat',
    items: [
      { icon: '🌊', t: 'Dağ dereleri', d: 'Türkiye endemik tatlı su yengeci: hızlı soğuk akarsularda. Taş altı.' },
      { icon: '🪨', t: 'Kayalık nehir', d: 'Orta büyüklükte taş: yengeç sığınağı. Taşı döndür, yavaşça.' },
      { icon: '🌿', t: 'Su bitkileri', d: 'Saz ve su yosunu: yengeç koruma ve beslenme alanı.' },
      { icon: '📍', t: 'Dağılım', d: 'Karadeniz, Ege dağ dereleri. 400-1200m. Temiz berrak su şart.' },
    ],
  },
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '🔬', t: 'Endemizm', d: 'Potamon türleri: Türkiye endemiği. Her havza farklı tür olabilir.' },
      { icon: '♻️', t: 'Ekosistem rolü', d: 'Organik madde parçalayıcı. Balık ve su kuşu yemi. Kritik halka.' },
      { icon: '⚠️', t: 'Tehditler', d: 'Su kirliliği, HES barajları, yabancı tür (kerevit). Hızlı azalıyor.' },
      { icon: '🚫', t: 'Av durumu', d: 'Bazı türler koruma altı. Toplamadan önce yerel mevzuatı kontrol et.' },
    ],
  },
};

export default function FreshwaterCrab() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('habitat');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦞 Tatlı Su Yengeci</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Habitat · ekoloji · koruma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#166534' : '#031206', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#031206', borderRadius: 14, padding: 14, border: '1px solid #16653433' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #051e0a' : 'none' }}>
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
