import AppGrid from '@crema/components/AppGrid';
import AppLoader from '@crema/components/AppLoader';
import { isEmptyObject } from '@crema/helpers';
import { ClientItem } from '@crema/modules/invoice';
import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { onGetClientList } from '../../../toolkit/actions';

const Clients = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const clientsList = useAppSelector(
    ({ invoiceApp }) => invoiceApp.clientsList
  );
  const loading = useAppSelector(({ common }) => common.loading);

  useEffect(() => {
    dispatch(onGetClientList());
  }, [dispatch]);

  return !isEmptyObject(clientsList) ? (
    <Box>
      <Box>
        <Button
          color="primary"
          variant="contained"
          sx={{ display: 'block', ml: 'auto', mb: 3 }}
          onClick={() => router.push('/invoice/clients/add')}
        >
          Add Clients
        </Button>
      </Box>
      <AppGrid
        responsive={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
        }}
        loading={loading}
        data={clientsList}
        renderRow={(client) => <ClientItem client={client} />}
      />
    </Box>
  ) : (
    <AppLoader />
  );
};

export default Clients;
