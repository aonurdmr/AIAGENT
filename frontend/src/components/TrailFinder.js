import React, { useState } from 'react';

const DIFFICULTIES = ['Tümü', 'Kolay', 'Orta', 'Zor', 'Uzman'];
const REGIONS      = ['Tümü', 'Marmara', 'Ege', 'Akdeniz', 'Karadeniz', 'Anadolu', 'Doğu'];

const TRAILS = [
  {
    id: 1, name: 'Likya Yolu', region: 'Akdeniz', difficulty: 'Orta',
    distance: 540, elevation: 1800, duration: '29 gün (toplam)', rating: 4.9,
    icon: '🏔️', color: '#f59e0b',
    season: 'Ekim–Nisan', type: 'Uzun Rota',
    features: ['Deniz manzarası', 'Antik şehirler', 'Koylar', 'Kamp'],
    wildlife: ['Kaplumbağa', 'Akdeniz fogu', 'Keklik'],
    desc: 'Türkiye\'nin en ünlü yürüyüş rotası. Ölüdeniz\'den Antalya\'ya uzanan 540km eşsiz rota.',
    tips: ['Su noktaları seyrek — çok su taşıyın', 'Nisan ayı çiçek şöleni', 'Tek parça veya bölümlere ayrılabilir'],
    start: 'Ölüdeniz', finish: 'Antalya',
  },
  {
    id: 2, name: 'Kaçkar Dağları Trekking', region: 'Karadeniz', difficulty: 'Zor',
    distance: 80, elevation: 3932, duration: '5-8 gün', rating: 4.9,
    icon: '⛰️', color: '#38bdf8',
    season: 'Temmuz–Eylül', type: 'Dağ Trekking',
    features: ['Buzul göller', 'Yayla', 'Kar tepeleri', 'Vadi'],
    wildlife: ['Dağ keçisi', 'Kartal', 'Bozayı'],
    desc: 'Türkiye\'nin en yüksek yürüyüş bölgesi. Buzul göller ve yayla kültürü.',
    tips: ['Yüksek irtifa hazırlığı şart', 'Hava aniden değişebilir', 'Yerel rehber önerilir'],
    start: 'Ayder Yaylası', finish: 'Barhal',
  },
  {
    id: 3, name: 'St. Paul Yolu', region: 'Akdeniz', difficulty: 'Orta',
    distance: 500, elevation: 2200, duration: '25-30 gün (toplam)', rating: 4.7,
    icon: '✝️', color: '#c084fc',
    season: 'Nisan–Haziran, Eylül–Kasım', type: 'Uzun Rota',
    features: ['Antik yollar', 'Roma köprüleri', 'Orman', 'Tarih'],
    wildlife: ['Kırmızı geyik', 'Yaban keçisi', 'Akbaba'],
    desc: 'Aziz Pavlus\'un izinden Antalya\'dan Yalvaç\'a uzanan 500 km tarihi rota.',
    tips: ['Bahar döneminde çiçekler muhteşem', 'Köylerde konaklama mümkün', 'Waymark takibi zorlu olabilir'],
    start: 'Perge (Antalya)', finish: 'Yalvaç',
  },
  {
    id: 4, name: 'Toros Trekking', region: 'Akdeniz', difficulty: 'Zor',
    distance: 120, elevation: 3070, duration: '7-10 gün', rating: 4.8,
    icon: '🌲', color: '#22c55e',
    season: 'Mayıs–Ekim', type: 'Dağ Trekking',
    features: ['Sedir ormanı', 'Yaban hayatı', 'Göl', 'Çadır kampı'],
    wildlife: ['Yaban keçisi', 'Sedir kartalı', 'Leopar (nadir)'],
    desc: 'Toros dağlarının derinliklerinde sedir ormanları ve Geyik Dağı üzerinden geçen güzergah.',
    tips: ['Su kaynakları haritada belirli', 'İşaret takibi önemli', 'Grup halinde gitmeniz önerilir'],
    start: 'Elmali', finish: 'Anamur',
  },
  {
    id: 5, name: 'Abant-Yedigöller Rotası', region: 'Karadeniz', difficulty: 'Kolay',
    distance: 45, elevation: 1200, duration: '2-3 gün', rating: 4.6,
    icon: '💧', color: '#06b6d4',
    season: 'Nisan–Kasım', type: 'Göl Rotası',
    features: ['Doğal göller', 'Çam ormanı', 'Şelale', 'Kamp'],
    wildlife: ['Karaca', 'Balıkçıl', 'Alabalık'],
    desc: 'Bolu\'nun iki doğal hazinesini birleştiren 2 günlük aile dostu yürüyüş rotası.',
    tips: ['Aile için ideal ilk rota', 'Hafta sonu yoğun olabilir', 'Kamp izni önceden alın'],
    start: 'Abant Gölü', finish: 'Yedigöller',
  },
  {
    id: 6, name: 'Uludağ Traverse', region: 'Marmara', difficulty: 'Orta',
    distance: 30, elevation: 2543, duration: '2-3 gün', rating: 4.7,
    icon: '❄️', color: '#94a3b8',
    season: 'Haziran–Ekim (yaz), Aralık–Mart (kar)', type: 'Dağ Yürüyüşü',
    features: ['Yaz-kış', 'Muhteşem manzara', 'Fauna', 'Teleferik'],
    wildlife: ['Yaban domuzu', 'Dağ kartalı', 'Tilki'],
    desc: 'Bursa yakınında Türkiye\'nin en popüler dağı. Yaz trekking ve kış kayağı ile ünlü.',
    tips: ['Teleferikle zirveye çıkılabilir', 'Hafta sonu çok kalabalık', 'Kış için kar ekipmanı gerekli'],
    start: 'Sarıalan', finish: 'Zirve (2543m)',
  },
  {
    id: 7, name: 'Nemrut Dağı Gecesi', region: 'Doğu', difficulty: 'Kolay',
    distance: 8, elevation: 2150, duration: '1 gün', rating: 4.9,
    icon: '🌅', color: '#fbbf24',
    season: 'Mayıs–Ekim', type: 'Tarihi Güzergah',
    features: ['UNESCO miras', 'Güneş doğuşu', 'Antik kral mezarı', 'Heykel'],
    wildlife: ['Tilki', 'Kaya güvercini'],
    desc: 'UNESCO Dünya Mirası. Antiochus\'un mezarı başında güneş doğuşu için sabah yürüyüşü.',
    tips: ['Gece yarısı çıkış ile güneş doğuşu izleyin', 'Sıcak kıyafet şart', 'Tur firmaları ile daha kolay'],
    start: 'Kahta', finish: 'Nemrut Zirvesi',
  },
  {
    id: 8, name: 'Köroğlu Dağları', region: 'Anadolu', difficulty: 'Orta',
    distance: 60, elevation: 2399, duration: '3-4 gün', rating: 4.5,
    icon: '🌾', color: '#84cc16',
    season: 'Mayıs–Ekim', type: 'Dağ Yürüyüşü',
    features: ['Yayla', 'Göl', 'Az turist', 'Çadır'],
    wildlife: ['Yaban keçisi', 'Çalıkuşu', 'Bıldırcın'],
    desc: 'İç Anadolu\'nun sessiz dağı. Az keşfedilmiş yayla rotaları ve manzara.',
    tips: ['İşaret eksik — harita şart', 'Su noktaları bol', 'Gece soğuk olabilir'],
    start: 'Kıbrıscık', finish: 'Akyazı',
  },
  {
    id: 9, name: 'Kaz Dağları Gezisi', region: 'Marmara', difficulty: 'Kolay',
    distance: 25, elevation: 1774, count: 4.6,
    rating: 4.6, icon: '🌿', color: '#22c55e',
    season: 'Nisan–Kasım', type: 'Orman Yürüyüşü',
    features: ['Pınar', 'Şelale', 'Antik kalıntılar', 'Organik köy'],
    wildlife: ['Kartal', 'Yılan kartalı', 'Kızılçam'],
    desc: 'Mitolojik İda Dağı\'nda tertemiz pınarlar ve antik Troya medeniyeti izleri.',
    tips: ['Organik köylerde konaklama var', 'Pınar suyu içilebilir', 'İlkbaharda çiçekler efsane'],
    start: 'Edremit', finish: 'Sütüven Şelalesi',
  },
  {
    id: 10, name: 'Ağrı Dağı Tırmanışı', region: 'Doğu', difficulty: 'Uzman',
    distance: 35, elevation: 5137, duration: '5-7 gün', rating: 5.0,
    icon: '🏔️', color: '#ef4444',
    season: 'Temmuz–Ağustos', type: 'Yüksek İrtifa',
    features: ['Türkiye\'nin en yüksek noktası', 'Buzul', 'Zirve deneyimi'],
    wildlife: ['Dağ kartalı', 'Koy'],
    desc: 'Türkiye\'nin en yüce noktası 5137m. Özel izin ve deneyimli rehber zorunlu.',
    tips: ['Resmi izin (özel vize) gerekli', 'Yüksek irtifa hastalığı riski var', 'Profesyonel rehber zorunlu'],
    start: 'Doğubayazıt', finish: 'Zirve (5137m)',
  },
];

