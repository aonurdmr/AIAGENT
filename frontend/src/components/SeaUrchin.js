import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Toplama',
    items: [
      { icon: '🦔', t: 'Türler', d: 'Paracentrotus lividus: yenilebilir. Mor-siyah dikenli. Kayalık 0-30m.' },
      { icon: '🤿', t: 'Toplama', d: 'Serbest dalış: el ile tut, dikenden kaç. Eldiven şart. Ağ ile topla.' },
      { icon: '📅', t: 'Sezon', d: 'Kış-ilkbahar: gonada dolu. Yaz: üreme sonrası boşalır. En iyi: Şubat-Nisan.' },
      { icon: '⚠️', t: 'Kural', d: 'Günde 50 adet limit (bölgeye göre değişir). Küçük: bırak. Dikenle dikkat.' },
    ],
  },
  cook: {
    title: 'Kullanım',
    items: [
      { icon: '🍴', t: 'Çiğ yeme', d: 'Gonada (uni): taze, sade. Limon. Deniz kokusu yoğun. Lüks ürün.' },
      { icon: '🍝', t: 'Makarna', d: 'Tereyağ + sarımsak + uni: kremsi sos. Kısa pişirme: renk ve tat bozulur.' },
      { icon: '🍳', t: 'Yumurta', d: 'Uni + dövülmüş yumurta: hafif karıştır. Japon taishōyaki tarzi.' },
      { icon: '🫙', t: 'Saklama', d: 'Taze uni: 24 saat buzdolabı. Tuzlanmış: 1 hafta. Donmaz, dokusu bozulur.' },
    ],
  },
};

export default function SeaUrchin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060006', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦔 Deniz Kestanesi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Toplama · sezon · kullanım</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#6b21a8' : '#0e000e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0e000e', borderRadius: 14, padding: 14, border: '1px solid #6b21a833' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #160016' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#e879f9' }}>{item.t}</div>
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
