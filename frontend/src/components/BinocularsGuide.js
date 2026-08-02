import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MODELS = [
  {
    id: 'starter', name: 'Başlangıç Dürbünü', price: '500-1.500 ₺', icon: '🔭', accent: '#84cc16',
    mag: '8x42',
    fov: '130-140 m / 1000 m',
    weight: '600-750 g',
    waterproof: 'IPX4-6',
    prism: 'BK7 Porro veya Roof',
    bestFor: 'Günübirlik gözlem, başlangıç kuş takibçisi',
    brands: 'Nikon Aculon A30, Bushnell Falcon',
    tip: '8x42 evrensel başlangıç formatı. Göz mesafesi ayarlı ve diyopter ayarı olan modeli tercih et.',
  },
  {
    id: 'mid', name: 'Orta Sınıf', price: '2.000-6.000 ₺', icon: '🔭', accent: '#f59e0b',
    mag: '8x42 veya 10x42',
    fov: '125-145 m / 1000 m',
    weight: '650-800 g',
    waterproof: 'IPX7 (1m su dalışı)',
    prism: 'BAK4 ED Cam + Roof Prism',
    bestFor: 'Ciddi kuş gözlemi, doğa yürüyüşü',
    brands: 'Vortex Diamondback HD, Nikon Monarch 5',
    tip: 'ED cam kromatic aberasyonu (renk saçılması) büyük ölçüde giderir — gün batımı ve alacakaranlık gözleminde fark edilir.',
  },
  {
    id: 'pro', name: 'Profesyonel', price: '6.000-30.000 ₺', icon: '🔭', accent: '#ef4444',
    mag: '8x42, 10x42, 12x50',
    fov: '130-155 m / 1000 m',
    weight: '700-900 g',
    waterproof: 'IPX8 (dalış)',
    prism: 'Swarovski SLC / Zeiss Victory alüminyum gövde · aşırı yüksek kalite ED/Apo cam',
    bestFor: 'Kuş araştırmacısı, sporcu atıcı, rehber',
    brands: 'Swarovski EL, Zeiss Victory SF, Leica Noctivid',
    tip: 'Swarovski EL 8.5x42 Türkiye\'de aktif ornitologların %60\'ının tercihi. Ömür boyu garanti.',
  },
  {
    id: 'marine', name: 'Deniz Dürbünü', price: '1.500-5.000 ₺', icon: '⚓', accent: '#06b6d4',
    mag: '7x50',
    fov: '130 m / 1000 m',
    weight: '900-1.100 g',
    waterproof: 'Tam su geçirmez + yüzer',
    prism: 'Porro + pusula entegreli',
    bestFor: 'Tekne, balıkçı, deniz gözlemi',
    brands: 'Fujinon FMTRC-SX, Steiner Commander',
    tip: '7x50 format düşük ışık performansı için denizde standarttır. Pusula ve aydınlık skalası faydalı.',
  },
];

const TECHNIQUE = [
  { icon: '👁️', tip: 'Göz mesafesi ayarı (diopter): sağ gözü kapat, sol gözle odakla; sol gözü kapat, sağ gözle diopter çevir' },
  { icon: '🧘', tip: 'Titreme azaltma: nefes verirken bak, dirseklerini gövdeye yasla veya ağaca dayan' },
  { icon: '🔍', tip: 'Hedefi ilk çıplak gözle bul, sonra dürbünü kaldır — ters sıralama hedefi kaybettirir' },
  { icon: '🌅', tip: 'Alacakaranlıkta çıkış gözü (çıkış pupili) 7mm+ olan dürbün avantajlı' },
  { icon: '🧹', tip: 'Cam temizliği: nefes buharlayıp mikrofiber bez — asla kağıt mendil kullanma (sıyırır)' },
];

export default function BinocularsGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('models');

  return (
    <div style={{ background: '#0a0c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔭 Dürbün Seçim Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 sınıf · teknik karşılaştırma & kullanım</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['models','Modeller'],['technique','Teknik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#14161f', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'models' && MODELS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#14161f', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 28 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>Büyütme: {m.mag} · {m.price}</div>
                    </div>
                  </div>
                  <span style={{ background: m.accent + '22', color: m.accent, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>{m.waterproof}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#14161f', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  {[['🔭 Görüş Açısı', m.fov], ['⚖️ Ağırlık', m.weight], ['🔬 Prizma', m.prism], ['🎯 En İyi Kullanım', m.bestFor], ['🏷️ Markalar', m.brands]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: m.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: m.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: m.accent, fontWeight: 600, marginBottom: 3 }}>💡 PRO</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{m.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'technique' && (
          <div style={{ background: '#14161f', borderRadius: 14, padding: 14, border: '1px solid #f59e0b22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>👁️ Kullanım Teknikleri</div>
            {TECHNIQUE.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{t.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{t.tip}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
