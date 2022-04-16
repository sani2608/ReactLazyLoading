import React, { useRef, useCallback } from 'react'
import './Pokemons.css'

const Pokemons = ({ pokemons, isLoading, loadMore }) => {

    const observer = useRef();
    const lastPokemonElementRef = useCallback(node => {

        if (loadMore) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log('IT IS VISIBLE');
                isLoading();
            }
        });

        if (node) observer.current.observe(node);

    }, [loadMore]);

    return (
        <div className='pokemon-container'>
            {
                pokemons.map((pokemon, index) => {
                    if (pokemons.length === index + 1) {
                        return (
                            <div
                                className='pokemon'
                                ref={lastPokemonElementRef}
                                key={pokemon.name}>
                                {pokemon.name}
                            </div>
                        )
                    } else {
                        return (
                            <div
                                className='pokemon'
                                onClick={() => isLoading(pokemon.name)}
                                key={pokemon.name}>
                                {pokemon.name}
                            </div>
                        )
                    }

                })
            }
        </div>
    )
}

export default Pokemons;