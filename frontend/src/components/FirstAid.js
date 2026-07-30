import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SCENARIOS = [
  {
    id: 1, title: 'Boğulma Tehlikesi', icon: '🌊', color: '#06b6d4', priority: 'ACİL',
    steps: [
      'Su dışına çıkarın — GÜVENLE, kendinizi tehlikeye atmayın',
      'Bilinci kontrol edin — seslenerek ve omza hafifçe vurarak',
      'Nefes almıyorsa 112\'yi arayın, CPR\'a başlayın',
      'CPR: 30 göğüs baskısı, ardından 2 kurtarma nefesi',
      'AED mevcut ise kullanın, sağlık ekibi gelene dek devam edin',
    ],
    warning: 'Suda kurtarma için eğitim şarttır — kendinizi tehlikeye atmayın!',
  },
  {
    id: 2, title: 'Yılan Sokması', icon: '🐍', color: '#f59e0b', priority: 'ACİL',
    steps: [
      'Hastayı sakin tutun — korku kalp atışını hızlandırır ve zehri yayar',
      'Zehirli yılansa: sokma bölgesini kalp seviyesinin altında tutun',
      'Bölgeyi kesmek, emmek veya turnike uygulamak YASAKTIR',
      'Takı ve dar giysileri çıkarın — şişme beklenebilir',
      'Mümkün olan en kısa sürede hastaneye ulaşın (antidot gerekir)',
    ],
    warning: 'Yılanı yakalamaya veya öldürmeye çalışmayın — ikinci ısırık riski var.',
  },
  {
    id: 3, title: 'Hipotermi (Soğuk Çarpması)', icon: '🥶', color: '#38bdf8', priority: 'ACİL',
    steps: [
      'Kişiyi soğuk ortamdan çıkarın, rüzgar ve ıslak zeminden uzaklaştırın',
      'Islak kıyafetleri yavaşça çıkarın, kuru giysilerle örtün',
      'Çevresel battaniye veya termal folyo ile sarın',
      'Vücut ısısını yavaşça artırın — sıcak su kaynamalı değil',
      'Sıcak içecek verin (bilinç yerindeyse), alkol VERMEYİN',
    ],
    warning: '32°C altı vücut sıcaklığı hayati tehlike. Hızlı ısıtmak kardiyak şoka neden olabilir.',
  },
  {
    id: 4, title: 'Arı Sokması (Anafilaksi)', icon: '🐝', color: '#f87171', priority: 'ACİL',
    steps: [
      'İğneyi tırnak veya kart kenarıyla kazıyarak çıkarın (sıkıştırmayın)',
      'Şişlik, nefes darlığı, yüzde solgunluk varsa 112\'yi arayın',
      'Anafilaksi belirtilerinde EpiPen (epinefrin) varsa hemen kullanın',
      'Hastayı yatırın, bacakları yukarı kaldırın (şok pozisyonu)',
      'Bilinç açıksa antihistaminik verilebilir',
    ],
    warning: 'Daha önce arı alerjisi olan kişilerde ölümcül olabilir. Her zaman EpiPen taşıyın.',
  },
  {
    id: 5, title: 'Güneş Çarpması', icon: '☀️', color: '#f59e0b', priority: 'ACİL',
    steps: [
      'Gölge ya da serin bir yere taşıyın',
      'Isınan vücudu soğutalım: ıslak bez, ense ve koltuk altlarına',
      'Su verin (bilinci yerindeyse küçük yudumlarla)',
      'Buz pack varsa boyun / koltuk altı / kasıklara uygulayın',
      'Ateş 39°C üstünde ve bilinç bozuksa 112 arayın',
    ],
    warning: 'Bilinç bozuksa kesinlikle içecek bir şey vermeyin.',
  },
  {
    id: 6, title: 'Kırık / Çıkık', icon: '🦴', color: '#a855f7', priority: 'Ciddi',
    steps: [
      'Kırık bölgeyi hareket ettirmeyin, sabitleyecek atel hazırlayın',
      'Kırığın üstüne ve altına padding (pamuk, giysi) koyun',
      'Bandaj veya kıyafetle hafifçe sarmak yeterli, sıkmayın',
      'Çıkık varsa zorla yerine sokmaya çalışmayın',
      'En yakın sağlık kuruluşuna ihtimamla taşıyın',
    ],
    warning: 'Boyun veya omurga şüphesi varsa kesinlikle hareket ettirmeyin.',
  },
  {
    id: 7, title: 'Büyük Kanama', icon: '🩸', color: '#ef4444', priority: 'ACİL',
    steps: [
      'Temiz bez veya kıyafetle baskı uygulayın, bırakmayın',
      'Kanamalı bölgeyi kalp seviyesinin üstüne kaldırın',
      'Yabancı cisim yerleşteyse ÇIKARTMAYIN, etrafını doldurun',
      'Turnike: kol/bacak kanaması kontrolsüzse 5-7 cm üstüne sıkıca bağlayın',
      'Turnikeyi uygulama saatini yazın, hastanede bildirin',
    ],
    warning: 'Turnike son çaredir. Doğru uygulanmazsa uzuv hasarı verebilir.',
  },
  {
    id: 8, title: 'Yanık', icon: '🔥', color: '#fb923c', priority: 'Ciddi',
    steps: [
      '1. derece: 20 dakika soğuk akar su altında tutun (buz değil)',
      'Kıyafetleri SOYMAYIN, yapışmışsa bırakın',
      '2. ve 3. derece yanıklarda temiz bandaj uygulayın',
      'Bölgeyi steril tut, patlatma, kirletme',
      '2. dereceyi aşan ve el büyüklüğünden büyük yanıklar için 112',
    ],
    warning: 'Tereyağı, macun veya benzeri şeyler yanığa sürülmez — enfeksiyon riski!',
  },
];

