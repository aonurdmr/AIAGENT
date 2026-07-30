import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const MUSHROOMS = [
  {
    id: 1, name: 'Kuzugöbeği', en: 'Morel', icon: '🍄', safe: 'Yenilebilir',
    accent: '#84cc16', season: 'İlkbahar', habitat: 'Orman kenarı, meşelik',
    cap: 'Konik-petek görünümlü, kahverengi-sarımsı',
    stem: 'Beyaz, içi boş, pürüzsüz',
    spores: 'Kremsi-sarı',
    notes: 'Ham yenmez — mutlaka pişirilmeli. Yanlış mantar Gyromitra türleri olabilir.',
    look_alike: 'Gyromitra (zehirli, kıvrık şapka)',
    regions: ['Karadeniz', 'Marmara', 'Ege'],
  },
  {
    id: 2, name: 'Şampinyon', en: 'Field Mushroom', icon: '🍄', safe: 'Yenilebilir',
    accent: '#22c55e', season: 'Yaz-Sonbahar', habitat: 'Çayır, otlak, açık alan',
    cap: 'Beyaz, düzgün, 5-15 cm',
    stem: 'Beyaz, sağlam, halkalı',
    spores: 'Pembe → koyu kahve',
    notes: 'Genç örnekler en lezzetli. Kesi yeri çok az sararsa şüphelenin.',
    look_alike: 'Amanita phalloides (zehirli, yeşilimsi)',
    regions: ['Tüm Türkiye'],
  },
  {
    id: 3, name: 'Ölüm Şapkası', en: 'Death Cap', icon: '☠️', safe: 'Öldürücü Zehirli',
    accent: '#ef4444', season: 'Yaz-Sonbahar', habitat: 'Meşe ve kayın ormanı',
    cap: 'Yeşilimsi-sarı, yapışkan olmayan, 6-15 cm',
    stem: 'Beyaz, kıvrık kese torbası (volva)',
    spores: 'Beyaz',
    notes: 'Türkiye\'deki mantar zehirlenmelerinin %90\'ından sorumlu. Belirtiler 6-24 saat sonra.',
    look_alike: 'Şampinyon (yenilebilir)',
    regions: ['Karadeniz', 'Marmara', 'Ege', 'Doğu Anadolu'],
  },
  {
    id: 4, name: 'Sarı Kuzu', en: 'Chanterelle', icon: '🍄', safe: 'Yenilebilir',
    accent: '#f59e0b', season: 'Yaz-Sonbahar', habitat: 'Karışık orman, çam altı',
    cap: 'Altın sarısı, düzensiz dalgalı kenar, 3-12 cm',
    stem: 'Sarı, dolgun, sağlam',
    spores: 'Soluk sarı',
    notes: 'Kaygı vermeyin — gerçek chanterelle meyvemsi hoş kokuludur.',
    look_alike: 'Omphalotus (sahte chanterelle — zehirli, bölünmüş lameller)',
    regions: ['Karadeniz', 'Marmara'],
  },
  {
    id: 5, name: 'Sivri Zehir', en: 'Destroying Angel', icon: '☠️', safe: 'Öldürücü Zehirli',
    accent: '#dc2626', season: 'Yaz-Sonbahar', habitat: 'Orman içi, gölgeli nemli alanlar',
    cap: 'Tamamen beyaz, 5-12 cm',
    stem: 'Beyaz, ince, uzun kese torbası',
    spores: 'Beyaz',
    notes: 'Tatlı gibi kokusu var ama amatoksin içerir. Kesinlikle yenilmez.',
    look_alike: 'Kültür mantarı',
    regions: ['Karadeniz', 'Doğu Anadolu'],
  },
  {
    id: 6, name: 'Sığır Dili', en: 'Beefsteak Fungus', icon: '🍄', safe: 'Yenilebilir',
    accent: '#f97316', season: 'Yaz-Sonbahar', habitat: 'Yaşlı meşe ve kestane gövdesi',
    cap: 'Kırmızı-turuncu, dil şeklinde, et gibi',
    stem: 'Gövdeye yapışık, kısa',
    spores: 'Pembe',
    notes: 'Ham yenilebilir, limonlu salatalarda kullanılır. Tanınması kolay.',
    look_alike: 'Yok (çok tipik görünüm)',
    regions: ['Karadeniz', 'Marmara', 'Ege'],
  },
  {
    id: 7, name: 'Sineklik', en: 'Fly Agaric', icon: '🍄', safe: 'Zehirli',
    accent: '#ef4444', season: 'Yaz-Sonbahar', habitat: 'Huş ve çam ormanı',
    cap: 'Parlak kırmızı, beyaz noktalı, 8-20 cm',
    stem: 'Beyaz halkalı, volvalı dip',
    spores: 'Beyaz',
    notes: 'Psikoaktif ve zehirli. Bazı kültürlerde "beyaz" çeşiti yenir ama tavsiye edilmez.',
    look_alike: 'Caesar\'s mushroom (yenilebilir, turuncu — farklı bölge)',
    regions: ['Karadeniz', 'Doğu Anadolu'],
  },
  {
    id: 8, name: 'Dev Puf', en: 'Giant Puffball', icon: '🍄', safe: 'Yenilebilir',
    accent: '#84cc16', season: 'Yaz-Sonbahar', habitat: 'Çayır, mera, açık alan',
    cap: 'Küresel, beyaz-krem, 20-80 cm çap',
    stem: 'Yok (sapı yok)',
    spores: 'Zeytun-kahve (olgunca)',
    notes: 'İçi tamamen beyazken güvenlidir. Herhangi bir renk → yenilmez.',
    look_alike: 'Genç Amanita (kesi yapınca şapka / solungaç görünür)',
    regions: ['Karadeniz', 'Marmara', 'İç Anadolu'],
  },
];

