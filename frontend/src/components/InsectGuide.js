import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const INSECTS = [
  {
    id: 1, name: 'Balarısı', en: 'Honey Bee', icon: '🐝', type: 'Yararlı',
    accent: '#f59e0b', season: 'İlkbahar–Sonbahar',
    habitat: 'Çiçekli alan, bahçe, orman kenarı',
    risk: 'Düşük (alerjik bireylerde yüksek)',
    desc: 'Polinasyon için kritik. Genellikle saldırmaz. Provoke edilirse sokabilir.',
    first_aid: 'İğneyi çıkarın, bölgeyi soğuk su ile yıkayın. Alerjiniz varsa EpiPen bulundurun.',
    tip: 'Sarı-siyah çizgili, tüylü gövde. Kovana yaklaşmayın.',
    use: 'Bal toplama, tozlaşma göstergesi olarak ekosistem sağlığı barometresi.',
  },
  {
    id: 2, name: 'Kene', en: 'Tick', icon: '🕷️', type: 'Tehlikeli',
    accent: '#ef4444', season: 'Mart–Kasım',
    habitat: 'Çalılık, yüksek ot, orman altı',
    risk: 'Yüksek (Lyme hastalığı, KKKA bulaştırabilir)',
    desc: 'Kahverengi, küçük oval gövde. Cilde yapışıp kan emer. Gözle zor fark edilir.',
    first_aid: 'Cımbızla dik çıkarın, keneyi ezmeden. 30 gün içinde döküntü/ateş varsa doktora gidin.',
    tip: 'Ormanlıktan sonra tüm vücudu kontrol edin. Açık renkli kıyafet giyin.',
    use: 'N/A — parazit.',
  },
  {
    id: 3, name: 'Çekirge / Ağustos Böceği', en: 'Cicada', icon: '🦗', type: 'Nötr',
    accent: '#84cc16', season: 'Yaz',
    habitat: 'Ağaç gövdeleri, sıcak açık alan',
    risk: 'Yok',
    desc: 'Yüksek sesli tiz ses çıkarır. Zararlı değil. Biyoçeşitlilik göstergesi.',
    first_aid: 'Yok.',
    tip: 'Sesi duyarsanız hava sıcak ve ağaçlar sağlıklı demektir.',
    use: 'Balık yemi olarak bazı avlarda kullanılır.',
  },
  {
    id: 4, name: 'Tahtakurusu (Yaban)', en: 'Bedbug / Stinkbug', icon: '🐛', type: 'Zararlı',
    accent: '#f97316', season: 'Yıl boyu',
    habitat: 'Nemli çürük odun, kaya altı',
    risk: 'Düşük (koku sıkıntısı)',
    desc: 'Yeşil-kahve kalkan böceği. Dokunulunca keskin koku salgılar. Zararlı değil ama rahatsız edici.',
    first_aid: 'Sabun ve su ile yıkayın.',
    tip: 'Çadırınıza girerse kötü koku bırakabilir. Eldiven ile toplayıp uzaklaştırın.',
    use: 'Yok.',
  },
  {
    id: 5, name: 'Ateşböceği', en: 'Firefly', icon: '✨', type: 'Yararlı',
    accent: '#fde68a', season: 'Haziran–Ağustos',
    habitat: 'Nemli orman kenarı, çayır',
    risk: 'Yok',
    desc: 'Geceleri biyolüminesans ışık üretir. Zararlı değil. Nemli ve temiz ekosistem göstergesi.',
    first_aid: 'Yok.',
    tip: 'Gece balıkçılığında ateşböceği görüyorsanız ortam temiz ve oksijenlı demektir.',
    use: 'Ekosistem kalite göstergesi.',
  },
  {
    id: 6, name: 'Eşek Arısı', en: 'Wasp / Hornet', icon: '🐝', type: 'Tehlikeli',
    accent: '#dc2626', season: 'Yaz–Erken Sonbahar',
    habitat: 'Yuva yapılan ağaç kovukları, çatı arası, toprak',
    risk: 'Yüksek (özellikle yuva rahatsız edilirse)',
    desc: 'Sarı-siyah çizgili, ince bel. Arıdan farklı olarak defalarca sokabilir.',
    first_aid: 'Bölgeyi soğutun. Çok sayıda sokarsa derhal hastaneye. Anafilaksi riski var.',
    tip: 'Yuvaya yaklaşmayın. Tatlı içecekler çeker, dikkat edin.',
    use: 'Yok.',
  },
  {
    id: 7, name: 'Olta Sineği (Simulidae)', en: 'Black Fly', icon: '🪲', type: 'Zararlı',
    accent: '#6b7280', season: 'İlkbahar–Yaz',
    habitat: 'Akarsu kenarı, nemli orman',
    risk: 'Orta (ısırık; kaşıntı ve şişme)',
    desc: 'Siyah-koyu, küçük ısıran sinek. Nehir kenarı balıkçılarını çok rahatsız eder.',
    first_aid: 'Antihistaminik krem. Kaşımayın — enfeksiyon riski var.',
    tip: 'Açık renkli kıyafet giyin. DEET içerikli böcek kovucu kullanın.',
    use: 'Bazı yapay sinekçi olta yemleri bu sineği taklit eder.',
  },
  {
    id: 8, name: 'Su Bitiği', en: 'Water Boatman', icon: '🪲', type: 'Yararlı',
    accent: '#06b6d4', season: 'Yaz',
    habitat: 'Durgun su, gölet, baraj',
    risk: 'Yok',
    desc: 'Su yüzeyinde koşan küçük su böceği. Balık için doğal yem. Temiz su göstergesi.',
    first_aid: 'Yok.',
    tip: 'Su bitiği gördüğünüz gölette balık çok olabilir.',
    use: 'Fly fishing\'de yapay yem olarak kullanılır.',
  },
];

