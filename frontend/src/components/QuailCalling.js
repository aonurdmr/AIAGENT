import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CALLS = [
  {
    id: 'whistle', name: 'Bob-White Islığı', icon: '🎵', accent: '#f59e0b',
    desc: 'Bıldırcın erkek sesini taklit etme',
    steps: [
      'Islık: "Bob-WHIiiTE" — iki heceli, ikincisi yüksek',
      'Ağız çağrısı: dudak arasında dil ile hava üfleme',
      'Elektronik çağrı: daha tutarlı, rüzgarda etkili',
      'Çağrı aralığı: 30-45 saniye bekle, tekrar çağır',
      'Cevap gelirse dur — bıldırcın geliyor',
      'Çağrıya yaklaşma: bıldırcın kaçar, sen bekle',
    ],
    tip: 'Sessizce beklemek çağrıdan daha değerlidir.',
  },
  {
    id: 'covey', name: 'Sürü Toparlama Sesi', icon: '🐦', accent: '#22c55e',
    desc: 'Dağılmış sürüyü bir araya getirme sesi',
    steps: [
      'Scattered (dağılma) sesi: çabuk, kısa çığlıklar',
      'Sürü toparlama: "ka-KOI-ee" ritmi',
      'Kullan: bıldırcın sürüsü ürkütüldükten sonra',
      '5-10 dakika bekle — sürü bir araya gelmeye çalışır',
      'Sen de tam bu anda bulunma noktasını belirle',
      'Sabah erkeni en etkili — sürü dağılımı yeni',
    ],
    tip: 'Sabah avında sürüyü dağıt, sonra toparlama sesi ile çek.',
  },
  {
    id: 'feeding', name: 'Besleme ve Habitat', icon: '🌾', accent: '#a78bfa',
    desc: 'Bıldırcının beslenme alanlarını bulma',
    steps: [
      'Mısır, buğday, darı artığı tarlalar — besleme yeri',
      'Çalılık kenarı: öğleden sonra toz banyosu yapıyorlar',
      'Su kaynağı yakını: sabah ve akşam gelirler',
      'Yoğun ot örtüsü: saklanma ve geceleyin yuva',
      'Kameranı şafakta bu noktalarda beklet',
      'Ayak izi: küçük üç parmaklı bıldırcın izi',
    ],
    tip: 'Bıldırcın sürü halinde yaşar — bir görünce çevresini tara.',
  },
];

export default function QuailCalling() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐦 Bıldırcın Avı ve Çağrı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Islık çağrı · sürü toplama · habitat bulma</div>
      </div>

      <div style={{ background: '#0e1208', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f59e0b33' }}>
        <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>📅 SEZON</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Bıldırcın göç dönemi Ağustos-Ekim. Av sezonu açılışını yerel tebliğden kontrol et.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {CALLS.map(c => {
          const open = sel === c.id;
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : c.id)} style={{
                background: '#0e1208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${c.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{c.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0e1208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${c.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {c.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ background: c.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {c.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
