import Chip from '@mui/material/Chip';

import { getStatus } from '../utils/status';

const StatusChip = ({ status, statusText, variant = 'outlined' }) => {
  if (status) {
    statusText = getStatus(status);
  }

  let color = 'default';
  switch (statusText) {
    case 'cancelled':
      color = 'error';
      break;
    case 'finished':
      color = 'secondary';
      break;
  }
  return (
    <>
      <Chip label={statusText} variant={variant} color={color} sx={{ width: 100, textTransform: 'capitalize' }} />
    </>
  );
};

export default StatusChip;
