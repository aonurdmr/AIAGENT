import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TECHNIQUES = [
  {
    id: 'basic', name: 'Temel Trol Avı', icon: '⛵', accent: '#06b6d4',
    desc: 'Tekne arkasında yem sürükleyerek av',
    speed: '3-6 km/saat',
    steps: [
      'Yemi tekneden 30-100m geride bırak',
      'Derinlik kontrolü: kurşun ağırlık veya downrigger',
      'Hız: lure tipine göre 3-6 km/h',
      'Derin su: ağır ağırlık + derin vurucu crankbait',
      'Zig-zag hareket: yem hızlanır-yavaşlar — daha çekici',
      'Rod tutucuya yerleştir — büküm anını gözle',
    ],
    species: 'Alabalık, turna, levrek, sudak',
    tip: 'Renk değişkeni önemli — her saat başı farklı renk dene.',
  },
  {
    id: 'downrigger', name: 'Downrigger Trolü', icon: '⚓', accent: '#a78bfa',
    desc: 'Ağırlıklı top ile belirli derinlikte trol',
    speed: '3-5 km/saat',
    steps: [
      'Downrigger topu: 2-7 kg, ayarlı derinlik',
      'Misina: ağırlık topuna klips ile bağlı',
      'Yem topun 1-5m gerisinde — yüzeyde görünmez',
      'Balık çekince klips serbest kalır — serbestçe savaş',
      'Ekran derinlikte balık sürüsü varsa downrigger oraya',
      'Sonar ile dip ve sürü konumu teyit et',
    ],
    species: 'Derin göl alabalığı, turna (derin), sudak',
    tip: 'Downrigger olmadan 30m+ derinliğe inmek mümkün değil.',
  },
  {
    id: 'planer', name: 'Planer Board ile Geniş Alan', icon: '🪁', accent: '#22c55e',
    desc: 'Tekneden yana açılan tahta ile geniş tarama',
    speed: '4-7 km/saat',
    steps: [
      'Planer board: 15-30m yana açılır',
      'Her iki yana board ile 60m genişlik kapar',
      'Birden fazla rod — farklı renk ve derinlik',
      'Board düşerse balık kaptı — hızla çek',
      'Tarama geometrisi: teknesi önünde V şekli',
      'Büyük göllerde standart teknik — sürü tarama',
    ],
    species: 'Lüfer, kolyoz, yazılı turna',
    tip: 'Planer board ile aynı anda 4-6 rod aktifte — verim artar.',
  },
  {
    id: 'sea', name: 'Deniz Trolü', icon: '🌊', accent: '#f97316',
    desc: 'Açık denizde büyük av balıkçılığı',
    speed: '8-14 km/saat (hızlı trol)',
    steps: [
      'Sahte yem (skirt lure): yüzey kıran, balık karıştırır',
      'Hız: 8-14 km/h — kalamar ve sürü bölgesi',
      'Rod: offshore rod 80-130lb sınıfı',
      'Outrigger: tekneden yana açılan uzun çubuk',
      'Makara: 80W+ elektrikli veya elle çevir',
      'GPS ile başarılı noktayı kaydet — tekrar gel',
    ],
    species: 'Palamut, bonito, orkinos, kılıç balığı',
    tip: 'Kuş sürüsü = altında balık var — hemen o bölgeye git.',
  },
];

export default function TrollingGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⛵ Trol Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Temel trol · downrigger · planer board · deniz trolü</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TECHNIQUES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#041018', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                  <div style={{ fontSize: 9, color: t.accent, fontWeight: 700 }}>{t.speed}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041018', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 TEKNİK</div>
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
