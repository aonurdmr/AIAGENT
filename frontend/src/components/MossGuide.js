import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'nav', name: 'Yön Bulma', icon: '🧭', accent: '#22c55e',
    items: [
      { t: 'Kuzey yüzeyi', d: 'Yosun genelde taşın kuzey yüzünde yoğun. Ağaçların kuzey tarafı daha yosunlu.' },
      { t: 'Güney tarafı', d: 'Güney yüz daha kuru, güneş görür. Yosun az veya yok — güneye bak.' },
      { t: 'Dikkat', d: 'Tek başına kural değil. Birden fazla taşı kontrol et, güvenilir değilse GPS kullan.' },
      { t: 'Ağaç kılavuzu', d: 'Ağaç gövdesinin kuzey tarafı daha nemli ve kabarik kabuklu olabilir.' },
    ],
  },
  {
    id: 'moisture', name: 'Nem & Habitat', icon: '💧', accent: '#06b6d4',
    items: [
      { t: 'Nem göstergesi', d: 'Yosun yoğun bölge: nem yüksek. Kaynak veya dere yakınlığı işareti.' },
      { t: 'Zemin türleri', d: 'Asidik toprak, gölgeli alan, kayalık yüzey — yosunun evi.' },
      { t: 'Kamp yeri', d: 'Çok yosunlu yer: zemin rutubetli, uyuma için kötü. Yosunsuzu tercih et.' },
      { t: 'Su bulma', d: 'Yoğun yosun örtüsü ve yeşil çizgi — kaynak veya dere yatağını izleyebilir.' },
    ],
  },
  {
    id: 'eco', name: 'Ekosistem & Kullanım', icon: '🌿', accent: '#a78bfa',
    items: [
      { t: 'Ekosistem rolü', d: 'Yosun nem tutar, erozyonu önler, küçük canlılara yaşam alanı sağlar.' },
      { t: 'Acil yatak', d: 'Kalın yosun tabakası kuru ise yalıtım malzemesi olarak kullanılabilir.' },
      { t: 'İz bırakma', d: 'Yosun çok yavaş büyür. Adım atarken dikkat — LNT prensipleri.' },
      { t: 'Tür çeşitliliği', d: 'Türkiye\'de 600+ yosun türü. Ormanda en zengin yosun örtüsü.' },
    ],
  },
];

export default function MossGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yosun Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yön bulma · nem işareti · doğa okuması</div>
      </div>

      <div style={{ background: '#0a1208', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>🌿 YOSUN & DOĞA</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Yosun doğanın GPS\'i — nem, yön ve habitat hakkında ipucu verir. Okumayı öğren.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#0a1208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a1208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0e1a0e' : 'none' }}>
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
