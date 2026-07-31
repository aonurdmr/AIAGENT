import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SEASONS = [
  {
    id: 'spring', name: 'İlkbahar', icon: '🌸', accent: '#22c55e',
    months: 'Mart · Nisan · Mayıs',
    available: ['Yabani kuşkonmaz', 'Kuzukulağı yaprakları', 'Yabani nane', 'İlk çilekler', 'Isırgan otu', 'Mantar (nisan boletus)'],
    recipes: [
      { name: 'Kuşkonmazlı Omlet', time: '15 dk', difficulty: 'Kolay', ingredients: ['4 yumurta', '8 dal kuşkonmaz', 'Zeytinyağı', 'Tuz'], steps: ['Kuşkonmazı 3 cm doğra, 2 dk kavur', 'Yumurtaları çırp, tuz ekle', 'Tavaya dök, kuşkonmazın üstüne', 'Kapakla 3 dk pişir'] },
      { name: 'Isırgan Çorbası', time: '20 dk', difficulty: 'Orta', ingredients: ['200g taze ısırgan (eldiven ile topla)', '1 soğan', 'Zeytinyağı', 'Tuz, karabiber'], steps: ['Isırganı 2 dk haşla (yakma etkisi yok olur)', 'Soğanı kavur', 'Isırganı ekle, 5 dk pişir', 'Blender\'la karıştır, servis et'] },
    ],
    tip: 'İlkbahar kamp yemekleri taze ve besleyici — yabani bitki toplarken %100 emin ol.',
  },
  {
    id: 'summer', name: 'Yaz', icon: '☀️', accent: '#f59e0b',
    months: 'Haziran · Temmuz · Ağustos',
    available: ['Yabani çilek & böğürtlen', 'Kaya suyu (berrak)', 'Kuzey yönlü kuşkonmaz', 'Taze bal (kovan bulursan)', 'Otlar — kekik, biberiye, dağ kişnişi'],
    recipes: [
      { name: 'Şakşuka (Kamp)', time: '25 dk', difficulty: 'Kolay', ingredients: ['2 biber', '2 domates', 'Sarımsak', 'Zeytinyağı'], steps: ['Biberleri közle', 'Domatesi küp doğra, sarımsak ezekle kavur', 'Közlenmiş biberi soy, ekle', 'Karıştır, ocakta 5 dk'] },
      { name: 'Kamp Briyanı', time: '45 dk', difficulty: 'Orta', ingredients: ['200g pirinç', 'Soğan', 'Baharatlar', 'Zeytinyağı', 'Su'], steps: ['Soğanı kavur', 'Pirinç ekle, 2 dk kavur', '400ml su ekle, kapak', '20 dk kısık ateş'] },
    ],
    tip: 'Yaz sıcağında gıda güvenliği kritik — et ürünlerini buzluklu çanta taşı.',
  },
  {
    id: 'autumn', name: 'Sonbahar', icon: '🍂', accent: '#ef4444',
    months: 'Eylül · Ekim · Kasım',
    available: ['Boletus ve şantarölü mantarlar', 'Yabani elma & armut', 'Kestane (dağ)', 'Kuşburnu (C vitamini)', 'Yabani üzüm'],
    recipes: [
      { name: 'Kamp Mantar Güveci', time: '30 dk', difficulty: 'Kolay', ingredients: ['300g taze mantar', 'Soğan', 'Sarımsak', 'Zeytinyağı', 'Kekik'], steps: ['Mantarı büyükçe doğra', 'Soğan-sarımsak kavur', 'Mantar ekle, 10 dk yüksek ateş', 'Kekik ekle, servis'] },
      { name: 'Kestane Çorbası', time: '40 dk', difficulty: 'Orta', ingredients: ['200g kestane', 'Soğan', 'Zeytinyağı', 'Tuz'], steps: ['Kestaneyi közle, kabuğunu soy', 'Soğanla kavur', 'Su ekle, 20 dk pişir', 'Ezekle karıştır'] },
    ],
    tip: 'Mantar toplarken %100 tanımlama şart — zehirli türler ölümcül olabilir.',
  },
  {
    id: 'winter', name: 'Kış', icon: '❄️', accent: '#3b82f6',
    months: 'Aralık · Ocak · Şubat',
    available: ['Kış kekiği (sürekli)', 'Dondurulmuş böğürtlen (toplanmış)', 'Kuşburnu (donmaz)', 'Defne yaprağı', 'Biberiye'],
    recipes: [
      { name: 'Sıcak Izgara Sandviç', time: '10 dk', difficulty: 'Kolay', ingredients: ['Ekmek', 'Peynir', 'Salam/sosis', 'Tereyağı'], steps: ['Ekmeği tereyağıyla yağla', 'Peynir+sosis içine koy', 'Tavada her taraf 3 dk', 'Sıcak servis'] },
      { name: 'Kamp Çay Tası Yemeği', time: '20 dk', difficulty: 'Kolay', ingredients: ['Fasulye konservesi', 'Soğan', 'Baharat', 'Kamp tası'], steps: ['Soğanı yağda kavur', 'Fasulye ekle', '5 dk ısıt', 'Ekmekle servis'] },
    ],
    tip: 'Kış kampta kalori ihtiyacı %30 artar — yüksek enerjili atıştırmalık şart.',
  },
];

