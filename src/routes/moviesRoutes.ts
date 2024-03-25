import { Router } from 'express'
import { getMovieByTitle, getMovieCredits, getMoviesImages, getMoviesToprated, getMoviesTrending, getMovieVideos, recallFunction } from '../tmdb'
import { getAllGenresDB, getAllMoviesByTypeDB, getAllMoviesDB, getMovieByIdDB, getMovieByTitleDB, saveMovieDB, updateMoviesTypeDB } from '../database/mongo'
import { IGenre, IMovie } from '../interfaces/movie.interface'

export const moviesRouter = Router()

let genresDb: IGenre[] | undefined = undefined

const moviesAllData = async (movies: IMovie[], movieType: string) => {
  const moviesData = await Promise.all(movies.map(async (movie) => {
    const resultsImages = await recallFunction(getMoviesImages, true, 100, movie.id)
    const resultsVideos = await recallFunction(getMovieVideos, true, 100, movie.id)
    const resultsCredits = await recallFunction(getMovieCredits, true, 100, movie.id)

    let nameGenres: string[] = []
    if (genresDb) {
      nameGenres = genresDb.filter(g => movie.genre_ids.includes(g.id)).map(elem => elem.name)
    }
    return ({
      ...movie,
      type: movieType,
      genre_names: nameGenres,
      images: resultsImages,
      videos: resultsVideos,
      credits: resultsCredits
    })
  }))
  return moviesData
}

moviesRouter.get('/trending', async (req, res) => {
  const resultsMovies: IMovie[] = await recallFunction(getMoviesTrending, true, 100)

  genresDb = await getAllGenresDB()

  let uniqueInMoviesTrending: IMovie[] = []
  if (resultsMovies) {
    const moviesTrending = await getAllMoviesByTypeDB('trending')

    if (moviesTrending && moviesTrending.length > 0) {
      uniqueInMoviesTrending = moviesTrending
        .filter(movie => !resultsMovies.some(resultMovie => resultMovie.id === movie.id))

      const uniqueIdsInMoviesTrending: number[] = uniqueInMoviesTrending.map(movie => movie.id)
      await updateMoviesTypeDB(uniqueIdsInMoviesTrending, 'oldTrending')
    } else {
      uniqueInMoviesTrending = resultsMovies
    }
    const moviesData = await moviesAllData(uniqueInMoviesTrending, 'trending')
    const resultSave = await saveMovieDB(moviesData)
    res.json(resultSave)
  }
})

moviesRouter.get('/toprated', async (req, res) => {
  const resultsMovies = await recallFunction(getMoviesToprated, true, 100)
  if (resultsMovies) {
    const moviesData = await moviesAllData(resultsMovies, 'toprated')
    res.json(moviesData)
  }
})

moviesRouter.get('/', async (req, res) => {
  const movies = await getAllMoviesDB()
  res.json(movies)
}
)
moviesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const movies = await getMovieByIdDB(parseInt(id, 10))
  res.json(movies)
})

moviesRouter.get('/:title', async (req, res) => {
  const { title } = req.params
  const moviesDb = await getMovieByTitleDB(title)
  if (moviesDb && moviesDb.length > 0) {
    res.json(moviesDb)
  } else {
    const movies = await recallFunction(getMovieByTitle, true, 100, title)
    if (movies) {
      res.json(movies)
    } else {
      res.status(404).json({ menssage: 'Movie not found' })
    }
  }
})
