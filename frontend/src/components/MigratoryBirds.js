import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  spring: {
    title: 'İlkbahar',
    items: [
      { icon: '🌸', t: 'Mart-Nisan Gecisi', d: 'Kirlangiclar, sigirciklar ve bildircinlar Afrika\'dan kuzeye yonelir.' },
      { icon: '🗺️', t: 'Türkiye Güzergahı', d: 'Boğazlar göç hunisi işlevi görür; İstanbul boğazı en yoğun nokta.' },
      { icon: '📍', t: 'İzleme Noktaları', d: 'Çamlıca Tepesi, Kuşadası körfezi ve Sivriburnu önemli gözlem konumlarıdır.' },
      { icon: '🔭', t: 'Gözlem Ekipmanı', d: '10x42 dürbün ve rehber kitap şart; saha defteri kayıt için önerilir.' },
      { icon: '📱', t: 'Uygulamalar', d: 'eBird ve Merlin uygulamaları tür tespitini ve gözlem kaydını kolaylaştırır.' },
    ],
  },
  autumn: {
    title: 'Sonbahar',
    items: [
      { icon: '🍂', t: 'Ağustos-Ekim', d: 'Yırtıcılar, leylekler ve arı kuşları güneye iner; Bosphorus spectaculer.' },
      { icon: '🦅', t: 'Yırtıcı Göçü', d: 'Eylül-Ekim arası binlerce balık kartalı ve şahin boğazdan geçer.' },
      { icon: '📊', t: 'Sayım Verileri', d: 'Doğa Derneği\'nin yıllık göç sayımı verileri çevrimiçi paylaşılır.' },
      { icon: '🌅', t: 'En İyi Hava', d: 'Hafif güney rüzgarı sonrası sabah saatleri göç yoğunluğu en yüksektir.' },
      { icon: '🤝', t: 'Gönüllü Katılım', d: 'Doğa Derneği sayım çalışmalarına gönüllü sayımcı olarak katılabilirsiniz.' },
    ],
  },
};

export default function MigratoryBirds() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('spring');
  const data = TABS[tab];
  const accent = '#059669';
  const bg = '#000c06';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#d1fae5', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🕊️ Göçmen Kuşlar</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001810', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#34d399',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001c0e', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#6ee7b7', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