const DIFF_COLOR = { 'Kolay':'#22c55e', 'Orta':'#f59e0b', 'Zor':'#ef4444', 'Uzman':'#a855f7' };

function DiffBadge({ d }) {
  return <span style={{ fontSize:10, fontWeight:700, color:DIFF_COLOR[d], background:DIFF_COLOR[d]+'15', borderRadius:6, padding:'2px 7px' }}>{d}</span>;
}

function TrailCard({ trail, onClick }) {
  return (
    <div onClick={() => onClick(trail)} style={{
      background:'var(--s2)', border:'1px solid var(--border)',
      borderRadius:16, padding:14, marginBottom:8, cursor:'pointer',
    }}>
      <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
        <div style={{
          width:52, height:52, borderRadius:14, flexShrink:0,
          background:trail.color+'20', border:`1px solid ${trail.color}40`,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:26,
        }}>{trail.icon}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontWeight:700, fontSize:14, color:'#fff', marginBottom:4 }}>{trail.name}</div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:5 }}>
            <DiffBadge d={trail.difficulty} />
            <span style={{ fontSize:10, color:'var(--t-mute)' }}>📍 {trail.region}</span>
            <span style={{ fontSize:10, color:'var(--t-mute)' }}>📏 {trail.distance}km</span>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <span style={{ fontSize:10, color:'var(--t-mute)' }}>⛰️ {trail.elevation}m</span>
            <span style={{ fontSize:10, color:'var(--t-mute)' }}>⏱️ {trail.duration}</span>
          </div>
        </div>
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <div style={{ fontWeight:800, fontSize:13, color:'#fbbf24' }}>⭐ {trail.rating}</div>
          <div style={{ fontSize:9, color:'var(--t-mute)', marginTop:2 }}>{trail.type}</div>
        </div>
      </div>
    </div>
  );
}

