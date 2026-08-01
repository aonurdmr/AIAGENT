import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'handling', name: 'Doğru Tutma', icon: '🤲', accent: '#22c55e',
    tips: [
      { t: 'Islak el', d: 'Kuru el balığın koruyucu balçığını (slime) siler — önce elini ıslatı.' },
      { t: 'Süre', d: 'Suda tutma kadar hızlı: 30-60 saniye maksimum hava maruziyeti.' },
      { t: 'Kanca bölgesi', d: 'Solungaç ve göze dokunma — iç kanama ile ölüm.' },
      { t: 'Dikey tutma', d: 'Büyük balığı ağızdan dikey tutma — omurga gerilir. Yatay tut.' },
      { t: 'Net kullanımı', d: 'Naylon ağ koruyucu balçığı alır — lastik veya yumuşak mesh ağ kullan.' },
    ],
  },
  {
    id: 'hook', name: 'Kanca Çıkarma', icon: '🪝', accent: '#f59e0b',
    tips: [
      { t: 'Barbsız kanca', d: 'Barb sıkıştır veya barbsız kullan — kanca kolay çıkar, yaralanma az.' },
      { t: 'Uzun burun pens', d: 'Derin yutulmuş kancayı çıkar — elle dokunma az.' },
      { t: 'Derine yutulmuş', d: 'Misina kes, kancayı bırak — çıkarmak daha çok zarar verir.' },
      { t: 'Çabuk çıkar', d: 'Balık su dışındayken hız önemli — gecikmede stres artar.' },
      { t: 'Kaçar mı', d: 'Kanca çıkınca balık kaçmaya çalışırsa güçlü — bırak.' },
    ],
  },
  {
    id: 'revive', name: 'Canlandırma', icon: '💧', accent: '#06b6d4',
    tips: [
      { t: 'Su içinde tut', d: 'Kancayı çıkarınca balığı hemen suya al — tam batır.' },
      { t: 'Akıntıya karşı', d: 'Nehirde başını akıntıya çevir — solunum için su solungaçtan geçer.' },
      { t: 'İleri-geri', d: 'Durgun suda balığı yavaşça ileri-geri sürükle — su hareketi.' },
      { t: 'Ne kadar', d: 'Balık güçlü kaçana kadar tut — 30 saniye ile 5 dakika.' },
      { t: 'Bırakma zamanı', d: 'Güçlü kaçmaya çalışıyorsa hazır. Yüz üstü döküyorsa canlandırmaya devam.' },
    ],
  },
  {
    id: 'conditions', name: 'Uygun Koşullar', icon: '🌡️', accent: '#ef4444',
    tips: [
      { t: 'Su sıcaklığı', d: '24 derece üstü: alabalık için stres çok yüksek — yakala-bırak uygun değil.' },
      { t: 'Savaş süresi', d: 'Uzun savaş balığı yorar — güçlü olta ile kısa sürede çek.' },
      { t: 'Derin su', d: 'Derin kılan çıkan balık: barotravma riski — iğne ile swim bladder boşalt.' },
      { t: 'Balık neden ölür', d: 'Slime kaybı + sıcaklık + uzun hava maruziyeti + kanca yaralanması.' },
      { t: 'YK-B etik', d: 'Saygı ile bir defa, birden fazla kez aynı balığı yakalama.' },
    ],
  },
];

export default function CatchRelease() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c0a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Yakala-Bırak Teknikleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Doğru tutma · kanca çıkarma · canlandırma · etik</div>
      </div>

      <div style={{ background: '#041412', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>🌍 NEDEN ÖNEMLİ</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Yakala-bırak doğru yapılırsa balık zarar görmeden gider. Yanlış yapılırsa birkaç saat içinde ölür. Teknik fark yaratır.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#041412', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.tips.length} önemli nokta</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041412', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.tips.map((tip, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #081e16' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{tip.t}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{tip.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
