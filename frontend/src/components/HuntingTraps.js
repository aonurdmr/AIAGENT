import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TRAP_TYPES = [
  {
    id: 'camera', name: 'Kamera Tuzakları', icon: '📷', accent: '#22c55e',
    purpose: 'Hayvan varlığı & davranış tespiti',
    setup: [
      'Hayvan izi veya geçiş güzergahına yerleştir',
      'Zemine veya ağaca sabitle — kameraya paralel iz',
      'Lens yüksekliği: hedef hayvanın omuz hizası',
      'Tetikleme hassasiyetini maksimuma al',
    ],
    tips: ['Batarya ömrü: hücre pil yerine lityum pil kullan', 'SD kart haftalık kontrol', 'Koku bırakma — eldiven giymeden dokunma', 'Sabah-akşam PIR algılaması için doğuya bakış'],
    legal: 'Özel mülkte izin alınmadan tuzak kurmak yasaktır. Kamuya açık alanlarda yönetmelik var.',
    tip: 'Aynı noktaya iki kamera çapraz kur — hayvan her geçişten belgelenir.',
  },
  {
    id: 'scent', name: 'Koku Tuzakları', icon: '👃', accent: '#f59e0b',
    purpose: 'Hayvanları belirli bölgeye çekme',
    setup: [
      'Rüzgar yönünü belirle — kokuyu rüzgara bırak',
      'Yüksek noktaya koku emdirilmiş bez ya da dal as',
      'Feromon ya da yem kokusu kullan (tür bazlı)',
      'İnsanın koku izini sil — koku giderici sprey',
    ],
    tips: ['Geyik: estrus kokusu ekim için, tarsal bezi en etkili', 'Yaban domuzu: mısır, meşe palamudu, elma', 'Tilki & çakal: fareli koku (çekici, itici değil)', 'Rüzgar solculukta güçlü koku yayılır'],
    legal: 'Türkiye\'de bait station (yem istasyonu) bazı bölgelerde yasak — yerel mevzuatı kontrol et.',
    tip: 'Koku tuzağı kurduğun noktaya kamera tuzak koy — çektiğin hayvanı kaydet.',
  },
  {
    id: 'track', name: 'İz İstasyonu', icon: '🐾', accent: '#06b6d4',
    purpose: 'Hayvan varlığı ve tür tespiti',
    setup: [
      'Geçiş güzergahında yumuşak zemin hazırla',
      'Kum, kil ya da kar — iz tutacak zemin',
      'Alanı düzelt, taş ve dalları temizle',
      'Kısmi örtü ile yağmurdan koru',
    ],
    tips: ['Sabah muayene et — taze iz gösterir', 'Fotoğrafla ve ölçüt koy (çakıl boyutu kıyasla)', 'Tüy, kıl, dışkı al — DNA analizi mümkün', 'Birden fazla geçiş noktası kur — hangi yol aktif?'],
    legal: 'İz istasyonu kurmak serbesttir. Koruma alanlarında ruhsat gerekebilir.',
    tip: 'İz istasyonunun yanına kamera koy ve 2 hafta izle — hangi saatte geçiyor öğren.',
  },
  {
    id: 'call', name: 'Ses Tuzakları', icon: '🔊', accent: '#ef4444',
    purpose: 'Avı çekme — avlanma aracı',
    setup: [
      'Hedef türün sesini bilgisayardan öğren',
      'Elektronik çağrı cihazı ya da ağız çağırıcı',
      'Rüzgara karşı 30-50 m uzağa koy',
      'Sabah veya akşam kullan — hayvan aktif saatler',
    ],
    tips: ['Keklik: bıldırcın türü koçaklaması', 'Yaban domuzu: besleme sesi ya da alarm sesi', 'Karaca: kavuşum dönemi erkek sesi', 'Ses aralıklı çal — 30 dk sessizlik arası'],
    legal: 'Elektronik çağrı cihazı Türkiye\'de bazı türler için yasak — DKMPGM tebliğini kontrol et.',
    tip: 'Ses cihazını hakim rüzgara göre konumlandır — koku yayılımıyla koordineli kullan.',
  },
];

const ETHICS = [
  { icon: '⚖️', rule: 'Ruhsat ve izin', desc: 'Av ruhsatı + özel mülk izni olmadan tuzak kurmak yasak ve cezalı' },
  { icon: '🐾', rule: 'İstenmeyen tür kapanı', desc: 'Kafes tuzak kurulursa günde kontrol zorunlu — yaralı hayvanı bırak' },
  { icon: '🌿', rule: 'Habitat koruması', desc: 'Tuzak alanında habitat bozma ve ağaç zarar verme yasak' },
  { icon: '🦅', rule: 'Koruma altındaki türler', desc: 'Nesli tehlike türlerin geçiş güzergahına tuzak kesinlikle yasak' },
];

export default function HuntingTraps() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0c0a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪤 Av Tuzak Teknikleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 tuzak türü · kurulum, ipucu & yasal bilgi</div>
      </div>

      <div style={{ background: '#1a0a0a', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>⚠️ YASAL UYARI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Türkiye'de av tuzakları yönetmeliğe tabidir. Her tuzak türü için yerel av mevzuatını kontrol edin.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['types','Tuzak Türleri'],['ethics','Etik & Hukuk']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#160e04', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'types' && TRAP_TYPES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#160e04', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.purpose}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#160e04', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginBottom: 4, marginTop: 8 }}>📋 KURULUM</div>
                  {t.setup.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {s}</div>)}
                  <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700, marginBottom: 4, marginTop: 8 }}>💡 İPUÇLARI</div>
                  {t.tips.map((tip, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {tip}</div>)}
                  <div style={{ background: '#1a0a0a', borderRadius: 8, padding: '6px 10px', marginTop: 8, border: '1px solid #ef444433' }}>
                    <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700, marginBottom: 2 }}>⚖️ YASAL</div>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>{t.legal}</div>
                  </div>
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '6px 10px', marginTop: 4 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>🎯 {t.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'ethics' && (
          <div style={{ background: '#160e04', borderRadius: 14, padding: 14, border: '1px solid #f59e0b22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>⚖️ Etik & Hukuki Sorumluluk</div>
            {ETHICS.map((e, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < ETHICS.length-1 ? '1px solid #2a1a08' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{e.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fcd34d' }}>{e.rule}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{e.desc}</div>
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
