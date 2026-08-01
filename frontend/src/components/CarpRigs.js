import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RIGS = [
  {
    id: 'hair', name: 'Hair Rig', icon: '🪝', accent: '#f59e0b',
    use: 'Sazan avcılığının temel kurulumu',
    steps: [
      'Oltayı iğneden geçir — 5-8cm uzun kuyruk bırak',
      'Kuyruğa boilie veya mısır diz — hair stopper ile sabitle',
      'İğne dönük olmalı — ağız içinde kanca maksimum',
      '8-15lb misina · dönüşlü iğne kullan',
      'Kılavuzu büyük alandan küçüğe geçir',
    ],
    tip: 'Hair uzunluğu: boilie boyutunun 1.5 katı — doğal sunuş.',
  },
  {
    id: 'method', name: 'Method Feeder', icon: '🧲', accent: '#22c55e',
    use: 'Hızlı cezbedici — aktif balık için',
    steps: [
      'Method kafesi kıyma ile doldur — karışık yem kütlesi',
      'Boilie veya pellet ucu koy — kafesten 5cm dışa çık',
      'Kafesi baskıyla sıkıştır — suya girince yavaş dağıtsın',
      'Fırlatma: 30-60m — ağırlık kafes yönünü kararlı tutar',
      'İlk 10 dakika bitleyin — sazan yemi fark etmişse bu sürede vurur',
    ],
    tip: 'Method feeder sazanlı göllerde en hızlı sonuç veren kurulumdur.',
  },
  {
    id: 'chod', name: 'Chod Rig', icon: '🌿', accent: '#06b6d4',
    use: 'Algli ve sazlık dip — takılmama için',
    steps: [
      'Çabuk çözülen bağlantı — kafes herhangi yerde durabilir',
      'Kısa ve sert misina parçası (Chod section): 8-12cm',
      'Kanca dik durur — balık ağzı nasıl alırsa kancalar',
      'Dip otu içinde etkili — klasik rig takılır, chod takılmaz',
      'Mainline üstünde serbest hareket eder',
    ],
    tip: 'Chod, algli veya sazlık çamur dipte tek seçenektir.',
  },
  {
    id: 'spod', name: 'Spod Yemleme', icon: '🎯', accent: '#a78bfa',
    use: 'Hedef bölge oluşturma',
    steps: [
      'Spod roketi yemle doldur — mısır, boilie, pellet karışımı',
      'Hedef bölgeye fırlat — işaret oluştur (klip)',
      '10-20 spod at — zemin yem tabakası oluştur',
      'Rig bu yem alanına koy — balık yemi alırken kancalanır',
      'Berley: akıntılı suda çözünen kıyma koku yayar',
    ],
    tip: 'Spod ile yemleme: kalabalık yüzey = sazan sürüsü demek.',
  },
];

export default function CarpRigs() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040c06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪝 Sazan Rig Kurulumu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hair rig · method feeder · chod rig · spod yemleme</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {RIGS.map(r => {
          const open = sel === r.id;
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#080e08', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{r.use}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#080e08', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: r.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 KURULUM</div>
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
