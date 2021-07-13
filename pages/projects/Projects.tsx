import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import NavBar from '../../components/NavBar';
import { Project, ProjectsProps } from './models';
import styles from "./Projects.module.css";
import GitHubIcon from "../../public/GitHub-Mark-64px.png"
import RIcon from "../../public/r-programming-language.png"
import JupyterNotebookIcon from "../../public/Jupyter_logo.svg"

const GitHubTag = () => (
  <div
    className={styles.tagImage}
    style={{ backgroundColor: "#fff" }}
  >
    <Image
      src={GitHubIcon}
      alt="GitHub"
      height="22px"
      width="22px"
      layout="fixed"
    />
  </div>
)

const JupyterNotebookTag = () => (
  <div
    className={styles.tagImage}
    style={{ backgroundColor: "#fff" }}
  >
    <Image
      src={JupyterNotebookIcon}
      alt="GitHub"
      height="22px"
      width="22px"
      layout="fixed"
    />
  </div>
)

const RTag = () => (
  <div
    className={styles.tagImage}
    style={{ backgroundColor: "#1F40B4" }}
  >
    <Image
      src={RIcon}
      alt="R"
      height="22px"
      width="28px"
      layout="fixed"
    />
  </div>
)

const TextTag = ({ text }: any) => (
  <div className={styles.tagText}>
    <h2>{text}</h2>
  </div>
)

const ProjectCard = ({ id, title, about, url, tags }: Project) => {
  return (
    <a className={styles.card} key={id} href={url} >
      <span>
        <h1
          style={{
            fontSize: "1em",
            marginBottom: "-0.5em",
            marginTop: "0.2em",
            whiteSpace: "nowrap",
            overflow: "scroll",
          }}
        >
          {title}
        </h1>
        <h2 style={{ fontSize: "0.6em", height: "3em" }}>{about}</h2>
      </span>
      <span className={styles.tagsContainer}>
        {tags?.map(tag => {
          switch (tag) {
            case "github": return <GitHubTag key={tag} />
            case "R": return <RTag key={tag} />
            case "Jupyter Notebook": return <JupyterNotebookTag key={tag} />
            case null: return
            default: return <TextTag key={tag} text={tag} />
          }
        })}
      </span>
    </a>
  )
}

export const Projects = (props: ProjectsProps) => {
  const {
    projects = [],
  } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Awesome Projects</title>
      </Head>
      <NavBar />
      <main className={styles.main}>
        <div>
          <h1>My Projects</h1>
        </div>
        <div className={styles.projectsContainer}>
          {projects.map(p => <ProjectCard key={p.id} {...p} />)}
        </div>
      </main>
    </div>
  )
}

export default Projects;