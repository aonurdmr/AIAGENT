import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LURES = [
  {
    id: 'spinner', name: 'Spinner (Döner Kaşık)', icon: '🌀', accent: '#f59e0b',
    desc: 'Dönen kanat ile titreşim ve parıltı üretir',
    sizes: 'No.1-2 küçük balık · No.3-5 levrek, turna · No.6+ büyük av',
    technique: [
      'Orta hız ile düz çekiş — kanat dönmeli, durmamalı',
      'Dip yakın: yavaş çekiş, duruyorsa biraz hızlan',
      'Su yüzeyi yakın: hızlı çekiş, spinner su çıkarmasın',
      'Duraksama ve devam: yavaşla-bırak-çek — doğal görünüm',
      'Akıntıda: akıntıya karşı at, daha yavaş çek',
    ],
    species: 'Alabalık, levrek, turna, sazan, kızılkanat',
    tip: 'Spinner parlaklığı önemli — bulanık suda altın, berrak suda gümüş.',
  },
  {
    id: 'spoon', name: 'Kaşık Yem (Spoon)', icon: '🥄', accent: '#06b6d4',
    desc: 'Oval metal plaka — salınım ve parıltı',
    sizes: 'Küçük 5g · orta 15g · büyük 30g+',
    technique: [
      'Düz çekiş: salınım değişken hız ile değişir',
      'Jigging: dibe bırak, sert kaldır, düşür — levrek ve turna',
      'Trolling: tekne arkasında sürükle — 4-6km/h',
      'Renk: gümüş (parlak su), altın (bulanık), kırmızı (gece)',
      'Küçük kaşık: alabalık ve kızılkanat için hassas',
    ],
    species: 'Turna, levrek, alabalık, sudak',
    tip: 'Kaşığı fırlat, dibe değdir, düzensiz çek — predatör saldırır.',
  },
  {
    id: 'jig', name: 'Jig', icon: '🎣', accent: '#22c55e',
    desc: 'Ağırlıklı kanca — zıplayarak çekiş',
    sizes: '3g ultralight · 10-20g standard · 30g+ deep',
    technique: [
      'Fırlat, dibe değdir, sert hamle ile kaldır',
      'Düşüş anı: balık çoğunlukla düşerken vurur',
      'Kısa kesik çekiş: çek-dur-çek-dur — 1 sn ara',
      'Dip bounce: jig dibi vururken çarpar — doğal görünüm',
      'Renk dene: bulanık = parlak, berrak = doğal renk',
    ],
    species: 'Levrek, turna, sudak, denizde çipura, levrek',
    tip: 'Jig en çok yönlü lure — her su tipi ve derinlikte çalışır.',
  },
  {
    id: 'crankbait', name: 'Crankbait / Maket', icon: '🐟', accent: '#a78bfa',
    desc: 'Balık şeklinde sallanan maket yem',
    sizes: 'Shallow: 0-1m · medium: 1-3m · deep: 4-6m',
    technique: [
      'Dudak boyuna göre derinlik: büyük dudak = derin',
      'Orta-hızlı düz çekiş ile titreşim sabit',
      'Dip dokundurma: ağaç kökleri ve taş — turna çıkar',
      'Stop-and-go: dur-bekle-çek — ölü balık taklidi',
      'Akıntı sakindir: crankbait en etkili, akıntıda jigging',
    ],
    species: 'Turna, levrek, sudak, kefal (deniz)',
    tip: 'Crankbait dip çarparken en etkili — zemin unsurundan fırlayan av balığı.',
  },
];

export default function SpinFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('lures');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌀 Spinner ve Yapay Yem</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Spinner · kaşık · jig · crankbait — çekiş teknikleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['lures','Yem Tipleri'],['tips','Seçim Rehberi']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#141208', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'lures' && LURES.map(l => {
          const open = sel === l.id;
          return (
            <div key={l.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : l.id)} style={{
                background: '#141208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${l.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{l.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{l.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{l.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#141208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${l.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: l.accent, marginTop: 8, marginBottom: 4 }}>📏 <span style={{ fontWeight: 700 }}>Boyut:</span> {l.sizes}</div>
                  <div style={{ fontSize: 11, color: l.accent, fontWeight: 700, marginBottom: 4 }}>📋 TEKNİK</div>
                  {l.technique.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>🎯 Tür: </span><span style={{ color: '#d1d5db' }}>{l.species}</span></div>
                  <div style={{ background: l.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {l.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'tips' && (
          <div style={{ background: '#141208', borderRadius: 14, padding: 14, border: '1px solid #f59e0b22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 12 }}>🎯 Koşula Göre Yem Seçimi</div>
            {[
              { durum: 'Berrak su, yavaş akıntı', yem: 'Küçük spinner veya ince crankbait', neden: 'Balık net görür — doğal boyut ve renk' },
              { durum: 'Bulanık su', yem: 'Büyük altın spinner veya parlak kaşık', neden: 'Titreşim ve parıltı görünürlüğü artırır' },
              { durum: 'Derin göl', yem: 'Ağır jig veya derin crankbait', neden: 'Dibe ulaşmak için ağırlık gerekir' },
              { durum: 'Hızlı nehir', yem: 'Ağır jig veya büyük spinner', neden: 'Akıntı hafif lure sapar veya yüzdürür' },
              { durum: 'Sabah erken', yem: 'Topwater veya spinner yüzey', neden: 'Balık yüzeyde avlanıyor' },
              { durum: 'Öğle saati', yem: 'Dip jig veya drop shot', neden: 'Balık derine çekilmiş' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < 5 ? '1px solid #221e08' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fcd34d', marginBottom: 2 }}>{item.durum}</div>
                <div style={{ fontSize: 12, color: '#f59e0b', marginBottom: 2 }}>→ {item.yem}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{item.neden}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
