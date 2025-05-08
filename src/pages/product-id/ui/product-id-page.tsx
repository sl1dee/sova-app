import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '@app/store/store.hooks.ts';
import cl from './product-id-page.module.scss';

const ProductIdPage = () => {
  const { id } = useParams();

  /**
   * Т.к. у fakerapi нет ручки products/id, мы сохраняем все продукты в store, и фильтруем их по id
   */
  const { allProducts, isLoading } = useAppSelector((state) => state.products);

  /**
   * Находим конкретный продукт по id
   */
  const product = useMemo(() => allProducts.find((p) => p.id === Number(id)), [allProducts, id]);

  if (isLoading) {
    return <div className={cl.loading}>Loading...</div>;
  }

  if (!product) {
    return (
      <div className={cl.errorContainer}>
        <h2 className={cl.errorTitle}>Error loading product</h2>
        <p className={cl.errorMessage}>The product you`re looking for could not be found or there was an error.</p>
        <Link to="/" className={cl.backLink}>
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className={cl.productPage}>
      <Link to="/" className={cl.backLink}>
        Back to Products
      </Link>

      <h1 className={cl.productTitle}>{product.name}</h1>

      <div className={cl.productContent}>
        <div className={cl.productImageContainer}>
          <div className={cl.mainImage}>
            <img src={product.image} alt={product.name} className={cl.productImage} />
          </div>

          {product?.images?.length > 0 && (
            <div className={cl.imageGallery}>
              {product.images.map((image, index) => (
                <div key={index} className={cl.galleryItem}>
                  <img src={image.url} alt={`${product.name} ${index + 1}`} className={cl.thumbnail} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={cl.productDetails}>
          <div className={cl.detailsSection}>
            <h2 className={cl.sectionTitle}>Details</h2>
            <p className={cl.description}>{product.description}</p>

            <div className={cl.specsGrid}>
              <div className={cl.specItem}>
                <h3 className={cl.specTitle}>Price</h3>
                <p className={cl.priceValue}>{product.price}</p>
              </div>
              <div className={cl.specItem}>
                <h3 className={cl.specTitle}>Net Price</h3>
                <p className={cl.priceValue}>{product.net_price}</p>
              </div>
              <div className={cl.specItem}>
                <h3 className={cl.specTitle}>Taxes</h3>
                <p className={cl.priceValue}>{product.taxes}</p>
              </div>
              <div className={cl.specItem}>
                <h3 className={cl.specTitle}>EAN</h3>
                <p className={cl.priceValue}>{product.ean}</p>
              </div>
              <div className={cl.specItem}>
                <h3 className={cl.specTitle}>UPC</h3>
                <p className={cl.priceValue}>{product.upc}</p>
              </div>
            </div>
          </div>

          {product?.categories?.length > 0 && (
            <div className={cl.categoriesSection}>
              <h3 className={cl.sectionTitle}>Categories</h3>
              <div className={cl.tagsContainer}>
                {product.categories.map((category, index) => (
                  <span key={index} className={cl.categoryTag}>
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product?.tags?.length > 0 && (
            <div className={cl.tagsSection}>
              <h3 className={cl.sectionTitle}>Tags</h3>
              <div className={cl.tagsContainer}>
                {product.tags.map((tag, index) => (
                  <span key={index} className={cl.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductIdPage;