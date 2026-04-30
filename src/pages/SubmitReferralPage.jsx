import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { ArrowLeft } from 'lucide-react';
import api from '../lib/api.js';

const SubmitReferralPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        buyerName: '',
        buyerPhone: '',
        whatsappNumber: '',
        buyerEmail: '',
        buyerProfession: '',
        buyerSpecialization: '',
        propertyRequirements: '',
        budget: '',
        timeline: 'Within 1 Month',
        preferredArea: 'Hitech City',
        additionalInfo: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/referrals', formData);
            alert('Referral submitted successfully!');
            navigate('/referral-dashboard');
        } catch (error) {
            console.error('Error submitting referral:', error);
            alert('Failed to submit referral. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/referral-dashboard');
    };

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A2E]">
            <nav className="border-b border-[#E7E0EC] bg-[rgba(250,247,242,0.95)] backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link to="/referral-dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-[#7C6FAB] hover:text-[#1A1A2E] transition">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7C6FAB]">Alpha Realty</div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-10">
                <div className="rounded-[32px] border border-[#E7E0EC] bg-white p-8 shadow-[0_24px_64px_rgba(124,111,171,0.1)]">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-semibold text-[#1A1A2E]">Submit Property Buyer Referral</h1>
                        <p className="mt-2 text-sm text-[#5C5374]">Fill in the details of the potential property buyer. A confirmation will be sent to their WhatsApp.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">Buyer Information</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-[#5C5374] mb-2">Enter buyer's full name</label>
                                    <input
                                        type="text"
                                        name="buyerName"
                                        value={formData.buyerName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-[#E7E0EC] rounded-lg focus:border-[#7C6FAB] focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#5C5374] mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="buyerPhone"
                                        value={formData.buyerPhone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full px-4 py-3 border border-[#E7E0EC] rounded-lg focus:border-[#7C6FAB] focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#5C5374] mb-2">WhatsApp Number</label>
                                    <input
                                        type="tel"
                                        name="whatsappNumber"
                                        value={formData.whatsappNumber}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full px-4 py-3 border border-[#E7E0EC] rounded-lg focus:border-[#7C6FAB] focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#5C5374] mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="buyerEmail"
                                        value={formData.buyerEmail}
                                        onChange={handleChange}
                                        placeholder="buyer@email.com"
                                        className="w-full px-4 py-3 border border-[#E7E0EC] rounded-lg focus:border-[#7C6FAB] focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#5C5374] mb-2">Profession</label>
                                    <input
                                        type="text"
                                        name="buyerProfession"
                                        value={formData.buyerProfession}
                                        onChange={handleChange}
                                        placeholder="e.g., Doctor, Engineer, Business"
                                        className="w-full px-4 py-3 border border-[#E7E0EC] rounded-lg focus:border-[#7C6FAB] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#5C5374] mb-2">Specialization</label>
                                    <input
                                        type="text"
                                        name="buyerSpecialization"
                                        value={formData.buyerSpecialization}
                                        onChange={handleChange}
                                        placeholder="e.g., Cardiology, IT Dept"
                                        className="w-full px-4 py-3 border border-[#E7E0EC] rounded-lg focus:border-[#7C6FAB] focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">Property Requirements</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-[#5C5374] mb-2">Property Requirements</label>
                                    <input
                                        type="text"
                                        name="propertyRequirements"
                                        value={formData.propertyRequirements}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-[#E7E0EC] rounded-lg focus:border-[#7C6FAB] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#5C5374] mb-2">Budget</label>
                                    <input
                                        type="text"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        placeholder="e.g., ₹50 Lakhs - ₹1 Crore"
                                        className="w-full px-4 py-3 border border-[#E7E0EC] rounded-lg focus:border-[#7C6FAB] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#5C5374] mb-2">Select timeline</label>
                                    <select
                                        name="timeline"
                                        value={formData.timeline}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-[#E7E0EC] rounded-lg focus:border-[#7C6FAB] focus:outline-none"
                                    >
                                        <option>Within 1 Month</option>
                                        <option>1-3 Months</option>
                                        <option>3-6 Months</option>
                                        <option>6+ Months</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#5C5374] mb-2">Select preferred area</label>
                                    <select
                                        name="preferredArea"
                                        value={formData.preferredArea}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-[#E7E0EC] rounded-lg focus:border-[#7C6FAB] focus:outline-none"
                                    >
                                        <option>Hitech City</option>
                                        <option>Banjara Hills</option>
                                        <option>Jubilee Hills</option>
                                        <option>Gachibowli</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-[#5C5374] mb-2">Any specific requirements or additional information...</label>
                                <textarea
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-[#E7E0EC] rounded-lg focus:border-[#7C6FAB] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                            <Button onClick={handleCancel} variant="outline" className="px-6 py-3">
                                Cancel
                            </Button>
                            <Button type="submit" className="px-6 py-3">
                                Submit Referral
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SubmitReferralPage;