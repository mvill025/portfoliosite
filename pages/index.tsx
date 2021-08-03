import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Michael Ryan Santos Villanueva</title>
        <meta name="Michael Ryan Santos Villanueva" content="Everything you need to know about dis dude" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Michael Ryan Santos Villanueva</h1>
          <h2> Mobile / Web / Data </h2>
          <h3 className={styles.introSubtitle}>
            Software Developer based in Los Angeles, CA
            <br />
            Improving the world one line of code at a time.
          </h3>
        </div>
        <div className={styles.aboutContainer}>
          <h2>About</h2>
          <div className={styles.aboutSectionContainer}>
            <div className={styles.aboutSection}>
              
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
