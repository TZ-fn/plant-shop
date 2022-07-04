import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { removeFromWishlist } from 'features/wishlist/wishlistSlice';
import BinIcon from 'public/icons/binIcon.svg';
import ProductMiniature from 'components/elements/ProductMiniature/ProductMiniature';
import { formatCurrency } from 'utils/formatCurrency';
import { WishlistProductProps } from 'types/types';
import styles from './WishlistProduct.module.scss';

export default function WishlistProduct({
  id,
  name,
  image,
  price,
}: WishlistProductProps): ReactElement {
  const dispatch = useDispatch();
  const handleRemovingFromFavourites = (id: string | undefined) => {
    if (id !== undefined) {
      dispatch(removeFromWishlist(id));
    }
  };

  return (
    <li className={styles.productContainer}>
      <ProductMiniature source={image} />
      <p className={styles.productName}>{name}</p>
      <p className={styles.price}>Price: {formatCurrency(price)}</p>
      <button
        type='button'
        className={styles.removeButton}
        data-id={id}
        onClick={(e) => handleRemovingFromFavourites(e.currentTarget.dataset.id)}
      >
        <span className='visually-hidden'>Remove item from the wishlist</span>
        <Image src={BinIcon.src} width={'40px'} height={'40px'} alt='' layout='fixed' />
      </button>
    </li>
  );
}
