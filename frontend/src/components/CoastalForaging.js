import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FOODS = [
  { name: 'Deniz börülcesi', d: 'Kumlu sahillerde. Yenilebilir et ve tuzlu — salataya katıl veya haşla.' },
  { name: 'Kaya istiridyesi', d: 'Gelgit zonunda. Sert kabukla kaya yüzeyine yapışık. Düz bıçakla aç.' },
  { name: 'Midye', d: 'Gelgit havuzları ve kayalık kıyı. Temiz sulardan topla — paralitik zehir riski.' },
  { name: 'Deniz yosunu', d: 'Kırmızı ve yeşil yosunlar yenilebilir. Ulva (marul yosunu) en lezzetlisi.' },
  { name: 'Deniz salyangozu', d: 'Kayalık kıyılarda. Tuzlu suda haşla, kürdanla al. Limon ile servis.' },
  { name: 'Deniz üzümü', d: 'Sazankaya yosunu türü. Patlayan hücrecikler — taze yenir. Akdeniz.' },
];

const RULES = [
  { icon: '🚩', t: 'Kırmızı gelgit', d: 'Kabuklu deniz ürünleri alg patlamasında toksin biriktirir. Resmi uyarıları takip et.' },
  { icon: '🏭', t: 'Kirlilik', d: 'Liman, fabrika, tarım alanı yakınından TOPLAMA. Ağır metal birikimi.' },
  { icon: '📏', t: 'Boy ve miktar', d: 'Minimum boyların altında toplama. İhtiyaç kadar al — doğayı tüketme.' },
  { icon: '🗓️', t: 'Mevsim', d: 'Yaz aylarında kabuklu yenimez — üreme + sıcak + alg riski üst üste.' },
];

export default function CoastalForaging() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('foods');

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Kıyı Yenilebilir Toplama</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Deniz yiyecekleri · güvenlik kuralları · mevsim</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['foods','Yenilebilirler'],['rules','Güvenlik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#06101a', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'foods' && (
          <div style={{ background: '#06101a', borderRadius: 14, padding: 14, border: '1px solid #06b6d433' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🌊 Kıyıdan Toplanabilecekler</div>
            {FOODS.map((f, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < FOODS.length-1 ? '1px solid #0c1c28' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#67e8f9' }}>{f.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{f.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'rules' && RULES.map((r, i) => (
          <div key={i} style={{ background: '#06101a', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #06b6d422' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#06b6d4' }}>{r.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{r.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
