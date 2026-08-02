import React, { useState } from 'react';

const REGIONS = ['Tümü', 'Ege', 'Akdeniz', 'Karadeniz', 'Anadolu', 'Marmara'];
const TYPES   = ['Tümü', 'Orman', 'Kıyı', 'Dağ', 'Göl', 'Vadi'];

const SPOTS = [
  {
    id: 1, name: 'Köyceğiz Gölü Kamp', region: 'Ege', type: 'Göl',
    icon: '💧', rating: 4.8, difficulty: 'Kolay',
    coords: 'Köyceğiz, Muğla',
    features: ['Su kenarı', 'Tekne', 'Balıkçılık', 'Piknik'],
    season: 'Nisan–Kasım', fee: 'Ücretsiz (bazı alanlar)',
    desc: 'Köyceğiz Gölü kenarında muhteşem doğa içinde kamp. Akdeniz\'in gizli cenneti.',
  },
  {
    id: 2, name: 'Olimpos Plaj Kampı', region: 'Akdeniz', type: 'Kıyı',
    icon: '🏖️', rating: 4.9, difficulty: 'Kolay',
    coords: 'Olimpos, Antalya',
    features: ['Deniz kenarı', 'Antik şehir', 'Yürüyüş', 'Snorkel'],
    season: 'Mayıs–Ekim', fee: 'Ücretli (treehouse/çadır)',
    desc: 'Antik kalıntılar arasında deniz kenarında kamp. Treehouse alternatifleri ile ünlü.',
  },
  {
    id: 3, name: 'Yedigöller Milli Parkı', region: 'Karadeniz', type: 'Orman',
    icon: '🌲', rating: 4.7, difficulty: 'Orta',
    coords: 'Bolu',
    features: ['7 Göl', 'Fotoğraf', 'Yürüyüş', 'Kuş gözlemi'],
    season: 'Mayıs–Ekim (sonbahar zirve)', fee: 'Milli park girişi ücretli',
    desc: 'Türkiye\'nin sonbahar renk şöleni. Yedi doğal göl ile eşsiz doğa manzarası.',
  },
  {
    id: 4, name: 'Kaçkar Dağları', region: 'Karadeniz', type: 'Dağ',
    icon: '⛰️', rating: 4.9, difficulty: 'Zor',
    coords: 'Rize / Artvin',
    features: ['Treking', 'Yaban hayatı', 'Buzul', 'Yayla'],
    season: 'Temmuz–Eylül', fee: 'Rehber önerilir',
    desc: 'Türkiye\'nin en zorlu ve en ödüllendirici dağ kampı. Kaçkar zirvesi 3932m.',
  },
  {
    id: 5, name: 'Aydos Ormanı', region: 'Marmara', type: 'Orman',
    icon: '🌳', rating: 4.2, difficulty: 'Kolay',
    coords: 'Pendik, İstanbul',
    features: ['İstanbul yakını', 'Piknik', 'Yürüyüş', 'Bisiklet'],
    season: 'Tüm yıl', fee: 'Ücretsiz',
    desc: 'İstanbul\'a en yakın kamp noktalarından biri. Hızlı doğa kaçışı için ideal.',
  },
  {
    id: 6, name: 'Çanakkale Troya Çevresi', region: 'Marmara', type: 'Kıyı',
    icon: '🏛️', rating: 4.5, difficulty: 'Kolay',
    coords: 'Çanakkale',
    features: ['Tarih', 'Deniz', 'Balıkçılık', 'Kültür'],
    season: 'Nisan–Kasım', fee: 'Ücretli',
    desc: 'Tarihi Troya yakınında kamp, Ege denizi kıyısında balıkçılık imkânı.',
  },
  {
    id: 7, name: 'Göreme (Kapadokya)', region: 'Anadolu', type: 'Vadi',
    icon: '🎈', rating: 4.8, difficulty: 'Kolay',
    coords: 'Nevşehir',
    features: ['Balon', 'Peri bacası', 'Yürüyüş', 'At binme'],
    season: 'Nisan–Kasım (balon için Nisan-Mayıs)', fee: 'Ücretli kamp alanı',
    desc: 'Peri bacaları arasında balon izleyerek sabaha uyanan eşsiz kamp deneyimi.',
  },
  {
    id: 8, name: 'Tuz Gölü Kenarı', region: 'Anadolu', type: 'Göl',
    icon: '🧂', rating: 4.3, difficulty: 'Kolay',
    coords: 'Aksaray / Konya',
    features: ['Tuz kristalleri', 'Flamingo', 'Fotoğraf', 'Güneş batışı'],
    season: 'Haziran–Eylül', fee: 'Ücretsiz',
    desc: 'Türkiye\'nin en büyük gölü kenarında flamingo izleme ve günbatımı fotoğrafçılığı.',
  },
  {
    id: 9, name: 'Milli Boğazı (Dalyan)', region: 'Ege', type: 'Kıyı',
    icon: '🐢', rating: 4.7, difficulty: 'Kolay',
    coords: 'Dalyan, Muğla',
    features: ['Caretta caretta', 'Tekne', 'Kaya mezarları', 'Çamur banyosu'],
    season: 'Nisan–Kasım', fee: 'Ücretli',
    desc: 'Caretta caretta kaplumbağası yuvası. İztuzu Plajı ve kaya mezarlarıyla eşsiz.',
  },
  {
    id: 10, name: 'Abant Gölü', region: 'Karadeniz', type: 'Göl',
    icon: '🏔️', rating: 4.6, difficulty: 'Kolay',
    coords: 'Bolu',
    features: ['Göl', 'Çam ormanı', 'Yürüyüş', 'Balık avı'],
    season: 'Mayıs–Kasım', fee: 'Milli park ücreti',
    desc: 'Tektonik kökenli doğal göl çevresinde çam ormanı kampı. Alabalık balıkçılığı mümkün.',
  },
];

