import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TREES = [
  { name: 'Meşe', n: 'Quercus robur', d: 'Palamut. Loplu yaprak. 500 yıl yaşar. Türkiye\'de 15+ tür.' },
  { name: 'Kayın', n: 'Fagus orientalis', d: 'Doğu Anadolu ve Karadeniz. Düzgün gövde, gri kabuk, oval yaprak.' },
  { name: 'Sedir', n: 'Cedrus libani', d: 'Toros endemik. Yatay dallar, konik taç. Koruma altında.' },
  { name: 'Karaçam', n: 'Pinus nigra', d: 'Uzun iğne, çift. Ülkemizde en yaygın çam. Bozkir sınırında.' },
  { name: 'Gürgen', n: 'Carpinus betulus', d: 'Dalgalı gövde, yivli. Boynu bükük tohumlar. Karadeniz ormanı.' },
  { name: 'Ihlamur', n: 'Tilia tomentosa', d: 'Kalp yaprak, altı gümüş tüylü. Güzel koku. Yaylarda yaygın.' },
  { name: 'Kızılağaç', n: 'Alnus glutinosa', d: 'Dere kenarı. Küçük kozalak. Azot bağlar. Su seviyesi göstergesi.' },
];

const TIPS = [
  { icon: '🍃', t: 'Yaprak Şekli', d: 'Loplu mu, dişli mi, bütün mü? Zıt mı, karşılıklı mı dizilmiş?' },
  { icon: '🌰', t: 'Meyve ve Tohum', d: 'Palamut, kozalak, fındık — en güvenilir tanıma özelliği.' },
  { icon: '🌿', t: 'Kabuk', d: 'Pürüzsüz, çatlaklı, levha levha? Yaş ağaçta daha belirgin.' },
  { icon: '🏔️', t: 'Habitat', d: 'Deniz seviyesi mi, yüksek dağ mı? Kuru mü, ıslak mı?' },
  { icon: '📐', t: 'Silüet', d: 'Konik, yuvarlak, sütun biçim? Uzaktan tanıma için önemli.' },
];

export default function TreeIdentify() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('trees');

  return (
    <div style={{ background: '#050a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌳 Ağaç Tanıma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye orman ağaçları · tanıma teknikleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['trees','Ağaçlar'],['tips','Tanıma']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0a1008', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'trees' && (
          <div style={{ background: '#0a1008', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🌳 Türkiye Ormanlık Ağaçları</div>
            {TREES.map((tr, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < TREES.length-1 ? '1px solid #111808' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>{tr.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 }}>{tr.n}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{tr.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0a1008', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #22c55e22' }}>
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
