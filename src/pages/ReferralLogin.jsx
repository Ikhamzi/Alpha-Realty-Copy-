import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { Mail, Lock, Users } from 'lucide-react';
import api from '../lib/api.js';

const ReferralLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/referral-login', { email, password });
            login({
                token: response.data.token,
                ...response.data.user
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-[32px] shadow-[0_24px_64px_rgba(124,111,171,0.1)] p-10 space-y-8">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-[#7C6FAB] to-[#9BBFCC] rounded-2xl flex items-center justify-center mb-6">
                        <Users className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#1A1A2E] mb-2">Referral Login</h1>
                    <p className="text-[#5C5374] text-lg">Welcome back to the referral program</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#5C5374] mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7C6FAB]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-[#E7E0EC] rounded-2xl focus:ring-2 focus:ring-[#7C6FAB] focus:border-transparent text-[#1A1A2E] placeholder-[#9A90AE] transition-all"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#5C5374] mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7C6FAB]" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-[#E7E0EC] rounded-2xl focus:ring-2 focus:ring-[#7C6FAB] focus:border-transparent text-[#1A1A2E] placeholder-[#9A90AE] transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-14 bg-[#7C6FAB] text-white font-semibold text-lg rounded-2xl shadow-xl hover:bg-[#8a7dc5] hover:shadow-2xl transition-all" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-[#5C5374]">
                        Channel partner? <Link to="/partner-login" className="font-semibold text-[#7C6FAB] hover:text-[#1A1A2E]">Partner Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReferralLogin;
