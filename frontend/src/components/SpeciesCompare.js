import React, { useState } from 'react';

const SPECIES = [
  {
    id: 'levrek',
    name: 'Levrek',
    en: 'Sea Bass',
    icon: '🐟',
    color: '#38bdf8',
    water: 'Tuzlu Su',
    maxLen: 100,
    maxWeight: 12,
    avgLen: 45,
    avgWeight: 1.2,
    difficulty: 4,
    taste: 5,
    abundance: 3,
    seasonal: [3,3,4,4,5,5,5,5,4,3,2,2],
    depth: '0-30m',
    habitat: 'Kayalık kıyılar, mendireke',
    diet: 'Küçük balıklar, karides',
    record: '12 kg (Türkiye)',
    methods: ['Spinning', 'Trawling', 'Jigging'],
    desc: 'Akdeniz ve Ege\'nin en gözde balığı. Beyaz ve lezzetli etiyle sofraların vazgeçilmezi.',
    minSize: 25,
    season: 'Nisan-Eylül',
  },
  {
    id: 'sazan',
    name: 'Sazan',
    en: 'Carp',
    icon: '🐠',
    color: '#f59e0b',
    water: 'Tatlı Su',
    maxLen: 120,
    maxWeight: 40,
    avgLen: 55,
    avgWeight: 2.5,
    difficulty: 3,
    taste: 3,
    abundance: 5,
    seasonal: [2,2,3,4,5,5,5,4,4,3,2,2],
    depth: '0-15m',
    habitat: 'Göl, baraj, ağır akan nehir',
    diet: 'Mısır, solucan, böcekler',
    record: '40 kg (Avrupa)',
    methods: ['Bottom Fishing', 'Boilies', 'Method Feeder'],
    desc: 'Türkiye\'nin tatlı sularında en yaygın balık. Büyük boyları karp avcılığı için ideal.',
    minSize: 25,
    season: 'Mayıs-Kasım',
  },
  {
    id: 'alabalik',
    name: 'Alabalık',
    en: 'Trout',
    icon: '🐡',
    color: '#22c55e',
    water: 'Tatlı Su',
    maxLen: 90,
    maxWeight: 10,
    avgLen: 35,
    avgWeight: 0.5,
    difficulty: 4,
    taste: 5,
    abundance: 3,
    seasonal: [3,3,4,5,5,4,3,3,4,4,3,3],
    depth: '0-5m',
    habitat: 'Soğuk dağ dereleri, göller',
    diet: 'Böcekler, küçük balıklar, larvalar',
    record: '10 kg (Türkiye)',
    methods: ['Fly Fishing', 'Spinner', 'Worm'],
    desc: 'Serin ve temiz suların balığı. Et kalitesi ve avlanma heyecanıyla popüler spor balığı.',
    minSize: 22,
    season: 'Tüm yıl (nehirde Mart-Eylül)',
  },
  {
    id: 'turna',
    name: 'Turna',
    en: 'Pike',
    icon: '🦈',
    color: '#84cc16',
    water: 'Tatlı Su',
    maxLen: 150,
    maxWeight: 25,
    avgLen: 65,
    avgWeight: 3,
    difficulty: 5,
    taste: 3,
    abundance: 2,
    seasonal: [4,4,3,3,4,4,5,5,4,4,4,4],
    depth: '0-8m',
    habitat: 'Kamışlık, bitkili koylar',
    diet: 'Balıklar, su kuşları, fare',
    record: '25 kg (Dünya)',
    methods: ['Big Bait', 'Topwater', 'Wobbler'],
    desc: 'Tatlı suyun en agresif avcısı. Güçlü saldırıları spor balıkçılığında çok aranan deneyim.',
    minSize: 40,
    season: 'Tüm yıl',
  },
  {
    id: 'sudak',
    name: 'Sudak',
    en: 'Zander',
    icon: '🐟',
    color: '#c084fc',
    water: 'Tatlı Su',
    maxLen: 100,
    maxWeight: 15,
    avgLen: 50,
    avgWeight: 1.8,
    difficulty: 4,
    taste: 5,
    abundance: 3,
    seasonal: [3,3,3,4,5,5,5,4,4,4,3,3],
    depth: '3-15m',
    habitat: 'Büyük göller, nehirler',
    diet: 'Küçük balıklar, jig',
    record: '15 kg (Türkiye)',
    methods: ['Jig', 'Twister', 'Drop Shot'],
    desc: 'Lezzetli beyaz eti ve aktif avlanma stiliyle spor balıkçılarının favorisi.',
    minSize: 35,
    season: 'Tüm yıl',
  },
  {
    id: 'cipura',
    name: 'Çipura',
    en: 'Sea Bream',
    icon: '🐡',
    color: '#f97316',
    water: 'Tuzlu Su',
    maxLen: 70,
    maxWeight: 6,
    avgLen: 30,
    avgWeight: 0.6,
    difficulty: 3,
    taste: 5,
    abundance: 4,
    seasonal: [3,3,3,4,5,5,5,5,4,3,2,2],
    depth: '0-50m',
    habitat: 'Kıyı kayalıkları, deniz çayırları',
    diet: 'Karides, midye, yengeç',
    record: '6 kg (Türkiye)',
    methods: ['Bottom', 'Feeder', 'Live Bait'],
    desc: 'Akdeniz\'in en değerli balığı. Et kalitesi ve yoğun dağılımıyla en çok avlanan türlerden.',
    minSize: 20,
    season: 'Mayıs-Ekim',
  },
  {
    id: 'karagoz',
    name: 'Karagöz',
    en: 'Black Bream',
    icon: '🐠',
    color: '#94a3b8',
    water: 'Tuzlu Su',
    maxLen: 60,
    maxWeight: 3,
    avgLen: 25,
    avgWeight: 0.4,
    difficulty: 2,
    taste: 4,
    abundance: 5,
    seasonal: [2,2,3,4,5,5,5,5,4,3,2,2],
    depth: '0-30m',
    habitat: 'Kıyı, mendireke, iskele',
    diet: 'Karides, midye, kurtçuk',
    record: '3 kg (Türkiye)',
    methods: ['Bottom', 'Float', 'Lure'],
    desc: 'Kıyı balıkçılığında en sık rastlanan tür. Başlangıç için ideal, her ortamda bulunur.',
    minSize: 18,
    season: 'Tüm yıl',
  },
  {
    id: 'yayın',
    name: 'Yayın',
    en: 'Catfish',
    icon: '🦈',
    color: '#ec4899',
    water: 'Tatlı Su',
    maxLen: 300,
    maxWeight: 130,
    avgLen: 80,
    avgWeight: 6,
    difficulty: 5,
    taste: 3,
    abundance: 2,
    seasonal: [2,2,3,4,5,5,5,5,4,3,2,2],
    depth: '2-20m',
    habitat: 'Dip, derin barajlar, göl içleri',
    diet: 'Büyük balık, ördek, solucan',
    record: '130 kg (Dünya)',
    methods: ['Dead Bait', 'Live Bait', 'Trolling'],
    desc: 'Türkiye tatlı sularının en büyük balığı. Rekor boyları spor avcılığında efsane.',
    minSize: 50,
    season: 'Mayıs-Eylül',
  },
];

