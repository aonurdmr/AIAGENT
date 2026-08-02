import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KNOTS = [
  {
    id: 'bowline', name: 'Bowen Düğümü', icon: '🔵', accent: '#3b82f6',
    use: 'Döngü oluşturma — kurtarma halatı, çadır bağlama',
    strength: '%70 — güvenilir, sıkışmaz',
    steps: ['İp ucuyla küçük halka yap', 'Ucu arkadan aşağıya sok (tavşan çukurdan çıkar)', 'Büyük ipten geç (tavşan ağacın etrafından döner)', 'Çukura geri gir', 'Çek — halka sabit kalır'],
    unmake: 'Kolay çözülür — acil durumda tercih',
    tip: 'Tavşan düğümü: "tavşan çukurdan çıkar, ağacın etrafından döner, çukura geri giner"',
  },
  {
    id: 'cleat', name: 'Yarım Bağlama', icon: '🔴', accent: '#ef4444',
    use: 'Tekne bağlama, tırmanma halatı başlangıcı',
    strength: '%65',
    steps: ['İpi direğe çevir', 'Üzerinden geç', 'Çapraz yap ve altından çıkar', 'Bir kez daha aynısı — 2 yarım hitche'],
    unmake: 'Çabuk çözülür — dikkat',
    tip: 'İki yarım bağlama birlikte = güvenilir. Tekne bağlamada kullan.',
  },
  {
    id: 'clove', name: 'Çift Askı (Clove Hitch)', icon: '🟢', accent: '#22c55e',
    use: 'Pala bağlama, çadır kazığı, hızlı bağlama',
    strength: '%60 — hızlı ama kayar',
    steps: ['İpi ağaç/kazığa çevir', 'Üstünden tekrar çevir', 'Son turda kendi altından geç', 'Çek'],
    unmake: 'Çok kolay — tek yönde çekince çözülür',
    tip: 'En hızlı düğüm ama çekme yönüne dikkat et — yükle sıkışır, yüksüz kayar.',
  },
  {
    id: 'figure8', name: '8 Düğümü', icon: '🟡', accent: '#f59e0b',
    use: 'Halat ucunu şişirme, tırmanma halatı son güvenlik',
    strength: '%75 — güçlü',
    steps: ['İpi ucundan tut', 'Büyük döngü yap', 'Ucu döngünün üstünden geçir', '8 şekli çizecek şekilde alttan geç', 'Ucu yukarıdan sok ve çek'],
    unmake: 'Zor çözülür — yüklü kaldıktan sonra sıkışır',
    tip: 'Çıkmaz düğüm özelliği var — halat ucundan kaçmayı engeller.',
  },
  {
    id: 'sheet', name: 'Çuval Bağı (Sheet Bend)', icon: '🟣', accent: '#a78bfa',
    use: 'İki farklı çaplı ip birleştirme — çadır halatı uzatma',
    strength: '%50 — zayıf ama pratik',
    steps: ['Kalın ipin ucuyla balık ağzı yap', 'İnce ipi ağzın altından geçir', 'Kalın ipin etrafını sar', 'Kendi altından geç', 'Her iki ucu çek'],
    unmake: 'Görece kolay — sıkışmaz',
    tip: 'İki ip eşit kalınlıksa sadece bir kez sar. Farklı kalınlıksa çift dönüş yap.',
  },
  {
    id: 'trucker', name: 'Kamyoncu Freni', icon: '🟠', accent: '#f97316',
    use: 'Yük bağlama, çadır malzeme sabitleme, sıkıştırma',
    strength: 'Mekanik avantaj 2:1 sıkıştırma',
    steps: ['Halat kazığa geçir', 'Döngü oluştur', 'Serbest ucu döngüden geçir', 'Geri çekerek gerin', 'Yarım bağlama ile sabitle'],
    unmake: 'Orta güçlük — yüksüz serbest',
    tip: 'Çadır malzeme çantası kapağını bu düğümle çek — sıkıştırmada mekanik avantaj sağlar.',
  },
];

const USES = [
  { scenario: 'Kurtarma halatı', knot: 'Bowen Düğümü', reason: 'Halka açılmaz, güçlü, sökülebilir' },
  { scenario: 'Çadır kurma', knot: 'Çift Askı + Kamyoncu', reason: 'Hızlı bağlama ve germe' },
  { scenario: 'Yük taşıma', knot: 'Kamyoncu Freni', reason: 'Yükü sıkıştırır, gevşemez' },
  { scenario: 'İp uzatma', knot: 'Çuval Bağı', reason: 'Farklı kalınlıklarda çalışır' },
  { scenario: 'Ağaç askı', knot: 'Çift Askı (2x)', reason: 'Hızlı, güvenilir, kolay söküm' },
];

export default function CampingKnots() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('knots');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0f0a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪢 Kamp Düğümleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 temel düğüm · adım adım bağlama rehberi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['knots','Düğümler'],['uses','Kullanım']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0f160f', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'knots' && KNOTS.map(k => {
          const open = sel === k.id;
          return (
            <div key={k.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : k.id)} style={{
                background: '#0f160f', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${k.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{k.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{k.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{k.use}</div>
                  </div>
                  <div style={{ fontSize: 10, color: k.accent, fontWeight: 700 }}>{k.strength}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0f160f', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${k.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: k.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 BAĞLAMA</div>
                  {k.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>🔓 Çözme: </span><span style={{ color: '#d1d5db' }}>{k.unmake}</span></div>
                  <div style={{ background: k.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {k.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'uses' && (
          <div style={{ background: '#0f160f', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>✅ Senaryoya Göre Düğüm Seçimi</div>
            {USES.map((u, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < USES.length-1 ? '1px solid #141e14' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac', marginBottom: 2 }}>{u.scenario}</div>
                <div style={{ fontSize: 12, color: '#22c55e', marginBottom: 2 }}>→ {u.knot}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{u.reason}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
