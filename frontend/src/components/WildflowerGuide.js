import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FLOWERS = [
  {
    id: 'nar', name: 'Yaban Nergisi', scientific: 'Narcissus pseudonarcissus', icon: '🌼', accent: '#fbbf24',
    color: 'Sarı',
    habitat: 'Orman kenarı, çayır · deniz seviyesi-1500m',
    bloom: 'Şubat–Nisan (ilk bahar müjdecisi)',
    region: 'Ege ve Marmara orman kenarları',
    ecology: 'Arı ve uzun dilli böcekler pollinate eder',
    tip: 'Doğa fotoğrafçılığı için ilkbaharın en dramatik türü. Toplu çiçeklenme 2-3 hafta sürer.',
    status: '⚠️ Koparma yasak — tarlalarda toplu büyür',
  },
  {
    id: 'lale', name: 'Yabani Lale', scientific: 'Tulipa sylvestris', icon: '🌷', accent: '#ef4444',
    color: 'Sarı/Kırmızı',
    habitat: 'Tarla, step bölgesi · orta Anadolu',
    bloom: 'Mart–Mayıs',
    region: 'Orta ve Doğu Anadolu (Türkiye lalenin anavatanı)',
    ecology: 'Böcek tozlaşması, tohumları rüzgarla yayılır',
    tip: 'Türkiye yabani lale çeşitliliği bakımından dünya lideri. İç Anadolu tepelerinde Nisan ayında muhteşem.',
    status: '🚨 Yabani lale toplanması kesinlikle yasak',
  },
  {
    id: 'dag_lalesi', name: 'Dağ Gelini', scientific: 'Paeonia mascula', icon: '🌸', accent: '#ec4899',
    color: 'Pembe-Kırmızı',
    habitat: 'Orman altı, taşlık yamaç · 800-2000m',
    bloom: 'Nisan–Haziran',
    region: 'Batı Anadolu, Toros etekleri',
    ecology: 'Tohumları kuşlar taşır. Ömrü uzun — 100+ yıl',
    tip: 'Dağ şakayığı olarak da bilinir. Nadir ve korunaklı.',
    status: '⚠️ Koruma altında — kesinlikle koparma',
  },
  {
    id: 'lavanta', name: 'Yabani Lavanta', scientific: 'Lavandula stoechas', icon: '💜', accent: '#a78bfa',
    color: 'Mor',
    habitat: 'Kuru kayalık, Akdeniz maki · 0-1200m',
    bloom: 'Nisan–Temmuz',
    region: 'Ege ve Akdeniz kıyıları',
    ecology: 'Arı bitkisi — bal kalitesini yükseltir',
    tip: 'Isparta\'da lavanta tarlası görseli ile ünlüdür. Yabani formu makide kümeler hâlinde büyür.',
    status: '✅ Tarlada yetiştirilir — yabani form izinle toplanabilir',
  },
  {
    id: 'kardelen', name: 'Kardelen', scientific: 'Galanthus nivalis', icon: '⚪', accent: '#e5e7eb',
    color: 'Beyaz',
    habitat: 'Orman, çayır, nehir kenarı · rakım bağımsız',
    bloom: 'Ocak–Mart (kar altında açar)',
    region: 'Marmara ve Karadeniz ormanları',
    ecology: 'İlk bahar nektarı — arı için kritik',
    tip: 'Kar üzerinde çiçek fotoğrafı olağanüstü etki. Makro lens ile damla detayları.',
    status: '⚠️ Koparma yasak — CITES Ek-II koruma',
  },
  {
    id: 'orkide', name: 'Salep Orkidesi', scientific: 'Orchis mascula', icon: '🌸', accent: '#c084fc',
    color: 'Leylak-Mor',
    habitat: 'Kireçtaşlı çayır, orman kenarı',
    bloom: 'Mayıs–Haziran',
    region: 'İç Anadolu, Karadeniz',
    ecology: 'Mantar simbiyozu ile büyür — transplant çalışmaz',
    tip: 'Türkiye orkide çeşitliliğinde Avrupa\'nın zengin ülkelerinden biri. 150+ tür.',
    status: '🚨 Tüm orkide türleri koruma altında — salep üretimi yasaklandı',
  },
];

const REGIONS = [
  { name: 'Ege · İzmir-Muğla', flowers: 'Lavanta, sümbül, siklamen, yabani lale', season: 'Mart–Mayıs', icon: '🌊' },
  { name: 'Karadeniz', flowers: 'Kardelen, orman orkidesi, dağ şakayığı', season: 'Nisan–Haziran', icon: '🌲' },
  { name: 'Toros Dağları', flowers: 'Yabani lale, Toros servi altı çiçekleri', season: 'Nisan–Temmuz', icon: '⛰️' },
  { name: 'Orta Anadolu', flowers: 'Step lalesi, çöl gülü, bozkır nergisi', season: 'Nisan–Mayıs', icon: '🏜️' },
];

const PHOTO_TIPS = [
  { icon: '☁️', tip: 'Bulutlu hava veya gölge — düz ışık renkleri çok daha iyi gösterir' },
  { icon: '💧', tip: 'Sabah çiğ — su damlacıkları ile makro muhteşem' },
  { icon: '📷', tip: 'Düşük açı (zemin seviyesi) çiçeği güçlü gösterir' },
  { icon: '🌿', tip: 'Arka plan önemi büyük — aynı renk karmaşa, tamamlayıcı renk etki' },
];

export default function WildflowerGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('flowers');

  return (
    <div style={{ background: '#0f0a12', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌸 Yabani Çiçekler</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 tür · sezon, bölge & fotoğraf rehberi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['flowers','Türler'],['regions','Bölgeler'],['photo','Fotoğraf']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#ec4899' : '#1a0f1a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'flowers' && FLOWERS.map(f => {
          const open = sel === f.id;
          return (
            <div key={f.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : f.id)} style={{
                background: '#1a0f1a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${f.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 28 }}>{f.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{f.name}</div>
                      <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{f.scientific}</div>
                    </div>
                  </div>
                  <span style={{ background: f.accent + '22', color: f.accent, borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>{f.color}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1a0f1a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${f.accent}33`, borderTop: 'none' }}>
                  {[['📍 Habitat', f.habitat], ['🌸 Çiçeklenme', f.bloom], ['📌 Bölge', f.region], ['🌿 Ekoloji', f.ecology]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: f.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: f.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: f.accent, fontWeight: 600, marginBottom: 3 }}>💡 FOTOĞRAF</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{f.tip}</div>
                  </div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '6px 10px', marginTop: 6 }}>
                    <div style={{ fontSize: 12, color: '#d1d5db' }}>{f.status}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'regions' && REGIONS.map((r, i) => (
          <div key={i} style={{ background: '#1a0f1a', borderRadius: 12, padding: 14, border: '1px solid #ec489922', marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#ec4899' }}>{r.name}</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>Sezon: {r.season}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#d1d5db' }}>{r.flowers}</div>
          </div>
        ))}

        {tab === 'photo' && (
          <div style={{ background: '#1a0f1a', borderRadius: 14, padding: 14, border: '1px solid #ec489922' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ec4899', marginBottom: 10 }}>📷 Çiçek Makro Fotoğrafçılığı</div>
            {PHOTO_TIPS.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{t.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{t.tip}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
