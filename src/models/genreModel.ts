import { Schema, model } from 'mongoose'

const movieGenreSchema = new Schema({
   id: Number,
   name: String,
  })

  export const Genre = model('genres', movieGenreSchema)