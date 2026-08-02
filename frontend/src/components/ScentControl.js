import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'body', name: 'Vücut Koku Kontrolü', icon: '🚿', accent: '#22c55e',
    desc: 'Terleme ve vücut kokusunu minimize etme',
    items: [
      { label: 'Koku giderici sabun', detail: 'Av öncesi gün: koku nötralize eden sabunla yıkan. Normal sabun hayvan kaçırır.' },
      { label: 'Koku giderici deodorant', detail: 'Aktivasyon karbonu bazlı — standart deodorant kullanma.' },
      { label: 'Diş temizliği', detail: 'Nane içermez, doğal ağız bakımı — nefes kokusu da hayvan kaçırır.' },
      { label: 'Beslenme', detail: 'Av öncesi soğan, sarımsak, kuvvetli kokulu yemek yeme.' },
    ],
  },
  {
    id: 'clothes', name: 'Kıyafet Koku Yönetimi', icon: '👕', accent: '#06b6d4',
    desc: 'Giysilerde koku birikimini engelleme',
    items: [
      { label: 'Koku giderici deterjan', detail: 'Kıyafeti koku nötr deterjanla yıka — normal deterjan kimyasal koku bırakır.' },
      { label: 'Saklama torbaları', detail: 'Av kıyafetini hava geçirmez torbada sakla — doğal malzeme veya ot ile.' },
      { label: 'Koku elimine eden sprey', detail: 'Giyip çıkmadan önce sprey sıkar — ozon veya biyolojik nötr ajan.' },
      { label: 'Yerinde giyin', detail: 'Arabada veya ev dışında giyin — bölgeye kendi kokuyla gelme.' },
    ],
  },
  {
    id: 'wind', name: 'Rüzgar Yönetimi', icon: '🌬️', accent: '#f97316',
    desc: 'Rüzgar yönünü okuyarak konumlanma',
    items: [
      { label: 'Rüzgar göstergesi', detail: 'Hafif toz, duman veya toz şişesi — rüzgar yönü sürekli değişir.' },
      { label: 'Konumlanma', detail: 'Hayvanın beklenen konumunun rüzgar altında dur. Koku hayvanın önüne gitmemeli.' },
      { label: 'Termal okuması', detail: 'Gündüz ısı yükselen hava = koku yukarı, dağ yamaçta koku yukarı gider.' },
      { label: 'Değişen rüzgar', detail: 'Rüzgar döndü: hızla konum değiştir veya avı bitir.' },
    ],
  },
  {
    id: 'attractants', name: 'Koku Çekiciler (Lure)', icon: '🦌', accent: '#a78bfa',
    desc: 'Hayvan kokusunu kullanarak çekme',
    items: [
      { label: 'Geyik idrarı', detail: 'Geyik kızışmasında dişi idrarı — erkek geyiği çeker. Sezon bağımlı.' },
      { label: 'Tartan bezi', detail: 'İz bırakma: taban altına koku emdirilmiş bez bağla, yürü.' },
      { label: 'Nada (Scrape) canlandırma', detail: 'Mevcut nada alanına taze geyik koku ekle — bölge dominansı.' },
      { label: 'Domuz için feromon', detail: 'Domuz çekicileri farklı — anestrus (kızışma dışı) dişi koku domuz çeker.' },
    ],
  },
];

export default function ScentControl() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060c06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>👃 Koku Kontrolü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Vücut · kıyafet · rüzgar · koku çekici — tam koku yönetimi</div>
      </div>

      <div style={{ background: '#0a1408', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>🎯 TEMEL KURAL</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Geyiğin burnu 1000 kat daha hassas. Tek bir yanlış koku tüm avı bitirir. Koku kontrolü kamuflajdan önemlidir.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0a1408', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a1408', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #141e14' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{item.detail}</div>
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
