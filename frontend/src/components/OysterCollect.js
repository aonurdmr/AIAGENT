import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TIPS = [
  { icon: '🌊', t: 'Toplama yeri', d: 'Kayalık kıyılar, düşük gelgit bölgeleri. Türkiye: Ege ve Marmara koyları.' },
  { icon: '⏰', t: 'En iyi zaman', d: 'Düşük gelgit anı. Sabah erken saatler. Ay takvimi ile gelgit hesapla.' },
  { icon: '🔪', t: 'Açma tekniği', d: 'Kalın eldiven + istiridye bıçağı. Menteşeden gir, kaldır. Asla kırmaya çalışma.' },
  { icon: '🚰', t: 'Su kalitesi', d: 'Sadece temiz sulardan topla. Kırmızı gelgit veya kirlilik uyarısı varsa toplama.' },
  { icon: '🌡️', t: 'Saklama', d: 'Canlı tut: nemli bezle sar, 4°C. 3 gün içinde ye. Donmaya bırakma.' },
  { icon: '⚖️', t: 'Yasal sınır', d: 'Korunan bölgeler ve kota kurallarına dikkat. Asgari boy: 6 cm.' },
];

const RECIPES = [
  { t: 'Çiğ istiridye', d: 'Limon ve tabasco ile. Deniz suyuyla hafifçe yıka. Kabuktan içilir.' },
  { t: 'Izgara', d: 'Kömür ateşinde 5 dk. Kabukları açılınca hazır. Tereyağı ve sarımsak.' },
  { t: 'Buğulama', d: 'Beyaz şarap + sarımsak + maydanoz. 3-4 dakika buhar. Klasik Ege.' },
];

export default function OysterCollect() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tips');

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦪 İstiridye Toplama</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Habitat · toplama · açma · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['tips','Toplama'],['recipes','Pişirme']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#06101a', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#06101a', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #06b6d422' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#06b6d4' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}

        {tab === 'recipes' && (
          <div style={{ background: '#06101a', borderRadius: 14, padding: 14, border: '1px solid #06b6d433' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🍽️ Pişirme Yöntemleri</div>
            {RECIPES.map((r, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < RECIPES.length-1 ? '1px solid #0c1c28' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#67e8f9' }}>{r.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{r.d}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
