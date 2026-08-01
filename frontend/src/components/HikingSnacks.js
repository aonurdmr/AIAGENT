import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'energy', name: 'Enerji Yiyecekleri', icon: '⚡', accent: '#f59e0b',
    items: [
      { t: 'Trail mix', d: 'Fındık + kuru uzum + ay cekirdegi + bitter cikolata. Kompakt kalori.' },
      { t: 'Enerji bari', d: 'Tum tahıl + fındık + balin. Yemek gerekmiyor: tek bir bari 200+ kalori.' },
      { t: 'Muz', d: 'Magnezyum ve kalium: kas krampi onler. Halfta kor agirlik sorunsuz.' },
      { t: 'Kuru meyve', d: 'Kuru kayisi, incir, erik. Dogal seker ve lif. Kabızlık onler uzun yolculukta.' },
    ],
  },
  {
    id: 'pack', name: 'Paketleme & Tasinim', icon: '🎒', accent: '#22c55e',
    items: [
      { t: 'Erisilebilirlik', d: 'Yuruyuste yavas: yan cep veya kol cantasi. Dur oturmaya gerek yok.' },
      { t: 'Boyut', d: 'Kucuk porclar: ayarli beslenme. Buyuk porsiyonlar tartilir, tasimak zor.' },
      { t: 'Soguk bagimsiz', d: 'Buz torbasız tasınabilen gidalar: kekler, kuruyemis, kahvaltılık bar.' },
      { t: 'Geri donusum', d: 'Kutuyu dogaya birakma. Zip-lock torba ile bos ambalajlari geri gor.' },
    ],
  },
];

export default function HikingSnacks() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧁 Yürüyüş Atıştırmalıkları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Enerji · paketleme · taşıma</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0c1008', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0c1008', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #12180c' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{item.t}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
