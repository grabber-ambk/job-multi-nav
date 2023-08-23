import React from 'react';
import { Grid } from '@mui/material';
import AppGridContainer from '@crema/components/AppGridContainer';
import AppAnimate from '@crema/components/AppAnimate';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import {
  AgeOfAudience,
  Browser,
  BudgetStatistic,
  MarketingCampaign,
  NewCustomers,
  PopularProducts,
  RecentOrders,
  ReportCard,
  Revenue,
  RevenueGraph,
  SalesReport,
  StateCard,
  TopInquiries,
  WeeklyBestSellers,
} from '@crema/modules/dashboards/ECommerce';
import AppLoader from '@crema/components/AppLoader';
import {EcommerceType} from "@crema/models/dashboards/Ecommerce";

const ECommerce = () => {
  const [{ apiData: ecommerceData, loading }] = useGetDataApi<EcommerceType>(
    '/dashboard/ecommerce'
  );

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppGridContainer>
            {ecommerceData.stateData.map((data) => (
              <Grid key={data.id} item xs={12} sm={6} lg={3}>
                <StateCard data={data} />
              </Grid>
            ))}
            <Grid item xs={12} md={9} lg={9}>
              <SalesReport />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <BudgetStatistic />
            </Grid>

            {ecommerceData.reportData.map((data) => (
              <Grid key={data.id} item xs={12} sm={6} lg={3}>
                <ReportCard data={data} />
              </Grid>
            ))}

            <Grid item xs={12} md={6} lg={5} xl={4}>
              <TopInquiries topInquiries={ecommerceData.topInquiries} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={4}>
              <WeeklyBestSellers data={ecommerceData.bestSellers} />
            </Grid>
            <Grid item xs={12} md={12} lg={3} xl={4}>
              <Revenue revenueData={ecommerceData.revenueData} />
            </Grid>

            <Grid item xs={12} md={12} lg={8} xl={9}>
              <RecentOrders recentOrders={ecommerceData.recentOrders} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <AgeOfAudience audienceData={ecommerceData.audienceData} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MarketingCampaign
                marketingCampaign={ecommerceData.marketingCampaign}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <PopularProducts
                popularProducts={ecommerceData.popularProducts}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <RevenueGraph />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <NewCustomers newCustomers={ecommerceData.newCustomers} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Browser browserData={ecommerceData.browser} />
            </Grid>
          </AppGridContainer>
        </AppAnimate>
      )}
    </>
  );
};

export default ECommerce;
