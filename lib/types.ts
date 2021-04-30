export interface Developer {
  name: string;
  languages: Array<{ name: string }>;
  twitter: string;
  github?: string;
  personalBlog?: string;
  company?: string;
}

export interface Profile {
  id: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
}
