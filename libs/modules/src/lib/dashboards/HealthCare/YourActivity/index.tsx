import React from 'react';
import AppCard from "@crema/components/AppCard";
import AppSelect from "@crema/components/AppSelect";
import {useIntl} from 'react-intl';
import ActivityGraph from './ActivityGraph';
import PropTypes from 'prop-types';
import {YourActivityType} from "@crema/models/dashboards/HealthCare";

type Props = {
  data: YourActivityType[]
}

const YourActivity = ({data}: Props) => {
  const handleChange = (value: string) => {
    console.log('value', value);
  };
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['healthCare.yourActivity'] as string}
      action={
        <AppSelect
          menus={['This Week', 'Last Week', 'This Month']}
          defaultValue='This Week'
          onChange={handleChange}
        />
      }
    >
      <ActivityGraph data={data} />
    </AppCard>
  );
};

export default YourActivity;

YourActivity.propTypes = {
  data: PropTypes.array.isRequired,
};
