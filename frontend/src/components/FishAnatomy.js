import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  {
    id: 'levrek', name: 'Levrek', sci: 'Dicentrarchus labrax', icon: '🐟', accent: '#3b82f6',
    family: 'Moronidae', type: 'Kemikli (Teleost)', habitat: 'Tuzlu su, iç sulara girer',
    anatomy: {
      dorsal: 'Çift sırt yüzgeci — 1. dikenli, 2. ışınlı. Savunma ve stabilite.',
      pectoral: 'Geniş göğüs yüzgeçleri — hız, dönüş kontrolü.',
      caudal: 'Çatal kuyruk — hızlı ani ivmelenme.',
      lateralLine: 'Yan çizgi duyargası — titreşim, basınç değişimi hisseder.',
      scales: 'Stenoid pul — geri yöne dokunulunca pürüzlü.',
    },
    lifecycle: ['Yumurta: Kış-İlkbahar (Ocak–Nisan)', 'Larva: 0–2 cm, plankton dönemi', 'Juvenil: 2–15 cm, iç sulara göç', 'Yetişkin: 3–5 yılda 35+ cm', 'Ömür: 15–25 yıl'],
    predators: ['İnsanlar (ana tehdit)', 'Yunus', 'Karadeniz köpekbalığı'],
    feeding: 'Aktif avcı. Küçük balık, kalamar, karides. Yüzey ve orta su.',
  },
  {
    id: 'cipura', name: 'Çipura', sci: 'Sparus aurata', icon: '🐠', accent: '#f59e0b',
    family: 'Sparidae', type: 'Kemikli (Teleost)', habitat: 'Sığ deniz, posidonia çayırı',
    anatomy: {
      dorsal: 'Uzun tek sırt yüzgeci — 11 diken + 13 ışın.',
      pectoral: 'Yelpaze şekli göğüs yüzgeci.',
      caudal: 'Derin çatal — sürekli seyir için verimli.',
      lateralLine: 'Belirgin yan çizgi, baş hizasında kıvrılır.',
      scales: 'Büyük gümüş pul. Alın üstünde altın bant belirgin.',
    },
    lifecycle: ['Yumurta: Sonbahar-Kış', 'Larva: Plankton dönemi 2-3 hafta', 'Protandröz hermafrodit: 2 yıl erkek → dişi', 'Yetişkin: 4-5 yılda 30+ cm', 'Ömür: 11+ yıl'],
    predators: ['Akvakültür alanları (yoğun av)', 'Büyük levrek', 'Insan'],
    feeding: 'Omnivor. Kabuklu, midye, kirpipusu, deniz otu. Güçlü ön dişlerle kırar.',
  },
  {
    id: 'palamut', name: 'Palamut', sci: 'Sarda sarda', icon: '🐡', accent: '#10b981',
    family: 'Scombridae', type: 'Kemikli, hızlı pelagik', habitat: 'Açık deniz, yüzey suları',
    anatomy: {
      dorsal: 'Ön ve arka iki ayrı sırt yüzgeci + 7–9 küçük yüzgeçcik.',
      pectoral: 'Kısa, sert — yüksek hız için optimize.',
      caudal: 'Güçlü yarım ay şeklinde kuyruk — sürekli yüzme.',
      lateralLine: 'Zigzag yan çizgi — hem mekanik hem elektrik algı.',
      scales: 'Vücudun önü zırhlı pullu, arka pul daha küçük.',
    },
    lifecycle: ['Yumurta: Mayıs–Temmuz', 'Larva: Hızlı büyüme', 'Göç: Karadeniz yaz, Ege-Akdeniz kış', 'Yetişkin: 2 yılda 45+ cm', 'Ömür: 5–7 yıl'],
    predators: ['Balina, yunus', 'Daha büyük orkinos', 'Balık kartalı (larva)'],
    feeding: 'Sürü halinde avlanır. Hamsi, istavrit, kalamar. Yüksek metabolizma.',
  },
  {
    id: 'alabalik', name: 'Gökkuşağı Alabalığı', sci: 'Oncorhynchus mykiss', icon: '🐟', accent: '#a78bfa',
    family: 'Salmonidae', type: 'Kemikli, soğuk su', habitat: 'Temiz, oksijeni yüksek dere',
    anatomy: {
      dorsal: 'Tek sırt + adipoz (yağ) yüzgeci — Salmonid belirteci.',
      pectoral: 'Geniş, göç sırasında güç sağlar.',
      caudal: 'Hafif çatal. Akıntıya karşı istikrar.',
      lateralLine: 'Belirgin. Parmaklı desenle örtüşür.',
      scales: 'Küçük, sikloid pul. Gökkuşağı şeridi yan hat boyunca.',
    },
    lifecycle: ['Yumurta: Sonbahar (çakıl yuvası)', 'Alevin: Sarı kese ile beslenir', 'Parr: 1–3 yıl derède', 'Yetişkin: 3 yılda 30+ cm', 'Ömür: 4–6 yıl (kültür), 11+ (doğal)'],
    predators: ['Balık kartalı', 'Su samuru', 'Nehir kaplumbağası (küçük birey)'],
    feeding: 'İnsectivore + Piscivor. Böcek, nimf, küçük balık, kurbağa.',
  },
];

