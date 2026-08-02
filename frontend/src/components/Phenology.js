import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MONTH_NAMES = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const MONTH_SHORT = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

const EVENTS = [
  { id: 'sakura', name: 'Kiraz–Badem Çiçeği', icon: '🌸', category: 'Bitki', color: '#f472b6', months: [2, 3], region: 'Marmara, Ege', desc: 'Mart başında Bursa Uludağ etekleri, Edirne. Erken yaz habitatının başlangıcı.' },
  { id: 'stork', name: 'Leylek Dönüşü', icon: '🦢', category: 'Kuş', color: '#60a5fa', months: [2, 3], region: 'Tüm Türkiye', desc: 'Mart ortasında Afrika\'dan döner. Trakya köyleri klasik gözlem noktası.' },
  { id: 'swallow', name: 'Kırlangıç Göçü', icon: '🐦', category: 'Kuş', color: '#34d399', months: [3, 4], region: 'Tüm Türkiye', desc: 'Nisan başı yerleşim yerleri yakınında görünür. İlkbaharin simgesi.' },
  { id: 'wildflower', name: 'Yabani Laleler', icon: '🌷', category: 'Bitki', color: '#f87171', months: [3, 4], region: 'İç Anadolu, Doğu', desc: 'Nisan–Mayıs Kapadokya, Nemrut etekleri, Sultansuyu çevresinde.' },
  { id: 'mushroom_spring', name: 'İlkbahar Mantarı', icon: '🍄', category: 'Mantar', color: '#fb923c', months: [3, 4, 5], region: 'Tüm orman bölgeleri', desc: 'Morel ve kuzugöbeği Nisan–Mayıs. Meşe ormanları altında arı.' },
  { id: 'bee_active', name: 'Arı Mevsimi', icon: '🐝', category: 'Böcek', color: '#fbbf24', months: [4, 5, 6, 7, 8], region: 'Tüm çiçekli alanlar', desc: 'Lavanta zamanı (Haziran–Temmuz) Isparta, Karakuyu ovası zirve.' },
  { id: 'turtle_beach', name: 'Caretta Yumurtlama', icon: '🐢', category: 'Sürüngen', color: '#4ade80', months: [5, 6, 7], region: 'Dalyan, İztuzu, Antalya', desc: 'Haziran–Temmuz gece yumurta bırakır. Gündüz çıkmak yasak bazı plajlarda.' },
  { id: 'deer_velvet', name: 'Geyik Kadife Döngüsü', icon: '🦌', category: 'Memeli', color: '#a78bfa', months: [4, 5, 6], region: 'Kazdağı, Kırklareli, Uludağ', desc: 'İlkbahar boynuz büyümesi. Erkek geyikler çok dikkatlidir; yaklaşmayın.' },
  { id: 'harvest', name: 'Üzüm–Zeytin Hasatı', icon: '🍇', category: 'Bitki', color: '#c084fc', months: [8, 9, 10], region: 'Ege, Marmara, Akdeniz', desc: 'Eylül başı üzüm, Ekim–Kasım zeytin. Doğa yürüyüşüyle kombine edin.' },
  { id: 'redkite', name: 'Kızıl Çaylak Göçü', icon: '🦅', category: 'Kuş', color: '#ef4444', months: [8, 9, 10], region: 'Boğaz göç koridoru', desc: 'Eylül–Ekim İstanbul Boğazı üzerinde binlerce yırtıcı kuş geçer.' },
  { id: 'autumn_mushroom', name: 'Sonbahar Mantarı', icon: '🍄', category: 'Mantar', color: '#f97316', months: [9, 10, 11], region: 'Tüm orman bölgeleri', desc: 'En zengin dönem. Çörek otu, kavak mantarı. Ekim zirvesi.' },
  { id: 'rutting', name: 'Kızgınlık Sezonu (Geyik)', icon: '🦌', category: 'Memeli', color: '#b45309', months: [9, 10], region: 'Kazdağı, Uludağ, Kırklareli', desc: 'Eylül–Ekim erkek geyikler gümbürdatır. Sabah ve akşam sesler duyulur.' },
  { id: 'blacksea_anchovy', name: 'Hamsi Sezonu', icon: '🐟', category: 'Balık', color: '#38bdf8', months: [10, 11, 12, 0], region: 'Karadeniz kıyıları', desc: 'Ekim–Şubat en yoğun dönem. Trabzon, Rize hamsi festivalleri.' },
  { id: 'winter_birds', name: 'Kış Misafiri Kuşlar', icon: '❄️', category: 'Kuş', color: '#93c5fd', months: [11, 0, 1], region: 'İç Anadolu, Kapadokya', desc: 'Kuğu, ördek ve balık kartalı Sultan Sazlığı, Tuz Gölü\'ne gelir.' },
];

const CATEGORIES = ['Tümü', 'Bitki', 'Kuş', 'Mantar', 'Böcek', 'Sürüngen', 'Memeli', 'Balık'];

