import React, { useState, useContext } from 'react';
import { AppContext } from '../../context';

const Search = () => {
  const [search, setSearch] = useState('');
  const buttonRef = React.createRef();
  const { searchLyrics } = useContext(AppContext);

  const onChange = e => {
    setSearch(e.target.value);
  };

  const onFocus = e => {
    if (e.target.value !== '') setSearch('');
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') buttonRef.current.focus();
  };

  const onFindTrack = e => {
    e.preventDefault();
    searchLyrics(search);
  };

  return (
    <div className='w-full flex justify-center mb-12 md:mb-16'>
      <form className='flex w-8/12 md:w-5/12' onSubmit={onFindTrack}>
        <input
          type='text'
          placeholder='Search...'
          name='search'
          className='w-full border border-gray-500 p-2 text-xl rounded-tl-md rounded-bl-md outline-none'
          value={search}
          onChange={onChange}
          onFocus={onFocus}
          onKeyPress={onKeyPress}
          required
        />
        <button
          ref={buttonRef}
          className='border border-l-0 border-gray-500 rounded-tr-md rounded-br-md'
          style={{ outline: '0' }}
        >
          <i className='fa fa-search fa-lg p-2'></i>
        </button>
      </form>
    </div>
  );
};

export default Search;
