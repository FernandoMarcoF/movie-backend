import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = process.env.APIKEY

export const getMoviesTrending = async () => {
  const url = `${baseUrl}/trending/movie/week`
  const options = {
    params: {
      language: 'es'
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }
  try {
    const results = await axios.get(url, options)
    return results.data.results
  } catch (error) {
    console.error('Error getMoviesTrending')
  }
}

export const getMoviesToprated = async () => {
  const url = `${baseUrl}/movie/top_rated`
  const options = {
    params: {
      language: 'es'
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }
  try {
    const results = await axios.get(url, options)
    return results.data.results
  } catch (error) {
    console.error('Error getMoviesToprated')
  }
}

export const getMoviesImages = async (idMovie: number) => {
  const url = `${baseUrl}/movie/${idMovie}/images`
  const options = {
    params: { include_image_language: 'es,en' },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }
  try {
    const response = await axios.get(url, options)
    return response.data
  } catch (error) {
    console.error('Error getMoviesImages')
  }
}

export const getMovieVideos = async (idMovie: number) => {
  const url = `${baseUrl}/movie/${idMovie}/videos`
  const options = {
    params: { language: 'es' },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }
  try {
    const response = await axios.get(url, options)
    return response.data.results
  } catch (error) {
    console.error('Error getMovieVideos')
  }
}

export const getMovieCredits = async (idMovie: number) => {
  const url = `${baseUrl}/movie/${idMovie}/credits`
  const options = {
    params: { language: 'es' },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }
  try {
    const response = await axios.get(url, options)
    return response.data
  } catch (error) {
    console.error('Error getMovieCredits')
  }
}

export const getCreditPeopleDetails = async (idPerson: number) => {
  const url = `${baseUrl}/person/${idPerson}`
  const options = {
    params: { language: 'es' },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }
  try {
    const response = await axios.get(url, options)
    return response.data
  } catch (error) {
    console.error('Error getCreditPeopleDetails')
  }
}

export const getMovieByTitle = async (title: string) => {
  const url = `${baseUrl}/search/movie`
  const options = {
    params: {
      query: title,
      language: 'es'
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }
  try {
    const response = await axios.get(url, options)
    return response.data
  } catch (error) {
    console.error('Error getMovieByTitle')
  }
}

export const recallFunction = async (imputFunction: Function, all: boolean, intentosMax: number, id: number | string = 0) => {
  let data
  let cont = 0
  try {
    while (!data) {
      data = (id === 0) ? await imputFunction() : await imputFunction(id)
      if (data || cont > intentosMax) { break }
      cont++
    }
    if (!data && cont > intentosMax) {
      console.error(`Se superó el número máximo de intentos en ${imputFunction.name}.`)
    } else {
      const results = (all) ? data : data[0]
      return results
    }
  } catch (error) {
    console.error('Error recallFunction')
  }
}
