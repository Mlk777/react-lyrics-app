import React, { useState, useContext } from 'react';
import { AppProvider, AppContext } from '../../context';

const Search = () => {
  const [trackTitle, setTrackTitle] = useState('');
  const buttonRef = React.createRef();
  const { searchLyrics } = useContext(AppContext);

  const onChange = e => {
    setTrackTitle(e.target.value);
  };

  const onFocus = e => {
    if (e.target.value !== '') setTrackTitle('');
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      buttonRef.current.focus();
    }
  };

  const onFindTrack = e => {
    e.preventDefault();
    searchLyrics(trackTitle);
  };

  return (
    <AppProvider>
      <div className='card card-body mb-4 p-4'>
        <h1 className='display-4 text-center'>
          <i className='fas fa-music' /> Search For A Song
        </h1>
        <p className='lead text-center'>Get the lyrics for any song</p>
        <form onSubmit={onFindTrack}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control form-control-lg'
              placeholder='Song Title...'
              name='trackTitle'
              value={trackTitle}
              onChange={onChange}
              onFocus={onFocus}
              onKeyPress={onKeyPress}
            />
          </div>
          <button
            ref={buttonRef}
            className='btn btn-primary btn-lg btn-block mb-5'
            type='submit'
          >
            Get Tracks Lyrics
          </button>
        </form>
      </div>
    </AppProvider>
  );
};

export default Search;
