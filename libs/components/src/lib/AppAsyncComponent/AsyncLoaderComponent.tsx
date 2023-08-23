import dynamic, { DynamicOptions, Loader } from 'next/dynamic';
import React from 'react';
import AppLoader from '../AppLoader';

const AsyncLoaderComponent = (importComponent: DynamicOptions | Loader) => {
  return dynamic(importComponent, {
    loading: () => <AppLoader />,
  });
};
export default AsyncLoaderComponent;
