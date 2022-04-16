import React, { useEffect, useState } from 'react'
import Pokemons from '../Pokemons/Pokemons';
import './App.css'

const App = () => {

  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(`https://pokeapi.co/api/v2/pokemon?offset=100&limit=100`);
  const [isLoading, setIsLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const fetchPokemons = async (SERVICE_URL) => {

      const response = await fetch(SERVICE_URL);
      const data = await response.json();
      setPokemons([...new Set([...pokemons, ...data.results])]);
      setNextUrl(data.next);
      setIsLoading(false);
      setLoadMore(false);
    }
    fetchPokemons(nextUrl).catch(e => console.log(e));
  }, [loadMore]);

  //for scroll to top
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };

  const setLoader = () => {
    console.log('is NUll => ', nextUrl);
    if (!nextUrl) {
      setLoadMore(false);
      setIsLoading(false);
      return;
    } else {
      setIsLoading(true);
      setTimeout(() => { setLoadMore(true); }, 3000);
    }
  }


  return (
    <div className='main-container'>
      <div>
        <Pokemons
          loadMore={loadMore}
          pokemons={pokemons}
          isLoading={setLoader} />
      </div>
      {
        isLoading && (
          <div className="loading-container">
            <h1 className='loader-text'>loading data...</h1>
            <div className="lds-dual-ring" ></div>
          </div>
        )
      }

      {
        showButton && (
          <button onClick={scrollToTop} className="back-to-top">
            &#8679;
          </button>
        )
      }
    </div>
  )
}

export default App;
