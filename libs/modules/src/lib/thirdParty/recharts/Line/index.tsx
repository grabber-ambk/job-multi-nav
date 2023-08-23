import React from 'react';
import SimpleLineChart from './Components/SimpleLineChart';
import VerticalLineChart from './Components/VerticalLineChart';
import CustomizedDotLineChart from './Components/CustomizedDotLineChart';
import LineChartWithReferenceLines from './Components/LineChartWithReferenceLines';
import DashedLineChart from './Components/DashedLineChart';
import LineChartWithXAxisPading from './Components/LineChartWithXAxisPading';
import LineChartConnectNulls from './Components/LineChartConnectNulls';
import SynchronizedLineChart from './Components/SynchronizedLineChart';
import Grid from '@mui/material/Grid';

import AppComponentCard from '@crema/components/AppComponentCard';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';

const LineChart = () => {
  return (
    <>
      <AppComponentHeader
        title="Line Chart"
        description="All svg elements can be added into the LineChart component, such as defs."
        refUrl="http://recharts.org/en-US/api/LineChart"
      />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Simple Line Chart"
            component={SimpleLineChart}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Vertical Line Chart"
            component={VerticalLineChart}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Customized Dot Line Chart"
            component={CustomizedDotLineChart}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Line Chart With Reference Lines"
            component={LineChartWithReferenceLines}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Dashed Line Chart"
            component={DashedLineChart}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Line Chart With X-Axis Padding"
            component={LineChartWithXAxisPading}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Synchronized Line Chart"
            component={SynchronizedLineChart}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Line Chart Connect Nulls"
            component={LineChartConnectNulls}
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default LineChart;
