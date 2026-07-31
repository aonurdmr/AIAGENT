import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PREDATORS = [
  {
    id: 'bear', name: 'Ayı', icon: '🐻', accent: '#92400e',
    habitat: 'Orman, çalılık vadi, meyve bahçesi kenarı',
    risk: 'Yüksek — özellikle anne + yavru',
    behavior: 'Genellikle kaçar ama köşeye sıkışırsa saldırır — merak ayıları da olabilir',
    prevention: [
      'Gürültülü yürü — sürpriz karşılaşmadan kaçın',
      'Yiyecek, diş macunu, parfüm çadırın dışında kilitli kutuda',
      'Rüzgar yönünü oku — ayı kokuyu 30 km’den alır',
      'Sabah erken ve gece aktif — bu saatlerde tetikte ol',
    ],
    if_encounter: [
      'Sakin dur — kaçma (kovalama refleksi tetiklenir)',
      'Ayıya bak ama gözlerine dikkatli bakma — tehdit işareti',
      'Yavaşça geride çekil, konuş sakin sesle',
      'Saldırıda: yere uzan, karnı koru, ense elleri — savunma pozisyonu',
    ],
    spray: 'Ayı spreyi (biber gazı) 8m etkili — rüzgar yönüne dikkat',
  },
  {
    id: 'wolf', name: 'Kurt', icon: '🐺', accent: '#6b7280',
    habitat: 'Açık yayla, orman kenarı, dağlık step',
    risk: 'Düşük-orta — sürü halinde köşeye sıkışırsa tehlikeli',
    behavior: 'İnsanlardan kaçar — yaralı veya hastaysa yaklaşabilir',
    prevention: [
      'Gece kamp yakınında hayvan bulundurma',
      'Yiyecek artıklarını göm veya uzaklaştır',
      'Ateş yak — kurtları uzak tutar',
      'Sürüye rastlarsan gürültü çıkar',
    ],
    if_encounter: [
      'Büyük görün — kolları aç, üstlük giy',
      'Gözlerini kör etme — kaçma yolu bırak',
      'Yüksek sesle bağır, taş fırlat',
      'Sürü ise ateş yak, sigara çak',
    ],
    spray: 'Biber gazı etkilidir — yakın mesafede kullan',
  },
  {
    id: 'boar', name: 'Yaban Domuzu', icon: '🐗', accent: '#f97316',
    habitat: 'Meşe ormanı, bataklık kenarı, tarla sınırı',
    risk: 'Orta — anne + yavru kombinasyonu en tehlikeli',
    behavior: 'Gürültüye kaçar ama saldırı hızlıdır — 40 km/s',
    prevention: [
      'Sabah ve gece beslenir — bu saatler dikkatli',
      'Körpe yavru görürsen hemen uzaklaş',
      'Rüzgar yönüne dikkat — seni hissederse kaçar',
    ],
    if_encounter: [
      'Ağaca çık — en iyi seçenek (2m yeterli)',
      'Ağaç yoksa duvar/taş arkasına geç',
      'Kaçmak zorundaysan zikzak çiz',
      'Yere düşersen kıvrıl ve koru yüzü',
    ],
    spray: 'Yaban domuzuna biber gazı etkili — 3m mesafede kullan',
  },
  {
    id: 'jackal', name: 'Çakal & Tilki', icon: '🦊', accent: '#f59e0b',
    habitat: 'Kırsal, çöplük yakını, ormanlık vadi',
    risk: 'Düşük — kuduz taşıyabilir',
    behavior: 'Fırsatçı — yiyecek için yaklaşır, ısırmaz genelde',
    prevention: [
      'Yiyecek açık bırakma',
      'Kampı temiz tut',
      'Gece lambası — caydırıcı',
    ],
    if_encounter: [
      'Bağır, taş fırlat',
      'Anormal davranış = kuduz şüphesi → uzaklaş hemen',
      'Isırma olursa 112 — kuduz aşısı acildir',
    ],
    spray: 'Biber gazı yeterli — düşük risk',
  },
];

const GENERAL = [
  { icon: '🔔', rule: 'Gürültü yap', desc: 'Ayı zili, boru, konuşma — sürpriz karşılaşmaların %90\'ını önler' },
  { icon: '🌬️', rule: 'Rüzgar yönü', desc: 'Rüzgar sırtında ilerle — vahşi hayvanlar kokuyu uzaktan alır' },
  { icon: '🔥', rule: 'Geceleri ateş', desc: 'Ateş çoğu yabani hayvanı uzak tutar — söndürmeden uyuma' },
  { icon: '📦', rule: 'Yiyecek yönetimi', desc: 'Çadırda yiyecek bulundurma — 100m uzağa asılı tut' },
  { icon: '🐕', rule: 'Köpek etkisi', desc: 'Av köpeği hem uyarır hem caydırır — vahşi hayvanlara karşı avantaj' },
  { icon: '📡', rule: 'Konum bildiri', desc: 'Rotanı birine bildir — kaybolursan kurtarma ekibi nereye bakacak bilir' },
];

export default function PredatorSafety() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('animals');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0603', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐻 Yırtıcılarla Karşılaşma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 tür · ayı, kurt, domuz, çakal — önleme & protokol</div>
      </div>

      <div style={{ background: '#1a0808', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>⚠️ ACİL: 112</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Vahşi hayvan saldırısı sonrası hemen 112'yi ara. Çakallarda kuduz riski — ısırma anında aşı şart.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['animals','Hayvanlar'],['general','Genel Kurallar']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#92400e' : '#120804', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'animals' && PREDATORS.map(p => {
          const open = sel === p.id;
          return (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : p.id)} style={{
                background: '#120804', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${p.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{p.habitat}</div>
                  </div>
                  <div style={{ fontSize: 10, color: p.risk.startsWith('Yüksek') ? '#ef4444' : p.risk.startsWith('Orta') ? '#f59e0b' : '#22c55e', fontWeight: 700, background: p.risk.startsWith('Yüksek') ? '#ef444422' : p.risk.startsWith('Orta') ? '#f59e0b22' : '#22c55e22', padding: '2px 8px', borderRadius: 20 }}>
                    {p.risk.split(' —')[0]}
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#120804', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${p.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 8, marginBottom: 6 }}>{p.behavior}</div>
                  <div style={{ fontSize: 11, color: p.accent, fontWeight: 700, marginBottom: 4 }}>🛡️ ÖNLEME</div>
                  {p.prevention.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {s}</div>)}
                  <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700, marginTop: 8, marginBottom: 4 }}>🚨 KARŞILAŞMADA</div>
                  {p.if_encounter.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ background: p.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>🌶️ {p.spray}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'general' && (
          <div style={{ background: '#120804', borderRadius: 14, padding: 14, border: '1px solid #92400e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>🌲 Vahşi Doğada Genel Güvenlik</div>
            {GENERAL.map((g, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < GENERAL.length-1 ? '1px solid #1e1008' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{g.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fed7aa' }}>{g.rule}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{g.desc}</div>
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
