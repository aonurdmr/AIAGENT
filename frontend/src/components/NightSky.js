import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CONSTELLATIONS = [
  { name: 'Büyük Ayı (Ursa Major)', icon: '🐻', months: [3,4,5,6,7,8], tip: 'Büyük kepçenin iki uç yıldızını uzatınca Kutup Yıldızı\'na ulaşır.', stars: 7, visibility: 'Kuzey gökyüzünde yıl boyu — yaz akşamları en parlak' },
  { name: 'Orion Avcı', icon: '⚔️', months: [11,12,1,2,3], tip: 'Üç yıldız kemeri ile kolayca tanınır. Güneydoğuda yükselir.', stars: 7, visibility: 'Kış ayları Ocak ayında en belirgin' },
  { name: 'Akrep (Scorpius)', icon: '🦂', months: [6,7,8], tip: 'Kırmızı dev Antares kalbini oluşturur. Güney ufkunda alçak.', stars: 18, visibility: 'Yaz akşamları Türkiye\'de güneyden görünür' },
  { name: 'Terazi (Libra)', icon: '⚖️', months: [5,6,7], tip: 'Akrep\'in hemen yanında, karanlık gökyüzünde belirginleşir.', stars: 4, visibility: 'İlkbahar-yaz geçişi' },
  { name: 'Kasiyopeia', icon: '👑', months: [10,11,12,1], tip: 'W veya M şekli. Kutup Yıldızı\'nın karşısında kuzey semada.', stars: 5, visibility: 'Yıl boyu kuzeyden görünür, sonbahar en parlak' },
  { name: 'Yaz Üçgeni', icon: '🔺', months: [6,7,8,9], tip: 'Vega, Deneb ve Altair — üç parlak yıldız büyük üçgen kurar.', stars: 3, visibility: 'Yaz geceleri tepe noktası' },
];

const PLANETS = [
  { name: 'Venüs', icon: '✨', color: '#fbbf24', desc: 'Sabah veya akşam yıldızı. En parlak gezegen — gündüzün bile görünebilir.', tip: 'Güneş doğmadan 1-2 saat önce veya batar bitmez doğu/batıya bak.' },
  { name: 'Jüpiter', icon: '🔴', color: '#f97316', desc: 'İkinci en parlak gezegen. Dört büyük uydusu (Galileo uyduları) dürbünle görülür.', tip: 'Sabit parlak ışık — titreşmez. Yıldız titreşir, gezegen titreşmez.' },
  { name: 'Satürn', icon: '💍', color: '#f59e0b', desc: 'Halkaları küçük teleskopla dahi görülür. Altın sarısı rengi ile tanınır.', tip: 'Küçük 60x büyütmeli teleskopla halkalar belirginleşir.' },
  { name: 'Mars', icon: '🔴', color: '#ef4444', desc: 'Kırmızımsı rengi ile hemen tanınır. Yaklaşma periyodunda yıldız gibi parlar.', tip: '2-2.5 yıllık döngüde Dünya\'ya yaklaştığında en parlak.' },
];

const DARK_SPOTS = [
  { name: 'Yıldıztepe (Uludağ)', region: 'Bursa', bortle: 3, alt: '2543 m', note: 'Kış ve erken ilkbaharda müthiş Samanyolu' },
  { name: 'Kapadokya Platosu', region: 'Nevşehir', bortle: 2, alt: '1200 m', note: 'Türkiye\'nin en karanlık noktalarından' },
  { name: 'Antalya Beydağları', region: 'Antalya', bortle: 3, alt: '2500 m+', note: 'Yaz gecelerinde Scorpius ve Samanyolu' },
  { name: 'Kaçkar Dağları', region: 'Rize/Artvin', bortle: 2, alt: '3000 m+', note: 'Alpin çayırda ışık kirliliği sıfır' },
  { name: 'Erciyes', region: 'Kayseri', bortle: 3, alt: '3916 m', note: 'Orta Anadolu\'nun en yüksek noktası' },
  { name: 'Nemrut Dağı', region: 'Adıyaman', bortle: 2, alt: '2150 m', note: 'Tarihi alan + muhteşem karanlık gökyüzü kombinasyonu' },
];

const BORTLE_COLORS = { 1: '#fff', 2: '#dbeafe', 3: '#93c5fd', 4: '#60a5fa', 5: '#fbbf24', 6: '#f97316', 7: '#ef4444', 8: '#7c3aed', 9: '#374151' };

