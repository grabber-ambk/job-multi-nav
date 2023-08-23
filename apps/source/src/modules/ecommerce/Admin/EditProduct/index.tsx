import { useGetDataApi } from '@crema/hooks/APIHooks';
import AppLoader from '@crema/components/AppLoader';
import AppAnimate from '@crema/components/AppAnimate';
import { useEffect } from 'react';
import { isEmptyObject } from '@crema/helpers';
import AddEditProduct from '../AddEditProduct';
import { useRouter } from 'next/router';
import { ProductDataType } from '@crema/models/ecommerce/EcommerceApp';

const ProductEditPage = () => {
  const { query } = useRouter();
  const [{ apiData: currentProduct, loading }, { setQueryParams }] =
    useGetDataApi<ProductDataType | undefined>(
      '/api/ecommerce/get',
      undefined,
      {},
      false
    );

  useEffect(() => {
    if (query.all) setQueryParams({ id: query.all[0] });
  }, [query.all]);

  return loading || isEmptyObject(currentProduct) ? (
    <AppLoader />
  ) : (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <AddEditProduct selectedProd={currentProduct} />
    </AppAnimate>
  );
};
export default ProductEditPage;
