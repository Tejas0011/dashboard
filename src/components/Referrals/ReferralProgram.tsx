import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { positions, relationships, mockReferrals } from '../../data/mockData';
import { 
  Upload, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Heart, 
  Calendar, 
  Send,
  Users,
  Award,
  ExternalLink,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const ReferralProgram: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    position: '',
    relationship: '',
    yearsKnown: 1,
    linkedinProfile: '',
    currentCompany: '',
    experience: '',
    skills: ''
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  const userReferrals = mockReferrals.filter(referral => referral.referrerId === user.id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Open Google Form with pre-filled data
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe_REFERRAL_FORM_ID/viewform';
    const params = new URLSearchParams({
      'entry.111111111': user.name, // Referrer Name
      'entry.222222222': user.email, // Referrer Email
      'entry.333333333': formData.candidateName, // Candidate Name
      'entry.444444444': formData.candidateEmail, // Candidate Email
      'entry.555555555': formData.candidatePhone, // Candidate Phone
      'entry.666666666': formData.position, // Position
      'entry.777777777': formData.relationship, // Relationship
      'entry.888888888': formData.yearsKnown.toString(), // Years Known
      'entry.999999999': formData.linkedinProfile, // LinkedIn Profile
      'entry.101010101': formData.currentCompany, // Current Company
      'entry.121212121': formData.experience, // Experience
      'entry.131313131': formData.skills, // Skills
    });
    
    const formUrlWithParams = `${googleFormUrl}?${params.toString()}`;
    window.open(formUrlWithParams, '_blank');
    
    // Reset form after opening
    setTimeout(() => {
      setFormData({
        candidateName: '',
        candidateEmail: '',
        candidatePhone: '',
        position: '',
        relationship: '',
        yearsKnown: 1,
        linkedinProfile: '',
        currentCompany: '',
        experience: '',
        skills: ''
      });
      setResume(null);
      setIsSubmitting(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Hired':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Interview':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Applied':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hired':
        return 'bg-green-100 text-green-800';
      case 'Interview':
        return 'bg-blue-100 text-blue-800';
      case 'Applied':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Refer & Earn</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Know someone who would be a great fit for TravClan? Refer them and earn points when they join our team!
        </p>
      </div>

      {/* Rewards Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-600 rounded-xl text-white p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Earn Points for Every Successful Referral</h2>
          <p className="text-blue-100">Get rewarded when your referrals join and stay with TravClan</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white/20 rounded-lg p-4 mb-3">
              <Award className="h-8 w-8 mx-auto text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-1">3 Points</h3>
            <p className="text-blue-100 text-sm">When your referral completes 3 months</p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg p-4 mb-3">
              <Award className="h-8 w-8 mx-auto text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-1">2 Points</h3>
            <p className="text-blue-100 text-sm">Every 6 months thereafter</p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg p-4 mb-3">
              <Users className="h-8 w-8 mx-auto text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No Limit</h3>
            <p className="text-blue-100 text-sm">Refer as many candidates as you want</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Referral Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <User className="h-6 w-6 mr-2" />
              Submit a Referral
            </h2>
            <p className="text-gray-600 mt-1">Help us find great talent and earn rewards</p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Candidate Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Candidate's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="candidateEmail"
                        value={formData.candidateEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="candidate@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="candidatePhone"
                        value={formData.candidatePhone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+91-XXXXXXXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                      </div>
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select position</option>
                        {positions.map(position => (
                          <option key={position} value={position}>{position}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://linkedin.com/in/candidate"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Company
                    </label>
                    <input
                      type="text"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Current employer"
                    />
                  </div>
                </div>
              </div>

              {/* Relationship Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Relationship</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How do you know them? *
                    </label>
                    <select
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select relationship</option>
                      {relationships.map(relationship => (
                        <option key={relationship} value={relationship}>{relationship}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years Known *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="yearsKnown"
                        value={formData.yearsKnown}
                        onChange={handleInputChange}
                        min="1"
                        max="50"
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 5 years in software development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Skills
                    </label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="List their key skills and expertise..."
                    />
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume (Optional)</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop a resume, or{' '}
                    <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
                      browse
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                  {resume && (
                    <div className="mt-2 p-2 bg-blue-50 rounded flex items-center justify-center">
                      <span className="text-sm text-blue-700">{resume.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{isSubmitting ? 'Opening Form...' : 'Submit Referral'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* My Referrals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Users className="h-6 w-6 mr-2" />
              My Referrals
            </h2>
            <p className="text-gray-600 mt-1">Track your referral progress and earnings</p>
          </div>
          
          <div className="p-6">
            {userReferrals.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals yet</h3>
                <p className="text-gray-500">Start referring great candidates to earn points!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userReferrals.map((referral) => (
                  <div key={referral.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{referral.candidateName}</h3>
                            <p className="text-sm text-gray-500">{referral.position}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-3 w-3" />
                            <span>{referral.candidateEmail}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(referral.dateSubmitted).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                            {getStatusIcon(referral.status)}
                            <span>{referral.status}</span>
                          </span>
                          
                          {referral.pointsEarned > 0 && (
                            <div className="flex items-center space-x-1 text-green-600">
                              <Award className="h-4 w-4" />
                              <span className="font-semibold">+{referral.pointsEarned} points</span>
                            </div>
                          )}
                        </div>

                        {referral.status === 'Hired' && referral.monthsCompleted > 0 && (
                          <div className="mt-3 p-2 bg-green-50 rounded text-sm">
                            <p className="text-green-700">
                              🎉 {referral.monthsCompleted} months completed - Keep earning points!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-3 mb-2">
              <Send className="h-6 w-6 text-blue-600 mx-auto" />
            </div>
            <h4 className="font-medium text-blue-800">1. Submit</h4>
            <p className="text-sm text-blue-600">Fill out the referral form</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-3 mb-2">
              <Users className="h-6 w-6 text-blue-600 mx-auto" />
            </div>
            <h4 className="font-medium text-blue-800">2. Interview</h4>
            <p className="text-sm text-blue-600">Candidate goes through hiring process</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-3 mb-2">
              <CheckCircle className="h-6 w-6 text-blue-600 mx-auto" />
            </div>
            <h4 className="font-medium text-blue-800">3. Hired</h4>
            <p className="text-sm text-blue-600">Candidate joins TravClan</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-3 mb-2">
              <Award className="h-6 w-6 text-blue-600 mx-auto" />
            </div>
            <h4 className="font-medium text-blue-800">4. Earn</h4>
            <p className="text-sm text-blue-600">Get points at milestones</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;