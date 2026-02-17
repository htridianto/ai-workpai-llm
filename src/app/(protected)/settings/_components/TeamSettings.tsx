import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2, UserPlus, Mail, Shield, User } from 'lucide-react';
import { UserProfile, UserRole } from '@/shared/types/types';
import { UserService } from '@/client/services/userService';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';
import { ConfirmationModal } from '@/client/components/Shared/ConfirmationModal';

export const TeamSettings: React.FC = () => {
  const { userProfile, setToast: showToast } = useDashboard();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'default' as UserRole,
    userName: '',
    bio: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await UserService.fetchUsers();
      setUsers(data);
    } catch (error: any) {
      showToast({ message: error.message || 'Failed to fetch users', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (user?: UserProfile) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'member',
        userName: user.userName || '',
        bio: user.bio || ''
      });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'member', userName: '', bio: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const updated = await UserService.updateUser(editingUser.id, formData);
        setUsers(prev => prev.map(u => u.id === editingUser.id ? updated : u));
        showToast({ message: 'User updated successfully', type: 'success' });
      } else {
        const created = await UserService.createUser(formData);
        setUsers(prev => [created, ...prev]);
        showToast({ message: 'User invited successfully', type: 'success' });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      showToast({ message: error.message || 'Action failed', type: 'error' });
    }
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    if (userToDelete.id === userProfile?.id) {
      showToast({ message: 'Cannot delete yourself', type: 'error' });
      setUserToDelete(null);
      return;
    }

    try {
      await UserService.deleteUser(userToDelete.id);
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      showToast({ message: 'User deleted successfully', type: 'success' });
      setUserToDelete(null);
    } catch (error: any) {
      showToast({ message: error.message || 'Failed to delete user', type: 'error' });
    }
  };

  const canDelete = () => {
    return userProfile?.role === 'superuser';
  };  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold mb-1">Team Management</h2>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Manage users and their permissions.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-accent-900/20"
        >
          <Plus size={16} />
          Invite User
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-charcoal-400">
          <Loader2 size={32} className="animate-spin mb-4" />
          <p>Loading users...</p>
        </div>
      ) : (        
        <div className="overflow-hidden border border-gray-200 dark:border-charcoal-800 rounded-xl">
<div className="flex items-center p-4 mb-4 text-sm rounded-lg text-accent-500" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    <span className="font-medium">Stay tuned!</span> This feature under development.
  </div>
</div>          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-charcoal-800">
              <thead className="bg-gray-50 dark:bg-charcoal-950">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Bio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Auth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-charcoal-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-charcoal-900 divide-y divide-gray-200 dark:divide-charcoal-800">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-charcoal-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-accent-100 dark:bg-accent-900/20 text-accent-600 dark:text-accent-500 flex items-center justify-center text-sm font-bold mr-4">
                          {user.name?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800 dark:text-slate-100">{user.name || 'Anonymous'}</div>
                          <div className="text-xs text-charcoal-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-charcoal-500 max-w-[150px] truncate" title={user.bio || 'No bio'}>
                        {user.bio || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs ${user.ssoAuthProvider ? 'text-accent-600 dark:text-accent-400 font-medium' : 'text-charcoal-400'}`}>
                        {user.ssoAuthProvider || 'Credentials'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-charcoal-500">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-charcoal-500">
                      {user.lastLoggedin ? new Date(user.lastLoggedin).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      {(user.id === userProfile?.id || canDelete()) && (
                      <button 
                        onClick={() => handleOpenModal(user)}
                        className="p-1.5 text-charcoal-400 hover:text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/10 rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      )}
                      {user.id !== userProfile?.id && canDelete() && (
                        <button 
                          onClick={() => setUserToDelete(user)}
                          className="p-1.5 text-charcoal-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-charcoal-400">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-charcoal-800">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {editingUser ? <Edit2 size={20} className="text-accent-500" /> : <UserPlus size={20} className="text-accent-500" />}
                {editingUser ? 'Edit User' : 'Invite New User'}
              </h3>
              <p className="text-sm text-charcoal-500 mt-1">
                {editingUser ? 'Modify user permissions and details.' : 'Send an invitation to join your workspace.'}
              </p>
            </div>

<div className="flex items-center p-4 mb-4 text-sm rounded-lg text-accent-500" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    <span className="font-medium">Stay tuned!</span> This feature under development.
  </div>
</div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-500 uppercase flex items-center gap-1.5 ml-1">
                  <User size={12} /> Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-500 uppercase flex items-center gap-1.5 ml-1">
                  <Mail size={12} /> Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-500 uppercase flex items-center gap-1.5 ml-1">
                    UserName
                </label>
                <input
                  type="text"
                  placeholder="jdoe"
                  value={formData.userName}
                  onChange={e => setFormData({ ...formData, userName: e.target.value })}
                  readOnly={!!editingUser}
                  className={`w-full px-4 py-2.5 border border-gray-200 dark:border-charcoal-700 rounded-xl outline-none transition-all ${
                    editingUser 
                      ? 'bg-gray-100 dark:bg-charcoal-800 text-charcoal-400 cursor-not-allowed' 
                      : 'bg-gray-50 dark:bg-charcoal-950 focus:ring-2 focus:ring-accent-500'
                  }`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal-500 uppercase flex items-center gap-1.5 ml-1">
                    <Shield size={12} /> Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all appearance-none"
                  >
                    <option value="default">Default</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                  </select>
                </div> */}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-500 uppercase flex items-center gap-1.5 ml-1">
                  Bio
                </label>
                <textarea
                  placeholder="Short biography..."
                  value={formData.bio}
                  rows={3}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all resize-none"
                />
              </div>

              {editingUser && (
                <div className="p-3 bg-gray-50 dark:bg-charcoal-800/50 rounded-xl space-y-2 border border-gray-100 dark:border-charcoal-800">
                  <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold text-charcoal-500">
                    <div>
                      <span className="block text-charcoal-400 mb-0.5">Authentication</span>
                      <span className="text-accent-600 dark:text-accent-500">{editingUser.ssoAuthProvider || 'Credentials'}</span>
                    </div>
                    <div>
                      <span className="block text-charcoal-400 mb-0.5">Created At</span>
                      <span className="text-slate-700 dark:text-slate-300">
                        {editingUser.createdAt ? new Date(editingUser.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-charcoal-800 hover:bg-gray-200 dark:hover:bg-charcoal-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={true}
                  className="flex-1 px-4 py-2.5 bg-accent-600 hover:bg-accent-500 text-white rounded-xl font-medium shadow-lg shadow-accent-900/20 transition-all"
                >
                  {editingUser ? 'Update User' : 'Send Invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!userToDelete}
        title="Delete User"
        message={`Are you sure you want to remove "${userToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete User"
        isDanger={true}
        onConfirm={confirmDelete}
        onCancel={() => setUserToDelete(null)}
      />
    </div>
  );
};