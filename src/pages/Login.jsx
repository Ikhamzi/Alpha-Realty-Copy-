import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { ArrowRight, Users, Building2 } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 py-12">
            <div className="max-w-lg w-full bg-white/90 backdrop-blur-xl rounded-[32px] shadow-[0_24px_64px_rgba(124,111,171,0.1)] p-10 space-y-10">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-[#7C6FAB] to-[#9BBFCC] rounded-2xl flex items-center justify-center mb-6">
                        <Users className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#1A1A2E] mb-2">Choose Your Login</h1>
                    <p className="text-[#5C5374]">Select the correct login flow for your role.</p>
                </div>

                <div className="grid gap-5">
                    <Link to="/referral-login" className="block p-6 rounded-[24px] border border-[#E7E0EC] bg-[#F4EEFF] hover:bg-[#F0EBFF] hover:border-[#C4B8E8] transition-all">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-sm uppercase tracking-[0.24em] text-[#7C6FAB] font-semibold">Referral Login</div>
                                <div className="mt-3 text-xl font-semibold text-[#1A1A2E]">Referral Program Access</div>
                                <p className="mt-2 text-[#5C5374]">Login as a referral partner to submit and track leads.</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-[#7C6FAB]" />
                        </div>
                    </Link>

                    <Link to="/partner-login" className="block p-6 rounded-[24px] border border-[#E7E0EC] bg-[#EDF7F9] hover:bg-[#E8FCFC] hover:border-[#9BBFCC] transition-all">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-sm uppercase tracking-[0.24em] text-[#1F7B7F] font-semibold">Partner Login</div>
                                <div className="mt-3 text-xl font-semibold text-[#1A1A2E]">Channel Partner Portal</div>
                                <p className="mt-2 text-[#5C5374]">Login as a partner to manage inventory and referrals.</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-[#1F7B7F]" />
                        </div>
                    </Link>
                </div>

                <div className="text-center">
                    <p className="text-[#5C5374]">Don't have an account? <Link to="/signup" className="font-semibold text-[#7C6FAB] hover:text-[#1A1A2E]">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

