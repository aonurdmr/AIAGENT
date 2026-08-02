import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FORESTS = [
  {
    id: 'belgrad', name: 'Belgrad Ormanı', region: 'İstanbul', icon: '🌲', accent: '#22c55e',
    area: '5.440 hektar',
    trees: 'Meşe, kayın, kestane, çam',
    access: 'Kemerburgaz · Metro-minibüs · İstanbul\'a 30 dk',
    trails: '4 işaretli parkur · 2-8 km',
    wildlife: 'Kirpi, tilki, 80+ kuş türü',
    bestTime: 'Yaz: sabah 07:00-10:00 · Sonbahar: gün içi',
    tip: 'Sonbaharda kestane ve yaprak rengi. Bahar da çiçek açılışı muhteşem.',
  },
  {
    id: 'koru', name: 'Uludağ Ormanları', region: 'Bursa', icon: '🏔️', accent: '#3b82f6',
    area: '11.338 hektar',
    trees: 'Karaçam, sarıçam, kayın, göknar',
    access: 'Bursa\'ya 30 km · teleférik veya araç',
    trails: '12 parkur · 3-15 km',
    wildlife: 'Karaca, dağ keçisi, kaya kartalı',
    bestTime: 'Yaz: 1500m+ serin · İlkbahar: çiçek vadisi',
    tip: 'Orman banyosu için alt kısımlar (900-1400m) gürültüsüz. Üst kısımlar kalabalık.',
  },
  {
    id: 'kure', name: 'Küre Dağları', region: 'Bartın–Kastamonu', icon: '🌳', accent: '#10b981',
    area: '37.000 hektar · Milli Park',
    trees: 'Kayın, ıhlamur, gürgen, akçaağaç',
    access: 'Bartın\'dan 45 dk · Öğlen Köyü giriş noktası',
    trails: '8 parkur · kanyon yürüyüşleri',
    wildlife: 'Boz ayı, vaşak, su samuru, 200+ kuş türü',
    bestTime: 'Mayıs–Haziran ve Eylül–Ekim',
    tip: 'Valla Kanyonu orman banyosu + kanyon yürüyüşü için Türkiye\'nin en iyi kombinasyonu.',
  },
  {
    id: 'yedigoller', name: 'Yedigöller Milli Parkı', region: 'Bolu', icon: '🏞️', accent: '#f59e0b',
    area: '1.723 hektar',
    trees: 'Kayın, meşe, akçaağaç, sedir',
    access: 'Ankara\'ya 200 km · araçla 2.5 saat',
    trails: 'Göl çevresi parkurları · 1-5 km',
    wildlife: 'Çeşitli ördek türleri, balıkçıl, kirpi',
    bestTime: 'Ekim–Kasım (sonbahar rengi) · Mayıs (yeşil)',
    tip: 'Sonbahar rengi fotoğrafçılığı için Türkiye\'nin en ikonik noktası.',
  },
];

const BENEFITS = [
  { icon: '🧘', label: 'Stres Azaltma', desc: 'Orman havası phytoncide içerir — kortizol seviyesini %15 düşürür' },
  { icon: '💪', label: 'Bağışıklık', desc: 'NK (doğal öldürücü) hücre aktivitesi 3 günlük ormanda 50% artar' },
  { icon: '❤️', label: 'Kalp Sağlığı', desc: 'Tansiyon ve nabız ormanda düşer — aktif meditasyon etkisi' },
  { icon: '😴', label: 'Uyku Kalitesi', desc: 'Melatonin üretimi artar — orman yürüyüşü sonrası uyku derin' },
  { icon: '🧠', label: 'Konsantrasyon', desc: 'Dikkat yorgunluğu orman ile iyileşir — ADHD ve tükenmişlik için önerilir' },
  { icon: '🌬️', label: 'Hava Kalitesi', desc: 'Fitonsitler havayı filtreler — şehir havasından %400 temiz' },
];

const HOW_TO = [
  'Telefonu sessiz moda al — bildirimler ormanın etkisini kırar',
  'Yavaş yürü — dakikada 1 km altı yürüyüş banyosu olarak kabul edilir',
  '5 duyu protokolü: 5 görüntü, 4 ses, 3 doku, 2 koku, 1 tat',
  'Ağaçlara dokun — kabuk dokusu ve sertliği farkındalık artırır',
  'Oturak noktalar seç: 5-10 dakika hareketsiz otur, ormanı hisset',
  'Minimum 2 saat gerekir — kısa yürüyüş rekreasyon, uzun yürüyüş banyo',
  'Yağmur sonrası orman en zengin fitonsit anı — ıslak orman kokusu iyileştirici',
];

export default function ForestBathing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('forests');

  return (
    <div style={{ background: '#030f06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌲 Orman Banyosu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Shinrin-yoku · 4 orman, faydalar & teknikler</div>
      </div>

      <div style={{ margin: '0 16px 12px', background: '#22c55e12', borderRadius: 12, padding: '12px 14px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700, marginBottom: 3 }}>🇯🇵 Shinrin-yoku</div>
        <div style={{ fontSize: 12, color: '#d1d5db' }}>Orman banyosu (Japonca: 森林浴) — bilinçli orman deneyimi. 1982'den beri Japon sağlık politikasının parçası.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['forests','Ormanlar'],['benefits','Faydalar'],['howto','Nasıl']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0a1f0c', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'forests' && FORESTS.map(f => {
          const open = sel === f.id;
          return (
            <div key={f.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : f.id)} style={{
                background: '#0a1f0c', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${f.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>📍 {f.region} · {f.area}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a1f0c', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${f.accent}33`, borderTop: 'none' }}>
                  {[['🌳 Ağaç Türleri', f.trees], ['🚗 Erişim', f.access], ['🥾 Parkurlar', f.trails], ['🦊 Yaban Hayatı', f.wildlife], ['⏰ En İyi Zaman', f.bestTime]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: f.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: f.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: f.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{f.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'benefits' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{ background: '#0a1f0c', borderRadius: 12, padding: 12, border: '1px solid #22c55e22' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{b.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', marginBottom: 4 }}>{b.label}</div>
                <div style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'howto' && (
          <div style={{ background: '#0a1f0c', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🌿 Orman Banyosu Nasıl Yapılır?</div>
            {HOW_TO.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, paddingBottom: 10, borderBottom: i < HOW_TO.length-1 ? '1px solid #1a3c1c' : 'none' }}>
                <div style={{ background: '#22c55e22', color: '#22c55e', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i+1}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{t}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
