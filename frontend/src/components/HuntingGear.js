import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GUNS = [
  {
    id: 1, name: 'Av Tüfeği (Pompalı)', icon: '🔫', type: 'Tüfek',
    calibers: ['12/70', '12/76', '20/70'],
    game: ['Keklik', 'Bıldırcın', 'Yaban Domuzu', 'Tavşan'],
    range: '35-60 m', weight: '3.0-3.8 kg',
    pros: ['Çok yönlü kullanım', 'Farklı fişek seçeneği', 'Güvenilir mekanizma'],
    cons: ['Yüksek gürültü', 'Ağır yapı'],
    legal: true, license: 'Silah Ruhsatı (5/1-A veya 6/1)',
    desc: 'Türkiye\'de en yaygın av silahı. Farklı av türleri için uygun fişek seçeneği sunar.',
    color: '#f59e0b',
  },
  {
    id: 2, name: 'Av Tüfeği (Yarı Otomatik)', icon: '🔫', type: 'Tüfek',
    calibers: ['12/70', '12/76'],
    game: ['Keklik', 'Yaban Domuzu', 'Tavşan', 'Kaz', 'Ördek'],
    range: '40-60 m', weight: '3.2-3.8 kg',
    pros: ['Hızlı atış kapasitesi', 'Geri tepme absorpsiyonu', 'Tekrar atış kolaylığı'],
    cons: ['Bakım gerektirir', 'Daha pahalı'],
    legal: true, license: 'Silah Ruhsatı (5/1-A veya 6/1)',
    desc: 'Kınalı keklik ve öteberi av için popüler. Türkiye\'de geniş ürün yelpazesi mevcut.',
    color: '#f97316',
  },
  {
    id: 3, name: 'Dürbünlü Tüfek', icon: '🔭', type: 'Tüfek',
    calibers: ['.308 Win', '7×57', '7×64', '6.5 Creedmoor'],
    game: ['Yaban Domuzu', 'Geyik (özel izinle)', 'Karaca'],
    range: '100-400 m', weight: '3.5-5.0 kg',
    pros: ['Uzun menzil hassasiyeti', 'Büyük av için uygun'],
    cons: ['Özel kurs gerektirir', 'Düzenleyici kısıtlamalar'],
    legal: true, license: 'Silah Ruhsatı + DKMP izni',
    desc: 'Büyük av için uzun menzilli hassasiyet. Türkiye\'de yaban domuzu avında yaygın.',
    color: '#3b82f6',
  },
  {
    id: 4, name: 'Çift Namlulu Tüfek', icon: '🔫', type: 'Tüfek',
    calibers: ['12/70', '16/70', '20/70'],
    game: ['Keklik', 'Bıldırcın', 'Çulluk', 'Tavşan'],
    range: '30-50 m', weight: '2.8-3.5 kg',
    pros: ['İki hızlı atış imkanı', 'Basit mekanizma', 'Düşük bakım'],
    cons: ['Sadece 2 atış', 'Eski tasarım'],
    legal: true, license: 'Silah Ruhsatı (5/1-A)',
    desc: 'Geleneksel kınalı keklik avının vazgeçilmezi. Üst-üste veya yan-yana namlulu.',
    color: '#a855f7',
  },
  {
    id: 5, name: 'Hava Tüfeği (PCP)', icon: '💨', type: 'Havalı',
    calibers: ['.177 (4.5mm)', '.22 (5.5mm)'],
    game: ['Güvercin', 'Karga (özel izinle)', 'Küçük kemirgen'],
    range: '30-60 m', weight: '2.5-4.0 kg',
    pros: ['Sessiz atış', 'Düşük işletim maliyeti', 'Ruhsat kolaylığı'],
    cons: ['Sınırlı av türü', 'Dolum gerektirir', 'Düşük menzil'],
    legal: true, license: 'Havali Silah Ruhsatı (55 Joule altı serbest)',
    desc: 'Haşere kontrolü ve küçük av için. Türkiye\'de 55 Joule altı hava tüfeği için ayrı ruhsat yeterli.',
    color: '#22c55e',
  },
];

const AMMO = [
  { cal: '12/70', desc: 'Standart av fişeği', types: ['Saçma (keklik/tavşan)', 'Magnum (yaban domuzu)', 'Slugo (büyük mesafe)'], color: '#f59e0b' },
  { cal: '12/76 (3")', desc: 'Magnum kapasiteli', types: ['Büyük saçma (kaz/ördek)', 'Brenneke slugo'], color: '#f97316' },
  { cal: '.308 Win', desc: 'Popüler merkezi ateş', types: ['FMJ (hedef)', 'SP/HP (av)', 'BTHP (uzun menzil)'], color: '#3b82f6' },
  { cal: '7×57', desc: 'Klasik av kalibresi', types: ['Yumuşak çekirdek (yaban domuzu)', 'Tam metal gömlek'], color: '#a855f7' },
];

const SAFETY_TIPS = [
  'Her silahı dolu olarak kabul edin; namluyu güvenli yöne tutun.',
  'Tetiğe parmak koyma; av görülene kadar fırlatma serbest bırakın.',
  'Silahın ne arkasında, ne yanında; arkaya ne hedeflediğinizi bilin.',
  'Ateşlemeden önce hedefin çevresini ve arkasını kontrol edin.',
  'Silahı arabada nakletmek için kılıf / sandık şarttır.',
  'Depolama: kilit altında, fişeklerden ayrı ve çocuklardan uzakta.',
  'Av sahasına girerken ve araçtan inerken patronu çıkarın.',
  'Alkol kullandıysanız silah kullanmayın.',
];

