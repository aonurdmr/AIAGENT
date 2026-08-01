import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TECHNIQUES = [
  {
    id: 'setup', name: 'Buz Delme & Kurulum', icon: '🧊', accent: '#38bdf8',
    desc: 'Güvenli buz avı hazırlığı',
    steps: [
      'Buz kalınlığı kontrolü: 10 cm minimum — tek kişi için',
      '15 cm: 2-3 kişilik grup güvenli',
      '20 cm+: ATV/motosiklet için güvenli',
      'Buz burgu: elle veya motorlu 20-25 cm çap',
      'Delik çevresine su dökme — buzun iç rengine bak (mavi = sağlam, gri = tehlikeli)',
    ],
    gear: 'Buz burgu · olta seti · dedektör · çelik kanca · buzda destek çubuğu',
    tip: 'Hiçbir zaman tek başına gitme — kurtarma ipi ve çelik kanca yanında zorunlu.',
  },
  {
    id: 'jigging', name: 'Jig Tekniği', icon: '🎣', accent: '#06b6d4',
    desc: 'Buz altında jig ile avlanma',
    steps: [
      'Kısa olta (60-90 cm) — dar delikte hareket alanı az',
      'Küçük jig (2-5g) — soğuk suda balık yavaş tepki verir',
      'Hafif yukarı-aşağı hareket, 2-3 cm',
      'Dur ve bekle — soğuk suda yem algılamak yavaştır',
      'Gece ekranı veya pil lambası deliğe yansır — balık çeker',
    ],
    gear: 'Mini jig, küçük kaşık, solucan, küçük miye yemi',
    tip: 'Jig rengini dene: sarı gündüz, fosforlu gece, kırmızı bulanık suda.',
  },
  {
    id: 'tip_up', name: 'Sabit Tuzak (Tip-Up)', icon: '🪤', accent: '#a78bfa',
    desc: 'Çoklu delik otomatik olta kurulumu',
    steps: [
      'Tip-up aparatını buz deliğine yerleştir',
      'Canlı yem derine sarkıt — 50-70 cm dipten',
      'Bayrak mekanizması tutunca bayrak kalkar — uyarı sistemi',
      'Birden fazla deliği izleyerek verimlilik artır',
      'Buz çatlama sesi → anında terk et',
    ],
    gear: 'Tip-up aparatı · canlı yem (küçük balık veya solucan) · yedek misina',
    tip: 'Donmayı önle: deliğe tuzlu su ekle veya plastik kapak kullan.',
  },
  {
    id: 'species', name: 'Türkiye Buz Avı Türleri', icon: '🐟', accent: '#22c55e',
    desc: 'Kışın buz altında aktif türler',
    steps: [
      'Sazan (Cyprinus carpio): derin dipte — 2-4m bölgede toplu',
      'Turna (Esox lucius): aktif predatör — canlı yem ile avlanır',
      'Tatlısu levreği: yüzey altı — 1-2m derinlik',
      'İstavrit benzeri küçük türler: göl girişlerinde sürü',
      'Göl alabalığı: oksijen açısından zengin derin alanlar',
    ],
    gear: 'Turna için tel lider şart — diş keser misina',
    tip: 'Sazan soğukta çok yavaş — küçük yem, uzun bekleme stratejisi kazandırır.',
  },
];

const SAFETY = [
  { icon: '🧊', rule: 'Buz kalınlığı', desc: 'Her 30 dakikada bir buz kalınlığını tekrar ölç — gün içi sıcaklık erir' },
  { icon: '🦺', rule: 'Cankurtaran yeleği', desc: 'Buz altında kapan = kurtuluş imkânsız — yelek veya buzda yüzme çubuğu' },
  { icon: '🪢', rule: 'Kurtarma ipi', desc: '15m halat — gruba bağlı bitiş ucuyla, buz çatlasa çekebilsinler' },
  { icon: '🌡️', rule: 'Hipotermi', desc: 'Buz suyuna düşme = 3-5 dak bilinci bulanma — hızlı çıkış hayat kurtarır' },
  { icon: '📞', rule: 'İletişim', desc: 'Telefon baterisi soğukta düşer — iç cep + yedek güç zorunlu' },
  { icon: '🔦', rule: 'Aydınlatma', desc: 'Kış günleri kısa — erken donuk başlar, ışık zorunlu' },
];

export default function IceFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tech');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#030d18', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧊 Buz Altı Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 teknik · kurulum, jig, tip-up & tür rehberi</div>
      </div>

      <div style={{ background: '#0a1a24', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #38bdf833' }}>
        <div style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>🧊 BÖLGESEL NOT</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Türkiye'de buz avı esas olarak Doğu Anadolu gölleri (Van, Çıldır, Erçek) ve yüksek dağ göletlerinde yapılır. Buz kalınlığını mutlaka kontrol et.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['tech','Teknikler'],['safety','Güvenlik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#38bdf8' : '#06141e', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tech' && TECHNIQUES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#06141e', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#06141e', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {t.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ fontSize: 12, marginTop: 8 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>⚙️ Ekipman: </span><span style={{ color: '#d1d5db' }}>{t.gear}</span></div>
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {t.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'safety' && (
          <div style={{ background: '#06141e', borderRadius: 14, padding: 14, border: '1px solid #38bdf822' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', marginBottom: 10 }}>🛡️ Buz Avı Güvenlik Kuralları</div>
            {SAFETY.map((s, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < SAFETY.length-1 ? '1px solid #0a2030' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#7dd3fc' }}>{s.rule}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{s.desc}</div>
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
