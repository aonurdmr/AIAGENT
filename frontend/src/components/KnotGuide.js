import React, { useState } from 'react';

const DIFFICULTY = {
  'Kolay': { color: '#22c55e', stars: 1 },
  'Orta':  { color: '#f59e0b', stars: 2 },
  'Zor':   { color: '#ef4444', stars: 3 },
};

const KNOTS = [
  {
    id: 'improved-clinch',
    name: 'Improved Clinch',
    tr: 'Geliştirilmiş Klinç',
    icon: '🪢',
    difficulty: 'Kolay',
    strength: 95,
    use: 'Yem iğnesi, küçük yemler',
    tags: ['iğne', 'yem', 'genel'],
    desc: 'En çok kullanılan balıkçılık düğümü. Hemen her durumda güvenilir bağlantı sağlar.',
    steps: [
      'Misina ucunu iğne gözünden geçirin (~15 cm)',
      'Uzun kısmı 5-7 kez ana misina etrafında sarın',
      'Misina ucunu iğne gözü üzerindeki ilk ilmekten geçirin',
      'Oluşan döngüye misina ucunu geri geçirin',
      'Nemlendir ve yavaşça çekin, fazlayı kesin',
    ],
    visual: '═══╗\n     ║\n═══╣ × 5\n     ║\n═══╝',
  },
  {
    id: 'palomar',
    name: 'Palomar Knot',
    tr: 'Palomar Düğümü',
    icon: '🔗',
    difficulty: 'Kolay',
    strength: 98,
    use: 'Tüm yem türleri, jig, wobbler',
    tags: ['jig','wobbler','evrensel'],
    desc: 'Test edilen en güçlü balıkçılık düğümlerinden biri. Çift misina ile güç artırır.',
    steps: [
      '15 cm misina kat edin (çift tabakalı)',
      'Çift misina ucunu iğne/kancaya gözden geçirin',
      'Çift misinayı kendi üzerinde düğümleyin (basit ilmek)',
      'Döngüyü yem/kanca üzerinden geçirin',
      'Her iki tarafı nemlendir, sıkıştırın',
    ],
    visual: '══╦══\n   ║\n  ╔╩╗\n  ╚═╝',
  },
  {
    id: 'uni',
    name: 'Uni Knot',
    tr: 'Uni Düğümü',
    icon: '🌀',
    difficulty: 'Kolay',
    strength: 90,
    use: 'İğne, wobbler, örgülü misina',
    tags: ['evrensel','örgülü','iğne'],
    desc: 'Hem mono hem örgülü misinada mükemmel çalışır. Ayarlanabilir özelliği vardır.',
    steps: [
      'Misina ucunu gözden geçirin, 20 cm bırakın',
      'Kıvrılan ucu ana misinaya paralel tutun',
      'Çift misina etrafında döngü yapın',
      'Bu döngüden 4-6 kez sarın',
      'Islat ve yavaşça çekerek sıkıştırın',
    ],
    visual: '══════╗\n       ║\n  ╔════╣ × 5\n  ╚════╝',
  },
  {
    id: 'blood',
    name: 'Blood Knot',
    tr: 'Kan Düğümü',
    icon: '❌',
    difficulty: 'Orta',
    strength: 85,
    use: 'İki misina birleştirme, lider bağlama',
    tags: ['birleştirme','lider','misina'],
    desc: 'Benzer çaplı iki misinayı birleştirmek için kullanılır. Kıl misinanın vazgeçilmez düğümü.',
    steps: [
      'İki misina ucunu ~20 cm üst üste koyun',
      'Sol misina ucunu sağ misina etrafında 5 kez sarın',
      'Ucu orta kesiştirme noktasından geri geçirin',
      'Sağ misina ucunu sol misina etrafında 5 kez sarın',
      'Ucu orta kesiştirme noktasından geçirin (zıt yönde)',
      'Her iki uçtan çekerek sıkıştırın',
    ],
    visual: '←←←╗  ╔→→→\n     ╠══╣\n←←←╝  ╚→→→',
  },
  {
    id: 'fg',
    name: 'FG Knot',
    tr: 'FG Düğümü',
    icon: '⚡',
    difficulty: 'Zor',
    strength: 99,
    use: 'Örgülü misina → lider bağlama',
    tags: ['örgülü','lider','güçlü'],
    desc: 'Örgülü misina ile fluoro/mono lider birleştirmenin en ince ve güçlü yöntemi.',
    steps: [
      'Lideri gergin tutun (dişle veya ayak altında)',
      'Örgülü misinayı çapraz örüntüde 20+ kez sarın',
      'Örgülü misina ile yarım hitç yapın (2 kez)',
      'Liderin üzerinde 10 kez sarın',
      'Son kilitme düğümü için 5 kez örgülü üzerine sarın',
      'Islat ve tüm kısımları yavaşça çekin',
    ],
    visual: '▓▓▓▓▓▓▓\n◄──────►\n▓▓▓▓▓▓▓',
  },
  {
    id: 'surgeon',
    name: "Surgeon's Knot",
    tr: 'Cerrah Düğümü',
    icon: '➕',
    difficulty: 'Kolay',
    strength: 80,
    use: 'Hızlı lider bağlama, farklı çaplar',
    tags: ['lider','hızlı','farklı-çap'],
    desc: 'En hızlı lider birleştirme yöntemi. Farklı çaplardaki misinaları kolayca birleştirir.',
    steps: [
      'Misina uçlarını 15 cm üst üste getirin',
      'Her iki misinayı birlikte döngü yapın',
      'Bu döngüden her iki ucu 2 kez geçirin',
      'Her iki taraftan kuvvetlice çekin',
      'Fazla uçları kesin',
    ],
    visual: '══╗\n   ╠══\n══╝  × 2',
  },
  {
    id: 'alberto',
    name: 'Alberto Knot',
    tr: 'Alberto Düğümü',
    icon: '🔄',
    difficulty: 'Orta',
    strength: 96,
    use: 'İnce örgülü → kalın lider',
    tags: ['örgülü','lider','pike','sudak'],
    desc: 'İnce örgülü misinanın kalın lider veya şeffaf misina ile bağlanmasında ideal.',
    steps: [
      'Lider sonunu kıvırarak döngü oluşturun',
      'Örgülü misinayı bu döngüden geçirin',
      'Örgülü ile liderin çift tabakalı kısmında 7 kez sarın (önce yukarı)',
      '7 kez aşağı sarın (çapraz örgü yapısı)',
      'Örgülüyü döngüden çıkartarak geri çekin',
      'Islat ve sıkıştırın',
    ],
    visual: '░░░░░░░\n◄░░░░░►\n░░░░░░░',
  },
  {
    id: 'loop',
    name: 'Loop to Loop',
    tr: 'İlmek İlmek',
    icon: '∞',
    difficulty: 'Kolay',
    strength: 88,
    use: 'Hızlı lider değişimi, çıkarılabilir bağlantı',
    tags: ['hızlı-değişim','lider','pratik'],
    desc: 'Döngü uçlu sistemler için en pratik bağlantı. Sahada hızla lider değişimi sağlar.',
    steps: [
      'Her iki misinada döngü oluşturun (perfection loop ile)',
      'Bir döngüyü diğerinin içinden geçirin',
      'Üstteki döngünün içinden diğer misinayı geçirin',
      'Karşılıklı çekerek kilitlenin',
    ],
    visual: '◎══════◎',
  },
  {
    id: 'perfection',
    name: 'Perfection Loop',
    tr: 'Mükemmel İlmek',
    icon: '⭕',
    difficulty: 'Orta',
    strength: 92,
    use: 'Misina ucuna döngü oluşturma',
    tags: ['döngü','lider','fly-fishing'],
    desc: 'Misina ucuna güçlü ve düzgün bir döngü oluşturur. Loop-to-loop sistemler için temel.',
    steps: [
      'Misina ucunu iki kez katlayın (U şekli)',
      'İlk döngüyü arkaya alın',
      'İkinci döngüyü birinci ve misinanın önüne koyun',
      'İlk döngüyü ikincinin üzerinden geçirin',
      'Yavaşça çekerek döngüyü sıkıştırın',
    ],
    visual: '══◎══\n   ║\n═══╝',
  },
];

