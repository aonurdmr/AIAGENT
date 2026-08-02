import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanıma',
    items: [
      { icon: '🌰', t: 'At Kestanesi', d: 'Aesculus hippocastanum; parklar ve yol kenarlari; yenen kestaneden farklıdır.' },
      { icon: '🌸', t: 'Cicek', d: 'Mayis-Haziran buyuk dik beyaz-pembe sicak cicek dizisi; taninmaz guzellikte.' },
      { icon: '⚠️', t: 'Zehirli', d: 'At kestanesi yenilebilir kestaneden farkli; meyve toksiktir; yemeyiniz.' },
      { icon: '🌳', t: 'Kullanim Alanlari', d: 'Baskentlerde dekorasyon agaci; golgesi ve gelis guzelligi tercih sebebi.' },
      { icon: '🎮', t: 'Conker Oyunu', d: 'Ingiliz gelenegi; iplere baglanan at kestanesi ile carpma oyunu kucukler icin.' },
    ],
  },
  medicine: {
    title: 'Tıbbi',
    items: [
      { icon: '🩸', t: 'Ven Desteği', d: 'Aescin bileşeni; venöz yetmezlik ve varislerde geleneksel bitkisel destek.' },
      { icon: '💊', t: 'Standart Özüt', d: 'At kestanesi özütü tablet/kapsül; Avrupa ülkelerinde onaylı bitkisel ürün.' },
      { icon: '🧴', t: 'Cilt Bakımı', d: 'Astrenjan özellikleri; tonik ve sıkılaştırıcı etki için kozmetik formulasyonu.' },
      { icon: '⚠️', t: 'Dikkat', d: 'Ham meyve toksik; yalnızca standardize özütler kullanın; doktor danışın.' },
      { icon: '🌿', t: 'Yaprak Çayı', d: 'Geleneksel kullanımda yaprak çayı iltihap ve eklem ağrısı için içilir.' },
    ],
  },
};

export default function WildHorseChestnut() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#92400e';
  const bg = '#0a0400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌰 At Kestanesi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#180a00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fbbf24',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#140800', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fcd34d', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
