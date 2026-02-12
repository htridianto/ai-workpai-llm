import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { UserProfile } from '@/shared/types/types';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';
import Image from 'next/image';

interface ProfileSettingsProps {      
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = () => {  
  let{ userProfile, setUserProfile, setToast: showToast } = useDashboard();
  const [profile, setProfile] = useState<UserProfile | null>();

  const handleSaveProfile = () => {
    if (profile && profile?.userName !== 'demo') {
        setUserProfile(profile);
        showToast({ 
            message: 'Profile Updated Successfully!', 
            type: 'success',
            subMessage: 'Changes have been saved to your active session.'
        });
    } else {
        showToast({ 
            message: 'Access Restricted', 
            type: 'error',
            subMessage: 'Profile saving is currently only enabled for the demo account.'
        });
    }
  };

  useEffect(() => {
    if(userProfile && !profile) setProfile(userProfile);
  }, [userProfile]);

  if (!profile) {
    return <p>Memuat data...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">My Profile</h2>
        <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Manage your personal account details.</p>
      </div>
      
      <div className="flex items-center gap-6 pb-6 border-b border-gray-200 dark:border-charcoal-800">
        <div className="w-20 h-20 rounded-full bg-accent-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-accent-500/20">
          {
            profile?.image ? (
              <Image 
                src={profile.image} 
                alt="Avatar"
                width={128}  
                height={128}  
                className="w-full h-full rounded-full"
              />
            ) : (
              profile?.displayName?.toLocaleUpperCase().charAt(0)
            )
          }
        </div>
        <div>
          <span className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">{profile?.userName}</span>
          <span className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Role: {profile?.role}</span>
          <span className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">
            Auth Provider: {profile?.ssoAuthProvider}
          </span>          
          <span className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">
            Last Logged In: {profile?.lastLoggedin ? new Date(profile.lastLoggedin).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) : 'Never logged in'}
          </span>          
        </div>
      </div>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveProfile();
        }}
        className="grid gap-6 max-w-lg"
      >
        <div>
          <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Full Name</label>
          <input 
            type="text" 
            name="name"
            autoComplete="name"
            value={profile?.displayName}
            onChange={(e) => setProfile({...profile!, displayName: e.target.value})}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email"
            autoComplete="email"
            value={profile?.email}
            onChange={(e) => setProfile({...profile!, email: e.target.value})}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Bio</label>
          <textarea 
             name="bio"
             value={profile?.bio}
             onChange={(e) => setProfile({...profile!, bio: e.target.value})}
             rows={3}
             className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all resize-none"
             placeholder="Tell us a little about yourself..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">New Password (Optional)</label>
          <input 
             type="password"
             name="new-password"
             autoComplete="new-password"
             value={profile?.password || ''}
             onChange={(e) => setProfile({...profile!, password: e.target.value})}
             className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
             placeholder="Leave empty to keep current password"
          />
        </div>

        <div className="pt-4 flex flex-col md:flex-row gap-4">
          <button 
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-accent-600 hover:bg-accent-500 text-white rounded-xl shadow-lg shadow-accent-900/20 transition-all font-medium"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};