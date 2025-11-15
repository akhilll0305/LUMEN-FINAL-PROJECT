import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import UltraPremiumBackground from '../components/UltraPremiumBackground';
import MouseGlow from '../components/MouseGlow';
import AuthenticatedNav from '../components/AuthenticatedNav';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { Save, X } from 'lucide-react';
import { API_ENDPOINTS, getAuthHeaders, getJsonHeaders } from '../config/api';

export default function UpdateProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    avatar_url: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.USERS.ME, {
          headers: getAuthHeaders(),
        });
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            avatar_url: data.avatar_url || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(API_ENDPOINTS.USERS.ME, {
        method: 'PUT',
        headers: getJsonHeaders(),
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Success - navigate to view profile
        navigate('/view-profile');
      } else {
        console.error('Failed to update profile');
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

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
            Update Profile
          </h1>
          <p className="text-text-secondary text-lg">Modify your account information</p>
        </motion.div>

        <GlassCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-text-secondary text-sm mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-text-secondary text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-text-secondary text-sm mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-text-secondary text-sm mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
              />
            </div>

            {/* Avatar URL */}
            <div>
              <label htmlFor="avatar_url" className="block text-text-secondary text-sm mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                id="avatar_url"
                name="avatar_url"
                value={formData.avatar_url}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-glass-border">
              <Button type="submit" variant="primary" disabled={saving}>
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="ghost" onClick={() => navigate('/view-profile')}>
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
