import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPORTS = [
  {
    id: 1, name: 'Kano / Kayak', icon: '🛶', category: 'Kürek',
    difficulty: 'Başlangıç–Orta', season: [4,5,6,7,8,9,10],
    desc: 'Nehir, göl ve kıyı sularında deneyimlenebilen popüler su sporu. Türkiye\'de Köprülü Kanyon ve Dalaman nehirleri ünlüdür.',
    equipment: ['Kano veya kayak teknesi', 'Çift uçlu kürek', 'Can yeleği', 'Su geçirmez çanta', 'Miğfer (nehirde)'],
    locations: ['Köprülü Kanyon (Antalya)', 'Dalaman Nehri', 'Sakarya Nehri', 'Melen Çayı (Düzce)', 'Fırtına Deresi (Rize)'],
    tips: ['Can yeleği mutlaka giyilmeli', 'Nehir derecelendirmesini öğrenin (Cl I-VI)', 'İlk deneyimlerde rehberli tur tercih edin'],
    color: '#06b6d4',
  },
  {
    id: 2, name: 'Rafting', icon: '🌊', category: 'Kürek',
    difficulty: 'Başlangıç–İleri', season: [4,5,6,7,8,9],
    desc: 'Adrenalin yüklü nehir aktivitesi. Cl III-IV derece nehirler en popüler. Türkiye\'de dünya standartlarında güzergahlar mevcut.',
    equipment: ['Şişme bot', 'T-kürek', 'Miğfer', 'Can yeleği', 'Neopren wetsuit (soğuk suda)'],
    locations: ['Köprülü Kanyon (Antalya)', 'Dalaman (Muğla)', 'Çoruh Nehri (Artvin)', 'Zamantı (Kayseri)', 'Barhal Çayı (Artvin)'],
    tips: ['Mutlaka deneyimli rehber eşliğinde gidin', 'Su seviyesi yüksekse vazgeçin', 'Kürek teknikleri öğrenin'],
    color: '#3b82f6',
  },
  {
    id: 3, name: 'Tüplü Dalış', icon: '🤿', category: 'Dalış',
    difficulty: 'Orta', season: [5,6,7,8,9,10],
    desc: 'Türkiye\'nin Ege ve Akdeniz kıyıları dünyanın en güzel dalış noktalarına ev sahipliği yapıyor. Antik sualtı kalıntıları eşsiz.',
    equipment: ['Dalış kıyafeti', 'Regülatör', 'BCD (dalış yeleği)', 'Tüp', 'Maske-palet-snorkel', 'Dive bilgisayarı'],
    locations: ['Kaş (Antalya)', 'Bodrum (Muğla)', 'Çeşme (İzmir)', 'Marmaris', 'Fethiye Mavi Mağara', 'Alanya'],
    tips: ['PADI veya SSI sertifikası alın', 'Yalnız dalış yapmayın — buddy sistemi', 'Dekompresyon kurallarına uyun'],
    color: '#1d4ed8',
  },
  {
    id: 4, name: 'Serbest Dalış', icon: '🧘', category: 'Dalış',
    difficulty: 'Orta–İleri', season: [5,6,7,8,9,10],
    desc: 'Tek nefeste derinliğe inen doğal dalış sanatı. Ege\'de antik denizciler tarafından geliştirilmiş köklü bir gelenek.',
    equipment: ['Monofin veya uzun palet', 'Wetsuit', 'Maske', 'Ağırlık kemeri', 'Güvenlik şamandırası'],
    locations: ['Kaş', 'Bodrum', 'Çeşme', 'Ölüdeniz', 'Gökova Körfezi'],
    tips: ['AIDA kursuna katılın', 'İlk 2 yıl yalnız dalış yapmayın', 'Hiperventilasyondan kaçının'],
    color: '#7c3aed',
  },
  {
    id: 5, name: 'Sörf / Kitesurf', icon: '🏄', category: 'Sörf',
    difficulty: 'Orta–İleri', season: [4,5,6,7,8,9,10],
    desc: 'Alaçatı Türkiye\'nin sörf başkenti. İzmir açıklarında istikrarlı Meltemi rüzgarı uçurtmalı sörf için dünya standartlarında.',
    equipment: ['Sörf tahtası', 'İp (leash)', 'Wetsuit', 'Kiteboard (kitesurf için)', 'Uçurtma + bar (kitesurf)'],
    locations: ['Alaçatı (İzmir) — Kitesurf', 'Akyaka (Muğla) — Windsurf', 'Çeşme', 'Foça (İzmir)', 'Gökova Körfezi'],
    tips: ['Rüzgar yönünü ve kuvvetini öğrenin', 'Başlangıçta düz su tercih edin', 'Kitesurf için mutlaka eğitim alın'],
    color: '#f59e0b',
  },
  {
    id: 6, name: 'Stand-Up Paddleboard', icon: '🏊', category: 'Kürek',
    difficulty: 'Başlangıç', season: [4,5,6,7,8,9,10],
    desc: 'SUP olarak bilinen aktivite hem spor hem meditasyon. Sakin körfezlerde ve göllerde ideal, manzara içinde kürekle ilerleme.',
    equipment: ['SUP tahtası', 'Ayarlanabilir kürek', 'Ayak halatı', 'Can yeleği', 'Güneş koruyucu'],
    locations: ['Ölüdeniz', 'Göcek körfezleri', 'Bodrum koyu', 'Marmaris körfezi', 'Sapanca Gölü'],
    tips: ['Önce dizlerinizin üstünde dengeleyin', 'Sakin sulardan başlayın', 'Yüksek dalga ve rüzgarda girmeyin'],
    color: '#22c55e',
  },
  {
    id: 7, name: 'Açık Su Yüzme', icon: '🏊', category: 'Yüzme',
    difficulty: 'Başlangıç–Orta', season: [5,6,7,8,9,10],
    desc: 'Türkiye\'nin 8.000 km\'lik kıyısında muhteşem açık su yüzme lokasyonları. Mavi bayraklı plajlarda güvenli yüzme deneyimi.',
    equipment: ['Yüzme gözlüğü', 'Yüzme başlığı', 'Güneş koruyucu', 'Şamandıra boya (görünürlük için)'],
    locations: ['Patara Plajı (Antalya)', 'Saros Körfezi (Edirne)', 'Kabak Koyu (Muğla)', 'Çıralı (Antalya)', 'Şile (İstanbul)'],
    tips: ['Tek başına yüzmeyin', 'Akıntı yönünü öğrenin', 'Boya kullanarak görünür olun'],
    color: '#84cc16',
  },
  {
    id: 8, name: 'Yat / Yelkenli', icon: '⛵', category: 'Denizcilik',
    difficulty: 'Orta–İleri', season: [4,5,6,7,8,9,10],
    desc: 'Ege ve Akdeniz\'in koylarında mavi tur. Mavi bayrak marinaları, rüzgar koridorları ve antik limanlarla dolu eşsiz deneyim.',
    equipment: ['Can yeleği (zorunlu)', 'EPIRB/PLB', 'VHF telsiz', 'Deniz haritası', 'Ilkyardım kiti'],
    locations: ['Bodrum - Marmaris güzergahı', 'Fethiye – Olympos', 'Çeşme – Foça koridoru', 'Göcek Körfezi', 'Gökova – Knidos'],
    tips: ['Hava durumu tahminlerini takip edin', 'BMA denizcilik lisansı alın', 'Acil iletişim: 156 Sahil Güvenlik'],
    color: '#0ea5e9',
  },
];

