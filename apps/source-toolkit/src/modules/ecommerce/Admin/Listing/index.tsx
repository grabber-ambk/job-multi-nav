import AppsHeader from '@crema/components/AppsHeader';
import { Box, Grid, Hidden } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import AppsContent from '@crema/components/AppsContent';
import AppsPagination from '@crema/components/AppsPagination';
import AppSearchBar from '@crema/components/AppSearchBar';
import { FilterItem, ListingTable } from '@crema/modules/ecommerce/Admin';
import AppGridContainer from '@crema/components/AppGridContainer';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';
import Slide from '@mui/material/Slide';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { onGetEcommerceData } from '../../../../toolkit/actions';
import { FilterType } from '@crema/models/ecommerce/EcommerceApp';

const ProductListing = () => {
  const { messages } = useIntl();
  const [filterData, setFilterData] = useState<FilterType>({
    title: '',
    inStock: [],
    mrp: { start: 0, end: 30000 },
  });
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);

  const ecommerceList = useAppSelector(
    ({ ecommerce }) => ecommerce.ecommerceList
  );
  const { list = [], total = 0 } = ecommerceList;
  const loading = useAppSelector(({ common }) => common.loading);

  useEffect(() => {
    dispatch(onGetEcommerceData({ filterData, page }));
  }, [dispatch, filterData, page]);

  const onPageChange = (event: any, value: any) => {
    setPage(value);
  };

  const searchProduct = (title: string) => {
    setFilterData({ ...filterData, title });
  };

  return (
    <>
      <Box
        component="h2"
        sx={{
          fontSize: 16,
          color: 'text.primary',
          fontWeight: Fonts.SEMI_BOLD,
          mb: {
            xs: 2,
            lg: 4,
          },
        }}
      >
        {messages['sidebar.ecommerceAdmin.productListing'] as string}
      </Box>
      <AppGridContainer spacing={7}>
        <Slide direction="right" in mountOnEnter unmountOnExit>
          <Grid item xs={12} lg={9}>
            <AppCard
              title={
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
                      onChange={(event: any) =>
                        searchProduct(event.target.value)
                      }
                      placeholder={messages['common.searchHere'] as string}
                    />
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Hidden smDown>
                        <AppsPagination
                          rowsPerPage={10}
                          count={total}
                          page={page}
                          onPageChange={onPageChange}
                        />
                      </Hidden>
                    </Box>
                  </Box>
                </AppsHeader>
              }
              headerStyle={{ p: 0 }}
              contentStyle={{ p: 0 }}
            >
              <AppsContent
                sx={{
                  paddingTop: 2.5,
                  paddingBottom: 2.5,
                }}
              >
                <ListingTable productData={list || []} loading={loading} />
              </AppsContent>
              <Hidden smUp>
                <AppsPagination
                  rowsPerPage={10}
                  count={total}
                  page={page}
                  onPageChange={onPageChange}
                />
              </Hidden>
            </AppCard>
          </Grid>
        </Slide>
        <Slide direction="left" in mountOnEnter unmountOnExit>
          <Grid item xs={12} lg={3}>
            <FilterItem filterData={filterData} setFilterData={setFilterData} />
          </Grid>
        </Slide>
      </AppGridContainer>
    </>
  );
};

export default ProductListing;
