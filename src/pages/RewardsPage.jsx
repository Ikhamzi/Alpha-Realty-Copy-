import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { ArrowLeft, Check } from 'lucide-react';

const RewardsPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedReward, setSelectedReward] = useState(null);

    const rewards = [
        {
            id: 'default',
            title: 'Default Reward',
            subtitle: 'Alpha Realty Premium Hamper',
            description: 'Custom Alpha Realty Sweets + Merchandise',
            target: 'Default for all referrals',
            commission: 'Any successful referral'
        },
        {
            id: 'level1',
            title: 'Level 1',
            subtitle: 'iPhone',
            description: 'Latest iPhone model',
            target: '1 successful property sale',
            commission: 'Commission: ₹2-3 Lakhs'
        },
        {
            id: 'level2',
            title: 'Level 2',
            subtitle: 'MacBook Pro',
            description: 'MacBook Pro latest model',
            target: '2 successful property sales',
            commission: 'Commission: ₹5-6 Lakhs'
        },
        {
            id: 'level3',
            title: 'Level 3',
            subtitle: 'Harley Davidson / EV Vespa',
            description: 'Harley Davidson for Boys / EV Vespa for Girls',
            target: '3 successful property sales',
            commission: 'Commission: ₹10-12 Lakhs'
        },
        {
            id: 'level4',
            title: 'Level 4',
            subtitle: 'Tomorrowland Tickets',
            description: 'Tomorrowland Tickets for 3-5 people',
            target: '5 successful property sales',
            commission: 'Commission: ₹15-20 Lakhs'
        },
        {
            id: 'level5',
            title: 'Level 5',
            subtitle: 'College Fees Payment',
            description: 'Full college fees payment',
            target: '7 successful property sales',
            commission: 'Commission: ₹25+ Lakhs'
        }
    ];

    const handleConfirm = () => {
        if (selectedReward) {
            alert(`Benefit selected: ${rewards.find(r => r.id === selectedReward).subtitle}. You can now start submitting referrals.`);
            navigate('/referral-dashboard');
        }
    };

    const handleSkip = () => {
        navigate('/referral-dashboard');
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

            <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#1A1A2E]">Welcome, {user?.name || 'Hamza Junaid'}! 🎉</h1>
                    <p className="mt-2 text-sm font-medium text-[#7C6FAB]">Category: Student</p>
                </div>

                <div className="rounded-[32px] border border-[#E7E0EC] bg-white p-8 shadow-[0_24px_64px_rgba(124,111,171,0.1)]">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-semibold text-[#1A1A2E]">Select Your Reward Goal</h2>
                        <p className="mt-2 text-sm text-[#5C5374]">Choose the benefit you want to work towards. You can change this later.</p>
                    </div>

                    <div className="space-y-4">
                        {rewards.map((reward) => (
                            <div
                                key={reward.id}
                                onClick={() => setSelectedReward(reward.id)}
                                className={`rounded-[24px] border p-6 cursor-pointer transition-all ${selectedReward === reward.id
                                        ? 'border-[#7C6FAB] bg-[#F4EEFF] shadow-[0_8px_24px_rgba(124,111,171,0.15)]'
                                        : 'border-[#E7E0EC] bg-white hover:border-[#C4B8E8] hover:shadow-[0_4px_16px_rgba(124,111,171,0.08)]'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-semibold text-[#1A1A2E]">{reward.title}</h3>
                                            {selectedReward === reward.id && (
                                                <div className="rounded-full bg-[#7C6FAB] p-1">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <p className="mt-1 text-sm font-medium text-[#7C6FAB]">{reward.subtitle}</p>
                                        <p className="mt-1 text-sm text-[#5C5374]">{reward.description}</p>
                                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.24em] text-[#7C6FAB]">Target</p>
                                                <p className="text-sm font-medium text-[#1A1A2E]">{reward.target}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.24em] text-[#7C6FAB]">Commission Range</p>
                                                <p className="text-sm font-medium text-[#1A1A2E]">{reward.commission}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button onClick={handleSkip} variant="outline" className="px-6 py-3">
                            Skip for Now
                        </Button>
                        <Button onClick={handleConfirm} className="px-6 py-3" disabled={!selectedReward}>
                            Confirm & Continue
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RewardsPage;