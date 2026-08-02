import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

const SPECIES = [
  {
    id: 'levrek', name: 'Levrek', icon: '🐟', accent: '#06b6d4',
    best: [9, 10, 11, 2, 3, 4],
    months: [
      { tip: 'Soğuk su — derin sularda, sabah gün doğumunda cankurtaran bölgesi kenarı.', bait: 'Küçük jig, suni yem', depth: '8-15m', time: 'Sabah erken' },
      { tip: 'Kış dönemi — az aktif, yavaş çekiş tekniği. Dip balığı taklit eden yem.', bait: 'Dip jig, solucan', depth: '10-18m', time: 'Öğle' },
      { tip: 'Bahar başı — beslenmesi artar. Kıyıya yakın aktif avlanma.', bait: 'Spinner, minnow', depth: '4-10m', time: 'Sabah-akşam' },
      { tip: 'Çoğalma öncesi — kıyı şeridi, taşlık alanlar çok verimli.', bait: 'Soft plastic, twister', depth: '3-8m', time: 'Akşamüstü' },
      { tip: 'Çoğalma dönemi — korunmalı; tatlı su ağzı yakınları.', bait: 'Küçük canlı yem', depth: '2-6m', time: 'Gündoğumu' },
      { tip: 'Yaz başı — gece balıkçılığı verimli; ışıklı noktalara yaklaşır.', bait: 'Surface popper, twitch', depth: '1-5m', time: 'Gece' },
      { tip: 'Yaz ortası — sıcak su; derin-serin sulara çekilir. Zor dönem.', bait: 'Deep diver, sinking lure', depth: '10-20m', time: 'Sabah çok erken' },
      { tip: 'Ağustos — yüzey avcılığı gece mümkün; gündüz zor.', bait: 'Topwater, popper', depth: '0-3m', time: 'Gece' },
      { tip: 'Eylül — sonbahar aktivitesi başlar, harika dönem!', bait: 'Metal jig, plug', depth: '5-12m', time: 'Sabah-akşam' },
      { tip: 'En iyi ay — göç dönemi; kıyılarda büyük levrekler.', bait: 'Baitfish imitation', depth: '3-10m', time: 'Tüm gün' },
      { tip: 'Kasım — hâlâ aktif, suyu soğuyor ama avlanma iyi.', bait: 'Jig, spoon', depth: '5-15m', time: 'Sabah' },
      { tip: 'Kış başlangıcı — derin noktalara çekiliyor, sabırlı ol.', bait: 'Slow jig, worm', depth: '12-20m', time: 'Öğle saatleri' },
    ],
  },
  {
    id: 'cipura', name: 'Çipura', icon: '🐠', accent: '#f59e0b',
    best: [4, 5, 6, 9, 10],
    months: [
      { tip: 'Kış ayı — derin sularda, az aktif. Sabırlı dip tekniği.', bait: 'Karides, midye', depth: '15-25m', time: 'Öğle' },
      { tip: 'Şubat — hâlâ derin, ama öğlen saatlerinde aktiflik artar.', bait: 'Karides, solucan', depth: '12-22m', time: 'Öğle' },
      { tip: 'Hareketlenme başlıyor; kıyılara yaklaşmaya başlar.', bait: 'Karides, küçük ahtapot', depth: '8-18m', time: 'Sabah' },
      { tip: 'Çok iyi dönem — kıyı kayalıkları ve posidonia çayırları.', bait: 'Karides, yengeç', depth: '5-15m', time: 'Sabah-akşam' },
      { tip: 'Harika ay — gün boyu aktif. Taşlık dipte.', bait: 'Taze karides, midye', depth: '4-12m', time: 'Tüm gün' },
      { tip: 'Çoğalma dönemi — kıyı sığlıklarında.', bait: 'Küçük yemler', depth: '3-8m', time: 'Sabah erken' },
      { tip: 'Yaz ortası — yüzey sıcaklığı yüksek, sabah çok erken çık.', bait: 'Canlı yem, karides', depth: '6-15m', time: 'Gün doğumu' },
      { tip: 'Ağustos — gece balıkçılığı daha verimli.', bait: 'Karides, solucan', depth: '5-12m', time: 'Gece' },
      { tip: 'Sonbahar başlangıcı — aktiflik tekrar artıyor.', bait: 'Karides, küçük mürekkepbalığı', depth: '6-14m', time: 'Sabah-akşam' },
      { tip: 'En iyi sonbahar ayı — büyük çipuralar kıyıda!', bait: 'Taze karides, yengeç', depth: '4-12m', time: 'Tüm gün' },
      { tip: 'Kasım — hâlâ aktif, su soğuyor.', bait: 'Karides, solucan', depth: '8-15m', time: 'Sabah' },
      { tip: 'Soğuk su başlıyor — derinlere çekiliyor.', bait: 'Karides', depth: '12-20m', time: 'Öğle' },
    ],
  },
  {
    id: 'palamut', name: 'Palamut', icon: '🐡', accent: '#f97316',
    best: [8, 9, 10, 11],
    months: [
      { tip: 'Kış — Akdeniz\'de; Ege ve Marmara\'da yok.', bait: 'Yok (kuzey sularda)', depth: '—', time: '—' },
      { tip: 'Şubat — hâlâ Güney sularda, Türkiye kıyılarına gelmedi.', bait: 'Yok (bölgede)', depth: '—', time: '—' },
      { tip: 'Mart — güney kıyılarında ilk hareketler.', bait: 'Metal jig, sahte yem', depth: '5-20m', time: 'Sabah' },
      { tip: 'Nisan — küçük palamutlar kıyılara gelmeye başlar.', bait: 'Küçük jig, istavrit', depth: '3-15m', time: 'Sabah-akşam' },
      { tip: 'Mayıs — Marmara\'ya giriş; bol balık!', bait: 'Metal jig, istavrit', depth: '5-20m', time: 'Tüm gün' },
      { tip: 'Haziran — Boğaz geçişi, muhteşem sezon!', bait: 'Sahte istavrit, jig', depth: '3-15m', time: 'Sabah-akşam' },
      { tip: 'Temmuz — Karadeniz\'e çıkış; yüzey kovalama.', bait: 'Troller, jig', depth: '0-10m', time: 'Tüm gün' },
      { tip: 'Ağustos — Karadeniz\'de harika; büyük sürüler.', bait: 'Jig, troller', depth: '0-15m', time: 'Tüm gün' },
      { tip: 'Geri dönüş başlıyor — boğaz sezonunun zirvesi!', bait: 'Metal jig, canlı istavrit', depth: '2-20m', time: 'Tüm gün' },
      { tip: 'En büyük palamutlar! Ekim sezonu efsane.', bait: 'Büyük jig, canlı yem', depth: '5-25m', time: 'Tüm gün' },
      { tip: 'Kasım — son şans; büyük torik boyutuna ulaşır.', bait: 'Büyük metal jig', depth: '8-25m', time: 'Sabah' },
      { tip: 'Aralık — Güney sulara göç, sezon bitti.', bait: 'Yok (bölgede)', depth: '—', time: '—' },
    ],
  },
  {
    id: 'alabalik', name: 'Alabalık', icon: '🐟', accent: '#22c55e',
    best: [3, 4, 5, 9, 10, 11],
    months: [
      { tip: 'Kış — soğuk dereler, çok yavaş hareket. Küçük nimf.', bait: 'Küçük nimf, mısır', depth: 'Dip', time: 'Öğle saatleri' },
      { tip: 'Şubat — su ısınmaya başlıyor, sabah saatleri verimli.', bait: 'Yüzmür, küçük spinner', depth: '0.5-2m', time: 'Sabah' },
      { tip: 'Mart — yoğun beslenme; en iyi spinner dönemleri!', bait: 'Spinner, solucan', depth: '0.5-2m', time: 'Sabah-akşam' },
      { tip: 'Nisan — çiçeklenme dönemine denk gelen böcek çıkışı; dry fly mükemmel.', bait: 'Dry fly, spinner', depth: 'Yüzey', time: 'Akşam' },
      { tip: 'Mayıs — sezon zirvesi! Büyük balıklar aktif.', bait: 'Streamer, dry fly, spinner', depth: 'Her derinlik', time: 'Tüm gün' },
      { tip: 'Haziran — su ısındı; sabah çok erken veya akşam geç.', bait: 'Solucan, küçük lure', depth: 'Derin gölge', time: 'Sabah çok erken' },
      { tip: 'Temmuz — sıcak dönem; akarsu ve yüksek rakım dereleri.', bait: 'Küçük nimf, solucan', depth: 'Dip', time: 'Sabah 5-7' },
      { tip: 'Ağustos — düşük su seviyesi; hassas yaklaşım şart.', bait: 'Ultra-light lure, solucan', depth: 'Gölge noktalar', time: 'Tan ağarması' },
      { tip: 'Sonbahar başlangıcı — yüzey serin, harika dönem!', bait: 'Spinner, streamer', depth: '0.5-3m', time: 'Sabah-akşam' },
      { tip: 'Ekim — en iyi sonbahar ayı; renkleri solmuş balıklar büyük.', bait: 'Spinner, streamer', depth: 'Her derinlik', time: 'Tüm gün' },
      { tip: 'Kasım — aktiflik azalıyor ama büyük balık yakalanıyor.', bait: 'Küçük lure, nimf', depth: 'Dip', time: 'Öğle' },
      { tip: 'Aralık — çok soğuk; yavaş teknik, solucan en etkili.', bait: 'Solucan, mısır', depth: 'Dip', time: 'Öğle saatleri' },
    ],
  },
  {
    id: 'sazan', name: 'Sazan', icon: '🐟', accent: '#a855f7',
    best: [4, 5, 6, 9, 10],
    months: [
      { tip: 'Kış uykusu — çok az aktif; dip boilies verimli.', bait: 'Boilies, mısır', depth: 'Dip', time: 'Öğle' },
      { tip: 'Şubat — hâlâ yavaş ama öğlen ısınan anlarda hareket eder.', bait: 'Boilies, patates', depth: 'Dip', time: 'Öğle' },
      { tip: 'Mart — ısınma başladıkça aktifleşiyor.', bait: 'Mısır, boilies', depth: '1-4m', time: 'Öğle-akşam' },
      { tip: 'Nisan — çoğalma öncesi yoğun beslenme!', bait: 'Mısır, ekmek, boilies', depth: '1-3m', time: 'Sabah-akşam' },
      { tip: 'Mayıs — çoğalma dönemi; sığ sularda.', bait: 'Canlı solucan, yumurta taklit', depth: '0.5-2m', time: 'Sabah' },
      { tip: 'Çoğalma sonrası — yorgun ama yoğun beslenme.', bait: 'Mısır, boilies, hamur', depth: '1-4m', time: 'Gün boyu' },
      { tip: 'Temmuz — gece balıkçılığı mükemmel; gündüz zor.', bait: 'Mısır, boilies', depth: 'Derin gölge', time: 'Gece' },
      { tip: 'Ağustos — gece veya tan ağarması seansları.', bait: 'Mısır, hamur', depth: 'Gölgeli nokta', time: 'Gece-sabah' },
      { tip: 'Eylül — güzel sonbahar dönemi başlıyor.', bait: 'Boilies, mısır', depth: '1-4m', time: 'Sabah-akşam' },
      { tip: 'Ekim — kışa hazırlık beslenme maratonu!', bait: 'Mısır, boilies, yer fıstığı', depth: '2-5m', time: 'Tüm gün' },
      { tip: 'Kasım — yavaşlıyor ama büyük sazanlar aktif.', bait: 'Boilies', depth: '3-6m', time: 'Sabah' },
      { tip: 'Kış başlıyor — azalan aktivite, sabırlı ol.', bait: 'Küçük boilies, mısır', depth: 'Dip', time: 'Öğle' },
    ],
  },
];

