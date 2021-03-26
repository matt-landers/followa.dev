export interface Developer {
  name: string;
  languages: Array<{ name: string }>;
  twitter: string;
  github?: string;
  personalBlog?: string;
  company?: string;
}