const TYPE_COLORS = {
  'Yararlı': '#22c55e',
  'Nötr': '#9ca3af',
  'Zararlı': '#f59e0b',
  'Tehlikeli': '#ef4444',
};

const FILTERS = ['Tümü', 'Yararlı', 'Tehlikeli', 'Zararlı', 'Nötr'];

function TypeBadge({ type }) {
  const color = TYPE_COLORS[type] || '#6b7280';
  return <span style={{ background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{type}</span>;
}

function InsectCard({ ins, onClick }) {
  return (
    <div onClick={() => onClick(ins)} style={{ background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${ins.accent}44`, cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <div style={{ fontSize: 40, lineHeight: 1, marginTop: 2 }}>{ins.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{ins.name}</div>
          <TypeBadge type={ins.type} />
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic', marginBottom: 6 }}>{ins.en}</div>
        <div style={{ fontSize: 11, color: '#9ca3af' }}>📅 {ins.season} · 🌲 {ins.habitat.split(',')[0]}</div>
      </div>
    </div>
  );
}

function InsectDetail({ ins, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 52 }}>{ins.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb', marginBottom: 4 }}>{ins.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic', marginBottom: 6 }}>{ins.en}</div>
            <TypeBadge type={ins.type} />
          </div>
        </div>

        {(ins.type === 'Tehlikeli') && (
          <div style={{ background: '#450a0a', borderRadius: 12, padding: '12px 14px', marginBottom: 14, border: '1px solid #f8717144' }}>
            <div style={{ fontSize: 11, color: '#f87171', fontWeight: 600, marginBottom: 4 }}>🚨 RİSK: {ins.risk}</div>
            <div style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.6 }}>{ins.first_aid}</div>
          </div>
        )}

        {[
          { title: '📋 AÇIKLAMA', text: ins.desc },
          { title: '🌲 HABİTAT', text: ins.habitat },
          { title: '⚠️ RİSK', text: ins.risk },
          { title: '💊 İLK YARDIM', text: ins.first_aid },
          { title: '💡 DOĞADA İPUCU', text: ins.tip },
          ...(ins.use !== 'Yok.' && ins.use !== 'N/A — parazit.' ? [{ title: '🎣 KULLANIM', text: ins.use }] : []),
        ].map(s => (
          <div key={s.title} style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{s.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InsectGuide() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => INSECTS.filter(ins => {
    const matchF = filter === 'Tümü' || ins.type === filter;
    const q = search.toLowerCase();
    return matchF && (!q || ins.name.toLowerCase().includes(q) || ins.en.toLowerCase().includes(q));
  }), [filter, search]);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪲 Böcek Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>8 tür · doğada karşılaşılan böcekler</div>
      </div>

      <div style={{ padding: '0 16px 10px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Böcek adı ara…"
          style={{ width: '100%', boxSizing: 'border-box', background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}
        />
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? '#3b82f6' : '#1f2937',
            color: filter === f ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: filter === f ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{f}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {filtered.map(ins => <InsectCard key={ins.id} ins={ins} onClick={setSelected} />)}
      </div>

      {selected && <InsectDetail ins={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
