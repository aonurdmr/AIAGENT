import React, { useState } from 'react';

const TR_MONTHS = ['Oc','Şb','Mr','Ni','My','Hzr','Tem','Ağs','Eyl','Ek','Ks','Ar'];

const HABITATS = ['Tümü', 'Göl', 'Orman', 'Kıyı', 'Step', 'Dağ', 'Sulak Alan'];
const RARITY   = ['Tümü', 'Yaygın', 'Orta', 'Nadir', 'Çok Nadir'];

const BIRDS = [
  {
    id: 1, name: 'Flamingo', en: 'Flamingo', icon: '🦩', color: '#ec4899',
    habitat: 'Göl', rarity: 'Orta', status: 'Göçmen+Kışlayan',
    months: [0,1,0,0,1,1,1,1,1,0,0,0],
    spots: ['Tuz Gölü', 'İzmir Körfezi', 'Çukurova deltası'],
    call: 'Kalabalık gürültülü koloni sesi',
    size: 'Büyük (110-145cm)',
    desc: 'Türkiye\'nin ikonik kuşu. Binlercesi Tuz Gölü\'nde ürer. Yazın görkemli pembe sürüler.',
    tips: ['Tuz Gölü\'nde Mayıs-Ağustos en çok', 'Sabah ışığında pembe renk muhteşem', 'Teleskop şart'],
  },
  {
    id: 2, name: 'Kaya Kartalı', en: 'Golden Eagle', icon: '🦅', color: '#f59e0b',
    habitat: 'Dağ', rarity: 'Nadir', status: 'Yerleşik',
    months: [1,1,1,1,1,1,1,1,1,1,1,1],
    spots: ['Kaçkar Dağları', 'Toros Dağları', 'Ağrı yöresi'],
    call: 'Keskin yüksek sesli ötüş',
    size: 'Büyük (75-95cm)',
    desc: 'Yüksek dağların hakimi. Kaçkar ve Toros\'ta yıl boyu görülebilir nadir kartal türü.',
    tips: ['Zirve kayalıklarını tarayın', 'Termal havada süzülür', 'Sabah erken daha aktif'],
  },
  {
    id: 3, name: 'Beyaz Leylek', en: 'White Stork', icon: '🦢', color: '#f0f9ff',
    habitat: 'Step', rarity: 'Yaygın', status: 'Göçmen (Yaz)',
    months: [0,0,0,1,1,1,1,1,1,0,0,0],
    spots: ['Tüm Anadolu köyleri', 'Çeltik tarlaları', 'Su kenarları'],
    call: 'Gaga şaklama (gagalama)',
    size: 'Büyük (95-110cm)',
    desc: 'Türkiye\'de çok yaygın yaz kuşu. Yüz binlerce kuş İstanbul boğazından geçer.',
    tips: ['Eylül göçünde Boğaz\'dan geçiş izle', 'Köy elektrik direkleri en sevdiği yuva', 'Sabah ısınırken süzülme muhteşem'],
  },
  {
    id: 4, name: 'Pelikan', en: 'Dalmatian Pelican', icon: '🦢', color: '#e0f2fe',
    habitat: 'Göl', rarity: 'Nadir', status: 'Yerleşik+Kışlayan',
    months: [1,1,1,1,1,0,0,0,1,1,1,1],
    spots: ['Manyas Gölü', 'Eğirdir Gölü', 'Burdur Gölü'],
    call: 'Derin inleme sesi',
    size: 'Çok büyük (165cm, kanat 295-345cm)',
    desc: 'Dünya\'nın en büyük pelikan türü. Manyas Gölü dünya genelinde en önemli kışlama alanı.',
    tips: ['Manyas Kuş Cenneti Milli Parkı ziyaret edin', 'Sabah balık avı sahne yaratır', 'Teleskop ile muhteşem'],
  },
  {
    id: 5, name: 'Sürmeli Baykuş', en: 'Eagle Owl', icon: '🦉', color: '#92400e',
    habitat: 'Dağ', rarity: 'Orta', status: 'Yerleşik',
    months: [1,1,1,1,1,1,1,1,1,1,1,1],
    spots: ['Kayalık vadiler', 'Toros dağları', 'Kapadokya'],
    call: 'Derin ve güçlü "bühü bühü"',
    size: 'Büyük (58-75cm)',
    desc: 'Türkiye\'nin en büyük baykuşu. Gece aktif, kayalık ve vadilerde yuva kurar.',
    tips: ['Gün batımından sonra aktif', 'Kapadokya peri bacaları ideal habitat', 'Ses ile tespit edin'],
  },
  {
    id: 6, name: 'Sülün', en: 'Ring-necked Pheasant', icon: '🦃', color: '#dc2626',
    habitat: 'Orman', rarity: 'Yaygın', status: 'Yerleşik',
    months: [1,1,1,1,1,1,1,1,1,1,1,1],
    spots: ['Trakya', 'Batı Anadolu ormanları', 'Ege kıyıları'],
    call: 'Güçlü "kuk kuk" sesi + kanat çırpma',
    size: 'Orta (53-89cm)',
    desc: 'Türkiye\'ye özgü alt türleri bulunan renkli kuş. Erkeklerin kuyruğu 50cm uzayabilir.',
    tips: ['Açık alanlar ile orman sınırında aranır', 'Sabah ve akşam çok aktif', 'Erkek çok gösterişli'],
  },
  {
    id: 7, name: 'Arktik Martı', en: 'Audouin\'s Gull', icon: '🐦', color: '#64748b',
    habitat: 'Kıyı', rarity: 'Çok Nadir', status: 'Lokal',
    months: [0,0,0,1,1,1,1,1,0,0,0,0],
    spots: ['Adalalar (Marmara)', 'Ege adacıkları'],
    call: 'Melodik küçük martı sesi',
    size: 'Orta (48cm)',
    desc: 'Akdeniz\'e özgü nadir martı türü. Türkiye\'de bazı Ege adalarında küçük koloniler.',
    tips: ['Ege adacıklarında sabah saatleri', 'Kırmızı gagası ayırt edici', 'Fotoğraf belgesi değerli'],
  },
  {
    id: 8, name: 'Karaleylek', en: 'Black Stork', icon: '🖤', color: '#1c1c1c',
    habitat: 'Orman', rarity: 'Nadir', status: 'Göçmen+Yerleşik',
    months: [0,0,1,1,1,1,1,1,1,1,0,0],
    spots: ['Karadeniz ormanları', 'Kızılırmak vadisi', 'Toros dağları'],
    call: 'Keskin ve nadir duyulan ses',
    size: 'Büyük (95-100cm)',
    desc: 'Beyaz leylek\'in nadir akrabası. Orman ve vadi yamaçlarında küçük sayıda bulunur.',
    tips: ['Dere ve akarsu kenarlarını tarayın', 'Çok çekingen, yakına gelmez', 'Eylül göçünde daha görünür'],
  },
  {
    id: 9, name: 'Kınalı Keklik', en: 'Chukar Partridge', icon: '🐦', color: '#f97316',
    habitat: 'Step', rarity: 'Yaygın', status: 'Yerleşik',
    months: [1,1,1,1,1,1,1,1,1,1,1,1],
    spots: ['Tüm kuru alanlar', 'Taşlık yamaçlar', 'Anadolu stepi'],
    call: '"Çek-çek-çek" tekrarlayan güçlü ses',
    size: 'Küçük (32-35cm)',
    desc: 'Anadolu\'nun her yerinde bulunan Türkiye\'nin ulusal kuşu sembolü. Çok sesli.',
    tips: ['Sabah ve akşam çok sesli', 'Taşlık yamaçlarda bak', 'Sesi ile tespit kolayca yapılır'],
  },
  {
    id: 10, name: 'Turna', en: 'Common Crane', icon: '🦢', color: '#6b7280',
    habitat: 'Sulak Alan', rarity: 'Orta', status: 'Göçmen',
    months: [0,0,0,0,0,0,0,0,1,1,1,0],
    spots: ['Tuz Gölü', 'Ereğli Sazlıkları', 'Akyatan Gölü'],
    call: 'Düşük frekanslı trompet sesi',
    size: 'Büyük (96-119cm)',
    desc: 'Yüz binlercesi her sonbahar Türkiye üzerinden göç eder. Anadolu platoları konaklama alanı.',
    tips: ['Ekim-Kasım en yoğun göç', 'Akşam konaklama dansı izlemeye değer', 'Ereğli ve Tuz Gölü ideal'],
  },
  {
    id: 11, name: 'Balıkçıl', en: 'Grey Heron', icon: '🐦', color: '#94a3b8',
    habitat: 'Sulak Alan', rarity: 'Yaygın', status: 'Yerleşik',
    months: [1,1,1,1,1,1,1,1,1,1,1,1],
    spots: ['Tüm su kenarları', 'Göl kıyıları', 'Nehirler'],
    call: 'Çirkin ve yüksek ses',
    size: 'Büyük (90-98cm)',
    desc: 'Türkiye\'nin en yaygın büyük kuşlarından. Su kenarlarında hareketsiz balık bekler.',
    tips: ['Şafakta su başında görülür', 'Sabırlı olduğunuz için yaklaşabilirsiniz', 'Balık avı mükemmel seyreder'],
  },
  {
    id: 12, name: 'Akdeniz Martısı', en: 'Yellow-legged Gull', icon: '🐤', color: '#fcd34d',
    habitat: 'Kıyı', rarity: 'Yaygın', status: 'Yerleşik',
    months: [1,1,1,1,1,1,1,1,1,1,1,1],
    spots: ['Tüm Türkiye kıyıları', 'Liman ve iskeleler', 'Balık marketleri'],
    call: 'Yüksek sesli gülen "ha ha ha"',
    size: 'Büyük (52-58cm)',
    desc: 'Türkiye kıyılarında en sık görülen martı. Sarı bacakları ile Avrupa türlerinden ayrılır.',
    tips: ['İskele ve limanlarda çok bol', 'Balık atıldığında anında gelir', 'Yeni başlayanlar için ideal kuş'],
  },
];

