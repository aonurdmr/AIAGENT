import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OPTICS = [
  {
    id: 'binoculars', name: 'Dürbün', icon: '🔭', accent: '#818cf8',
    desc: 'Saha gözlemi için en temel optik araç. 8x42 ve 10x42 kombinasyonları doğa gözlemi ve av için idealdir.',
    specs: [
      { label: 'Büyütme (8x vs 10x)', val: '8x daha geniş görüş açısı, 10x daha fazla detay' },
      { label: 'Objektif Çapı (42mm)', val: 'Düşük ışıkta üstün performans, taşınabilir ağırlık' },
      { label: 'Görüş Açısı', val: '8x42: 130m/1000m · 10x42: 110m/1000m' },
      { label: 'Exit Pupil', val: '5.25mm (8x42) ideal — alacakaranlık & şafak' },
    ],
    uses: ['Kuş gözlemi (8x32 hafif)', 'Av (10x42 standart)', 'Deniz (7x50 büyük exit pupil)', 'Kamp & gece gökyüzü'],
    brands: 'Swarovski EL · Zeiss Victory · Leica Trinovid · Vortex Viper',
    tip: 'Diopter ayarını gözlüklü kullanım için mutlaka kalibre et. Bak ve ayarla, sonra koru.',
  },
  {
    id: 'riflescope', name: 'Tüfek Dürbünü (Scope)', icon: '🎯', accent: '#ef4444',
    desc: 'Av tüfeğine monte edilen uzun menzilli nişan optikleri. Büyütme ve tüp çapı kritik seçim kriterleridir.',
    specs: [
      { label: 'Büyütme Aralığı', val: '3-9x: Çok yönlü · 6-24x: Uzun menzil · 1-4x: Kısa menzil' },
      { label: 'Tüp Çapı', val: '1" (25.4mm) vs 30mm — 30mm daha fazla ayar payı' },
      { label: 'Paralaks Düzeltme', val: '100m fiksli veya AO/SF ayarlı' },
      { label: 'Reticle Tipi', val: 'FFP (Front Focal): tam büyütmede ölçekli · SFP: değişken' },
    ],
    uses: ['Orman avı: 1-4x veya 3-9x', 'Açık alan: 4-16x', 'Uzun menzil: 5-25x', 'Gece: IR destekli'],
    brands: 'Leupold VX · Nightforce NX8 · Vortex Razor · Schmidt & Bender',
    tip: 'MOA vs MRAD: 1 MOA = 2.9 cm/100m · 1 MRAD = 10 cm/100m. Hangisini kullanacağını öğren.',
  },
  {
    id: 'rangefinder', name: 'Lazer Mesafe Ölçer', icon: '📡', accent: '#22c55e',
    desc: 'Yansıtma ilkesiyle anında mesafe ölçer. Modern avcıların vazgeçilmez parçası.',
    specs: [
      { label: 'Menzil', val: '600m: yeterli avcılık · 1500m+: uzun menzil hedef' },
      { label: 'Angle Compensation', val: 'Eğimde gerçek yatay mesafeyi hesaplar — kritik!' },
      { label: 'Ölçüm Modu', val: 'First mode (yakın cisim) vs Last mode (hedef arkası)' },
      { label: 'Pil Ömrü', val: 'CR2 veya CR2032 · soğukta %40 düşüş' },
    ],
    uses: ['Av: Tam mesafe bilgisi', 'Golf: En popüler', 'Yürüyüş: Zirve mesafe', 'Taktik: Hedef koordinatı'],
    brands: 'Leica Rangemaster · Vortex Fury · Sig Sauer Kilo · Nikon Prostaff',
    tip: 'Hayvan üzerinde ölçerken arka bacaklardan al — göğüs bölgesi ideal atış noktası ortalama mesafedir.',
  },
  {
    id: 'monocular', name: 'Monokular & Spotting Scope', icon: '🔬', accent: '#f97316',
    desc: 'Tek gözlü kompakt optikler ve yüksek güçlü gözlem dürbünleri. Stalk öncesi uzak değerlendirme.',
    specs: [
      { label: 'Spotting Scope', val: '20-60x80: Tripod zorunlu · Uzak av tarlası & kıyı' },
      { label: 'Monokular', val: '8-10x25: Cep tipi · Hafif gezi' },
      { label: 'Gece Görüş', val: 'Gen1/Gen2/Gen3 NV veya termal kamera' },
      { label: 'Angled vs Straight', val: 'Angled (45°) uzun gözlemde yorgunluğu azaltır' },
    ],
    uses: ['Stalk avı: Hedef değerlendirme', 'Kuş gözlemi: Spotting scope', 'Deniz: Uzak gemi takibi', 'Astronomi: Spotting ile ay'],
    brands: 'Kowa TSN · Swarovski ATX · Vortex Razor HD · Celestron Regal',
    tip: 'Spotting scope için çift tüp adaptörü ile binokular dönüşüm mümkün. Çok yönlü kullanım.',
  },
];

