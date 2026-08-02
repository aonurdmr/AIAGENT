import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FOODS = [
  {
    id: 'kuzukulagi', name: 'Kuzukulağı', scientific: 'Rumex acetosa', icon: '🌿', accent: '#22c55e',
    taste: 'Ekşi, limonumsu',
    season: 'Mart–Haziran',
    habitat: 'Çayır, tarla kenarı, nemli yer',
    use: 'Salata, çorba, börek içi, çiğ yenebilir',
    prep: 'Taze yaprakları yıkayıp çiğ ya da pişir. Bol miktarda yeme — oksalik asit içerir.',
    nutrition: 'C vitamini, demir, potasyum',
    caution: '⚠️ Aşırı tüketim (günde 200g+) böbrek taşı riskini artırabilir',
    lookalike: 'Doğru tanıma: yaprak tabana ok biçiminde uzar, ekşi tatlar',
  },
  {
    id: 'isirgan', name: 'Isırgan Otu', scientific: 'Urtica dioica', icon: '💚', accent: '#16a34a',
    taste: 'Ispanağımsı, mineral tadı',
    season: 'Mart–Mayıs (genç sürgünler)',
    habitat: 'Nemli toprak, çit altı, orman kenarı',
    use: 'Çorba, börek, çay, pesto',
    prep: 'Eldivenle topla. Haşlama veya sote ile ısırma özelliği kaybolur.',
    nutrition: 'Demir, kalsiyum, K vitamini, proteinli',
    caution: '✅ Olgunlaşmış bitki ısıtınca zararsız — çiğ yeme',
    lookalike: 'Dikkat: kalp yaprağı ve dişli kenar — tüm ısırgangiller ısırır',
  },
  {
    id: 'yabani_kusku', name: 'Yabani Kuşkonmaz', scientific: 'Asparagus officinalis', icon: '🌱', accent: '#84cc16',
    taste: 'Bahçe kuşkonmazı gibi, daha yoğun',
    season: 'Mart–Mayıs',
    habitat: 'Step, kuru yamaç, kıyı kumulluk',
    use: 'Sote, ızgara, omelet, çiğ salata',
    prep: 'Taze sürgün topla — sertleşmeden önce. Tabanını kır, bükülme yerinden kopar.',
    nutrition: 'Folik asit, K vitamini, B vitaminleri',
    caution: '✅ Tamamen güvenli, ekolojik hasattan topla',
    lookalike: 'Genç sürgün ince beyaz — büyüyünce yapraksız yeşil dallar',
  },
  {
    id: 'yabani_cilek', name: 'Yabani Çilek', scientific: 'Fragaria vesca', icon: '🍓', accent: '#ef4444',
    taste: 'Çok yoğun, bahçe çileğinden tatlı',
    season: 'Mayıs–Temmuz',
    habitat: 'Orman kenarı, çalılık, yarı gölge',
    use: 'Çiğ tüketim, reçel, tatlı, kurutma',
    prep: 'Meyveyi yıka — özellikle böcek var mı kontrol et. Çok çabuk bozulur.',
    nutrition: 'C vitamini, manganez, folat',
    caution: '✅ Güvenli — alerji yoksa endişe yok',
    lookalike: 'Sahte çilek (Potentilla indica): sarı çiçek, tatsız kırmızı meyve',
  },
  {
    id: 'yabani_nane', name: 'Yabani Nane', scientific: 'Mentha arvensis', icon: '🌿', accent: '#06b6d4',
    taste: 'Serinletici, yoğun mentol',
    season: 'Temmuz–Eylül',
    habitat: 'Dere kenarı, sulak çayır, nemli orman altı',
    use: 'Çay, soğuk içecek, salata, baharat',
    prep: 'Yaprakları taze veya kurutarak kullan. Çiçek açmadan önce en aromatik hali.',
    nutrition: 'A vitamini, demir, mangan',
    caution: '✅ Güvenli — büyük miktarlarda sindirim rahatlığı verebilir',
    lookalike: 'Tüm nane türleri yenilebilir — mentol kokusu doğrulayıcı',
  },
  {
    id: 'mevsim_mantari', name: 'Sarı Şapka (Boletus)', scientific: 'Boletus edulis', icon: '🍄', accent: '#f59e0b',
    taste: 'Cevizimsi, derin umami',
    season: 'Ağustos–Ekim (yağmur sonrası)',
    habitat: 'Meşe ve çam ormanı altı',
    use: 'Sote, risotto, kurutma, çorba',
    prep: 'Sapı sıkı, şapkası kahverengi. Sünger tabaka (lamelsiz) sarı-beyaz = yenilebilir.',
    nutrition: 'Protein, B vitamini, çinko, selenyum',
    caution: '🚨 ÖLÜMCÜL benzer: ölüm mantarı (Amanita) ile kesinlikle karıştırma. %100 emin değilsen yeme.',
    lookalike: 'Kırmızı sünger = zehirli Boletus satanas. Sadece sarı-beyaz süngerli topla.',
  },
];

const RULES = [
  { icon: '📚', rule: '%100 emin olmadığın hiçbir şeyi yeme — sahaya tanımlama kitabı götür' },
  { icon: '🧪', rule: 'Yeni bitki ilk kez deniyorsan küçük miktar — alerji testi' },
  { icon: '🚫', rule: 'Yol kenarı ve sanayi yakını bitkilerini toplama — kirlilik riski' },
  { icon: '🌿', rule: 'Sürdürülebilir toplama: bulduğunun %30\'unu al, geri kalanı bırak' },
  { icon: '📸', rule: 'Tanımlamak için bitki fotoğrafını çek — yaprak, kök, çiçek, koku not et' },
  { icon: '🧺', rule: 'Plastik torba değil örgü çanta — bitki nefes almalı, solmamalı' },
];

export default function WildFoodGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('foods');

  return (
    <div style={{ background: '#050f06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🫐 Yabani Gıda Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 tür · doğadan yenilebilir bitki & mantar</div>
      </div>

      <div style={{ margin: '0 16px 12px', background: '#ef444415', borderRadius: 12, padding: '12px 14px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 700, marginBottom: 3 }}>⚠️ Önemli Uyarı</div>
        <div style={{ fontSize: 12, color: '#d1d5db' }}>Tanımlamadan emin olmadan yeme. Mantar konusunda uzman olmadan asla toplamaya çalışma.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['foods','Bitkiler'],['rules','Kurallar']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0a1a0a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'foods' && FOODS.map(f => {
          const open = sel === f.id;
          return (
            <div key={f.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : f.id)} style={{
                background: '#0a1a0a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${f.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 28 }}>{f.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{f.name}</div>
                      <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{f.scientific}</div>
                    </div>
                  </div>
                  <span style={{ background: f.accent + '22', color: f.accent, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{f.season}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a1a0a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${f.accent}33`, borderTop: 'none' }}>
                  {[['😋 Tat', f.taste], ['📍 Habitat', f.habitat], ['🍳 Kullanım', f.use], ['👨‍🍳 Hazırlık', f.prep], ['💊 Besin', f.nutrition]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: f.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: '#1f2937', borderRadius: 8, padding: '6px 10px', marginTop: 6 }}>
                    <div style={{ fontSize: 12, color: '#d1d5db' }}>{f.caution}</div>
                  </div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '6px 10px', marginTop: 4 }}>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>🔍 {f.lookalike}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'rules' && (
          <div style={{ background: '#0a1a0a', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🌿 Yabani Gıda Toplama Kuralları</div>
            {RULES.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{r.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{r.rule}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
