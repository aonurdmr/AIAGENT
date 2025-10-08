import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = ({ agents }) => {
  const [sessions, setSessions] = useState([]);
  const [activeAgent, setActiveAgent] = useState(null);
  const [showImageGen, setShowImageGen] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const heroImages = [
    "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f",
    "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf",
    "https://images.unsplash.com/photo-1674027444485-cec3da58eef4",
    "https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d"
  ];

  const agentIcons = {
    research: "fa-search",
    design: "fa-palette",
    content: "fa-pen-nib", 
    code: "fa-code",
    planner: "fa-calendar-alt",
    publisher: "fa-share-alt",
    report: "fa-chart-line",
    memory: "fa-brain",
    cost: "fa-coins",
    growth: "fa-rocket",
    safety: "fa-shield-alt"
  };

  const agentColors = {
    research: "from-blue-500/20 to-cyan-500/20",
    design: "from-purple-500/20 to-pink-500/20",
    content: "from-green-500/20 to-emerald-500/20",
    code: "from-orange-500/20 to-red-500/20",
    planner: "from-indigo-500/20 to-blue-500/20",
    publisher: "from-pink-500/20 to-rose-500/20",
    report: "from-yellow-500/20 to-amber-500/20",
    memory: "from-violet-500/20 to-purple-500/20",
    cost: "from-emerald-500/20 to-teal-500/20",
    growth: "from-cyan-500/20 to-blue-500/20",
    safety: "from-red-500/20 to-orange-500/20"
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(`${API}/sessions`);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const createNewSession = async (agentType) => {
    try {
      const response = await axios.post(`${API}/sessions`, {
        name: `${agents[agentType]?.name} - ${new Date().toLocaleString('tr-TR')}`,
        agent_type: agentType
      });
      
      setSessions(prev => [response.data, ...prev]);
      setActiveAgent(null);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      await axios.delete(`${API}/sessions/${sessionId}`);
      setSessions(prev => prev.filter(s => s.id !== sessionId));
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const generateImage = async () => {
    if (!imagePrompt.trim()) return;
    
    setIsGeneratingImage(true);
    try {
      const response = await axios.post(`${API}/generate-image`, {
        prompt: imagePrompt
      });
      
      setGeneratedImage(response.data.image_base64);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Görsel üretiminde hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="hero-gradient min-h-screen relative overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-2 h-full opacity-10">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className="bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>
        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 z-1">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20">
          {/* Header */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-3 mb-6 glass-card px-6 py-3">
              <i className="fas fa-brain text-emerald-400 text-xl"></i>
              <span className="text-emerald-400 font-medium">Meta AI Orchestrator</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Süper Kontrol
              <br />
              Yapay Zeka Sistemi
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Tüm yapay zeka araçlarını tek çatı altında yöneten, kendini çoğaltan ve paralel görevler yürüten gelişmiş meta-ajan platformu
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={() => setShowImageGen(!showImageGen)}
                className="ai-button px-6 py-3 rounded-full flex items-center gap-2"
                data-testid="quick-image-gen-btn"
              >
                <i className="fas fa-image"></i>
                Hızlı Görsel Üret
              </button>
              <button 
                onClick={() => document.getElementById('agents-section').scrollIntoView({ behavior: 'smooth' })}
                className="glass-button px-6 py-3 rounded-full flex items-center gap-2 text-emerald-400"
                data-testid="explore-agents-btn"
              >
                <i className="fas fa-robot"></i>
                Ajanları Keşfet
              </button>
            </div>

            {/* Quick Image Generation */}
            {showImageGen && (
              <div className="glass-card max-w-md mx-auto p-6 mb-8 fade-in-scale" data-testid="image-generation-panel">
                <h3 className="text-lg font-semibold mb-4 text-emerald-400">Hızlı Görsel Üretimi</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Görsel açıklaması girin..."
                    className="ai-input w-full px-4 py-3"
                    data-testid="image-prompt-input"
                  />
                  <button
                    onClick={generateImage}
                    disabled={isGeneratingImage || !imagePrompt.trim()}
                    className="ai-button w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="generate-image-btn"
                  >
                    {isGeneratingImage ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Görsel Üretiliyor...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-magic"></i>
                        Görsel Üret
                      </>
                    )}
                  </button>
                  {generatedImage && (
                    <div className="mt-4" data-testid="generated-image-container">
                      <img 
                        src={`data:image/png;base64,${generatedImage}`}
                        alt="Generated"
                        className="w-full rounded-lg border border-emerald-400/30"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Agents Grid */}
          <div id="agents-section" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-400 fade-in-up">
              <i className="fas fa-users-cog mr-3"></i>
              Uzman Ajan Ekibi
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Object.entries(agents).map(([key, agent], index) => (
                <div
                  key={key}
                  className={`agent-card p-6 cursor-pointer group fade-in-up bg-gradient-to-br ${agentColors[key]} relative overflow-hidden`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setActiveAgent(key)}
                  data-testid={`agent-card-${key}`}
                >
                  {/* Agent Icon */}
                  <div className="text-center mb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${agentColors[key]} border border-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-300`}>
                      <i className={`fas ${agentIcons[key]} text-2xl text-emerald-400`}></i>
                    </div>
                  </div>

                  {/* Agent Info */}
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2 text-center">
                    {agent.name}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4 text-center">
                    {agent.role}
                  </p>

                  {/* Capabilities */}
                  <div className="space-y-2">
                    {agent.capabilities.slice(0, 2).map((capability, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                        {capability}
                      </div>
                    ))}
                    {agent.capabilities.length > 2 && (
                      <div className="text-xs text-emerald-400">
                        +{agent.capabilities.length - 2} daha fazla yetenek
                      </div>
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <i className="fas fa-arrow-right text-emerald-400 text-xl mb-2"></i>
                      <p className="text-emerald-400 font-medium">Sohbet Başlat</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions */}
          {sessions.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 text-emerald-400 fade-in-up">
                <i className="fas fa-history mr-3"></i>
                Son Sohbetler
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.slice(0, 6).map((session) => (
                  <div key={session.id} className="glass-card p-6 group hover:border-emerald-400/30 transition-all duration-300" data-testid={`session-card-${session.id}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <i className={`fas ${agentIcons[session.agent_type]} text-emerald-400`}></i>
                        <h3 className="font-medium text-emerald-400">
                          {agents[session.agent_type]?.name}
                        </h3>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        data-testid={`delete-session-${session.id}`}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-4">
                      {new Date(session.created_at).toLocaleString('tr-TR')}
                    </p>
                    
                    <Link
                      to={`/agent/${session.agent_type}?session=${session.id}`}
                      className="ai-button w-full py-2 text-center block rounded-lg"
                      data-testid={`continue-session-${session.id}`}
                    >
                      Sohbeti Devam Ettir
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Agent Modal */}
      {activeAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setActiveAgent(null)}>
          <div className="glass-card max-w-md w-full p-8" onClick={(e) => e.stopPropagation()} data-testid={`agent-modal-${activeAgent}`}>
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${agentColors[activeAgent]} border border-emerald-400/30 mb-4`}>
                <i className={`fas ${agentIcons[activeAgent]} text-3xl text-emerald-400`}></i>
              </div>
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">
                {agents[activeAgent]?.name}
              </h2>
              <p className="text-slate-300">
                {agents[activeAgent]?.role}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-emerald-400">Yetenekler:</h3>
              {agents[activeAgent]?.capabilities.map((capability, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  {capability}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setActiveAgent(null)}
                className="flex-1 glass-button py-3 rounded-lg text-slate-300"
                data-testid="close-modal-btn"
              >
                Kapat
              </button>
              <Link
                to={`/agent/${activeAgent}`}
                className="flex-1 ai-button py-3 rounded-lg text-center"
                onClick={() => createNewSession(activeAgent)}
                data-testid={`start-chat-${activeAgent}`}
              >
                Sohbet Başlat
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;