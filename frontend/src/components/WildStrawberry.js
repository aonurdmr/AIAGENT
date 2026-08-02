import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanima',
    items: [
      { icon: '🍓', t: 'Yabani Cilek', d: 'Fragaria vesca; orman kenarlarinda ve cayirlarda yetisen kucuk aromalik meyve.' },
      { icon: '🌿', t: 'Yaprak', d: 'Uc yaprakli; kenarlari disli, ust yuzu koyu yesil, alt yuzu soluk ve tuylu.' },
      { icon: '🌸', t: 'Cicek', d: 'Beyaz 5 yaprakli cicekler; Nisan-Haziran arasi acar, kucuk ve narin.' },
      { icon: '🔴', t: 'Meyve', d: 'Kucuk ve yuvarlagimsi; olgunlasinca parlak kirmizi, tati yoğun ve nektarsi.' },
      { icon: '📍', t: 'Habitat', d: 'Orman acikilari, cayir kenarlari ve yayli alanlar; 2000 m yukseklige dek cikar.' },
    ],
  },
  harvest: {
    title: 'Toplama',
    items: [
      { icon: '📅', t: 'Mevsim', d: 'Haziran-Temmuz en bol donem; yuksek irtifada Agustos sonuna uzayabilir.' },
      { icon: '🤲', t: 'Toplama', d: 'Sap ile birlikte koparın; ezilmeden kagit posetlerde tasiyın, cam kapli kavanoza alin.' },
      { icon: '🍵', t: 'Kullanim', d: 'Taze tuketim, receli, serbeti ve cicek cayi; yapraklar buyuleyici tatli cay verir.' },
      { icon: '⚠️', t: 'Dikkat', d: 'Sahil cicegi ile karistirmayin; yabani cilegin meyvesi kirmizi, sahil ciceginin tatsiz.' },
      { icon: '🌱', t: 'Koruma', d: 'Kokten sokmayın; meyveleri birakin, tohumla uremesini destekleyin.' },
    ],
  },
};

export default function WildStrawberry() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#e11d48';
  const bg = '#0c0005';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ffe4e6', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🍓 Yabani Cilek</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1a000a', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fb7185',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#1a000d', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fda4af', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
