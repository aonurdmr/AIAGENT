import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  collect: {
    title: 'Toplama',
    items: [
      { icon: '🐚', t: 'Deniz Salyangozu', d: 'Murex, Rapana ve Cerithium cinsleri Ege ve Akdeniz kıyılarında bol bulunur.' },
      { icon: '🌊', t: 'Gelgit Zamanı', d: 'Cezir sırasında kayalık havuzlarda ve sığ sularda el ile toplanır.' },
      { icon: '📏', t: 'Boyut Seçimi', d: 'Minimum 3 cm boyutundakileri tercih edin; küçükleri geri bırakın.' },
      { icon: '🧺', t: 'Toplama Aracı', d: 'Hasır sepet veya file torba; plastik kap kullanmayın, havalanma şarttır.' },
      { icon: '⚠️', t: 'Mevsim', d: 'Mayıs-Eylül yaz ayları en uygun dönem; yumurtlama döneminde toplamayın.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🍋', t: 'Limonlu Haşlama', d: 'Tuzlu suda 20 dakika haşlayın, limon ve sarımsak sosuyla servis edin.' },
      { icon: '🧄', t: 'Sarımsaklı Sote', d: 'Zeytinyağı, sarımsak ve maydanozla yüksek ateşte hızlı kavurma.' },
      { icon: '🍅', t: 'Domates Soslu', d: 'Domates, soğan ve kırmızı biberli sos içinde 30 dakika yavaş pişirme.' },
      { icon: '🌶️', t: 'Acılı', d: 'Pul biber, sarımsak ve limon sosuyla Ege usulü baharatlı sunum.' },
      { icon: '🍞', t: 'Ekmek İle', d: 'Sosu emmesi için sıcak köy ekmeği yanında servis; Yunan adaları tarzı.' },
    ],
  },
};

export default function SeaSnailGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('collect');
  const data = TABS[tab];
  const accent = '#0e7490';
  const bg = '#000c10';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#cffafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐚 Deniz Salyangozu</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001820', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#22d3ee',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001c28', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#67e8f9', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
