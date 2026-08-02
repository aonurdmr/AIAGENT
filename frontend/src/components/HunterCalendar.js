import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SEASONS = [
  {
    id: 'sept_oct', name: 'Eylül – Ekim', icon: '🍂', accent: '#f97316',
    period: 'Erken sezon — kızışma başlangıcı',
    species: ['Karaca (Eylül sonu kızışma)', 'Keklik (1 Eylül açılış)', 'Bıldırcın (Ağustos-Ekim)', 'Yaban domuzu (yıl boyu ruhsatlı bölge)'],
    tips: [
      'Geyik kızışması Eylül sonu — erkek nada (scrape) bırakır',
      'Keklik sürü halinde — sabah erken tarlada',
      'Bıldırcın göç güzergahında yoğun — ekim başı en iyi',
      'Sıcak hava henüz var — sabah 6-9 arası aktivite',
    ],
    gear: 'Hafif kıyafet · 12 kalibre · harita hazır',
  },
  {
    id: 'nov_dec', name: 'Kasım – Aralık', icon: '❄️', accent: '#60a5fa',
    period: 'Yoğun sezon — kızışma zirvesi',
    species: ['Geyik kızışması (Kasım)', 'Domuz en aktif', 'Çulluk göçü', 'Yabani ördek ve kaz (su avi)'],
    tips: [
      'Geyik kızışması Kasım başı zirve — nada çekici çok etkili',
      'Soğuğa bağlı domuz gece hareketi artar — termal işe yarar',
      'Çulluk ıslak orman içi — köpekle veya dalış avı',
      'Ördek subaşı şafakta — çağrı ve tuzak heykeli',
    ],
    gear: 'Su geçirmez kıyafet · termal içlik · el feneri',
  },
  {
    id: 'jan_feb', name: 'Ocak – Şubat', icon: '🌨️', accent: '#a78bfa',
    period: 'Kış sezonu — kar ve soğuk',
    species: ['Yaban domuzu (yıl boyu)', 'Tilki (kürk mevsimi)', 'Su kuşları (kış konukları)', 'Domuz yavrusu yasaklı — dikkat'],
    tips: [
      'Kar üstü taze iz — sabah ilk ışıkta takip',
      'Hayvanlar yem için risk alır — sulak alan ve tarla kenarı',
      'Günler kısa — öğleden sonra erken kapanma',
      'Hipotermi riski yüksek — sığınak planı her zaman hazır',
    ],
    gear: 'Termal katmanlama · kar ayakkabı · acil battaniye',
  },
  {
    id: 'mar_aug', name: 'Mart – Ağustos', icon: '🌿', accent: '#22c55e',
    period: 'Kapalı sezon — çoğu tür',
    species: ['Yaban domuzu (bölge bölge)', 'Bahar bıldırcın göçü (Nisan)', 'Su ürünleri (balık yasaklı dönem)', 'Av yasağı — kontrol et'],
    tips: [
      'Kapalı sezonda yasadışı av ağır ceza getirir',
      'Scouting zamanı — yaz aylarında kamera tuzak kur',
      'Yabani domuz özel bölgede yıl boyu — ruhsatını kontrol et',
      'Bıldırcın göç penceresi — Nisan sonunda 2-3 hafta',
    ],
    gear: 'Kamera tuzak · dürbün · keşif ekipmanı',
  },
];

const LEGAL_NOTES = [
  { icon: '📋', note: 'Tarihler İl Tarım Müdürlüğü tebliğiyle her yıl güncellenir — resmi takvimi kontrol et' },
  { icon: '🏷️', note: 'Av ruhsatı + tür bazlı özel ruhsat zorunlu — eksik belge ağır ceza' },
  { icon: '⚖️', note: 'Sulak alan, milli park ve koruma bölgelerinde av tamamen yasak' },
  { icon: '📍', note: 'İl bazlı farklılıklar — bulunduğun ilin özel düzenlemesini oku' },
];

export default function HunterCalendar() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('seasons');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080a05', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📅 Avcı Takvimi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Sezona göre tür · açık-kapalı dönemler · yasal uyarılar</div>
      </div>

      <div style={{ background: '#140a02', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f9731633' }}>
        <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700 }}>⚠️ YASAL UYARI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Bu takvim genel rehber niteliğindedir. Resmi av takvimi her yıl Tarım Bakanlığı tarafından yayımlanır. Avdan önce mutlaka güncel resmi tebliği oku.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['seasons','Sezonlar'],['legal','Yasal Notlar']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#100c05', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'seasons' && SEASONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#100c05', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.period}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#100c05', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>🎯 AV TÜRLERİ</div>
                  {s.species.map((sp, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {sp}</div>)}
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>💡 İPUÇLARI</div>
                  {s.tips.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {t}</div>)}
                  <div style={{ fontSize: 12, marginTop: 8 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>⚙️ Ekipman: </span><span style={{ color: '#d1d5db' }}>{s.gear}</span></div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'legal' && (
          <div style={{ background: '#100c05', borderRadius: 14, padding: 14, border: '1px solid #f9731622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>⚖️ Yasal Zorunluluklar</div>
            {LEGAL_NOTES.map((l, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < LEGAL_NOTES.length-1 ? '1px solid #1a1205' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{l.icon}</span>
                  <div style={{ fontSize: 12, color: '#d1d5db' }}>{l.note}</div>
                </div>
              </div>
            ))}
            <div style={{ background: '#ef444415', borderRadius: 8, padding: '10px 12px', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#fca5a5' }}>Kaçak avlanma: 1-5 yıl hapis + ağır para cezası. Çevre ve Şehircilik Bakanlığı ihbar hattı: 444 0 532</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
