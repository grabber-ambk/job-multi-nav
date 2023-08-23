import React from 'react';
import SimpleAreaChart from './Components/SimpleAreaChart';
import StackedAreaChart from './Components/StackedAreaChart';
import PercentAreaChart from './Components/PercentAreaChart';
import AreaChartConnectNulls from './Components/AreaChartConnectNulls';
import SynchronizedAreaChart from './Components/SynchronizedAreaChart';
import Grid from '@mui/material/Grid';

import AppComponentCard from '@crema/components/AppComponentCard';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';

const AreaChart = () => {
  return (
    <>
      <AppComponentHeader
        title="Area Chart"
        description="All svg elements can be added into the AreaChart component, such as defs, linearGradient, etc."
        refUrl="http://recharts.org/en-US/api/AreaChart/"
      />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Simple modal" component={SimpleAreaChart} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Stacked Area Chart"
            component={StackedAreaChart}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="AreaChart Connect Nulls"
            component={AreaChartConnectNulls}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Synchronized Area Chart"
            component={SynchronizedAreaChart}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Percent Area Chart"
            component={PercentAreaChart}
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};
export default AreaChart;
