import React, { useState, useRef, useEffect } from 'react';

const MONTHS = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];

// Quality: 'excellent' | 'good' | 'moderate' | 'poor' | 'closed'
const SEASONS = {
  fishing: {
    label: 'Balıkçılık', icon: '🎣',
    months: [
      { q: 'good',      note: 'Sazan, turna sezonu başlar' },
      { q: 'good',      note: 'Karlı sularda turna aktif' },
      { q: 'excellent', note: 'İlkbahar: en aktif dönem' },
      { q: 'excellent', note: 'Sazan, levrek, gökkuşağı alabalığı' },
      { q: 'excellent', note: 'Göl ve akarsu sezonun zirvesi' },
      { q: 'good',      note: 'Sıcaklık arttı, derinlere inin' },
      { q: 'moderate',  note: 'Sıcak su — sabah/akşam avlan' },
      { q: 'moderate',  note: 'Yaz stresi, gece avlanmayı dene' },
      { q: 'excellent', note: 'Sonbahar — en iyi av dönemi' },
      { q: 'excellent', note: 'Sazan büyük boy, göl balıkları hareketli' },
      { q: 'good',      note: 'Soğuma başlar, levrek sahile iner' },
      { q: 'good',      note: 'Kış balıkçılığı için uygun' },
    ],
    rules: [
      '🔴 Akarsu alabalık yasağı: 15 Mart – 31 Mayıs',
      '🔴 Göl alabalık yasağı: 1 Ocak – 28 Şubat',
      '🟡 Sazan avlama: minimum 30 cm boy',
      '🟢 Deniz balıkçılığı genel olarak serbest',
    ],
  },
  hunting: {
    label: 'Avcılık', icon: '🏹',
    months: [
      { q: 'closed',    note: 'Kapalı sezon' },
      { q: 'closed',    note: 'Kapalı sezon' },
      { q: 'closed',    note: 'Kapalı sezon — üreme dönemi' },
      { q: 'closed',    note: 'Kapalı sezon — üreme dönemi' },
      { q: 'closed',    note: 'Kapalı sezon' },
      { q: 'closed',    note: 'Kapalı sezon' },
      { q: 'closed',    note: 'Kapalı sezon' },
      { q: 'moderate',  note: 'Bıldırcın sezonu bazı bölgelerde açılır' },
      { q: 'excellent', note: 'Keklik, tavşan, su kuşları sezonu' },
      { q: 'excellent', note: 'Keklik sezonu: en iyi dönem' },
      { q: 'good',      note: 'Domuz ve yabani tavşan avı' },
      { q: 'good',      note: 'Kış avı: domuz, kurt dışında' },
    ],
    rules: [
      '🔴 Genel av yasağı: Nisan – Temmuz',
      '🔴 Yaban domuzu avcılığı ruhsata bağlı',
      '🟡 Keklik sezonu: Eylül – Kasım (bölgeye göre değişir)',
      '🟢 Bıldırcın sezonu: yıllık bakanlık kararıyla açılır',
    ],
  },
  camping: {
    label: 'Kamp', icon: '⛺',
    months: [
      { q: 'poor',      note: 'Çok soğuk, karlı dağ kampları' },
      { q: 'poor',      note: 'Soğuk, tecrübeli kampcılar için' },
      { q: 'moderate',  note: 'İlkbahar kampının başlangıcı' },
      { q: 'good',      note: 'Bahar çiçekleri, hafif hava' },
      { q: 'excellent', note: 'İdeal kamp hava koşulları' },
      { q: 'excellent', note: 'Uzun günler, sıcak geceler' },
      { q: 'good',      note: 'Sıcak, yüksek kesimlere çık' },
      { q: 'good',      note: 'Sonbahara hazırlık kampı' },
      { q: 'excellent', note: 'Sonbahar renkleri, ideal iklim' },
      { q: 'excellent', note: 'Sonbahar yaprak kamp sezonu' },
      { q: 'moderate',  note: 'Soğuma var, güzel manzaralar' },
      { q: 'poor',      note: 'Kış kampı — özel ekipman gerekir' },
    ],
    rules: [
      '🟢 Milli park kampları: izin gerekebilir',
      '🟡 Ateş yakma: yangın riski olan bölgelerde yasak',
      '🔴 Yaban hayatı koruma bölgelerinde kamp yasak',
      '🟢 Orman işletme alanları: ücretsiz kamp genellikle serbest',
    ],
  },
  birdwatching: {
    label: 'Kuş Gözlemi', icon: '🦅',
    months: [
      { q: 'good',      note: 'Kış misafirleri: leylek, kılıçgaga' },
      { q: 'good',      note: 'Kış kuşları, göç hazırlığı başlar' },
      { q: 'excellent', note: 'İlkbahar göçü: bülbül, kırlangıç gelir' },
      { q: 'excellent', note: 'En zengin dönem — göç zirve' },
      { q: 'excellent', note: 'Nesil kuluçkası, şarkılı kuşlar' },
      { q: 'good',      note: 'Yaz kuşları; erken sabah gözlemi' },
      { q: 'good',      note: 'Sonbahar göçü başlar' },
      { q: 'excellent', note: 'Göç yoğunlaşıyor, renkli kuşlar' },
      { q: 'excellent', note: 'Sonbahar göç zirve — yüzlerce tür' },
      { q: 'excellent', note: 'Kışlayan kuşlar gelir' },
      { q: 'good',      note: 'Kış kuşları: ördek, kaz, dalgıç' },
      { q: 'good',      note: 'Kış yoğunluğu devam eder' },
    ],
    rules: [
      '🔴 Yuvaya yaklaşmak yasak (kuluçka dönemi)',
      '🟡 Dalış kuşları gözlemi: 50m mesafe koru',
      '🟢 Eber, Mogan, Kuş Cenneti: tüm yıl açık',
      '🟢 Fotoğraf için gizlenme çadırı önerilir',
    ],
  },
};

