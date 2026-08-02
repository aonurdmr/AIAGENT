import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BEHAVIORS = [
  {
    id: 'feeding', name: 'Beslenme Davranışı', icon: '🍽️', accent: '#22c55e',
    desc: 'Balıkların yem arama ve avlanma düzenini anlamak.',
    patterns: [
      'Şafak & alacakaranlık: yüzey beslenmesi zirve',
      'Öğlen saatleri: derinlere çekilir, yavaş beslenme',
      'Soğuk havalarda: metabolizma yavaşlar, az yer',
      'Isı değişimi sonrası: 1-2 saat beslenme patlaması',
    ],
    technique: 'Besleme zirve saatinde yüzey yem ve popper kullan. Öğlen derin dropshotla git.',
    tip: 'Böcek aktivitesi başlarsa balık yüzey yakınına çıkar — sinek avı anı.',
  },
  {
    id: 'spawning', name: 'Yumurtlama Dönemi', icon: '🥚', accent: '#f59e0b',
    desc: 'Üreme döneminde balıklar strese girer ve davranış değişir.',
    patterns: [
      'Sığ, çakıllı ya da kumlu alanlara yığılma',
      'Erkekler agresif — yumurta yatağını korur',
      'Beslenme düşer — hayatta kalma güdüsü önde',
      'Büyük dişiler çevredeki derin sularda bekler',
    ],
    technique: 'Yumurtlama alanına yakın derin sular. Agresif renk jig ve sallayan yem.',
    tip: 'Yumurta döneminde yakalanan balığı bırak — stok için kritik.',
  },
  {
    id: 'migration', name: 'Göç & Mevsimsel Hareket', icon: '🔄', accent: '#06b6d4',
    desc: 'Balıklar mevsime göre habitat değiştirir.',
    patterns: [
      'İlkbahar: sığa çıkar, ısınmak için sığ alanlar',
      'Yaz: derin serin sularda toplanır',
      'Sonbahar: beslenme maks — kış için yağ depolar',
      'Kış: derin sakin sularda kümelenir, minimal hareket',
    ],
    technique: 'Mevsime göre derinliği ayarla. Sonbaharda aktif jig & crank bait etkili.',
    tip: 'Su sıcaklığı 18-22°C arası altın dönem — hemen hemen tüm türler aktif.',
  },
  {
    id: 'structure', name: 'Yapı Tercihı', icon: '🪨', accent: '#a78bfa',
    desc: 'Balıklar belirli yapı ve zemin türlerine yığılır.',
    patterns: [
      'Derinlik geçişleri (break lines) — yem ve av arasında buluşma',
      'Batık ağaçlar ve dallar — sınırlı habitat, yoğun balık',
      'Akıntı kıraç (yavaş-hızlı su geçiş) — alabalık tutar',
      'Beton köprü ayakları — gölge ve akıntı kenarı',
    ],
    technique: 'Yapı üstüne ya da kenarına ver yemi. Dip temas tekniği. GPS ile kaydet.',
    tip: 'Sonbahar yaprak dökümünde batan dallar yeni habitat — hafta içinde balık girer.',
  },
  {
    id: 'pressure', name: 'Av Baskısı Tepkisi', icon: '🎣', accent: '#ef4444',
    desc: 'Yoğun avlanan balıklar davranış değiştirir.',
    patterns: [
      'Bilinen maket yemleri reddeder — doğal yeme döner',
      'Derin sulara çekilir — sığ alan bırakır',
      'Gün içi avlanmayı öğrenir — şafak öncesi ve gece aktif',
      'Küçük hafif terminal tackle gerektirir',
    ],
    technique: 'İnce misina (0.15mm), küçük kanca. Canlı yem ya da gerçeğe yakın yumuşak plastik.',
    tip: 'Hafta sonu kalabalık gölde salı-çarşamba sabahı en az baskılı — avantaj al.',
  },
];

const WATER_TEMPS = [
  { temp: '4-8°C', fish: 'Turna aktif · levrek derin · sazan durur', icon: '🥶' },
  { temp: '8-14°C', fish: 'Alabalık zirve · levrek uyanıyor · sazan hafif', icon: '🌡️' },
  { temp: '14-20°C', fish: 'Tüm türler aktif · yumurtlama dönemi · ideal', icon: '✅' },
  { temp: '20-26°C', fish: 'Sazan zirve · levrek sabah-akşam · derin av', icon: '☀️' },
  { temp: '26°C+', fish: 'Stres dönemi · derine çekil · gece av', icon: '🌡️' },
];

export default function FishBehavior() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('behaviors');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#030e10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Balık Davranışı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 davranış modeli · su sıcaklığı rehberi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['behaviors','Davranışlar'],['temp','Su Sıcaklığı']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#051018', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'behaviors' && BEHAVIORS.map(b => {
          const open = sel === b.id;
          return (
            <div key={b.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : b.id)} style={{
                background: '#051018', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${b.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{b.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#051018', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${b.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: b.accent, fontWeight: 700, marginBottom: 4, marginTop: 8 }}>📋 DAVRANIM DESENLERİ</div>
                  {b.patterns.map((p, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4 }}>• {p}</div>)}
                  <div style={{ background: b.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: b.accent, fontWeight: 700, marginBottom: 3 }}>🎣 TEKNİK</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{b.technique}</div>
                  </div>
                  <div style={{ background: '#0a1a1f', borderRadius: 8, padding: '6px 10px', marginTop: 4 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {b.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'temp' && (
          <div style={{ background: '#051018', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🌡️ Su Sıcaklığı & Balık Aktivitesi</div>
            {WATER_TEMPS.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, paddingBottom: 12, borderBottom: i < WATER_TEMPS.length-1 ? '1px solid #0a2030' : 'none', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#67e8f9' }}>{t.temp}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{t.fish}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
