export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

export interface UserData {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  socialLinks: SocialLinks;
  projects: Project[];
} 