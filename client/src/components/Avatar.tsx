import { Grid, Avatar } from '@mui/material'
import { avatarStyle } from '../constants/styles';

const AvatarCircle = ({title}: {title: string}) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
    >
      <Avatar style={avatarStyle}>
      </Avatar>
      <h2>{title}</h2>
    </Grid>
  )
};

export default AvatarCircle;