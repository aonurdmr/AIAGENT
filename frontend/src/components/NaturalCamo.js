import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'principles', name: 'Kamuflaj Prensipleri', icon: '🎭', accent: '#22c55e',
    items: [
      { t: 'Siluet kırma', d: 'Hayvanlar insan silüetini tanır. Dal ve yaprak ile silueti dağıt.' },
      { t: 'Renk uyumu', d: 'Habitat rengini taklit et: ormanda yeşil-kahve, bozkırda toprak tonu.' },
      { t: 'Hareket kontrolu', d: 'Yavaş ve akıcı hareket — ani hareket ağır bozar.' },
      { t: 'Gölge kullan', d: 'Karanlık bölgede dur, ışıklı alanda durma — kontrast yaratma.' },
      { t: 'Yükseklik', d: 'Hayvanlar üstlerini kontrol eder — yüksek pozisyon görünmez yapar.' },
    ],
  },
  {
    id: 'natural', name: 'Doğal Malzeme', icon: '🌿', accent: '#a16207',
    items: [
      { t: 'Ot ve yaprak', d: 'Taze yaprak ve ot elbiselere tutturulur. Her 2 saatte yenile — solar.' },
      { t: 'Dal ve çalı', d: 'Şapka ve palto üstüne dal sokmak silueti bozar.' },
      { t: 'Toprak', d: 'Yüz ve el için toprak — kokuyu da maskeler, rengi de.' },
      { t: 'Kil', d: 'Islak kil yüze sürülür. Doğal koku bırakır — avantaj.' },
      { t: 'Çam kozalak', d: 'Çam ormanında koku kamuflajı — kozalak üst cepe.' },
    ],
  },
  {
    id: 'technique', name: 'Hareket Tekniği', icon: '🚶', accent: '#f97316',
    items: [
      { t: 'Sürünme', d: 'Yerde yavaş ilerleme. Dirsek-diz koordinasyonu. Gürültüsüz.' },
      { t: 'Yavaş yürüyüş', d: 'Her adım taban değerlendir — çıtırtısız zemin seç.' },
      { t: 'Duraklama', d: 'Hayvan baktığında dondur — hareket tanıma tetiği olduğunda görünmez.' },
      { t: 'Rüzgar kontrolu', d: 'Rüzgar sana doğru gelirken ilerle — koku karşı yöne gider.' },
    ],
  },
];

export default function NaturalCamo() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎭 Doğal Kamuflaj</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Prensipleri · doğal malzeme · hareket tekniği</div>
      </div>

      <div style={{ background: '#090e08', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>🎭 TEMEL İLKE</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Hayvanlar rengi degil, silueti ve hareketi algılar. Silueti kir, hareketi yavaşlat.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#090e08', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#090e08', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0d1208' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>{item.t}</div>
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
