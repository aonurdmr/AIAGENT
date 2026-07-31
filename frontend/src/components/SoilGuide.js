import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SOIL_TYPES = [
  {
    id: 'kil', name: 'Killi Toprak', icon: '🏺', accent: '#ef4444',
    color: 'Kırmızı-kahverengi',
    texture: 'İnce taneli, yapışkan, şekil tutar',
    drainage: 'Yavaş drenaj — su birikir',
    fish: 'Yavaş su geçirmezliği — derin, sakin göl altları. Sazan ve yayın için ideal habitat.',
    plant: 'Ağır besleyici, çamurlu — kamış ve nilüfer bitkisi tipik göstergesi',
    hunting: 'Çamurlu zemin iz takibi için mükemmel — her hayvan izi kalır',
    tip: 'Killi göl tabanı yakın kıyıda sazancı için altın alan. Su türbülanssız hareketlerde mükemmel.',
  },
  {
    id: 'kum', name: 'Kumlu Toprak', icon: '🏖️', accent: '#fbbf24',
    color: 'Açık sarı-bej',
    texture: 'Kaba taneli, dökülen, şekil tutmaz',
    drainage: 'Hızlı drenaj — su hızla iner',
    fish: 'Kumlu nehir dibi: alabalık yumurtlama yeri. Deniz kumu: çipura ve levrek av zemin.',
    plant: 'İnce bitki örtüsü — kuşkonmaz ve kum lilyum burada büyür',
    hunting: 'Kum üzerinde iz takibi kolay ama rüzgarla silinir',
    tip: 'Nehirde kum-çakıl geçişi alabalık yumurtalama alanı. Saygı göster — balıkçılık baskısı verme.',
  },
  {
    id: 'batak', name: 'Bataklık & Turba', icon: '🌿', accent: '#22c55e',
    color: 'Siyah-koyu kahverengi',
    texture: 'Organik, süngerimsi, yüksek su tutma',
    drainage: 'Minimum drenaj — su tutulur',
    fish: 'Yüksek organik madde = yüksek böcek = balık zenginliği. Turna, levrek, yayın.',
    plant: 'Saz, kamış, su yosunu — zengin biyoçeşitlilik',
    hunting: 'Su kuşu habitat — ördek, balıkçıl, turna',
    tip: 'Bataklık kenarı şafak saatinde kuş fotoğrafı için Türkiye\'nin en iyi noktaları arasında.',
  },
  {
    id: 'kaya', name: 'Kaya & Taş Zemin', icon: '⛏️', accent: '#6b7280',
    color: 'Gri-siyah',
    texture: 'Sert, kırçıl, minimal toprak',
    drainage: 'Anında drenaj — toprak tutulmaz',
    fish: 'Kayalık nehir dibi: alabalık ve kayabalığı. Deniz kayalığı: levrek, sarıkanat, tatlı köpek balığı.',
    plant: 'Likyen, dağ çiçeği — kaya çatlakları habitat',
    hunting: 'İz bırakmaz — ekolojiyi gözlemle değil gör',
    tip: 'Kayalık dip balıkçılıkta yumuşak plastik yem "sürünme" hareketi — levrek saldırıya geçer.',
  },
];

const READING = [
  { icon: '🌿', sign: 'Su bitkisi yoğunluğu', meaning: 'Derin ve zengin besin tabanı — balık popülasyonu yüksek' },
  { icon: '💧', sign: 'Berrak su', meaning: 'Az çözünmüş madde — alabalık ve levrek ortamı' },
  { icon: '🟫', sign: 'Kahverengi/çamurlu su', meaning: 'Yüksek askı maddesi — sazan ortamı, görüş düşük' },
  { icon: '🦟', sign: 'Yoğun böcek faaliyeti', meaning: 'Balık beslenme yoğunluğu yüksek — sabah erken ideal' },
  { icon: '🐦', sign: 'Balıkçıl ve karabatak', meaning: 'Sığ suda aktif balık populasyonu — yakında avlan' },
  { icon: '🌊', sign: 'Köpük ve akıntı', meaning: 'Oksijenli su — alabalık ve somon burada' },
];

export default function SoilGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('soils');

  return (
    <div style={{ background: '#0a0804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌍 Zemin & Su Okuma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 zemin tipi · balıkçılık & av işareti okuma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['soils','Zemin Tipleri'],['reading','İşaret Okuma']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#92400e' : '#140f06', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'soils' && SOIL_TYPES.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#140f06', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 28 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>{s.color} · {s.drainage}</div>
                    </div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#140f06', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {[['📐 Doku', s.texture], ['🐟 Balıkçılık', s.fish], ['🌿 Bitki İşareti', s.plant], ['🏹 Av', s.hunting]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: s.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 3 }}>💡 PRO</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{s.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'reading' && (
          <div style={{ background: '#140f06', borderRadius: 14, padding: 14, border: '1px solid #92400e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🔍 Doğada İşaret Okuma</div>
            {READING.map((r, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < READING.length-1 ? '1px solid #201508' : 'none' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 20 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f59e0b' }}>{r.sign}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{r.meaning}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
