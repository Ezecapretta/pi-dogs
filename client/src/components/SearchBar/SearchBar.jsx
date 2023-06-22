import React from 'react';
import style from './SearchBar.module.css';

  const SearchBar = ({searchDog}) => {

  const handleSearch = (event) => {
    event.preventDefault();
    searchDog(event.target.value);
  };

  const handleChange = (event) => {
    searchDog(event.target.value)
  }

  return (
    <div className={style.searchBar}>
      <div >
        <input
          type="text"
          placeholder="Search by name..."
          onChange={handleChange}
          className={style.buscar}
        />
      </div>
      <div >
        <button onClick={handleSearch} className={style.btn}>🔍</button>
      </div>
    </div>
  );
};

export default SearchBar;
