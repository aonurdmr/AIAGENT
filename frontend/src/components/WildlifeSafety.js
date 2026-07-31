import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ANIMALS = [
  {
    id: 'yilan', name: 'Zehirli Yılan', icon: '🐍', accent: '#ef4444', risk: 'Yüksek',
    desc: 'Türkiye\'de 10+ yılan türü bulunur, 3\'ü ciddi zehirlidir. Kızıl engerek ve levantine engerek en tehlikelisi.',
    prevention: ['Uzun pantolon + yüksek bot giy', 'Taş ve kütük altına bakmadan yürüme', 'Çalılıkta bastırmadan önce asa ile kontrol et', 'Gece yürüyüşünde el feneri kullan'],
    firstAid: ['Sakin kal — nabzı yükseltmek zehri yayar', 'Isırılan bölgeyi kalp seviyesinin altında tut', 'Yüzük, bilezik ve sıkı giysileri çıkar', 'Kesmek veya emmeye ÇALIŞMA', 'Hemen 112 ara, serumu hayata geçir'],
    emergency: '112 — Antizehir Merkezi: 0312 305 30 30',
  },
  {
    id: 'kene', name: 'Kene', icon: '🕷️', accent: '#f59e0b', risk: 'Orta-Yüksek',
    desc: 'Kırım-Kongo Kanamalı Ateşi (KKKA) taşıyabilir. Türkiye\'de her yıl vakalar görülür. Erkenden fark edilirse risk düşük.',
    prevention: ['Açık renkli kıyafet giy (kene daha görünür)', 'Uzun kollu + uzun pantolon + tozluk', 'DEET içeren böcek kovucu sür', 'Her yürüyüş sonrası tüm vücudu kontrol et — koltuk altı, kasık, saçlı deri', 'Permethrin ile çadır ve kıyafetle muamele'],
    firstAid: ['Tırnakla çekme — baş içeride kalır', 'Ucu ince olan cımbız ile deriye paralel kavra', 'Yavaş ve düzgün çek — döndürme', 'Bölgeyi alkolle temizle', '14 gün boyunca ateş, baş ağrısı takibi yap'],
    emergency: 'Ateş çıkarsa acil servise git — KKKA riski için kan testi',
  },
  {
    id: 'yaban_arisi', name: 'Yaban Arısı / Eşek Arısı', icon: '🐝', accent: '#f97316', risk: 'Orta',
    desc: 'Toplu saldırı hayati tehlike yaratır. Anafilaksi riski olan bireylerde tek sokmak yeterli.',
    prevention: ['Koyu renkli, çiçekli desenli kıyafet giyme', 'Parfüm ve güçlü koku taşıma', 'Yiyecekleri kapalı tut', 'Kovuk ağaç ve toprak çukurlarına yaklaşma', 'Ani hareketleri olmadan sakin yürü'],
    firstAid: ['Sokma yerini kazıma veya sıkıştırma — sokmacı daha fazla zehir enjekte eder', 'Buz veya soğuk uygula (15-20 dk)', 'Antihistaminik (loratadin veya cetirizin) al', 'Nefes darlığı, baygınlık, yüzde şişme = anafilaksi = 112'],
    emergency: '112 — Adrenalini olan bireylerde EpiPen kullan',
  },
  {
    id: 'akrep', name: 'Akrep', icon: '🦂', accent: '#a78bfa', risk: 'Yüksek (özellikle çocuklar)',
    desc: 'Türkiye\'de sarı renkli Leiurus quinquestriatus en tehlikeli. Güneydoğu Türkiye\'de yaygın.',
    prevention: ['Çadıra girmeden önce içini kontrol et', 'Çizmeni giymeden önce çevir ve vur', 'Kamp yeri olarak düz kayalık veya taş yığınlarını seçme', 'Gece dışarıya çıkmadan önce el feneri kullan', 'Uyurken ağzı kapalı uyku tulumu kullan'],
    firstAid: ['Bölgeyi sabun ve su ile yıka', 'Buz uygula (30 dk)', 'Ağrı için parasetamol al (aspirin verme)', 'Çocuklarda, yaşlılarda veya kalp hastalarında acile git', 'Nabzı ve nefes almayı takip et'],
    emergency: '112 veya Zehir Merkezi: 114',
  },
  {
    id: 'yaban_domuz', name: 'Yaban Domuzu', icon: '🐗', accent: '#92400e', risk: 'Orta',
    desc: 'Sürpriz karşılaşmada veya yavrusu yanındayken saldırabilir. Dişleri ciddi yara açar.',
    prevention: ['Seste uyarı ver — konuş, ses çıkar', 'Yavru domuz görürsen hemen uzaklaş', 'Rüzgarı önüne al — koku al önce gelir', 'Bodur bitki örtüsünde yavaş ilerle'],
    firstAid: ['Ağaca tırman veya yüksek zemine çık — domuz tırmanmaz', 'Kaçarsan zigzag koş — düz çizgide daha hızlı', 'Yara derinse kanama kontrolü yap ve 112 ara', 'Kuduz riski minimal ama yara temizliği şart'],
    emergency: 'Derin yara için 112 — ısırık enfeksiyonu riski yüksek',
  },
];

