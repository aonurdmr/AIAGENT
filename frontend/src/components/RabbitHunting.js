import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  {
    id: 'walk', name: 'Yürüyerek Av', icon: '🚶', accent: '#a78bfa',
    desc: 'Çalılık ve fundalıkta yürüyerek kaldırma',
    steps: [
      'Yavaş, düzensiz yürü — tavşan kaçmadan önce dur ve bekle',
      'Fundalık kenarı, çalılık ve tarla sınırını tara',
      'Tavşan yatan yerde kalkınca hız düşük — fırsat yüksek',
      'Av sonrası hemen ilerle — diğerleri hala bölgede',
      'Sabah sis kalkınca veya öğleden sonra güneş azalınca aktivite artar',
    ],
    tip: 'Kış aylarında kar izini takip et — taze iz varsa tavşan yakında.',
  },
  {
    id: 'dog', name: 'Beagle ile Av', icon: '🐕', accent: '#f97316',
    desc: 'Beagle izi takip ederken avcı bekler',
    steps: [
      'Beagle izi bulur, ses çıkara çıkara kovalar',
      'Tavşan çember yapar ve aynı noktaya döner',
      'Avcı başlangıç noktasında veya bilinen güzergahta bekler',
      'Köpek sesi uzaklaştı yaklaştı — hazır ol',
      'Atış serbest mesafe: 20-40m, hareketli hedefe kısa',
    ],
    tip: 'Tavşan dairesel güzergahtan kaçar — başlangıç noktası altın.',
  },
  {
    id: 'trap', name: 'Tuzak', icon: '🪤', accent: '#22c55e',
    desc: 'Geçiş yoluna canlı veya ölü tuzak',
    steps: [
      'Taze iz olan güzergaha tuzak kur',
      'Canlı tuzak: elma veya havuç ile çek',
      'Yol tuzağı: daraltılmış geçiş noktasına kur',
      'Sabah ve akşam kontrol et — 12 saatte bir',
      'Bölge izni ve av ruhsatı gerekli',
    ],
    tip: 'Tuzak yerine kendi kokusu sinmesin — eldiven ile kur.',
  },
  {
    id: 'evening', name: 'Akşam Pusası', icon: '🌆', accent: '#f59e0b',
    desc: 'Tarlaya çıkan tavşanı bekleme',
    steps: [
      'Tarla kenarında rüzgarı arkana al',
      'Güneş batmadan 1 saat önce pozisyon al',
      'Tavşan tarla ortasına 50-80m kadar ilerler',
      'Hareketli hedefe ön tahmin (lead) ver',
      '20 kalibra saçma — fundalık avı için ideal',
    ],
    tip: 'Dolunayda tavşan tarla ortasına cesur girer — en iyi akşam.',
  },
];

export default function RabbitHunting() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐇 Yaban Tavşanı Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yürüyerek · beagle · tuzak · akşam pusası</div>
      </div>

      <div style={{ background: '#140a20', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #a78bfa33' }}>
        <div style={{ fontSize: 11, color: '#a78bfa', fontWeight: 700 }}>📋 SEZON</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Yaban tavşanı av sezonu genelde Ekim-Mart. Ruhsat ve bölge iznini her sezon kontrol et.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {METHODS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#120d1c', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{m.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#120d1c', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: m.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {m.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ background: m.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {m.tip}</div>
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
