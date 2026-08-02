import React, { useState } from 'react';

const METHODS = ['Tümü', 'Izgara', 'Fırın', 'Tava', 'Buğulama', 'Çorba'];
const DIFFICULTY = { 'Kolay': '#22c55e', 'Orta': '#f59e0b', 'Zor': '#ef4444' };

const RECIPES = [
  {
    id: 'levrek-izgara',
    name: 'Izgara Levrek',
    species: 'levrek',
    method: 'Izgara',
    difficulty: 'Kolay',
    time: 25,
    servings: 2,
    calories: 280,
    icon: '🐟',
    image: '🔥',
    tags: ['az-yağ','hızlı','sağlıklı'],
    ingredients: [
      '2 adet levrek (500-600g)',
      '3 yemek kaşığı zeytinyağı',
      '1 limon (dilimlenmiş)',
      '4 diş sarımsak',
      '1 demet maydanoz',
      'Tuz, karabiber, kekik',
    ],
    steps: [
      'Levreği pullarından arındırın ve içini temizleyin',
      'Her iki yanını çapraz olarak bıçakla kesin (marinade için)',
      'Zeytinyağı, sarımsak, tuz ve kekiği karıştırın',
      'Balıkları bu karışımla ovalayın, 15 dk bekletin',
      'Izgarayı yüksek ısıda ısıtın (200°C)',
      'Her iki yandan 6-7 dakika pişirin',
      'Limon ve maydanozla servis yapın',
    ],
    tip: '💡 Balık derisinin yapışmaması için ızgarayı iyice yağlayın',
  },
  {
    id: 'sazan-burada',
    name: 'Sazan Burada',
    species: 'sazan',
    method: 'Fırın',
    difficulty: 'Kolay',
    time: 50,
    servings: 4,
    calories: 320,
    icon: '🐠',
    image: '🫙',
    tags: ['ev-yemeği','soğan','domates'],
    ingredients: [
      '1 büyük sazan (1.5-2 kg)',
      '3 büyük soğan (halkalar)',
      '4 domates (dilimlenmiş)',
      '3 biber (yeşil)',
      '1 çay bardağı zeytinyağı',
      '1 demet maydanoz',
      'Tuz, karabiber, kimyon',
    ],
    steps: [
      'Sazanı temizleyip pullarını soyun',
      'Tuz ve baharatlarla içini ve dışını iyice ovun',
      'Fırın kabına soğanları yayın',
      'Balığı üstüne koyun',
      'Domates ve biberleri etrafına dizin',
      'Zeytinyağı ve maydanozu ekleyin',
      '180°C fırında 40-45 dakika pişirin',
    ],
    tip: '💡 Üstü kızarınca folyo koyarsanız içi daha sulu kalır',
  },
  {
    id: 'alabalik-tava',
    name: 'Tereyağlı Alabalık',
    species: 'alabalik',
    method: 'Tava',
    difficulty: 'Kolay',
    time: 20,
    servings: 2,
    calories: 380,
    icon: '🐡',
    image: '🧈',
    tags: ['tereyağı','hızlı','klasik'],
    ingredients: [
      '2 alabalık (300-350g her biri)',
      '50g tereyağı',
      '2 diş sarımsak',
      '1 limon',
      '1 çay kaşığı un (isteğe bağlı)',
      'Tuz, karabiber, tarhun',
    ],
    steps: [
      'Alabalıkları yıkayın ve kurulayın',
      'Hafifçe una bulayın (isteğe bağlı, daha gevrek olur)',
      'Tavada tereyağını eritin, yüksek ateş',
      'Balıkları her iki yandan 4-5 dakika pişirin',
      'Sarımsak ve tarhunu ekleyip 1 dakika daha pişirin',
      'Limon sıkarak servis yapın',
    ],
    tip: '💡 Tereyağı kızarınca (beurre noisette) fındık aroması verir — mükemmel!',
  },
  {
    id: 'cipura-kagit',
    name: 'Kağıtta Çipura',
    species: 'cipura',
    method: 'Fırın',
    difficulty: 'Orta',
    time: 35,
    servings: 2,
    calories: 260,
    icon: '🐡',
    image: '📄',
    tags: ['sağlıklı','aromalı','pratik'],
    ingredients: [
      '2 çipura (350-400g)',
      '2 domates',
      '1 kereviz sapı',
      '2 defne yaprağı',
      '4 yemek kaşığı beyaz şarap veya limon suyu',
      '2 yemek kaşığı zeytinyağı',
      'Tuz, karabiber, dereotu',
    ],
    steps: [
      'Fırın kağıdını büyük kesin, katın (tente şeklinde)',
      'Balığı tuzlayıp üstüne sebzeleri koyun',
      'Dereotu, defne yaprağı ekleyin',
      'Limon suyu ve zeytinyağı dökün',
      'Kağıdı kapatıp kenarlardan kıvırın (hava çıkmasın)',
      '200°C fırında 25-28 dakika pişirin',
      'Kağıdı masada açın, buharlı aroma çıksın',
    ],
    tip: '💡 Kağıt şişer ise pişme başlamıştır — dikkatli açın, buhara dikkat!',
  },
  {
    id: 'balik-corbasi',
    name: 'Balık Çorbası',
    species: 'karma',
    method: 'Çorba',
    difficulty: 'Orta',
    time: 60,
    servings: 6,
    calories: 180,
    icon: '🍲',
    image: '🥣',
    tags: ['kış','sıcak','besleyici'],
    ingredients: [
      '500g balık (levrek, sazan veya karma)',
      '2 patates (küçük parça)',
      '2 havuç',
      '1 soğan',
      '1 kereviz kökü',
      '3 yemek kaşığı zeytinyağı',
      '2 yemek kaşığı un',
      '1 yumurta sarısı',
      '1 limon suyu',
      'Tuz, karabiber, maydanoz',
    ],
    steps: [
      'Balıkları tuzlu suda haşlayın (20 dk)',
      'Balıkları çıkartın, kılçıklardan ayırın',
      'Haşlama suyunu süzün (bu et suyu olacak)',
      'Sebzeleri bu suda haşlayın',
      'Zeytinyağında unu kavurun (hafif renk alınca)',
      'Et suyunu yavaşça ekleyin, karıştırarak pişirin',
      'Sebze ve balık etini ekleyin',
      'Yumurta sarısı + limon karıştırın, karışımdan bir kaşık alıp yumurtaya ekleyin (temperleme)',
      'Bu karışımı çorbaya yavaşça ekleyin, 2 dk daha pişirin',
    ],
    tip: '💡 Temperleme adımı çok önemli — yumurtayı pıhtılaştırmadan koyun',
  },
  {
    id: 'levrek-buğulama',
    name: 'Sebzeli Levrek Buğulama',
    species: 'levrek',
    method: 'Buğulama',
    difficulty: 'Kolay',
    time: 30,
    servings: 3,
    calories: 220,
    icon: '🐟',
    image: '💨',
    tags: ['diyet','sebzeli','hafif'],
    ingredients: [
      '1 levrek (800g-1kg)',
      '1 havuç (julyen)',
      '1 kabak (julyen)',
      '1 biber (julyen)',
      '4 yemek kaşığı soya sosu',
      '2 yemek kaşığı susam yağı',
      '2 cm taze zencefil',
      '2 yeşil soğan',
    ],
    steps: [
      'Levreği hazırlayın, üstünü bıçakla çizin',
      'Bir tabağa balığı koyun, üstüne sebzeleri yayın',
      'Soya sosu, susam yağı ve zencefil karıştırın',
      'Balık üzerine dökün',
      'Büyük tencerede su kaynatın',
      'Tabağı tencerenin içine oturtun (buharın üstü)',
      '15-18 dakika kapak kapalı pişirin',
      'Doğranmış yeşil soğanla servis yapın',
    ],
    tip: '💡 Asya usulü buğulama — minimum yağ, maksimum lezzet!',
  },
  {
    id: 'alabalik-firinda',
    name: 'Fırında Alabalık Sarması',
    species: 'alabalik',
    method: 'Fırın',
    difficulty: 'Orta',
    time: 40,
    servings: 2,
    calories: 340,
    icon: '🐡',
    image: '🌿',
    tags: ['dereotu','peynir','özel'],
    ingredients: [
      '2 alabalık (350g)',
      '100g krem peynir',
      '1 demet dereotu',
      '1 limon kabuğu rendesi',
      '50g ceviz (kıyılmış)',
      '2 yemek kaşığı zeytinyağı',
      'Tuz, karabiber',
    ],
    steps: [
      'Alabalıkları içini boşaltın',
      'Krem peynir, dereotu, limon kabuğu ve cevizi karıştırın',
      'Bu karışımı balıkların içine doldurun',
      'Kürdanla veya sicimle kapatın',
      'Zeytinyağı ile yağlayın',
      '190°C fırında 25-30 dakika pişirin',
      'İstenirse limon dilimleriyle servis yapın',
    ],
    tip: '💡 Krem peynir dolgu içini nemli tutar, kuru pişmez',
  },
  {
    id: 'turna-kofte',
    name: 'Turna Köftesi',
    species: 'turna',
    method: 'Tava',
    difficulty: 'Orta',
    time: 45,
    servings: 4,
    calories: 290,
    icon: '🐟',
    image: '🧅',
    tags: ['köfte','turna','pratik'],
    ingredients: [
      '600g turna eti (kılçıksız, kıyılmış)',
      '1 soğan (rendelenmiş)',
      '2 dilim bayat ekmek (ıslatılmış)',
      '1 yumurta',
      '1 demet maydanoz',
      'Tuz, karabiber, kimyon',
      'Ekmek kırıntısı (kaplama için)',
    ],
    steps: [
      'Turna etini mutfak robotunda çekin',
      'Soğan, ıslatılmış ekmek, yumurta ve maydanozu ekleyin',
      'Baharatları ekleyip iyice yoğurun',
      'Köfte şekline getirin',
      'Ekmek kırıntısına bulayın',
      'Kızgın yağda her iki yandan 4-5 dakika kızartın',
      'Kağıt havlu üzerinde yağı süzün',
    ],
    tip: '💡 Turna kılçıklıdır — çok ince çekimi veya bıçakla ezmeyi tercih edin',
  },
  {
    id: 'sazan-harikası',
    name: 'Ekşili Sazan',
    species: 'sazan',
    method: 'Tava',
    difficulty: 'Zor',
    time: 55,
    servings: 4,
    calories: 420,
    icon: '🐠',
    image: '🍅',
    tags: ['ekşili','domates','geleneksel'],
    ingredients: [
      '1 sazan (1-1.5 kg, dilimler)',
      '3 domates (rendelenmiş)',
      '1 soğan',
      '2 çorba kaşığı sirke',
      '1 çay kaşığı şeker',
      '3 yemek kaşığı zeytinyağı',
      'Tuz, karabiber, nane',
    ],
    steps: [
      'Sazan dilimlerini tuzlayın, 10 dk bekletin',
      'Tavada zeytinyağında her iki yandan kızartın',
      'Balıkları çıkartın, aynı tavada soğanı kavurun',
      'Rendelenmiş domates ekleyin, 5 dk pişirin',
      'Sirke, şeker ve baharatları ekleyin',
      'Kızarmış balıkları tekrar ekleyin',
      'Orta ateşte 15-20 dk daha pişirin',
    ],
    tip: '💡 Sirkeli sos sazan kokusunu nötralize eder, daha hafif lezzet verir',
  },
];

