import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PLANTS = [
  {
    id: 1, name: 'Isırgan Otu', latin: 'Urtica dioica', icon: '🌿',
    category: 'Yenilebilir', habitat: 'Orman', rarity: 'Yaygın',
    edible: true, toxic: false, medicinal: true,
    season: [3,4,5,6], color: '#22c55e',
    desc: 'Isırgan otu, genç yaprakları pişirilince lezzetli bir sebze. A ve C vitamini yönünden zengin.',
    uses: ['Çorba', 'Salata (haşlanmış)', 'Çay', 'Ispanak yerine'],
    caution: 'Ham halde deriye değdiğinde yanma yapabilir. Eldivenle toplayın.',
    parts: 'Genç yapraklar ve sürgünler (çiçeklenmeden önce)',
    tips: ['Sürgünlerin ilk 10–15 cm kısmını toplayın', 'Haşlayarak veya buharda pişirin', 'Kurutarak çay yapın'],
    regions: ['Tüm Türkiye', 'Karadeniz', 'Ege'],
  },
  {
    id: 2, name: 'Kuzukulağı', latin: 'Rumex acetosa', icon: '🌱',
    category: 'Yenilebilir', habitat: 'Çayır', rarity: 'Yaygın',
    edible: true, toxic: false, medicinal: false,
    season: [3,4,5,6,7], color: '#22c55e',
    desc: 'Ekşimsi lezzetiyle Anadolu mutfağında kullanılan yabani ot. Yoğurtla mükemmel uyum sağlar.',
    uses: ['Kavurma', 'Börek', 'Yoğurtlu salata', 'Çorba'],
    caution: 'Böbrek taşı veya gut hastalarına önerilmez (oksalik asit içerir).',
    parts: 'Taze yapraklar',
    tips: ['Küçük yaprakları tercih edin', 'Asit içeriği nedeniyle fazla tüketmeyin'],
    regions: ['Karadeniz', 'İç Anadolu', 'Doğu Anadolu'],
  },
  {
    id: 3, name: 'Kuşburnu', latin: 'Rosa canina', icon: '🌸',
    category: 'Yenilebilir', habitat: 'Kıyı', rarity: 'Yaygın',
    edible: true, toxic: false, medicinal: true,
    season: [8,9,10,11], color: '#f97316',
    desc: 'C vitamini deposu olan kuşburnu, bağışıklık sistemini güçlendirir. Marmelat, çay ve şarap yapımında kullanılır.',
    uses: ['Çay', 'Marmelat', 'Şurup', 'Kuru meyve'],
    caution: 'İç tohumlarını ve ince kıllarını çıkarın, tahriş yapabilir.',
    parts: 'Olgun kırmızı meyveler (sonbaharda)',
    tips: ['İlk dondan sonra daha tatlı olur', 'Mutlaka tohumları ayıklayın', 'Bol C vitamini için günde 5-6 meyve yeterli'],
    regions: ['Tüm Türkiye', 'Ege', 'Akdeniz'],
  },
  {
    id: 4, name: 'Karahindiba', latin: 'Taraxacum officinale', icon: '🌼',
    category: 'Yenilebilir', habitat: 'Çayır', rarity: 'Yaygın',
    edible: true, toxic: false, medicinal: true,
    season: [3,4,5,6,7,8,9], color: '#22c55e',
    desc: 'Tüm parçaları yenilebilen mucize bitki. Diüretik ve karaciğer dostu olarak bilinen şifalı ot.',
    uses: ['Yaprak salatası', 'Çiçek çayı', 'Kök kahvesi', 'Kavurma'],
    caution: 'Bazı ilaçlarla etkileşime girebilir. Kontrol edin.',
    parts: 'Yapraklar (ilkbaharda), çiçekler, kök',
    tips: ['Çiçeklenmeden önce yapraklar daha az acı', 'Kışın kök kazıp kavurabilirsiniz', 'Çiçeklerden salata süsü yapın'],
    regions: ['Tüm Türkiye'],
  },
  {
    id: 5, name: 'Yabani Çilek', latin: 'Fragaria vesca', icon: '🍓',
    category: 'Yenilebilir', habitat: 'Orman', rarity: 'Orta',
    edible: true, toxic: false, medicinal: false,
    season: [5,6,7], color: '#ef4444',
    desc: 'Ormanlık alanlarda yetişen tatlı yabani çilek. Bahçe çileğinden daha küçük ama çok daha aromalı.',
    uses: ['Taze yeme', 'Reçel', 'Komposto'],
    caution: 'Alerji geçmişi olanlar dikkatli olmalı.',
    parts: 'Olgun kırmızı meyveler',
    tips: ['Çoğunlukla gölgeli ormanlık kenarları', 'Yapraklar da çay yapımında kullanılır'],
    regions: ['Karadeniz', 'Ege Dağları', 'Marmara'],
  },
  {
    id: 6, name: 'Böğürtlen', latin: 'Rubus fruticosus', icon: '🫐',
    category: 'Yenilebilir', habitat: 'Kıyı', rarity: 'Yaygın',
    edible: true, toxic: false, medicinal: false,
    season: [7,8,9], color: '#a855f7',
    desc: 'Dikenli çalılarda yetişen, antioksidan zengini yabani böğürtlen. Reçel ve tatlı yapımında kullanılır.',
    uses: ['Taze yeme', 'Reçel', 'Marmelat', 'Meyve suyu', 'Kurutma'],
    caution: 'Toplamasına dikkat edin – dikenler kesici.',
    parts: 'Siyah olgun meyveler',
    tips: ['Tam siyah olduğunda tatlanır', 'Mor olduğunda henüz ekşidir', 'Eldivenle toplayın'],
    regions: ['Karadeniz', 'Ege', 'Marmara', 'Akdeniz'],
  },
  {
    id: 7, name: 'Zehirli Mantar', latin: 'Amanita phalloides', icon: '🍄',
    category: 'Zehirli', habitat: 'Orman', rarity: 'Orta',
    edible: false, toxic: true, medicinal: false,
    season: [8,9,10,11], color: '#ef4444',
    desc: 'Ölüm meleği (death cap) olarak bilinen ve dünya genelinde en çok ölüme yol açan mantar türü. DOKUNMAYINIZ.',
    uses: [],
    caution: '⚠️ KESİNLİKLE YENİLMEZ! Bir mantar bile ölüme yol açabilir. Karaciğer ve böbrek yetmezliği yapar.',
    parts: 'Tüm parçaları zehirli (şapka, sap, kök)',
    tips: ['Yeşilimsi sarı şapkası ve beyaz solungaçlarıyla tanınır', 'Meşe ve kestane ormanlarında bulunur', 'Şüpheli mantarlara dokunmayın'],
    regions: ['Karadeniz', 'Ege', 'Marmara'],
  },
  {
    id: 8, name: 'Boru Çiçeği', latin: 'Datura stramonium', icon: '🌺',
    category: 'Zehirli', habitat: 'Çayır', rarity: 'Orta',
    edible: false, toxic: true, medicinal: false,
    season: [6,7,8,9,10], color: '#ef4444',
    desc: 'Tatula ya da boru çiçeği. Tüm parçaları halüsinojenik ve tehlikeli alkaloidler içerir. Ölümcül olabilir.',
    uses: [],
    caution: '⚠️ SON DERECE ZEHİRLİ. Tohumu, yaprağı, kökü, her yeri tehlikeli. Çocuklardan uzak tutun.',
    parts: 'Tüm bitki zehirli',
    tips: ['Sivri dikenli yeşil meyveleri var', 'Büyük beyaz trompet çiçekleri', 'Ezilince kötü koku verir'],
    regions: ['Tüm Türkiye', 'Tarla kenarları'],
  },
  {
    id: 9, name: 'Adaçayı', latin: 'Salvia officinalis', icon: '🌿',
    category: 'Tıbbi', habitat: 'Dağ', rarity: 'Orta',
    edible: true, toxic: false, medicinal: true,
    season: [4,5,6,7,8,9], color: '#06b6d4',
    desc: 'Türk mutfağında ve halk hekimliğinde vazgeçilmez. Antibakteriyel, antifungal, antioksidan özelliklere sahip.',
    uses: ['Çay', 'Baharat', 'Ihlama ile karıştırma', 'Gargara (boğaz ağrısı)'],
    caution: 'Gebelikte yüksek dozda kullanmayın. Epilepsi hastalarına önerilmez.',
    parts: 'Yapraklar ve çiçekler (çiçeklenme öncesi en güçlü)',
    tips: ['Kurutur saklamak uygundur', 'Taze kullanımda pişirmeden önce yıkayın', 'Kurutarak kış için stoklayın'],
    regions: ['Ege', 'Akdeniz', 'Güney Anadolu'],
  },
  {
    id: 10, name: 'Kekik', latin: 'Thymus serpyllum', icon: '🌸',
    category: 'Tıbbi', habitat: 'Dağ', rarity: 'Yaygın',
    edible: true, toxic: false, medicinal: true,
    season: [5,6,7,8], color: '#f59e0b',
    desc: 'Türkiye\'nin dört bir yanında yetişen aromatik kekik. Antimikrobiyal ve expectorant (balgam söktürücü) özellikler.',
    uses: ['Çay', 'Baharat', 'Et marinadı', 'Nefes açıcı buhar banyosu'],
    caution: 'Aşırı miktarda tüketim mide tahrişine neden olabilir.',
    parts: 'Yapraklar ve çiçekli dallar',
    tips: ['Çiçek açarken toplayın', 'Gölgede kurutun', 'Akdeniz kekiği daha güçlü aromalı'],
    regions: ['Ege', 'Akdeniz', 'Tüm kuru yamaçlar'],
  },
  {
    id: 11, name: 'Ihlamur', latin: 'Tilia cordata', icon: '🌳',
    category: 'Tıbbi', habitat: 'Orman', rarity: 'Orta',
    edible: true, toxic: false, medicinal: true,
    season: [6,7], color: '#84cc16',
    desc: 'Karadeniz bölgesinde yaygın, sakinleştirici, ateş düşürücü, nezle iyi eden çiçekler. Türkiye\'nin sevilen çayı.',
    uses: ['Çay (çiçekleri)', 'Öksürük şurubu', 'Uyku bozuklukları için', 'Soğuk algınlığı tedavisi'],
    caution: 'Kalp rahatsızlığı olanlar fazla tüketmemeli.',
    parts: 'Çiçekler ve küçük yapraklar (Haziran-Temmuz)',
    tips: ['Çiçeklenince toplayın ve kurutun', 'Kışlık stok için mükemmel', '10 dakika demlendirilmeli'],
    regions: ['Karadeniz', 'Marmara', 'Kuzey Ege'],
  },
  {
    id: 12, name: 'Eğrelti Otu', latin: 'Pteridium aquilinum', icon: '🌿',
    category: 'Dikkatli', habitat: 'Orman', rarity: 'Yaygın',
    edible: true, toxic: false, medicinal: false,
    season: [3,4,5], color: '#f59e0b',
    desc: 'Genç filizleri (baldırıkara filizi) pişirilerek yenebilir. Anadolu\'da geleneksel olarak tüketilir. Olgunlaştığında zehirli!',
    uses: ['Haşlanmış filizler', 'Kavurma', 'Turşu'],
    caution: '⚠️ Sadece genç filizler yenilebilir! Olgun bitki kanserojen etki gösterebilir. Az tüketin.',
    parts: 'Kıvrık genç sürgünler (kırlangıç kuyruğu evresi)',
    tips: ['15 cm\'den kısa kıvrık filizleri toplayın', 'Mutlaka haşlayıp suyu dökün', 'Sık tüketimden kaçının'],
    regions: ['Karadeniz', 'Ege', 'Marmara'],
  },
];

