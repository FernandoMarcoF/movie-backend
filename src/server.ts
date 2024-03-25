import express from 'express'
import cors from 'cors'
// import crypto from 'node:crypto'
// import z from 'zod'
import dotenv from 'dotenv'
import { moviesRouter } from './routes/moviesRoutes'

dotenv.config()
const PORT = process.env.PORT || 9009

export const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log('Control de acceso')
  next()
})

app.use('/api/movies', moviesRouter)

app.use((req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.path} no existe`
  })
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
