import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard'
import styles from './MoviesGrid.module.css'

const MoviesGrid = () => {
  const [movies, setMovies] = useState([])
  const [uniqueId, setUniqueId] = useState(null)
  const [searchedMovies, setSearchedMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getMovies = async () => {
    let response = await axios.get(
      'https://www.omdbapi.com/?apikey=45f0782a&s=war',
    )
    setMovies(response.data.Search)
  }
  useEffect(() => {
    getMovies()
  }, [])

  const highlightCard = (id) => {
    if (id === uniqueId) {
      setUniqueId(null)
    } else {
      setUniqueId(id)
    }
  }
  const handleChange = (e) => {
    const lowerCased = e.target.value.toLowerCase()
    const updatedList = movies.filter(({ Title }) =>
      Title.toLowerCase().includes(lowerCased),
    )
    console.log(updatedList)
    setSearchValue(lowerCased)
    setSearchedMovies(updatedList)
  }
  console.log(searchedMovies)
  return (
    <>
      <div className={styles.border}>
        <h3 className={styles.heading}>Movies</h3>
      </div>
      <div className={styles.searchWrapper}>
        <input type='text' placeholder='Search' onChange={handleChange} />
      </div>
      <div className={styles.cardWrapper}>
        {movies.length && searchValue.length > 0
          ? searchedMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                highlightCard={highlightCard}
                uniqueId={uniqueId}
                movie={movie}
              />
            ))
          : movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                highlightCard={highlightCard}
                uniqueId={uniqueId}
                movie={movie}
              />
            ))}
      </div>
    </>
  )
}

export default MoviesGrid
