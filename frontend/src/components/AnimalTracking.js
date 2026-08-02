import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TRACKS = [
  {
    id: 'boar', name: 'Yaban Domuzu İzi', icon: '🐗', accent: '#f97316',
    print: 'Çift yarık tırnak · büyük izler 6-8 cm · yan tırnak izleri görünür',
    gait: 'Trot yürüyüş — ön ve arka aynı tarafta, çapraz değil',
    sign: ['Bataklık yuvarlama (wallow) — çamur sürünme çukuru', 'Ağaç kabuğu sürünmesi — kaşınma yeri', 'Kazma izleri — yem arama'],
    habitat: 'Meşelik kenarı, bataklık yakını, mısır tarlası sınırı',
    fresh: 'Taze iz: keskin kenarlı, ıslak zemin izi yok dolmamış',
    hunting: 'Yuvarlama çukuru günlük kullanım — 50m çapında pusu kur',
  },
  {
    id: 'deer', name: 'Geyik & Karaca İzi', icon: '🦌', accent: '#f59e0b',
    print: 'İnce çift yarık tırnak · sivri uç önde · 5-8 cm (geyik) / 3-4 cm (karaca)',
    gait: 'Yürüyüş: arka ön izin üstüne düşer · koşuda çapraz baskı görünür',
    sign: ['Boynuz sürtmesi: küçük ağaçlarda kabuk soyulması', 'Nada (scrape): ön ayak tırnağıyla açılmış toprak', 'Yol: düzenli geçiş çizgisi, dallarda yükseklik işareti'],
    habitat: 'Orman-çayır geçiş bölgesi, nehir kenarı, tarla sınırı',
    fresh: 'Taze iz: keskin kenar, ıslak toprak basmış — 2 saatte dolar',
    hunting: 'Nada noktası kızışma dönemi av yeri — çevresine kamera tuzak kur',
  },
  {
    id: 'wolf', name: 'Kurt & Çakal İzi', icon: '🐺', accent: '#a78bfa',
    print: 'Köpekten büyük · 4 parmak · tırnak izi belirgin · 8-12 cm (kurt)',
    gait: 'Doğrusal yürüyüş — arka tam ön izin üstüne basar (sürünge yürüyüş)',
    sign: ['Dışkı: kıl ve kemik içerir, koyu', 'İz çizgisi düz ve kararlı — köpek gibi dağınık değil', 'Koku işareti: taş/ağaç üstünde idrar'],
    habitat: 'Açık yayla, orman kenarı geçiş, dere vadisi',
    fresh: 'Sabah çiğle dolu iz — öğlene kadar kurur ve kenarlar dağılır',
    hunting: 'Kurt bölgesi → av hayvanları bu güzergahtan geçer — izden geyik güzergahı çıkar',
  },
  {
    id: 'bear', name: 'Ayı İzi', icon: '🐻', accent: '#92400e',
    print: '5 parmak · büyük 15-25 cm · arka ayak insan ayağını andırır · tırnak uzun',
    gait: 'Bassı yürüyüş — ağır ve derin iz, çoğu zaman çökeltili',
    sign: ['Kabuk soyma: arı kovası için', 'Meyve kümesi: yem alanında dışkı + yenmiş meyve', 'Kazma izi: böcek yuvası için derin tırnak çizikleri'],
    habitat: 'Meyveli orman, arıcılık yakını, çöp alanı yolu',
    fresh: 'Iz derinliği — ayı ağır: ıslak zeminde 3-5 cm derinlikte basar',
    hunting: 'Ayı bölgesi uyarısı — av değil, kaçınma bölgesi olarak işaretle',
  },
  {
    id: 'hare', name: 'Tavşan & Yaban Tavşanı İzi', icon: '🐇', accent: '#22c55e',
    print: 'Uzun arka ayak · kısa ön ayak · arka önde görünür sıçramada',
    gait: 'Sıçrama: 4 iz grubu — ön arka arka ön sıralaması',
    sign: ['Dışkı: yuvarlak, küçük, çim rengi', 'Beslenme: düzgün kesilmiş dal uçları (45°)', 'Yatak: sığ çukur, kıl kalıntısı'],
    habitat: 'Çalılık, çayır kenarı, tarla sınırı, orman kenarı',
    fresh: 'Çiy iz: sabah taze, öğleden sonra kurur ve silinir',
    hunting: 'Besleme izleri en yoğun sabah — iz yoğunluğu sürü büyüklüğünü gösterir',
  },
];

const READ_TIPS = [
  { icon: '🌅', tip: 'Işık Açısı', desc: 'Düşük açılı sabah ışığı izleri gölgeler — en iyi okuma zamanı gündoğumu ve batımı' },
  { icon: '💧', tip: 'Nem Faktörü', desc: 'Islak zemin 2-4 saat, kuru zemin 4-8 saat iz tutar. Kar 12-24 saat.' },
  { icon: '📏', tip: 'Ölçüm', desc: 'İz boyutunu el ile ölç — yanına bozuk para veya çakı koy fotoğrafta' },
  { icon: '🔢', tip: 'İz Sayımı', desc: 'Belirli alanda iz yoğunluğu = sürü büyüklüğü tahmini' },
  { icon: '🧭', tip: 'Yön Okuma', desc: 'İz yönü ağırlık merkeziyle okunur — öne doğru daha derin' },
  { icon: '📸', tip: 'Fotoğraflama', desc: 'Cetvel yanında · düşük açı · gölge içinde çek — ölçeği göster' },
];

export default function AnimalTracking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tracks');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐾 İz Takip Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 tür · domuz, geyik, kurt, ayı, tavşan izleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['tracks','İzler'],['reading','Okuma Teknikleri']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#120e06', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tracks' && TRACKS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#120e06', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.habitat}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#120e06', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 12, marginTop: 8 }}><span style={{ color: t.accent, fontWeight: 600 }}>👣 İz: </span><span style={{ color: '#d1d5db' }}>{t.print}</span></div>
                  <div style={{ fontSize: 12, marginTop: 4 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>🦶 Yürüyüş: </span><span style={{ color: '#d1d5db' }}>{t.gait}</span></div>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>🔍 DİĞER İŞARETLER</div>
                  {t.sign.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {s}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>⏱️ Taze iz: </span><span style={{ color: '#d1d5db' }}>{t.fresh}</span></div>
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>🏹 {t.hunting}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'reading' && (
          <div style={{ background: '#120e06', borderRadius: 14, padding: 14, border: '1px solid #f9731622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>📖 İz Okuma Teknikleri</div>
            {READ_TIPS.map((r, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < READ_TIPS.length-1 ? '1px solid #1e1608' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fed7aa' }}>{r.tip}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{r.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
