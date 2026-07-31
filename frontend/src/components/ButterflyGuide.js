import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BUTTERFLIES = [
  {
    id: 'apollo', name: 'Apollo Kelebeği', scientific: 'Parnassius apollo', icon: '🦋', accent: '#ef4444',
    habitat: 'Dağlık alanlar 1500-2500 m · çiçekli kayalıklar',
    season: 'Haziran–Ağustos',
    region: 'Toros Dağları, Kaçkar, Uludağ',
    wingspan: '62-86 mm',
    host: 'Sedum (damkoruğu) bitkileri',
    status: '⚠️ Koruma altında — yakalamak yasaktır',
    tip: 'Sabah güneşlenme davranışı — yassı kayalarda güneşi bekler. Makro lens şart.',
    food: 'Thistle (devedikeni) ve centaurea çiçekleri',
  },
  {
    id: 'swallowtail', name: 'Kırlangıçkuyruk', scientific: 'Papilio machaon', icon: '🦋', accent: '#f59e0b',
    habitat: 'Tarla kenarları, çayırlar, bahçeler',
    season: 'Nisan–Eylül (2-3 nesil)',
    region: 'Türkiye geneli yaygın',
    wingspan: '62-88 mm',
    host: 'Havuç, rezene ve maydanoz ailesi bitkileri',
    status: '✅ Yaygın, koruma gerekmez',
    tip: 'Çiçekli tarla kenarlarında kolayca bulunur. Uçuş anında fotoğraf için yüksek hız gerekli.',
    food: 'Lavanta, sedefotu ve geniş çiçekli bitkileri tercih eder',
  },
  {
    id: 'camberwell', name: 'Yas Kelebeği', scientific: 'Nymphalis antiopa', icon: '🦋', accent: '#7c3aed',
    habitat: 'Ormanlık alanlar, nehir kıyısı söğüt ve kavak',
    season: 'Temmuz–Eylül · kışı ergin geçirir',
    region: 'Kuzey Türkiye, Ege',
    wingspan: '67-88 mm',
    host: 'Söğüt, kavak, karaağaç',
    status: '✅ Seyrek ama yaygın',
    tip: 'Meyve suyuna gelir — fermente meyve tuzağı kurabilirsin. Kanat deseni dramatik, yakın çekim önerilir.',
    food: 'Meşe salgısı, çürük meyve',
  },
  {
    id: 'blue_morpho', name: 'Akdeniz Mavi Kelebeği', scientific: 'Polyommatus icarus', icon: '🦋', accent: '#3b82f6',
    habitat: 'Çayır, tarla kenarı, kıyı bitki örtüsü',
    season: 'Nisan–Ekim (çok nesilli)',
    region: 'Türkiye geneli çok yaygın',
    wingspan: '28-36 mm',
    host: 'Yonca ve baklagil türleri',
    status: '✅ En yaygın mavi kelebek türü',
    tip: 'Sabah nemli çayırlarda çok sayıda. Düşük açı makro fotoğraf için ideal tür.',
    food: 'Yonca çiçeği nektarı',
  },
  {
    id: 'monarch', name: 'Monarch Kelebeği', scientific: 'Danaus plexippus', icon: '🦋', accent: '#f97316',
    habitat: 'Açık alanlar, tarla, sahil şeridi',
    season: 'Eylül–Ekim (göç dönemi)',
    region: 'Ege ve Akdeniz kıyıları — göç güzergahı',
    wingspan: '89-102 mm',
    host: 'Süt otu (Asclepias) — yabani tür Türkiye\'de nadir',
    status: '⚠️ Gözlemlenirse bildir — nadir göçmen',
    tip: 'Göç sezonunda Ege kıyılarında görülür. Turuncu-siyah deseni tanıdık.',
    food: 'Çiçek nektarı',
  },
  {
    id: 'clouded_yellow', name: 'Sarı Kelebek', scientific: 'Colias crocea', icon: '🦋', accent: '#fbbf24',
    habitat: 'Tarla, çayır, yayla',
    season: 'Mart–Kasım',
    region: 'Türkiye geneli en yaygın renkli kelebek',
    wingspan: '46-54 mm',
    host: 'Yonca, korunga, yabani baklagiller',
    status: '✅ Çok yaygın',
    tip: 'Hızlı uçucu — yüksek hız fotoğrafı gerekli. Konakta görece yavaşlar.',
    food: 'Yonca, devedikeni çiçeği',
  },
];

const PHOTOGRAPHY_TIPS = [
  { icon: '🌅', tip: 'Sabah erken — kelebeklerin soğuğu sersemleten etki yapar, konakta beklerler' },
  { icon: '📷', tip: 'Makro lens 90-105mm ideal · 1:1 büyütme ile kanat deseni detayı' },
  { icon: '🤫', tip: 'Yavaş ve sakin yaklaş — kelebekler titreşime duyarlı' },
  { icon: '🌸', tip: 'Çiçeğin altına pozisyon al — kelebek beslenirken yukarıdan ışık gelir' },
  { icon: '⚡', tip: 'Uçuş anı için 1/2000 s+ perde hızı kullan' },
  { icon: '🎨', tip: 'Açık renkli arka plan tercih et — yeşil arka planda kanat detayları kaybolur' },
];

const HABITATS = [
  { name: 'Çayır & Tarla Kenarı', species: 'Sarı kelebek, mavi kelebek, kırlangıçkuyruk', icon: '🌾' },
  { name: 'Dağlık Alan (1500m+)', species: 'Apollo, alpin mavi, dağ sarısı', icon: '⛰️' },
  { name: 'Ormanlık Kenar', species: 'Yas kelebeği, orman peri, çuha', icon: '🌲' },
  { name: 'Kıyı & Sulak Alan', species: 'Monarch (göçmen), karasal su', icon: '🌊' },
];

export default function ButterflyGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('species');

  return (
    <div style={{ background: '#0f0a1a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦋 Kelebek Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 tür · habitat, sezon & fotoğrafçılık</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['species','Türler'],['habitat','Habitat'],['photo','Fotoğraf']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#a78bfa' : '#1a1030', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && BUTTERFLIES.map(b => {
          const open = sel === b.id;
          return (
            <div key={b.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : b.id)} style={{
                background: '#1a1030', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${b.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{b.name}</div>
                    <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{b.scientific} · {b.wingspan}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1a1030', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${b.accent}33`, borderTop: 'none' }}>
                  {[['📍 Habitat', b.habitat], ['📅 Sezon', b.season], ['📌 Bölge', b.region], ['🌿 Konak Bitki', b.host], ['🍯 Nektar', b.food]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: b.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: b.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: b.accent, fontWeight: 600, marginBottom: 3 }}>💡 FOTOĞRAF İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{b.tip}</div>
                  </div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '6px 10px', marginTop: 6 }}>
                    <div style={{ fontSize: 12, color: '#d1d5db' }}>{b.status}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'habitat' && HABITATS.map((h, i) => (
          <div key={i} style={{ background: '#1a1030', borderRadius: 12, padding: 14, border: '1px solid #a78bfa22', marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{h.icon}</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#a78bfa' }}>{h.name}</div>
            </div>
            <div style={{ fontSize: 12, color: '#d1d5db' }}><span style={{ color: '#9ca3af' }}>Türler: </span>{h.species}</div>
          </div>
        ))}

        {tab === 'photo' && (
          <div style={{ background: '#1a1030', borderRadius: 14, padding: 14, border: '1px solid #a78bfa22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', marginBottom: 10 }}>📷 Kelebek Fotoğrafçılığı</div>
            {PHOTOGRAPHY_TIPS.map((t, i) => (
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
