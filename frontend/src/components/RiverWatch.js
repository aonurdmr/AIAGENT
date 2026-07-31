import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RIVERS = [
  {
    id: 1, name: 'Sakarya Nehri', region: 'Batı Karadeniz', icon: '🌊',
    lat: 40.72, lng: 30.38, length: 824, basin: 58000,
    fish: ['Sazan', 'Turna', 'Yayın', 'Tatlısu Levreği'],
    season: { best: 'İlkbahar & Sonbahar', peak: 'Mart–Mayıs' },
    conditions: { flow: 'Orta', clarity: 'Berrak', temp: 14, level: 'Normal' },
    tips: 'Yağış sonrası 24–48 saat beklendikten sonra en verimli dönem. Alt kesimlerde sazan bol.',
    tributaries: ['Porsuk', 'Mudurnu', 'Geyve'],
    restrictions: 'Elektrofishing yasak. Boy limiti: Sazan 30cm, Yayın 40cm.',
  },
  {
    id: 2, name: 'Kızılırmak Nehri', region: 'İç Anadolu', icon: '🔴',
    lat: 41.0, lng: 35.9, length: 1355, basin: 78180,
    fish: ['Sazan', 'Kefal', 'Tatlısu Kefali', 'Bıyıklı Balık'],
    season: { best: 'İlkbahar & Yaz', peak: 'Nisan–Haziran' },
    conditions: { flow: 'Düşük', clarity: 'Bulanık', temp: 16, level: 'Düşük' },
    tips: 'Türkiye\'nin en uzun nehri. Yaz aylarında seviye düştüğünde körfez oluşan bölgeler bol balıklıdır.',
    tributaries: ['Delice', 'Gökırmak', 'Devrez'],
    restrictions: 'Ulusal parklar içinde izin gerekiyor. Boy limiti: Sazan 30cm.',
  },
  {
    id: 3, name: 'Yeşilırmak Nehri', region: 'Orta Karadeniz', icon: '💚',
    lat: 41.2, lng: 36.2, length: 519, basin: 36114,
    fish: ['Alabalık', 'Sazan', 'Siraz', 'Kefal'],
    season: { best: 'Bahar Dönemi', peak: 'Nisan–Mayıs' },
    conditions: { flow: 'Yüksek', clarity: 'Yeşilimsi', temp: 11, level: 'Yüksek' },
    tips: 'Üst havzada alabalık bolluğu. Kar erimesiyle Nisan–Mayıs doruk debi döneminde aktif balıkçılık.',
    tributaries: ['Çekerek', 'Kelkit', 'Tersakan'],
    restrictions: 'Alabalık için reşit sezon dışında yasak. Boy limiti: Alabalık 25cm.',
  },
  {
    id: 4, name: 'Fırat Nehri', region: 'Güneydoğu', icon: '🌀',
    lat: 38.5, lng: 39.3, length: 2800, basin: 121000,
    fish: ['Sazan', 'Yayın', 'Siraz', 'Bıyıklı Balık'],
    season: { best: 'Sonbahar & Kış', peak: 'Ekim–Aralık' },
    conditions: { flow: 'Orta', clarity: 'Berrak', temp: 13, level: 'Normal' },
    tips: 'Keban Barajı ile yönetimli akış. Baraj altı bölgeler özellikle verimli. Yayın balığı bol.',
    tributaries: ['Murat', 'Peri', 'Munzur'],
    restrictions: 'Baraj bölgelerinde özel izin gereklidir.',
  },
  {
    id: 5, name: 'Büyük Menderes', region: 'Ege', icon: '🌊',
    lat: 37.8, lng: 28.5, length: 584, basin: 24976,
    fish: ['Sazan', 'Yılan Balığı', 'Kefal', 'Karabalık'],
    season: { best: 'Kış & Bahar', peak: 'Şubat–Nisan' },
    conditions: { flow: 'Düşük', clarity: 'Berrak', temp: 12, level: 'Normal' },
    tips: 'Meandırın doğal kıvrımlarında derin havuzlar oluşur — sazan ve yılanbalığı için ideal.',
    tributaries: ['Banaz', 'Çürüksu', 'Dandalaz'],
    restrictions: 'Sulama dönemlerinde debi düşer. Kış balıkçılığı önerilir.',
  },
  {
    id: 6, name: 'Çoruh Nehri', region: 'Kuzeydoğu', icon: '⚡',
    lat: 40.7, lng: 41.5, length: 431, basin: 19872,
    fish: ['Alabalık', 'Kaya Balığı', 'Siraz'],
    season: { best: 'Yaz', peak: 'Temmuz–Ağustos' },
    conditions: { flow: 'Hızlı', clarity: 'Kristal', temp: 8, level: 'Yüksek' },
    tips: 'Dünyanın en hızlı akan nehirlerinden biri. Rafting ile birlikte balıkçılık popüler. Alabalık bolluğu.',
    tributaries: ['Tortum', 'Oltu', 'Berta'],
    restrictions: 'Rafting sezonunda bazı bölgeler kısıtlı. Alabalık boy limiti: 25cm.',
  },
];

