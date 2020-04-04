import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Track = ({ track, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  let linkStyle;

  if (isHovered) {
    linkStyle = { backgroundColor: '#d6d4d4' };
  } else {
    linkStyle = { backgroundColor: '#f5f5f530' };
  }

  const onMouseOver = e => {
    setIsHovered(true);
  };

  const onMouseLeave = e => {
    setIsHovered(false);
  };

  return (
    <Link
      to={`lyrics/track/${track.track_id}`}
      className='w-9/12 m-4 border-2 rounded-md md:rounded-none md:border-t-0 md:border-l-0 md:border-r-0 md:border-b-2 border-gray-300'
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={linkStyle}
    >
      <div className='flex flex-col md:grid md:grid-cols-3 justify-between p-4 items-start md:items-center'>
        <div className='flex items-center mb-2 md:mb-0'>
          <div className='md:text-lg font-thin'>{index + 1}</div>
          <h5 className='text-xl md:text-lg font-bold ml-2'>
            {`${track.artist_name.substring(0, 20)}...`}
          </h5>
        </div>
        <div className='p-1 md:p-0'>
          <strong>
            <i className='fas fa-play' /> Track
          </strong>
          : {`${track.track_name.substring(0, 30)}...`}
        </div>
        <div className='p-1 md:p-0'>
          <strong>
            <i className='fas fa-compact-disc' /> Album
          </strong>
          : {`${track.album_name.substring(0, 20)}...`}
        </div>
      </div>
    </Link>
  );
};

export default Track;
