import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LICENSE_TYPES = [
  {
    id: 'amateur', name: 'Amatör Su Ürünleri Ruhsatı', icon: '🎣', accent: '#3b82f6',
    who: 'Tüm Türk vatandaşları ve yabancılar (18 yaş ve üstü)',
    validity: '1 yıl (Ocak 1 – Aralık 31)',
    where: 'e-Devlet veya il tarım müdürlükleri',
    steps: [
      'e-Devlet\'e giriş yapın (e-devlet.gov.tr)',
      'Arama: "Su Ürünleri Ruhsat"',
      'Tarım ve Orman Bakanlığı → Amatör Su Ürünleri Avcılığı Ruhsatı',
      'Form doldurun, ücret ödeyin',
      'PDF ruhsatınızı indirin veya e-Devlet\'te saklayın',
    ],
    fee2024: 'Bireysel: 150 TL / Yıl (2024 tahmini)',
    restrictions: ['Günde max 3 kg veya 1 adet (hangisi önce doluyorsa)', 'Boy limitlerini geçmeyen balıkları avlamak yasak', 'Dinamit, elektrik, zehir kesinlikle yasak'],
    penalty: '1380 sayılı Kanun kapsamında ceza uygulanır',
    note: 'Sahil Güvenlik veya balıkçılık denetçisi isterse belgeyi göstermelisiniz.',
  },
  {
    id: 'senior', name: '65 Yaş Üstü / Engelli Ruhsatı', icon: '👴', accent: '#22c55e',
    who: '65 yaş üstü veya %40+ engeli olan bireyler',
    validity: 'Süresiz (her yıl başvuru gerekmez)',
    where: 'Tarım ve Orman İl Müdürlüğü (e-Devlet seçeneği olabilir)',
    steps: [
      'İl tarım müdürlüğüne şahsen başvurun',
      'Nüfus cüzdanı / kimlik belgesi götürün',
      'Engel durumu için sağlık kurulu raporu (engelli için)',
      'Ücretsiz veya indirimli olarak verilir',
    ],
    fee2024: 'Ücretsiz veya sembolik ücret',
    restrictions: ['Standart amatör ruhsat kuralları geçerli'],
    penalty: 'Standart',
    note: 'Belge alındıktan sonra her yıl vize gerekebilir. İl müdürlüğünü arayıp teyit edin.',
  },
  {
    id: 'youth', name: 'Öğrenci / 18 Yaş Altı', icon: '👦', accent: '#f59e0b',
    who: '18 yaş altı çocuklar',
    validity: '1 yıl',
    where: 'Ebeveyn/vasi refakatinde e-Devlet veya il müdürlüğü',
    steps: [
      'Ebeveyn kendi e-Devlet hesabından başvurabilir',
      'Çocuğun TC kimlik numarasını girin',
      'Ücret ödeyin, belge alın',
    ],
    fee2024: 'İndirimli — tam ücretten düşük',
    restrictions: ['Ebeveyn refakati önerilir', 'Standart boy/miktar limitleri geçerli'],
    penalty: 'Ebeveyn sorumlu tutulabilir',
    note: '18 yaşından küçükler için öğrenci belgesi gerekebilir. İl müdürlüğünü teyit edin.',
  },
  {
    id: 'foreign', name: 'Yabancı Uyruklu Ruhsatı', icon: '🌍', accent: '#8b5cf6',
    who: 'Türkiye\'de turist veya ikamet eden yabancı uyruklu kişiler',
    validity: '1 yıl veya ziyaret süresi',
    where: 'Tarım ve Orman İl Müdürlükleri (e-Devlet şartlı)',
    steps: [
      'Pasaport veya yabancı kimlik belgesi ile il müdürlüğüne başvurun',
      'E-ikamet sahibiyseniz e-Devlet denenebilir',
      'Türkçe form doldurun veya çevirmen yardımı alın',
    ],
    fee2024: 'Vatandaş ücretinin 3-5 katı (değişken)',
    restrictions: ['Türkiye kıta sahanlığı sınırları dahilinde', 'Standat amatör kısıtlamalar'],
    penalty: 'Sınır dışı edilme riski dahil ağır ceza',
    note: 'Kıyı yakınındaki kamp alanı işletmeleri de günlük ruhsat ayarlayabilir.',
  },
];

const REGULATIONS_QUICK = [
  { rule: 'Levrek boy limiti', value: '≥ 25 cm', icon: '📏' },
  { rule: 'Çipura boy limiti', value: '≥ 20 cm', icon: '📏' },
  { rule: 'Alabalık boy limiti', value: '≥ 18 cm', icon: '📏' },
  { rule: 'Sazan boy limiti', value: '≥ 30 cm', icon: '📏' },
  { rule: 'Günlük miktar', value: '3 kg veya 1 adet (büyük)', icon: '⚖️' },
  { rule: 'Yasaklı araçlar', value: 'Elektrik, zehir, dinamit, patlayıcı', icon: '🚫' },
  { rule: 'İzinli kanca tipi', value: 'Tek iğneli çengel (barbsiz önerilir)', icon: '🪝' },
  { rule: 'Av saati', value: 'Gün doğumu–gün batımı (aksi belirtilmedikçe)', icon: '🕐' },
];

