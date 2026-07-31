import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TECHNIQUES = [
  {
    id: 'clean', name: 'Temizleme & Fileto', icon: '🔪', accent: '#3b82f6',
    desc: 'Avladığın balığın en iyi pişmesi için doğru temizleme ve fileto tekniği kritiktir.',
    steps: [
      'Balığı başından kuyruğuna doğru pulları kazı (suyun altında)',
      'Karın bölgesini ağız dan anüse dek kes, iç organları temizle',
      'Solungaçları çıkar — acılık yapar, aceleyle bırakma',
      'Fileto: Sırt yüzgecinın hemen yanından kılçığa paralel bıçak sok',
      'Derisiz fileto için bıçağı deride kaydır, eti deriden ayır',
    ],
    tip: 'Taze balık avlandıktan sonra ilk 2 saatte temizlenirse lezzeti en üst seviyede kalır.',
  },
  {
    id: 'grill', name: 'Izgara & Mangal', icon: '🔥', accent: '#ef4444',
    desc: 'Basit ve lezzetli. Taze balık için en doğal pişirme yöntemi.',
    steps: [
      'Balığı içten ve dıştan iyice kurula — nem buhar yapar, lezzeti kaçar',
      'Izgarayı yağla ve iyice ısıt (200°C+ orta-yüksek ateş)',
      'Balığı sadece bir kez çevir — üst yüzey rengi değişince çevir',
      'Çipura/levrek 4-5 cm kalınlıkta: her yüz 4-5 dakika',
      'Hazır testi: çatal ile itin, et pul pul ayrılıyorsa hazır',
    ],
    tip: 'Balığı folyo içinde ızgaralamak nem tutar ama kızarma olmaz. İkisini kombine et: önce folio, son 2dk açık.',
  },
  {
    id: 'pan', name: 'Tavada Kızartma', icon: '🍳', accent: '#f59e0b',
    desc: 'Fileto ve küçük balıklar için ideal. Gevrek dış, sulu iç doku.',
    steps: [
      'Balığı un veya mısır unu ile kapla (nem emmez, kızarma artar)',
      'Tavayı orta-yüksek ısıda ısıt, zeytinyağı veya tereyağı ekle',
      'Derisini alta al ilk pişirmede — deri yapışmayı önler',
      '2-3 dk kızar — çevirince 1-2 dk yeterli',
      'Kağıt havlu üzerine al, sarımsaklı tereyağı gezdir',
    ],
    tip: 'Tavada pişirirken biraz limon suyu sıkılı su eklersen buhar artar, iç doku daha nemli olur.',
  },
  {
    id: 'oven', name: 'Fırında Pişirme', icon: '♨️', accent: '#10b981',
    desc: 'Büyük balıklar için. Eşit ve derin pişirme. Hazırlık sonrası elleri serbest bırakır.',
    steps: [
      'Fırını 200°C\'e ısıt (fan destekli varsa 180°C)',
      'Balığı yağlanmış fırın kabına diz, içine limon+ot koy',
      'Üstüne zeytinyağı gezdirip tuzla',
      '1 kg balık: 20-25 dakika · 500 g: 15 dakika',
      'Son 5 dakika ızgara moduna al — deri çıtırlaşır',
    ],
    tip: 'Folyoya sar (en papillote) — lezzet ve nem tamamen içeride kalır. 185°C de 25 dk mükemmel.',
  },
  {
    id: 'poach', name: 'Haşlama & Buğulama', icon: '💧', accent: '#06b6d4',
    desc: 'Hassas balıklar için (alabalık, levrek). Sağlıklı ve lezzetli pişirme yöntemi.',
    steps: [
      'Kısık ateşte suyu kaynat (90-95°C), çok kısık koy',
      'Aromalar: limon, dereotu, karabiber, laurel yaprağı, tuz',
      'Balığı suya daldır — tam dalması gerekmez',
      'Levrek fileto 300g: 8-10 dk · Tam balık 500g: 15-18 dk',
      'Kontrol: en kalın yerde opak beyaz görünüm',
    ],
    tip: 'Pişirdikten sonra soğutma suyunda biraz beklet — lezzeti geliştiren proteinler stabilleşir.',
  },
];

const SPICE_PAIRS = [
  { fish: 'Levrek', spices: 'Dereotu, kapari, limon, sarımsak', avoid: 'Güçlü baharatlar lezzeti örtebilir' },
  { fish: 'Çipura', spices: 'Kekik, biberiye, limon, zeytinyağı', avoid: 'Karmaşık marineler — doğal tadı koru' },
  { fish: 'Palamut', spices: 'Soğan, zeytinyağı, limon, tuz + minimum', avoid: 'Süt bazlı soslar — yağlı balıkla uyumlu değil' },
  { fish: 'Alabalık', spices: 'Tereyağı, badem, dereotu, limon', avoid: 'Aşırı tuz — ince eti kurutur' },
  { fish: 'Sazan', spices: 'Kekik, sarımsak, beyaz şarap, soğan', avoid: 'Çiğ tüketim — tatlısu balığı pişirilmeli' },
  { fish: 'Yayın', spices: 'Baharatlı domates, biber, sarımsak', avoid: 'Hafif soslar — güçlü eti taşır' },
];

export default function FishCooking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tech');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍳 Balık Pişirme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Temizleme · teknikler · baharat uyumu</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['tech', '🔪 Teknikler'], ['spice', '🌿 Baharatlar']].map(([id, lbl]) => (
          <button key={id} onClick={() => { setTab(id); setSel(null); }} style={{
            flex: 1, background: tab === id ? '#ef4444' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#ef4444' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tech' && TECHNIQUES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{t.desc}</div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>📋 ADIMLAR</div>
                    {t.steps.map((s, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4, display: 'flex', gap: 8 }}>
                        <span style={{ color: t.accent, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {s}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: t.accent, fontWeight: 600, marginBottom: 3 }}>💡 ŞEF İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{t.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'spice' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>Balığın doğal tadını ön plana çıkarmak için doğru baharat seçimi kritiktir. Az baharat, daha güçlü lezzet.</div>
            </div>
            {SPICE_PAIRS.map((s, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #374151' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb', marginBottom: 6 }}>🐟 {s.fish}</div>
                <div style={{ fontSize: 12, color: '#22c55e', marginBottom: 4 }}>✅ {s.spices}</div>
                <div style={{ fontSize: 11, color: '#ef4444' }}>❌ {s.avoid}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
