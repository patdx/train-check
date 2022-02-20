import { FC } from 'react';

export const Card: FC = ({ children }) => (
  <div className="p-2 border rounded my-2 shadow">{children}</div>
);
