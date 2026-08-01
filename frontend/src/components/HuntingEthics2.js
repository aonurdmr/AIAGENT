import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  principles: {
    title: 'İlkeler',
    items: [
      { icon: '🎯', t: 'Temiz atis', d: 'Hayvanın acı çekmemesi için yeterince yakın, güvenli atış. Hiçbir zaman belirsizlikte ates etme.' },
      { icon: '♻️', t: 'Tüm gövdeyi kullan', d: 'Et, deri, kemik — hepsi degerlendirilebilir. Bosuna öldürmek etik değil.' },
      { icon: '📋', t: 'Kota uyum', d: 'Sezon ve kota: bilgi al, yasa uy. Fazla av populasyon dengesini bozar.' },
      { icon: '🌿', t: 'Habitat', d: 'Habitat koruma avcilik kadar onemli. Alanda cop bırakma, bitki tahrip etme.' },
    ],
  },
  respect: {
    title: 'Saygı & Gelenek',
    items: [
      { icon: '🤝', t: 'Diger avcilar', d: 'Alan paylasimi: ses cikarma, birbirine yakin pozisyon alma. Guvenli mesafe.' },
      { icon: '🏡', t: 'Arazı sahibi', d: 'Ozelden izin al. Kapilari kapat, izi tut, sahibini kuru biyolojiyle bilgilendir.' },
      { icon: '👶', t: 'Yeni avcilar', d: 'Tecrubeni aktar, yanındaki yeni avciyi egit. Etik zinciri devam eder.' },
      { icon: '📸', t: 'Sosyal medya', d: 'Kan ve vahşet goruntusu paylaşma. Avı saygı ile paylas, gururla degil.' },
    ],
  },
};

export default function HuntingEthics2() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('principles');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060802', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏹 Avcılık Etiği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İlkeler · saygı · gelenek</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#0c1004', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0c1004', borderRadius: 14, padding: 14, border: '1px solid #f9731633' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #161c08' : 'none' }}>
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
