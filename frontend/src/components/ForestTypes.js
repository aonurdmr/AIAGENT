import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FORESTS = [
  {
    id: 'pine', name: 'Çam Ormanı', icon: '🌲', accent: '#22c55e',
    region: 'Karadeniz kıyı şeridi, İç Anadolu yüksek kesimleri',
    species: 'Sarıçam, karaçam, kızılçam, fıstıkçamı',
    ground: 'İğne yapraklı örtü — sert ve asidik toprak',
    wildlife: 'Sincap, ağaçkakan, baykuş, domuz, çakal',
    hunting: [
      'Yaban domuzu çam ormanını sever — kozalak yeme',
      'Keklik açık çam altında uyur gece',
      'Sabah erken — ağaçlar arasında harekete dikkat',
      'Ses geçirgenliği düşük — yaklaşma fırsatı daha kolay',
    ],
    fishing: 'Çam deresi soğuk-temiz akış — alabalık için ideal',
    tip: 'Çam kozalağı düştüğünde ses çıkarır — domuz hareket eder, konumunu veriyor.',
  },
  {
    id: 'oak', name: 'Meşe Ormanı', icon: '🌳', accent: '#92400e',
    region: 'Ege ve Marmara iç kesimleri, Trakya',
    species: 'Sapsız meşe, saçlı meşe, palamut',
    ground: 'Humus zengin karanlık toprak — palamutsuz döşeme',
    wildlife: 'Domuz, geyik, karaca, kestane faresi, çakal',
    hunting: [
      'Palamut mevsimi (Ekim-Kasım) en aktif dönem',
      'Domuz meşe palamudu için gece yorulur',
      'Geyik ve karaca meşelik kenarda sabah besler',
      'Tünek noktaları: meşe tepelerinde kumru ve tahta',
    ],
    fishing: 'Meşe deresi humuslu — sazan ve levrek için iyi',
    tip: 'Palamut döneminde her meşe ağacı bir av noktasıdır — tünek kurabilirsin.',
  },
  {
    id: 'beech', name: 'Kayın Ormanı', icon: '🍂', accent: '#f59e0b',
    region: 'Karadeniz yüksek kesimleri, Doğu Anadolu nemli vadiler',
    species: 'Doğu kayını, Avrupa kayını',
    ground: 'Kalın yaprak döküntüsü — sessiz yürüme zorluğu',
    wildlife: 'Karaca, geyik, sülün, tilki, baykuş',
    hunting: [
      'Güz kayrası: dökülen yapraklar ses yapar — yavaş adım at',
      'Kayın meyvesi döneminde geyik aktif — Eylül-Ekim',
      'Sülün kayın altında yem arar gündüz',
      'Rüzgar yönüne çok dikkat — yaprak ters çevirir',
    ],
    fishing: 'Kayın gölgesi soğuk dere → alabalık kaliteli habitat',
    tip: 'Kayın yapraklarında yavaş yürüme için: kenar kayalara adım at, yapraksız zemine bas.',
  },
  {
    id: 'mixed', name: 'Karışık Orman', icon: '🌿', accent: '#06b6d4',
    region: 'Geçiş bölgeleri — Ege-İç Anadolu, Karadeniz yokuşları',
    species: 'Gürgen, ıhlamur, kızılağaç, orman gülü, laden',
    ground: 'Değişken — bölgeden bölgeye farklılık',
    wildlife: 'En yüksek çeşitlilik — her tür bir arada',
    hunting: [
      'Kenar bölgeler altın kural — açık-kapalı geçiş',
      'Su kaynağı yanı: sabah sulama saati tüm türler için',
      'Gece av: tilki ve domuz kenar çizgisinde dolaşır',
      'Farklı ağaç → farklı yem → farklı av türü',
    ],
    fishing: 'Karışık orman deresi: her türü besler, gölge-güneş dengesi ideal',
    tip: 'Karışık ormanda kenar hatlar en verimli av bölgesidir — iki tip bitkinin birleştiği yer.',
  },
];

const ORIENTATION = [
  { icon: '🌞', tip: 'Gün ışığı rehberi', desc: 'Güney yamaçlar daha kurak — kuzey yamaçlar daha nemli ve orman sık' },
  { icon: '💧', tip: 'Su işareti', desc: 'Kavak, kızılağaç, söğüt → su yakın. Bu ağaçlara doğru in.' },
  { icon: '🍂', tip: 'Mevsim oku', desc: 'Yaprak rengi yeşilden sarıya → güz başlıyor, geyik aktif, domuz palamu arar' },
  { icon: '🐦', tip: 'Kuş yönü', desc: 'Akşam kuşların uçtuğu yön suya doğru — ağaçlara tüneme için dönerler' },
  { icon: '🌿', tip: 'Bitki seyrekliği', desc: 'Alt bitki örtüsü az → geyik gezer, trampa kolay — sık çalılık = domuz tercihi' },
];

export default function ForestTypes() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('forests');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040d06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌲 Orman Tipi Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Çam · meşe · kayın · karışık — av & balıkçılık ipuçları</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['forests','Orman Tipleri'],['orient','Yön Okuma']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#070f08', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'forests' && FORESTS.map(f => {
          const open = sel === f.id;
          return (
            <div key={f.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : f.id)} style={{
                background: '#070f08', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${f.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{f.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{f.region}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#070f08', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${f.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 12, marginTop: 8 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>🌿 Türler: </span><span style={{ color: '#d1d5db' }}>{f.species}</span></div>
                  <div style={{ fontSize: 12, marginTop: 4 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>🦊 Yaban Hayatı: </span><span style={{ color: '#d1d5db' }}>{f.wildlife}</span></div>
                  <div style={{ fontSize: 11, color: f.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>🏹 AV İPUÇLARI</div>
                  {f.hunting.map((h, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {h}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#06b6d4', fontWeight: 600 }}>🎣 Balıkçılık: </span><span style={{ color: '#d1d5db' }}>{f.fishing}</span></div>
                  <div style={{ background: f.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {f.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'orient' && (
          <div style={{ background: '#070f08', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🌳 Ormanı Okuma Teknikleri</div>
            {ORIENTATION.map((o, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < ORIENTATION.length-1 ? '1px solid #0d1e0f' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{o.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac' }}>{o.tip}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{o.desc}</div>
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
