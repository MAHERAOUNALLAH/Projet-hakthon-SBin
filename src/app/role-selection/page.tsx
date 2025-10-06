'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserRole } from '@/types/database';

export default function RoleSelectionPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  const handleRoleSelection = async (role: UserRole) => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.emailAddresses[0].emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          role: role
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Failed to create user profile');
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Select Your Role
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Choose how you'll be using the Smart Bin system
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Regular User */}
            <div 
              className={`p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedRole === UserRole.USER 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300'
              }`}
              onClick={() => setSelectedRole(UserRole.USER)}
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Regular User
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Report issues, track nearby bins, and contribute to waste management in your community.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <li>• Report bin issues</li>
                <li>• View nearby bins</li>
                <li>• Track collection schedules</li>
                <li>• Community features</li>
              </ul>
            </div>

            {/* Sanitation Worker */}
            <div 
              className={`p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedRole === UserRole.SANITATION_WORKER 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300'
              }`}
              onClick={() => setSelectedRole(UserRole.SANITATION_WORKER)}
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Sanitation Worker
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Manage collection routes, update bin status, and track your daily tasks efficiently.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <li>• Manage collection routes</li>
                <li>• Update bin status</li>
                <li>• Track daily tasks</li>
                <li>• Worker dashboard</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => selectedRole && handleRoleSelection(selectedRole)}
            disabled={!selectedRole || loading}
            className="mt-12 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Profile...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
