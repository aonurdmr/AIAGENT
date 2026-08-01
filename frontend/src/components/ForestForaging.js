import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FOODS = [
  { name: 'Meşe Palamut', season: 'Sonbahar', d: 'Tanen acıdır — su ile haşla, değiştir. Un yapılır. Karayel için.' },
  { name: 'Böğürtlen', season: 'Temmuz-Eylül', d: 'Doğrudan yenir. Çalıdan güneş gören taraf daha tatlı.' },
  { name: 'Kızılcık', season: 'Eylül-Ekim', d: 'Ekşi, C vitamini yüksek. Reçel veya kurutarak tüketilir.' },
  { name: 'Kuşburnu', season: 'Eylül-Kasım', d: 'Kırmızı, tüylü çekirdek. Filtre et — tüyler tahriş eder.' },
  { name: 'Ceviz (yabani)', season: 'Eylül-Ekim', d: 'Yeşil kabuk toksik renk bırakır. Siyah kabuklu olgununda topla.' },
  { name: 'Yabani Sarımsak', season: 'Mart-Mayıs', d: 'Orman tabanı. Yaprak: üç damarlı. Zehirli zambakla karıştırma.' },
];

const RULES = [
  { icon: '🎓', t: 'Uzman Onayı', d: 'Belirsizse yeme. Yüzde yüz emin olmadan tüketme.' },
  { icon: '🌱', t: 'Sürdürülebilir Toplama', d: 'Bir alanda yüzde 10\'dan fazla alma — gelecek nüfus için bırak.' },
  { icon: '🚗', t: 'Yol Kenarı', d: 'Egzoz ve toz birikimi. Yol kenarı yiyecek toplama: 50m uzak ol.' },
  { icon: '🧪', t: 'Kirlilik', d: 'Tarım alanı kenarı: ilaçlı olabilir. Organik alan tercih et.' },
];

export default function ForestForaging() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('foods');

  return (
    <div style={{ background: '#060a02', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌰 Ormanda Besin Toplama</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yabani besinler · sezon · güvenlik kuralları</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['foods','Besinler'],['rules','Kurallar']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0c1004', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'foods' && (
          <div style={{ background: '#0c1004', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🌰 Yabani Besinler</div>
            {FOODS.map((f, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < FOODS.length-1 ? '1px solid #141a08' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>{f.name}</div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>{f.season}</div>
                </div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{f.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'rules' && RULES.map((r, i) => (
          <div key={i} style={{ background: '#0c1004', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #22c55e22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>{r.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{r.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
