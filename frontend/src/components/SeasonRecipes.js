import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RECIPES = [
  {
    id: 'lufervapor', name: 'Buharda Lüfer', season: 'Sonbahar', icon: '🐟', accent: '#06b6d4',
    time: '20 dk',
    difficulty: '⭐',
    serves: '2 kişi',
    ingredients: ['1 adet lüfer (temizlenmiş)', '1 limon', 'Zeytinyağı 2 yemek kaşığı', 'Dereotu, maydanoz', 'Tuz, karabiber', 'Kapari (opsiyonel)'],
    steps: ['Balığı yıkayıp kurulayın', 'İçine limon dilimi ve dereotu doldurun', 'Buharlı tencereye koyun', '15-18 dk buharda pişirin', 'Zeytinyağı ve limon suyu ile servis edin'],
    note: 'Lüfer en fazla buhar veya ızgara ile değerlenir. Fazla pişirme balığı kurutur.',
  },
  {
    id: 'avciusulu', name: 'Avcı Usulü Karacet', season: 'Kış', icon: '🍖', accent: '#f59e0b',
    time: '2.5 saat',
    difficulty: '⭐⭐⭐',
    serves: '6 kişi',
    ingredients: ['1 kg karaca veya geyik but', '200 ml kırmızı şarap', '2 soğan (iri doğranmış)', '4 sarımsak', 'Kekik, biberiye, defne yaprağı', 'Domates salçası 2 yemek kaşığı', 'Zeytin yağı'],
    steps: ['Eti şarap ve baharatla bir gece marine edin', 'Soğan ve sarımsağı yağda soteleyin', 'Eti kızartın (her iki yüzü)', 'Marine suyunu ve salçayı ekleyin', 'Kısık ateşte 2 saat pişirin'],
    note: 'Av eti güçlü tat içerir — marine olmadan hafif sertliği olabilir. Uzun pişirme ile yumuşar.',
  },
  {
    id: 'palamutpuding', name: 'Sardalya-Palamut Firını', season: 'İlkbahar', icon: '🐠', accent: '#ef4444',
    time: '45 dk',
    difficulty: '⭐⭐',
    serves: '4 kişi',
    ingredients: ['4 adet palamut (temizlenmiş)', '4 domates (dilimlenmiş)', '2 biber', '1 limon', 'Zeytinyağı', 'Tuz, kekik, maydanoz'],
    steps: ['Fırını 200°C\'e ısıtın', 'Fırın kabına zeytinyağı gezdirin', 'Domates ve biber dilimleri yayın', 'Balıkları üzerine yerleştirin', 'Limon ve baharatları ekleyin', '25-30 dk fırınlayın'],
    note: 'Palamut ağır yağlı bir balık — domatesle birlikte pişirince denge sağlar.',
  },
  {
    id: 'keklikguvec', name: 'Güveçte Keklik', season: 'Kış', icon: '🐦', accent: '#84cc16',
    time: '1.5 saat',
    difficulty: '⭐⭐',
    serves: '2 kişi',
    ingredients: ['1 adet keklik (temizlenmiş)', '2 soğan', '3 sarımsak', '1 biber', '2 domates', 'Kekik, kırmızı biber', 'Zeytinyağı'],
    steps: ['Kekliği zeytinyağında kızartın', 'Soğan ve sarımsağı kavurun', 'Domates ve biberi ekleyin', 'Kekliği güvece alın', 'Baharatları ekleyip 45-60 dk pişirin'],
    note: 'Keklik eti kurudur — domates ve soğan nem sağlar. Güveç kapağı kapalı tutun.',
  },
  {
    id: 'alabalikpan', name: 'Tereyağında Alabalık', season: 'İlkbahar-Sonbahar', icon: '🐟', accent: '#22c55e',
    time: '15 dk',
    difficulty: '⭐',
    serves: '2 kişi',
    ingredients: ['2 adet alabalık', 'Tereyağı 50 g', 'Sarımsak 3 diş', 'Limon', 'Maydanoz', 'Tuz, karabiber', 'Un (hafifçe)'],
    steps: ['Balığı ununla hafifçe kaplayın', 'Tereyağını tavalarda eritin', 'Sarımsakları ekleyin', 'Balıkları her iki yüzden 4-5 dk kızartın', 'Limon ve maydanozla servis edin'],
    note: 'Taze alabalık en taze hâliyle 10-12 dk yeterli. Fazla pişirme yapı bozar.',
  },
];

const PAIRINGS = [
  { food: 'Deniz balığı', sides: 'Zeytinyağlı, kapalı', drinks: 'Beyaz şarap, limonata', season: 'Yıl boyu' },
  { food: 'Tatlısu balığı', sides: 'Bulgur pilavı, salata', drinks: 'Soğuk ayran', season: 'Bahar-yaz' },
  { food: 'Av kuşu', sides: 'Bulgur, mercimek pilavı', drinks: 'Kırmızı şarap veya ayran', season: 'Sonbahar-kış' },
  { food: 'Av eti (geyik/karaca)', sides: 'Kestane, mantar', drinks: 'Güçlü kırmızı şarap', season: 'Kış' },
];

export default function SeasonRecipes() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('recipes');

  return (
    <div style={{ background: '#110a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍽️ Mevsim Tarifleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 tarif · av ve balık · mevsimsel pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['recipes','Tarifler'],['pairings','Kombinasyonlar']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#1e1206', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'recipes' && RECIPES.map(r => {
          const open = sel === r.id;
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#1e1206', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 28 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>{r.season} · {r.time} · {r.serves}</div>
                    </div>
                  </div>
                  <span style={{ background: r.accent + '22', color: r.accent, borderRadius: 20, padding: '2px 8px', fontSize: 11 }}>{r.difficulty}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1e1206', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  <div style={{ background: '#2a1a08', borderRadius: 8, padding: '8px 10px', margin: '8px 0' }}>
                    <div style={{ fontSize: 10, color: r.accent, fontWeight: 600, marginBottom: 4 }}>🛒 MALZEMELER</div>
                    {r.ingredients.map((ing, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}>· {ing}</div>)}
                  </div>
                  <div style={{ background: '#2a1a08', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 600, marginBottom: 4 }}>👨‍🍳 YAPILIŞI</div>
                    {r.steps.map((s, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4, display: 'flex', gap: 8 }}>
                        <span style={{ color: r.accent, fontWeight: 700, flexShrink: 0 }}>{i+1}.</span> {s}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: r.accent + '15', borderRadius: 8, padding: '6px 10px' }}>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontStyle: 'italic' }}>💡 {r.note}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'pairings' && (
          <div style={{ background: '#1e1206', borderRadius: 14, padding: 14, border: '1px solid #f9731622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>🍷 Yiyecek & Garnitür Kombinasyonları</div>
            {PAIRINGS.map((p, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < PAIRINGS.length-1 ? '1px solid #2a1a08' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316', marginBottom: 4 }}>{p.food}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>Garnitür: {p.sides}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>İçecek: {p.drinks}</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>Sezon: {p.season}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
