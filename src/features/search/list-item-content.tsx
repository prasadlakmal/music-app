import { Avatar, Chip, ListItemAvatar, ListItemText } from '@mui/material';

type ListItemContentProps = {
  artWorkUrl?: string;
  trackName: string;
  artistName: string;
  kind: string;
};

const ListItemContent = ({
  artWorkUrl,
  trackName,
  artistName,
  kind,
}: ListItemContentProps) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar src={artWorkUrl} alt={trackName} />
      </ListItemAvatar>

      <ListItemText primary={trackName} secondary={<span>{artistName}</span>} />
      <Chip label={kind} />
    </>
  );
};

export default ListItemContent;
