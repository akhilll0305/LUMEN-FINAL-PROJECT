import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import UltraPremiumBackground from '../components/UltraPremiumBackground';
import MouseGlow from '../components/MouseGlow';
import AuthenticatedNav from '../components/AuthenticatedNav';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import { API_ENDPOINTS, getAuthHeaders } from '../config/api';

export default function ViewProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.USERS.ME, {
          headers: getAuthHeaders(),
        });
        if (res.ok) {
          const data = await res.json();
          console.log('[ViewProfile] User data received:', data);
          console.log('[ViewProfile] Name field:', data.name);
          console.log('[ViewProfile] User type:', data.user_type);
          setUserData(data);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <PageTransition className="min-h-screen pb-20 relative overflow-hidden">
        <UltraPremiumBackground />
        <MouseGlow />
        <AuthenticatedNav />
        <div className="flex items-center justify-center h-screen">
          <p className="text-text-secondary">Loading profile...</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen pb-20 relative overflow-hidden">
      <UltraPremiumBackground />
      <MouseGlow />
      <AuthenticatedNav />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-12 space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-heading font-bold gradient-text-premium mb-2">
            My Profile
          </h1>
          <p className="text-text-secondary text-lg">View your account information</p>
        </motion.div>

        <GlassCard>
          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-glass-border">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
              {userData?.avatar_url ? (
                <img 
                  src={userData.avatar_url.startsWith('http') ? userData.avatar_url : `http://localhost:8000${userData.avatar_url}`}
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {userData?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">{userData?.name || 'User'}</h2>
              <p className="text-text-secondary">{userData?.email || ''}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan/10 rounded-lg">
                <User className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Full Name</p>
                <p className="text-text-primary font-semibold">{userData?.name || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan/10 rounded-lg">
                <Mail className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Email</p>
                <p className="text-text-primary font-semibold">{userData?.email || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan/10 rounded-lg">
                <Phone className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Phone</p>
                <p className="text-text-primary font-semibold">{userData?.phone || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan/10 rounded-lg">
                <User className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">User Type</p>
                <p className="text-text-primary font-semibold capitalize">{userData?.user_type || 'Not set'}</p>
              </div>
            </div>

            {userData?.user_type === 'business' && (
              <>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan/10 rounded-lg">
                    <User className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Business Name</p>
                    <p className="text-text-primary font-semibold">{userData?.business_name || 'Not set'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan/10 rounded-lg">
                    <User className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Contact Person</p>
                    <p className="text-text-primary font-semibold">{userData?.contact_person || 'Not set'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan/10 rounded-lg">
                    <User className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm mb-1">GSTIN</p>
                    <p className="text-text-primary font-semibold">{userData?.gstin || 'Not set'}</p>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan/10 rounded-lg">
                <Calendar className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Member Since</p>
                <p className="text-text-primary font-semibold">
                  {userData?.created_at ? new Date(userData.created_at).toLocaleDateString() : 'Not available'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-8 border-t border-glass-border flex gap-4">
            <Button variant="primary" onClick={() => navigate('/update-profile')}>
              <Edit className="w-4 h-4" />
              Update Profile
            </Button>
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
