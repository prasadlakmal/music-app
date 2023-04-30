import { ReactNode } from 'react';
import { ListItem as MuiListItem } from '@mui/material';

type ListItemProps = {
  children?: ReactNode;
};

const ListItem = ({ children, ...props }: ListItemProps) => {
  return (
    <MuiListItem component="div" {...props} style={{ margin: 0 }}>
      {children}
    </MuiListItem>
  );
};

export default ListItem;
