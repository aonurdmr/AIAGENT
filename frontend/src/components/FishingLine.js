import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LINE_TYPES = [
  {
    id: 'mono', name: 'Monofilament', abbr: 'Mono', icon: '🧵', accent: '#fbbf24',
    material: 'Naylon (tek filament)',
    stretch: '%25-30 uzama',
    visibility: 'Görünür — şeffaf veya renkli seçenek',
    pros: ['Ucuz ve yaygın', 'Yüzer — yüzey yem ideal', 'Düğüm atar kolay', 'Esnek — küçük balıkta hata affeder'],
    cons: ['UV ışığa karşı zayıf — yılda yenile', 'Büyük çaplı — suda görünür', 'Bellek etkisi — sargıdan spiral çıkar'],
    uses: 'Şamandıralı avlanma, kıyı avı, çipura-levrek',
    diameter: '0.18-0.40 mm arası en yaygın',
    tip: '0.20mm mono her sezon değiştir — UV yıpranması kırılmaya neden olur.',
  },
  {
    id: 'fluoro', name: 'Fluorocarbon', abbr: 'FC', icon: '💧', accent: '#06b6d4',
    material: 'PVDF (polyvinylidene fluoride)',
    stretch: '%15-20 uzama',
    visibility: 'Neredeyse görünmez suda',
    pros: ['Sualtında görünmezlik — özellikle temiz suda', 'Sertlik — dip sürtünmeye dayanıklı', 'UV\'ya dayanıklı', 'Hızlı batar — dip avı ideal'],
    cons: ['Pahalı', 'Sert — özellikle soğukta', 'Kırılganlık — düğüm hatasında zayıf'],
    uses: 'Lider (önlama), dip avı, şeffaf sularda tüm avlar',
    diameter: '0.12-0.30 mm lider olarak',
    tip: 'FC lider her sefer sonra 50 cm kes — darbe bölgesi zayıflar.',
  },
  {
    id: 'braid', name: 'Örgülü İp (Braid)', abbr: 'PE', icon: '🔗', accent: '#ef4444',
    material: 'Dyneema / Spectra PE fiber',
    stretch: '<%5 uzama — neredeyse sıfır',
    visibility: 'Renkli — suda görünür',
    pros: ['İnce çap — katarlı yem atar uzak', 'Sıfır uzama — hassas his', 'Dayanıklılık — 5+ yıl', 'Dip hissi mükemmel'],
    cons: ['Pahalı', 'Düğüm zor — FG düğüm şart', 'Rüzgarda şişer — balonlu makara', 'Lider olmadan çok görünür'],
    uses: 'Jig, dropshotdrop, yoyo, dip avı, mesafe atışı',
    diameter: 'PE 0.6-1.5 arası (çap değil PE no)',
    tip: 'Braid+FC lider kombinasyonu — braid mesafe, fluoro görünmezlik. Altın düzen.',
  },
  {
    id: 'wire', name: 'Metal Tel', abbr: 'Wire', icon: '🔩', accent: '#6b7280',
    material: 'Paslanmaz çelik ya da titan',
    stretch: 'Sıfır',
    visibility: 'Gümüş gri',
    pros: ['Dişli balıklara karşı kesilmez', 'Turna, esterya, köpekbalığı için zorunlu', 'Dayanıklı'],
    cons: ['Ağır — yem hareketini etkiler', 'Pas yapabilir', 'Görünürlük yüksek'],
    uses: 'Turna ve büyük predatör avı, köpekbalığı avı',
    diameter: '0.35-0.60 mm',
    tip: 'Turna avında 15-20 cm wire lider yeter — tüm hattı tele çevirme.',
  },
];

const KNOTS = [
  { name: 'Palomar Düğümü', use: 'İğne bağlama — braid için', strength: '%95' },
  { name: 'Clinch Düğümü', use: 'İğne bağlama — mono için', strength: '%90' },
  { name: 'FG Düğümü', use: 'Braid-FC lider bağlantısı', strength: '%98' },
  { name: 'Blood Düğümü', use: 'İki misina ucu birleştirme', strength: '%85' },
  { name: 'Loop Düğümü', use: 'Lider halkası oluşturma', strength: '%90' },
];

export default function FishingLine() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('lines');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#050a0f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧵 Olta İpliği Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 ip türü · avantaj, kullanım & düğüm rehberi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['lines','İp Türleri'],['knots','Düğümler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#fbbf24' : '#0a1420', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'lines' && LINE_TYPES.map(l => {
          const open = sel === l.id;
          return (
            <div key={l.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : l.id)} style={{
                background: '#0a1420', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${l.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{l.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{l.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{l.material} · {l.stretch}</div>
                  </div>
                  <div style={{ fontSize: 10, color: l.accent, fontWeight: 700 }}>{l.abbr}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a1420', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${l.accent}33`, borderTop: 'none' }}>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, marginBottom: 8 }}>
                    <div style={{ flex: 1, background: '#22c55e15', borderRadius: 8, padding: '6px 10px' }}>
                      <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 700, marginBottom: 3 }}>✅ AVANTAJ</div>
                      {l.pros.map((p, i) => <div key={i} style={{ fontSize: 11, color: '#d1d5db', marginBottom: 2 }}>• {p}</div>)}
                    </div>
                    <div style={{ flex: 1, background: '#ef444415', borderRadius: 8, padding: '6px 10px' }}>
                      <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 700, marginBottom: 3 }}>❌ DEZAVANTAJ</div>
                      {l.cons.map((c, i) => <div key={i} style={{ fontSize: 11, color: '#d1d5db', marginBottom: 2 }}>• {c}</div>)}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, marginBottom: 3 }}><span style={{ color: l.accent, fontWeight: 600 }}>🎣 Kullanım: </span><span style={{ color: '#d1d5db' }}>{l.uses}</span></div>
                  <div style={{ fontSize: 12, marginBottom: 8 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>📏 Çap: </span><span style={{ color: '#d1d5db' }}>{l.diameter}</span></div>
                  <div style={{ background: l.accent + '15', borderRadius: 8, padding: '6px 10px' }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {l.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'knots' && (
          <div style={{ background: '#0a1420', borderRadius: 14, padding: 14, border: '1px solid #fbbf2422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24', marginBottom: 10 }}>🪢 Temel Balıkçı Düğümleri</div>
            {KNOTS.map((k, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < KNOTS.length-1 ? '1px solid #0f1e2e' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fcd34d' }}>{k.name}</div>
                  <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>{k.strength}</div>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 3 }}>{k.use}</div>
              </div>
            ))}
            <div style={{ background: '#1a1005', borderRadius: 8, padding: '8px 10px', marginTop: 4, border: '1px solid #fbbf2433' }}>
              <div style={{ fontSize: 11, color: '#fbbf24', fontWeight: 700, marginBottom: 3 }}>💡 ALTIN KURAL</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>Düğüm atmadan önce misina ısıt — tükürük veya su. Kuru sürtünme misina sıcaklığıyla %20 mukavemet kaybeder.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
