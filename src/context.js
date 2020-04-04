import React, { useState, useEffect } from 'react';

const AppContext = React.createContext();

const AppProvider = props => {
  const [trackList, setTrackList] = useState([]);
  const [heading, setHeading] = useState('');
  const [subHeading, setSubHeading] = useState('');

  useEffect(() => {
    const getTracks = async () => {
      try {
        const res = await (
          await fetch(
            `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
          )
        ).json();
        const data = res.message.body.track_list;
        setTrackList([...data]);
        setHeading('CHARTS');
        setSubHeading('TRENDING ON LYRICS FINDER');
      } catch (err) {
        console.log(err);
      }
    };
    getTracks();
  }, []);

  const searchLyrics = async trackTitle => {
    try {
      const res = await (
        await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
        )
      ).json();

      const result = res.message.body.track_list;

      result.length === 0 || result === undefined
        ? setTrackList('No result for this song title !')
        : setTrackList([...result]);

      setHeading(`"${trackTitle}"`);
      setSubHeading('Top 10 results');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppContext.Provider
      value={{ trackList, heading, subHeading, searchLyrics }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
