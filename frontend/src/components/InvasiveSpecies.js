import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  {
    id: 'blue_crab', name: 'Mavi Yengeç', sci: 'Callinectes sapidus', icon: '🦀', accent: '#3b82f6', threat: 'Kritik',
    origin: 'Atlantik Okyanusu (Kuzey Amerika)',
    spread: ['Marmara Denizi', 'Ege kıyıları', 'Akdeniz', 'Karadeniz batısı'],
    impact: 'Yerli midye, istiridye ve balık yumurtası stoklarını tehdit eder. Ağ ve ekipman hasarı verir.',
    detection: 'Koyu mavi carapace, sivri yanlar, yüzgec şeklinde arka bacaklar. 10-20 cm genişlik.',
    report: true,
    tip: 'Avlandığında yemek olarak tüketilebilir; balıkçılara ek gelir kaynağı olabilir. Mutlaka bildirin.',
  },
  {
    id: 'silver_carp', name: 'Gümüş Sazan', sci: 'Hypophthalmichthys molitrix', icon: '🐟', accent: '#94a3b8', threat: 'Yüksek',
    origin: 'Çin (suni barajlara taşındı)',
    spread: ['Keban Barajı', 'Atatürk Barajı', 'Fırat-Dicle havzası'],
    impact: 'Yerli balık türleriyle besin rekabeti, fitoplankton tükenmesi. Su ekosistemi dengesini bozar.',
    detection: 'Gözler kafanın altında, büyük pul, gümüş renk. 1 metreye kadar. Rahatsız edilince zıplar.',
    report: false,
    tip: 'Yemek olarak değeri düşük ama gıda desteği için kullanılıyor. Avlanması teşvik ediliyor.',
  },
  {
    id: 'jellyfish', name: 'Mnemiopsis Denizanası', sci: 'Mnemiopsis leidyi', icon: '🪼', accent: '#a855f7', threat: 'Kritik',
    origin: 'Kuzey Amerika Atlantik kıyıları',
    spread: ['Karadeniz (yoğun)', 'Marmara', 'Ege'],
    impact: 'Hamsi ve istavrit yumurtasını, larvasını ve zooplanktonunu yer. Karadeniz balıkçılığını çökertti.',
    detection: 'Şeffaf, taransız, 5-12 cm. Biolüminesans özelliği var (gece parlar). Sokmaz.',
    report: true,
    tip: 'Ağlara takılınca kesilebilir; zarar vermez. Kitlesel görüldüğünde lütfen koordinatı bildirin.',
  },
  {
    id: 'killer_algae', name: 'Caulerpa Alg', sci: 'Caulerpa cylindracea', icon: '🌿', accent: '#22c55e', threat: 'Orta',
    origin: 'Avustralya',
    spread: ['Ege güney kıyıları', 'Bodrum', 'Datça', 'Akdeniz kıyıları'],
    impact: 'Posidonia deniz çayırlarını ve kayalık dip ekosistemlerini örter. Çipura habitatını yok eder.',
    detection: 'Yeşil-sarı renkli, silindirk dal yapısı, dip yüzeyleri hızla kaplar. Sular altında gözüken "hali".',
    report: true,
    tip: 'Dalış sırasında fark edilirse ÇOK DİKKATLİ olun — alg parçalarına değmeyin, yayılır. Fotoğrafı bildirin.',
  },
  {
    id: 'round_goby', name: 'Kaya Balığı (Karadeniz)', sci: 'Neogobius melanostomus', icon: '🐡', accent: '#f59e0b', threat: 'Orta',
    origin: 'Karadeniz havzası (now spreading W)',
    spread: ['Boğaz ve Marmara kıyıları', 'Kıyı kayalıkları'],
    impact: 'Küçük yerli balık yumurtasını ve öteki kaya balığı türlerini yer. Ekosistem rakibi.',
    detection: '10-25cm, siyah leke üst solungaç kapağı, yapışkan vantuz yüzgeci. Kayalık dip.',
    report: false,
    tip: 'Küçük jig ve solucanla kolaylıkla avlanır. Lezzetli bir balık; yemek için değerlendirilebilir.',
  },
  {
    id: 'redbelly_pacu', name: 'Disk Balığı (Pacu)', sci: 'Colossoma macropomum', icon: '🐠', accent: '#ef4444', threat: 'Düşük',
    origin: 'Amazon havzası (dekoratif akvaryum)',
    spread: ['İstanbul nehirler', 'İzmir dereler (nadir)'],
    impact: 'Tohumları yemeyi, bitki alanını tahrip eder. Soğuğa dayanıklı değil; kışın ölür.',
    detection: '30-70cm. Disk şekli, kırmızı karın, güçlü çene. Akvaryumdan bırakılmış bireyler.',
    report: true,
    tip: 'Bulunursa derhal yakalayın. Doğal suya akvaryum balığı bırakmak yasaktır.',
  },
];

const LS_KEY = 'invasive_reports_v1';
function loadReports() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; } }
function saveReports(v) { try { localStorage.setItem(LS_KEY, JSON.stringify(v)); } catch {} }