export default function Phenology() {
  const navigate = useNavigate();
  const [curMonth, setCurMonth] = useState(new Date().getMonth());
  const [catFilter, setCatFilter] = useState('Tümü');
  const [tab, setTab] = useState('month');
  const [sel, setSel] = useState(null);

  const monthEvents = EVENTS.filter(e => e.months.includes(curMonth) && (catFilter === 'Tümü' || e.category === catFilter));
  const activeNow = EVENTS.filter(e => e.months.includes(new Date().getMonth()));

  const CAT_COLOR = {
    'Bitki': '#22c55e', 'Kuş': '#60a5fa', 'Mantar': '#f97316', 'Böcek': '#fbbf24',
    'Sürüngen': '#4ade80', 'Memeli': '#a78bfa', 'Balık': '#38bdf8',
  };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Doğa Fenoloji Takvimi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye\'de ay ay doğa olayları</div>
      </div>

      {activeNow.length > 0 && (
        <div style={{ margin: '0 16px 12px', background: '#22c55e15', borderRadius: 12, padding: '10px 14px', border: '1px solid #22c55e33' }}>
          <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700, marginBottom: 4 }}>🌱 BUGÜN AKTİF ({MONTH_NAMES[new Date().getMonth()]})</div>
          <div style={{ fontSize: 12, color: '#d1d5db' }}>{activeNow.map(e => `${e.icon} ${e.name}`).join(' · ')}</div>
        </div>
      )}

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['month', '📅 Aylık Seç'], ['year', '📊 Yıllık Tablo']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#22c55e' : '#1f2937', color: tab === id ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#22c55e' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'month' && (
          <div>
            {/* Month picker */}
            <div style={{ display: 'flex', gap: 4, overflowX: 'auto', marginBottom: 12 }}>
              {MONTH_SHORT.map((m, i) => (
                <button key={i} onClick={() => setCurMonth(i)} style={{
                  background: curMonth === i ? '#22c55e' : '#1f2937',
                  color: curMonth === i ? '#000' : '#6b7280',
                  border: `1px solid ${curMonth === i ? '#22c55e' : '#374151'}`,
                  borderRadius: 10, padding: '6px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
                }}>{m}</button>
              ))}
            </div>

            {/* Category filter */}
            <div style={{ display: 'flex', gap: 4, overflowX: 'auto', marginBottom: 12 }}>
              {CATEGORIES.map(c => {
                const col = c === 'Tümü' ? '#6b7280' : (CAT_COLOR[c] || '#6b7280');
                return (
                  <button key={c} onClick={() => setCatFilter(c)} style={{
                    background: catFilter === c ? col + '22' : 'transparent',
                    color: catFilter === c ? col : '#6b7280',
                    border: `1px solid ${catFilter === c ? col : '#374151'}`,
                    borderRadius: 20, padding: '4px 10px', fontSize: 10, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
                  }}>{c}</button>
                );
              })}
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 8 }}>{MONTH_NAMES[curMonth]} — {monthEvents.length} Olay</div>

            {monthEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
                <div style={{ fontSize: 36 }}>🌿</div>
                <div style={{ marginTop: 8 }}>Bu ayda bu kategoride kayıtlı olay yok</div>
              </div>
            ) : monthEvents.map(e => {
              const open = sel === e.id;
              return (
                <div key={e.id} onClick={() => setSel(open ? null : e.id)} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: `1px solid ${e.color}33`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: open ? 8 : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 24 }}>{e.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{e.name}</div>
                        <div style={{ fontSize: 10, color: '#6b7280' }}>📍 {e.region}</div>
                      </div>
                    </div>
                    <span style={{ background: (CAT_COLOR[e.category] || '#6b7280') + '22', color: CAT_COLOR[e.category] || '#6b7280', borderRadius: 20, padding: '2px 8px', fontSize: 9, fontWeight: 700 }}>{e.category}</span>
                  </div>
                  {open && <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7, paddingTop: 4, borderTop: '1px solid #374151' }}>{e.desc}</div>}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'year' && (
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 560, background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(12, 1fr)', gap: 2, fontSize: 9 }}>
                <div />
                {MONTH_SHORT.map(m => (
                  <div key={m} style={{ textAlign: 'center', color: '#6b7280', fontWeight: 600, padding: '2px 0' }}>{m}</div>
                ))}
                {EVENTS.map(e => (
                  <React.Fragment key={e.id}>
                    <div style={{ fontSize: 10, color: '#d1d5db', display: 'flex', alignItems: 'center', gap: 4, paddingRight: 4 }}>
                      <span>{e.icon}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 90 }}>{e.name}</span>
                    </div>
                    {MONTH_SHORT.map((_, mi) => (
                      <div key={mi} style={{
                        background: e.months.includes(mi) ? e.color + '66' : '#374151',
                        height: 14, borderRadius: 3,
                      }} />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
