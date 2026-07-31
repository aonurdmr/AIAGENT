import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  {
    id: 'campfire', name: 'Açık Ateş Üzeri', icon: '🔥', accent: '#ef4444',
    desc: 'En ilkel yöntem. Dalları ve kömürü iyi ısıtın, alevden kaçının — kömür üzeri ısıyı kullanın.',
    setup: ['Kuru odun: meşe, kayın, elma (çam vermez)', 'Alevden kaçın, köz aşamasını bekleyin (20–30dk)', 'Izgarayı kor üzerine koyun, el 3 saniye tutabiliyorsa doğru ısı'],
    foods: ['Balık (folyo veya ızgara)', 'Et şiş', 'Patates (küle göm)', 'Mısır (kavurgasıyla birlikte köze göm)'],
    tip: 'Balığı temizleyip içine limon, dereotu koy, folyo ile sar. 12–15dk her yüz.',
  },
  {
    id: 'dutch', name: 'Dutch Oven (Kamp Tenceresi)', icon: '🫕', accent: '#f97316',
    desc: 'Döküm demir tencere. Üste ve alta kor koyarak fırın etkisi yaratır.',
    setup: ['Tencerenin altına 8–10 kor', 'Üst kapağa 12–15 kor', 'Sıcaklık 175°C civarı — ekmek pişer'],
    foods: ['Yaban otu çorbası', 'Et yahni', 'Kamp ekmeği', 'Meyve cobbler'],
    tip: 'Her 15 dakikada bir kapağı çevirtin — eşit pişirme sağlar.',
  },
  {
    id: 'stick', name: 'Çubuk Kızartma', icon: '🥩', accent: '#f59e0b',
    desc: 'Uzun, temiz dal veya çelik çubukla ateş üzerinde kızartma. En basit yöntem.',
    setup: ['Çubuğu ısıya dayanıklı yeşil daldan seçin', 'Dalı yıkayın / soyun', 'Açık aleve yakın, döndürerek pişirin'],
    foods: ['Ekmek hamuru (twisted bread)', 'Sosis, köfte', 'Marshmallow (tatlı)'],
    tip: 'Fındık büyüklüğünde hamur parçasını çubuğa sarın, döndürerek pişirin. 5 dakika.',
  },
  {
    id: 'coal', name: 'Külde / Közde Pişirme', icon: '🌽', accent: '#a78bfa',
    desc: 'Yiyeceği doğrudan külün veya közün içine gömmek. Muhteşem lezzet.',
    setup: ['Ateşin yeterince kömürlenmesini bekleyin', 'Yiyeceği yıkayın, ısıya dayanıklı yaprak / folyo ile sarmak isteğe bağlı', 'Közün içine göm, üstüne kor koy'],
    foods: ['Patates (tam)', 'Soğan', 'Kestane (haçlı kesiyle)', 'Mısır (kabuğuyla)'],
    tip: 'Patates 40–50 dakika. Kürdan test: kolayca giriyorsa hazır.',
  },
  {
    id: 'grill_stone', name: 'Taş Izgara', icon: '🪨', accent: '#10b981',
    desc: 'Düz, büyük taşları kor üzerinde ısıtarak doğal ızgara oluşturma.',
    setup: ['Büyük, düz granit veya bazalt taşlar (çakıl veya kum taşı kullanmayın — patlayabilir)', 'Taşları 30 dakika kor üzerinde ısıtın', 'Hafif yağlayın'],
    foods: ['İnce balık fileto', 'Gözleme / yufka', 'Sebze'],
    tip: 'Su damlatınca hemen buharlaşıyorsa taş hazır.',
  },
];

const RECIPES = [
  {
    name: 'Kamp Çipura', icon: '🐠', time: '20dk', method: 'Folyo + Ateş',
    ingredients: ['1 çipura', 'Limon', 'Kekik', 'Sarımsak', 'Zeytinyağı', 'Tuz'],
    steps: ['Balığı temizle, içini yıka', 'Limon dilimi + kekik + sarımsak içine koy', 'Zeytinyağı gezdir, tuzla', 'Folyo ile sıkıca sar', '15dk köz üzerinde, 7dk her yüz'],
  },
  {
    name: 'Kamp Patates', icon: '🥔', time: '45dk', method: 'Kül pişirme',
    ingredients: ['2 büyük patates', 'Yağ/tereyağı', 'Kekik', 'Tuz'],
    steps: ['Patatesi yıka', 'Çatalla delik aç (buhar çıksın)', 'Folyo ile sar veya direkt göm', 'Közün içine 40–45 dk', 'İkiye kes, yağ ve tuz ile servis et'],
  },
  {
    name: 'Kamp Çorbası', icon: '🍲', time: '30dk', method: 'Dutch oven / tencere',
    ingredients: ['Su', 'Kuru et / konserve', 'Soğan', 'Patates', 'Havuç', 'Baharat'],
    steps: ['Sebzeleri küp doğra', 'Tencereye yağ — soğan kavur', 'Sebze ve et ekle', 'Su ekle, kaynat', '20–25dk pişir, baharatlayıp servis et'],
  },
  {
    name: 'Twisted Kamp Ekmeği', icon: '🍞', time: '10dk', method: 'Çubuk kızartma',
    ingredients: ['Un', 'Su', 'Tuz', 'Kabartma tozu'],
    steps: ['Un + tuz + kabartma tozu karıştır', 'Su ekle — sert hamur yap', 'Parmak kalınlığında uzat', 'Çubuğa sar, döndürerek pişir', '5–7 dk altın rengi olana kadar'],
  },
];

export default function OutdoorCooking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('methods');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍳 Kamp Pişirme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Açık hava pişirme yöntemleri & kamp tarifleri</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['methods', '🔥 Yöntemler'], ['recipes', '📋 Tarifler']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#ef4444' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#ef4444' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'methods' && METHODS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{m.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{m.desc}</div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🔧 KURULUM</div>
                    {m.setup.map((s, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3, display: 'flex', gap: 8 }}>
                        <span style={{ color: m.accent, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {s}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🍽️ NE PİŞİRİR?</div>
                    {m.foods.map(f => <div key={f} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2, display: 'flex', gap: 6 }}><span style={{ color: m.accent }}>•</span>{f}</div>)}
                  </div>
                  <div style={{ background: m.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: m.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{m.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'recipes' && RECIPES.map(r => {
          const open = sel === r.name;
          return (
            <div key={r.name} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.name)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: '1px solid #374151', cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>⏱️ {r.time} · {r.method}</div>
                    </div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: '1px solid #374151', borderTop: 'none' }}>
                  <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🛒 MALZEMELER</div>
                      {r.ingredients.map(ing => <div key={ing} style={{ fontSize: 11, color: '#d1d5db', marginBottom: 2 }}>• {ing}</div>)}
                    </div>
                    <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>📋 YAPILIŞI</div>
                      {r.steps.map((s, i) => <div key={i} style={{ fontSize: 11, color: '#d1d5db', marginBottom: 3 }}>{i + 1}. {s}</div>)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
