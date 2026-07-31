import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AREAS = [
  {
    id: 'geyikbayiri', name: 'Geyikbayırı', region: 'Antalya', icon: '🧗', accent: '#ef4444',
    grade: '4a–8c+',
    routes: '300+ rota',
    rock: 'Kireçtaşı — tufa ve dikey yüzeyler',
    season: 'Ekim–Nisan (yaz çok sıcak)',
    access: 'Antalya\'ya 45 dk · kamp mevcut',
    desc: 'Türkiye\'nin ve Avrupa\'nın sayılı world-class tırmanış sahalarından biri. Tufa sütunlar ikonik.',
    tip: 'Kuzey cephe gölgede kalır — yaz döneminde de gidilir. Öğleden sonra Batı yüzeyler güneş alır.',
  },
  {
    id: 'gokcedere', name: 'Gökçedere Vadisi', region: 'Ankara–Beypazarı', icon: '🧗', accent: '#3b82f6',
    grade: '5a–7b',
    routes: '80+ rota',
    rock: 'Kumtaşı — dikine ve aşık geçişler',
    season: 'İlkbahar ve sonbahar',
    access: 'Ankara\'ya 1.5 saat · vidalik yolu',
    desc: 'Orta Anadolu\'nun en erişilebilir tırmanış sahası. Başlangıç ve orta seviye için ideal.',
    tip: 'Sabah erken yola çık — öğleden sonra rüzgar artar. Hava 20°C altında ideal.',
  },
  {
    id: 'cim', name: 'Cim Köyü', region: 'Isparta', icon: '🧗', accent: '#22c55e',
    grade: '5b–7c',
    routes: '60+ rota',
    rock: 'Kireçtaşı — tutamaçlı yüzeyler',
    season: 'Nisan–Kasım',
    access: 'Isparta\'ya 40 dk',
    desc: 'Göller Bölgesi\'nde eşsiz bir tırmanış sahası. Orta ve ileri seviye için çeşitli güzergahlar.',
    tip: 'Taktim varyasyon: güneybatı cephe sabah gölgededir.',
  },
  {
    id: 'uzundere', name: 'Uzundere', region: 'Erzurum', icon: '🧗', accent: '#f59e0b',
    grade: '5a–7a',
    routes: '40+ rota',
    rock: 'Bazalt ve kireçtaşı — kaba tutamak',
    season: 'Mayıs–Eylül',
    access: 'Erzurum\'a 30 dk',
    desc: 'Doğu Anadolu\'nun az keşfedilmiş tırmanış sahası. Yüksek irtem yüzeyler.',
    tip: 'Yüksek irtifada (2000m+) UV yüksektir — güneş koruma şart.',
  },
];

const GRADES = [
  { range: '3–4c', label: 'Başlangıç', color: '#22c55e', desc: 'Ayak tekniği öğrenme, tutunma güveni geliştirme' },
  { range: '5a–5c', label: 'Temel', color: '#84cc16', desc: 'Temel teknikler yerleşmiş, düzenli antrenman' },
  { range: '6a–6c', label: 'Orta', color: '#f59e0b', desc: 'Zorlu tutamak ve koordinasyon teknikleri' },
  { range: '7a–7c', label: 'İleri', color: '#f97316', desc: 'Güç ve kamp çalışması, özel antrenman' },
  { range: '8a+', label: 'Elit', color: '#ef4444', desc: 'Profesyonel seviye — çok az kişi ulaşır' },
];

const SAFETY = [
  { icon: '🪢', tip: 'Emniyet (belay) kontrolünü tırmanmadan önce iki kez yap — hayati önem taşır' },
  { icon: '⛑️', tip: 'Kask her zaman — taş düşmesi için hem tırmanan hem seyirci' },
  { icon: '🔍', tip: 'Ekipman kontrolü: ip bağlantısı, karabin kilidi, ayakkabı bağı' },
  { icon: '⛅', tip: 'Yağmur sonrası ıslak kaya 48 saat tehlikeli — kireçtaşı özellikle' },
  { icon: '💧', tip: 'Tırmanış öncesi aç değil, susuz değil — performans düşer, dikkat azalır' },
  { icon: '📞', tip: 'Acil iletişim planı: birinin konumunu bilmesi şart — 112 koordinat ver' },
];

export default function RockClimbing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('areas');

  return (
    <div style={{ background: '#110e0a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧗 Kaya Tırmanışı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 saha · güzergah, derece & güvenlik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['areas','Sahalar'],['grades','Dereceler'],['safety','Güvenlik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#ef4444' : '#1e1810', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'areas' && AREAS.map(a => {
          const open = sel === a.id;
          return (
            <div key={a.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : a.id)} style={{
                background: '#1e1810', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${a.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 28 }}>{a.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>📍 {a.region} · {a.routes}</div>
                    </div>
                  </div>
                  <span style={{ background: a.accent + '22', color: a.accent, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{a.grade}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1e1810', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${a.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6, marginTop: 8, marginBottom: 6 }}>{a.desc}</div>
                  {[['🪨 Kaya', a.rock], ['📅 Sezon', a.season], ['🚗 Erişim', a.access]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: a.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: a.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: a.accent, fontWeight: 600, marginBottom: 3 }}>💡 PRO İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{a.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'grades' && (
          <div style={{ background: '#1e1810', borderRadius: 14, padding: 14, border: '1px solid #ef444422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginBottom: 12 }}>🏋️ Fransız Derecelendirme Sistemi</div>
            {GRADES.map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottom: i < GRADES.length-1 ? '1px solid #374151' : 'none' }}>
                <div style={{ background: g.color + '22', border: `1px solid ${g.color}44`, borderRadius: 8, padding: '6px 10px', minWidth: 60, textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: g.color }}>{g.range}</div>
                  <div style={{ fontSize: 10, color: g.color }}>{g.label}</div>
                </div>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{g.desc}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'safety' && (
          <div style={{ background: '#1e1810', borderRadius: 14, padding: 14, border: '1px solid #ef444422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', marginBottom: 10 }}>⚠️ Güvenlik Kuralları</div>
            {SAFETY.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{s.tip}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
