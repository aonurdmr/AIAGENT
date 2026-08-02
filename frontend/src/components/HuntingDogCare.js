import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BREEDS = [
  {
    id: 'setter', name: 'İngiliz Setter', icon: '🐕', accent: '#f59e0b',
    origin: 'İngiltere',
    specialty: 'Keklik ve bıldırcın avı — geniş arazide süzülerek arama',
    traits: ['Enerjik, geniş alan sever', 'İşaret (point) ustası', 'Koşu hızı yüksek — GPS takip şart', 'Sıcağa ve soğuğa dayanıklı'],
    training: 'İşaret alma refleksi genç yaşta — 6 ayda temel itaat, 12 ayda av.',
    care: 'Günlük 2 saat egzersiz. Av dönemi öncesi ayak bakımı ve tüy tarama.',
    tip: 'Av sezonuna 1 ay kala kondisyon antrenmanı başlat — kaslar hazır olsun.',
  },
  {
    id: 'pointer', name: 'Alman Pointer (GSP)', icon: '🐩', accent: '#22c55e',
    origin: 'Almanya',
    specialty: 'Çok yönlü av köpeği — kara ve su avı, getirme',
    traits: ['Çok yönlü — tüfek, iz, getirme', 'Akıllı ve çabuk öğrenir', 'Aile dostu', 'Güçlü getirme içgüdüsü'],
    training: 'Su kurtarma dahil 3 ay intensif. Türkiye\'nin en popüler av köpeği.',
    care: 'Kısa tüy — az bakım. Kulak temizliği haftada bir zorunlu.',
    tip: 'GSP\'yi balık kokusuyla tanıştır — su kuşu avında sulara girmekten çekinmez.',
  },
  {
    id: 'beagle', name: 'Beagle', icon: '🦮', accent: '#ef4444',
    origin: 'İngiltere',
    specialty: 'Tavşan ve küçük av — burun gücüyle iz takibi',
    traits: ['Burun gücü olağanüstü', 'Meşe ve çalılıkta iz takibi', 'Sesli — havlar çok', 'Enerjik, inatçı'],
    training: 'İz takip egzersizi haftada 3. Ses disiplini en zor yanı.',
    care: 'Tüy fırçalama haftada 2. Kulak iltihabına yatkın — suyla temastan sonra kurut.',
    tip: 'Beagle kaçar — GPS tasma zorunlu. Özellikle koku aldığında tamamen kör olur.',
  },
  {
    id: 'vizsla', name: 'Vizsla', icon: '🐕‍🦺', accent: '#a78bfa',
    origin: 'Macaristan',
    specialty: 'Çok yönlü av — özellikle ıslak arazi ve su kuşu',
    traits: ['Turuncu-altın tüy — dikkat çekici', 'Hassas yapı, azimli çalışma', 'Yüksek zeka', 'Sahiple çok bağlanır'],
    training: 'Erken sosyalizasyon kritik. İleri av görevleri için 18 ay.',
    care: 'Kısa tüy kolay bakım. Soğuğa hassas — giysi gerekebilir.',
    tip: 'Vizsla ayrılık kaygısı yaşar — köpek evi değil, ev köpeği olmak ister.',
  },
];

const HEALTH_TIPS = [
  { icon: '💉', title: 'Aşı Takvimi', desc: 'Karma aşı + kuduz yıllık. Av öncesi Leptospira booster — su kaynaklarından bulaşır.' },
  { icon: '🦟', title: 'Parazit Koruması', desc: 'Kene ve pire önleyici aylık. Av sezonunda haftalık muayene. Kene çıkarma aletiyle.' },
  { icon: '🩹', title: 'Av Sonrası Muayene', desc: 'Patiler (yara, çatlak), gözler (çalı batması), deri (kene, böcek). 5 dk rutin.' },
  { icon: '🍖', title: 'Performans Beslenmesi', desc: 'Av sezonunda protein %28+. Egzersiz sonrası 30 dk beklettikten sonra besle.' },
  { icon: '💧', title: 'Susuzluk Önleme', desc: 'Sahada her 30 dakikada su. Sıcakta taşınabilir köpek su kabı zorunlu.' },
];

export default function HuntingDogCare() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('breeds');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0f0a06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐕 Av Köpeği Bakımı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 ırk · bakım, antrenman & sağlık</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['breeds','Irklar'],['health','Sağlık']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#160e04', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'breeds' && BREEDS.map(b => {
          const open = sel === b.id;
          return (
            <div key={b.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : b.id)} style={{
                background: '#160e04', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${b.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{b.origin} · {b.specialty.slice(0,40)}…</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#160e04', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${b.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: b.accent, fontWeight: 700, marginBottom: 4, marginTop: 8 }}>🎯 UZMANLIK</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 8 }}>{b.specialty}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>ÖZELLİKLER</div>
                  {b.traits.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {t}</div>)}
                  <div style={{ fontSize: 12, marginTop: 8 }}><span style={{ color: '#22c55e', fontWeight: 600 }}>🏋️ Antrenman: </span><span style={{ color: '#d1d5db' }}>{b.training}</span></div>
                  <div style={{ fontSize: 12, marginTop: 4 }}><span style={{ color: '#06b6d4', fontWeight: 600 }}>✂️ Bakım: </span><span style={{ color: '#d1d5db' }}>{b.care}</span></div>
                  <div style={{ background: b.accent + '15', borderRadius: 8, padding: '6px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {b.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'health' && (
          <div style={{ background: '#160e04', borderRadius: 14, padding: 14, border: '1px solid #f59e0b22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🏥 Sağlık & Bakım Rehberi</div>
            {HEALTH_TIPS.map((h, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < HEALTH_TIPS.length-1 ? '1px solid #2a1a08' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{h.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fcd34d' }}>{h.title}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2, lineHeight: 1.5 }}>{h.desc}</div>
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
