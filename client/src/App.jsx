import React, { useState } from 'react';
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
  Code2,
  Database
} from 'lucide-react';


/**
 * --- DESIGN SYSTEM & THEME CONFIGURATION ---
 * Theme: Monochromatic Zinc (Professional, Clean, High-Contrast)
 * Background: Zinc-950
 * Text: Zinc-50
 * Accents: Zinc-800/Zinc-600
 */

// 1. REUSABLE UI COMPONENT: BUTTON
const Button = ({ children, variant = 'primary', className = '', onClick, type = "button" }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-zinc-100 text-zinc-950 hover:bg-zinc-200 border border-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    secondary: "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-50 hover:border-zinc-700",
    ghost: "bg-transparent text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
  };

  return (
    <button 
      type={type} 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// 2. REUSABLE UI COMPONENT: INPUT FIELD
const Input = ({ label, type = "text", placeholder, icon: Icon, value, onChange }) => (
  <div className="space-y-2">
    {label && <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">{label}</label>}
    <div className="relative group">
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Icon className="w-5 h-5 text-zinc-500 group-focus-within:text-zinc-100 transition-colors" />
        </div>
      )}
      <input
        type={type}
        className={`w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 rounded-lg py-3 ${Icon ? 'pl-11' : 'px-4'} pr-4 focus:ring-1 focus:ring-zinc-100 focus:border-zinc-100 outline-none transition-all placeholder:text-zinc-600`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

// 3. REUSABLE UI COMPONENT: CARD
const Card = ({ children, className = '' }) => (
  <div className={`bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 p-8 rounded-2xl ${className}`}>
    {children}
  </div>
);

// --- PAGE: LANDING PAGE ---
const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-800">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-zinc-950" />
            </div>
            <span className="font-bold text-xl tracking-tight">Trade<span className="text-zinc-500">Sync</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">Features</button>
            <button className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">Analytics</button>
            <button className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">Pricing</button>
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

      {/* Hero Section */}
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
              <Button variant="secondary" className="h-14 px-8 text-base">
                View Demo
              </Button>
            </div>
            
            <div className="pt-12 flex items-center gap-8 text-zinc-500">
              <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Secure</div>
              <div className="flex items-center gap-2"><Zap className="w-5 h-5" /> Real-time</div>
              <div className="flex items-center gap-2"><Database className="w-5 h-5" /> Scalable</div>
            </div>
          </div>

          {/* Abstract Hero Graphic */}
          <div className="relative">
            <div className="absolute -inset-4 bg-zinc-800/20 rounded-full blur-3xl"></div>
            <Card className="relative bg-zinc-950/80 border-zinc-800">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-zinc-500 uppercase">Current Balance</p>
                    <p className="text-2xl font-bold">$124,592.00</p>
                  </div>
                  <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                    +2.4%
                  </div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 1 ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                          {i === 1 ? 'BTC' : 'ETH'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">{i === 1 ? 'Bitcoin' : 'Ethereum'}</p>
                          <p className="text-xs text-zinc-500">Long Position</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-zinc-200">+{i * 12}.5%</p>
                        <p className="text-xs text-zinc-500">Just now</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- PAGE: AUTH PAGE (Login/Register) ---
const AuthPage = ({ mode = 'login', onNavigate }) => {
  const isLogin = mode === 'login';

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-zinc-900 to-transparent pointer-events-none"></div>
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-xl mb-4 shadow-lg shadow-zinc-900/50">
            <BarChart3 className="w-6 h-6 text-zinc-950" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-50">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-zinc-400">
            {isLogin ? 'Enter your credentials to access your dashboard.' : 'Start your journey with TradeSync today.'}
          </p>
        </div>

        <Card className="backdrop-blur-xl bg-zinc-900/60 shadow-2xl">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Step 2 will handle Backend connection!"); }}>
            {!isLogin && (
              <Input 
                label="Full Name" 
                placeholder="John Doe" 
                icon={User} 
              />
            )}
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="name@company.com" 
              icon={User} 
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              icon={Lock} 
            />

            <Button className="w-full h-12 text-base shadow-lg shadow-zinc-950/20" type="submit">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <p className="text-sm text-zinc-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => onNavigate(isLogin ? 'register' : 'login')} 
                className="font-semibold text-zinc-100 hover:underline underline-offset-4"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </Card>
        
        <button onClick={() => onNavigate('landing')} className="mt-8 w-full text-zinc-500 hover:text-zinc-300 text-sm flex items-center justify-center gap-2 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Home
        </button>
      </div>
    </div>
  );
};

// --- MAIN APP ORCHESTRATOR ---
const App = () => {
  // Simple state-based router for the preview
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'login', 'register', 'dashboard'

  const navigate = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="font-sans antialiased text-zinc-50 bg-zinc-950">
      {currentView === 'landing' && <LandingPage onNavigate={navigate} />}
      {currentView === 'login' && <AuthPage mode="login" onNavigate={navigate} />}
      {currentView === 'register' && <AuthPage mode="register" onNavigate={navigate} />}
      {/* Dashboard will be built in Step 4, but let's add a placeholder just in case */}
      {currentView === 'dashboard' && (
        <div className="flex items-center justify-center min-h-screen text-2xl font-bold text-zinc-500">
          Dashboard Coming in Step 4...
        </div>
      )}
    </div>
  );
};

export default App;