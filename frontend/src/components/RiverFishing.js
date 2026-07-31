import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RIVERS = [
  { id: 'firtina', name: 'Fırtına Çayı', region: 'Rize', type: 'Dağ deresi', length: '67 km', fish: ['Dere Alabalığı', 'Kayabalığı'], season: 'Nisan–Temmuz', diff: 'Orta', accent: '#3b82f6', tip: 'Çay bahçeleri arasından geçer. Sabah sisi ile birlikte harika bir atmosfer.' },
  { id: 'yesilirmak', name: 'Yeşilırmak', region: 'Tokat–Samsun', type: 'Büyük ırmak', length: '519 km', fish: ['Yayın', 'Sazan', 'Siraz'], season: 'Ekim–Şubat', diff: 'Kolay', accent: '#22c55e', tip: 'Alt havzada yayın balığı rekoru potansiyeli var. Tekneli gidilmesi önerilir.' },
  { id: 'coruh', name: 'Çoruh Nehri', region: 'Artvin–Erzurum', type: 'Dağ ırmağı', length: '431 km', fish: ['Alabalık', 'Sazan', 'Siraz'], season: 'Mayıs–Ağustos', diff: 'Zor', accent: '#f97316', tip: 'Rafting güzergahı. Alabalık için nehrin üst kollarına çıkın.' },
  { id: 'kızılırmak', name: 'Kızılırmak', region: 'Sivas–Samsun', type: 'En uzun iç nehir', length: '1355 km', fish: ['Sazan', 'Yayın', 'Turna'], season: 'Yıl boyu', diff: 'Kolay-Orta', accent: '#ef4444', tip: 'Orta ve alt kesimde sazan çok bol. Deltası flamingo bölgesi.' },
  { id: 'menderes', name: 'Büyük Menderes', region: 'Afyon–İzmir', type: 'Serpantin ırmak', length: '584 km', fish: ['Sazan', 'Kefal', 'Yayın'], season: 'Sonbahar-Kış', diff: 'Kolay', accent: '#a78bfa', tip: '"Meander" kavramını dünyaya öğreten nehir. Alt deltada kefal yoğun.' },
  { id: 'koprusu', name: 'Köprüçay', region: 'Antalya', type: 'Dağ ırmağı', length: '180 km', fish: ['Siraz', 'Yayın', 'Kaya Balığı'], season: 'Ekim–Nisan', diff: 'Orta', accent: '#10b981', tip: 'Köprülü Kanyon içinden geçer. Siraz balığı için en önemli Türk ırmağı.' },
];

const TECHNIQUES_RIVER = [
  {
    id: 'upstream', name: 'Akıntıya Karşı Atış', icon: '⬆️', accent: '#3b82f6',
    desc: 'Yemi akıntının yukarısına atarak sürüklenmesini sağla. Alabalık için klasik.',
    rig: 'Hafif ağırlık, kısa lider. İnline float veya float döneminde.',
    tip: 'Balık hep akıntıya karşı bakar. Üstüne gelmez, önünden geçen yemi alır.',
  },
  {
    id: 'slack', name: 'Durgun Yer Avı', icon: '🌀', accent: '#22c55e',
    desc: 'Taşların arkası, büyük taş önü, kıvrım iç tarafı gibi durgun alanlara yem.',
    rig: 'Şamandıra veya dip ağırlığı. Meso akıntıda iyi.',
    tip: 'Büyük balıklar enerji harcamak istemez, dinlendikleri yerde avlanır.',
  },
  {
    id: 'swing', name: 'Swing Tekniği (Sinek)', icon: '🪰', accent: '#f59e0b',
    desc: 'Sineği akıntı karşısına at, ip gerilerek sineği sürüklensin. Islak sinek için.',
    rig: 'Fly line + ıslak sinek. 8-9 ft olta önerilir.',
    tip: 'İp "D" şekli çiziyor. Sineğin doğal sürüklendiği yer balığı iter.',
  },
  {
    id: 'ledgering', name: 'Dip Av (Ledgering)', icon: '⚓', accent: '#ef4444',
    desc: 'Ağır ağırlıkla yemi dibe sabitleme. Yayın ve sazan için.',
    rig: '50–150 gr ağırlık, kısa lider, büyük iğne. Alarm zili şart.',
    tip: 'Gece avında dip av en etkili. Yayın titreşimi sever — büyük yem kümesi.',
  },
];

const FLOW_GUIDE = [
  { level: 'Düşük (kuraklık)', color: '#f59e0b', fishing: 'Zor. Balık gözüküyor ama yaklaşmak zor. İnce hat + küçük yem.', spots: 'Derin havuzlar, gölge alanlar' },
  { level: 'Normal', color: '#22c55e', fishing: 'En iyi koşullar. Tüm teknikler çalışır. Standart takım.', spots: 'Her yer — akıntı çıkışları, durgun köşeler' },
  { level: 'Yükselme (yağmur)', color: '#3b82f6', fishing: 'İlk 2-4 saat çok verimli! Balık aktif. Ardından bulanıklık.', spots: 'Kıyı kenarı, akıntı girişleri' },
  { level: 'Taşkın', color: '#ef4444', fishing: 'Tehlikeli — avlanmayın. Balık dinlenme modunda.', spots: 'Durun, geçsin bekleyin.' },
];

export default function RiverFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('rivers');
  const [sel, setSel] = useState(null);

  const DIFF_COLOR = { 'Kolay': '#22c55e', 'Orta': '#f59e0b', 'Zor': '#ef4444', 'Kolay-Orta': '#84cc16' };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Irmak Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye ırmakları · teknikler & su akıntısı rehberi</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['rivers', '🗺️ Irmaklar'], ['techniques', '🎣 Teknikler'], ['flow', '💧 Akıntı']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#06b6d4' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#06b6d4' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'rivers' && RIVERS.map(r => {
          const open = sel === r.id;
          const dc = DIFF_COLOR[r.diff] || '#6b7280';
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>🌊 {r.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{r.region} · {r.length} · {r.type}</div>
                  </div>
                  <span style={{ background: dc + '22', color: dc, border: `1px solid ${dc}44`, borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>{r.diff}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                      {r.fish.map(f => <span key={f} style={{ background: r.accent + '22', color: r.accent, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{f}</span>)}
                    </div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#6b7280' }}>📅 Sezon:</span> <span style={{ color: '#d1d5db' }}>{r.season}</span></div>
                    <div style={{ background: r.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10, color: r.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                      <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{r.tip}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'techniques' && TECHNIQUES_RIVER.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{t.desc}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#6b7280' }}>🪝 Takım:</span> <span style={{ color: '#d1d5db' }}>{t.rig}</span></div>
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: t.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{t.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'flow' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>Su seviyesi balıkçılığı doğrudan etkiler. DSİ ve akıllı telefon uygulamaları (HydroWatch) ırmak akış verisi sunar.</div>
            </div>
            {FLOW_GUIDE.map((f, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: `1px solid ${f.color}33` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: f.color, marginBottom: 6 }}>💧 {f.level}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4 }}>{f.fishing}</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>📍 {f.spots}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
