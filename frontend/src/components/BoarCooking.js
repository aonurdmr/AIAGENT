import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RECIPES = [
  {
    id: 'stew', name: 'Yaban Domuzu Güveci', icon: '🍲', accent: '#f97316',
    time: '3-4 saat',
    ingredients: ['Domuz but veya omuz 1kg', 'Kuru kırmızı şarap 1 şişe', 'Soğan, havuç, kereviz', 'Biberiye, kekik, defne', 'Sarımsak 6-8 diş', 'Domates salçası 2 yemek kaşığı'],
    steps: [
      'Et: büyük parça kes, soğuk suda 2 saat beklet',
      'Marine: şarap + bitkiler + sarımsak, 12-24 saat buzdolabında',
      'Kızart: tavada çok kızgın yağda her yüzü mühürle',
      'Güvecin içine: marine suyu + sebzeler + et',
      '160 derece fırın, 3-4 saat kısık',
      'Et elle dağılıyorsa hazır — kemikten ayrılır',
    ],
    tip: 'Marine süresi yeterli olmalı — domuz eti sert, uzun pişirme yumuşatır.',
  },
  {
    id: 'spit', name: 'Şişte Kızartma', icon: '🔥', accent: '#ef4444',
    time: '4-6 saat',
    ingredients: ['Bütün domuz 15-25kg veya but', 'Tuz, karabiber, kimyon', 'Limon suyu', 'Zeytinyağı', 'Sarımsak — içi doldurmak için', 'Odun: meşe veya elma'],
    steps: [
      'Eti iyice yıka, içini temizle',
      'Marine: tuz + biber + limon + sarımsak karıştır, ovalayarak sürt',
      'Şişe geç, bağla — dengesiz dönerse pişme eşit olmaz',
      'Ateş: odun köz olana kadar bekle, alev değil köz',
      'Kısık ateş 4-6 saat çevirerek kızart',
      'Deri altın rengi ve çatlarsa hazır',
    ],
    tip: 'Sıcaklık 75 derece iç temp şart — büyük et için termometre kullan.',
  },
  {
    id: 'sausage', name: 'Domuz Sucuğu', icon: '🌭', accent: '#a78bfa',
    time: '2 saat + 24h kuruma',
    ingredients: ['Domuz eti (yağlı) 1kg', 'Tuz 20g/kg', 'Sarımsak, kırmızı biber, kimyon', 'Bağırsak kılıfı (tuzlu)', 'İsteğe: pul biber, rezene'],
    steps: [
      'Eti kıyıya çek — yağ oranı 20-25% ideal',
      'Baharat karıştır, kıymayla yoğur',
      'Bağırsağı yıka, 30 dak su içinde beklet',
      'Kıymayı bağırsağa doldur — hava kabarcığı olmadan',
      'Büküm noktaları oluştur, iğneyle deli',
      'Serin yerde 24-48 saat as — kuruması için',
    ],
    tip: 'Taze yenebilir veya tütsülenebilir — tütsü 2 saat meşe talaşıyla.',
  },
  {
    id: 'butcher', name: 'Parçalama Rehberi', icon: '🔪', accent: '#22c55e',
    time: '1-2 saat',
    ingredients: ['Keskin uzun bıçak', 'Kemik testeresi', 'Kesme tahtası', 'Eldiven', 'Soğuk ortam'],
    steps: [
      'Soğutma: avdan sonra iç sıcaklık 4 dereceye inmeli',
      'Asarak yüzme: germe ile deri çıkarılır',
      'Baş, ön ayak, arka ayak kes',
      'But: arka kısım — en büyük et parçası',
      'Omuz: ön kısım — güveç ve sosis için',
      'Sırt: bonfile bölgesi — ızgara için',
      'Kaburgalar: yavaş pişirme için ayrı',
    ],
    tip: 'Taze et hemen pişir veya parçalayıp dondur — 2 günden fazla bırakma.',
  },
];

export default function BoarCooking() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#100604', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐗 Yaban Domuzu Mutfağı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Güveç · şiş · sucuk · parçalama rehberi</div>
      </div>

      <div style={{ background: '#1e0c06', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f9731633' }}>
        <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700 }}>⚠️ GIDA GÜVENLİĞİ</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Domuz eti mutlaka iyice pişirilmeli — iç sıcaklık min 75 derece. Trikine riski: çiğ veya az pişmiş tüketme.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {RECIPES.map(r => {
          const open = sel === r.id;
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#1e0c06', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{r.time}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1e0c06', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: r.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>🛒 MALZEME</div>
                  {r.ingredients.map((ing, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}>• {ing}</div>)}
                  <div style={{ fontSize: 11, color: r.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>👨‍🍳 HAZIRLIK</div>
                  {r.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ background: r.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {r.tip}</div>
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
