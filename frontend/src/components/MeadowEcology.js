import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  plants: {
    title: 'Bitkiler',
    items: [
      { icon: '🌸', t: 'Çayır çiçekleri', d: 'Ada çayı, kekik, nane: Türkiye çayırları endemik otlarla dolu.' },
      { icon: '🌻', t: 'Ayçiçeği ailesi', d: 'Compositae: Türkiye\'de 2000+ tür. Çayırda dominant. Böcek cazibesi.' },
      { icon: '🌾', t: 'Baklagiller', d: 'Lotus, Trifolium: azot bağlayıcı. Çayır verimliliği anahtarı.' },
      { icon: '🌿', t: 'Çimler', d: 'Poa, Festuca: zemin kapatıcı. Otlatma yönetimi için kritik tür.' },
    ],
  },
  animals: {
    title: 'Fauna',
    items: [
      { icon: '🦋', t: 'Kelebekler', d: 'Çayır: en zengin kelebek habitat. Nekt ar bitkisi çeşitliliği belirleyici.' },
      { icon: '🐝', t: 'Arılar', d: 'Yaban arısı: çayırda 100+ tür. Tozlaşma hizmeti: kritik ekosistem fonksiyonu.' },
      { icon: '🦗', t: 'Çekirgeler', d: 'Çekirge varlığı: sağlıklı çayır. Besin zinciri başlangıcı.' },
      { icon: '🐦', t: 'Kuşlar', d: 'Kırlangıç, tarla kuşu: çayır avcısı. Çayır daralması ile azalıyor.' },
    ],
  },
};

export default function MeadowEcology() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('plants');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020c02', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌾 Çayır Ekolojisi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Bitkiler · fauna · koruma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#166534' : '#041204', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041204', borderRadius: 14, padding: 14, border: '1px solid #16653433' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081e08' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#6ee7b7' }}>{item.t}</div>
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
