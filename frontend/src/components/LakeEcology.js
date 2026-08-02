import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  life: {
    title: 'Canlılar',
    items: [
      { icon: '🐟', t: 'Balık Faunası', d: 'Sazan, yayın, levrek ve turna göllerimizin en yaygın balık türleridir.' },
      { icon: '🐸', t: 'Amfibiler', d: 'Kurbağa, kara semender ve su kaplumbağası göl ekosisteminin kritik bileşenidir.' },
      { icon: '🌿', t: 'Su Bitkileri', d: 'Su sümbülü, nilüfer, saz ve kamış göl su kalitesini düzenler.' },
      { icon: '🐦', t: 'Kuş Çeşitliliği', d: 'Karabatak, balıkçıl, sakarmeke ve yaban ördeği gölleri yoğun kullanır.' },
      { icon: '🦟', t: 'Böcek Yaşamı', d: 'Yusufçuk larvaları, su böcekleri ve mayıs sinekleri göl zincirinin temelidir.' },
    ],
  },
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '💧', t: 'Su Kalitesi', d: 'pH 6.5-8.5, çözünmüş oksijen >6 mg/L sağlıklı göl ekosistemi göstergesidir.' },
      { icon: '🌊', t: 'Tabakalaşma', d: 'Yaz aylarında epilimnion ve hipolimnion arasında termal tabakalaşma oluşur.' },
      { icon: '🔄', t: 'Besin Döngüsü', d: 'Fitoplankton-zooplankon-balık-kuş zinciri göl enerjisini taşır.' },
      { icon: '⚠️', t: 'Tehditler', d: 'Ötrofikasyon, tarım kimyasalları ve invasif türler göl ekosistemini tehdit eder.' },
      { icon: '🌱', t: 'Restorasyon', d: 'Saz ve kamış plantasyonu, balık stoku dengelenmesi ve sediment temizligi yöntemleri kullanılır.' },
    ],
  },
};

export default function LakeEcology() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('life');
  const data = TABS[tab];
  const accent = '#0284c7';
  const bg = '#000610';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0f2fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🏞️ Göl Ekolojisi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001020', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#38bdf8',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001428', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#7dd3fc', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
