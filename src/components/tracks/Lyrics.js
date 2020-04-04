import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';

const Lyrics = props => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        const id = props.match.params.id;
        const getLyrics = await (
          await fetch(
            `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
          )
        ).json();
        const getTrackData = await (
          await fetch(
            `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
          )
        ).json();

        const lyricsData = getLyrics.message.body.lyrics;
        const trackData = getTrackData.message.body.track;

        setLyrics(lyricsData);
        setTrack(trackData);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  return track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0 ? (
    <Spinner />
  ) : (
    <div className='flex flex-col justify-center w-9/12 m-auto'>
      <div className='my-4'>
        <Link
          to='/'
          className='border border-gray-400 mb-4 rounded-md p-2 bg-gray-800 text-gray-300'
        >
          <i className='fas fa-chevron-left' /> Go Back
        </Link>
      </div>
      <div className='border-2 border-gray-600 rounded'>
        <p className='border-b-2 border-gray-600 p-4 text-2xl md:text-4xl text-center font-semibold'>
          {track.track_name} by{' '}
          <span className='text-gray-500 font-medium text-xl md:text-3xl'>
            {track.artist_name}
          </span>
        </p>
        <div className='p-8 md:text-xl'>
          <p className=''>{lyrics.lyrics_body}</p>
        </div>
        <div className='text-center border-t-2 border-gray-600 text-xl p-2 text-blue-500'>
          <a
            href={track.track_share_url}
            target='_blank'
            rel='noopener noreferrer'
          >
            View full lyrics <i className='fa fa-arrow-alt-circle-right' />
          </a>
        </div>
      </div>
      <div className='my-4'>
        <p className='text-gray-800'>
          On Album: <span className='text-blue-500'>{track.album_name}</span>
        </p>
        {track.primary_genres.music_genre_list.length === 0 ? (
          ''
        ) : (
          <>
            <p className='text-gray-800'>
              Genre:{' '}
              <span className='text-blue-500'>
                {track.primary_genres.music_genre_list.map(
                  genre => ` ${genre.music_genre.music_genre_name} /`
                )}
              </span>
            </p>
          </>
        )}

        <p className='text-gray-800'>
          Last Update:{' '}
          <span className='text-blue-500'>
            <Moment format='DD/MM/YYYY'>{track.updated_time}</Moment>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Lyrics;
