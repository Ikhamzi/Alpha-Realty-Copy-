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
        role: 'referral', // default
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
            // Mock - backend later
            const response = await api.post('/auth/signup', formData);
            login(response.data.token, formData.role);
            navigate('/dashboard');
        } catch (err) {
            setError('Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal to-lavender-400 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-8">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-teal to-lavender-500 rounded-2xl flex items-center justify-center mb-6">
                        <Users className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Alpha Realty</h1>
                    <p className="text-gray-600">Create your account to start earning</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Program Type</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent"
                        >
                            <option value="referral">Referral Program</option>
                            <option value="partner">Channel Partner</option>
                        </select>
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg bg-teal hover:bg-teal-dark" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-gray-600">
                        Already have an account? <Link to="/login" className="font-semibold text-teal hover:text-teal-dark">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