const THREAT_COLOR = { 'Kritik': '#ef4444', 'Yüksek': '#f97316', 'Orta': '#f59e0b', 'Düşük': '#22c55e' };

export default function InvasiveSpecies() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const [sel, setSel] = useState(null);
  const [filter, setFilter] = useState('Tümü');
  const [reports, setReports] = useState(loadReports);
  const [reportForm, setReportForm] = useState({ species: SPECIES[0].name, location: '', date: new Date().toISOString().slice(0, 10), count: '1', note: '' });

  function addReport() {
    if (!reportForm.location) return;
    const next = [{ ...reportForm, id: Date.now() }, ...reports];
    saveReports(next);
    setReports(next);
    setReportForm(v => ({ ...v, location: '', note: '' }));
  }

  const levels = ['Tümü', 'Kritik', 'Yüksek', 'Orta', 'Düşük'];
  const filtered = filter === 'Tümü' ? SPECIES : SPECIES.filter(s => s.threat === filter);

  const INPUT = { background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '9px 11px', fontSize: 13, width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🚨 İstilacı Türler</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye sularındaki istilacı türler & bildirim merkezi</div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['species', '🔍 Türler'], ['report', '📍 Bildir']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#ef4444' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#ef4444' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && (
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto' }}>
              {levels.map(l => {
                const col = l === 'Tümü' ? '#6b7280' : THREAT_COLOR[l];
                return (
                  <button key={l} onClick={() => setFilter(l)} style={{
                    background: filter === l ? col + '33' : 'transparent',
                    color: filter === l ? col : '#6b7280',
                    border: `1px solid ${filter === l ? col : '#374151'}`,
                    borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
                  }}>{l}</button>
                );
              })}
            </div>

            {filtered.map((s, i) => {
              const tc = THREAT_COLOR[s.threat];
              const open = sel === s.id;
              return (
                <div key={s.id}>
                  <div onClick={() => setSel(open ? null : s.id)}
                    style={{ background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12, padding: '14px 16px', marginBottom: open ? 0 : 8, border: `1px solid ${s.accent}33`, cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 26 }}>{s.icon}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{s.name}</div>
                          <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{s.sci}</div>
                        </div>
                      </div>
                      <span style={{ background: tc + '22', color: tc, border: `1px solid ${tc}44`, borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>{s.threat}</span>
                    </div>
                  </div>
                  {open && (
                    <div style={{ background: '#1f2937', padding: '0 16px 14px', marginBottom: 8, borderRadius: '0 0 12px 12px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                      <div style={{ marginTop: 4 }}>
                        {[
                          ['🌍 Köken', s.origin],
                          ['📍 Türkiye\'de', s.spread.join(', ')],
                        ].map(([lbl, val]) => (
                          <div key={lbl} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}><span style={{ fontWeight: 600, color: '#6b7280' }}>{lbl}:</span> <span style={{ color: '#d1d5db' }}>{val}</span></div>
                        ))}
                        <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7, marginBottom: 8 }}>
                          <span style={{ fontWeight: 600, color: '#ef4444' }}>⚠️ Etki:</span> {s.impact}
                        </div>
                        <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                          <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 3 }}>🔍 NASIL TANIRIM?</div>
                          <div style={{ fontSize: 12, color: '#d1d5db' }}>{s.detection}</div>
                        </div>
                        <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                          <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                          <div style={{ fontSize: 12, color: '#d1d5db' }}>{s.tip}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'report' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>📍 İSTİLACI TÜR BİLDİR</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Tür</div>
                  <select value={reportForm.species} onChange={e => setReportForm(v => ({ ...v, species: e.target.value }))} style={INPUT}>
                    {SPECIES.map(s => <option key={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Tahmini Adet</div>
                  <input type="number" value={reportForm.count} onChange={e => setReportForm(v => ({ ...v, count: e.target.value }))} style={INPUT} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Tarih</div>
                  <input type="date" value={reportForm.date} onChange={e => setReportForm(v => ({ ...v, date: e.target.value }))} style={INPUT} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Konum</div>
                  <input value={reportForm.location} onChange={e => setReportForm(v => ({ ...v, location: e.target.value }))} style={INPUT} placeholder="Bodrum kıyısı..." />
                </div>
              </div>
              <input value={reportForm.note} onChange={e => setReportForm(v => ({ ...v, note: e.target.value }))} style={{ ...INPUT, marginBottom: 10 }} placeholder="Ek bilgi..." />
              <button onClick={addReport} style={{ width: '100%', background: '#ef4444', border: 'none', color: '#fff', borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                📍 Bildirimi Kaydet
              </button>
            </div>

            {reports.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 30, color: '#6b7280' }}>
                <div style={{ fontSize: 36 }}>🔍</div>
                <div style={{ marginTop: 8, fontSize: 13 }}>Henüz bildirim yok</div>
              </div>
            ) : reports.map(r => (
              <div key={r.id} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>🚨 {r.species} × {r.count}</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{r.date} · {r.location}</div>
                {r.note && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>{r.note}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
