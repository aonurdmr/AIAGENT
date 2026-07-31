import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  {
    id: 'karaca', name: 'Karaca', scientific: 'Capreolus capreolus', icon: '🦌', accent: '#22c55e',
    weight: 'Erkek: 20-35 kg · Dişi: 15-25 kg',
    habitat: 'Orman kenarı, tarım arazisi yakını, çalılık alan',
    distribution: 'Türkiye genelinde — Karadeniz, Ege, Trakya en yoğun',
    season: 'Erkek: Eylül–Ekim · Genel: Bölgeye göre belirlenir',
    antler: 'Küçük, 3 uçlu · Ocak–Şubat dökülür, Mart\'ta yenilenir',
    behavior: 'Yalnız veya küçük gruplar. Şafak ve gün batımında en aktif.',
    signs: ['Küçük ayak izi (7-8 cm)', 'Kabukta 60-90 cm yükseklikte sürtünme izi', 'Küçük dışkı topakları'],
    tip: 'Karaca meraklıdır — durduğunda çevreyi tarar. Çağrı sesi "roe call" ile çekilebilir.',
  },
  {
    id: 'alageyik', name: 'Alageyik', scientific: 'Dama dama', icon: '🦌', accent: '#f59e0b',
    weight: 'Erkek: 60-100 kg · Dişi: 30-50 kg',
    habitat: 'Açık meşe ormanı, tarım-orman mozaiği',
    distribution: 'Ege, Akdeniz ve bazı koruma alanlarında — çoğunlukla yarı koruma',
    season: 'Sezon bölgeye göre farklılaşır — Tarım İl Müdürlüğü onayı gerekli',
    antler: 'Geniş kürek şekilli boynuz — karakteristik özellik. Ekim\'de dökülür.',
    behavior: 'Sürü halinde. Rutting (çiftleşme) döneminde erkekler çok aktif — Ekim.',
    signs: ['Daha büyük ayak izi (8-10 cm)', 'Derin kök kazımalar', 'Otlama izleri'],
    tip: 'Rutting sezonda erkekler "groan" sesi çıkarır ve bölge işaretler. Sabır ile bekleme en iyi taktik.',
  },
  {
    id: 'geyik', name: 'Kızıl Geyik', scientific: 'Cervus elaphus', icon: '🦌', accent: '#ef4444',
    weight: 'Erkek: 150-250 kg · Dişi: 80-120 kg',
    habitat: 'Geniş yüzlü orman, dağlık arazi, alpin çayır',
    distribution: 'Kaçkar, Artvin, Kastamonu — yönetim alanları',
    season: 'Av kotası çok kısıtlı — özel izin zorunlu. DKMP izni gerekir.',
    antler: 'Büyük geyik boynuzu — 12+ uç olabilir. Koruma altındaki büyük erkekler trofi hedefli.',
    behavior: 'Sürü halinde. Rutting sesi (bugling) çok güçlü. Ekim-Kasım aktif çiftleşme.',
    signs: ['Büyük ayak izi (10-12 cm)', 'Derin toprak kazıma', 'Ağaç kabuğu soymalar'],
    tip: 'Bugling çağrısına yanıt verir. Rakip erkeği taklit eden bugle onu yaklaştırabilir.',
  },
];

const TRACKING_SKILLS = [
  { skill: 'Rüzgar Yönü', desc: 'Geyik koku duyusu mükemmel. Rüzgar SENDEN UZAKLAŞMALI — hayvanın önünden değil yanından yaklaş.', icon: '💨' },
  { skill: 'Renk Körü Avantajı', desc: 'Geyikler yeşil-kırmızı renk körüdür. Turuncu renk yelek geyiği uyarmaz ama avcıyı birbirinden ayırır.', icon: '🟠' },
  { skill: 'Ses Takibi', desc: 'Geyiğin yürüyüşünü, yiyecek sesini duyabilirsin. Dalların kırılma sesi = yakın mesafe.', icon: '👂' },
  { skill: 'Işık Takibi', desc: 'Geyikler şafak ve gün batımında en aktif. Bu saatlerde gözetleme yerine konumlan.', icon: '🌅' },
  { skill: 'Koku Yönetimi', desc: 'Aktif karbon sprey veya koku maskesi isteğe bağlı. En basit: rüzgar yönetimi.', icon: '🧴' },
  { skill: 'Sessiz Hareket', desc: 'Kuru yaprak ve dal sesini minimuma indir. Yavaş, bir adım bir adım takip.', icon: '🤫' },
];

export default function DeerGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('species');

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦌 Geyik Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Karaca · alageyik · kızıl geyik · iz takibi</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['species', '🦌 Türler'], ['track', '👣 İz Takibi']].map(([id, lbl]) => (
          <button key={id} onClick={() => { setTab(id); setSel(null); }} style={{
            flex: 1, background: tab === id ? '#f59e0b' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#f59e0b' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && SPECIES.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{s.scientific}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ marginTop: 8 }}>
                    {[['⚖️ Ağırlık', s.weight], ['🌿 Habitat', s.habitat], ['🗺️ Dağılım', s.distribution], ['📅 Sezon', s.season], ['🦌 Boynuz', s.antler]].map(([l, v]) => (
                      <div key={l} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}><span style={{ color: s.accent, fontWeight: 600 }}>{l}:</span> <span style={{ color: '#d1d5db' }}>{v}</span></div>
                    ))}
                    <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 6, marginBottom: 8, lineHeight: 1.6 }}>{s.behavior}</div>
                    <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                      <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>👣 VARLIK İZLERİ</div>
                      {s.signs.map((sg, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}><span style={{ color: s.accent }}>•</span> {sg}</div>)}
                    </div>
                    <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 3 }}>💡 TAKTİK</div>
                      <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{s.tip}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'track' && TRACKING_SKILLS.map(t => (
          <div key={t.skill} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 10 }}>
            <span style={{ fontSize: 24 }}>{t.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>{t.skill}</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
