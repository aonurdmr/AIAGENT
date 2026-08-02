import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MONTHS = [
  { m: 'Ocak', events: ['Kış kuşları göç tepe — ördek, kazlar göl ve sulak alanlarda', 'Kar dağ vadilerinde — çığ riski başlar', 'Domuz sürüleri meyşe meşeliklerinde'], fishing: 'Turna ve yayın aktif altında buz', hunting: 'Yaban domuzu sezon açık' },
  { m: 'Şubat', events: ['Karatavuk ötmeye başlar — ilk bahar işareti', 'Leylek Türkiye\'ye geri dönüyor (Trakya)', 'Kardelen çiçek açıyor'], fishing: 'Buz altında turna ve sazan', hunting: 'Yaban domuzu' },
  { m: 'Mart', events: ['Kurbağa şarkısı başlıyor — sulak alanlarda köpük yumurta', 'Bıldırcın ve keklik kuluçkaya başlıyor', 'İlk yabani çiçekler — bülbülü Güney Türkiye\'ye dönüyor'], fishing: 'Levrek ve kefal aktif oldu — en iyi sezon', hunting: 'Kapalı sezon (çoğu tür)' },
  { m: 'Nisan', events: ['Bülbül dönüşü — Nisan sonu başlıyor', 'Flamingolar Sultan Sazlığı\'na geldi', 'Kaplumbağalar güneşlenmeye başladı', 'Mantar sezonu başladı — lezzetli boletus'], fishing: 'Levrek, çipura, sazan aktif', hunting: 'Yaban domuzu (sınırlı)' },
  { m: 'Mayıs', events: ['En zengin kuş çeşitliliği — göç mevsimi', 'Kelebek patlaması — en yoğun ay', 'Yabani lale sezon zirvesi', 'Karaca yavrulama başlıyor — uzak dur'], fishing: 'Çipura, levrek, kalamar (başlangıç)', hunting: 'Kapalı sezon (çoğu tür)' },
  { m: 'Haziran', events: ['Kuşlar yavru besliyor — dikkat et, yuvalara yaklaşma', 'Caretta caretta Akdeniz kumsallarında yumurtalama', 'Dağ yaylaları çiçek içinde', 'Arı kolonileri en yüksek nüfus'], fishing: 'Açık deniz balıkları aktif (palamut)', hunting: 'Kapalı sezon' },
  { m: 'Temmuz', events: ['Karaca av sezonu başlıyor (erkek, ihale)', 'Göç kuşları Türkiye üzerinden geçiyor', 'Dağ otları hasat zamanı — şifalı bitkiler', 'Böcek popülasyonu zirve'], fishing: 'Çipura, levrek güneybatı kıyıları', hunting: 'Karaca (erkek, ihale)' },
  { m: 'Ağustos', events: ['Bıldırcın Trakya\'ya iniyor (göç)', 'Su kuşu göçü başlıyor', 'Mantar sezonu baraj gölü etrafında', 'Sonbahar erken uyarıları — dağlarda sisle dikkat'], fishing: 'Kalamar sezonu başladı — Ege', hunting: 'Bıldırcın sezonu (15 Ağustos)' },
  { m: 'Eylül', events: ['Leylek ve kırlangıçlar güneye göç', 'Bülbül ayrıldı', 'Sonbahar mantar pik', 'Alageyik kavuşum sezonu — geyikler çığlık atıyor'], fishing: 'Palamut sürüleri geldi — ekim zirvesi', hunting: 'Keklik, bıldırcın, su kuşu' },
  { m: 'Ekim', events: ['Sonbahar rengi — Abant, Yedigöller, Artvin', 'Kış kuşları geliyor — turna, ördek, kazlar', 'Göçmen kuşlar Türkiye üzerinden Afrika\'ya geçiyor'], fishing: 'Palamut ve lüfer en aktif ay', hunting: 'Keklik, su kuşu, yaban domuzu' },
  { m: 'Kasım', events: ['Keklik sezonu kapanıyor', 'İlk kar Karadeniz dağlarına yağdı', 'Geyik kavuşumu bitti — sakinleşti', 'Dalyan\'da caretta caretta (son gözlemler)'], fishing: 'Kalamar aktif, lüfer son sezon', hunting: 'Keklik (30 Kasım kadar), yaban domuzu' },
  { m: 'Aralık', events: ['Kış kuşları göl ve sulak alanlarda toplantı noktası', 'Çığ sezonu başlıyor dağlarda', 'Denizkızı ördek dalgalı denizde yelkeniyor', 'Orman sessizliği — karla kaplı'], fishing: 'Kış turna ve yayın avı', hunting: 'Yaban domuzu' },
];

