import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .auth-page {
    font-family: 'DM Sans', sans-serif;
    background: #FAF7F2;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    position: relative;
  }

  .auth-page::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 160px;
  }

  .auth-bg-glow {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse at 30% 20%, #D4EEF240 0%, transparent 52%),
      radial-gradient(ellipse at 80% 75%, #ECE4FC55 0%, transparent 48%);
  }

  .auth-grid {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.028;
    background-image: linear-gradient(#7C6FAB 1px, transparent 1px), linear-gradient(90deg, #7C6FAB 1px, transparent 1px);
    background-size: 72px 72px;
  }

  .auth-home {
    position: fixed; top: 24px; left: 28px; z-index: 10;
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
    color: #9A90AE; text-decoration: none;
    transition: color 0.2s;
  }
  .auth-home::before { content: ''; width: 20px; height: 1px; background: currentColor; display: block; }
  .auth-home:hover { color: #7C6FAB; }

  .auth-card {
    position: relative; z-index: 2;
    background: #fff;
    border: 1px solid #EDE8E0;
    border-radius: 3px;
    padding: 48px 44px;
    width: 100%; max-width: 420px;
    box-shadow: 0 24px 64px rgba(26,26,46,0.07), 0 4px 16px rgba(124,111,171,0.06);
  }

  .auth-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 36px; }
  .auth-logo-text-main { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 600; color: #1A1A2E; letter-spacing: 0.07em; line-height: 1; }
  .auth-logo-text-sub { font-size: 7px; font-weight: 600; color: #7C6FAB; letter-spacing: 0.4em; text-transform: uppercase; }

  .auth-tag { display: inline-flex; align-items: center; gap: 10px; font-size: 10px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: #7C6FAB; margin-bottom: 10px; }
  .auth-tag::before { content: ''; width: 22px; height: 1px; background: #7C6FAB; display: block; }

  .auth-heading { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 300; color: #1A1A2E; line-height: 1.0; letter-spacing: -0.01em; margin: 0 0 6px; }
  .auth-heading em { color: #7C6FAB; font-style: italic; }
  .auth-sub { font-size: 12px; color: #8A8098; line-height: 1.7; margin: 0 0 32px; }

  .path-card {
    display: block; text-decoration: none;
    border: 1px solid #EDE8E0;
    border-radius: 3px;
    padding: 20px 22px;
    margin-bottom: 12px;
    position: relative; overflow: hidden;
    transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
    background: #fff;
  }
  .path-card:last-of-type { margin-bottom: 0; }
  .path-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; opacity: 0; transition: opacity 0.3s; }
  .path-card.violet { background: #FDFBFF; }
  .path-card.violet::before { background: linear-gradient(90deg, #9B8EC7, #C4B8E8, transparent); }
  .path-card.teal { background: #FAFCFD; }
  .path-card.teal::before { background: linear-gradient(90deg, #5B8FA8, #9BBFCC, transparent); }
  .path-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(124,111,171,0.12); }
  .path-card.violet:hover { border-color: #C4B8E8; }
  .path-card.teal:hover { border-color: #9BBFCC; }
  .path-card:hover::before { opacity: 1; }

  .path-label { font-size: 9px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; margin-bottom: 4px; }
  .path-label.violet { color: #7C6FAB; }
  .path-label.teal { color: #5B8FA8; }
  .path-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 500; color: #1A1A2E; line-height: 1.1; margin-bottom: 4px; }
  .path-desc { font-size: 11px; color: #8A8098; }

  .path-arrow { flex-shrink: 0; }
  .path-arrow.violet { color: #9B8EC7; }
  .path-arrow.teal { color: #5B8FA8; }

  .auth-divider { height: 1px; background: #F0EBE2; margin: 28px 0; }
  .auth-footer-text { font-size: 11px; color: #8A8098; text-align: center; }
  .auth-footer-link { color: #7C6FAB; font-weight: 600; text-decoration: none; transition: color 0.2s; }
  .auth-footer-link:hover { color: #1A1A2E; }
`;

const Wolf = ({ size = 30 }) => (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none" style={{ flexShrink: 0 }}>
        <defs>
            <linearGradient id="sa" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7C6FAB" /><stop offset="1" stopColor="#B8ADDC" stopOpacity=".9" /></linearGradient>
            <linearGradient id="sb" x1="1" y1="0" x2="0" y2="1"><stop stopColor="#5B8FA8" stopOpacity=".9" /><stop offset="1" stopColor="#9BBFCC" stopOpacity=".8" /></linearGradient>
        </defs>
        <polygon points="50,4 94,26 94,74 50,106 6,74 6,26" fill="none" stroke="#C4B8E8" strokeWidth="1.2" />
        <polygon points="50,10 72,30 50,24" fill="url(#sa)" />
        <polygon points="50,10 28,30 50,24" fill="url(#sb)" />
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

const Signup = () => (
    <>
        <style>{STYLES}</style>
        <div className="auth-page">
            <div className="auth-bg-glow" />
            <div className="auth-grid" />

            <Link to="/" className="auth-home">Home</Link>

            <div className="auth-card">
                {/* Logo */}
                <div className="auth-logo">
                    <Wolf size={28} />
                    <div>
                        <div className="auth-logo-text-main">ALPHA</div>
                        <div className="auth-logo-text-sub">REALTY</div>
                    </div>
                </div>

                {/* Heading */}
                <div className="auth-tag">New Account</div>
                <h1 className="auth-heading">Choose Your<br /><em>Sign Up</em></h1>
                <p className="auth-sub">Select how you'd like to join the platform</p>

                {/* Cards */}
                <Link to="/referral-signup" className="path-card violet">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                        <div>
                            <div className="path-label violet">Referral</div>
                            <div className="path-title">Referral Program</div>
                            <div className="path-desc">Earn by referring leads &amp; buyers</div>
                        </div>
                        <ArrowRight className="path-arrow violet" size={18} />
                    </div>
                </Link>

                <Link to="/partner-signup" className="path-card teal">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                        <div>
                            <div className="path-label teal">Partner</div>
                            <div className="path-title">Channel Partner</div>
                            <div className="path-desc">Agency access with full inventory</div>
                        </div>
                        <ArrowRight className="path-arrow teal" size={18} />
                    </div>
                </Link>

                <div className="auth-divider" />
                <p className="auth-footer-text">
                    Already have an account?{' '}
                    <Link to="/login" className="auth-footer-link">Log in</Link>
                </p>
            </div>
        </div>
    </>
);

export default Signup;