import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Fonts } from '@crema/constants/AppEnums';
import AppAnimate from '@crema/components/AppAnimate';
import AppGridContainer from '@crema/components/AppGridContainer';
import { CartTable, OrderSummary } from '@crema/modules/ecommerce/Carts';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import {
  getCartItems,
  removeCartItem,
  updateCartItem,
} from '../../../toolkit/actions';
import { CartItemsType } from '@crema/models/ecommerce/EcommerceApp';

const Carts = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector(({ ecommerce }) => ecommerce.cartItems);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const onRemoveItem = (data: CartItemsType) => {
    dispatch(removeCartItem(data));
  };

  const onDecrement = (data: CartItemsType) => {
    if (data.count > 1) {
      dispatch(updateCartItem({ ...data, count: data.count - 1 }));
    } else {
      dispatch(removeCartItem(data));
    }
  };
  const onIncrement = (data: CartItemsType) => {
    dispatch(updateCartItem({ ...data, count: data.count + 1 }));
  };

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box>
        <Box
          component="h2"
          sx={{
            color: 'text.primary',
            fontWeight: Fonts.BOLD,
            mb: 6,
            fontSize: 16,
          }}
        >
          <IntlMessages id="sidebar.ecommerce.cart" />
        </Box>
        <AppGridContainer>
          <Grid item xs={12} md={8}>
            <AppCard
              contentStyle={{ px: 0 }}
              footer={
                <Box
                  sx={{
                    mt: 4,
                    width: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      router.push('/ecommerce/products');
                    }}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      router.push('/ecommerce/checkout');
                    }}
                  >
                    Checkout
                  </Button>
                </Box>
              }
            >
              <CartTable
                cartItems={cartItems}
                onRemoveItem={onRemoveItem}
                onDecrement={onDecrement}
                onIncrement={onIncrement}
              />
            </AppCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary cartItems={cartItems} />
          </Grid>
        </AppGridContainer>
      </Box>
    </AppAnimate>
  );
};

export default Carts;
