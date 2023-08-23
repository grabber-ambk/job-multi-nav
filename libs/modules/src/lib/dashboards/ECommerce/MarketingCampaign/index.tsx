import React from 'react';
import AppCard from "@crema/components/AppCard";
import {useIntl} from 'react-intl';
import MarketingTable from './MarketingTable';
import PropTypes from 'prop-types';
import AppSelect from "@crema/components/AppSelect";
import {MarketingCampaignType} from "@crema/models/dashboards/Ecommerce";

type Props = {
  marketingCampaign: MarketingCampaignType[];
}

const MarketingCampaign = ({marketingCampaign}: Props) => {
  const {messages} = useIntl();
  const handleSelectionType = (data: string) => {
    console.log('data: ', data);
  };

  return (
    <AppCard
      title={messages['eCommerce.marketingCampaign'] as string}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      action={
        <AppSelect
          menus={[
            messages['dashboard.thisWeek'],
            messages['dashboard.lastWeeks'],
            messages['dashboard.lastMonth'],
          ]}
          defaultValue={messages['dashboard.thisWeek']}
          onChange={handleSelectionType}
        />
      }
    >
      <MarketingTable marketingCampaign={marketingCampaign} />
    </AppCard>
  );
};

export default MarketingCampaign;

MarketingCampaign.propTypes = {
  marketingCampaign: PropTypes.array,
};