export default function FishingTips() {
  const navigate = useNavigate();
  const now = new Date();
  const [speciesId, setSpeciesId] = useState('levrek');
  const [monthIdx, setMonthIdx] = useState(now.getMonth());

  const species = SPECIES.find(s => s.id === speciesId);
  const tip = species?.months[monthIdx];
  const isBest = species?.best.includes(monthIdx);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Aylık Balıkçılık İpuçları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 tür · aylık taktik, yem ve derinlik rehberi</div>
      </div>

      {/* Species selector */}
      <div style={{ padding: '0 16px 10px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {SPECIES.map(s => (
          <button key={s.id} onClick={() => setSpeciesId(s.id)} style={{
            background: speciesId === s.id ? s.accent : '#1f2937',
            color: speciesId === s.id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: speciesId === s.id ? s.accent : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{s.icon} {s.name}</button>
        ))}
      </div>

      {/* Month grid */}
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
          {MONTHS.map((m, i) => {
            const best = species?.best.includes(i);
            const sel = monthIdx === i;
            return (
              <button key={i} onClick={() => setMonthIdx(i)} style={{
                background: sel ? species?.accent : best ? species?.accent + '22' : '#1f2937',
                color: sel ? '#fff' : best ? species?.accent : '#6b7280',
                border: `1px solid ${sel ? species?.accent : best ? species?.accent + '55' : '#374151'}`,
                borderRadius: 8, padding: '8px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
              }}>
                {m}
                {best && !sel && <div style={{ fontSize: 6, color: species?.accent, marginTop: 1 }}>●</div>}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {tip && (
          <div>
            {/* Month header */}
            <div style={{ background: isBest ? species?.accent + '22' : '#1f2937', borderRadius: 14, padding: 16, border: `1px solid ${isBest ? species?.accent + '55' : '#374151'}`, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#f9fafb' }}>{MONTHS[monthIdx]} — {species?.name}</div>
                  <div style={{ fontSize: 12, color: isBest ? species?.accent : '#6b7280', marginTop: 2 }}>
                    {isBest ? '⭐ En İyi Dönem' : '📅 Standart Sezon'}
                  </div>
                </div>
                <span style={{ fontSize: 36 }}>{species?.icon}</span>
              </div>
              <div style={{ fontSize: 14, color: '#d1d5db', lineHeight: 1.7 }}>{tip.tip}</div>
            </div>

            {/* Stats */}
            {tip.depth !== '—' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                {[
                  { label: '🪱 Yem', val: tip.bait },
                  { label: '🌊 Derinlik', val: tip.depth },
                  { label: '⏰ Saat', val: tip.time },
                ].map((s, i) => (
                  <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: 12, border: '1px solid #374151', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#f9fafb' }}>{s.val}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Best months overview */}
            <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151' }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>📆 TÜM YIL TAKVIMI</div>
              <div style={{ display: 'flex', gap: 3 }}>
                {MONTHS.map((m, i) => {
                  const best = species?.best.includes(i);
                  const cur = i === monthIdx;
                  return (
                    <div key={i} onClick={() => setMonthIdx(i)} style={{
                      flex: 1, height: 36, borderRadius: 4, cursor: 'pointer',
                      background: cur ? species?.accent : best ? species?.accent + '55' : '#374151',
                      display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 3,
                    }}>
                      <span style={{ fontSize: 8, color: cur ? '#fff' : best ? species?.accent : '#6b7280', fontWeight: 700 }}>
                        {m[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#6b7280' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: species?.accent }} /> En iyi
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#6b7280' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: species?.accent + '55' }} /> İyi
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#6b7280' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: '#374151' }} /> Zayıf
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
