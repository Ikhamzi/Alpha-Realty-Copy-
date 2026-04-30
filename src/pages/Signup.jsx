import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { Mail, Lock, User, Users } from 'lucide-react';
import api from '../lib/api.js';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'referral',
        agencyName: '',
        licenseNo: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/signup', formData);
            login({
                token: response.data.token,
                ...response.data.user
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
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
                    <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#1A1A2E] mb-2">Join Alpha Realty</h1>
                    <p className="text-[#5C5374]">Create your account to start earning</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#5C5374] mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7C6FAB]" />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-[#E7E0EC] rounded-2xl focus:ring-2 focus:ring-[#7C6FAB] focus:border-transparent text-[#1A1A2E] placeholder-[#9A90AE] transition-all"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#5C5374] mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7C6FAB]" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-[#E7E0EC] rounded-2xl focus:ring-2 focus:ring-[#7C6FAB] focus:border-transparent text-[#1A1A2E] placeholder-[#9A90AE] transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#5C5374] mb-2">Program Type</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-[#E7E0EC] rounded-2xl focus:ring-2 focus:ring-[#7C6FAB] focus:border-transparent text-[#1A1A2E] transition-all"
                        >
                            <option value="referral">Referral Program</option>
                            <option value="partner">Channel Partner</option>
                        </select>
                    </div>

                    {formData.role === 'partner' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-[#5C5374] mb-2">Agency Name</label>
                                <input
                                    type="text"
                                    value={formData.agencyName}
                                    onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-[#E7E0EC] rounded-2xl focus:ring-2 focus:ring-[#7C6FAB] focus:border-transparent text-[#1A1A2E] placeholder-[#9A90AE] transition-all"
                                    placeholder="Agency Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#5C5374] mb-2">License Number</label>
                                <input
                                    type="text"
                                    value={formData.licenseNo}
                                    onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-[#E7E0EC] rounded-2xl focus:ring-2 focus:ring-[#7C6FAB] focus:border-transparent text-[#1A1A2E] placeholder-[#9A90AE] transition-all"
                                    placeholder="LICENSE123"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <Button type="submit" className="w-full h-12 text-lg bg-[#7C6FAB] text-white font-semibold rounded-2xl shadow-xl hover:bg-[#8a7dc5] hover:shadow-2xl transition-all" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-[#5C5374] mb-3">Already have an account? Choose the correct login type below.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/referral-login" className="px-5 py-3 bg-[#7C6FAB] text-white rounded-2xl font-semibold hover:bg-[#8a7dc5] transition">
                            Referral Login
                        </Link>
                        <Link to="/partner-login" className="px-5 py-3 bg-[#1F7B7F] text-white rounded-2xl font-semibold hover:bg-[#2a8f8f] transition">
                            Partner Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;

