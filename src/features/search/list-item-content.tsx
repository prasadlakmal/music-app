import { Avatar, ListItemAvatar, ListItemText } from '@mui/material';

type ListItemContentProps = {
  artWorkUrl?: string;
  trackName: string;
  artistName: string;
};

const ListItemContent = ({
  artWorkUrl,
  trackName,
  artistName,
}: ListItemContentProps) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar src={artWorkUrl} />
      </ListItemAvatar>

      <ListItemText primary={trackName} secondary={<span>{artistName}</span>} />
    </>
  );
};

export default ListItemContent;
