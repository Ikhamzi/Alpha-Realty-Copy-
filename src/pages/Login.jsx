import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { ArrowRight, Users, Building2 } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-lavender-400 to-cream flex items-center justify-center px-4 py-12">
            <div className="max-w-lg w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-10">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-lavender-500 to-teal rounded-2xl flex items-center justify-center mb-6">
                        <Users className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Login</h1>
                    <p className="text-gray-600">Select the correct login flow for your role.</p>
                </div>

                <div className="grid gap-5">
                    <Link to="/referral-login" className="block p-6 rounded-3xl border border-lavender-200 bg-lavender-50 hover:bg-lavender-100 transition">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-sm uppercase tracking-[0.2em] text-lavender-500 font-semibold">Referral Login</div>
                                <div className="mt-3 text-xl font-bold text-gray-800">Referral Program Access</div>
                                <p className="mt-2 text-gray-600">Login as a referral partner to submit and track leads.</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-lavender-500" />
                        </div>
                    </Link>

                    <Link to="/partner-login" className="block p-6 rounded-3xl border border-teal-200 bg-teal-50 hover:bg-teal-100 transition">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-sm uppercase tracking-[0.2em] text-teal-600 font-semibold">Partner Login</div>
                                <div className="mt-3 text-xl font-bold text-gray-800">Channel Partner Portal</div>
                                <p className="mt-2 text-gray-600">Login as a partner to manage inventory and referrals.</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-teal-600" />
                        </div>
                    </Link>
                </div>

                <div className="text-center">
                    <p className="text-gray-600">Don't have an account? <Link to="/signup" className="font-semibold text-lavender-500 hover:text-lavender-400">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

