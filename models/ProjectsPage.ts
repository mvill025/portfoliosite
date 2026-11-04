export interface ProjectsProps {
  gitHubProjects: Project[];
}

export interface Project {
  id: number;
  title: string;
  about: string | null;
  url: string;
  tags: (string | null)[];
}
