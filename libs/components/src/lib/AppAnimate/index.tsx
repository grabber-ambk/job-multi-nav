import React, { memo } from 'react';

type AppAnimateProps = {
  [x: string]: any;
};

const AppAnimate: React.FC<AppAnimateProps> = (props) => {
  return <>{props.children}</>;
};

export default memo(AppAnimate);
