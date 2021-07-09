import React from "react"
import Link from 'next/link';
import styles from './NavBar.module.css'


interface Tab {
  title: string,
  path: string
}

const Tab = (tab: Tab) => {
  const { title, path } = tab;
  return (
    <div className={styles.tab} key={title}>
      <Link href={path}>
        <a>
          <span>{title}</span>
        </a>
      </Link>
    </div>
  );
}

const TABS: Tab[] = [
  { title: "HOME", path: "/" },
  { title: "PROJECTS", path: "/projects" },
];

export const NavBar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.tabsContainer}>
        {TABS.map(Tab)}
      </div>
    </nav>
  )
}

export default NavBar