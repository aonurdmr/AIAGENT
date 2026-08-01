import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'setup', name: 'Tırmanma Pususu Kurma', icon: '🌲', accent: '#22c55e',
    desc: 'Ağaç pususu seçimi ve kurulum',
    tips: [
      'Sağlam ağaç: meşe veya kayın — 30cm+ çap',
      'Yükseklik: 4-6m — hayvan görüş açısı altı',
      'Rüzgarı değerlendir: rüzgar aşağıdan yukarı hayvan yönünde olsun',
      'Av yolu veya beslenme alanına bak — 20-30m mesafede',
      'Silüeti boz: arka taraf açık gökyüzünde durma',
    ],
    safety: 'Emniyet kemeri zorunlu — her tırmanışta bağla',
  },
  {
    id: 'blind', name: 'Yer Pusası (Ground Blind)', icon: '🏕️', accent: '#f59e0b',
    desc: 'Kamuflajlı yer pususu kullanımı',
    tips: [
      'Pop-up blind: 2 dak kurulum · taşınabilir',
      'Kokuyu emer — iç yüzey karbon filtreli modeller',
      'Pencere açıklığı: hayvan seviyesinde — dizden atış için',
      '48 saat önceden kur — hayvanlar alışsın',
      'İçinde hareket azalt — hayvan 20m yakınında',
    ],
    safety: 'Ateş yönü: belirsiz arkada yok — açık hedef alanı',
  },
  {
    id: 'timing', name: 'Pusu Zamanı', icon: '⏰', accent: '#06b6d4',
    desc: 'En etkili pusu saatleri',
    tips: [
      'Şafak: 30 dak önceden konumlan — hayvan hareketi sabah zirvesi',
      'Kızışma dönemi: sabah dışında gün boyu aktif',
      'Akşam: günbatımı 2 saat — beslenme yoluna in',
      'Öğle molası: çıkma ya da hareketsiz kal — saat 10-14 arası',
      'Soğuk hava: gün boyu aktif — sıcak kıyafet şart',
    ],
    safety: 'Gün batımında ineceksen ışık hazırla — karanlık tırmanış tehlikeli',
  },
];

export default function TreeStand() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040c06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌲 Pusu Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tırmanma pususu · yer pusası · zamanlama</div>
      </div>

      <div style={{ background: '#1a1006', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f59e0b33' }}>
        <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>🔐 GÜVENLİK</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Tırmanma pususunda emniyet kemeri her zaman bağlı olmalı. Düşme hayatta en büyük av kazası nedenidir.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#080e08', borderRadius: open ? '12px 12px 0 0' : 12,
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
                <div style={{ background: '#080e08', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 TEKNİK</div>
                  {t.tips.map((tip, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {tip}</div>)}
                  <div style={{ background: '#ef444415', borderRadius: 8, padding: '6px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#fca5a5' }}>🔐 {t.safety}</div>
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
