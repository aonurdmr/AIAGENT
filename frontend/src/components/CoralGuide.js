import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  types: {
    title: 'Türler',
    items: [
      { icon: '🪸', t: 'Kırmızı mercan', d: 'Corallium rubrum: Akdeniz\'in sembolü. 20-300m. Yasal koruma altında.' },
      { icon: '🌊', t: 'Kaya mercanı', d: 'Cladocora: Türkiye\'nin taş mercanı. Sığ adalarda. Kırmızı Liste.' },
      { icon: '⭐', t: 'Deniz yıldızı', d: 'Mercan ekosisteminde kritik tür: alaşağı edici. Çeşitlilik göstergesi.' },
      { icon: '🐠', t: 'Mercan balıkları', d: 'Isparoz, Salpa, Kaygana: mercan kayalık sakinleri. Biyoçeşitlilik.' },
    ],
  },
  dive: {
    title: 'Dalış',
    items: [
      { icon: '🤿', t: 'Dalış noktaları', d: 'Antalya Kaş, Marmaris, Bodrum: en iyi Türkiye mercan dalış noktaları.' },
      { icon: '🚫', t: 'Dokunma yasak', d: 'El ile değme: mercan öldürür. Yüzgeç vuruşu: zarar verir. Uzak uçuş.' },
      { icon: '📷', t: 'Fotoğraf', d: 'Geniş açı lens + yakın çekim: renk için flaş. Sarı filtre: mavi ortam.' },
      { icon: '⚠️', t: 'Koruma', d: 'Mercan toplamak ağır ceza: hem Türkiye\'de hem AB\'de yasak.' },
    ],
  },
};

export default function CoralGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060008', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪸 Mercan Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · dalış · koruma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#9f1239' : '#0c0010', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0c0010', borderRadius: 14, padding: 14, border: '1px solid #9f123933' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #140018' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fb7185' }}>{item.t}</div>
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