const SAFE_COLORS = {
  'Yenilebilir': '#22c55e',
  'Zehirli': '#f59e0b',
  'Öldürücü Zehirli': '#ef4444',
};

function SafeBadge({ safe }) {
  const color = SAFE_COLORS[safe] || '#6b7280';
  return (
    <span style={{ background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{safe}</span>
  );
}

function MushroomCard({ m, onClick }) {
  return (
    <div onClick={() => onClick(m)} style={{
      background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
      border: `1px solid ${m.accent}44`, cursor: 'pointer',
      display: 'flex', alignItems: 'flex-start', gap: 14,
    }}>
      <div style={{ fontSize: 42, lineHeight: 1, marginTop: 2 }}>{m.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{m.name}</div>
          <SafeBadge safe={m.safe} />
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic', marginBottom: 6 }}>{m.en}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '2px 7px' }}>📅 {m.season}</span>
          <span style={{ fontSize: 10, background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '2px 7px' }}>🌲 {m.habitat.split(',')[0]}</span>
        </div>
      </div>
    </div>
  );
}

function MushroomDetail({ m, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 52 }}>{m.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{m.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic', marginBottom: 6 }}>{m.en}</div>
            <SafeBadge safe={m.safe} />
          </div>
        </div>

        {/* Warning for deadly */}
        {m.safe !== 'Yenilebilir' && (
          <div style={{ background: '#450a0a', borderRadius: 12, padding: '12px 14px', marginBottom: 14, border: '1px solid #f8717144', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.6 }}>
              {m.safe === 'Öldürücü Zehirli' ? 'ÖLÜMCÜL — Kesinlikle tüketmeyin. Şüphe durumunda zehir danışma hattını arayın: 114.' : 'Zehirlidir — Yemeyiniz. Çocuklardan uzak tutun.'}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'Sezon', value: m.season, icon: '📅' },
            { label: 'Sporlar', value: m.spores, icon: '🔬' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {[
          { title: '🍄 ŞAPKA', text: m.cap },
          { title: '📏 SAP', text: m.stem },
          { title: '🌲 HABİTAT', text: m.habitat },
        ].map(s => (
          <div key={s.title} style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{s.text}</div>
          </div>
        ))}

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '12px 14px', marginBottom: 10, border: '1px solid #3b82f644' }}>
          <div style={{ fontSize: 10, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>🔄 KARIŞTIRMA RİSKİ</div>
          <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.6 }}>{m.look_alike}</div>
        </div>

        <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>📋 NOTLAR</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{m.notes}</div>
        </div>

        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🗺️ BÖLGELER</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {m.regions.map(r => (
              <span key={r} style={{ background: m.accent + '22', color: m.accent, border: `1px solid ${m.accent}44`, borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600 }}>{r}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const FILTERS = ['Tümü', 'Yenilebilir', 'Zehirli'];

export default function MushroomGuide() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => MUSHROOMS.filter(m => {
    const matchFilter = filter === 'Tümü' || (filter === 'Yenilebilir' ? m.safe === 'Yenilebilir' : m.safe !== 'Yenilebilir');
    const q = search.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.habitat.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  }), [filter, search]);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍄 Mantar Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>8 tür · yenilebilir ve zehirli mantar tanıma</div>
      </div>

      <div style={{ margin: '0 16px 14px', background: '#450a0a', borderRadius: 14, padding: '12px 16px', border: '1px solid #f8717144' }}>
        <div style={{ fontSize: 11, color: '#f87171', fontWeight: 600, marginBottom: 4 }}>⚠️ GÜVENLİK UYARISI</div>
        <div style={{ fontSize: 12, color: '#fca5a5', lineHeight: 1.6 }}>
          Bu rehber bilgi amaçlıdır. Kesin tür tespiti için uzman görüşü alın. Zehirlenmede: Zehir Danışma Hattı <strong>114</strong>.
        </div>
      </div>

      <div style={{ padding: '0 16px 10px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Mantar adı veya habitat ara…"
          style={{ width: '100%', boxSizing: 'border-box', background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}
        />
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? '#3b82f6' : '#1f2937',
            color: filter === f ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: filter === f ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{f}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} mantar türü</div>
        {filtered.map(m => <MushroomCard key={m.id} m={m} onClick={setSelected} />)}
      </div>

      {selected && <MushroomDetail m={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
