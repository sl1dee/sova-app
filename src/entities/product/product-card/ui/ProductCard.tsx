import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import type { IProductCardProps } from '../types';
import cl from './ProductCard.module.scss';

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