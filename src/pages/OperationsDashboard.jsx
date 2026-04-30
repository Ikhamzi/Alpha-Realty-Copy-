import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail } from 'lucide-react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .od-page { font-family: 'DM Sans', sans-serif; background: #FAF7F2; color: #1A1A2E; min-height: 100vh; }
  .display { font-family: 'Cormorant Garamond', serif; }

  .od-nav {
    position: sticky; top: 0; z-index: 100; padding: 14px 48px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(250,247,242,0.95); backdrop-filter: blur(20px);
    border-bottom: 1px solid #ECE6DC; box-shadow: 0 2px 28px rgba(26,26,46,0.06);
  }

  .od-main { max-width: 1100px; margin: 0 auto; padding: 36px 48px; }

  .tag { display: inline-flex; align-items: center; gap: 8px; font-size: 9px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: #7C6FAB; }
  .tag::before { content: ''; width: 20px; height: 1px; background: #7C6FAB; display: block; }

  .d-card { background: #fff; border: 1px solid #EDE8E0; border-radius: 3px; }

  .tab-btn { flex: 1; padding: 9px 16px; font-family: 'DM Sans',sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border: none; cursor: pointer; transition: all 0.2s; border-radius: 2px; }
  .tab-btn.active { background: #7C6FAB; color: #FAF7F2; }
  .tab-btn.inactive { background: transparent; color: #8A8098; }
  .tab-btn.inactive:hover { color: #1A1A2E; background: #F5F0FF; }

  .lead-item { padding: 14px 16px; border: 1px solid #EDE8E0; border-radius: 2px; cursor: pointer; transition: all 0.2s; margin-bottom: 8px; background: #fff; }
  .lead-item:hover { border-color: #C4B8E8; }
  .lead-item.active { border-color: #7C6FAB; background: #F9F6FF; }

  .field-box { background: #FAF7F2; border: 1px solid #EDE8E0; border-radius: 2px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: #1A1A2E; }
  .field-label { font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #9A90AE; margin-bottom: 6px; }

  .mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

  .btn-danger { flex: 1; padding: 10px; font-family: 'DM Sans',sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: #FFF0EE; border: 1.5px solid #F5C4BC; color: #C0392B; border-radius: 2px; cursor: pointer; transition: all 0.2s; }
  .btn-danger:hover { background: #FCE4E0; }
  .btn-success { flex: 1; padding: 10px; font-family: 'DM Sans',sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: #1A1A2E; border: 1.5px solid #1A1A2E; color: #FAF7F2; border-radius: 2px; cursor: pointer; transition: all 0.2s; }
  .btn-success:hover { background: #2E2E48; }
  .btn-back { display: inline-flex; align-items: center; gap: 7px; font-family: 'DM Sans',sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: transparent; border: 1.5px solid #C8BFD4; color: #6A6480; border-radius: 2px; padding: 7px 14px; cursor: pointer; transition: all 0.2s; }
  .btn-back:hover { border-color: #7C6FAB; color: #7C6FAB; }

  .status-pill { display: inline-block; padding: 4px 12px; border-radius: 100px; font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; }

  @media (max-width: 900px) {
    .od-nav { padding: 12px 20px; }
    .od-main { padding: 24px 20px; }
    .layout-grid { grid-template-columns: 1fr !important; }
    .detail-grid { grid-template-columns: 1fr; }
    .mini-grid { grid-template-columns: 1fr 1fr; }
  }
`;

const Wolf = ({ size = 28 }) => (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none" style={{ flexShrink: 0 }}>
        <defs>
            <linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7C6FAB" /><stop offset="1" stopColor="#B8ADDC" stopOpacity=".9" /></linearGradient>
            <linearGradient id="b" x1="1" y1="0" x2="0" y2="1"><stop stopColor="#5B8FA8" stopOpacity=".9" /><stop offset="1" stopColor="#9BBFCC" stopOpacity=".8" /></linearGradient>
        </defs>
        <polygon points="50,4 94,26 94,74 50,106 6,74 6,26" fill="none" stroke="#C4B8E8" strokeWidth="1.2" />
        <polygon points="50,10 72,30 50,24" fill="url(#a)" /><polygon points="50,10 28,30 50,24" fill="url(#b)" />
        <polygon points="50,24 72,30 64,54" fill="#9A9AB8" opacity=".55" /><polygon points="50,24 28,30 36,54" fill="#8A8AAA" opacity=".5" />
        <polygon points="64,54 50,24 50,70" fill="#B8ADDC" opacity=".8" /><polygon points="36,54 50,24 50,70" fill="#9B8EC7" opacity=".8" />
        <polygon points="50,70 64,54 80,82" fill="#9BBFCC" opacity=".6" /><polygon points="50,70 36,54 20,82" fill="#C4DCE4" opacity=".6" />
        <polygon points="50,70 80,82 20,82" fill="#7C6FAB" opacity=".4" />
        <ellipse cx="37" cy="37" rx="4.5" ry="5.5" fill="#7C6FAB" /><ellipse cx="63" cy="37" rx="4.5" ry="5.5" fill="#7C6FAB" />
        <ellipse cx="37" cy="38" rx="2.2" ry="3" fill="#1A1A2E" /><ellipse cx="63" cy="38" rx="2.2" ry="3" fill="#1A1A2E" />
        <circle cx="37.8" cy="36.5" r=".9" fill="#FAF7F2" opacity=".8" /><circle cx="63.8" cy="36.5" r=".9" fill="#FAF7F2" opacity=".8" />
    </svg>
);

const samplePending = [
    { id: 'REF1234567892', name: 'Amit Patel', referrer: 'Priya Sharma (women-pg)', status: 'Pending Verification', phone: '+91 98765 43212', email: 'amit.patel@email.com', occupation: 'Software Engineer - IT Department', propertyType: 'Plot', budget: '₹50 Lakhs', paymentMode: 'Loan', timeline: 'Within 2 Months', location: 'Hitech City', details: 'Looking for a plot to build a custom home' }
];
const sampleVerified = [
    { id: 'REF1234567890', name: 'Rajesh Kumar', submittedBy: 'Rahul Verma', assignedTo: 'Channel Partner - Vijay', status: 'Verified', phone: '+91 98765 43210', email: 'rajesh.kumar@email.com', occupation: 'Business Owner', propertyType: 'apartment', budget: '₹75 Lakhs', paymentMode: 'Full Payment', timeline: 'Within 1 Month', location: 'Gachibowli', currentStatus: 'contacted', details: 'Looking for a premium apartment' }
];

const OperationsDashboard = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('pending');
    const leads = view === 'pending' ? samplePending : sampleVerified;
    const [currentLead, setCurrentLead] = useState(leads[0]);
    const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
    const [showSharePropertyModal, setShowSharePropertyModal] = useState(false);
    const [propertyName, setPropertyName] = useState('');
    const [propertyDetails, setPropertyDetails] = useState('');
    const [visitDate, setVisitDate] = useState('');

    const handleViewChange = (v) => { setView(v); setCurrentLead(v === 'pending' ? samplePending[0] : sampleVerified[0]); };

    const statusOptions = ['contacted', 'Meeting scheduled', 'Meeting done', 'Site visit scheduled', 'site visit done', 'Advance paid', 'sale completed'];

    const handleStatusChange = (newStatus) => {
        alert(`lead status updated to: ${newStatus}`);
        setShowUpdateStatusModal(false);
    };

    const handleSendPropertyDetails = () => {
        alert('Poperty details sent to buyer via WhatsApp and email!');
        setShowSharePropertyModal(false);
        setPropertyName('');
        setPropertyDetails('');
        setVisitDate('');
    };

    return (
        <>
            <style>{STYLES}</style>
            <div className="od-page">

                <nav className="od-nav">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Wolf size={26} />
                        <div>
                            <div className="display" style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E', letterSpacing: '0.06em', lineHeight: 1 }}>ALPHA</div>
                            <div style={{ fontSize: 7, fontWeight: 600, color: '#7C6FAB', letterSpacing: '0.38em', textTransform: 'uppercase' }}>REALTY</div>
                        </div>
                        <div style={{ width: 1, height: 22, background: '#E6DDD2', margin: '0 14px' }} />
                        <span style={{ fontSize: 11, fontWeight: 500, color: '#6A6480', letterSpacing: '0.04em' }}>Operations Team</span>
                    </div>
                    <button className="btn-back" onClick={() => navigate('/')}><ArrowLeft size={11} /> Back to Landing</button>
                </nav>

                <main className="od-main">

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid #EDE8E0', borderRadius: 3, padding: 4, marginBottom: 20 }}>
                        <button className={`tab-btn ${view === 'pending' ? 'active' : 'inactive'}`} onClick={() => handleViewChange('pending')}>
                            Pending Verification ({samplePending.length})
                        </button>
                        <button className={`tab-btn ${view === 'verified' ? 'active' : 'inactive'}`} onClick={() => handleViewChange('verified')}>
                            Verified Leads ({sampleVerified.length})
                        </button>
                    </div>

                    {/* Layout */}
                    <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 16, alignItems: 'start' }}>

                        {/* Sidebar */}
                        <div className="d-card" style={{ padding: '20px 16px' }}>
                            <span className="tag" style={{ marginBottom: 14 }}>{view === 'pending' ? 'Pending' : 'Verified'} · {leads.length}</span>
                            <div style={{ maxHeight: 420, overflowY: 'auto' }}>
                                {leads.map(lead => (
                                    <div key={lead.id} className={`lead-item ${currentLead.id === lead.id ? 'active' : ''}`} onClick={() => setCurrentLead(lead)}>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1A2E', marginBottom: 3 }}>{lead.name}</div>
                                        <div style={{ fontSize: 10, color: '#9A90AE', marginBottom: 2, fontFamily: 'monospace' }}>{lead.id}</div>
                                        <div style={{ fontSize: 10, color: '#8A8098' }}>{lead.referrer}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detail Panel */}
                        {currentLead && (
                            <div className="d-card" style={{ padding: '28px 32px' }}>

                                {/* Header */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
                                    <div>
                                        <span className="tag" style={{ marginBottom: 8 }}>Lead Details</span>
                                        <h2 className="display" style={{ fontSize: 28, fontWeight: 400, color: '#1A1A2E', lineHeight: 1.1, margin: '0 0 4px' }}>{currentLead.name}</h2>
                                        <div style={{ fontSize: 10, color: '#9A90AE', fontFamily: 'monospace', marginBottom: 2 }}>Ref ID: {currentLead.id}</div>
                                        {currentLead.submittedBy && (
                                            <div style={{ fontSize: 11, color: '#8A8098' }}>Submitted by: {currentLead.submittedBy} | Assigned to: {currentLead.assignedTo}</div>
                                        )}
                                        {!currentLead.submittedBy && (
                                            <div style={{ fontSize: 11, color: '#8A8098' }}>{currentLead.referrer}</div>
                                        )}
                                    </div>
                                    <span className="status-pill" style={currentLead.status === 'Pending Verification'
                                        ? { background: '#FFF4E8', color: '#C47C20', border: '1px solid #F5DEB8' }
                                        : { background: '#EDFAF3', color: '#1A7A4A', border: '1px solid #B8EDD4' }}>
                                        {currentLead.status}
                                    </span>
                                </div>

                                <div style={{ height: 1, background: '#F0EBE2', marginBottom: 22 }} />

                                {/* Fields */}
                                <div className="detail-grid" style={{ marginBottom: 20 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                        <div>
                                            <div className="field-label">Contact</div>
                                            <div className="field-box"><Phone size={13} style={{ color: '#9B8EC7', flexShrink: 0 }} />{currentLead.phone}</div>
                                        </div>
                                        {view === 'pending' && (
                                            <>
                                                <div>
                                                    <div className="field-label">Email</div>
                                                    <div className="field-box"><Mail size={13} style={{ color: '#9B8EC7', flexShrink: 0 }} />{currentLead.email}</div>
                                                </div>
                                                <div>
                                                    <div className="field-label">Occupation</div>
                                                    <div className="field-box">{currentLead.occupation}</div>
                                                </div>
                                            </>
                                        )}
                                        {view === 'verified' && (
                                            <div>
                                                <div className="field-label">Current Status</div>
                                                <div className="field-box" style={{ fontWeight: 600, textTransform: 'capitalize' }}>{currentLead.currentStatus}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                        <div className="mini-grid">
                                            <div><div className="field-label">Property Type</div><div className="field-box" style={{ fontWeight: 600, textTransform: 'capitalize' }}>{currentLead.propertyType}</div></div>
                                            <div><div className="field-label">Budget</div><div className="field-box" style={{ fontWeight: 600 }}>{currentLead.budget}</div></div>
                                            {view === 'pending' && (
                                                <>
                                                    <div><div className="field-label">Payment Mode</div><div className="field-box">{currentLead.paymentMode}</div></div>
                                                    <div><div className="field-label">Timeline</div><div className="field-box">{currentLead.timeline}</div></div>
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <div className="field-label">Location</div>
                                            <div className="field-box" style={{ background: '#F0F6FF', borderColor: '#C8D8F0', fontWeight: 600, color: '#2A4A8A', textTransform: 'capitalize' }}>{currentLead.location}</div>
                                        </div>
                                        {view === 'pending' && (
                                            <div>
                                                <div className="field-label">Timeline</div>
                                                <div className="field-box">{currentLead.timeline}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div style={{ height: 1, background: '#F0EBE2', marginBottom: 16 }} />

                                <div style={{ marginBottom: 22 }}>
                                    <div className="field-label" style={{ marginBottom: 8 }}>Additional Details</div>
                                    <div style={{ background: '#FAF7F2', border: '1px solid #EDE8E0', borderRadius: 2, padding: '12px 14px', fontSize: 12, color: '#6A6480', lineHeight: 1.8 }}>{currentLead.details}</div>
                                </div>

                                <div style={{ height: 1, background: '#F0EBE2', marginBottom: 16 }} />

                                {view === 'pending' && (
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <button className="btn-danger" onClick={() => alert('Marked as fake')}>✕ &nbsp;Mark as Fake</button>
                                        <button className="btn-success" onClick={() => alert('Verified & proceeded')}>✓ &nbsp;Verify & Proceed</button>
                                    </div>
                                )}

                                {view === 'verified' && (
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <button className="btn-success" onClick={() => setShowUpdateStatusModal(true)} style={{ flex: 1 }}>Update Status</button>
                                        <button className="btn-success" onClick={() => setShowSharePropertyModal(true)} style={{ flex: 1 }}>Share Property Details</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>

                {/* Update Status Modal */}
                {showUpdateStatusModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(26, 26, 46, 0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                    }}>
                        <div className="d-card" style={{ padding: '28px 32px', maxWidth: 450, width: '90%' }}>
                            <div style={{ marginBottom: 24 }}>
                                <span className="tag" style={{ marginBottom: 8 }}>Update Lead Status</span>
                                <h2 className="display" style={{ fontSize: 20, fontWeight: 400, color: '#1A1A2E', lineHeight: 1.1, margin: '8px 0 0' }}>Update the current status of {currentLead.name}</h2>
                            </div>

                            <div style={{ height: 1, background: '#F0EBE2', marginBottom: 20 }} />

                            <div style={{ marginBottom: 22 }}>
                                <div className="field-label" style={{ marginBottom: 12 }}>Select new status</div>
                                <select style={{
                                    width: '100%', padding: '10px 14px', border: '1px solid #EDE8E0', borderRadius: 2,
                                    background: '#FAF7F2', fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#1A1A2E',
                                    cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237C6FAB' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '20px', paddingRight: '35px'
                                }} defaultValue="" onChange={(e) => {
                                    if (e.target.value) handleStatusChange(e.target.value);
                                }}>
                                    <option value="">-- Select Status --</option>
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ height: 1, background: '#F0EBE2', marginBottom: 16 }} />

                            <div style={{ display: 'flex', gap: 10 }}>
                                <button className="btn-back" onClick={() => setShowUpdateStatusModal(false)} style={{ flex: 1, textAlign: 'center' }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Share Property Details Modal */}
                {showSharePropertyModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(26, 26, 46, 0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, overflowY: 'auto', paddingTop: 40, paddingBottom: 40
                    }}>
                        <div className="d-card" style={{ padding: '28px 32px', maxWidth: 500, width: '90%' }}>
                            <div style={{ marginBottom: 24 }}>
                                <span className="tag" style={{ marginBottom: 8 }}>Share Property Details</span>
                                <h2 className="display" style={{ fontSize: 20, fontWeight: 400, color: '#1A1A2E', lineHeight: 1.1, margin: '8px 0 0' }}>Send property information to {currentLead.name}</h2>
                            </div>

                            <div style={{ height: 1, background: '#F0EBE2', marginBottom: 20 }} />

                            <div style={{ marginBottom: 16 }}>
                                <div className="field-label" style={{ marginBottom: 8 }}>Property Name</div>
                                <input type="text" placeholder="e.g., Alpha Heights Premium Apartments" value={propertyName} onChange={(e) => setPropertyName(e.target.value)}
                                    style={{
                                        width: '100%', padding: '10px 14px', border: '1px solid #EDE8E0', borderRadius: 2, background: '#FAF7F2',
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#1A1A2E', boxSizing: 'border-box'
                                    }} />
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <div className="field-label" style={{ marginBottom: 8 }}>Property Details</div>
                                <textarea placeholder="Enter property details, amenities, pricing, etc." value={propertyDetails} onChange={(e) => setPropertyDetails(e.target.value)}
                                    style={{
                                        width: '100%', padding: '10px 14px', border: '1px solid #EDE8E0', borderRadius: 2, background: '#FAF7F2',
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#1A1A2E', boxSizing: 'border-box', minHeight: 100, resize: 'vertical'
                                    }} />
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <div className="field-label" style={{ marginBottom: 8 }}>Schedule Site Visit Date</div>
                                <input type="datetime-local" value={visitDate} onChange={(e) => setVisitDate(e.target.value)}
                                    style={{
                                        width: '100%', padding: '10px 14px', border: '1px solid #EDE8E0', borderRadius: 2, background: '#FAF7F2',
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#1A1A2E', boxSizing: 'border-box'
                                    }} />
                            </div>

                            <div style={{ height: 1, background: '#F0EBE2', marginBottom: 16 }} />

                            <div style={{ display: 'flex', gap: 10 }}>
                                <button className="btn-back" onClick={() => setShowSharePropertyModal(false)} style={{ flex: 1, textAlign: 'center' }}>Cancel</button>
                                <button className="btn-success" onClick={handleSendPropertyDetails} style={{ flex: 1 }}>Send via WhatsApp & Email</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default OperationsDashboard;