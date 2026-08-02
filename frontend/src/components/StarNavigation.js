import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STARS = [
  {
    id: 'polaris', name: 'Kutup Yıldızı (Polaris)', icon: '⭐', accent: '#93c5fd',
    constellation: 'Küçükayı (Ursa Minor)',
    direction: 'Kuzeyi gösterir — her zaman',
    magnitude: '2.0 — parlak ve sabit',
    how_to_find: 'Büyükayı\'nın iki köşe yıldızını bir doğruya uzat — Polaris\'e ulaşırsın (5 kat uzaklık)',
    nav_use: 'Geceleri kuzeyi bulmak için en güvenilir referans. Yarım daire çizerek pusula olur.',
    visibility: 'Yıl boyu — Türkiye\'de her mevsim görünür',
    tip: 'Polaris\'e olan açı = bulunduğun enlem. 40°N\'de gökyüzünde 40° yüksekte görürsün.',
  },
  {
    id: 'orion', name: 'Orion Takımyıldızı', icon: '🌟', accent: '#fbbf24',
    constellation: 'Avcı (Orion)',
    direction: 'Orion\'un kemeri — doğudan doğar, batıdan batar',
    magnitude: 'Betelgeuse & Rigel 0-1 mag',
    how_to_find: 'Üç sıra yıldız — Orion\'un kemeri. Kış gökyüzünün en belirgin takımyıldızı.',
    nav_use: 'Kemer tam doğudan doğar, tam batıdan batar — istikametleme için.',
    visibility: 'Kasım-Mart (kış gökyüzü)',
    tip: 'Orion\'un kemerine bak — sağ alt Rigel mavi-beyaz, sol üst Betelgeuse kırmızı-turuncu.',
  },
  {
    id: 'sirius', name: 'Sirius (Köpek Yıldızı)', icon: '✨', accent: '#ef4444',
    constellation: 'Büyük Köpek (Canis Major)',
    direction: 'Güney gökyüzünde alçak',
    magnitude: '-1.46 — gökyüzünün en parlak yıldızı',
    how_to_find: 'Orion\'un kemer yıldızlarını sola uzat — Sirius\'e ulaşırsın',
    nav_use: 'Kış güney yönü referansı. Güneye bakan yüzün o yöne çekilmesi Sirius ile kolay.',
    visibility: 'Aralık-Mart',
    tip: 'Sirius o kadar parlak ki çıplak gözle bile titreştiğini görebilirsin.',
  },
  {
    id: 'cassiopeia', name: 'Cassiopeia (W Takımyıldızı)', icon: '🌠', accent: '#a78bfa',
    constellation: 'Cassiopeia',
    direction: 'Kuzey gökyüzü — Polaris karşısı',
    magnitude: '2-3 mag, 5 yıldız W şeklinde',
    how_to_find: 'Kutup noktasının karşı tarafında, Büyükayı ile ters kenarada. W ya da M şekli.',
    nav_use: 'Büyükayı gözükmüyorsa (ufkun altında) Cassiopeia\'dan Polaris bulunur.',
    visibility: 'Yıl boyu — sirkumpolar',
    tip: 'Cassiopeia W\'sinin orta çentiği Polaris\'e işaret eder — acil pusula.',
  },
];

const TECHNIQUES = [
  { icon: '🕐', name: 'Saat-Güneş Yöntemi', desc: 'Saat akrebi güneşe yönelt. Akrep ile 12 arası açının yarısı güneye bakar. (Yaz saatinde 1\'e göre hesapla)' },
  { icon: '🌒', name: 'Ay Yöntemi', desc: 'Hilal ay — iki uç noktayı doğruya uzat ve yere indir. Güneyde yaklaşık güney.' },
  { icon: '🌿', name: 'Yosun Pusulası', desc: 'Ağaçların kuzey yüzünde yosun daha yoğun (az güneş alır). Tek başına güvenilir değil, destekleyici.' },
  { icon: '🌳', name: 'Ağaç Büyümesi', desc: 'Güneyde ağaç taç daha geniş ve yoğun (fazla güneş alır). Açıklık arazide belirgin.' },
  { icon: '🧲', name: 'Doğal Manyetit', desc: 'Bazı bazalt taşlar kuzey kutbuna hafif çekilir. Uzman dışı güvenilmez — sadece son çare.' },
];

export default function StarNavigation() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('stars');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#04060f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⭐ Yıldız Navigasyon</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 yıldız & takımyıldız · doğal yön bulma teknikleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['stars','Yıldızlar'],['techniques','Teknikler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#6366f1' : '#080c1a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'stars' && STARS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#080c1a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.constellation} · {s.visibility}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#080c1a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 12, marginTop: 10, marginBottom: 4 }}><span style={{ color: s.accent, fontWeight: 600 }}>🧭 Yön: </span><span style={{ color: '#d1d5db' }}>{s.direction}</span></div>
                  <div style={{ fontSize: 12, marginBottom: 4 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>🔍 Nasıl Bulunur: </span><span style={{ color: '#d1d5db' }}>{s.how_to_find}</span></div>
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: s.accent, fontWeight: 700, marginBottom: 3 }}>🧭 NAVİGASYON KULLANIMI</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{s.nav_use}</div>
                  </div>
                  <div style={{ background: '#0d101e', borderRadius: 8, padding: '6px 10px', marginTop: 4 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {s.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'techniques' && (
          <div style={{ background: '#080c1a', borderRadius: 14, padding: 14, border: '1px solid #6366f122' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#818cf8', marginBottom: 10 }}>🧭 Yıldızsız Yön Bulma Teknikleri</div>
            {TECHNIQUES.map((t, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < TECHNIQUES.length-1 ? '1px solid #111628' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2, lineHeight: 1.5 }}>{t.desc}</div>
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
