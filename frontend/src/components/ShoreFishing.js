import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'spots', name: 'İdeal Noktalar', icon: '📍', accent: '#06b6d4',
    items: [
      { t: 'Kıyı düzlükleri', d: 'Taşlı ve kumlu geçiş: çipura, levrek, kefal.' },
      { t: 'Köprü ayakları', d: 'Akıntı yaratır, yiyecek birikir. Levrek ve kefal.' },
      { t: 'Dalyan ve barınaklar', d: 'Sakin su içi: kefal ve yılan balığı.' },
      { t: 'Resif kenarları', d: 'Çipura ve orfoz — taş arasındaki derinlik noktaları.' },
      { t: 'Çay ağızları', d: 'Tatlı-tuzlu karışım. Yılan, levrek ve kefal.' },
    ],
  },
  {
    id: 'rigs', name: 'Donanım ve Teknikler', icon: '🎣', accent: '#22c55e',
    items: [
      { t: 'Zemin oltası', d: 'Basit dip: ağırlık, misina, tek kanca. Kefal ve karagöz.' },
      { t: 'Yüzdürme (şamandıra)', d: 'Su üstü veya orta su. Balık su derinliği ile ayarla.' },
      { t: 'Pikado', d: 'Karadeniz geleneksel. Sahte balık + kanca. Lüfer için.' },
      { t: 'Surf olta (uzun atış)', d: '4m+ olta, 100-150gr kurşun. Açık denize atış.' },
      { t: 'Karasüngeri (spod)', d: 'Çıpa topu veya mısır — nokta oluşturma.' },
    ],
  },
  {
    id: 'tide', name: 'Gelgit ve Zaman', icon: '🌊', accent: '#f97316',
    items: [
      { t: 'Med zamanı', d: 'Yükselen su: balık kıyıya yaklaşır. Akşam med ideali.' },
      { t: 'Cezir', d: 'Alçalan su: akıntı oluşur, yiyecek sürüklenir.' },
      { t: 'Sabah', d: 'İlk ışık ile birlikte aktif yemlenme. Şafak en verimli.' },
      { t: 'Fırtına sonrası', d: 'Deniz karışır, yem dibe düşer — levrek ve çipura aktif.' },
    ],
  },
];

export default function ShoreFishing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏖️ Kıyıdan Balıkçılık</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Noktalar · donanım · gelgit zamanlaması</div>
      </div>

      <div style={{ background: '#031018', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #06b6d433' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>🏖️ KIYI AVCILIK</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Türkiye kıyısı 8000km. Doğru nokta seçimi tekne olmadan profesyonel av sağlar.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#031018', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#031018', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #06141e' : 'none' }}>
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
