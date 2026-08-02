import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'habitat', name: 'Alabalık Habitatı', icon: '🏔️', accent: '#06b6d4',
    items: [
      { t: 'Soğuk akarsu', d: '10-18°C ideal. Yaz aylarında derin havuzlarda dinlenir.' },
      { t: 'Oksijen', d: 'Yüksek oksijen gerektirir — şelale ve çağlayanlar kritik.' },
      { t: 'Gölge', d: 'Ağaç gölgesi suyu serin tutar — kıyı meşeleri alabalık göstergesi.' },
      { t: 'Dip yapısı', d: 'Çakıl ve kaya dip: yumurtlama ve beslenme sahası.' },
      { t: 'Türkiye\'de yerler', d: 'Fırtına Deresi (Rize), Göksu (Toroslar), Kura (Ardahan).' },
    ],
  },
  {
    id: 'lures', name: 'Yemler ve Jiglar', icon: '🪝', accent: '#22c55e',
    items: [
      { t: 'Spinner', d: 'Gümüş/bakır. Akıntıya karşı yavaş çek. Çift kanca yok.' },
      { t: 'Minnow', d: '4-7cm şeffaf minnow. Derin havuzlarda dur-git hareketi.' },
      { t: 'Powerbait', d: 'Gökkuşağı alabalık için. Renk: pembe ve sarı en etkili.' },
      { t: 'Canlı yem', d: 'Solucan ve un kurdu. Dip olta, basit olta. Göl alabalığında.' },
      { t: 'Kuru sinek (suni sinek)', d: 'Sinek casting ile yüzey. İlkbahar-erken yaz zirve.' },
    ],
  },
  {
    id: 'season', name: 'Sezon ve Zaman', icon: '📅', accent: '#f97316',
    items: [
      { t: 'İlkbahar (Nisan-Mayıs)', d: 'Yemlenme yoğun. Kar eriyince hareket başlar. Zirve dönem.' },
      { t: 'Yaz (Haziran-Ağustos)', d: 'Derin havuzlar. Sabah ve akşam. Öğlen saatlerinde durur.' },
      { t: 'Sonbahar (Eylül-Ekim)', d: 'Yumurtlama hazırlığı. Saldırgan davranış. Spinner etkili.' },
      { t: 'Kış kapalı sezon', d: 'Türkiye\'de genelde Kasım-Mart kapalı — yerel yönetmelik kontrol et.' },
    ],
  },
  {
    id: 'rules', name: 'Kurallar ve Etik', icon: '⚖️', accent: '#a78bfa',
    items: [
      { t: 'Minimum boy', d: 'Gökkuşağı: 23cm, Dere alabalığı: 18cm. Altını bırak.' },
      { t: 'Tekli kanca', d: 'Yakala-bırak için tekli barbsiz kanca — hasar azalır.' },
      { t: 'Islak el', d: 'Tutmadan önce eli ıslatmak pul hasarını önler.' },
      { t: 'Su içinde bırak', d: 'Fotoğraf için maksimum 5 saniye havada tut.' },
      { t: 'Lisans', d: 'Türkiye\'de tatlısu avcılık lisansı zorunlu. Online başvuru.' },
    ],
  },
];

export default function TroutFishing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Alabalık Avcılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Habitat · yemler · sezon · kurallar</div>
      </div>

      <div style={{ background: '#030e14', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #06b6d433' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>🌊 SOĞUK SU</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Alabalık soğuk, oksijeni yüksek, temiz suya bağlıdır. Su kalitesi balık varlığının en güvenilir göstergesi.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#030e14', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#030e14', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #07141a' : 'none' }}>
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
