import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEVICES = [
  {
    id: 'radio', name: 'El Telsizi (PMR)', icon: '📻', accent: '#22c55e',
    range: '1-5 km düz arazi · dağda 10+ km',
    freq: 'PMR446 frekans bandı — lisanssız kullanım',
    setup: [
      'PMR446 frekansları: 446.00625 – 446.19375 MHz (16 kanal)',
      'Kanal 1: acil iletişim standardı',
      'CTCSS ton kodu ile kanal filtreleme',
      'Yüksek noktada daha iyi yayılım',
    ],
    tips: [
      'Ekibin aynı kanalda olduğunu doğrula',
      'Pil ömrü: 8-12 saat — yedek pil taşı',
      'Anten dik tut — yere paralel tutma',
    ],
    sos: 'Kanal 16 — uluslararası acil kanal',
    battery: 'AA pil veya şarjlı Li-Ion',
  },
  {
    id: 'satellite', name: 'Uydu Telefon/Mesaj', icon: '🛰️', accent: '#3b82f6',
    range: 'Dünya geneli — GSM kapsama dışı',
    freq: 'Iridium, Inmarsat, Globalstar ağları',
    setup: [
      'Gökyüzü görüşü zorunlu — ormanda zor',
      'Açık alanda 90 sn içinde uydu bağlantısı',
      'SMS mesaj ucuz, sesli arama pahalı',
      'Garmin inReach — uydu SMS + harita',
    ],
    tips: [
      'Abonelik planı yeterli mi kontrol et',
      'Pil ömrü mesaj modunda 1 hafta+',
      'Acil SOS düğmesi GEOS servisi aktive eder',
    ],
    sos: 'SOS butonu: 112 koordinasyon merkezi devreye girer',
    battery: 'Şarjlı — 2-3 gün kullanım',
  },
  {
    id: 'plb', name: 'PLB (Kişisel Konum Verici)', icon: '🚨', accent: '#ef4444',
    range: 'Uydu (COSPAS-SARSAT) — dünya geneli',
    freq: '406 MHz · uluslararası arama kurtarma',
    setup: [
      'Tek amaç: acil durum SOS',
      'Kayıt zorunlu — JRCC (Joint Rescue Coordination Center)',
      'Türkiye kaydı: kıyı emniyeti üzerinden',
      'Su geçirmez, darbeli — güvenilir',
    ],
    tips: [
      'Test modu ile kontrol — yılda 1 test',
      'Pil ömrü 5 yıl beklemede',
      'Aktivasyon sonrası kurtarma ekibi 4-6 saatte gelir',
    ],
    sos: 'Aktivasyon → 406 MHz sinyal → uydu → GEOS/JRCC → 112',
    battery: '5 yıl beklemede · 24 saat aktif mod',
  },
  {
    id: 'mirror', name: 'Güneş Aynası & İşaret', icon: '🪞', accent: '#f59e0b',
    range: '10-50 km (helikopter görüş mesafesi)',
    freq: 'Optik — enerji gerektirmez',
    setup: [
      'Işık kaynağı: güneş, ay, fener',
      'Ayna: saat camı, CD, folyo, mutfak alüminyumu',
      'Gökyüzü açık = sinyal gönder',
      '3 yanıp sönme uluslararası yardım sinyali',
    ],
    tips: [
      'Sabah 9-11 ve öğleden sonra 3-5 en iyi açı',
      'Hedefe çarptır — öne tutarak arkadaki yansımayı gör',
      'Ormanda açık alanda dur — sinyal uzaklara gider',
    ],
    sos: '3 aralıklı flaş = SOS / Mor sis bombası da kullanılabilir',
    battery: 'Enerji gerektirmez — güneş ışığı yeterli',
  },
];

const MORSE = [
  { char: 'S', code: '• • •', desc: 'Kısa kısa kısa' },
  { char: 'O', code: '— — —', desc: 'Uzun uzun uzun' },
  { char: 'SOS', code: '• • • — — — • • •', desc: 'Uluslararası yardım sinyali' },
  { char: 'W', code: '• — —', desc: 'Su istiyorum' },
  { char: 'F', code: '• • — •', desc: 'Yardıma ihtiyacım var' },
  { char: 'X', code: '— • • —', desc: 'Hareketsiz kalın' },
];

export default function EmergencyCom() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('devices');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📡 Acil Haberleşme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Telsiz · uydu mesaj · PLB · optik sinyal</div>
      </div>

      <div style={{ background: '#0a1a06', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>📞 ACİL NUMARALAR</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>GSM: 112 (Türkiye) · Telsiz: Kanal 1 (PMR446) / Kanal 16 (deniz) · PLB: Otomatik COSPAS-SARSAT</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['devices','Cihazlar'],['morse','Morse & Sinyal']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0a1008', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'devices' && DEVICES.map(d => {
          const open = sel === d.id;
          return (
            <div key={d.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : d.id)} style={{
                background: '#0a1008', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${d.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{d.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{d.range}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a1008', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${d.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: d.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>⚙️ KURULUM</div>
                  {d.setup.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {s}</div>)}
                  <div style={{ fontSize: 11, color: d.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>💡 İPUÇLARI</div>
                  {d.tips.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {t}</div>)}
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <div style={{ flex: 1, background: '#ef444415', borderRadius: 8, padding: '6px 10px' }}>
                      <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 700, marginBottom: 2 }}>🚨 SOS</div>
                      <div style={{ fontSize: 11, color: '#d1d5db' }}>{d.sos}</div>
                    </div>
                    <div style={{ flex: 1, background: '#22c55e15', borderRadius: 8, padding: '6px 10px' }}>
                      <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 700, marginBottom: 2 }}>🔋 PİL</div>
                      <div style={{ fontSize: 11, color: '#d1d5db' }}>{d.battery}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'morse' && (
          <div style={{ background: '#0a1008', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>📡 Morse Kodu & İşaret Sistemi</div>
            {MORSE.map((m, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < MORSE.length-1 ? '1px solid #151e12' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#22c55e', width: 36, flexShrink: 0 }}>{m.char}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontFamily: 'monospace', color: '#86efac', letterSpacing: 2 }}>{m.code}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{m.desc}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ background: '#ef444415', borderRadius: 8, padding: '10px 12px', marginTop: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', marginBottom: 4 }}>🚨 SOS HATIRLATICI</div>
              <div style={{ fontSize: 11, color: '#d1d5db' }}>3 kısa + 3 uzun + 3 kısa — ışık, ateş, ıslık, telsiz ile gönderilebilir. 1 dakika ara ver ve tekrarla.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
