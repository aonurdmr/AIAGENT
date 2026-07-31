import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ALL_SPECIES = [
  {
    name: 'Levrek', sci: 'Dicentrarchus labrax', icon: '🐟', accent: '#06b6d4', cat: 'Balık',
    habitat: 'Kıyı kayalıkları, haliçler, lagünler',
    size: '40-70 cm, maks 103 cm',
    weight: '0.5-5 kg, rekor 12.7 kg',
    season: 'Tüm yıl; en aktif Eylül-Kasım',
    diet: 'Küçük balıklar, karides, mürekkepbalığı',
    behavior: 'Yalnız ya da küçük gruplar halinde avlanır. Sabah ve akşam saatleri en aktif dönem. Tuzluluk değişimlerine oldukça toleranslı; acı su ortamlarına da girebilir.',
    funfact: 'Levrek hermafrodit doğar — erkek olarak başlar, büyüdükçe dişi olabilir.',
    conservation: 'Düşük Risk (LC)',
    conservationColor: '#22c55e',
    techniques: ['Jig', 'Minnow', 'Popper (gece)', 'Canlı yem'],
    bestBait: 'Sahte balık yemi (minnow), karides',
  },
  {
    name: 'Kızıl Geyik', sci: 'Cervus elaphus', icon: '🦌', accent: '#f59e0b', cat: 'Memeli',
    habitat: 'Ormanlık alanlar, açık otlaklar, dağ etekleri',
    size: 'Boy: 170-250 cm, yükseklik: 95-130 cm',
    weight: '90-250 kg (erkek)',
    season: 'Tüm yıl; rut Eylül-Kasım',
    diet: 'Ot, yaprak, çalı, palamut, mantar',
    behavior: 'Yılın büyük bölümünde tek veya küçük gruplar halinde. Eylül-Ekim rut döneminde erkekler çığlık atar ve dişiler için rekabet eder. Şafak ve alacakaranlıkta en aktif.',
    funfact: 'Erkek kızıl geyiğin boynuzları her yıl düşer ve yeniden büyür — biyolojik doku oluşumunun en hızlı örneği.',
    conservation: 'Düşük Risk (LC)',
    conservationColor: '#22c55e',
    techniques: ['Ses çağrısı (rut)', 'Tuzak noktası', 'Gizleme panosu'],
    bestBait: 'Tuz yalama taşı, yaprak çağrısı',
  },
  {
    name: 'Karabatak', sci: 'Phalacrocorax carbo', icon: '🐦', accent: '#374151', cat: 'Kuş',
    habitat: 'Kıyılar, göller, nehirler',
    size: 'Kanat açıklığı 121-149 cm',
    weight: '1.5-3.6 kg',
    season: 'Tüm yıl; kış göçü Ekim-Mart',
    diet: 'Balık (günde ~500g), eel, kurbağa',
    behavior: 'Suya dalarak balık avlar. Yüzme sonrası kanatlarını yayarak kurutur — tüyler su geçirgen. Koloniler halinde ürer; kıyı kayalıkları ve ağaçlarda yuvalar.',
    funfact: 'Karabatak saatte 22 km hızla yüzebilir ve 10 metreye kadar dalabilir. Çin\'de geleneksel balıkçılıkta kullanılır.',
    conservation: 'Düşük Risk (LC)',
    conservationColor: '#22c55e',
    techniques: ['Fotoğraflama', 'Kuş gözlemi (kıyı)', 'Sabah erken'],
    bestBait: 'N/A (korunan tür)',
  },
  {
    name: 'Palamut', sci: 'Sarda sarda', icon: '🐠', accent: '#3b82f6', cat: 'Balık',
    habitat: 'Açık deniz, kıyı suyüzeyi, boğazlar',
    size: '25-75 cm',
    weight: '0.3-5 kg',
    season: 'Mayıs-Kasım; zirve Eylül-Ekim',
    diet: 'Hamsi, istavrit, kalamar',
    behavior: 'Hızlı, saldırgan bir avcı. Büyük sürüler halinde ufak balıkları kıstırır. Göç eder: bahar Kuzey\'e, sonbahar Güney\'e.',
    funfact: 'Palamut dakikada 50 km hıza ulaşabilir. Kan sıcaklığını su sıcaklığından yüksek tutabilir (endotermik).',
    conservation: 'Düşük Risk (LC)',
    conservationColor: '#22c55e',
    techniques: ['Metal jig', 'Troller', 'Sahte istavrit', 'Canlı hamsi'],
    bestBait: 'Metal jig (gümüş/sarı), istavrit',
  },
  {
    name: 'Orman Domuzu', sci: 'Sus scrofa', icon: '🐗', accent: '#ef4444', cat: 'Memeli',
    habitat: 'Meşe ormanları, bataklık kenarları, tarım alanı sınırları',
    size: 'Boy: 90-200 cm',
    weight: '50-250 kg',
    season: 'Tüm yıl; en aktif Ekim-Mart',
    diet: 'Palamut, yumurta, kök, tarla ürünleri, leş',
    behavior: 'Gece avcısı. Grup halinde (dişi + yavru sürüsü); yaşlı erkek yalnız. Mükemmel koku alma. Tehdit altında saldırgan.',
    funfact: 'Evcil domuzların (Sus domesticus) atası. Türkiye\'de tarım zararlısı sayıldığından yıl boyunca avlanabilir.',
    conservation: 'Düşük Risk (LC)',
    conservationColor: '#22c55e',
    techniques: ['Pusu kurma', 'Termal optik (gece)', 'Köpekle sürme'],
    bestBait: 'Mısır, palamut, fermente yem',
  },
  {
    name: 'Leylek', sci: 'Ciconia ciconia', icon: '🦢', accent: '#94a3b8', cat: 'Kuş',
    habitat: 'Tarım alanları, sulak alanlar, köy çatıları',
    size: 'Kanat açıklığı 155-215 cm',
    weight: '2.3-4.4 kg',
    season: 'Türkiye\'de Mart-Eylül; kış Afrika\'da',
    diet: 'Kurbağa, yılan, fare, böcek, yengeç',
    behavior: 'Monogam çifti genellikle ömür boyu devam eder. Aynı yuvayı yıllarca kullanır; yuva 250 kg\'a ulaşabilir. Göç sırasında İstanbul üzerinden milyonlarca birey geçer.',
    funfact: 'Leylek suskunlar — gırtlak sesleri yerine gaga şaklatarak iletişim kurur.',
    conservation: 'Düşük Risk (LC)',
    conservationColor: '#22c55e',
    techniques: ['Fotoğraflama (teleobjektif)', 'Yuva gözlemi', 'Göç izleme (Eylül)'],
    bestBait: 'N/A (korunan tür)',
  },
  {
    name: 'Sazan', sci: 'Cyprinus carpio', icon: '🐟', accent: '#a855f7', cat: 'Balık',
    habitat: 'Göller, barajlar, yavaş akan nehirler',
    size: '30-100 cm',
    weight: '1-30 kg (rekor 40 kg+)',
    season: 'Tüm yıl; en aktif Nisan-Ekim',
    diet: 'Karides, solucan, bitkiler, algler',
    behavior: 'Tabandan beslenir. Grup oluşturur. Sabah ve akşam aktif; öğle dinlenir. Su sıcaklığına hassas — kışın dip çamurunda hareketsiz kalır.',
    funfact: 'Sazan 40 yıla kadar yaşayabilir. Bazı bireyler onlarca yıldır aynı gölde yaşar ve tanınır hale gelir.',
    conservation: 'Hassas (VU — bazı alt türler)',
    conservationColor: '#f59e0b',
    techniques: ['Boilies & feeder', 'Dip taktik', 'PVA paket', 'Mısır & hamur'],
    bestBait: 'Mısır, boilies, taze solucan',
  },
  {
    name: 'Keklik', sci: 'Alectoris chukar', icon: '🐦', accent: '#f97316', cat: 'Kuş',
    habitat: 'Taşlık yamaçlar, bozkır, çalılık',
    size: '32-35 cm',
    weight: '400-800 g',
    season: 'Türkiye\'de tüm yıl; av sez. Eylül-Kasım',
    diet: 'Tohum, ot, böcek, böğürtlen',
    behavior: 'Yerde yaşar, koşar. Yükseltiyi tercih eder. Sabah ve akşam sesli ötüşü (chukkar-chukkar) ile tanınır. Sürü oluşturur; tehdit anında uçar.',
    funfact: 'Keklik Türkiye\'nin en yaygın av kuşudur. Orta Asya kökenli; Himalayalar\'dan Akdeniz\'e kadar yayılmış.',
    conservation: 'Düşük Risk (LC)',
    conservationColor: '#22c55e',
    techniques: ['Köpekle (setter)', 'Sabah pusu', 'Ses ile çekme'],
    bestBait: 'Ses çağrısı, kınalı keklik imiyor',
  },
];

