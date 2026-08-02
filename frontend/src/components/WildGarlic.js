import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Toplama',
    items: [
      { icon: '🧄', t: 'Yabani sarımsak', d: 'Allium ursinum: geniş yaprak, beyaz çiçek. Kayın ormanı altı, nemli.' },
      { icon: '🌿', t: 'Yabani pırasa', d: 'Allium ampeloprasum: uzun yaprak, pembe çiçek. Kıyı ve orman kenarı.' },
      { icon: '⚠️', t: 'Tehlike: Vadoz', d: 'Colchicum: benzer yaprak, ZEHİRLİ. Koku testini kullan: sarımsak kokusu yok ise alma!' },
      { icon: '📅', t: 'Mevsim', d: 'Mart-Mayıs: en taze. Çiçek açmadan toplanmalı. Yaprak ve soğan.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🫒', t: 'Zeytinyağında', d: 'Taze yaprak: zeytinyağı, limon. Salata veya hafif sote. 2-3 dk.' },
      { icon: '🍝', t: 'Pesto', d: 'Yaprak + fındık + zeytinyağı + peynir: yabani sarımsak pesto. Mükemmel.' },
      { icon: '🥣', t: 'Çorba', d: 'Tavuk suyuna yabani sarımsak: derinlemesine tat. Son dakika ekle.' },
      { icon: '🫙', t: 'Saklama', d: 'Zeytinyağında bekletin: 2 hafta buzdolabı. Kış için dondur, taze gibi.' },
    ],
  },
};

export default function WildGarlic() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040800', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧄 Yabani Sarımsak</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Toplama · tanımlama · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#4d7c0f' : '#081200', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#081200', borderRadius: 14, padding: 14, border: '1px solid #4d7c0f33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #0e1e00' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#a3e635' }}>{item.t}</div>
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
