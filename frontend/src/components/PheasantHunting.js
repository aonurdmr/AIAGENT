import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  {
    id: 'dog', name: 'Köpekle Av', icon: '🐕', accent: '#f97316',
    desc: 'Pointer veya setter ile sülün kaldırma',
    steps: [
      'Pointer izi bulur, noktalar (point) — sabit durur',
      'Avcı köpeğin önüne geçer — sülünü kaldırır',
      'Sülün kaçtıkça hızlanır — 15-20m bekle',
      'Spaniel: tarama ve kaldırma, sülünü geri getirir',
      'Kaldırma anı: hedefi teyit et, ateş et',
      'Vurulan sülünü köpek getirir — "fetch" komutu',
    ],
    tip: 'Köpek noktalarında sabırla bekle — erken yaklaşma sülünü erken kaçırır.',
  },
  {
    id: 'drive', name: 'Batırma (Drive) Avı', icon: '🚶', accent: '#22c55e',
    desc: 'Sürücüler sülünü bekleyen avcılara doğru iter',
    steps: [
      'Ekip: sürücüler bir taraf, avcılar diğer taraf',
      'Sürücüler gürültü yaparak sülünü iter',
      'Sülün kaçış anında avcı önünde belirginleşir',
      'Yüksek atış: sülün uçarken yukarıdan atış',
      'Güvenlik: avcılar çizgisi dışı ateş yasak',
      'Organizasyon ve koordinasyon şart — ekip iletişimi',
    ],
    tip: 'Drive avı en verimli yöntem — geniş alanda kalabalık ekip gerekir.',
  },
  {
    id: 'walk', name: 'Yürüyerek Tarama', icon: '👟', accent: '#06b6d4',
    desc: 'Ekin tarlası ve çalılıkta yavaş yürüyüş',
    steps: [
      'Mısır veya buğday tarlası kenarını tara',
      'Çalılık ve diken — sülün saklanma noktaları',
      'Yavaş ve düzensiz yürü — sülün sinen hisseder',
      'Atış şansı: sülün kalkınca 3-5 saniye bekle',
      'Kısa atış mesafesi: 25-40m — saçma dağılımı',
      'Yaban yaşam alanında sabah sülün beslenme turunda',
    ],
    tip: 'Çiğ sabahı sülün ısınmak için açık alana çıkar — en iyi saat.',
  },
];

const SEASONS = [
  { period: 'Ekim-Aralık', open: true, note: 'Ana sezon — sülün avı başlar, ekim çevresinde daha aktif' },
  { period: 'Ocak', open: true, note: 'Devam — kontrol et, bazı bölgede kapanır' },
  { period: 'Şubat-Eylül', open: false, note: 'Kapalı sezon — ruhsat ile özel sahalar hariç yasak' },
];

export default function PheasantHunting() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('methods');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0c0804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦜 Sülün Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Köpekle · drive · yürüyerek tarama · sezon</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['methods','Teknikler'],['season','Sezon']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#1a1205', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'methods' && METHODS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#1a1205', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{m.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1a1205', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: m.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {m.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ background: m.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {m.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'season' && (
          <div style={{ background: '#1a1205', borderRadius: 14, padding: 14, border: '1px solid #f9731622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 12 }}>📅 Sülün Av Sezonu</div>
            {SEASONS.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SEASONS.length-1 ? '1px solid #2c1d08' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{s.period}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: s.open ? '#22c55e20' : '#ef444420', color: s.open ? '#22c55e' : '#ef4444' }}>{s.open ? 'AÇIK' : 'KAPALI'}</div>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{s.note}</div>
              </div>
            ))}
            <div style={{ background: '#ef444415', borderRadius: 8, padding: '10px 12px', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#fca5a5' }}>Ruhsat zorunlu. İl Tarım Müdürlüğü takvimini yıllık kontrol et.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
