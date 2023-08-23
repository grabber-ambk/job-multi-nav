import React, { useEffect, useState } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import { useIntl } from 'react-intl';
import { Button, Hidden } from '@mui/material';
import AppsHeader from '@crema/components/AppsHeader';
import AppsContent from '@crema/components/AppsContent';
import AppsPagination from '@crema/components/AppsPagination';
import Box from '@mui/material/Box';
import AppInfoView from '@crema/components/AppInfoView';
import AppSearchBar from '@crema/components/AppSearchBar';
import { OrderTable } from '@crema/modules/ecommerce/Orders';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { getRecentOrders } from '../../../toolkit/actions';

const Orders = () => {
  const { messages } = useIntl();
  const dispatch = useAppDispatch();
  const recentOrders = useAppSelector(
    ({ ecommerce }) => ecommerce.recentOrders
  );
  const orderCount = useAppSelector(({ ecommerce }) => ecommerce.orderCount);
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState('');

  const onPageChange = (event: any, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getRecentOrders(search, page));
  }, [dispatch, search, page]);

  const onSearchOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  return (
    <>
      <AppsContainer
        title={messages['eCommerce.recentOrders'] as string}
        fullView
      >
        <AppsHeader>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width={1}
            justifyContent="space-between"
          >
            <AppSearchBar
              iconPosition="right"
              overlap={false}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onSearchOrder(event)
              }
              placeholder={messages['common.searchHere'] as string}
            />
            <Box display="flex" flexDirection="row" alignItems="center">
              <Button variant="contained" color="primary">
                Add Order
              </Button>

              <Hidden smDown>
                <AppsPagination
                  rowsPerPage={10}
                  count={orderCount}
                  page={page}
                  onPageChange={onPageChange}
                />
              </Hidden>
            </Box>
          </Box>
        </AppsHeader>

        <AppsContent
          sx={{
            paddingTop: 2.5,
            paddingBottom: 2.5,
          }}
        >
          <OrderTable orderData={recentOrders} />
        </AppsContent>

        <Hidden smUp>
          <AppsPagination
            rowsPerPage={10}
            count={orderCount}
            page={page}
            onPageChange={onPageChange}
          />
        </Hidden>
      </AppsContainer>
      <AppInfoView />
    </>
  );
};

export default Orders;
