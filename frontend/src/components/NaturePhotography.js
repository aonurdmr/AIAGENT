import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CHAPTERS = [
  {
    id: 'ekipman', label: 'Ekipman', icon: '📷',
    topics: [
      {
        title: 'Hangi Kamera?', icon: '📸',
        body: 'Başlangıç için aynasız bir APS-C gövde (Sony A6xxx, Fuji X serileri) idealdir. Tam kare sensör daha iyi düşük ışık performansı verir ama ağırdır. Telefon kamerası bile makro ve manzara için yeterlidir; en iyi kamera yanınızdakidir.',
        tip: 'Balıkçılık sırasında su geçirmez bir kılıf veya telefon tutucu mutlaka kullanın.',
      },
      {
        title: 'Objektif Seçimi', icon: '🔭',
        body: '70-300mm zoom tele, yaban hayatı için standart seçimdir. 100-400mm daha az yaklaşmanızı sağlar, hayvanları ürkütmez. Böcek ve makro için 90–105mm makro objektif. 16-35mm geniş açı manzara ve kamp fotoğrafları için idealdir.',
        tip: 'Balık fotoğrafları için su altı kılıflı geniş açı (14-24mm) deneyin.',
      },
      {
        title: 'Tripod & Stabilizasyon', icon: '🦺',
        body: 'Karbon fiber tripod hafif ve sağlamdır; kamp için en iyi yatırım. Gece ve altın saat çekimlerinde mutlaka gereklidir. Gimbal başlık video için, ball head fotoğraf için tercih edilir.',
        tip: 'Mini tripod veya bean bag köz düşük pozisyon çekimlerinde hayat kurtarır.',
      },
    ],
  },
  {
    id: 'teknik', label: 'Teknik', icon: '⚙️',
    topics: [
      {
        title: 'Exposure Üçgeni', icon: '🔺',
        body: 'ISO, diyafram (f-sayısı) ve enstantane hız birlikte çalışır. Hızlı hareket için 1/1000s+. Düşük ışıkta ISO\'yu artırın (modern kameralar ISO 3200\'e kadar kabul edilebilir). f/5.6–f/8 keskin çerçeve için optimum aralıktır.',
        tip: 'Balık tutarken "Aperture Priority" (Av/A) modunda f/8 ve otomatik ISO kullanın; çabuk çekime hazır olun.',
      },
      {
        title: 'Fokus Teknikleri', icon: '🎯',
        body: 'Sürekli AF (AF-C/AI Servo) hareketli hayvanlar için. Tek nokta AF gözü hedeflemek için kullanın. Face/Eye AF modern kameralarda mükemmel. Gölgede odaklanma güçleşirse kontrastlı bir alana kilit yapıp yeniden çerçeveleyebilirsiniz.',
        tip: 'Uçan kuşlar için burst moda (saniyede 10-20 kare) geçin; en keskin kareden en iyisini seçin.',
      },
      {
        title: 'RAW vs JPEG', icon: '💾',
        body: 'RAW format 14-bit bilgi içerir; renk, pozlama ve gürültü düzeltmesi için çok daha geniş alan tanır. JPEG anında hazır ve küçük dosya. Doğa fotoğrafçılığında RAW tercih edin; altın saatteki renk tonları düzenlemede çok avantaj sağlar.',
        tip: 'Lightroom veya Darktable (ücretsiz) ile RAW dosyaları kolayca işleyebilirsiniz.',
      },
    ],
  },
  {
    id: 'kompozisyon', label: 'Kompozisyon', icon: '🖼️',
    topics: [
      {
        title: 'Üçler Kuralı', icon: '📐',
        body: 'Çerçeveyi 9 eşit parçaya bölün (3×3 ızgara). Ufku alt veya üst çizgiye, konuyu kesişim noktalarına yerleştirin. Merkezi kompozisyon simetrik yapılar için iyi çalışır; yansıma fotoğraflarında harika.',
        tip: 'Kameranızda ızgara görünümünü açın — otomatik olarak uygulamayı hatırlatır.',
      },
      {
        title: 'Öncü Çizgiler', icon: '➡️',
        body: 'Yollar, nehirler, dağ sırtları ve tel çitleri gözü konuya doğru çeker. Öncü çizgi köşeden başlayıp ana konuya ulaşan güçlü kompozisyonlar oluşturur. Kamp ve nehir fotoğraflarında çok etkilidir.',
        tip: 'Su kenarında ufka uzanan kayıklar veya balık köprüleri bu teknik için mükemmel.',
      },
      {
        title: 'Işık & Gölge', icon: '🌅',
        body: 'Altın Saat (gün doğumu/batımı ±1 saat) doğal dokuyu ve renkleri yumuşak lateral ışıkla vurgular. Mavi Saat (gün batımından 20-30 dk sonra) dramatik gökyüzü renkleri verir. Öğle güneşinde sert gölgelerden kaçının; bulutlu gün difüze ışık verir.',
        tip: 'Balıkçılık fotoğraflarında güneşi arkanıza alarak konuyu aydınlatın. Gün doğumunda sis büyülü atmosfer yaratır.',
      },
    ],
  },
  {
    id: 'konular', label: 'Konu Türleri', icon: '🦌',
    topics: [
      {
        title: 'Yaban Hayatı', icon: '🦊',
        body: 'Sabah 30 dakika önce gelin, bekleme noktası seçin. Rüzgarı arkanıza alın (koku maskeleme). Yavaş ve sessiz hareket edin. Hayvanın doğal davranışını fotoğraflamak için saatlerce beklemeye hazır olun.',
        tip: 'Geyik fotoğrafı için sonbahar gün doğumu idealdir — hayvanlar aktiftir ve sisli dağ manzaraları muazzamdır.',
      },
      {
        title: 'Balıkçılık Anları', icon: '🎣',
        body: 'Balık tutma anını yakalamak için yüksek enstantane hız (1/500s+) ve burst modu. Balığın sudan çıkma anını, avlanma pozunu ve "release" anını çekin. Geniş açıyla balıkçı ve doğa beraber kompozisyon deneyin.',
        tip: 'Kamerayı su yüzeyine yakın tutun; derinlik ve yansıma hissi yaratır. GoPro veya action kamera suya yakın çekim için idealdir.',
      },
      {
        title: 'Makro & Böcek', icon: '🦋',
        body: 'Sabah çiyiyle örtülü kelebekler hareketsizdir — en iyi makro zamanı. Alçak açı (toprak seviyesi) böceklere perspektif kazandırır. Doğal arka plan bulanıklığı (bokeh) için geniş diyafram (f/2.8-f/4). İstif çekim (focus stacking) keskin derinlik için.',
        tip: 'Arı ve kelebekler için lavanta ve yabani çiçek tarlalarına gidin. Türkiye\'de Mayıs en zengin dönemdir.',
      },
    ],
  },
];

