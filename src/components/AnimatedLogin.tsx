import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Lock, ShieldCheck, Mail, MapPin, Sparkles, User, RefreshCw, ChevronRight } from 'lucide-react';

interface AnimatedLoginProps {
  onLoginSuccess: (user: any, token: string) => void;
  themeMode: 'midnight' | 'swiss' | 'oceanic' | 'emerald';
  THEMES: any;
}

const GLOBAL_NODES = [
  { name: 'Tokyo', country: 'Japan', code: 'JP', x: 500, y: 105, emoji: '🇯🇵' },
  { name: 'London', country: 'United Kingdom', code: 'UK', x: 295, y: 80, emoji: '🇬🇧' },
  { name: 'New York', country: 'United States', code: 'US', x: 160, y: 100, emoji: '🇺🇸' },
  { name: 'Sydney', country: 'Australia', code: 'AU', x: 540, y: 240, emoji: '🇦🇺' },
  { name: 'Lagos', country: 'Nigeria', code: 'NG', x: 300, y: 175, emoji: '🇳🇬' },
  { name: 'Singapore', country: 'Singapore', code: 'SG', x: 460, y: 180, emoji: '🇸🇬' },
  { name: 'São Paulo', country: 'Brazil', code: 'BR', x: 235, y: 220, emoji: '🇧🇷' },
  { name: 'Cairo', country: 'Egypt', code: 'EG', x: 340, y: 130, emoji: '🇪🇬' },
  { name: 'Cape Town', country: 'South Africa', code: 'ZA', x: 325, y: 245, emoji: '🇿🇦' },
  { name: 'Kyiv', country: 'Ukraine', code: 'UA', x: 340, y: 85, emoji: '🇺🇦' },
  { name: 'Toronto', country: 'Canada', code: 'CA', x: 170, y: 85, emoji: '🇨🇦' },
  { name: 'Los Angeles', country: 'United States', code: 'US', x: 110, y: 115, emoji: '🇺🇸' },
];

const NODE_CONNECTIONS = [
  { from: 'London', to: 'New York' },
  { from: 'Tokyo', to: 'New York' },
  { from: 'Sydney', to: 'Tokyo' },
  { from: 'Lagos', to: 'London' },
  { from: 'Singapore', to: 'Sydney' },
  { from: 'São Paulo', to: 'New York' },
  { from: 'Cape Town', to: 'Lagos' },
  { from: 'Kyiv', to: 'London' },
];

const RECENT_SIGNS_PRESETS = [
  { name: 'sarah_dev', location: 'London', emoji: '🇬🇧', action: 'Uploaded Resume v3' },
  { name: 'kenji_tech', location: 'Tokyo', emoji: '🇯🇵', action: 'Optimized ATS layout' },
  { name: 'alex_ca', location: 'Toronto', emoji: '🇨🇦', action: 'Generated Gemini summary' },
  { name: 'amara_c', location: 'Lagos', emoji: '🇳🇬', action: 'Matched with PM criteria' },
  { name: 'carlos_b', location: 'São Paulo', emoji: '🇧🇷', action: 'Restored SQLite state' },
  { name: 'elena_s', location: 'Sydney', emoji: '🇦🇺', action: 'Parsed Software_Engineer.pdf' },
];

