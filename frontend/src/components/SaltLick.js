import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'types', name: 'Tuzluk Tipleri', icon: '🧂', accent: '#f59e0b',
    items: [
      { t: 'Mineral blok (Press)', d: 'Sıkıştırılmış tuz-mineral blok — 5-25 kg. Yavaş erir, uzun ömür.' },
      { t: 'Granül tuz', d: 'Kaya tuzu granüllü — toprağa karıştır, en çekici.' },
      { t: 'Sıvı mineral', d: 'Konsantre mineral solüsyonu — toprağa dök, hayvan yalayarak alır.' },
      { t: 'Suni geyik kokusu', d: 'Mineral + geyik idrarlı karışım — kızışma için çok çekici.' },
      { t: 'Doğal mineral yatağı', d: 'Bölgede mevcut kil ve mineral toprak — kamera izle.' },
    ],
  },
  {
    id: 'placement', name: 'Yerleştirme', icon: '📍', accent: '#22c55e',
    items: [
      { t: 'Güzergah yakını', d: 'Hayvan yolu veya nada noktasından 20-30m mesafede — rutin ziyaret.' },
      { t: 'Su kaynağı yakını', d: 'Sulak alan kenarı — su ihtiyacıyla birlikte mineral alımı.' },
      { t: 'Gölge ama açık', d: 'Sıcak günde hayvan açığa çıkmaz — gölgeli ama görülebilir alan.' },
      { t: 'Koku yönetimi', d: 'İnsan kokusu en az olan taraftan kur — eldiven şart.' },
      { t: 'Kamera açısı', d: 'Tuzluktan 5-6m uzağa kamera kur — çerçeveleme önceden test et.' },
    ],
  },
  {
    id: 'maintenance', name: 'Bakım ve Takip', icon: '🔧', accent: '#06b6d4',
    items: [
      { t: 'Yenileme', d: 'Blok eriyince veya granül bittikçe ekle — ayda bir kontrol.' },
      { t: 'Kuru tutma', d: 'Tuzluk ıslak kalırsa çabuk erir — üstü kapalı tutucu faydalı.' },
      { t: 'Kamera kontrolü', d: 'Haftada bir kamera kontrol — koku bırakmadan gizlice git.' },
      { t: 'Kış bakımı', d: 'Karda mineral blok erimez — granülle karıştır veya nemlendir.' },
      { t: 'Aktivite analizi', d: 'Kaç ziyaret, hangi tür, hangi saat — av planını buna göre düzenle.' },
    ],
  },
  {
    id: 'animals', name: 'Hangi Türler Kullanır', icon: '🦌', accent: '#a78bfa',
    items: [
      { t: 'Geyik ve karaca', d: 'En sık — mineral ihtiyacı yüksek. Kızışma öncesi çok aktif.' },
      { t: 'Yaban domuzu', d: 'Mineral toprak sever — toprağı eşeler. Sabah ve gece.' },
      { t: 'Tavşan ve kemirgenler', d: 'Küçük türler de kullanır — hayvanın fark etmesini bekle.' },
      { t: 'Türkiye\'de yasal durum', d: 'Tuzluk kurmak çoğu bölgede serbesttir — yem yerine koyma ile karıştırma.' },
    ],
  },
];

export default function SaltLick() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧂 Tuzluk Kurulumu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tuzluk tipleri · yerleştirme · bakım · tür çekimi</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#141408', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.items.length} madde</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#141408', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #201e08' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{item.t}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
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
