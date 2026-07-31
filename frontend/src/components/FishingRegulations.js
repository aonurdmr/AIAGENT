import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const REGIONS = [
  {
    id: 'marmara', name: 'Marmara', icon: '🌊', accent: '#3b82f6',
    provinces: ['İstanbul', 'Bursa', 'Tekirdağ', 'Kocaeli', 'Yalova'],
    rules: [
      { label: 'Ağ Yasağı Mesafesi', val: '3 deniz milinden kıyıya kadar trol yasak' },
      { label: 'Levrek Min. Boy', val: '25 cm (deniz), 20 cm (iç su)' },
      { label: 'Çipura Min. Boy', val: '20 cm' },
      { label: 'Palamut', val: 'Min. 18 cm; sezon dışı olta ile serbest' },
      { label: 'Hamsi Sezonu', val: 'Kasım – Şubat (Marmara)' },
      { label: 'Çipura Koruma', val: 'Nisan–Haziran döneminde kısıtlı av' },
    ],
    permits: [
      { name: 'Sporcu Av Ruhsatı', cost: '250 TL/yıl', from: 'e-Devlet / DKMP' },
      { name: 'Su Ürünleri Avcılığı Belgesi', cost: 'Ücretsiz (kayıt)', from: 'İl Tarım Müd.' },
    ],
    restricted: ['Bosphorus Boğazı iç hattı', 'Şile balık üretim sahası', 'İzmit Körfezi iç kesimleri'],
    tip: 'Marmara\'da levrek avcılığı için gece tekne balıkçılığı çok verimlidir. Boğaz geçiş kurallarına dikkat edin.',
  },
  {
    id: 'ege', name: 'Ege', icon: '🏖️', accent: '#06b6d4',
    provinces: ['İzmir', 'Muğla', 'Aydın', 'Çanakkale', 'Balıkesir'],
    rules: [
      { label: 'Lahoz (Orfoz) Koruma', val: 'Tüm yıl kesinlikle yasak, serbest bırakılacak' },
      { label: 'Kefal Min. Boy', val: '18 cm (deniz); 20 cm (lagün)' },
      { label: 'Çipura-Levrek', val: 'Her ikisi min. 20 cm' },
      { label: 'Dip Balıkçılığı', val: 'Dalış hasatı çevresinde 100m olta yasak' },
      { label: 'Çekme Ağı', val: '300m\'den derin sular dışında yasak' },
      { label: 'Barbun', val: 'Min. 11 cm, yıl boyunca avlanabilir' },
    ],
    permits: [
      { name: 'Sporcu Av Ruhsatı', cost: '250 TL/yıl', from: 'e-Devlet' },
      { name: 'Dalgıç Avcılık İzni', cost: '150 TL/yıl', from: 'İl Müdürlüğü' },
    ],
    restricted: ['Dilek Yarımadası tamponu (3 mil)', 'Foça özel koruma alanı', 'Ayvalık milli park tamponu'],
    tip: 'Ege\'de çipura sezonu bahar ve sonbahar; kayalık dipte sahte karides yemi çok etkili.',
  },
  {
    id: 'akdeniz', name: 'Akdeniz', icon: '☀️', accent: '#f59e0b',
    provinces: ['Antalya', 'Mersin', 'Adana', 'Hatay', 'Muğla kıyısı'],
    rules: [
      { label: 'Ton Balığı', val: 'Ticari kota sistemine tabi; sporcu avcılığı sınırı 1 adet' },
      { label: 'Kılıçbalığı', val: 'Min. 100 cm (çatal boyu)' },
      { label: 'Pisi Balığı', val: 'Min. 20 cm' },
      { label: 'Posidonia Çayırlıkları', val: 'Ağ ve dip dokunma yasak' },
      { label: 'Trol Derinlik', val: 'Min. 50 m; yasak zonlar güncelleniyor' },
      { label: 'Türlü (Lahoz)', val: 'Sıfır kota — tümüyle yasak' },
    ],
    permits: [
      { name: 'Sporcu Av Ruhsatı', cost: '250 TL/yıl', from: 'e-Devlet' },
      { name: 'Açık Deniz İzni (50m+)', cost: 'Ruhsat yeterli', from: 'Kıyı Emniyeti' },
    ],
    restricted: ['Olimpos-Beydağları tamponu', 'Anamur kenar suları', 'İskenderun körfezi iç hattı'],
    tip: 'Akdeniz\'de büyük balıklar için yüzey tekniği (trolling) çok verimli; erken sabah özellikle etkili.',
  },
  {
    id: 'karadeniz', name: 'Karadeniz', icon: '⚓', accent: '#22c55e',
    provinces: ['Trabzon', 'Samsun', 'Ordu', 'Giresun', 'Rize', 'Sinop', 'Zonguldak'],
    rules: [
      { label: 'Hamsi Sezonu', val: 'Kasım – Şubat; günlük limit 5 kg sporcu' },
      { label: 'İstavrit', val: 'Yıl boyu, min. 13 cm' },
      { label: 'Kalkan', val: 'Min. 35 cm; Nisan–Haziran yasaklı' },
      { label: 'Turna Balığı (Zargana)', val: 'Min. 25 cm, Karadeniz özgü' },
      { label: 'Yunus Dokunma', val: 'Mutlak yasaklı; 5000 TL ceza' },
      { label: 'Sahil Band 200m', val: 'Gırgır ağı kesinlikle yasak' },
    ],
    permits: [
      { name: 'Sporcu Av Ruhsatı', cost: '250 TL/yıl', from: 'e-Devlet' },
      { name: 'Tekne Kayıt', cost: 'Tekne tonajına göre', from: 'Liman Başkanlığı' },
    ],
    restricted: ['Kızılırmak deltası 2 mil', 'Yeşilırmak ağzı', 'Rize kıyı koruma'],
    tip: 'Hamsi sezonu Karadeniz\'in en büyük etkinliği. Gece lambası yakarak yüzey avcılığı.',
  },
  {
    id: 'ic_sular', name: 'İç Sular', icon: '🏞️', accent: '#a855f7',
    provinces: ['Tüm iller — baraj ve göller'],
    rules: [
      { label: 'Sazan Min. Boy', val: '25 cm (genel); 30 cm (belirli barajlar)' },
      { label: 'Alabalık', val: 'Min. 18 cm; bazı havzalarda sıfır kota' },
      { label: 'Turna', val: 'Min. 35 cm; Mart–Mayıs yasak' },
      { label: 'Yayın', val: 'Min. 50 cm; özel izin gerektiren sular var' },
      { label: 'Elektroşok', val: 'Mutlak yasak; 2 yıla kadar hapis' },
      { label: 'Zehirli Madde', val: 'Mutlak yasak; ağır ceza' },
    ],
    permits: [
      { name: 'İç Su Sporcu Ruhsatı', cost: '150 TL/yıl', from: 'e-Devlet / DSİ' },
      { name: 'Özel Su Alanı İzni', cost: 'Değişken', from: 'İşletmeci firma' },
    ],
    restricted: ['Keban barajı belirli koylar', 'Atatürk barajı koruma hattı', 'DSİ koruma bantları (100m)'],
    tip: 'Baraj avlanma izni için DSİ bölge müdürlüğünden harita sınırlarını mutlaka öğrenin.',
  },
];

