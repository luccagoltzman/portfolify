export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  image?: string;
  link: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent?: boolean;
}

export interface UserData {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  profilePicture?: string;
  socialLinks: SocialLinks;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
} 