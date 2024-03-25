import { Schema, model } from 'mongoose'

const movieImagesSchema = new Schema({
  aspect_ratio: Number,
  height: Number,
  iso_639_1: String,
  file_path: String,
  vote_average: Number,
  vote_count: Number,
  width: Number
})

const movieViedosSchema = new Schema({
  iso_639_1: String,
  iso_3166_1: String,
  name: String,
  key: String,
  site: String,
  size: Number,
  type: String,
  official: Boolean,
  published_at: Date,
  id: String
})

const movieCastingSchema = new Schema({
  adult: Boolean,
  gender: Number,
  id: Number,
  known_for_department: String,
  name: String,
  original_name: String,
  popularity: Number,
  profile_path: String,
  cast_id: Number,
  character: String,
  credit_id: String,
  order: Number
})

const movieCrewSchema = new Schema({
  adult: Boolean,
  gender: Number,
  id: Number,
  known_for_department: String,
  name: String,
  original_name: String,
  popularity: Number,
  profile_path: String,
  credit_id: String,
  department: String,
  job: String
})

const movieSchema = new Schema({
  adult: Boolean,
  backdrop_path: String,
  id: Number,
  title: String,
  original_language: String,
  original_title: String,
  overview: String,
  poster_path: String,
  media_type: String,
  genre_ids: [Number],
  genre_names:[String],
  popularity: Number,
  release_date: Date,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  type: String,
  images: {
    backdrops: [movieImagesSchema],
    logos: [movieImagesSchema],
    posters: [movieImagesSchema]
  },
  videos: [movieViedosSchema],
  credits: {
    cast: [movieCastingSchema],
    crew: [movieCrewSchema]
  }
})

// movieSchema.set('toJSON', {
//   transform: (document, returnedOject) => {
//     returnedOject.idMovie = returnedOject.id
//     returnedOject.id = returnedOject._id
//     delete returnedOject._id
//     delete returnedOject.__v
//   }
// })

export const Movie = model('movies', movieSchema)
