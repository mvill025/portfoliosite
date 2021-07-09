export interface ProjectsProps {
  user: any,
  projects: Project[],
  isLoading: boolean,
}

export interface Project {
  id: string,
  title: string,
  about: string,
  url: string,
  tags?: string[],
}