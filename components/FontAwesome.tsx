import React, { FC } from 'react';

export const FontAwesome: FC<{ name?: string }> = ({ name }) => {
  return (
    <i
      className={'fa ' + name}
      style={{ verticalAlign: 'middle' }}
      aria-hidden="true"
    />
  );
};
