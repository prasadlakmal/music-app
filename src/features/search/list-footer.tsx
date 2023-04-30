import { Skeleton } from '@mui/material';

import ListItem from './list-item';

const ListFooter = () => {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      Loading...
    </div>
  );
};

export default ListFooter;
