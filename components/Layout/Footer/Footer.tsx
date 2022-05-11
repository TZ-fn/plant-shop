import Link from 'next/link';
import Image from 'next/image';
import MainLogo from 'public/mainLogo.svg';
import styles from './Footer.module.scss';
import SocialIcons from 'components/SocialIcons/SocialIcons';

export default function Header() {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <Link href={'/'}>
          <div className={styles.logoContainer}>
            <Image src={MainLogo.src} width={50} height={50} />
            <h1 className={styles.logoText}>PlantShop</h1>
          </div>
        </Link>
        <SocialIcons />
        <p className={styles.textContainer}>
          Copyright © 2022 - present | <span className={styles.nameHighlight}>PlantShop</span> | All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
