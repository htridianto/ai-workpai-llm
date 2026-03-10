
import { Organization } from '@/shared/types/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/aissistant';

export class OrganizationService {
  static async fetchOrganizations(): Promise<Organization[]> {
    const response = await fetch(`${BASE_URL}/organizations`);
    if (!response.ok) throw new Error('Failed to fetch organizations');
    return response.json();
  }

  static async createOrganization(data: { name: string; description?: string }): Promise<Organization> {
    const response = await fetch(`${BASE_URL}/organizations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create organization');
    return response.json();
  }

  static async updateOrganization(id: string, data: Partial<Organization>): Promise<Organization> {
    const response = await fetch(`${BASE_URL}/organizations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update organization');
    return response.json();
  }

  static async deleteOrganization(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/organizations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete organization');
  }

  static async addUserToOrganization(organizationId: string, userId: string, role: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/organizations/${organizationId}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role }),
    });
    if (!response.ok) throw new Error('Failed to add user to organization');
  }
}
