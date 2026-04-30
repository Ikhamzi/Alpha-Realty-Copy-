import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { ArrowLeft, Phone, Mail } from 'lucide-react';

const samplePending = [
    {
        id: 'REF1234567892',
        name: 'Amit Patel',
        referrer: 'Priya Sharma (women-pg)',
        status: 'Pending Verification',
        phone: '+91 98765 43212',
        email: 'amit.patel@email.com',
        occupation: 'Software Engineer - IT Department',
        propertyType: 'plot',
        budget: '₹50 Lakhs',
        paymentMode: 'loan',
        timeline: 'Within 2 Months',
        location: 'Hitech City',
        details: 'Looking for a plot to build a custom home'
    }
];

const sampleVerified = [
    {
        id: 'REF9876543210',
        name: 'Priya Singh',
        referrer: 'Rahul Kumar (student)',
        status: 'Verified Lead',
        phone: '+91 91234 56789',
        email: 'priya.singh@email.com',
        occupation: 'Doctor',
        propertyType: 'apartment',
        budget: '₹1.2 Cr',
        paymentMode: 'full-payment',
        timeline: 'Within 1 Month',
        location: 'Jubilee Hills',
        details: 'Looking for 3BHK luxury apartment'
    }
];

const OperationsDashboard = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('pending');
    const [currentLead, setCurrentLead] = useState(samplePending[0]);

    const leads = view === 'pending' ? samplePending : sampleVerified;

    const markFake = () => {
        alert('Marked as fake');
    };

    const verifyLead = () => {
        alert('Verified & proceeded');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <Button variant="outline" onClick={() => navigate('/')} className="mb-4 flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Landing
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-800">Operations Dashboard</h1>
                    <p className="text-gray-600 mt-1">Verify referrals and manage lead lifecycle</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Toggle Tabs */}
                <div className="flex bg-white rounded-xl shadow-sm border p-1 mb-8">
                    <Button
                        variant={view === 'pending' ? 'primary' : 'outline'}
                        className="flex-1"
                        onClick={() => setView('pending')}
                    >
                        Pending Verification ({samplePending.length})
                    </Button>
                    <Button
                        variant={view === 'verified' ? 'primary' : 'outline'}
                        className="flex-1"
                        onClick={() => setView('verified')}
                    >
                        Verified Leads ({sampleVerified.length})
                    </Button>
                </div>

                {/* Lead List */}
                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Leads Sidebar */}
                    <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="font-bold text-lg mb-4">{view === 'pending' ? 'Pending' : 'Verified'} ({leads.length})</h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {leads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className={`p-4 rounded-xl cursor-pointer transition hover:bg-cream ${currentLead.id === lead.id ? 'bg-lavender-100 border-2 border-lavender-400' : 'hover:shadow-md'}`}
                                    onClick={() => setCurrentLead(lead)}
                                >
                                    <div className="font-semibold text-sm">{lead.name}</div>
                                    <div className="text-xs text-gray-600">Ref ID: {lead.id}</div>
                                    <div className="text-xs text-gray-500">{lead.referrer}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Current Lead Details */}
                    <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8">
                        {currentLead && (
                            <div>
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{currentLead.name}</h2>
                                        <p className="text-lg text-gray-600 mb-1">Ref ID: {currentLead.id}</p>
                                        <p className="text-sm text-gray-500">{currentLead.referrer}</p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-xs font-bold ${currentLead.status === 'Pending Verification' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                                        {currentLead.status}
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Contact</label>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                <Phone className="w-5 h-5 text-gray-500" />
                                                <span className="font-mono">{currentLead.phone}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                <Mail className="w-5 h-5 text-gray-500" />
                                                <span>{currentLead.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                                            <p className="p-3 bg-gray-50 rounded-xl">{currentLead.occupation}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Property Type</label>
                                                <p className="p-2 bg-gray-50 rounded-lg font-medium">{currentLead.propertyType}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Budget</label>
                                                <p className="p-2 bg-gray-50 rounded-lg font-medium">{currentLead.budget}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Payment Mode</label>
                                                <p className="p-2 bg-gray-50 rounded-lg">{currentLead.paymentMode}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Timeline</label>
                                                <p className="p-2 bg-gray-50 rounded-lg">{currentLead.timeline}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location Preference</label>
                                    <p className="p-3 bg-blue-50 rounded-xl font-semibold">{currentLead.location}</p>
                                </div>

                                <div className="border-t pt-6 mt-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Additional Details</label>
                                    <p className="p-4 bg-gray-50 rounded-xl whitespace-pre-wrap">{currentLead.details}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 mt-10 pt-6 border-t">
                                    <Button variant="outline" className="flex-1 h-12 bg-red-50 border-red-200 text-red-700 hover:bg-red-100">
                                        Mark as Fake
                                    </Button>
                                    <Button className="flex-1 h-12 bg-green-500 text-white hover:bg-green-600">
                                        Verify & Proceed
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperationsDashboard;
