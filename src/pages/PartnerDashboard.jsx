import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, Home, Building2, Calendar, Ticket, Activity } from 'lucide-react';

const PartnerDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const displayName = user?.name || 'Partner';
    const roleLabel = user?.role ? user.role : 'partner';

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A2E]">
            <nav className="border-b border-[#E7E0EC] bg-[rgba(250,247,242,0.95)] backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7C6FAB]">Alpha Realty</div>
                        <div className="text-2xl font-semibold tracking-[-0.03em]">Partner Portal</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="rounded-full bg-[#EDF7F9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1F7B7F]">
                            {roleLabel}
                        </div>
                        <Button onClick={handleLogout} variant="outline" className="h-11 px-5">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            <div className="flex max-w-7xl mx-auto">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-[#E7E0EC] shadow-sm h-screen p-6 space-y-4">
                    <Link to="/partner-dashboard" className="flex items-center gap-3 p-3 rounded-xl bg-[#F4EEFF] text-[#7C6FAB] transition text-lg font-medium">
                        <Home className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link to="/partner-dashboard/inventory" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F4EEFF] hover:text-[#7C6FAB] transition text-lg font-medium">
                        <Building2 className="w-5 h-5 text-[#1F7B7F]" />
                        Browse Inventory
                    </Link>
                    <Link to="/partner-dashboard/visits" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F4EEFF] hover:text-[#7C6FAB] transition text-lg font-medium">
                        <Calendar className="w-5 h-5 text-[#7C6FAB]" />
                        Site Visits
                    </Link>
                    <Link to="/partner-dashboard/tickets" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F4EEFF] hover:text-[#7C6FAB] transition text-lg font-medium">
                        <Ticket className="w-5 h-5 text-[#7C6FAB]" />
                        Client Tickets
                    </Link>
                    <Link to="/partner-dashboard/activity" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F4EEFF] hover:text-[#7C6FAB] transition text-lg font-medium">
                        <Activity className="w-5 h-5 text-[#7C6FAB]" />
                        Recent Activity
                    </Link>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-10">
                    <section className="rounded-[32px] border border-[#E7E0EC] bg-white/90 p-8 shadow-[0_30px_80px_rgba(124,111,171,0.08)] mb-10">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-3xl">
                                <div className="inline-flex items-center gap-2 rounded-full bg-[#EDF7F9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1F7B7F]">
                                    Welcome back
                                </div>
                                <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#1A1A2E] sm:text-4xl">
                                    Welcome, {displayName}!
                                </h1>
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5C5374] sm:text-base">
                                    Manage your channel partner activities, track inventory, and monitor client interactions in one elegant dashboard.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="rounded-2xl border border-[#EDE8E0] bg-[#FAF7F2] px-4 py-3 text-sm font-medium text-[#5C5374] shadow-sm">
                                    Partner since 2024
                                </div>
                                <div className="rounded-2xl border border-[#EDE8E0] bg-white px-4 py-3 text-sm font-medium text-[#1A1A2E] shadow-sm">
                                    45 active listings
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-6 lg:grid-cols-4 mb-10">
                        <div className="rounded-[28px] border border-[#E7E0EC] bg-white p-6 shadow-[0_16px_40px_rgba(124,111,171,0.08)]">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB]">Total Sales</p>
                                    <p className="mt-4 text-4xl font-semibold text-[#1A1A2E]">$245K</p>
                                </div>
                                <div className="rounded-2xl bg-[#F4EEFF] p-3 text-[#7C6FAB]">
                                    <Building2 className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="mt-5 text-sm leading-6 text-[#5C5374]">Total sales generated this month.</p>
                        </div>

                        <div className="rounded-[28px] border border-[#E7E0EC] bg-white p-6 shadow-[0_16px_40px_rgba(124,111,171,0.08)]">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB]">Commission Rate</p>
                                    <p className="mt-4 text-4xl font-semibold text-[#1A1A2E]">3.2%</p>
                                </div>
                                <div className="rounded-2xl bg-[#EDF7F9] p-3 text-[#1F7B7F]">
                                    <Activity className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="mt-5 text-sm leading-6 text-[#5C5374]">Your current commission percentage.</p>
                        </div>

                        <div className="rounded-[28px] border border-[#E7E0EC] bg-white p-6 shadow-[0_16px_40px_rgba(124,111,171,0.08)]">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB]">Active Leads</p>
                                    <p className="mt-4 text-4xl font-semibold text-[#1A1A2E]">127</p>
                                </div>
                                <div className="rounded-2xl bg-[#F9F0FF] p-3 text-[#9B8EC7]">
                                    <Ticket className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="mt-5 text-sm leading-6 text-[#5C5374]">Leads currently in your pipeline.</p>
                        </div>

                        <div className="rounded-[28px] border border-[#E7E0EC] bg-white p-6 shadow-[0_16px_40px_rgba(124,111,171,0.08)]">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB]">Conversion Rate</p>
                                    <p className="mt-4 text-4xl font-semibold text-[#1A1A2E]">89%</p>
                                </div>
                                <div className="rounded-2xl bg-[#F0F9F9] p-3 text-[#1F7B7F]">
                                    <Calendar className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="mt-5 text-sm leading-6 text-[#5C5374]">Leads converted to sales.</p>
                        </div>
                    </section>

                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PartnerDashboard;

