import React, { useState } from 'react';

const SECTIONS = ['Genel', 'Boy Limitleri', 'Sezon Yasakları', 'Yasaklı Yöntemler', 'Lisans'];

const SIZE_LIMITS = [
  { species: 'Levrek', icon: '🐟', minLen: 25, water: 'tuzlu', note: 'Akdeniz ve Ege' },
  { species: 'Çipura', icon: '🐡', minLen: 20, water: 'tuzlu', note: 'Tüm kıyılar' },
  { species: 'Karagöz', icon: '🐠', minLen: 18, water: 'tuzlu', note: 'Tüm kıyılar' },
  { species: 'Barbun', icon: '🐟', minLen: 13, water: 'tuzlu', note: 'Akdeniz' },
  { species: 'Kolyoz', icon: '🐟', minLen: 18, water: 'tuzlu', note: 'Tüm kıyılar' },
  { species: 'İstavrit', icon: '🐠', minLen: 13, water: 'tuzlu', note: 'Tüm kıyılar' },
  { species: 'Sardalya', icon: '🐟', minLen: 11, water: 'tuzlu', note: 'Tüm kıyılar' },
  { species: 'Uskumru', icon: '🐡', minLen: 20, water: 'tuzlu', note: 'Tüm kıyılar' },
  { species: 'Palamut', icon: '🐟', minLen: 20, water: 'tuzlu', note: 'Tüm kıyılar' },
  { species: 'Sazan', icon: '🐠', minLen: 25, water: 'tatlı', note: 'Tüm iç sular' },
  { species: 'Alabalık', icon: '🐡', minLen: 22, water: 'tatlı', note: 'Nehirler' },
  { species: 'Turna', icon: '🐟', minLen: 40, water: 'tatlı', note: 'Tüm iç sular' },
  { species: 'Sudak', icon: '🐠', minLen: 35, water: 'tatlı', note: 'Tüm iç sular' },
  { species: 'Yayın', icon: '🦈', minLen: 50, water: 'tatlı', note: 'Tüm iç sular' },
  { species: 'Sirazbalığı', icon: '🐟', minLen: 20, water: 'tatlı', note: 'Ege nehirleri' },
];

const SEASON_BANS = [
  {
    species: 'Alabalık',
    icon: '🐡',
    banned: 'Kasım 1 – Şubat son',
    reason: 'Üreme koruma',
    water: 'tatlı',
    color: '#38bdf8',
  },
  {
    species: 'Sazan',
    icon: '🐠',
    banned: 'Nisan 15 – Haziran 15',
    reason: 'Üreme dönemi',
    water: 'tatlı',
    color: '#f59e0b',
  },
  {
    species: 'Turna',
    icon: '🐟',
    banned: 'Şubat 1 – Mart 31',
    reason: 'Üreme koruma',
    water: 'tatlı',
    color: '#84cc16',
  },
  {
    species: 'Orfoz',
    icon: '🐡',
    banned: 'Tüm yıl',
    reason: 'Nesli tehlikede',
    water: 'tuzlu',
    color: '#ef4444',
  },
  {
    species: 'Orkinos (Ton)',
    icon: '🐟',
    banned: 'Kota ile yönetilir',
    reason: 'Stok yönetimi',
    water: 'tuzlu',
    color: '#ef4444',
  },
  {
    species: 'Barbun (Tekal)',
    icon: '🐟',
    banned: 'Haziran – Ağustos',
    reason: 'Üreme koruma',
    water: 'tuzlu',
    color: '#f97316',
  },
  {
    species: 'Palamut',
    icon: '🐠',
    banned: 'Nisan 1 – Mayıs 31',
    reason: 'Koruma dönemi',
    water: 'tuzlu',
    color: '#c084fc',
  },
];

const BANNED_METHODS = [
  { method: 'Dinamit / Patlayıcı', icon: '💣', severity: 'Ağır Ceza', desc: 'Sularda patlayıcı kullanmak yasaktır. Ağır hapis ve para cezası.' },
  { method: 'Zehir / Toksik madde', icon: '☠️', severity: 'Ağır Ceza', desc: 'Suya zehirli madde atmak ve balık yakalamak yasaktır.' },
  { method: 'Elektrik şoku', icon: '⚡', severity: 'Ağır Ceza', desc: 'Elektrikle balık avlamak ağır cezaya tabidir.' },
  { method: 'Serseri olta (>5 iğne)', icon: '🪝', severity: 'Para Cezası', desc: 'Sportif avcılar 5 adetten fazla iğne kullanamaz.' },
  { method: 'Dip trolü (kıyı yakını)', icon: '🚢', severity: 'Para Cezası', desc: '3 milden az mesafede dip trolü yasaktır.' },
  { method: 'Ağ ile spor avı', icon: '🕸️', severity: 'Para Cezası', desc: 'Spor balıkçılar ağ kullanamaz, kıskı-ışıkta avlanamaz.' },
  { method: 'SCUBA ile av', icon: '🤿', severity: 'Para Cezası', desc: 'Sualtı nefes cihazıyla balık avlamak yasaktır.' },
  { method: 'Üreme alanlarına ağ', icon: '🌿', severity: 'Para Cezası', desc: 'Deniz çayırı (Posidonia) bölgelerine ağ atmak yasaktır.' },
];

