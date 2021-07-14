import React from "react"
import Link from 'next/link';
import styles from './NavBar.module.css'


interface Tab {
  title: string,
  path: string,
  type: string
}

const TABS: Tab[] = [
  { title: "HOME",      path: "/",          type: "link"  },
  { title: "PROJECTS",  path: "/projects",  type: "link"  },
  { title: "RESUME",    path: "/resume",    type: "dl"    },
];

const Tab = (tab: Tab) => {
  const { title, path } = tab;
  return (
    <div className={styles.tabContainer} key={title}>
      <button className={styles.tab}>
        <Link href={path}>
          <a style={{ padding: "0 0.5em" }}>
            {title}
           </a>
        </Link>
      </button>
    </div>
  );
}

export const NavBar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.navContent}>
        <h1 style={{ padding: "0 1em" }}>{""}</h1>
        <div className={styles.tabsContainer}>
          {TABS.map(Tab)}
        </div>
      </div>
    </nav>
  )
}

export default NavBar