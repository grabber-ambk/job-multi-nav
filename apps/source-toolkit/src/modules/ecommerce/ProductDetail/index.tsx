import React, { useEffect } from 'react';
import AppCard from '@crema/components/AppCard';
import AppGridContainer from '@crema/components/AppGridContainer';

import AppAnimate from '@crema/components/AppAnimate';
import { useRouter } from 'next/router';
import AppInfoView from '@crema/components/AppInfoView';
import { Header, ProductView } from '@crema/modules/ecommerce/ProductDetail';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { getProductDetail } from '../../../toolkit/actions';
import ProductImageSlide from './ProductImageSlide';
import SimilarProduct from './SimilarProduct';

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const all = query.all;

  const currentProduct = useAppSelector(
    ({ ecommerce }) => ecommerce.currentProduct
  );

  useEffect(() => {
    if (all) dispatch(getProductDetail(all[0]));
  }, [dispatch, all]);

  return (
    <>
      {currentProduct ? (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppCard>
            <Header product={currentProduct} />
            <AppGridContainer>
              <ProductImageSlide product={currentProduct} />
              <ProductView product={currentProduct} />
            </AppGridContainer>
            <SimilarProduct />
          </AppCard>
        </AppAnimate>
      ) : null}
      <AppInfoView />
    </>
  );
};

export default ProductDetail;