const LICENSES = [
  {
    type: 'Sportif Amatör',
    icon: '🎣',
    color: '#22c55e',
    who: 'Bireysel spor balıkçılar',
    where: 'Tüm deniz ve iç sular',
    limit: 'Günde max 3 kg veya 10 adet',
    cost: 'Ücretsiz (e-devlet)',
    valid: 'Yıllık',
    notes: 'E-devlet üzerinden çıkarılır, her balıkçıda olması zorunlu',
  },
  {
    type: 'İç Su Amatör',
    icon: '💧',
    color: '#38bdf8',
    who: 'Tatlı su balıkçıları',
    where: 'Göl, nehir, baraj',
    limit: 'Bölgeye göre değişir',
    cost: 'Yıllık harç (DSİ)',
    valid: 'Yıllık',
    notes: 'Bazı göl ve barajlar için ek izin gerekebilir',
  },
  {
    type: 'Ticari Av Ruhsatı',
    icon: '🚢',
    color: '#f59e0b',
    who: 'Profesyonel balıkçılar',
    where: 'Belirlenen sular',
    limit: 'Kota ile yönetilir',
    cost: 'Ruhsat ücreti (S&U bakanlığı)',
    valid: '2-5 yıl',
    notes: 'Tekne tescili ve sigortası zorunlu',
  },
];

const GENERAL_RULES = [
  { icon: '📏', text: 'Minimum boy altındaki balıkları yakalayıp aldatmak yasaktır — geri bırakın' },
  { icon: '⏰', text: 'Olta, saat 06:00–22:00 arasında kullanılabilir (bölgeye göre değişir)' },
  { icon: '🏖️', text: 'Plajlarda ve yüzme alanlarında olta atmak yasaktır' },
  { icon: '🚫', text: 'Koruma altındaki deniz ürünleri (kerevit, midye vb.) sezonu dışında toplanamaz' },
  { icon: '🎣', text: 'Eğlence amaçlı tekne balıkçılığı için tekne ruhsatı gerekir' },
  { icon: '📱', text: 'Lisans belgenizi her zaman yanınızda bulundurun (e-devlet üzerinden gösterilebilir)' },
  { icon: '🤫', text: 'Defalarca ihlal halinde lisans iptali ve ağır cezalar uygulanır' },
  { icon: '♻️', text: 'Balıkçılık alanlarında plastik atık bırakmak yasaktır' },
];

function SizeCheck() {
  const [measured, setMeasured] = useState('');
  const [species, setSpecies]   = useState('');
  const sp = SIZE_LIMITS.find(s => s.species === species);
  const len = parseFloat(measured);
  const ok  = sp && len >= sp.minLen;
  const bad = sp && len > 0 && len < sp.minLen;
  return (
    <div style={{
      background: 'var(--s2)', border: '1px solid var(--border)',
      borderRadius: 14, padding: 14, marginBottom: 14,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-mute)', marginBottom: 10, letterSpacing: '.08em' }}>
        📏 BOY KONTROLÜ
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <select value={species} onChange={e => setSpecies(e.target.value)} className="input-field" style={{ flex: 1, fontSize: 12 }}>
          <option value="">Tür seç...</option>
          {SIZE_LIMITS.map(s => <option key={s.species} value={s.species}>{s.icon} {s.species}</option>)}
        </select>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <input
            type="number"
            className="input-field"
            placeholder="Boy (cm)"
            value={measured}
            onChange={e => setMeasured(e.target.value)}
            style={{ width: 90, textAlign: 'center' }}
          />
        </div>
      </div>
      {ok && (
        <div style={{ background: '#22c55e15', border: '1px solid #22c55e40', borderRadius: 10, padding: '8px 12px', fontSize: 12, color: '#22c55e' }}>
          ✅ Yeterli boy! Min: {sp.minLen} cm — Bu balığı alabilirsiniz.
        </div>
      )}
      {bad && (
        <div style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: 10, padding: '8px 12px', fontSize: 12, color: '#ef4444' }}>
          ❌ Küçük! Min: {sp.minLen} cm — Bu balığı bırakın, büyüsün.
        </div>
      )}
    </div>
  );
}

