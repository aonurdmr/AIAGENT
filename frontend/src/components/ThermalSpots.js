import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPOTS = [
  {
    id: 'pamukkale', name: 'Pamukkale Termal', region: 'Denizli', icon: '🏛️', accent: '#60a5fa',
    temp: '35–100°C', type: 'Kalsiyum karbonatlı', altitude: 160, fish: false,
    camp: true, desc: 'UNESCO Dünya Mirası. Beyaz travertenler ve 36°C sıcak havuz. Yaz aylarında dolup taşar.',
    access: 'Denizli\'den 20 dk. Giriş ücretlidir. Sabah erken en az kalabalık.',
    tip: 'Havuz içinde ayakkabı zorunlu. Doğal kaplıca suyu içilmez.',
  },
  {
    id: 'afyon', name: 'Afyonkarahisar Kaplıcaları', region: 'Afyonkarahisar', icon: '♨️', accent: '#f97316',
    temp: '42–67°C', type: 'Sülfürlü-sodyumlu', altitude: 1020, fish: false,
    camp: false, desc: 'Karahisar, Sandıklı ve Gazlıgöl olmak üzere 3 büyük termal alan. Terapötik sular.',
    access: 'Ankara\'dan 3 saat. Yıl boyu aktif.',
    tip: 'Sandıklı bölgesi romatizma ve deri hastalıkları için önerilir.',
  },
  {
    id: 'bursa', name: 'Bursa Termal Bölgesi', region: 'Bursa', icon: '🌿', accent: '#22c55e',
    temp: '47–78°C', type: 'Radyoaktif mineralli', altitude: 200, fish: false,
    camp: false, desc: 'Çekirge, Oylat ve Gemlik. Osmanlı döneminden beri kullanılan tarihi kaplıcalar.',
    access: 'İstanbul\'dan 2 saat. Metro ile Çekirge kolay.',
    tip: 'Oylat Kaplıcaları (İnegöl) daha sakin ve doğa içinde. Camping mümkün yakında.',
  },
  {
    id: 'kangal', name: 'Kangal Balıklı Çermik', region: 'Sivas', icon: '🐠', accent: '#f59e0b',
    temp: '36–38°C', type: 'Maden suyu + balık', altitude: 1300, fish: true,
    camp: true, desc: 'Garra rufa balıklarının deri hastalıklarını tedavi ettiği dünyaca ünlü termal kaynak.',
    access: 'Sivas\'tan 100 km. Seyircili ziyaret mümkün.',
    tip: 'Balıklı havuza girmek için randevu ve sağlık onayı gerekebilir.',
  },
  {
    id: 'dikili', name: 'Dikili Termal Deniz', region: 'İzmir', icon: '🌊', accent: '#8b5cf6',
    temp: '63°C (kaynakta)', type: 'Deniz kıyısı termal', altitude: 0, fish: false,
    camp: true, desc: 'Sıcak su doğrudan Ege Denizi\'ne karışır. Termal–deniz kombinasyonu eşsiz.',
    access: 'İzmir\'den 2 saat. Dikili ilçesi.',
    tip: 'Kış aylarında sıcak suyun denize karıştığı kıyıda doğal banyo yapılabilir.',
  },
  {
    id: 'kizilcahamam', name: 'Kızılcahamam Termal', region: 'Ankara', icon: '🌲', accent: '#10b981',
    temp: '25–52°C', type: 'Radyumlu mineralli', altitude: 980, fish: false,
    camp: true, desc: 'Ankara\'ya en yakın termal. Soğuksu Milli Parkı içinde çam ormanı ortamı.',
    access: 'Ankara\'dan 80 km. Kış tatilinde çok popüler.',
    tip: 'Milli park içindeki kamp alanları termal ile birlikte kullanılabilir.',
  },
];

const FISH_TYPES = [
  { name: 'Garra Rufa', loc: 'Kangal Balıklı Çermik', temp: '36–38°C', use: 'Psoriasis ve deri hastalığı tedavisi' },
  { name: 'Alabalık (yakın)', loc: 'Soğuksu Milli Parkı çevreleri', temp: '8–14°C (dere)', use: 'Termal bölge yakınında balıkçılık' },
  { name: 'Sazan (gölet)', loc: 'Afyon bölgesi göletler', temp: '18–24°C', use: 'Sazan avı termal ziyaretiyle kombine' },
];

export default function ThermalSpots() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('spots');
  const [filter, setFilter] = useState('Tümü');
  const [sel, setSel] = useState(null);

  const filters = ['Tümü', 'Kamp', 'Balık'];
  const filtered = SPOTS.filter(s => {
    if (filter === 'Kamp') return s.camp;
    if (filter === 'Balık') return s.fish;
    return true;
  });

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>♨️ Termal Noktalar</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye kaplıcaları · kamp & balık kombinasyonu</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['spots', '♨️ Noktalar'], ['fishing', '🐟 Balık Bağlantısı']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#60a5fa' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#60a5fa' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'spots' && (
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  background: filter === f ? '#60a5fa22' : 'transparent',
                  color: filter === f ? '#60a5fa' : '#6b7280',
                  border: `1px solid ${filter === f ? '#60a5fa' : '#374151'}`,
                  borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                }}>{f}</button>
              ))}
            </div>

            {filtered.map(s => {
              const open = sel === s.id;
              return (
                <div key={s.id} style={{ marginBottom: 8 }}>
                  <div onClick={() => setSel(open ? null : s.id)} style={{
                    background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                    padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 26 }}>{s.icon}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                          <div style={{ fontSize: 11, color: '#6b7280' }}>{s.region} · {s.temp}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {s.camp && <span style={{ background: '#22c55e22', color: '#22c55e', borderRadius: 20, padding: '2px 6px', fontSize: 9, fontWeight: 700 }}>⛺ Kamp</span>}
                        {s.fish && <span style={{ background: '#3b82f622', color: '#3b82f6', borderRadius: 20, padding: '2px 6px', fontSize: 9, fontWeight: 700 }}>🐟 Balık</span>}
                      </div>
                    </div>
                  </div>
                  {open && (
                    <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                      <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{s.desc}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#6b7280' }}>🚗 Ulaşım:</span> <span style={{ color: '#d1d5db' }}>{s.access}</span></div>
                      <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                        <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                        <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{s.tip}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'fishing' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>
                Bazı termal bölgeler yakınında alabalık dereleri veya kaplıca göletleri bulunur. Kangal'ın Garra Rufa balığı ise dünyada tek bu noktada bulunur.
              </div>
            </div>
            {FISH_TYPES.map((f, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #374151' }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>🐠 {f.name}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>📍 {f.loc}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>🌡️ Su: {f.temp}</div>
                <div style={{ background: '#37415144', borderRadius: 8, padding: '6px 10px', marginTop: 4 }}>
                  <div style={{ fontSize: 11, color: '#d1d5db' }}>{f.use}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
