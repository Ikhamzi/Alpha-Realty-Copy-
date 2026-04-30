import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   ALPHA REALTY — LANDING PAGE  (Light Theme)
   Direction : Warm editorial luxury × organic cream warmth
   Fonts     : Cormorant Garamond (display) + DM Sans (body)
   Palette   : #FAF7F2 cream · #1A1A2E ink · #7C6FAB violet
═══════════════════════════════════════════════════════════ */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .ar-page {
    font-family: 'DM Sans', sans-serif;
    background: #FAF7F2;
    color: #1A1A2E;
    width: 100%;
  }
  .display { font-family: 'Cormorant Garamond', serif; }

  /* Noise texture */
  .ar-page::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 9999;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 160px;
  }

  /* Scrollbar */
  .ar-page ::-webkit-scrollbar { width: 4px; }
  .ar-page ::-webkit-scrollbar-track { background: #FAF7F2; }
  .ar-page ::-webkit-scrollbar-thumb { background: #C4B8E8; border-radius: 2px; }

  /* Nav */
  .ar-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    padding: 22px 48px;
    display: flex; align-items: center; justify-content: space-between;
    transition: all 0.35s ease;
  }
  .ar-nav.stuck {
    padding: 14px 48px;
    background: rgba(250,247,242,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid #ECE6DC;
    box-shadow: 0 2px 28px rgba(26,26,46,0.06);
  }

  /* Ticker */
  .ticker-wrap { overflow: hidden; white-space: nowrap; background: #F0EBE2; border-top: 1px solid #E6DDD2; border-bottom: 1px solid #E6DDD2; padding: 13px 0; }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .ticker-track { display: inline-flex; animation: ticker 32s linear infinite; }
  .ticker-item { display: inline-flex; align-items: center; gap: 14px; padding: 0 30px; font-size: 10px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: #7C6FAB; }
  .t-dot { width: 3px; height: 3px; border-radius: 50%; background: #C4B8E8; }

  /* Tag label */
  .tag { display: inline-flex; align-items: center; gap: 10px; font-size: 10px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: #7C6FAB; margin-bottom: 18px; }
  .tag::before { content: ''; width: 26px; height: 1px; background: #7C6FAB; display: block; }

  /* Buttons */
  .btn-v { display: inline-flex; align-items: center; gap: 9px; padding: 14px 32px; border-radius: 2px; background: #7C6FAB; color: #FAF7F2; font-family: 'DM Sans',sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border: none; cursor: pointer; transition: all 0.25s; text-decoration: none; }
  .btn-v:hover { background: #6B5F99; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(124,111,171,0.32); }
  .btn-o { display: inline-flex; align-items: center; gap: 9px; padding: 13px 32px; border-radius: 2px; background: transparent; color: #1A1A2E; font-family: 'DM Sans',sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border: 1.5px solid #C8BFD4; cursor: pointer; transition: all 0.25s; text-decoration: none; }
  .btn-o:hover { border-color: #7C6FAB; color: #7C6FAB; background: rgba(124,111,171,0.06); }
  .btn-dk { display: inline-flex; align-items: center; gap: 9px; padding: 14px 32px; border-radius: 2px; background: #1A1A2E; color: #FAF7F2; font-family: 'DM Sans',sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border: none; cursor: pointer; transition: all 0.25s; text-decoration: none; }
  .btn-dk:hover { background: #2E2E48; transform: translateY(-2px); }
  .btn-ghost { font-family: 'DM Sans',sans-serif; font-size: 11px; font-weight: 500; color: #9A90AE; background: none; border: none; cursor: pointer; transition: color 0.2s; text-decoration: none; padding: 6px 0; display: block; text-align: center; }
  .btn-ghost:hover { color: #7C6FAB; }

  /* Path cards */
  .path-card { background: #fff; border: 1px solid #EDE8E0; border-radius: 3px; padding: 48px 44px; position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(0.23,1,0.32,1); }
  .path-card:hover { border-color: #C4B8E8; transform: translateY(-6px); box-shadow: 0 24px 64px rgba(124,111,171,0.13), 0 4px 16px rgba(26,26,46,0.05); }
  .path-card .top-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; opacity: 0; transition: opacity 0.3s; }
  .path-card:hover .top-accent { opacity: 1; }

  /* Step cards */
  .step-card { background: #fff; border: 1px solid #EDE8E0; border-radius: 3px; padding: 36px 24px; text-align: center; transition: all 0.3s ease; }
  .step-card:hover { border-color: #C4B8E8; box-shadow: 0 10px 36px rgba(124,111,171,0.1); transform: translateY(-4px); }

  /* Reward cards */
  .reward-card { background: #fff; border: 1px solid #EDE8E0; border-radius: 3px; padding: 44px 36px; transition: all 0.35s ease; }
  .reward-card:hover { border-color: #C4B8E8; box-shadow: 0 14px 44px rgba(124,111,171,0.1); transform: translateY(-5px); }
  .reward-card.feat { background: linear-gradient(155deg, #F6F1FF 0%, #FFFFFF 65%); border-color: #C4B8E8; transform: translateY(-10px); box-shadow: 0 20px 60px rgba(124,111,171,0.15); }
  .reward-card.feat:hover { transform: translateY(-14px); }

  /* Why cards */
  .why-card { background: #fff; border: 1px solid #EDE8E0; border-radius: 3px; padding: 44px 36px; text-align: center; transition: all 0.3s ease; }
  .why-card:hover { box-shadow: 0 12px 40px rgba(26,26,46,0.07); transform: translateY(-3px); }

  /* Stats strip (dark) */
  .stats-strip { background: #1A1A2E; display: grid; grid-template-columns: repeat(4,1fr); }
  .stat-cell { padding: 44px 36px; border-right: 1px solid #252540; text-align: center; }
  .stat-cell:last-child { border-right: none; }

  /* Float animation for badge */
  @keyframes floatUp { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  .float-anim { animation: floatUp 5s ease-in-out infinite; }

  /* Hero background */
  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse at 75% 15%, #ECE4FC88 0%, transparent 52%),
      radial-gradient(ellipse at 10% 75%, #D4EEF240 0%, transparent 48%),
      #FAF7F2;
  }
  .hero-grid {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.038;
    background-image: linear-gradient(#7C6FAB 1px, transparent 1px), linear-gradient(90deg, #7C6FAB 1px, transparent 1px);
    background-size: 72px 72px;
  }

  /* Footer */
  .ar-footer { background: #1A1A2E; color: #FAF7F2; padding: 72px 48px 40px; }
  .f-link { font-size: 13px; color: #3A3A54; text-decoration: none; display: block; margin-bottom: 10px; transition: color 0.2s; }
  .f-link:hover { color: #C4B8E8; }

  /* Grid helpers */
  .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
  .g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
  .gf { display: grid; grid-template-columns: 2.2fr 1fr 1fr 1.3fr; gap: 48px; }

  @media (max-width: 900px) {
    .g2,.g3,.g4,.gf { grid-template-columns: 1fr; }
    .stats-strip { grid-template-columns: 1fr 1fr; }
    .stat-cell { border-right: none; border-bottom: 1px solid #252540; }
    .ar-nav { padding: 14px 20px !important; }
    .ar-nav.stuck { padding: 12px 20px !important; }
    .hide-sm { display: none !important; }
    .hero-section { padding: 110px 20px 60px !important; }
    .section-pad { padding: 72px 20px !important; }
    .reward-card.feat { transform: none; }
    .ar-footer { padding: 52px 20px 32px; }
  }
`;

/* ───────── Wolf Logo ───────── */
const Wolf = ({ size = 34 }) => (
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

/* ───────── FadeIn wrapper ───────── */
const FI = ({ children, delay = 0, x = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: x === 0 ? 26 : 0, x }}
            animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
        >{children}</motion.div>
    );
};

/* ───────── NAV ───────── */
const Nav = () => {
    const [stuck, setStuck] = useState(false);
    useEffect(() => {
        const fn = () => setStuck(window.scrollY > 50);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);
    return (
        <nav className={`ar-nav${stuck ? ' stuck' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <Wolf size={32} />
                <div>
                    <div className="display" style={{ fontSize: 18, fontWeight: 600, color: '#1A1A2E', letterSpacing: '0.06em', lineHeight: 1 }}>ALPHA</div>
                    <div style={{ fontSize: 7.5, fontWeight: 600, color: '#7C6FAB', letterSpacing: '0.38em', textTransform: 'uppercase' }}>REALTY</div>
                </div>
            </div>
            <div className="hide-sm" style={{ display: 'flex', gap: 34 }}>
                {['About', 'Projects', 'Services', 'Blog'].map(l => (
                    <a key={l} href="#" style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', color: '#6A6480', textDecoration: 'none', transition: 'color .2s' }}
                        onMouseEnter={e => e.target.style.color = '#1A1A2E'}
                        onMouseLeave={e => e.target.style.color = '#6A6480'}>{l}</a>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <Link to="/operations" style={{ textDecoration: 'none' }}><button className="btn-o" style={{ padding: '9px 16px', fontSize: 11 }}>Operations Team</button></Link>
                <Link to="/signup" style={{ textDecoration: 'none' }}><button className="btn-v" style={{ padding: '10px 20px', fontSize: 11 }}>Join Now</button></Link>
            </div>
        </nav>
    );
};

/* ───────── HERO ───────── */
const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const pY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const op = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

    return (
        <section ref={ref} className="hero-section" style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', padding: '130px 48px 80px', overflow: 'hidden' }}>
            <div className="hero-bg" />
            <div className="hero-grid" />
            {/* Decorative rings */}
            {[[320, 320, '12%', '6%', '#C4B8E820'], [200, 200, '18%', '11%', '#C4B8E830'], [150, 150, '70%', '2%', '#9BBFCC20']].map(([w, h, t, l, b], i) => (
                <div key={i} style={{ position: 'absolute', top: t, left: l, width: w, height: h, borderRadius: '50%', border: `1px solid ${b}`, pointerEvents: 'none' }} />
            ))}

            <motion.div style={{ y: pY, opacity: op, position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 48 }}>

                    {/* Headline side */}
                    <div style={{ flex: 1, minWidth: 280 }}>
                        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                            <span className="tag">Exclusive Referral Program</span>
                        </motion.div>

                        <motion.h1 className="display"
                            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.22 }}
                            style={{ fontSize: 'clamp(62px,8.5vw,110px)', fontWeight: 300, lineHeight: 0.96, letterSpacing: '-0.02em', color: '#1A1A2E', margin: '0 0 24px' }}
                        >
                            Refer &amp; Earn<br />
                            <em style={{ color: '#7C6FAB', fontStyle: 'italic' }}>Real Rewards</em>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.38 }}
                            style={{ fontSize: 15, color: '#6A6480', lineHeight: 1.85, maxWidth: 490, marginBottom: 36 }}
                        >
                            Join Alpha Realty's exclusive referral program and earn attractive commissions
                            connecting buyers, sellers, and investors. From gift vouchers to{' '}
                            <strong style={{ color: '#1A1A2E', fontWeight: 500 }}>iPhones, MacBooks, Harley Davidsons</strong>, and international trips.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.52 }}
                            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
                        >
                            <Link to="/referral-signup" style={{ textDecoration: 'none' }}>
                                <button className="btn-v">
                                    Join Referral Program
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                            </Link>
                            <Link to="/partner-signup" style={{ textDecoration: 'none' }}>
                                <button className="btn-o">Become a Partner</button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Floating badge */}
                    <motion.div
                        className="float-anim hide-sm"
                        initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.58 }}
                        style={{ background: '#fff', border: '1px solid #EDE8E0', borderRadius: 3, padding: '28px 32px', minWidth: 272, boxShadow: '0 8px 40px rgba(26,26,46,0.08)' }}
                    >
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', color: '#7C6FAB', textTransform: 'uppercase', marginBottom: 18 }}>Latest Rewards Unlocked</div>
                        {[
                            { icon: '🏍️', label: 'Harley Davidson', sub: '15 Referrals', live: true },
                            { icon: '✈️', label: 'Dubai Trip', sub: '12 Referrals', live: true },
                            { icon: '📱', label: 'iPhone 17 Pro', sub: '8 Referrals', live: false },
                        ].map(({ icon, label, sub, live }) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                <span style={{ fontSize: 22 }}>{icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div className="display" style={{ fontSize: 16, fontWeight: 600, color: '#1A1A2E' }}>{label}</div>
                                    <div style={{ fontSize: 10, color: '#A09AB8' }}>{sub}</div>
                                </div>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: live ? '#5DB887' : '#C8BFD4', boxShadow: live ? '0 0 6px #5DB887' : 'none' }} />
                            </div>
                        ))}
                        <div style={{ height: 1, background: '#F0EBE2', margin: '14px 0' }} />
                        <div style={{ fontSize: 10, color: '#A09AB8' }}>₹50L+ distributed to 2,500+ referrers</div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
                style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            >
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.3em', color: '#C4B8E8', textTransform: 'uppercase' }}>Scroll</span>
                <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, #9B8EC7, transparent)' }} />
            </motion.div>
        </section>
    );
};

/* ───────── TICKER ───────── */
const Ticker = () => {
    const items = ['₹50L+ Rewards Distributed', '2500+ Active Referrers', '5000+ Successful Sales', '98% Satisfaction Rate', '3.5% Channel Partner Commission', 'iPhone 17 · MacBook Pro · Harley Davidson'];
    return (
        <div className="ticker-wrap">
            <div className="ticker-track">
                {[...items, ...items].map((t, i) => (
                    <span key={i} className="ticker-item">{t}<span className="t-dot" /></span>
                ))}
            </div>
        </div>
    );
};

/* ───────── STATS (dark strip) ───────── */
const Stats = () => (
    <div className="stats-strip">
        {[['₹50L+', 'Rewards Distributed', 'across 2,500+ referrers'], ['2500+', 'Active Referrers', 'and growing every day'], ['5000+', 'Successful Sales', 'closed through our network'], ['98%', 'Satisfaction Rate', 'verified by partners']].map(([v, l, s], i) => (
            <FI key={l} delay={i * 0.1}>
                <div className="stat-cell">
                    <div className="display" style={{ fontSize: 'clamp(36px,3.5vw,54px)', fontWeight: 300, color: '#F2EAE0', lineHeight: 1, marginBottom: 10 }}>{v}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#C8C0DC', marginBottom: 4 }}>{l}</div>
                    <div style={{ fontSize: 11, color: '#4A4A62' }}>{s}</div>
                </div>
            </FI>
        ))}
    </div>
);

/* ───────── CHOOSE PATH ───────── */
const ChoosePath = () => (
    <section className="section-pad" style={{ padding: '100px 48px', background: '#FAF7F2' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 24 }}>
                <div>
                    <FI><span className="tag">Choose Your Path</span></FI>
                    <FI delay={0.1}>
                        <h2 className="display" style={{ fontSize: 'clamp(36px,4.2vw,58px)', fontWeight: 300, color: '#1A1A2E', lineHeight: 1.06, marginTop: 14 }}>
                            Select the program<br /><em style={{ color: '#7C6FAB', fontStyle: 'italic' }}>that fits your profile</em>
                        </h2>
                    </FI>
                </div>
                <FI delay={0.15} x={28}>
                    <p style={{ fontSize: 13, color: '#8A8098', maxWidth: 260, lineHeight: 1.9, textAlign: 'right' }}>
                        Two powerful paths to earning with India's most trusted real estate referral platform.
                    </p>
                </FI>
            </div>

            <div className="g2">
                {/* Referral */}
                <FI delay={0.1} x={-24}>
                    <div className="path-card" style={{ height: '100%' }}>
                        <div className="top-accent" style={{ background: 'linear-gradient(90deg,#9B8EC7,#C4B8E8,transparent)' }} />
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#F5F0FF', border: '1px solid #E0D8F0', borderRadius: 20, padding: '5px 13px', marginBottom: 22 }}>
                            <span style={{ fontSize: 14 }}>🤝</span>
                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: '#7C6FAB', textTransform: 'uppercase' }}>For Everyone</span>
                        </div>
                        <h3 className="display" style={{ fontSize: 38, fontWeight: 500, color: '#1A1A2E', lineHeight: 1.1, marginBottom: 6 }}>Referral<br />Program</h3>
                        <p style={{ fontSize: 12, color: '#7C6FAB', fontWeight: 500, marginBottom: 22 }}>For Students, Women in PG/Hostels &amp; Household Women</p>
                        <div style={{ height: 1, background: '#F0EBE2', marginBottom: 22 }} />
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                            {['Earn from gift vouchers to luxury items', '3 benefit categories with multiple reward tiers', 'Track referrals through the entire sales funnel', 'No experience needed — just refer &amp; earn'].map((t, i) => (
                                <li key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 12, fontSize: 13, color: '#6A6480', lineHeight: 1.6 }}>
                                    <span style={{ color: '#9B8EC7', marginTop: 3, flexShrink: 0 }}>—</span>
                                    <span dangerouslySetInnerHTML={{ __html: t }} />
                                </li>
                            ))}
                        </ul>
                        <Link to="/referral-signup" style={{ textDecoration: 'none', display: 'block', marginBottom: 10 }}>
                            <button className="btn-v" style={{ width: '100%', justifyContent: 'center' }}>
                                Join Referral Program
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </button>
                        </Link>
                        <Link to="/referral-login" style={{ textDecoration: 'none' }}><button className="btn-ghost">Already a member? Login →</button></Link>
                    </div>
                </FI>

                {/* Channel Partner */}
                <FI delay={0.18} x={24}>
                    <div className="path-card" style={{ height: '100%' }}>
                        <div className="top-accent" style={{ background: 'linear-gradient(90deg,#5B8FA8,#9BBFCC,transparent)' }} />
                        {/* watermark */}
                        <div className="display" style={{ position: 'absolute', bottom: -14, right: -6, fontSize: 150, fontWeight: 700, color: '#5B8FA806', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>3.5%</div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#EFF6F9', border: '1px solid #D0E6EE', borderRadius: 20, padding: '5px 13px', marginBottom: 22 }}>
                            <span style={{ fontSize: 14 }}>🏢</span>
                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: '#5B8FA8', textTransform: 'uppercase' }}>For Professionals</span>
                        </div>
                        <h3 className="display" style={{ fontSize: 38, fontWeight: 500, color: '#1A1A2E', lineHeight: 1.1, marginBottom: 6 }}>Channel<br />Partner</h3>
                        <p style={{ fontSize: 12, color: '#5B8FA8', fontWeight: 500, marginBottom: 22 }}>For Real Estate Professionals and Agencies</p>
                        <div style={{ height: 1, background: '#F0EBE2', marginBottom: 22 }} />
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                            {['Access exclusive Alpha Realty inventory', 'Verified leads from Infinity Leads marketplace', 'Earn competitive commissions up to <strong>3.5% per sale</strong>', 'Full CRM tools for lead management'].map((t, i) => (
                                <li key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 12, fontSize: 13, color: '#6A6480', lineHeight: 1.6 }}>
                                    <span style={{ color: '#5B8FA8', marginTop: 3, flexShrink: 0 }}>—</span>
                                    <span dangerouslySetInnerHTML={{ __html: t }} />
                                </li>
                            ))}
                        </ul>
                        <Link to="/partner-signup" style={{ textDecoration: 'none', display: 'block', marginBottom: 10 }}>
                            <button className="btn-dk" style={{ width: '100%', justifyContent: 'center' }}>
                                Become a Channel Partner
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </button>
                        </Link>
                        <Link to="/partner-login" style={{ textDecoration: 'none' }}><button className="btn-ghost">Already a partner? Login →</button></Link>
                    </div>
                </FI>
            </div>
        </div>
    </section>
);

/* ───────── HOW IT WORKS ───────── */
const HowItWorks = () => (
    <section className="section-pad" style={{ padding: '100px 48px', background: '#F4EFE8', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#E0D8EC,transparent)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
                <FI><span className="tag" style={{ justifyContent: 'center' }}>How It Works</span></FI>
                <FI delay={0.1}>
                    <h2 className="display" style={{ fontSize: 'clamp(34px,4vw,54px)', fontWeight: 300, color: '#1A1A2E', marginTop: 14 }}>
                        Simple steps to start<br /><em style={{ color: '#7C6FAB', fontStyle: 'italic' }}>earning rewards</em>
                    </h2>
                </FI>
            </div>
            <div style={{ position: 'relative' }}>
                <div className="hide-sm" style={{ position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg,#C4B8E8,#9BBFCC,#C4B8E8)', opacity: 0.45 }} />
                <div className="g4">
                    {[['01', 'Sign Up', 'Register for free and choose your category', '#9B8EC7'], ['02', 'Refer', 'Submit property buyer details with complete information', '#BDA6CE'], ['03', 'Track', 'Monitor your referral through the sales funnel', '#7BAFC2'], ['04', 'Earn', 'Get rewarded when your referral completes purchase', '#9B8EC7']].map(([n, t, d, c], i) => (
                        <FI key={n} delay={i * 0.1}>
                            <div className="step-card">
                                <div style={{ width: 54, height: 54, borderRadius: '50%', background: c + '18', border: `1px solid ${c}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px', position: 'relative', zIndex: 2 }}>
                                    <span className="display" style={{ fontSize: 20, fontWeight: 700, color: c }}>{n}</span>
                                </div>
                                <h3 className="display" style={{ fontSize: 24, fontWeight: 500, color: '#1A1A2E', marginBottom: 10 }}>{t}</h3>
                                <p style={{ fontSize: 12, color: '#8A8098', lineHeight: 1.85 }}>{d}</p>
                            </div>
                        </FI>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

/* ───────── REWARD TIERS ───────── */
const RewardTiers = () => (
    <section className="section-pad" style={{ padding: '100px 48px', background: '#FAF7F2' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 20 }}>
                <div>
                    <FI><span className="tag">Reward Tiers</span></FI>
                    <FI delay={0.1}><h2 className="display" style={{ fontSize: 'clamp(34px,4vw,54px)', fontWeight: 300, color: '#1A1A2E', marginTop: 14 }}>The more referrals,<br /><em style={{ color: '#7C6FAB', fontStyle: 'italic' }}>the bigger the rewards</em></h2></FI>
                </div>
            </div>
            <div className="g3" style={{ alignItems: 'start' }}>
                {[
                    { level: 'Level 01', title: 'Gift Vouchers\n& Hampers', color: '#7BAFC2', bg: '#EFF6F9', icon: '🎁', items: ['Gift Vouchers up to ₹20,000', 'Premium Brand Vouchers', 'Exclusive Hampers'], feat: false },
                    { level: 'Level 02', title: 'Premium\nElectronics', color: '#7C6FAB', bg: '#F5F0FF', icon: '📱', items: ['iPhone 17', 'MacBook Pro', 'Premium Gadgets'], feat: true },
                    { level: 'Level 03', title: 'Luxury\nExperiences', color: '#9B6FAB', bg: '#FAF0FF', icon: '✈️', items: ['International Trips (Dubai, Singapore)', 'Harley Davidson Motorcycles', 'College Fee Payments'], feat: false },
                ].map(({ level, title, color, bg, icon, items, feat }, i) => (
                    <FI key={level} delay={i * 0.12}>
                        <div className={`reward-card${feat ? ' feat' : ''}`} style={{ position: 'relative' }}>
                            {feat && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${color},transparent)` }} />}
                            <div style={{ display: 'inline-block', background: bg, border: `1px solid ${color}33`, borderRadius: 20, padding: '4px 12px', marginBottom: 18 }}>
                                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', color, textTransform: 'uppercase' }}>{level}</span>
                            </div>
                            <div style={{ fontSize: 42, marginBottom: 14 }}>{icon}</div>
                            <h3 className="display" style={{ fontSize: 28, fontWeight: 500, color: '#1A1A2E', marginBottom: 22, lineHeight: 1.15, whiteSpace: 'pre-line' }}>{title}</h3>
                            <div style={{ height: 1, background: '#F0EBE2', marginBottom: 18 }} />
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {items.map((item, j) => (
                                    <li key={j} style={{ display: 'flex', gap: 11, alignItems: 'center', marginBottom: 12, fontSize: 13, color: '#6A6480' }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, opacity: 0.8 }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FI>
                ))}
            </div>
        </div>
    </section>
);

/* ───────── WHY ALPHA ───────── */
const WhyAlpha = () => (
    <section className="section-pad" style={{ padding: '100px 48px', background: '#F4EFE8', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#E0D8EC,transparent)' }} />
        <div className="display" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(110px,18vw,240px)', fontWeight: 700, color: '#7C6FAB07', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em' }}>ALPHA</div>
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
                <FI><span className="tag" style={{ justifyContent: 'center' }}>Why Choose Alpha Realty?</span></FI>
                <FI delay={0.1}><h2 className="display" style={{ fontSize: 'clamp(34px,4vw,54px)', fontWeight: 300, color: '#1A1A2E', marginTop: 14 }}>India's most trusted<br /><em style={{ color: '#7C6FAB', fontStyle: 'italic' }}>real estate referral platform</em></h2></FI>
            </div>
            <div className="g3">
                {[['✓', 'Verified Rewards', '100% genuine rewards with transparent tracking. No hidden terms or conditions.', '#7C6FAB'], ['◎', 'Real-Time Tracking', 'Track your referrals from initial contact to final sale completion in real-time.', '#7BAFC2'], ['◈', 'Dedicated Support', '24/7 customer support to help you succeed. We are with you every step of the way.', '#9B6FAB']].map(([s, t, d, c], i) => (
                    <FI key={t} delay={i * 0.1}>
                        <div className="why-card">
                            <div className="display" style={{ fontSize: 44, color: c, marginBottom: 18, lineHeight: 1 }}>{s}</div>
                            <h3 className="display" style={{ fontSize: 24, fontWeight: 500, color: '#1A1A2E', marginBottom: 12 }}>{t}</h3>
                            <p style={{ fontSize: 13, color: '#8A8098', lineHeight: 1.85 }}>{d}</p>
                        </div>
                    </FI>
                ))}
            </div>
        </div>
    </section>
);

/* ───────── CTA BANNER ───────── */
const CTABanner = () => (
    <section className="section-pad" style={{ padding: '120px 48px', background: '#FAF7F2', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 580, height: 380, borderRadius: '50%', background: 'radial-gradient(ellipse,#E8E0F855 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <FI>
                <div style={{ display: 'inline-block', background: '#F5F0FF', border: '1px solid #D8D0F0', borderRadius: 100, padding: '7px 20px', marginBottom: 26 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', color: '#7C6FAB', textTransform: 'uppercase' }}>Ready to Start Earning?</span>
                </div>
            </FI>
            <FI delay={0.1}>
                <h2 className="display" style={{ fontSize: 'clamp(46px,7vw,82px)', fontWeight: 300, color: '#1A1A2E', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 18 }}>
                    Join thousands of<br /><em style={{ color: '#7C6FAB', fontStyle: 'italic' }}>successful referrers</em>
                </h2>
            </FI>
            <FI delay={0.2}><p style={{ fontSize: 15, color: '#8A8098', marginBottom: 40, lineHeight: 1.8 }}>and channel partners building wealth through Alpha Realty today.</p></FI>
            <FI delay={0.3}>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/referral-signup" style={{ textDecoration: 'none' }}><button className="btn-v" style={{ padding: '16px 40px', fontSize: 13 }}>Join as Referrer <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button></Link>
                    <Link to="/partner-signup" style={{ textDecoration: 'none' }}><button className="btn-o" style={{ padding: '16px 40px', fontSize: 13 }}>Become a Partner</button></Link>
                </div>
            </FI>
        </div>
    </section>
);

/* ───────── FOOTER ───────── */
const Footer = () => (
    <footer className="ar-footer">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="gf" style={{ marginBottom: 56 }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 18 }}>
                        <Wolf size={30} />
                        <div>
                            <div className="display" style={{ fontSize: 16, fontWeight: 600, color: '#F2EAE0', letterSpacing: '0.06em' }}>ALPHA</div>
                            <div style={{ fontSize: 7, fontWeight: 600, color: '#9B8EC7', letterSpacing: '0.38em', textTransform: 'uppercase' }}>REALTY</div>
                        </div>
                    </div>
                    <p style={{ fontSize: 13, color: '#3A3A54', lineHeight: 1.9, maxWidth: 260 }}>India's most trusted real estate referral platform. Building wealth, one referral at a time.</p>
                </div>
                <div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', color: '#9B8EC7', textTransform: 'uppercase', marginBottom: 20 }}>Quick Links</div>
                    {['About Us', 'Our Projects', 'Services', 'Blog'].map(l => (
                        <a key={l} href="/" className="f-link">{l}</a>
                    ))}
                </div>
                <div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', color: '#9B8EC7', textTransform: 'uppercase', marginBottom: 20 }}>Programs</div>
                    {[['Referral Program', '/signup'], ['Channel Partner', '/signup'], ['Infinity Leads', '/'], ['Rewards', '/']].map(([l, h]) => (
                        <Link key={l} to={h} className="f-link">{l}</Link>
                    ))}
                </div>
                <div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', color: '#9B8EC7', textTransform: 'uppercase', marginBottom: 20 }}>Contact</div>
                    <div style={{ fontSize: 13, color: '#3A3A54', lineHeight: 2.3 }}>
                        <div>1800-XXX-XXXX</div>
                        <a href="mailto:info@alpharealty.com" className="f-link" style={{ display: 'inline' }}>info@alpharealty.com</a>
                        <div>Mon – Sat: 9 AM – 7 PM</div>
                    </div>
                </div>
            </div>
            <div style={{ borderTop: '1px solid #22223A', paddingTop: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <span style={{ fontSize: 11, color: '#2A2A42' }}>© 2026 Alpha Realty. All rights reserved.</span>
                <div style={{ display: 'flex', gap: 24 }}>
                    {['Privacy Policy', 'Terms & Conditions'].map(l => (
                        <a key={l} href="/" style={{ fontSize: 11, color: '#2A2A42', textDecoration: 'none', transition: 'color .2s' }}
                            onMouseEnter={e => e.target.style.color = '#9B8EC7'}
                            onMouseLeave={e => e.target.style.color = '#2A2A42'}
                        >{l}</a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);

/* ══════════════════════════════════════════
   DEFAULT EXPORT
══════════════════════════════════════════ */
const Landing = () => (
    <>
        <style>{STYLES}</style>
        <div className="ar-page">
            <Nav />
            <Hero />
            <Ticker />
            <Stats />
            <ChoosePath />
            <HowItWorks />
            <RewardTiers />
            <WhyAlpha />
            <CTABanner />
            <Footer />
        </div>
    </>
);

export default Landing;