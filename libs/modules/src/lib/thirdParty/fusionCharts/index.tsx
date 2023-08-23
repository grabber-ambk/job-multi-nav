import React from 'react';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import AppComponentCard from '@crema/components/AppComponentCard';
import SimpleChart from './SimpleChart';
import SimpleGuage from './SimpleGuage';
import WorldMap from './WorldMap';
import StackedColumns from './StackedColumns';
import StackedNegative from './StackedNegative';
import StackedArea from './StackedArea';

const FusionCharts = () => {
  return (
    <>
      <AppComponentHeader
        title="FusionCharts"
        description="Build beautiful web & mobile dashboards"
        refUrl="https://www.fusioncharts.com/react-charts?framework=react/"
      />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Stacked Columns"
            component={StackedColumns}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Stacked Negative"
            component={StackedNegative}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Stacked Area" component={StackedArea} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Simple Chart" component={SimpleChart} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Simple Guage" component={SimpleGuage} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="WorldMap" component={WorldMap} />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default FusionCharts;