const FLOW_COLOR = { Düşük: '#f59e0b', Orta: '#22c55e', Yüksek: '#3b82f6', 'Hızlı': '#ef4444' };
const CLARITY_ICON = { Berrak: '✨', Bulanık: '🟤', 'Yeşilimsi': '💚', 'Kristal': '💎' };
const LEVEL_COLOR = { Düşük: '#f59e0b', Normal: '#22c55e', Yüksek: '#3b82f6' };

function ConditionBadge({ label, value, colorMap }) {
  const color = colorMap[value] || '#6b7280';
  return (
    <div style={{ background: '#374151', borderRadius: 8, padding: '7px 10px', textAlign: 'center' }}>
      <div style={{ fontSize: 9, color: '#6b7280' }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color, marginTop: 1 }}>{value}</div>
    </div>
  );
}

function RiverCard({ river, onClick }) {
  return (
    <div onClick={() => onClick(river)} style={{ background: '#1f2937', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1px solid #374151', cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>{river.icon}</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{river.name}</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>📍 {river.region} · {river.length} km</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#9ca3af' }}>🌡️ {river.conditions.temp}°C</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 10 }}>
        <ConditionBadge label="Akım" value={river.conditions.flow} colorMap={FLOW_COLOR} />
        <ConditionBadge label="Seviye" value={river.conditions.level} colorMap={LEVEL_COLOR} />
        <div style={{ background: '#374151', borderRadius: 8, padding: '7px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#6b7280' }}>Berraklık</div>
          <div style={{ fontSize: 14 }}>{CLARITY_ICON[river.conditions.clarity] || '—'}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {river.fish.slice(0, 3).map(f => (
          <span key={f} style={{ fontSize: 10, background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '2px 8px' }}>🐟 {f}</span>
        ))}
      </div>
    </div>
  );
}

function RiverDetail({ river, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000b', zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 40 }}>{river.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{river.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{river.region} · {river.length} km · Havza {river.basin.toLocaleString('tr-TR')} km²</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          <ConditionBadge label="🌊 Akım" value={river.conditions.flow} colorMap={FLOW_COLOR} />
          <ConditionBadge label="📏 Seviye" value={river.conditions.level} colorMap={LEVEL_COLOR} />
          <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontSize: 10, color: '#6b7280' }}>🌡️ Su Sıcaklığı</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#06b6d4', marginTop: 1 }}>{river.conditions.temp}°C</div>
          </div>
          <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontSize: 10, color: '#6b7280' }}>👁️ Berraklık</div>
            <div style={{ fontSize: 14, marginTop: 1 }}>{CLARITY_ICON[river.conditions.clarity]} {river.conditions.clarity}</div>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🐟 BALIK TÜRLERİ</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {river.fish.map(f => <span key={f} style={{ background: '#374151', color: '#d1d5db', borderRadius: 8, padding: '5px 12px', fontSize: 12 }}>{f}</span>)}
          </div>
        </div>

        <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>📅 En İyi Sezon</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#22c55e', marginTop: 2 }}>{river.season.best}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>⭐ Doruk</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', marginTop: 2 }}>{river.season.peak}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0c1f3f', borderRadius: 12, padding: '12px 14px', border: '1px solid #1e40af44', marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>🎣 BALIKÇILIK TAVSİYESİ</div>
          <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.6 }}>{river.tips}</div>
        </div>

        <div style={{ background: '#1c1f26', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>⚖️ YASAL KISITLAMALAR</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{river.restrictions}</div>
        </div>

        <div>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🌿 KOLLARı</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {river.tributaries.map(t => <span key={t} style={{ background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '4px 10px', fontSize: 12 }}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

const REGIONS = ['Tümü', 'Batı Karadeniz', 'Orta Karadeniz', 'Kuzeydoğu', 'İç Anadolu', 'Güneydoğu', 'Ege'];

export default function RiverWatch() {
  const navigate = useNavigate();
  const [region, setRegion] = useState('Tümü');
  const [selected, setSelected] = useState(null);

  const filtered = region === 'Tümü' ? RIVERS : RIVERS.filter(r => r.region === region);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏞️ Akarsu Takibi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          6 nehir · su seviyesi, berraklık, sıcaklık ve balıkçılık tavsiyeleri
        </div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {REGIONS.slice(0, 5).map(r => (
          <button key={r} onClick={() => setRegion(r)} style={{
            background: region === r ? '#06b6d4' : '#1f2937',
            color: region === r ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: region === r ? '#06b6d4' : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{r}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} nehir</div>
        {filtered.map(r => <RiverCard key={r.id} river={r} onClick={setSelected} />)}
      </div>

      {selected && <RiverDetail river={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
