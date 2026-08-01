import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'equipment', name: 'Yay Ekipmanı', icon: '🏹', accent: '#f59e0b',
    desc: 'Bileşik, recurve ve geleneksel yay',
    items: [
      { name: 'Bileşik Yay (Compound)', detail: '40-70 lbs çekiş · 50-80m etkili mesafe · yüksek hassasiyet' },
      { name: 'Recurve', detail: '30-50 lbs · Olimpik · 30-50m · klasik teknik' },
      { name: 'Uzun Yay (Longbow)', detail: 'Geleneksel · zor master · yakın mesafe av' },
      { name: 'Ok Tipi', detail: 'Karbon fiber ok av için standart · 75-100gr uç' },
      { name: 'Avcı Ucu (Broadhead)', detail: 'Keskin 3 veya 4 kanat · 100gr · temiz kesim' },
    ],
    tip: 'Yeni başlayanlar için bileşik yay tercih et — daha az güç ister, daha hassas.',
  },
  {
    id: 'technique', name: 'Atış Tekniği', icon: '🎯', accent: '#22c55e',
    desc: 'Doğru form ve güvenli atış',
    items: [
      { name: 'Duruş', detail: 'Hedefte dik dur — omuzlar açık, topuklar omuz genişliğinde' },
      { name: 'Çekiş', detail: 'Çene altına çek — çapa noktası her seferinde aynı' },
      { name: 'Nefes', detail: 'Yarım nefes — bırak, dur, at' },
      { name: 'Bırakış (Release)', detail: 'Parmakları gevşet — yayı sürükleme' },
      { name: 'Takip (Follow Through)', detail: 'Ok gidene kadar form bozma' },
    ],
    tip: 'Ayna önünde alıştırma yap — form hatası gözle görülür.',
  },
  {
    id: 'range', name: 'Mesafe & Etik Av', icon: '📏', accent: '#ef4444',
    desc: 'Ne kadar uzaktan atılır',
    items: [
      { name: 'Etik mesafe', detail: 'Geyik ve karaca için 30-40m max — temiz kesim için' },
      { name: 'Domuz', detail: '25m max — kalın deri, sert yağ' },
      { name: 'Hedef bölge', detail: 'Kalp-akciğer: kürek hemen arkası — 15cm çaplı alan' },
      { name: 'Takip', detail: 'Vurulduktan sonra 30 dak bekle — hemen kovalama kaçırtır' },
      { name: 'Kan izi takip', detail: 'Kırmızı köpüklü = akciğer, koyu kırmızı = karaciğer' },
    ],
    tip: 'Ok avcılığında yakın mesafe avı şart — silahtan 5 kat daha yakın.',
  },
];

export default function ArcheryHunting() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080806', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏹 Ok Avcılığı Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yay tipi · atış tekniği · etik mesafe</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#100e08', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#100e08', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((it, i) => (
                    <div key={i} style={{ marginTop: 8, padding: '6px 10px', background: t.accent + '10', borderRadius: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>{it.name}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 1 }}>{it.detail}</div>
                    </div>
                  ))}
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 10 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {t.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
