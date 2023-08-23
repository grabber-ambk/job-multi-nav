import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import AppLoader from '@crema/components/AppLoader';

// eslint-disable-next-line react/display-name
const withData = (ComposedComponent: any) => (props: any) => {
  const { user, isLoading } = useAuthUser();
  const { asPath } = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (!user && !isLoading) {
      Router.push('/signin' + (queryParams ? '?' + queryParams : ''));
    }
  }, [user, isLoading, queryParams]);

  if (!user || isLoading) return <AppLoader />;

  return <ComposedComponent {...props} />;
};
export default withData;
