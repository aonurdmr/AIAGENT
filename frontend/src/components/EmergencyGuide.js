import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EMERGENCY_NUMBERS = [
  { name: 'Acil Çağrı Merkezi', number: '112', icon: '🚨', desc: 'Polis, itfaiye, ambulans', color: '#ef4444' },
  { name: 'Orman Yangını', number: '177', icon: '🔥', desc: 'Orman Genel Müdürlüğü', color: '#f97316' },
  { name: 'Jandarma', number: '156', icon: '👮', desc: 'Kırsal alan güvenliği', color: '#3b82f6' },
  { name: 'Sahil Güvenlik', number: '158', icon: '⚓', desc: 'Deniz, göl, nehir acil', color: '#06b6d4' },
  { name: 'Arama Kurtarma', number: '122', icon: '🏔️', desc: 'AFAD — dağ ve afet', color: '#a855f7' },
  { name: 'Zehir Danışma', number: '114', icon: '☠️', desc: 'Bitkisel ve kimyasal zehirlenme', color: '#84cc16' },
];

const FIRST_AID = [
  {
    id: 1, title: 'Yılan Isırması', icon: '🐍', severity: 'Yüksek',
    steps: [
      'Sakin olun, hareket etmeyin — kalp atışı hızlandığında zehir yayılır',
      'Isırığı sabun ve suyla yıkayın',
      'Isırılan uzvu kalp seviyesinin ALTINDA tutun',
      'Sıkı yüzük, bilezik veya giysiler varsa çıkarın (şişme bekleyin)',
      'Yılana dokunmayın, yakalamaya çalışmayın',
      '112\'yi arayın veya en yakın sağlık kuruluşuna gidin',
      'Kesme, emme, turnike YAPMAYIN — bu yöntemler zararlıdır',
    ],
    doNot: ['Kesi yapmak', 'Zehiri emmek', 'Turnike uygulamak', 'İlaç vermek'],
    color: '#ef4444',
  },
  {
    id: 2, title: 'Hipotermi (Donma Başlangıcı)', icon: '🥶', severity: 'Yüksek',
    steps: [
      'Kişiyi rüzgar ve soğuktan uzak, korunaklı bir yere taşıyın',
      'Islak kıyafetleri çıkarın, kuru giysilerle sarın',
      'Battaniye veya acil termal folyo kullanın',
      'Koltuk altı, kasık, boyun bölgelerini ısıtmaya öncelik verin',
      'Sıcak (çok sıcak değil) içecek verin (şuuru yerindeyse)',
      '112\'yi arayın — yüksek risk altında hospitalizasyon gerekir',
    ],
    doNot: ['Alkolü ısınma aracı olarak kullanmak', 'Aşırı sıcak su uygulamak', 'Donmuş uzuvları ovmak'],
    color: '#06b6d4',
  },
  {
    id: 3, title: 'Güneş Çarpması', icon: '☀️', severity: 'Orta',
    steps: [
      'Kişiyi gölge veya serin bir yere taşıyın',
      'Giysilerini gevşetin veya çıkarın',
      'Boyun, koltuk altı, kasıklara ıslak bez uygulayın',
      'Bol soğuk su içirin (şuuru yerindeyse)',
      'Ayakları hafif kaldırın (şok pozisyonu)',
      'Bilinç kaybı varsa derhal 112\'yi arayın',
    ],
    doNot: ['Tek seferde çok soğuk su içirmek', 'Yalnız bırakmak'],
    color: '#f59e0b',
  },
  {
    id: 4, title: 'Arı/Böcek Sokması (Alerjik)', icon: '🐝', severity: 'Orta',
    steps: [
      'İğneyi kredi kartı kenarıyla sıyırarak çıkarın (sıkmayın)',
      'Sabun ve suyla yıkayın',
      'Soğuk kompres uygulayın (15-20 dk)',
      'Antihistaminik ilaç varsa verin',
      'Nefes darlığı, yüz şişmesi, bilinç bulanıklığı → 112 arayın (anafilaksi riski)',
      'EpiPen (adrenalin kalemi) varsa uygulayın',
    ],
    doNot: ['İğneyi penseyle çıkarmak (zehir kesesini sıkar)', 'Alerjisi varsa beklemek'],
    color: '#f59e0b',
  },
  {
    id: 5, title: 'Boğulma Tehlikesi', icon: '🌊', severity: 'Yüksek',
    steps: [
      '158 veya 112\'yi hemen arayın',
      'Mümkünse suya girmeden yardım edin: ip, can simidi, uzun dal uzatın',
      'Kişiyi karaya veya güvenliye çıkarın',
      'Tepkisiz ve nefes almıyorsa CPR başlatın',
      'CPR: 30 baskı + 2 kurtarma nefesi (eğitimli iseniz)',
      'Boyun yaralanması şüphesi varsa başı hareket ettirmeyin',
    ],
    doNot: ['Yüzme bilmeden suya atlamak', 'Kişiyi hızla ayağa kaldırmak'],
    color: '#3b82f6',
  },
  {
    id: 6, title: 'Kaybolma / Yön Kaybı', icon: '🧭', severity: 'Orta',
    steps: [
      'DUR — Paniğe kapılmayın. Oturun ve düşünün.',
      'Telefon şarjı yeterli ise 112\'yi arayın ve konumunuzu bildirin',
      'Yüksek bir yere çıkarak çevreyi inceleyin',
      'İz bırakın (taş yığını, kıyafet parçası)',
      'Su akışlarını takip edin — genellikle yerleşim yerlerine götürür',
      'Gecelemeyi planlamak zorundaysanız erken barınak kurun',
      'Islanmamak ve hipotermi önlemek en önceliktir',
    ],
    doNot: ['Koşmak', 'Aynı rotada döngüye girmek', 'Telefon pilini gereksiz tüketmek'],
    color: '#a855f7',
  },
  {
    id: 7, title: 'Kırık / Burkulma', icon: '🦴', severity: 'Orta',
    steps: [
      'Yaralı uzvu hareket ettirmeyin',
      'Atel yapın: tahta, dal gibi sert bir cisimle destekleyin',
      'Bez veya bandaj ile sabitleyin (sıkı olmayacak şekilde)',
      'Şişmeyi azaltmak için soğuk kompres uygulayın',
      'Bacak kırığında kişiyi taşımaya çalışmayın',
      '112\'yi arayın veya yardım isteyin',
    ],
    doNot: ['Kemiği yerine oturtmaya çalışmak', 'Ağır bir kırıkta yürümeye zorlamak'],
    color: '#f97316',
  },
  {
    id: 8, title: 'Mantar Zehirlenmesi', icon: '🍄', severity: 'Yüksek',
    steps: [
      'Hemen 114 Zehir Danışma\'yı veya 112\'yi arayın',
      'Tüketilen mantarın fotoğrafını/örneğini saklayın',
      'Bulantı, kusma, karın ağrısı, sarılık belirtilere dikkat edin',
      'Semptomlar 6-24 saat sonra başlayabilir — gecikmeli zehirleme mümkün',
      'Kusturmaya çalışmayın (doktor önermedikçe)',
      'Aktif kömür verilmişse bile mutlaka hastaneye gidin',
    ],
    doNot: ['Kusturmak (doktor söylemedikçe)', 'Beklemeye karar vermek'],
    color: '#ef4444',
  },
];

