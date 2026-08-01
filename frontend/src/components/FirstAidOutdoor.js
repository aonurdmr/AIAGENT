import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SCENARIOS = [
  {
    id: 'wound', name: 'Yara & Kanama', icon: '🩸', accent: '#ef4444',
    priority: 'ACİL',
    steps: [
      'Temiz bez veya eldiven ile baskı uygula — 10 dak sürekli',
      'Yeri yükselt — kalp seviyesi üstünde tut',
      'Turnike: arterse — kasıktan 5cm üst — kayış veya ip',
      'Turnike saatini yaz — 2 saatte çöz ve sık',
      '112 ara — kanamanın yerini ve büyüklüğünü anlat',
    ],
    dont: 'Baskıyı kaldırma — bakayım deme, kanama devam eder',
    tip: 'Orman ortamında: yosun ve temiz yaprak geçici bant görevi görür.',
  },
  {
    id: 'fracture', name: 'Kırık & Çıkık', icon: '🦴', accent: '#f59e0b',
    priority: 'ÖNEMLİ',
    steps: [
      'Hareket ettirme — bulunduğu pozisyonda sabitle',
      'Kırık varsa üst-alt eklemden splint yap: dal veya tahta',
      'Kıyafet veya bantla bağla — fazla sıkma',
      'Çıkık: zorlama — yerine oturtma — uzman yapar',
      'Dolaşımı kontrol et — parmaklara renk ve his',
    ],
    dont: 'Kırık kemiği hizalamaya çalışma — splint ol gerekirse',
    tip: 'Dal splint: 2 uzun sağlam dal + kıyafet bağı — taşıma için.',
  },
  {
    id: 'hypothermia', name: 'Hipotermi', icon: '🥶', accent: '#60a5fa',
    priority: 'ACİL',
    steps: [
      'Islak kıyafeti çıkar — vücut ısısı hızla düşer ıslakken',
      'Battaniye veya uyku tulumuna al — yanına sıcak insan',
      'Islak zemine yatırma — izole et (sırt çantası, yaprak)',
      'Sıcak içecek ver — bilinç açıksa, yavaşça',
      'Kolların altına ve kasık bölgesine sıcak şişe koy',
    ],
    dont: 'Ovalama yapma — damarlar genişler, sıcak iç organlara gitmez',
    tip: 'Hipotermi tespit: titreme durdu ama soğuk — tehlikeli evre, acilen ısıt.',
  },
  {
    id: 'snake', name: 'Yılan Isırığı', icon: '🐍', accent: '#22c55e',
    priority: 'ACİL',
    steps: [
      'Sakin ol — kalp atışı hızlandıkça zehir yayılır',
      'Hareketsiz tut — ısırılan uzvun hareketi azalt',
      'İsırık bölgesini sabunlu suyla yıka — kirleticiyi uzaklaştır',
      'Bileği, saati, yüzüğü çıkar — şişme olabilir',
      '112 ara — yılan türünü ve ısırık yerini anlat',
    ],
    dont: 'Emiş yapma · kesi açma · turnike koyma — hepsi zararlı',
    tip: 'Türkiye zehirli yılanı: Koca Engerek (Vipera berus) — Doğu dağlık kesim.',
  },
];

export default function FirstAidOutdoor() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0306', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🚑 Doğada İlk Yardım</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yara · kırık · hipotermi · yılan ısırığı</div>
      </div>

      <div style={{ background: '#200808', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>🆘 ACİL: 112</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Bu rehber profesyonel tıbbi yardıma ulaşana kadar ilk müdahale içindir. Gerçek acilde önce 112 ara.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SCENARIOS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#100508', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: s.accent, fontWeight: 600 }}>{s.priority}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#100508', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>✅ YAPILACAKLAR</div>
                  {s.steps.map((st, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {st}</div>)}
                  <div style={{ background: '#ef444415', borderRadius: 8, padding: '6px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#fca5a5' }}>❌ YAPILMAYACAK: {s.dont}</div>
                  </div>
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 6 }}>
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
