import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  {
    id: 'ahtapot', name: 'Ortak Ahtapot', scientific: 'Octopus vulgaris', icon: '🐙', accent: '#a78bfa',
    habitat: 'Kayalık dip · 0-200 m',
    season: 'Yıl boyu · yaz en aktif',
    size: 'Kol açıklığı 1-1.5 m · vücut 30 cm',
    behavior: 'Gece aktif, renk değiştirme ustası. Mürekkep ile kendini korur.',
    edible: 'Yenilebilir · Ege mutfağının temel malzemesi',
    fishing: 'Zıpkın, olta (canlı yengeç yem), çanak tuzağı',
    ecology: 'Yüksek zeka · araç kullanımı gözlemlenmiş',
    tip: 'Kayalık dibinde delik arıyorsa orada. Kabuk ve kaya parçaları ağzının önünde.',
  },
  {
    id: 'kalamar', name: 'Kalamar', scientific: 'Loligo vulgaris', icon: '🦑', accent: '#06b6d4',
    habitat: 'Açık su + dip · 10-500 m',
    season: 'Ekim–Nisan (kıyıya yaklaşır)',
    size: 'Palto 20-50 cm',
    behavior: 'Sürü halinde avlanır. Geceleri ışığa çekilir.',
    edible: 'Yenilebilir · tüm Türkiye mutfağında yaygın',
    fishing: 'Egz jigi, kalamar iğnesi, ışık tuzağı (geceleri)',
    ecology: 'Hızlı büyür, 1 yılda 300 g. Tonlarca av potansiyeli.',
    tip: 'Kalamar jigi için yavaş düşürme ve ara ara çekme. Ege\'de Kasım-Şubat arası yoğun.',
  },
  {
    id: 'istakoz', name: 'Istakoz', scientific: 'Palinurus elephas', icon: '🦞', accent: '#ef4444',
    habitat: 'Kayalık dip · 10-200 m',
    season: 'Ekim–Mayıs (yaz koruma)',
    size: '20-40 cm · 0.5-3 kg',
    behavior: 'Gece aktif. Kayalık yarıklarda yaşar.',
    edible: 'Yenilebilir · en pahalı deniz ürünü',
    fishing: 'Sepet tuzak (çoğunlukla ticari), zıpkın (serbest dalış)',
    ecology: '⚠️ Koruma altında — minimum boy 24 cm, Haziran–Eylül kapalı sezon',
    tip: 'Kayalık dip dalışında el feneri ile gece ara. Antenleri gören ilk işaret.',
  },
  {
    id: 'midye', name: 'Akdeniz Midyesi', scientific: 'Mytilus galloprovincialis', icon: '🦪', accent: '#22c55e',
    habitat: 'Kayalık kıyı, iskele, tekne dibi · 0-10 m',
    season: 'Eylül–Mayıs en kaliteli (kırmızı gelgit dönemini kaçın)',
    size: '5-12 cm',
    behavior: 'Filtre besleyici — suyu süzer. Kirli suda biriktirir.',
    edible: 'Yenilebilir — temiz su bölgesinden topla',
    fishing: 'El ile toplama · resmi kültür tesisleri',
    ecology: '⚠️ PSP zehirlenmesi riski — kırmızı gelgit haberlerini takip et',
    tip: 'İstanbul Boğazı midyesi dünyaca ünlü. Sahilde toplarken yeşil ve parlak olanı seç. Mat olana dikkat.',
  },
  {
    id: 'yengeç', name: 'Mavi Yengeç', scientific: 'Callinectes sapidus', icon: '🦀', accent: '#3b82f6',
    habitat: 'Haliç, delta, sığ kıyı · 0-30 m',
    season: 'Yaz-sonbahar (su ısındığında)',
    size: '15-25 cm kabuğu genişliği',
    behavior: 'İstilacı tür — Karadeniz ve Ege\'de hızla yayılıyor',
    edible: 'Yenilebilir · lezzetli et',
    fishing: 'Kafes tuzak, el ağı, oltayla yem',
    ecology: '🚨 İSTİLACI TÜR — Atlantik\'ten geldi, Türkiye habitatlarını etkiliyor',
    tip: 'Karadeniz kıyılarında 2000\'lerden beri yoğun. Yerel balıkçılara yardım amaçlı yakalanabilir.',
  },
  {
    id: 'denizatı', name: 'Denizatı', scientific: 'Hippocampus guttulatus', icon: '🐠', accent: '#fbbf24',
    habitat: 'Deniz çayırı (Posidonia), sazlık kıyı · 0-30 m',
    season: 'Yaz (yüzme ortamında görünür)',
    size: '5-20 cm',
    behavior: 'Yavaş yüzücü, kuyrukla tutunur. Erkek yavruları taşır.',
    edible: 'Yenilmez · koruma altında',
    fishing: 'AV YASAK — kesinlikle yakalamayın',
    ecology: '⚠️ Nesli tehlike altında — Posidonia habitatı yok oluyor',
    tip: 'Gözlem etkinliği — ege kıyılarında açık suda şnorkel ile görülür. Fotoğraf çek, bırak.',
  },
];

const CONSERVATION = [
  { icon: '🐠', text: 'Minimum av boylarına uyu: levrek 25cm, çipura 20cm, dil balığı 20cm' },
  { icon: '🌊', text: 'Posidonia deniz çayırı alanlarında tekne çapası atmayın — onlarca yıl büyür' },
  { icon: '📋', text: 'Kapalı sezon türleri: ıstakoz (Haz-Eyl), dilbalığı (May-Haz), Türk kırmızı listesini kontrol et' },
  { icon: '⚠️', text: 'Kırmızı gelgit döneminde kabuklu toplamayın — PSP toksin birikir' },
  { icon: '🎣', text: 'Trol ağı ve uzatma ağı sahil bölgelerinde yasak — yerel mevzuatı kontrol et' },
];

export default function MarineLife() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('species');

  return (
    <div style={{ background: '#030b14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Deniz Canlıları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 tür · habitat, avlanma & koruma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['species','Türler'],['conservation','Koruma']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#071528', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && SPECIES.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#071528', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{s.scientific} · {s.size}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#071528', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {[['📍 Habitat', s.habitat], ['📅 Sezon', s.season], ['🎣 Avlanma', s.fishing], ['🍽️ Yenilebilirlik', s.edible]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: s.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: '#1a2535', borderRadius: 8, padding: '6px 10px', marginTop: 6 }}>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>{s.ecology}</div>
                  </div>
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '6px 10px', marginTop: 4 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {s.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'conservation' && (
          <div style={{ background: '#071528', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🌊 Deniz Koruma Kuralları</div>
            {CONSERVATION.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{c.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{c.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
