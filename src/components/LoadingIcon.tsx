import React, { FC } from 'react';

import { FaSpinner } from 'react-icons/fa';

export const LoadingIcon: FC = () => {
  return <FaSpinner className="animate-spin" />;
};
