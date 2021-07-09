import { GetStaticProps } from "next"
import { Octokit } from "@octokit/core";
import { Project } from "./models";

export const getStaticProps: GetStaticProps = async (context) => {
  const octokit = new Octokit()
  const user = await octokit.request("GET /users/mvill025")
    .then(r => r.data)
  const projects: Project[] = await octokit.request(
    "GET /users/mvill025/repos",
    { sort: "updated" }
  )
    .then(r => r.data)
    .then(r => r.map((r: any) => {
      var title = r.name
        .replace(/\-/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(
          /\w\S*/g,
          (a: string) => a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
        )
      var project: Project = {
        id: r.id,
        title,
        about: r.about ?? "No About",
        url: r.html_url,
        tags: [
          "github",
          r.language
        ]
      }

      // add data analytics tag
      if (r.language === "R" || r.language === "Jupyter Notebook") {
        project.tags?.push("Data Analytics")
      }

      return project
    }))
  return {
    props: {
      projects,
    },
    revalidate: 300,
  }
}

export default getStaticProps;