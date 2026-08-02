import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TECHNIQUES = [
  {
    id: 'surfcast', name: 'Surf Casting', icon: '🌊', accent: '#06b6d4',
    desc: 'Uzak atış ile kıyıdan derin su balıkçılığı',
    rig: 'Pendulum cast veya OTG tekniği · 100-200m atış',
    steps: [
      'Dalga kırılma hattını geç — dip topografya buraya dönüşür',
      'Yük: piramit veya grip sinker — akıntıda tutunur',
      'Olta: 12-14 feet surf rod, 7000+ makara',
      'Atış sonrası misina gergin tut — sapan etkisi riski',
      'İki veya üç iğneli paternoster rig — çift fırsat',
      'Çekiş hissince 2-3 saniye ver sonra hamle',
    ],
    species: 'Çipura, levrek, tekir, izmarit, kefal',
    tip: 'Akıntı köşeleri ve kumsal çukurları altın nokta.',
  },
  {
    id: 'rock', name: 'Kayalık Avı', icon: '🪨', accent: '#f59e0b',
    desc: 'Kayalık kıyıdan yapay ve canlı yem avı',
    rig: 'Texas Rig veya Carolina — kayaya takılmaz',
    steps: [
      'Kayalık arası çatlak ve mağaralara at',
      'Sert zemin: tungsten ağırlık, kayaya takılmaz kanca',
      'Levrek kayalık dibinde — havadan yüzen yem',
      'Ahtapot ve ığrıp canlı yem olarak çok etkili',
      'Kayalık patikada güvenli yürüme — deniz yosunu kayar',
      'Büyük dalga periyodunu takip et: 4-6m güvenli sınır',
    ],
    species: 'Levrek, lahoz, karagöz, izmarit, ahtapot',
    tip: 'Can yeleği kayalık avında hayat kurtarır — dalgayı küçümseme.',
  },
  {
    id: 'pier', name: 'İskele Avı', icon: '⚓', accent: '#22c55e',
    desc: 'Balıkçı iskelesi veya rıhtımdan av',
    rig: 'Sabiki rig, yüzer veya dip rig',
    steps: [
      'İskele direkleri: balık sığınak kullanır — dibine at',
      'Dikey jigging: küçük jig ile istavrit, lüfer',
      'Sabiki: 5-6 iğneli seri avlama — sürü üstünde etkili',
      'Büyük yem: dip rig, büyük türler için geceleri',
      'Rıhtım altında gölge — sazan ve kefal sabah',
      'Diğer balıkçılara saygı: alanı paylaş',
    ],
    species: 'İstavrit, lüfer, kefal, sazan (tatlı su iskelesi)',
    tip: 'Sabah ilk ışıkta ve akşam batımı en aktif dönem.',
  },
  {
    id: 'wading', name: 'Suya Girerek Av', icon: '🦺', accent: '#a78bfa',
    desc: 'Sakin sularda diz boyu girerek av',
    rig: 'Hafif rig · ultralight · spin veya sinek',
    steps: [
      'Wader veya su geçirmez çizme — kışın zorunlu',
      'Çok yavaş gir — balığı korkutma, su sesi duyar',
      'Kum sığlığında yürüyerek geniş alan tara',
      'Lüfer ve çipura sığ kumlu kıyıda sabah beslenir',
      'Sinek olta ile sığ koy avı: kefal ve çipura',
      'Akıntıya dikkat: suyun derinleştiği nokta tehlikeli',
    ],
    species: 'Lüfer, çipura, kefal, alabalık (nehir ağzı)',
    tip: 'Sığ kumlu koy avında sabah erken en iyi — balık beslenme turunda.',
  },
];

export default function SurfFishing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Kıyı Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Surf casting · kayalık · iskele · suya girerek av</div>
      </div>

      <div style={{ background: '#031018', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #06b6d433' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>🌊 GELGİT TAKVİMİ</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Gel-git geçiş saatleri en aktif dönem. Kabarma başlangıcı ve alçalma başlangıcı 1-2 saat öncesi altın zaman.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TECHNIQUES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#031018', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#031018', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, marginTop: 8, marginBottom: 4 }}>⚙️ <span style={{ fontWeight: 700 }}>Kurulum:</span> {t.rig}</div>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginBottom: 4 }}>📋 TEKNİK</div>
                  {t.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>🎯 Tür: </span><span style={{ color: '#d1d5db' }}>{t.species}</span></div>
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {t.tip}</div>
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