const GENERAL_RULES = [
  { icon: '📱', rule: 'Orman veya dağa çıkmadan önce konumunu birine bildir' },
  { icon: '💊', rule: 'Kişisel ilaçlarını ve küçük ilk yardım çantasını her zaman taşı' },
  { icon: '🌡️', rule: 'Sıcak havalarda akrep ve yılan aktivitesi gece yoğunlaşır' },
  { icon: '🔦', rule: 'Gece yürüyüşünde eller serbest el feneri — kaya ve çalı altı görüşü' },
  { icon: '🚶', rule: 'Bilinmeyen arazide rotayı takip et — sapma tehlikeyi artırır' },
  { icon: '🩹', rule: 'Küçük kesikler bile ormanda enfekte olabilir — hemen kapat' },
];

export default function WildlifeSafety() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  const RISK_COLOR = { 'Yüksek': '#ef4444', 'Orta-Yüksek': '#f97316', 'Orta': '#f59e0b', 'Yüksek (özellikle çocuklar)': '#ef4444' };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⚠️ Yaban Hayatı Güvenliği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 tehlikeli tür · önleme & ilk yardım</div>
      </div>

      <div style={{ margin: '0 16px 12px', background: '#ef444415', borderRadius: 12, padding: '12px 14px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>🆘 Acil Numaralar</div>
        <div style={{ fontSize: 12, color: '#d1d5db' }}>Ambulans: 112 · Zehir Merkezi: 114 · Jandarma (ormanda): 156</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {ANIMALS.map(a => {
          const open = sel === a.id;
          const riskColor = RISK_COLOR[a.risk] || '#f59e0b';
          return (
            <div key={a.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : a.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${a.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{a.icon}</span>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{a.name}</div>
                  </div>
                  <span style={{ background: riskColor + '22', color: riskColor, border: `1px solid ${riskColor}44`, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>{a.risk}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${a.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{a.desc}</div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 600, marginBottom: 4 }}>🛡️ ÖNLEME</div>
                    {a.prevention.map((p, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}><span style={{ color: '#22c55e' }}>•</span> {p}</div>)}
                  </div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 600, marginBottom: 4 }}>🩹 İLK YARDIM</div>
                    {a.firstAid.map((f, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3, display: 'flex', gap: 8 }}>
                        <span style={{ color: '#f59e0b', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#ef444415', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 600, marginBottom: 3 }}>📞 ACİL</div>
                    <div style={{ fontSize: 12, color: '#d1d5db' }}>{a.emergency}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', marginTop: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginBottom: 10 }}>📋 Genel Güvenlik Kuralları</div>
          {GENERAL_RULES.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{r.icon}</span>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{r.rule}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
