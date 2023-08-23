import React from 'react';
import {useIntl} from 'react-intl';
import ActivitiesItem from './ActivitiesItem';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import AppGridContainer from "@crema/components/AppGridContainer";
import AppCard from "@crema/components/AppCard";
import type {ActivityType} from "@crema/models/dashboards/HealthCare";

type Props = {
  activities: ActivityType[]
}

const Activities = ({activities}: Props) => {
  const {messages} = useIntl();
  return (
    <AppCard title={messages['dashboard.crypto.activities'] as string}>
      <AppGridContainer>
        {activities.map((activities, index) => (
          <Grid item xs={6} sm={4} md={6} lg={6} xl={4} key={index}>
            <ActivitiesItem activities={activities}/>
          </Grid>
        ))}
      </AppGridContainer>
    </AppCard>
  );
};

export default Activities;

Activities.propTypes = {
  activities: PropTypes.array.isRequired,
};
