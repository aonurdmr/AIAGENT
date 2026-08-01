import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'gear', name: 'Ekipman', icon: '👟', accent: '#f97316',
    items: [
      { t: 'Trail ayakkabı', d: 'Sert taban, agresif diş, düşük drop. Kayaya tutunur.' },
      { t: 'Koşu sırt cantası', d: '5-12L hydration pack. Su balobu + acil malzeme.' },
      { t: 'Koşu sopası', d: 'Karbon, katlanır. Iniş yükü azaltır, tırmanma itiş.' },
      { t: 'Baslambra', d: 'Hafif head torch. Sabah erken veya geç akşam zorunlu.' },
      { t: 'Acil kit', d: 'Termal folyo, elastik, enerji jeli, telefon şarj. 150g max.' },
    ],
  },
  {
    id: 'technique', name: 'Koşu Tekniği', icon: '🏃', accent: '#22c55e',
    items: [
      { t: 'Kısa adım', d: 'Arazi koşusunda kısa adım atar — kontrol ve denge.' },
      { t: 'Iniş tekniği', d: 'Dik iniş: küçük adım, yandan bak, diz hafif kırık.' },
      { t: 'Tırmanma', d: 'Yürümek de strateji. Kalp atışı 80%+ ise yürüyerek tırman.' },
      { t: 'Bak önüne', d: '3-5m öne bak, değil ayaklara. Zemin haritasını kafada tut.' },
      { t: 'Kaya zemin', d: 'Iriş yüzey, orta ayak. Topuk iniş kaymasına yol açar.' },
    ],
  },
  {
    id: 'nutrition', name: 'Beslenme ve Hidrasyon', icon: '💧', accent: '#06b6d4',
    items: [
      { t: 'Su', d: '500ml/saat. Yükseklik ve sıcaklıkla artır. Idrar rengi takip et.' },
      { t: 'Enerji jeli', d: 'Her 45 dakikada bir jel. Karbonhidrat ve elektrolit içeren.' },
      { t: 'Real food', d: 'Uzun koşu: hurma, muz, fıstık ezmeli sandviç — jelin yanında.' },
      { t: 'Elektrolit', d: 'Tuz ve magnezyum kayıbı: kramp önler. Tuz tablet taşı.' },
      { t: 'Serinleme', d: 'Dere suyu kafa ve ense: iç ısı düşürür. Eğer temizse içi.' },
    ],
  },
  {
    id: 'safety', name: 'Güvenlik', icon: '⛑️', accent: '#a78bfa',
    items: [
      { t: 'Rota bildirimi', d: 'Nereye gittiğini bırak. Kaç saatte döneceğini söyle.' },
      { t: 'Hava tahmini', d: 'Dağ hava = şimşek riski. Tepeden 30dk önce en. Tahmini kontrol et.' },
      { t: 'Güneş', d: 'SPF50+ ve kep. 1000m üstü UV şiddetlenir.' },
      { t: 'Hayvan', d: 'Yılan: zemine bak. Boz ayı: gürültülü koş. Arı yuvası: sakin çekil.' },
      { t: 'Yorgunluk', d: 'Yorgunluk = hata artar. Geri dön cesareti — ego bırak.' },
    ],
  },
];

export default function TrailRunning() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏃 Doga Kosusu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekipman · teknik · beslenme · güvenlik</div>
      </div>

      <div style={{ background: '#0e0800', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f9730633' }}>
        <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700 }}>🏃 TRAIL KOŞU</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Arazi koşusu asfaltan farklıdır. Hız degil, teknik ve dayanıklılık. Güvenlik her zaman önce gelir.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0e0800', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0e0800', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #150c04' : 'none' }}>
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
