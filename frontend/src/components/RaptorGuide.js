import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RAPTORS = [
  {
    id: 'eagle', name: 'Kartal', icon: '🦅', accent: '#f59e0b',
    latin: 'Aquila chrysaetos', habitat: 'Dağlık alanlar, kayalıklar',
    size: 'Kanat açıklığı 180-220 cm · ağırlık 3-6 kg',
    prey: 'Tavşan, keklik, yer sincabı, küçük geyik yavrusu',
    flight: 'Geniş daire — termal akıntıda kanat ucuyla yükselir',
    season: 'Yıl boyu yerleşik · Ocak-Mart çiftleşme',
    id_tips: ['Kanatlarda açık kahve "omuz" leke', 'Kuyruk uzun ve yuvarlak', 'Uçuşta parmak görüntüsü belirgin'],
    conservation: 'Az tehdit altında — yuva bölgesinde rahatsız etme',
  },
  {
    id: 'falcon', name: 'Doğan (Şahin)', icon: '🦉', accent: '#06b6d4',
    latin: 'Falco peregrinus', habitat: 'Kayalıklar, kentsel binalar, kıyılar',
    size: 'Kanat açıklığı 95-115 cm · ağırlık 0.6-1.3 kg',
    prey: 'Güvercin, kırlangıç, ördek',
    flight: 'Yüksekten dik dalış (stooping) — dünyanın en hızlı kuşu 320 km/s',
    season: 'Yarı göçmen · kış sahillerde',
    id_tips: ['Mavi-gri sırt', 'Sarı göz çemberi', 'Moustache bıyık desen'],
    conservation: 'Koruma altında — fotoğraflama mesafesini koru',
  },
  {
    id: 'hawk', name: 'Atmaca', icon: '🦜', accent: '#22c55e',
    latin: 'Accipiter nisus', habitat: 'Orman içi, ağaçlık köy kenarları',
    size: 'Kanat açıklığı 60-80 cm · ağırlık 150-300g',
    prey: 'Serçe, iskete, bülbül — ağaç arası çevik avlanma',
    flight: 'Hızlı çırpış + süzme — orman içinde manevra ustası',
    season: 'Yıl boyu · kış daha fazla görülür',
    id_tips: ['Kısa yuvarlak kanat, uzun kuyruk', 'Sarı-turuncu göz', 'Dişi erkekten %25 büyük'],
    conservation: 'Yaygın — kentsel parklarda da gözlenebilir',
  },
  {
    id: 'kestrel', name: 'Kerkenez', icon: '🐦', accent: '#ef4444',
    latin: 'Falco tinnunculus', habitat: 'Açık alan, tarla kenarı, otoyol yanı',
    size: 'Kanat açıklığı 65-80 cm · ağırlık 140-300g',
    prey: 'Fare, böcek, solucan — UV izi takip eder',
    flight: 'Rüzgarda yerinde süzme (hovering) — karakteristik davranış',
    season: 'Yıl boyu — Türkiye\'nin en sık rastlanan yırtıcısı',
    id_tips: ['Erkek: gri baş, kestane sırt', 'Hovering anında kimlik kolaylaşır', 'Kuyruğu açılır-kapanır sık'],
    conservation: 'Yaygın · elektrik direkleri üzerinde sık tüneme yeri',
  },
  {
    id: 'vulture', name: 'Akbaba', icon: '🦆', accent: '#a78bfa',
    latin: 'Gyps fulvus', habitat: 'Dağ yamaçları, kayalık vadiler, termal bölgeler',
    size: 'Kanat açıklığı 240-280 cm · ağırlık 6-11 kg',
    prey: 'Leş — ekosistem temizleyicisi',
    flight: 'Termal üzerinde saatlerce süzme — kanat çırpmadan',
    season: 'Yıl boyu · Ege ve Toros Dağları\'nda koloniler',
    id_tips: ['Boyunda bej "yaka tüyleri"', 'Kel kırmızı baş', 'Sürü halinde iner'],
    conservation: 'Koruma altında — zehirli yem bırakmak yasak',
  },
];

const OBS_TIPS = [
  { icon: '🌅', tip: 'Sabah 8-11', desc: 'Termal akıntılar oluşmadan önce alçaktan uçarlar — gözlem için en iyi zaman' },
  { icon: '☀️', tip: 'Öğlen termal', desc: 'Güneş ısıtılan yamaçlarda yükselen hava — kartallar 1000m+ çıkabilir' },
  { icon: '🔭', tip: 'Dürbün 8x42', desc: 'Geniş görüş açısı ve ışık toplama kapasitesi için — 10x stabilite gerektirir' },
  { icon: '📍', tip: 'Kayalık kenar', desc: 'Yüksek kayalıkların önünde dur — rüzgar akıntısını kullanan türler geçer' },
  { icon: '🤫', tip: 'Sessiz ol', desc: 'Sesi duyan yırtıcı uzaklaşır — en az 200m mesafede gözlemle' },
  { icon: '📸', tip: 'Fotoğraf', desc: '500mm+ lens · karanlıkta 1/1000s+ enstantane · servo AF mod' },
];

export default function RaptorGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('raptors');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080a06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦅 Yırtıcı Kuşlar Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 tür · kartal, doğan, atmaca, kerkenez, akbaba</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['raptors','Türler'],['obs','Gözlem']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#0f1208', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'raptors' && RAPTORS.map(r => {
          const open = sel === r.id;
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#0f1208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic' }}>{r.latin} · {r.habitat}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0f1208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: r.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📏 BOYUT</div>
                  <div style={{ fontSize: 12, color: '#d1d5db' }}>{r.size}</div>
                  <div style={{ fontSize: 11, color: r.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>🍖 AV</div>
                  <div style={{ fontSize: 12, color: '#d1d5db' }}>{r.prey}</div>
                  <div style={{ fontSize: 11, color: r.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>✈️ UÇUŞ</div>
                  <div style={{ fontSize: 12, color: '#d1d5db' }}>{r.flight}</div>
                  <div style={{ fontSize: 11, color: r.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>🔍 TANIMA</div>
                  {r.id_tips.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {t}</div>)}
                  <div style={{ background: r.accent + '18', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>🛡️ {r.conservation}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'obs' && (
          <div style={{ background: '#0f1208', borderRadius: 14, padding: 14, border: '1px solid #f59e0b22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🔭 Yırtıcı Kuş Gözlem Rehberi</div>
            {OBS_TIPS.map((o, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < OBS_TIPS.length-1 ? '1px solid #1a1e12' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{o.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fde68a' }}>{o.tip}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{o.desc}</div>
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
