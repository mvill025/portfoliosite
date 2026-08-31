import type { GetStaticProps } from "next";
import { Octokit } from "@octokit/core";

import Head from "next/head";
import Image, { type StaticImageData } from "next/image";
import NavBar from "../../components/NavBar";
import type { Project, ProjectsProps } from "../../models/ProjectsPage";
import styles from "./Projects.module.css";
import GitHubIcon from "../../public/GitHub-Mark-64px.png";
import RIcon from "../../public/r-programming-language.png";
import JupyterNotebookIcon from "../../public/Jupyter_logo.svg";
import TSIcon from "../../public/ts-logo-128.png";

const GITHUB_USER = "mvill025";
const MAX_PROJECTS = 6;

/** "my-cool-repo" / "myCoolRepo" -> "My Cool Repo" */
const toTitleCase = (name: string): string =>
  name
    .replace(/-/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(
      /\w\S*/g,
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    );

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const octokit = new Octokit();

  let gitHubProjects: Project[] = [];

  try {
    const { data } = await octokit.request("GET /users/{username}/repos", {
      username: GITHUB_USER,
      sort: "updated",
      per_page: MAX_PROJECTS,
    });

    gitHubProjects = data.map((repo) => {
      const tags: (string | null)[] = ["github", repo.language ?? null];

      if (repo.language === "R" || repo.language === "Jupyter Notebook") {
        tags.push("Data Analytics");
      }

      return {
        id: Number(repo.id),
        title: toTitleCase(repo.name),
        about: repo.description ?? null,
        url: repo.html_url,
        tags,
      };
    });
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
  }

  return {
    props: { gitHubProjects },
    revalidate: 3600,
  };
};

const ImageTag = ({
  src,
  alt,
  width,
  backgroundColor,
}: {
  src: StaticImageData;
  alt: string;
  width: number;
  backgroundColor: string;
}) => (
  <div className={styles.tagImage} style={{ backgroundColor }}>
    <Image src={src} alt={alt} height={22} width={width} />
  </div>
);

const GitHubTag = () => (
  <ImageTag src={GitHubIcon} alt="GitHub" width={22} backgroundColor="#fff" />
);

const TextTag = ({ text }: { text: string }) => (
  <div className={styles.tagText}>
    <h3>{text}</h3>
  </div>
);

const ProjectCard = ({ title, about, url, tags }: Project) => (
  <a className={styles.card} href={url}>
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
      {tags.map((tag) => {
        switch (tag) {
          case "github":
            return <GitHubTag key={tag} />;
          case "R":
            return (
              <ImageTag
                key={tag}
                src={RIcon}
                alt="R"
                width={28}
                backgroundColor="#1F40B4"
              />
            );
          case "Jupyter Notebook":
            return (
              <ImageTag
                key={tag}
                src={JupyterNotebookIcon}
                alt="Jupyter Notebook"
                width={22}
                backgroundColor="#fff"
              />
            );
          case "TypeScript":
            return (
              <ImageTag
                key={tag}
                src={TSIcon}
                alt="TypeScript"
                width={28}
                backgroundColor="#3178C6"
              />
            );
          case null:
            return null;
          default:
            return <TextTag key={tag} text={tag} />;
        }
      })}
    </span>
  </a>
);

export const Projects = ({ gitHubProjects = [] }: ProjectsProps) => (
  <div className={styles.container}>
    <Head>
      <title>Awesome Projects</title>
    </Head>
    <NavBar />
    <main className={styles.main}>
      <div className={styles.top}>
        <h1 style={{ margin: "0.2em 0" }}>My Projects</h1>
        <a
          className={styles.userGithub}
          href={`https://github.com/${GITHUB_USER}`}
        >
          <GitHubTag />
          <h2>{GITHUB_USER}</h2>
        </a>
      </div>
      <div className={styles.projectsContainer}>
        {gitHubProjects.map((p) => (
          <ProjectCard key={p.id} {...p} />
        ))}
      </div>
    </main>
  </div>
);

export default Projects;
