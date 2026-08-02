import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  learn: {
    title: 'Sesler',
    items: [
      { icon: '🐦', t: 'Bülbül', d: 'Luscinia megarhynchos: karmaşık uzun tril, gece ve gündüz. Çalılık.' },
      { icon: '🌲', t: 'Küçük baykuş', d: 'Otus scops: tekrarlayan "kiyuup". İlkbaharda çok sık, gece aktif.' },
      { icon: '🦅', t: 'Şahin', d: 'Buteo buteo: uzun "miyau" çığlığı. Termal akıntıda dönünce çığlık atar.' },
      { icon: '🌿', t: 'Bıldırcın', d: 'Coturnix coturnix: "pıt-pilit" 3 heceli. Tarlada gizlenir, yalnız sesi.' },
    ],
  },
  attract: {
    title: 'Çekme',
    items: [
      { icon: '🎵', t: 'Ses taklidi', d: 'Ağzınla taklit: bazı türler cevaplar. Özellikle baykuş ve küçük ötücüler.' },
      { icon: '📱', t: 'Uygulama', d: 'Merlin, BirdNET: kayıt yap, yapay zeka ile tanı. Çok etkili araç.' },
      { icon: '🌅', t: 'Şafak korosu', d: 'Gün doğumunda tüm türler eş zamanlı: ses haritalama yapılabilir.' },
      { icon: '⚠️', t: 'Etik', d: 'Üreme döneminde ses çalma: yuva terki riski. Kısa süre tut, az tekrar.' },
    ],
  },
};

export default function WildBirdCall() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('learn');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040808', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎵 Kuş Sesi Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Sesler · tanımlama · etik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0369a1' : '#060e0e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#060e0e', borderRadius: 14, padding: 14, border: '1px solid #0369a133' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #0a1414' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#7dd3fc' }}>{item.t}</div>
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
