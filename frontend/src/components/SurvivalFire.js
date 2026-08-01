import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  {
    id: 'friction', name: 'Sürtünme ile Ateş', icon: '🪵', accent: '#f97316',
    difficulty: 'Zor — alıştırma gerektirir',
    materials: ['Kuru (nem %0) yumuşak odun: kavak, söğüt, ıhlamur', 'Sert odun matkap: meşe, ceviz', 'Ot yuvası: çimen, eğrelti otu, huş kabuğu'],
    steps: [
      'Tahtaya 2 cm delik aç — altına dışkı toplama çentiği',
      'Matkapı iki avuç arası çevir — düzenli ve hızlı',
      'Duman görününce baskıyı artır — 30 sn daha',
      'Siyah köz yuvaya düş — nefes ver, üf üf üf',
      'Koz ot yuvasına al — sarıp üfle — alev',
    ],
    tip: 'Odun kesinlikle kuru olmalı — nemli odunla sürtünme ısınma olmaz.',
  },
  {
    id: 'spark', name: 'Kıvılcım ile Ateş', icon: '⚡', accent: '#f59e0b',
    difficulty: 'Orta — çakmak taşı gerektirir',
    materials: ['Çakmak taşı (flint, kuvarsit) veya ferrocereum çubuk', 'Ateş çeliği (striker)', 'Kuru ot, kavak kabuğu, huş tozu'],
    steps: [
      'Çakmak taşını keskin kenarlı tut',
      'Çeliği taşa hızla sürt — aşağıdan yukarıya',
      'Kıvılcım ot yuvasına düş — üf',
      'Ferrocereum çubuk: çelik bıçakla kopararak kullan',
      'Koz yuvaya düş — tepeden üf, sarıp taşı',
    ],
    tip: 'Ferrocereum çubuk en güvenilir — ıslak ormanda bile çalışır.',
  },
  {
    id: 'lens', name: 'Mercek ile Ateş', icon: '🔍', accent: '#22c55e',
    difficulty: 'Kolay — güneş gerektirir',
    materials: ['Büyüteç, gözlük camı, şeffaf su torbası', 'Kuru siyah malzeme (kömür, kurumuş karpuz kabuğu)', 'Kuru ot'],
    steps: [
      'Mercekle güneş ışığını odakla',
      'Siyah materyal üzerine yoğunlaştır — koyu renk ısıyı emer',
      'Duman görününce sabitle ve bekle',
      'Koz görününce ot yuvasına taşı',
      'Yavaşça üfle',
    ],
    tip: 'Buz bile mercek gibi çalışır — küre yapıp güneşle ateş yakmak mümkün.',
  },
  {
    id: 'battery', name: 'Pil & Tel ile Ateş', icon: '🔋', accent: '#3b82f6',
    difficulty: 'Kolay — pil ve tel gerektirir',
    materials: ['9V veya AA pil', 'Çelik yün (saç maşası kafası veya çelik sünger)', 'Kuru ot'],
    steps: [
      'Çelik yünü pil pozitif-negatif uçlarına dayan',
      'Anında kızarır ve tutuşur',
      'AA pil: 2 AA uç uca koy + alüminyum şerit arasına koy',
      'Kızaran yünü ot yuvasına hızla taşı',
      'Üf ve alev al',
    ],
    tip: '9V pil en hızlı çalışır — her zacil çantasında bulunmalı.',
  },
];

const FIRE_TYPES = [
  { name: 'Log Cabin', desc: 'Kütükler kare düzeni — uzun yanma, ısı odaklı', use: 'Kamp ısınma, büyük ateş' },
  { name: 'Teepee', desc: 'Çadır şekli — yukarı alevle hızlı tutuşma', use: 'Hızlı ateş başlatma, pişirme' },
  { name: 'Star Fire', desc: 'Yıldız şekli — kontrollü, az odun', use: 'Uzun gece, az yakıt durumunda' },
  { name: 'Trench Fire', desc: 'Çukurda ateş — rüzgar korumalı, az ışıklı', use: 'Rüzgarlı hava, gizli kamp' },
];

export default function SurvivalFire() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('methods');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0f0504', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔥 Ateş Yakma Teknikleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Sürtünme · kıvılcım · mercek · pil — hayatta kalma</div>
      </div>

      <div style={{ background: '#1a0a06', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f9731633' }}>
        <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700 }}>🏕️ KAMP ATEŞİ KURALI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Orman yangını riski yüksekken ateş yakma. Her zaman 3m çaplı alanı temizle, yanında su tut, söndürmeden uyuma.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['methods','Yakma Yöntemleri'],['types','Ateş Tipleri']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#160a06', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'methods' && METHODS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#160a06', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{m.difficulty}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#160a06', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: m.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>🌿 MALZEME</div>
                  {m.materials.map((mat, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {mat}</div>)}
                  <div style={{ fontSize: 11, color: m.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {m.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ background: m.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {m.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'types' && (
          <div style={{ background: '#160a06', borderRadius: 14, padding: 14, border: '1px solid #f9731622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>🏕️ Ateş Dizayn Tipleri</div>
            {FIRE_TYPES.map((f, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < FIRE_TYPES.length-1 ? '1px solid #1e1008' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fdba74', marginBottom: 4 }}>{f.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}>{f.desc}</div>
                <div style={{ fontSize: 11, color: '#f97316' }}>✅ {f.use}</div>
              </div>
            ))}
            <div style={{ background: '#f9731615', borderRadius: 8, padding: '10px 12px', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 Ateşi söndürmek için: önce su dök, karıştır, tekrar su, soğuk ve ıslak olana dek — buhar görülmediğinde güvenli.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
