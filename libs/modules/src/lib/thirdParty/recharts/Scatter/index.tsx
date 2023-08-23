import React from 'react';
import SimpleScatterChart from './Components/SimpleScatterChart';
import ThreeDimScatterChart from './Components/ThreeDimScatterChart';
import Grid from '@mui/material/Grid';

import AppComponentCard from '@crema/components/AppComponentCard';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';

const Scatter = () => {
  return (
    <>
      <AppComponentHeader
        title="ScatterChart"
        refUrl="http://recharts.org/en-US/api/ScatterChart"
      />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Simple Scatter Chart"
            component={SimpleScatterChart}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Three Dim Scatter Chart"
            component={ThreeDimScatterChart}
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Scatter;
