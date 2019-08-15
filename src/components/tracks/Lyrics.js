import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';

const Lyrics = props => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        let id = props.match.params.id;
        let getLyrics = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${
            process.env.REACT_APP_MM_KEY
          }`
        );
        let getTrackData = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${
            process.env.REACT_APP_MM_KEY
          }`
        );

        let lyricsData = getLyrics.data.message.body.lyrics;
        let trackData = getTrackData.data.message.body.track;

        setLyrics(lyricsData);
        setTrack(trackData);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0 ? (
    <Spinner />
  ) : (
    <>
      <Link to='/' className='btn btn-dark btn-sm mb-4'>
        Go Back
      </Link>
      <div className='card mb-3'>
        <h5 className='card-header'>
          {track.track_name} by{' '}
          <span className='text-secondary'>{track.artist_name}</span>
        </h5>
        <div className='card-body'>
          <p className='card-text'>{lyrics.lyrics_body}</p>
        </div>
        <a
          href={track.track_share_url}
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-link btn-sm'
        >
          View full lyrics <i className='fa fa-arrow-alt-circle-right' />
        </a>
      </div>
      <h6 className='text-secondary'>
        On Album: <span className='text-info'>{track.album_name}</span>
      </h6>
      {track.primary_genres.music_genre_list.length === 0 ? (
        ''
      ) : (
        <>
          <h6 className='text-secondary'>
            Genre:{' '}
            <span className='text-info'>
              {track.primary_genres.music_genre_list.map(
                genre => ` ${genre.music_genre.music_genre_name} /`
              )}
            </span>
          </h6>
        </>
      )}

      <h6 className='text-secondary'>
        Last Update:{' '}
        <span className='text-info'>
          <Moment format='DD/MM/YYYY'>{track.updated_time}</Moment>
        </span>
      </h6>
    </>
  );
};

export default Lyrics;
