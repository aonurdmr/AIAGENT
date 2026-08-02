import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SETUPS = [
  {
    id: 'small', name: 'Küçük Göl Kurulumu', icon: '💧', accent: '#06b6d4',
    desc: '6-12 heykel, dar su yüzeyi',
    pattern: 'J veya U şekli — giriş açık, avcı rüzgar altında',
    steps: [
      'Rüzgar yönünü belirle — ördek rüzgara karşı iner',
      'J şekli: açık uç rüzgara karşı — iniş koridoru',
      'Besleyen heykel (başı eğik) ve bekçi heykeli karışık kur',
      'Avcı pususunu heykellerden 15-20m uzak kur',
      'Çağrı: davet sesi ve besleme vaklaması kullan',
    ],
    tip: 'Az heykel daha iyi — kalabalık kurulum bazı ördek türlerini korkutur.',
  },
  {
    id: 'field', name: 'Tarla Kurulumu', icon: '🌾', accent: '#22c55e',
    desc: 'Hasat sonrası tarlada kaz ve ördek avı',
    pattern: 'X veya V şekli — iniş yolu ortada',
    steps: [
      'Hasat artığı tarla tercih et — mısır, buğday',
      'Tam boyutlu ayaklı heykeller — tarla için uygun',
      'X şekli: ortası boş — iniş alanı',
      'Avcı yere yatık pusu veya seyyar saklanma',
      'Sabah erken kurulum — güneş doğmadan hazır ol',
    ],
    tip: 'Kazlar 10-15 heykel, ördek 6-12 heykel — karıştırma.',
  },
  {
    id: 'floater', name: 'Yüzen Heykel Sistemi', icon: '🦆', accent: '#f59e0b',
    desc: 'Su yüzeyinde demirlenen heykeller',
    pattern: 'Dağınık + küçük grup — doğal görünüm',
    steps: [
      'Ağırlık ve ip ile demirleme: 50cm ip yeterli sığ suda',
      'Besleyiciler su kenarı, bekçi açıkta',
      'Rüzgarla sallanma doğal görünüm — eğlendirici tip',
      'Spinner kanatlı (jerk rig) en iyi hareket',
      'Ördek türüne göre heykel seç — angıt, mallard, çamurcun',
    ],
    tip: 'Güneş gözler — ördek parlak heykele mesafe tutar. Mat kaplama tercih et.',
  },
  {
    id: 'caller', name: 'Çağrı Teknikleri', icon: '📣', accent: '#a78bfa',
    desc: 'Ses taklidi ile çekme',
    steps: [
      'Ağız çağrısı: mallard ördek sesi en etkili',
      'Davet sesi: 5-7 vaklamalı yüksek seri',
      'Besleme vaklaması: alçak, düşük ritim — bölgede hissettir',
      'Elektronik çağrı: birden fazla tür sesi — daha etkili',
      'Ördek yaklaştıkça sesi azalt — sinmesini sağla',
      'Uzaklaşıyorsa yüksek çağrıya dön',
    ],
    tip: 'Aşırı çağrı ördek kaçırır — az ve yerinde daha etkili.',
  },
];

export default function DuckDecoys() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦆 Ördek Tuzak Heykeli</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kurulum desenleri · çağrı teknikleri · su ve tarla avı</div>
      </div>

      <div style={{ background: '#041014', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #06b6d433' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>💡 ALTIN KURAL</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Rüzgarı her zaman yüzüne al — ördek rüzgara karşı iner, heykeller ve sen rüzgar altında olmalısın.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SETUPS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#041014', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041014', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.pattern && <div style={{ fontSize: 11, color: s.accent, marginTop: 8, marginBottom: 6 }}>🗺️ <span style={{ fontWeight: 700 }}>Desen:</span> {s.pattern}</div>}
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {s.steps.map((st, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {st}</div>)}
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {s.tip}</div>
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