const PACKING = {
  'Temel': [
    { item: 'Çadır', icon: '⛺', priority: 'Zorunlu' },
    { item: 'Uyku tulumu', icon: '🛌', priority: 'Zorunlu' },
    { item: 'Şişme yatak/mat', icon: '🔵', priority: 'Zorunlu' },
    { item: 'El feneri + pil', icon: '🔦', priority: 'Zorunlu' },
    { item: 'Çakı/multitool', icon: '🔪', priority: 'Zorunlu' },
    { item: 'İlk yardım çantası', icon: '🩹', priority: 'Zorunlu' },
    { item: 'Su (günlük 2L/kişi)', icon: '💧', priority: 'Zorunlu' },
  ],
  'Yemek': [
    { item: 'Kamp ocağı + gaz', icon: '🔥', priority: 'Önerilen' },
    { item: 'Tencere/tava seti', icon: '🍳', priority: 'Önerilen' },
    { item: 'Bardak/tabak seti', icon: '🥣', priority: 'Önerilen' },
    { item: 'Çakmak x2', icon: '🔥', priority: 'Zorunlu' },
    { item: 'Kolay yemekler', icon: '🥫', priority: 'Önerilen' },
  ],
  'Güvenlik': [
    { item: 'Harita/Pusula', icon: '🧭', priority: 'Önerilen' },
    { item: 'Acil düdük', icon: '📯', priority: 'Önerilen' },
    { item: 'Böcek kovucu', icon: '🦟', priority: 'Tavsiye' },
    { item: 'Güneş kremi', icon: '☀️', priority: 'Tavsiye' },
    { item: 'Yağmurluk', icon: '🧥', priority: 'Önerilen' },
    { item: 'Şarj edilebilir banka', icon: '🔋', priority: 'Tavsiye' },
  ],
  'Konfor': [
    { item: 'Kamp sandalyesi', icon: '🪑', priority: 'İsteğe bağlı' },
    { item: 'Hamak', icon: '🪄', priority: 'İsteğe bağlı' },
    { item: 'Kamp masası', icon: '🪵', priority: 'İsteğe bağlı' },
    { item: 'Güneş şemsi', icon: '⛱️', priority: 'İsteğe bağlı' },
    { item: 'Biyobozunur sabun', icon: '🧼', priority: 'Zorunlu' },
  ],
};

