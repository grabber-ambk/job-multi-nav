import React from 'react';
import {Avatar, Box, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import type {RecentContactType} from "@crema/models/dashboards/Crypto";

type Props = {
  recentContact: RecentContactType
}

const RecentContact = ({recentContact}: Props) => {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box sx={{mb: 2.5}}>
        <Avatar
          sx={{
            width: {xs: 50, md: 60, lg: 70},
            height: {xs: 50, md: 60, lg: 70},
          }}
          src={recentContact.image}
          alt={recentContact.name}
        />
      </Box>
      <Typography
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {recentContact.name}
      </Typography>
    </Box>
  );
};

export default RecentContact;

RecentContact.propTypes = {
  recentContact: PropTypes.object.isRequired,
};
