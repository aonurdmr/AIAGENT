import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  {
    id: 'edible', name: 'Yenilebilir Bitkiler', icon: '🌿', accent: '#22c55e',
    count: '120+ tür',
    examples: [
      { name: 'Isırgan Otu', latin: 'Urtica dioica', use: 'Çorba, börek dolgusu', season: 'Mart-Mayıs', warn: 'Eldiven ile topla — deri tahrişi' },
      { name: 'Kuşburnu', latin: 'Rosa canina', use: 'Çay, reçel, kurutulmuş', season: 'Eylül-Kasım', warn: 'Tohumları tahrişli — sadece et kısmı' },
      { name: 'Yabani Nane', latin: 'Mentha arvensis', use: 'Çay, sos, marinat', season: 'Nisan-Ekim', warn: 'Güvenli — doğrudan tüketilebilir' },
      { name: 'Ebegümeci', latin: 'Malva sylvestris', use: 'Salata, pişirme', season: 'Nisan-Temmuz', warn: 'Güvenli — tüm yeşil kısımlar' },
    ],
    tip: 'Tanımadığın hiçbir bitkiyi yeme — benzer görünümlü türler öldürücü olabilir.',
  },
  {
    id: 'medicinal', name: 'Tıbbi Bitkiler', icon: '💊', accent: '#a78bfa',
    count: '80+ tür',
    examples: [
      { name: 'Kantaron', latin: 'Hypericum perforatum', use: 'Yara iyileştirici yağ, depresyon çayı', season: 'Haziran-Ağustos', warn: 'Antidepresanlarla etkileşim — hekime sor' },
      { name: 'Papatya', latin: 'Matricaria chamomilla', use: 'Sindirim, sakinleştirici çay', season: 'Nisan-Haziran', warn: 'Papatyaya alerjin varsa dikkat' },
      { name: 'Biberiye', latin: 'Rosmarinus officinalis', use: 'Dolaşım, baş ağrısı, ısırık', season: 'Yıl boyu', warn: 'Hamilelikte aşırı tüketme' },
      { name: 'Kekik', latin: 'Thymus vulgaris', use: 'Antiseptik, öksürük, sinüzit', season: 'Haziran-Ağustos', warn: 'Güvenli — doğal antibiyotik' },
    ],
    tip: 'Tıbbi bitkiler ilaç yerine geçmez — kronik rahatsızlıklarda hekime başvur.',
  },
  {
    id: 'toxic', name: 'Zehirli Bitkiler', icon: '☠️', accent: '#ef4444',
    count: '50+ tür',
    examples: [
      { name: 'Boru Çiçeği', latin: 'Datura stramonium', use: '—', season: 'Yaz', warn: 'ÖLÜMCÜL — tüm kısımları zehirli' },
      { name: 'Patlıcan Otu', latin: 'Atropa belladonna', use: '—', season: 'Yaz-Sonbahar', warn: 'ÖLÜMCÜL — mor meyvelere dokunma' },
      { name: 'Zakkum', latin: 'Nerium oleander', use: '—', season: 'Yıl boyu', warn: 'ÖLÜMCÜL — duman bile tehlikeli' },
      { name: 'Acı Badem', latin: 'Prunus amygdalus var. amara', use: '—', season: 'Yaz', warn: 'Çiğ tüketimde siyanür üretir' },
    ],
    tip: 'Zehirlenme belirtisi: kusma, baş dönmesi, kasılma — hemen 112\'yi ara.',
  },
  {
    id: 'indicator', name: 'Gösterge Bitkiler', icon: '🧭', accent: '#06b6d4',
    count: '30+ işaret',
    examples: [
      { name: 'Sarmaşık', latin: 'Hedera helix', use: 'Kuzey gösteri — nemli kuzey yüz', season: 'Yıl boyu', warn: 'Meyvesi zehirli' },
      { name: 'Güneş Çiçeği', latin: 'Helianthus annuus', use: 'Güneş takipçisi — yön tayini', season: 'Yaz', warn: 'Güvenli' },
      { name: 'Kavak Ağacı', latin: 'Populus sp.', use: 'Su kaynağı işareti — yeraltı suyu', season: 'Yıl boyu', warn: 'Güvenli' },
      { name: 'Liken', latin: 'Parmelia sp.', use: 'Kuzey gösteri — çoğu kuzeye büyür', season: 'Yıl boyu', warn: 'Güvenli' },
    ],
    tip: 'Gösterge bitkiler hayatta kalma durumunda yön ve su bulmana yardımcı olur.',
  },
];

const ID_STEPS = [
  { step: 1, title: 'Habitat', desc: 'Nerede büyüyor? Orman, çayır, kıyı, dağ, kuru toprak?' },
  { step: 2, title: 'Yaprak Şekli', desc: 'Kenar dişli mi? Tüylü mü? Karşılıklı mı zıt mı?' },
  { step: 3, title: 'Çiçek Rengi', desc: 'Kaç taç yaprak? Rengi nedir? Koku var mı?' },
  { step: 4, title: 'Gövde Yapısı', desc: 'İçi dolu mu boş mu? Çiçekli mi yalnız gövde mi?' },
  { step: 5, title: 'Koku Test', desc: 'Ezmeden serbest bırakılan koku → nane, soğan, acı?' },
  { step: 6, title: 'Uygulama Testi', desc: 'Bilinmeyende: cilde sür, 15 dk bekle — tahriş yoksa dil ucuna değdir' },
];

export default function PlantIdentify() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('cats');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040d06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌱 Bitki Tanıma Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 kategori · yenilebilir, tıbbi, zehirli, gösterge</div>
      </div>

      <div style={{ background: '#0d1a08', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>⚠️ UYARI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Kesin emin olmadan hiçbir bitkiyi yeme. Benzer görünümlü türler arasında ölümcül fark olabilir.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['cats','Kategoriler'],['id','Tanıma Adımları']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#071009', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'cats' && CATEGORIES.map(c => {
          const open = sel === c.id;
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : c.id)} style={{
                background: '#071009', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${c.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{c.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{c.count}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#071009', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${c.accent}33`, borderTop: 'none' }}>
                  {c.examples.map((e, i) => (
                    <div key={i} style={{ marginTop: 10, paddingBottom: 10, borderBottom: i < c.examples.length-1 ? `1px solid ${c.accent}22` : 'none' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: c.accent }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic', marginTop: 1 }}>{e.latin}</div>
                      {e.use !== '—' && <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 3 }}>✅ {e.use}</div>}
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>📅 {e.season}</div>
                      <div style={{ fontSize: 11, color: c.id === 'toxic' ? '#ef4444' : '#f59e0b', marginTop: 2 }}>⚠️ {e.warn}</div>
                    </div>
                  ))}
                  <div style={{ background: c.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 10 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {c.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'id' && (
          <div style={{ background: '#071009', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 12 }}>🔍 6 Adımda Bitki Tanıma</div>
            {ID_STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#22c55e22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#22c55e', flexShrink: 0 }}>{s.step}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac' }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
