import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  { name: 'Karakurt (Latrodectus)', d: 'Türkiye\'nin en tehlikeli örümceği. Siyah, kırmızı noktalı. Bozkır ve tarla.' },
  { name: 'Sicariid\'ler', d: 'Kahverengi renkte. Kayalık, kuru alanlar. Isırığı deri nekrozuna yol açabilir.' },
  { name: 'Tarantula türleri', d: 'İri, tüylü. Görünüşüne rağmen ısırığı çoğunlukla hafif. Güney Türkiye.' },
  { name: 'Boz örümcek', d: 'Ev içinde yaygın. Isırığı ağrılı ama çoğunlukla zararsız.' },
];

const TIPS = [
  { icon: '👢', t: 'Çizme ve eldiven', d: 'Çalılıkta ve taşaltında çalışırken daima. Karakurt tarlada yerde.' },
  { icon: '🔦', t: 'Kontrol et', d: 'Giysi, ayakkabı ve uyku tulumunu giymeden önce salla ve kontrol et.' },
  { icon: '🏕️', t: 'Kamp alanı', d: 'Taş yığınından uzak kur. Çadır fermuarını her zaman kapat.' },
  { icon: '🩺', t: 'Isırık tedavisi', d: 'Soğuk uygula. Karakurt: hemen hastaneye. Antivenom mevcut — vakit kaybet.' },
  { icon: '📸', t: 'Fotoğrafla', d: 'Örümceği öldürme — fotoğrafla. Doktora göster. Türü belirlemek kritik.' },
];

export default function SpiderSafety() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');

  return (
    <div style={{ background: '#08020e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🕷️ Zehirli Örümcekler</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye türleri · korunma · ilk yardım</div>
      </div>

      <div style={{ background: '#12041e', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #a78bfa33' }}>
        <div style={{ fontSize: 11, color: '#a78bfa', fontWeight: 700 }}>⚠️ KARAKURT DİKKATİ</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Türkiye'de özellikle yaz aylarında kırsal alanda risk artar. Tanı ve önlem hayat kurtarır.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['species','Türler'],['tips','Korunma']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#a78bfa' : '#12041e', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && (
          <div style={{ background: '#12041e', borderRadius: 14, padding: 14, border: '1px solid #a78bfa33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', marginBottom: 10 }}>🕷️ Dikkat Gerektiren Türler</div>
            {SPECIES.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SPECIES.length-1 ? '1px solid #1c0a2e' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#c4b5fd' }}>{s.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{s.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#12041e', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #a78bfa22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