function RecipeCard({ recipe, onOpen }) {
  const dc = DIFFICULTY[recipe.difficulty];
  return (
    <div onClick={() => onOpen(recipe)} style={{
      background: 'var(--s2)', border: '1px solid var(--border)',
      borderRadius: 16, padding: 14, marginBottom: 8, cursor: 'pointer',
      transition: 'border-color .2s', display: 'flex', gap: 14, alignItems: 'flex-start',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14, flexShrink: 0,
        background: 'var(--s3)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
      }}>{recipe.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 4 }}>{recipe.name}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: dc, background: dc+'15',
            borderRadius: 6, padding: '2px 7px',
          }}>{recipe.difficulty}</span>
          <span style={{ fontSize: 10, color: 'var(--t-mute)' }}>⏱ {recipe.time} dk</span>
          <span style={{ fontSize: 10, color: 'var(--t-mute)' }}>👤 {recipe.servings} kişi</span>
          <span style={{ fontSize: 10, color: '#ef4444' }}>🔥 {recipe.calories} kal</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--t-mute)' }}>
          {recipe.method} · {recipe.ingredients.length} malzeme
        </div>
      </div>
      <div style={{ fontSize: 14, color: 'var(--t-mute)', flexShrink: 0 }}>›</div>
    </div>
  );
}

