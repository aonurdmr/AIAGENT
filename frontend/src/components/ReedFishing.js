import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TECHNIQUES = [
  {
    id: 'margin', name: 'Kenar Avı (Margin)', icon: '🎣', accent: '#22c55e',
    desc: 'Sazlık ve kamış kenarında sazan ve levrek avı',
    rig: 'Kısa olta + ağır olta ucu + yüzer',
    steps: [
      'Sazlık kenarından 30-50cm içeriye at — balık gölgede saklanır',
      'Kısa sap olta: 10-11 feet, hızlı hamle gerekir',
      'Yük: ağır kullan (yem hızlı batar, sazlık takılmaz)',
      'Ses çıkarma: sazan kenar aromasına gelir — pellet dök',
      'Gece kenar avı çok etkili — levrek aktif',
      'Çekince hemen fren ver — balık kamışa kaçar',
    ],
    tip: 'Sazan sabah erken kamışa gelir, öğlen derine gider.',
  },
  {
    id: 'punching', name: 'Sazlık Delerek Av', icon: '🏹', accent: '#f97316',
    desc: 'Sazlık içine ağır yem daldırma',
    rig: 'Texas Rig veya Punch rig — 1oz+ ağır mantar',
    steps: [
      'Ağır mantar (tungsten sinker) ağırlıkla sazlık deldirme',
      'Yumuşak yem (soft plastic) kanca gizlenmiş',
      'Sazlık içinde balığın arasına yem düş',
      'Dip dokundu — hafifçe kımıldat',
      'Çekiş anında güçlü hamle: sazlıktan çıkarmak için',
      'Kalın misina şart: 20lb+ veya örgü 40lb+',
    ],
    tip: 'Sıcak günde balık sazlık gölgesinde saklanır — en iyi saat öğle.',
  },
  {
    id: 'float', name: 'Yüzerli Sazlık Avı', icon: '🎈', accent: '#06b6d4',
    desc: 'Yüzerle sazlık açıklarında yem sunma',
    rig: 'Slip float + küçük yük + iğne + canlı yem',
    steps: [
      'Slip float derinliği ayarla — dip 30-50cm üstünde yem',
      'Canlı solucan veya kırmızı larva — sazlık türleri sever',
      'Sazlık kenarından 1-2m açıkta yüz bırak',
      'Rüzgara bak: yüzer sazlığa girmesin',
      'Yüzer battığında 3 saniye bekle, sonra hamle',
      'Levrek, sazan, turna için etkili',
    ],
    tip: 'Rüzgarlı günde yüzer sürekli hareket eder — dip çarpası daha iyi.',
  },
  {
    id: 'lure', name: 'Yapay Yemle Kenar', icon: '🐛', accent: '#a78bfa',
    desc: 'Sahte yemle levrek ve turna avı',
    rig: 'Unweighted soft plastic veya topwater',
    steps: [
      'Topwater lure: sabah erken sazlık yüzeyinde sürükle',
      'Frog (kurbağa lure): sazlık üstünde kaydır',
      'Soft plastic worm: kamış dibine batır, yavaş çek',
      'Spinnerbait: sazlık kenarından geçir, hızlı',
      'Büyük levrek sazlık dibinde — yavaş sunum',
      'Atışta kamışa takılma: underhand cast veya sidearm',
    ],
    tip: 'Frog lure sazlık üstünde hiç takılmaz — en az engele takılan lure.',
  },
];

export default function ReedFishing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040e06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌾 Sazlık Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kenar avı · sazlık delme · yüzerli · yapay yem</div>
      </div>

      <div style={{ background: '#061008', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>🎯 HEDEF TÜRLER</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Sazan · levrek · turna · sudak · yayın balığı — sazlık habitatında yaşar</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TECHNIQUES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#081208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#081208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, marginTop: 8, marginBottom: 6 }}>⚙️ <span style={{ fontWeight: 700 }}>Kurulum:</span> {t.rig}</div>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginBottom: 4 }}>📋 TEKNİK</div>
                  {t.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
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
