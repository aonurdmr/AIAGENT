import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  {
    id: 'midye', name: 'Midye (Mytilus galloprovincialis)', icon: '🦪', accent: '#06b6d4',
    desc: 'Ege ve Marmara\'nın en yaygın kabukllusu. Kaya yüzeyine tutunarak koloniler oluşturur.',
    habitat: 'Kaya yüzeyleri, iskele ayakları, bot altları — 0-30 m derinlik',
    season: 'Eylül–Nisan (kırmızı gelgit riskinden kaçın: Mayıs–Ağustos)',
    size: 'Min 4 cm ticari · 5-8 cm tam lezzet',
    method: 'El toplaması (dalış) veya sualtı kazıyıcı · İzinsiz kültür zararı',
    tips: 'Rengi canlı sarı-turuncu olanlar yumurtalı dişidir — en lezzetli. Siyah midye boncuk içerse çürümüştür.',
    safety: 'PSP (paralitik kabuklu zehirlenmesi) riski var. Resmi tarih dışında toplanmaz.',
  },
  {
    id: 'istiridye', name: 'İstiridye (Ostrea edulis)', icon: '🦪', accent: '#22c55e',
    desc: 'Düz istiridye — Ege\'nin dünya markası. Derin, temiz sularda yetişir.',
    habitat: 'Çakıl ve kum zeminli sığ körfezler · 5-15 m derinlik',
    season: 'Eylül–Nisan (R harfi kuralı: ay ismine R harfi içeren aylar)',
    size: 'Min 6 cm · Büyük (80 g+) üstün lezzet',
    method: 'Dalış veya deniz tabanı kazıması · İzin gerekli',
    tips: 'Taze istiridye ağır olmalı — suyu dolu. Hafif istiridye çürümüş. Limon damlatınca hareket eder = taze.',
    safety: 'Vibrio riski yüksek — 60°C pişirilmeden yeme veya sadece güvenli kaynaklardan.',
  },
  {
    id: 'deniz_taragi', name: 'Deniz Tarağı (Pecten jacobaeus)', icon: '🐚', accent: '#f59e0b',
    desc: 'Ege\'nin en değerli kabukllusu. Yüzme yeteneği olan nadir kabuklu.',
    habitat: 'Kumlu-çakıllı dip · 10-50 m derinlik',
    season: 'Ekim–Mart (kota dahilinde)',
    size: 'Min 10 cm · Av limiti 50 adet/kişi/gün',
    method: 'Dalış veya tekne tırıngası — tırınga av izni gerektirir',
    tips: 'Tarak dışkıyı içine çekince kapanır, dışarı itersek açılır. Beyaz kas (adductor) lezzet. Roe (pembe) yenilebilir.',
    safety: 'Tarak kuşları (dikkatli seçim — deniz tarağı koruma altında bazı bölgelerde).',
  },
  {
    id: 'kara_midye', name: 'Tatlısu Midyesi (Dreissena polymorpha)', icon: '🦀', accent: '#a78bfa',
    desc: 'Barajlarda ve gollerde yaşayan tatlısu kabukllusu. Avcılık bölgeye göre değişir.',
    habitat: 'Büyük göller, barajlar, nehir ağızları',
    season: 'Bölgeye göre değişir — DSİ onaylı alanlar',
    size: 'Min 3.5 cm',
    method: 'El toplaması — baraj yönetim izni gerekli',
    tips: 'Tatlısu midyesi deniz midyesine göre daha az lezzetli ama yenilebilir. İçini kontrol et: renk sarı olmalı.',
    safety: 'Tatlısu kontaminasyonu riski — sanayi bölgelerinden alma.',
  },
];

const COOKING_METHODS = [
  { name: 'Buğulama', icon: '♨️', desc: 'En doğal yöntem. Ağzı açılana kadar buharda pişir (3-5 dk). Beyaz şarap + sarımsak + maydanoz ile.', time: '5 dk' },
  { name: 'Izgara', icon: '🔥', desc: 'Doğrudan ızgaraya koy. Ağzı açılınca hazır. Sarımsaklı tereyağı ile servis.', time: '3-4 dk' },
  { name: 'Midye Dolma', icon: '🍽️', desc: 'Midye içine pilav, baharat ve fındıkla doldur. Geleneksel Türk sokak yemeği.', time: '45 dk' },
  { name: 'Çorba', icon: '🍲', desc: 'Soğan + sarımsak + domates + krema. Kabukları koy, et çıkartıldıktan sonra suyunu kullan.', time: '25 dk' },
];

export default function MusselGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0c1420', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦪 Kabuklu Deniz Ürünleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Midye · istiridye · tarak · sezon & güvenlik</div>
      </div>

      <div style={{ margin: '0 16px 12px', background: '#ef444415', borderRadius: 12, padding: '12px 14px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700, marginBottom: 3 }}>⚠️ Kırmızı Gelgit Uyarısı</div>
        <div style={{ fontSize: 11, color: '#d1d5db', lineHeight: 1.6 }}>Mayıs–Ağustos arası Ege ve Marmara'da PSP riski. Resmi izin alanları dışında kabuklu toplamayın. Zehirlenme pişirmeyle gitmez!</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['species', '🦪 Türler'], ['cooking', '🍽️ Pişirme']].map(([id, lbl]) => (
          <button key={id} onClick={() => { setTab(id); setSel(null); }} style={{
            flex: 1, background: tab === id ? '#06b6d4' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#06b6d4' : '#374151',
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
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{s.desc}</div>
                  {[['📍 Habitat', s.habitat], ['📅 Sezon', s.season], ['📏 Boy', s.size], ['🎣 Yöntem', s.method]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}><span style={{ color: s.accent, fontWeight: 600 }}>{l}:</span> <span style={{ color: '#d1d5db' }}>{v}</span></div>
                  ))}
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{s.tips}</div>
                  </div>
                  <div style={{ background: '#ef444415', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 600, marginBottom: 3 }}>⚠️ GÜVENLİK</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{s.safety}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'cooking' && COOKING_METHODS.map(m => (
          <div key={m.name} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
              </div>
              <span style={{ fontSize: 11, color: '#06b6d4', fontWeight: 600 }}>⏱️ {m.time}</span>
            </div>
            <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
