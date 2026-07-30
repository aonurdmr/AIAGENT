import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SOUNDS = [
  {
    id: 1, name: 'Kaya Kartalı', icon: '🦅', category: 'Kuş',
    sound: 'Yüksek perdeli, kesik kesik "kiyik kiyik" sesi',
    time: 'Gündüz (özellikle sabah)', habitat: 'Dağ ve kayalık',
    description: 'Genellikle sessizdir. Tehlike anında veya yavruları çağırırken güçlü bir çığlık atar.',
    hear: 'Yüksek zirvelerde ve kayalık vadilerde. Sesin yankılandığı yönde arayın.',
    season: [3,4,5,6,7,8,9], rarity: 'Nadir',
    color: '#f59e0b',
    facts: ['Kanatları 2 metreye kadar açılabilir', 'Çiftin biri ötüğünde diğeri yanıtlar', 'Çok uzaktan duyulabilir'],
  },
  {
    id: 2, name: 'Baykuş (Kukumav)', icon: '🦉', category: 'Kuş',
    sound: '"Ku-ku-VAV" tekrarlayan gece sesi',
    time: 'Gece (22:00-04:00)', habitat: 'Orman ve köy kenarı',
    description: 'Türkiye\'nin en yaygın baykuşu. Sessiz gece ortamında oldukça güçlü çığlık atar.',
    hear: 'Eski binalarda, ağaç kovuklarında. Sesin geldiği yöne yavaşça yaklaşın.',
    season: [1,2,3,4,5,6,7,8,9,10,11,12], rarity: 'Yaygın',
    color: '#a855f7',
    facts: ['Yıl boyu ötüşür', 'Çift sesi birbirini tamamlar', 'Eşini ses ile arar'],
  },
  {
    id: 3, name: 'Kurbağa', icon: '🐸', category: 'Sürüngen',
    sound: 'Ritimli "ırak ırak" veya gürültülü vırlama',
    time: 'Gece (özellikle yağmurdan sonra)', habitat: 'Sulak alan ve dere kenarı',
    description: 'Yeşil kurbağalar yaz geceleri koro oluşturur. Sesi birkaç kilometre uzaktan duyulabilir.',
    hear: 'Göl ve bataklık kenarları. Sustuklarında sakin bekleyin, tekrar başlarlar.',
    season: [4,5,6,7,8,9], rarity: 'Yaygın',
    color: '#22c55e',
    facts: ['Sadece erkekler ötüşür', 'Sıcaklık düştüğünde sesleri yavaşlar', 'Gölet kenarları ideal dinleme noktası'],
  },
  {
    id: 4, name: 'Çekirge', icon: '🦗', category: 'Böcek',
    sound: 'Sürekli, titrek "tirili tirili" sesi',
    time: 'Öğle ve öğleden sonra', habitat: 'Çayır ve otluk alan',
    description: 'Sıcak yaz günlerinin simgesi. Erkekler kanatlarını birbirine sürerek ses çıkarır.',
    hear: 'Çayırlıkta yavaş yürüyün. Sesin en yüksek geldiği yere yaklaştığınızda biter, susarsınız, başlar.',
    season: [6,7,8,9], rarity: 'Yaygın',
    color: '#84cc16',
    facts: ['Sıcaklık arttıkça titreşim hızlanır', 'Her tür farklı frekans çıkarır', 'Sadece erkekler ötüşür'],
  },
  {
    id: 5, name: 'Kurtlar', icon: '🐺', category: 'Memeli',
    sound: 'Uzun, yükselen "uuuuu" uluma sesi',
    time: 'Gece (özellikle ay ışığında)', habitat: 'Orman ve step',
    description: 'Kurt uluması iletişim amaçlıdır; sürü koordinasyonu ve alan işaretleme için kullanılır.',
    hear: 'Doğu Anadolu ve Karadeniz sırtları. Yaklaşmayın; 3 km uzaktan net duyulabilir.',
    season: [1,2,3,10,11,12], rarity: 'Nadir',
    color: '#6b7280',
    facts: ['Sürü halinde uyum içinde ular', 'Ulumanın farklı tınıları farklı anlam taşır', 'İnsan ulumasına bazen yanıt verirler'],
  },
  {
    id: 6, name: 'Sülün', icon: '🐦', category: 'Kuş',
    sound: 'Kısa, kırık "kok-kok" veya uzun kraaak sesi',
    time: 'Şafak ve alacakaranlık', habitat: 'Tarla kenarı ve fundalık',
    description: 'Erkek sülün özellikle çiftleşme sezonunda güçlü ses çıkarır ve ardından kanatlarını çırpar.',
    hear: 'Tarlalar ve çalılık arası. Düz hatlar boyunca yavaş yürüyün.',
    season: [3,4,5], rarity: 'Orta',
    color: '#ef4444',
    facts: ['Çiftleşme sezonunda her sabah öter', 'Kanat çırpma sesi ile birleşir', 'Gruplarda bulunur'],
  },
  {
    id: 7, name: 'Keklik', icon: '🐦', category: 'Kuş',
    sound: '"Cher-cher-cher" tekrarlayan kesik ses',
    time: 'Sabah erken ve akşam', habitat: 'Kayalık yamaç ve fundalık',
    description: 'Kınalı kekliğin karakteristik sesi uzaktan net duyulur. Ses genellikle yüksek tepeden gelir.',
    hear: 'Kayalık ve fundalık yamaçlarda. Ses kaynağından tepelere bakın.',
    season: [3,4,5,6,7,8,9], rarity: 'Orta',
    color: '#f97316',
    facts: ['Erkekler daha yüksek perdede öter', 'Tehlike algıladığında sessizleşir', 'Koşarak kaçmayı tercih eder'],
  },
  {
    id: 8, name: 'Bülbül', icon: '🐦', category: 'Kuş',
    sound: 'Karmaşık, yüksek tonlu ve sürekli değişen melodik ses',
    time: 'Gece ve sabah (Mayıs-Haziran)',  habitat: 'Sık çalılık ve bahçe',
    description: 'Türkiye\'nin sevilen gece ötücüsü. Uzun süreli, değişken ve melodili ötüşü eşsizdir.',
    hear: 'Sulak alanlara yakın sık çalılıklar. Gece yarısı en güçlü ötüşü yapar.',
    season: [5,6,7], rarity: 'Orta',
    color: '#f59e0b',
    facts: ['Gece ötüşü çiftleşme çağrısıdır', 'Her bireyin kendine özgü melodisi var', 'Güney Asya\'ya göç eder'],
  },
  {
    id: 9, name: 'Yarasa', icon: '🦇', category: 'Memeli',
    sound: 'Yüksek frekanslı "tik tik" veya çığlık (ultrasonik)',
    time: 'Alacakaranlık ve gece', habitat: 'Orman kenarı, mağara yakını',
    description: 'Yarasaların ekolokasyon sesleri çoğunlukla ultrasonik — insan kulağıyla duyulamaz; bazı cinsler ise duyulabilir çığlık atar.',
    hear: 'Akşam loşluğunda ağaç altlarında. Sert çığlıklar duyarsanız yukarıya bakın.',
    season: [4,5,6,7,8,9,10], rarity: 'Yaygın',
    color: '#7c3aed',
    facts: ['Ekolokasyon sesi 20-200 kHz arasında', 'Bazı türler 1000+ çığlık/sn çıkarır', 'Bat detector ile kaydedilebilir'],
  },
  {
    id: 10, name: 'Cırcır Böceği', icon: '🦗', category: 'Böcek',
    sound: '"Vızır vızır" yüksek frekanslı kesintisiz ses',
    time: 'Sıcak öğleden sonra', habitat: 'Ağaçlık ve çalılık alan',
    description: 'Cırcır böceklerinin sesi Akdeniz ve Ege yazının simgesidir. Kanat kaslarının titreşimiyle oluşur.',
    hear: 'Zeytinlikler, meşelikler, kızılçam ormanları. Ses şiddetli olduğu halde böceği bulmak zordur.',
    season: [6,7,8,9], rarity: 'Yaygın',
    color: '#22c55e',
    facts: ['Ağaç gövdelerine tutunarak ötüşür', 'Sıcaklık 20°C altına düşünce susar', 'Sadece erkekler ötüşür'],
  },
];

