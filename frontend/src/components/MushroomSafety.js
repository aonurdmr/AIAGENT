import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOXIC = [
  { name: 'Ölüm Takkesi', n: 'Amanita phalloides', d: 'En ölümcül mantar. Yenilebilir ile karışabilir. Sarı-yeşil şapka.' },
  { name: 'Beyaz Takkeli', n: 'Amanita virosa', d: 'Tamamen beyaz. Siniri etkiler. Gecikmeli belirtiler.' },
  { name: 'Şeytanın Mantarı', n: 'Boletus satanas', d: 'Kırmızı porus. Ham yenildiğinde zehirli. Şiddetli bulantı.' },
  { name: 'Sinirli Mantar', n: 'Cortinarius orellanus', d: 'Portakal renkli. Belirtiler 2-3 haftada çıkar. Böbrek hasarı.' },
];

const RULES = [
  { icon: '🚫', t: 'Yüzde yüz emin değilsen yeme', d: 'Kural birdir. Yüzde 99 yeterli değil.' },
  { icon: '📚', t: 'Uzman onayı', d: 'Topladıktan sonra mantar uzmanına göster. Alan kılavuzu yetmez.' },
  { icon: '🧺', t: 'Ayrı sepet', d: 'Zehirliler ve yenilebilirler aynı sepette taşınmasın — spor değmesi.' },
  { icon: '🌱', t: 'Hasar verme', d: 'Yalnızca ihtiyacın olanı topla. Miselyumu koru.' },
  { icon: '🏥', t: 'Zehirlenme', d: 'Belirtiler saatler-günler sonra çıkabilir. Gecikmede bile 112.' },
];

const EDIBLE = [
  { name: 'Kuzugöbegi', d: 'Bal arısı petegi gibi. İlkbahar. Kurutulmuş güvenli.' },
  { name: 'Porcini (Boletus edulis)', d: 'Kalın kahve şapka. Beyaz et kesmez mavi. Değerli.' },
  { name: 'Kayın mantarı', d: 'Salkım halinde kayın gövdesi. Güvenli — ama pişirilmeli.' },
];

export default function MushroomSafety() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('rules');

  return (
    <div style={{ background: '#0a0602', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍄 Mantar Güvenliği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Zehirli türler · güvenlik kuralları · yenilebilir</div>
      </div>

      <div style={{ background: '#140a04', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>⚠️ UYARI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Her yıl Türkiye mantar zehirlenmesiyle ölümler yaşanmaktadır. Uzman olmadan mantar toplama hayati risk taşır.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['rules','Kurallar'],['toxic','Zehirliler'],['edible','Yenilebilir']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#140a04', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 11
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'rules' && RULES.map((r, i) => (
          <div key={i} style={{ background: '#140a04', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f9730622' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316' }}>{r.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{r.d}</div>
              </div>
            </div>
          </div>
        ))}

        {tab === 'toxic' && (
          <div style={{ background: '#140a04', borderRadius: 14, padding: 14, border: '1px solid #ef444433' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', marginBottom: 10 }}>☠️ Ölümcül Mantar Türleri</div>
            {TOXIC.map((t, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < TOXIC.length-1 ? '1px solid #1e1008' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fca5a5' }}>{t.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 }}>{t.n}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{t.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'edible' && (
          <div style={{ background: '#140a04', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>✅ Güvenli Türler (Uzman Onayı ile)</div>
            {EDIBLE.map((e, i) => (
              <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < EDIBLE.length-1 ? '1px solid #1e1008' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>{e.name}</div>
                <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{e.d}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
