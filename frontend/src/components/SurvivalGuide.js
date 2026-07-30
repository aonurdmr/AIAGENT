import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SCENARIOS = [
  {
    id: 1, title: 'Kayboldum — Ne Yapmalıyım?', icon: '🧭', priority: 'ACİL', accent: '#ef4444',
    steps: [
      { num: 1, text: 'Dur ve paniklemeden otur. Derin nefes al.', color: '#3b82f6' },
      { num: 2, text: 'STOP kuralı: Stop (dur), Think (düşün), Observe (gözlemle), Plan (planla).', color: '#3b82f6' },
      { num: 3, text: 'Cep telefonunu kontrol et. Varsa 112\'yi ara. Sinyal yoksa yüksek yere çık.', color: '#22c55e' },
      { num: 4, text: 'Son bilinen konumu hatırla. Belirgin bir referans noktası bul.', color: '#22c55e' },
      { num: 5, text: 'Akar suyu takip et — genellikle köylere veya yollara ulaşır.', color: '#f59e0b' },
      { num: 6, text: 'Hava kararıyorsa yerinde kal. Ateş yak, yüksek sesle bağır.', color: '#f59e0b' },
    ],
    tip: 'Macera planınızı her zaman birisiyle paylaşın — nereye gittiğinizi ve ne zaman dönmeyi planladığınızı.',
  },
  {
    id: 2, title: 'Geceleme — Barınak Yapma', icon: '🏕️', priority: 'Önemli', accent: '#f59e0b',
    steps: [
      { num: 1, text: 'Rüzgardan korunaklı, düz ve kuru bir alan seç.', color: '#3b82f6' },
      { num: 2, text: 'Su yataklarından en az 30m uzak kal (sel riski + böcekler).', color: '#3b82f6' },
      { num: 3, text: 'Yapraklarla yalıtılmış basit bir A-çerçeve sığınak yap.', color: '#22c55e' },
      { num: 4, text: 'Yatmadan önce yere 15cm kalınlığında yaprak ve ot döşe.', color: '#22c55e' },
      { num: 5, text: 'Ateş yakacaksan rüzgar yönüne dikkat et; çevrede yanıcı madde bırakma.', color: '#f59e0b' },
    ],
    tip: 'Vücut ısısını korumak hayatta kalmada en önemli faktördür. Soğukluk ölüme yol açar.',
  },
  {
    id: 3, title: 'Su Bulmak ve Arıtmak', icon: '💧', priority: 'ACİL', accent: '#06b6d4',
    steps: [
      { num: 1, text: 'Akan suyu tercih et: nehir, dere, pınar. Durgun su son çare.', color: '#3b82f6' },
      { num: 2, text: 'Yapraklardaki çiy suyu toplanabilir. Sabah erken fırsatı iyi değerlendir.', color: '#3b82f6' },
      { num: 3, text: 'Suyu 3 dakika kaynat veya arıtma tableti kullan.', color: '#22c55e' },
      { num: 4, text: 'Kum-taş-kömür süzgeciyle tortu gider, ama sonra mutlaka kaynat.', color: '#22c55e' },
      { num: 5, text: 'Asla deniz suyu veya idrar içme — susuzluğu artırır.', color: '#ef4444' },
    ],
    tip: 'Günlük minimum ihtiyaç 2L. Aktivite ve sıcakta 4L\'ye çıkar.',
  },
  {
    id: 4, title: 'Ateş Yakmak (Kibrit Yokken)', icon: '🔥', priority: 'Önemli', accent: '#f97316',
    steps: [
      { num: 1, text: 'Kuru malzeme topla: ot, kuru yaprak (tutuşturucu), ince dal (yakacak), kalın odun (yakıt).', color: '#3b82f6' },
      { num: 2, text: 'Sürtme yöntemi: kuş yuvası biçiminde ot yuvası içine çubuk yerleştir.', color: '#3b82f6' },
      { num: 3, text: 'Güneş ışığı varsa: mercek veya şişe suyu ile kağıda odakla.', color: '#22c55e' },
      { num: 4, text: 'Çakmaktaşı ve çelik ile kıvılcım üret. Tinder fungus (at mantarı) ideal tutuşturucu.', color: '#22c55e' },
      { num: 5, text: 'Ateşi rüzgardan koru. Üzerine kademeli olarak odun ekle.', color: '#f59e0b' },
    ],
    tip: 'Ateş hem ısı hem güvenlik hem de moral kaynağı. Doğaya zarar vermemek için söndür.',
  },
  {
    id: 5, title: 'Yılan Isırması', icon: '🐍', priority: 'ACİL', accent: '#ef4444',
    steps: [
      { num: 1, text: '112\'yi HEMEN ara. Sakin kalın — panik kalp atışını hızlandırır, zehiri yayar.', color: '#ef4444' },
      { num: 2, text: 'Isırılan bölgeyi kalp seviyesinin altında tut.', color: '#3b82f6' },
      { num: 3, text: 'Takı ve dar giysileri çıkar — şişme olabilir.', color: '#3b82f6' },
      { num: 4, text: 'Isırık bölgesini sabun ve su ile hafifçe yıka.', color: '#22c55e' },
      { num: 5, text: 'Turnike, kesi veya emme YAPMA. Yılanı yakalamaya çalışma.', color: '#ef4444' },
      { num: 6, text: 'Hastaneye gidinceye kadar hareket ettirme.', color: '#f59e0b' },
    ],
    tip: 'Türkiye\'de engerek en yaygın zehirli yılan. Yürüyüşte yüksek bot ve uzun pantolon giyin.',
  },
  {
    id: 6, title: 'Hipotermi (Soğuk Çarpması)', icon: '🥶', priority: 'ACİL', accent: '#3b82f6',
    steps: [
      { num: 1, text: 'Kişiyi soğuktan uzaklaştır. Kuru, sıcak bir ortama al.', color: '#3b82f6' },
      { num: 2, text: 'Islak giysileri çıkar; kuru battaniye veya sleeping bag ile sar.', color: '#3b82f6' },
      { num: 3, text: 'Koltuk altı, kasık ve boyun gibi büyük damar bölgelerini ısıt.', color: '#22c55e' },
      { num: 4, text: 'Hafif hipotermi: ılık (sıcak değil) içecek ver — çay, şeker.', color: '#22c55e' },
      { num: 5, text: 'Doğrudan sıcak ısıtıcı uygulamayın — doku hasarı yapabilir.', color: '#ef4444' },
      { num: 6, text: 'Ağır vakalarda 112. Bilinç kapanıyorsa kurtarma solunumu.', color: '#ef4444' },
    ],
    tip: '35°C altı vücut sıcaklığı hipotermi. Islak + rüzgar en tehlikeli kombinasyon.',
  },
  {
    id: 7, title: 'SOS Sinyali Verme', icon: '🆘', priority: 'Önemli', accent: '#a855f7',
    steps: [
      { num: 1, text: 'Uluslararası SOS: 3 kısa – 3 uzun – 3 kısa sinyal.', color: '#3b82f6' },
      { num: 2, text: 'Ayna veya dürbün lensiyle güneş ışığını uçağa/yardımcıya yansıt.', color: '#3b82f6' },
      { num: 3, text: 'Yerde büyük harflerle SOS yaz (taş, kütük, ağaç) — havadan görülür.', color: '#22c55e' },
      { num: 4, text: 'Duman sinyali: gündüz yeşil yaprak (koyu duman), gece düz ateş.', color: '#22c55e' },
      { num: 5, text: 'Whistle (düdük): 3 kez üfleme. Sesten çok uzaktan duyulur.', color: '#f59e0b' },
    ],
    tip: 'Kamp çantasında daima: düdük, ayna, ateşleyici ve bıçak bulundur.',
  },
  {
    id: 8, title: 'Yenilebilir Bitkiler Bulmak', icon: '🌿', priority: 'Bilgi', accent: '#84cc16',
    steps: [
      { num: 1, text: 'Evrensel yenilebilirlik testi: Deriye sür → bekle → dudağa sür → bekle → küçük tat → bekle.', color: '#3b82f6' },
      { num: 2, text: 'Güvenli türler: karahindiba, ısırgan (haşlayınca ısırıcı etkisi geçer), yabani sarımsak.', color: '#22c55e' },
      { num: 3, text: 'Meyveler: yabani böğürtlen, ahududu güvenlidir. Beyaz veya sarı meyvelerden kaçın.', color: '#22c55e' },
      { num: 4, text: 'Fındık, meşe palamudu (kavurulunca), çam tohumları kalori açısından zengin.', color: '#f59e0b' },
      { num: 5, text: 'Sütlü veya köpüklü özlü bitkilerden kaçın — büyük olasılıkla zehirli.', color: '#ef4444' },
    ],
    tip: 'Bitkiyle beslenme son çare. Yanlış bitki yemek susuzluktan daha tehlikeli olabilir.',
  },
];

