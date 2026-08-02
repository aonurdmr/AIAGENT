import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HAZARDS = [
  {
    id: 'altitude', name: 'Yükseklik Hastalığı', icon: '🏔️', accent: '#a78bfa',
    level: 'Orta risk',
    symptoms: ['Baş ağrısı ve mide bulantısı', 'Nefes darlığı dinlenirken', 'Uyku bozukluğu ve yorgunluk', 'Denge kaybı — acil iniş gerektirir'],
    prevention: ['Her 1000 m için 1 gün aklimasyon', '2500 m üstü geceleme artışını sınırla', 'Bol su iç — günde 3-4 litre', 'Alkol ve sigara mutlak yasak'],
    action: 'Semptom başlayınca anında 300-500 m alçal. Durmazsa helikopter tahliyesi.',
    tip: 'Türkiye\'de Ağrı (5137m) ve Kaçkar (3937m) ciddi yükseklik riski taşır.',
  },
  {
    id: 'hypothermia', name: 'Hipotermi', icon: '🥶', accent: '#3b82f6',
    level: 'Yüksek risk',
    symptoms: ['Titreme durması — tehlikeli işaret', 'Konuşma güçlüğü ve konfüzyon', 'Uyuşukluk ve uyuma isteği', 'Deri solukluğu ve mavi renk'],
    prevention: ['Katmanlı giyinme sistemi (3 katman)', 'Islak kalmaktan kaçın — pamuk öldürür', 'Kalorili atıştırmalık sürekli tüket', 'Sığınak planını önceden yap'],
    action: 'Islak giysiyi hemen çıkar. Vücudu kademeli ısıt — doğrudan ısı tehlikeli. Tatlı sıcak içecek ver.',
    tip: 'Yaz aylarında bile Karadeniz ve Doğu dağlarında gece hipotermi riski vardır.',
  },
  {
    id: 'lightning', name: 'Yıldırım Tehlikesi', icon: '⚡', accent: '#fbbf24',
    level: 'Yüksek risk',
    symptoms: ['Saç diken diken — yıldırım 30 sn içinde', 'Metal eşyalar ısınır', 'Boğaz burnu yanık kokusu', 'Gök gürültüsü 30 sn kural'],
    prevention: ['Tepe ve sırtlardan uzak dur', 'Tek ağaçtan 50 m mesafe', 'Kayalık çukurlara sığın değil', 'Öğleden sonra 14:00\'te aşağıda ol'],
    action: 'Çukur pozisyon: ayaklar bir arada, öne eğil, kulaklarını kapat. Düz yat asla.',
    tip: 'Türk dağlarında öğleden sonra yıldırım fırtınaları çok yaygın — sabah zirveye ulaş.',
  },
  {
    id: 'rockfall', name: 'Kaya Düşmesi', icon: '🪨', accent: '#ef4444',
    level: 'Yüksek risk',
    symptoms: ['Kaya sesi ve toz — alarm', 'Kuş kalabalığı ani uçuş', 'Çatlak zemin — instabil alan', 'Kar erimesi kaya gevşetir'],
    prevention: ['Kaskı asla çıkarma tehlikeli alanda', 'Kanallar ve kulvarlardan kaçın', 'Sabah erken — soğukta kaya daha sıkı', 'Grup birden sıralı geçişi yok'],
    action: 'Kaya alert: sırt çevir, çanta koruma, miğfer başa çek. Sığınak ara.',
    tip: 'Tırmanışta alt gruba "Kaya!" diye bağır — hayat kurtarır.',
  },
];

const GEAR = [
  { icon: '🎒', item: 'Kask', detail: 'CE EN 12492 sertifikalı dağcılık kaskı' },
  { icon: '🥾', item: 'Bot', detail: 'B2/B3 sert taban, bileği destekler' },
  { icon: '🧭', item: 'Harita + Pusula', detail: 'Dijital batarya biter, kağıt harita ve pusula zorunlu' },
  { icon: '🔦', item: 'Kafa lambası', detail: '300+ lümen, yedek pil zorunlu' },
  { icon: '🏥', item: 'İlk Yardım', detail: 'Sarmal bandaj, hipotermiye karşı folyo battaniye' },
  { icon: '📡', item: 'Telsiz / PLB', detail: 'GSM olmayan bölge için satellit cihaz öner' },
];

export default function MountainSafety() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('hazards');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080e18', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏔️ Dağ Güvenliği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 tehlike · önleme & acil eylem rehberi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['hazards','Tehlikeler'],['gear','Ekipman']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#a78bfa' : '#0d1525', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'hazards' && HAZARDS.map(h => {
          const open = sel === h.id;
          return (
            <div key={h.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : h.id)} style={{
                background: '#0d1525', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${h.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{h.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{h.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{h.level}</div>
                  </div>
                  <div style={{ fontSize: 10, color: h.accent, fontWeight: 700, background: h.accent + '22', padding: '3px 8px', borderRadius: 20 }}>⚠️</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0d1525', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${h.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: h.accent, fontWeight: 700, marginBottom: 4, marginTop: 8 }}>🔴 BELİRTİLER</div>
                  {h.symptoms.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {s}</div>)}
                  <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700, marginBottom: 4, marginTop: 8 }}>✅ ÖNLEME</div>
                  {h.prevention.map((p, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {p}</div>)}
                  <div style={{ background: '#1a0a0a', borderRadius: 8, padding: '8px 10px', marginTop: 8, border: '1px solid #ef444433' }}>
                    <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 700, marginBottom: 3 }}>🚨 ACİL EYLEM</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{h.action}</div>
                  </div>
                  <div style={{ background: h.accent + '15', borderRadius: 8, padding: '6px 10px', marginTop: 6 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {h.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'gear' && (
          <div style={{ background: '#0d1525', borderRadius: 14, padding: 14, border: '1px solid #a78bfa22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', marginBottom: 10 }}>🎒 Zorunlu Dağ Ekipmanı</div>
            {GEAR.map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, paddingBottom: 12, borderBottom: i < GEAR.length-1 ? '1px solid #111a2e' : 'none' }}>
                <span style={{ fontSize: 22 }}>{g.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#c4b5fd' }}>{g.item}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{g.detail}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
