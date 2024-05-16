import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <div className={styles.imageContainer}>
        <Image
          alt="mango logo"
          width={400}
          height={100}
          src={'/mango_logo.png'}
          priority
        />
      </div>
      <div className={styles.linkContainer}>
        <Link href="/exercise1" className={styles.link}>
          Exercise 1
        </Link>
        <Link href="/exercise2" className={styles.link}>
          Exercise 2
        </Link>
      </div>
    </main>
  );
}
