import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import api from '../lib/api.js';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .login-page { font-family: 'DM Sans', sans-serif; background: #FAF7F2; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px; position: relative; overflow: hidden; }
  .display { font-family: 'Cormorant Garamond', serif; }

  .login-page::before {
    content: ''; position: fixed; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at 25% 20%, #D4EEF240 0%, transparent 55%), radial-gradient(ellipse at 80% 75%, #ECE4FC44 0%, transparent 50%);
  }

  .login-card { background: #fff; border: 1px solid #EDE8E0; border-radius: 3px; padding: 44px 40px; width: 100%; max-width: 400px; position: relative; z-index: 2; box-shadow: 0 24px 64px rgba(26,26,46,0.07); }

  .tag { display: inline-flex; align-items: center; gap: 8px; font-size: 9px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: #5B8FA8; }
  .tag::before { content: ''; width: 20px; height: 1px; background: #5B8FA8; display: block; }

  .field-label { font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #9A90AE; margin-bottom: 7px; display: block; }

  .input-wrap { position: relative; }
  .input-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9BBFCC; }
  .field-input { width: 100%; padding: 10px 14px 10px 36px; font-family: 'DM Sans', sans-serif; font-size: 12px; color: #1A1A2E; background: #FAF7F2; border: 1px solid #EDE8E0; border-radius: 2px; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
  .field-input:focus { border-color: #5B8FA8; background: #fff; }
  .field-input::placeholder { color: #C4D8E0; }

  .btn-submit { width: 100%; padding: 12px; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: #1A1A2E; color: #FAF7F2; border: none; border-radius: 2px; cursor: pointer; transition: all 0.25s; }
  .btn-submit:hover { background: #2E2E48; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,26,46,0.25); }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .err-box { background: #FFF0EE; border: 1px solid #F5C4BC; border-radius: 2px; padding: 10px 14px; font-size: 11px; color: #C0392B; }
`;

const Wolf = ({ size = 36 }) => (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none">
        <defs>
            <linearGradient id="pa" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7C6FAB" /><stop offset="1" stopColor="#B8ADDC" stopOpacity=".9" /></linearGradient>
            <linearGradient id="pb" x1="1" y1="0" x2="0" y2="1"><stop stopColor="#5B8FA8" stopOpacity=".9" /><stop offset="1" stopColor="#9BBFCC" stopOpacity=".8" /></linearGradient>
        </defs>
        <polygon points="50,4 94,26 94,74 50,106 6,74 6,26" fill="none" stroke="#C4B8E8" strokeWidth="1.2" />
        <polygon points="50,10 72,30 50,24" fill="url(#pa)" /><polygon points="50,10 28,30 50,24" fill="url(#pb)" />
        <polygon points="64,54 50,24 50,70" fill="#B8ADDC" opacity=".8" /><polygon points="36,54 50,24 50,70" fill="#9B8EC7" opacity=".8" />
        <polygon points="50,70 80,82 20,82" fill="#7C6FAB" opacity=".4" />
        <ellipse cx="37" cy="37" rx="4.5" ry="5.5" fill="#5B8FA8" /><ellipse cx="63" cy="37" rx="4.5" ry="5.5" fill="#5B8FA8" />
        <ellipse cx="37" cy="38" rx="2.2" ry="3" fill="#1A1A2E" /><ellipse cx="63" cy="38" rx="2.2" ry="3" fill="#1A1A2E" />
        <circle cx="37.8" cy="36.5" r=".9" fill="#FAF7F2" opacity=".8" /><circle cx="63.8" cy="36.5" r=".9" fill="#FAF7F2" opacity=".8" />
    </svg>
);

const PartnerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setError('');
        try {
            const response = await api.post('/auth/partner-login', { email, password });
            login({ token: response.data.token, ...response.data.user });
            navigate('/dashboard');
        } catch (err) { setError(err.response?.data?.message || 'Login failed'); }
        finally { setLoading(false); }
    };

    return (
        <>
            <style>{STYLES}</style>
            <div className="login-page">
                {[[220, 220, '80%', '75%', '#9BBFCC18'], [140, 140, '72%', '82%', '#9BBFCC28']].map(([w, h, t, l, b], i) => (
                    <div key={i} style={{ position: 'fixed', top: t, left: l, width: w, height: h, borderRadius: '50%', border: `1px solid ${b}`, pointerEvents: 'none' }} />
                ))}

                <div className="login-card">
                    {/* Brand */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                        <Wolf size={34} />
                        <div>
                            <div className="display" style={{ fontSize: 16, fontWeight: 600, color: '#1A1A2E', letterSpacing: '0.06em', lineHeight: 1 }}>ALPHA</div>
                            <div style={{ fontSize: 7, fontWeight: 600, color: '#5B8FA8', letterSpacing: '0.38em', textTransform: 'uppercase' }}>REALTY</div>
                        </div>
                    </div>

                    <span className="tag" style={{ marginBottom: 10 }}>Channel Partner</span>
                    <h1 className="display" style={{ fontSize: 32, fontWeight: 300, color: '#1A1A2E', lineHeight: 1.05, margin: '0 0 6px' }}>
                        Partner <em style={{ color: '#5B8FA8', fontStyle: 'italic' }}>Portal</em>
                    </h1>
                    <p style={{ fontSize: 11, color: '#9A90AE', marginBottom: 28 }}>Access your channel partner dashboard</p>

                    {error && <div className="err-box" style={{ marginBottom: 18 }}>{error}</div>}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label className="field-label">Email</label>
                            <div className="input-wrap">
                                <Mail size={13} />
                                <input className="field-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <div>
                            <label className="field-label">Password</label>
                            <div className="input-wrap">
                                <Lock size={13} />
                                <input className="field-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                        </div>
                        <button className="btn-submit" type="submit" disabled={loading} style={{ marginTop: 6 }}>
                            {loading ? 'Signing In…' : 'Sign In'}
                        </button>
                    </form>

                    <div style={{ height: 1, background: '#F0EBE2', margin: '22px 0' }} />
                    <p style={{ fontSize: 11, color: '#9A90AE', textAlign: 'center' }}>
                        Referral member?{' '}
                        <Link to="/referral-login" style={{ color: '#7C6FAB', fontWeight: 600, textDecoration: 'none' }}>Referral Login →</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default PartnerLogin;