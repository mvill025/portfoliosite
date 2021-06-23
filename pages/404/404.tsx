import Head from "next/head"
import Link from "next/link"
import React from "react"
import NavBar from "../../components/NavBar"
import styles from "./404.module.css"

const NotFound = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>404 PAGE NOT FOUND</title>
        <meta name="404" content="There is no map here, but every one is born without one." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.main}>
        <Link href="/" passHref>
          <a className={styles.card}>
            <span className={styles.fourOhFour}>
              <h1 style={{ fontSize: "1em", margin: "0 0 -4rem 0" }}>404</h1>
              <h2 style={{ fontSize: "0.22em" }}>PAGE NOT FOUND</h2>
            </span>
            <h1>UH OH! Looks like you're lost!</h1>
            <h1>LET'S GET YOU BACK HOME</h1>
          </a>
        </Link>
      </main>
    </div>
  )
}


export default NotFound