const CAT_COLOR = { ekipman: '#3b82f6', teknik: '#a855f7', kompozisyon: '#f59e0b', konular: '#22c55e' };

export default function NaturePhotography() {
  const navigate = useNavigate();
  const [chapterId, setChapterId] = useState('ekipman');
  const [openTopic, setOpenTopic] = useState(null);
  const chapter = CHAPTERS.find(c => c.id === chapterId);
  const color = CAT_COLOR[chapterId] || '#9ca3af';

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📷 Doğa Fotoğrafçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekipman, teknik, kompozisyon ve doğa konuları rehberi</div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {CHAPTERS.map(c => {
          const cc = CAT_COLOR[c.id] || '#9ca3af';
          return (
            <button key={c.id} onClick={() => { setChapterId(c.id); setOpenTopic(null); }} style={{
              background: chapterId === c.id ? cc : '#1f2937', color: chapterId === c.id ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: chapterId === c.id ? cc : '#374151',
              borderRadius: 20, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
            }}>{c.icon} {c.label}</button>
          );
        })}
      </div>

      <div style={{ padding: '0 16px' }}>
        {chapter?.topics.map((t, i) => (
          <div key={i} style={{ background: '#1f2937', borderRadius: 14, marginBottom: 10, border: `1px solid ${color}33`, overflow: 'hidden' }}>
            <div onClick={() => setOpenTopic(openTopic === i ? null : i)}
              style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>{t.icon}</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{t.title}</div>
              </div>
              <span style={{ color: '#6b7280', fontSize: 16 }}>{openTopic === i ? '▲' : '▼'}</span>
            </div>
            {openTopic === i && (
              <div style={{ padding: '0 16px 16px', borderTop: '1px solid #374151' }}>
                <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.8, marginTop: 12 }}>{t.body}</div>
                <div style={{ marginTop: 14, background: color + '15', borderRadius: 10, padding: '10px 12px', border: `1px solid ${color}33` }}>
                  <div style={{ fontSize: 10, color, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{t.tip}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
