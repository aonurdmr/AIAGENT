import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HERBS = [
  {
    id: 'kekik', name: 'Kekik', sci: 'Thymus serpyllum / vulgaris', icon: '🌿', accent: '#22c55e', status: 'Yenilebilir',
    region: 'Tüm Türkiye (özellikle Ege)', season: 'Mayıs–Temmuz', habitat: 'Kayalık yamaç, kuru çayır',
    medical: 'Antibakteriyal, öksürük kesici, sindirim destekleyici. Çay olarak içilir.',
    culinary: 'Et, ızgara, zeytinyağlı yemek. Kekik yağı yaraları dezenfekte eder.',
    collection: 'Çiçek döneminde üst dalları kesin. Kurutun. Alt kısımlar bırakın.',
    warning: null,
    fact: 'Türkiye dünyada en fazla kekik ihraç eden ülkeler arasındadır.',
  },
  {
    id: 'adacayi', name: 'Adaçayı', sci: 'Salvia officinalis', icon: '🌿', accent: '#84cc16', status: 'Yenilebilir',
    region: 'Ege, Akdeniz', season: 'Nisan–Temmuz', habitat: 'Kuru kayalık, taşlık alan',
    medical: 'Boğaz ağrısı, terleme azaltma, hafıza destekleyici. Ağız gargarası.',
    culinary: 'Dolma, salata, zeytinyağlı sarımsak ile kavurma. Çay.',
    collection: 'Genç yapraklar daha lezzetli. Sabah toplayın (uçucu yağ en yüksek).',
    warning: 'Hamilelikte fazla tüketilmemeli.',
    fact: 'Latince "salvare" (kurtarmak) kökünden. Orta Çağ\'da her derde deva sayılırdı.',
  },
  {
    id: 'lavanta', name: 'Lavanta', sci: 'Lavandula angustifolia', icon: '💜', accent: '#a78bfa', status: 'Yenilebilir',
    region: 'Isparta, Kıbrıs iklimi', season: 'Haziran–Temmuz', habitat: 'Kireçli toprak, güneşli yamaç',
    medical: 'Anksiyete azaltma, baş ağrısı, uyku destekleyici. Yağı aroma terapide.',
    culinary: 'Çay, fırın ürünleri, bal. İnce kullanım — fazlası acı olur.',
    collection: 'Çiçekler yarı açıkken kesin. Demet yapıp ters asın.',
    warning: null,
    fact: 'Isparta Türkiye\'nin lavanta başkentidir. Yılda 500+ ton üretim.',
  },
  {
    id: 'isirgan', name: 'Isırgan Otu', sci: 'Urtica dioica', icon: '🌱', accent: '#10b981', status: 'Yenilebilir (pişirilince)',
    region: 'Tüm Türkiye', season: 'Mart–Mayıs (genç yaprak)', habitat: 'Nemli alan, orman kenarı, çayır',
    medical: 'Demir, B vitamini, romatizma, idrar yolu desteği. Çay, taze sıkılmış suyu.',
    culinary: 'Haşlama, çorba, börek. Pişirilince yakıcılık kaybolur.',
    collection: 'Eldiven GİYİN. Genç sürgünler (30 cm altı) en lezzetli.',
    warning: 'Çiğ yenmez. Pişirme veya kurutma zorunlu.',
    fact: 'Isırgan böceği (Vanessa atalanta kelebeği) sadece ısırganda ürer.',
  },
  {
    id: 'karahindiba', name: 'Karahindiba', sci: 'Taraxacum officinale', icon: '🌼', accent: '#fbbf24', status: 'Yenilebilir',
    region: 'Tüm Türkiye', season: 'Mart–Kasım', habitat: 'Her ortam — çayır, yol kenarı, bahçe',
    medical: 'Karaciğer desteği, diüretik, vitamin A/C kaynağı.',
    culinary: 'Salata (genç yaprak), çiçek kombucha, kök kavurma/kahve.',
    collection: 'Herbisit kullanılmayan alanlardan. Tam çiçek açmadan önce en az acı.',
    warning: null,
    fact: 'Tüm parçaları yenilebilir — kök, yaprak, çiçek. Neredeyse tüm yıl bulunur.',
  },
  {
    id: 'kantaron', name: 'Sarı Kantaron', sci: 'Hypericum perforatum', icon: '🌻', accent: '#f59e0b', status: 'Tıbbi',
    region: 'Tüm Türkiye', season: 'Haziran–Ağustos', habitat: 'Kuru çayır, yol kenarı',
    medical: 'Hafif depresyon, yara iyileştirici yağ, sinir ağrısı.',
    culinary: 'Zeytinyağında bekletme (kırmızı yağ). Çay.',
    collection: 'Yaprak aydınlığa karşı tutulunca şeffaf noktalar görünür (karakteristik).',
    warning: 'İlaç etkileşimi! Antikoagülan, antidepresan kullananlar doktorla danışın.',
    fact: '"Güneş deliği" bitki: yapraktaki şeffaf noktalar yağ bezleridir.',
  },
  {
    id: 'nane', name: 'Yabani Nane', sci: 'Mentha spicata / longifolia', icon: '🍃', accent: '#06b6d4', status: 'Yenilebilir',
    region: 'Tüm Türkiye (dere kenarı)', season: 'Nisan–Ekim', habitat: 'Nemli alan, dere kenarı, gölgeli yer',
    medical: 'Sindirim destekleyici, baş ağrısı, mide bulantısı.',
    culinary: 'Çay, ayran, cacık, limonata, dolma, tabule.',
    collection: 'Çiçek öncesi en aromatik. Temiz (kirlilik yok) su kenarından.',
    warning: null,
    fact: 'Nane kokusu farelerden korunmak için de kullanılır.',
  },
  {
    id: 'cicek_papatya', name: 'Papatya (Matricaria)', sci: 'Matricaria chamomilla', icon: '🌸', accent: '#fde68a', status: 'Tıbbi',
    region: 'Tüm Türkiye', season: 'Nisan–Haziran', habitat: 'Tahıl tarlası kenarı, boş arazi',
    medical: 'Uyku, anksiyete, mide krampı, cilt yatıştırıcı.',
    culinary: 'Çay (çiçekler). Yüz buharı. Saç parlatıcı gargarası.',
    collection: 'Çiçekler tam açıkken hasat. Yapraklar değil, çiçek başları.',
    warning: 'Papatyaya alerjisi olanlar dikkatli olsun.',
    fact: 'Almanya\'da en çok kullanılan şifalı bitkilerden biri.',
  },
];

