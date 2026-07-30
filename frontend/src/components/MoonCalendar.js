import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const SCORE_COLOR = s => s >= 9 ? '#fbbf24' : s >= 7 ? '#22c55e' : s >= 5 ? '#38bdf8' : '#94a3b8';
const SCORE_LABEL = s => s >= 9 ? 'Mükemmel' : s >= 7 ? 'İyi' : s >= 5 ? 'Orta' : 'Düşük';

const TR_MONTHS = [
  'Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
  'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'
];

function ScoreArc({ score }) {
  const pct = (score / 10) * 100;
  const color = SCORE_COLOR(score);
  const r = 28, cx = 32, cy = 32;
  const circ = 2 * Math.PI * r;
  const dashArr = `${(pct / 100) * circ} ${circ}`;
  return (
    <svg width={64} height={64}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--s3)" strokeWidth={5} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={dashArr} strokeDashoffset={circ / 4}
        strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
      <text x={cx} y={cy - 3} textAnchor="middle" fill={color} fontSize={14} fontWeight={800}>{score}</text>
      <text x={cx} y={cy + 11} textAnchor="middle" fill="var(--t-mute)" fontSize={8}>/10</text>
    </svg>
  );
}

export default function MoonCalendar() {
  const now = new Date();
  const [year,  setYear]  = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [data,  setData]  = useState(null);
  const [sel,   setSel]   = useState(null);

  useEffect(() => {
    axios.get(`${API}/moon?year=${year}&month=${month}`)
      .then(r => { setData(r.data); setSel(null); })
      .catch(() => {});
  }, [year, month]);

  const prevMonth = () => { if (month === 1) { setYear(y=>y-1); setMonth(12); } else setMonth(m=>m-1); };
  const nextMonth = () => { if (month === 12) { setYear(y=>y+1); setMonth(1); } else setMonth(m=>m+1); };

  const selectedDay = data?.days?.find(d => d.day === sel);

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #050010 0%, #100020 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🌕 Ay Takvimi</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Ay fazlarına göre balıkçılık aktivite skoru</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Month nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <button onClick={prevMonth} className="btn-ghost" style={{ padding: '6px 14px', fontSize: 18 }}>‹</button>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>{TR_MONTHS[month-1]} {year}</div>
          <button onClick={nextMonth} className="btn-ghost" style={{ padding: '6px 14px', fontSize: 18 }}>›</button>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
          {[['#fbbf24','Mükemmel (9-10)'],['#22c55e','İyi (7-8)'],['#38bdf8','Orta (5-6)'],['#94a3b8','Düşük (<5)']].map(([c,l])=>(
            <div key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:'var(--t-mute)' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:c }} />
              {l}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        {!data ? (
          <div style={{ display:'flex', justifyContent:'center', padding:60 }}>
            <div className="spinner" />
          </div>
        ) : (
          <>
            {/* Weekday headers */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3, marginBottom:4 }}>
              {['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'].map(d=>(
                <div key={d} style={{ textAlign:'center', fontSize:9, color:'var(--t-mute)', fontWeight:700, letterSpacing:'.05em' }}>{d}</div>
              ))}
            </div>

            {/* Day grid — offset by weekday of first day */}
            {(() => {
              const firstDay = new Date(year, month-1, 1).getDay();
              const offset = firstDay === 0 ? 6 : firstDay - 1; // Mon-first
              const cells = [...Array(offset).fill(null), ...data.days];
              const rows = [];
              for (let i=0; i<cells.length; i+=7) rows.push(cells.slice(i,i+7));
              return rows.map((row, ri) => (
                <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3, marginBottom:3 }}>
                  {row.map((day, ci) => day ? (
                    <button key={ci} onClick={() => setSel(day.day === sel ? null : day.day)} style={{
                      padding:'6px 2px', borderRadius:10, cursor:'pointer', textAlign:'center',
                      background: sel===day.day ? SCORE_COLOR(day.score)+'25' : data.today===day.day ? 'var(--a-glow)' : 'var(--s2)',
                      border: sel===day.day ? `1px solid ${SCORE_COLOR(day.score)}60` : data.today===day.day ? '1px solid var(--border-lg)' : '1px solid var(--border)',
                    }}>
                      <div style={{ fontSize:18, lineHeight:1 }}>{day.icon}</div>
                      <div style={{ fontSize:11, fontWeight:700, color:data.today===day.day?'var(--a-light)':'#fff', marginTop:1 }}>{day.day}</div>
                      <div style={{ width:'100%', height:3, borderRadius:2, background: SCORE_COLOR(day.score)+'40', marginTop:2, overflow:'hidden' }}>
                        <div style={{ width:`${day.score*10}%`, height:'100%', background: SCORE_COLOR(day.score) }} />
                      </div>
                    </button>
                  ) : <div key={ci} />)}
                </div>
              ));
            })()}

            {/* Selected day detail */}
            {selectedDay && (
              <div className="fade-in" style={{
                background: SCORE_COLOR(selectedDay.score)+'10',
                border: `1px solid ${SCORE_COLOR(selectedDay.score)}35`,
                borderRadius: 18, padding: 20, marginTop: 14, marginBottom: 14,
              }}>
                <div style={{ display:'flex', alignItems:'center', gap: 16 }}>
                  <div style={{ fontSize: 52 }}>{selectedDay.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, fontSize:16, color:'#fff', marginBottom:2 }}>
                      {TR_MONTHS[month-1]} {selectedDay.day}
                    </div>
                    <div style={{ fontSize:13, color:'var(--t-mute)', marginBottom:6 }}>{selectedDay.name}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{
                        fontSize:11, fontWeight:700,
                        color: SCORE_COLOR(selectedDay.score),
                        background: SCORE_COLOR(selectedDay.score)+'20',
                        borderRadius:8, padding:'3px 10px',
                        border:`1px solid ${SCORE_COLOR(selectedDay.score)}40`,
                      }}>{SCORE_LABEL(selectedDay.score)}</span>
                    </div>
                  </div>
                  <ScoreArc score={selectedDay.score} />
                </div>
                <div style={{ marginTop:12, fontSize:12, color:'var(--t-mid)', lineHeight:1.6 }}>
                  {selectedDay.score >= 9 && '🎣 Dolunay yakını — gece avı için mükemmel! Balıklar aktif ve yüzeye yakın olacak.'}
                  {selectedDay.score >= 7 && selectedDay.score < 9 && '🎣 Dördün zamanı — sabah erken ve gün batımında çok iyi aktivite beklenir.'}
                  {selectedDay.score >= 5 && selectedDay.score < 7 && '🎣 Orta aktivite — sabah saatleri tercih edin, akşam ise daha sakin olabilir.'}
                  {selectedDay.score < 5 && '🎣 Düşük aktivite — sabır gerekebilir, yem çeşitliliği deneyin.'}
                  <br />Ay yaşı: {selectedDay.age} gün (29.5 günlük döngüde)
                </div>
              </div>
            )}

            {/* Today highlight */}
            {data.today && !selectedDay && (
              <div style={{
                background:'var(--s2)', border:'1px solid var(--border)',
                borderRadius:14, padding:'12px 16px', marginTop:14, marginBottom:14,
                display:'flex', alignItems:'center', gap:12,
              }}>
                <div style={{ fontSize:32 }}>{data.days[data.today-1]?.icon}</div>
                <div>
                  <div style={{ fontWeight:700, color:'#fff', fontSize:13 }}>Bugün — {data.days[data.today-1]?.name}</div>
                  <div style={{ fontSize:11, color:'var(--t-mute)' }}>
                    Balıkçılık skoru: <span style={{ color: SCORE_COLOR(data.days[data.today-1]?.score), fontWeight:700 }}>
                      {data.days[data.today-1]?.score}/10 — {SCORE_LABEL(data.days[data.today-1]?.score)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
