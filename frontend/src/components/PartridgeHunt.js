import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  method: {
    title: 'Yöntemler',
    items: [
      { icon: '🦅', t: 'Kopek ile', d: 'Setter veya pointer turk kekligi avinda en kullanışlı. Kekligi dondurur.' },
      { icon: '🔊', t: 'Cagri', d: 'Erkek keklik sesi: ritimli tutup. Elektronik cagri bazi yerlerde yasak.' },
      { icon: '🎯', t: 'Drive av', d: 'Suruculer kusları avci hattına dogru koşturur. Grup avı.' },
      { icon: '🚶', t: 'Tarama avı', d: 'Tarama hattında yan yana yürü: sazlık ve fundalıkları tara.' },
    ],
  },
  season: {
    title: 'Mevsim & Alan',
    items: [
      { icon: '📅', t: 'Av sezonu', d: 'Ekim-Kasım: Türkiyede keklik sezonu baslar. Bölgeye göre tarih degisir.' },
      { icon: '🏔️', t: 'Terrain', d: 'Kayalık yamaç, seyrek fundalık, tahıl tarlası kenari tercih eder.' },
      { icon: '🌅', t: 'Sabah saati', d: 'Gunes dogusundan 2 saat sonra besleme hareketi: en aktif an.' },
      { icon: '🌡️', t: 'Hava', d: 'Soguk ve yagli gunde keklik acikta beslenir: avci icin avantaj.' },
    ],
  },
};

export default function PartridgeHunt() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('method');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060802', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦤 Keklik Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yöntemler · alan · mevsim</div>
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
