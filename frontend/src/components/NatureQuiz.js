import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1, category: 'Balık', icon: '🐟',
    q: 'Lüfer balığı en yoğun olarak hangi mevsimde göç eder?',
    options: ['Yaz', 'Sonbahar', 'İlkbahar', 'Kış'],
    answer: 1,
    explain: 'Lüfer, Eylül-Kasım arası sonbahar göçünde İstanbul Boğazı üzerinden Karadeniz\'den Ege\'ye geçer. Bu dönem "büyük göç" olarak bilinir.',
  },
  {
    id: 2, category: 'Kuş', icon: '🦅',
    q: 'Şahin ve kartal arasındaki en belirgin fark nedir?',
    options: ['Renk', 'Kanat şekli', 'Vücut büyüklüğü', 'Ses'],
    answer: 2,
    explain: 'Kartallar şahinlerden çok daha büyüktür. Kanat açıklığı 2 metreyi aşabilen kartalın aksine şahinler genellikle 30-50 cm kanat açıklığına sahiptir.',
  },
  {
    id: 3, category: 'Bitki', icon: '🌿',
    q: 'Karabaş mantarın zehirli olup olmadığını anlamanın güvenilir yolu nedir?',
    options: ['Gümüş kaşıkla test', 'Böcek yiyip yemediğine bak', 'Tatmak', 'Uzman ile tanımlama'],
    answer: 3,
    explain: 'Halk arasında dolaşan test yöntemleri (gümüş, sarımsak, pişirme vb.) hiçbiri güvenilir değildir. Tek güvenli yöntem uzman bir mikolog ile tanımlamaktır.',
  },
  {
    id: 4, category: 'Av', icon: '🏹',
    q: 'Türkiye\'de av ruhsatı hangi kurum tarafından düzenlenir?',
    options: ['İçişleri Bakanlığı', 'Tarım ve Orman Bakanlığı', 'Çevre Bakanlığı', 'Belediye'],
    answer: 1,
    explain: 'Av ruhsatları Tarım ve Orman Bakanlığı\'na bağlı Orman Genel Müdürlüğü tarafından düzenlenir. 4915 Sayılı Kara Avcılığı Kanunu\'na göre ruhsatsız avlanmak yasaktır.',
  },
  {
    id: 5, category: 'Balık', icon: '🐟',
    q: 'Levrek balığını diğer deniz balıklarından ayıran en belirgin özellik nedir?',
    options: ['Mavi rengi', 'İki sıra pulları', 'Yan çizgisi ve dikenli sırt yüzgeci', 'Dört kuyruğu'],
    answer: 2,
    explain: 'Levrek (Dicentrarchus labrax), belirgin yan çizgisi ve ön kısımda dikenli, arka kısımda yumuşak iki ayrı sırt yüzgeci ile kolayca tanınır.',
  },
  {
    id: 6, category: 'Hava', icon: '🌤️',
    q: 'Barometrik basıncın düşmesi balıkçılık için ne anlama gelir?',
    options: ['Mükemmel hava', 'Balıklar daha aktif olur', 'Fırtına yaklaşıyor, balıklar dibe çekilir', 'Hiçbir fark yaratmaz'],
    answer: 2,
    explain: 'Alçak basınç fırtına habercisidir. Balıklar basınç değişimini iç kulağındaki swim bladder ile hisseder ve güvenli derinliklere çekilir.',
  },
  {
    id: 7, category: 'Bitki', icon: '🌿',
    q: 'Yabani çilek ile yabani böğürtlenin farkı nedir?',
    options: ['Renk aynı', 'Çilek yerde sürünür, böğürtlen dik büyür', 'İkisi de aynı', 'Yaprak sayısı'],
    answer: 1,
    explain: 'Yabani çilek (Fragaria vesca) yerde yayılarak büyüyen stolon adlı uzantılar çıkarır. Böğürtlen (Rubus) ise dik veya eğimli, dikenli gövdeli bir çalıdır.',
  },
  {
    id: 8, category: 'Kuş', icon: '🦅',
    q: 'Baykuşların gözleri neden bu kadar büyüktür?',
    options: ['Gündüz avlanmak için', 'Düşman korkutmak için', 'Az ışıkta görüş için', 'Dekorasyon'],
    answer: 2,
    explain: 'Baykuşlar gece aktiftir. Büyük gözleri daha fazla ışık toplamasını sağlar. Ayrıca başlarını 270° çevirebilirler, çünkü gözleri kafadan hareket edemez.',
  },
  {
    id: 9, category: 'Balık', icon: '🐟',
    q: 'Hangi yem türü en çok palamut avlamak için kullanılır?',
    options: ['Feeder pellet', 'Metal jig ve kaşık', 'Silikon solucan', 'Tatlı su kurdu'],
    answer: 1,
    explain: 'Palamut hızlı yüzücü bir av balığıdır. Gümüş rengi parlak metal jig ve kaşık, su içindeki yansıması ile palamutun doğal avını taklit eder.',
  },
  {
    id: 10, category: 'Av', icon: '🏹',
    q: 'Keklik avında en etkili saat aralığı hangisidir?',
    options: ['Öğleden sonra 13-15', 'Sabah 07-10 ve akşam 16-19', 'Gece yarısı', 'Öğle 11-13'],
    answer: 1,
    explain: 'Keklikler gündüzün beslendiği için sabah erken ve akşam üzeri en aktif dönemlerdir. Öğle sıcağında gölgeye çekilirler ve avlanmak güçleşir.',
  },
];