const PRIORITY_STYLE = {
  'Zorunlu': { color: '#ef4444', bg: '#ef444415' },
  'Önerilen': { color: '#22c55e', bg: '#22c55e15' },
  'Tavsiye': { color: '#f59e0b', bg: '#f59e0b15' },
  'İsteğe bağlı': { color: '#94a3b8', bg: '#94a3b815' },
};

function SpotCard({ spot, onClick }) {
  const dc = { 'Kolay': '#22c55e', 'Orta': '#f59e0b', 'Zor': '#ef4444' }[spot.difficulty];
  return (
    <div onClick={() => onClick(spot)} style={{
      background: 'var(--s2)', border: '1px solid var(--border)',
      borderRadius: 16, padding: 14, marginBottom: 8, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, flexShrink: 0,
          background: 'var(--s3)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
        }}>{spot.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 3 }}>{spot.name}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 5 }}>
            <span style={{ fontSize: 10, color: dc, background: dc+'15', borderRadius: 6, padding:'2px 6px', fontWeight:600 }}>{spot.difficulty}</span>
            <span style={{ fontSize: 10, color: 'var(--t-mute)' }}>📍 {spot.coords}</span>
          </div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {spot.features.slice(0,3).map(f => (
              <span key={f} style={{ fontSize: 9, color: 'var(--t-mute)', background: 'var(--s3)', borderRadius: 5, padding:'2px 6px' }}>{f}</span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 13, color: '#fbbf24' }}>⭐ {spot.rating}</div>
          <div style={{ fontSize: 9, color: 'var(--t-mute)', marginTop: 2 }}>{spot.season.split('–')[0]}</div>
        </div>
      </div>
    </div>
  );
}

