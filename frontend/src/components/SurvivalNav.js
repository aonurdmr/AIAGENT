import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  {
    id: 'sun', name: 'Güneş ile Yön Bulma', icon: '☀️', accent: '#f59e0b',
    desc: 'Gölge tekniği ve güneş saati',
    steps: [
      'Saat yöntemi (K. Yarım Küre): saati yatay tut, saat kolunu güneşe doğrult',
      '12 sayısı ile saat kolu arasındaki açıyı yarıla — güney yönü çıkar',
      'Gölge uç tekniği: çubuğu düz zemine çak, gölge ucunu işaretle',
      '15-20 dakika bekle, ikinci gölge ucunu işaretle',
      'İlk nokta = Batı, ikinci nokta = Doğu — aralarında düz çizgi',
      'Gölge en kısaldığı an: tam öğle = güney taraf',
    ],
    tip: 'Türkiye K. Yarım Küre — güneş daima güneye bakar.',
  },
  {
    id: 'stars', name: 'Yıldızlarla Yön', icon: '⭐', accent: '#6366f1',
    desc: 'Kutup Yıldızı ve diğer referanslar',
    steps: [
      'Kutup Yıldızı = tam Kuzey (sapma 1 dereceden az)',
      'Büyük Ayı bul: iki uç yıldız hizasını 5 kat uzan — Kutup Yıldızı',
      'Güney Çaprazı (S. Yarım Küre): uzun kolunu 4.5 kat uzan — Güney kutbu',
      'Orion takım yıldızı: kuşağının üç yıldızı doğudan doğar, batıda batar',
      'Yıldız izleme: bir yıldızı çubuğa hizala, hareketi izle',
      'Sola kayıyorsa Kuzey, sağa kayıyorsa Güney bakıyorsun',
    ],
    tip: 'Bulutlu gece yıldız görünmez — alternatif yöntem her zaman hazırla.',
  },
  {
    id: 'nature', name: 'Doğal İşaretler', icon: '🌲', accent: '#22c55e',
    desc: 'Bitki ve topoğrafya ile yön tespiti',
    steps: [
      'Ağaç yosunu: kuzey tarafa daha fazla büyür (az güneş alır)',
      'Ağaç halkalar: güney tarafta daha geniş — güneş aldığı için',
      'Karın erimesi: güney yamacı daha hızlı erir',
      'Ant yuvası: genellikle kuzey tarafında — sıcak güney tarafına açık',
      'Akarsu: genelde denize doğru akar — alçağı bul',
      'Rüzgar türkiye: hâkim rüzgar çoğu zaman kuzeyden — Poyraz',
    ],
    tip: 'Tek işaret güvensiz — 2-3 işareti karşılaştır ve onayla.',
  },
  {
    id: 'terrain', name: 'Topoğrafya Okuma', icon: '🗺️', accent: '#f97316',
    desc: 'Araçsız arazi okuması',
    steps: [
      'Su bul: vadi ve dere hattını takip et — insan yerleşimi orada',
      'Doruk: yüksek noktadan geniş görüş — yönlenme için',
      'Sırt takip: genelde topoğrafik yol — daha az bitki, daha kolay',
      'Vadi boyunca git: nehre ulaşır, nehir şehre ulaştırır',
      'Güneydeki yamaçlar açık, kuzeydeki yamaçlar ormanlık',
      'Eğim hesabı: adım sayarak mesafe — 100 adım yaklaşık 70-80m',
    ],
    tip: 'Haritasız gidişte: su + doruk + güneş üçgenini kullan.',
  },
  {
    id: 'signal', name: 'Kurtarma Sinyali', icon: '📡', accent: '#ef4444',
    desc: 'Kaybolunca yardım çağırma yöntemleri',
    steps: [
      'SOS = üç kısa + üç uzun + üç kısa (ses veya ışık)',
      'Duman sinyali: 3 duman ateşi üçgen dizisi = yardım sinyali',
      'Ayna veya parlak yüzey: güneş ışığını uçağa yansıt',
      'Açık alanda büyük X veya SOS harfi yap — havadan görünür',
      'Islık: 3 kısa ses = yardım sinyali',
      'Bekle veya git: kural = yürüyemiyorsan bekle, hava iyiyse hareket et',
    ],
    tip: '112 veya 156 (Sahil Güvenlik) her zaman önce ara — eğer cekeyse git.',
  },
];

export default function SurvivalNav() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060a06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧭 Hayatta Kalma Navigasyonu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Güneş · yıldız · doğal işaretler · topoğrafya · sinyal</div>
      </div>

      <div style={{ background: '#0a1008', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f59e0b33' }}>
        <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>⚠️ ÖNCE GÜVENLIK</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Orman veya dağa çıkmadan konum paylaş. GPS saatini şarjlı tut. Pusula — batarya gerektirmez, her zaman çalışır.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {METHODS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#0a1008', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{m.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a1008', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: m.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {m.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ background: m.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {m.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
