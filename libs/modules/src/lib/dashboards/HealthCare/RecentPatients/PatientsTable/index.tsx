import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/components/AppTableContainer';
import AppScrollbar from '@crema/components/AppScrollbar';
import { RecentPatientType } from '@crema/models/dashboards/HealthCare';

type Props = {
  recentPatients: RecentPatientType[];
};

const PatientsTable = ({ recentPatients }: Props) => {
  return (
    <AppTableContainer>
      <AppScrollbar style={{ height: 300 }}>
        <Table>
          <TableHead>
            <TableHeading />
          </TableHead>
          <TableBody>
            {recentPatients.map((data) => (
              <TableItem data={data} key={data.id} />
            ))}
          </TableBody>
        </Table>
      </AppScrollbar>
    </AppTableContainer>
  );
};

export default PatientsTable;

PatientsTable.defaultProps = {
  recentPatients: [],
};

PatientsTable.propTypes = {
  recentPatients: PropTypes.array,
};