const HOTSPOTS = [
  { name: 'Manyas Kuş Cenneti', region: 'Marmara', species: '239+', icon: '🏛️', highlight: 'Pelikan' },
  { name: 'Tuz Gölü', region: 'Anadolu', species: '120+', icon: '🧂', highlight: 'Flamingo' },
  { name: 'İzmir Körfezi', region: 'Ege', species: '200+', icon: '🌊', highlight: 'Flamingo + Pelikan' },
  { name: 'Burdur Gölü', region: 'Akdeniz', species: '180+', icon: '💧', highlight: 'Dik Kuyruklu Ördek' },
  { name: 'Akyatan Gölü', region: 'Akdeniz', species: '160+', icon: '🌾', highlight: 'Göçmen Sürüleri' },
  { name: 'Kaçkar Dağları', region: 'Karadeniz', species: '100+', icon: '⛰️', highlight: 'Kaya Kartalı' },
];

function MonthDots({ months, color }) {
  return (
    <div style={{ display:'flex', gap:3, alignItems:'center' }}>
      {months.map((active, i) => (
        <div key={i} title={TR_MONTHS[i]} style={{
          width: 8, height: 8, borderRadius: '50%',
          background: active ? color : 'var(--s3)',
          opacity: active ? 1 : 0.3,
        }} />
      ))}
    </div>
  );
}

