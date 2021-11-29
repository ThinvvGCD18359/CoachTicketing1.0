import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import coachPic from '../../images/coach.png';

const useStyles = makeStyles((theme) => ({
  mainBanner: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'fill',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainBannerContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function Banner(props) {
  const classes = useStyles();
  const banner = {
    title: 'Ticketing Coach',
    description:
      "The best solutions to travel",    
  };

  return (
    <Paper className={classes.mainBanner} style={{ backgroundImage: `url(${coachPic})` }}>
      {<img style={{ display: 'none' }} src={coachPic} alt='coach' />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainBannerContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {banner.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {banner.description}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}