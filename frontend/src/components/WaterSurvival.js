import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  {
    id: 'boil', name: 'Kaynatma', icon: '🔥', accent: '#ef4444',
    effectiveness: 'Virüs, bakteri, protozoa — tamamı ölür',
    steps: [
      '1 dakika kaynat — 1000m üzerinde 3 dakika (basınç düşük)',
      'Kaynatma süresi sonrası 10 dak soğut',
      'Soğutulmuş suyu kaba aktar',
      'Kapkacak yoksa: taş kızdır, suya at (primitif)',
    ],
    cons: 'Yakıt gerektirir · kimyasal kirlilik gidermez',
    tip: 'Her zaman 1. tercih — en güvenilir yöntem.',
  },
  {
    id: 'filter', name: 'Süzme (Doğal Filtre)', icon: '🪨', accent: '#a78bfa',
    effectiveness: 'Büyük partiküller, bazı bakteriler — tam sterilizasyon değil',
    steps: [
      'Plastik şişe ters çevir — dip deli aç',
      'Katman 1 (alta): kum — ince',
      'Katman 2: çakıl — orta',
      'Katman 3 (üst): kömür tozu — aktif karbon etkisi',
      'Pamuk veya bez son katman — büyük partikül tuzak',
    ],
    cons: 'Virüs ve kimyasalı gidermez — kaynatma ile birleştir',
    tip: 'Kömür yapımı: ateşte tamamen yanmış odun — siyah kısım aktif karbon.',
  },
  {
    id: 'solar', name: 'Güneş Dezenfeksiyonu (SODIS)', icon: '☀️', accent: '#f59e0b',
    effectiveness: 'Bakteri ve virüs — UV ile öldürür',
    steps: [
      'Şeffaf PET şişe kullan — kalın plastik değil',
      'Su bulanık değilse doğrudan kullan, bulanıksa önce süz',
      'Şişeyi düz yere koy — en az 6 saat güneşte',
      'Bulutlu günde 2 tam gün',
      'Alüminyum folyo altında etkinlik artar',
    ],
    cons: 'Güneş gerektirir · 6+ saat beklemek gerekir',
    tip: 'Acil durumda güvenilir — Dünya Sağlık Örgütü onaylı yöntem.',
  },
  {
    id: 'chemical', name: 'Kimyasal Arıtma', icon: '🧪', accent: '#22c55e',
    effectiveness: 'Bakteri ve virüs — protozoa için daha uzun süre',
    steps: [
      'İyot tableti: 1 tablet/1L — 30 dak bekle',
      'Klor tableti (Aquatabs): 1 tablet/1L — 30 dak',
      'Çamaşır suyu (saf): 2 damla/1L — 30 dak',
      'Sudaki bulanıklık varsa doz 2x artır',
      'Tadı gidermek için vitamin C tableti ekle',
    ],
    cons: 'Kimyasal tat · hamilelerde iyot önerilmez · kist protozoa dirençli',
    tip: 'Acil çantasına Aquatabs koy — hafif, ucuz, güvenilir.',
  },
];

const SOURCES = [
  { icon: '🏔️', source: 'Dağ kaynağı', safety: 'İyi', advice: 'Kaynaktan doğrudan al — aşağıya inmeyi bekle' },
  { icon: '🌊', source: 'Nehir/dere', safety: 'Orta', advice: 'Üst bölüm daha temiz — hayvan ölüsü veya yerleşim olmayan kısım' },
  { icon: '🌧️', source: 'Yağmur suyu', safety: 'İyi', advice: 'Direkt toplamak en temiz — yerden gelen su kirli' },
  { icon: '🌿', source: 'Bitki özü', safety: 'Güvenli', advice: 'Sabah bitki yapraklarındaki çiy — bez ile sil, topla' },
  { icon: '🏜️', source: 'Göl/bataklık', safety: 'Kötü', advice: 'Mutlaka arıt — kimyasal ve biyolojik kirlilik yüksek' },
  { icon: '🌊', source: 'Deniz suyu', safety: 'Tehlikeli', advice: 'İçme — sodyum yüklemesi böbreği bozar. Güneş damıtma gerekir.' },
];

export default function WaterSurvival() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('methods');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#030c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>💧 Su Arıtma Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kaynatma · süzme · güneş · kimyasal arıtma</div>
      </div>

      <div style={{ background: '#0a1a24', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #06b6d433' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>💧 HAYATTA KALMA: SU ÖNCELİKLİ</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>İnsan susuzluktan 3 günde ölür. Kirli su içmek yerine her zaman arıt — hafif ishal bile ölümcül olabilir susuz ortamda.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['methods','Arıtma Yöntemleri'],['sources','Su Kaynakları']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#061520', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'methods' && METHODS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#061520', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{m.effectiveness}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#061520', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: m.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {m.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ fontSize: 12, marginTop: 8 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>⚠️ Eksik: </span><span style={{ color: '#d1d5db' }}>{m.cons}</span></div>
                  <div style={{ background: m.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {m.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'sources' && (
          <div style={{ background: '#061520', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🌊 Su Kaynağı Güvenlik Sıralaması</div>
            {SOURCES.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SOURCES.length-1 ? '1px solid #0a2030' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{s.source}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: s.safety === 'Tehlikeli' ? '#ef4444' : s.safety === 'Kötü' ? '#f59e0b' : s.safety === 'Orta' ? '#fbbf24' : '#22c55e' }}>{s.safety}</div>
                    </div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{s.advice}</div>
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
