import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CAMO_TYPES = [
  {
    id: 'woodland', name: 'Orman Kamuflaj', icon: '🌲', accent: '#22c55e',
    best: 'Çam-meşe ormanı, çalılık, karışık orman',
    patterns: ['Woodland: klasik yeşil-kahve-siyah desen', 'Multicam: her ortamda geçer, seyahat avcısı için', 'Realtree: soyut yaprak desen — Türk ormanı'],
    tips: [
      'Yeşil baskın desen: yaz ve ilkbahar',
      'Kahve baskın: sonbahar ve kuru orman',
      'Şapka kenarına taze dal tak — silueti boz',
    ],
    tip: 'Kamuflaj rengi değil, hareketsizlik gizler. En iyi kıyafet bile hareketle bozulur.',
  },
  {
    id: 'field', name: 'Açık Alan & Tarla', icon: '🌾', accent: '#f59e0b',
    best: 'Bozkır, tarla, ekilmemiş arazi',
    patterns: ['Tan/khaki: sarı-bej ton — kuru ot', 'Digi camo: pikselli — büyük açık alanda', 'Stubble: kısa kesik ot rengi — sonbahar tarlası'],
    tips: [
      'Gökyüzü silüetinden kaç — tepede durma',
      'Yüzü boyamak veya yüz maskesi şart — ten rengi parlar',
      'Tabanca gizleme: mat boya veya kılıf',
    ],
    tip: 'Açık alanda en büyük hata: hareketli olmak. Gözlem pusu kur ve sabır.',
  },
  {
    id: 'ghillie', name: 'Ghillie Suit', icon: '🌿', accent: '#a78bfa',
    best: 'Yakın mesafe pusu, fotoğrafçılık, keşif',
    patterns: ['3D bitki parçacıkları ile kaplanmış tulum', 'Sentetik veya jüt malzeme', 'DIY: file ceket üstüne ip ve boya'],
    tips: [
      'Kendi yapımı ghillie: ağ kıyafet + örgü iplik tüpü + rüzgarla boyama',
      'Bölge bitkisini ekle — renk fotoğrafı çek, eşleştir',
      'Ağır ve sıcak — sabah erken kur, gün boyu bekle',
    ],
    tip: 'Ghillie 5m mesafede görünmez yapar — ama koku maskesi şart.',
  },
  {
    id: 'scent', name: 'Koku Kamuflajı', icon: '🌬️', accent: '#06b6d4',
    best: 'Tüm av türleri — koku insan izi bırakır',
    patterns: ['Koku nötralize sprey — avdan önce', 'Koku kontrol sabun — tüm vücut', 'Çam, ot, toprak koku spreyleri — bölge kokusu'],
    tips: [
      'Rüzgar yönü her zaman hayvan tarafından sana doğru olsun',
      'Koku: nem ve rüzgarla yayılır — yokuşta aşağı esen rüzgar',
      'Yiyecekten kaçın: çiğ köfte, soğan, sigara kokusu uzağa gider',
    ],
    tip: 'Kural: Rüzgar seni ele verir. Her avdan önce rüzgarı kontrol et.',
  },
];

export default function CamouflageGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040b06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Kamuflaj Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Orman · açık alan · ghillie · koku kontrolü</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {CAMO_TYPES.map(c => {
          const open = sel === c.id;
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : c.id)} style={{
                background: '#080e08', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${c.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{c.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{c.best}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#080e08', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${c.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>🎨 DESEN</div>
                  {c.patterns.map((p, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {p}</div>)}
                  <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>💡 TEKNIK</div>
                  {c.tips.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {t}</div>)}
                  <div style={{ background: c.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>🎯 {c.tip}</div>
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
