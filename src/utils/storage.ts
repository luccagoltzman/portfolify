'use client';

import { UserData } from './types';

const STORAGE_KEY = 'portfolify_user_data';

export const saveUserData = (userData: UserData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }
};

export const loadUserData = (): UserData | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
      }
    }
  }
  return null;
};

export const getEmptyUserData = (): UserData => {
  return {
    name: '',
    title: '',
    bio: '',
    avatarUrl: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: ''
    },
    projects: []
  };
}; 