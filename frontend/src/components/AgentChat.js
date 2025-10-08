import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AgentChat = ({ agents }) => {
  const { agentType } = useParams();
  const [searchParams] = useSearchParams();
  const existingSessionId = searchParams.get('session');

  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(existingSessionId);
  const [sessionName, setSessionName] = useState('');
  const messagesEndRef = useRef(null);

  const agent = agents[agentType];

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
    if (!sessionId) {
      createNewSession();
    } else {
      loadMessages();
    }
  }, [agentType, sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createNewSession = async () => {
    try {
      const response = await axios.post(`${API}/sessions`, {
        name: `${agent?.name} - ${new Date().toLocaleString('tr-TR')}`,
        agent_type: agentType
      });
      
      setSessionId(response.data.id);
      setSessionName(response.data.name);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const loadMessages = async () => {
    if (!sessionId) return;
    
    try {
      const response = await axios.get(`${API}/chat/${sessionId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim() || isLoading || !sessionId) return;

    const userMessage = {
      role: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        session_id: sessionId,
        agent_type: agentType,
        content: currentMessage
      });

      setMessages(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-red-400 text-4xl mb-4"></i>
          <p className="text-slate-300 text-lg">Agent bulunamadı</p>
          <Link to="/" className="ai-button px-6 py-3 mt-4 inline-block rounded-lg">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="glass-card border-b border-slate-700/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="glass-button p-2 rounded-lg hover:bg-slate-700/50 transition-all"
                data-testid="back-to-dashboard-btn"
              >
                <i className="fas fa-arrow-left text-emerald-400"></i>
              </Link>
              
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${agentColors[agentType]} border border-emerald-400/30 flex items-center justify-center`}>
                  <i className={`fas ${agentIcons[agentType]} text-emerald-400`}></i>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-emerald-400" data-testid="agent-title">
                    {agent.name}
                  </h1>
                  <p className="text-sm text-slate-400">{agent.role}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">
                {messages.length} mesaj
              </span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-400">Aktif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="chat-container rounded-2xl border border-slate-700/50 min-h-[calc(100vh-200px)] flex flex-col">
          
          {/* Agent Info Banner */}
          {messages.length === 0 && (
            <div className="p-8 text-center border-b border-slate-700/50" data-testid="agent-welcome-banner">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${agentColors[agentType]} border border-emerald-400/30 flex items-center justify-center mx-auto mb-4`}>
                <i className={`fas ${agentIcons[agentType]} text-3xl text-emerald-400`}></i>
              </div>
              
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">
                {agent.name} ile Sohbet
              </h2>
              <p className="text-slate-300 mb-6">
                {agent.role} olarak size nasıl yardımcı olabilirim?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {agent.capabilities.map((capability, idx) => (
                  <div key={idx} className="glass-card p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-slate-300 text-sm">{capability}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6" data-testid="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} fade-in-up`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`max-w-[80%] ${message.role === 'user' ? 'message-bubble user' : 'message-bubble assistant'} p-4`}>
                  
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${agentColors[agentType]} border border-emerald-400/30 flex items-center justify-center`}>
                        <i className={`fas ${agentIcons[agentType]} text-xs text-emerald-400`}></i>
                      </div>
                      <span className="text-xs text-emerald-400 font-medium">{agent.name}</span>
                    </div>
                  )}

                  <div className={`whitespace-pre-wrap ${message.role === 'user' ? 'text-emerald-100' : 'text-slate-200'}`}>
                    {message.content}
                  </div>

                  <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-emerald-400/60' : 'text-slate-500'}`}>
                    {new Date(message.timestamp).toLocaleTimeString('tr-TR')}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="message-bubble assistant p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${agentColors[agentType]} border border-emerald-400/30 flex items-center justify-center`}>
                      <i className={`fas ${agentIcons[agentType]} text-xs text-emerald-400`}></i>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium">{agent.name}</span>
                  </div>
                  <div className="typing-indicator" data-testid="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <span className="text-slate-400 ml-2 text-sm">Düşünüyor...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-slate-700/50 p-6">
            <form onSubmit={sendMessage} className="flex gap-4" data-testid="chat-form">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder={`${agent.name} ile sohbet edin...`}
                className="ai-input flex-1 px-4 py-3"
                disabled={isLoading}
                data-testid="message-input"
              />
              <button
                type="submit"
                disabled={!currentMessage.trim() || isLoading}
                className="ai-button px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                data-testid="send-message-btn"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-paper-plane"></i>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center mt-4 text-xs text-slate-500">
              <i className="fas fa-shield-alt mr-1"></i>
              Tüm sohbetler güvenli bir şekilde şifrelenir ve saklanır
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentChat;