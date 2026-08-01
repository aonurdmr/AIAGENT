import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'breeds', name: 'Av Köpeği Irkları', icon: '🐕', accent: '#f97316',
    items: [
      { t: 'Pointer', d: 'Keklik ve bıldırcın. Hızlı, geniş alan tarama. Katı beden hareketi.' },
      { t: 'Setter', d: 'Uzun tüylü Pointer benzeri. Ormanlık arazi. Yavaş çalışma.' },
      { t: 'Spaniel', d: 'Sazlık ve çalı. Ördek için. Düşüğü geri getirir — apport.' },
      { t: 'Retreiver (Labrador)', d: 'Su avı ve apport. Güvenilir, sakin. Ailede de rahat.' },
      { t: 'Tazı', d: 'Tavşan ve geyik kovalama. Hız odaklı. Görüş avcısı.' },
    ],
  },
  {
    id: 'training', name: 'Temel Eğitim', icon: '🎓', accent: '#22c55e',
    items: [
      { t: 'Otur-yat-gel', d: 'Önce bu üç komut. Sahada itaat için temel.' },
      { t: 'Apport', d: 'Nesne getirme. Erken yaşta sünger veya bez ile başla.' },
      { t: 'Yaklaşma komutu', d: 'Sahada kritik — geri çağırma yoksa tehlikeli.' },
      { t: 'Tabanca sesine alışma', d: 'Adım adım: uzaktan, yakından, küçük kalibre, büyük.' },
      { t: 'Pozitif pekiştirme', d: 'Ceza yerine ödül — zeka gelişimi ve bağlılık için.' },
    ],
  },
  {
    id: 'care', name: 'Saha Köpeği Bakımı', icon: '❤️', accent: '#a78bfa',
    items: [
      { t: 'Pençe', d: 'Taşlık arazide pençe ezilmesi. Muayene et, soğuk su uygula.' },
      { t: 'Kene', d: 'Her av sonrası tam vücut taraması. Başa dikkat — tik tik kene.' },
      { t: 'Isınma', d: 'Soğuk havada yavaş başlat. Kaslar soğukta zedelenir.' },
      { t: 'Sıcak-soğuk', d: 'Yoğun çalışmada ısınma belirtisi: yavaşlat, su ver, gölge.' },
    ],
  },
];

export default function DogTraining() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0602', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐕 Av Köpeği Eğitimi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Irklar · eğitim · saha bakımı</div>
      </div>

      <div style={{ background: '#120a04', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f9730633' }}>
        <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700 }}>🐕 AV KÖPEGİ</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>İyi bir av köpeği 2-3 yıl sabırlı eğitim gerektirir. Zaman yatırımı, sahada onlarca yıl kazandırır.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#120a04', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#120a04', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1a0e08' : 'none' }}>
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
