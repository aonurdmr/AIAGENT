import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const POLLINATORS = [
  {
    id: 'honeybee', name: 'Bal Arısı', sci: 'Apis mellifera', icon: '🐝', accent: '#f59e0b', category: 'Arı',
    desc: 'Dünyada en tanınan tozlaşıcı. Koloniler halinde yaşar, bal üretir. Türkiye bal üretiminde dünya 2. sırasındadır.',
    habitat: 'Her ortam — çiçekli alanlar, bahçeler, ormanlık',
    season: 'Mart–Ekim (aktif), Kasım–Şubat (kış kümesi)',
    plants: ['Kekik', 'Lavanta', 'Ayçiçeği', 'Elma', 'Kiraz'],
    threat: 'Pestisit kullanımı, habitat kaybı, Varroa akarı',
    fact: 'Bir arı kolonisi yılda 50–80 kg bal üretebilir. Her arı ömrü boyunca yaklaşık 1/12 çay kaşığı bal yapar.',
    tip: 'Arı görürseniz sakin olun — size saldırmaz. Çiçeğe yerleşmiş arıya yaklaşmayın.',
  },
  {
    id: 'bumblebee', name: 'Bombus Arısı', sci: 'Bombus terrestris', icon: '🐝', accent: '#f97316', category: 'Arı',
    desc: 'Büyük, tüylü arılar. Soğuk iklimde bile uçabilir. Titreşim tozlaşması ile diğer arıların yapamadığını yapar.',
    habitat: 'Çayırlık, ormanlık kenarı, dağlık alan',
    season: 'Şubat–Kasım',
    plants: ['Domates', 'Yonca', 'Fasülye', 'Meyan kökü'],
    threat: 'Yoğun tarım, pestisit, çayır kaybı',
    fact: 'Vızıltıyla çiçeği titreştirerek polenini serbest bırakırlar. Bu tekniğe "buzz pollination" denir.',
    tip: 'Kır çiçeklerini korumak Bombus arıları için kritik. Bahçenize lavanta ve adaçayı ekin.',
  },
  {
    id: 'monarch', name: 'İmparator Kelebeği', sci: 'Danaus plexippus', icon: '🦋', accent: '#ef4444', category: 'Kelebek',
    desc: 'Göç eden en ünlü kelebek. Türkiye\'de nadir misafir. Parlak turuncu-siyah deseni savunma renklendirmesi.',
    habitat: 'Açık çayırlık, kıyı, göç güzergâhı',
    season: 'Ağustos–Ekim (göç dönemi)',
    plants: ['İpek otu', 'Cüce kanarya otu', 'Ballı baba'],
    threat: 'Habitat yok edilmesi, pestisit, iklim değişikliği',
    fact: '4000 km göç edebilir. Yaşam döngüsü 4 nesilde tamamlanır. Yalnızca 4. nesil göç eder.',
    tip: 'Göç döneminde bulguyu fotoğraflayın ve iNaturalist\'e bildirin.',
  },
  {
    id: 'swallow_tail', name: 'Kırlangıç Kuyruğu', sci: 'Papilio machaon', icon: '🦋', accent: '#facc15', category: 'Kelebek',
    desc: 'Türkiye\'nin en büyük ve en güzel kelebeklerinden biri. Sarı-siyah desenli kanatları belirgindir.',
    habitat: 'Çayır, tarım alanı kenarı, dağ etekleri',
    season: 'Nisan–Eylül (2–3 nesil)',
    plants: ['Havuç', 'Dereotu', 'Rezene', 'Maydanoz'],
    threat: 'Tarım ilaçları, çayır yönetim değişikliği',
    fact: 'Tırtıllar havuç yapraklarını sever. Tehlike hissedince osmeterium adlı sarı-turuncu boynuzlar çıkarır.',
    tip: 'Bahçenizde havuç veya dereotu yetiştirerseniz yumurta bırakabilir.',
  },
  {
    id: 'hover_fly', name: 'Hover Sineği', sci: 'Episyrphus balteatus', icon: '🪰', accent: '#84cc16', category: 'Sinek',
    desc: 'Arıya benzer sarı-siyah bantlı sinek, ama sokmuyor. Havada sabit durabilir. Çok etkili tozlaşıcı.',
    habitat: 'Her ortam — tarım, bahçe, çayırlık',
    season: 'Nisan–Ekim',
    plants: ['Papatya', 'Havuç çiçeği', 'Rezene', 'Sarı çiçekler'],
    threat: 'Pestisit, tarım yoğunluğu',
    fact: 'Arıdan farklı olarak çift değil tek çift kanadı var. Larvaları yaprak bitlerini yer — doğal zararlı kontrolü.',
    tip: 'Zararlı gibi görünse de sokmaz! Öldürmeyin — bahçenizin doğal ilacıdır.',
  },
  {
    id: 'mason_bee', name: 'Örümcek Arısı (Mason)', sci: 'Osmia cornuta', icon: '🐝', accent: '#8b5cf6', category: 'Arı',
    desc: 'Yalnız yaşayan, agresif olmayan küçük arı. Bal üretmez ama son derece etkili tozlaşıcı.',
    habitat: 'Ormanlık kenar, bahçe duvarları, ahşap çatlaklar',
    season: 'Mart–Haziran',
    plants: ['Elma', 'Kiraz', 'Erik', 'Armut'],
    threat: 'Çatlak ve delik ortamlarının azalması',
    fact: 'Bir Mason arısı, 100 Bal arısının yapabileceği tozlaşmayı tek başına yapabilir.',
    tip: 'Bahçenize küçük ahşap bloklar veya arı oteli asın — doğal yuvalama alanı sağlarsınız.',
  },
  {
    id: 'longhorn_bee', name: 'Uzun Anten Arısı', sci: 'Eucera sp.', icon: '🐝', accent: '#06b6d4', category: 'Arı',
    desc: 'Uzun antenleriyle dikkat çeken yalnız arı. Türkiye\'de 50+ Eucera türü var.',
    habitat: 'Kuru çayırlık, bozkır, dağ etekleri',
    season: 'Nisan–Temmuz',
    plants: ['Yonca', 'Burçak', 'Patlıcan çiçeği'],
    threat: 'Otlatma baskısı, çayır kaybı',
    fact: 'Erkekler dişilerden çok önce uçar ve uyku sırasında antenleriyle birbirlerine tutunur.',
    tip: 'Bozkır korunursa doğal olarak gelir. Toprak altındaki yuvalarını ezmekten kaçının.',
  },
];

