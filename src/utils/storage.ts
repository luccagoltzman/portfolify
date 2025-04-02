'use client';

import { UserData } from './types';

const STORAGE_KEY = 'portfolify_user_data';

// Verificar se o código está sendo executado no navegador
const isBrowser = typeof window !== 'undefined';

export const saveUserData = (userData: UserData): void => {
  if (isBrowser) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
    }
  }
};

export const loadUserData = (): UserData | null => {
  if (isBrowser) {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
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