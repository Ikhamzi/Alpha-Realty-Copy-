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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-lavender-500">Alpha Realty</div>
                        <div className="text-lg font-semibold text-gray-700">Partner Portal</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">Welcome Partner</div>
                        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            <div className="flex max-w-7xl mx-auto">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r shadow-sm h-[calc(100vh-80px)] p-6 space-y-4 overflow-y-auto">
                    <Link to="/partner-dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition text-lg font-medium bg-cream">
                        <Home className="w-5 h-5 text-lavender-500" />
                        Dashboard
                    </Link>
                    <Link to="/partner-dashboard/inventory" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition text-lg font-medium">
                        <Building2 className="w-5 h-5 text-teal" />
                        Browse Inventory
                    </Link>
                    <Link to="/partner-dashboard/visits" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition text-lg font-medium">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        Site Visits
                    </Link>
                    <Link to="/partner-dashboard/tickets" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition text-lg font-medium">
                        <Ticket className="w-5 h-5 text-orange-500" />
                        Client Tickets
                    </Link>
                    <Link to="/partner-dashboard/activity" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition text-lg font-medium">
                        <Activity className="w-5 h-5 text-purple-500" />
                        Recent Activity
                    </Link>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="text-3xl font-bold text-lavender-500 mb-2">$245K</div>
                            <div className="text-gray-600">Total Sales</div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="text-3xl font-bold text-teal mb-2">3.2%</div>
                            <div className="text-gray-600">Commission Rate</div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="text-3xl font-bold text-green-500 mb-2">127</div>
                            <div className="text-gray-600">Infinity Leads</div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="text-3xl font-bold text-blue-500 mb-2">89%</div>
                            <div className="text-gray-600">Conversion Rate</div>
                        </div>
                    </div>

                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PartnerDashboard;

