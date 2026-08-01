import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BERRIES = [
  {
    id: 'safe', name: 'Güvenli Meyveler', icon: '✅', accent: '#22c55e',
    items: [
      { name: 'Yabani Çilek', look: 'Küçük kırmızı, çilekten küçük', taste: 'Tatlı-ekşi', season: 'Haziran-Ağustos', habitat: 'Orman kenarı, taşlık yamaç', edible: 'Tüm meyve', caution: 'Güvenli — doğrudan yenebilir' },
      { name: 'Kuşburnu', look: 'Oval kırmızı, 1-2 cm', taste: 'Ekşi-tatlı, keskin', season: 'Eylül-Kasım', habitat: 'Çalılık, yol kenarı', edible: 'Et kısmı — tohum tahrişli', caution: 'Tohum minik tüyleri kaşındırır — et kısmını yiyebilirsin' },
      { name: 'Böğürtlen', look: 'Siyah parçalı küme', taste: 'Tatlı-ekşi', season: 'Ağustos-Eylül', habitat: 'Çalılık, orman kenarı', edible: 'Tüm meyve', caution: 'Güvenli — dal dikeni batmasına dikkat' },
      { name: 'Ahududu', look: 'Kırmızı parçalı küme, yuvarlak', taste: 'Tatlı, aromatlı', season: 'Temmuz-Eylül', habitat: 'Dağ ormanı kenarı, nemli', edible: 'Tüm meyve', caution: 'Güvenli — yabani böğürtlenle karıştırma (renk farkı)' },
      { name: 'Yabani Üzüm', look: 'Salkım halinde, küçük, mavi-siyah', taste: 'Çok ekşi-tatlı', season: 'Eylül-Ekim', habitat: 'Orman içi, çalılık', edible: 'Tüm meyve', caution: 'Güvenli — çekirdeği yutabilirsin' },
    ],
  },
  {
    id: 'toxic', name: 'Zehirli Meyveler', icon: '☠️', accent: '#ef4444',
    items: [
      { name: 'Patlıcan Otu (Güzel Avrat Otu)', look: 'Parlak siyah, kiraz gibi — çok çekici', taste: 'Tatlımsı (aldatıcı)', season: 'Temmuz-Ekim', habitat: 'Orman içi, ıslak yer', edible: 'HİÇBİRİ — ÖLÜMCÜL', caution: 'DOKUNMA BILE — 10 tane yetişkin öldürür, 3 çocuk için ölümcül' },
      { name: 'Zehirli Ormangülü (Çaça)', look: 'Kırmızı parlak, salkım', taste: 'Tatlı (aldatıcı)', season: 'Eylül-Kasım', habitat: 'Ormanlık, gölgeli', edible: 'HİÇBİRİ — ÖLÜMCÜL', caution: 'ÖLÜMCÜL — kuş gözü meyve tipik tehlike işareti' },
      { name: 'Yalancı Üzüm', look: 'Üzüm gibi salkım, mavi-siyah', taste: 'Acımsı', season: 'Eylül-Kasım', habitat: 'Çalılık, orman kenarı', edible: 'HİÇBİRİ — ZEHİRLİ', caution: 'Gerçek üzümden ayırt et: yaprak şekli ve tane boyutu farklı' },
      { name: 'Siyah Mürver (Olgunlaşmamış)', look: 'Yeşil, olgunlaşmamış', taste: 'Acı', season: 'Temmuz (olgunlaşmamış)', habitat: 'Orman kenarı, köy yakını', edible: 'SIYAH OLGUNCA yenebilir — yeşil ZEHİRLİ', caution: 'Sadece koyu siyah olgun meyve — pişirince daha güvenli' },
    ],
  },
  {
    id: 'nuts', name: 'Yabani Fındık & Tohumlar', icon: '🌰', accent: '#f59e0b',
    items: [
      { name: 'Yabani Fındık', look: 'Fındık ile aynı — küçük yeşil kozalak', taste: 'Yağlı, nüks', season: 'Eylül-Ekim', habitat: 'Karadeniz ormanları özellikle', edible: 'Tam olgun iç kısım', caution: 'Güvenli — yeşilken acı olabilir' },
      { name: 'Palamut', look: 'Meşe palamudu — uzun oval', taste: 'Acı (tanen)', season: 'Ekim-Kasım', habitat: 'Meşelik', edible: 'Pişirince — çiğ acı ve tahrişli', caution: 'Suya yatırarak tanen giderme — sonra pişir, un yap' },
      { name: 'Kestane', look: 'Dikenli kabuk, kestane içinde', taste: 'Tatlı, unlu', season: 'Ekim-Kasım', habitat: 'Kestane ormanları — Karadeniz', edible: 'Tüm iç kısım — çiğ veya pişmiş', caution: 'At kestanesiyle karıştırma — at kestanesi kabukta fark: daha az diken' },
    ],
  },
];