function RecipeDetail({ recipe, onClose }) {
  const dc = DIFFICULTY[recipe.difficulty];
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 100,
      display: 'flex', alignItems: 'flex-end',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg)', borderRadius: '20px 20px 0 0', width: '100%',
        maxHeight: '85vh', overflowY: 'auto', padding: 20,
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>{recipe.name}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: dc, background: dc+'15', borderRadius: 6, padding: '2px 7px' }}>{recipe.difficulty}</span>
              <span style={{ fontSize: 11, color: 'var(--t-mute)' }}>⏱ {recipe.time} dk</span>
              <span style={{ fontSize: 11, color: 'var(--t-mute)' }}>👤 {recipe.servings} kişi</span>
              <span style={{ fontSize: 11, color: '#ef4444' }}>🔥 {recipe.calories} kal</span>
              <span style={{ fontSize: 11, color: '#38bdf8' }}>🍳 {recipe.method}</span>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'var(--s3)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '4px 10px', color: 'var(--t-mute)', cursor: 'pointer', fontSize: 14,
          }}>✕</button>
        </div>

        {/* Ingredients */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 8 }}>
            🥕 MALZEMELER ({recipe.ingredients.length})
          </div>
          <div style={{
            background: 'var(--s2)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '10px 14px',
          }}>
            {recipe.ingredients.map((ing, i) => (
              <div key={i} style={{
                fontSize: 13, color: 'var(--t-mid)', padding: '5px 0',
                borderBottom: i < recipe.ingredients.length-1 ? '1px solid var(--border)' : 'none',
              }}>
                · {ing}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 8 }}>
            👨‍🍳 ADIMLAR
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recipe.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  background: '#22c55e20', border: '1px solid #22c55e40',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: '#22c55e',
                }}>{i+1}</div>
                <div style={{ fontSize: 13, color: 'var(--t-mid)', lineHeight: 1.5, paddingTop: 3 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div style={{
          background: '#f59e0b10', border: '1px solid #f59e0b30',
          borderRadius: 12, padding: '10px 14px', marginBottom: 20,
          fontSize: 12, color: '#fbbf24', lineHeight: 1.5,
        }}>{recipe.tip}</div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {recipe.tags.map(t => (
            <span key={t} style={{
              fontSize: 10, color: 'var(--t-mute)', background: 'var(--s3)',
              borderRadius: 6, padding: '2px 8px', border: '1px solid var(--border)',
            }}>#{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RecipeBook() {
  const [method, setMethod] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = RECIPES.filter(r =>
    (method === 'Tümü' || r.method === method) &&
    (!search || r.name.toLowerCase().includes(search.toLowerCase()) || r.species.includes(search.toLowerCase()))
  );

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #1a0500 0%, #2d0a00 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🍳 Balık Tarifleri</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Avladığın balığı en güzel şekilde pişir</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Search */}
        <input
          className="input-field"
          placeholder="Tarif veya balık türü ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        {/* Method filter */}
        <div style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 2, marginBottom: 14 }}>
          {METHODS.map(m => (
            <button key={m} onClick={() => setMethod(m)} style={{
              flexShrink: 0, padding: '6px 12px', borderRadius: 16, cursor: 'pointer',
              background: method === m ? 'var(--a-glow)' : 'var(--s2)',
              border: method === m ? '1px solid var(--border-lg)' : '1px solid var(--border)',
              color: method === m ? 'var(--a-light)' : 'var(--t-mute)',
              fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
            }}>{m}</button>
          ))}
        </div>

        {/* Count */}
        <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 10 }}>
          {filtered.length} tarif
        </div>

        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
          {[
            ['🍳', RECIPES.length, 'Tarif'],
            ['⏱', Math.min(...RECIPES.map(r=>r.time))+'dk', 'En Hızlı'],
            ['🔥', Math.min(...RECIPES.map(r=>r.calories)), 'Min Kal'],
          ].map(([icon, val, label]) => (
            <div key={label} style={{
              background: 'var(--s2)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '10px 8px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{icon}</div>
              <div style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>{val}</div>
              <div style={{ fontSize: 9, color: 'var(--t-mute)', marginTop: 1 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Recipe list */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--t-mute)' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🍳</div>
            <div>Tarif bulunamadı</div>
          </div>
        ) : (
          filtered.map(r => <RecipeCard key={r.id} recipe={r} onOpen={setSelected} />)
        )}

        <div style={{ height: 20 }} />
      </div>

      {selected && <RecipeDetail recipe={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
