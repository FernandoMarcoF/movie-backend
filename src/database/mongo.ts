import mongoose from 'mongoose'
import { Movie } from '../models/movieModel'
import { Genre } from '../models/genreModel'
import { IGenre, IMovie } from '../interfaces/movie.interface'

const conectionString = 'mongodb+srv://fmarco:aZBCJpwDuUDIFaei@cluster0.v6hmfsf.mongodb.net/movies_dataset?retryWrites=true&w=majority&appName=Cluster0'

const conectMongo = async () => {
  try {
    await mongoose.connect(conectionString)
    console.log('Database conected')
  } catch (error) {
    console.error(error)
  }
}

export const saveMovieDB = async (inputMovies: IMovie[]) => {
  try {
    await conectMongo()
    const results = await Promise.all(inputMovies.map(async (inputMovie) => {
      const idMovies = await Movie.find({ id: inputMovie.id })
      if (idMovies.length === 0) { 
        const movie = new Movie(inputMovie)
        const result = await movie.save()
        return result
      }
    }));
    return results.filter(result => result)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.connection.close()
    console.log('Database disconnected')
  }
};

export const getAllMoviesDB = async () => {
  try {
    await conectMongo()
    const movies: IMovie[] = await Movie.find({})
    return movies
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.connection.close()
    console.log('Database disconected')
  }
}

export const getAllMoviesByTypeDB = async (inputType: string) => {
  try {
    await conectMongo()
    const movies: IMovie[] = await Movie.find({ type: inputType })
    return movies
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.connection.close()
    console.log('Database disconected')
  }
}
export const getAllGenresDB = async () => {
  try {
    await conectMongo()
    const genres: IGenre[] = await Genre.find({})
    return genres
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.connection.close()
    console.log('Database disconected')
  }
}

export const updateMoviesTypeDB = async (inputIdMovies: number[], inputType: string) => {
  try {
    await conectMongo()
    for (const idMovie of inputIdMovies) {
      await Movie.findByIdAndUpdate(idMovie, { type: inputType })
    }
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.connection.close()
    console.log('Database disconected')
  }
}

export const getMovieByIdDB = async (IdMovie: number) => {
  try {
    await conectMongo()
    const movies = await Movie.find({ id: IdMovie })
    if (movies) {
      return movies
    }
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.connection.close()
    console.log('Database disconected')
  }
}

export const getMovieByTitleDB = async (title: string) => {
  try {
    const regex = new RegExp(title, 'i')
    await conectMongo()
    const movies = await Movie.find({ title: regex })
    return movies
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.connection.close()
    console.log('Database disconected')
  }
}
