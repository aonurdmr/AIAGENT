import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  {
    id: 'snorkel', name: 'Şnorkel', icon: '🤿', accent: '#06b6d4',
    desc: 'Yüzey sualtı gözlem tekniği',
    depth: '0-3 metre · uzun süreli',
    gear: 'Maske, şnorkel, yüzgeç · isteğe bağlı ıslak elbise',
    technique: [
      'Maskeyi sürünerek sık — sıkı ama rahatsız etmeden',
      'Şnorkelde su girerse güçlü nefes — temizleme tekniği',
      'Yüzgeç darbesi belden aşağı — kollar yanlarda',
      'Derin nefes + yüzey dalışı → 10-15 sn başlayanlar için',
    ],
    safety: ['Tek başına dalma — mutlaka 2 kişilik', 'Açık deniz akıntısı — kıyıya paralel yüz', 'Güneş yanığı — ıslak elbise veya güneş kremi'],
    locations: 'Ege koyları · Akdeniz kayalıkları · göl yüzeyi',
    tip: 'Maske buğulanmasını önle: tükürük veya özel anti-fog solüsyon — dalıştan önce sür.',
  },
  {
    id: 'freediving', name: 'Serbest Dalış', icon: '🌊', accent: '#3b82f6',
    desc: 'Nefes tutarak derinliğe dalış',
    depth: '5-30+ metre · teknik gerektiren',
    gear: 'Low-volume maske · uzun mono-yüzgeç · 3-5mm ıslak elbise · ağırlık kemeri',
    technique: [
      'Diyafram nefesi: göğsü değil karnı şişir',
      'Dalış öncesi hiperventilasyon yapma — bilinç kaybı riski',
      'Yavaş dalış — Frenzel manevrası ile kulakları denkleştir',
      'Kuyruk dalışı: dik aşağı, yüzgeç son kez vur, elleri yan',
    ],
    safety: ['Her zaman buddy — sığ su bayılması ölümcül', 'Yemekten 2+ saat sonra dal', 'Nefesin %20\'si kaldığında yüzeye dön'],
    locations: 'Bodrum · Kaş · Datça · Çeşme açıkları',
    tip: 'Sığ su bayılması (shallow water blackout) farkındasız gelir — buddy olmadan asla dalma.',
  },
  {
    id: 'scuba', name: 'Tüplü Dalış', icon: '🐠', accent: '#22c55e',
    desc: 'Tüp ile derinlik dalışı',
    depth: '18-40 metre · sertifika zorunlu',
    gear: 'Tüp · regülatör · BCD yelek · bilgisayar · derin dalış ekipmanı',
    technique: [
      'Dalış öncesi STOP testi: S-Sealing O-OKO T-Time P-Plan',
      'İniş: yavaş 9-18m/dak — kulaklara dikkat',
      'Nötral yüzdürme bulgusu bulmak temel beceri',
      'Tüp %50 → dönme noktası — söylenmeden dön',
    ],
    safety: ['Sertifikasız dalma — Open Water minimum', 'Dalıştan 12 saat sonra uçak yasak', 'Decompression stop — acele yüzme dekompresyon hastalığı'],
    locations: 'Kaş · Bodrum · Marmaris · Ölüdeniz',
    tip: 'Dekompresyon hastalığı belirtisi: eklem ağrısı, uyuşma, oksijen iste hemen — DAN acil hattı: 0312 292 29 92',
  },
];

const SAFETY_RULES = [
  { icon: '👥', rule: 'Buddy sistemi', desc: 'Her dalışta partner — bilinç kaybında 30 saniye içinde müdahale' },
  { icon: '🌊', rule: 'Akıntı farkındalığı', desc: 'Kıyıya paralel yüz — asla direnme, yorulunca köşegenle çık' },
  { icon: '🌡️', rule: 'Hipotermi', desc: 'Su ısısı 24°C altında ıslak elbise — 60 dak sonra çık' },
  { icon: '🚤', rule: 'Tekne trafiği', desc: 'Şamandıra ve bayrak çıkar — dalgıç bayrak kırmızı-beyaz' },
  { icon: '⚡', rule: 'Fırtına', desc: 'Yıldırım riski varsa sudan çık hemen' },
  { icon: '🩺', rule: 'Sağlık şartı', desc: 'Kalp/akciğer sorunu, epilepsi → önce hekime danış' },
];

export default function DivingGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('methods');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#02080f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🤿 Dalış Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Şnorkel · serbest dalış · tüplü dalış</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['methods','Teknikler'],['safety','Güvenlik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#04101a', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'methods' && METHODS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#04101a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{m.desc} · {m.depth}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#04101a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 12, marginTop: 8, marginBottom: 4 }}><span style={{ color: m.accent, fontWeight: 600 }}>⚙️ Ekipman: </span><span style={{ color: '#d1d5db' }}>{m.gear}</span></div>
                  <div style={{ fontSize: 11, color: m.accent, fontWeight: 700, marginBottom: 4, marginTop: 8 }}>📋 TEKNİK</div>
                  {m.technique.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {t}</div>)}
                  <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700, marginTop: 8, marginBottom: 4 }}>⚠️ GÜVENLİK</div>
                  {m.safety.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#fca5a5', marginBottom: 3 }}>• {s}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>📍 </span><span style={{ color: '#d1d5db' }}>{m.locations}</span></div>
                  <div style={{ background: m.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {m.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'safety' && (
          <div style={{ background: '#04101a', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🛡️ Dalış Güvenlik Kuralları</div>
            {SAFETY_RULES.map((r, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < SAFETY_RULES.length-1 ? '1px solid #0a2030' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#67e8f9' }}>{r.rule}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{r.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