const RARITY_COLOR = { 'Yaygın':'#22c55e', 'Orta':'#f59e0b', 'Nadir':'#ef4444', 'Çok Nadir':'#a855f7' };

export default function BirdWatching() {
  const [tab,      setTab]      = useState('birds');
  const [habitat,  setHabitat]  = useState('Tümü');
  const [rarity,   setRarity]   = useState('Tümü');
  const [search,   setSearch]   = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = BIRDS.filter(b =>
    (habitat === 'Tümü' || b.habitat === habitat) &&
    (rarity  === 'Tümü' || b.rarity  === rarity) &&
    (!search || b.name.toLowerCase().includes(search.toLowerCase()) || b.en.toLowerCase().includes(search.toLowerCase()))
  );

  const nowMonth = new Date().getMonth();
  const activeNow = BIRDS.filter(b => b.months[nowMonth]);

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #000d1a 0%, #001020 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>🦅 Kuş Gözlemi</h1>
        <p style={{ fontSize:13, color:'var(--t-mute)' }}>Türkiye\'nin kuş türleri ve gözlem rehberi</p>
      </div>

      <div style={{ padding:'14px 16px 0' }}>

        {/* Tabs */}
        <div style={{ display:'flex', gap:6, marginBottom:14 }}>
          {[['birds','🐦 Türler'],['hotspots','📍 En İyi Noktalar']].map(([key,label])=>(
            <button key={key} onClick={()=>setTab(key)} style={{
              flex:1, padding:'9px', borderRadius:12, cursor:'pointer',
              background: tab===key?'var(--a-glow)':'var(--s2)',
              border: tab===key?'1px solid var(--border-lg)':'1px solid var(--border)',
              color: tab===key?'var(--a-light)':'var(--t-mute)',
              fontSize:12, fontWeight:700,
            }}>{label}</button>
          ))}
        </div>

        {tab === 'birds' && (
          <>
            {/* Active now */}
            <div style={{ background:'#22c55e10', border:'1px solid #22c55e30', borderRadius:12, padding:'8px 12px', marginBottom:12, fontSize:11, color:'#22c55e' }}>
              ✅ Bu ay görülebilir: {activeNow.length} tür · {activeNow.slice(0,3).map(b=>b.name).join(', ')}{activeNow.length>3?' ve daha fazlası...':''}
            </div>

            <input className="input-field" placeholder="Kuş ara (Türkçe veya İngilizce)..." value={search} onChange={e=>setSearch(e.target.value)} style={{ marginBottom:8 }} />

            <div style={{ display:'flex', gap:5, overflowX:'auto', paddingBottom:2, marginBottom:8 }}>
              {HABITATS.map(h=>(
                <button key={h} onClick={()=>setHabitat(h)} style={{
                  flexShrink:0, padding:'5px 10px', borderRadius:12, cursor:'pointer',
                  background: habitat===h?'var(--a-glow)':'var(--s2)',
                  border: habitat===h?'1px solid var(--border-lg)':'1px solid var(--border)',
                  color: habitat===h?'var(--a-light)':'var(--t-mute)',
                  fontSize:11, fontWeight:600, whiteSpace:'nowrap',
                }}>{h}</button>
              ))}
            </div>

            <div style={{ display:'flex', gap:5, overflowX:'auto', paddingBottom:2, marginBottom:12 }}>
              {RARITY.map(r=>(
                <button key={r} onClick={()=>setRarity(r)} style={{
                  flexShrink:0, padding:'5px 10px', borderRadius:12, cursor:'pointer',
                  background: rarity===r?(RARITY_COLOR[r]+'20'||'var(--a-glow)'):'var(--s2)',
                  border: `1px solid ${rarity===r?(RARITY_COLOR[r]||'var(--border-lg)'):'var(--border)'}`,
                  color: rarity===r?(RARITY_COLOR[r]||'var(--a-light)'):'var(--t-mute)',
                  fontSize:11, fontWeight:600, whiteSpace:'nowrap',
                }}>{r}</button>
              ))}
            </div>

            {filtered.map(bird=>(
              <div key={bird.id} onClick={()=>setSelected(bird)} style={{
                background:'var(--s2)', border:'1px solid var(--border)',
                borderRadius:14, padding:14, marginBottom:8, cursor:'pointer',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
                  <div style={{ width:44, height:44, borderRadius:12, flexShrink:0, background:bird.color+'20', border:`1px solid ${bird.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{bird.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:'#fff' }}>{bird.name}</div>
                    <div style={{ fontSize:11, color:'var(--t-mute)', fontStyle:'italic' }}>{bird.en}</div>
                    <div style={{ display:'flex', gap:6, marginTop:3 }}>
                      <span style={{ fontSize:9, fontWeight:700, color:RARITY_COLOR[bird.rarity], background:RARITY_COLOR[bird.rarity]+'15', borderRadius:5, padding:'1px 6px' }}>{bird.rarity}</span>
                      <span style={{ fontSize:9, color:'var(--t-mute)' }}>{bird.habitat}</span>
                      <span style={{ fontSize:9, color:'var(--t-mute)' }}>{bird.size}</span>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize:10, color:'var(--t-mute)', marginBottom:4 }}>Görülme ayları:</div>
                <MonthDots months={bird.months} color={bird.color} />
              </div>
            ))}
          </>
        )}

        {tab === 'hotspots' && (
          <>
            <div style={{ background:'#38bdf810', border:'1px solid #38bdf830', borderRadius:12, padding:'10px 14px', marginBottom:14, fontSize:12, color:'#38bdf8' }}>
              🌍 Türkiye dünyada kuş göçü açısından 3. önemli ülkedir. Her yıl 400M+ kuş Türkiye üzerinden geçer.
            </div>
            {HOTSPOTS.map((spot,i)=>(
              <div key={i} style={{ background:'var(--s2)', border:'1px solid var(--border)', borderRadius:14, padding:14, marginBottom:8 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:44, height:44, borderRadius:12, flexShrink:0, background:'var(--s3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{spot.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:'#fff', marginBottom:3 }}>{spot.name}</div>
                    <div style={{ fontSize:11, color:'var(--t-mute)' }}>{spot.region} · {spot.species} tür</div>
                    <div style={{ fontSize:11, color:'#fbbf24', marginTop:3 }}>⭐ Öne çıkan: {spot.highlight}</div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Bird detail modal */}
        {selected && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.75)', zIndex:100, display:'flex', alignItems:'flex-end' }} onClick={()=>setSelected(null)}>
            <div style={{ background:'var(--bg)', borderRadius:'20px 20px 0 0', width:'100%', maxHeight:'80vh', overflowY:'auto', padding:20 }} onClick={e=>e.stopPropagation()}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
                <div>
                  <div style={{ fontSize:48 }}>{selected.icon}</div>
                  <div style={{ fontWeight:800, fontSize:18, color:'#fff' }}>{selected.name}</div>
                  <div style={{ fontSize:13, color:'var(--t-mute)', fontStyle:'italic' }}>{selected.en}</div>
                  <div style={{ display:'flex', gap:6, marginTop:6 }}>
                    <span style={{ fontSize:10, fontWeight:700, color:RARITY_COLOR[selected.rarity], background:RARITY_COLOR[selected.rarity]+'15', borderRadius:6, padding:'2px 7px' }}>{selected.rarity}</span>
                    <span style={{ fontSize:10, color:'var(--t-mute)', background:'var(--s3)', borderRadius:6, padding:'2px 7px' }}>{selected.status}</span>
                  </div>
                </div>
                <button onClick={()=>setSelected(null)} style={{ background:'var(--s3)', border:'1px solid var(--border)', borderRadius:8, padding:'4px 10px', cursor:'pointer', color:'var(--t-mute)', fontSize:14 }}>✕</button>
              </div>
              <div style={{ fontSize:13, color:'var(--t-mid)', lineHeight:1.6, marginBottom:12 }}>{selected.desc}</div>
              {[['📏','Boy',selected.size],['🏠','Habitat',selected.habitat],['🔊','Sesi',selected.call]].map(([ic,l,v])=>(
                <div key={l} style={{ display:'flex', gap:8, padding:'5px 0', borderBottom:'1px solid var(--border)' }}>
                  <span style={{ fontSize:11, color:'var(--t-mute)', minWidth:70 }}>{ic} {l}</span>
                  <span style={{ fontSize:11, color:'#fff', fontWeight:600 }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop:10, marginBottom:8 }}>
                <div style={{ fontSize:10, color:'var(--t-mute)', marginBottom:4 }}>AY AKTİVİTESİ</div>
                <div style={{ display:'flex', gap:3 }}>
                  {selected.months.map((a,i)=>(
                    <div key={i} style={{ flex:1, textAlign:'center' }}>
                      <div style={{ height:16, borderRadius:3, background:a?selected.color:'var(--s3)', opacity:a?1:0.3 }} />
                      <div style={{ fontSize:7, color:'var(--t-mute)', marginTop:2 }}>{TR_MONTHS[i]}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom:10 }}>
                <div style={{ fontSize:10, color:'var(--t-mute)', marginBottom:6 }}>📍 EN İYİ NOKTALAR</div>
                <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                  {selected.spots.map(s=><span key={s} style={{ fontSize:11, color:'#38bdf8', background:'#38bdf815', borderRadius:8, padding:'3px 9px' }}>📍 {s}</span>)}
                </div>
              </div>
              <div>
                <div style={{ fontSize:10, color:'var(--t-mute)', marginBottom:6 }}>💡 GÖZLEM İPUÇLARI</div>
                {selected.tips.map((t,i)=>(
                  <div key={i} style={{ display:'flex', gap:8, marginBottom:4 }}>
                    <span style={{ color:selected.color, flexShrink:0 }}>•</span>
                    <span style={{ fontSize:12, color:'var(--t-mid)' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ height:20 }} />
      </div>
    </div>
  );
}
