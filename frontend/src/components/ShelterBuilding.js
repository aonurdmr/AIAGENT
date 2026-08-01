import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SHELTERS = [
  {
    id: 'lean', name: 'Lean-to (Tek Eğimli)', icon: '🌲', accent: '#22c55e',
    time: '30-45 dak',
    difficulty: 'Kolay',
    steps: [
      'İki ağaç arasına yatay dal bağla — 2m yükseklik',
      'Eğimli dallar üste dayandır — 45 derece eğim',
      'Dal ve yapraklarla örtmeye başla — alttan üste',
      'Zemine 10cm kalın dal ve yaprak yataklık yap',
      'Ön taraf açık — ateş karşısına kur',
    ],
    pros: 'Hızlı yapılır · malzeme az · ısı yansıtır',
    tip: 'Ateşi 1.5m önünde yak — ısı sığınağa yansısın.',
  },
  {
    id: 'debris', name: 'Debris Hut (Yaprak Yığma)', icon: '🍂', accent: '#f59e0b',
    time: '2-3 saat',
    difficulty: 'Orta',
    steps: [
      'Yerde uzun merkez direği yere yasla — 2.5m',
      'Kısa kenar dalları balık kılçığı gibi diz — her iki yana',
      'En az 1m kalın yaprak ve dal örtüsü koy',
      'Zemine yaprak ve çim doldur — yataklık için',
      'Giriş mümkün oldukça küçük tut — ısı kaybı azalır',
    ],
    pros: 'Vücut ısısıyla ısınır · ateş gerekmez · sessiz',
    tip: 'Yaprak kalınlığı kritik — kolun içinden geçmiyorsa yetersiz.',
  },
  {
    id: 'tarp', name: 'Branda Sığınak', icon: '🏕️', accent: '#3b82f6',
    time: '10-20 dak',
    difficulty: 'Çok Kolay',
    steps: [
      'İki ağaç arasına ip ger — 1.5m yüksekliğinde',
      'Brandayı ipin üstüne at — eşit yanlara',
      'Köşeleri kazıklara bağla — rüzgar gerginliği ver',
      'Yerde uyku altlığı koy — zemin soğukluğu keser',
      'Rüzgar yönüne göre açıyı ayarla',
    ],
    pros: 'En hızlı kurulum · yeniden kullanılabilir',
    tip: 'Her av/kamp çantasında 3x3m branda şart. 200g, değeri paha biçilmez.',
  },
  {
    id: 'snow', name: 'Kar Sığınağı (Quinzhee)', icon: '❄️', accent: '#60a5fa',
    time: '3-4 saat',
    difficulty: 'Zor',
    steps: [
      'Kar yığını yap — 2m çap, 1.5m yükseklik',
      '1 saat karın sertleşmesini bekle',
      'Uzun çubukları eşit aralıkla içine sok — duvar kalınlık ölçüsü',
      'İçini kazan — çubuklar göründüğünde dur',
      'Havalandırma deliği aç — karbonmonoksit ölümcül',
    ],
    pros: 'Eksi 40 dışarıda 0°C içeride · rüzgar geçirmez',
    tip: 'Kar sığınağında mum yak — ısı + ışık. Havalandırma deliğini kapat, uyumadan önce kontrol et.',
  },
];

export default function ShelterBuilding() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#04080a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏕️ Sığınak Yapımı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Lean-to · debris hut · branda · kar sığınağı</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SHELTERS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#080e10', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.difficulty} · {s.time}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#080e10', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {s.steps.map((st, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {st}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>✅ Avantaj: </span><span style={{ color: '#d1d5db' }}>{s.pros}</span></div>
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
