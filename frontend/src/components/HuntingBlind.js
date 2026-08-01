import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TYPES = [
  {
    id: 'ground', name: 'Yer Pusası', icon: '🌿', accent: '#22c55e',
    desc: 'Doğal malzemeyle yer seviyesinde saklama',
    build: [
      'Çerçeve: dal ve fındık çubuğu ile A veya L şekli',
      'Örtü: bölge bitkisiyle — her yerde aynı bitki',
      'Dış: yeşil ve canlı dal — solan bitki şüphe yaratır',
      'Giriş: arkadan — hayvanın önüne çıkma',
      'İç: ısı yalıtıcı zemin — köpük mat',
      'Koku: bitki malzemesi kokuyu maskeler',
    ],
    pros: 'Hazırlanması hızlı · koku kontrol kolay · taşınabilir',
    cons: 'Düşük görüş açısı · kar ve yağmurda ıslanma',
    tip: 'İki gün önceden kur — hayvanlar alışır.',
  },
  {
    id: 'hub', name: 'Katlanabilir Hub Pusu', icon: '🏕️', accent: '#06b6d4',
    desc: 'Ticari çanta pususu — hızlı kurulum',
    build: [
      'Hub sistemi: 1-2 dakika kurulum, otomatik açılım',
      'Koyu siyah iç: silueti tamamen gizler',
      'Açılan pencereler: ok veya silah için dar aralık',
      'Netting (ağlı pencere): görünmeden bak',
      'Sabitleme: toprak çivileri ve gergi ipleri',
      'Taşıma: sırt çantasına sığar',
    ],
    pros: 'Kurulum hızı · konfor · tüm hava koşulları',
    cons: 'Ağır · pahalı · yapay görünüm',
    tip: 'Hub pusunu doğal malzemeyle kamuflajla — çok siyah görünür.',
  },
  {
    id: 'elevated', name: 'Yüksek Platform Pusası', icon: '🌲', accent: '#f97316',
    desc: 'Ağaç platformu veya metal stand',
    build: [
      'Ayaklı stand: taşınabilir, 3-4m yükseklik',
      'Ağaç platformu: sabit, çivi yerine kablo — ağaca zarar az',
      'Emniyet kemeri: her zaman bağlı kal',
      'Misina: silah veya yay askısı — düşürme engelleme',
      'Rüzgar perdesi: öne bağlanan bez veya ağ',
      'Giriş çıkış: sessiz — ayakkabıya ses bandı bant',
    ],
    pros: 'Geniş görüş · koku yukarı gider · daha az hayvan görme',
    cons: 'Kurulum zaman alır · güvenlik riski · ağır',
    tip: 'Koku yüksekte: hayvan altından geçer, kokmaz — büyük avantaj.',
  },
  {
    id: 'natural', name: 'Doğal Özellik Kullanımı', icon: '🪨', accent: '#a78bfa',
    desc: 'Kaya, köklü ağaç, hendek kullanımı',
    build: [
      'Kaya grubu arkası: doğal engel, siluet kırar',
      'Devrilmiş ağaç: köklü taraf sahte duvar gibi',
      'Hendek veya dere yatağı: alçak pozisyon',
      'Sık fundalık kenarı: L pozisyon — iki yönde görüş',
      'Gün ışığı yönü: güneşe bakma — silüetin gölgeye düşsün',
      'Uzak kur: hayvan geçiş yolundan 25-50m',
    ],
    pros: 'Hazırlık sıfır · tamamen doğal · koku yok',
    cons: 'Sınırlı alan · hareket kısıtlı · görüş açısı değişken',
    tip: 'Alanı önceden ziyaret et — uygun doğal özellik haritala.',
  },
];

export default function HuntingBlind() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060c06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏕️ Av Pusu İnşası</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yer pusası · hub · platform · doğal özellik</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TYPES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#0a1208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a1208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>🔨 KURULUM</div>
                  {t.build.map((b, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {b}</div>)}
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <div style={{ flex: 1, background: '#22c55e15', borderRadius: 8, padding: '6px 10px' }}>
                      <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 700, marginBottom: 2 }}>✅ ARTISI</div>
                      <div style={{ fontSize: 11, color: '#d1d5db' }}>{t.pros}</div>
                    </div>
                    <div style={{ flex: 1, background: '#ef444415', borderRadius: 8, padding: '6px 10px' }}>
                      <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 700, marginBottom: 2 }}>❌ EKSİSİ</div>
                      <div style={{ fontSize: 11, color: '#d1d5db' }}>{t.cons}</div>
                    </div>
                  </div>
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {t.tip}</div>
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
