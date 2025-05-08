import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import type { IProduct } from '@shared/api/products/products.types.ts';
import cl from './product-card.module.scss';

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className={cl.wrapper}>
      <div className={cl.card}>
        <h3 className={cl.name}>{product.name}</h3>
        <p className={cl.description}>{product.description}</p>
        <div className={cl.price}>Price: {product.price}</div>
      </div>
    </Link>
  );
};

export default memo(ProductCard);