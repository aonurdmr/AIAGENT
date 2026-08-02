import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RECIPES = [
  {
    id: 1, name: 'Izgara Levrek', fish: 'Levrek', time: 25, difficulty: 'Kolay', servings: 2,
    icon: '🐟', accent: '#22c55e',
    tags: ['Izgara', 'Sağlıklı', 'Hızlı'],
    ingredients: [
      '2 adet taze levrek (500–600g)',
      '3 yemek kaşığı zeytinyağı',
      '1 limon (suyu ve kabuğu)',
      '3 diş sarımsak (ezilmiş)',
      '1 tutam taze kekik',
      'Tuz, karabiber',
      'Mevsim salatası için taze sebzeler',
    ],
    steps: [
      'Levreği temizleyip her iki yüzüne çapraz kesikler açın.',
      'Zeytinyağı, limon suyu, sarımsak, kekik, tuz ve karabiberi karıştırarak marine sosu hazırlayın.',
      'Balığı marine sosuna bulaştırıp 15 dakika bekletin.',
      'Izgarayı orta-yüksek ısıya getirin. Balığı her yüzde 6-8 dakika pişirin.',
      'İç sıcaklık 63°C\'ye ulaştığında hazırdır. Limon dilimleriyle servis edin.',
    ],
    tips: 'Taze levrek için en iyi yöntem. Yanında yoğurtlu sos ve yeşil salata harika eşleşir.',
    nutrition: { protein: '32g', fat: '14g', cal: '260 kcal' },
  },
  {
    id: 2, name: 'Hamsi Tava', fish: 'Hamsi', time: 20, difficulty: 'Kolay', servings: 4,
    icon: '🐠', accent: '#06b6d4',
    tags: ['Karadeniz', 'Geleneksel', 'Mısır Unu'],
    ingredients: [
      '500g taze hamsi (temizlenmiş)',
      '1 su bardağı mısır unu',
      '1 çay kaşığı tuz',
      'Kızartma yağı (bol miktarda)',
      'Taze limon',
      '2-3 sap taze maydanoz',
    ],
    steps: [
      'Hamsiyi iyice yıkayıp süzgece aktarın, hafifçe kurulayın.',
      'Mısır ununu tuz ile karıştırın.',
      'Hamsileri mısır ununa bulayın, fazlasını silkeleyin.',
      'Tavaya 2 cm yüksekliğinde yağ döküp 180°C\'ye getirin.',
      'Hamsileri yağda 2-3 dakika, altın rengi olana dek kızartın.',
      'Kağıt havluya alıp limon ve maydanozla servis edin.',
    ],
    tips: 'Mısır unu, buğday ununa göre çok daha çıtır sonuç verir. Karadeniz\'in geleneksel hamsisi ekim–mart arası en lezzetli dönemdedir.',
    nutrition: { protein: '24g', fat: '16g', cal: '280 kcal' },
  },
  {
    id: 3, name: 'Palamut Fırın', fish: 'Palamut', time: 40, difficulty: 'Orta', servings: 4,
    icon: '🐡', accent: '#f59e0b',
    tags: ['Fırın', 'Sebzeli', 'Sonbahar'],
    ingredients: [
      '1 palamut (1–1.5 kg, porsiyonlanmış)',
      '2 domates (dilimlenmiş)',
      '2 soğan (halka halka)',
      '1 dolmalık biber (ince şeritler)',
      '4 yemek kaşığı zeytinyağı',
      '1 çay bardağı beyaz şarap veya limon suyu',
      'Tuz, karabiber, kırmızı pul biber',
      'Defne yaprağı, taze kekik',
    ],
    steps: [
      'Fırını 200°C\'ye önceden ısıtın.',
      'Fırın kabının tabanına soğan ve domates dilimlerini yayın.',
      'Palamut parçalarını üzerine yerleştirin, tuz ve baharatları gezdirin.',
      'Biber şeritlerini ve defne yapraklarını ekleyin.',
      'Zeytinyağı ve limon suyunu gezdirip 30-35 dakika fırında pişirin.',
      'Son 5 dakikada üstü kızarıncaya dek ızgara konumuna alabilirsiniz.',
    ],
    tips: 'Ekim–kasım aylarında Boğaz palamutları en yağlı dönemindedir. Fırın yöntemi omega-3\'leri korumanın en iyi yoludur.',
    nutrition: { protein: '28g', fat: '18g', cal: '300 kcal' },
  },
  {
    id: 4, name: 'Çipura Limonlu Buharda', fish: 'Çipura', time: 30, difficulty: 'Orta', servings: 2,
    icon: '🐟', accent: '#818cf8',
    tags: ['Buharda', 'Sağlıklı', 'Diyet'],
    ingredients: [
      '2 taze çipura (400–500g)',
      '2 limon (ince dilimler)',
      '1 tutam dereotu',
      '2 dal taze kekik',
      '3 diş sarımsak (dilimlenmiş)',
      'Tuz, beyaz biber',
      '2 yemek kaşığı zeytinyağı (servis için)',
    ],
    steps: [
      'Çipuraları temizleyip içlerini tuz ve biber ile doldurun.',
      'Limon dilimlerini, dereotunu ve sarımsağı balığın içine yerleştirin.',
      'Buharlı pişirme kabına yerleştirip üzerine kekik dallarını koyun.',
      'Kaynayan suyun üzerinde 18-22 dakika buharda pişirin.',
      'Servis tabağına alıp zeytinyağı ve taze limon sıkarak sunun.',
    ],
    tips: 'Buharda pişirme çipuranın narin dokusunu en iyi koruyan yöntemdir. Kalori bilinçli olanlar için ideal; yanında buharda brokoli harika eşleşir.',
    nutrition: { protein: '30g', fat: '10g', cal: '215 kcal' },
  },
  {
    id: 5, name: 'Yayın Balığı Güveç', fish: 'Yayın', time: 70, difficulty: 'Orta-Zor', servings: 6,
    icon: '🐟', accent: '#84cc16',
    tags: ['Güveç', 'Kışlık', 'Uzun Süre'],
    ingredients: [
      '1 kg yayın balığı (porsiyonlanmış)',
      '3 soğan (küp doğranmış)',
      '4 domates (rendelenmiş)',
      '2 yeşil biber, 1 kırmızı biber',
      '1 baş sarımsak',
      '4 yemek kaşığı zeytinyağı',
      'Tuz, karabiber, kimyon, kırmızı pul biber',
      '1 su bardağı sıcak su',
      'Taze maydanoz (servis için)',
    ],
    steps: [
      'Yayın balığı parçalarını tuzlayıp 30 dakika dinlendirin, ardından durulayın.',
      'Geniş bir güvecte zeytinyağını ısıtın, soğan ve sarımsağı soteleyin.',
      'Rendelenmiş domatesi ekleyip 10 dakika pişirin.',
      'Balık parçalarını güvece yerleştirin, baharatları gezdirin.',
      'Biber halkalarını üzerine ekleyip sıcak suyu dökün.',
      'Güveci kapatıp 45-50 dakika kısık ateşte pişirin.',
      'Taze maydanozla süsleyip servis edin.',
    ],
    tips: 'Yayın balığı çamur kokusu alabilir; 1 su bardağı süte 20 dakika bekletmek etkili bir çözümdür. Sazan ile aynı yöntem uygulanabilir.',
    nutrition: { protein: '26g', fat: '12g', cal: '240 kcal' },
  },
  {
    id: 6, name: 'Alabalık Kağıt Paket', fish: 'Alabalık', time: 35, difficulty: 'Kolay', servings: 2,
    icon: '🌊', accent: '#06b6d4',
    tags: ['Kağıt Paket', 'Doğa', 'Kamp Yemeği'],
    ingredients: [
      '2 adet taze alabalık (300–400g)',
      '1 limon (ince dilimler)',
      '2 dal biberiye',
      '4 diş sarımsak',
      '2 yemek kaşığı tereyağı',
      'Tuz, karabiber',
      'Yeterli alüminyum folyo veya pişirme kağıdı',
    ],
    steps: [
      'Alabalıkları temizleyip her yüzüne hafifçe çizikler açın.',
      'Geniş bir folyo parçasına balığı yerleştirin.',
      'Limon dilimleri, biberiye, sarımsak ve tereyağı parçalarını içine ve üstüne koyun.',
      'Folyo paketini sıkıca kapatıp hiç açıklık bırakmayın.',
      '200°C fırında 25 dakika veya mangal közünde 20 dakika pişirin.',
      'Paketi açarken buhara dikkat edin. Doğrudan paketten yenebilir.',
    ],
    tips: 'Kamp ateşi veya mangal için ideal. Alabalık tutulduktan sonra en taze şekilde bu yöntemle pişirilir. Paket içindeki buhar balığı kendi suyunda pişirir.',
    nutrition: { protein: '28g', fat: '14g', cal: '250 kcal' },
  },
];

