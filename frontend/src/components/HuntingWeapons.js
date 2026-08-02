import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  {
    id: 'tufek', label: 'Av Tüfekleri', icon: '🔫',
    items: [
      {
        name: 'Yarı Otomatik Av Tüfeği', cal: '12\'lik', icon: '🔫',
        use: ['Yüksek ateş hızı', 'Küçük av (keklik, güvercin)', 'Sulak alan avı'],
        legal: 'Pompalı tüfekle aynı lisans. Kapasitesi 3 fişekle sınırlandırılmalı.',
        weight: '2.8–3.6 kg', range: '30–45 m',
        pros: ['Hızlı atış', 'Az ağırlık'], cons: ['Arızaya açık', 'Temizlik önemli'],
        tip: 'Keklik avında en yaygın tercih. Etkili menzil 35m.',
      },
      {
        name: 'Pompalı Av Tüfeği', cal: '12\'lik', icon: '🔫',
        use: ['Güvenilir yapı', 'Domuz avı', 'Genel amaç'],
        legal: 'A sınıfı av tüfeği ruhsatı gerektirir. Kulüp üyeliği şart değil.',
        weight: '2.9–3.8 kg', range: '30–50 m',
        pros: ['Son derece güvenilir', 'Çok yönlü'], cons: ['Yavaş tekrarlama', 'Ağır'],
        tip: 'Domuz avında yaygın. Kısa namlulu versiyonlar bekleme noktaları için idealdir.',
      },
      {
        name: 'Çift Namlulu Kırılır', cal: '12/20\'lik', icon: '🎯',
        use: ['Geleneksel av', 'Uçan av', 'Güvenceli atış'],
        legal: 'A sınıfı ruhsat. Tescil zorunlu.',
        weight: '2.5–3.2 kg', range: '25–40 m',
        pros: ['İki farklı kovan', 'Basit mekanizma', 'Güvenilir'], cons: ['Sadece 2 atış', 'Ağır'],
        tip: 'Köy avlarında geleneksel tercih. İki farklı çap seçeneğiyle çok yönlü.',
      },
    ],
  },
  {
    id: 'kaliber', label: 'Kaliber & Fişek', icon: '🎯',
    items: [
      {
        name: 'Saçmalı Fişek #4', cal: '12\'lik', icon: '⚫',
        use: ['Ördek', 'Kaz', 'Orta boy av kuşu'],
        legal: 'Sulak alanda çelik saçma zorunlu (kurşun saçma yasak).',
        weight: '32–36 g', range: '35–45 m',
        pros: ['İyi dağılım', 'Orta menzil'], cons: ['Sulak alanda çelik gerekli'],
        tip: 'Kaz avında en dengeli tercih. #2 ile karşılaştırın.',
      },
      {
        name: 'Slug (Tek Kurşun)', cal: '12\'lik', icon: '🔴',
        use: ['Domuz', 'Geyik', 'Büyük av'],
        legal: 'Türkiye\'de büyük av için tek kurşun zorunludur.',
        weight: '28–32 g', range: '75–100 m',
        pros: ['Yüksek durduruculuk', 'Uzun menzil'], cons: ['Dağılım yok', 'Kesin nişan gerekli'],
        tip: 'Domuz avında tercih. Ciddi geri tepme — namlu destekçisi önerilir.',
      },
      {
        name: 'Saçma #8 (İnce)', cal: '12/20\'lik', icon: '⬛',
        use: ['Keklik', 'Bıldırcın', 'Sülün'],
        legal: 'Kara avında serbestçe kullanılabilir.',
        weight: '24–28 g', range: '20–30 m',
        pros: ['Geniş dağılım', 'İnce saçma'], cons: ['Kısa menzil'],
        tip: 'Keklik ve bıldırcın için klasik tercih. Choke ayarını "improved cylinder" yapın.',
      },
    ],
  },
  {
    id: 'aksesuar', label: 'Ekipman & Aksesuar', icon: '🎒',
    items: [
      {
        name: 'Dürbün (Binoküler)', cal: '8×42 / 10×42', icon: '🔭',
        use: ['Hayvan tespiti', 'Mesafe tahmini', 'Gün batımı avı'],
        legal: 'Kısıtlama yok.',
        weight: '600–900 g', range: '200–1000 m görüş',
        pros: ['Hayvan güvenliği', 'Etkin', 'Hafif'], cons: ['El titremesi', 'Fiyat'],
        tip: 'Sabah ve akşam avı için zorunlu. 8×42 en çok yönlü kombinasyon.',
      },
      {
        name: 'Ses Çağırıcı (Çelik Ördek)', cal: '—', icon: '📯',
        use: ['Ördek çağırma', 'Kaz avı', 'Sulak alan'],
        legal: 'Elektronik çağırıcı Türkiye\'de yasaktır. Manuel ses aletleri serbest.',
        weight: '50–150 g', range: '—',
        pros: ['Etkili', 'Ucuz'], cons: ['Pratik yapmak gerekir'],
        tip: 'Elmas şeklindeki akrilik modeller sesde en doğal ses verir.',
      },
      {
        name: 'Av Yeleği', cal: '—', icon: '🦺',
        use: ['Fişek taşıma', 'Görünürlük', 'Saha konforu'],
        legal: 'Orman içinde turuncu renk zorunlu (bazı illerde).',
        weight: '400–700 g', range: '—',
        pros: ['Fişek düzeni', 'Güvenlik rengi'], cons: ['Isı birikimi'],
        tip: 'Çok cepli model, fişek ve kova taşımak için pratik.',
      },
    ],
  },
  {
    id: 'lisans', label: 'Lisans & Mevzuat', icon: '📋',
    items: [
      {
        name: 'A Sınıfı Av Tüfeği Ruhsatı', cal: '—', icon: '📄',
        use: ['Tüm av tüfekleri', 'Pompalı, yarı otomatik, kırılır'],
        legal: 'Valilik silah ruhsat şubesinden alınır. Adli sicil temiz olmalı. 18 yaş şartı.',
        weight: '—', range: '—',
        pros: ['Tüm av tüfeklerine geçerli'], cons: ['Başvuru süreci uzun olabilir'],
        tip: '2 fotoğraf, ikametgah belgesi, sağlık raporu ve adli sicil kaydı gereklidir.',
      },
      {
        name: 'Av Ruhsatı (Doğa Koruma)', cal: '—', icon: '🌿',
        use: ['Avlanma izni', 'Sezon bazlı'],
        legal: 'Tarım ve Orman Bakanlığı DKMP şubelerinden alınır. Her yıl yenileme zorunlu.',
        weight: '—', range: '—',
        pros: ['Yasal avlanma hakkı', 'Sezon bilgisi'], cons: ['Yıllık yenileme'],
        tip: 'e-Devlet üzerinden başvuru yapılabilir. Ücret her yıl güncellenir.',
      },
      {
        name: 'Yabani Domuz İzni', cal: '—', icon: '🐗',
        use: ['Domuz avı', 'Yıl boyu açık'],
        legal: 'Domuz zararlı hayvan kapsamında; sezon dışında bile avlanabilir. Orman işletmesinden izin gerekebilir.',
        weight: '—', range: '—',
        pros: ['Yıl boyu av', 'Ön izin daha kolay'], cons: ['Orman işletmesi onayı'],
        tip: 'Grup halinde gece avı popüler. Kırmızı lazer veya termal dedektör kullanmak serbest.',
      },
    ],
  },
];

