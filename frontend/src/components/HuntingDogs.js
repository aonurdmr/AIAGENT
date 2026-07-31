import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BREEDS = [
  {
    id: 'pointer', name: 'İngiliz Pointeri', icon: '🐕', accent: '#f59e0b', category: 'Tazı',
    origin: 'İngiltere', size: 'Orta-Büyük (25-34 kg)', lifespan: '12-14 yıl',
    game: ['Keklik', 'Bıldırcın', 'Çulluk', 'Tavşan'],
    traits: ['Yüksek enerji', 'Zeki', 'Itaatkâr', 'İyi burun'],
    terrain: 'Açık arazi, tarım alanları, çayırlık',
    training: 'Kolay eğitilir. 6 aylıktan itibaren av eğitimi başlanabilir. Pozitif pekiştirme ile çalışır.',
    care: 'Günde 2+ saat egzersiz gerektirir. Kısa tüy bakımı kolay. Soğuğa hassas.',
    tip: 'Türkiye\'de keklik avında en popüler ırk. Bulanık arazide bile av hisseder.',
  },
  {
    id: 'labrador', name: 'Labrador Retriever', icon: '🦮', accent: '#f97316', category: 'Retriever',
    origin: 'Kanada/İngiltere', size: 'Büyük (25-36 kg)', lifespan: '10-14 yıl',
    game: ['Ördek', 'Kaz', 'Bıldırcın', 'Çulluk'],
    traits: ['Itaatkâr', 'Suda güçlü', 'Yumuşak ağız', 'Sosyal'],
    terrain: 'Su kenarı, bataklık, sulak alan',
    training: 'En eğitilebilir ırklar arasında. Su alma (retrieve) içgüdüsü güçlü. Erken sosyalleşme önemli.',
    care: 'Bol egzersiz. Obeziteye yatkın — diyet kontrol edilmeli. Yoğun tüy dökümü.',
    tip: 'Su kuşu avında vazgeçilmez. Soğuk suda bile rahatça yüzebilir. Aile köpeği olarak da idealdir.',
  },
  {
    id: 'beagle', name: 'Beagle', icon: '🐩', accent: '#84cc16', category: 'İz Köpeği',
    origin: 'İngiltere', size: 'Küçük-Orta (9-11 kg)', lifespan: '12-15 yıl',
    game: ['Tavşan', 'Tilki', 'Yaban Domuzu (izde)'],
    traits: ['Güçlü iz koku', 'Azimli', 'Enerjik', 'Bağımsız'],
    terrain: 'Orman, çalılık, engebeli arazi',
    training: 'Bağımsız yapısı nedeniyle eğitim sabır ister. Pozitif ödül zorunlu. Koşu içgüdüsü baskılayamaz.',
    care: 'Orta egzersiz. Kulak temizliğine dikkat. Topluluk köpeğidir, yalnız bırakılmamalı.',
    tip: 'Tavşan avında eşsiz. Kokuyu takip ederken fırsat buldukça koşar. Önce "dur" komutu öğretin.',
  },
  {
    id: 'vizsla', name: 'Macar Vizsla', icon: '🐕‍🦺', accent: '#ef4444', category: 'Tazı',
    origin: 'Macaristan', size: 'Orta (20-30 kg)', lifespan: '12-15 yıl',
    game: ['Keklik', 'Bıldırcın', 'Tavşan', 'Su kuşları'],
    traits: ['Çok yönlü', 'Sevecen', 'Hızlı öğrenen', 'Hassas burun'],
    terrain: 'Her türlü arazi, su dahil',
    training: 'Çok zeki. Sert muameleye tepki verir. Nazik ama tutarlı eğitim.',
    care: 'Günde 1-2 saat yoğun egzersiz. Kısa tüy, bakımı basit. Soğuğa çok hassas.',
    tip: 'Hem durak (point) hem getiri (retrieve) hem de su avı yapabilen nadir ırklardan biri.',
  },
  {
    id: 'german_pointer', name: 'Alman Kurzhaar', icon: '🐕', accent: '#8b5cf6', category: 'Tazı',
    origin: 'Almanya', size: 'Büyük (20-32 kg)', lifespan: '12-14 yıl',
    game: ['Keklik', 'Tavşan', 'Geyik', 'Su kuşu', 'Yaban domuzu izde'],
    traits: ['Çok yönlü', 'Güçlü', 'Zeki', 'Sert koşulları sever'],
    terrain: 'Ormanlık, engebeli, su kenarı, açık arazi',
    training: 'Hızlı öğrenir. Erken yaşta meşgul edilmeli. Sıkılgan — çeşitli aktiviteler önemli.',
    care: 'Yoğun egzersiz. Kısa, sert tüy kolayca bakılır. Kulak sağlığı izlenmeli.',
    tip: 'Türkiye\'deki en çok tercih edilen av köpeği ırklarından biri. Her mevsim av edebilir.',
  },
  {
    id: 'bloodhound', name: 'Bloodhound (Tazı)', icon: '🐶', accent: '#6366f1', category: 'İz Köpeği',
    origin: 'Belçika/İngiltere', size: 'Büyük (36-50 kg)', lifespan: '10-12 yıl',
    game: ['Geyik', 'Yaban domuzu (iz)', 'Tilki'],
    traits: ['Dünyanın en güçlü burnu', 'Sakin', 'İnatçı', 'Sürü köpeği'],
    terrain: 'Orman, engebeli arazi',
    training: 'Koku izde uyumlu; itaat eğitimi zaman alır. Egzersiz sırasında kaçabilir.',
    care: 'Ağız/kulak kıvrımları düzenli temizlenmeli. Günlük yürüyüş yeterli.',
    tip: 'Yaralanmış hayvanı saatlerce takip edebilir. Operasyon köpeği olarak da kullanılır.',
  },
];

