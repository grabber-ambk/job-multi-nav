import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import ProductGrid from './ProductGrid';

import ProductList from './ProductList';
import { alpha, Box, Hidden } from '@mui/material';
import { onGetEcommerceData } from '../../../../toolkit/actions';
import { useThemeContext } from '@crema/context/ThemeContextProvider';
import AppsHeader from '@crema/components/AppsHeader';
import ProductHeader from '../ProductHeader';
import AppsContent from '@crema/components/AppsContent';
import { VIEW_TYPE } from '@crema/modules/ecommerce/Products';
import AppsFooter from '@crema/components/AppsFooter';
import AppsPagination from '@crema/components/AppsPagination';
import { FilterDataType } from '@crema/models/ecommerce/EcommerceApp';

type Props = {
  filterData: FilterDataType;
  setFilterData: (data: FilterDataType) => void;
  viewType: string;
  setViewType: (data: string) => void;
};

const ProductListing = ({
  filterData,
  viewType,
  setViewType,
  setFilterData,
}: Props) => {
  const dispatch = useAppDispatch();
  const { theme } = useThemeContext();
  const [page, setPage] = useState(0);

  const ecommerceList = useAppSelector(
    ({ ecommerce }) => ecommerce.ecommerceList
  );
  const { list = [], total = 0 } = ecommerceList;
  const loading = useAppSelector(({ common }) => common.loading);

  useEffect(() => {
    dispatch(onGetEcommerceData({ filterData, page }));
  }, [dispatch, filterData, page]);

  const onPageChange = (event: any, value: number) => {
    setPage(value);
  };

  const searchProduct = (title: string) => {
    setFilterData({ ...filterData, title });
  };
  return (
    <>
      <AppsHeader>
        <ProductHeader
          list={list}
          viewType={viewType}
          page={page}
          totalProducts={total}
          onPageChange={onPageChange}
          onSearch={searchProduct}
          setViewType={setViewType}
        />
      </AppsHeader>

      <AppsContent
        style={{
          backgroundColor: alpha(theme.palette.background.default, 0.6),
        }}
      >
        <Box
          sx={{
            width: '100%',
            flex: 1,
            display: 'flex',
            py: 2,
            px: 4,
            height: 1,
            '& > div': {
              width: '100%',
            },
          }}
        >
          {viewType === VIEW_TYPE.GRID ? (
            <ProductGrid ecommerceList={list} loading={loading} />
          ) : (
            <ProductList ecommerceList={list} loading={loading} />
          )}
        </Box>
      </AppsContent>
      <Hidden smUp>
        {list.length > 0 ? (
          <AppsFooter>
            <AppsPagination
              count={total}
              rowsPerPage={10}
              page={page}
              onPageChange={onPageChange}
            />
          </AppsFooter>
        ) : null}
      </Hidden>
    </>
  );
};

export default ProductListing;