const ID_RULES = [
  { rule: 'Parlak ve çekici = şüphe', desc: 'Evrim: zehirli meyveler genellikle parlak, çekici — tuzak tasarımı doğada yaygın' },
  { rule: 'Küçük siyah meyve — dur', desc: 'Siyah-mavi küçük meyvelerin çoğu zehirli — tanımadıkça yeme' },
  { rule: 'Koku testi', desc: 'Tatlı koku = her zaman güvenli değil. Kaçınılmaz kural: tanımadığını yeme' },
  { rule: 'Ağaç üzerindeki meyveler', desc: 'Ağaçta yetişen meyveler (elma, armut formu) genellikle daha güvenli — çalıdaki küçük meyveler dikkat' },
  { rule: 'Hayvanların yediğini gör', desc: 'Kuş veya sincabın yediği her zaman insan için güvenli değil — metabolizma farkı var' },
];

export default function WildBerries() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('berries');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060f06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🫐 Yabani Meyve Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Güvenli meyveler · zehirli türler · fındık ve tohumlar</div>
      </div>

      <div style={{ background: '#1a0808', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>⚠️ ALTIN KURAL</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Kesin emin olmadığın hiçbir meyveyi yeme. Zehirlenme bulgusu (kusma, baş dönmesi) → 112.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['berries','Meyveler'],['rules','Tanıma Kuralları']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#080f08', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'berries' && BERRIES.map(cat => {
          const open = sel === cat.id;
          return (
            <div key={cat.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : cat.id)} style={{
                background: '#080f08', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${cat.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{cat.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: cat.accent }}>{cat.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{cat.items.length} tür</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#080f08', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${cat.accent}33`, borderTop: 'none' }}>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{ marginTop: 12, paddingBottom: 12, borderBottom: i < cat.items.length-1 ? `1px solid ${cat.accent}18` : 'none' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: cat.accent }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>👁️ {item.look}</div>
                      <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 1 }}>📅 {item.season} · {item.habitat}</div>
                      {item.edible !== 'HİÇBİRİ — ÖLÜMCÜL' && item.edible !== 'HİÇBİRİ — ZEHİRLİ' && <div style={{ fontSize: 11, color: '#22c55e', marginTop: 2 }}>✅ {item.edible}</div>}
                      <div style={{ fontSize: 11, color: cat.id === 'toxic' ? '#ef4444' : '#f59e0b', marginTop: 2 }}>⚠️ {item.caution}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {tab === 'rules' && (
          <div style={{ background: '#080f08', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 12 }}>🔍 Yabani Meyve Tanıma Kuralları</div>
            {ID_RULES.map((r, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < ID_RULES.length-1 ? '1px solid #0d1a0d' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac', marginBottom: 4 }}>{r.rule}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{r.desc}</div>
              </div>
            ))}
            <div style={{ background: '#ef444415', borderRadius: 8, padding: '10px 12px', marginTop: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', marginBottom: 4 }}>☠️ EN TEHLİKELİ YANILGILAR</div>
              <div style={{ fontSize: 11, color: '#d1d5db' }}>• Patlıcan otu (Atropa belladonna) — tatlı tad, ölümcül</div>
              <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>• Çaça (Lantana camara) — rengarenk, zehirli</div>
              <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>• Yeşil mürver — siyah olgunca güvenli, yeşilken zehirli</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
