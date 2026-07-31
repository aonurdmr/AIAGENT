import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SEASONS = [
  {
    id: 'keklik', name: 'Kınalı Keklik', icon: '🐦', accent: '#f97316',
    open: '1 Ekim – 30 Kasım',
    daily: '3 adet günlük limit',
    method: 'Av tüfeği · köpek ile',
    region: 'Tüm Türkiye · dağlık ve taşlık alanlar',
    habitat: 'Kayalık yamaç, çalılık, tarla kenarı',
    tip: 'Sabah erken ve akşam besleme zamanında hareketli. Güney bakan yamaçlar kış tercihidir.',
    license: 'Standart av ruhsatı + keklik ruhsatı',
    notes: 'TBMM yıllık av kararnamesinde değişebilir — Çevre Bakanlığı sitesini kontrol et',
  },
  {
    id: 'bildircin', name: 'Bıldırcın', icon: '🐦', accent: '#f59e0b',
    open: '15 Ağustos – 30 Eylül',
    daily: '10 adet günlük limit',
    method: 'Av tüfeği · küçük kalibre',
    region: 'Trakya, Ege, Marmara tarlaları',
    habitat: 'Tahıl tarlası, çayır, tarla kenarı',
    tip: 'Göçmen — Ağustos sonu Trakya\'ya iner, Eylül ortasına kadar yoğun. Sabah çiy zamanı en aktif.',
    license: 'Standart av ruhsatı',
    notes: 'Dişi bıldırcın (kuluçka döneminde) vurulmamalı — dişiyi yumurtlayan erkekten ayırt et',
  },
  {
    id: 'yaban_domuz', name: 'Yaban Domuzu', icon: '🐗', accent: '#ef4444',
    open: 'Yıl boyu açık (zararlı hayvan statüsü)',
    daily: 'Limit yok',
    method: 'Yarı otomatik veya yivli · gece de avlanılabilir',
    region: 'Tüm Türkiye ormanlık alanlar',
    habitat: 'Orman kenarı, mısır tarlası, meşelik',
    tip: 'Alacakaranlık ve gece aktif. Besleme alanı (mineral tuzlak) yakını tercih et. Koku çok önemli — rüzgara karşı yaklaş.',
    license: 'İzin belgesi (taşra teşkilatı)',
    notes: 'Sürü halinde avlanma ve tuzak yasak. Ağır av tüfeği (12 kalibre) veya büyük kalibre yivli önerilir',
  },
  {
    id: 'karaca', name: 'Karaca', icon: '🦌', accent: '#84cc16',
    open: 'Erkek: 1 Temmuz – 15 Eylül · Dişi: Kapalı',
    daily: '1 adet (ihale ile)',
    method: 'Yivli tüfek (.243, .308 minimum)',
    region: 'Belirlenmiş devlet avlaklarında ihale',
    habitat: 'Meşe ormanı kenarı, çalılık, tarla kenarı',
    tip: 'Şafak ve alacakaranlıkta açık alanlara çıkar. Ağustos–Eylül rutting sezonu aktif hareketli.',
    license: 'Özel ihale ruhsatı — bakanlık ihalesi zorunlu',
    notes: 'Kaçak karaca avı 4915 sayılı Kanun kapsamında ağır ceza gerektirir',
  },
  {
    id: 'kuzey_ceylan', name: 'Yaban Kazı (Su Kuşu)', icon: '🦆', accent: '#3b82f6',
    open: '1 Eylül – 15 Ocak (yöreye göre farklı)',
    daily: '10 adet (çeşitli türler toplamı)',
    method: 'Av tüfeği 12 kalibre · decoylü',
    region: 'İç Anadolu gölleri, Ege ve Marmara',
    habitat: 'Göl kıyısı, bataklık, saz',
    tip: 'Pusuda sabah erken başarı yüksek. Kuzeye çekici (decoy) ile tuzağa düş. Ördek çağrısı öğren.',
    license: 'Standart av ruhsatı + su kuşu ruhsatı',
    notes: 'Koruma altındaki türleri tanı — flamingo ve leylek KESINLIKLE avlanamaz',
  },
];

const LAWS = [
  { icon: '📋', text: 'Her yıl Mayıs ayında Resmi Gazete\'de yayınlanan Merkez Av Komisyonu kararlarını takip et' },
  { icon: '💳', text: 'Av ruhsatı: İl Özel İdaresi veya e-Devlet üzerinden. Yıllık yenileme zorunlu.' },
  { icon: '🔫', text: 'Silah ruhsatı (av) İl Emniyet Müdürlüğü\'nden alınır' },
  { icon: '🚗', text: 'Araçta silah nakli: kilide, kılıflı ve görünmez şekilde' },
  { icon: '⛔', text: 'Yasaklı bölgeler: Milli Parklar, Tabiat Parkları ve yaban hayatı geliştirme sahaları' },
  { icon: '📞', text: 'İhbar hattı: 182 (orman suçları) veya 444 0 771 (Çevre Bakanlığı)' },
];

export default function HuntingSeasons() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('seasons');

  return (
    <div style={{ background: '#0f0b06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📅 Av Sezonu Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 tür · açılış tarihi, limit & mevzuat</div>
      </div>

      <div style={{ margin: '0 16px 12px', background: '#f59e0b15', borderRadius: 12, padding: '12px 14px', border: '1px solid #f59e0b33' }}>
        <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700, marginBottom: 3 }}>⚠️ Yasal Uyarı</div>
        <div style={{ fontSize: 12, color: '#d1d5db' }}>Bu bilgiler genel rehber niteliğindedir. Resmi MAK kararları her yıl değişir. Av öncesi Çevre Bakanlığı\'nı kontrol edin.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['seasons','Sezonlar'],['laws','Mevzuat']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#1a1308', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'seasons' && SEASONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#1a1308', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 28 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>{s.open}</div>
                    </div>
                  </div>
                  <span style={{ background: s.accent + '22', color: s.accent, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{s.daily}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1a1308', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {[['🔫 Yöntem', s.method], ['📍 Bölge', s.region], ['🏔️ Habitat', s.habitat], ['💳 Ruhsat', s.license]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: s.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 3 }}>💡 TAKTİK</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{s.tip}</div>
                  </div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '6px 10px', marginTop: 6 }}>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>📋 {s.notes}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'laws' && (
          <div style={{ background: '#1a1308', borderRadius: 14, padding: 14, border: '1px solid #f9731622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>⚖️ Av Mevzuatı Özeti</div>
            {LAWS.map((l, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{l.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{l.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
