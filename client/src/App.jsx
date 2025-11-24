import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ArrowRight, 
  Lock, 
  User, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Menu, 
  X,
  ChevronRight,
  Database,
  Loader2
} from 'lucide-react';

/**
 * --- CONFIGURATION ---
 */
const API_URL = 'http://localhost:5000/api/auth';

/**
 * --- DESIGN SYSTEM ---
 */
const Button = ({ children, variant = 'primary', className = '', onClick, type = "button", disabled }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-zinc-100 text-zinc-950 hover:bg-zinc-200 border border-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    secondary: "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-50 hover:border-zinc-700",
    ghost: "bg-transparent text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
  };

  return (
    <button type={type} className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

const Input = ({ label, type = "text", placeholder, icon: Icon, name, value, onChange, required }) => (
  <div className="space-y-2">
    {label && <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">{label}</label>}
    <div className="relative group">
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Icon className="w-5 h-5 text-zinc-500 group-focus-within:text-zinc-100 transition-colors" />
        </div>
      )}
      <input
        name={name}
        type={type}
        required={required}
        className={`w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 rounded-lg py-3 ${Icon ? 'pl-11' : 'px-4'} pr-4 focus:ring-1 focus:ring-zinc-100 focus:border-zinc-100 outline-none transition-all placeholder:text-zinc-600`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 p-8 rounded-2xl ${className}`}>
    {children}
  </div>
);

// --- PAGE: LANDING PAGE ---
const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-800">
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-zinc-950" />
            </div>
            <span className="font-bold text-xl tracking-tight">Trade<span className="text-zinc-500">Sync</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('login')} className="text-sm font-medium text-zinc-300 hover:text-zinc-50 transition-colors">
              Log in
            </button>
            <Button onClick={() => onNavigate('register')} className="hidden sm:flex">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              v2.0 is now live
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
              Master your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">
                trading journal.
              </span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
              The professional dashboard for crypto analysts. Track trades, manage entities, and scale your portfolio with meaningful data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={() => onNavigate('register')} className="h-14 px-8 text-base">
                Start Trading Now <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          {/* Abstract Hero Graphic */}
          <div className="relative">
            <div className="absolute -inset-4 bg-zinc-800/20 rounded-full blur-3xl"></div>
            <Card className="relative bg-zinc-950/80 border-zinc-800">
               {/* Hero Content Placeholder */}
               <div className="text-center text-zinc-500 py-10">Live Market Data Preview</div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- PAGE: AUTH PAGE (CONNECTED TO BACKEND) ---
const AuthPage = ({ mode = 'login', onNavigate, onLoginSuccess }) => {
  const isLogin = mode === 'login';
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.msg || 'Authentication failed');

      // Success: Save Token
      localStorage.setItem('token', data.token);
      onLoginSuccess(data.user);
      onNavigate('dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-bold text-zinc-50">{isLogin ? 'Welcome back' : 'Create account'}</h2>
          <p className="text-zinc-400">{isLogin ? 'Enter your credentials to access.' : 'Start your journey today.'}</p>
        </div>

        <Card className="backdrop-blur-xl bg-zinc-900/60 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <Input label="Full Name" name="fullName" placeholder="John Doe" icon={User} value={formData.fullName} onChange={handleChange} required />
            )}
            <Input label="Email Address" type="email" name="email" placeholder="name@company.com" icon={User} value={formData.email} onChange={handleChange} required />
            <Input label="Password" type="password" name="password" placeholder="••••••••" icon={Lock} value={formData.password} onChange={handleChange} required />

            <Button className="w-full h-12 text-base shadow-lg shadow-zinc-950/20" type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <p className="text-sm text-zinc-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => onNavigate(isLogin ? 'register' : 'login')} className="font-semibold text-zinc-100 hover:underline underline-offset-4">
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing token on load
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd verify this token with the backend here
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCurrentView('landing');
  };

  return (
    <div className="font-sans antialiased text-zinc-50 bg-zinc-950">
      {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
      {(currentView === 'login' || currentView === 'register') && (
        <AuthPage mode={currentView} onNavigate={setCurrentView} onLoginSuccess={setUser} />
      )}
      {currentView === 'dashboard' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold mb-4">Dashboard (Authenticated)</h1>
          <p className="text-zinc-400 mb-8">Welcome! You have successfully logged in.</p>
          <Button onClick={handleLogout} variant="secondary">Log Out</Button>
        </div>
      )}
    </div>
  );
};

export default App;