import React from 'react';
import { Save } from 'lucide-react';

interface ProfileSettingsProps {
  profile: { name: string; email: string; bio: string; password?: string };
  setProfile: (p: { name: string; email: string; bio: string; password?: string }) => void;
  onSave: () => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, setProfile, onSave }) => {
  
  // Profile data is managed by parent (SettingsPage)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">My Profile</h2>
        <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Manage your personal account details.</p>
      </div>
      
      <div className="flex items-center gap-6 pb-6 border-b border-gray-200 dark:border-charcoal-800">
        <div className="w-20 h-20 rounded-full bg-accent-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-accent-500/20">
          {profile.name.charAt(0)}
        </div>
        <div>
          <button className="px-4 py-2 bg-white dark:bg-charcoal-800 border border-gray-300 dark:border-charcoal-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-charcoal-700 transition-colors">
            Change Avatar
          </button>
        </div>
      </div>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
        className="grid gap-6 max-w-lg"
      >
        <div>
          <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Full Name</label>
          <input 
            type="text" 
            name="name"
            autoComplete="name"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email"
            autoComplete="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Bio</label>
          <textarea 
             name="bio"
             value={profile.bio}
             onChange={(e) => setProfile({...profile, bio: e.target.value})}
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
             value={profile.password || ''}
             onChange={(e) => setProfile({...profile, password: e.target.value})}
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