const CATEGORIES = ['Tümü', 'Kuş', 'Memeli', 'Sürüngen', 'Böcek'];
const RARITIES   = ['Tümü', 'Yaygın', 'Orta', 'Nadir'];
const MONTHS_TR  = ['Oc', 'Şb', 'Mr', 'Ns', 'My', 'Hz', 'Tm', 'Ağ', 'Ey', 'Ek', 'Ks', 'Ar'];

function SoundDetail({ sound, onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1f2937', borderRadius: '20px 20px 0 0', padding: '24px 20px 36px', width: '100%', maxHeight: '85vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 40 }}>{sound.icon}</span>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#f9fafb' }}>{sound.name}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <span style={{ background: sound.color + '33', color: sound.color, borderRadius: 8, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>{sound.category}</span>
              <span style={{ background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '2px 10px', fontSize: 11 }}>{sound.rarity}</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>🔊 SES ÖZELLİĞİ</div>
          <div style={{ fontSize: 15, color: '#f9fafb', fontWeight: 600 }}>"{sound.sound}"</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <div style={{ background: '#111827', borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>ZAMAN</div>
            <div style={{ color: '#f9fafb', fontSize: 13 }}>{sound.time}</div>
          </div>
          <div style={{ background: '#111827', borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>HABİTAT</div>
            <div style={{ color: '#f9fafb', fontSize: 13 }}>{sound.habitat}</div>
          </div>
        </div>

        <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{sound.description}</p>

        <div style={{ background: '#064e3b', border: '1px solid #059669', borderRadius: 12, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#6ee7b7', fontWeight: 600, marginBottom: 6 }}>👂 NASIL DUYARSUNIZ</div>
          <p style={{ color: '#d1fae5', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{sound.hear}</p>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>AKTİF AYLAR</div>
          <div style={{ display: 'flex', gap: 3 }}>
            {MONTHS_TR.map((m, i) => (
              <div key={i} style={{
                flex: 1, height: 24, borderRadius: 4,
                background: sound.season.includes(i + 1) ? sound.color : '#374151',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 7, color: sound.season.includes(i + 1) ? '#fff' : '#6b7280', fontWeight: 600,
              }}>{m}</div>
            ))}
          </div>
        </div>

        {sound.facts.length > 0 && (
          <div>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>İLGİNÇ BİLGİLER</div>
            {sound.facts.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span style={{ color: sound.color }}>★</span>
                <span style={{ color: '#d1d5db', fontSize: 13 }}>{f}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function NatureSounds() {
  const navigate = useNavigate();
  const [cat, setCat]         = useState('Tümü');
  const [rarity, setRarity]   = useState('Tümü');
  const [search, setSearch]   = useState('');
  const [selected, setSelected] = useState(null);

  const visible = SOUNDS.filter(s => {
    if (cat !== 'Tümü' && s.category !== cat) return false;
    if (rarity !== 'Tümü' && s.rarity !== rarity) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const RARITY_COLOR = { Yaygın: '#22c55e', Orta: '#f59e0b', Nadir: '#ef4444' };
  const currentMonth = new Date().getMonth() + 1;
  const activeNow    = visible.filter(s => s.season.includes(currentMonth));

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 80 }}>
      <div style={{ padding: '20px 16px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔊 Doğa Sesleri Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>10 tür · ses tanıma ve gözlem ipuçları</div>
      </div>

      {activeNow.length > 0 && (
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 14, padding: 12 }}>
            <div style={{ fontSize: 12, color: '#fbbf24', fontWeight: 600, marginBottom: 8 }}>🎵 Şu An Duyulabilir</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {activeNow.map(s => (
                <span key={s.id} onClick={() => setSelected(s)} style={{
                  background: s.color + '22', color: s.color, borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}>{s.icon} {s.name}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '0 16px 12px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Tür ara..."
          style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', borderRadius: 12, padding: '10px 14px', color: '#f9fafb', fontSize: 14, boxSizing: 'border-box', marginBottom: 10 }} />
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 8 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              background: cat === c ? '#a855f7' : '#1f2937', color: cat === c ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: cat === c ? '#a855f7' : '#374151',
              borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer',
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {RARITIES.map(r => (
            <button key={r} onClick={() => setRarity(r)} style={{
              background: rarity === r ? (RARITY_COLOR[r] || '#374151') : '#1f2937',
              color: rarity === r ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: rarity === r ? (RARITY_COLOR[r] || '#6b7280') : '#374151',
              borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
            }}>{r}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{visible.length} tür</div>
        {visible.map(s => (
          <div key={s.id} onClick={() => setSelected(s)} style={{
            background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
            border: '1px solid #374151', cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 32 }}>{s.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{s.name}</div>
                  <span style={{ background: (RARITY_COLOR[s.rarity] || '#6b7280') + '33', color: RARITY_COLOR[s.rarity] || '#6b7280', borderRadius: 8, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>{s.rarity}</span>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>🕐 {s.time}</div>
                <div style={{ background: '#111827', borderRadius: 8, padding: '6px 10px', marginTop: 8, fontSize: 12, color: s.color, fontStyle: 'italic' }}>
                  🔊 "{s.sound}"
                </div>
                {s.season.includes(currentMonth) && (
                  <span style={{ display: 'inline-block', background: '#064e3b', color: '#6ee7b7', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700, marginTop: 6 }}>🎵 Şu an aktif</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && <SoundDetail sound={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
