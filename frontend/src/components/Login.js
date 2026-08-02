import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, register, loading, error, clearError, isAuth } = useAuth();

  const [mode, setMode]         = useState('login'); // 'login' | 'register'
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPw, setShowPw]     = useState(false);

  useEffect(() => { if (isAuth) navigate('/'); }, [isAuth, navigate]);
  useEffect(() => { clearError(); }, [mode, clearError]);

  const submit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      await login(email, password);
    } else {
      await register(username, email, password, fullName);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-15%', left: '50%',
        transform: 'translateX(-50%)',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,.12), transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 36, position: 'relative' }}>
        <div style={{
          width: 72, height: 72, borderRadius: 20, margin: '0 auto 14px',
          background: 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 34,
          boxShadow: '0 6px 28px rgba(34,197,94,.4), 0 1px 0 rgba(255,255,255,.15) inset',
        }}>🎣</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-.03em', marginBottom: 4 }}>
          DoğaAI
        </h1>
        <p style={{ fontSize: 13, color: 'var(--a-light)', opacity: .75 }}>
          Akıllı Outdoor Platformu
        </p>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 390,
        background: 'rgba(13,31,13,.8)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid var(--border-md)',
        borderRadius: 24,
        padding: 28,
        boxShadow: '0 24px 64px rgba(0,0,0,.6)',
        position: 'relative',
      }}>
        {/* Mode switch */}
        <div style={{
          display: 'flex', background: 'var(--s1)',
          borderRadius: 12, padding: 4, marginBottom: 24,
          border: '1px solid var(--border)',
        }}>
          {[['login', 'Giriş Yap'], ['register', 'Kayıt Ol']].map(([id, lb]) => (
            <button key={id} onClick={() => setMode(id)} style={{
              flex: 1, padding: '9px 0', borderRadius: 9,
              border: 'none', cursor: 'pointer',
              background: mode === id
                ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                : 'transparent',
              color: mode === id ? '#fff' : 'var(--t-mute)',
              fontSize: 13, fontWeight: 700,
              transition: 'all .2s',
              boxShadow: mode === id ? '0 2px 8px rgba(34,197,94,.3)' : 'none',
            }}>{lb}</button>
          ))}
        </div>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.07em', display: 'block', marginBottom: 5 }}>
                  KULLANICI ADI *
                </label>
                <input
                  type="text" required minLength={3}
                  placeholder="outdoorsever42"
                  className="input-field"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.07em', display: 'block', marginBottom: 5 }}>
                  AD SOYAD
                </label>
                <input
                  type="text"
                  placeholder="Ahmet Yılmaz"
                  className="input-field"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
              </div>
            </>
          )}

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.07em', display: 'block', marginBottom: 5 }}>
              E-POSTA *
            </label>
            <input
              type="email" required
              placeholder="ornek@email.com"
              className="input-field"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.07em', display: 'block', marginBottom: 5 }}>
              ŞİFRE *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'} required minLength={6}
                placeholder={mode === 'register' ? 'En az 6 karakter' : '••••••••'}
                className="input-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingRight: 44 }}
              />
              <button type="button" onClick={() => setShowPw(p => !p)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 16, color: 'var(--t-mute)',
              }}>{showPw ? '🙈' : '👁️'}</button>
            </div>
          </div>

          {error && (
            <div style={{
              background: 'rgba(248,113,113,.1)', border: '1px solid rgba(248,113,113,.25)',
              borderRadius: 10, padding: '10px 14px', marginBottom: 14,
              fontSize: 13, color: '#fca5a5', display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading
              ? <><div className="spinner" style={{ width: 18, height: 18 }} /> Lütfen bekleyin…</>
              : mode === 'login' ? '🔑 Giriş Yap' : '🚀 Hesap Oluştur'
            }
          </button>
        </form>

        {/* Guest continue */}
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <button onClick={() => navigate('/')} style={{
            background: 'none', border: 'none',
            color: 'var(--t-mute)', fontSize: 12, cursor: 'pointer',
          }}>
            Misafir olarak devam et →
          </button>
        </div>
      </div>

      {/* Features list */}
      <div style={{ marginTop: 28, display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        {['🔍 AI Tür Tanımlama', '🗺️ Nokta Haritası', '🤖 Outdoor Asistan'].map(f => (
          <span key={f} style={{ fontSize: 12, color: 'var(--t-mute)' }}>{f}</span>
        ))}
      </div>
    </div>
  );
}
