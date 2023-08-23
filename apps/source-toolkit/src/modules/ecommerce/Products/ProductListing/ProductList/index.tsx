import React from 'react';
import ListItem from './ListItem';
import AppList from '@crema/components/AppList';
import ListEmptyResult from '@crema/components/AppList/ListEmptyResult';
import { ProductDataType } from '@crema/models/ecommerce/EcommerceApp';

type Props = {
  ecommerceList: ProductDataType[];
  loading: boolean;
};

const ProductList = ({ ecommerceList, loading }: Props) => {
  return (
    <AppList
      delay={200}
      data={ecommerceList}
      renderRow={(item) => <ListItem item={item} key={item.id} />}
      ListEmptyComponent={
        <ListEmptyResult content="No product found" loading={loading} />
      }
    />
  );
};

export default ProductList;