const PLANT_GUIDE = [
  { plant: 'Lavanta', icon: '💜', months: [5, 6, 7], attracts: ['Bal arısı', 'Bombus', 'Kelebek'] },
  { plant: 'Kekik', icon: '🌿', months: [5, 6, 7, 8], attracts: ['Bal arısı', 'Hover sineği'] },
  { plant: 'Papatya', icon: '🌼', months: [3, 4, 5, 9, 10], attracts: ['Kelebek', 'Hover sineği', 'Mason arısı'] },
  { plant: 'Ayçiçeği', icon: '🌻', months: [6, 7, 8], attracts: ['Bal arısı', 'Bombus'] },
  { plant: 'Adaçayı', icon: '🌱', months: [4, 5, 6], attracts: ['Bal arısı', 'Bombus'] },
  { plant: 'Yonca', icon: '☘️', months: [4, 5, 6, 7, 8], attracts: ['Bal arısı', 'Bombus', 'Uzun anten arısı'] },
];

const MONTH_NAMES = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

export default function PollinatorGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const [sel, setSel] = useState(null);
  const [catFilter, setCatFilter] = useState('Tümü');
  const curMonth = new Date().getMonth();

  const cats = ['Tümü', 'Arı', 'Kelebek', 'Sinek'];
  const filtered = catFilter === 'Tümü' ? POLLINATORS : POLLINATORS.filter(p => p.category === catFilter);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌸 Tozlaşıcı Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Arılar, kelebekler & ekosistem koruma</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['species', '🐝 Türler'], ['plants', '🌿 Bitkiler']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#84cc16' : '#1f2937', color: tab === id ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#84cc16' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && (
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setCatFilter(c)} style={{
                  background: catFilter === c ? '#84cc1622' : 'transparent',
                  color: catFilter === c ? '#84cc16' : '#6b7280',
                  border: `1px solid ${catFilter === c ? '#84cc16' : '#374151'}`,
                  borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
                }}>{c}</button>
              ))}
            </div>

            {filtered.map(p => {
              const open = sel === p.id;
              return (
                <div key={p.id} style={{ marginBottom: 8 }}>
                  <div onClick={() => setSel(open ? null : p.id)} style={{
                    background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                    padding: '14px 16px', border: `1px solid ${p.accent}33`, cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 28 }}>{p.icon}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
                          <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{p.sci}</div>
                        </div>
                      </div>
                      <span style={{ background: p.accent + '22', color: p.accent, border: `1px solid ${p.accent}44`, borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>{p.category}</span>
                    </div>
                  </div>
                  {open && (
                    <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${p.accent}33`, borderTop: 'none' }}>
                      <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{p.desc}</div>
                      {[
                        ['🏡 Habitat', p.habitat],
                        ['📅 Sezon', p.season],
                        ['🌺 Tercih Bitkiler', p.plants.join(', ')],
                        ['⚠️ Tehditler', p.threat],
                      ].map(([lbl, val]) => (
                        <div key={lbl} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
                          <span style={{ fontWeight: 600, color: '#6b7280' }}>{lbl}:</span> <span style={{ color: '#d1d5db' }}>{val}</span>
                        </div>
                      ))}
                      <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                        <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 3 }}>✨ İLGİNÇ GERÇEK</div>
                        <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{p.fact}</div>
                      </div>
                      <div style={{ background: p.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                        <div style={{ fontSize: 10, color: p.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                        <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{p.tip}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'plants' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#84cc16', fontWeight: 600, marginBottom: 4 }}>🌱 Bugün aktif çiçekler — {MONTH_NAMES[curMonth]}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>Bu ay çiçek açan ve tozlaşıcı çeken bitkiler vurgulanmıştır.</div>
            </div>
            {PLANT_GUIDE.map(pg => {
              const isActive = pg.months.includes(curMonth);
              return (
                <div key={pg.plant} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: `1px solid ${isActive ? '#84cc1644' : '#374151'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 24 }}>{pg.icon}</span>
                      <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? '#84cc16' : '#f9fafb' }}>{pg.plant}</div>
                    </div>
                    {isActive && <span style={{ background: '#84cc1622', color: '#84cc16', borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>🌸 Aktif</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 6, flexWrap: 'wrap' }}>
                    {pg.months.map(m => (
                      <span key={m} style={{ background: m === curMonth ? '#84cc1622' : '#374151', color: m === curMonth ? '#84cc16' : '#6b7280', borderRadius: 20, padding: '2px 7px', fontSize: 10, fontWeight: 600 }}>{MONTH_NAMES[m]}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>Çeken tozlaşıcılar: <span style={{ color: '#d1d5db' }}>{pg.attracts.join(', ')}</span></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
