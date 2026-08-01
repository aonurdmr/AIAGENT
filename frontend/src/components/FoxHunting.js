import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TECHNIQUES = [
  {
    id: 'call', name: 'Çağrı ile Av', icon: '📣', accent: '#f97316',
    desc: 'Fare ve tavşan çığlığı taklidi',
    steps: [
      'Rüzgarı arkana al — koku tilkiye gitmemeli',
      'Elektronik çağrı veya ağız çağrısı: fare çığlığı, yaralı tavşan sesi',
      'İlk çağrı yüksek ve kısa — 30 saniye, sonra sessizlik',
      '2-3 dakika bekle, tekrar çağır',
      'Tilki genelde 10-15 dakikada gelir — sabırlı ol',
      'Çağrıdan 50-80m uzakta pozisyon al, rüzgara göre',
    ],
    tip: 'Sabah ve akşam tilki en aktif. Kışın kürk kalitesi en iyi dönem.',
  },
  {
    id: 'ambush', name: 'Pusu Avı', icon: '🌲', accent: '#22c55e',
    desc: 'Bilinen güzergah ve geçiş noktalarında bekleme',
    steps: [
      'Tilki izini ve dışkısını takip et — güzergahı belirle',
      'Tarla kenarı ve orman sınırı en çok kullanılan yol',
      'Çukur veya sırt arkasına saklan — siluet çıkarma',
      'Sabah erken (güneşten önce) veya akşam geç saatte bekle',
      'Kamera tuzak kur — hangi saatten geçtiğini öğren',
      'Kokuyu minimize et — rüzgar yönünü takip et',
    ],
    tip: 'Tilki rutini 3-4 günde bir değişir — izi taze mi kontrol et.',
  },
  {
    id: 'dog', name: 'Köpekle Av', icon: '🐕', accent: '#a78bfa',
    desc: 'Av köpeğiyle kovma ve yönlendirme',
    steps: [
      'Kokusuz tazı veya av köpeği — tilkiyi bölgeden çıkarır',
      'Avcı önceden bekleme noktasına geçer',
      'Tilki geçiş yolunda pusu kur',
      'Köpek kovaladıkça tilki bilinen güzergahtan kaçar',
      'Atışta güvenli mesafe — 30-60m',
    ],
    tip: 'Köpekle avda iletişim önemli — ekip koordinasyonu şart.',
  },
  {
    id: 'night', name: 'Gece Avı', icon: '🌙', accent: '#6366f1',
    desc: 'Termal veya gece görüşle karanlıkta av',
    steps: [
      'Termal: tarla tarama, 300m+ mesafede tilkiyi tespit et',
      'Gece görüş monoküler + spot ışık kombinasyonu',
      'Elektronik çağrı daha etkili — tilki cesur olur',
      'Hareket etme — tilki herhangi bir hareketi algılar',
      'Sessiz ayakkabı, yavaş nefes, minimum ekipman sesi',
    ],
    tip: 'Yasal uyarı: gece av iznine dikkat et, bölge bazlı farklılık var.',
  },
];

const GEAR = [
  { item: 'Silah', detail: '.223 veya .243 — hızlı, düz yol, kürk az zarar' },
  { item: 'Çağrı', detail: 'FoxPro, ICOtec elektronik çağrı veya ağız çağrısı' },
  { item: 'Kamuflaj', detail: 'Tam örtünme — tilki renk körü ama harekete çok duyarlı' },
  { item: 'Koku engeli', detail: 'Koku giderici sprey, rüzgar yönüne dikkat' },
  { item: 'Termal', detail: 'Pulsar veya FLIR — gece tarama zorunlu' },
  { item: 'İkibacak (bipod)', detail: 'Hassas atış için destek gerekli' },
];

export default function FoxHunting() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tech');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0d0804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦊 Tilki Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Çağrı · pusu · köpekle av · gece teknikleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['tech','Teknikler'],['gear','Ekipman']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#1a1005', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tech' && TECHNIQUES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#1a1005', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1a1005', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {t.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {t.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'gear' && (
          <div style={{ background: '#1a1005', borderRadius: 14, padding: 14, border: '1px solid #f9731622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>⚙️ Tilki Avı Ekipmanı</div>
            {GEAR.map((g, i) => (
              <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < GEAR.length-1 ? '1px solid #2a1a08' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fb923c', marginBottom: 2 }}>{g.item}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{g.detail}</div>
              </div>
            ))}
            <div style={{ background: '#ef444415', borderRadius: 8, padding: '10px 12px', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#fca5a5' }}>Yasal uyarı: Ruhsat zorunlu. Bölge av dönemi kontrol et. Gece av bazı illerde kısıtlı.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
