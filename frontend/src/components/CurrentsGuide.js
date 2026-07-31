import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CURRENTS = [
  {
    id: 'rip', name: 'Dip Çekimi (Rip Current)', icon: '🌀', accent: '#ef4444',
    desc: 'En tehlikeli kıyı akıntısı — dalga köpüğü olmayan band',
    recognition: [
      'Dalgalar kırılmaz — suya düz bölge var',
      'Köpük ve yüzen cisimler denize doğru taşınır',
      'Su rengi farklı — koyu/kahverengi köpüklü hat',
      'Dalga düzeni kırık ve bozuk',
    ],
    escape: [
      'Panik yapma — güç gerektirmez',
      'Akıntıya karşı yüzme — kesinlikle yanlış',
      'Kıyıya paralel yüz — 30-40m kadar',
      'Akıntıdan çıkınca açıyla kıyıya dön',
      'Yorgunsan su üstünde yüz — bekle yardım gelene dek',
    ],
    fishing: 'Rip current kenarları — avlanan balık için iyi nokta',
    warning: true,
  },
  {
    id: 'coastal', name: 'Kıyı Uzunlamasına Akıntı', icon: '↔️', accent: '#f59e0b',
    desc: 'Kıyıya paralel akan — dalgıç ve yüzücü için sürükleme',
    recognition: [
      'Kıyıya paralel akar — belli yönde sürekli',
      'Saatte 1-3 km hız — fark edilmeyebilir',
      'Dalga kırınımından oluşur',
    ],
    escape: [
      'Kıyıya 45° açıyla yüz',
      'Akıntıyla savaşma — köşegen çiz',
      'Dalga geri çekilmesini kullan',
    ],
    fishing: 'Balıklar bu akıntıyla sürüklenen besin için izler — izinden av',
    warning: false,
  },
  {
    id: 'undertow', name: 'Geri Çekilme Akıntısı', icon: '🔄', accent: '#a78bfa',
    desc: 'Kıyıya çarpan dalgaların geri çekilmesi',
    recognition: [
      'Ayaklardan hissedilir — bacakları çeker',
      'Yüzey değil — ayak dibinde güçlü',
      'Kırıcı dalgalarda en şiddetli',
    ],
    escape: [
      'Yatay yüzerek koy — kıyıya köşegen git',
      'Dalga ile gel — geri çekilmede dinlen',
      'Sığ suda güvenli — 1m derinlik sonrası azalır',
    ],
    fishing: 'Geri çekilme noktaları dip balıkları için besleme yeri',
    warning: false,
  },
  {
    id: 'tidal', name: 'Med-Cezir Akıntısı', icon: '🌊', accent: '#06b6d4',
    desc: 'Gel-git hareketi yaratan kuvvetli akıntı — boğaz ve körfezlerde',
    recognition: [
      'Öngörülebilir — gel-git takvimi ile tahmin edilir',
      'İstanbul Boğazı: yüzey güney-kuzey, dip tersi',
      'Çanakkale: 3-5 knot saatte — derin akıntı güçlü',
    ],
    escape: [
      'Akıntı saatini önceden bil',
      'Karşıt akıntıda balık çok iyi beslenir',
      'Tekneyle boğazda gel-git saatinde çıkma',
    ],
    fishing: 'En iyi balıkçılık — akıntı geçişi sırasında bait sürüklenir',
    warning: false,
  },
];

const WAVE_GUIDE = [
  { type: 'Kırıcı Dalga', sign: 'Köpüklü, kıyıya sert çarpma', fish: 'Derin suya geri çekilme — dip balıkları aktif', swim: 'Dikkatli — güçlü geri çekilme' },
  { type: 'Sörf Dalgası', sign: 'Uzun, şekilli, köpük çizgisi oluşturur', fish: 'Yüzey avı — levrek ve çipura dalga kırımında av yapar', swim: 'Sörf için ideal' },
  { type: 'Çalkalantı', sign: 'Düzensiz, çapraz dalgalar çakışıyor', fish: 'Zayıf avlanma — balık derin sakinliğe çekiliyor', swim: 'Tehlikeli — çapraz akıntı' },
  { type: 'Sakin Yüzey', sign: 'Rüzgar yok, düz deniz', fish: 'Gece avı için mükemmel — levrek ve çipura yüzeye çıkar', swim: 'En güvenli' },
];

export default function CurrentsGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('currents');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020d14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Akıntı & Dalga Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 akıntı tipi · kaçış teknikleri & balıkçılık</div>
      </div>

      <div style={{ background: '#1a0808', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>⚠️ DİP ÇEKİMİ — KİLLER #1</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Dip çekimi (rip current) yüzme kazalarının %80'inden sorumlu. Akıntıya karşı yüzme — ölümcül hata.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['currents','Akıntılar'],['waves','Dalgalar']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#061520', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'currents' && CURRENTS.map(c => {
          const open = sel === c.id;
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : c.id)} style={{
                background: '#061520', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${c.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{c.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{c.desc}</div>
                  </div>
                  {c.warning && <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 700, background: '#ef444422', padding: '2px 8px', borderRadius: 20 }}>⚠️ TEHLİKE</div>}
                </div>
              </div>
              {open && (
                <div style={{ background: '#061520', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${c.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>🔍 TANIMA</div>
                  {c.recognition.map((r, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {r}</div>)}
                  <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700, marginTop: 8, marginBottom: 4 }}>🏊 KAÇIŞ</div>
                  {c.escape.map((e, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {e}</div>)}
                  <div style={{ background: c.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>🎣 {c.fishing}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'waves' && (
          <div style={{ background: '#061520', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🌊 Dalga Tipi & Balıkçılık</div>
            {WAVE_GUIDE.map((w, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < WAVE_GUIDE.length-1 ? '1px solid #0a2030' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#67e8f9', marginBottom: 4 }}>{w.type}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>👁️ {w.sign}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}>🎣 {w.fish}</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>🏊 {w.swim}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
