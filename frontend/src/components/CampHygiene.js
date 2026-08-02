import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'personal', name: 'Kişisel Hijyen', icon: '🚿', accent: '#06b6d4',
    items: [
      { t: 'Yüz ve boyun', d: 'Su tasarrufu bezi: az suyla silinerek temizleme. Doğa dostu sabun şart.' },
      { t: 'El hijyeni', d: 'Doğa alkol jeli: yemek öncesi ve tuvalet sonrası. Kamp suyu kıymetli.' },
      { t: 'Ayak bakımı', d: 'Çizme çıkarınca yıka ve kuru tut — su topuğu en büyük tehdit.' },
      { t: 'Diş temizliği', d: 'Sucul ekosistem: diş macunu tükürme suya değil, toprağa ve yay.' },
      { t: 'Çamaşır', d: 'Islak çamaşır gece soğuk: kuru yedek mutlaka yanında.' },
    ],
  },
  {
    id: 'food', name: 'Yemek Hijyeni', icon: '🍽️', accent: '#22c55e',
    items: [
      { t: 'Yemek alanı', d: 'Çadırdan en az 60m uzakta yemek pi, ye, bulaşık yıka — yaban hayatı gelmesin.' },
      { t: 'Bulaşık yıkama', d: 'Biyobozunur sabunla, gri su sızgıçtan geçirip yay.' },
      { t: 'Yiyecek saklama', d: 'Ayı bölgesi: asma sistemi, 5m yüksek, ağaçtan 2m uzak. Kilitli kutu.' },
      { t: 'Pişmemiş et', d: 'Ayrı kap ve bıçak — çapraz kirlenme engelle.' },
      { t: 'Atık su', d: 'Yemek suyu aynı 60m kuralı — konsantre dök, yay.' },
    ],
  },
  {
    id: 'waste', name: 'Atık ve Tuvalet', icon: '🌿', accent: '#f59e0b',
    items: [
      { t: 'Kedi deliği (cat hole)', d: 'En az 60m su, kamp, yol uzağında, 15-20cm derin kazı.' },
      { t: 'Tuvalet kağıdı', d: 'Biyobozunur kağıt ile gömülür veya zip bag ile taşı — asla bırakma.' },
      { t: 'Kadın ürünleri', d: 'Yanında çift kilitli zip bag — katı atık gibi taşı.' },
      { t: 'Gri su', d: 'Sızgı bezi ile süz, geniş alana yay — konsantre depolama yaratma.' },
      { t: 'İz bırakma', d: 'LNT: Leave No Trace — gördüğün gibi bırak, daha iyi bırak.' },
    ],
  },
  {
    id: 'camp', name: 'Kamp Düzeni', icon: '⛺', accent: '#a78bfa',
    items: [
      { t: 'Üçgen kural', d: 'Çadır · yemek alanı · asma noktası — eşkenar üçgen, 60m kenar.' },
      { t: 'Su kaynağı mesafesi', d: 'Çadır ve tuvalet su kaynağından 60m (Türkiye LNT standardı).' },
      { t: 'Kalabalık kamp', d: 'Birden fazla grup: alanı dağıt — iz yoğunluğunu yay.' },
      { t: 'Çadır içi temizlik', d: 'Çizmeleri dışarda çıkar, uyku tulumu temiz tut.' },
      { t: 'Işık kirliliği', d: 'Kırmızı ışık modu: geceyi bozmaz, hayvanları etkilemez.' },
    ],
  },
];

export default function CampHygiene() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060e08', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏕️ Kamp Hijyeni</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kişisel · yemek · atık · kamp düzeni — LNT prensipleri</div>
      </div>

      <div style={{ background: '#0a1608', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>🌿 LNT — İZ BIRAKMA</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Doğayı geldiğin gibi veya daha temiz bırak. Kamp hijyeni sadece sağlık için değil, doğa koruması için şart.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#0a1608', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.items.length} önemli kural</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a1608', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0f1e10' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>{item.t}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