const CATEGORIES = ['Tümü', 'Kürek', 'Dalış', 'Sörf', 'Yüzme', 'Denizcilik'];
const MONTHS_TR  = ['Oc', 'Şb', 'Mr', 'Ns', 'My', 'Hz', 'Tm', 'Ağ', 'Ey', 'Ek', 'Ks', 'Ar'];

function SeasonBar({ months }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {MONTHS_TR.map((m, i) => (
        <div key={i} style={{
          flex: 1, height: 6, borderRadius: 3,
          background: months.includes(i + 1) ? '#06b6d4' : '#374151',
        }} title={m} />
      ))}
    </div>
  );
}

function SportDetail({ sport, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200,
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1f2937', borderRadius: '20px 20px 0 0', padding: '24px 20px 36px',
        width: '100%', maxHeight: '85vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 40 }}>{sport.icon}</span>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#f9fafb' }}>{sport.name}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <span style={{ background: sport.color + '33', color: sport.color, borderRadius: 10, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
                {sport.category}
              </span>
              <span style={{ background: '#374151', color: '#d1d5db', borderRadius: 10, padding: '2px 10px', fontSize: 11 }}>
                {sport.difficulty}
              </span>
            </div>
          </div>
        </div>

        <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{sport.desc}</p>

        <div style={{ background: '#111827', borderRadius: 12, padding: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>AKTİF SEZON</div>
          <SeasonBar months={sport.season} />
          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
            {MONTHS_TR.map((m, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 8, color: sport.season.includes(i + 1) ? '#06b6d4' : '#4b5563' }}>{m}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>GEREKLİ EKİPMAN</div>
          {sport.equipment.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
              <span style={{ color: sport.color }}>✓</span>
              <span style={{ color: '#d1d5db', fontSize: 13 }}>{e}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>TÜRKİYE'DE EN İYİ NOKTALAR</div>
          {sport.locations.map((l, i) => (
            <div key={i} style={{
              background: '#374151', borderRadius: 8, padding: '6px 12px',
              marginBottom: 6, fontSize: 13, color: '#d1d5db',
              display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <span>📍</span> {l}
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>UZMAN İPUÇLARI</div>
          {sport.tips.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
              <span style={{ color: '#f59e0b', fontSize: 14, marginTop: 1 }}>•</span>
              <span style={{ color: '#d1d5db', fontSize: 13 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WaterSports() {
  const navigate = useNavigate();
  const [cat, setCat]         = useState('Tümü');
  const [selected, setSelected] = useState(null);

  const visible = cat === 'Tümü' ? SPORTS : SPORTS.filter(s => s.category === cat);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 80 }}>
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #1e3a5f 100%)',
        padding: '24px 16px 32px',
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#7dd3fc', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 24, fontWeight: 700 }}>🌊 Su Sporları Rehberi</div>
        <div style={{ fontSize: 13, color: '#7dd3fc', marginTop: 4 }}>8 spor dalı · Türkiye\'nin en iyi noktaları</div>
      </div>

      <div style={{ padding: '12px 16px 8px', overflowX: 'auto', display: 'flex', gap: 8 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            background: cat === c ? '#06b6d4' : '#1f2937',
            color: cat === c ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: cat === c ? '#06b6d4' : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600,
            whiteSpace: 'nowrap', cursor: 'pointer',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ padding: '8px 16px' }}>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{visible.length} spor dalı</div>
        {visible.map(sport => (
          <div key={sport.id} onClick={() => setSelected(sport)} style={{
            background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 12,
            border: `1px solid ${sport.color}44`, cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: sport.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, flexShrink: 0,
              }}>{sport.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb' }}>{sport.name}</div>
                  <span style={{
                    background: sport.color + '33', color: sport.color,
                    borderRadius: 10, padding: '2px 10px', fontSize: 11, fontWeight: 700,
                  }}>{sport.category}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3 }}>⚡ {sport.difficulty}</div>
                <div style={{ marginTop: 8 }}>
                  <SeasonBar months={sport.season} />
                </div>
                <p style={{ fontSize: 13, color: '#9ca3af', margin: '8px 0 0', lineHeight: 1.5 }}>
                  {sport.desc.slice(0, 90)}…
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && <SportDetail sport={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
