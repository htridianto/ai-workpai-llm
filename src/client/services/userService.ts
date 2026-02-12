import { UserProfile } from '@/shared/types/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/restapi';

export const UserService = {
    /**
     * Fetch all users
     */
    fetchUsers: async (): Promise<UserProfile[]> => {
        const response = await fetch(`${BASE_URL}/users`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch users');
        }
        return response.json();
    },

    /**
     * Create a new user
     */
    createUser: async (data: Partial<UserProfile>): Promise<UserProfile> => {
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create user');
        }
        return response.json();
    },

    /**
     * Get a specific user by ID
     */
    getUser: async (id: string): Promise<UserProfile> => {
        const response = await fetch(`${BASE_URL}/users/${id}`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch user');
        }
        return response.json();
    },

    /**
     * Update an existing user
     */
    updateUser: async (id: string, data: Partial<UserProfile>): Promise<UserProfile> => {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to update user');
        }
        return response.json();
    },

    /**
     * Delete a user
     */
    deleteUser: async (id: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to delete user');
        }
    }
};