const DIFF_COLOR = { 'Kolay': '#22c55e', 'Orta': '#f59e0b', 'Orta-Zor': '#f97316', 'Zor': '#ef4444' };
const TAGS_COLOR = { 'Izgara': '#22c55e', 'Buharda': '#06b6d4', 'Fırın': '#f59e0b', 'Güveç': '#84cc16', 'Karadeniz': '#3b82f6', 'Diyet': '#a855f7', 'Kamp Yemeği': '#84cc16' };

function RecipeCard({ r, onClick }) {
  return (
    <div onClick={() => onClick(r)} style={{ background: '#1f2937', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: `1px solid ${r.accent}33`, cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>{r.icon}</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{r.name}</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>🐟 {r.fish} · {r.servings} kişilik</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: DIFF_COLOR[r.difficulty] || '#9ca3af' }}>{r.difficulty}</div>
          <div style={{ fontSize: 11, color: '#6b7280' }}>⏱️ {r.time}dk</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {r.tags.map(t => (
          <span key={t} style={{ fontSize: 10, background: (TAGS_COLOR[t] || '#6b7280') + '22', color: TAGS_COLOR[t] || '#9ca3af', borderRadius: 8, padding: '2px 8px', border: `1px solid ${(TAGS_COLOR[t] || '#6b7280')}44` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function RecipeDetail({ r, onClose }) {
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
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 11, color: '#6b7280' }}>⏱️ {r.time}dk</span>
              <span style={{ fontSize: 11, color: '#6b7280' }}>👥 {r.servings} kişi</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: DIFF_COLOR[r.difficulty] }}>{r.difficulty}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'Protein', value: r.nutrition.protein, icon: '💪' },
            { label: 'Yağ', value: r.nutrition.fat, icon: '🫒' },
            { label: 'Kalori', value: r.nutrition.cal, icon: '🔥' },
          ].map(n => (
            <div key={n.label} style={{ background: '#374151', borderRadius: 10, padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: 14 }}>{n.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{n.value}</div>
              <div style={{ fontSize: 9, color: '#6b7280' }}>{n.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {['malzeme', 'yapilis'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, background: tab === t ? r.accent : '#374151', color: tab === t ? '#fff' : '#9ca3af',
              border: 'none', borderRadius: 10, padding: '10px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>{t === 'malzeme' ? '🛒 Malzemeler' : '👨‍🍳 Yapılış'}</button>
          ))}
        </div>

        {tab === 'malzeme' ? (
          <div>
            {r.ingredients.map((ing, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #374151' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.accent, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#d1d5db' }}>{ing}</span>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {r.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: r.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6, paddingTop: 4 }}>{step}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 14, background: '#0c1f3f', borderRadius: 12, padding: '12px 14px', border: '1px solid #1e40af44' }}>
          <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>💡 ŞEFTEN İPUCU</div>
          <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.6 }}>{r.tips}</div>
        </div>
      </div>
    </div>
  );
}

const FISH_FILTER = ['Tümü', 'Levrek', 'Hamsi', 'Palamut', 'Çipura', 'Yayın', 'Alabalık'];

export default function FishRecipes() {
  const navigate = useNavigate();
  const [fishFilter, setFishFilter] = useState('Tümü');
  const [selected, setSelected] = useState(null);

  const filtered = fishFilter === 'Tümü' ? RECIPES : RECIPES.filter(r => r.fish === fishFilter);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍳 Balık Tarifleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          6 detaylı tarif · malzeme listesi · adım adım yapılış · besin değerleri
        </div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {FISH_FILTER.map(f => (
          <button key={f} onClick={() => setFishFilter(f)} style={{
            background: fishFilter === f ? '#ef4444' : '#1f2937',
            color: fishFilter === f ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: fishFilter === f ? '#ef4444' : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{f}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} tarif</div>
        {filtered.map(r => <RecipeCard key={r.id} r={r} onClick={setSelected} />)}
      </div>

      {selected && <RecipeDetail r={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
