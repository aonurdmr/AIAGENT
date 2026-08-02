import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STROKES = [
  {
    id: 'forward', name: 'İleri Kürek', icon: '🚣', accent: '#06b6d4',
    desc: 'Temel ilerleme darbesi',
    steps: [
      'Küreği suya 45 derece ile sok — gövde döndür',
      'Kolu çekerken kalça döndür — tüm gövde güç verir',
      'Kürek su yüzeyinden 30 cm öncesinde çıkar',
      'Tekrar sokma açısı: dirsek su üstünde',
      'Her iki tarafta eşit darbe sayısı — düz gitmek için',
    ],
    tip: 'Kollar değil gövde çeker — yorulmak için yanlış teknik.',
  },
  {
    id: 'j', name: 'J Darbesi', icon: '〽️', accent: '#22c55e',
    desc: 'Tek kürekçi için düz gidiş darbesi',
    steps: [
      'Normal ileri kürek başlat',
      'Çekim sonunda bileği döndür — kürek dışa iter',
      'Hareket J harfi çizer — son anda düzeltme sağlar',
      'Her darbede J yapılır — taraf değiştirme gerekmez',
      'Güçlü J = sola çekiş, hafif J = hafif düzeltme',
    ],
    tip: 'Tek kişilik kanoda J darbesi şart — pratik yapmadan otomatik olmaz.',
  },
  {
    id: 'draw', name: 'Çekme Darbesi', icon: '↔️', accent: '#f59e0b',
    desc: 'Yana doğru hareket',
    steps: [
      'Küreği gemi yanına paralel tut',
      'Kano yanına doğru çek — yana kayma',
      'Hızlı manevra: engel aşmak için',
      'Her iki taraftan çekilirse döndürme olmaz',
      'Bıçak gibi suya gir, kayıktan uzak bölgeden çek',
    ],
    tip: 'Yanaşma ve dar geçiş için en önemli darbe.',
  },
  {
    id: 'back', name: 'Geri Kürek', icon: '↩️', accent: '#a78bfa',
    desc: 'Frenleme ve geri gidiş',
    steps: [
      'Küreği önden sok — ileri kürekle tam ters',
      'İtme hareketi — kano yavaşlar veya geri gider',
      'Hızlı fren: güçlü geri darbe',
      'Tek taraf geri = döndürme etkisi',
      'Her iki taraf geri = tam frenleme',
    ],
    tip: 'Hızlı aktıda engel anında geri kürek hayat kurtarır.',
  },
];

const SAFETY = [
  { icon: '🦺', item: 'Can yeleği', detail: 'Her zaman giy — su sıcaklığı ne olursa olsun' },
  { icon: '⛑️', item: 'Kask (nehir)', detail: 'Hızlı akan nehir ve aktıda zorunlu' },
  { icon: '📍', item: 'Rota planı', detail: 'Birine rotayı bildir — dönüş saatini yaz' },
  { icon: '🌊', item: 'Devirme tekniği', detail: 'Eğer devirirsen küreğe tutun, kanoyla kal' },
  { icon: '🌡️', item: 'Su sıcaklığı', detail: 'Hava sıcak olsa da 10C su hipotermi — dalgıç elbisesi' },
  { icon: '📡', item: 'İletişim', detail: 'Telsiz veya tam şarj telefon — su geçirmez kılıf' },
];

export default function CanoeGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('strokes');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c12', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🛶 Kano Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kürek darbesi · manevralar · güvenlik · nehir kanosu</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['strokes','Darbeler'],['safety','Güvenlik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#041018', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'strokes' && STROKES.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#041018', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041018', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 TEKNİK</div>
                  {s.steps.map((st, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {st}</div>)}
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {s.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'safety' && (
          <div style={{ background: '#041018', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 12 }}>🦺 Kano Güvenliği</div>
            {SAFETY.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SAFETY.length-1 ? '1px solid #081e26' : 'none' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#67e8f9', marginBottom: 2 }}>{s.item}</div>
                    <div style={{ fontSize: 12, color: '#d1d5db' }}>{s.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
