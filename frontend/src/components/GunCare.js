import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GUN_TYPES = [
  {
    id: 'shotgun', name: 'Av Tüfeği (Pompalı/O/U)', icon: '🔫', accent: '#f97316',
    use: 'Keklik, bıldırcın, ördek avı',
    cleaning_steps: [
      'Namlunun boş olduğunu kontrol et — güvenlik birinci',
      'Namluyu söküp solvent fırçayla temizle',
      'Mekanizmayı fırçayla tozdan arındır',
      'Yağlama: namlu içi ince yağ, mekanizma hareketli parçalar',
      'Dış yüzey: paslanmayı önleyici yağ bez ile sil',
    ],
    storage: 'Kuru havalandırmalı kasa · mermiden ayrı · kilitli dolap',
    maintenance_freq: 'Her av sonrası temel, yılda 1 tam bakım',
    tip: 'Namlu ıslandıktan sonra 24 saat içinde temizle — paslanma çok hızlı başlar.',
  },
  {
    id: 'rifle', name: 'Av Tüfeği (Yivli/Sürgülü)', icon: '🎯', accent: '#ef4444',
    use: 'Büyük av: geyik, yaban domuzu, karaca',
    cleaning_steps: [
      'Şarjörü çıkar, hazneyi boşalt, gözle kontrol',
      'Solvent emdirilen yama namludan geçir (arka→önden)',
      'Bakır kalıntı için bakır çözücü — 10 dk bekle',
      'Kuru yama ile sil, yağlı yama son geçiş',
      'Dürbün montaj vidalarını kontrol et — gevşeme olabilir',
    ],
    storage: 'Silika jel ile kuru ortam · tercihen silah kasası · mermi ayrı',
    maintenance_freq: 'Her atıştan sonra temel, 200 atışta tam bakım',
    tip: 'Yivli namluyu soldan sağa değil, kuyruktan ağzına doğru temizle — çizik önle.',
  },
  {
    id: 'semi', name: 'Yarı Otomatik Tüfek', icon: '💨', accent: '#a78bfa',
    use: 'Keklik, bıldırcın, domuz avı (yasal bölgede)',
    cleaning_steps: [
      'Şarjörü çıkar, hazneyi boşalt',
      'Sürgüyü geri çek, hort çıkar',
      'Gazlı mekanizmayı söküp yağdan arındır',
      'Tüm parçaları kurula, hafif yağla',
      'Yayları ve hortu Monte ederken kontrol et',
    ],
    storage: 'Mermi çıkarılmış, yatay ya da dikey özel askı',
    maintenance_freq: 'Her 3 atıştan sonra gaz pistonunu kontrol et',
    tip: 'Yarı otoların gaz pistonu tıkanırsa ateşleme takılır — en sık ihmal edilen nokta.',
  },
];

const SAFETY_RULES = [
  { icon: '☝️', rule: 'Her silah dolu kabul et', desc: 'Kontrol etsen bile — güvenli kullanım alışkanlığı' },
  { icon: '🚫', rule: 'Hedef olmayan yere asla', desc: 'Namlu ucu sadece vurmak istediğin yöne' },
  { icon: '🔒', rule: 'Tetik muhafazalı tut', desc: 'Hazır değilken parmak tetik dışında' },
  { icon: '👁️', rule: 'Hedefin arkasını gör', desc: 'Mermi geçer — arka plan kritik, özellikle av alanında' },
  { icon: '📦', rule: 'Mermiyi ayrı sakla', desc: 'Silah ile merminin aynı kasada saklanması tehlikeli' },
  { icon: '🏥', rule: 'Bakım uzmanına götür', desc: 'Yıllık bakım ve ruhsat kontrolü — yasal zorunluluk' },
];

export default function GunCare() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('guns');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0f0a06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔫 Av Silahı Bakımı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>3 silah tipi · temizlik adımları & güvenlik</div>
      </div>

      <div style={{ background: '#1a0808', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>⚠️ GÜVENLİK UYARISI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Tüm bakım işlemlerinde silahın boş olduğunu doğrula. Ruhsatsız silah bulundurma yasal suçtur.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['guns','Silah Tipleri'],['safety','Güvenlik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#160e04', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'guns' && GUN_TYPES.map(g => {
          const open = sel === g.id;
          return (
            <div key={g.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : g.id)} style={{
                background: '#160e04', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${g.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{g.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{g.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{g.use}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#160e04', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${g.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: g.accent, fontWeight: 700, marginBottom: 4, marginTop: 8 }}>🧹 TEMİZLİK ADIMLARI</div>
                  {g.cleaning_steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4 }}>{i+1}. {s}</div>)}
                  <div style={{ fontSize: 12, marginTop: 8 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>📦 Depolama: </span><span style={{ color: '#d1d5db' }}>{g.storage}</span></div>
                  <div style={{ fontSize: 12, marginTop: 4 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>⏱️ Sıklık: </span><span style={{ color: '#d1d5db' }}>{g.maintenance_freq}</span></div>
                  <div style={{ background: g.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {g.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'safety' && (
          <div style={{ background: '#160e04', borderRadius: 14, padding: 14, border: '1px solid #f9731622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>🛡️ Silah Güvenliği — 6 Altın Kural</div>
            {SAFETY_RULES.map((r, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < SAFETY_RULES.length-1 ? '1px solid #2a1808' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fed7aa' }}>{r.rule}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{r.desc}</div>
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
