import { getAllGenresDB } from '../database/mongo'


const test = async () => {
    const result = await getAllGenresDB()
    console.log('result-->', result)
}

test().then(() => {
    console.log('Fin')
})

