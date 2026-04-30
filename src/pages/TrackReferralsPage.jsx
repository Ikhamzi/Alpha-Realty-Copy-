import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ArrowLeft } from 'lucide-react';
import api from '../lib/api.js';

const TrackReferralsPage = () => {
    const { user } = useAuth();
    const [referrals, setReferrals] = useState([]);

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const response = await api.get('/referrals');
                const data = Array.isArray(response.data) ? response.data : [response.data];
                const enrichedData = data.map(referral => ({
                    ...referral,
                    progress: referral.progress || ['Pending Confirmation', 'Confirmed', 'Contacted', 'Meeting', 'Site Visit', 'Advance', 'Sale ✓']
                }));
                setReferrals(enrichedData);
            } catch (error) {
                console.error('Error fetching referrals:', error);
                // For demo, use sample data
                setReferrals([
                    {
                        id: 'REF1777559063862',
                        name: 'Hamza Junaid',
                        status: 'Pending Confirmation',
                        contact: '+918074420291',
                        location: 'financial-district',
                        submitted: '30 Apr 2026',
                        propertyType: 'Budget',
                        budget: '500000',
                        lastUpdated: '30 Apr 2026',
                        progress: ['Pending Confirmation', 'Confirmed', 'Contacted', 'Meeting', 'Site Visit', 'Advance', 'Sale ✓']
                    }
                ]);
            }
        };
        fetchReferrals();
    }, []);

    const getStatusIndex = (status) => {
        const statuses = ['Pending Confirmation', 'Confirmed', 'Contacted', 'Meeting', 'Site Visit', 'Advance', 'Sale ✓'];
        return statuses.indexOf(status);
    };

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A2E]">
            <nav className="border-b border-[#E7E0EC] bg-[rgba(250,247,242,0.95)] backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link to="/referral-dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-[#7C6FAB] hover:text-[#1A1A2E] transition">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7C6FAB]">Alpha Realty</div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#1A1A2E]">Track Your Referrals</h1>
                    <p className="mt-2 text-sm text-[#5C5374]">Monitor the status and progress of all your submitted referrals</p>
                </div>

                <div className="space-y-6">
                    {referrals.map((referral) => (
                        <div key={referral.id} className="rounded-[32px] border border-[#E7E0EC] bg-white p-8 shadow-[0_24px_64px_rgba(124,111,171,0.1)]">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-[#1A1A2E]">{referral.name}</h2>
                                    <p className="text-sm text-[#7C6FAB]">Ref ID: {referral.id}</p>
                                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F4EEFF] px-4 py-2 text-sm font-medium text-[#7C6FAB]">
                                        {referral.status}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="font-medium text-[#5C5374]">Contact</p>
                                        <p className="text-[#1A1A2E]">{referral.contact}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#5C5374]">Location</p>
                                        <p className="text-[#1A1A2E]">{referral.location}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#5C5374]">Submitted</p>
                                        <p className="text-[#1A1A2E]">{referral.submitted}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#5C5374]">Property Type</p>
                                        <p className="text-[#1A1A2E]">{referral.propertyType || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#5C5374]">Budget</p>
                                        <p className="text-[#1A1A2E]">₹{referral.budget}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#5C5374]">Last Updated</p>
                                        <p className="text-[#1A1A2E]">{referral.lastUpdated}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <p className="text-sm font-medium text-[#5C5374] mb-4">Progress Timeline:</p>
                                <div className="flex items-center gap-2 overflow-x-auto">
                                    {referral.progress.map((step, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div
                                                className={`rounded-full px-4 py-2 text-sm font-medium ${index <= getStatusIndex(referral.status)
                                                    ? 'bg-[#7C6FAB] text-white'
                                                    : 'bg-[#E7E0EC] text-[#5C5374]'
                                                    }`}
                                            >
                                                {step}
                                            </div>
                                            {index < referral.progress.length - 1 && (
                                                <div className="w-8 h-px bg-[#E7E0EC]"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default TrackReferralsPage;