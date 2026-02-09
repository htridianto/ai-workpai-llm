import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { UserProfile } from '../../../../types';

interface TeamSettingsProps {
  users: UserProfile[];
  onDeleteUser: (id: string) => void;
  onInviteUser: () => void;
}

export const TeamSettings: React.FC<TeamSettingsProps> = ({ users, onDeleteUser, onInviteUser }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold mb-1">Team Management</h2>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Manage users and their permissions.</p>
        </div>
        <button 
          onClick={onInviteUser}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-charcoal-800 border border-gray-300 dark:border-charcoal-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-charcoal-700 transition-colors"
        >
          <Plus size={16} />
          Invite User
        </button>
      </div>

      <div className="overflow-hidden border border-gray-200 dark:border-charcoal-800 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-charcoal-800">
          <thead className="bg-gray-50 dark:bg-charcoal-950">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-charcoal-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-charcoal-900 divide-y divide-gray-200 dark:divide-charcoal-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-charcoal-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-charcoal-200 dark:bg-charcoal-700 flex items-center justify-center text-xs font-bold mr-3">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.name}</div>
                      <div className="text-sm text-charcoal-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 capitalize">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.status === 'active' ? (
                    <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Invited
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => onDeleteUser(user.id)}
                    className="text-charcoal-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};