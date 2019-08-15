import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const AppProvider = props => {
  const [trackList, setTrackList] = useState([]);
  const [heading, setHeading] = useState('');

  useEffect(() => {
    const getTracks = async () => {
      try {
        let res = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
            process.env.REACT_APP_MM_KEY
          }`
        );
        let data = res.data.message.body.track_list;
        setTrackList(trackList => [...trackList, ...data]);
        setHeading('Top 10 Tracks');
      } catch (err) {
        console.log(err);
      }
    };
    getTracks();
  }, []);

  const searchLyrics = async trackTitle => {
    try {
      let res = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      );

      const result = res.data.message.body.track_list;

      result.length === 0 || result === undefined
        ? setTrackList('No result for this song title !')
        : setTrackList(result);

      setHeading('Search Results');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppContext.Provider value={{ trackList, heading, searchLyrics }}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