export default function SeasonalCampFood() {
  const navigate = useNavigate();
  const [selSeason, setSelSeason] = useState('spring');
  const [selRecipe, setSelRecipe] = useState(null);

  const season = SEASONS.find(s => s.id === selSeason);

  return (
    <div style={{ background: '#0a0f06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍳 Mevsimsel Kamp Yemekleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 mevsim · doğal malzeme & kamp tarifleri</div>
      </div>

      <div style={{ display: 'flex', gap: 6, padding: '0 16px', marginBottom: 16 }}>
        {SEASONS.map(s => (
          <button key={s.id} onClick={() => { setSelSeason(s.id); setSelRecipe(null); }} style={{
            flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 18,
            background: selSeason === s.id ? s.accent : '#0e160a',
            boxShadow: selSeason === s.id ? `0 0 12px ${s.accent}66` : 'none',
          }}>{s.icon}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0e160a', borderRadius: 12, padding: '12px 14px', marginBottom: 12, border: `1px solid ${season.accent}33` }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: season.accent }}>{season.icon} {season.name}</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{season.months}</div>
        </div>

        <div style={{ background: '#0e160a', borderRadius: 12, padding: '12px 14px', marginBottom: 12, border: '1px solid #1a2e10' }}>
          <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700, marginBottom: 8 }}>🌿 MEVSİMSEL MALZEMELER</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {season.available.map((a, i) => (
              <span key={i} style={{ background: season.accent + '22', borderRadius: 20, padding: '3px 10px', fontSize: 11, color: '#d1d5db' }}>{a}</span>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8 }}>🍽️ TARİFLER</div>
        {season.recipes.map((r, i) => {
          const open = selRecipe === i;
          return (
            <div key={i} style={{ marginBottom: 8 }}>
              <div onClick={() => setSelRecipe(open ? null : i)} style={{
                background: '#0e160a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '12px 14px', border: `1px solid ${season.accent}33`, cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>⏱️ {r.time} · {r.difficulty}</div>
                </div>
                <span style={{ color: season.accent }}>{open ? '▲' : '▼'}</span>
              </div>
              {open && (
                <div style={{ background: '#0e160a', borderRadius: '0 0 12px 12px', padding: '0 14px 12px', border: `1px solid ${season.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: season.accent, fontWeight: 700, marginBottom: 4, marginTop: 8 }}>📋 MALZEMELER</div>
                  {r.ingredients.map((ing, j) => <div key={j} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}>• {ing}</div>)}
                  <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700, marginBottom: 4, marginTop: 8 }}>👨‍🍳 YAPILIŞI</div>
                  {r.steps.map((st, j) => <div key={j} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{j+1}. {st}</div>)}
                </div>
              )}
            </div>
          );
        })}

        <div style={{ background: season.accent + '15', borderRadius: 10, padding: '10px 14px', marginTop: 8, border: `1px solid ${season.accent}33` }}>
          <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {season.tip}</div>
        </div>
      </div>
    </div>
  );
}
