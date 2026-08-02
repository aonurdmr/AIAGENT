import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  { icon: '🎣', t: 'Atış Mekaniği', d: 'Enerji kanca ucuna transfer: olta elastikiyeti, bileğin vurma açısı ve bırakma zamanlaması.' },
  { icon: '💧', t: 'Su Direnci', d: 'Jig ve minnow düşme hızı: ağırlık/hacim oranı belirler. Karşı akıntıda daha hızlı düşer.' },
  { icon: '🌊', t: 'Akıntı Etkisi', d: 'Misina akıntıyla sürüklenir ve yem konumu kayar. Ağır kurşun akıntıda daha dik tutar.' },
  { icon: '🔮', t: 'Refraksiyon', d: 'Su altı görüntüsü kırılmış — balık senden 20-30° farklı konum görür. Yaklaşım açısı önemli.' },
  { icon: '🎵', t: 'Titreşim', d: 'Jig titreşimi: düşük frekanslı titreşim balığın yan çizgisi ile algılanır.' },
  { icon: '🌡️', t: 'Su Sıcaklığı', d: 'Sıcaklık balık metabolizmasını belirler: soğukta yavaş, ılıkta hızlı — yem hızını buna göre ayarla.' },
];

export default function FishingPhysics() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔬 Balıkçılık Fiziği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Atış mekaniği · su fiziği · balık algısı</div>
      </div>

      <div style={{ background: '#031018', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #06b6d433' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>🔬 BİLİMSEL AVCILIK</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Fiziği anlayan avcı daha bilinçli teknik seçer. Su altı dünyası farklı fizik kurallarıyla işler.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map((t, i) => (
          <div key={i} style={{ background: '#031018', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #06b6d422' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ fontSize: 28 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#06b6d4' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 3 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
