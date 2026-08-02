import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'identify', name: 'Tanımlama', icon: '🦟', accent: '#dc2626',
    items: [
      { t: 'Kaplan sivrisineği', d: 'Aedes albopictus: siyah-beyaz çizgili. Gündüz ısırır. Küçük durgun su.' },
      { t: 'Culex sivrisineği', d: 'Kahverengi, gece aktif. Bataklık ve havuz. Batı Nil virüsü taşıyıcısı.' },
      { t: 'Anopheles', d: 'Sıtma vektörü. Türkiye\'de büyük ölçüde eradike. Güneydoğu\'da dikkat.' },
      { t: 'Fark', d: 'Kaplan gündüz sırıtır, küçük. Culex gece, daha büyük. Davranışla ayırt.' },
    ],
  },
  {
    id: 'protect', name: 'Korunma', icon: '🛡️', accent: '#16a34a',
    items: [
      { t: 'DEET spreyi', d: '%20-50 DEET: en etkili itici. Çocuklarda %10 tercih. Göze sürme.' },
      { t: 'Uzun kıyafet', d: 'Şafak-alacakaranlık: sivrisinek piki. Açık kıyafet davet eder.' },
      { t: 'Durgun su yok', d: 'Kamp alanı: kovalar, teneke, lastik. 1 çay kaşığı su yeterli larva için.' },
      { t: 'Duman', d: 'Kamp ateşi dumanı doğal itici. Neem dalları ekle: çok etkili.' },
    ],
  },
];

export default function TigerMosquito() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040000', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦟 Sivrisinek Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tanımlama · korunma · hastalık</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0a0000', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a0000', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #140000' : 'none' }}>
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