const QUALITY_STYLE = {
  excellent: { bg: '#22c55e22', border: '#22c55e44', dot: '#22c55e', label: 'Mükemmel' },
  good:      { bg: '#86efac18', border: '#86efac30', dot: '#86efac', label: 'İyi' },
  moderate:  { bg: '#fbbf2418', border: '#fbbf2430', dot: '#fbbf24', label: 'Orta' },
  poor:      { bg: '#f8717118', border: '#f8717130', dot: '#f87171', label: 'Zayıf' },
  closed:    { bg: '#3f3f4620', border: '#3f3f4640', dot: '#71717a', label: 'Kapalı' },
};

export default function SeasonalCalendar() {
  const [activity, setActivity] = useState('fishing');
  const now = new Date();
  const [selMonth, setSelMonth] = useState(now.getMonth());
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      const btn = scrollRef.current.children[selMonth];
      btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, []);

  const season = SEASONS[activity];
  const monthData = season.months[selMonth];
  const qs = QUALITY_STYLE[monthData.q];

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #010d01 0%, #0a2e0a 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>📅 Sezonluk Takvim</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Türkiye avlanma ve balık sezonu rehberi</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Activity tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 14 }}>
          {Object.entries(SEASONS).map(([key, s]) => (
            <button key={key} onClick={() => setActivity(key)} style={{
              padding: '10px 4px', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
              background: activity === key ? 'var(--a-glow)' : 'var(--s2)',
              border: activity === key ? '1px solid var(--border-lg)' : '1px solid var(--border)',
              transition: 'all .2s',
            }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>{s.icon}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: activity === key ? 'var(--a-light)' : 'var(--t-mute)', letterSpacing: '.02em' }}>
                {s.label}
              </div>
            </button>
          ))}
        </div>

        {/* Month scroller */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.08em', marginBottom: 8 }}>
            AY SEÇ
          </div>
          <div ref={scrollRef} style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
            {MONTHS.map((m, i) => {
              const q = season.months[i].q;
              const dot = QUALITY_STYLE[q].dot;
              const isNow = i === now.getMonth();
              return (
                <button key={m} onClick={() => setSelMonth(i)} style={{
                  minWidth: 48, padding: '8px 4px', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                  background: selMonth === i ? 'var(--a-glow)' : 'var(--s2)',
                  border: selMonth === i ? '1px solid var(--border-lg)' : '1px solid var(--border)',
                  transition: 'all .2s', position: 'relative',
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: selMonth === i ? 'var(--a-light)' : 'var(--t-mute)' }}>
                    {m}
                  </div>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: dot, margin: '4px auto 0',
                    boxShadow: `0 0 4px ${dot}60`,
                  }} />
                  {isNow && (
                    <div style={{
                      position: 'absolute', top: -3, right: -3,
                      width: 7, height: 7, borderRadius: '50%',
                      background: '#fff', border: '1.5px solid var(--s2)',
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected month detail */}
        <div className="card" style={{ marginBottom: 14, background: qs.bg, borderColor: qs.border }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, flexShrink: 0,
              background: qs.dot + '20', border: `1px solid ${qs.dot}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
            }}>{season.icon}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>
                {MONTHS[selMonth]} — {season.label}
              </div>
              <div style={{ fontSize: 12, color: qs.dot, fontWeight: 700, marginTop: 2 }}>
                {qs.label}
              </div>
            </div>
          </div>
          <div style={{
            background: 'rgba(0,0,0,.2)', borderRadius: 10, padding: '10px 12px',
            fontSize: 13, color: 'var(--t-mid)', lineHeight: 1.5,
          }}>
            💡 {monthData.note}
          </div>
        </div>

        {/* Year overview strip */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
            📊 YIL BOYUNCA — {season.label.toUpperCase()}
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {season.months.map((m, i) => {
              const dot = QUALITY_STYLE[m.q].dot;
              const isNow = i === now.getMonth();
              const isSel = i === selMonth;
              return (
                <button key={i} onClick={() => setSelMonth(i)} style={{
                  flex: 1, height: 36, borderRadius: 8, cursor: 'pointer',
                  background: dot + (isSel ? '50' : '20'),
                  border: `1.5px solid ${isSel ? dot : dot + '40'}`,
                  transition: 'all .2s', position: 'relative',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 2,
                }}>
                  <div style={{ fontSize: 7, color: dot, fontWeight: 700 }}>{MONTHS[i].slice(0,1)}</div>
                  {isNow && (
                    <div style={{
                      position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
                      width: 3, height: 3, borderRadius: '50%', background: '#fff',
                    }} />
                  )}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
            {Object.entries(QUALITY_STYLE).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: v.dot }} />
                <span style={{ fontSize: 10, color: 'var(--t-mute)' }}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regulations */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
            📋 ÖNEMLI KURALLAR
          </div>
          {season.rules.map((r, i) => (
            <div key={i} style={{
              fontSize: 12, color: 'var(--t-mid)', lineHeight: 1.5, marginBottom: 6,
              paddingBottom: 6, borderBottom: i < season.rules.length - 1 ? '1px solid var(--border)' : 'none',
            }}>{r}</div>
          ))}
        </div>

      </div>
    </div>
  );
}
