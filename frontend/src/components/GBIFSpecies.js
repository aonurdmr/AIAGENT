import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = 'https://api.gbif.org/v1';

const QUICK = [
  { label: 'Levrek', q: 'Dicentrarchus labrax' },
  { label: 'Lüfer', q: 'Bluefish Pomatomus' },
  { label: 'Palamut', q: 'Sarda sarda' },
  { label: 'Çipura', q: 'Sparus aurata' },
  { label: 'Karabatak', q: 'Phalacrocorax carbo' },
  { label: 'Akbaba', q: 'Gyps fulvus' },
  { label: 'Yabani Domuz', q: 'Sus scrofa' },
  { label: 'Keklik', q: 'Alectoris chukar' },
];

const RANK_COLOR = {
  SPECIES: '#22c55e', GENUS: '#06b6d4', FAMILY: '#f59e0b',
  ORDER: '#a855f7', CLASS: '#ef4444', PHYLUM: '#94a3b8',
};

async function searchSpecies(q) {
  const res = await fetch(`${BASE}/species/suggest?q=${encodeURIComponent(q)}&limit=10`);
  return res.json();
}

async function fetchSpeciesDetail(key) {
  const [main, occ] = await Promise.all([
    fetch(`${BASE}/species/${key}`).then(r => r.json()),
    fetch(`${BASE}/occurrence/search?taxonKey=${key}&country=TR&limit=0`).then(r => r.json()),
  ]);
  return { main, turkeyCount: occ.count || 0 };
}

function RankBadge({ rank }) {
  const color = RANK_COLOR[rank] || '#6b7280';
  return (
    <span style={{ fontSize: 10, background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>
      {rank}
    </span>
  );
}

function SpeciesRow({ sp, onSelect }) {
  return (
    <div onClick={() => onSelect(sp)} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb', fontStyle: 'italic' }}>{sp.scientificName || sp.canonicalName}</div>
        {sp.vernacularName && <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{sp.vernacularName}</div>}
        <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {sp.rank && <RankBadge rank={sp.rank} />}
          {sp.kingdom && <span style={{ fontSize: 10, color: '#6b7280' }}>{sp.kingdom}</span>}
        </div>
      </div>
      <span style={{ color: '#6b7280', fontSize: 16 }}>›</span>
    </div>
  );
}

function SpeciesDetail({ sp, detail, onClose }) {
  const m = detail?.main || {};
  const count = detail?.turkeyCount;
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000b', zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb', fontStyle: 'italic', marginBottom: 4 }}>
          {m.canonicalName || sp.scientificName}
        </div>
        {m.vernacularNames?.[0]?.vernacularName && (
          <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 10 }}>{m.vernacularNames[0].vernacularName}</div>
        )}

        {m.rank && <RankBadge rank={m.rank} />}

        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'Alem', value: m.kingdom },
            { label: 'Şube', value: m.phylum },
            { label: 'Sınıf', value: m.class },
            { label: 'Takım', value: m.order },
            { label: 'Aile', value: m.family },
            { label: 'Cins', value: m.genus },
          ].filter(s => s.value).map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.label}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb', marginTop: 1, fontStyle: 'italic' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {count !== undefined && (
          <div style={{ marginTop: 14, background: count > 0 ? '#052e16' : '#1c1f26', borderRadius: 12, padding: '12px 14px', border: `1px solid ${count > 0 ? '#16a34a44' : '#374151'}` }}>
            <div style={{ fontSize: 11, color: count > 0 ? '#4ade80' : '#6b7280', fontWeight: 600, marginBottom: 2 }}>🇹🇷 TÜRKİYE GBIF KAYITLARI</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: count > 0 ? '#22c55e' : '#6b7280' }}>
              {count.toLocaleString('tr-TR')}
            </div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>
              {count > 0 ? 'Doğrulanmış gözlem kaydı' : 'Türkiye\'de kayıt bulunamadı'}
            </div>
          </div>
        )}

        {m.taxonomicStatus && (
          <div style={{ marginTop: 10, background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: 10, color: '#6b7280' }}>Taksonomik Durum</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: m.taxonomicStatus === 'ACCEPTED' ? '#22c55e' : '#f59e0b', marginTop: 2 }}>
              {m.taxonomicStatus}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GBIFSpecies() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const search = useCallback(async (q) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    try {
      const data = await searchSpecies(q);
      setResults(Array.isArray(data) ? data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelect = async (sp) => {
    setSelected(sp);
    setDetail(null);
    if (!sp.key) return;
    setDetailLoading(true);
    try {
      const d = await fetchSpeciesDetail(sp.key);
      setDetail(d);
    } catch {
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧬 GBIF Tür Arama</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          Global Biodiversity Information Facility · taksonomik sınıflandırma ve Türkiye kayıtları
        </div>
      </div>

      <div style={{ padding: '0 16px 14px' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); search(e.target.value); }}
            placeholder="Tür ismi ara (Türkçe veya Latince)…"
            style={{ flex: 1, background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 10, padding: '11px 14px', fontSize: 14 }}
          />
          {query && (
            <button onClick={() => { setQuery(''); setResults([]); }} style={{ background: '#374151', border: 'none', color: '#9ca3af', borderRadius: 10, padding: '0 14px', cursor: 'pointer', fontSize: 16 }}>✕</button>
          )}
        </div>
      </div>

      {!query && (
        <div style={{ padding: '0 16px 14px' }}>
          <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, marginBottom: 8 }}>HIZ ARAMALARI</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {QUICK.map(q => (
              <button key={q.label} onClick={() => { setQuery(q.q); search(q.q); }}
                style={{ background: '#1f2937', border: '1px solid #374151', color: '#9ca3af', borderRadius: 20, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>
                {q.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: '0 16px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: 24, color: '#6b7280' }}>
            <div style={{ fontSize: 24 }}>🔍</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Aranıyor…</div>
          </div>
        )}
        {!loading && results.map((sp, i) => (
          <SpeciesRow key={sp.key || i} sp={sp} onSelect={handleSelect} />
        ))}
        {!loading && query && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: '#6b7280' }}>
            <div style={{ fontSize: 32 }}>🧬</div>
            <div style={{ marginTop: 8 }}>Sonuç bulunamadı</div>
          </div>
        )}
        {!query && !loading && (
          <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🧬</div>
            <div>Bir tür adı girerek GBIF veritabanında ara</div>
            <div style={{ fontSize: 12, marginTop: 8, color: '#4b5563' }}>60M+ kayıt · 1.6M+ tür · dünya geneli</div>
          </div>
        )}
      </div>

      {selected && (
        <SpeciesDetail
          sp={selected}
          detail={detailLoading ? null : detail}
          onClose={() => { setSelected(null); setDetail(null); }}
        />
      )}

      <div style={{ margin: '14px 16px 0', background: '#1c1f26', borderRadius: 12, padding: '10px 14px', border: '1px solid #374151' }}>
        <div style={{ fontSize: 10, color: '#6b7280' }}>📡 Veri: GBIF API (api.gbif.org/v1) · Global Biyoçeşitlilik Bilgi Tesisi · Ücretsiz &amp; açık</div>
      </div>
    </div>
  );
}
