import { useState, useEffect } from 'react';
import { 
  FileText, 
  Terminal, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUp, 
  ArrowRight, 
  Upload, 
  Download, 
  Search, 
  Bell, 
  HelpCircle, 
  User as UserIcon, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  RefreshCw, 
  Layers3, 
  Trash2,
  FileCheck,
  Settings as SettingsIcon,
  HelpCircle as HelpIcon,
  LogOut as LogOutIcon,
  LayoutDashboard,
  Palette,
  Linkedin
} from 'lucide-react';
import AnimatedLogin from './components/AnimatedLogin';

interface AppThemeStyle {
  id: 'midnight' | 'swiss' | 'oceanic' | 'emerald';
  name: string;
  badge: string;
  appClass: string;
  sidebarClass: string;
  cardClass: string;
  panelClass: string;
  buttonPrimary: string;
  buttonSecondary: string;
  textMuted: string;
  textHeader: string;
  tagHighlight: string;
  tagAccent: string;
  borderClass: string;
  inputBg: string;
  dividerClass: string;
  logoColor: string;
  navActive: string;
  navInactive: string;
}

const THEMES: Record<'midnight' | 'swiss' | 'oceanic' | 'emerald', AppThemeStyle> = {
  midnight: {
    id: 'midnight',
    name: 'Midnight Terminal',
    badge: '● Tech Dark',
    appClass: 'bg-[#121315] text-[#e3e2e3]',
    sidebarClass: 'bg-[#08090A] border-r border-[#1F1F1F]',
    cardClass: 'bg-[#111111] border border-[#1F1F1F]',
    panelClass: 'bg-[#08090A] border border-[#1F1F1F]',
    buttonPrimary: 'bg-[#0070F3] text-white hover:bg-[#0059c5]',
    buttonSecondary: 'border border-[#1F1F1F] bg-[#111111] text-white hover:bg-[#1A1A1A] hover:border-[#aec6ff]/35',
    textMuted: 'text-[#888888]',
    textHeader: 'text-white',
    tagHighlight: 'bg-[#E4F222]/10 text-[#E4F222] border-[#E4F222]/25',
    tagAccent: 'bg-[#0070F3]/10 text-[#aec6ff] border-[#0070F3]/30',
    borderClass: 'border-[#1F1F1F]',
    inputBg: 'bg-[#111111] text-white placeholder-[#444] border-[#1F1F1F]',
    dividerClass: 'border-[#1F1F1F]',
    logoColor: 'text-[#0070F3]',
    navActive: 'bg-[#111111] text-[#aec6ff] border-l-2 border-[#aec6ff] font-semibold',
    navInactive: 'text-[#c1c6d7] hover:bg-[#1f2021]/50 hover:text-white'
  },
  swiss: {
    id: 'swiss',
    name: 'Swiss Editorial',
    badge: '● Minimal Light',
    appClass: 'bg-[#F4F5F6] text-[#1A1A1B]',
    sidebarClass: 'bg-white border-r border-[#E4E7EC]',
    cardClass: 'bg-white border border-[#E4E7EC] shadow-sm',
    panelClass: 'bg-[#FAFAFB] border border-[#E4E7EC]',
    buttonPrimary: 'bg-red-600 text-white hover:bg-red-700',
    buttonSecondary: 'border border-[#E4E7EC] bg-white text-[#1A1A1B] hover:bg-[#F2F4F7] hover:border-[#1A1A1B]/30',
    textMuted: 'text-[#667085]',
    textHeader: 'text-[#1A1A1B]',
    tagHighlight: 'bg-red-50 text-red-700 border border-red-200/50',
    tagAccent: 'bg-zinc-100 text-zinc-800 border border-zinc-250',
    borderClass: 'border-[#E4E7EC]',
    inputBg: 'bg-white text-[#1A1A1B] placeholder-[#98A2B3] border-[#E4E7EC]',
    dividerClass: 'border-[#E4E7EC]',
    logoColor: 'text-red-600',
    navActive: 'bg-[#F2F4F7] text-[#1A1A1B] border-l-2 border-red-600 font-semibold',
    navInactive: 'text-[#667085] hover:bg-[#F2F4F7]/65 hover:text-[#1A1A1B]'
  },
  oceanic: {
    id: 'oceanic',
    name: 'Oceanic Executive',
    badge: '● Corporate Navy',
    appClass: 'bg-[#0A1128] text-[#E0FBFC]',
    sidebarClass: 'bg-[#000814] border-r border-[#1D2D44]',
    cardClass: 'bg-[#1C2541] border border-[#1D2D44]',
    panelClass: 'bg-[#0A1128] border border-[#1D2D44]',
    buttonPrimary: 'bg-[#3A86FF] text-white hover:bg-[#2563EB]',
    buttonSecondary: 'border border-[#1D2D44] bg-[#1C2541] text-[#E0FBFC] hover:bg-[#212B4C]',
    textMuted: 'text-[#8D99AE]',
    textHeader: 'text-white',
    tagHighlight: 'bg-[#00F5D4]/10 text-[#00F5D4] border border-[#00F5D4]/25',
    tagAccent: 'bg-[#3A86FF]/10 text-[#90E0EF] border border-[#3A86FF]/30',
    borderClass: 'border-[#1D2D44]',
    inputBg: 'bg-[#1C2541] text-white placeholder-[#5A6E85] border-[#1D2D44]',
    dividerClass: 'border-[#1D2D44]',
    logoColor: 'text-[#3A86FF]',
    navActive: 'bg-[#1C2541]/70 text-[#90E0EF] border-l-2 border-[#3A86FF] font-semibold',
    navInactive: 'text-[#8D99AE] hover:bg-[#1C2541]/35 hover:text-white'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Moss',
    badge: '● Nordic Slate',
    appClass: 'bg-[#0B0F0D] text-[#E2E8F0]',
    sidebarClass: 'bg-[#060807] border-r border-[#1E2622]',
    cardClass: 'bg-[#131B18] border border-[#1E2622]',
    panelClass: 'bg-[#0B0F0D] border border-[#1E2622]',
    buttonPrimary: 'bg-[#10B981] text-white hover:bg-[#059669]',
    buttonSecondary: 'border border-[#1E2622] bg-[#131B18] text-[#E2E8F0] hover:bg-[#1A2521]',
    textMuted: 'text-[#6B7C75]',
    textHeader: 'text-white',
    tagHighlight: 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/25',
    tagAccent: 'bg-[#10B981]/10 text-[#A7F3D0] border border-[#10B981]/30',
    borderClass: 'border-[#1E2622]',
    inputBg: 'bg-[#131B18] text-white placeholder-[#384841] border-[#1E2622]',
    dividerClass: 'border-[#1E2622]',
    logoColor: 'text-[#10B981]',
    navActive: 'bg-[#131B18] text-[#A7F3D0] border-l-2 border-[#10B981] font-semibold',
    navInactive: 'text-[#6B7C75] hover:bg-[#131B18]/50 hover:text-white'
  }
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resumes' | 'analysis' | 'comparison' | 'settings'>('dashboard');

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<any>(() => {
    try {
      const cached = localStorage.getItem('user_session');
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  });

  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('user_token') || null;
  });

  const handleLoginSuccess = (user: any, token: string) => {
    setCurrentUser(user);
    setAuthToken(token);
    localStorage.setItem('user_session', JSON.stringify(user));
    localStorage.setItem('user_token', token);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/auth/logout', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: 'revoked' })
      });
    } catch (err) {}
    setCurrentUser(null);
    setAuthToken(null);
    setResumes([]);
    setActiveResumeId(null);
    setActiveReport(null);
    localStorage.removeItem('user_session');
    localStorage.removeItem('user_token');
  };

  // Backend Integration State
  const [resumes, setResumes] = useState<any[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [activeReport, setActiveReport] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [uploadPreset, setUploadPreset] = useState<'SoftwareEngineer_2023.pdf' | 'Product_Manager_v2.pdf'>('SoftwareEngineer_2023.pdf');
  const [uploadingState, setUploadingState] = useState<'idle' | 'scanning' | 'parsing' | 'completing'>('idle');
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [jdText, setJdText] = useState('');
  const [customRole, setCustomRole] = useState('Software Engineer');
  const [isMatching, setIsMatching] = useState(false);
  const [matchingResult, setMatchingResult] = useState<any | null>(null);

  // Custom device upload states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customFileName, setCustomFileName] = useState('');
  const [customFileContent, setCustomFileContent] = useState('');
  const [customTargetRole, setCustomTargetRole] = useState('Software Engineer');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Dynamic Style Theme state
  const [themeMode, setThemeMode] = useState<'midnight' | 'swiss' | 'oceanic' | 'emerald'>('midnight');
  const t = THEMES[themeMode];

  // Load backend details on startup and poll active jobs every 2 seconds
  useEffect(() => {
    if (!authToken) return;
    fetchResumes();
    fetchJobs();
    fetchLogs();
    
    const interval = setInterval(() => {
      fetchJobs();
      fetchResumes();
    }, 2000);

    return () => clearInterval(interval);
  }, [authToken]);

  // Sync active report when resumes or activeId shifts
  useEffect(() => {
    if (activeResumeId) {
      fetchActiveReport(activeResumeId);
    }
  }, [activeResumeId, resumes]);

  // Listen to LinkedIn Sandbox or LinkedIn OAuth callback success messages
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const data = event.data;
      if (data?.type === 'LINKEDIN_AUTH_SUCCESS') {
        const profile = data.profileData;
        if (!profile) return;

        setUploadingState('parsing');
        try {
          const res = await fetch('/api/v1/resumes/linkedin-sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken || 'token_ac_user_default_test'}`
            },
            body: JSON.stringify({ profileData: profile })
          });
          const json = await res.json();
          if (json.success && json.data?.resumeId) {
            setUploadingState('completing');
            setTimeout(() => {
              setUploadingState('idle');
              setActiveResumeId(json.data.resumeId);
              setActiveTab('analysis');
              fetchResumes();
            }, 1500);
          } else {
            setUploadingState('idle');
            alert('LinkedIn Profile Parse Error: ' + (json.message || 'Verification could not proceed.'));
          }
        } catch (err: any) {
          setUploadingState('idle');
          console.error("Syncing LinkedIn Profile details error:", err);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [authToken]);

  const fetchResumes = async () => {
    try {
      // Direct REST lookup using the Express port
      const res = await fetch('/api/v1/resumes', {
        headers: { 'Authorization': `Bearer ${authToken || 'token_ac_user_default_test'}` }
      });
      const json = await res.json();
      if (json.success) {
        setResumes(json.data);
        if (!activeResumeId && json.data.length > 0) {
          setActiveResumeId(json.data[0]._id);
        }
      }
    } catch (err) {
      console.warn("Express server connection cold. Working locally.", err);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const json = await res.json();
      if (json.success) {
        setActiveJobs(json.data);
        // Track the current upload job progress
        if (currentJobId) {
          const matchingJob = json.data.find((j: any) => j.id === currentJobId || j.type === 'analyze');
          if (matchingJob) {
            if (matchingJob.status === 'completed') {
              setUploadingState('idle');
              setCurrentJobId(null);
              fetchResumes();
            } else if (matchingJob.type === 'scan' && matchingJob.status === 'processing') {
              setUploadingState('scanning');
            } else if (matchingJob.type === 'parse' && matchingJob.status === 'processing') {
              setUploadingState('parsing');
            } else if (matchingJob.type === 'analyze' && matchingJob.status === 'processing') {
              setUploadingState('completing');
            }
          }
        }
      }
    } catch (err) {
      // Fallback
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/admin/audit');
      const json = await res.json();
      if (json.success) {
        setAuditLogs(json.data);
      }
    } catch (err) {}
  };

  const fetchActiveReport = async (resumeId: string) => {
    try {
      const res = await fetch(`/api/v1/resumes/${resumeId}/analysis`);
      const json = await res.json();
      if (json.success) {
        setActiveReport(json.data);
      }
    } catch (err) {}
  };

  // UPLOAD PRESET RESUME (TRIGGERS FULL MULTI-MODULE BACKGROUND WORKER PIPELINE)
  const handlePresetTrigger = async () => {
    setUploadingState('scanning');
    try {
      // First, prepare register to establish fallback token if profile is missing
      await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'john@resumesaas.com', password: 'password', name: 'John Doe' })
      });

      // Settle session setup
      await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'john@resumesaas.com', password: 'password' })
      });

      const res = await fetch('/api/v1/resumes/upload-preset', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken || 'token_ac_user_default_test'}`
        },
        body: JSON.stringify({ presetName: uploadPreset, targetRole: uploadPreset.includes('Product') ? 'Product Manager' : 'Software Engineer' })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentJobId(data.jobId);
        setActiveResumeId(data.resumeId);
        setActiveTab('analysis'); 
      }
    } catch (err) {
      setUploadingState('idle');
    }
  };

  // CONNECT & FETCH FROM LINKEDIN ROUTE GATEWAY
  const handleConnectLinkedIn = async () => {
    setUploadingState('scanning');
    try {
      const res = await fetch('/api/v1/auth/linkedin/url');
      const data = await res.json();
      if (!data.success || !data.url) {
        throw new Error(data.message || 'Error generating url');
      }

      // Open a popup for LinkedIn sandbox/real-auth gate:
      const width = 600;
      const height = 750;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      const popup = window.open(
        data.url,
        'linkedin_auth_gate',
        `width=${width},height=${height},top=${top},left=${left},status=no,resizable=yes`
      );

      if (!popup) {
        alert('Blocked by browser popups rules. Please enable popups.');
        setUploadingState('idle');
      }
    } catch (err: any) {
      console.error(err);
      alert('Could not configure LinkedIn connection.');
      setUploadingState('idle');
    }
  };

  // HANDLES SELECTION & READING OF CUSTOM USER RESUMES FROM THEIR DEVICE
  const handleFileSelection = (file: File) => {
    if (!file) return;
    setCustomFileName(file.name);
    setUploadError('');
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      
      // Simple validation or text clean heuristic
      if (file.name.endsWith('.pdf')) {
        const cleaned = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
        const words = cleaned.split(/\s+/).filter(w => w.length > 2 && w.match(/^[a-zA-Z]/));
        if (words.length > 20) {
          setCustomFileContent(words.slice(0, 1500).join(' ')); // Max lines bounds
        } else {
          setCustomFileContent(
`[PDF DOCUMENT STREAM DETECTED]
To ensure flawless ATS scoring and parsing, please replace this header with the copy-pasted plain text content of your PDF resume below, or upload a direct text file (.txt, .md).`
          );
        }
      } else if (file.name.endsWith('.docx')) {
        setCustomFileContent(
`[DOCX WORD DOCUMENT DETECTED]
To ensure flawless ATS scoring and parsing, please replace this header with the copy-pasted plain text content of your resume below, or upload a direct text file (.txt, .md).`
        );
      } else {
        setCustomFileContent(text);
      }
    };
    reader.readAsText(file);
  };

  // DISPATCHES THE CUSTOM FILE RESUME DATA TO THE BACKGROUND PIPELINE BACKEND
  const handleCustomUploadSubmit = async () => {
    if (!customFileName) {
      setUploadError('Please select or drag a file to analyze.');
      return;
    }
    if (!customFileContent.trim() || customFileContent.includes('To ensure flawless ATS scoring')) {
      setUploadError('Please provide readable, non-empty plain text resume contents in the editor box.');
      return;
    }

    setUploadingState('scanning');
    setShowUploadModal(false);
    
    try {
      // First, prepare register to establish fallback token if profile is missing
      await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'john@resumesaas.com', password: 'password', name: 'John Doe' })
      });

      // Settle session setup
      await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'john@resumesaas.com', password: 'password' })
      });

      const res = await fetch('/api/v1/resumes/upload', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken || 'token_ac_user_default_test'}`
        },
        body: JSON.stringify({ 
          fileName: customFileName, 
          fileContent: customFileContent, 
          targetRole: customTargetRole 
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setCurrentJobId(data.jobId);
        setActiveResumeId(data.resumeId);
        setActiveTab('analysis'); 
        
        // Clear editor states
        setCustomFileName('');
        setCustomFileContent('');
        setUploadError('');
      } else {
        setUploadError(data.message || 'Server returned process error.');
        setUploadingState('idle');
      }
    } catch (err) {
      setUploadingState('idle');
      setUploadError('Failed connecting to Express worker queue.');
    }
  };

  // APPLY AI DRIFT MODIFICATIONS IN REAL-TIME
  const handleApplyFix = async (actionType: 'summary' | 'bullet', bulletIndex?: number) => {
    if (!activeResumeId) return;
    try {
      const res = await fetch(`/api/v1/resumes/${activeResumeId}/apply-fix`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionType, bulletIndex })
      });
      const json = await res.json();
      if (json.success) {
        setActiveReport(json.data);
        fetchResumes(); // Refresh overall calculations
      }
    } catch (err) {}
  };

  // JOB DESCRIPTION OVERLAP GAP MATCHING (REAL-TIME GEMINI ENGINE ANALYZER)
  const handleJobMatch = async () => {
    if (!activeResumeId || !jdText.trim()) return;
    setIsMatching(true);
    try {
      const res = await fetch('/api/v1/comparisons/match', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken || 'token_ac_user_default_test'}`
        },
        body: JSON.stringify({ resumeId: activeResumeId, jdText, targetRole: customRole })
      });
      const json = await res.json();
      if (json.success) {
        setMatchingResult(json.data);
      }
    } catch (err) {}
    setIsMatching(false);
  };

  const handleDownloadTxt = () => {
    if (!activeResumeId) return;
    window.open(`/api/v1/downloads/${activeResumeId}`);
  };

  // Get current active enriched resume
  const activeResume = resumes.find(r => r._id === activeResumeId);

  // Calculations for KPI Displays
  const totalScans = resumes.length;
  const scoresArray = resumes.map(r => r.score).filter(s => s !== undefined) as number[];
  const averageScore = scoresArray.length > 0 ? Math.round(scoresArray.reduce((p, c) => p + c, 0) / scoresArray.length) : 0;
  
  // Custom filter Heuristics
  const filteredResumes = resumes.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || (r.targetRole && r.targetRole.toLowerCase().includes(searchQuery.toLowerCase()));
    if (roleFilter === 'All') return matchesSearch;
    if (roleFilter === 'Optimized') return matchesSearch && (r.score || 0) >= 80;
    if (roleFilter === 'Needs Review') return matchesSearch && (r.score || 0) < 50;
    return matchesSearch;
  });

  if (!currentUser || !authToken) {
    return (
      <AnimatedLogin 
        onLoginSuccess={handleLoginSuccess} 
        themeMode={themeMode} 
        THEMES={THEMES} 
      />
    );
  }

  return (
    <div className={`flex h-screen w-full font-sans overflow-hidden antialiased selection:bg-[#0070F3] selection:text-white transition-colors duration-300 ${t.appClass}`}>
      
      {/* ========================================== */}
      {/* SIDE NAVIGATION BAR */}
      {/* ========================================== */}
      <aside className={`w-64 flex flex-col h-full p-6 shrink-0 select-none transition-colors duration-300 ${t.sidebarClass}`}>
        
        {/* LOGO FRAME */}
        <div className="mb-6 flex items-center gap-3">
          <div className={`w-9 h-9 border flex items-center justify-center rounded-sm relative group overflow-hidden shrink-0 ${t.borderClass} bg-current/5`}>
            <svg viewBox="0 0 36 36" className={`w-5 h-5 fill-current ${t.logoColor}`}>
              <rect x="6" y="10" width="24" height="2" />
              <rect x="6" y="17" width="16" height="2" />
              <rect x="6" y="24" width="20" height="2" />
              <line x1="18" y1="4" x2="18" y2="32" stroke="currentColor" strokeWidth="2" className="animate-pulse" />
            </svg>
          </div>
          <div>
            <h1 className={`font-sans text-md font-bold leading-none tracking-tight ${t.textHeader}`}>ResumeAI Pro</h1>
            <p className={`text-[9px] mt-1 uppercase tracking-widest font-mono font-bold ${themeMode === 'swiss' ? 'text-red-650' : 'text-[#aec6ff]'}`}>Professional Plan</p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider select-none ${t.textMuted}`}>System Monitor</div>
        <nav className="flex-grow flex flex-col gap-1.5 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-all text-left font-sans text-sm w-full ${activeTab === 'dashboard' ? t.navActive : t.navInactive}`}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => setActiveTab('resumes')}
            className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-all text-left font-sans text-sm w-full ${activeTab === 'resumes' ? t.navActive : t.navInactive}`}
          >
            <Layers size={16} />
            <span>My Resumes</span>
          </button>

          <button 
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-all text-left font-sans text-sm w-full ${activeTab === 'analysis' ? t.navActive : t.navInactive}`}
          >
            <FileText size={16} />
            <span>AI Analysis</span>
          </button>

          <button 
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-all text-left font-sans text-sm w-full ${activeTab === 'comparison' ? t.navActive : t.navInactive}`}
          >
            <Sparkles size={16} />
            <span>Optimizations</span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-all text-left font-sans text-sm w-full ${activeTab === 'settings' ? t.navActive : t.navInactive}`}
          >
            <SettingsIcon size={16} />
            <span>Settings</span>
          </button>

          {/* PROFESSIONAL WORKSPACE STYLE SELECTOR */}
          <div className={`mt-4 pt-4 border-t ${t.borderClass} select-none shrink-0`}>
            <div className={`px-2 pb-2 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${t.textMuted}`}>
              <Palette size={12} className={t.logoColor} />
              <span>Workspace Style</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((key) => {
                const theme = THEMES[key];
                const isSelected = themeMode === key;
                return (
                  <button
                    key={key}
                    onClick={() => setThemeMode(key)}
                    className={`px-1 py-1 rounded-sm font-mono text-[8.5px] text-center border transition-all truncate cursor-pointer uppercase ${
                      isSelected 
                        ? `${t.buttonPrimary} border-transparent font-bold`
                        : `${t.cardClass} text-current/80 hover:border-current/30`
                    }`}
                    title={theme.name}
                  >
                    {theme.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* BOTTOM UTILITY LINKS */}
        <div className={`mt-auto pt-3 border-t ${t.borderClass} flex flex-col gap-1.5 shrink-0`}>
          <div className={`p-2.5 rounded-sm mb-xs relative overflow-hidden ${t.cardClass}`}>
            <h4 className={`font-mono text-[9px] font-bold uppercase mb-[1px] ${themeMode === 'swiss' ? 'text-red-650' : 'text-[#aec6ff]'}`}>Core Sandbox Node</h4>
            <p className={`font-mono text-[9px] ${t.textMuted}`}>Port Bound: 3000</p>
            <p className="font-mono text-[9px] flex items-center gap-1 mt-1 font-semibold" style={{ color: themeMode === 'swiss' ? '#B80000' : '#E4F222' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              Live DB Active
            </p>
          </div>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-1.5 rounded-sm text-xs transition-style select-none ${t.textMuted} hover:text-current hover:bg-current/5`}
          >
            <HelpIcon size={14} />
            <span>Help Support</span>
          </button>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-1.5 rounded-sm text-xs text-[#FF4D4D] hover:bg-[#FF4D4D]/5 transition-all text-left w-full select-none cursor-pointer font-bold uppercase font-mono"
          >
            <LogOutIcon size={14} />
            <span>Secure Sign Out</span>
          </button>

          <button 
            onClick={() => alert('Enterprise integration is active. Connected with AD & Okta Identity services.')}
            className={`mt-1 w-full font-mono text-[10px] py-1.5 px-2.5 transition-colors uppercase outline-none font-bold ${t.buttonPrimary}`}
          >
            Upgrade Enterprise
          </button>
        </div>
      </aside>

      {/* ========================================== */}
      {/* MAIN VIEWPORT CONTAINER */}
      {/* ========================================== */}
      <section className="flex-grow flex flex-col h-screen overflow-hidden">
        
        {/* TOP BAR */}
        <header className={`h-16 border-b flex items-center justify-between px-8 select-none z-10 shrink-0 transition-colors duration-300 ${t.borderClass} ${t.panelClass}`}>
          <div className="flex items-center gap-sm">
            {activeTab !== 'dashboard' && (
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-1.5 text-xs transition-colors uppercase font-mono tracking-wider focus:outline-none ${t.textMuted} hover:text-current`}
              >
                <span>&larr;</span>
                <span>Back to Resumes</span>
              </button>
            )}
            {activeTab === 'dashboard' && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current animate-pulse shrink-0" style={{ color: themeMode === 'swiss' ? '#B80000' : '#E4F222' }} />
                <span className={`font-mono text-xs font-semibold ${themeMode === 'swiss' ? 'text-zinc-650' : 'text-[#aec6ff]'}`}>ATS Analytical Cluster: Active</span>
              </div>
            )}
          </div>

          {/* RIGHT UTILITIES */}
          <div className="flex items-center gap-md">
            
            {/* SEARCH DOCS BAR */}
            <div className="relative group hidden sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search size={14} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
              </span>
              <input 
                type="text"
                placeholder="Search resumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`text-xs pl-9 pr-4 py-1.5 focus:outline-none focus:border-current/40 w-56 font-mono transition-colors duration-300 rounded-sm ${t.inputBg}`} 
              />
            </div>

            {/* NOTIFICATIONS FLAG */}
            <button className={`relative hover:bg-current/5 border border-transparent rounded-sm p-1.5 transition-colors focus:outline-none ${t.textMuted} hover:text-current`}>
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FF4D4D] animate-pulse" />
            </button>

            <button className={`hover:bg-current/5 border border-transparent rounded-sm p-1.5 transition-colors focus:outline-none ${t.textMuted} hover:text-current`}>
              <HelpCircle size={16} />
            </button>

            <div className={`h-6 w-px ${t.borderClass}`} />

            {/* USER AVATAR DISPLAY WITH DEEP COMPLIANCE RIG */}
            <div className="flex items-center gap-3">
              <div className="text-right select-none">
                <p className={`text-[9px] uppercase font-bold leading-none ${t.textMuted}`}>Global Origin</p>
                <p className={`text-xs font-mono font-bold tracking-tighter mt-0.5 ${themeMode === 'swiss' ? 'text-zinc-800' : 'text-[#0070F3]'}`}>
                  {currentUser?.location ? currentUser.location.toUpperCase() : 'NEW YORK'}
                </p>
              </div>
              <div className={`h-6 w-px ${t.borderClass}`} />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-sm border overflow-hidden flex items-center justify-center shrink-0 ${t.borderClass} ${t.inputBg}`}>
                  <img 
                    alt="Professional User Profile Portrait" 
                    className="w-full h-full object-cover" 
                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(currentUser?.name || 'Senior Architect')}`}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="hidden lg:block leading-none text-left select-none">
                  <p className={`font-mono text-xs font-bold leading-none ${t.textHeader}`}>{currentUser?.name || 'Senior Architect'}</p>
                  <span className="font-mono text-[9.5px] font-bold uppercase animate-pulse flex items-center gap-1" style={{ color: themeMode === 'swiss' ? '#B80000' : '#E4F222' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    CONNECTED
                  </span>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* ========================================== */}
        {/* INTERACTIVE BACKGROUND PIPELINE NOTIFIER */}
        {/* ========================================== */}
        {uploadingState !== 'idle' && (
          <div className="bg-[#aec6ff]/5 border-b border-[#1F1F1F] py-4 px-8 flex items-center justify-between gap-4 relative select-none">
            {/* Subtle light bar progress visualizer */}
            <div className={`absolute left-0 bottom-0 h-[2px] bg-[#0070F3] transition-all duration-[2000ms] ${uploadingState === 'scanning' ? 'w-1/4' : uploadingState === 'parsing' ? 'w-2/3' : 'w-full'}`} />
            
            <div className="flex items-center gap-3">
              <RefreshCw className="animate-spin text-[#0070F3]" size={16} />
              <div>
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  {uploadingState === 'scanning' ? 'ClamAV Antivirus Scanning active...' : uploadingState === 'parsing' ? 'Structure parsing (Keywords Extract)...' : 'Compiling Scoring Matrix...'}
                </h4>
                <p className="font-mono text-[10px] text-[#888888]">
                  Job Queue ID: {currentJobId || 'Simulated BullMQ Thread'}. Executing asynchronously.
                </p>
              </div>
            </div>
            
            {/* PROGRESS TICK CHANGER FLOW */}
            <div className="flex items-center gap-6 font-mono text-[10px] text-[#aec6ff]">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${uploadingState !== 'idle' ? 'bg-[#E4F222] animate-pulse' : 'bg-[#1F1F1F]'}`} />
                <span>SCAN</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${['parsing', 'completing'].includes(uploadingState) ? 'bg-[#E4F222] animate-pulse' : 'bg-[#1F1F1F]'}`} />
                <span>PARSE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${uploadingState === 'completing' ? 'bg-[#E4F222] animate-pulse' : 'bg-[#1F1F1F]'}`} />
                <span>GEMINI SCORE</span>
              </div>
            </div>
          </div>
        )}

        {/* SCROLLABLE SCENE CANVAS */}
        <main className="flex-grow p-8 overflow-y-auto max-w-7xl w-full mx-auto select-text">

          {/* ========================================== */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ========================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 flex flex-col h-full animate-fade-in">
              
              {/* BRAND GREETING */}
              <div className={`flex items-end justify-between border-b pb-5 ${t.borderClass}`}>
                <div>
                  <h2 className={`font-sans text-3xl font-bold tracking-tight animate-fade-in-up ${t.textHeader}`}>SaaS Overview Dashboard</h2>
                  <p className={`font-sans text-[13px] mt-1 ${t.textMuted}`}>
                    Manage active candidate reports, upload new documents safely, and apply AI enhancements.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select 
                    value={uploadPreset} 
                    onChange={(e: any) => setUploadPreset(e.target.value)}
                    className={`border py-1.5 px-3 text-xs font-mono focus:outline-none focus:border-current/30 rounded-sm ${t.inputBg}`}
                  >
                    <option value="SoftwareEngineer_2023.pdf">Preset: Software_Engineer.pdf</option>
                    <option value="Product_Manager_v2.pdf">Preset: Product_Manager_v2.pdf</option>
                  </select>

                  <button 
                    onClick={handlePresetTrigger}
                    className={`font-mono text-xs px-3.5 py-2 transition-all flex items-center gap-1 select-none uppercase tracking-wide font-bold rounded-sm ${t.buttonSecondary}`}
                    title="Run simulated PDF parser preset"
                  >
                    <span>Run Preset</span>
                  </button>

                  <button 
                    onClick={() => setShowUploadModal(true)}
                    className={`font-mono text-xs px-4 py-2 transition-all flex items-center gap-1.5 select-none uppercase tracking-wide font-bold rounded-sm ${t.buttonPrimary}`}
                  >
                    <Upload size={14} />
                    <span>Upload Custom</span>
                  </button>

                  <button 
                    onClick={handleConnectLinkedIn}
                    className="font-mono text-xs px-4 py-2 bg-[#0077b5] text-white hover:bg-[#005987] transition-all flex items-center gap-1.5 select-none uppercase tracking-wide font-bold rounded-sm border-0 cursor-pointer"
                    title="Import user profile directly using secure LinkedIn sync"
                  >
                    <Linkedin size={14} />
                    <span>Fetch LinkedIn</span>
                  </button>
                </div>
              </div>

              {/* BENTO STATISTICAL CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className={`rounded-sm p-5 relative overflow-hidden flex flex-col justify-between h-28 hover:border-current/30 transition-all duration-200 group ${t.cardClass}`}>
                  <div className={`flex items-center gap-2 ${t.textMuted}`}>
                    <Layers3 size={16} />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Total Resumes Scans</span>
                  </div>
                  <div className="font-mono text-3xl font-bold tracking-tight tabular-nums mt-1" style={{ color: themeMode === 'swiss' ? '#1A1A1B' : '#aec6ff' }}>{totalScans}</div>
                  <div className={`text-[10px] flex items-center gap-1 mt-auto font-medium ${t.textMuted}`}>
                    <CheckCircle size={12} className={themeMode === 'swiss' ? 'text-red-500' : 'text-[#E4F222]'} /> 100% database match persistence
                  </div>
                </div>

                <div className={`rounded-sm p-5 relative overflow-hidden flex flex-col justify-between h-28 hover:border-current/30 transition-all duration-200 group ${t.cardClass}`}>
                  <div className={`flex items-center gap-2 ${t.textMuted}`}>
                    <TrendingUp size={16} className={themeMode === 'swiss' ? 'text-red-600' : 'text-[#0070F3]'} />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Average ATS Score</span>
                  </div>
                  <div className="font-mono text-3xl font-bold text-[#0070F3] tracking-tight tabular-nums mt-1">{averageScore}/100</div>
                  <div className="font-sans text-[10px] text-[#888888] mt-auto font-medium">Calculated dynamically over scans</div>
                </div>

                <div className={`rounded-sm p-5 relative overflow-hidden flex flex-col justify-between h-28 hover:border-current/30 transition-all duration-200 group ${t.cardClass}`}>
                  <div className={`flex items-center gap-2 ${t.textMuted}`}>
                    <ShieldCheck size={16} className="text-[#E4F222]" style={{ color: themeMode === 'swiss' ? '#B80000' : '#E4F222' }} />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Readiness Level</span>
                  </div>
                  <div className={`font-mono text-xl font-bold tracking-tight capitalize mt-2 flex items-center gap-1.5 leading-none ${t.textHeader}`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E4F222] animate-pulse shrink-0" style={{ color: themeMode === 'swiss' ? '#B80000' : '#E4F222' }} />
                    Highly Competitive
                  </div>
                  <div className={`font-sans text-[10px] mt-auto font-medium ${t.textMuted}`}>ClamAV Malware defense online</div>
                </div>

                <div className={`rounded-sm p-5 relative overflow-hidden flex flex-col justify-between h-28 hover:border-current/30 transition-all duration-200 group ${t.cardClass}`}>
                  <div className={`flex items-center gap-2 ${t.textMuted}`}>
                    <ArrowUp size={16} className={themeMode === 'swiss' ? 'text-red-650' : 'text-[#aec6ff]'} />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Improvement Index</span>
                  </div>
                  <div className="font-mono text-3xl font-bold tracking-tight tabular-nums mt-1" style={{ color: themeMode === 'swiss' ? '#B80000' : '#E4F222' }}>+28%</div>
                  <div className={`font-sans text-[10px] mt-auto font-medium ${t.textMuted}`}>Injected outcome-based keywords</div>
                </div>

              </div>

              {/* RECENT SCANS TABLE AND METRIC HEALTH COMPANENTS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                 {/* TABLE CONTAINER */}
                <div className={`rounded-sm overflow-hidden flex flex-col select-none ${t.panelClass}`}>
                  <div className={`p-4 border-b flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider ${t.borderClass}`} style={{ color: themeMode === 'swiss' ? '#1A1A1B' : '#aec6ff' }}>
                    <span>Recent Document Scans ({filteredResumes.length})</span>
                    <button onClick={() => setActiveTab('resumes')} className={`hover:underline flex items-center gap-1 text-xs font-bold uppercase ${themeMode === 'swiss' ? 'text-red-650' : t.logoColor}`}>
                      View All &rarr;
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className={`font-mono text-[9px] uppercase tracking-wider font-bold border-b ${t.borderClass} ${t.inputBg}`} style={{ color: themeMode === 'swiss' ? '#475467' : '#888888' }}>
                        <tr>
                          <th className="px-6 py-3 font-medium">Document Name</th>
                          <th className="px-6 py-3 font-medium">ATS Match Profile</th>
                          <th className="px-6 py-3 font-medium text-right">Raw Score</th>
                          <th className="px-6 py-3 font-medium text-right">Integrity Status</th>
                        </tr>
                      </thead>
                      <tbody className={`font-sans text-xs divide-y ${t.dividerClass}`} style={{ color: themeMode === 'swiss' ? '#1A1A1B' : '#c1c6d7' }}>
                        {filteredResumes.length === 0 ? (
                           <tr>
                             <td colSpan={4} className={`p-12 text-center font-mono ${t.textMuted}`}>
                               No scans matched search filter criteria. Start processing!
                             </td>
                           </tr>
                        ) : (
                          filteredResumes.map((resume) => (
                            <tr 
                              key={resume._id}
                              onClick={() => {
                                setActiveResumeId(resume._id);
                                setActiveTab('analysis');
                              }}
                              className="hover:bg-current/5 cursor-pointer group transition-all"
                            >
                              <td className={`px-6 py-3 font-medium flex items-center gap-sm max-w-[220px] truncate ${t.textHeader}`}>
                                <FileText className={`${t.logoColor} shrink-0`} size={14} />
                                <span className="truncate">{resume.name}</span>
                              </td>
                              <td className={`px-6 py-3 font-mono text-[10px] ${themeMode === 'swiss' ? 'text-zinc-650' : 'text-[#aec6ff]'}`}>
                                {resume.targetRole || 'Software Engineer Processing'}
                              </td>
                              <td className={`px-6 py-3 text-right font-mono font-bold font-tabular-nums ${resume.score >= 80 ? (themeMode === 'swiss' ? 'text-red-650' : 'text-[#E4F222]') : t.textHeader}`}>
                                {resume.score ? `${resume.score}` : 'Scan Clean'}
                              </td>
                              <td className="px-6 py-3 text-right font-mono text-[9px]">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm uppercase tracking-wider font-bold ${resume.score >= 85 ? (themeMode === 'swiss' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-[#112A1B] text-[#E4F222] border border-[#225032]') : (themeMode === 'swiss' ? 'bg-zinc-100 text-zinc-500 border border-zinc-200' : 'bg-[#111111] text-[#888888] border border-[#1F1F1F]')}`}>
                                  {resume.score >= 85 ? 'AI Optimized' : 'Analyzed'}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SIDE METRIC DISPLAY */}
                <div className="flex flex-col gap-6">
                  
                  {/* Circular widget */}
                  <div className={`rounded-sm p-5 flex flex-col items-center justify-center relative min-h-[160px] select-none hover:border-current/30 transition-all duration-200 ${t.panelClass}`}>
                    <h3 className={`font-mono text-[9px] uppercase tracking-wider font-bold absolute top-4 left-5 ${t.textMuted}`}>SaaS Usage Quota</h3>
                    
                    <div className="flex items-center gap-5 mt-4">
                      <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                        {/* Perfect SVG progress ring */}
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" fill="none" r="42" stroke={themeMode === 'swiss' ? '#E4E7EC' : '#1F1F1F'} strokeWidth="6" />
                          <circle cx="50" cy="50" fill="none" r="42" stroke={themeMode === 'swiss' ? '#DC2626' : themeMode === 'emerald' ? '#10B981' : themeMode === 'oceanic' ? '#3A86FF' : '#0070F3'} strokeWidth="6" strokeDasharray="264" strokeDashoffset="53" strokeLinecap="round" />
                        </svg>
                        <span className={`absolute font-mono text-sm font-bold ${t.textHeader}`}>80%</span>
                      </div>
                      <div>
                        <h4 className={`font-mono text-xs font-semibold leading-none ${t.textHeader}`}>Credits Limit</h4>
                        <p className={`font-sans text-[10px] mt-1.5 leading-relaxed pr-3 ${t.textMuted}`}>
                          40 / 50 heavy Gemini analyses remains for billing period.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ACTIVE WORKER TIMELINE */}
                  <div className={`rounded-sm p-5 flex-1 flex flex-col justify-between hover:border-current/30 transition-all ${t.panelClass}`}>
                    <h3 className={`font-mono text-[9px] uppercase tracking-widest font-bold border-b pb-3 ${t.borderClass}`} style={{ color: themeMode === 'swiss' ? '#1A1A1B' : '#aec6ff' }}>
                      Active Background Job Queues (BullMQ)
                    </h3>
                    <div className="space-y-2 my-3 overflow-y-auto max-h-[140px] font-mono text-[10px]">
                      {activeJobs.length === 0 ? (
                        <p className={`italic ${t.textMuted}`}>No active task queues running. Scan complete.</p>
                      ) : (
                        activeJobs.map((j) => (
                          <div key={j.id} className={`p-2 border rounded-sm flex items-center justify-between gap-2 ${t.borderClass} ${t.inputBg}`}>
                            <span className={`uppercase font-bold text-[9px] ${t.textMuted}`}>[{j.type}]</span>
                            <span className={`truncate max-w-[120px] font-mono ${themeMode === 'swiss' ? 'text-zinc-800' : 'text-[#aec6ff]'}`}>{j.id}</span>
                            <span className={`px-2 py-0.5 rounded-sm text-[8px] tracking-wide uppercase font-bold ${j.status === 'completed' ? (themeMode === 'swiss' ? 'bg-red-50 text-red-700' : 'bg-[#112A1B] text-[#E4F222]') : (themeMode === 'swiss' ? 'bg-zinc-100 text-zinc-500' : 'bg-[#0070F3]/20 text-[#0070F3] border border-[#0070F3]/30')}`}>{j.status}</span>
                          </div>
                        ))
                      )}
                    </div>
                    <div className={`p-3 border-l-4 font-mono text-[10px] leading-relaxed ${themeMode === 'swiss' ? 'border-red-650' : 'border-[#0070F3]'} ${t.inputBg} ${t.textMuted}`}>
                      All pipeline workers run on background child threads mimicking enterprise Redis architectures.
                    </div>
                  </div>

                </div>

              </div>
              
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 2: MY RESUMES WORKSPACE GALEERY */}
          {/* ========================================== */}
          {activeTab === 'resumes' && (
            <div className="space-y-6">
              
              {/* BRAND HEADER */}
              <div className={`flex justify-between items-end border-b pb-5 select-none ${t.borderClass}`}>
                <div>
                  <h2 className={`font-sans text-3xl font-bold tracking-tight ${t.textHeader}`}>Document Workspaces</h2>
                  <p className={`font-sans text-[13px] mt-1 ${t.textMuted}`}>Review, delete or compare active candidate versions in high density grids.</p>
                </div>
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className={`font-mono text-xs px-4 py-2 transition-all flex items-center gap-1.5 select-none uppercase font-bold rounded-sm ${t.buttonPrimary}`}
                >
                  <Upload size={14} /> Upload Custom
                </button>
              </div>

              {/* FILTERS */}
              <div className={`flex gap-4 border-b pb-1 select-none ${t.borderClass}`}>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setRoleFilter('All')}
                    className={`font-mono text-xs px-4 py-2 transition-all uppercase ${roleFilter === 'All' ? `${themeMode === 'swiss' ? 'text-red-700 border-b-2 border-red-700' : 'text-[#E4F222] border-b-2 border-[#E4F222]'} ${t.inputBg} font-bold` : `${t.textMuted} hover:text-current font-medium`}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setRoleFilter('Optimized')}
                    className={`font-mono text-xs px-4 py-2 transition-all uppercase ${roleFilter === 'Optimized' ? `${themeMode === 'swiss' ? 'text-red-700 border-b-2 border-red-700' : 'text-[#E4F222] border-b-2 border-[#E4F222]'} ${t.inputBg} font-bold` : `${t.textMuted} hover:text-current font-medium`}`}
                  >
                    Optimized
                  </button>
                  <button 
                    onClick={() => setRoleFilter('Needs Review')}
                    className={`font-mono text-xs px-4 py-2 transition-all uppercase ${roleFilter === 'Needs Review' ? 'text-[#E4F222] border-b-2 border-[#E4F222] bg-[#111111] font-bold' : 'text-[#888888] hover:text-white font-medium'}`}
                  >
                    Needs Review
                  </button>
                </div>
              </div>

              {/* GRIDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResumes.length === 0 ? (
                  <div className="col-span-full border border-dashed border-[#1F1F1F] p-12 text-center rounded-sm font-mono text-[#888888]">
                    No matching workspace files found. Upload a preset to initialize analytical reporting.
                  </div>
                ) : (
                  filteredResumes.map((resume) => (
                    <div 
                      key={resume._id}
                      className="bg-[#08090A] border border-[#1F1F1F] rounded-sm flex flex-col justify-between hover:border-[#aec6ff]/30 transition-all select-none overflow-hidden duration-200"
                    >
                      <div className="p-4 bg-[#111111] border-b border-[#1F1F1F] flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white">
                          <FileText size={15} className="text-[#0070F3]" />
                          <h4 className="font-mono text-xs font-bold truncate max-w-[150px]">{resume.name}</h4>
                        </div>
                        <span className="font-mono text-[9px] text-[#aec6ff] uppercase tracking-wide bg-[#1F1F1F] py-0.5 px-1.5">
                          ID: {resume._id.substring(7)}
                        </span>
                      </div>

                      <div className="p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] text-[#888888] uppercase font-bold tracking-widest">ATS MATCH VALUE</span>
                          
                          {/* Circular Score visualizer ring */}
                          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" fill="none" r="16" stroke="#1F1F1F" strokeWidth="2.5" />
                              <circle 
                                cx="18" 
                                cy="18" 
                                fill="none" 
                                r="16" 
                                stroke={resume.score >= 80 ? '#E4F222' : '#0070F3'} 
                                strokeWidth="2.5" 
                                strokeDasharray="100" 
                                strokeDashoffset={100 - (resume.score || 0)} 
                                strokeLinecap="round" 
                              />
                            </svg>
                            <span className="absolute font-mono text-xs text-white font-bold">{resume.score || '--'}</span>
                          </div>
                        </div>

                        <div className="space-y-2 font-mono text-xs pt-3 border-t border-[#1F1F1F]">
                          <div className="flex justify-between items-center">
                            <span className="text-[#888888] font-medium">Target Role</span>
                            <span className="text-[#0070F3] font-mono text-[11px] font-bold">{resume.targetRole || 'Software Engineer'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#888888] font-medium">Scan Timestamp</span>
                            <span className="text-[#aec6ff] font-mono text-[10px]">{new Date(resume.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-[#111111] border-t border-[#1F1F1F] flex items-center justify-between gap-2.5">
                        <button 
                          onClick={() => {
                            setActiveResumeId(resume._id);
                            setActiveTab('analysis');
                          }}
                          className="flex-grow font-mono text-[10px] py-1.5 bg-[#0070F3] hover:bg-[#0059c5] transition-colors text-white uppercase font-bold text-center tracking-wide focus:outline-none cursor-pointer"
                        >
                          Open Report
                        </button>
                        <button 
                          onClick={() => {
                            setActiveResumeId(resume._id);
                            setActiveTab('comparison');
                          }}
                          className="font-mono text-[10px] py-1.5 px-4 bg-[#1F1F1F] hover:bg-[#FF4D4D]/10 text-[#FF4D4D] border border-[#1F1F1F] hover:border-[#FF4D4D]/35 uppercase font-bold transition-all focus:outline-none cursor-pointer"
                        >
                          Diff
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* ========================================== */}
          {/* TAB 3: SPECIFIC AI PARSING ANALYSIS */}
          {/* ========================================== */}
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              
              {/* SCREEN GREETING HEADER */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-md border-b border-[#1F1F1F] pb-5 select-none">
                <div>
                  <h2 className="font-sans text-3xl font-bold tracking-tight text-white mb-1">Candidate Analysis Report</h2>
                  <span className="font-mono text-xs text-[#0070F3] font-semibold">{activeResume?.name || 'No active file selected (Process default first)'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleDownloadTxt}
                    className="px-4 py-2 border border-[#1F1F1F] bg-[#111111] hover:bg-[#1A1A1A] hover:border-[#aec6ff]/35 transition-colors text-white font-mono text-xs font-semibold leading-none flex items-center gap-1.5 select-none cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download TXT Optimized</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('comparison')}
                    className="bg-[#0070F3] text-white font-mono text-xs px-4 py-2 hover:bg-[#0059c5] transition-all flex items-center gap-1.5 select-none uppercase tracking-wide cursor-pointer font-bold"
                  >
                    <Sparkles size={14} />
                    <span>Proceed ATS Diff Tool</span>
                  </button>
                </div>
              </div>

              {activeResume && activeReport ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* LEFT COLUMN: RESUME PREVIEW PANEL */}
                  <div className="lg:col-span-5 flex flex-col gap-md">
                    <div className="bg-[#08090A] border border-[#1F1F1F] rounded-sm p-6 flex flex-col justify-between">
                      <div className="border-b border-[#1F1F1F] pb-4 text-center">
                        <h3 className="font-mono text-xl font-bold text-white leading-none mb-1">John Doe CV</h3>
                        <p className="font-mono text-[11px] text-[#888888] mt-1">
                          john.doe@email.com | (555) 123-4567 | San Francisco, CA
                        </p>
                      </div>

                      <div className="my-4 space-y-4 text-left pr-2 overflow-y-auto max-h-[350px]">
                        
                        <div>
                          <h4 className="font-mono text-[11px] text-[#0070F3] uppercase tracking-wider font-bold mb-1.5">Professional summary</h4>
                          <p className="font-sans text-[#c1c6d7] leading-relaxed text-xs">
                            {activeReport.summaryFeedback?.original || 'Experienced candidate seeking growth opportunities.'}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#1F1F1F]">
                          <h4 className="font-mono text-[11px] text-[#0070F3] uppercase tracking-wider font-bold mb-1.5">Job Experience</h4>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-baseline mb-1">
                                <h5 className="font-mono text-xs font-bold text-white">Lead Systems Coordinator</h5>
                                <span className="font-mono text-[9px] text-[#888888]">2020 - PRESENT</span>
                              </div>
                              <p className="font-mono text-[10px] text-[#aec6ff] font-semibold mb-1">Enterprise Core Systems Inc.</p>
                              <ul className="list-disc pl-4 space-y-1.5 font-sans text-[11px] text-[#c1c6d7] mt-2 pr-2">
                                {activeReport.bulletImprovements?.map((b: any, index: number) => (
                                  <li key={index} className={`${b.applied ? 'text-[#E4F222] font-semibold' : 'text-[#c1c6d7]'}`}>
                                    {b.applied ? b.improved : b.original}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#1F1F1F]">
                          <h4 className="font-mono text-[11px] text-[#0070F3] uppercase tracking-wider font-bold mb-1.5">Technical Skills</h4>
                          <p className="font-mono text-xs text-[#c1c6d7] leading-relaxed font-semibold">
                            {activeReport.missingSkills?.length > 0 ? 'React, Node.js, Express, Javascript, TypeScript, Git' : 'Full ATS Keywords matching target profile requirements.'}
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* RIGHT COLUMN: ANALYTICAL METRICS REPORT */}
                  <div className="lg:col-span-7 flex flex-col gap-6 select-none">
                    
                    {/* OVERALL SCORE PANEL */}
                    <div className="bg-[#08090A] border border-[#1F1F1F] rounded-sm p-5 flex items-center justify-between">
                      <div>
                        <h3 className="font-mono text-lg font-bold text-white leading-none">Computational System Score</h3>
                        <p className="font-sans text-xs text-[#888888] pr-3 mt-1.5 leading-relaxed">
                          Consolidated analysis calculated over standard recursive parsing and keyword checks.
                        </p>
                      </div>

                      {/* Score circle */}
                      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" fill="none" r="44" stroke="#1F1F1F" strokeWidth="6" />
                          <circle cx="50" cy="50" fill="none" r="44" stroke={activeReport.overallScore >= 80 ? '#E4F222' : '#0070F3'} strokeWidth="6" strokeDasharray="276" strokeDashoffset={276 - (activeReport.overallScore * 2.76)} strokeLinecap="round" />
                        </svg>
                        <span className="font-mono text-4xl font-extrabold text-white leading-none">{activeReport.overallScore}</span>
                      </div>
                    </div>

                    {/* ATS SCORING BREAKDOWN GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      
                      <div className="bg-[#08090A] border border-[#1F1F1F] rounded-sm p-4 flex flex-col justify-between h-20">
                        <span className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-wider">Keyword Overlap</span>
                        <div className="font-mono text-2xl font-bold text-[#0070F3] tabular-nums mt-1">{activeReport.metrics?.keywordMatch || 0}%</div>
                      </div>

                      <div className="bg-[#08090A] border border-[#1F1F1F] rounded-sm p-4 flex flex-col justify-between h-20">
                        <span className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-wider">Parsability bots</span>
                        <div className="font-mono text-2xl font-bold text-[#E4F222] tabular-nums mt-1">{activeReport.metrics?.parsability || 0}%</div>
                      </div>

                      <div className="bg-[#08090A] border border-[#1F1F1F] rounded-sm p-4 flex flex-col justify-between h-20">
                        <span className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-wider">Formatting flow</span>
                        <div className="font-mono text-2xl font-bold text-white tabular-nums mt-1">{activeReport.metrics?.formatting || 0}%</div>
                      </div>

                    </div>

                    {/* DYNAMIC COMPONENT RECOMMENDATIONS LIST */}
                    <div className="space-y-6">
                      
                      {/* HIGH IMPACT ADVISORY CARD */}
                      <div className="bg-[#08090A] border-l-4 border-[#FF4D4D] border border-[#1F1F1F] rounded-sm p-5 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-3 border-b border-[#1F1F1F] pb-2">
                          <div className="flex items-center gap-1.5 text-[#FF4D4D] font-mono text-xs font-bold uppercase">
                            <AlertTriangle size={14} />
                            <span>Structural Summary Feedback</span>
                          </div>
                          <span className="bg-[#FF4D4D]/10 text-[#FF4D4D] font-mono text-[9px] font-bold border border-[#FF4D4D]/25 px-2 py-0.5 uppercase">
                            {activeReport.summaryFeedback?.impactLevel || 'High Impact'}
                          </span>
                        </div>
                        
                        <p className="font-sans text-xs text-[#888888] leading-relaxed mb-4 pr-3">
                          Summary is passive and list-oriented. We generated a metrics-based high-stakes rewrite to secure recruiters interest.
                        </p>

                        {/* Side-by-Side Diffs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono leading-relaxed mt-4">
                          
                          <div className="p-3 bg-[#111111] border border-[#1F1F1F] rounded-sm">
                            <span className="text-[#888888] text-[9px] font-bold uppercase block mb-1.5">&larr; Original Passive Summary</span>
                            <span className="text-[#888888]">{activeReport.summaryFeedback?.original}</span>
                          </div>

                          <div className="p-3 bg-[#0070F3]/10 border border-[#0070F3]/30 rounded-sm">
                            <span className="text-[#0070F3] text-[9px] font-bold uppercase block mb-1.5">&#10024; AI Improved Active summary</span>
                            <span className="text-[#aec6ff] font-medium">{activeReport.summaryFeedback?.improved}</span>
                          </div>

                        </div>

                        {/* Action trigger apply changes */}
                        <div className="mt-4 flex justify-end">
                          <button 
                            onClick={() => handleApplyFix('summary')}
                            className="bg-[#0070F3] text-white font-mono text-xs font-bold uppercase py-2 px-4 hover:bg-[#0059c5] transition-all cursor-pointer"
                          >
                            Apply summary Optimization
                          </button>
                        </div>
                      </div>

                      {/* WORK BULLET EXAMINATIONS CARD */}
                      <div className="bg-[#08090A] border-l-4 border-[#E4F222] border border-[#1F1F1F] rounded-sm p-5 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-3 border-b border-[#1F1F1F] pb-2">
                          <div className="flex items-center gap-1.5 text-[#E4F222] font-mono text-xs font-bold uppercase">
                            <Sparkles size={14} />
                            <span>Suggested Experience Bullet Enhancements</span>
                          </div>
                          <span className="bg-[#E4F222]/10 text-[#E4F222] font-mono text-[9px] font-bold border border-[#E4F222]/25 px-2 py-0.5 uppercase">
                            Outcomes Deficit
                          </span>
                        </div>

                        <p className="font-sans text-xs text-[#888888] leading-relaxed pr-3 mb-4">
                          Review recommended outcome-driven rewrites. ATS parsers match keywords inside achievements.
                        </p>

                        <div className="space-y-3 font-mono text-xs pr-2 overflow-y-auto max-h-[170px]">
                          {activeReport.bulletImprovements?.map((b: any, index: number) => (
                            <div key={index} className="p-3.5 bg-[#111111] border border-[#1F1F1F] rounded-sm space-y-2">
                              <div className="flex justify-between items-center text-[10px] pb-1.5 border-b border-[#1F1F1F] font-bold uppercase mb-1">
                                <span className="text-[#888888] font-bold">Original Experience line:</span>
                                {b.applied ? (
                                  <span className="text-[#E4F222] font-bold uppercase bg-[#E4F222]/10 border border-[#E4F222]/25 px-2 py-0.5 text-[9px]">
                                    ✓ Active Draft
                                  </span>
                                ) : (
                                  <button 
                                    onClick={() => handleApplyFix('bullet', index)}
                                    className="text-[#0070F3] hover:underline font-extrabold font-mono uppercase cursor-pointer"
                                  >
                                    [Apply rewrite]
                                  </button>
                                )}
                              </div>
                              <p className="text-[#888888] italic">"{b.original}"</p>
                              
                              <div className="text-[10px] text-[#0070F3] uppercase font-bold pt-1.5">
                                ✦ Dynamic Metrics Inject:
                              </div>
                              <p className="text-[#aec6ff] font-medium leading-relaxed">"{b.improved}"</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              ) : (
                <div className="p-12 border border-[#1F1F1F] rounded-sm text-center text-[#888888] font-mono bg-[#08090A]">
                  Loading workspace matrices... Choose or upload a workspace.
                </div>
              )}

            </div>
          )}

          {/* ========================================== */}
          {/* TAB 4: ATS COMPARISON VIEW */}
          {/* ========================================== */}
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              
              {/* BRAND HEADER */}
              <div className="flex justify-between items-end border-b border-[#1F1F1F] pb-5 select-none">
                <div>
                  <h2 className="font-sans text-3xl font-bold tracking-tight text-white mb-1">ATS Score Comparison</h2>
                  <p className="font-mono text-xs text-[#888888] mt-1">
                    Side-by-side metric alignment and outcome-based keyword differences.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleDownloadTxt}
                    className="px-4 py-2 border border-[#1F1F1F] bg-[#111111] hover:bg-[#1A1A1A] hover:border-[#aec6ff]/35 transition-colors text-white font-mono text-xs font-semibold leading-none flex items-center justify-center select-none cursor-pointer"
                  >
                    Export Word (.docx)
                  </button>
                </div>
              </div>

              {activeResume && activeReport ? (
                <>
                  {/* METRIC DIFFERENCES PANEL HEADER */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                     {/* ORIGINAL VALUE */}
                    <div className="md:col-span-4 bg-[#08090A] border border-[#1F1F1F] rounded-sm p-5 flex flex-col items-center justify-center relative min-h-[220px]">
                      <div className="absolute top-4 left-5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#FF4D4D]" />
                        <span className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-wider">Original Base</span>
                      </div>

                      <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" fill="none" r="42" stroke="#1F1F1F" strokeWidth="6" />
                          <circle cx="50" cy="50" fill="none" r="42" stroke="#FF4D4D" strokeWidth="6" strokeDasharray="264" strokeDashoffset="200" strokeLinecap="round" />
                        </svg>
                        <span className="absolute font-mono text-3xl font-black text-white leading-none">28</span>
                      </div>
                      <span className="font-mono text-[9px] text-[#FF4D4D] uppercase tracking-wider font-bold">Needs Improvement</span>
                    </div>
                    {/* IMPROVED VALUE */}
                    <div className="md:col-span-4 bg-[#08090A] border border-[#1F1F1F] rounded-sm p-5 flex flex-col items-center justify-center relative min-h-[220px]">
                      <div className="absolute top-4 left-5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E4F222] animate-pulse" />
                        <span className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-wider">AI Optimized</span>
                      </div>

                      <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" fill="none" r="42" stroke="#1F1F1F" strokeWidth="6" />
                          <circle cx="50" cy="50" fill="none" r="42" stroke={activeReport.overallScore >= 80 ? '#E4F222' : '#0070F3'} strokeWidth="6" strokeDasharray="264" strokeDashoffset={264 - (activeReport.overallScore * 2.64)} strokeLinecap="round" />
                        </svg>
                        <span className="absolute font-mono text-3xl font-black text-white leading-none">{activeReport.overallScore}</span>
                      </div>
                      <span className="font-mono text-[9px] text-[#E4F222] uppercase tracking-wider font-bold">Highly Competitive</span>
                    </div>
                    {/* VALUE GAINS CARDS */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                      <div className="bg-[#08090A] border border-[#1F1F1F] p-4 rounded-sm flex flex-col justify-center flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-wider">Keyword Match Margin</span>
                          <span className="font-mono text-[9px] text-[#E4F222] font-bold bg-[#E4F222]/10 border border-[#E4F222]/25 px-2.5 py-0.5 rounded-sm shrink-0">+18%</span>
                        </div>
                        <div className="font-mono text-xl font-bold text-white mt-1">36% to 78%</div>
                      </div>

                      <div className="bg-[#08090A] border border-[#1F1F1F] p-4 rounded-sm flex flex-col justify-center flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-wider">Structural parse read</span>
                          <span className="font-mono text-[9px] text-[#E4F222] font-bold bg-[#E4F222]/10 border border-[#E4F222]/25 px-2.5 py-0.5 rounded-sm shrink-0">+11%</span>
                        </div>
                        <div className="font-mono text-xl font-bold text-white mt-1">39% to 90%</div>
                      </div>

                      <div className="bg-[#08090A] border border-[#1F1F1F] p-4 rounded-sm flex flex-col justify-center flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-wider">Impact verbs outcome</span>
                          <span className="font-mono text-[9px] text-[#E4F222] font-bold bg-[#E4F222]/10 border border-[#E4F222]/25 px-2.5 py-0.5 rounded-sm shrink-0">+24%</span>
                        </div>
                        <div className="font-mono text-xl font-bold text-white mt-1">34% to 80%</div>
                      </div>
                    </div>

                  </div>

                  {/* DIFFERENCES DETAILS */}
                  <div className="mt-8">
                    <h3 className="font-mono text-sm font-bold text-white border-b border-[#1F1F1F] pb-3 mb-5 uppercase tracking-wider">
                      Content Enhancements Comparisons
                    </h3>

                    <div className="space-y-4">
                      {activeReport.bulletImprovements?.map((b: any, i: number) => (
                        <div key={i} className="bg-[#08090A] border border-[#1F1F1F] rounded-sm flex flex-col md:flex-row overflow-hidden relative">
                          {b.applied && (
                            <span className="absolute top-0 right-0 bg-[#E4F222]/10 border-b border-l border-[#E4F222]/25 px-2.5 py-1 text-[#E4F222] font-mono text-[9px] uppercase tracking-wider font-extrabold">
                              Applied Fix ✓
                            </span>
                          )}

                          {/* LEFT INPUT AREA */}
                          <div className="flex-1 p-5 bg-[#111111]/45 border-b md:border-b-0 md:border-r border-[#1F1F1F]">
                            <h4 className="font-mono text-[9px] text-[#888888] font-bold uppercase mb-1.5">Original Line:</h4>
                            <p className="font-sans text-xs text-[#888888] leading-relaxed italic pr-2 mb-2">
                              "{b.original}"
                            </p>
                            <span className="font-mono text-[9px] text-[#FF4D4D] uppercase tracking-wider font-extrabold">
                              ⚠️ Weak verbs / Zero outcome percentages
                            </span>
                          </div>

                          {/* RIGHT AI DESIGN */}
                          <div className="flex-grow p-5 bg-[#08090A]">
                            <h4 className="font-mono text-[9px] text-[#0070F3] font-bold uppercase mb-1.5">AI Optimized Injected outcomes:</h4>
                            <p className="font-sans text-xs text-[#aec6ff] leading-relaxed font-semibold pr-2 mb-2">
                              "{b.improved}"
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {b.diffTags?.map((tag: string, tid: number) => (
                                <span key={tid} className="bg-[#0070F3]/10 text-[#0070F3] font-mono text-[9px] font-bold px-2 py-0.5 border border-[#0070F3]/30 rounded-sm">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PASTE DYNAMIC JOB DESCRIPTION TESTBED MODULE */}
                  <div className="bg-[#08090A] p-5 border border-[#1F1F1F] rounded-sm mt-8">
                    <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#888888] border-b border-[#1F1F1F] pb-3 mb-1">
                      Live Gap Analysis Testbed Simulator
                    </h3>
                    <p className="font-sans text-xs text-[#888888] mb-4 pr-2 leading-relaxed">
                      Pasted custom job description to check matching keywords and gap coverage scores. Output calculated dynamically.
                    </p>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                        <div>
                          <label className="font-mono text-[9px] text-[#888888] font-bold uppercase block mb-1.5">Target Role Context</label>
                          <input 
                            type="text" 
                            value={customRole}
                            onChange={(e) => setCustomRole(e.target.value)}
                            className="w-full bg-[#111111] border border-[#1F1F1F] rounded-sm text-xs py-2 px-3 text-white focus:outline-none focus:border-[#aec6ff]/40 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-mono text-[9px] text-[#888888] font-bold uppercase block mb-1.5">Paste Job Description Requirements</label>
                        <textarea 
                          rows={3}
                          value={jdText}
                          onChange={(e) => setJdText(e.target.value)}
                          placeholder="Paste matching JD bullet list here..."
                          className="w-full bg-[#111111] border border-[#1F1F1F] rounded-sm text-xs p-3 text-white focus:outline-none focus:border-[#aec6ff]/40 font-sans placeholder-[#444]"
                        />
                      </div>

                      <div className="flex justify-end pt-xs">
                        <button 
                          onClick={handleJobMatch}
                          disabled={isMatching}
                          className="bg-[#0070F3] text-white font-mono text-xs px-4 py-2 hover:bg-[#005cbb] transition-all flex items-center gap-1.5 select-none cursor-pointer"
                        >
                          {isMatching ? 'Processing Gap Indexes...' : 'Compare Against pasting JD'}
                        </button>
                      </div>

                      {/* Display calculations overlaps result */}
                      {matchingResult && (
                        <div className="mt-5 p-4 bg-[#111111]/80 border border-[#1F1F1F] rounded-sm space-y-4">
                          <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-2">
                            <span className="font-mono text-[9px] text-[#E4F222] uppercase font-bold">Overlap Evaluation Complete</span>
                            <span className="font-mono text-xs text-white mb-0.5">Estimated Match Score: <strong className="text-[#E4F222] font-bold font-mono">{matchingResult.atsMatchScore}%</strong></span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs leading-relaxed">
                            <div>
                               <span className="text-[#E4F222] font-mono text-[9px] uppercase font-bold block mb-1.5">✓ Matched Competencies Found:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {matchingResult.gapAnalysis.matchedSkills.map((s: string, id: number) => (
                                  <span key={id} className="bg-[#E4F222]/10 text-[#E4F222] px-2.5 py-0.5 rounded-sm text-[9px] font-bold border border-[#E4F222]/25 uppercase tracking-wide">{s}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                               <span className="text-[#FF4D4D] font-mono text-[9px] uppercase font-bold block mb-1.5">✗ Missing Requirements Missing:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {matchingResult.gapAnalysis.missingSkills.map((s: string, id: number) => (
                                  <span key={id} className="bg-[#FF4D4D]/10 text-[#FF4D4D] px-2.5 py-0.5 rounded-sm text-[9px] font-bold border border-[#FF4D4D]/25 uppercase tracking-wide">{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </>
              ) : (
                <div className="p-12 border border-[#1F1F1F] rounded-sm text-center text-[#888888] font-mono bg-[#08090A]">
                  Loading analysis reports targets... Upload preset file to start.
                </div>
              )}

            </div>
          )}

          {/* ========================================== */}
          {/* TAB 5: SETTINGS & DEVOPS AUDIT VIEW */}
          {/* ========================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 select-none">
              
              {/* BRAND HEADER */}
              <div className="flex justify-between items-end border-b border-[#1F1F1F] pb-5">
                <div>
                  <h2 className="font-mono text-lg font-bold tracking-wider text-white mb-1 uppercase">Platform Settings</h2>
                  <p className="font-sans text-[11px] text-[#888888] mt-1">Review live request telemetry logging streams and cluster indices.</p>
                </div>
              </div>

              {/* SERVICE PARAMETERS GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* SETTINGS CARD COLUMN */}
                <div className="lg:col-span-1 space-y-4 font-sans text-xs leading-relaxed">
                  
                  {/* QUOTA PREFERENCES CARD */}
                  <div className="bg-[#08090A] p-5 border border-[#1F1F1F] rounded-sm space-y-3">
                    <h3 className="text-[#0070F3] font-mono text-[9px] font-bold uppercase tracking-wider border-b border-[#1F1F1F] pb-2 mb-2">AI CONFIG PARAMETERS</h3>
                    <div>
                      <span className="text-[#888888] font-bold block mb-1">Scoring parameters weights:</span>
                      <p className="text-white font-medium font-mono text-xs">Keywords: 30% | Formatting: 10% | Impact: 30% | Readability: 10%</p>
                    </div>
                  </div>

                  {/* CREDENTIALS METRIC */}
                  <div className="bg-[#111111]/50 p-5 border border-[#1F1F1F] rounded-sm space-y-3">
                    <h3 className="text-[#E4F222] font-mono text-[9px] font-bold uppercase tracking-wider border-b border-[#1F1F1F] pb-2 mb-2">DEPLOYMENT LOG SUMMARY</h3>
                    <div className="space-y-1.5 text-[#888888]">
                      <span className="text-white block font-bold text-xs mb-1">Runtime: Cloud Run Microcontainer</span>
                      <p className="font-mono text-[11px] text-[#888888]">Port Bind: 3000 (Proxy Routing Active)</p>
                      <p className="font-mono text-[11px] text-[#888888]">Database: Local Persistent JSON-DB FS wrapper</p>
                      <p className="font-mono text-[11px] text-[#888888]">Linter: tsc Compiler Compliant</p>
                    </div>
                  </div>

                </div>

                {/* TELEMETRY LOGGER PANEL */}
                <div className="lg:col-span-2 bg-[#08090A] border border-[#1F1F1F] rounded-sm flex flex-col min-h-[400px]">
                  <div className="p-4 bg-[#111111] border-b border-[#1F1F1F] rounded-t-none flex items-center justify-between font-mono text-[9px] uppercase font-bold tracking-wider text-[#aec6ff] pt-3 pb-3">
                    <div className="flex items-center gap-1.5">
                      <Terminal size={14} className="text-[#0070F3]" />
                      <span>SaaS Operations & Audit Trail Logs</span>
                    </div>
                    <span className="text-[#888888] font-medium lowercase">Real-time DB query streams</span>
                  </div>

                  {/* LOGS INNER PANEL */}
                  <div className="p-5 flex-grow overflow-y-auto max-h-[360px] font-mono text-[10px] leading-relaxed text-[#888888] space-y-4">
                    {auditLogs.length === 0 ? (
                      <p className="text-[#888888] italic font-mono py-4 text-center">No active audit traces logged yet. Process resumes triggers to append log events.</p>
                    ) : (
                      auditLogs.map((log) => (
                        <div key={log._id} className="p-3.5 bg-[#111111]/45 border border-[#1F1F1F] rounded-none relative">
                          <span className="absolute top-3.5 right-4 text-[#888888] text-[9px] font-medium">{new Date(log.timestamp).toLocaleTimeString()}</span>
                          <span className="text-[#E4F222] uppercase font-bold font-mono text-[10px]">[{log.action}]</span>
                          <p className="text-white mt-1.5 font-medium">Resource hit: <code className="bg-[#08090A] px-1 py-0.5 rounded-none text-[10.5px] font-mono border border-[#1F1F1F] text-[#aec6ff]">{log.resource}</code></p>
                          <p className="text-[#888888] text-[9px] mt-1 font-mono">Machine origin keys: {log.ipAddress} | {log.userAgent.substring(0, 40)}...</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
              
            </div>
          )}

        </main>
      </section>

      {/* ========================================== */}
      {/* MODAL: CUSTOM DEVICE FILE UPLOADER */}
      {/* ========================================== */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-text">
          <div className="bg-[#08090A] border border-[#1F1F1F] w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col animate-fade-in">
            
            {/* Header */}
            <div className="p-5 border-b border-[#1F1F1F] flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <Upload size={16} className="text-[#0070F3]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">Upload Device Resume</h3>
              </div>
              <button 
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadError('');
                }}
                className="text-[#888888] hover:text-white font-mono text-[10px] uppercase border border-[#1F1F1F] px-2 py-1 hover:bg-[#111111] transition-all"
              >
                Close
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh] font-sans text-xs">
              
              {/* Drag Area */}
              <div 
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const files = e.dataTransfer.files;
                  if (files && files.length > 0) {
                    handleFileSelection(files[0]);
                  }
                }}
                onClick={() => {
                  document.getElementById('custom-file-input')?.click();
                }}
                className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all ${isDragging ? 'border-[#0070F3] bg-[#0070F3]/10 text-white' : 'border-[#1F1F1F] hover:border-[#888888]/55 text-[#888888]'}`}
              >
                <input 
                  id="custom-file-input"
                  type="file" 
                  accept=".txt,.md,.pdf,.docx"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      handleFileSelection(files[0]);
                    }
                  }}
                  className="hidden" 
                />
                <div className="flex flex-col items-center justify-center gap-3 select-none">
                  <div className="p-3 bg-[#111111] rounded-full text-[#0070F3] border border-[#1F1F1F]">
                    <Upload size={22} />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase text-white tracking-wider">Drag CV/Resume from Device or Click to Browse</p>
                    <p className="text-[10px] text-[#888888] mt-1.5 font-mono">Accepts PDF, DOCX, Markdown, or Plain Text (.txt, .md, .pdf, .docx)</p>
                  </div>
                </div>
              </div>

              {/* LinkedIn Option inside Modal */}
              <div className="flex items-center gap-4 select-none">
                <div className="h-px bg-[#1F1F1F] flex-grow" />
                <span className="font-mono text-[10px] text-[#888888] lowercase">or sync with social</span>
                <div className="h-px bg-[#1F1F1F] flex-grow" />
              </div>

              <div className="flex justify-center select-none">
                <button 
                  onClick={() => {
                    setShowUploadModal(false);
                    handleConnectLinkedIn();
                  }}
                  className="font-mono text-xs py-2.5 px-6 bg-[#0077b5] text-white hover:bg-[#005987] transition-colors rounded-sm flex items-center gap-2 border-0 uppercase font-bold cursor-pointer w-full justify-center"
                >
                  <Linkedin size={15} />
                  <span>Fetch Profile Data from LinkedIn</span>
                </button>
              </div>

              {/* Status and Name */}
              {customFileName && (
                <div className="bg-[#111111]/80 border border-[#1F1F1F] p-4 rounded-sm space-y-3 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#888888] uppercase">Selected Document:</span>
                    <span className="text-[#E4F222] font-bold text-[10px] animate-pulse">Ready</span>
                  </div>
                  <div className="text-white text-xs font-bold truncate flex items-center gap-1.5">
                    <FileText size={14} className="text-[#0070F3]" />
                    {customFileName}
                  </div>
                </div>
              )}

              {/* Editing Box */}
              {customFileName && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-wider block">Raw resume text workspace</label>
                    <span className="font-mono text-[9px] text-[#888888] font-medium lowercase">Edit or paste directly to perfect parameters alignment</span>
                  </div>
                  <textarea 
                    rows={8}
                    value={customFileContent}
                    onChange={(e) => setCustomFileContent(e.target.value)}
                    placeholder="Candidate summary developer experience text..."
                    className="w-full bg-[#111111] border border-[#1F1F1F] rounded-sm text-xs p-3 text-white focus:outline-none focus:border-[#0070F3] font-mono leading-relaxed"
                  />
                </div>
              )}

              {/* Advanced Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono select-none">
                <div>
                  <label className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-wider block mb-1.5">Target Job Role Calibration</label>
                  <select
                    value={customTargetRole}
                    onChange={(e) => setCustomTargetRole(e.target.value)}
                    className="w-full bg-[#111111] border border-[#1F1F1F] text-xs py-2 px-3 text-white focus:outline-none focus:border-[#0070F3]"
                  >
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Data Scientist">Data Scientist</option>
                  </select>
                </div>
              </div>

              {uploadError && (
                <div className="p-3.5 bg-[#FF4D4D]/10 border border-[#FF4D4D]/20 text-[#FF4D4D] text-xs rounded-sm font-mono flex items-center gap-2">
                  <AlertTriangle size={15} />
                  <span>{uploadError}</span>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-5 border-t border-[#1F1F1F] flex items-center justify-end gap-3 bg-[#111111]/30 select-none">
              <button 
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadError('');
                }}
                className="font-mono text-xs text-[#888888] hover:text-white border border-transparent hover:border-[#1F1F1F] px-4 py-2 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleCustomUploadSubmit}
                className="bg-[#0070F3] text-white font-mono text-xs px-5 py-2 hover:bg-[#005cbb] transition-all flex items-center gap-1.5 uppercase tracking-wide font-bold"
              >
                <Upload size={14} />
                <span>Initialize ATS Scans</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