export default function FishingLaws() {
  const [section, setSection] = useState('Genel');

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #0d1117 0%, #161b22 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>⚖️ Balıkçılık Mevzuatı</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Türkiye balıkçılık kuralları ve yasal sınırlar</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Section tabs */}
        <div style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 2, marginBottom: 14 }}>
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setSection(s)} style={{
              flexShrink: 0, padding: '6px 12px', borderRadius: 16, cursor: 'pointer',
              background: section === s ? 'var(--a-glow)' : 'var(--s2)',
              border: section === s ? '1px solid var(--border-lg)' : '1px solid var(--border)',
              color: section === s ? 'var(--a-light)' : 'var(--t-mute)',
              fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
            }}>{s}</button>
          ))}
        </div>

        {/* General rules */}
        {section === 'Genel' && (
          <>
            <div style={{
              background: '#f59e0b10', border: '1px solid #f59e0b30',
              borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: '#fbbf24',
            }}>
              ⚠️ Bu bilgiler genel rehber niteliğindedir. Güncel mevzuat için tarım.gov.tr ve kıyı emniyeti kurumuna başvurun.
            </div>
            {GENERAL_RULES.map((r, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, padding: '10px 0',
                borderBottom: '1px solid var(--border)', alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{r.icon}</span>
                <span style={{ fontSize: 12, color: 'var(--t-mid)', lineHeight: 1.5 }}>{r.text}</span>
              </div>
            ))}
          </>
        )}

        {/* Size limits */}
        {section === 'Boy Limitleri' && (
          <>
            <SizeCheck />
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 8 }}>
              MİNİMUM BOY TABLOSU
            </div>
            {['tuzlu','tatlı'].map(water => (
              <div key={water} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: water==='tuzlu' ? '#38bdf8' : '#22c55e', fontWeight: 600, marginBottom: 6 }}>
                  {water==='tuzlu' ? '🌊 Tuzlu Su' : '💧 Tatlı Su'}
                </div>
                {SIZE_LIMITS.filter(s => s.water === water).map(sp => (
                  <div key={sp.species} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '8px 12px', background: 'var(--s2)',
                    border: '1px solid var(--border)', borderRadius: 10, marginBottom: 5,
                  }}>
                    <span style={{ fontSize: 20 }}>{sp.icon}</span>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#fff' }}>{sp.species}</span>
                    <span style={{ fontSize: 12, color: '#fbbf24', fontWeight: 800 }}>≥{sp.minLen} cm</span>
                    <span style={{ fontSize: 10, color: 'var(--t-mute)' }}>{sp.note}</span>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        {/* Season bans */}
        {section === 'Sezon Yasakları' && (
          <>
            {SEASON_BANS.map((b, i) => (
              <div key={i} style={{
                background: b.color + '10', border: `1px solid ${b.color}35`,
                borderRadius: 14, padding: 14, marginBottom: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{b.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>{b.species}</div>
                    <div style={{ fontSize: 12, color: b.color, fontWeight: 600 }}>🚫 {b.banned}</div>
                    <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 2 }}>{b.reason}</div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Banned methods */}
        {section === 'Yasaklı Yöntemler' && (
          <>
            {BANNED_METHODS.map((m, i) => {
              const isHeavy = m.severity === 'Ağır Ceza';
              const color = isHeavy ? '#ef4444' : '#f59e0b';
              return (
                <div key={i} style={{
                  background: color + '08', border: `1px solid ${color}30`,
                  borderRadius: 14, padding: 14, marginBottom: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ fontSize: 24 }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>{m.method}</span>
                        <span style={{
                          fontSize: 10, fontWeight: 700, color, background: color + '20',
                          borderRadius: 6, padding: '2px 6px',
                        }}>{m.severity}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--t-mid)', lineHeight: 1.5 }}>{m.desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* Licenses */}
        {section === 'Lisans' && (
          <>
            {LICENSES.map((lic, i) => (
              <div key={i} style={{
                background: lic.color + '10', border: `1px solid ${lic.color}35`,
                borderRadius: 16, padding: 16, marginBottom: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <span style={{ fontSize: 32 }}>{lic.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: lic.color }}>{lic.type}</div>
                    <div style={{ fontSize: 11, color: 'var(--t-mute)' }}>{lic.who}</div>
                  </div>
                </div>
                {[
                  ['🗺️', 'Kapsam', lic.where],
                  ['🎣', 'Limit', lic.limit],
                  ['💰', 'Ücret', lic.cost],
                  ['📅', 'Geçerlilik', lic.valid],
                ].map(([ic, lab, val]) => (
                  <div key={lab} style={{ display: 'flex', gap: 8, padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 12, color: 'var(--t-mute)', minWidth: 70 }}>{ic} {lab}</span>
                    <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: lic.color, marginTop: 8, lineHeight: 1.5 }}>
                  💡 {lic.notes}
                </div>
              </div>
            ))}
            <div style={{
              background: '#22c55e10', border: '1px solid #22c55e30',
              borderRadius: 12, padding: 12, fontSize: 12, color: '#22c55e', marginBottom: 14,
            }}>
              📱 Lisans için: e-devlet.gov.tr → "Amatör Deniz Balıkçılık Belgesi" aratın
            </div>
          </>
        )}

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
