import React from 'react';
import AppCard from "@crema/components/AppCard";
import PropTypes from 'prop-types';
import StatGraphs from './StatGraphs';
import {useIntl} from 'react-intl';
import {AtcStaticType} from "@crema/models/dashboards/Crypto";
import IntlMessages from "@crema/helpers/IntlMessages";

type Props={
  data: AtcStaticType[]
}
const ATCStatics = ({data}: Props) => {
  const {messages} = useIntl();
  return (
    <AppCard title={<IntlMessages id='dashboard.crypto.atcStatics' />}>
      <StatGraphs data={data} />
    </AppCard>
  );
};

export default ATCStatics;
