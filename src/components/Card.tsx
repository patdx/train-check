import { FC, ReactNode } from 'react';

export const Card: FC<{ children?: ReactNode }> = ({ children }) => (
  <div className="my-2 rounded border p-2 shadow">{children}</div>
);
