import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BIRDS = [
  {
    id: 'karatavuk', name: 'Karatavuk', scientific: 'Turdus merula', icon: '🐦', accent: '#f59e0b',
    song: 'Zengin, melodik ıslık sesi. En güzel Avrupa kuş ötüşü olarak kabul edilir.',
    when: 'Şubat–Temmuz · sabah 04:00-09:00 ve akşam',
    habitat: 'Bahçe, park, orman kenarı',
    identify: 'Erkek: tamamen siyah, sarı gaga. Dişi: kahverengi, benekli göğüs',
    behavior: 'Erken sabah yerde solucan avlar. Tehlike durumunda tiz çığlık.',
    tip: 'Sesini duyduğunda dur ve bekle — genellikle açık dala çıkar. Fotoğraf fırsatı yüksek.',
  },
  {
    id: 'kumru', name: 'Kumru', scientific: 'Streptopelia decaocto', icon: '🕊️', accent: '#a78bfa',
    song: '"Kuu-kuu-vu" ritimli üçlü ses. Adını bu sesten alır.',
    when: 'Yıl boyu · sabah ve öğleden sonra',
    habitat: 'Şehir, bahçe, park, kavak ağaçları',
    identify: 'Gri-bej, boyunda siyah halka. Uzun kuyruk.',
    behavior: 'Çift halinde yaşar. Tohum ve meyveyle beslenir.',
    tip: 'Elektrik telinde ya da çatıda kolayca görülür. İlk kuş öğrenenlerin #1 türü.',
  },
  {
    id: 'guguk', name: 'Guguk Kuşu', scientific: 'Cuculus canorus', icon: '🐦', accent: '#22c55e',
    song: '"Gu-guk" ikili sesi. Göç sezonu habercisi.',
    when: 'Nisan–Temmuz (Türkiye\'de)',
    habitat: 'Orman, çalılık, yayla',
    identify: 'Gri üst, sarımtırak alt, uzun kuyruk. Şahin gibi uçuş.',
    behavior: 'Başka kuşların yuvasına yumurta bırakır (brood parasitism).',
    tip: 'Sesi duyulur ama görülmez — orman içinde çok dikkatli ve hızlı. Sabah ötüşü en belirgin.',
  },
  {
    id: 'bülbül', name: 'Bülbül', scientific: 'Luscinia megarhynchos', icon: '🐦', accent: '#ec4899',
    song: 'Türkiye\'nin en zengin ötüşlü kuşu. Gece ötüşü eşsiz — gece de devam eder.',
    when: 'Nisan–Temmuz (gece dahil)',
    habitat: 'Çalılık, orman kenarı, nehir kıyısı',
    identify: 'Kahverengi, kızıl kuyruk, göze çarpmaz görünüm',
    behavior: 'Gizlenerek öter. Çalı içinde — sesin yönünü takip et.',
    tip: 'Türk şiir ve müziğinin sembol kuşu. Sese odaklanıp çalı içinde gözle. Gece 22:00-02:00 en aktif.',
  },
  {
    id: 'baykus', name: 'İspinoz', scientific: 'Fringilla coelebs', icon: '🐦', accent: '#84cc16',
    song: '"Birip-birip-TUYYY" inişli çıkışlı seri. Türkiye\'nin en yaygın kuşlarından.',
    when: 'Yıl boyu · sabah',
    habitat: 'Orman, bahçe, park',
    identify: 'Erkek: renkli (kırmızımtırak göğüs, mavi baş). Dişi: kahverengimsi, iki beyaz kanat şeridi',
    behavior: 'Ağaçta ötüp yerde beslenir. Kışın küçük sürüler.',
    tip: 'Daldan dal atlayarak ötüşünü şişirip tekrar eder. Fotoğraf için dala konduğu anı bekle.',
  },
  {
    id: 'agackakan', name: 'Ağaçkakan', scientific: 'Dendrocopos major', icon: '🐦', accent: '#ef4444',
    song: '"Dürürürüt" yüksek trili + ağaç üstünde ritimli vuruş sesi',
    when: 'Yıl boyu · sabah',
    habitat: 'Orman (meşe ve çam), park ağaçları',
    identify: 'Siyah-beyaz, kırmızı ense (erkek). Kırmızı alt kuyruk.',
    behavior: 'Spiral şekilde ağaç gövdesinde yukarı tırmanır.',
    tip: 'Ses ile bul, sonra ses kaynağı ağacı gözlemle. Genellikle kırık veya kurutulmuş ağaçlarda.',
  },
];

const ID_TIPS = [
  { icon: '👁️', tip: 'Boyut: serçe, güvercin, karga — relatif karşılaştırma' },
  { icon: '🎨', tip: 'Renk deseni: baş, göğüs, kanat şeritleri, kuyruk ucu' },
  { icon: '✈️', tip: 'Uçuş şekli: düz, dalgalı, spiral, süzülme' },
  { icon: '🌲', tip: 'Habitat: dal, yer, su kenarı, kaya' },
  { icon: '⏰', tip: 'Zaman: sabah, öğlen, gece — her kuşun rutini var' },
  { icon: '🔊', tip: 'Ses: tını, ritim, tekrar sayısı, hız — ses tanıma en hızlı yöntem' },
];

export default function BirdSong() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('birds');

  return (
    <div style={{ background: '#080f08', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎵 Kuş Sesleri Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 tür · ötüş, habitat & tanımlama</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['birds','Türler'],['identify','Tanımlama']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0e1a0e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'birds' && BIRDS.map(b => {
          const open = sel === b.id;
          return (
            <div key={b.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : b.id)} style={{
                background: '#0e1a0e', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${b.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{b.name}</div>
                    <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{b.scientific}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0e1a0e', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${b.accent}33`, borderTop: 'none' }}>
                  <div style={{ background: b.accent + '15', borderRadius: 8, padding: '8px 10px', margin: '8px 0' }}>
                    <div style={{ fontSize: 10, color: b.accent, fontWeight: 600, marginBottom: 3 }}>🎵 ÖTÜŞ</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6, fontStyle: 'italic' }}>{b.song}</div>
                  </div>
                  {[['⏰ Ne Zaman', b.when], ['🌿 Habitat', b.habitat], ['👁️ Tanımlama', b.identify], ['🐦 Davranış', b.behavior]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: b.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: '#1a2c1a', borderRadius: 8, padding: '6px 10px', marginTop: 6 }}>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>💡 {b.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'identify' && (
          <div style={{ background: '#0e1a0e', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🔍 Kuş Tanımlama İpuçları</div>
            {ID_TIPS.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{t.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{t.tip}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
