import { CSSProperties, forwardRef, ReactNode } from 'react';
import { List as MuiList } from '@mui/material';

type ListProps = {
  style?: CSSProperties;
  children?: ReactNode;
};

const List = forwardRef<HTMLDivElement, ListProps>(
  ({ style, children }, listRef) => {
    return (
      <MuiList
        style={{ padding: 0, ...style, margin: 0 }}
        component="div"
        ref={listRef}
      >
        {children}
      </MuiList>
    );
  }
);

List.displayName = 'List';

export default List;