const CARE_TIPS = [
  { tip: 'Asla lens bezleri yerine kağıt veya giysi kullanma — mikro çizik birikir', icon: '❌' },
  { tip: 'Lensi temizlemeden önce yumuşak fırçayla tozu al, sonra lens bezi kullan', icon: '🖌️' },
  { tip: 'Optikleri doğrudan güneş ışığına bırakma — iç kaplama bozulur', icon: '☀️' },
  { tip: 'Nem emici silika jel paketi çanta içinde tut — mantar oluşumunu önler', icon: '💧' },
  { tip: 'Lens kapakları her zaman takılı olmalı — transport esnasında darbe koruması', icon: '🔒' },
  { tip: 'Yıllık kalibrasyonu bir optik servisine yaptır — collimation kayması olabilir', icon: '🔧' },
];

const MAGNIF_GUIDE = [
  { range: '6-8x', use: 'Kuş gözlemi, kısa menzil av', ideal: 'El tutma, geniş görüş' },
  { range: '10x', use: 'Genel av, uzak gözlem', ideal: 'Standart av dürbünü' },
  { range: '3-9x Scope', use: 'Çok yönlü av tüfeği', ideal: '50-300m mesafe' },
  { range: '6-18x Scope', use: 'Açık arazi, uzak hedef', ideal: '200-600m mesafe' },
  { range: '20-60x Spotting', use: 'Hedef değerlendirme', ideal: 'Tripod zorunlu' },
];

export default function OpticsGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔭 Optik Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Dürbün · tüfek dürbünü · mesafe ölçer</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['types', '🔭 Tipler'], ['magnif', '🔢 Büyütme'], ['care', '🧹 Bakım']].map(([id, lbl]) => (
          <button key={id} onClick={() => { setTab(id); setSel(null); }} style={{
            flex: 1, background: tab === id ? '#818cf8' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#818cf8' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'types' && OPTICS.map(o => {
          const open = sel === o.id;
          return (
            <div key={o.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : o.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${o.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{o.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{o.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${o.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{o.desc}</div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>📐 TEKNİK ÖZELLIKLER</div>
                    {o.specs.map((s, i) => (
                      <div key={i} style={{ marginBottom: 5 }}>
                        <div style={{ fontSize: 11, color: o.accent, fontWeight: 600 }}>{s.label}</div>
                        <div style={{ fontSize: 11, color: '#d1d5db' }}>{s.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>✅ KULLANIM ALANLARI</div>
                    {o.uses.map(u => <div key={u} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}><span style={{ color: o.accent }}>•</span> {u}</div>)}
                  </div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>🏷️ {o.brands}</div>
                  <div style={{ background: o.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: o.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{o.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'magnif' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>Doğru büyütme seçimi görüş kalitesini ve performansı doğrudan etkiler. Yüksek büyütme = dar görüş açısı = el titremenin etkisi artar.</div>
            </div>
            {MAGNIF_GUIDE.map((m, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #374151' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#818cf8', marginBottom: 4 }}>{m.range}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{m.use}</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>✅ {m.ideal}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'care' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>Kaliteli optikler on yıl kullanılabilir — ama yanlış bakım kalıcı hasar bırakır. Lens kaplama en hassas kısımdır.</div>
            </div>
            {CARE_TIPS.map((c, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{c.tip}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
