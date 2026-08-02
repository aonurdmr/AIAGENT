import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🐬', t: 'Türkiye Delfinleri', d: 'Bottlenose, şişman kafa ve ortak delfin; Marmara ve Karadeniz grupları.' },
      { icon: '🌊', t: 'Habitat', d: 'Açık deniz ve kıyı şeridi; özellikle adalar arası geçiş kanalları aktif bölge.' },
      { icon: '🚢', t: 'Tekne Turu', d: 'Marmaris, Bodrum, Çeşme ve İstanbul tekneleri delfin izleme turları düzenler.' },
      { icon: '📅', t: 'En İyi Dönem', d: 'Temmuz-Eylül; deniz düz ve derin mavi; sürüler yüzeye çıkma artar.' },
      { icon: '📸', t: 'Fotoğraf', d: 'Yüksek hız ve bürst modu; delfin atlaması önceden tahmin edilemez; sabır şart.' },
    ],
  },
  conservation: {
    title: 'Koruma',
    items: [
      { icon: '⚠️', t: 'Tehdit', d: 'Av ağı tuzağı, ses kirliliği ve deniz trafik yoğunluğu başlıca tehditler.' },
      { icon: '🚫', t: 'Yaklaşma Kuralı', d: 'Tekneyle 50 metre; makinayla yaklaşmayın; delfin yanına gelin bekleyin.' },
      { icon: '🔊', t: 'Ses Kirliliği', d: 'Motor gürültüsü ve sonar sorunları delfin ekolokasyonunu bozuyor.' },
      { icon: '📡', t: 'İzleme', d: 'TEMA Vakfı ve TÜDAV hidrofon kaydı ile popülasyon yoğunluğu takip eder.' },
      { icon: '🤝', t: 'Raporlama', d: 'Denizde ölü delfin gördüğünüzde TÜDAV acil hattına bildirin; veri değerli.' },
    ],
  },
};

export default function DolphinWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('observe');
  const data = TABS[tab];
  const accent = '#0284c7';
  const bg = '#000810';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0f2fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐬 Delfin Gözlemi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001428', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#38bdf8',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001828', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#7dd3fc', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
