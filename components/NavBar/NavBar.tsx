import Link from "next/link";
import styles from "./NavBar.module.css";

interface Tab {
  title: string;
  path: string;
  type: "link" | "download";
}

const TABS: Tab[] = [
  { title: "HOME", path: "/", type: "link" },
  { title: "PROJECTS", path: "/projects", type: "link" },
  {
    title: "RESUME",
    path: "/MichaelRyanSantosVillanuevaResume.pdf",
    type: "download",
  },
];

const Tab = ({ title, path, type }: Tab) => (
  <div className={styles.tabContainer}>
    <button className={styles.tab}>
      {type === "download" ? (
        <a href={path} style={{ padding: "0 0.5em" }} download>
          {title}
        </a>
      ) : (
        <Link href={path} style={{ padding: "0 0.5em" }}>
          {title}
        </Link>
      )}
    </button>
  </div>
);

export const NavBar = () => (
  <nav className={styles.container}>
    <div className={styles.navContent}>
      <h1 style={{ padding: "0 1em" }}>{""}</h1>
      <div className={styles.tabsContainer}>
        {TABS.map((tab) => (
          <Tab key={tab.title} {...tab} />
        ))}
      </div>
    </div>
  </nav>
);

export default NavBar;