const CATEGORIES = ['Tümü', 'Yenilebilir', 'Tıbbi', 'Zehirli', 'Dikkatli'];
const HABITATS   = ['Tümü', 'Orman', 'Çayır', 'Dağ', 'Kıyı'];
const MONTHS_TR  = ['Oc', 'Şb', 'Mr', 'Ns', 'My', 'Hz', 'Tm', 'Ağ', 'Ey', 'Ek', 'Ks', 'Ar'];

function SeasonDots({ months }) {
  return (
    <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      {MONTHS_TR.map((m, i) => (
        <span key={i} style={{
          width: 22, height: 22, borderRadius: '50%', fontSize: 9, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: months.includes(i + 1) ? '#22c55e' : '#374151',
          color: months.includes(i + 1) ? '#fff' : '#6b7280',
        }}>{m}</span>
      ))}
    </div>
  );
}

function PlantDetail({ plant, onClose }) {
  const CAT_COLOR = { Yenilebilir: '#22c55e', Tıbbi: '#06b6d4', Zehirli: '#ef4444', Dikkatli: '#f59e0b' };
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200,
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1f2937', borderRadius: '20px 20px 0 0', padding: '24px 20px 32px',
        width: '100%', maxHeight: '85vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 36 }}>{plant.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#f9fafb', marginTop: 4 }}>{plant.name}</div>
            <div style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic' }}>{plant.latin}</div>
          </div>
          <span style={{
            background: CAT_COLOR[plant.category] + '33',
            color: CAT_COLOR[plant.category], borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600,
          }}>{plant.category}</span>
        </div>

        <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{plant.desc}</p>

        <div style={{ background: '#374151', borderRadius: 12, padding: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8, fontWeight: 600 }}>AKTIF SEZON</div>
          <SeasonDots months={plant.season} />
        </div>

        {plant.uses.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>KULLANIM ALANLARI</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {plant.uses.map((u, i) => (
                <span key={i} style={{
                  background: '#374151', color: '#d1d5db', borderRadius: 8, padding: '4px 10px', fontSize: 12,
                }}>{u}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>HANGİ PARÇASI KULLANILIR</div>
          <p style={{ color: '#d1d5db', fontSize: 13 }}>{plant.parts}</p>
        </div>

        <div style={{
          background: plant.toxic ? '#7f1d1d' : '#1c1917',
          border: `1px solid ${plant.toxic ? '#ef4444' : '#92400e'}`,
          borderRadius: 12, padding: 12, marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, color: plant.toxic ? '#fca5a5' : '#fcd34d', fontWeight: 700, marginBottom: 6 }}>
            {plant.toxic ? '⚠️ TEHLİKE / UYARI' : '⚠️ DİKKAT'}
          </div>
          <p style={{ color: '#d1d5db', fontSize: 13, margin: 0 }}>{plant.caution}</p>
        </div>

        {plant.tips.length > 0 && (
          <div>
            <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>TOPLAMA İPUÇLARI</div>
            {plant.tips.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                <span style={{ color: '#22c55e', fontSize: 14, marginTop: 1 }}>•</span>
                <span style={{ color: '#d1d5db', fontSize: 13 }}>{t}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>TÜRKİYE'DE BULUNDUĞU BÖLGELER</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {plant.regions.map((r, i) => (
              <span key={i} style={{
                background: '#064e3b', color: '#6ee7b7', borderRadius: 8, padding: '3px 10px', fontSize: 12,
              }}>{r}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlantGuide() {
  const navigate = useNavigate();
  const [cat, setCat]       = useState('Tümü');
  const [hab, setHab]       = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const visible = PLANTS.filter(p => {
    if (cat !== 'Tümü' && p.category !== cat) return false;
    if (hab !== 'Tümü' && p.habitat !== hab) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.latin.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const CAT_COLOR = { Yenilebilir: '#22c55e', Tıbbi: '#06b6d4', Zehirli: '#ef4444', Dikkatli: '#f59e0b' };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 80 }}>
      <div style={{ padding: '20px 16px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Bitki Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yenilebilir, tıbbi ve zehirli bitkiler</div>
      </div>

      <div style={{ padding: '0 16px 12px' }}>
        <div style={{
          background: '#1f2937', border: '1px solid #374151', borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
        }}>
          <span style={{ color: '#9ca3af' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Bitki adı veya Latince ara..."
            style={{ background: 'none', border: 'none', color: '#f9fafb', fontSize: 14, outline: 'none', flex: 1 }}
          />
        </div>

        <div style={{ overflowX: 'auto', display: 'flex', gap: 8, paddingBottom: 4, marginBottom: 10 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              background: cat === c ? '#22c55e' : '#1f2937',
              color: cat === c ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: cat === c ? '#22c55e' : '#374151',
              borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600,
              whiteSpace: 'nowrap', cursor: 'pointer',
            }}>{c}</button>
          ))}
        </div>

        <div style={{ overflowX: 'auto', display: 'flex', gap: 8, paddingBottom: 4 }}>
          {HABITATS.map(h => (
            <button key={h} onClick={() => setHab(h)} style={{
              background: hab === h ? '#06b6d4' : '#1f2937',
              color: hab === h ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: hab === h ? '#06b6d4' : '#374151',
              borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600,
              whiteSpace: 'nowrap', cursor: 'pointer',
            }}>{h}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{visible.length} bitki bulundu</div>
        {visible.map(plant => (
          <div key={plant.id} onClick={() => setSelected(plant)} style={{
            background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 12,
            border: '1px solid #374151', cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 32 }}>{plant.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb' }}>{plant.name}</div>
                  <span style={{
                    background: (CAT_COLOR[plant.category] || '#6b7280') + '33',
                    color: CAT_COLOR[plant.category] || '#6b7280',
                    borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700,
                  }}>{plant.category}</span>
                </div>
                <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic', marginTop: 1 }}>{plant.latin}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: '#9ca3af', background: '#374151', borderRadius: 6, padding: '2px 8px' }}>
                    🌍 {plant.habitat}
                  </span>
                  <span style={{ fontSize: 11, color: '#9ca3af', background: '#374151', borderRadius: 6, padding: '2px 8px' }}>
                    📅 {plant.season.length} ay
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#9ca3af', margin: '8px 0 0', lineHeight: 1.5 }}>
                  {plant.desc.slice(0, 80)}{plant.desc.length > 80 ? '…' : ''}
                </p>
              </div>
            </div>
            {plant.toxic && (
              <div style={{
                marginTop: 10, background: '#7f1d1d', border: '1px solid #ef4444',
                borderRadius: 8, padding: '6px 10px', fontSize: 12, color: '#fca5a5', fontWeight: 600,
              }}>⚠️ ZEHİRLİ — Kesinlikle yenilmez!</div>
            )}
          </div>
        ))}
      </div>

      {selected && <PlantDetail plant={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
