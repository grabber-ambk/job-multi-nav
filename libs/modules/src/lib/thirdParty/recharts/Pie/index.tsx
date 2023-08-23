import React from 'react';
import TwoLevelPieChart from './Components/TwoLevelPieChart';
import StraightAnglePieChart from './Components/StraightAnglePieChart';
import TwoSimplePieChart from './Components/TwoSimplePieChart';
import CustomActiveShapePieChart from './Components/CustomActiveShapePieChart';
import PieChartWithPaddingAngle from './Components/PieChartWithPaddingAngle';
import Grid from '@mui/material/Grid';

import AppComponentCard from '@crema/components/AppComponentCard';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';

const PieChart = () => {
  return (
    <>
      <AppComponentHeader
        title="Pie Chart"
        refUrl="http://recharts.org/en-US/api/PieChart/"
      />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Two Level Pie Chart"
            component={TwoLevelPieChart}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Straight Angle Pie Chart"
            component={StraightAnglePieChart}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Custom Active Shape Pie Chart"
            component={CustomActiveShapePieChart}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Two Simple Pie Chart"
            component={TwoSimplePieChart}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Pie Chart With Padding Angle"
            component={PieChartWithPaddingAngle}
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default PieChart;