const SOS_METHODS = [
  { title: 'Üç Kez Sinyal', icon: '🔴', desc: 'Uluslararası yardım sinyali: 3 ses (ıslık/silah), 3 ışık (el feneri), 3 görsel (duman). 1 dakika bekle, tekrarla.' },
  { title: 'Ayna Yansıması', icon: '🔆', desc: 'Güneş ışığını yansıtarak uçakları veya uzak kişileri sinyalleyebilirsiniz. 15-30 km görünür olabilir.' },
  { title: 'Duman Sinyali', icon: '🌫️', desc: 'Gündüz: koyu duman (plastik, lastik). Gece: açık duman (yeşil dal, ıslak ot). Üç kez ateş yak, söndür, yak.' },
  { title: 'GPS ve PLB', icon: '📡', desc: 'Kişisel Konum İşaretleyici (PLB) aktive edin. 406 MHz frekansında uydu üzerinden kurtarma koordinasyonu sağlar.' },
  { title: 'Yere SOS Yazısı', icon: '✍️', desc: 'Açık alanda 10 metre büyüklüğünde SOS veya X sembolü oluşturun. Taş, kıyafet, kırık dal kullanın.' },
];

const SURVIVAL_TIPS = [
  { icon: '💧', title: 'Su Teminî', tip: 'Akan suyu tercih edin, filtreleme yoksa kaynatın (1 dk). Bitki yapraklarındaki çiyi toplayın. Çiy sabah 4-8 arası en bol.' },
  { icon: '🔥', title: 'Ateş Yakmak', tip: 'Çakmak / kibrit her zaman yanınızda bulundurun. Islak ortamda: kabuk altındaki kuru odunu kullanın. Tinder: ince odun talaşı, kuru ot.' },
  { icon: '🏕️', title: 'Barınak Kurma', tip: 'Rüzgara sırtınız dönük, eğimli zeminden kaçının. Sığınak: iki ağaç arasına ip, üstüne yaprak ve dal. 30° eğim yağmurda işe yarar.' },
  { icon: '🧭', title: 'Yön Bulmak', tip: 'Güneş doğuda doğar, batıda batar. Gece Kuzey Yıldızı\'nı bulun (Büyük Ayı\'nın ucundan 5x). Yosun genellikle ağacın kuzey tarafında biter.' },
  { icon: '🍴', title: 'Yiyecek Teminî', tip: 'Tanımadığınız bitkiyi yemeyin. Güvenli: böğürtlen, kuşburnu, meşe palamudu (haşlayın). Böcekler: larva, solucan — pişirin.' },
  { icon: '📱', title: 'Telefon Tasarrufu', tip: 'Uçak moduna alıp GPS\'i kapatın (pil tasarrufu). Gerektiğinde konumunuzu 112\'ye mesaj olarak gönderin. SMS genellikle aramadan daha az enerji kullanır.' },
];

