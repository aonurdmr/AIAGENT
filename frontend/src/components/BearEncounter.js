import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BEARS = [
  {
    id: 'brown', name: 'Kahverengi Ayı', icon: '🐻', accent: '#92400e',
    desc: 'Türkiye\'nin en büyük kara hayvanı. Karadeniz ve Doğu Anadolu\'da yaygın. Kaçak karşılaşmada saldırıdan kaçınır — koruyucu saldırı yapabilir.',
    habitat: 'Karadeniz kıyı dağları, Doğu Anadolu ormanları, yüksek otlaklar',
    activeTime: 'Şafak ve gün batımı — gündüz kaçınır',
    weight: '100-350 kg · Yük hayvanı olarak güçlü ve hızlı (50 km/s)',
    signs: ['Pençe izleri (önde 5 uzun parmak)', 'Büyük dışkı (meyve ve böcek kalıntısı)', 'Devrilmiş taş ve tomruklar', 'Ağaçlarda tırmalama izleri'],
    behavior: 'Genellikle çekingen. Aniden karşılaşma veya yaralı ayı tehlikelidir.',
  },
  {
    id: 'black', name: 'Boz Ayı (Ursus arctos)', icon: '🐻', accent: '#6b7280',
    desc: 'Türkiye\'deki ayılar boz ayı (Ursus arctos) türündendir — siyah veya kahverengi renk varyantı olabilir. Kuzey yarımkürenin en geniş yayılımlı büyük memelisi.',
    habitat: 'Türkiye\'de çam ve kayın ormanları, alp çayırları',
    activeTime: 'Gündüz de aktif olabilir, özellikle bahar',
    weight: '150-250 kg · İnanılmaz koku alma — insanı 30 km uzaktan algılar',
    signs: ['Ormanda devrilmiş kütükler (böcek arıyor)', 'Dut ve yaban mersini alanlarında bırakılmış meyve izleri', 'Akarsuyun kenarında balık kalıntısı'],
    behavior: 'Kış uykusundan çıkış döneminde (Mart-Nisan) açken daha agresif.',
  },
];

const ENCOUNTER_STEPS = [
  {
    scenario: 'Uzaktan Gördüğünde', icon: '👁️', color: '#22c55e',
    steps: [
      'Dur, sakin ol — kaçma, koşu saldırı içgüdüsünü tetikler',
      'Sakin ama güçlü sesle konuş — "Hey ayı, gidiyorum" gibi',
      'Sırtını dönme, yavaşça arkaya git',
      'Rüzgarı dikkate al — ayı seni duymazsa koklayarak fark eder',
      'Güvenli mesafeye çekil (200m+) ve rotanı değiştir',
    ],
  },
  {
    scenario: 'Yakın Karşılaşmada', icon: '😨', color: '#f59e0b',
    steps: [
      'Ellerini kaldır — kendini büyük göster',
      'Doğrudan göz temasından kaçın ama durumu izle',
      'Sakin ve alçak sesle konuş, aniden hareket etme',
      'Bear spray elde bulundurun — 5-7 metre menzil',
      'Yavaşça geri çekil — şimdilik ayı sana karşı değil',
    ],
  },
  {
    scenario: 'Saldırı Anında', icon: '🚨', color: '#ef4444',
    steps: [
      'Bear spray\'i 5-7 m mesafede ayının yüzüne sık',
      'Koruyucu saldırı (aniden karşılaşma): yere yüzüstü yat, ellerle enseni koru, ölü taklidi yap',
      'Predatör saldırı (kovalama): KAÇMA — savaş, sesli ol, direniş göster',
      'Yavrulu anne: hiçbir zaman yavru ile arasında kalma',
      'Saldırı geçtikten sonra sakin sakin uzaklaş, koşma',
    ],
  },
];

const PREVENTION = [
  { icon: '🔔', tip: 'Kamp çanı veya sesli aksesuar tak — sürpriz karşılaşmayı önler' },
  { icon: '🍖', tip: 'Yiyeceği çadırında sakla — ayı güvenli yiyecek kutusu kullan' },
  { icon: '🧴', tip: 'Parfüm, sabun ve kokulu kremi minimuma indir' },
  { icon: '🗑️', tip: 'Çöpü asla ormana bırakma veya kamp yakınına göme' },
  { icon: '🐕', tip: 'Köpeği tasmalı tut — serbest köpek ayıyla karşılaşırsa seni getirir' },
  { icon: '🌙', tip: 'Gece yürüyüşünde el feneri kullan — ışık karşılaşmayı azaltır' },
  { icon: '💨', tip: 'Rüzgarı ön planda tut — rüzgar karşından eserse seni önceden duyar' },
  { icon: '📱', tip: 'Bölge yetkililerine bildir — son ayı aktivite raporunu öğren' },
];

export default function BearEncounter() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('bears');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐻 Ayı ile Karşılaşma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye ayıları · güvenlik protokolü & önlem</div>
      </div>

      <div style={{ margin: '0 16px 12px', background: '#92400e15', borderRadius: 12, padding: '12px 14px', border: '1px solid #92400e33' }}>
        <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700, marginBottom: 4 }}>⚠️ Önemli Uyarı</div>
        <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>
          Ayılar Türkiye\'de korunan türdür. Rahatsız edilmeden bırakıldığında genellikle tehlikeli değildir. Bear spray kesinlikle taşınması önerilir.
        </div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['bears', '🐻 Türler'], ['encounter', '🚨 Karşılaşma'], ['prevent', '🛡️ Önlem']].map(([id, lbl]) => (
          <button key={id} onClick={() => { setTab(id); setSel(null); }} style={{
            flex: 1, background: tab === id ? '#92400e' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#92400e' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'bears' && BEARS.map(b => {
          const open = sel === b.id;
          return (
            <div key={b.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : b.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${b.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{b.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{b.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${b.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{b.desc}</div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>🗺️ BİLGİLER</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>📍 {b.habitat}</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>⏰ {b.activeTime}</div>
                    <div style={{ fontSize: 12, color: '#d1d5db' }}>⚖️ {b.weight}</div>
                  </div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>👣 VARLIK İZLERİ</div>
                    {b.signs.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}><span style={{ color: b.accent }}>•</span> {s}</div>)}
                  </div>
                  <div style={{ background: b.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: b.accent, fontWeight: 600, marginBottom: 3 }}>🧠 DAVRANIŞI</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{b.behavior}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'encounter' && ENCOUNTER_STEPS.map((e, idx) => (
          <div key={idx} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: `1px solid ${e.color}33` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{e.icon}</span>
              <div style={{ fontSize: 13, fontWeight: 700, color: e.color }}>{e.scenario}</div>
            </div>
            {e.steps.map((s, i) => (
              <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 6, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: e.color, fontWeight: 700, flexShrink: 0, fontSize: 13 }}>{i + 1}.</span>
                <span style={{ lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>
        ))}

        {tab === 'prevent' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>En iyi ayı güvenliği bir karşılaşmayı hiç yaşamamaktır. Bu kurallar riski dramatik biçimde azaltır.</div>
            </div>
            {PREVENTION.map((p, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{p.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{p.tip}</div>
              </div>
            ))}
            <div style={{ background: '#92400e15', borderRadius: 12, padding: '14px 16px', border: '1px solid #92400e33', marginTop: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>🧴 Bear Spray Kullanımı</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>
                Rüzgar yönünü dikkate alarak sık. %7-9 capsaicin içerikli ürün seç. 5-7 m. mesafeden 3-5 saniye püskürt. Silahdan 4 kat daha etkilidir.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
