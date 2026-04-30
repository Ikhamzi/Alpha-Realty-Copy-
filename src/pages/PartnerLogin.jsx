import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { Mail, Lock, Award } from 'lucide-react';
import api from '../lib/api.js';

const PartnerLogin = () => {
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
            const response = await api.post('/auth/partner-login', { email, password });
            login(response.data.token, response.data.role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal via-lavender-500 to-cream flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10 space-y-8">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-teal to-lavender-500 bg-opacity-80 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                        <Award className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Partner Login</h1>
                    <p className="text-white/90 text-lg">Access your channel partner dashboard</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-2xl backdrop-blur-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl focus:ring-2 focus:ring-teal focus:border-transparent text-white placeholder-white/70 transition-all"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl focus:ring-2 focus:ring-teal focus:border-transparent text-white placeholder-white/70 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-14 bg-white/90 text-gray-900 font-bold text-lg rounded-2xl shadow-xl hover:bg-white hover:shadow-2xl transition-all backdrop-blur-sm" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-white/80">
                        Referral member? <Link to="/referral-login" className="font-semibold text-lavender-300 hover:text-white underline decoration-white/50">Referral Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PartnerLogin;
