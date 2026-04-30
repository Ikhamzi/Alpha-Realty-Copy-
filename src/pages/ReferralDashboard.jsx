import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, User, Gift, List, Plus } from 'lucide-react';
import api from '../lib/api.js';

const ReferralDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-lavender-500">Alpha Realty</div>
                        <div className="text-lg font-semibold text-gray-700">Referral Dashboard</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">Welcome, {user?.name || 'Referral'}</div>
                        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div className="flex max-w-7xl mx-auto">
                <aside className="w-64 bg-white border-r shadow-sm h-screen p-6 space-y-4">
                    <Link to="/referral-dashboard/submit" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition text-lg font-medium">
                        <Plus className="w-5 h-5 text-lavender-500" />
                        Submit New Referral
                    </Link>
                    <Link to="/referral-dashboard/track" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition text-lg font-medium">
                        <List className="w-5 h-5 text-teal" />
                        Track Referrals
                    </Link>
                    <Link to="/referral-dashboard/rewards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition text-lg font-medium">
                        <Gift className="w-5 h-5 text-green-500" />
                        My Rewards
                    </Link>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ReferralDashboard;

