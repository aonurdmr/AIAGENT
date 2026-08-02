import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  {
    id: 'keçi', name: 'Dağ Keçisi', icon: '🐐', accent: '#a78bfa',
    habitat: '1500m+ kayalık yamaç ve dağ sırtları',
    sign: ['Sarp yamaçlarda dar patika — dik açılı tırnak izi', 'Küçük yuvarlak dışkı — 5-8mm', 'Kayalık yataklama yerleri — rüzgarsız güneyli yamaç'],
    strategy: [
      'Sabah erkenden alt yamaçtan tırman — keçi üst kayalıkta',
      'Spotting scope ile 500m+ uzaktan keşif yap',
      'Rüzgar aşağıdan yukarı — kokuyu götürür',
      'Stalking: her adım hesaplı — taş düşürme',
      'Optimal mesafe: 150-250m — dağ tüfeği gerekli',
    ],
    legal: 'Kota sistemi · özel ruhsat · puan değeri yüksek',
  },
  {
    id: 'boar', name: 'Dağ Domuzu', icon: '🐗', accent: '#f97316',
    habitat: 'Meşelik — 800-1800m arası karma orman',
    sign: ['Derin kök kazma izi — mısır büyüklüğünde çukurlar', 'Wallow: çamurlu sığ çukur', 'Ağaç kabuğu sürünme — yağlanma'],
    strategy: [
      'Gece avı ağırlıklı — gündüz en derin ormanda yatıyor',
      'Meşe palamudu dönemi: Ekim — en aktif beslenme',
      'Termal kamera: zorunlu gece ekipmanı',
      'Sürüden büyük erkek: grubu önceden keşif et',
      'Ateş öncesi tür teyit — geceleri yanılma yüksek',
    ],
    legal: 'Yıl boyu bazı bölgelerde · ruhsatlı bölge şart',
  },
  {
    id: 'deer_mountain', name: 'Dağ Geyiği', icon: '🦌', accent: '#f59e0b',
    habitat: 'Orman-çayır geçişi, nehir vadi ormanları',
    sign: ['Kızışma nada (Kasım) — ön ayak çizigi', 'Boynuz sürtmesi — genç ağaçlarda soyulma', 'Yol patikası — düzenli sabah-akşam güzergah'],
    strategy: [
      'Kızışma dönemi (Kasım): erkek nada bölgesine gelir',
      'Nada kokusu veya çağrı sesi kullan',
      'Rüzgar karşısına gizlen — koku gitmemeli',
      'Sabah şafak öncesi konumlan — havanın aydınlanmasını bekle',
      'Optimal açı: boyun veya kürek — omurga değil',
    ],
    legal: 'Sezon: Kasım-Aralık · ruhsat zorunlu · kota',
  },
];

export default function MountainHunting() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#06080a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏔️ Dağ Avı Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Dağ keçisi · domuz · geyik — strateji & iz takip</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SPECIES.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0c1014', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.habitat}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0c1014', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>🔍 İŞARETLER</div>
                  {s.sign.map((sg, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {sg}</div>)}
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>🏹 STRATEJİ</div>
                  {s.strategy.map((st, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {st}</div>)}
                  <div style={{ background: '#ef444415', borderRadius: 8, padding: '6px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#fca5a5' }}>⚖️ {s.legal}</div>
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
