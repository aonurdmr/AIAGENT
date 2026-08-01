import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TIPS = [
  {
    id: 'placement', name: 'Yerleştirme', icon: '📍', accent: '#f97316',
    desc: 'Kamera pozisyonu ve yüksekliği',
    items: [
      { t: 'Yükseklik', d: '80-100cm — av hayvanı bel hizası. Çok alçak: zemin aktivasyonu. Çok yüksek: hayvanı kaçırır.' },
      { t: 'Açı', d: 'Yolu çapraz çek — hayvan geçerken tam profil. Düz karşıdan kamera: hareket algılamakta geç kalır.' },
      { t: 'Iz noktaları', d: 'Nada, rub, su kaynağı, mineral blok, yem noktası — kamerayı bu noktalara kur.' },
      { t: 'Güneş yönü', d: 'Batı veya doğuya bakma — gündoğumu/batımında lens körleşir. Kuzey veya güney tercih et.' },
      { t: 'Koku', d: 'Eldiven ile kur — kamera üzerine koku bırakma. Koku nötr sprey sıkabilirsin.' },
    ],
  },
  {
    id: 'settings', name: 'Ayarlar', icon: '⚙️', accent: '#06b6d4',
    desc: 'Algılama, hız ve gece modu',
    items: [
      { t: 'Tetikleme hızı', d: '0.3-0.5 saniye: koşan hayvanı kaçırmazsın. Yavaş trigger = boş kare.' },
      { t: 'Fotoğraf/video modu', d: 'Fotoğraf: pil ömrü uzun, analiz hızlı. Video: davranış analizi için daha iyi.' },
      { t: 'IR tipi', d: 'Glow gece: hayvan ışık görür. No-glow (siyah): hayvan görmez, mesafe kısa.' },
      { t: 'Mega piksel', d: '12MP yeterli — çok yüksek MP SD kartı hızla doldurur, analiz yavaşlar.' },
      { t: 'Zaman damgası', d: 'Tarih+saat mutlaka açık — aktivite patikaları için kritik.' },
    ],
  },
  {
    id: 'power', name: 'Güç ve Depolama', icon: '🔋', accent: '#22c55e',
    desc: 'Pil ve hafıza optimizasyonu',
    items: [
      { t: 'Batarya', d: 'Alkalin: kısa ömür (2-3 hafta). Lityum: soğukta 2-3 ay. Güneş panelli: yıllık.' },
      { t: 'SD kart', d: 'En az 32GB — hızlı kart (Class 10 / U1). Özellikle video için U3.' },
      { t: 'Yedek kart', d: 'Birden fazla kart taşı — sahada değiştirirsin, kamerayı indirmene gerek yok.' },
      { t: 'Kontrol periyodu', d: 'Haftalık ideal. Çok sık gitme — koku ve aktivite bozar.' },
      { t: 'Bulut bağlantı', d: 'Cellular kamera: SMS veya uygulama ile anında bildirim — pahalı ama pratik.' },
    ],
  },
  {
    id: 'analysis', name: 'Görüntü Analizi', icon: '📊', accent: '#a78bfa',
    desc: 'Veriden strateji çıkarma',
    items: [
      { t: 'Saatlik aktivite', d: 'Hangi saat en aktif? Gece mi, şafak mı, öğle mi? — pususunu buna göre kur.' },
      { t: 'Dominant birey', d: 'Aynı erkek geyiği tekrar eden günlerde — o birey bölgeyi sahipleniyor.' },
      { t: 'Sürü büyüklüğü', d: 'Bir gecede kaç birey geçiyor? — popülasyon ve baskı tahmini.' },
      { t: 'Hava korelasyonu', d: 'Soğuk front sonrası aktivite artar mı? — hava takvimini karşılaştır.' },
      { t: 'Sezon değişimi', d: 'Ağustos-Eylül: hala velvet boynuz. Ekim: çıplak boynuz, kızışma başlıyor.' },
    ],
  },
];

export default function TrailCamera() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060808', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📷 Kamera Tuzak Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yerleştirme · ayarlar · güç · görüntü analizi</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TIPS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#0e1210', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0e1210', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #141c14' : 'none' }}>
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
