import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🫐', t: 'Yabani Dut', d: 'Morus nigra (kara dut) ve M. alba (beyaz dut); Anadolunun bolca yetisen dutu.' },
      { icon: '📅', t: 'Hasat Donemi', d: 'Haziran-Temmuz; dut olgunlasinca daldan duser; hemen toplanmali.' },
      { icon: '🌳', t: 'Agac Tanima', d: 'Dilimli koyu yesil yapraklar; yayvan buyume; yuz yillik agaçlar hala meyve verir.' },
      { icon: '🧺', t: 'Toplama', d: 'Bez bez altta serip dalları sallayın; dut parmakları boyar, bunu bekleyin.' },
      { icon: '🌍', t: 'Lokasyon', d: 'Anadolu nun her bolgesinde; koy meydanlari, tarla kenarlari ve bostanlar.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍯', t: 'Dut Reçeli', d: 'Kara dut reçeli yoğun ekşi-tatlı; en az şekerle yapılan doğal lezzet.' },
      { icon: '🧃', t: 'Pekmez', d: 'Ezilip kaynatılan dut suyu; geleneksel Türk pekmezi; hem enerji hem şifa.' },
      { icon: '🍷', t: 'Dut Rakısı', d: 'Ev yapımı kaçak dut rakısı geleneksel; artık yasal ev üretimi mümkün değil.' },
      { icon: '🍨', t: 'Dondurma', d: 'Taze dut ve sütle yapılan dondurma; mevsimlik ev yapımı yaz lezzeti.' },
      { icon: '💊', t: 'Sağlık', d: 'C vitamini, demir ve antosiyanin; kan şekerini düzenleyici etki araştırılıyor.' },
    ],
  },
};

export default function WildMulberry() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#7e22ce';
  const bg = '#060010';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#f5f3ff', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🫐 Yabani Dut</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#100022', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#a78bfa',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#0e001e', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#c4b5fd', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
