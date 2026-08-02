import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ICONIC_TAXA = [
  { id: 'Actinopterygii', label: 'Balık', icon: '🐟' },
  { id: 'Aves',           label: 'Kuşlar', icon: '🦅' },
  { id: 'Mammalia',       label: 'Memeliler', icon: '🦌' },
  { id: 'Reptilia',       label: 'Sürüngenler', icon: '🦎' },
  { id: 'Insecta',        label: 'Böcekler', icon: '🦋' },
  { id: 'Plantae',        label: 'Bitkiler', icon: '🌿' },
  { id: 'Fungi',          label: 'Mantarlar', icon: '🍄' },
];

const BASE = 'https://api.inaturalist.org/v1';

async function fetchObs(taxon, page = 1) {
  const params = new URLSearchParams({
    place_id: '195',       // Turkey place ID on iNaturalist
    iconic_taxa: taxon,
    per_page: '20',
    page,
    order: 'desc',
    order_by: 'observed_on',
    photos: 'true',
    quality_grade: 'research',
  });
  const res = await fetch(`${BASE}/observations?${params}`);
  const data = await res.json();
  return { results: data.results || [], totalResults: data.total_results || 0 };
}

function ObsCard({ obs }) {
  const photo = obs.photos?.[0];
  const imgUrl = photo?.url?.replace('square', 'medium');
  const name = obs.taxon?.preferred_common_name || obs.taxon?.name || 'Bilinmeyen Tür';
  const sciName = obs.taxon?.name;
  const place = obs.place_guess || '—';
  const date = obs.observed_on ? new Date(obs.observed_on).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
  const observer = obs.user?.login || '—';

  return (
    <div style={{ background: '#1f2937', borderRadius: 14, overflow: 'hidden', border: '1px solid #374151' }}>
      {imgUrl ? (
        <img src={imgUrl} alt={name} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ width: '100%', height: 160, background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🌿</div>
      )}
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb', marginBottom: 2 }}>{name}</div>
        {sciName && <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic', marginBottom: 6 }}>{sciName}</div>}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, color: '#9ca3af' }}>📍 {place.slice(0, 28)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 10, color: '#6b7280' }}>📅 {date}</span>
          <span style={{ fontSize: 10, color: '#4ade80' }}>👤 {observer}</span>
        </div>
      </div>
    </div>
  );
}

export default function INaturalist() {
  const navigate = useNavigate();
  const [taxon, setTaxon] = useState('Actinopterygii');
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = useCallback(async (selectedTaxon, pg) => {
    setLoading(true);
    setError(null);
    try {
      const { results, totalResults } = await fetchObs(selectedTaxon, pg);
      setObservations(prev => pg === 1 ? results : [...prev, ...results]);
      setTotal(totalResults);
    } catch {
      setError('Veri yüklenemedi. İnternet bağlantınızı kontrol edin.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    load(taxon, 1);
  }, [taxon, load]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    load(taxon, next);
  };

  const current = ICONIC_TAXA.find(t => t.id === taxon);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔭 Doğa Gözlemleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          iNaturalist · Türkiye'deki araştırma kalitesinde gerçek gözlemler
        </div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {ICONIC_TAXA.map(t => (
          <button key={t.id} onClick={() => setTaxon(t.id)} style={{
            background: taxon === t.id ? '#3b82f6' : '#1f2937',
            color: taxon === t.id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: taxon === t.id ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap',
          }}>{t.icon} {t.label}</button>
        ))}
      </div>

      {total > 0 && (
        <div style={{ padding: '0 16px 10px', fontSize: 12, color: '#6b7280' }}>
          {current?.icon} Türkiye'de <span style={{ color: '#22c55e', fontWeight: 700 }}>{total.toLocaleString('tr-TR')}</span> {current?.label} gözlemi
        </div>
      )}

      <div style={{ padding: '0 16px' }}>
        {error && (
          <div style={{ background: '#450a0a', borderRadius: 12, padding: 16, color: '#f87171', marginBottom: 14, fontSize: 13 }}>
            ⚠️ {error}
          </div>
        )}

        {loading && observations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔭</div>
            <div>Gözlemler yükleniyor…</div>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {observations.map(obs => <ObsCard key={obs.id} obs={obs} />)}
            </div>

            {observations.length < total && (
              <button onClick={loadMore} disabled={loading}
                style={{ width: '100%', marginTop: 14, background: loading ? '#374151' : '#1f2937', color: loading ? '#6b7280' : '#9ca3af', border: '1px solid #374151', borderRadius: 12, padding: 14, fontSize: 13, cursor: loading ? 'default' : 'pointer' }}>
                {loading ? '⏳ Yükleniyor…' : `⬇️ Daha Fazla Yükle (${observations.length}/${total})`}
              </button>
            )}
          </>
        )}
      </div>

      <div style={{ margin: '14px 16px 0', background: '#1c1f26', borderRadius: 12, padding: '10px 14px', border: '1px solid #374151' }}>
        <div style={{ fontSize: 10, color: '#6b7280' }}>📡 Veri: iNaturalist API (api.inaturalist.org) · Araştırma kalitesi gözlemler · Türkiye (place_id: 195)</div>
      </div>
    </div>
  );
}
