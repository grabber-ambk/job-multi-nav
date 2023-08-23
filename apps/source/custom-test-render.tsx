import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import AppProviders from './AppProviders';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <AppProviders>{children}</AppProviders>;
};

Wrapper.propTypes = {
  children: PropTypes.node,
};

export const customTestRender = (component: any, options = {}) => {
  return render(component, { wrapper: Wrapper, ...options });
};
