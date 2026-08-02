import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SCENT_CATS = [
  {
    id: 'animal', name: 'Hayvan Kokuları', icon: '🐾', accent: '#f59e0b',
    desc: 'Yaban hayatının bıraktığı iz kokuları',
    scents: [
      { name: 'Domuz sürüngüsü', smell: 'Amonyak + toprak kokusu', meaning: 'Yakın — 30 dk içinde geçmiş', action: 'Rüzgar yönünü al, o yöne ilerle' },
      { name: 'Geyik idrarı', smell: 'Keskin ve amonyak', meaning: 'Sınır işareti — erkek geyik bölgesi', action: 'Kızışma döneminde çağırma fırsatı' },
      { name: 'Çakal pisu', smell: 'Keskin et ve misk', meaning: 'Çakal geçmiş — bölgede yaşıyor', action: 'Tavşan izi yakında olabilir' },
      { name: 'Ayı kokusu', smell: 'Yoğun misk + çürük', meaning: 'Ayı bölgesinde — dikkat', action: 'Gürültü çıkar, rüzgar kontrolü yap' },
    ],
    hunting_tip: 'Hayvan kokusu taze ve güçlüyse hayvan o bölgede — rüzgar önünde ilerle.',
  },
  {
    id: 'plant', name: 'Bitki Kokuları', icon: '🌿', accent: '#22c55e',
    desc: 'Bitki türlerinin bölge tespiti',
    scents: [
      { name: 'Yabani nane', smell: 'Taze ve soğuk nane', meaning: 'Nemli, kaynak kenarı toprak', action: 'Su kaynağı çok yakın — 50-200m' },
      { name: 'Meşe palamut çürümesi', smell: 'Toprak + mantar + tatlı', meaning: 'Meşe ormanı — domuz besleme yeri', action: 'Gece domuzu bu koku alanında ara' },
      { name: 'Çam reçinesi', smell: 'Keskin ve odunlu', meaning: 'Çam ormanı — yüksek bölge', action: 'Domuz ve keklik habitatı' },
      { name: 'Isırgan kokusu', smell: 'Yeşil ve ot — dokunma', meaning: 'Nemli, verimli toprak', action: 'Küçük av için iyi habitat işareti' },
    ],
    hunting_tip: 'Meşe palamut kokusu + toprak nemi = domuz besleme alanı formatörü.',
  },
  {
    id: 'water', name: 'Su Kokuları', icon: '💧', accent: '#06b6d4',
    desc: 'Su kaynaklarını koku ile bul',
    scents: [
      { name: 'Tatlı su kokusu', smell: 'Temiz, taze, hafif toprak', meaning: 'Temiz su kaynağı yakında', action: 'Bu yönde 30 dak yürü' },
      { name: 'Balık kokusu', smell: 'Yosun + deniz + balık', meaning: 'Avlanan balık var veya çok sayıda', action: 'Alabalık/sazan aktif — avlanma başla' },
      { name: 'Bataklık kokusu', smell: 'Kükürt + çürük + nemli', meaning: 'Bataklık yakında — dikkatli geç', action: 'Ördek ve su kuşu habitatı' },
      { name: 'Yağmur kokusu', smell: 'Petrichor — toprak + ozon', meaning: 'Yağmur geliyor — 30-60 dak', action: 'Sığınak ara, balıkçılık başlamadan hazır ol' },
    ],
    hunting_tip: 'Yağmur öncesi koku artışı — hayvanlar besleme yapar, av için en iyi an.',
  },
  {
    id: 'human', name: 'İnsan Koku Kontrolü', icon: '🚿', accent: '#a78bfa',
    desc: 'Avcı kokusunu gizleme teknikleri',
    scents: [
      { name: 'Deterjan kalıntısı', smell: 'Kimyasal, yapay', meaning: 'Hayvanlar 400m\'den kokar', action: 'Av giysisini kokusuz deterjanla yıka' },
      { name: 'Parfüm/deodorant', smell: 'Yapay kimyasal', meaning: 'En kötü koku maskesi', action: 'Av günü kesinlikle kullanma' },
      { name: 'Sigara kokusu', smell: 'Yanmış kimyasal', meaning: 'Hayvanlar 600m\'den kaçar', action: 'Av 4 saat öncesinde sigara içme' },
      { name: 'Doğal koku maskeleme', smell: 'Çam, meşe, toprak', meaning: 'Hayvanlar kökenleri ile özdeşleştirir', action: 'Çamda koku — çam yapra sürt elbiseye' },
    ],
    hunting_tip: 'Rüzgar yönü koku kontrolünden daha önemli — daima hayvanın rüzgar üstünde ol.',
  },
];

const SCENT_CONTROL = [
  { icon: '🧥', tip: 'Av Kıyafeti', steps: ['Kokusuz deterjan ile yıka', 'Açık havada kurut — güneşte değil gölgede', 'Naylon torba değil kumaş çantada sakla', 'Hareketten önce çam veya toprak ile sür'] },
  { icon: '🚿', tip: 'Beden Hazırlığı', steps: ['Kokusuz sabun — Ivory veya benzeri', 'Deodorant yok — sadece av günü', 'Dişleri fırçala ama nane soğutan macun yok', 'Av kıyafetini son dakika giy'] },
  { icon: '💨', tip: 'Rüzgar Yönetimi', steps: ['Rüzgar yönünü bil ve avın rüzgar üstünde ol', 'Saçı ıslatınca rüzgar yönünü test et', 'Hareket yönünü saatte bir kontrol et', 'Rüzgar tersti — pusu yerini değiştir'] },
];

export default function NatureScents() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('scents');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060a06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Doğa Kokuları Atlası</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hayvan · bitki · su kokuları & avcı koku kontrolü</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['scents','Koku Atlası'],['control','Koku Kontrolü']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0a0f0a', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'scents' && SCENT_CATS.map(c => {
          const open = sel === c.id;
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : c.id)} style={{
                background: '#0a0f0a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${c.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{c.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{c.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a0f0a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${c.accent}33`, borderTop: 'none' }}>
                  {c.scents.map((s, i) => (
                    <div key={i} style={{ marginTop: 10, paddingBottom: 10, borderBottom: i < c.scents.length-1 ? `1px solid ${c.accent}18` : 'none' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: c.accent }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>👃 {s.smell}</div>
                      <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>💡 {s.meaning}</div>
                      <div style={{ fontSize: 11, color: '#22c55e', marginTop: 2 }}>→ {s.action}</div>
                    </div>
                  ))}
                  <div style={{ background: c.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 10 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>🏹 {c.hunting_tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'control' && (
          <div style={{ background: '#0a0f0a', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 12 }}>🌬️ Avcı Koku Kontrolü</div>
            {SCENT_CONTROL.map((s, i) => (
              <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < SCENT_CONTROL.length-1 ? '1px solid #141a14' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#86efac' }}>{s.tip}</div>
                </div>
                {s.steps.map((step, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                    <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700, width: 16, flexShrink: 0 }}>•</div>
                    <div style={{ fontSize: 12, color: '#d1d5db' }}>{step}</div>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ background: '#f59e0b15', borderRadius: 8, padding: '10px 12px', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 Rüzgar yönü değişirse tüm koku kontrolü sıfırlanır. Rüzgar takibi koku maskesinden daha kritik.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
