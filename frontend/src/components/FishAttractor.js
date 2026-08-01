import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SYSTEMS = [
  {
    id: 'spod', name: 'Spod Roketi', icon: '🚀', accent: '#f97316',
    desc: 'Yemi uzak mesafeye fırlatma aparatı',
    range: '80-120m',
    steps: [
      'Spod: plastik füze şeklinde, yem yükler',
      'Yem karışımı: misket mısır + boilies + pellet',
      'Doldurup hedefe fırlat — ağır rod ve makara gerekli',
      'Aynı noktaya sürekli at — yem miktarını artır',
      'Fırlatmadan önce yemi hafif ıslatarak ağırlaştır',
      'Gece öncesi yoğun yemleme — sabah av',
    ],
    tip: 'Spod roket kırmızı veya turuncu renk sazan gözüne çarpar.',
  },
  {
    id: 'baitboat', name: 'Yem Teknesi (Bait Boat)', icon: '🚤', accent: '#06b6d4',
    desc: 'RC tekneyle uzak noktaya hassas yem bırakma',
    range: '200m+',
    steps: [
      'Bait boat: uzaktan kumandalı küçük tekne',
      'Yemi kaba doldur: boilies, pellet, partikül',
      'Hedef noktasına git — sonar ile derinlik bak',
      'Yemi bırak, hooku da aynı noktaya at',
      'Sessiz yaklaşım: büyük sazan korkutmaz',
      'Gece de kullanılabilir — LED ile navigasyon',
    ],
    tip: 'Bait boat yarış değil, hassas sunumdur — yavaş git.',
  },
  {
    id: 'pva', name: 'PVA Torba Sistemi', icon: '🛍️', accent: '#22c55e',
    desc: 'Suda eriyen poşetle yemi kanca yakınına bırakma',
    range: '0m (kanca yanı)',
    steps: [
      'PVA torba: suda eriyen polivinil alkol torbası',
      'Yemi (pellet, kurulanmış) torbaya doldur',
      'Kancayı da torbanın içine sok',
      'Fırlatınca PVA suya değince erimeye başlar',
      '2-4 dakikada tamamen erir — kanca etrafında yem',
      'PVA ıslak yemle temas etmez — sadece kuru veya yağlı',
    ],
    tip: 'PVA mesh tüp ile hızlı doldurma — çubukla sıkıştır.',
  },
  {
    id: 'feeder', name: 'Method Feeder', icon: '🎣', accent: '#a78bfa',
    desc: 'Yem kafesi etrafına yem sıkıştırma',
    range: '40-80m',
    steps: [
      'Method feeder: plastik kafes, yem sıkıştırılır',
      'Yem: ince pellet ıslatıp yoğur, feeder etrafına bas',
      'Kanka kısa misina ile feedere bağlı',
      'Fırlat, bekle — yem suya değince dağılır',
      'Balık yem topuna saldırırken kancaya değer',
      'Küçük olta hareketi: yem toplandıkça sürtünme gider',
    ],
    tip: 'Method feeder sazan ve kadife balığı için vazgeçilmez.',
  },
];

export default function FishAttractor() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060e0c', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🚀 Balık Çekici Sistemleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Spod · bait boat · PVA torba · method feeder</div>
      </div>

      <div style={{ background: '#081610', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>🎯 YEMLEME STRATEJİSİ</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Az-sık yemleme uzun olta için ideal. Büyük balık için gece öncesi yoğun bait — sabah kısa olta.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SYSTEMS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#081610', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.desc}</div>
                  </div>
                  <div style={{ fontSize: 10, color: s.accent, fontWeight: 700 }}>{s.range}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#081610', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 KULLANIM</div>
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
