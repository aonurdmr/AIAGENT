import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES_BOXES = [
  { bird: 'Serçe', hole: '28mm', h: '20cm', d: 'Bahçe ve park. Ahşap veya beton. 1.5-3m yüksek.' },
  { bird: 'Baykuş (Kukumav)', hole: '80mm', h: '40cm', d: 'Ambar ve ahır. Büyük kutu. Fareler kontrol eder.' },
  { bird: 'Kestane siyahi', hole: '45mm', h: '25cm', d: 'Orman kenarı. Böcekçil. 3-5m yükseklik.' },
  { bird: 'Göçmen arıkuşu', hole: '60mm', h: '30cm', d: 'Meyve bahçesi. Yazlık. Kuzey bakan delik.' },
  { bird: 'Tit / Baştankara', hole: '26mm', h: '18cm', d: 'Bahçe. En kolay çekilen tür. Nisan dolum başlar.' },
];

const TIPS = [
  { icon: '🔨', t: 'Malzeme', d: 'Ahşap tercih et: 15-20mm kalınlıkta. Emprenye yok — kimyasal zarar verir.' },
  { icon: '📍', t: 'Konum', d: 'Güneşe dönük olmayan yön. Sabah güneşi tamam, öğlen güneşi çok sıcak.' },
  { icon: '🚫', t: 'Tünek Çubuğu', d: 'Asla tünek çubuğu koyma — yabancı kuşların (serçe) girmesini kolaylaştırır.' },
  { icon: '🧹', t: 'Temizlik', d: 'Sezon sonunda boşalt ve yıka. Parazit birikimini önler.' },
  { icon: '🐱', t: 'Kedi Koruması', d: 'Metal yaka veya 1.5m pürüzsüz direk — kedi yukarı çıkamasın.' },
  { icon: '📏', t: 'Yükseklik', d: 'Tür başına farklı yükseklik. Zemine çok yakın = yırtıcı riski.' },
];

export default function BirdHouse() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');

  return (
    <div style={{ background: '#050a08', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏡 Kuş Evi Yapımı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tür boyutları · konum · bakım</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['species','Tür Boyutları'],['tips','Yapım İpuçları']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#a78bfa' : '#0a1008', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && (
          <div style={{ background: '#0a1008', borderRadius: 14, padding: 14, border: '1px solid #a78bfa33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', marginBottom: 10 }}>📐 Türe Göre Boyut</div>
            {SPECIES_BOXES.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SPECIES_BOXES.length-1 ? '1px solid #111808' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#c4b5fd' }}>{s.bird}</div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>Delik: {s.hole} | Yüksek: {s.h}</div>
                </div>
                <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{s.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0a1008', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #a78bfa22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
