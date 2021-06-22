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
            <h1>UH OH! LOOKS LIKE YOU'RE LOST...</h1>
            <h1>404 - PAGE NOT FOUND</h1>
            <h1>BACK TO HOME</h1>
          </a>
        </Link>
      </main>
    </div>
  )
}


export default NotFound