function getDaySpecies() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return ALL_SPECIES[dayOfYear % ALL_SPECIES.length];
}

export default function SpeciesOfDay() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('today');
  const [catFilter, setCatFilter] = useState('Tümü');
  const today = getDaySpecies();

  const cats = ['Tümü', 'Balık', 'Memeli', 'Kuş'];
  const filtered = catFilter === 'Tümü' ? ALL_SPECIES : ALL_SPECIES.filter(s => s.cat === catFilter);

  function SpeciesCard({ s, compact = false }) {
    return (
      <div style={{ background: '#1f2937', borderRadius: 14, padding: compact ? '12px 14px' : 16, border: `1px solid ${s.accent}33`, marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: compact ? 0 : 12 }}>
          <span style={{ fontSize: compact ? 24 : 36 }}>{s.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: compact ? 13 : 18, fontWeight: 800, color: '#f9fafb' }}>{s.name}</div>
            <div style={{ fontSize: compact ? 10 : 12, color: '#6b7280', fontStyle: 'italic' }}>{s.sci}</div>
          </div>
          <span style={{ background: s.accent + '22', color: s.accent, border: `1px solid ${s.accent}44`, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>{s.cat}</span>
        </div>
        {!compact && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
              {[
                ['📍 Habitat', s.habitat],
                ['📏 Boy', s.size],
                ['⚖️ Ağırlık', s.weight],
                ['📅 Sezon', s.season],
              ].map(([lbl, val]) => (
                <div key={lbl} style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ fontSize: 9, color: '#6b7280', marginBottom: 2 }}>{lbl}</div>
                  <div style={{ fontSize: 11, color: '#d1d5db' }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginBottom: 10 }}>{s.behavior}</div>
            <div style={{ background: s.accent + '15', borderRadius: 10, padding: '10px 12px', marginBottom: 10, border: `1px solid ${s.accent}33` }}>
              <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 3 }}>🤩 BİLGİN VAR MI?</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{s.funfact}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, marginBottom: 6 }}>🎯 TAKTİKLER & YEM</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {s.techniques.map(t => (
                  <span key={t} style={{ background: '#374151', color: '#d1d5db', borderRadius: 20, padding: '3px 10px', fontSize: 11 }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 10, color: '#6b7280' }}>Koruma:</span>
              <span style={{ fontSize: 11, color: s.conservationColor, fontWeight: 600 }}>{s.conservation}</span>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Günün Türü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Her gün farklı bir tür · 8 tür ansiklopedisi</div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['today', '⭐ Bugün'], ['all', '📚 Tümü']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#22c55e' : '#1f2937', color: tab === id ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#22c55e' : '#374151',
            borderRadius: 10, padding: '10px 0', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'today' && (
          <div>
            <div style={{ background: '#052e16', borderRadius: 12, padding: '8px 14px', marginBottom: 12, border: '1px solid #16a34a44', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>📅</span>
              <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>
                {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} — Günün Türü
              </span>
            </div>
            <SpeciesCard s={today} compact={false} />
          </div>
        )}

        {tab === 'all' && (
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10, overflowX: 'auto' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setCatFilter(c)} style={{
                  background: catFilter === c ? '#374151' : 'transparent',
                  color: catFilter === c ? '#f9fafb' : '#6b7280',
                  border: `1px solid ${catFilter === c ? '#6b7280' : '#374151'}`,
                  borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
                }}>{c}</button>
              ))}
            </div>
            {filtered.map((s, i) => (
              <SpeciesCard key={i} s={s} compact={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
