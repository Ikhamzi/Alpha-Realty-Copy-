import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Gift, List, Plus } from 'lucide-react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .rd-page { font-family: 'DM Sans', sans-serif; background: #FAF7F2; color: #1A1A2E; min-height: 100vh; }
  .display { font-family: 'Cormorant Garamond', serif; }

  .rd-nav {
    position: sticky; top: 0; z-index: 100;
    padding: 14px 48px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(250,247,242,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid #ECE6DC;
    box-shadow: 0 2px 28px rgba(26,26,46,0.06);
  }

  .rd-main { max-width: 1100px; margin: 0 auto; padding: 40px 48px; display: flex; flex-direction: column; gap: 20px; }

  .d-card { background: #fff; border: 1px solid #EDE8E0; border-radius: 3px; transition: all 0.3s ease; }
  .d-card:hover { border-color: #C4B8E8; box-shadow: 0 10px 36px rgba(124,111,171,0.1); }

  .tag { display: inline-flex; align-items: center; gap: 8px; font-size: 9px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: #7C6FAB; }
  .tag::before { content: ''; width: 20px; height: 1px; background: #7C6FAB; display: block; }

  .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 300; color: #1A1A2E; line-height: 1; }

  .btn-v { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 22px; border-radius: 2px; background: #7C6FAB; color: #FAF7F2; font-family: 'DM Sans',sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border: none; cursor: pointer; transition: all 0.25s; text-decoration: none; }
  .btn-v:hover { background: #6B5F99; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(124,111,171,0.3); }
  .btn-o { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 9px 22px; border-radius: 2px; background: transparent; color: #1A1A2E; font-family: 'DM Sans',sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border: 1.5px solid #C8BFD4; cursor: pointer; transition: all 0.25s; text-decoration: none; }
  .btn-o:hover { border-color: #7C6FAB; color: #7C6FAB; }

  .g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
  .g2a { display: grid; grid-template-columns: 1.7fr 1fr; gap: 16px; }

  .icon-box { width: 34px; height: 34px; border-radius: 2px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  .pill { display: inline-flex; align-items: center; border-radius: 100px; padding: 4px 12px; font-size: 9px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; }

  @media (max-width: 900px) {
    .rd-nav { padding: 12px 20px; }
    .rd-main { padding: 24px 20px; }
    .g3, .g2a { grid-template-columns: 1fr; }
  }
`;

const Wolf = ({ size = 30 }) => (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none" style={{ flexShrink: 0 }}>
        <defs>
            <linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7C6FAB" /><stop offset="1" stopColor="#B8ADDC" stopOpacity=".9" /></linearGradient>
            <linearGradient id="b" x1="1" y1="0" x2="0" y2="1"><stop stopColor="#5B8FA8" stopOpacity=".9" /><stop offset="1" stopColor="#9BBFCC" stopOpacity=".8" /></linearGradient>
        </defs>
        <polygon points="50,4 94,26 94,74 50,106 6,74 6,26" fill="none" stroke="#C4B8E8" strokeWidth="1.2" />
        <polygon points="50,10 72,30 50,24" fill="url(#a)" />
        <polygon points="50,10 28,30 50,24" fill="url(#b)" />
        <polygon points="50,24 72,30 64,54" fill="#9A9AB8" opacity=".55" />
        <polygon points="50,24 28,30 36,54" fill="#8A8AAA" opacity=".5" />
        <polygon points="64,54 50,24 50,70" fill="#B8ADDC" opacity=".8" />
        <polygon points="36,54 50,24 50,70" fill="#9B8EC7" opacity=".8" />
        <polygon points="50,70 64,54 80,82" fill="#9BBFCC" opacity=".6" />
        <polygon points="50,70 36,54 20,82" fill="#C4DCE4" opacity=".6" />
        <polygon points="50,70 80,82 20,82" fill="#7C6FAB" opacity=".4" />
        <ellipse cx="37" cy="37" rx="4.5" ry="5.5" fill="#7C6FAB" />
        <ellipse cx="63" cy="37" rx="4.5" ry="5.5" fill="#7C6FAB" />
        <ellipse cx="37" cy="38" rx="2.2" ry="3" fill="#1A1A2E" />
        <ellipse cx="63" cy="38" rx="2.2" ry="3" fill="#1A1A2E" />
        <circle cx="37.8" cy="36.5" r=".9" fill="#FAF7F2" opacity=".8" />
        <circle cx="63.8" cy="36.5" r=".9" fill="#FAF7F2" opacity=".8" />
    </svg>
);

const ReferralDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => { logout(); navigate('/'); };

    const displayName = user?.name || 'Referral Partner';
    const roleLabel = user?.role || 'referral';

    return (
        <>
            <style>{STYLES}</style>
            <div className="rd-page">

                {/* NAV */}
                <nav className="rd-nav">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Wolf size={28} />
                        <div>
                            <div className="display" style={{ fontSize: 16, fontWeight: 600, color: '#1A1A2E', letterSpacing: '0.06em', lineHeight: 1 }}>ALPHA</div>
                            <div style={{ fontSize: 7, fontWeight: 600, color: '#7C6FAB', letterSpacing: '0.38em', textTransform: 'uppercase' }}>REALTY</div>
                        </div>
                        <div style={{ width: 1, height: 24, background: '#E6DDD2', margin: '0 14px' }} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: '#6A6480', letterSpacing: '0.04em' }}>Referral Dashboard</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="pill" style={{ background: '#F5F0FF', border: '1px solid #E0D8F0', color: '#7C6FAB' }}>{roleLabel}</span>
                        <button className="btn-o" style={{ padding: '8px 14px', fontSize: 10 }} onClick={handleLogout}>
                            <LogOut size={12} /> Logout
                        </button>
                    </div>
                </nav>

                <main className="rd-main">

                    {/* WELCOME BANNER */}
                    <div className="d-card" style={{ padding: '32px 36px', background: 'linear-gradient(135deg,#F6F1FF 0%,#fff 60%)', position: 'relative', overflow: 'hidden' }}>
                        <div className="display" style={{ position: 'absolute', right: -10, top: -10, fontSize: 110, fontWeight: 700, color: '#7C6FAB06', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>ALPHA</div>
                        <span className="tag" style={{ marginBottom: 12 }}>Welcome back</span>
                        <h1 className="display" style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 300, color: '#1A1A2E', lineHeight: 1.05, margin: '0 0 8px' }}>
                            Welcome, <em style={{ color: '#7C6FAB', fontStyle: 'italic' }}>{displayName}</em>
                        </h1>
                        <p style={{ fontSize: 12, color: '#8A8098', lineHeight: 1.8, maxWidth: 480, marginBottom: 20 }}>
                            View your active referrals, completed rewards, and pending approvals.
                        </p>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 11, color: '#6A6480', background: '#FAF7F2', border: '1px solid #EDE8E0', borderRadius: 2, padding: '5px 12px' }}>Referral partner since 2025</span>
                            <span style={{ fontSize: 11, color: '#1A1A2E', background: '#fff', border: '1px solid #EDE8E0', borderRadius: 2, padding: '5px 12px' }}>12 active campaigns</span>
                        </div>
                    </div>

                    {/* STATS ROW */}
                    <div className="g3">
                        {[
                            { label: 'Active Referrals', value: '5', sub: 'Moving through the pipeline', icon: <Gift size={14} />, ic: '#F5F0FF', cc: '#7C6FAB' },
                            { label: 'Completed Referrals', value: '12', sub: 'Successfully completed and reward-eligible', icon: <List size={14} />, ic: '#EDF7F9', cc: '#1F7B7F' },
                            { label: 'Pending Rewards', value: '3', sub: 'Awaiting operations team approval', icon: <Plus size={14} />, ic: '#F9F0FF', cc: '#9B8EC7' },
                        ].map(({ label, value, sub, icon, ic, cc }) => (
                            <div className="d-card" key={label} style={{ padding: '24px 28px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                                    <span className="tag">{label}</span>
                                    <div className="icon-box" style={{ background: ic, color: cc }}>{icon}</div>
                                </div>
                                <div className="stat-num">{value}</div>
                                <p style={{ fontSize: 11, color: '#8A8098', lineHeight: 1.7, marginTop: 8 }}>{sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* PROGRESS + ACTIONS */}
                    <div className="g2a">
                        {/* Progress */}
                        <div className="d-card" style={{ padding: '28px 32px', background: 'linear-gradient(155deg,#F6F1FF 0%,#fff 65%)' }}>
                            <span className="tag" style={{ marginBottom: 14 }}>Your Progress</span>
                            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
                                <div>
                                    <div className="display" style={{ fontSize: 32, fontWeight: 300, color: '#1A1A2E' }}>₹2,45,000</div>
                                    <div style={{ fontSize: 11, color: '#8A8098', marginTop: 4 }}>Progress to next reward level</div>
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 600, background: '#1A1A2E', color: '#FAF7F2', borderRadius: 2, padding: '6px 14px', letterSpacing: '0.05em' }}>12 / 20 referrals</span>
                            </div>
                            <div style={{ background: '#EDE7F0', borderRadius: 100, height: 6, overflow: 'hidden' }}>
                                <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg,#9B8EC7,#C4B8E8)', borderRadius: 100 }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                                <span style={{ fontSize: 10, color: '#B0A8C4' }}>Level 2</span>
                                <span style={{ fontSize: 10, color: '#B0A8C4' }}>60% complete</span>
                            </div>
                        </div>

                        {/* Quick actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div className="d-card" style={{ padding: '22px 24px', flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                                    <div>
                                        <span className="tag" style={{ marginBottom: 6 }}>Submit Referral</span>
                                        <p style={{ fontSize: 11, color: '#8A8098', lineHeight: 1.7 }}>Refer a buyer and start earning.</p>
                                    </div>
                                    <div className="icon-box" style={{ background: '#F5F0FF', color: '#7C6FAB' }}><Plus size={14} /></div>
                                </div>
                                <Link to="/referral-dashboard/submit" className="btn-v" style={{ width: '100%' }}>Submit Referral</Link>
                            </div>
                            <div className="d-card" style={{ padding: '22px 24px', flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                                    <div>
                                        <span className="tag" style={{ marginBottom: 6 }}>Track Referrals</span>
                                        <p style={{ fontSize: 11, color: '#8A8098', lineHeight: 1.7 }}>View all referral statuses.</p>
                                    </div>
                                    <div className="icon-box" style={{ background: '#E8FCFC', color: '#1B7A84' }}><List size={14} /></div>
                                </div>
                                <Link to="/referral-dashboard/track" className="btn-o" style={{ width: '100%' }}>View All Referrals</Link>
                            </div>
                        </div>
                    </div>

                    {/* REWARDS SECTION */}
                    <div className="d-card" style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                        <div>
                            <span className="tag" style={{ marginBottom: 8 }}>My Rewards</span>
                            <p style={{ fontSize: 13, fontWeight: 500, color: '#1A1A2E', margin: 0 }}>View and manage your reward goals</p>
                        </div>
                        <Link to="/referral-dashboard/rewards" className="btn-v">
                            Manage Rewards
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                    </div>

                </main>
            </div>
        </>
    );
};

export default ReferralDashboard;