import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'types', name: 'Pusu Türleri', icon: '🏕️', accent: '#22c55e',
    items: [
      { t: 'Pop-up çadır', d: 'Hızlı kurulum, taşınabilir. Kuş fotoğrafçısının standardı.' },
      { t: 'Bitki örtüsü pusuu', d: 'Çalı arası. Üstüne dal örtme. En doğal, en ucuz.' },
      { t: 'Su kenarı sığınağı', d: 'Göl/bataklık kenarı. Ördek ve yaban kuşu için.' },
      { t: 'Araç pusuu', d: 'Araç ile hayvan yaklaşımı — hayvan insana değil araca alışır.' },
      { t: 'Yüksek platform', d: 'Ağaç veya statif platform — dağ keçisi ve büyük memeli için.' },
    ],
  },
  {
    id: 'setup', name: 'Kurulum ve Hazırlık', icon: '⚙️', accent: '#60a5fa',
    items: [
      { t: 'Önceden keşif', d: 'Bir gün önce git, iz ve iz bırakma noktalarını bul.' },
      { t: 'Koku kontrolu', d: 'Rüzgara karşı otur. Koku giderici sprey. Temiz kıyafet.' },
      { t: 'Sabah kurulumu', d: 'Hayvan aktivitesinden 1 saat önce kurulumu tamamla.' },
      { t: 'Gürültü yok', d: 'Sessiz kıyafet, tripod titreşim damperi. Telefon sessize.' },
      { t: 'Sabır', d: 'Minimum 3-4 saat. Hareket etme. Hayvan gelmeden gitme.' },
    ],
  },
  {
    id: 'gear', name: 'Ekipman', icon: '📸', accent: '#f97316',
    items: [
      { t: 'Uzun netleme lensi', d: '400mm minimum. 500-600mm ideal yaban hayatı için.' },
      { t: 'Monopad', d: 'Uzun lens tutar. Tripoddan çok daha hızlı takip.' },
      { t: 'Uzaktan kumanda', d: 'Titreşimsiz çekim. 2m kablo veya kablosuz.' },
      { t: 'Kamuflaj örtü', d: 'Lens kamuflaj çorabı. Renk: habitat ile uyumlu.' },
      { t: 'Doğal arka fon', d: 'Temiz arka plan seç — dal ve yaprak arkaplanı doldurur.' },
    ],
  },
  {
    id: 'ethics', name: 'Etik Fotoğrafçılık', icon: '🌿', accent: '#a78bfa',
    items: [
      { t: 'Hayvan stresi', d: 'Hayvan kaçarsa çok yaklaştın — geri çekil, zorla kapma.' },
      { t: 'Yuva mesafesi', d: 'Yuvalama sezonunda 50m uzakta kal. Terk ettirebilirsin.' },
      { t: 'Yem koyma', d: 'Yem ile davranış bozma — hayvan doğal hareketinde fotoğraflanmalı.' },
      { t: 'Gürültü sesi', d: 'Yapay hayvan sesi çağrısı yasak — mevzuat ve etik ihlali.' },
      { t: 'Habitat koruma', d: 'Iz bırakma — bitki çiğneme, dal kırma yok.' },
    ],
  },
];

export default function PhotoHide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#050a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📸 Foto Pusuu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Pusu türleri · kurulum · ekipman · etik fotoğrafçılık</div>
      </div>

      <div style={{ background: '#08100a', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>📸 ALTIN KURAL</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>En iyi yaban hayatı fotoğrafı sabır gerektirir. Hayvan sana gelsin — sen hayvana gitme.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#08100a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#08100a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0a140c' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>{item.t}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