const TR_MONTHS = ['Oc','Şb','Mr','Ni','My','Hzr','Tem','Ağs','Eyl','Ek','Ks','Ar'];

function StatBar({ label, val, max = 5, color }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 10, color: 'var(--t-mute)' }}>{label}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color }}>{val}/{max}</span>
      </div>
      <div style={{ height: 4, background: 'var(--s3)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${(val/max)*100}%`, height: '100%', background: color, borderRadius: 2 }} />
      </div>
    </div>
  );
}

function MonthChart({ seasonal, color }) {
  const max = Math.max(...seasonal);
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 40 }}>
      {seasonal.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{
            width: '100%', height: `${(v/max)*32}px`,
            background: color, borderRadius: '2px 2px 0 0', minHeight: 2,
            opacity: 0.4 + (v/max)*0.6,
          }} />
          <div style={{ fontSize: 7, color: 'var(--t-mute)', lineHeight: 1 }}>{TR_MONTHS[i]}</div>
        </div>
      ))}
    </div>
  );
}

function SpeciesPanel({ sp, side }) {
  if (!sp) return (
    <div style={{
      flex: 1, border: '2px dashed var(--border)', borderRadius: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: 200, color: 'var(--t-mute)', fontSize: 12, textAlign: 'center', padding: 12,
    }}>
      <div>
        <div style={{ fontSize: 32, marginBottom: 8 }}>+</div>
        {side === 'left' ? 'Birinci türü seç' : 'İkinci türü seç'}
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1 }}>
      <div style={{
        background: sp.color + '10', border: `1px solid ${sp.color}40`,
        borderRadius: 16, padding: 14,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 40 }}>{sp.icon}</div>
          <div style={{ fontWeight: 800, fontSize: 16, color: sp.color }}>{sp.name}</div>
          <div style={{ fontSize: 11, color: 'var(--t-mute)' }}>{sp.en}</div>
          <div style={{ fontSize: 10, marginTop: 4, color: sp.water === 'Tuzlu Su' ? '#38bdf8' : '#22c55e' }}>
            {sp.water === 'Tuzlu Su' ? '🌊' : '💧'} {sp.water}
          </div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <StatBar label="Avlanma Zorluğu" val={sp.difficulty} max={5} color={sp.color} />
          <StatBar label="Et Lezzeti" val={sp.taste} max={5} color='#fbbf24' />
          <StatBar label="Bolluk" val={sp.abundance} max={5} color='#22c55e' />
        </div>

        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, color: 'var(--t-mute)', marginBottom: 4, fontWeight: 600 }}>SEZON AKTİVİTESİ</div>
          <MonthChart seasonal={sp.seasonal} color={sp.color} />
        </div>

        {[
          ['📏', 'Maks. Boy', `${sp.maxLen} cm`],
          ['⚖️', 'Maks. Kilo', `${sp.maxWeight} kg`],
          ['🌊', 'Yaşam Alanı', sp.habitat],
          ['📐', 'Min. Avlanma', `${sp.minSize} cm`],
          ['🍽️', 'Besin', sp.diet],
          ['🎣', 'Yöntemler', sp.methods.join(', ')],
          ['🏆', 'Rekor', sp.record],
        ].map(([ic, lab, val]) => (
          <div key={lab} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            padding: '5px 0', borderBottom: '1px solid var(--border)', gap: 4,
          }}>
            <span style={{ fontSize: 10, color: 'var(--t-mute)', whiteSpace: 'nowrap' }}>{ic} {lab}</span>
            <span style={{ fontSize: 10, color: '#fff', textAlign: 'right', fontWeight: 600 }}>{val}</span>
          </div>
        ))}

        <div style={{ fontSize: 11, color: 'var(--t-mid)', marginTop: 10, lineHeight: 1.5 }}>
          {sp.desc}
        </div>
      </div>
    </div>
  );
}

