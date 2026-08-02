import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'calls', name: 'Kaz Cagrisi', icon: '🦢', accent: '#60a5fa',
    items: [
      { t: 'Klakson ses', d: 'Temel kaz sesi. Agzı dar boruyla derin, genis rezonans. Asla cok yuksek.' },
      { t: 'Heyecan cagrisi', d: 'Hizli tekrar eden iki notali ses. Ucan kaza "yukarida arkadas var" mesajı.' },
      { t: 'Muhabbetlesen kaz', d: 'Alcak muruldayan ses. Kazsın tamamen guven hissettigi ortamda cikarir.' },
      { t: 'Uyari cagrisi', d: 'Sert, kisa gagaklama. Kaz bu sesi duyarsa kacmaya hazirlanir.' },
    ],
  },
  {
    id: 'decoy', name: 'Heykel & Pusu', icon: '🎯', accent: '#f97316',
    items: [
      { t: 'Heykel dizilimi', d: 'U sekli veya J kavis: dogu yaklasim yolu icin kapı bos birak.' },
      { t: 'Yuzey yansimasi', d: 'Heykel mat olmali. Parlama geregi kacar. Nem tutmayan materyal.' },
      { t: 'Pusu yeri', d: 'Sazlik, mısır tarla kenari ya da hendek. Siluet kaldirim olmamali.' },
      { t: 'Sabah avantaji', d: 'Kaz gunde beslenmek icin ilk 2 saat hareket eder. Sahadaki en verimli an.' },
    ],
  },
  {
    id: 'season', name: 'Mevsim & Alanlar', icon: '📅', accent: '#22c55e',
    items: [
      { t: 'Goc takvimi', d: 'Ekim-Kasım: goc zirvesi. Subat: geri don hareketi. Turk sınırı gec doğu yolu.' },
      { t: 'Sulak alanlari', d: 'Aciksu golu, nehir kavsi, pirinc tarlalari: yemek duraklari.' },
      { t: 'Hava etkisi', d: 'Soguk ve yagmurlu gun: kaz dusuk uc. Sicak ve ruzgarsiz: yuksek ucus.' },
      { t: 'Yasal sezon', d: 'Kaz avı ilgili bolge yönetmeliğine tabidir. Sezon ve adet limiti kontrol et.' },
    ],
  },
];

export default function WildGoose() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦢 Yabani Kaz Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Cagri · heykel · mevsim</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#041018', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041018', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #081828' : 'none' }}>
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
