import React, { useContext } from 'react';
import { AppProvider, AppContext } from '../../context';
import Spinner from '../layout/Spinner';
import Track from './Track';

const Tracks = () => {
  const data = useContext(AppContext);
  return (
    <AppProvider>
      {data.trackList === undefined || data.trackList.length === 0 ? (
        <Spinner />
      ) : typeof data.trackList === 'string' ? (
        <h1 className='text-3xl md:text-5xl mt-12 text-center'>
          {data.trackList}
        </h1>
      ) : (
        <>
          <div>
            <p className='text-center text-5xl md:text-6xl font-extrabold '>
              {data.heading}
            </p>
            <p className='text-center mb-4 text-xs md:text-sm font-normal'>
              {data.subHeading}
            </p>
          </div>
          <div className='flex flex-col items-center'>
            {data.trackList.map((item, index) => (
              <Track
                key={item.track.track_id}
                track={item.track}
                index={index}
              />
            ))}
          </div>
        </>
      )}
    </AppProvider>
  );
};

export default Tracks;