function ItemCard({ item, onClick }) {
  return (
    <div onClick={() => onClick(item)} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{item.name}</div>
        {item.cal !== '—' && <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Kaliber: {item.cal}</div>}
        <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
          {item.use.slice(0, 2).map(u => <span key={u} style={{ fontSize: 10, background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '2px 8px' }}>{u}</span>)}
        </div>
      </div>
      <span style={{ color: '#6b7280', fontSize: 16 }}>›</span>
    </div>
  );
}

function ItemDetail({ item, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000b', zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 40 }}>{item.icon}</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#f9fafb' }}>{item.name}</div>
            {item.cal !== '—' && <div style={{ fontSize: 12, color: '#6b7280' }}>{item.cal}</div>}
          </div>
        </div>

        {(item.weight !== '—' || item.range !== '—') && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            <div style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>⚖️ Ağırlık</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{item.weight}</div>
            </div>
            <div style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>🎯 Menzil/Kapasite</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{item.range}</div>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🎯 KULLANIM ALANLARI</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {item.use.map(u => <span key={u} style={{ background: '#374151', color: '#d1d5db', borderRadius: 8, padding: '5px 12px', fontSize: 12 }}>{u}</span>)}
          </div>
        </div>

        {item.pros && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            <div style={{ background: '#052e16', borderRadius: 10, padding: '10px 12px', border: '1px solid #16a34a44' }}>
              <div style={{ fontSize: 11, color: '#4ade80', fontWeight: 600, marginBottom: 6 }}>✅ AVANTAJLAR</div>
              {item.pros.map(p => <div key={p} style={{ fontSize: 12, color: '#bbf7d0', marginBottom: 2 }}>• {p}</div>)}
            </div>
            <div style={{ background: '#450a0a', borderRadius: 10, padding: '10px 12px', border: '1px solid #ef444444' }}>
              <div style={{ fontSize: 11, color: '#f87171', fontWeight: 600, marginBottom: 6 }}>⚠️ DEZAVANTAJLAR</div>
              {item.cons.map(c => <div key={c} style={{ fontSize: 12, color: '#fca5a5', marginBottom: 2 }}>• {c}</div>)}
            </div>
          </div>
        )}

        <div style={{ background: '#1c1f26', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>⚖️ YASAL DURUM</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{item.legal}</div>
        </div>

        <div style={{ background: '#0c1f3f', borderRadius: 12, padding: '12px 14px', border: '1px solid #1e40af44' }}>
          <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>💡 UZMAN İPUCU</div>
          <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.6 }}>{item.tip}</div>
        </div>
      </div>
    </div>
  );
}

export default function HuntingWeapons() {
  const navigate = useNavigate();
  const [catId, setCatId] = useState('tufek');
  const [selected, setSelected] = useState(null);
  const cat = CATEGORIES.find(c => c.id === catId);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔫 Av Silahları Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tüfek türleri, fişek seçimi, aksesuar ve Türkiye mevzuatı</div>
      </div>

      <div style={{ margin: '0 16px 14px', background: '#1c1f26', borderRadius: 12, padding: '10px 14px', border: '1px solid #374151' }}>
        <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600, marginBottom: 2 }}>⚠️ YASAL UYARI</div>
        <div style={{ fontSize: 12, color: '#9ca3af' }}>Bu rehber bilgilendirme amaçlıdır. Avlanma ve silah taşıma için geçerli ruhsat zorunludur.</div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCatId(c.id)} style={{
            background: catId === c.id ? '#f59e0b' : '#1f2937',
            color: catId === c.id ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: catId === c.id ? '#f59e0b' : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap',
          }}>{c.icon} {c.label}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {cat?.items.map((item, i) => <ItemCard key={i} item={item} onClick={setSelected} />)}
      </div>

      {selected && <ItemDetail item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