function TrailDetail({ trail, onClose }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.75)', zIndex:100, display:'flex', alignItems:'flex-end' }} onClick={onClose}>
      <div style={{ background:'var(--bg)', borderRadius:'20px 20px 0 0', width:'100%', maxHeight:'85vh', overflowY:'auto', padding:20 }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
          <div>
            <div style={{ fontSize:32 }}>{trail.icon}</div>
            <div style={{ fontWeight:800, fontSize:18, color:'#fff' }}>{trail.name}</div>
            <div style={{ display:'flex', gap:6, marginTop:6 }}>
              <DiffBadge d={trail.difficulty} />
              <span style={{ fontSize:10, color:trail.color, fontWeight:600 }}>{trail.type}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'var(--s3)', border:'1px solid var(--border)', borderRadius:8, padding:'4px 10px', cursor:'pointer', color:'var(--t-mute)', fontSize:14 }}>✕</button>
        </div>

        <div style={{ fontSize:13, color:'var(--t-mid)', lineHeight:1.6, marginBottom:12 }}>{trail.desc}</div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6, marginBottom:12 }}>
          {[['📏',trail.distance+'km','Mesafe'],['⛰️',trail.elevation+'m','İrtifa'],['⭐',trail.rating,'Puan'],['⏱️',trail.duration,'Süre'],['📅',trail.season.split(',')[0],'Sezon'],['🏃',trail.region,'Bölge']].map(([ic,v,l])=>(
            <div key={l} style={{ background:'var(--s2)', border:'1px solid var(--border)', borderRadius:10, padding:'8px', textAlign:'center' }}>
              <div style={{ fontSize:14 }}>{ic}</div>
              <div style={{ fontWeight:700, fontSize:11, color:'#fff' }}>{v}</div>
              <div style={{ fontSize:9, color:'var(--t-mute)' }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:6, marginBottom:12 }}>
          <div style={{ flex:1, background:trail.color+'10', border:`1px solid ${trail.color}30`, borderRadius:10, padding:'8px 10px' }}>
            <div style={{ fontSize:9, color:'var(--t-mute)', marginBottom:2 }}>BAŞLANGIÇ</div>
            <div style={{ fontSize:11, fontWeight:700, color:trail.color }}>📍 {trail.start}</div>
          </div>
          <div style={{ flex:1, background:trail.color+'10', border:`1px solid ${trail.color}30`, borderRadius:10, padding:'8px 10px' }}>
            <div style={{ fontSize:9, color:'var(--t-mute)', marginBottom:2 }}>BİTİŞ</div>
            <div style={{ fontSize:11, fontWeight:700, color:trail.color }}>🏁 {trail.finish}</div>
          </div>
        </div>

        {trail.wildlife?.length > 0 && (
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'var(--t-mute)', marginBottom:6 }}>🦌 YABAN HAYATI</div>
            <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
              {trail.wildlife.map(w=><span key={w} style={{ fontSize:11, color:'#22c55e', background:'#22c55e15', borderRadius:8, padding:'3px 9px' }}>{w}</span>)}
            </div>
          </div>
        )}

        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:11, fontWeight:700, color:'var(--t-mute)', marginBottom:6 }}>💡 TAVSİYELER</div>
          {trail.tips.map((tip,i)=>(
            <div key={i} style={{ display:'flex', gap:8, marginBottom:4 }}>
              <span style={{ color:trail.color, flexShrink:0 }}>•</span>
              <span style={{ fontSize:12, color:'var(--t-mid)', lineHeight:1.5 }}>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
          {trail.features.map(f=><span key={f} style={{ fontSize:10, color:'var(--t-mute)', background:'var(--s3)', borderRadius:6, padding:'2px 8px', border:'1px solid var(--border)' }}>✓ {f}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function TrailFinder() {
  const [difficulty, setDifficulty] = useState('Tümü');
  const [region,     setRegion]     = useState('Tümü');
  const [search,     setSearch]     = useState('');
  const [selected,   setSelected]   = useState(null);

  const filtered = TRAILS.filter(t =>
    (difficulty === 'Tümü' || t.difficulty === difficulty) &&
    (region     === 'Tümü' || t.region     === region) &&
    (!search || t.name.toLowerCase().includes(search.toLowerCase()))
  ).sort((a,b) => b.rating - a.rating);

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #001200 0%, #002000 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>🥾 Doğa Yolları</h1>
        <p style={{ fontSize:13, color:'var(--t-mute)' }}>Türkiye\'nin en güzel yürüyüş rotaları</p>
      </div>

      <div style={{ padding:'14px 16px 0' }}>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6, marginBottom:14 }}>
          {[['🥾',TRAILS.length,'ROTA'],['📏',`${TRAILS.reduce((s,t)=>s+t.distance,0).toLocaleString()}km`,'TOPLAM'],['⭐',(TRAILS.reduce((s,t)=>s+t.rating,0)/TRAILS.length).toFixed(1),'ORT. PUAN']].map(([ic,v,l])=>(
            <div key={l} style={{ background:'var(--s2)', border:'1px solid var(--border)', borderRadius:12, padding:'10px', textAlign:'center' }}>
              <div style={{ fontSize:18 }}>{ic}</div>
              <div style={{ fontWeight:800, fontSize:15, color:'#fff' }}>{v}</div>
              <div style={{ fontSize:9, color:'var(--t-mute)', marginTop:2, letterSpacing:'.05em' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <input className="input-field" placeholder="Rota ara..." value={search} onChange={e=>setSearch(e.target.value)} style={{ marginBottom:10 }} />

        {/* Difficulty */}
        <div style={{ display:'flex', gap:5, overflowX:'auto', paddingBottom:2, marginBottom:8 }}>
          {DIFFICULTIES.map(d=>(
            <button key={d} onClick={()=>setDifficulty(d)} style={{
              flexShrink:0, padding:'6px 11px', borderRadius:14, cursor:'pointer',
              background: difficulty===d ? (DIFF_COLOR[d]+'25'||'var(--a-glow)') : 'var(--s2)',
              border: `1px solid ${difficulty===d?(DIFF_COLOR[d]||'var(--border-lg)'):'var(--border)'}`,
              color: difficulty===d?(DIFF_COLOR[d]||'var(--a-light)'):'var(--t-mute)',
              fontSize:11, fontWeight:600, whiteSpace:'nowrap',
            }}>{d}</button>
          ))}
        </div>

        {/* Region */}
        <div style={{ display:'flex', gap:5, overflowX:'auto', paddingBottom:2, marginBottom:14 }}>
          {REGIONS.map(r=>(
            <button key={r} onClick={()=>setRegion(r)} style={{
              flexShrink:0, padding:'5px 10px', borderRadius:12, cursor:'pointer',
              background: region===r?'var(--a-glow)':'var(--s2)',
              border: region===r?'1px solid var(--border-lg)':'1px solid var(--border)',
              color: region===r?'var(--a-light)':'var(--t-mute)',
              fontSize:11, fontWeight:600, whiteSpace:'nowrap',
            }}>{r}</button>
          ))}
        </div>

        <div style={{ fontSize:11, color:'var(--t-mute)', marginBottom:10 }}>{filtered.length} rota</div>

        {filtered.map(t=><TrailCard key={t.id} trail={t} onClick={setSelected} />)}

        <div style={{ height:20 }} />
      </div>

      {selected && <TrailDetail trail={selected} onClose={()=>setSelected(null)} />}
    </div>
  );
}