export default function SpeciesCompare() {
  const [left,  setLeft]  = useState(null);
  const [right, setRight] = useState(null);
  const [picking, setPicking] = useState(null);

  const handleSelect = (sp) => {
    if (picking === 'left')  setLeft(sp);
    if (picking === 'right') setRight(sp);
    setPicking(null);
  };

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #000d1a 0%, #001525 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>⚔️ Tür Karşılaştırma</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>İki balık türünü yan yana karşılaştır</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Picker buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <button onClick={() => setPicking('left')} style={{
            flex: 1, padding: '10px 8px', borderRadius: 12, cursor: 'pointer',
            background: left ? left.color+'20' : 'var(--s2)',
            border: `1px solid ${left ? left.color+'60' : 'var(--border)'}`,
            color: left ? left.color : 'var(--t-mute)',
            fontSize: 12, fontWeight: 700,
          }}>
            {left ? `${left.icon} ${left.name}` : '+ Sol Tür Seç'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 18, color: 'var(--t-mute)' }}>⚔️</div>
          <button onClick={() => setPicking('right')} style={{
            flex: 1, padding: '10px 8px', borderRadius: 12, cursor: 'pointer',
            background: right ? right.color+'20' : 'var(--s2)',
            border: `1px solid ${right ? right.color+'60' : 'var(--border)'}`,
            color: right ? right.color : 'var(--t-mute)',
            fontSize: 12, fontWeight: 700,
          }}>
            {right ? `${right.icon} ${right.name}` : '+ Sağ Tür Seç'}
          </button>
        </div>

        {/* Species picker modal */}
        {picking && (
          <div style={{
            background: 'var(--s2)', border: '1px solid var(--border)',
            borderRadius: 16, padding: 14, marginBottom: 14,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', marginBottom: 10, letterSpacing: '.08em' }}>
              TÜR SEÇ
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6 }}>
              {SPECIES.map(sp => (
                <button key={sp.id} onClick={() => handleSelect(sp)} style={{
                  padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
                  background: 'var(--s3)', border: `1px solid ${sp.color}40`,
                  color: sp.color, fontSize: 12, fontWeight: 600, textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span>{sp.icon}</span>
                  <div>
                    <div>{sp.name}</div>
                    <div style={{ fontSize: 9, color: 'var(--t-mute)', fontWeight: 400 }}>{sp.water}</div>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setPicking(null)} style={{
              width: '100%', marginTop: 10, padding: '8px', borderRadius: 10, cursor: 'pointer',
              background: 'transparent', border: '1px solid var(--border)', color: 'var(--t-mute)', fontSize: 12,
            }}>İptal</button>
          </div>
        )}

        {/* Comparison panels */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <SpeciesPanel sp={left} side="left" />
          <SpeciesPanel sp={right} side="right" />
        </div>

        {/* Winner summary */}
        {left && right && (
          <div className="fade-in" style={{
            background: 'var(--s2)', border: '1px solid var(--border)',
            borderRadius: 16, padding: 14, marginTop: 14,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
              📊 KARŞILAŞTIRMA ÖZETİ
            </div>
            {[
              ['Avlanma Zorluğu', left.difficulty, right.difficulty, 'zor', false],
              ['Et Lezzeti', left.taste, right.taste, 'lezzetli', true],
              ['Bolluk', left.abundance, right.abundance, 'bol', true],
              ['Maks. Boy (cm)', left.maxLen, right.maxLen, 'büyük', true],
              ['Maks. Kilo (kg)', left.maxWeight, right.maxWeight, 'ağır', true],
            ].map(([label, lv, rv, suffix, higherWins]) => {
              const lWins = higherWins ? lv > rv : lv < rv;
              const rWins = higherWins ? rv > lv : rv < lv;
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ flex: 1, textAlign: 'right', fontSize: 11, fontWeight: 700, color: lWins ? left.color : 'var(--t-mute)' }}>{lv}</span>
                  <span style={{ fontSize: 10, color: 'var(--t-mute)', textAlign: 'center', minWidth: 80 }}>{label}</span>
                  <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: rWins ? right.color : 'var(--t-mute)' }}>{rv}</span>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
