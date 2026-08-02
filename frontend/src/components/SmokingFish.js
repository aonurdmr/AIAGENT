import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  {
    id: 'hot', name: 'Sıcak Tütsüleme', icon: '🔥', accent: '#f97316',
    desc: '60-80 derece — hem pişirir hem korur',
    time: '2-4 saat',
    steps: [
      'Balık salamura: litre suya 100g tuz, 2 saat ıslatma',
      'Yıka ve 1 saat kurut — derisi kuruyunca tütsüye al',
      'Meşe veya elma ağacı talaşı — meyve talaşı daha hafif',
      'Tütsü kutusu 60 derece — derece ölçer şart',
      'İlk 30 dak duman yoğun — sonra kısılt, 2-3 saat daha',
      'Balık iç temp 62 derece — güvenli tüketim',
    ],
    store: '3-5 gün buzdolabı, 2 hafta vakumlu',
    tip: 'Alabalık ve sazan sıcak tütsülemeye en uygun.',
  },
  {
    id: 'cold', name: 'Soğuk Tütsüleme', icon: '❄️', accent: '#60a5fa',
    desc: '20-25 derece — uzun koruma, lüks lezzet',
    time: '12-24 saat',
    steps: [
      'Kuru salamura: balık üstüne bol tuz + şeker, 12-24 saat',
      'Yıka, 4-6 saat kurut — deri sertleşmeli',
      'Soğuk tütsü adaptörü veya ayrı kutu',
      'Duman sıcaklığı 20-25 derece tutulmalı',
      '12-24 saat tütsüle — somon için 24 saat ideal',
      'Renk koyulaşınca hazır — parlak turuncu/kırmızı',
    ],
    store: '1 hafta buzdolabı, 3 ay dondurucuda',
    tip: 'Soğuk tütsü somon için standart — ince dilimle servis.',
  },
  {
    id: 'salt', name: 'Tuzlama', icon: '🧂', accent: '#f59e0b',
    desc: 'Kuru veya salamurada koruma',
    time: '24-72 saat',
    steps: [
      'Kuru tuzlama: balığı tuz içinde 24 saat beklet',
      'Salamura: litre başına 200g tuz (doygun)',
      'Serin yerde veya buzdolabında tuzla',
      'Tuz eşit dağılsın — düz kap kullan, ağırlık koy',
      'Sonra yıka, kurut, tütsü veya direkt tüket',
      'Kalın balık (uskumru, levrek) 48-72 saat',
    ],
    store: '4-6 hafta serin ve karanlık yerde',
    tip: 'Enginar otu ile tuzlanan balık özel lezzet katar.',
  },
  {
    id: 'dry', name: 'Kurutma (Stockfish)', icon: '☀️', accent: '#22c55e',
    desc: 'Rüzgar ve hava ile doğal kurutma',
    time: '3-6 hafta',
    steps: [
      'Temizle, baş kes, kılçık bırak — bütün kurut',
      'Tuzla ve ipe as — rüzgarlı, gölge yer',
      'Sineğe karşı ince tül veya örgü',
      'Her 3 günde bir çevir — eşit kuruma',
      '3-6 hafta: dışı sert, içi kuru ama esnek',
      'Direkt ye veya su ile ıslatarak pişir',
    ],
    store: '6-12 ay kuru ve havadar yerde',
    tip: 'Mezgit, hamsi ve istavrit kurutmaya en uygun.',
  },
];

export default function SmokingFish() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('methods');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0c0700', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Balık Tütsüleme ve Koruma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Sıcak tütsü · soğuk tütsü · tuzlama · kurutma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['methods','Yöntemler'],['tips','İpuçları']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#1c1200', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'methods' && METHODS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#1c1200', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{m.desc}</div>
                  </div>
                  <div style={{ fontSize: 10, color: m.accent, fontWeight: 700 }}>{m.time}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1c1200', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: m.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {m.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>📦 Saklama: </span><span style={{ color: '#d1d5db' }}>{m.store}</span></div>
                  <div style={{ background: m.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {m.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'tips' && (
          <div style={{ background: '#1c1200', borderRadius: 14, padding: 14, border: '1px solid #f9731622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 12 }}>🔥 Genel İpuçları</div>
            {[
              { t: 'Talaş seçimi', d: 'Meşe = kuvvetli duman. Elma/kiraz = hafif-tatlı. Ceviz = acı-derin. Reçineli çam kullanma.' },
              { t: 'Nem dengesi', d: 'Talaşı biraz nemlendiri — kuru yanarsa aşırı ısınır, çok nemli ise sönebilir.' },
              { t: 'Hava sirkülasyonu', d: 'Tütsü içinde hava akımı şart — kapağı hafif ara, nem birikimi olmadan.' },
              { t: 'Gıda güvenliği', d: 'Sıcak tütsüde iç temp 62 derece, soğuk tütsüde salamura zorunlu.' },
              { t: 'Etiketleme', d: 'Tütsüleme tarihini yaz — buzdolabında karışmasın.' },
              { t: 'Vakumlama', d: 'Ev tipi vakum makinesi raf ömrünü 3 katına çıkarır.' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < 5 ? '1px solid #2c1d00' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fb923c', marginBottom: 2 }}>{item.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{item.d}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