const FINES = [
  { violation: 'Ruhsatsız avlanma', fine: '500–2.000 TL' },
  { violation: 'Boy sınırı ihlali', fine: '250–1.000 TL + balık iadesi' },
  { violation: 'Yasak bölgede avlanma', fine: '1.000–5.000 TL' },
  { violation: 'Zehir/elektrik kullanımı', fine: '10.000+ TL + hapis' },
  { violation: 'Aşırı miktar avlama', fine: '2.000–5.000 TL' },
];

export default function FishingLicense() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📋 Balıkçı Ruhsatı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ruhsat türleri, başvuru adımları & ceza tablosu</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['types', '🪪 Ruhsat Türleri'], ['rules', '⚖️ Kurallar'], ['fines', '💸 Cezalar']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#3b82f6' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#3b82f6' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'types' && (
          <div>
            {LICENSE_TYPES.map(lt => {
              const open = sel === lt.id;
              return (
                <div key={lt.id} style={{ marginBottom: 8 }}>
                  <div onClick={() => setSel(open ? null : lt.id)} style={{
                    background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                    padding: '14px 16px', border: `1px solid ${lt.accent}33`, cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 26 }}>{lt.icon}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{lt.name}</div>
                          <div style={{ fontSize: 11, color: '#6b7280' }}>{lt.validity}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 16, color: '#6b7280' }}>{open ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {open && (
                    <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${lt.accent}33`, borderTop: 'none' }}>
                      <div style={{ marginTop: 8 }}>
                        {[
                          ['👤 Kimler başvurabilir', lt.who],
                          ['📍 Nerede', lt.where],
                          ['💰 Ücret (2024)', lt.fee2024],
                        ].map(([lbl, val]) => (
                          <div key={lbl} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
                            <span style={{ fontWeight: 600, color: '#6b7280' }}>{lbl}:</span> <span style={{ color: '#d1d5db' }}>{val}</span>
                          </div>
                        ))}

                        <div style={{ background: '#374151', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
                          <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>📲 BAŞVURU ADIMLARI</div>
                          {lt.steps.map((s, i) => (
                            <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4, display: 'flex', gap: 8 }}>
                              <span style={{ color: lt.accent, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {s}
                            </div>
                          ))}
                        </div>

                        <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                          <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🚫 KISITLAMALAR</div>
                          {lt.restrictions.map((r, i) => (
                            <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3, display: 'flex', gap: 6 }}>
                              <span style={{ color: '#ef4444' }}>•</span> {r}
                            </div>
                          ))}
                        </div>

                        <div style={{ background: lt.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                          <div style={{ fontSize: 10, color: lt.accent, fontWeight: 600, marginBottom: 3 }}>ℹ️ NOT</div>
                          <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{lt.note}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'rules' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>
                Türkiye'de amatör balıkçılık <strong style={{ color: '#f9fafb' }}>1380 sayılı Su Ürünleri Kanunu</strong> ve buna bağlı tebliğlerle düzenlenmektedir. Kurallar her yıl güncellenebilir.
              </div>
            </div>
            {REGULATIONS_QUICK.map(r => (
              <div key={r.rule} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{r.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb' }}>{r.rule}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{r.value}</div>
                </div>
              </div>
            ))}
            <div style={{ background: '#f59e0b15', borderRadius: 12, padding: '12px 14px', border: '1px solid #f59e0b33', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600, marginBottom: 4 }}>⚠️ ÖNEMLİ UYARI</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>
                Bu bilgiler genel rehber niteliğindedir. Avlanmadan önce bulunduğunuz bölgenin güncel tebliğini Tarım ve Orman Bakanlığı'ndan teyit edin.
              </div>
            </div>
          </div>
        )}

        {tab === 'fines' && (
          <div>
            <div style={{ background: '#ef444415', borderRadius: 12, padding: '12px 14px', border: '1px solid #ef444433', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>⚖️ 1380 SAYILI KANUN — CEZA REHBERİ</div>
              <div style={{ fontSize: 12, color: '#d1d5db' }}>Tahminî değerlerdir; fiilî cezalar artabilir ve mahkeme kararıyla değişebilir.</div>
            </div>
            {FINES.map((f, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: '#f9fafb', fontWeight: 500 }}>{f.violation}</div>
                <span style={{ background: '#ef444422', color: '#ef4444', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 700, flexShrink: 0, marginLeft: 12 }}>{f.fine}</span>
              </div>
            ))}
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginTop: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginBottom: 8 }}>📞 Şikayet / Bildirme</div>
              {[
                ['ALO 174', 'Tarım ve Orman Bakanlığı ihbar hattı'],
                ['156', 'Jandarma (kırsal alanda kaçak av)'],
                ['158', 'Sahil Güvenlik (denizde kaçak av)'],
              ].map(([num, desc]) => (
                <div key={num} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span style={{ background: '#374151', borderRadius: 8, padding: '3px 10px', fontSize: 13, fontWeight: 700, color: '#3b82f6', flexShrink: 0 }}>{num}</span>
                  <span style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