const GENERAL_ANATOMY = [
  { part: 'Yan Çizgi (Lateral Line)', desc: 'Su basıncı ve titreşim hisseden duyarga sistemi. Karanlıkta veya çamurlu suda avlanmayı sağlar.', icon: '📡' },
  { part: 'Solungaçlar (Gills)', desc: 'Oksijenin sudan alındığı yer. Su sıcaklığı ve çözünmüş oksijen seviyeleri solungaç işlevini doğrudan etkiler.', icon: '🫁' },
  { part: 'Hava Kesesi (Swim Bladder)', desc: 'Derinlik kontrolü için gaz dolu organ. Kemikli balıkların çoğunda var; köpekbalığında yok.', icon: '💫' },
  { part: 'Pul Yapısı', desc: 'Sikloid (düzgün kenar), Stenoid (tarak kenar) veya Plakoid (köpekbalığı). Türü ve yaşı belirlemeye yardımcı olur.', icon: '🔬' },
  { part: 'Göz', desc: 'Çoğu balık 300°\'ye kadar geniş açılı görür. Renk algısı türe göre değişir. Gece balıkçılığında önemi büyük.', icon: '👁️' },
];

export default function FishAnatomy() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔬 Balık Anatomisi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tür biyolojisi, yaşam döngüsü & anatomi</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['species', '🐟 Türler'], ['general', '📚 Genel Anatomi']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#3b82f6' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#3b82f6' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && SPECIES.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{s.sci} · {s.family}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ marginTop: 8 }}>
                    {[['🏠 Habitat', s.habitat], ['🍽️ Beslenme', s.feeding]].map(([lbl, val]) => (
                      <div key={lbl} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
                        <span style={{ fontWeight: 600, color: '#6b7280' }}>{lbl}:</span> <span style={{ color: '#d1d5db', lineHeight: 1.5 }}>{val}</span>
                      </div>
                    ))}

                    <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                      <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>🦴 YÜZGEÇ ANATOMİSİ</div>
                      {Object.entries(s.anatomy).map(([k, v]) => (
                        <div key={k} style={{ fontSize: 11, color: '#d1d5db', marginBottom: 4, lineHeight: 1.5 }}>
                          <span style={{ color: s.accent, fontWeight: 600 }}>▸ </span>{v}
                        </div>
                      ))}
                    </div>

                    <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                      <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>🔄 YAŞAM DÖNGÜSÜ</div>
                      {s.lifecycle.map((l, i) => (
                        <div key={i} style={{ fontSize: 11, color: '#d1d5db', marginBottom: 3, display: 'flex', gap: 8 }}>
                          <span style={{ color: s.accent, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {l}
                        </div>
                      ))}
                    </div>

                    <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 4 }}>🦅 YIRTICILAR</div>
                      <div style={{ fontSize: 12, color: '#d1d5db' }}>{s.predators.join(' · ')}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'general' && (
          <div>
            {GENERAL_ANATOMY.map((g, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #374151' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{g.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb', marginBottom: 4 }}>{g.part}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{g.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
