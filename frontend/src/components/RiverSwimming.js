import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RISKS = [
  { name: 'Ters akıntı', d: 'Nehir büklümlerinde iç kısımda dönüş akımı. Saygın görünen yüzey aldatıcı.' },
  { name: 'Soğuk şok', d: 'Dağ nehirleri yazın bile 12-15°C. Ani girişte kalp krizi riski — yavaş gir.' },
  { name: 'Buz tutmuş zemin', d: 'Yosunlu taş = buz gibi. Özellikle gölge kesimlerde — çıplaklık ölümcül.' },
  { name: 'Aniden yükselen su', d: 'Uzak yamurdan kaynaklı sel. Saat 15-18 dikkat et — dağ yağmurları.' },
  { name: 'Batık ağaç ve kayalar', d: 'Akıntıda gövdeyi sıkıştırır. Ayaklar önünde gitmek — ayakla hisset.' },
];

const TIPS = [
  { icon: '👟', t: 'Ayakkabı şart', d: 'Su ayakkabısı veya sandal. Yosunlu zeminde çıplak ayak tehlikeli.' },
  { icon: '👥', t: 'Asla yalnız', d: 'Nehirde yalnız yüzme yasak. Minimum 2 kişi, biri kıyıda beklesin.' },
  { icon: '🌊', t: 'Giriş noktası', d: 'Düz, sığ koy seç. Akıntıya karşı girme — yorarsın, paniklersin.' },
  { icon: '🆘', t: 'Çıkış planı', d: 'Girmeden önce nerede çıkacağını belirle. Akıntı sürüklerse yönünü bil.' },
];

export default function RiverSwimming() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('risks');

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏊 Nehirde Güvenli Yüzme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Riskler · güvenlik · teknikler</div>
      </div>

      <div style={{ background: '#041826', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>⚠️ DİKKAT</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Türkiye'de her yıl yüzlerce kişi nehir kazasında hayatını kaybediyor. Riskleri bil, önlem al.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['risks','Riskler'],['tips','Güvenlik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#041826', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'risks' && (
          <div style={{ background: '#041826', borderRadius: 14, padding: 14, border: '1px solid #ef444433' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', marginBottom: 10 }}>⚠️ Nehir Tehlikeleri</div>
            {RISKS.map((r, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < RISKS.length-1 ? '1px solid #0a2030' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#f87171' }}>{r.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{r.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#041826', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #06b6d422' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#06b6d4' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