export default function AnimatedLogin({ onLoginSuccess, themeMode, THEMES }: AnimatedLoginProps) {
  const t = THEMES[themeMode];
  const [isRegister, setIsRegister] = useState(false);
  
  // Forms inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('New York');
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Real-time map animations
  const [activeNodes, setActiveNodes] = useState<string[]>(['London', 'Tokyo', 'New York']);
  const [liveActivityFeed, setLiveActivityFeed] = useState<any[]>(RECENT_SIGNS_PRESETS);

  // Rotate flashing nodes
  useEffect(() => {
    const nodeInterval = setInterval(() => {
      const idx1 = Math.floor(Math.random() * GLOBAL_NODES.length);
      const idx2 = Math.floor(Math.random() * GLOBAL_NODES.length);
      setActiveNodes([GLOBAL_NODES[idx1].name, GLOBAL_NODES[idx2].name]);
    }, 4000);

    // Roll some live logs simulating global traffic
    const logInterval = setInterval(() => {
      const randomNode = GLOBAL_NODES[Math.floor(Math.random() * GLOBAL_NODES.length)];
      const names = ['dev_master', 'cloud_architect', 'resume_runner', 'pixel_pioneer', 'sys_root', 'code_ninja', 'tech_nomad', 'ats_champion'];
      const actions = ['Analyzed PM CV', 'Injected keywords', 'Created clean slate', 'Optimized resume metrics', 'Bypassed scanner limits'];
      const currentName = names[Math.floor(Math.random() * names.length)];
      const currentAction = actions[Math.floor(Math.random() * actions.length)];
      
      const newLog = {
        name: currentName,
        location: randomNode.name,
        emoji: randomNode.emoji,
        action: currentAction,
      };

      setLiveActivityFeed(prev => [newLog, ...prev.slice(0, 5)]);
    }, 5000);

    return () => {
      clearInterval(nodeInterval);
      clearInterval(logInterval);
    };
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMsg('');

    if (!email || !password || (isRegister && !name)) {
      setErrorMessage('Please fill in all criteria inputs securely.');
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        // 1. Submit Registration
        const registerResponse = await fetch('/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name })
        });
        
        const registerResult = await registerResponse.json();
        
        if (!registerResponse.ok || !registerResult.success) {
          setErrorMessage(registerResult.message || 'Registration failure. Try alternative credentials.');
          setLoading(false);
          return;
        }

        setSuccessMsg('Global Node Registered! Connecting server tunnel...');
      }

      // 2. Submit Login
      const loginResponse = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const loginResult = await loginResponse.json();

      if (!loginResponse.ok || !loginResult.success) {
        setErrorMessage(loginResult.message || 'Authentication rejected. Verify lock states.');
        setLoading(false);
        return;
      }

      // Include selected location for visualization sync state
      const userData = {
        ...loginResult.data.user,
        location: location
      };

      // Add a dynamic sign-in animation trigger in our map
      setActiveNodes(prev => [...prev, location]);
      
      // Flash success state shortly
      setTimeout(() => {
        onLoginSuccess(userData, loginResult.data.accessToken);
        setLoading(false);
      }, 1000);

    } catch (err: any) {
      setErrorMessage('Security core is unreachable. Verify proxy tunnel health.');
      setLoading(false);
    }
  };

  const handleGuestBypass = () => {
    setLoading(true);
    // Simulating quick direct access with guest token
    const randomCity = GLOBAL_NODES[Math.floor(Math.random() * GLOBAL_NODES.length)];
    const guestUser = {
      userId: 'user_guest_' + Math.random().toString(36).substring(2, 6),
      name: 'Sandbox Agent',
      email: 'guest@aistudio.dev',
      role: 'user',
      quotaCredits: 50,
      location: randomCity.name
    };

    setTimeout(() => {
      onLoginSuccess(guestUser, 'token_ac_user_default_test');
      setLoading(false);
    }, 850);
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col md:flex-row h-screen w-full transition-colors duration-300 font-sans ${t.appClass} overflow-hidden`}>
      
      {/* LEFT PANEL: WORLD MATRIX GRAPH */}
      <div className="flex-grow md:w-3/5 relative flex flex-col justify-between p-6 md:p-12 border-b md:border-b-0 md:border-r border-[#1D2D44]/30 bg-[#060A13]/90 select-none">
        
        {/* UPPER CAPTION */}
        <div className="z-10">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-sm shrink-0 flex items-center justify-center border bg-[#10F3DC]/5 border-[#10F3DC]/30`}>
              <Globe className="w-5 h-5 text-[#10F3DC] animate-spin" style={{ animationDuration: '40s' }} />
            </div>
            <div>
              <h2 className="text-sm font-mono uppercase tracking-widest font-bold text-[#10F3DC]">SYSTEM SYNCHRONIZATION</h2>
              <p className="text-[10px] text-zinc-400 font-mono tracking-tighter leading-none mt-0.5">SaaS Node Terminal US-EAST</p>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-4 sm:max-w-md">
            Connecting professionals worldwide for instant ATS intelligence.
          </h1>
        </div>

        {/* GLOWING INTERACTIVE NETWORK VECTOR MAP */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 sm:opacity-85 z-0">
          <svg className="w-full max-w-[640px] aspect-[2/1]" viewBox="0 0 600 300" fill="none">
            {/* Ambient map background grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="600" height="300" fill="url(#grid)" />

            {/* Simulated abstract geographical coordinates */}
            {/* North America */}
            <path d="M 80 50 Q 150 40 180 80 T 210 120 T 150 160 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" />
            {/* South America */}
            <path d="M 170 170 Q 230 200 240 230 T 200 280 T 160 210 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
            {/* Europe / Asia */}
            <path d="M 270 45 Q 350 40 450 60 T 520 120 T 420 220 T 310 170 Z" fill="rgba(255,255,255,0.022)" stroke="rgba(255,255,255,0.06)" />
            {/* Africa */}
            <path d="M 280 150 Q 340 160 350 200 T 320 270 T 260 200 Z" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.04)" />
            {/* Australia */}
            <path d="M 480 210 Q 550 220 540 260 T 460 250 Z" fill="rgba(255,255,255,0.018)" stroke="rgba(255,255,255,0.05)" />

            {/* Static high-density line routes with flowing dash packages */}
            {NODE_CONNECTIONS.map((c, i) => {
              const fromN = GLOBAL_NODES.find(n => n.name === c.from);
              const toN = GLOBAL_NODES.find(n => n.name === c.to);
              if (!fromN || !toN) return null;
              return (
                <g key={i}>
                  <line 
                    x1={fromN.x} 
                    y1={fromN.y} 
                    x2={toN.x} 
                    y2={toN.y} 
                    stroke="rgba(16, 243, 220, 0.15)" 
                    strokeWidth="1.2" 
                  />
                  <line 
                    x1={fromN.x} 
                    y1={fromN.y} 
                    x2={toN.x} 
                    y2={toN.y} 
                    stroke="#10F3DC" 
                    strokeWidth="1.5" 
                    strokeDasharray="10 50"
                    className="animate-pulse"
                    style={{
                      animationDuration: `${3 + i * 1.5}s`,
                      transformOrigin: 'center'
                    }}
                  />
                </g>
              );
            })}

            {/* Pulsing Active Nodes */}
            {GLOBAL_NODES.map((node) => {
              const isActive = activeNodes.includes(node.name);
              return (
                <g key={node.name} className="cursor-pointer">
                  {/* Concentric waves */}
                  {isActive && (
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r="12" 
                      fill="none" 
                      stroke="#10F3DC" 
                      strokeWidth="1" 
                      className="origin-center opacity-65 scale-150 animate-ping"
                      style={{ animationDuration: '2.5s' }}
                    />
                  )}
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r={isActive ? "5.5" : "3.5"} 
                    fill={isActive ? "#10F3DC" : "rgba(255,255,255,0.4)"} 
                    className="transition-all duration-300"
                  />
                  <text 
                    x={node.x} 
                    y={node.y - 8} 
                    fill="#E0FBFC" 
                    fontSize="7.5" 
                    fontFamily="monospace"
                    textAnchor="middle" 
                    className="font-bold opacity-60 tracking-tighter"
                  >
                    {node.emoji} {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* BOTTOM REAL-TIME ACTIVITY FEED ROLL */}
        <div className="z-10 bg-[#0B0F1A]/80 border border-[#1D2D44]/35 p-3 rounded-sm backdrop-blur-sm shadow-2xl max-w-md">
          <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-widest text-[#10F3DC] font-bold pb-2 border-b border-[#1D2D44]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10F3DC] animate-ping shrink-0" />
            LIVE WORLDWIDE INTERCONNECTIONS
          </span>
          <div className="mt-2 space-y-1.5 select-text">
            <AnimatePresence>
              {liveActivityFeed.map((feed, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  key={`${feed.name}-${i}`} 
                  className="flex items-center justify-between text-[9px] font-mono leading-none py-1 border-b border-white/5 last:border-b-0"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#10F3DC] font-bold">{feed.emoji} {feed.name}</span>
                    <span className="text-zinc-500">[{feed.location}]</span>
                  </div>
                  <span className="text-zinc-300 italic max-w-[150px] truncate">{feed.action}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL: PORTAL SLATE */}
      <div className="w-full md:w-2/5 flex flex-col justify-center p-8 md:p-12 z-10 relative bg-black/40">
        
        {/* Background gradient block for texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-black/90 to-emerald-950/20 -z-10" />

        <div className="max-w-sm w-full mx-auto">
          
          <div className="mb-8">
            <div className="flex items-center gap-2 select-none mb-4">
              <span className="font-mono text-[9px] px-2 py-0.5 border border-red-500/30 text-red-400 uppercase tracking-widest font-bold rounded-full bg-red-950/20">
                PORT: 3000 SECURE
              </span>
              <span className="font-mono text-[9px] px-2 py-0.5 border border-[#10F3DC]/30 text-[#10F3DC] uppercase tracking-widest font-bold rounded-full bg-[#10F3DC]/5">
                DATABASE: OK
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {isRegister ? 'Global Registration' : 'Account Access'}
            </h2>
            <p className="text-[11.5px] text-zinc-400 mt-1.5">
              {isRegister 
                ? 'Join thousands of developers in scanning docs anonymously.'
                : 'Fill your credentials or choose temporary sandbox credentials.'
              }
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            
            {isRegister && (
              <div className="space-y-1">
                <label className="block text-[10px] font-mono tracking-widest text-zinc-300 uppercase font-bold">FULL NAME</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                    <User size={13} />
                  </span>
                  <input 
                    type="text" 
                    placeholder="E.g. Sarah Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-1.5 pl-9 pr-3 text-xs bg-white/5 border border-white/10 text-white rounded-sm focus:outline-none focus:border-[#10F3DC] transition-all font-sans"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-[10px] font-mono tracking-widest text-zinc-300 uppercase font-bold">EMAIL ADDRESS</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Mail size={13} />
                </span>
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-1.5 pl-9 pr-3 text-xs bg-white/5 border border-white/10 text-white rounded-sm focus:outline-none focus:border-[#10F3DC] transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-mono tracking-widest text-zinc-300 uppercase font-bold">PASSWORD PARAMETER</label>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Lock size={13} />
                </span>
                <input 
                  type="password" 
                  placeholder="••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-1.5 pl-9 pr-3 text-xs bg-white/5 border border-white/10 text-white rounded-sm focus:outline-none focus:border-[#10F3DC] transition-all font-sans"
                />
              </div>
            </div>

            {isRegister && (
              <div className="space-y-1">
                <label className="block text-[10px] font-mono tracking-widest text-zinc-300 uppercase font-bold">GLOBAL ORIGIN</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                    <MapPin size={13} />
                  </span>
                  <select 
                    value={location}
                    onChange={(e: any) => setLocation(e.target.value)}
                    className="w-full py-1.5 pl-9 pr-3 text-xs bg-white/5 border border-white/10 text-white rounded-sm focus:outline-none focus:border-[#10F3DC] transition-all font-sans cursor-pointer uppercase font-mono"
                  >
                    {GLOBAL_NODES.map((city) => (
                      <option key={city.name} value={city.name} className="bg-slate-900 text-white">
                        {city.emoji} {city.name} ({city.country})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Error notifications */}
            <AnimatePresence mode="wait">
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-mono text-[#FF4D4D] border border-[#FF4D4D]/20 bg-[#FF4D4D]/5 p-2 rounded-sm leading-normal flex items-start gap-1"
                >
                  <span>⚠️</span>
                  <span>{errorMessage}</span>
                </motion.div>
              )}
              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-mono text-[#E4F222] border border-[#E4F222]/20 bg-[#E4F222]/5 p-2 rounded-sm leading-normal flex items-start gap-1"
                >
                  <ShieldCheck size={13} className="shrink-0 text-[#E4F222]" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <button 
              type="submit"
              disabled={loading}
              className={`w-full font-mono text-xs font-bold py-2 px-3 transition-all uppercase rounded-sm border select-none cursor-pointer flex items-center justify-center gap-1 bg-[#10F3DC] border-transparent text-[#000814] hover:bg-[#a9fcf3] focus:ring-1 focus:ring-[#10F3DC] outline-none disabled:opacity-50`}
            >
              {loading ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <span>{isRegister ? 'EXECUTE REGISTER' : 'SECURE SECURE SIGNIN'}</span>
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* TOGGLE LINK */}
          <div className="mt-5 text-center">
            <button 
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorMessage('');
                setSuccessMsg('');
              }}
              className="text-[10.5px] font-mono text-slate-400 hover:text-white transition-colors"
            >
              {isRegister ? 'Already have credentials? Sign In' : "Don't have accounts? Register Global User"}
            </button>
          </div>

          <div className="my-5 flex items-center gap-2">
            <div className="h-px bg-white/10 flex-grow" />
            <span className="font-mono text-[8.5px] text-zinc-500 uppercase tracking-widest">OR CONNECT SECURELY</span>
            <div className="h-px bg-white/10 flex-grow" />
          </div>

          {/* GUEST MODE BYPASS */}
          <button 
            onClick={handleGuestBypass}
            disabled={loading}
            className="w-full font-mono text-xs font-bold py-2 px-3 transition-colors uppercase rounded-sm border border-white/10 text-white bg-white/5 hover:bg-white/10 focus:outline-none select-none cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles size={13} className="text-[#E4F222]" />
            <span>BYPASS BY GUEST SANDBOX</span>
          </button>

          <p className="mt-8 text-center text-[9px] font-mono text-zinc-500 leading-normal">
            ResumeAI Pro utilizes fully isolated database sandboxes. Connecting over SSL tunnel v1.2 with strict telemetry boundaries.
          </p>

        </div>
      </div>

    </div>
  );
}
