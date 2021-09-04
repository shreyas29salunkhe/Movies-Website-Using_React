import React, { useEffect, useState } from "react";

import "./App.css";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=8f7bccef3f8984bf678d67de30041b19&language=en-US&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=8f7bccef3f8984bf678d67de30041b19&query=";
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm,setSearchTerm]=useState('');
  useEffect(() => {
    getMovies(FEATURED_API);
    
  }, []);
  const getMovies=(API)=>
  {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        
        setMovies(data.results);
      });
  
  }
  const handleOnSubmit=(e)=>
  {
    e.preventDefault();
    if(searchTerm){
      getMovies(SEARCH_API+searchTerm);
    
      setSearchTerm('');
    }
  };
  const handleOnChange=(e)=>
  {
    setSearchTerm(e.target.value);
  }

  return (
    <>
    <header>
      <form onSubmit={handleOnSubmit}><input onChange={handleOnChange} value={searchTerm} className="search" type="search" placeholder="Search . . . " /></form>
    
  </header>
  <div className="movie-container">
    
    {movies.length > 0 && movies.map((movie) =>
    <Movie key={movie.id} {...movie} />)}
    </div>
    </>
    );
}

export default App;
