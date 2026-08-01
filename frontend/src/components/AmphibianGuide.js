import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  { name: 'Ova Kurbagası', n: 'Pelophylax ridibundus', d: 'En büyük Avrupa kurbagası. Göl ve nehir. Yaz gürültülü.' },
  { name: 'Yeşil Kurbaga', n: 'Bufo viridis', d: 'Yeşil benekli. Kara ve su arası. Gece aktif.' },
  { name: 'Sarı Karınlı Semender', n: 'Bombina variegata', d: 'Küçük, sarı karın. Dağ deresi. Tehlike pozisyonu: sırt dönme.' },
  { name: 'Kaplan Semenderi', n: 'Salamandra salamandra', d: 'Siyah-sarı. Yağmur sonrası. Orman ve yayla.' },
  { name: 'Çizgili Kurbaga', n: 'Hyla arborea', d: 'Küçük, yeşil, ağaç. Yapışkan parmak. Bahar çığrışması.' },
];

const TIPS = [
  { icon: '🌧️', t: 'En İyi Zaman', d: 'Yağmur ve ılık akşam. Kurbaga aktivitesi yağmur ile zirveye çıkar.' },
  { icon: '🔦', t: 'Gece Gözlem', d: 'Kırmızı fenerle — göz parlaması kolaydır. Sese odaklan önce.' },
  { icon: '🌊', t: 'Su Kaynağı', d: 'Her temiz su kaynağı olası habitat. Gölcük, dere, bataklık.' },
  { icon: '🚫', t: 'Tutma', d: 'Tutma gerekliyse elini ıslatmadan önce. Cilt hassas.' },
  { icon: '📊', t: 'Vatandaş Bilimi', d: 'Gözlemini INaturalist\'e kaydet — popülasyon takibine katkı.' },
];

export default function AmphibianGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');

  return (
    <div style={{ background: '#040e06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐸 Amfibi Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kurbagalar ve semenderler · habitat · gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['species','Türler'],['tips','Gözlem']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#080e08', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && (
          <div style={{ background: '#080e08', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🐸 Türkiye Amfibileri</div>
            {SPECIES.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SPECIES.length-1 ? '1px solid #0e140e' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>{s.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{s.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#080e08', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #22c55e22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
