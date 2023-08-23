import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from "@crema/components/AppTableContainer";
import AppScrollbar from "@crema/components/AppScrollbar";
import {GainerLooserType} from "@crema/models/dashboards/Crypto";

type Props ={
  data: GainerLooserType[];
}
const GainerLooserTable = ({data}: Props) => {
  return (
    <AppTableContainer>
      <AppScrollbar style={{maxHeight: 320}}>
        <Table stickyHeader>
          <TableHead>
            <TableHeading />
          </TableHead>
          <TableBody>
            {data.map((data: GainerLooserType) => (
              <TableItem data={data} key={data.id} />
            ))}
          </TableBody>
        </Table>
      </AppScrollbar>
    </AppTableContainer>
  );
};

export default GainerLooserTable;

GainerLooserTable.propTypes = {
  data: PropTypes.array,
};
