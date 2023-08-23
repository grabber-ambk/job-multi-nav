import React, { useEffect } from 'react';
import AppCard from '@crema/components/AppCard';
import AppGridContainer from '@crema/components/AppGridContainer';

import AppAnimate from '@crema/components/AppAnimate';
import { useRouter } from 'next/router';
import AppInfoView from '@crema/components/AppInfoView';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import {
  Header,
  ProductImageSlide,
  ProductView,
  SimilarProduct,
} from '@crema/modules/ecommerce/ProductDetail';
import AppLoader from '@crema/components/AppLoader';
import { ProductDataType } from '@crema/models/ecommerce/EcommerceApp';

const ProductDetail = () => {
  const { query } = useRouter();
  const [{ apiData: currentProduct, loading }, { setQueryParams }] =
    useGetDataApi<ProductDataType>(
      '/api/ecommerce/get',
      {} as ProductDataType,
      { id: query?.all?.[0] },
      false
    );

  useEffect(() => {
    setQueryParams({ id: query?.all?.[0] });
  }, [query?.all?.[0]]);

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : currentProduct ? (
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