const TRAINING_STAGES = [
  { age: '8-12 Hafta', tasks: ['Temel sosyalleşme', 'İsim tanıma', 'Ev eğitimi', 'Dokunmaya alıştırma'] },
  { age: '3-6 Ay', tasks: ['Otur, dur, gel komutları', 'Tasma alışkanlığı', 'Tüfek sesine alıştırma (uzaktan)'] },
  { age: '6-12 Ay', tasks: ['Koku takibi başlangıç', 'Av kuşu tüyüne ilgi', 'Temel saha çalışması', 'Geri getirme oyunları'] },
  { age: '1-2 Yaş', tasks: ['Gerçek av simülasyonu', 'Durak (point) eğitimi', 'Su çalışması (retriever)', 'Uzaktan komut'] },
  { age: '2+ Yaş', tasks: ['Sezon av deneyimi', 'Farklı oyun türleriyle çalışma', 'Uzun mesafe dayanıklılık'] },
];

export default function HuntingDogs() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('breeds');
  const [sel, setSel] = useState(null);
  const [catFilter, setCatFilter] = useState('Tümü');

  const cats = ['Tümü', 'Tazı', 'Retriever', 'İz Köpeği'];
  const filtered = catFilter === 'Tümü' ? BREEDS : BREEDS.filter(b => b.category === catFilter);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐕 Av Köpeği Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye avında kullanılan köpek ırkları & eğitim</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['breeds', '🐕 Irklar'], ['training', '🎓 Eğitim']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#f59e0b' : '#1f2937', color: tab === id ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#f59e0b' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'breeds' && (
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setCatFilter(c)} style={{
                  background: catFilter === c ? '#f59e0b22' : 'transparent',
                  color: catFilter === c ? '#f59e0b' : '#6b7280',
                  border: `1px solid ${catFilter === c ? '#f59e0b' : '#374151'}`,
                  borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
                }}>{c}</button>
              ))}
            </div>

            {filtered.map(b => {
              const open = sel === b.id;
              return (
                <div key={b.id} style={{ marginBottom: 8 }}>
                  <div onClick={() => setSel(open ? null : b.id)} style={{
                    background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                    padding: '14px 16px', border: `1px solid ${b.accent}33`, cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 28 }}>{b.icon}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{b.name}</div>
                          <div style={{ fontSize: 11, color: '#6b7280' }}>{b.origin} · {b.size}</div>
                        </div>
                      </div>
                      <span style={{ background: b.accent + '22', color: b.accent, border: `1px solid ${b.accent}44`, borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>{b.category}</span>
                    </div>
                  </div>
                  {open && (
                    <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${b.accent}33`, borderTop: 'none' }}>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap', marginTop: 8 }}>
                        {b.traits.map(t => (
                          <span key={t} style={{ background: '#374151', borderRadius: 20, padding: '2px 8px', fontSize: 10, color: '#d1d5db' }}>{t}</span>
                        ))}
                      </div>
                      {[
                        ['🦌 Av Hayvanı', b.game.join(', ')],
                        ['🏔️ Arazi', b.terrain],
                        ['❤️ Ömür', b.lifespan],
                      ].map(([lbl, val]) => (
                        <div key={lbl} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
                          <span style={{ fontWeight: 600, color: '#6b7280' }}>{lbl}:</span> <span style={{ color: '#d1d5db' }}>{val}</span>
                        </div>
                      ))}
                      <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                        <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 3 }}>🎓 EĞİTİM</div>
                        <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{b.training}</div>
                      </div>
                      <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                        <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 3 }}>✂️ BAKIM</div>
                        <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{b.care}</div>
                      </div>
                      <div style={{ background: b.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                        <div style={{ fontSize: 10, color: b.accent, fontWeight: 600, marginBottom: 3 }}>💡 AV İPUCU</div>
                        <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{b.tip}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'training' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>📋 Eğitim Altın Kuralları</div>
              {['Her seans max 15-20 dk olsun', 'Sert ceza yerine pozitif ödül kullanın', 'Tutarlı komutlar öğretin, tüm aile aynı komutu kullanmalı', 'Yorgun köpek daha az öğrenir — dinlenmiş köpekle çalışın', 'Av sezonundan önce yaz aylarında pratik yapın'].map((r, i) => (
                <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 5, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#f59e0b', fontWeight: 700 }}>✓</span> {r}
                </div>
              ))}
            </div>

            {TRAINING_STAGES.map((stage, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ background: '#f59e0b', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#000', flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>{stage.age}</div>
                </div>
                {stage.tasks.map((t, j) => (
                  <div key={j} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4, display: 'flex', gap: 8 }}>
                    <span style={{ color: '#6b7280' }}>▸</span> {t}
                  </div>
                ))}
              </div>
            ))}

            <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', marginTop: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 8 }}>⚠️ Yasal Uyarı</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>
                Türkiye'de av köpeği kullanımı için köpeğin Tarım Bakanlığı'na kayıtlı, aşılarının tam ve ruhsatının güncel olması zorunludur. Av ruhsatı olmadan av köpeğiyle sahaya çıkmak yasal değildir.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