export default function SurvivalGuide() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('Tümü');

  const filtered = SCENARIOS.filter(s => priorityFilter === 'Tümü' || s.priority === priorityFilter);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏔️ Hayatta Kalma Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>8 senaryo · doğada hayatta kalma teknikleri</div>
      </div>

      <div style={{ margin: '0 16px 14px', background: '#450a0a', borderRadius: 14, padding: '12px 16px', border: '1px solid #f8717144' }}>
        <div style={{ fontSize: 11, color: '#f87171', fontWeight: 600, marginBottom: 4 }}>⚠️ ÖNEMLI UYARI</div>
        <div style={{ fontSize: 12, color: '#fca5a5', lineHeight: 1.6 }}>
          Bu bilgiler sadece hayatta kalma acil durumları için rehber niteliğindedir. Gerçek bir tehlikede önce 112\'yi arayın.
        </div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        {['Tümü', 'ACİL', 'Önemli', 'Bilgi'].map(f => (
          <button key={f} onClick={() => setPriorityFilter(f)} style={{
            background: priorityFilter === f ? '#3b82f6' : '#1f2937',
            color: priorityFilter === f ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: priorityFilter === f ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{f}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {filtered.map(s => (
          <div key={s.id} onClick={() => setSelected(selected?.id === s.id ? null : s)}
            style={{ background: '#1f2937', borderRadius: 14, marginBottom: 10, border: `1px solid ${s.accent}44`, cursor: 'pointer', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 26 }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{s.title}</div>
                  <span style={{ fontSize: 10, background: s.accent + '22', color: s.accent, border: `1px solid ${s.accent}44`, borderRadius: 20, padding: '2px 8px', fontWeight: 700, marginTop: 4, display: 'inline-block' }}>{s.priority}</span>
                </div>
              </div>
              <span style={{ color: '#6b7280', fontSize: 16 }}>{selected?.id === s.id ? '▲' : '▼'}</span>
            </div>

            {selected?.id === s.id && (
              <div style={{ padding: '0 16px 16px', borderTop: '1px solid #374151' }}>
                {s.steps.map(step => (
                  <div key={step.num} style={{ display: 'flex', gap: 12, marginTop: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{step.num}</div>
                    <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6, paddingTop: 3 }}>{step.text}</div>
                  </div>
                ))}
                <div style={{ marginTop: 14, background: '#1e3a5f', borderRadius: 10, padding: '10px 12px', border: '1px solid #3b82f644' }}>
                  <div style={{ fontSize: 10, color: '#93c5fd', fontWeight: 600, marginBottom: 2 }}>💡 İPUCU</div>
                  <div style={{ fontSize: 12, color: '#bfdbfe', lineHeight: 1.6 }}>{s.tip}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
