import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import MainLogo from 'public/mainLogo.svg';
import NavBar from './NavBar/NavBar';
import SearchBar from './SearchBar/SearchBar';
import LoginIcon from 'public/icons/loginIcon.svg';
import AccountIcon from 'public/icons/accountIcon.svg';
import EmptyBasketIcon from 'public/icons/emptyBasketIcon.svg';
import FullBasketIcon from 'public/icons/fullBasketIcon.svg';
import WishlistIcon from 'public/icons/wishlistIcon.svg';
import WishlistIconEmpty from 'public/icons/wishlistIconEmpty.svg';
import styles from './Header.module.scss';
import ProductCountBadge from 'components/elements/ProductCountBadge/ProductCountBadge';

export default function Header(): ReactElement {
  const basket = useSelector((state: RootState) => state.basket.products);
  const wishlist = useSelector((state: RootState) => state.wishlist.products);
  const productsInBasket = basket.reduce((count, product) => (count += product.quantity), 0);
  const productsInWishlist = wishlist.length;
  const isUserAuthorised = useSelector((state: RootState) => state.authorisation.isUserAuthorised);

  return (
    <header>
      <div className={styles.headerContainer}>
        <Link href={'/'}>
          <div className={styles.logoContainer}>
            <div className={styles.innerLogoContainer}>
              <Image src={MainLogo.src} width={100} height={100} layout='responsive' />
            </div>
            <h1 className={styles.logoText}>PlantShop</h1>
          </div>
        </Link>

        <NavBar />

        <SearchBar />

        <div className={styles.userControlPanel}>
          <Link href={'/wishlist'}>
            <a className={styles.controlItem}>
              {productsInWishlist > 0 && (
                <ProductCountBadge quantity={productsInWishlist} type='wishlist' />
              )}
              {wishlist.length === 0 ? (
                <Image src={WishlistIconEmpty.src} width={40} height={40} />
              ) : (
                <Image src={WishlistIcon.src} width={40} height={40} />
              )}
              WishList
            </a>
          </Link>
          <Link href={'/basket'}>
            <a className={styles.controlItem}>
              {productsInBasket > 0 && (
                <ProductCountBadge quantity={productsInBasket} type='basket' />
              )}
              {basket.length === 0 ? (
                <Image src={EmptyBasketIcon.src} width={40} height={40} />
              ) : (
                <Image src={FullBasketIcon.src} width={40} height={40} />
              )}
              Basket
            </a>
          </Link>
          {isUserAuthorised ? (
            <Link href={'/account'}>
              <a className={styles.controlItem}>
                <Image src={AccountIcon.src} width={40} height={40} />
                Account
              </a>
            </Link>
          ) : (
            <Link href={'/login'}>
              <a className={styles.controlItem}>
                <Image src={LoginIcon.src} width={40} height={40} />
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
