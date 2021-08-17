export interface ProjectsProps {
  user: any,
  gitHubProjects: Project[],
  isLoading: boolean,
}

export interface Project {
  id: string,
  title: string,
  about: string,
  url: string,
  tags?: string[],
}