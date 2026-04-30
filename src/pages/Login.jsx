import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { ArrowRight, Users, Home } from 'lucide-react';

const Login = () => {
    return (
        <div className="h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-4 overflow-hidden">
            <Link to="/" className="absolute top-4 left-4 flex items-center gap-2 text-xs font-medium text-[#7C6FAB] hover:text-[#1A1A2E] transition">
                <Home className="w-4 h-4" />
                Home
            </Link>
            <div className="max-w-sm w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_24px_64px_rgba(124,111,171,0.1)] p-6 space-y-6">
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#7C6FAB] to-[#9BBFCC] rounded-xl flex items-center justify-center mb-3">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#1A1A2E] mb-1">Choose Your Login</h1>
                    <p className="text-xs text-[#5C5374]">Select your role to continue</p>
                </div>

                <div className="grid gap-3">
                    <Link to="/referral-login" className="block p-4 rounded-xl border border-[#E7E0EC] bg-[#F4EEFF] hover:bg-[#F0EBFF] transition-all">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <div className="text-xs uppercase tracking-[0.2em] text-[#7C6FAB] font-semibold">Referral</div>
                                <div className="text-sm font-semibold text-[#1A1A2E]">Program Access</div>
                                <p className="text-xs text-[#5C5374] mt-1">Submit and track leads</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-[#7C6FAB] flex-shrink-0" />
                        </div>
                    </Link>

                    <Link to="/partner-login" className="block p-4 rounded-xl border border-[#E7E0EC] bg-[#EDF7F9] hover:bg-[#E8FCFC] transition-all">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <div className="text-xs uppercase tracking-[0.2em] text-[#1F7B7F] font-semibold">Partner</div>
                                <div className="text-sm font-semibold text-[#1A1A2E]">Channel Portal</div>
                                <p className="text-xs text-[#5C5374] mt-1">Manage inventory</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-[#1F7B7F] flex-shrink-0" />
                        </div>
                    </Link>
                </div>

                <div className="text-center border-t border-[#E7E0EC] pt-4">
                    <p className="text-xs text-[#5C5374]">New here? <Link to="/signup" className="font-semibold text-[#7C6FAB] hover:text-[#1A1A2E]">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

