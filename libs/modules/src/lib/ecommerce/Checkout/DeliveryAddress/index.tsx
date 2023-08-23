import React, { useState } from 'react';
import AppList from '@crema/components/AppList';
import AddressCell from './AddressCell';
import { AddressesType } from '@crema/models/ecommerce/EcommerceApp';
import { addresses } from '@crema/fakedb/data';

const DeliveryAddress = () => {
  const [selectedAddress, setSelectAddress] = useState<AddressesType>(
    addresses[1]
  );
  return (
    <AppList
      delay={200}
      data={addresses}
      renderRow={(address) => (
        <AddressCell
          key={address.id}
          address={address}
          selectedAddress={selectedAddress}
          setSelectAddress={setSelectAddress}
        />
      )}
    />
  );
};

export default DeliveryAddress;
