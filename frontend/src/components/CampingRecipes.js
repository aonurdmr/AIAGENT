import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RECIPES = [
  {
    id: 1, name: 'Kamp Közde Patates', cat: 'Sebze', method: 'Közde', time: 45, servings: 4, icon: '🥔',
    difficulty: 'Kolay', accent: '#f59e0b',
    ingredients: ['4 büyük patates', '4 yemek kaşığı tereyağı', 'Tuz, karabiber', '1 tutam kekik', 'Ekstra: peynir, sosis'],
    steps: [
      'Patateslerin etrafını alüminyum folyo ile iyice sarın.',
      'Közlerin ortasına gömün, üzerini biraz köz ile örtün.',
      '35-45 dakika pişirin; kürdan ile yumuşadığını test edin.',
      'Folyo açıp yarısından yırtın, tereyağı, tuz ve kekiği ekleyin.',
    ],
    tip: 'İnce patatesleri iki katman folyo ile sarın. Üzerindeki köze dikkat edin; yavaş ateş daha iyi sonuç verir.',
  },
  {
    id: 2, name: 'Mangal Tavuk Şiş', cat: 'Et', method: 'Mangal', time: 30, servings: 4, icon: '🍗',
    difficulty: 'Orta', accent: '#f97316',
    ingredients: ['600g tavuk göğsü (küpler)', '2 biber, 2 soğan (parça)', '3 yemek kaşığı zeytinyağı', '1 limon suyu', 'Tuz, kırmızı toz biber, kimyon', 'Metal veya ıslatılmış ahşap şiş'],
    steps: [
      'Tavukları yağ, limon ve baharatlarla 1 saat marine edin.',
      'Tavuk ve sebzeleri dönüşümlü olarak şişlere dizin.',
      'Orta ateşte her yanda 6-8 dakika pişirin.',
      'İç sıcaklık 74°C olduğunda hazırdır.',
    ],
    tip: 'Ahşap şişleri pişirmeden 30 dakika önce suya koyun, yanmasın. Marine sosu içinde biraz yoğurt koyarsanız tavuk çok daha yumuşak olur.',
  },
  {
    id: 3, name: 'Ateş Başı Fasulye Çorbası', cat: 'Çorba', method: 'Tencere', time: 50, servings: 6, icon: '🫘',
    difficulty: 'Kolay', accent: '#84cc16',
    ingredients: ['2 kutu konserve fasulye', '1 soğan', '3 diş sarımsak', '1 domates kutusu', '1 litre su veya et suyu', 'Zeytinyağı, tuz, karabiber, kimyon, kırmızı biber'],
    steps: [
      'Soğan ve sarımsağı zeytinyağında soteleyin.',
      'Domates ve baharatları ekleyip 5 dakika pişirin.',
      'Yıkanmış fasulyeyi ve suyu ekleyin.',
      '30 dakika kısık ateşte kaynatın.',
      'Dilerseniz bir kısmını ezerek koyulaştırın.',
    ],
    tip: 'Konserve fasulye kamp koşulları için idealdir; ağır değil, hızlı pişer. Salam veya pastırma eklerseniz lezzet katlanır.',
  },
  {
    id: 4, name: 'Kamp Kahvaltı Yumurtası', cat: 'Kahvaltı', method: 'Tava', time: 15, servings: 2, icon: '🍳',
    difficulty: 'Kolay', accent: '#fbbf24',
    ingredients: ['4 yumurta', '2 domates (dilim)', '1 yeşil biber', '50g kaşar peyniri', 'Tereyağı', 'Tuz, karabiber'],
    steps: [
      'Kamp tüpünde tavayı ısıtın, tereyağı ekleyin.',
      'Biber ve domatesi kavurun (3 dk).',
      'Yumurtaları kırıp üzerine dökün.',
      'Peyniri rendeleyin, üzerine serpin. Kapağı kapatın 3-4 dk.',
    ],
    tip: 'Döküm demir tava kamp için mükemmeldir; ısıyı eşit dağıtır. Peyniri önceden rendeleyip poşette saklamak pratiktir.',
  },
  {
    id: 5, name: 'Tandır Ekmek (Kamp Ekmeği)', cat: 'Ekmek', method: 'Tencere/Tava', time: 40, servings: 8, icon: '🍞',
    difficulty: 'Orta', accent: '#a855f7',
    ingredients: ['3 su bardağı un', '1 paket instant maya', '1 çay kaşığı tuz', '1 çay kaşığı şeker', '1 su bardağı ılık su', '2 yemek kaşığı zeytinyağı'],
    steps: [
      'Maya, şeker ve ılık suyu karıştırıp 5 dk bekletin.',
      'Un ve tuzu karıştırıp yavaşça maya karışımını ekleyin.',
      'Hamuru 8-10 dakika yoğurun, 20 dk dinlendirin.',
      'Küçük toplar yapıp yağlı tavada kapağı kapalı pişirin.',
      'Her yanda 8-10 dakika, altın rengi olana dek çevirin.',
    ],
    tip: 'Soğuk havalarda hamuru uyutmak için onu ceketin içine koyabilirsiniz. Düz tabanlı bir tencere de tava yerine geçer.',
  },
  {
    id: 6, name: 'Közde Mısır', cat: 'Atıştırmalık', method: 'Közde', time: 20, servings: 4, icon: '🌽',
    difficulty: 'Çok Kolay', accent: '#22c55e',
    ingredients: ['4 mısır koçanı', 'Tereyağı', 'Tuz', 'İsteğe bağlı: acı biber, kekik, limon'],
    steps: [
      'Mısırların dış yapraklarını soyun ama 2-3 kat bırakın.',
      'Mısırları 10 dakika soğuk suya yatırın.',
      'Sulu yapraklarıyla közün kenarına yerleştirin.',
      '15-20 dakika çevirerek pişirin.',
      'Yaprakları açıp tereyağı ve tuzla fırçalayın.',
    ],
    tip: 'Yapraklı pişirme mısırı kendi buharında pişirir. Tuzlu suyun içine 5 dakika bırakmak tatmı artırır.',
  },
];

