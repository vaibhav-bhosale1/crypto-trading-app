import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ArrowRight, Lock, User, BarChart3, ShieldCheck, Zap, Menu, X, ChevronRight, Database, Loader2, Plus, Trash2, Edit2, TrendingUp, TrendingDown 
} from 'lucide-react';

const API_URL = 'https://crypto-trading-app-mp5i.onrender.com/api';

// --- UI COMPONENTS ---
const Button = ({ children, variant = 'primary', className = '', onClick, type = "button", disabled }) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-zinc-100 text-zinc-950 hover:bg-zinc-200 border border-transparent",
    secondary: "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-50 hover:border-zinc-700",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40"
  };
  return <button type={type} className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick} disabled={disabled}>{children}</button>;
};

const Input = ({ label, type = "text", placeholder, name, value, onChange, required, step }) => (
  <div className="space-y-1.5">
    {label && <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">{label}</label>}
    <input
      name={name} type={type} required={required} step={step}
      className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 rounded-lg py-2.5 px-4 focus:ring-1 focus:ring-zinc-100 focus:border-zinc-100 outline-none transition-all placeholder:text-zinc-600"
      placeholder={placeholder} value={value} onChange={onChange}
    />
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 p-6 rounded-2xl ${className}`}>{children}</div>
);

// --- PAGES ---

// 1. Landing Page (Same as before)
const LandingPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-zinc-950 text-zinc-50">
    <nav className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl"><BarChart3 className="w-5 h-5" /> TradeSync</div>
        <div className="flex gap-4">
          <button onClick={() => onNavigate('login')} className="text-sm font-medium text-zinc-300 hover:text-white">Log in</button>
          <Button onClick={() => onNavigate('register')}>Get Started</Button>
        </div>
      </div>
    </nav>
    <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto text-center sm:text-left grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold tracking-tight leading-tight">Master your <span className="text-zinc-400">trading journal.</span></h1>
        <p className="text-xl text-zinc-500 max-w-lg">Track trades, manage entities, and scale your portfolio with meaningful data.</p>
        <Button onClick={() => onNavigate('register')} className="h-12 px-8 text-base">Start Trading Now <ArrowRight className="w-4 h-4 ml-2" /></Button>
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
    </main>
  </div>
);

// 2. Auth Page (Same as before)
const AuthPage = ({ mode, onNavigate, onLoginSuccess }) => {
  const isLogin = mode === 'login';
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Auth failed');
      localStorage.setItem('token', data.token);
      onLoginSuccess(data.user);
    } catch (err) { setError(err.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center"><h2 className="text-3xl font-bold text-white">{isLogin ? 'Welcome back' : 'Create account'}</h2></div>
        <Card>
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && <Input label="Name" name="fullName" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required />}
            <Input label="Email" type="email" name="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
            <Button className="w-full h-12" type="submit" disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Sign In' : 'Sign Up')}</Button>
          </form>
          <div className="mt-6 text-center text-sm text-zinc-500">
            <button onClick={() => onNavigate(isLogin ? 'register' : 'login')} className="hover:text-white underline">
              {isLogin ? 'Need an account? Sign up' : 'Have an account? Log in'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// 3. Dashboard Page (NEW CRUD LOGIC)
const Dashboard = ({ user, onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ ticker: '', entryPrice: '', positionType: 'Long', note: '' });

  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/notes`, {
        headers: { 'x-auth-token': token }
      });
      const data = await res.json();
      if (Array.isArray(data)) setNotes(data);
    } catch (err) { console.error("Error fetching notes", err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchNotes(); }, []);

  // Add Note
  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify(newNote)
      });
      if (res.ok) {
        setIsAdding(false);
        setNewNote({ ticker: '', entryPrice: '', positionType: 'Long', note: '' });
        fetchNotes(); // Refresh list
      }
    } catch (err) { console.error(err); }
  };

  // Delete Note
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <nav className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-lg flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-zinc-400" /> Dashboard</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400 hidden sm:inline">Welcome, {user?.fullName}</span>
            <Button variant="secondary" onClick={onLogout} className="text-xs h-9 px-3">Log Out</Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Your Trading Journal</h2>
          <Button onClick={() => setIsAdding(!isAdding)}>{isAdding ? 'Cancel' : 'Add New Trade'}</Button>
        </div>

        {/* Add Note Form */}
        {isAdding && (
          <Card className="mb-8 border-zinc-700 bg-zinc-900">
            <h3 className="text-lg font-semibold mb-4">Log New Trade</h3>
            <form onSubmit={handleAddNote} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Ticker (e.g. BTC)" value={newNote.ticker} onChange={e => setNewNote({...newNote, ticker: e.target.value})} required />
              <Input label="Entry Price" type="number" step="0.01" value={newNote.entryPrice} onChange={e => setNewNote({...newNote, entryPrice: e.target.value})} required />
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">Position</label>
                <select 
                  className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 rounded-lg py-2.5 px-4 focus:ring-1 focus:ring-zinc-100 outline-none"
                  value={newNote.positionType}
                  onChange={e => setNewNote({...newNote, positionType: e.target.value})}
                >
                  <option value="Long">Long 🟢</option>
                  <option value="Short">Short 🔴</option>
                </select>
              </div>
              <Input label="Notes" value={newNote.note} onChange={e => setNewNote({...newNote, note: e.target.value})} required placeholder="Why did you take this trade?" />
              <div className="md:col-span-2 pt-2">
                <Button type="submit" className="w-full">Save Trade Log</Button>
              </div>
            </form>
          </Card>
        )}

        {/* Notes Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-zinc-500" /></div>
        ) : notes.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 bg-zinc-900/20 rounded-xl border border-dashed border-zinc-800">
            <p>No trades logged yet. Start by adding one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Card key={note._id} className="relative group hover:border-zinc-600 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {note.ticker}
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${note.positionType === 'Long' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                        {note.positionType}
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">{new Date(note.date).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => handleDelete(note._id)} className="text-zinc-500 hover:text-red-500 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Entry</span>
                    <span className="font-mono">${note.entryPrice}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-sm text-zinc-400 line-clamp-3">{note.note}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // In a real app, verify token with backend here
    if (token) setCurrentView('dashboard');
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCurrentView('landing');
  };

  return (
    <div className="font-sans antialiased text-zinc-50 bg-zinc-950">
      {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
      {(currentView === 'login' || currentView === 'register') && (
        <AuthPage mode={currentView} onNavigate={setCurrentView} onLoginSuccess={handleLoginSuccess} />
      )}
      {currentView === 'dashboard' && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;