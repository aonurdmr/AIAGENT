import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CRITERIA = [
  {
    id: 'terrain', name: 'Arazi Değerlendirmesi', icon: '🗺️', accent: '#22c55e',
    checks: [
      { label: 'Düz zemin', desc: 'Eğim max 5° — çadır kaymaması için' },
      { label: 'Akıntı kanallarından uzak', desc: 'Yağmur seli riski — V şekli vadilerden kaçın' },
      { label: 'Büyük ağaç altından kaçın', desc: 'Gece rüzgarında dal düşme tehlikesi' },
      { label: 'Yumuşak zemin kontrolü', desc: 'Çakıl, taş veya kazık giriyor mu?' },
    ],
    tip: 'Çim üstü ideal — ama kalın çayır tik ve pire barındırır, deri koruyucusu sürmeden çadır kurma.',
  },
  {
    id: 'water', name: 'Su Kaynağı', icon: '💧', accent: '#06b6d4',
    checks: [
      { label: 'Akan su 50 m içinde', desc: 'İçme, pişirme, kişisel bakım kolaylığı' },
      { label: 'Kaynaktan 30 m uzak kamp', desc: 'Hayvan geçiş koridorunu tıkama' },
      { label: 'Suyu kaynat veya filtrele', desc: 'Dağ suyu da Cryptosporidium barındırabilir' },
      { label: 'Tuvalet alanı suya uzak', desc: 'Min 60 m mesafe — su kirliliği önle' },
    ],
    tip: 'Musluk suyu alımayan alanda UF filtreli şişe ya da iyot tabletiyle hazır ol.',
  },
  {
    id: 'wildlife', name: 'Vahşi Hayat Uyumu', icon: '🐻', accent: '#f97316',
    checks: [
      { label: 'Hayvan izi ve dışkı kontrolü', desc: 'Ayı, domuz geçiş noktalarından uzak dur' },
      { label: 'Yiyecekleri kapalı tut', desc: 'Gece araç/ağaç askısı — hayvan çekme riski' },
      { label: 'Koku çıkarma alanı uzakta', desc: 'Yemek 200 m uzakta pişir ve yenile' },
      { label: 'Çadır içine yiyecek alma', desc: 'Hayvan buruna çekici koku kaynağı olur' },
    ],
    tip: 'Türkiye\'de yaban domuzu en büyük risk — kamp yerini mutlaka incele.',
  },
  {
    id: 'shelter', name: 'Doğal Sığınak', icon: '🌲', accent: '#a78bfa',
    checks: [
      { label: 'Rüzgar kırıcı arazi özelliği', desc: 'Tepe, ağaç sırası ya da kaya — rüzgar yönünü test et' },
      { label: 'Güneş açısı sabah', desc: 'Doğu açık — sabah ısınma, çiğ hızlı kurur' },
      { label: 'Gölge öğlen', desc: 'Ağaç gölgesi — güneş çarpması riski düşer' },
      { label: 'Görüş alanı geniş', desc: 'Hayvan yaklaşımını erken fark et' },
    ],
    tip: 'Kaya duvarı sırtı + ağaç ön — Türkiye\'nin en klasik koruyucu kamp konumu.',
  },
];

const LEAVE_NO_TRACE = [
  { icon: '🔥', rule: 'Ateş izini temizle', desc: 'Külleri su ile söndür, taş yuvarlat, alan temizle' },
  { icon: '🗑️', rule: 'Her şeyi geri götür', desc: 'Organik atık bile — meyve kabuğu 2 yıl çözülür' },
  { icon: '🚿', rule: 'Doğal sabun kullan', desc: 'Akarsuda kimyasal sabun yasak — biyobozunur tercih et' },
  { icon: '🌿', rule: 'Bitkilere zarar verme', desc: 'Çiçek kopar, dal kesme — ekosistemi boz' },
  { icon: '📸', rule: 'Sadece hatıra al', desc: 'Taş, odun, çiçek toplama yasaklı milli parklarda' },
  { icon: '👣', rule: 'İz üstünde yürü', desc: 'Toprak sıkışması bitki öldürür — tanımlı parkurda kal' },
];

export default function CampSiteSelector() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('criteria');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060f07', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⛺ Kamp Yeri Seçimi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 kriter · arazi, su, vahşi hayat & sığınak</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['criteria','Kriterler'],['lnt','İz Bırakma']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0b160c', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'criteria' && CRITERIA.map(c => {
          const open = sel === c.id;
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : c.id)} style={{
                background: '#0b160c', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${c.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{c.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0b160c', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${c.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, marginBottom: 8, marginTop: 8 }}>✅ KONTROL LİSTESİ</div>
                  {c.checks.map((ch, i) => (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb' }}>☐ {ch.label}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginLeft: 14, marginTop: 1 }}>{ch.desc}</div>
                    </div>
                  ))}
                  <div style={{ background: c.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 6 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {c.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'lnt' && (
          <div style={{ background: '#0b160c', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🌿 İz Bırakma İlkeleri (Leave No Trace)</div>
            {LEAVE_NO_TRACE.map((r, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < LEAVE_NO_TRACE.length-1 ? '1px solid #162018' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 20 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac' }}>{r.rule}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{r.desc}</div>
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
