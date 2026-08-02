import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WOLF_INFO = {
  name: 'Kurt (Canis lupus)', icon: '🐺',
  desc: 'Türkiye\'nin en yaygın büyük yırtıcısı. Doğu ve İç Anadolu\'da popülasyonları güçlüdür. Sürü halinde avlanan, zeki ve sosyal bir tür.',
  population: 'Türkiye: ~7000 birey tahmin (2023) · Doğu Anadolu en yoğun bölge',
  size: 'Erkek: 30-50 kg, 1.4-2 m / Dişi: 25-40 kg — Gri, siyah, krem renk varyantları',
  territory: '150-1000 km² sürü bölgesi — koşullar ve gıdaya göre değişir',
  lifespan: '6-8 yıl vahşi / 16 yıl esir · Sürüde alfa çifti liderlik eder',
};

const BEHAVIORS = [
  { icon: '🎵', name: 'Ulumayla İletişim', desc: 'Sürü iletişimi ve bölge işaretleme için. Gece maksimum 160 km uzaktan duyulabilir.' },
  { icon: '🏃', name: 'Av Stratejisi', desc: 'Sürü koordinasyonuyla büyük av — geyik, dağ keçisi, koyun. Zamanlama ve sabır kritik.' },
  { icon: '🐾', name: 'Bölge İşaretleme', desc: 'İdrar ve dışkıyla sınır işaretleme. Koku bezleri (ayak arası) iz bırakır.' },
  { icon: '👨‍👩‍👧', name: 'Sürü Yapısı', desc: 'Alfa çifti, yavru ve geçen yılın yavruları. 5-12 birey tipik sürü. Göç eden bireyleri yalnız dolaşır.' },
];

const TRACKS = [
  { part: 'Ön Ayak İzi', desc: '10-13 cm uzun, 8-11 cm geniş — büyük köpekten büyük', color: '#f59e0b' },
  { part: 'Yürüyüş Düzeni', desc: 'Arka ayak tam ön ayak izinin üzerine basar — ekonomik hareket', color: '#3b82f6' },
  { part: 'Dışkı', desc: 'Büyük (2-3 cm çap), kıl ve kemik içerir, ucunda sivri kıvrık', color: '#92400e' },
  { part: 'Scratch Mark', desc: 'Bölge sınırında yerde kazmak — öne ve arkaya çekme', color: '#22c55e' },
];

const REGIONS = [
  { name: 'Doğu Anadolu', density: 'Yüksek', color: '#ef4444', notes: 'Erzurum, Ağrı, Kars — yüksek rakım, geniş çayırlar' },
  { name: 'İç Anadolu', density: 'Orta', color: '#f59e0b', notes: 'Konya, Sivas, Yozgat — koyun ve büyükbaş sürüleriyle çatışma' },
  { name: 'Karadeniz', density: 'Orta', color: '#f59e0b', notes: 'Kastamonu, Karabük — orman sınırı bölgeleri' },
  { name: 'Akdeniz', density: 'Düşük', color: '#22c55e', notes: 'Toros Dağları iç kesimler — izole popülasyonlar' },
  { name: 'Ege & Marmara', density: 'Çok Düşük', color: '#6b7280', notes: 'Yoğun insan etkisi — küçük, izole gruplar' },
];

const CONFLICT_TIPS = [
  { icon: '🐑', tip: 'Ahırları ve ağılları gece kapat — açık bırakmak kurt saldırısını davet eder' },
  { icon: '🐕', tip: 'Koruyucu çoban köpeği (Kangal, Akbaş) sürüler için en etkili çözüm' },
  { icon: '💡', tip: 'Hareketli ışık sistemi ve ses üreteçleri geçici deterent görevi yapar' },
  { icon: '📱', tip: 'İl Tarım Müdürlüğü\'ne haber ver — hasar tazminat hakkı doğabilir' },
  { icon: '🚜', tip: 'Leş ve hayvan atıklarını kapalı depolarda uzaklaştır — gıda kaynağını kes' },
];

export default function WolfGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('info');

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐺 Kurt Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye kurt popülasyonu · iz takibi & insan-kurt çatışması</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[['info', '🐺 Biyoloji'], ['regions', '🗺️ Bölgeler'], ['tracks', '👣 İzler'], ['conflict', '⚠️ Çatışma']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#6b7280' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#6b7280' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 10, fontWeight: 700, cursor: 'pointer', minWidth: '22%',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'info' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 14, padding: '16px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 40 }}>🐺</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>{WOLF_INFO.name}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>Türkiye Yırtıcı Türleri</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7, marginBottom: 10 }}>{WOLF_INFO.desc}</div>
              {[['👥 Popülasyon', WOLF_INFO.population], ['📐 Boyut', WOLF_INFO.size], ['🗺️ Bölge', WOLF_INFO.territory], ['⏳ Ömür', WOLF_INFO.lifespan]].map(([l, v]) => (
                <div key={l} style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>{l}: </span>
                  <span style={{ fontSize: 11, color: '#d1d5db' }}>{v}</span>
                </div>
              ))}
            </div>
            {BEHAVIORS.map(b => (
              <div key={b.name} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{b.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'regions' && REGIONS.map((r, i) => (
          <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: `1px solid ${r.color}33` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>🗺️ {r.name}</div>
              <span style={{ background: r.color + '22', color: r.color, border: `1px solid ${r.color}44`, borderRadius: 20, padding: '2px 10px', fontSize: 10, fontWeight: 700 }}>{r.density}</span>
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{r.notes}</div>
          </div>
        ))}

        {tab === 'tracks' && TRACKS.map((t, i) => (
          <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: `1px solid ${t.color}33` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.color, marginBottom: 4 }}>👣 {t.part}</div>
            <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{t.desc}</div>
          </div>
        ))}

        {tab === 'conflict' && (
          <div>
            <div style={{ background: '#f59e0b15', borderRadius: 12, padding: '12px 14px', border: '1px solid #f59e0b33', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700, marginBottom: 4 }}>⚠️ İnsan-Kurt Çatışması</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>Çatışma genellikle hayvan varlığından kaynaklanır. Hayvancılık kayıplarında devlet tazminat desteği mevcuttur.</div>
            </div>
            {CONFLICT_TIPS.map((c, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{c.tip}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