const CATS = ['Tümü', 'Et', 'Sebze', 'Çorba', 'Kahvaltı', 'Ekmek', 'Atıştırmalık'];
const METHODS = ['Tümü', 'Közde', 'Mangal', 'Tencere', 'Tava', 'Tencere/Tava'];

function Card({ r, onClick }) {
  return (
    <div onClick={() => onClick(r)} style={{ background: '#1f2937', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: `1px solid ${r.accent}33`, cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 30 }}>{r.icon}</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{r.name}</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>🔥 {r.method} · ⏱️ {r.time}dk · 👥 {r.servings} kişi</div>
          </div>
        </div>
        <span style={{ fontSize: 10, background: r.accent + '22', color: r.accent, border: `1px solid ${r.accent}44`, borderRadius: 20, padding: '3px 8px', fontWeight: 600 }}>{r.difficulty}</span>
      </div>
    </div>
  );
}

function Detail({ r, onClose }) {
  const [tab, setTab] = useState('malzeme');
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000b', zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 40 }}>{r.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{r.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>🔥 {r.method} · ⏱️ {r.time}dk · 👥 {r.servings} kişi · {r.difficulty}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {['malzeme', 'yapilis'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, background: tab === t ? r.accent : '#374151', color: tab === t ? '#fff' : '#9ca3af',
              border: 'none', borderRadius: 10, padding: '10px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>{t === 'malzeme' ? '🛒 Malzemeler' : '👨‍🍳 Yapılış'}</button>
          ))}
        </div>

        {tab === 'malzeme' ? r.ingredients.map((ing, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #374151' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.accent, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#d1d5db' }}>{ing}</span>
          </div>
        )) : r.steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: r.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6, paddingTop: 4 }}>{step}</div>
          </div>
        ))}

        <div style={{ marginTop: 14, background: '#0c1f3f', borderRadius: 12, padding: '12px 14px', border: '1px solid #1e40af44' }}>
          <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>⛺ KAMP İPUCU</div>
          <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.6 }}>{r.tip}</div>
        </div>
      </div>
    </div>
  );
}

export default function CampingRecipes() {
  const navigate = useNavigate();
  const [cat, setCat] = useState('Tümü');
  const [selected, setSelected] = useState(null);

  const filtered = cat === 'Tümü' ? RECIPES : RECIPES.filter(r => r.cat === cat || r.method === cat);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⛺ Kamp Yemekleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ateş başı, mangal ve tencerede pratik kamp tarifleri</div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            background: cat === c ? '#84cc16' : '#1f2937', color: cat === c ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: cat === c ? '#84cc16' : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{c}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {filtered.map(r => <Card key={r.id} r={r} onClick={setSelected} />)}
      </div>

      {selected && <Detail r={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
