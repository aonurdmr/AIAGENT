import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GROUPS = [
  {
    id: 'raptors', name: 'Yırtıcı Kuşlar', icon: '🦅', accent: '#f97316',
    birds: [
      { name: 'Kara Akbaba', clue: 'Çok büyük (270cm kanat), baş tüysüz, siyah-kahve, grup halinde yükselir' },
      { name: 'Şahin (Atmaca)', clue: 'Orta boy, kısa kanat yuvarlak, uzun kuyruk, hızlı kanat vuruşu' },
      { name: 'Kartal (Kayalık)', clue: 'Büyük (200cm), kanat ucu parmak gibi — beş ayrı tüy görülür, soluk kanataltı' },
      { name: 'Kerkenez', clue: 'Küçük, kırmızı-kahve sırt (erkek), dalgalanan kanat vuruşu, asılı durur' },
      { name: 'Şahin (Doğan)', clue: 'Sivri kanat, hızlı kanat vuruşu, bıyık çizgisi belirgin' },
    ],
    tip: 'Yırtıcılarda önce kanat şekline bak: yuvarlak = orman, sivri = açık alan, geniş-uzun = planör.',
  },
  {
    id: 'waterbirds', name: 'Su Kuşları', icon: '🦢', accent: '#06b6d4',
    birds: [
      { name: 'Büyük Balıkçıl', clue: 'Uzun boyun S çizer uçuşta, gri-mavi, uzun sivri gaga, sığ sularda dikilir' },
      { name: 'Küçük Karabatak', clue: 'Siyah, kanat açar kurur, gagasını yukarı çevirir, dalar' },
      { name: 'Angıt (Nar Ördeği)', clue: 'Kırmızı-turuncu vücut, koyu kanat, büyük ördek' },
      { name: 'Mallard (Yeşilbaş)', clue: 'Erkek: parlak yeşil baş, mor-mavi kanat aynası, sarı gaga' },
      { name: 'Kumkuşu', clue: 'Küçük, hızlı koşar, sahil ve çamur, uzun ince gaga, sürekli hareket' },
    ],
    tip: 'Su kuşunu tanımada gaga şekli belirleyici: kanca, kılıç, kaşık, küt.',
  },
  {
    id: 'songbirds', name: 'Ötücü Kuşlar', icon: '🐦', accent: '#22c55e',
    birds: [
      { name: 'Serçe (Ev)', clue: 'Küçük, kahve-gri, toplu sürü, insan yerleşiminde, kısa gaga' },
      { name: 'Karatavuk', clue: 'Erkek tam siyah, sarı gaga; dişi kahve. Derin güçlü ses.' },
      { name: 'Kırlangıç', clue: 'Çatal kuyruk, hızlı manevra, böcek avlar uçarken, yerleşim alanı' },
      { name: 'İbibik', clue: 'Başlık tüy, turuncu-pembe, kanat zebra siyah-beyaz, uzun eğri gaga' },
      { name: 'Saksağan', clue: 'Siyah-beyaz, uzun kuyruk, parlak — "gururlu" duruş' },
    ],
    tip: 'Ötücülerde ses tanımak görüntüden daha kolay — sesi kaydet, uygulamayla eşleştir.',
  },
  {
    id: 'gamebirds', name: 'Av Kuşları', icon: '🦜', accent: '#a78bfa',
    birds: [
      { name: 'Keklik', clue: 'Yerde yürür, kırmızı gaga ve göz halkası, boylar çizgili yan, kısa uçuş' },
      { name: 'Bıldırcın', clue: 'Çok küçük (keklikten küçük), kahve-çizgili, göçmen, tahıl tarlası' },
      { name: 'Sülün', clue: 'Erkek: parlak, uzun kuyruk, kırmızı yüz maskesi; dişi: kahve-kırmızı' },
      { name: 'Hindi (Yabani)', clue: 'Büyük, kara-kahve metalik, kırmızı-mavi kafa derisi' },
    ],
    tip: 'Av kuşları genelde yerde beslenir — tarla ve mısırlık kenarlarını tara.',
  },
];

export default function WildBirdID() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040c06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦅 Kuş Tanımlama Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yırtıcı · su kuşu · ötücü · av kuşu tanıma ipuçları</div>
      </div>

      <div style={{ background: '#061008', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>🔍 TANIM SIRASI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Boyut → Kanat şekli → Renk deseni → Gaga tipi → Ses → Habitat → Davranış</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {GROUPS.map(g => {
          const open = sel === g.id;
          return (
            <div key={g.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : g.id)} style={{
                background: '#081208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${g.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{g.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{g.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{g.birds.length} tür rehberi</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#081208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${g.accent}33`, borderTop: 'none' }}>
                  {g.birds.map((b, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 6, paddingTop: i === 0 ? 0 : 6, borderTop: i > 0 ? '1px solid #0f1c0f' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: g.accent }}>{b.name}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{b.clue}</div>
                    </div>
                  ))}
                  <div style={{ background: g.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 10 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {g.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