function SpotDetail({ spot, onClose }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.7)', zIndex:100, display:'flex', alignItems:'flex-end' }} onClick={onClose}>
      <div style={{ background:'var(--bg)', borderRadius:'20px 20px 0 0', width:'100%', maxHeight:'80vh', overflowY:'auto', padding:20 }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
          <div>
            <div style={{ fontSize:24 }}>{spot.icon}</div>
            <div style={{ fontWeight:800, fontSize:18, color:'#fff', marginTop:4 }}>{spot.name}</div>
            <div style={{ fontSize:12, color:'var(--t-mute)' }}>📍 {spot.coords}</div>
          </div>
          <button onClick={onClose} style={{ background:'var(--s3)', border:'1px solid var(--border)', borderRadius:8, padding:'4px 10px', cursor:'pointer', color:'var(--t-mute)', fontSize:14 }}>✕</button>
        </div>
        <div style={{ fontSize:13, color:'var(--t-mid)', lineHeight:1.6, marginBottom:12 }}>{spot.desc}</div>
        <div style={{ display:'flex', gap:8, marginBottom:12 }}>
          {[['⭐',spot.rating,'Puan'],['📅',spot.season,'Sezon'],['💰',spot.fee,'Ücret']].map(([ic,val,lab])=>(
            <div key={lab} style={{ flex:1, background:'var(--s2)', border:'1px solid var(--border)', borderRadius:10, padding:'8px', textAlign:'center' }}>
              <div style={{ fontSize:16 }}>{ic}</div>
              <div style={{ fontWeight:700, fontSize:10, color:'#fff' }}>{val}</div>
              <div style={{ fontSize:9, color:'var(--t-mute)' }}>{lab}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
          {spot.features.map(f => <span key={f} style={{ fontSize:11, color:'#22c55e', background:'#22c55e15', borderRadius:8, padding:'3px 9px' }}>✓ {f}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function CampingGuide() {
  const [tab,      setTab]      = useState('spots');
  const [region,   setRegion]   = useState('Tümü');
  const [type,     setType]     = useState('Tümü');
  const [selected, setSelected] = useState(null);
  const [packCat,  setPackCat]  = useState('Temel');

  const filtered = SPOTS.filter(s =>
    (region === 'Tümü' || s.region === region) &&
    (type   === 'Tümü' || s.type   === type)
  );

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #001000 0%, #002000 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>⛺ Kamp Rehberi</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Türkiye'nin en iyi kamp yerleri ve ekipman rehberi</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Tabs */}
        <div style={{ display:'flex', gap:6, marginBottom:14 }}>
          {[['spots','🗺️ Kamp Yerleri'],['packing','🎒 Ekipman Listesi']].map(([key,label])=>(
            <button key={key} onClick={()=>setTab(key)} style={{
              flex:1, padding:'9px', borderRadius:12, cursor:'pointer',
              background: tab===key ? 'var(--a-glow)' : 'var(--s2)',
              border: tab===key ? '1px solid var(--border-lg)' : '1px solid var(--border)',
              color: tab===key ? 'var(--a-light)' : 'var(--t-mute)',
              fontSize:12, fontWeight:700,
            }}>{label}</button>
          ))}
        </div>

        {/* SPOTS TAB */}
        {tab === 'spots' && (
          <>
            <div style={{ display:'flex', gap:5, overflowX:'auto', paddingBottom:2, marginBottom:8 }}>
              {REGIONS.map(r=>(
                <button key={r} onClick={()=>setRegion(r)} style={{
                  flexShrink:0, padding:'5px 11px', borderRadius:14, cursor:'pointer',
                  background: region===r?'var(--a-glow)':'var(--s2)',
                  border: region===r?'1px solid var(--border-lg)':'1px solid var(--border)',
                  color: region===r?'var(--a-light)':'var(--t-mute)',
                  fontSize:11, fontWeight:600, whiteSpace:'nowrap',
                }}>{r}</button>
              ))}
            </div>
            <div style={{ display:'flex', gap:5, overflowX:'auto', paddingBottom:2, marginBottom:14 }}>
              {TYPES.map(t=>(
                <button key={t} onClick={()=>setType(t)} style={{
                  flexShrink:0, padding:'5px 11px', borderRadius:14, cursor:'pointer',
                  background: type===t?'var(--a-glow)':'var(--s2)',
                  border: type===t?'1px solid var(--border-lg)':'1px solid var(--border)',
                  color: type===t?'var(--a-light)':'var(--t-mute)',
                  fontSize:11, fontWeight:600, whiteSpace:'nowrap',
                }}>{t}</button>
              ))}
            </div>
            <div style={{ fontSize:11, color:'var(--t-mute)', marginBottom:10 }}>{filtered.length} kamp yeri</div>
            {filtered.map(s=><SpotCard key={s.id} spot={s} onClick={setSelected} />)}
          </>
        )}

        {/* PACKING TAB */}
        {tab === 'packing' && (
          <>
            <div style={{ display:'flex', gap:5, overflowX:'auto', paddingBottom:2, marginBottom:14 }}>
              {Object.keys(PACKING).map(cat=>(
                <button key={cat} onClick={()=>setPackCat(cat)} style={{
                  flexShrink:0, padding:'6px 12px', borderRadius:14, cursor:'pointer',
                  background: packCat===cat?'var(--a-glow)':'var(--s2)',
                  border: packCat===cat?'1px solid var(--border-lg)':'1px solid var(--border)',
                  color: packCat===cat?'var(--a-light)':'var(--t-mute)',
                  fontSize:11, fontWeight:600, whiteSpace:'nowrap',
                }}>{cat}</button>
              ))}
            </div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
              {Object.entries(PRIORITY_STYLE).map(([key,{color,bg}])=>(
                <div key={key} style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color }}>
                  <div style={{ width:8,height:8,borderRadius:'50%',background:color }} />
                  {key}
                </div>
              ))}
            </div>
            {PACKING[packCat].map((item,i)=>{
              const style = PRIORITY_STYLE[item.priority];
              return (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding:'10px 12px', background:'var(--s2)',
                  border:'1px solid var(--border)', borderRadius:10, marginBottom:6,
                }}>
                  <span style={{ fontSize:20 }}>{item.icon}</span>
                  <span style={{ flex:1, fontSize:13, fontWeight:600, color:'#fff' }}>{item.item}</span>
                  <span style={{ fontSize:10, fontWeight:700, color:style.color, background:style.bg, borderRadius:8, padding:'2px 8px' }}>
                    {item.priority}
                  </span>
                </div>
              );
            })}
          </>
        )}

        <div style={{ height:20 }} />
      </div>

      {selected && <SpotDetail spot={selected} onClose={()=>setSelected(null)} />}
    </div>
  );
}
