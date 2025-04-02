export const defaultUserData = {
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

export function saveUserData(userData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolify-userData', JSON.stringify(userData));
  }
}

export function loadUserData() {
  if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem('portfolify-userData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error('Erro ao carregar dados do usuário:', e);
        return defaultUserData;
      }
    }
  }
  return defaultUserData;
}

export function saveTheme(theme) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolify-theme', theme);
  }
}

export function loadTheme() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('portfolify-theme') || 'light';
  }
  return 'light';
}

export function applyTheme(theme) {
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
      document.body.style.backgroundColor = '#1a202c';
      document.body.style.color = '#fff';
    } else {
      html.classList.remove('dark');
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#1a202c';
    }
  }
} 