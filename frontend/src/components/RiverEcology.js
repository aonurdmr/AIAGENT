import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  life: {
    title: 'Yasam',
    items: [
      { icon: '🐟', t: 'Balik Cesitliligi', d: 'Alabalik, siraz, kefal ve tatlisu istakozu temiz nehir ekosisteminin gostergesidir.' },
      { icon: '🦦', t: 'Su Samuru', d: 'Lutra lutra; nehir sagliginin en degerli gostergeci ve koruma altindaki tur.' },
      { icon: '🐸', t: 'Amfibiler', d: 'Yesilkurbaga, agac kurbagasi ve semender su kalitesine karsi cok hassastir.' },
      { icon: '🦆', t: 'Su Kuslari', d: 'Dalgıc, su cilvesi ve irmak kizilercigi nehir kenarlarinin tipik sakinleridir.' },
      { icon: '🦐', t: 'Makroomurgasizlar', d: 'Mayis sinegi larvasi, tassinegi ve amfipod; su kalitesini gosteren bioindikatörler.' },
    ],
  },
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '💧', t: 'Su Kalitesi', d: 'Asiri fosfat, nitrat ve askili maddeler nehir ekosistemini baskici etkiler.' },
      { icon: '🌊', t: 'Akim Dinamigi', d: 'Riffler, havuzlar ve gercek yuzeyler farkli habitat ve biyocesitliligi saglar.' },
      { icon: '🌿', t: 'Riparian Vejetasyon', d: 'Sogut, kavak ve kamislik kenar bitkisi erozyonu onler ve golge saglar.' },
      { icon: '⚠️', t: 'Tehditler', d: 'Barajlar, tarım kimyasallari ve kum ocaklari nehir ekolojisini tahrip eder.' },
      { icon: '🔬', t: 'Izleme Yontemleri', d: 'BMWP skoru ile makroomurgasiz topluluk analizi en yaygin biyolojik izleme yontemidir.' },
    ],
  },
};

export default function RiverEcology() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('life');
  const data = TABS[tab];
  const accent = '#1d4ed8';
  const bg = '#000410';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dbeafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🏞️ Nehir Ekolojisi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#000c24', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#60a5fa',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001028', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#93c5fd', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