const CATEGORY_COLORS = {
  Balık: '#06b6d4', Kuş: '#a855f7', Bitki: '#22c55e', Av: '#f59e0b', Hava: '#3b82f6',
};

function ProgressBar({ current, total }) {
  return (
    <div style={{ background: '#374151', borderRadius: 8, height: 6, overflow: 'hidden', margin: '0 16px 16px' }}>
      <div style={{ width: `${(current / total) * 100}%`, height: '100%', background: '#22c55e', borderRadius: 8, transition: 'width 0.4s' }} />
    </div>
  );
}

export default function NatureQuiz() {
  const navigate = useNavigate();
  const [idx, setIdx]           = useState(0);
  const [chosen, setChosen]     = useState(null);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);
  const [history, setHistory]   = useState([]);

  const q = QUESTIONS[idx];
  const catColor = CATEGORY_COLORS[q?.category] || '#6b7280';

  const pick = useCallback((optIdx) => {
    if (chosen !== null) return;
    setChosen(optIdx);
    const correct = optIdx === q.answer;
    if (correct) setScore(s => s + 1);
    setHistory(h => [...h, { q: q.q, chosen: optIdx, correct, answer: q.answer }]);
  }, [chosen, q]);

  const next = useCallback(() => {
    if (idx + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setIdx(i => i + 1);
      setChosen(null);
    }
  }, [idx]);

  const reset = () => {
    setIdx(0); setChosen(null); setScore(0); setFinished(false); setHistory([]);
  };

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    const medal = pct >= 90 ? '🥇' : pct >= 70 ? '🥈' : pct >= 50 ? '🥉' : '📚';
    const msg   = pct >= 90 ? 'Mükemmel! Gerçek bir doğa uzmanısınız!' : pct >= 70 ? 'Çok iyi! Doğayı iyi tanıyorsunuz.' : pct >= 50 ? 'Fena değil, biraz daha öğrenin!' : 'Alıştırmak gerek — doğa rehberlerini inceleyin.';

    return (
      <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>{medal}</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#f9fafb', marginBottom: 8 }}>{score}/{QUESTIONS.length}</div>
        <div style={{ fontSize: 16, color: '#9ca3af', textAlign: 'center', marginBottom: 8 }}>%{pct} başarı</div>
        <div style={{ fontSize: 14, color: '#d1d5db', textAlign: 'center', marginBottom: 32, lineHeight: 1.7, maxWidth: 300 }}>{msg}</div>

        {/* Category breakdown */}
        <div style={{ width: '100%', maxWidth: 360, background: '#1f2937', borderRadius: 16, padding: 16, marginBottom: 24, border: '1px solid #374151' }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 12 }}>SONUÇ DETAYI</div>
          {history.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < history.length - 1 ? '1px solid #374151' : 'none' }}>
              <span style={{ fontSize: 18 }}>{h.correct ? '✅' : '❌'}</span>
              <div style={{ flex: 1, fontSize: 12, color: '#9ca3af', lineHeight: 1.4 }}>{h.q.slice(0, 50)}…</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={reset} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            🔄 Tekrar Oyna
          </button>
          <button onClick={() => navigate(-1)} style={{ background: '#374151', color: '#9ca3af', border: 'none', borderRadius: 12, padding: '14px 28px', fontSize: 15, cursor: 'pointer' }}>
            ← Geri
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 40 }}>
      <div style={{ padding: '20px 16px 8px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>🧠 Doğa Testi</div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Bilgini ölç!</div>
          </div>
          <div style={{ background: '#1f2937', borderRadius: 12, padding: '8px 14px', border: '1px solid #374151', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#6b7280' }}>Skor</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#22c55e' }}>{score}</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ padding: '12px 16px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6b7280', marginBottom: 6 }}>
          <span>Soru {idx + 1}/{QUESTIONS.length}</span>
          <span style={{ color: catColor, fontWeight: 600 }}>{q.icon} {q.category}</span>
        </div>
        <ProgressBar current={idx + 1} total={QUESTIONS.length} />
      </div>

      {/* Question card */}
      <div style={{ margin: '8px 16px 20px', background: '#1f2937', borderRadius: 18, padding: 20, border: `1px solid ${catColor}44` }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb', lineHeight: 1.6 }}>{q.q}</div>
      </div>

      {/* Options */}
      <div style={{ padding: '0 16px' }}>
        {q.options.map((opt, i) => {
          let bg = '#1f2937', border = '#374151', color = '#f9fafb';
          if (chosen !== null) {
            if (i === q.answer) { bg = '#14532d'; border = '#22c55e'; color = '#86efac'; }
            else if (i === chosen && i !== q.answer) { bg = '#450a0a'; border = '#f87171'; color = '#fca5a5'; }
          } else if (chosen === i) {
            bg = '#1e3a5f'; border = '#3b82f6';
          }
          return (
            <button key={i} onClick={() => pick(i)} style={{
              width: '100%', background: bg, border: `2px solid ${border}`, color,
              borderRadius: 14, padding: '14px 16px', fontSize: 14, fontWeight: 600,
              textAlign: 'left', cursor: chosen === null ? 'pointer' : 'default',
              marginBottom: 10, transition: 'all 0.2s',
            }}>
              <span style={{ marginRight: 10, fontSize: 16 }}>{['A', 'B', 'C', 'D'][i]}</span>
              {opt}
              {chosen !== null && i === q.answer && <span style={{ float: 'right' }}>✅</span>}
              {chosen !== null && i === chosen && i !== q.answer && <span style={{ float: 'right' }}>❌</span>}
            </button>
          );
        })}
      </div>

      {/* Explanation + next */}
      {chosen !== null && (
        <div style={{ padding: '0 16px' }}>
          <div style={{ background: '#1e3a5f', borderRadius: 14, padding: '14px 16px', border: '1px solid #3b82f644', marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 600, marginBottom: 6 }}>💡 AÇIKLAMA</div>
            <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.7 }}>{q.explain}</div>
          </div>
          <button onClick={next} style={{
            width: '100%', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 14,
            padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
          }}>
            {idx + 1 < QUESTIONS.length ? 'Sonraki Soru →' : '🏆 Sonuçları Gör'}
          </button>
        </div>
      )}
    </div>
  );
}
