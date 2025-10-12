import type React from 'react';

export type ComponentWithChildrenProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export const ComponentWithChildren: React.FC<ComponentWithChildrenProps> = ({
  onClick,
  children,
}) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);