function getMoonPhase() {
  const now = new Date();
  const known = new Date(2000, 0, 6);
  const diff = (now - known) / (1000 * 60 * 60 * 24);
  const cycle = 29.53;
  const phase = ((diff % cycle) + cycle) % cycle;
  if (phase < 1.85) return { name: 'Yeni Ay', icon: '🌑', pct: 0 };
  if (phase < 7.38) return { name: 'Hilal', icon: '🌒', pct: 25 };
  if (phase < 11.08) return { name: 'İlk Dördün', icon: '🌓', pct: 50 };
  if (phase < 14.77) return { name: 'Dolunay\'a Az Kaldı', icon: '🌔', pct: 75 };
  if (phase < 18.46) return { name: 'Dolunay', icon: '🌕', pct: 100 };
  if (phase < 22.15) return { name: 'Azalıyor', icon: '🌖', pct: 75 };
  if (phase < 25.84) return { name: 'Son Dördün', icon: '🌗', pct: 50 };
  return { name: 'Yaşlı Ay', icon: '🌘', pct: 25 };
}

export default function NightSky() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('const');
  const moon = getMoonPhase();
  const curMonth = new Date().getMonth() + 1;

  const visibleConst = CONSTELLATIONS.filter(c => c.months.includes(curMonth));

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌌 Gece Gökyüzü</div>
        <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Takımyıldızlar · gezegenler · karanlık noktalar</div>
      </div>

      <div style={{ margin: '0 16px 12px', background: '#1e1b4b', borderRadius: 12, padding: '14px 16px', border: '1px solid #312e8122', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 36 }}>{moon.icon}</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#e0e7ff' }}>Bugün: {moon.name}</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Aydınlık %{moon.pct} · {moon.pct < 25 ? 'Gözlem için ideal' : moon.pct > 75 ? 'Ay ışığı görüşü zorlaştırır' : 'Orta düzey aydınlık'}</div>
        </div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[['const', '⭐ Takımyıldız'], ['planets', '🪐 Gezegenler'], ['dark', '🔭 Karanlık Nokta']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#4f46e5' : '#111827', color: tab === id ? '#fff' : '#6b7280',
            border: '1px solid', borderColor: tab === id ? '#4f46e5' : '#1f2937',
            borderRadius: 10, padding: '9px 0', fontSize: 10, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'const' && (
          <div>
            <div style={{ background: '#0f172a', borderRadius: 12, padding: '10px 12px', border: '1px solid #1e293b', marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: '#6b7280' }}>Bu ay görünür: <span style={{ color: '#818cf8', fontWeight: 700 }}>{visibleConst.length} takımyıldız</span></div>
            </div>
            {CONSTELLATIONS.map(c => {
              const vis = c.months.includes(curMonth);
              return (
                <div key={c.name} style={{ background: '#0f172a', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: `1px solid ${vis ? '#31274420' : '#1e293b'}`, opacity: vis ? 1 : 0.5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 22 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: vis ? '#e0e7ff' : '#6b7280' }}>{c.name}</div>
                      <div style={{ fontSize: 10, color: vis ? '#818cf8' : '#374151' }}>⭐ {c.stars} ana yıldız · {vis ? '✅ Bu ay görünür' : '❌ Bu ay görünmez'}</div>
                    </div>
                  </div>
                  {vis && (
                    <>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>{c.visibility}</div>
                      <div style={{ background: '#1e1b4b', borderRadius: 6, padding: '6px 8px' }}>
                        <div style={{ fontSize: 10, color: '#818cf8', fontWeight: 600, marginBottom: 2 }}>💡</div>
                        <div style={{ fontSize: 11, color: '#c7d2fe', lineHeight: 1.6 }}>{c.tip}</div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'planets' && PLANETS.map(p => (
          <div key={p.name} style={{ background: '#0f172a', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: `1px solid ${p.color}22` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 24 }}>{p.icon}</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: p.color }}>{p.name}</div>
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6, lineHeight: 1.6 }}>{p.desc}</div>
            <div style={{ background: p.color + '10', borderRadius: 6, padding: '6px 8px' }}>
              <div style={{ fontSize: 11, color: p.color, lineHeight: 1.6 }}>{p.tip}</div>
            </div>
          </div>
        ))}

        {tab === 'dark' && (
          <div>
            <div style={{ background: '#0f172a', borderRadius: 12, padding: '10px 12px', border: '1px solid #1e293b', marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.6 }}>Bortle skalası ışık kirliliğini ölçer. 1 = Tam karanlık (ideal), 9 = Şehir merkezi. Türkiye\'nin dağlık iç bölgeleri 2-3 Bortle değeri sunar.</div>
            </div>
            {DARK_SPOTS.map(d => (
              <div key={d.name} style={{ background: '#0f172a', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#e0e7ff' }}>🔭 {d.name}</div>
                  <span style={{ background: (BORTLE_COLORS[d.bortle] || '#fff') + '22', color: BORTLE_COLORS[d.bortle], border: `1px solid ${BORTLE_COLORS[d.bortle]}44`, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>Bortle {d.bortle}</span>
                </div>
                <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 3 }}>📍 {d.region} · ⛰️ {d.alt}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{d.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
