import { FC } from 'react';

export const Card: FC = ({ children }) => (
  <div className="my-2 rounded border p-2 shadow">{children}</div>
);