export default function EmergencyGuide() {
  const navigate = useNavigate();
  const [tab, setTab]         = useState('firstaid');
  const [expanded, setExpanded] = useState(null);

  const TABS = [
    { id: 'firstaid', label: '🩺 İlk Yardım' },
    { id: 'sos',      label: '📡 SOS Sinyali' },
    { id: 'survival', label: '🏕️ Hayatta Kalma' },
    { id: 'numbers',  label: '📞 Acil Hatlar' },
  ];

  const SEV_COLOR = { Yüksek: '#ef4444', Orta: '#f59e0b', Düşük: '#22c55e' };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 80 }}>
      <div style={{ padding: '20px 16px 16px', background: '#1f2937', borderBottom: '1px solid #374151' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🚨 Acil Durum Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Doğada hayatta kalma ve ilk yardım</div>
        <div style={{
          background: '#7f1d1d', border: '1px solid #ef4444', borderRadius: 10,
          padding: '8px 12px', marginTop: 12, fontSize: 12, color: '#fca5a5',
        }}>
          ⚠️ Bu bilgiler rehber niteliğindedir. Ciddi durumlarda hemen 112'yi arayın.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: tab === t.id ? '#ef4444' : '#1f2937',
            color: tab === t.id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === t.id ? '#ef4444' : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600,
            whiteSpace: 'nowrap', cursor: 'pointer',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>

        {tab === 'numbers' && (
          <div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 12, fontWeight: 600 }}>HIZLI ARAMA LİSTESİ</div>
            {EMERGENCY_NUMBERS.map((n, i) => (
              <a key={i} href={`tel:${n.number}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#1f2937', border: `1px solid ${n.color}44`,
                  borderRadius: 14, padding: 16, marginBottom: 10,
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: n.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, flexShrink: 0,
                  }}>{n.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{n.name}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{n.desc}</div>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: n.color }}>{n.number}</div>
                </div>
              </a>
            ))}
          </div>
        )}

        {tab === 'firstaid' && (
          <div>
            {FIRST_AID.map(item => (
              <div key={item.id} style={{ background: '#1f2937', borderRadius: 14, marginBottom: 12, overflow: 'hidden', border: '1px solid #374151' }}>
                <div
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
                >
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{item.title}</div>
                    <span style={{
                      background: (SEV_COLOR[item.severity] || '#6b7280') + '33',
                      color: SEV_COLOR[item.severity] || '#6b7280',
                      borderRadius: 10, padding: '2px 8px', fontSize: 11, fontWeight: 700,
                    }}>{item.severity} Risk</span>
                  </div>
                  <span style={{ color: '#6b7280', fontSize: 18 }}>{expanded === item.id ? '▲' : '▼'}</span>
                </div>
                {expanded === item.id && (
                  <div style={{ borderTop: '1px solid #374151', padding: '14px 16px' }}>
                    <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 700, marginBottom: 8 }}>ADIMLAR</div>
                    {item.steps.map((step, si) => (
                      <div key={si} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                        <span style={{
                          background: item.color, color: '#fff', borderRadius: '50%',
                          width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                        }}>{si + 1}</span>
                        <span style={{ color: '#d1d5db', fontSize: 13, lineHeight: 1.5 }}>{step}</span>
                      </div>
                    ))}
                    <div style={{
                      background: '#7f1d1d', border: '1px solid #ef444488',
                      borderRadius: 10, padding: 12, marginTop: 12,
                    }}>
                      <div style={{ fontSize: 12, color: '#fca5a5', fontWeight: 700, marginBottom: 6 }}>🚫 YAPMA</div>
                      {item.doNot.map((d, di) => (
                        <div key={di} style={{ color: '#fca5a5', fontSize: 13, marginBottom: 3 }}>• {d}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'sos' && (
          <div>
            <div style={{
              background: '#1c1917', border: '1px solid #f97316',
              borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 13, color: '#fed7aa',
            }}>
              💡 Uluslararası yardım sinyali: <strong>3×3×3</strong> — 3 ses, 3 ışık, 3 görsel sinyal. 1 dakika bekle, tekrarla.
            </div>
            {SOS_METHODS.map((m, i) => (
              <div key={i} style={{
                background: '#1f2937', border: '1px solid #374151',
                borderRadius: 14, padding: 16, marginBottom: 10,
                display: 'flex', gap: 14, alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 32, flexShrink: 0 }}>{m.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb', marginBottom: 6 }}>{m.title}</div>
                  <p style={{ color: '#9ca3af', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'survival' && (
          <div>
            {SURVIVAL_TIPS.map((tip, i) => (
              <div key={i} style={{
                background: '#1f2937', border: '1px solid #374151',
                borderRadius: 14, padding: 16, marginBottom: 10,
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 28 }}>{tip.icon}</span>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{tip.title}</div>
                </div>
                <p style={{ color: '#9ca3af', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{tip.tip}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
