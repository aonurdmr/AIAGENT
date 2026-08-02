import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SIGNS = [
  {
    id: 'tracks', name: 'İz Okuma', icon: '👣', accent: '#a78bfa',
    desc: 'Tırnak izi ve yürüyüş patikaları',
    clues: [
      { s: 'Taze iz (nemli kenar)', m: 'Saatler içinde geçmiş' },
      { s: 'Kuru iz (kırılgan kenar)', m: '12-24 saat önce' },
      { s: 'Büyük tırnak (5cm+)', m: 'Yetişkin erkek (geyik)' },
      { s: 'Çift deri kıstırma izi', m: 'Yavaş veya ağır adım' },
      { s: 'Geniş adım aralığı', m: 'Koşuyor veya kızışma' },
    ],
    tip: 'Islak toprağa bastır — kendi ölçün için referans ol.',
  },
  {
    id: 'rub', name: 'Sürtme (Rub) İşaretleri', icon: '🌲', accent: '#22c55e',
    desc: 'Erkek geyiğin boynuzunu ağaca sürtmesi',
    clues: [
      { s: 'Taze sürtme (nemli, parlak)', m: 'Yakın zamanda — birkaç gün' },
      { s: 'Yüksek sürtme noktası', m: 'Büyük erkek geyik' },
      { s: 'Alçak sürtme', m: 'Genç erkek — dikkat et' },
      { s: 'Sürtme hattı (birden fazla)', m: 'Güzergah rotası' },
      { s: 'Talaş ve kabuk yerde', m: 'Aktif kullanım' },
    ],
    tip: 'Rub hattını haritalandır — geyik bu yolu düzenli kullanır.',
  },
  {
    id: 'scrape', name: 'Nada (Scrape) Noktası', icon: '🦌', accent: '#f97316',
    desc: 'Kızışma döneminde toprak kazıma işareti',
    clues: [
      { s: 'Taze kazıma (nemli toprak)', m: 'Aktif nada — günlük ziyaret' },
      { s: 'Dal üstünde kırık uç', m: 'Licking branch — koku bırakıyor' },
      { s: 'Nada çapı 50cm+', m: 'Dominant erkek' },
      { s: 'Çoklu nada yakınında', m: 'Yoğun kızışma aktivitesi' },
      { s: 'Öğle saati kamera', m: 'Erkek her sabah/akşam kontrol eder' },
    ],
    tip: 'Nada üstüne kamera kur — en güvenilir iz takip noktası.',
  },
  {
    id: 'bed', name: 'Yatak Yeri', icon: '🌿', accent: '#06b6d4',
    desc: 'Dinlenme ve yatma alanları',
    clues: [
      { s: 'Ezilmiş ot (oval şekil)', m: 'Geyik yatağı — büyüklük bilgi verir' },
      { s: 'Güneyli yamaç, rüzgar altı', m: 'Kış yatağı — sıcak konum' },
      { s: 'Sık çalılık içi', m: 'Güvenlik yatağı — stres altında' },
      { s: 'Koku ve saç izi', m: 'Teyit — kıl bırakmış' },
      { s: 'Birden fazla yatak', m: 'Sürü yatağı veya dişi+yavru' },
    ],
    tip: 'Yataktan 150m+ uzak kur. Çok yakın girmek geyiği kaçırır.',
  },
];

export default function DeerScouting() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦌 Geyik Scouting</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İz okuma · rub · nada noktası · yatak bulma</div>
      </div>

      <div style={{ background: '#0a1006', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>📌 SCOUTING ZAMANI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Yaz sonu ağustos-eylül kamera kur. Ekim kızışma öncesi son scouting. Av bölgesinde çok yürüme — koku bırakma.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SIGNS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0a1006', borderRadius: open ? '12px 12px 0 0' : 12,
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
                <div style={{ background: '#0a1006', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 10, marginBottom: 6 }}>🔍 İŞARET VE ANLAMI</div>
                  {s.clues.map((c, i) => (
                    <div key={i} style={{ marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: '#d1d5db', fontWeight: 600 }}>{c.s}: </span>
                      <span style={{ fontSize: 11, color: '#9ca3af' }}>{c.m}</span>
                    </div>
                  ))}
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {s.tip}</div>
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
