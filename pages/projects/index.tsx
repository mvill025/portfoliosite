import ProjectsPage from './Projects'
import { GetStaticProps } from "next"
import { Octokit } from "@octokit/core";

import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import NavBar from '../../components/NavBar';
import { Project, ProjectsProps } from '../../models/ProjectsPage';
import styles from "./Projects.module.css";
import GitHubIcon from "../../public/GitHub-Mark-64px.png"
import RIcon from "../../public/r-programming-language.png"
import JupyterNotebookIcon from "../../public/Jupyter_logo.svg"
import TSIcon from "../../public/ts-logo-128.png"

export const getStaticProps: GetStaticProps = async (context) => {
  const octokit = new Octokit()
  const user = await octokit.request("GET /users/mvill025")
    .then(r => r.data)
  const gitHubProjects: Project[] = await octokit.request(
    "GET /users/mvill025/repos",
    { sort: "updated" }
  )
    .then(r => r.data)
    .catch(error => { console.error(error); return [] })
    .then(r => r.slice(0, 6))
    .then(r => {
      return Promise.all(r.map(async (r: any) => {
        var title = r.name
          .replace(/\-/g, ' ')
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(
            /\w\S*/g,
            (a: string) =>
              a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
          )

        var project: Project = {
          id: r.id,
          title,
          about: r.description,
          url: r.html_url,
          tags: [
            "github",
            r.language
          ]
        }

        // add data analytics tag
        if (
          r.language === "R" ||
          r.language === "Jupyter Notebook"
        ) {
          project.tags?.push("Data Analytics")
        }

        return {
          ...r,
          ...project,
        }

      }))
    })

  return {
    props: {
      gitHubProjects,
      user,
    },
    revalidate: 3600,
  }
}


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
      alt="JupyterNotebook"
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

const TypeScriptTag = () => (
  <div
    className={styles.tagImage}
    style={{ backgroundColor: "#3178C6" }}
  >
    <Image
      src={TSIcon}
      alt="TypeScript"
      height="22px"
      width="28px"
      layout="fixed"
    />
  </div>
)

const TextTag = ({ text }: any) => (
  <div className={styles.tagText}>
    <h3>{text}</h3>
  </div>
)

const ProjectCard = ({ id, title, about, url, tags }: Project) => {
  return (
    <a className={styles.card} key={id} href={url} >
      <span>
        <h2
          style={{
            whiteSpace: "nowrap",
            overflowX: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "97%",
          }}
        >
          {title}
        </h2>
        <h3 className={styles.cardAbout}>{about}</h3>
      </span>
      <span className={styles.tagsContainer}>
        {tags?.map(tag => {
          switch (tag) {
            case "github": return <GitHubTag key={tag} />
            case "R": return <RTag key={tag} />
            case "Jupyter Notebook": return <JupyterNotebookTag key={tag} />
            case "TypeScript": return <TypeScriptTag key={tag} />
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
    gitHubProjects = [],
  } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Awesome Projects</title>
      </Head>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.top}>
          <h1 style={{ margin: "0.2em 0" }}>My Projects</h1>
          <a className={styles.userGithub} href="https://github.com/mvill025">
            <GitHubTag />
            <h2>mvill025</h2>
          </a>
        </div>
        <div className={styles.projectsContainer}>
          {gitHubProjects.map(p => <ProjectCard key={p.id} {...p} />)}
        </div>
      </main>
    </div>
  )
}

export default Projects;