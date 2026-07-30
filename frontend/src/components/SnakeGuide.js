import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const REPTILES = [
  {
    id: 1, name: 'Engerek', en: 'Blunt-nosed Viper', icon: '🐍', venomous: 'Zehirli',
    accent: '#ef4444',
    length: '60-95 cm', color: 'Gri-kahve, sırtında zikzak şerit',
    head: 'Üçgen, boyundan belirgin ayrılmış', pupils: 'Dikey oval (yırtık)',
    habitat: ['Taşlık yamaç', 'Kuru orman kenarı', 'Tarla'],
    regions: ['Ege', 'Akdeniz', 'İç Anadolu', 'Güneydoğu'],
    behavior: 'Uyarıldığında saldırır. Gündüz aktif.',
    first_aid: 'Sakin olun, ısırık bölgesini hareket ettirmeyin. 112\'yi arayın. Turnike UYGULAMAYIN.',
    note: 'Türkiye\'nin en yaygın zehirli yılanı. Isırma vakalarının büyük çoğunluğundan sorumludur.',
  },
  {
    id: 2, name: 'Levanten Engeregi', en: 'Levantine Viper', icon: '🐍', venomous: 'Tehlikeli Zehirli',
    accent: '#dc2626',
    length: '90-150 cm', color: 'Bej-gri, koyu zikzak, büyük gövde',
    head: 'Büyük üçgen, boyna göre çok geniş', pupils: 'Dikey oval',
    habitat: ['Taşlık dağ yamaçları', 'Kuru otlak'],
    regions: ['Doğu Anadolu', 'Güneydoğu Anadolu'],
    behavior: 'Yavaş ama saldırgan. Uyarıldığında geri çekilmez.',
    first_aid: 'Tıbbi acil durum — 112 hemen arayın. Antivenom gerektirir.',
    note: 'Türkiye\'nin en tehlikeli yılanı. Derin dağlık alanlarda yaşar.',
  },
  {
    id: 3, name: 'Kocabaş', en: 'Ottoman Viper', icon: '🐍', venomous: 'Zehirli',
    accent: '#f59e0b',
    length: '50-75 cm', color: 'Turuncu-kırmızı, koyu zikzak şerit',
    head: 'Üçgen, morumsu-turuncu', pupils: 'Dikey oval',
    habitat: ['Kayalık dağ', 'Yüksek yaylalar'],
    regions: ['Karadeniz', 'Doğu Anadolu'],
    behavior: 'Soğukkanlı iklimde yaşar. Yavaş hareket eder.',
    first_aid: 'Sakin olun. 112 arayın. Antivenom gerektiren durum olabilir.',
    note: 'Yüksek rakımlarda (1200-3000m) bulunur.',
  },
  {
    id: 4, name: 'Kral Yılanı', en: 'Coin-marked Snake', icon: '🐍', venomous: 'Zararsız',
    accent: '#22c55e',
    length: '70-120 cm', color: 'Koyu zeytin, sarı lekeli',
    head: 'Oval, boyundan ayrımı belirsiz', pupils: 'Yuvarlak',
    habitat: ['Kuru ova', 'Tarım alanı', 'Orman'],
    regions: ['Tüm Türkiye'],
    behavior: 'Hızlı, sakin, kaçmayı tercih eder. Köpeği gibi ısırabilir ama zararsız.',
    first_aid: 'İlk yardım gerekmez. Yara temizlenmeli.',
    note: 'Kemirgen avcısı. Tarım için yararlı.',
  },
  {
    id: 5, name: 'Sarı Yılan', en: 'Caspian Whipsnake', icon: '🐍', venomous: 'Zararsız',
    accent: '#84cc16',
    length: '100-200 cm', color: 'Sarı-zeytin, altında sarı',
    head: 'Uzun, sivri, yuvarlak pupil', pupils: 'Yuvarlak',
    habitat: ['Orman', 'Maki', 'Tarla kenarı'],
    regions: ['Marmara', 'Ege', 'Akdeniz', 'Karadeniz'],
    behavior: 'Çok hızlı, kaçar. Tehdit hissedince ısırabilir ama hafif.',
    first_aid: 'İlk yardım gerekmez.',
    note: 'Türkiye\'nin en uzun yılanlarından biri.',
  },
  {
    id: 6, name: 'Ok Yılanı', en: 'Montpellier Snake', icon: '🐍', venomous: 'Hafif Zehirli',
    accent: '#f97316',
    length: '80-160 cm', color: 'Uniform zeytin-yeşil veya koyu',
    head: 'Uzun, yuvarlak pupil', pupils: 'Yuvarlak',
    habitat: ['Kurak arazi', 'Maki', 'Zeytinlik'],
    regions: ['Ege', 'Akdeniz', 'Güneydoğu'],
    behavior: 'Çok hızlı, agresif değil. Zehir geriye doğru dişlerde.',
    first_aid: 'Derin ısırma nadir — yara temizlemek yeterli.',
    note: 'Opisthoglyphous (arka dişli) — hafif zehir insanları nadiren etkiler.',
  },
];

