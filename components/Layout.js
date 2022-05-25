import Head from 'next/head';
import Link from 'next/link';

import styles from './Layout.module.css';

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.png' />
        <meta
          name='description'
          content='Learn how to build a personal website using Next.js'
        />
        <title>{pageTitle ? `${pageTitle} - ` : ''}Our Website</title>
      </Head>
      <header className={styles.header}>
        <Link href='/'>
          <a className={styles.homelink} href='/'>
            Be Wild
          </a>
        </Link>
        <nav>
          <Link href='/about'>
            <a className={styles.navlink} href='/about'>
              About
            </a>
          </Link>
          <Link href='/terms'>
            <a className={styles.navlink} href='/terms'>
              Terms
            </a>
          </Link>
          <Link href='/campuses'>
            <a className={styles.navlink} href='/campuses'>
              Campuses
            </a>
          </Link>
          <Link href='/showRequest'>
            <a className={styles.navlink} href='/showRequest'>
              Show Request
            </a>
          </Link>
          <Link href='/articles'>
            <a className={styles.navlink} href='/articles'>
              Articles
            </a>
          </Link>
        </nav>
      </header>
      <main className={styles.container}>{children}</main>
      <footer className={styles.footer}>
        <p>
          Made with{' '}
          <span role='img' aria-label='love'>
            💗
          </span>{' '}
          by{' '}
          <a target='_blank' rel='noreferrer' href='https://wildcodeschool.com'>
            Wild Code School
          </a>
        </p>
      </footer>
    </>
  );
}
