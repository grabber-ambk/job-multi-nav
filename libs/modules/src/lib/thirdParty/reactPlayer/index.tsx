import React from 'react';
import Grid from '@mui/material/Grid';

import AppComponentCard from '@crema/components/AppComponentCard';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';
import DailyMotion from './DailyMotion';

import Facebook from './Facebook';

import Mixcloud from './Mixcloud';

import SoundCloud from './SoundCloud';

import Streamable from './Streamable';
import Twitch from './Twitch';
import Vimeo from './Vimeo';
import Wistia from './Wistia';
import YouTube from './YouTube';

const ReactPlayer = () => {
  return (
    <>
      <AppComponentHeader
        title="ReactPlayer"
        description="A React component for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion."
        refUrl="https://cookpete.com/react-player/"
      />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="YouTube" component={YouTube} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Facebook" component={Facebook} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Vimeo" component={Vimeo} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Daily Motion" component={DailyMotion} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Sound Cloud" component={SoundCloud} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Streamable" component={Streamable} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Twitch" component={Twitch} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Wistia" component={Wistia} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Mixcloud" component={Mixcloud} />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default ReactPlayer;