const POISONOUS = [
  { name: 'Baldıran', sci: 'Conium maculatum', warning: 'ÖLDÜRÜCü', icon: '☠️', look: 'Maydanoz/havuca benzer, mor benekli sap. Koku yoğun, hoş değil.' },
  { name: 'Güz Çiğdemi', sci: 'Colchicum autumnale', warning: 'Çok Zehirli', icon: '⚠️', look: 'Yaprak yok, pembe-mor güzel çiçek. Sonbaharda görünür.' },
  { name: 'Zehirli Böğürtlen', sci: 'Solanum nigrum', warning: 'Zehirli', icon: '🍇', look: 'Küçük siyah taneler, yeşil böğürtlene benzez.' },
  { name: 'Yabani Domates (At)', sci: 'Solanum villosum', warning: 'Zehirli', icon: '🍅', look: 'Küçük kırmızı-turuncu taneler, domates kokusu yok.' },
];

export default function HerbGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('herbs');
  const [sel, setSel] = useState(null);
  const [catFilter, setCatFilter] = useState('Tümü');

  const cats = ['Tümü', 'Yenilebilir', 'Tıbbi'];
  const filtered = catFilter === 'Tümü' ? HERBS : HERBS.filter(h => h.status.includes(catFilter));

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Şifalı Bitkiler</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye doğal bitkileri · tıbbi ve yenilebilir rehberi</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['herbs', '🌿 Bitkiler'], ['danger', '☠️ Zehirliler']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#22c55e' : '#1f2937', color: tab === id ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#22c55e' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'herbs' && (
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              {cats.map(c => (
                <button key={c} onClick={() => setCatFilter(c)} style={{
                  background: catFilter === c ? '#22c55e22' : 'transparent',
                  color: catFilter === c ? '#22c55e' : '#6b7280',
                  border: `1px solid ${catFilter === c ? '#22c55e' : '#374151'}`,
                  borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                }}>{c}</button>
              ))}
            </div>
            {filtered.map(h => {
              const open = sel === h.id;
              return (
                <div key={h.id} style={{ marginBottom: 8 }}>
                  <div onClick={() => setSel(open ? null : h.id)} style={{
                    background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                    padding: '14px 16px', border: `1px solid ${h.accent}33`, cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 28 }}>{h.icon}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{h.name}</div>
                          <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{h.sci}</div>
                        </div>
                      </div>
                      <span style={{ background: h.accent + '22', color: h.accent, border: `1px solid ${h.accent}44`, borderRadius: 20, padding: '3px 8px', fontSize: 10, fontWeight: 700 }}>{h.status}</span>
                    </div>
                  </div>
                  {open && (
                    <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${h.accent}33`, borderTop: 'none' }}>
                      <div style={{ marginTop: 8 }}>
                        {[['📍 Bölge', h.region], ['📅 Sezon', h.season], ['🏠 Habitat', h.habitat]].map(([lbl, val]) => (
                          <div key={lbl} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
                            <span style={{ fontWeight: 600, color: '#6b7280' }}>{lbl}:</span> <span style={{ color: '#d1d5db' }}>{val}</span>
                          </div>
                        ))}
                        <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                          <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 3 }}>💊 TIBBİ KULLANIM</div>
                          <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{h.medical}</div>
                        </div>
                        <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                          <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 3 }}>🍽️ YENİLEBİLİR KULLANIM</div>
                          <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{h.culinary}</div>
                        </div>
                        {h.warning && (
                          <div style={{ background: '#ef444415', borderRadius: 8, padding: '8px 10px', marginBottom: 8, border: '1px solid #ef444433' }}>
                            <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 600, marginBottom: 3 }}>⚠️ UYARI</div>
                            <div style={{ fontSize: 12, color: '#d1d5db' }}>{h.warning}</div>
                          </div>
                        )}
                        <div style={{ background: h.accent + '15', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                          <div style={{ fontSize: 10, color: h.accent, fontWeight: 600, marginBottom: 3 }}>✂️ TOPLAMA</div>
                          <div style={{ fontSize: 12, color: '#d1d5db' }}>{h.collection}</div>
                        </div>
                        <div style={{ fontSize: 11, color: '#9ca3af', fontStyle: 'italic', lineHeight: 1.5 }}>✨ {h.fact}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'danger' && (
          <div>
            <div style={{ background: '#ef444415', borderRadius: 12, padding: '12px 14px', border: '1px solid #ef444433', marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 4 }}>☠️ DOĞAL = GÜVENLİ DEĞİL</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>Türkiye'de onlarca zehirli bitki vardır. Kesin tanımadan yemeyin/dokunmayın. Şüphelenirseniz Zehir Danışma Hattı: 114</div>
            </div>
            {POISONOUS.map(p => (
              <div key={p.name} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #ef444433' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 26 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{p.sci}</div>
                    </div>
                  </div>
                  <span style={{ background: '#ef444422', color: '#ef4444', borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>{p.warning}</span>
                </div>
                <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 3 }}>🔍 NASIL TANINIR?</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{p.look}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