const ALL_TAGS = ['tüm', 'iğne', 'jig', 'wobbler', 'lider', 'örgülü', 'birleştirme', 'evrensel', 'hızlı'];

function KnotCard({ knot }) {
  const [expanded, setExpanded] = useState(false);
  const diff = DIFFICULTY[knot.difficulty];
  return (
    <div style={{
      background: 'var(--s2)', border: '1px solid var(--border)',
      borderRadius: 16, marginBottom: 8, overflow: 'hidden',
    }}>
      {/* Header */}
      <button onClick={() => setExpanded(!expanded)} style={{
        width: '100%', padding: '14px', textAlign: 'left', cursor: 'pointer',
        background: 'transparent', border: 'none', color: 'inherit',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: diff.color + '15', border: `1px solid ${diff.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        }}>{knot.icon}</div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>{knot.tr}</div>
          <div style={{ fontSize: 11, color: 'var(--t-mute)' }}>{knot.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <span style={{
              fontSize: 10, fontWeight: 700, color: diff.color,
              background: diff.color + '15', borderRadius: 6, padding: '2px 7px',
            }}>{knot.difficulty}</span>
            <span style={{ fontSize: 10, color: '#fbbf24' }}>
              {'★'.repeat(diff.stars)}{'☆'.repeat(3-diff.stars)}
            </span>
            <span style={{ fontSize: 10, color: '#22c55e' }}>💪 {knot.strength}%</span>
          </div>
        </div>
        <span style={{ fontSize: 14, color: 'var(--t-mute)', transition: 'transform .2s', transform: expanded ? 'rotate(180deg)' : 'none', flexShrink:0 }}>▾</span>
      </button>

      {/* Expanded */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '14px' }}>
          {/* Use case */}
          <div style={{
            fontSize: 11, color: '#3b82f6', background: '#3b82f610',
            borderRadius: 8, padding: '6px 10px', marginBottom: 12, fontWeight: 600,
          }}>🎣 Kullanım: {knot.use}</div>

          {/* Description */}
          <div style={{ fontSize: 12, color: 'var(--t-mid)', marginBottom: 12, lineHeight: 1.6 }}>
            {knot.desc}
          </div>

          {/* Visual */}
          <div style={{
            background: 'var(--s3)', borderRadius: 10, padding: '10px 14px', marginBottom: 12,
            fontFamily: 'monospace', fontSize: 12, color: '#94a3b8', lineHeight: 1.8, whiteSpace: 'pre',
          }}>{knot.visual}</div>

          {/* Steps */}
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 8 }}>
            ADIMLAR
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {knot.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  background: diff.color + '20', border: `1px solid ${diff.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 800, color: diff.color,
                }}>{i+1}</div>
                <div style={{ fontSize: 12, color: 'var(--t-mid)', lineHeight: 1.5, paddingTop: 2 }}>{step}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 4, marginTop: 12, flexWrap: 'wrap' }}>
            {knot.tags.map(t => (
              <span key={t} style={{
                fontSize: 10, color: 'var(--t-mute)', background: 'var(--s3)',
                borderRadius: 6, padding: '2px 7px', border: '1px solid var(--border)',
              }}>#{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function KnotGuide() {
  const [filter, setFilter]   = useState('tüm');
  const [diffF,  setDiffF]   = useState('');
  const [search, setSearch]   = useState('');

  const filtered = KNOTS.filter(k => {
    if (filter !== 'tüm' && !k.tags.includes(filter)) return false;
    if (diffF && k.difficulty !== diffF) return false;
    if (search && !k.tr.toLowerCase().includes(search.toLowerCase()) && !k.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #1a0800 0%, #2a1200 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🪢 Düğüm Rehberi</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>{KNOTS.length} temel balıkçı düğümü</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Search */}
        <input
          className="input-field"
          placeholder="Düğüm ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        {/* Difficulty filter */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {['', 'Kolay', 'Orta', 'Zor'].map(d => (
            <button key={d} onClick={() => setDiffF(d)} style={{
              flex: 1, padding: '6px 4px', borderRadius: 10, cursor: 'pointer',
              background: diffF === d ? 'var(--a-glow)' : 'var(--s2)',
              border: diffF === d ? '1px solid var(--border-lg)' : '1px solid var(--border)',
              color: diffF === d ? 'var(--a-light)' : (d ? DIFFICULTY[d]?.color : 'var(--t-mute)'),
              fontSize: 11, fontWeight: 600,
            }}>{d || 'Tümü'}</button>
          ))}
        </div>

        {/* Tag filter */}
        <div style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 2, marginBottom: 14 }}>
          {ALL_TAGS.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              flexShrink: 0, padding: '5px 10px', borderRadius: 16, cursor: 'pointer',
              background: filter === t ? 'var(--a-glow)' : 'var(--s2)',
              border: filter === t ? '1px solid var(--border-lg)' : '1px solid var(--border)',
              color: filter === t ? 'var(--a-light)' : 'var(--t-mute)',
              fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
            }}>#{t}</button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 10 }}>
          {filtered.length} düğüm gösteriliyor
        </div>

        {/* Knot cards */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--t-mute)' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🪢</div>
            <div>Düğüm bulunamadı</div>
          </div>
        ) : (
          filtered.map(k => <KnotCard key={k.id} knot={k} />)
        )}

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
