import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TYPES = [
  { name: 'Monofilament', d: 'Klasik tek iplik misina. Ucuz, esnek, dugum guclu. UV ile bozulur — yilda degistir.' },
  { name: 'Florokarbon', d: 'Suda gorulmez. Kanca ve lider olarak kulllan. Serttir, dugum zayif — dikkat.' },
  { name: 'Braid (Orgu)', d: 'Cok katmanli. Ince ama guclu. Duyarli — en kucuk dokunusu hissedersin.' },
  { name: 'Fusyon misina', d: 'Mono+braid ozellikleri. Uzun mesafe atimlarda populer. Orta fiyat.' },
];

const KNOTS = [
  { icon: '🔗', t: 'Palomar dugumu', d: 'Braid icin en guvenilir. %99 mukavemet. Kucuk kancalarda kullan.' },
  { icon: '🔗', t: 'Improved clinch', d: 'Mono klasigi. 5-6 tur + geri gecir. Hizli, yeterince guvenilir.' },
  { icon: '🔗', t: 'Uni to uni', d: 'Misina birlestirmede. Braid + florokarbon lideri icin mukemmel.' },
  { icon: '🔗', t: 'Blood knot', d: 'Ayni kalinliktaki iki monoyu birlestirir. Olta sisteminde ara baglama.' },
];

export default function FishingLine2() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧵 Misina Secimi & Dugumler</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Misina tipleri · dugum teknikleri · secim rehberi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['types','Misina Tipleri'],['knots','Dugumler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#3b82f6' : '#041424', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'types' && (
          <div style={{ background: '#041424', borderRadius: 14, padding: 14, border: '1px solid #3b82f633' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6', marginBottom: 10 }}>🧵 Misina Tipleri</div>
            {TYPES.map((t, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < TYPES.length-1 ? '1px solid #081e30' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'knots' && KNOTS.map((k, i) => (
          <div key={i} style={{ background: '#041424', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #3b82f622' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{k.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#3b82f6' }}>{k.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{k.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
