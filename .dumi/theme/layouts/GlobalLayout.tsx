import { useOutlet } from 'dumi';
import React from 'react';
import { LayoutRoot, LayoutRootV1 } from '../../../packages/c-react/src'

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();

  return (
      <>
      {outlet}
      <LayoutRoot />
      <LayoutRootV1 />
      </>
  );
};

export default GlobalLayout;
