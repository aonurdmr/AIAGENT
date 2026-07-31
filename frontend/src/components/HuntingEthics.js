import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PRINCIPLES = [
  {
    id: 'fair_chase', title: 'Fair Chase (Adil Av)', icon: '⚖️', accent: '#22c55e',
    desc: 'Avın yalnızca hayvanın doğal davranışlarını ve kaçış şansını denkleştirdiği durumlarda yapılması. Teknolojik üstünlük, sahaya saygıyla dengelenmeli.',
    rules: ['Elektronik av çağrıcısını etik sınır dahilinde kullan', 'Uyuyan veya mahsur kalmış hayvanı avlama', 'Koruma alanlarına girilmez'],
    question: 'Bu avı anlatsam utanır mıyım? — eğer evet, yapmayın.',
  },
  {
    id: 'sustainability', title: 'Sürdürülebilir Av', icon: '♻️', accent: '#3b82f6',
    desc: 'Av baskısının hayvan popülasyonunu olumsuz etkilemeyeceği şekilde avlanmak.',
    rules: ['Lokal popülasyon trendlerini takip et', 'Kota limitlerini kesin uy', 'Gençleri (özellikle dişi) avlama'],
    question: 'Bu av 5 yıl sonra da burada hayvan olmasını sağlar mı?',
  },
  {
    id: 'clean_kill', title: 'Temiz Vuruş', icon: '🎯', accent: '#f59e0b',
    desc: 'Hayvanın acı çekmeden, mümkün olan en kısa sürede hayatını kaybetmesini sağlamak.',
    rules: ['Yalnızca güvenli atış mesafesi ve açısında ateş et', 'Emin olmadan çekme yapma', 'Yaralı hayvanı mutlaka takip et ve bitir'],
    question: 'Bu atış ile hayvan anında ölür mü?',
  },
  {
    id: 'habitat', title: 'Habitat Koruması', icon: '🌿', accent: '#10b981',
    desc: 'Av arazisini ve ekosistemi gelecek nesiller için korumak avcının sorumluluğudur.',
    rules: ['Çöpleri geri taşı', 'Arazi sahibiyle iyi ilişki kur ve izin al', 'Parmak izini minimize et'],
    question: 'Bu alana geleneğimden daha fazlasını geri veriyor muyum?',
  },
  {
    id: 'species_selection', title: 'Tür Seçimi', icon: '🦌', accent: '#a78bfa',
    desc: 'Avlanan türün korunma durumunu, yaş/cinsiyetini ve ekosisteme katkısını değerlendirmek.',
    rules: ['Nesli tehlike altında türleri kesinlikle avlama', 'Trophy hunting yerine selektif av yönetimini destekle', 'Yabancı avcılarla mücadele et'],
    question: 'Bu hayvanın ölümü popülasyonu zayıflatır mı?',
  },
  {
    id: 'waste', title: 'Kaynakları Değerlendirme', icon: '🥩', accent: '#ef4444',
    desc: 'Avlanan hayvanın et, deri, kemik dahil her parçasının saygıyla değerlendirilmesi.',
    rules: ['Sadece sport için avlanan hayvanı bırakma', 'Etini tüket, paylaş veya bağışla', 'Gizli bırakma / saklama yasal sorunlara yol açar'],
    question: 'Bu hayvan saygıyla değerlendirildi mi?',
  },
];

const CODES = [
  { org: 'CIC (Int. Av Konseyi)', principle: 'Wildlife ve habitat yönetimi için küresel standartlar' },
  { org: 'Türkiye Av Federasyonu', principle: 'Ulusal av etiği kodu ve kota yönetimi' },
  { org: 'IUCN Avcı Etiği', principle: 'Küresel kırmızı liste ile avlanılabilir türlerin tespiti' },
];

export default function HuntingEthics() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⚖️ Av Etiği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Sürdürülebilir av · etik ilkeler & sorumluluk</div>
      </div>

      <div style={{ margin: '0 16px 12px', background: '#22c55e15', borderRadius: 12, padding: '12px 14px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 700, marginBottom: 4 }}>🌿 Avcı Sorumluluğu</div>
        <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>
          Gerçek avcı, doğanın bir parçasıdır. Habitatı korur, kuralları çiğnemez, hayvanı saygıyla değerlendirir.
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {PRINCIPLES.map(p => {
          const open = sel === p.id;
          return (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : p.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${p.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{p.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{p.title}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${p.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{p.desc}</div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>✅ TEMEL KURALLAR</div>
                    {p.rules.map((r, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3, display: 'flex', gap: 8 }}>
                        <span style={{ color: p.accent }}>•</span> {r}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: p.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: p.accent, fontWeight: 600, marginBottom: 3 }}>❓ KENDİNE SOR</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', fontStyle: 'italic', lineHeight: 1.6 }}>{p.question}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', marginTop: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginBottom: 10 }}>🌍 Uluslararası Standartlar</div>
          {CODES.map((c, i) => (
            <div key={i} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: i < CODES.length - 1 ? '1px solid #374151' : 'none' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#d1d5db' }}>{c.org}</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{c.principle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
