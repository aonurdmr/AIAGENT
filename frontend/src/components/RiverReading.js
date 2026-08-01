import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FEATURES = [
  {
    id: 'riffle', name: 'Hızlı Aktı (Riffle)', icon: '🌊', accent: '#06b6d4',
    desc: 'Sığ, hızlı, taşlı bölümler',
    fish: 'Alabalık beslenme pozisyonu · yüzeyde böcek avı',
    why: 'Su oksijeni yüksek, böcek aktivitesi fazla, küçük balık bol',
    best: 'Sinek olta · nymph · küçük spinner',
    tips: [
      'Aktı girişi: balık aktının başında durur, böceği bekler',
      'Aktı çıkışı: daha derin, büyük balık oturur',
      'Taş altı: balık akıntıdan korunur, yem önüne gelir',
      'Hava sıcak: balık aktıya çıkar — oksijen arar',
    ],
  },
  {
    id: 'pool', name: 'Havuz (Pool)', icon: '💧', accent: '#a78bfa',
    desc: 'Derin, yavaş, sakin bölümler',
    fish: 'Büyük balık sığınağı · turna ve levrek',
    why: 'Derinlik güvenlik sağlar, büyük bireyler burada bekler',
    best: 'Derin crankbait · jig · uzun kanca düşürme',
    tips: [
      'Havuz girişi (head): en iyi balık pozisyonu — akıntıdan yem geliyor',
      'Havuz ortası: sakin, büyük balık dinleniyor',
      'Havuz çıkışı (tail): sığlaşan havuz — sabah ve akşam',
      'Dip: büyük turna ve sudak için — yavaş sunu',
    ],
  },
  {
    id: 'eddy', name: 'Ters Akıntı (Eddy)', icon: '🌀', accent: '#22c55e',
    desc: 'Kaya ve dönüş noktasında dönen su',
    fish: 'Balık akıntıdan saklanır, yem tuzağa düşer',
    why: 'Ters akıntıda yem toplanır, balık minimum enerjiyle beslenebilir',
    best: 'Yüzen kuru sinek · küçük nymph · yüzer ile canlı yem',
    tips: [
      'Kaya arkası: en belirgin eddy noktası',
      'Büyük ağaç kökü: akıntı kırar, eddy oluşur',
      'Eddy hattı (seam): iki akıntı birleşme çizgisi — altın',
      'Çarpm noktasından hemen önce at — yem döner gelir',
    ],
  },
  {
    id: 'undercut', name: 'Altı Oyulmuş Kıyı', icon: '🏦', accent: '#f97316',
    desc: 'Kıyı altında oluşan gizli barınak',
    fish: 'Büyük alabalık ve levrek — gizli sığınak',
    why: 'Gölge, serin su, gizlilik — büyük balığın evi',
    best: 'Serbest yüzer · kısık bırak · nymph yüzdür',
    tips: [
      'Otlak ve toprak kıyıda alt oyuklar var',
      'Yemi kıyı boyunca yüzdür — altı oyuğun içine gir',
      'Sabah erkeni gölge alanda balık aktif',
      'Gün ortası: serin gölgede büyük balık sığınır',
    ],
  },
  {
    id: 'confluence', name: 'Kavşak Noktası', icon: '🔀', accent: '#f59e0b',
    desc: 'İki derenin birleştiği nokta',
    fish: 'Her iki akıntı türünden yem toplar — yoğun nokta',
    why: 'Birleşen su iki tarafın yemini taşır, balık buluşma noktasında bekler',
    best: 'Orta ağırlık · akıntı hattını takip et',
    tips: [
      'Soğuk dere + ılık nehir birleşimi: yazın soğuk taraf tercih',
      'Kavşak hemen aşağısı: yem birikimi en yüksek',
      'İki türlü balık: farklı tercihlere göre konum değiştir',
      'Kavşak havuzu: en büyük bireyler burada',
    ],
  },
];

export default function RiverReading() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c12', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Nehir Okuma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Aktı · havuz · ters akıntı · oyuk kıyı · kavşak</div>
      </div>

      <div style={{ background: '#041018', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #06b6d433' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>🎯 TEMEL KURAL</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Balık tembeldir — minimum enerji, maksimum yem. Akıntıya karşı durur, yem önüne gelir. Bunu bul, balığı bulursun.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {FEATURES.map(f => {
          const open = sel === f.id;
          return (
            <div key={f.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : f.id)} style={{
                background: '#041018', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${f.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{f.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041018', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${f.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: f.accent, marginTop: 8, marginBottom: 2 }}>🐟 <span style={{ fontWeight: 700 }}>Balık:</span> {f.fish}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 6 }}>💬 {f.why}</div>
                  <div style={{ fontSize: 11, color: f.accent, marginBottom: 6 }}>🎣 <span style={{ fontWeight: 700 }}>En iyi yem:</span> {f.best}</div>
                  <div style={{ fontSize: 11, color: f.accent, fontWeight: 700, marginBottom: 4 }}>📋 İPUÇLARI</div>
                  {f.tips.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}>• {t}</div>)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
