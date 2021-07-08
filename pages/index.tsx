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
      <NavBar/>
      <main className={styles.main}>
        <h1>Hello!</h1>
        <h2>Welcome to my website!</h2>
      </main>
    </div>
  )
}
