
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2, Building, Users } from 'lucide-react';
import { Organization } from '@/shared/types/types';
import { OrganizationService } from '@/client/services/organizationService';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';
import { ConfirmationModal } from '@/client/components/Shared/ConfirmationModal';

export const OrganizationSettings: React.FC = () => {
  const { userProfile, setToast: showToast } = useDashboard();  
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orgToDelete, setOrgToDelete] = useState<Organization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);


  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    setIsLoading(true);
    try {
      const data = await OrganizationService.fetchOrganizations();
      setOrganizations(data);
    } catch (error: any) {
      showToast({ message: error.message || 'Failed to fetch organizations', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (org?: Organization) => {
    if (org) {
      setEditingOrg(org);
      setFormData({
        name: org.name || '',
        description: org.description || ''
      });
    } else {
      setEditingOrg(null);
      setFormData({ name: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingOrg) {
        const updated = await OrganizationService.updateOrganization(editingOrg.id, formData);
        setOrganizations(prev => prev.map(o => o.id === editingOrg.id ? updated : o));
        showToast({ message: 'Organization updated successfully', type: 'success' });
      } else {
        const created = await OrganizationService.createOrganization(formData);
        setOrganizations(prev => [created, ...prev]);
        showToast({ message: 'Organization created successfully', type: 'success' });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      showToast({ message: error.message || 'Action failed', type: 'error' });
    }
  };

  const confirmDelete = async () => {
    if (!orgToDelete) return;

    setIsProcessing(true);
    try {
      await OrganizationService.deleteOrganization(orgToDelete.id);
      setOrganizations(prev => prev.filter(o => o.id !== orgToDelete.id));
      showToast({ message: 'Organization deleted successfully', type: 'success' });
      setOrgToDelete(null);
    } catch (error: any) {
      showToast({ message: error.message || 'Failed to delete organization', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const canDelete = () => {
    return userProfile?.role === 'superuser';
  };  

  const canEdit = (org: Organization) => {
    return org.id == userProfile?.id;
  };  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold mb-1">Organization Management</h2>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Manage your organizations.</p>
        </div>
        {canDelete() && (
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-accent-900/20"
          >
            <Plus size={16} />
            New Organization
          </button>
        )}
      </div>

<div className="flex items-center p-4 mb-4 text-sm rounded-lg text-accent-500" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    <span className="font-medium">Stay tuned!</span> This feature under development.
  </div>
</div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-charcoal-400">
          <Loader2 size={32} className="animate-spin mb-4" />
          <p>Loading organizations...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">          
          {organizations.map((org) => (
            <div key={org.id} className="bg-gray-50 dark:bg-charcoal-800/50 border border-gray-200 dark:border-charcoal-800 rounded-2xl p-6 transition-all hover:border-accent-500/50 group">
              <div className="flex items-center mb-4 space-x-2">
                <div className="h-12 w-12 rounded-xl bg-accent-100 dark:bg-accent-900/20 text-accent-600 dark:text-accent-500 flex items-center justify-center">
                  <Building size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{org.name}</h3>
                <div className="flex ms-auto gap-2 opacity-0 group-hover:opacity-100 transition-opacity">                  
                  {canEdit(org) && (
                    <button onClick={() => handleOpenModal(org)} className="p-2 text-charcoal-400 hover:text-accent-500 hover:bg-white dark:hover:bg-charcoal-800 rounded-lg shadow-sm transition-all border border-transparent hover:border-gray-200 dark:hover:border-charcoal-700">
                      <Edit2 size={16} />
                    </button>
                  )}
                  {canDelete() && (
                    <button onClick={() => setOrgToDelete(org)} className="p-2 text-charcoal-400 hover:text-red-500 hover:bg-white dark:hover:bg-charcoal-800 rounded-lg shadow-sm transition-all border border-transparent hover:border-gray-200 dark:hover:border-charcoal-700">
                      <Trash2 size={16} />
                    </button>
                  )}                  
                </div>
              </div>
              {/* <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{org.name}</h3> */}
              <p className="text-sm text-charcoal-500 dark:text-charcoal-400 line-clamp-2 mb-4 h-10">
                {org.description || 'No description provided.'}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-charcoal-700">
                <div className="flex items-center gap-1.5 text-xs font-medium text-charcoal-500">
                  <Users size={14} />
                  <span>Managed Members</span>
                </div>
              </div>
            </div>
          ))}
          {organizations.length === 0 && (
            <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200 dark:border-charcoal-800 rounded-2xl">
              <Building size={48} className="mx-auto text-charcoal-300 dark:text-charcoal-700 mb-4" />
              <p className="text-charcoal-500">No organizations found. Create one to get started.</p>
            </div>
          )}
        </div>
      )}

      {/* Organization Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-charcoal-800">
              <h3 className="text-xl font-bold">{editingOrg ? 'Edit Organization' : 'Create Organization'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-500 uppercase ml-1">Organization Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-500 uppercase ml-1">Description</label>
                <textarea
                  value={formData.description}
                  rows={3}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none transition-all resize-none"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-charcoal-800 rounded-xl font-medium">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-accent-600 text-white rounded-xl font-medium">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!orgToDelete}
        title="Delete Organization"
        message={`Are you sure you want to delete "${orgToDelete?.name}"? All associated workspaces will be unlinked.`}
        confirmLabel="Delete"
        isDanger={true}
        onConfirm={confirmDelete}
        onCancel={() => setOrgToDelete(null)}
        isLoading={isProcessing}
      />

    </div>
  );
};
