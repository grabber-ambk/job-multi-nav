import React from 'react';
import TicketSupportTable from './TicketSupportTable';
import AppCard from '@crema/components/AppCard';
import {TicketSupportDaumType} from "@crema/models/dashboards/CRM";
import IntlMessages from "@crema/helpers/IntlMessages";
import {useIntl} from "react-intl";

type Props={
  ticketSupportData: TicketSupportDaumType[]

};
const TicketSupport = ({ ticketSupportData=[] } : Props) => {
  const { messages } = useIntl();

  return (
    <AppCard
      contentStyle={{ px: 0 }}
      title={messages['dashboard.latestTicketSupport'] as string}
      action={messages['common.viewAll'] as string}
    >
      <TicketSupportTable ticketSupportData={ticketSupportData} />
    </AppCard>
  );
};

export default TicketSupport;
