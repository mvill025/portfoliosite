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
          <h1>Hello</h1>
          <h1>Michael Ryan Santos Villanueva</h1>
          <h2> Mobile / Web / Data </h2>
        </div>
        <h3 className={styles.about}>
          I am a software developer based in Los Angeles, CA looking to build
          (and occasionally design) new applications and understand the data of the worlds.
        </h3>
      </main>
    </div>
  )
}
