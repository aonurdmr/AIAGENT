import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SEASONS = [
  {
    id: 'spring', name: 'İlkbahar (Mart-Mayıs)', icon: '🌸', accent: '#22c55e',
    items: [
      { t: 'Göç zirvesi', d: 'Afrika\'dan dönen yaz göçmenleri. Kırlangıç, ötleğen, arıkuşu.' },
      { t: 'Ötüş rekabeti', d: 'Erkek öter, bölge ilan eder. Tanıma için ideal dönem.' },
      { t: 'Çekim noktası', d: 'Su kaynakları ve çiçekli ağaçlar — böcek bolluğu.' },
      { t: 'Saat', d: 'Şafaktan 2 saat sonrası. Dawn chorus (şafak korosu) zirvesi.' },
    ],
  },
  {
    id: 'summer', name: 'Yaz (Haziran-Ağustos)', icon: '☀️', accent: '#f59e0b',
    items: [
      { t: 'Yavru dönemi', d: 'Naif yavruları yetişkinle karıştırma. Farklı tüy rengi.' },
      { t: 'Sessizleşme', d: 'Ötüş azalır — yuvalama bitti. Ses yerine görsel takip.' },
      { t: 'Erken sonbahar goc', d: 'Ağustos sonundan itibaren ötleğenler güneye iner.' },
      { t: 'Su noktası', d: 'Kuş banyosu ve suluk kuruyorsa en yoğun ziyaret eden tür.' },
    ],
  },
  {
    id: 'autumn', name: 'Sonbahar (Eylül-Kasım)', icon: '🍂', accent: '#f97316',
    items: [
      { t: 'Yoğun göç', d: 'Milyonlarca kuş güneye. Boğazlarda bazen sürü karartır.' },
      { t: 'Nadir türler', d: 'Rüzgar kayması ve fırtına — çok nadir türler sapabilir.' },
      { t: 'Atlatik köken', d: 'Doğu Türkiye: Sibirya kökenli türler geçer. Liste uzar.' },
      { t: 'Sürü', d: 'Kırlangıçlar ve çalıkuşları gece göç eder — şafakta inerler.' },
    ],
  },
  {
    id: 'winter', name: 'Kış (Aralık-Şubat)', icon: '❄️', accent: '#60a5fa',
    items: [
      { t: 'Kışlakçılar', d: 'Kuzeyden gelen ördekler, kazlar, çulluklar. Göl ve delta.' },
      { t: 'Rezidant türler', d: 'Yıl boyu kalan türler kışın daha rahat — rekabet az.' },
      { t: 'Besleyici kur', d: 'Bahçeye besleyici asmak nadir olmayan türleri yaklaştırır.' },
      { t: 'Saat', d: 'Kışın güneş geç doğar — sabah başlangıcı daha geç olabilir.' },
    ],
  },
];

export default function SeasonalBirding() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040a06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦜 Mevsimsel Kuş Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İlkbahar · yaz · sonbahar · kış dönemleri</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SEASONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#081008', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#081008', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0c160c' : 'none' }}>
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