const PRIORITIES = ['Tümü', 'ACİL', 'Ciddi'];

function ScenarioCard({ s, onClick }) {
  return (
    <div onClick={() => onClick(s)} style={{
      background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
      border: `1px solid ${s.color}44`, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 26 }}>{s.icon}</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{s.title}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.steps.length} adım</div>
          </div>
        </div>
        <span style={{
          fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 700,
          background: s.priority === 'ACİL' ? '#450a0a' : '#451a03',
          color: s.priority === 'ACİL' ? '#f87171' : '#fb923c',
          border: `1px solid ${s.priority === 'ACİL' ? '#f8717144' : '#fb923c44'}`,
        }}>{s.priority}</span>
      </div>
    </div>
  );
}

function ScenarioDetail({ s, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 36, background: s.color + '22', borderRadius: 12, padding: '8px 10px', border: `2px solid ${s.color}44` }}>{s.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{s.title}</div>
            <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, fontWeight: 700,
              background: s.priority === 'ACİL' ? '#450a0a' : '#451a03',
              color: s.priority === 'ACİL' ? '#f87171' : '#fb923c' }}>{s.priority}</span>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 12 }}>📋 MÜDAHALE ADIMLARI</div>
          {s.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 26, height: 26, borderRadius: 13, background: s.color,
                color: '#fff', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
              }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: '#f9fafb', lineHeight: 1.7, paddingTop: 4 }}>{step}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#450a0a', borderRadius: 12, padding: '12px 14px', border: '1px solid #f8717144' }}>
          <div style={{ fontSize: 11, color: '#f87171', fontWeight: 600, marginBottom: 4 }}>⚠️ DİKKAT</div>
          <div style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.7 }}>{s.warning}</div>
        </div>
      </div>
    </div>
  );
}

export default function FirstAid() {
  const navigate  = useNavigate();
  const [priority, setPriority] = useState('Tümü');
  const [selected, setSelected] = useState(null);

  const filtered = SCENARIOS.filter(s => priority === 'Tümü' || s.priority === priority);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🩺 İlk Yardım Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>8 acil senaryo · adım adım müdahale</div>
      </div>

      {/* Emergency call */}
      <a href="tel:112" style={{
        display: 'flex', alignItems: 'center', gap: 12, margin: '0 16px 14px',
        background: '#450a0a', borderRadius: 14, padding: '14px 18px',
        border: '1px solid #f8717144', textDecoration: 'none',
      }}>
        <span style={{ fontSize: 28 }}>📞</span>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#f87171' }}>112 Ara</div>
          <div style={{ fontSize: 12, color: '#fca5a5' }}>Acil ambulans ve tıbbi destek</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 22, color: '#f87171' }}>→</div>
      </a>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        {PRIORITIES.map(p => (
          <button key={p} onClick={() => setPriority(p)} style={{
            background: priority === p ? '#ef4444' : '#1f2937', color: priority === p ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: priority === p ? '#ef4444' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{p}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {filtered.map(s => <ScenarioCard key={s.id} s={s} onClick={setSelected} />)}
      </div>

      <div style={{ margin: '14px 16px 0', background: '#1e3a5f', borderRadius: 14, padding: '12px 16px', border: '1px solid #3b82f644' }}>
        <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>ℹ️ YASAL UYARI</div>
        <div style={{ fontSize: 12, color: '#bfdbfe', lineHeight: 1.6 }}>
          Bu bilgiler genel rehber niteliğindedir. Profesyonel ilk yardım eğitimi almak en iyi hazırlıktır. Acil durumlarda 112'yi arayın.
        </div>
      </div>

      {selected && <ScenarioDetail s={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
