import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ROUTES = [
  {
    id: 'goksu', name: 'Göksu Nehri', region: 'Mersin–Silifke', icon: '🛶', accent: '#06b6d4',
    grade: 'III-IV (zorluk)',
    distance: '35 km · 2 günlük tur',
    season: 'Mart–Mayıs (kar suyu yüksek)',
    wildlife: 'Su samuru, balıkçıl, kaya martısı',
    access: 'Silifke\'den giriş · çıkış Erdemli',
    tip: 'Göksu Vadisi UNESCO Dünya Mirası adayı. Kanyonlar arasında tekne sürüşü olağanüstü.',
    rental: 'Silifke\'de kiralık kayak mevcut',
  },
  {
    id: 'dalyan', name: 'Dalyan Kanalları', region: 'Muğla', icon: '🚣', accent: '#22c55e',
    grade: 'I (sakin su)',
    distance: '10-20 km · günübirlik',
    season: 'Nisan–Ekim',
    wildlife: 'Caretta caretta (deniz kaplumbağası), flamingo, balıkçıl',
    access: 'Dalyan kasabasından başlar',
    tip: 'Iztuzu plajına kayak ile gitme en romantik yol. Caretta kaplumbağaları ile buluşma şansı yüksek.',
    rental: 'Dalyan\'da tur ve kiralama çok yaygın',
  },
  {
    id: 'coruh', name: 'Çoruh Nehri', region: 'Artvin', icon: '🌊', accent: '#ef4444',
    grade: 'IV-V (eksperto)',
    distance: '100+ km · çok günlük',
    season: 'Nisan–Haziran',
    wildlife: 'Kartal, vaşak, dağ keçisi',
    access: 'Yusufeli — ancak 2020 baraj sularının altında kaldı',
    tip: 'Çoruh\'un bazı bölümleri hâlâ açık. Dünyaca ünlü rafting noktası. Güncel bilgi al.',
    rental: 'Artvin ve Yusufeli\'nde rehberli tur gerekli',
  },
  {
    id: 'kizilirmak', name: 'Kızılırmak Delta', region: 'Samsun', icon: '🌿', accent: '#84cc16',
    grade: 'I-II (sakin)',
    distance: '15-30 km · delta gezisi',
    season: 'Mayıs–Eylül',
    wildlife: '300+ kuş türü, yılan balığı, turna',
    access: 'Samsun\'a 15 km — Kızılırmak Deltası Kuş Cenneti',
    tip: 'Kuş gözlemi ile kayak kombinasyonu. Şafakta kürek çekmek en iyi gözlem anı.',
    rental: 'Samsun\'da rehberli ekoturizm turları mevcut',
  },
];

const TECHNIQUES = [
  { name: 'İleri Çekiş (Forward Stroke)', desc: 'Küreği suya dik tak, gövdeyle dönerek çek, su çıkışında kaldır', level: 'Temel' },
  { name: 'Geri Çekiş (Back Stroke)', desc: 'Geri gitmek için ileri çekişin tersi — dengeye dikkat', level: 'Temel' },
  { name: 'Süpürme (Sweep Stroke)', desc: 'Kayağı döndürmek için yaylanarak geniş ark çizgi', level: 'Temel' },
  { name: 'Kenar Durumu (Edge Control)', desc: 'Kayağı yana yatırma — hız ve manevra için', level: 'Orta' },
  { name: 'Eskimo Dönüşü (Eskimo Roll)', desc: 'Devrildikten sonra kürek ile sağa kalkış', level: 'İleri' },
];

const SAFETY = [
  '✅ Her zaman can yeleği (PFD) giy — zorunlu',
  '✅ Kask — rapids (III+) ve kayalık ortam için şart',
  '⚠️ Nehir trafik kuralları: soldan geçme, kanalı bırak',
  '⚠️ Soğuk su: deniz sıcaklığı <15°C ise drysuit giy',
  '🚨 Hipotermi riski: suda kalmak süreden çabuk soğutur — 10-15 dakika maksimum',
  '📞 Grup büyüklüğü minimum 2 kayak. Acil için sinyal aleti veya VHF telsiz',
];

export default function KayakGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('routes');

  return (
    <div style={{ background: '#030c12', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🛶 Kano & Kayak Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 rota · teknikler & güvenlik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['routes','Rotalar'],['techniques','Teknikler'],['safety','Güvenlik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#071520', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'routes' && ROUTES.map(r => {
          const open = sel === r.id;
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#071520', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 28 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>📍 {r.region} · {r.distance}</div>
                    </div>
                  </div>
                  <span style={{ background: r.accent + '22', color: r.accent, borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{r.grade}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#071520', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  {[['📅 Sezon', r.season], ['🦅 Yaban Hayatı', r.wildlife], ['🚗 Erişim', r.access], ['🛶 Kiralama', r.rental]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: r.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: r.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: r.accent, fontWeight: 600, marginBottom: 3 }}>💡 PRO İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{r.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'techniques' && (
          <div style={{ background: '#071520', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🚣 Kürek Teknikleri</div>
            {TECHNIQUES.map((t, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < TECHNIQUES.length-1 ? '1px solid #0f2535' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#06b6d4' }}>{t.name}</div>
                  <span style={{ fontSize: 10, background: '#06b6d422', color: '#06b6d4', borderRadius: 20, padding: '2px 8px' }}>{t.level}</span>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'safety' && (
          <div style={{ background: '#071520', borderRadius: 14, padding: 14, border: '1px solid #ef444422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', marginBottom: 10 }}>⚠️ Su Güvenliği</div>
            {SAFETY.map((s, i) => (
              <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 8, lineHeight: 1.5 }}>{s}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
