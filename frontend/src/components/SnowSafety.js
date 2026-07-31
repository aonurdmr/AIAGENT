import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HAZARDS = [
  {
    id: 'avalanche', name: 'Çığ', icon: '🏔️', accent: '#ef4444', risk: 'Ölümcül',
    desc: 'Türkiye\'de her yıl 5-15 çığ kaynaklı ölüm. Doğu Karadeniz, Doğu Anadolu ve Toros dağlarında aktif çığ bölgeleri.',
    warning: ['Son 24 saatte 30+ cm yeni kar', 'Rüzgar kabarttığı korniş karı', 'Eğim >30° yamaç', 'Isı değişimi (+3 ila -3°C arası)', 'Önceki çığ izleri'],
    action: ['Çığ teçhizatı (transceiver, kürek, sonda) — hiç yoksa o yamaca çıkma', 'Biri geçerken diğerleri güvenli yerde bekle', 'Çığa yakalanırsan ağzını kapat, yüzey kazan', 'Çığ durduğunda anında kurtarma — 15 dk içi hayatta kalma %90'],
    rule: 'Çığ riski 3+ ise tırmanma yok. AFAD ve KGM çığ uyarılarını kontrol et.',
  },
  {
    id: 'blizzard', name: 'Kar Fırtınası (Tipi)', icon: '❄️', accent: '#3b82f6', risk: 'Yüksek',
    desc: 'Görüş mesafesi sıfıra inen kar ve rüzgar kombinasyonu. Yönelme kaybı ve hipotermi riski.',
    warning: ['Ani rüzgar artışı', 'Hava tahmini "tipi" veya "kar fırtınası"', 'Görüşün hızla düşmesi', 'Sıcaklık -10°C altında ve rüzgar 60km/s+'],
    action: ['Hemen sığınak bul — taş arkası, çukur', 'Çadır varsa çift çivi + halatla sabitle', 'Ekip birbirini görme mesafesinde tut', 'Hareket etme — karlık içinde sakin bekle'],
    rule: 'Tipi sırasında navigasyon neredeyse imkansız. Başlamadan önce çık değil — geri dön.',
  },
  {
    id: 'ice', name: 'Buz ve Kör Buz', icon: '🧊', accent: '#06b6d4', risk: 'Orta-Yüksek',
    desc: 'Siyah buz (kör buz) görünmez ama tehlikelidir. Yollar, köprüler ve gölgeli yamaçlarda oluşur.',
    warning: ['Yağmur + -3°C altı', 'Gece ile gün arası ısı farkı (çözülme-donma döngüsü)', 'Gölgeli kuzey yamaçlar', 'Akan su yakını'],
    action: ['Krampon veya yakıcı (microspike) kullan', 'Kısa adımlarla, ağırlık merkezi alçak yürü', 'Baston veya tırmanış sopası denge için', 'Kayarsan çantanı tut — kaymayı yavaşlatır'],
    rule: 'Pamuklu çorap+bot kombinasyonu buz üzerinde slip. Yün ve sentetik taban tek seçenek.',
  },
  {
    id: 'cold', name: 'Soğuk Yaralanmaları', icon: '🥶', accent: '#a78bfa', risk: 'Hayati',
    desc: 'Donma (frostbite) ve hipotermi — ikisi birlikte ölümcül. Rüzgar faktörü sıcaklığı dramatik düşürür.',
    warning: ['Parmaklarda uyuşma ve renk kaybı', 'Düşünmekte güçlük ve koordinasyon bozukluğu', 'Titreme durması (hipotermi son aşama)'],
    action: ['Donmuş uzuv ovalama — damarları patlatır. Vücut ısısıyla ısıt.', 'Islak giysiden çık — kuru ve katmanlı giy', '112 ara — hipotermi tıbbi acil', 'Tatlı sıcak içecek ver (alkol yasak)'],
    rule: 'Pamuklu = ölüm yakınında kalmak için. Sentetik veya yün zemin kat — pamuklu gömlek giyme.',
  },
];

const GEAR = [
  { icon: '🧥', item: 'Katman Sistemi', detail: '1. Termal zemin (yün/sentetik) · 2. Yalıtım (tüy/polar) · 3. Dış kabuk (su geçirmez)' },
  { icon: '🥾', item: 'Kar Botu', detail: 'Su geçirmez, izole, burnu çelik veya kompozit. -20°C ratinge bak.' },
  { icon: '⛏️', item: 'Buz Kazması (Ice Axe)', detail: 'Sert karda dik yamaç için. Kullanımını öğrenmeden kullanma.' },
  { icon: '🧊', item: 'Krampon', detail: '12 dişli teknik çığ için, 6-10 dişli hafif trekking için' },
  { icon: '📡', item: 'Çığ Transceiver', detail: 'Büyük kar sahasında zorunlu — en az bir kişide şarjlı transeiver' },
  { icon: '🌡️', item: 'Termometre', detail: 'İrtifa ve sıcaklık takibi. Dış sıcaklık ve rüzgar kesim sıcaklığı farklı.' },
];

export default function SnowSafety() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('hazards');

  return (
    <div style={{ background: '#060c18', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>❄️ Kar Güvenliği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Çığ · tipi · buz · donma tehlikeleri</div>
      </div>

      <div style={{ margin: '0 16px 12px', background: '#3b82f615', borderRadius: 12, padding: '12px 14px', border: '1px solid #3b82f633' }}>
        <div style={{ fontSize: 12, color: '#3b82f6', fontWeight: 700, marginBottom: 3 }}>❄️ AFAD Çığ Hattı</div>
        <div style={{ fontSize: 12, color: '#d1d5db' }}>Çığ riski bölgelerine gitmeden AFAD 122 hattını veya www.afad.gov.tr/cig sitesini kontrol et.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['hazards','Tehlikeler'],['gear','Ekipman']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#3b82f6' : '#0d1a2e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'hazards' && HAZARDS.map(h => {
          const open = sel === h.id;
          return (
            <div key={h.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : h.id)} style={{
                background: '#0d1a2e', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${h.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 28 }}>{h.icon}</span>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{h.name}</div>
                  </div>
                  <span style={{ background: h.accent + '22', color: h.accent, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>{h.risk}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0d1a2e', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${h.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{h.desc}</div>
                  <div style={{ background: '#1e2d45', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 600, marginBottom: 4 }}>⚠️ UYARI İŞARETLERİ</div>
                    {h.warning.map((w, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}><span style={{ color: '#f59e0b' }}>•</span> {w}</div>)}
                  </div>
                  <div style={{ background: '#1e2d45', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 600, marginBottom: 4 }}>✅ NE YAPILMALI</div>
                    {h.action.map((a, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3, display: 'flex', gap: 8 }}>
                        <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {a}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: h.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: h.accent, fontWeight: 600, marginBottom: 3 }}>📌 KURAL</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6, fontStyle: 'italic' }}>{h.rule}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'gear' && (
          <div style={{ background: '#0d1a2e', borderRadius: 14, padding: 14, border: '1px solid #3b82f622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6', marginBottom: 10 }}>🎒 Kar Ekipmanı</div>
            {GEAR.map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, paddingBottom: 12, borderBottom: i < GEAR.length-1 ? '1px solid #1e2d45' : 'none' }}>
                <span style={{ fontSize: 22 }}>{g.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#3b82f6' }}>{g.item}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2, lineHeight: 1.5 }}>{g.detail}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