const CATEGORIES = ['Tümü', 'Tüfek', 'Havalı'];

function GunDetail({ gun, onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1f2937', borderRadius: '20px 20px 0 0', padding: '24px 20px 36px', width: '100%', maxHeight: '85vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 32 }}>{gun.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{gun.name}</div>
            <span style={{ background: gun.color + '33', color: gun.color, borderRadius: 8, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>{gun.type}</span>
          </div>
        </div>
        <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{gun.desc}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <div style={{ background: '#111827', borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>MENZİL</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb', marginTop: 4 }}>{gun.range}</div>
          </div>
          <div style={{ background: '#111827', borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>AĞIRLIK</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb', marginTop: 4 }}>{gun.weight}</div>
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>KALİBRELER</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {gun.calibers.map((c, i) => <span key={i} style={{ background: gun.color + '22', color: gun.color, borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>{c}</span>)}
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>UYGUN AV TÜRLERİ</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {gun.game.map((g, i) => <span key={i} style={{ background: '#374151', color: '#d1d5db', borderRadius: 8, padding: '4px 12px', fontSize: 12 }}>🏹 {g}</span>)}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 600, marginBottom: 6 }}>✓ AVANTAJLAR</div>
            {gun.pros.map((p, i) => <div key={i} style={{ color: '#d1d5db', fontSize: 12, marginBottom: 4 }}>• {p}</div>)}
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 600, marginBottom: 6 }}>✗ DEZAVANTAJLAR</div>
            {gun.cons.map((c, i) => <div key={i} style={{ color: '#d1d5db', fontSize: 12, marginBottom: 4 }}>• {c}</div>)}
          </div>
        </div>

        <div style={{ background: '#1c3461', border: '1px solid #3b82f6', borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>⚖️ YASAL DURUM</div>
          <div style={{ color: '#dbeafe', fontSize: 13 }}>{gun.license}</div>
        </div>
      </div>
    </div>
  );
}

export default function HuntingGear() {
  const navigate = useNavigate();
  const [cat, setCat]         = useState('Tümü');
  const [tab, setTab]         = useState('guns');
  const [selected, setSelected] = useState(null);

  const visible = cat === 'Tümü' ? GUNS : GUNS.filter(g => g.type === cat);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 80 }}>
      <div style={{ padding: '20px 16px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏹 Av Ekipman Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Silah, fişek ve güvenlik bilgileri</div>
        <div style={{ background: '#1c1917', border: '1px solid #92400e', borderRadius: 10, padding: '8px 12px', marginTop: 10, fontSize: 12, color: '#fcd34d' }}>
          ⚠️ Silah kullanımı Türkiye'de 6136 Sayılı Kanun kapsamında ruhsata tabidir.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px 12px' }}>
        {[{ id: 'guns', label: '🔫 Silahlar' }, { id: 'ammo', label: '💥 Fişekler' }, { id: 'safety', label: '🛡️ Güvenlik' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: tab === t.id ? '#f59e0b' : '#1f2937',
            color: tab === t.id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === t.id ? '#f59e0b' : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'guns' && (
        <>
          <div style={{ display: 'flex', gap: 8, padding: '0 16px 12px' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat === c ? '#374151' : '#1f2937',
                color: cat === c ? '#f9fafb' : '#6b7280',
                border: '1px solid', borderColor: cat === c ? '#6b7280' : '#374151',
                borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>{c}</button>
            ))}
          </div>
          <div style={{ padding: '0 16px' }}>
            {visible.map(gun => (
              <div key={gun.id} onClick={() => setSelected(gun)} style={{
                background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 10,
                border: `1px solid ${gun.color}44`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, background: gun.color + '22',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0,
                  }}>{gun.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{gun.name}</div>
                      <span style={{ background: gun.color + '33', color: gun.color, borderRadius: 8, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>{gun.type}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                      {gun.calibers.map((c, i) => <span key={i} style={{ background: '#374151', color: '#d1d5db', borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{c}</span>)}
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>🎯 {gun.range} · ⚖️ {gun.weight}</div>
                    <p style={{ fontSize: 13, color: '#9ca3af', margin: '6px 0 0' }}>{gun.desc.slice(0, 70)}…</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'ammo' && (
        <div style={{ padding: '0 16px' }}>
          {AMMO.map((a, i) => (
            <div key={i} style={{ background: '#1f2937', border: `1px solid ${a.color}44`, borderRadius: 14, padding: 16, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: a.color }}>{a.cal}</div>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>{a.desc}</span>
              </div>
              {a.types.map((t, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ color: a.color }}>▸</span>
                  <span style={{ color: '#d1d5db', fontSize: 13 }}>{t}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === 'safety' && (
        <div style={{ padding: '0 16px' }}>
          <div style={{ background: '#7f1d1d', border: '1px solid #ef4444', borderRadius: 14, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fca5a5', marginBottom: 12 }}>🛡️ TEMEL GÜVENLİK KURALLARI</div>
            {SAFETY_TIPS.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{
                  background: '#ef4444', color: '#fff', borderRadius: '50%',
                  width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                }}>{i + 1}</span>
                <span style={{ color: '#fecaca', fontSize: 13, lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#1c3461', border: '1px solid #3b82f6', borderRadius: 12, padding: 14, fontSize: 13, color: '#dbeafe' }}>
            📞 <strong>Silah kaybı veya çalıntısında:</strong> derhal 156 (Jandarma) veya 155 (Polis) arayın. 24 saat içinde bildirim zorunludur.
          </div>
        </div>
      )}

      {selected && <GunDetail gun={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
