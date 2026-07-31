import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  {
    id: 'footwear', name: 'Ayakkabı & Çorap', icon: '👟', accent: '#f59e0b',
    items: [
      { name: 'Yürüyüş Botu', desc: 'Ankle desteği için yüksek bilekli. Goretex su geçirmezlik şart.', budget: 'Entry: 800–1500₺ · Mid: 1500–3000₺ · Pro: 3000₺+', brands: 'Salomon X Ultra · Merrell Moab · La Sportiva' },
      { name: 'Trail Koşu Ayakkabısı', desc: 'Hafif, hızlı rotalar için. Daha az koruma ama hafiflik üstün.', budget: '600–2500₺', brands: 'Hoka Speedgoat · Brooks Cascadia · Adidas Terrex' },
      { name: 'Merinos Yürüyüş Çorabı', desc: 'Yün nem tutar, koku önler. Pamuk çorap kayma ve su emme yapar.', budget: '100–300₺', brands: 'Darn Tough · Smartwool · Icebreaker' },
    ],
  },
  {
    id: 'backpack', name: 'Sırt Çantası', icon: '🎒', accent: '#22c55e',
    items: [
      { name: 'Günlük Sırt Çantası (20-30L)', desc: 'Tek günlük yürüyüş için ideal. Hip belt ve sternum kayışı olmalı.', budget: '500–2500₺', brands: 'Osprey Talon · Deuter Speed Lite · Gregory Citro' },
      { name: 'Hafta Sonu Çantası (40-60L)', desc: '2-3 günlük ekspedisyon. Yük dağılımı için iyi çerçeve şart.', budget: '1500–5000₺', brands: 'Osprey Atmos · Deuter Aircontact · Gregory Baltoro' },
      { name: 'Yağmurluk Çanta Örtüsü', desc: 'Sırt çantasına özel — dahili veya harici. Her çantada bulunmaz.', budget: '50–200₺', brands: 'Sea to Summit · Vango · Osprey' },
    ],
  },
  {
    id: 'clothing', name: 'Giyim Sistemi', icon: '🧥', accent: '#3b82f6',
    items: [
      { name: 'Taban Katman (Base Layer)', desc: 'Deri ile temas eden katman. Merinos yün veya sentetik — ASLA PAMUK.', budget: '200–800₺', brands: 'Icebreaker · Smartwool · Patagonia Capilene' },
      { name: 'Orta Katman (Fleece/Down)', desc: 'Yalıtım. Polar mid-layer veya aşağı ceket. Havalı günler için çıkarılabilir.', budget: '300–2000₺', brands: 'Patagonia Nano Puff · Arc\'teryx Cerium · Rab Microlight' },
      { name: 'Dış Katman (Hardshell)', desc: 'Rüzgar ve yağmur bariyeri. Goretex veya eşdeğeri zorunlu.', budget: '800–5000₺', brands: 'Arc\'teryx Beta · Patagonia Torrentshell · Salewa' },
    ],
  },
  {
    id: 'navigation', name: 'Navigasyon & Güvenlik', icon: '🧭', accent: '#a78bfa',
    items: [
      { name: 'GPS Cihazı', desc: 'Telefona bağımlı olmayan bağımsız GPS. Batarya ömrü kritik.', budget: '2000–8000₺', brands: 'Garmin GPSMAP 67 · inReach Mini 2 · Suunto 7' },
      { name: 'Topo Harita + Pusula', desc: 'GPS bataryası tükenebilir. Topo harita + pusula her zaman yedek.', budget: '50–200₺', brands: 'Silva · Suunto · Brunton' },
      { name: 'Acil Yer Belirleme Cihazı (PLB)', desc: 'Konum iletir, telefon sinyali olmadan arama-kurtarma tetikler.', budget: '3000–7000₺', brands: 'ACR ResQLink · Ocean Signal · McMurdo' },
    ],
  },
  {
    id: 'shelter', name: 'Barınak & Uyku', icon: '⛺', accent: '#10b981',
    items: [
      { name: 'Ultralight Çadır', desc: '2 kişilik <2 kg. Double wall (iç çadır + fly) nemden korur.', budget: '2000–10000₺', brands: 'Big Agnes · MSR · Hilleberg' },
      { name: 'Uyku Tulumu', desc: 'Sıcaklık derecesi: bölge min gecelere -5°C marjı ekle. Down daha sıkıştırılabilir.', budget: '500–5000₺', brands: 'Sea to Summit · Rab · Therm-a-Rest' },
      { name: 'Uyku Matı (Sleeping Pad)', desc: 'R-değeri zeminden yalıtımı ölçer. 3 sezon için R4+ önerilir.', budget: '200–2500₺', brands: 'Therm-a-Rest NeoAir · Sea to Summit · Klymit' },
    ],
  },
];

const WEIGHT_TIPS = [
  { tip: 'Çantanı boş tartın — içi dolu ağırlık vücut ağırlığının %15-20\'sini geçmemeli', icon: '⚖️' },
  { tip: '"Big 3" (çadır + uyku tulumu + sırt çantası) toplamı 4 kg altı tutulursa kalanlar için yer kalır', icon: '3️⃣' },
  { tip: 'Her gram önemlidir ama güvenlik ekipmanında asla kesme yapma', icon: '🛡️' },
  { tip: 'Hediye kağıdı yerine ultralight torbalarda paketle — 200-300 g tasarruf kolayca yapılır', icon: '📦' },
  { tip: 'İki görev = tek ekipman: yağmurluk, oturma matı olarak da kullanılabilir', icon: '♻️' },
];

export default function HikingGear() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('gear');

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🥾 Yürüyüş Ekipmanı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 kategori · seçim rehberi & ağırlık optimizasyonu</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['gear', '🎒 Ekipman'], ['weight', '⚖️ Ağırlık']].map(([id, lbl]) => (
          <button key={id} onClick={() => { setTab(id); setSel(null); }} style={{
            flex: 1, background: tab === id ? '#84cc16' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#84cc16' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'gear' && CATEGORIES.map(cat => {
          const open = sel === cat.id;
          return (
            <div key={cat.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : cat.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${cat.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{cat.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{cat.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${cat.accent}33`, borderTop: 'none' }}>
                  {cat.items.map(item => (
                    <div key={item.name} style={{ background: '#374151', borderRadius: 8, padding: '10px 12px', marginTop: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: cat.accent, marginBottom: 4 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4 }}>{item.desc}</div>
                      <div style={{ fontSize: 11, color: '#22c55e', marginBottom: 2 }}>💰 {item.budget}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>🏷️ {item.brands}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {tab === 'weight' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>Ultralight yürüyüşün temel kuralı: her gram önemlidir ama güvenlik ekipmanında kesinti yapamazsın. Doğru önceliklerle paket ağırlığını dramatik biçimde azalt.</div>
            </div>
            {WEIGHT_TIPS.map((t, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{t.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{t.tip}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