const WILDLIFE_EVENTS = [
  { month: 'Şubat-Mart', event: 'Leyleklerin dönüşü — Trakya\'dan başlar', icon: '🕊️' },
  { month: 'Nisan-Mayıs', event: 'Bülbül şarkısı zirve — İstanbul bahçeleri', icon: '🎵' },
  { month: 'Nisan-Haziran', event: 'Caretta caretta yumurtlama — Dalyan, Belek, Patara', icon: '🐢' },
  { month: 'Nisan-Eylül', event: 'Flamingo Sultan Sazlığı — 50.000+ birey', icon: '🦩' },
  { month: 'Temmuz-Ağustos', event: 'Dağ yaylası çiçeği zirve — Kaçkar', icon: '🌸' },
  { month: 'Eylül-Ekim', event: 'Alageyik kavuşumu — geyik çağrısı', icon: '🦌' },
  { month: 'Ekim-Kasım', event: 'Palamut-lüfer göçü — İstanbul-Boğaz', icon: '🐟' },
  { month: 'Kasım-Şubat', event: 'Kış kuşları — ördek, kaz, turna ', icon: '🦢' },
];

const MONTHS_SHORT = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];

export default function NatureCalendar() {
  const navigate = useNavigate();
  const now = new Date();
  const [selMonth, setSelMonth] = useState(now.getMonth());
  const [tab, setTab] = useState('monthly');

  const monthData = MONTHS[selMonth];

  return (
    <div style={{ background: '#060e08', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍂 Doğa Olayları Takvimi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>12 ay · doğa, balıkçılık & av olayları</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 12 }}>
        {[['monthly','Aylık'],['events','Özel Olaylar']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0d1a0f', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      {tab === 'monthly' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, padding: '0 16px', marginBottom: 16 }}>
            {MONTHS_SHORT.map((m, i) => (
              <button key={i} onClick={() => setSelMonth(i)} style={{
                padding: '6px 4px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12,
                background: selMonth === i ? '#22c55e' : '#0d1a0f', color: selMonth === i ? '#fff' : '#9ca3af',
                fontWeight: selMonth === i ? 700 : 400,
              }}>{m}</button>
            ))}
          </div>
          <div style={{ padding: '0 16px' }}>
            <div style={{ background: '#0d1a0f', borderRadius: 14, padding: 16, border: '1px solid #22c55e33' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#22c55e', marginBottom: 12 }}>{monthData.m}</div>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>🌿 Doğa Olayları</div>
              {monthData.events.map((e, i) => (
                <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 6, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#22c55e', flexShrink: 0 }}>•</span> {e}
                </div>
              ))}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1a3020' }}>
                <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 600, marginBottom: 4 }}>🐟 Balıkçılık</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{monthData.fishing}</div>
              </div>
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #1a3020' }}>
                <div style={{ fontSize: 11, color: '#f97316', fontWeight: 600, marginBottom: 4 }}>🏹 Av</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{monthData.hunting}</div>
              </div>
            </div>
          </div>
        </>
      )}

      {tab === 'events' && (
        <div style={{ padding: '0 16px' }}>
          {WILDLIFE_EVENTS.map((e, i) => (
            <div key={i} style={{ background: '#0d1a0f', borderRadius: 12, padding: '12px 14px', border: '1px solid #22c55e22', marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 24 }}>{e.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>{e.month}</div>
                  <div style={{ fontSize: 13, color: '#f9fafb', marginTop: 2 }}>{e.event}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