const VENOMOUS_COLORS = {
  'Zararsız': '#22c55e',
  'Hafif Zehirli': '#f59e0b',
  'Zehirli': '#f97316',
  'Tehlikeli Zehirli': '#ef4444',
};

const FILTERS = ['Tümü', 'Zararsız', 'Zehirli'];

function VenomBadge({ v }) {
  const color = VENOMOUS_COLORS[v] || '#6b7280';
  return (
    <span style={{ background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{v}</span>
  );
}

function SnakeCard({ s, onClick }) {
  return (
    <div onClick={() => onClick(s)} style={{
      background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
      border: `1px solid ${s.accent}44`, cursor: 'pointer',
      display: 'flex', alignItems: 'flex-start', gap: 14,
    }}>
      <div style={{ fontSize: 40, lineHeight: 1, marginTop: 2 }}>{s.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{s.name}</div>
          <VenomBadge v={s.venomous} />
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic', marginBottom: 6 }}>{s.en}</div>
        <div style={{ fontSize: 12, color: '#9ca3af' }}>📏 {s.length} · {s.color.slice(0, 35)}…</div>
      </div>
    </div>
  );
}

function SnakeDetail({ s, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 52 }}>{s.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb', marginBottom: 4 }}>{s.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic', marginBottom: 6 }}>{s.en}</div>
            <VenomBadge v={s.venomous} />
          </div>
        </div>

        {(s.venomous === 'Zehirli' || s.venomous === 'Tehlikeli Zehirli') && (
          <div style={{ background: '#450a0a', borderRadius: 12, padding: '12px 14px', marginBottom: 14, border: '1px solid #f8717144' }}>
            <div style={{ fontSize: 11, color: '#f87171', fontWeight: 600, marginBottom: 4 }}>🚨 ISIRMA DURUMUNDA</div>
            <div style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.6 }}>{s.first_aid}</div>
            <a href="tel:112" style={{ display: 'inline-block', marginTop: 8, background: '#ef4444', color: '#fff', borderRadius: 8, padding: '8px 16px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>📞 112'yi Ara</a>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'Boy', value: s.length, icon: '📏' },
            { label: 'Pupil', value: s.pupils, icon: '👁️' },
          ].map(item => (
            <div key={item.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{item.icon} {item.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{item.value}</div>
            </div>
          ))}
        </div>

        {[
          { title: '🎨 RENK & DESEN', text: s.color },
          { title: '🐍 BAŞ YAPISI', text: s.head },
          { title: '🌲 HABİTAT', text: s.habitat.join(', ') },
          { title: '🦎 DAVRANIŞ', text: s.behavior },
        ].map(item => (
          <div key={item.title} style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{item.text}</div>
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🗺️ BÖLGELER</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {s.regions.map(r => (
              <span key={r} style={{ background: s.accent + '22', color: s.accent, border: `1px solid ${s.accent}44`, borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600 }}>{r}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '12px 14px', border: '1px solid #3b82f644' }}>
          <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>📋 NOT</div>
          <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.6 }}>{s.note}</div>
        </div>
      </div>
    </div>
  );
}

export default function SnakeGuide() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => REPTILES.filter(s => {
    const matchFilter = filter === 'Tümü' || (filter === 'Zararsız' ? s.venomous === 'Zararsız' : s.venomous !== 'Zararsız');
    const q = search.toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.en.toLowerCase().includes(q);
  }), [filter, search]);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐍 Yılan & Sürüngen Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 tür · zehirli / zararsız yılan tanıma</div>
      </div>

      <div style={{ margin: '0 16px 14px', background: '#1e3a5f', borderRadius: 14, padding: '12px 16px', border: '1px solid #3b82f644' }}>
        <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>💡 GENEL KURAL</div>
        <div style={{ fontSize: 12, color: '#bfdbfe', lineHeight: 1.6 }}>
          Üçgen baş + dikey oval pupil = olası zehirli. Yılanı yakalamaya çalışmayın. Uzak durun ve yavaşça geri çekilin.
        </div>
      </div>

      <div style={{ padding: '0 16px 10px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Yılan adı ara…"
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
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} tür</div>
        {filtered.map(s => <SnakeCard key={s.id} s={s} onClick={setSelected} />)}
      </div>

      {selected && <SnakeDetail s={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
