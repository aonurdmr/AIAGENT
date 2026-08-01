import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TIPS = [
  { icon: '👕', t: 'Kıyafet', d: 'Koyu renk ve çiçek deseni provoke eder. Açık renk, düz giy.' },
  { icon: '🧴', t: 'Parfüm/Koku', d: 'Tatlı koku arı çeker. Parfüm, saç spreyı ve deodorant yok.' },
  { icon: '🏃', t: 'Kaçma', d: 'Ani hareket yapma. Yavaşça uzaklaş. Koşarsan takip eder.' },
  { icon: '💧', t: 'Su İçine', d: 'Saldırı altındaysan su içine gir — arı suya girmez.' },
  { icon: '🌿', t: 'Yuva Mesafesi', d: 'Toprak kovukları, çatılar ve ağaç kovukları yuva olabilir. Uzak dur.' },
  { icon: '🚗', t: 'Araç İçi', d: 'Arı araç içine girerse dur, cam aç, yavaşça çık.' },
];

const STINGS = [
  { t: 'Tek sting', d: 'Iğneyi kart veya tırnakla kazı — sıkma, zehri yayar. Soğuk bez uygula.' },
  { t: 'Çoklu sting', d: '10+ sting: ağır alerjik tepki riski. Hemen tıbbi yardım ara.' },
  { t: 'Anafilaksi belirtisi', d: 'Nefes güçlüğü, yüz şişmesi, baygınlık: EpiPen (eğer var) ve 112.' },
  { t: 'Alerji testi', d: 'Daha önce şiddetli tepki olduysa doktora git — duyarsızlaştırma mümkün.' },
];

const SPECIES = [
  { name: 'Bal arısı', d: 'Genellikle sakin. Yalnız sting atar, ölür. Kovanı korursa savunma.' },
  { name: 'Eşekarısı', d: 'Birden çok sting atar. Güz aylarında çok agresif. Açık yiyecekten çeker.' },
  { name: 'Yaban arısı (hornet)', d: 'Asia gelen Vespa mandarinia benzeri türler yok. Türkiye\'de Vespa crabro büyük.' },
];

export default function BeeSafety() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tips');

  return (
    <div style={{ background: '#0a0800', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐝 Arı Güvenliği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Önleme · sting tedavisi · türler</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['tips','Önleme'],['sting','Tedavi'],['species','Türler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#120e00', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 12
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#120e00', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f59e0b22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}

        {tab === 'sting' && (
          <div style={{ background: '#120e00', borderRadius: 14, padding: 14, border: '1px solid #ef444433' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', marginBottom: 10 }}>🩺 Sting Tedavisi</div>
            {STINGS.map((s, i) => (
              <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < STINGS.length-1 ? '1px solid #1e1800' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fca5a5' }}>{s.t}</div>
                <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{s.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'species' && (
          <div style={{ background: '#120e00', borderRadius: 14, padding: 14, border: '1px solid #f59e0b33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🐝 Arı Türleri</div>
            {SPECIES.map((s, i) => (
              <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < SPECIES.length-1 ? '1px solid #1e1800' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{s.d}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
