import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanıma',
    items: [
      { icon: '🦜', t: 'Arıkuşu', d: 'Merops apiaster; en renkli Turkiye kusi; yesil, mavi, sari ve kestane tuy.' },
      { icon: '✈️', t: 'Ucus Ozelligi', d: 'Hizli ve cicimli ucus; kanat serilmesi ve hava bocegi kapma ustasi.' },
      { icon: '📅', t: 'Donem', d: 'Nisan-Eylul arasi Turkiye de; Afrika dan gelen goc kus; kis Afrika da gecer.' },
      { icon: '🏔️', t: 'Yuvalama', d: 'Toprak yarlarda delik acarak yuvalama; koloni halinde; Guney Turkiye tercih.' },
      { icon: '📍', t: 'Gozlem Yerleri', d: 'Akdeniz sahil bolgesi, Toros etekleri ve genis vadiler iyi lokasyonlar.' },
    ],
  },
  behaviour: {
    title: 'Davranış',
    items: [
      { icon: '🐝', t: 'Beslenme', d: 'Arı ve eşekarısı avı; zehir bezini uçak kuyruğuna sürterek etkisizleştirir.' },
      { icon: '👨‍👩‍👧', t: 'Koloni', d: 'Sosyal tür; koloni halinde yaşama, uyarı sesleri paylaşma ve ortak nöbet.' },
      { icon: '🎵', t: 'Ses', d: 'Sürekli "pruuk pruuk" çığlığı; uçuşta sürekli seslenme; koloni gürültülüdür.' },
      { icon: '🌅', t: 'Günlük Döngü', d: 'Sabah güneşlenme ve avlanma; öğle dinlenme; akşam yuva dönüşü.' },
      { icon: '🔭', t: 'Gözlem İpucu', d: 'Tel ve elektrik direklerine konarlar; yuvalama döneminde yar kenarında bulun.' },
    ],
  },
};

export default function BeeEaterWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#059669';
  const bg = '#000c06';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#d1fae5', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦜 Arıkuşu</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001810', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#34d399',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001c0e', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#6ee7b7', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
