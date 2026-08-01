import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HABITATS = [
  {
    id: 'marsh', name: 'Tatlı Su Bataklığı', icon: '🌿', accent: '#22c55e',
    desc: 'Saz, kamış ve su bitkileriyle kaplı sığ alanlar',
    wildlife: ['Ördek ve kazlar (besleme-üreme)', 'Gece balıkçılı ve suçuluk', 'Sazan, yayın, levrek', 'Balaban (ötüşü karakteristik: "pompa" sesi)', 'Su samuru'],
    activity: [
      'Sabah erken: su kuşu besleme turunda',
      'Şafakta sazlık kenarında ördek avı',
      'Sazlık içinde yüzen yemle sazan avı',
      'Martı ve balıkçıl takip et — altında sürü var',
    ],
    season: 'İlkbahar-yaz: üreme. Sonbahar-kış: göç toplama noktası.',
  },
  {
    id: 'salt', name: 'Tuzlu Sulak Alan', icon: '🌊', accent: '#06b6d4',
    desc: 'Kıyı bataklıkları ve lagünler',
    wildlife: ['Flamingo (pembe sürüler)', 'Karabatak kolonileri', 'Kılıçgaga (uzun ters kıvrık gaga)', 'Deniz alabalığı ve levrek (ağız)', 'Yengeç ve karides'],
    activity: [
      'Gel-git geçişi: balık ağza girer-çıkar',
      'Kuru sezonda flamingo sayısı artar',
      'Balıkçıl tarlası: kıyıda ağılarda yoğun',
      'Kuş gözlem kulesi varsa kullan — mesafe koru',
    ],
    season: 'Kış: flamingo ve göçmen su kuşu. Yaz: üreyen türler.',
  },
  {
    id: 'delta', name: 'Delta ve Nehir Ağzı', icon: '🌀', accent: '#f59e0b',
    desc: 'Büyük nehir ağızlarında oluşan sulak sistemler',
    wildlife: ['Pelikan (büyük beyaz)', 'Karabatak toplu kolonisi', 'Büyük balıkçıl', 'Sazan ve yayın (büyük bireyler)', 'Su Kartalı (balık tutar)'],
    activity: [
      'Delta kanallarında tekne ile gözlem',
      'Yayın balığı gece ve şafakta en aktif',
      'Pelikan sürüsü olduğu yerde balık sürüsü var',
      'Çamurlu taban: iz takip için ideal zemin',
    ],
    season: 'Yaz: balık bolluğu. Kış: göçmen toplama. Yıl boyu faal.',
  },
  {
    id: 'peatbog', name: 'Turbalık ve Gölet', icon: '💧', accent: '#a78bfa',
    desc: 'Küçük kapalı göletler ve tur bataklıkları',
    wildlife: ['Yaban ördeği (lokal)', 'Kurbağa ve semender', 'Dereceli balık (alabalık)', 'Kısa ötücüler (bataklık ötücüsü)', 'Böcek avlayan kuşlar (kırlangıç)'],
    activity: [
      'Kurbağa sesi: bahar geceleri en güçlü',
      'Küçük gölet: sığ balık temiz su türleri için',
      'Bitki çeşitliği yüksek — botanik gözlem',
      'Turizm baskısı az — sessiz gözlem alanı',
    ],
    season: 'İlkbahar: üreme patlama. Yaz: yavru bakımı. Sonbahar: göç başlar.',
  },
];

export default function WetlandGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020e08', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Sulak Alan Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tatlı su bataklığı · tuzlu kıyı · delta · turbalık</div>
      </div>

      <div style={{ background: '#041208', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>🌍 KORUMA</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Sulak alanlar en hızlı kaybolan habitatlar. Ramsar koruma statüsünü kontrol et — pek çok alanda av ve kampçılık kısıtlı.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {HABITATS.map(h => {
          const open = sel === h.id;
          return (
            <div key={h.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : h.id)} style={{
                background: '#041208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${h.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{h.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{h.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{h.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${h.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: h.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>🦆 YABAN HAYATI</div>
                  {h.wildlife.map((w, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}>• {w}</div>)}
                  <div style={{ fontSize: 11, color: h.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>📋 AKTİVİTE</div>
                  {h.activity.map((a, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}>{i+1}. {a}</div>)}
                  <div style={{ background: h.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>📅 {h.season}</div>
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
