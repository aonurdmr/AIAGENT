import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SOUNDS = [
  {
    id: 'danger', name: 'Tehlike Sesleri', icon: '⚠️', accent: '#ef4444',
    desc: 'Hayvan uyarı ve alarm sesleri',
    examples: [
      { animal: 'Geyik', sound: 'Keskin ıslık — tehlike alarmı, tüm sürü kaçar', action: 'Dur, rüzgarı kontrol et, pozisyon al' },
      { animal: 'Yaban domuzu', sound: 'Hırıltı + diş gıcırtısı — saldırı pozisyonu', action: '3m yakınsa hareketsiz dur, ağaç ara' },
      { animal: 'Karga sürüsü', sound: 'Kaotik bağırma — yırtıcı var yakında', action: 'Yırtıcıyı ara — kurt, doğan, insan' },
      { animal: 'Sincap', sound: 'Hızlı tik-tik — insan veya yırtıcı fark etti', action: 'Hareketsiz kal — diğer hayvanlar da duyar' },
    ],
    tip: 'Kuş sessizliği de bir sinyaldir — yakınında büyük hayvan var olabilir.',
  },
  {
    id: 'activity', name: 'Aktivite Sesleri', icon: '🟢', accent: '#22c55e',
    desc: 'Normal davranış ve beslenme sesleri',
    examples: [
      { animal: 'Geyik kızışma', sound: 'Derin homurtu (belling) — erkek nada başında', action: 'Sezon: Kasım — nada noktasına yaklaş' },
      { animal: 'Domuz sürüsü', sound: 'Kök kazma ve homurtu — beslenme', action: 'Rüzgar arkana al, yaklaş' },
      { animal: 'Alabalık', sound: 'Yüzey sıçrama sesi — böcek yiyor', action: 'Kuru sinek kullan, o noktaya at' },
      { animal: 'Kartal', sound: 'Yüksek sesli ciyaklama — bölge işareti', action: 'Bölgede av hayvanı var demek' },
    ],
    tip: 'Domuz sürüsü kazma sesi — üzerine rüzgar alarak yaklaş.',
  },
  {
    id: 'night', name: 'Gece Sesleri', icon: '🌙', accent: '#6366f1',
    desc: 'Geceleri duyulan hayvan sesleri',
    examples: [
      { animal: 'Baykuş', sound: 'Hu-hu-hu — bölge sahipliği', action: 'Geceleri aktif — küçük kemirgen var' },
      { animal: 'Çakal sürüsü', sound: 'Yüksek ulumaçağrı — grup koordinasyonu', action: 'Uzaktan tehlikesiz, yaklaşmayın' },
      { animal: 'Kurt', sound: 'Derin uluma — uzun mesafe iletişim', action: 'Güvenli mesafede tut, ateş yak' },
      { animal: 'Yaban domuzu', sound: 'Gece homurtusu — aktif beslenme', action: 'Termal kamera ile gözlem ideal' },
    ],
    tip: 'Gece seslerini öğren — gündüz görülmeyen hayvanlara gece sesi ile ulaşılır.',
  },
];

export default function WildlifeSounds() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#05080a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔊 Yaban Hayatı Sesleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tehlike · aktivite · gece sesleri — davranış okuma</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SOUNDS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0a0e12', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a0e12', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.examples.map((e, i) => (
                    <div key={i} style={{ marginTop: 10, padding: '8px 10px', background: s.accent + '10', borderRadius: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{e.animal}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>🔊 {e.sound}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>→ {e.action}</div>
                    </div>
                  ))}
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 10 }}>
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
