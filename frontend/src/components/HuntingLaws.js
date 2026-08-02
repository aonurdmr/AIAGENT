import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 1, title: 'Temel Mevzuat', icon: '📜', accent: '#60a5fa',
    items: [
      { q: 'Av yasasının dayanağı nedir?', a: '4915 Sayılı Kara Avcılığı Kanunu (2003) ve bu kanuna dayalı çıkarılan merkez av komisyonu kararları av faaliyetlerini düzenler.' },
      { q: 'Av dönemi ne zaman ilan edilir?', a: 'Her yıl Tarım ve Orman Bakanlığı Merkez Av Komisyonu (MAK) kararıyla belirlenir. Kararlar Resmî Gazete\'de yayımlanır.' },
      { q: 'Avcılık belgesi zorunlu mu?', a: 'Evet. 18 yaş üstü herkes için avcılık belgesi, silah taşıma ruhsatı ve avcılık sigortası zorunludur.' },
    ],
  },
  {
    id: 2, title: 'Belge ve İzinler', icon: '📋', accent: '#34d399',
    items: [
      { q: 'Avcılık belgesi nasıl alınır?', a: 'İl Tarım Müdürlüğü\'ne başvurulur. Av bilgi sınavı, silah eğitimi belgesi ve ilk yardım sertifikası gerekir.' },
      { q: 'Yabancılar avlanabilir mi?', a: 'Evet, ancak Bakanlık onaylı seyahat acentesiyle gelmeleri ve yabancı avcı izni almaları gerekir.' },
      { q: 'Av sahaları için ayrı izin gerekir mi?', a: 'Devlet av sahalarında genel bilet yeterlidir; kira sözleşmeli özel sahalarda sahaya özgü izin gerekmektedir.' },
    ],
  },
  {
    id: 3, title: 'Yasak Türler ve Koruma', icon: '🛡️', accent: '#f59e0b',
    items: [
      { q: 'Tamamen koruma altındaki türler?', a: 'Kılıç balığı, deniz kaplumbağaları, tüm akbaba türleri, şahin, atmaca, baykuş ve çoğu yırtıcı kuş. Bunları yakalamak ağır para cezası gerektirir.' },
      { q: 'Kısmi koruma nedir?', a: 'Bazı türler belirli dönemlerde veya sınırlı sayıda avlanabilir. Her yıl MAK kararıyla belirlenir.' },
      { q: 'Koruma alanlarında av?', a: 'Milli park ve doğa koruma alanlarında av kesinlikle yasaktır. Av yönetim alanlarında ise kota uygulanır.' },
    ],
  },
  {
    id: 4, title: 'Ekipman Kuralları', icon: '🏹', accent: '#a855f7',
    items: [
      { q: 'Hangi silahlar yasaldır?', a: 'Pompalı ve av tüfekleri (lisanslı). Yarı otomatik silahlar yalnızca 2 atımlık kapasiteyle kullanılabilir. Sessizleştirici ve lazer nişangah yasaktır.' },
      { q: 'Tuzak ve kapan kullanımı?', a: 'Kural dışı tuzaklar, demir kapanlar, zehir ve patlayıcı madde kullanımı tamamen yasaktır.' },
      { q: 'Gece avlanma kuralları?', a: 'Yapay ışık, termal kamera ve gece görüş teçhizatıyla avlanmak yasaktır. Gün batımından 1 saat sonrasına kadar av yapılabilir.' },
    ],
  },
  {
    id: 5, title: 'Cezalar', icon: '⚖️', accent: '#ef4444',
    items: [
      { q: 'Ruhsatsız avlanmanın cezası?', a: '4915/CK kapsamında 5.000–50.000 TL idari para cezası ve ekipmanların müsaderesi. Tekrarda daha ağır ceza.' },
      { q: 'Koruma altındaki tür avının cezası?', a: 'Her av edilen birey için ayrı ceza. Bazı türlerde 2 yıla kadar hapis cezası söz konusu olabilir.' },
      { q: 'Kaçak av sahasının cezası?', a: 'Özel av sahalarına izinsiz girişte 3.000–15.000 TL para cezası. Sahip tarafından suç duyurusu hakkı saklıdır.' },
    ],
  },
  {
    id: 6, title: 'Günlük Kota ve Sezonlar', icon: '📅', accent: '#f97316',
    items: [
      { q: 'Günlük keklik kotası nedir?', a: 'MAK kararına göre değişir; tipik olarak kırmızı keklik 6 adet/gün, kınalı keklik 10 adet/gün.' },
      { q: 'Yabani domuz sezonu var mı?', a: 'Yabani domuz yıl boyunca avcılık ruhsatıyla avlanabilir; kota yoktur. Hasar azaltma amaçlı çevre sakinlerine de izin verilebilir.' },
      { q: 'Köy koruma avı nedir?', a: 'Tarım arazilerine zarar veren türler (domuz, tilki, çakal) için köy muhtarlığı aracılığıyla özel izin alınabilir.' },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <button onClick={onToggle} style={{
        width: '100%', textAlign: 'left', background: isOpen ? '#1e3a5f' : '#374151',
        border: `1px solid ${isOpen ? '#3b82f6' : '#4b5563'}`, borderRadius: 10,
        color: '#f9fafb', padding: '12px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
      }}>
        <span>{item.q}</span>
        <span style={{ fontSize: 16, color: '#6b7280', flexShrink: 0 }}>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div style={{ background: '#1f2937', borderRadius: '0 0 10px 10px', padding: '12px 14px', border: '1px solid #374151', borderTop: 'none' }}>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{item.a}</div>
        </div>
      )}
    </div>
  );
}

export default function HuntingLaws() {
  const navigate = useNavigate();
  const [openItem, setOpenItem] = useState(null);

  const toggle = (key) => setOpenItem(openItem === key ? null : key);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⚖️ Av Mevzuatı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4915 sayılı Kanun · izinler, yasaklar ve cezalar</div>
      </div>

      <div style={{ margin: '0 16px 14px', background: '#1e3a5f', borderRadius: 14, padding: '12px 16px', border: '1px solid #3b82f644' }}>
        <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>ℹ️ BİLGİ</div>
        <div style={{ fontSize: 12, color: '#bfdbfe', lineHeight: 1.6 }}>
          Bu bilgiler genel rehber niteliğindedir. Güncel kota ve kurallar için Tarım ve Orman Bakanlığı Merkez Av Komisyonu kararlarına başvurun.
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(section => (
          <div key={section.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{section.icon}</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: section.accent }}>{section.title}</div>
            </div>
            {section.items.map((item, idx) => {
              const key = `${section.id}-${idx}`;
              return (
                <AccordionItem key={key} item={item} isOpen={openItem === key} onToggle={() => toggle(key)} />
              );
            })}
          </div>
        ))}

        {/* Quick refs */}
        <div style={{ background: '#374151', borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>📞 HIZLI REFERANS</div>
          {[
            { label: 'Bakanlık Bilgi Hattı', val: '444 8 141', icon: '📞' },
            { label: 'Orman Yangın Hattı', val: '177', icon: '🔥' },
            { label: 'Jandarma', val: '156', icon: '🚨' },
          ].map(ref => (
            <div key={ref.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #4b5563' }}>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>{ref.icon} {ref.label}</div>
              <a href={`tel:${ref.val.replace(/\s/g, '')}`} style={{ fontSize: 14, fontWeight: 700, color: '#60a5fa', textDecoration: 'none' }}>{ref.val}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
