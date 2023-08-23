import React from 'react';

import Index from '../src/pages';
import { customTestRender } from '../custom-test-render';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = customTestRender(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
