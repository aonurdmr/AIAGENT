import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CALLS = [
  {
    id: 'alarm', name: 'Alarm Sesleri', icon: '🚨', accent: '#ef4444',
    desc: 'Tehlike işaret eden sesler — av için kritik',
    birds: [
      { bird: 'Karga', sound: 'Kra kra kra (tekrarlı, sert)', meaning: 'Yırtıcı veya insan var — 100m yakın', hunting: 'Av alanına girerken kargalar seni fark etti — pozisyon değiştir' },
      { bird: 'Saksağan', sound: 'Şakaşakaşaka (hızlı döküm)', meaning: 'Kürklü yırtıcı (tilki, çakal) yakında', hunting: 'Saksağan alarması tilki veya domuz işareti olabilir' },
      { bird: 'Kırlangıç', sound: 'Çit çit çit (sürekli)', meaning: 'Yırtıcı kuş var — havada tehlike', hunting: 'Kırlangıç alarmı doğan veya şahin var demek' },
      { bird: 'Küçük ötücüler', sound: 'Yüksek ince tik-tik', meaning: 'Genel tehlike — tüm kuşlar sessizleşir', hunting: 'Ormanda aniden sessizlik = tehlike algılandı — dur ve bekle' },
    ],
    tip: 'Ormanda aniden sessizlik alarmdan da güçlüdür — bir yerde hareketsiz dur ve dinle.',
  },
  {
    id: 'activity', name: 'Aktivite Sesleri', icon: '🎵', accent: '#22c55e',
    desc: 'Besleme ve hareket seslerini oku',
    birds: [
      { bird: 'Ağaçkakan', sound: 'Dak-dak-dak ritmi', meaning: 'Böcek yoğun ağaç var — domuz da buraya gelir', hunting: 'Ağaçkakan bölgesi = böcek zengin habitat = av çeker' },
      { bird: 'Baykuş (gece)', sound: 'Hu-hu (sakin, derin)', meaning: 'Fare ve küçük kemirgen aktif', hunting: 'Tilki ve çakal bu bölgede avlar — gece tuzağa uy' },
      { bird: 'Keklik', sound: 'Çekçek (sabah)', meaning: 'Keklik grubu burada — beslenme saati', hunting: 'Sesi takip et — keklik tüy grupları tercih eder' },
      { bird: 'Bülbül', sound: 'Uzun melodili çeşitli ses', meaning: 'Nemli zemin, sık bitki örtüsü', hunting: 'Bülbül habitatı = nehir kenarı = küçük av türleri' },
    ],
    tip: 'Sabah kuş koro başlamadan önce 30 dakika bekle — alışkanlık seslerini öğren.',
  },
  {
    id: 'season', name: 'Mevsimsel Sesler', icon: '📅', accent: '#f59e0b',
    desc: 'Mevsim bazlı kuş aktivitesi',
    birds: [
      { bird: 'Kırlangıç (göç)', sound: 'Çıvıltı — kalabalık sürü', meaning: 'Sonbahar/ilkbahar geçiş sezonu', hunting: 'Kuş sürüsü habitatı belirlemeye yardımcı' },
      { bird: 'Ördek (kışın)', sound: 'Vak-vak (gölde)', meaning: 'Kış mesken bölgesi — su kuytusu', hunting: 'Ördek ses bölgesi gölün hangi köşesinde olduğunu gösterir' },
      { bird: 'Sülün (ilkbahar)', sound: 'Güçlü çığlık', meaning: 'Çiftleşme dönemi — erkek sülün ses bölgesi', hunting: 'Sülün çiftleşme sesini taklit ederek yaklaşabilirsin' },
      { bird: 'Turna (göç)', sound: 'Yüksek, trompet gibi', meaning: 'Göç dalgası — mevsim geçişi', hunting: 'Turna ürkütme — diğer kuşların da uçacağını bil' },
    ],
    tip: 'Aynı bölgede haftalarca kuşları dinle — her türün belli saati ve rotası var.',
  },
];

const HUNTING_CALLS = [
  { name: 'Keklik Çağırma', device: 'Keklik düdüğü veya ses kaydı', technique: 'Çekçek sesini taklit et — sessizlikte doğrudan bölgeye yönel', timing: 'Sabah 06-08 · akşam 17-19', warning: 'Yasal sınırları kontrol et — elektronik çağırma yasaklı bazı bölgelerde' },
  { name: 'Geyik Çağırma', device: 'Bağırma düdüğü (roar call)', technique: 'Erkeğin bağırtısını taklit et — bağırma döneminde güçlü', timing: 'Eylül-Ekim şafak öncesi ve akşam', warning: 'Aşırı kullanma — geyik şüphelenirse gelmez' },
  { name: 'Sülün Çağırma', device: 'Horoz ses taklidi', technique: 'Dişiyi çağırma ile erkek gelir yakına', timing: 'Sabah çiftleşme döneminde', warning: 'Sahada çok dikkat — diğer avcılar olabilir' },
];

export default function BirdCallGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('calls');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#05080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎵 Kuş Sesi Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Alarm · aktivite · mevsimsel sesler & çağırma teknikleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['calls','Sesler'],['hunting','Çağırma Teknikleri']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0a0e14', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'calls' && CALLS.map(c => {
          const open = sel === c.id;
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : c.id)} style={{
                background: '#0a0e14', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${c.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{c.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{c.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a0e14', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${c.accent}33`, borderTop: 'none' }}>
                  {c.birds.map((b, i) => (
                    <div key={i} style={{ marginTop: 10, paddingBottom: 10, borderBottom: i < c.birds.length-1 ? `1px solid ${c.accent}18` : 'none' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: c.accent }}>{b.bird}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'monospace', marginTop: 2 }}>🔊 "{b.sound}"</div>
                      <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>💡 {b.meaning}</div>
                      <div style={{ fontSize: 11, color: '#86efac', marginTop: 2 }}>🏹 {b.hunting}</div>
                    </div>
                  ))}
                  <div style={{ background: c.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 10 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {c.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'hunting' && (
          <div style={{ background: '#0a0e14', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>📣 Av Çağırma Teknikleri</div>
            {HUNTING_CALLS.map((h, i) => (
              <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < HUNTING_CALLS.length-1 ? '1px solid #101420' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac', marginBottom: 6 }}>{h.name}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>🎵 Cihaz: {h.device}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}>📋 {h.technique}</div>
                <div style={{ fontSize: 11, color: '#06b6d4', marginBottom: 2 }}>⏰ {h.timing}</div>
                <div style={{ fontSize: 11, color: '#f59e0b' }}>⚠️ {h.warning}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