const FINE_ITEMS = [
  { violation: 'Boy limiti altında av', fine: '500 – 2000 TL' },
  { violation: 'İzinsiz avlanma', fine: '1000 – 5000 TL' },
  { violation: 'Yasak bölgede avlanma', fine: '2000 – 10000 TL' },
  { violation: 'Yasak yöntem (elektroşok)', fine: '10000 TL + 2 yıl hapis' },
  { violation: 'Yasak tür avlama (Lahoz/Orfoz)', fine: '5000 – 50000 TL' },
  { violation: 'Ruhsatsız tekne ile av', fine: '2000 – 8000 TL' },
  { violation: 'Yasak sezon ihlali', fine: '1500 – 6000 TL' },
];

export default function FishingRegulations() {
  const navigate = useNavigate();
  const [regionId, setRegionId] = useState('marmara');
  const [tab, setTab] = useState('rules');

  const region = REGIONS.find(r => r.id === regionId);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⚖️ Balıkçılık Mevzuatı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Bölgesel kurallar, boy limitleri ve ruhsat bilgileri</div>
      </div>

      {/* Region selector */}
      <div style={{ padding: '0 16px 10px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {REGIONS.map(r => (
          <button key={r.id} onClick={() => setRegionId(r.id)} style={{
            background: regionId === r.id ? r.accent : '#1f2937', color: regionId === r.id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: regionId === r.id ? r.accent : '#374151',
            borderRadius: 20, padding: '7px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{r.icon} {r.name}</button>
        ))}
      </div>

      {/* Province chips */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {region?.provinces.map((p, i) => (
          <span key={i} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 20, padding: '3px 10px', fontSize: 10, color: '#9ca3af' }}>{p}</span>
        ))}
      </div>

      {/* Sub-tabs */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['rules', '📋 Kurallar'], ['permits', '📄 Ruhsat'], ['fines', '💰 Cezalar']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? region?.accent : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? region?.accent : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 600, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'rules' && region && (
          <div>
            {region.rules.map((rule, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 3 }}>{rule.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#f9fafb' }}>{rule.val}</div>
                </div>
              </div>
            ))}

            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #ef444433', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 600, marginBottom: 8 }}>🚫 KISITLI BÖLGELER</div>
              {region.restricted.map((r, i) => (
                <div key={i} style={{ fontSize: 12, color: '#fca5a5', marginBottom: 4 }}>• {r}</div>
              ))}
            </div>

            <div style={{ background: region.accent + '15', borderRadius: 12, padding: '12px 14px', border: `1px solid ${region.accent}33` }}>
              <div style={{ fontSize: 11, color: region.accent, fontWeight: 600, marginBottom: 4 }}>💡 BÖLGE İPUCU</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{region.tip}</div>
            </div>
          </div>
        )}

        {tab === 'permits' && region && (
          <div>
            {region.permits.map((p, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10, border: '1px solid #374151' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb', marginBottom: 8 }}>📄 {p.name}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, background: '#374151', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 9, color: '#6b7280', marginBottom: 3 }}>ÜCRET</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#22c55e' }}>{p.cost}</div>
                  </div>
                  <div style={{ flex: 1, background: '#374151', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 9, color: '#6b7280', marginBottom: 3 }}>NEREDEN</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb' }}>{p.from}</div>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ background: '#0c1f3f', borderRadius: 14, padding: 14, border: '1px solid #1e40af44' }}>
              <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 8 }}>📱 E-DEVLET ÜZERİNDEN BAŞVURU</div>
              <div style={{ fontSize: 12, color: '#bfdbfe', lineHeight: 1.7 }}>
                1. e-Devlet (turkiye.gov.tr) giriş yapın{'\n'}
                2. "Su Ürünleri Avcılık Belgesi" veya "Sporcu Av Ruhsatı" arayın{'\n'}
                3. Türkiye Cumhuriyeti kimlik numaranızı girin{'\n'}
                4. Ödeme yapın ve belgeyi yazdırın
              </div>
            </div>
          </div>
        )}

        {tab === 'fines' && (
          <div>
            <div style={{ background: '#450a0a', borderRadius: 12, padding: '10px 14px', marginBottom: 12, border: '1px solid #ef444433' }}>
              <div style={{ fontSize: 11, color: '#fca5a5', fontWeight: 600 }}>⚠️ BİLGİ: Cezalar 2024 yılı rakamlarına göredir; yıllık yeniden değerleme ile artabilir.</div>
            </div>
            {FINE_ITEMS.map((f, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: '#d1d5db', flex: 1 }}>{f.violation}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', flexShrink: 0, marginLeft: 10, textAlign: 'right' }}>{f.fine}</div>
              </div>
            ))}
            <div style={{ fontSize: 11, color: '#6b7280', textAlign: 'center', marginTop: 8 }}>
              Kaynak: 1380 sayılı Su Ürünleri Kanunu ve yönetmelikleri
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
