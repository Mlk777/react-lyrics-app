import React, { useContext } from 'react';
import { AppProvider, AppContext } from '../../context';
import Spinner from '../layout/Spinner';
import Track from '../tracks/Track';

const Tracks = () => {
  const data = useContext(AppContext);
  return (
    <AppProvider>
      {data.trackList === undefined || data.trackList.length === 0 ? (
        <Spinner />
      ) : typeof data.trackList === 'string' ? (
        <h1 className='text-center'>{data.trackList}</h1>
      ) : (
        <>
          <h3 className='text-center mb-5'>{data.heading}</h3>
          <div className='row'>
            {data.trackList.map(item => (
              <Track key={item.track.track_id} track={item.track} />
            ))}
          </div>
        </>
      )}
    </AppProvider>
  );
};

export default Tracks;
