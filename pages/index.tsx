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
          <h2> Full-Stack / Data </h2>
          <h3 className={styles.introSubtitle}>
            Software Developer based in Los Angeles, CA
            <br />
            Improving the world one build at a time.
          </h3>
        </div>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutSectionsContainer}>
            <div className={styles.aboutSection}>
              <h2>Web / Mobile</h2>
              <p>web and mobile</p>
            </div>
            <div className={styles.aboutSection}>
              <h2>Backend</h2>
              <p>Backend</p>
            </div>
            <div className={styles.aboutSection}>
              <h2>Data</h2>
              <p>Data</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
