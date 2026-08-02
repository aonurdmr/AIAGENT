import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/Toast';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const CATEGORIES = [
  { id: 'all', label: 'Tümü', icon: '🌍' },
  { id: 'fishing', label: 'Balıkçılık', icon: '🎣' },
  { id: 'hunting', label: 'Avcılık', icon: '🏹' },
  { id: 'camping', label: 'Kamp', icon: '⛺' },
  { id: 'wildlife', label: 'Doğa', icon: '🦋' },
  { id: 'tips', label: 'İpuçları', icon: '💡' },
];

const CAT_TAGS = {
  fishing: { label: '🎣 Balıkçılık', cls: 'tag-blue' },
  hunting: { label: '🏹 Avcılık',   cls: 'tag-red' },
  camping: { label: '⛺ Kamp',       cls: 'tag-green' },
  wildlife:{ label: '🦋 Doğa',      cls: 'tag-amber' },
  tips:    { label: '💡 İpucu',     cls: 'tag-purple' },
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const diff = (Date.now() - d) / 1000;
  if (diff < 60) return 'az önce';
  if (diff < 3600) return `${Math.floor(diff / 60)}dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}sa önce`;
  return `${Math.floor(diff / 86400)}g önce`;
}

export default function Community() {
  const [posts, setPosts]         = useState([]);
  const [filter, setFilter]       = useState('all');
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [comment, setComment]     = useState('');
  const [favSet, setFavSet]       = useState(new Set());
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', content: '', category: 'fishing', location: '', username: 'Ben' });

  const loadPosts = async (cat = 'all') => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/posts?category=${cat}`);
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPosts(filter); }, [filter]);

  useEffect(() => {
    if (user) {
      axios.get(`${API}/favorites`).then(r => {
        const ids = new Set(r.data.filter(f => f.item_type === 'post').map(f => f.item_id));
        setFavSet(ids);
      }).catch(() => {});
    }
  }, [user]);

  const toggleFav = async (post) => {
    if (!user) { toast('Favorilere eklemek için giriş yapın', 'info'); return; }
    try {
      const { data } = await axios.post(`${API}/favorites`, {
        item_type: 'post', item_id: post.id, item_name: post.title,
      });
      setFavSet(prev => {
        const next = new Set(prev);
        if (data.favorited) { next.add(post.id); toast('Favorilere eklendi ⭐'); }
        else { next.delete(post.id); toast('Favorilerden çıkarıldı', 'info'); }
        return next;
      });
    } catch { toast('Hata oluştu', 'error'); }
  };

  const likePost = async (id) => {
    const uid = user?.id || 'local_user';
    const { data } = await axios.post(`${API}/posts/${id}/like`, null, { params: { user_id: uid } });
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: data.likes } : p));
  };

  const submitComment = async (postId) => {
    if (!comment.trim()) return;
    const uname = user?.username || 'Misafir';
    await axios.post(`${API}/posts/${postId}/comments`, { username: uname, content: comment });
    setComment(''); setCommentId(null);
    loadPosts(filter);
  };

  const submitPost = async () => {
    if (!form.title || !form.content) return;
    const uname = user?.username || form.username || 'Misafir';
    await axios.post(`${API}/posts`, { ...form, username: uname });
    setShowForm(false); setForm({ title: '', content: '', category: 'fishing', location: '', username: 'Ben' });
    loadPosts(filter);
  };

  return (
    <div className="page fade-in">
      <div className="page-header" style={{ paddingBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>👥 Topluluk</h1>
            <p>Outdoor deneyimlerini paylaş</p>
          </div>
          <button className="btn-primary" style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }}
            onClick={() => setShowForm(true)}>+ Paylaş</button>
        </div>
      </div>

      <div style={{ padding: '12px 16px' }}>
        <div className="filter-tabs" style={{ marginBottom: 14 }}>
          {CATEGORIES.map(c => (
            <button key={c.id} className={`filter-tab ${filter === c.id ? 'active' : ''}`}
              onClick={() => setFilter(c.id)}>{c.icon} {c.label}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <div className="spinner" />
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post-card" style={{ marginBottom: 12 }}>
              <div style={{ padding: 14 }}>
                {/* Header */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <div className="post-avatar" style={{ background: post.avatar_color }}>{post.username[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#e2e8f0' }}>@{post.username}</div>
                    <div style={{ fontSize: 11, color: '#4a6741' }}>
                      {post.location && `📍 ${post.location} · `}{timeAgo(post.created_at)}
                    </div>
                  </div>
                  {CAT_TAGS[post.category] && (
                    <span className={`tag ${CAT_TAGS[post.category].cls}`} style={{ fontSize: 11 }}>
                      {CAT_TAGS[post.category].label}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 6 }}>{post.title}</div>
                <div style={{ fontSize: 13, color: '#a0c4a0', lineHeight: 1.6, marginBottom: 10 }}>{post.content}</div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <button onClick={() => likePost(post.id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 13, color: '#4a6741', padding: 0,
                  }}>
                    <span>❤️</span> {post.likes}
                  </button>
                  <button onClick={() => setCommentId(commentId === post.id ? null : post.id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 13, color: '#4a6741', padding: 0,
                  }}>
                    <span>💬</span> {(post.comments || []).length}
                  </button>
                  <button onClick={() => toggleFav(post)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    marginLeft: 'auto', fontSize: 16,
                    color: favSet.has(post.id) ? '#fbbf24' : '#4a6741',
                    transition: 'color .2s',
                  }}>⭐</button>
                </div>
              </div>

              {/* Comments */}
              {commentId === post.id && (
                <div style={{ borderTop: '1px solid #22c55e11', padding: '10px 14px' }}>
                  {(post.comments || []).map(c => (
                    <div key={c.id} style={{ fontSize: 12, marginBottom: 6, display: 'flex', gap: 6 }}>
                      <span style={{ color: '#22c55e', fontWeight: 600 }}>@{c.username}</span>
                      <span style={{ color: '#86efac' }}>{c.content}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <input className="input-field" placeholder="Yorum yaz…" value={comment}
                      onChange={e => setComment(e.target.value)}
                      style={{ fontSize: 13, padding: '8px 12px' }} />
                    <button className="btn-primary" style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }}
                      onClick={() => submitComment(post.id)}>→</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* New post modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, background: '#000a', zIndex: 200,
          display: 'flex', alignItems: 'flex-end',
        }} onClick={() => setShowForm(false)}>
          <div style={{
            background: '#122212', borderRadius: '20px 20px 0 0',
            padding: 20, width: '100%', maxWidth: 430, margin: '0 auto',
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>📝 Yeni Paylaşım</h3>

            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: '#4a6741', display: 'block', marginBottom: 4 }}>Başlık *</label>
              <input className="input-field" placeholder="Başlık girin" value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: '#4a6741', display: 'block', marginBottom: 4 }}>İçerik *</label>
              <textarea className="input-field" placeholder="Deneyiminizi paylaşın…" value={form.content}
                onChange={e => setForm(p => ({ ...p, content: e.target.value }))} style={{ minHeight: 80 }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 12, color: '#4a6741', display: 'block', marginBottom: 4 }}>Kategori</label>
                <select className="input-field" value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#4a6741', display: 'block', marginBottom: 4 }}>Konum</label>
                <input className="input-field" placeholder="Konum" value={form.location}
                  onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
              </div>
            </div>
            <button className="btn-primary" onClick={submitPost}>Paylaş</button>
            <button className="btn-ghost" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}
              onClick={() => setShowForm(false)}>İptal</button>
          </div>
        </div>
      )}
    </div>
  );
}
