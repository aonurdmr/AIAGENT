import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  {
    id: 'levrek', name: 'Levrek', icon: '🐟', accent: '#3b82f6',
    bestHours: '22:00–03:00',
    behavior: 'Gece aktif avcı. Sığ sulara girer. Işık altındaki böcek yağmurunu takip eder.',
    bait: ['Gece yüzey kaşıkları', 'Poppers', 'Yazıt yem (glow)', 'Gece worm'],
    spots: 'Köprü ayakları, rıhtım ışıkları, dalgakıran kenarları',
    technique: 'Yavaş dönüş. İşık sınırını hedefle — aydınlık-karanlık geçişi.',
  },
  {
    id: 'yayın', name: 'Yayın Balığı', icon: '🦈', accent: '#f97316',
    bestHours: '21:00–04:00',
    behavior: 'Güçlü gece avcısı. Titreşim sensörü ile avlanır. Gündüz derinlikte gece sığlığa çıkar.',
    bait: ['Balık yemi (canlı)', 'Büyük solucan topakları', 'Gürültülü kaşıklar'],
    spots: 'Derin havuz girişleri, bentler altı, yavaş akan dere köşeleri',
    technique: 'Dip boyunca yavaş sürükleme. Ağır ağırlık. Gürültülü çekiş.',
  },
  {
    id: 'sazan', name: 'Sazan', icon: '🐟', accent: '#22c55e',
    bestHours: '20:00–24:00 ve 04:00–07:00',
    behavior: 'Şafak ve akşam üstü en aktif. Gece sığ yerlerde beslenir.',
    bait: ['Boilies', 'Mısır + fıstık ezmesi', 'Method feeder', 'Halka yemi'],
    spots: 'Sazlık kenarı, ağaç dalı altı, yumuşak dip alanlar',
    technique: 'Sessizce yaklaş. Yem alanı önceden hazırla. Alarm kurarak bekle.',
  },
  {
    id: 'kefal', name: 'Kefal', icon: '🐟', accent: '#94a3b8',
    bestHours: '23:00–02:00',
    behavior: 'Gece sahil ve rıhtım çevresinde yoğunlaşır. Işık çeken sürü.',
    bait: ['Ekmek kabuğu', 'Hamur', 'Küçük nimfler'],
    spots: 'Port ışıkları, köy iskelesi, nehir ağzı',
    technique: 'Yüzey ile 50 cm altı arası. Hafif takım. Sert çekim yok.',
  },
];

const GEAR_LIST = [
  { item: 'Kafa feneri', note: 'Kırmızı ışık modunu kullan — göz uyumunu bozmaz', essential: true },
  { item: 'Glow bait / fosforlu yem', note: 'Karanlıkta balığı çeken UV ışıklı yemler', essential: true },
  { item: 'Ekstra pil / şarj cihazı', note: 'Elektronik ekipman için', essential: true },
  { item: 'Sıcak kıyafet', note: 'Gece hava koşulları değişkendir', essential: true },
  { item: 'Balık alarm (zil)', note: 'Sazan ve yayın için bırakma avı yapılacaksa', essential: false },
  { item: 'Termos kahve/çay', note: 'Uzun gece oturumları için moral', essential: false },
  { item: 'Saat / zamanlayıcı', note: 'En iyi saatleri takip etmek için', essential: false },
  { item: 'Can yeleği', note: 'Tekneyle çıkılıyorsa zorunlu', essential: true },
];

const TIPS = [
  'Gece balıkçılığına gündüz keşifle başlayın — yeri önceden tanıyın',
  'Hareketsizlik kritik: gece balıklar çok daha kolay ürkür',
  'Işık kaynağı sabit olsun — sürekli fener açıp kapama balığı dağıtır',
  'Işıklı alanın GÖLGE sınırını hedefleyin — balıklar oraya üşüşür',
  'Koku daha da etkili: gece yem kokusu suya daha geniş yayılır',
  'Rüzgar yönünü kontrol edin — sesin rüzgarla taşınmaması için',
  'Gece aşırı kaşık döndürme değil, yavaş-yavaş sürükleme daha etkili',
];

export default function NightFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌙 Gece Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Gece türleri, ekipman & ipuçları</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['species', '🐟 Türler'], ['gear', '🎒 Ekipman'], ['tips', '💡 İpuçları']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#4f46e5' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#4f46e5' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>🕐 {s.bestHours}</div>
                    </div>
                  </div>
                  <span style={{ background: s.accent + '22', color: s.accent, borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>Gece Aktif</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{s.behavior}</div>
                  {[['📍 Nokta', s.spots]].map(([lbl, val]) => (
                    <div key={lbl} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, color: '#6b7280' }}>{lbl}:</span> <span style={{ color: '#d1d5db' }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🪱 YEM SEÇENEKLERİ</div>
                    {s.bait.map(b => (
                      <div key={b} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3, display: 'flex', gap: 6 }}><span style={{ color: s.accent }}>•</span> {b}</div>
                    ))}
                  </div>
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 3 }}>🎣 TEKNİK</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{s.technique}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'gear' && (
          <div>
            {GEAR_LIST.map((g, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: `1px solid ${g.essential ? '#4f46e533' : '#374151'}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18, marginTop: 2 }}>{g.essential ? '⭐' : '➕'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: g.essential ? '#c4b5fd' : '#f9fafb' }}>{g.item}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{g.note}</div>
                </div>
              </div>
            ))}
            <div style={{ background: '#4f46e515', borderRadius: 10, padding: '10px 12px', marginTop: 4, border: '1px solid #4f46e533' }}>
              <div style={{ fontSize: 11, color: '#c4b5fd' }}>⭐ = Zorunlu ekipman. ➕ = Önerilir.</div>
            </div>
          </div>
        )}

        {tab === 'tips' && (
          <div>
            {TIPS.map((t, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 10 }}>
                <div style={{ background: '#4f46e5', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{t}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
