import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import NavBar from '../../components/NavBar';
import { Project, ProjectsProps } from './models';
import styles from "./Projects.module.css"

const getProjects = async () => {
}

export async function getStaticProps(context: any) {
  const res = await fetch(`https://api.github.com/users/mvil025`)
  return {
    props: {
      user: res
    }
  }
}


export const Projects = (props: ProjectsProps) => {
  const {
    projects,
    user
  } = props;

  const ProjectCard = ({ id, title, about, url }: Project) => {
    return (
      <a className={styles.card} key={id} href={url} >
        <span>
          <h1 style={{ fontSize: "1em" }}>{title}</h1>
          <h2 style={{ fontSize: "0.8em" }}>{about}</h2>
        </span>
      </a>
    )
  }

  return (
    <div>
      <Head>
        <title>Awesome Projects</title>
      </Head>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.projectsContainer}>
          {projects.map(p => ProjectCard(p))}
        </div>
      </main>
    </div>
  )
}

export default Projects;