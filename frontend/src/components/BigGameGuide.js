import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ANIMALS = [
  {
    id: 'deer', name: 'Kızıl Geyik', icon: '🦌', accent: '#f59e0b',
    latin: 'Cervus elaphus', weight: '150-250 kg · boynuz 80-100 cm',
    habitat: 'Meşe-kayın ormanı, ormanlık yayla kenarları',
    season: 'Eylül-Kasım (bağırma dönemi) · Ocak-Şubat (ruhsatlı)',
    behavior: 'Alacakaranlık hayvanı — sabah-akşam saatlerinde aktif',
    approach: [
      'Rüzgar önünde ilerle — koku tespiti öncelik',
      'Bağırma döneminde erkek geyik ses kaynağına gelir',
      'İz takibi: büyük çift yarık, boynuz sürtme işareti',
      'Su kaynağı yakını — sabah içmeye gelir (07-09)',
      'Hasat sonrası tarlalar — mısır artığı için besleme alanı',
    ],
    shot: 'Omuz arkası · kürek kemiği → kalp-akciğer bölgesi · 50-150m',
    legal: 'Ruhsat zorunlu · kota ile · boynuz boyutu minimumu var',
  },
  {
    id: 'roe', name: 'Karaca', icon: '🦝', accent: '#92400e',
    latin: 'Capreolus capreolus', weight: '15-30 kg · küçük boynuz 20-30 cm',
    habitat: 'Orman kenarı, çalılık, tarım alanı sınırı',
    season: 'Temmuz-Ağustos (kızışma) · kış sezon ruhsat ile',
    behavior: 'Gündüz aktif — en kolay gözlemlenen büyük av türü',
    approach: [
      'Karacanın sesi: havlama — alarm işareti',
      'Sürüden ayrı erkek = kızışma döneminde hedef',
      'Orman kenarında çayır kenarında sabah besler',
      'Dikkatli ses — karaca kulağı çok iyi',
      'Yukarıdan bak — orman sınırını tara',
    ],
    shot: 'Boyun veya omuz arkası · hafif güç gerektirir · 30-80m ideal',
    legal: 'Ruhsat zorunlu · kota sınırlı',
  },
  {
    id: 'ibex', name: 'Dağ Keçisi', icon: '🐐', accent: '#a78bfa',
    latin: 'Capra aegagrus', weight: '25-90 kg · eğimli boynuz erkekte',
    habitat: 'Kayalık dağ zirvesi · 1500-3000m rakım',
    season: 'Aralık-Ocak (çiftleşme) · yaz boynuz dönemi',
    behavior: 'Kayalıkta uçuşan — iniş yolları öngörülebilir',
    approach: [
      'Gündüz yüksekte, sabah-akşam alçağa iner',
      'Tuzlu toprak ve mineral kaynakları — sabah kümesi',
      'Kayalıktan yukarı çıkarak aşağıya bak',
      'Dürbün zorunlu — uzak mesafe, açık arazi',
      'Ses kaynağı yakında — ayak sesi kayalıkta uzak taşır',
    ],
    shot: 'Uzun menzil 100-200m · yivli tüfek zorunlu · omuz arkası',
    legal: 'Özel ruhsat · çok sınırlı kota · CITES denetiminde',
  },
  {
    id: 'boar', name: 'Yaban Domuzu', icon: '🐗', accent: '#ef4444',
    latin: 'Sus scrofa', weight: '50-200 kg · diş uzunluğu 5-20 cm',
    habitat: 'Meşelik, kayalık vadi, bataklık kenarı, tarım alanı',
    season: 'Yıl boyu — ruhsatsız · zararlı statüsünde bazı bölgelerde',
    behavior: 'Gece aktif — gündüz sık çalılıkta yatar',
    approach: [
      'Palamut, mısır, gece leylak — çeker',
      'Akşam üstü taşlık-tarla geçişleri izle',
      'İz: büyük yuvarlak tırnak, bataklık yuvarlama izi',
      'Ateş böceği yerinden oynarsa yakında',
      'Anne-yavru grubuna uzak dur — tehlikeli',
    ],
    shot: 'Omuz arkası veya boyun · yakın mesafe 20-80m · kalabalık grupta baş domuz hedef',
    legal: 'Bölgeye göre yıl boyu veya sezonluk — yerel kuralları kontrol et',
  },
];

const STRATEGIES = [
  { icon: '🌙', name: 'Pusu (Stand Hunting)', desc: 'Ağaç tüneği veya yerde bekleme. Av geçeceği yere önceden kurulum — en etkili yöntem.' },
  { icon: '🦶', name: 'İz Takibi', desc: 'Taze iz (24 saat içi), uygun rüzgar yönü, yavaş ilerleme — yorucu ama tatmin edici.' },
  { icon: '📣', name: 'Çağırma', desc: 'Geyik bağırtısı veya karaca havlaması — çiftleşme döneminde güçlü. Yankı ile tepkiyi ölç.' },
  { icon: '🌾', name: 'Besleme Noktası', desc: 'Mineral tuz veya yem bırakmak — kontrollü av için. Yasal durumu bölgeye göre farklı.' },
  { icon: '🐕', name: 'Köpekle Sürme', desc: 'Gruba uygun yöntemler — köpek sürer, avcı bekler. Koordinasyon şart.' },
];

export default function BigGameGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('animals');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦌 Büyük Av Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 tür · geyik, karaca, dağ keçisi, domuz</div>
      </div>

      <div style={{ background: '#1a0808', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f59e0b33' }}>
        <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>⚖️ YASAL UYARI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Büyük av tüm türlerde ruhsat gerektirir. Kota aşımı ve ruhsatsız av ağır ceza. Türkiye ÇŞİB av düzenlemesine bak.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['animals','Türler'],['strategy','Stratejiler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#110e06', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'animals' && ANIMALS.map(a => {
          const open = sel === a.id;
          return (
            <div key={a.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : a.id)} style={{
                background: '#110e06', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${a.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic' }}>{a.latin} · {a.weight}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#110e06', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${a.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 12, marginTop: 8 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>🌿 Habitat: </span><span style={{ color: '#d1d5db' }}>{a.habitat}</span></div>
                  <div style={{ fontSize: 12, marginTop: 4 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>📅 Sezon: </span><span style={{ color: '#d1d5db' }}>{a.season}</span></div>
                  <div style={{ fontSize: 12, marginTop: 4 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>🔬 Davranış: </span><span style={{ color: '#d1d5db' }}>{a.behavior}</span></div>
                  <div style={{ fontSize: 11, color: a.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>🎯 YAKLAŞIM</div>
                  {a.approach.map((p, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {p}</div>)}
                  <div style={{ fontSize: 12, marginTop: 8 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>🔫 Atış: </span><span style={{ color: '#d1d5db' }}>{a.shot}</span></div>
                  <div style={{ background: a.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>⚖️ {a.legal}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'strategy' && (
          <div style={{ background: '#110e06', borderRadius: 14, padding: 14, border: '1px solid #f59e0b22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🏹 Büyük Av Stratejileri</div>
            {STRATEGIES.map((s, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < STRATEGIES.length-1 ? '1px solid #201808' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fde68a' }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{s.desc}</div>
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
