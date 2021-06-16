import React, { useState } from 'react'
import styles from './MovieCard.module.css'

const MovieCard = ({ movie, highlightCard, uniqueId }) => {
  const { imdbID, Poster, Title } = movie
  const [displayTitle, setDisplayTitle] = useState(false)
  const showTitle = () => setDisplayTitle(true)
  const hideTitle = () => setDisplayTitle(false)

  return (
    <div
      key={imdbID}
      onClick={() => highlightCard(imdbID)}
      onMouseOver={showTitle}
      onMouseLeave={hideTitle}
      className={
        imdbID === uniqueId
          ? `${styles.cardItem} ${styles.highlight}`
          : styles.cardItem
      }>
      <img src={Poster} alt={Title} />
      {displayTitle && (
        <div className={styles.titleWrapper}>
          <p className={styles.title}>{Title}</p>
        </div>
      )}
    </div>
  )
}

export default MovieCard
