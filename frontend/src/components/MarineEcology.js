import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  life: {
    title: 'Yasam',
    items: [
      { icon: '🐠', t: 'Kis Baliği Bolgeleri', d: 'Posidonia denizotu cayirlari Akdeniz biyocesitliliğinin temel yasam alanidir.' },
      { icon: '🦑', t: 'Yumusakcalar', d: 'Ahtapot, kalamar ve deniz salyangozu kiyisal kayalik bolgelerde yuvalanir.' },
      { icon: '🦞', t: 'Kabuklusalar', d: 'Istakoz, kerevit ve yenges sultuculuğu onemli. Bazi turler sezonluktur.' },
      { icon: '🐙', t: 'Merkez Yirticilar', d: 'Ahtapot ve levrek besin zincirinin ustundedir; habitat sagligini gosterir.' },
      { icon: '🌿', t: 'Deniz Bitkileri', d: 'Denizotu ve yosun oksijen uretimiyle solunum zincirini destekler.' },
    ],
  },
  conserve: {
    title: 'Koruma',
    items: [
      { icon: '⚠️', t: 'Tehditler', d: 'Asiri avcilik, deniz kirliligi ve iklim degisikliği Akdeniz turlerini tehdit eder.' },
      { icon: '🚫', t: 'Yasak Bolgeler', d: 'Deniz koruma alanlari ve balikcilik yasagi bolgeleri haritalarla takip edilmeli.' },
      { icon: '🐠', t: 'Istilaci Turler', d: 'Aslan baligi ve yosun istilalari yerel turleri tahrip edebilir.' },
      { icon: '🌊', t: 'Su Sicakligi', d: 'Akdeniz yaklasik 0.3C/on yillik isinma ile birlesik diger denizlerden hizla isinmaktadir.' },
      { icon: '🤿', t: 'Sivil Gozlem', d: 'Dalici goniulluler veri toplama ve plastik temizligi ile korumaya katki saglar.' },
    ],
  },
};

export default function MarineEcology() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('life');
  const data = TABS[tab];
  const accent = '#0891b2';
  const bg = '#000c14';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#cffafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌊 Deniz Ekolojisi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001828', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#22d3ee',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001c2e', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#67e8f9', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
