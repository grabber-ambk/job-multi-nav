import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/components/AppTableContainer';
import AppLoader from '@crema/components/AppLoader';
import {ProductDataType} from "@crema/models/ecommerce/EcommerceApp";

type Props = {
  productData: ProductDataType[];
  loading: boolean
}

const ProductTable = ({productData, loading}: Props) => {
  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading/>
        </TableHead>
        <TableBody>
          {loading ? (
            <AppLoader/>
          ) : (
            productData.map((data) => <TableItem data={data} key={data.id}/>)
          )}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default ProductTable;
