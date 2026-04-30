import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Gift, List, Plus } from 'lucide-react';

const ReferralDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const displayName = user?.name || 'Referral Partner';
    const roleLabel = user?.role ? user.role : 'referral';

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A2E]">
            <nav className="border-b border-[#E7E0EC] bg-[rgba(250,247,242,0.95)] backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7C6FAB]">Alpha Realty</div>
                        <div className="text-2xl font-semibold tracking-[-0.03em]">Referral Dashboard</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="rounded-full bg-[#F4EEFF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7C6FAB]">
                            {roleLabel}
                        </div>
                        <Button onClick={handleLogout} variant="outline" className="h-11 px-5">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
                <section className="rounded-[32px] border border-[#E7E0EC] bg-white/90 p-8 shadow-[0_30px_80px_rgba(124,111,171,0.08)]">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4EEFF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7C6FAB]">
                                Welcome back
                            </div>
                            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#1A1A2E] sm:text-4xl">
                                Welcome, {displayName}!
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5C5374] sm:text-base">
                                View your active referrals, completed rewards, and pending approvals in one elegant dashboard designed to match Alpha Realty’s landing palette.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="rounded-2xl border border-[#EDE8E0] bg-[#FAF7F2] px-4 py-3 text-sm font-medium text-[#5C5374] shadow-sm">
                                Referral partner since 2025
                            </div>
                            <div className="rounded-2xl border border-[#EDE8E0] bg-white px-4 py-3 text-sm font-medium text-[#1A1A2E] shadow-sm">
                                12 active campaigns
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-[28px] border border-[#E7E0EC] bg-white p-6 shadow-[0_16px_40px_rgba(124,111,171,0.08)]">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB]">Active Referrals</p>
                                <p className="mt-4 text-4xl font-semibold text-[#1A1A2E]">5</p>
                            </div>
                            <div className="rounded-2xl bg-[#F4EEFF] p-3 text-[#7C6FAB]">
                                <Gift className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="mt-5 text-sm leading-6 text-[#5C5374]">Currently active referrals that are moving through the process.</p>
                    </div>

                    <div className="rounded-[28px] border border-[#E7E0EC] bg-white p-6 shadow-[0_16px_40px_rgba(124,111,171,0.08)]">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB]">Completed Referrals</p>
                                <p className="mt-4 text-4xl font-semibold text-[#1A1A2E]">12</p>
                            </div>
                            <div className="rounded-2xl bg-[#EDF7F9] p-3 text-[#1F7B7F]">
                                <List className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="mt-5 text-sm leading-6 text-[#5C5374]">Referrals successfully completed and reward-eligible.</p>
                    </div>

                    <div className="rounded-[28px] border border-[#E7E0EC] bg-white p-6 shadow-[0_16px_40px_rgba(124,111,171,0.08)]">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB]">Pending Rewards</p>
                                <p className="mt-4 text-4xl font-semibold text-[#1A1A2E]">3</p>
                            </div>
                            <div className="rounded-2xl bg-[#F9F0FF] p-3 text-[#9B8EC7]">
                                <Plus className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="mt-5 text-sm leading-6 text-[#5C5374]">Rewards currently awaiting approval from the operations team.</p>
                    </div>
                </section>

                <section className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
                    <div className="rounded-[32px] border border-[#E7E0EC] bg-gradient-to-br from-[#F4EEFF] via-[#F7F1FF] to-white p-8 shadow-[0_28px_70px_rgba(124,111,171,0.09)]">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB]">Your Progress</p>
                                <p className="mt-4 text-3xl font-semibold text-[#1A1A2E]">₹2,45,000</p>
                                <p className="mt-2 text-sm leading-6 text-[#5C5374]">Progress to next level</p>
                            </div>
                            <div className="rounded-3xl bg-[#1A1A2E] px-4 py-2 text-sm font-semibold text-white">12 / 20 referrals</div>
                        </div>
                        <div className="mt-8 rounded-full bg-[#EDE7F0] p-1">
                            <div className="h-3 rounded-full bg-[#7C6FAB]" style={{ width: '60%' }} />
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <div className="rounded-[28px] border border-[#E7E0EC] bg-white p-6 shadow-[0_18px_40px_rgba(124,111,171,0.08)]">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB]">Submit New Referral</p>
                                    <p className="mt-4 text-sm leading-6 text-[#5C5374]">Refer a property buyer and start earning rewards.</p>
                                </div>
                                <div className="rounded-2xl bg-[#F4EEFF] p-3 text-[#7C6FAB]">
                                    <Plus className="h-5 w-5" />
                                </div>
                            </div>
                            <Link to="/referral-dashboard/submit" className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#7C6FAB] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#8a7dc5]">
                                Submit Referral
                            </Link>
                        </div>

                        <div className="rounded-[28px] border border-[#E7E0EC] bg-white p-6 shadow-[0_18px_40px_rgba(124,111,171,0.08)]">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB]">Track Your Referrals</p>
                                    <p className="mt-4 text-sm leading-6 text-[#5C5374]">View status and progress of all your referrals.</p>
                                </div>
                                <div className="rounded-2xl bg-[#E8FCFC] p-3 text-[#1B7A84]">
                                    <List className="h-5 w-5" />
                                </div>
                            </div>
                            <Link to="/referral-dashboard/track" className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-[#E7E0EC] bg-white px-4 py-3 text-sm font-semibold text-[#1A1A2E] transition hover:border-[#C4B8E8] hover:text-[#7C6FAB]">
                                View All Referrals
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="rounded-[32px] border border-[#E7E0EC] bg-white p-8 shadow-[0_24px_64px_rgba(124,111,171,0.1)]">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB]">My Rewards</p>
                            <p className="mt-3 text-lg font-semibold text-[#1A1A2E]">View and change your reward goals</p>
                        </div>
                        <Link to="/referral-dashboard/rewards" className="inline-flex items-center justify-center rounded-2xl bg-[#7C6FAB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8a7dc5]">
                            Manage Rewards
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ReferralDashboard;

